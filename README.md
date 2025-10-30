# Maestre Arco Conservatory

**Pitch:** For every musical genius we know, how many talents have been silenced by the lack of a mentor? Maestre Arco is not just an app; it's the world's first digital conservatory with an AI mentor at its heart, built to give a voice back to the silenced artists.

## ✨ Vision

The Maestre Arco Conservatory is a revolutionary Progressive Web App (PWA) designed to democratize world-class music and art education. It leverages a sophisticated hybrid AI architecture to provide personalized, real-time feedback, making expert mentorship accessible to everyone, everywhere. Our mission is to break down the economic and geographical barriers that have historically limited artistic education.

## 🚀 Key Features (The Conservatory Rooms)

The user experience is structured as a journey through interconnected, purpose-driven "rooms":

1.  **Onboarding & Personalized Plan:** Upon entry, students engage in a conversational diagnostic. **Gemini 2.5 Pro** then crafts a unique 10-module curriculum in structured JSON, tailored to the student's experience, interests, and goals.

2.  **Extension Laboratory:** Immediately after registration, students are empowered. They are educated about Chrome's 7 built-in AI APIs and can generate and download a fully functional Chrome Extension powered by **Gemini Nano**. This provides an on-device AI assistant, demonstrating our commitment to transparency and technological empowerment from day one.

3.  **Practice Room (Multimodal Feedback):** Students can record a video (up to 60s) of their practice session. **Gemini 2.5 Pro** performs a multimodal analysis of both the **video** (posture, technique) and **audio** (tuning, rhythm) to provide comprehensive, expert-level feedback.

4.  **Aula Magna (Live Conversational Evaluation):** Formal evaluations are transformed into real-time, bidirectional audio conversations with Maestre Arco, powered by the **Gemini Live API**. This eliminates the cold, impersonal nature of online exams, creating a human-like mentorship experience.

5.  **Knowledge Hall (Augmented Research):** A conversational chat interface where students can ask complex questions about theory, history, or art. **Gemini 2.5 Flash with Google Search Grounding** acts as an expert curator, consulting the web, synthesizing information, and crucially, **citing its sources**.

## 🏗️ Technical Architecture: The Hybrid AI Ecosystem

Maestre Arco is a textbook implementation of the hybrid AI architecture promoted by the Google Chrome AI Challenge.

*   **Cloud Layer (PWA):** Leverages the full power of Google's cloud models for "deep thinking" tasks requiring massive processing power and global knowledge.
    *   **Models Used:** `Gemini 2.5 Pro`, `Gemini 2.5 Flash`, `Gemini Live API`.
*   **Device Layer (Chrome Extension):** Utilizes the on-device **Gemini Nano** model via Chrome's built-in AI APIs (`window.ai`). This handles quick, private, and offline tasks, as generated and explained in the Extension Laboratory.

## 🏆 Alignment with the Google Chrome AI Challenge 2025

This project is meticulously designed to embody the spirit of the challenge:

*   **Powerful & Useful:** It solves a real, profound problem in education.
*   **Seamless Integration:** It demonstrates mastery of the entire Gemini ecosystem and the new Chrome Built-in AI APIs.
*   **Exceptional User Experience:** The journey is intuitive, empowering, and emotionally resonant.
*   **Transparency & Empowerment:** The Extension Lab is a unique feature that not only uses the on-device APIs but educates the user about them and gives them the code, perfectly aligning with the principle of democratizing technology.

## 🛠️ Setup & Running the Application

1.  **Clone the repository.**
2.  **Set up your API Key:** The application requires a Google AI API key. You must set it as an environment variable named `API_KEY`.
    ```
    # In your development environment configuration (.env file, etc.)
    API_KEY="YOUR_GOOGLE_AI_API_KEY"
    ```
3.  **Run the application:** Open `index.html` in a modern web browser that supports the necessary web APIs (like Google Chrome).

---
*This project is a response to the democratization of mastery.* 

RICHARD FELIPE URBINA
ZAPOPAN,MEXICO 