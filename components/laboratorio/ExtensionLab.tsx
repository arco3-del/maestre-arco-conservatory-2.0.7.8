import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';

const EXTENSION_FILES = {
    'manifest.json': {
      language: 'json',
      content: `{
    "manifest_version": 3,
    "name": "Maestre Arco Assistant",
    "version": "1.0",
    "description": "An AI assistant in your browser, powered by Chrome's built-in Gemini Nano model.",
    "action": {
        "default_popup": "popup.html",
        "default_icon": "icon.png"
    },
    "icons": {
        "128": "icon.png"
    },
    "ai": {
        "services": {
            "prompt": {
                "builtIn": "geminiNano"
            }
        }
    }
}`
    },
    'popup.html': {
      language: 'html',
      content: `<!DOCTYPE html>
<html>
<head>
    <title>Maestre Arco Assistant</title>
    <link href="https://cdn.tailwindcss.com"></script>
    <style>
        body { width: 300px; font-family: sans-serif; background-color: #1f2937; color: white; }
        .container { padding: 16px; }
        #prompt { background-color: #374151; border-color: #4b5563; }
        button { background-color: #f59e0b; color: #111827; }
        button:disabled { background-color: #4b5563; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-lg font-bold mb-2">Maestre Arco Assistant</h1>
        <textarea id="prompt" rows="4" class="w-full p-2 rounded border" placeholder="Ask me anything..."></textarea>
        <button id="send" class="w-full mt-2 py-2 px-4 font-bold rounded">Send</button>
        <div id="response" class="mt-4 p-2 bg-gray-800 rounded text-sm whitespace-pre-wrap"></div>
    </div>
    <script src="popup.js"></script>
</body>
</html>`
    },
    'popup.js': {
      language: 'javascript',
      content: `
const promptInput = document.getElementById('prompt');
const sendButton = document.getElementById('send');
const responseDiv = document.getElementById('response');

sendButton.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    sendButton.disabled = true;
    responseDiv.textContent = 'Thinking...';

    try {
        const response = await window.ai.services.prompt.execute(
            { prompt: "Act as Maestre Arco. Answer concisely. " + prompt },
            { stream: true }
        );
        
        responseDiv.textContent = '';
        for await (const chunk of response) {
            responseDiv.textContent += chunk;
        }

    } catch (e) {
        responseDiv.textContent = 'Error: ' + e.message;
    } finally {
        sendButton.disabled = false;
    }
});`
    }
};

const ApiCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
        <span className="text-2xl mt-1">{icon}</span>
        <div>
            <h4 className="font-bold text-amber-400">{title}</h4>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    </div>
);

export const ExtensionLab: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [codeGenerated, setCodeGenerated] = useState(false);

    const handleDownloadZip = () => {
        alert("This function would package the generated files into a .zip. For a demo, you can copy the code manually.");
        // In a real implementation with a library like JSZip:
        // const zip = new JSZip();
        // Object.entries(EXTENSION_FILES).forEach(([name, data]) => {
        //     zip.file(name, data.content);
        // });
        // zip.generateAsync({type:"blob"}).then(content => {
        //     saveAs(content, "maestre-arco-extension.zip");
        // });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="container mx-auto max-w-5xl text-center animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Extension Laboratory</h1>
                <p className="text-xl text-amber-400 mb-8">Empowerment & Technological Transparency</p>

                <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 text-left mb-8">
                    <h2 className="text-2xl font-bold mb-4">What are Chrome's Built-in AI APIs?</h2>
                    <p className="text-gray-400 mb-6">
                        They are a set of AI tools that live directly in your browser, powered by the Gemini Nano model. This allows your "Maestre Arco Assistant" to offer you instant, private, and offline help. Here are the 7 APIs the conservatory uses and how they empower you:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <ApiCard icon="💬" title="Prompt API" description="Your direct line to Maestre Arco. Lets you chat, get feedback on sheet music images, or hum a melody for analysis—all instantly on your device."/>
                        <ApiCard icon="📝" title="Proofreader API" description="Your personal editor. Instantly corrects musical notation errors in your compositions or grammar in your art essays as you write."/>
                        <ApiCard icon="📑" title="Summarizer API" description="Your study assistant. Condenses long lessons from the Knowledge Hall or your own practice notes into key takeaways."/>
                        <ApiCard icon="🌐" title="Translator API" description="Your key to global knowledge. Instantly translates historical texts or notes on a score from another language, completely offline."/>
                        <ApiCard icon="🗣️" title="Language Detector" description="Your seamless communicator. Automatically detects if you're writing in Spanish or English, so your mentors always understand you."/>
                        <ApiCard icon="✍️" title="Writer API" description="Your creative partner. Helps you overcome writer's block by suggesting a new chord progression or helping you phrase an idea for an essay."/>
                        <ApiCard icon="✨" title="Rewriter API" description="Your personal polisher. Takes a melody you've written or a description of your art and helps you refine it to express your vision more clearly."/>
                    </div>
                </div>

                {!codeGenerated ? (
                    <button onClick={() => setCodeGenerated(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg">
                        Generate Your Personal Assistant Extension
                    </button>
                ) : (
                    <div className="text-left animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4 text-center">Code Generated!</h3>
                        <p className="text-gray-400 mb-6 text-center">Here are the files for a 100% functional Chrome extension. Install it in your browser to always have Maestre Arco at hand.</p>
                        
                        <CodeBlock fileName="manifest.json" language="json" code={EXTENSION_FILES['manifest.json'].content} />
                        <CodeBlock fileName="popup.html" language="html" code={EXTENSION_FILES['popup.html'].content} />
                        <CodeBlock fileName="popup.js" language="javascript" code={EXTENSION_FILES['popup.js'].content} />
                        
                        <div className="mt-6 bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-3 rounded-lg text-sm">
                           <p><strong>Accessibility Note:</strong> To use this on a mobile device without a PC, you can download the files as a .ZIP and load them into a compatible browser like <a href="https://kiwibrowser.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold">Kiwi Browser</a>, which supports desktop extensions.</p>
                        </div>
                        
                        <div className="mt-8 flex justify-center items-center gap-4">
                             <button onClick={handleDownloadZip} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full">
                                Download as .ZIP
                             </button>
                             <button onClick={onComplete} className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg">
                                Continue to Dashboard &rarr;
                             </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};