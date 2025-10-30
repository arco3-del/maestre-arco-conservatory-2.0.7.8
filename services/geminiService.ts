
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("API_KEY environment variable not set. Using a placeholder. The app will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function generatePersonalizedPlan(answers: any): Promise<any> {
  try {
    const textPart = {
      text: `
        Act as an expert music and art pedagogue. Based on the student's answers, generate a 10-module curriculum in JSON format.
        
        Student's answers:
        - Experience: ${answers.experience}
        - Interests: ${answers.instrument}, ${answers.visualArt}
        - Availability: ${answers.timeCommitment}

        The JSON must have a "modules" key which is an array of 10 objects. Each object must have "title", "description", and "duration".
        The plan should be progressive, coherent, and tailored to a student with this profile. For example, a beginner needs solid fundamentals, while a professional needs advanced topics.
        The duration of each module should reflect the student's availability.
      `,
    };

     const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: { parts: [textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString);

  } catch (error)
 {
    console.error("Error generating personalized plan:", error);
    throw new Error("Could not generate the personalized curriculum.");
  }
}


export async function getMultimodalPracticeFeedback(videoBase64: string, lessonName: string): Promise<any> {
    try {
        const videoPart = {
            inlineData: {
                mimeType: 'video/webm',
                data: videoBase64,
            },
        };
        const textPart = {
            text: `
              Act as an expert and perceptive music teacher. Analyze this student's practice video for the lesson "${lessonName}".
              Provide detailed multimodal feedback in English. Your response MUST be a JSON object following the provided schema.
              
              Analyze two main areas:
              1.  **Audio Analysis:** Evaluate tuning, rhythm, and dynamics.
              2.  **Video Analysis:** Evaluate posture, hand position (if visible), and overall technique.

              For each point, provide a specific and constructive comment. Be encouraging but precise.
            `,
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: { parts: [videoPart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        audioFeedback: {
                            type: Type.OBJECT,
                            properties: {
                                tuning: { type: Type.STRING, description: "Feedback on tuning." },
                                rhythm: { type: Type.STRING, description: "Feedback on rhythm and tempo." },
                            },
                        },
                        videoFeedback: {
                           type: Type.OBJECT,
                            properties: {
                                posture: { type: Type.STRING, description: "Feedback on body posture." },
                                technique: { type: Type.STRING, description: "Feedback on visible technique (hands, etc.)." },
                            },
                        },
                        overallComment: { type: Type.STRING, description: "An overall encouraging comment." }
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error fetching multimodal feedback from Gemini API:", error);
        throw new Error("Could not get multimodal feedback at this time.");
    }
}


export async function getKnowledgeHallResponse(chatHistory: { role: string, text: string }[]): Promise<{ text: string, sources: any[] }> {
    try {
        const lastUserQuestion = chatHistory[chatHistory.length - 1].text;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
              Act as an expert tutor in the Knowledge Hall. You are a knowledge curator: consult the web for the most accurate information, synthesize it in an academic and encouraging manner, and CITE YOUR SOURCES.
              Answer the following student question: "${lastUserQuestion}"
            `,
            config: {
                tools: [{googleSearch: {}}],
            },
        });

        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        return { text: response.text, sources };

    } catch (error) {
        console.error("Error fetching knowledge hall response from Gemini API:", error);
        return { 
            text: "My apologies, there seems to be a problem connecting to the library. Please try your question again in a moment.",
            sources: []
        };
    }
}
