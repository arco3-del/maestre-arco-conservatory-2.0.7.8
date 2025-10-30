
import React from 'react';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-700/50 rounded-lg text-amber-400">
            <span className="text-2xl">{icon}</span>
        </div>
        <div>
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    </div>
);

export const HowItWorks: React.FC = () => {
    const localFeatures = [
        { icon: '💬', title: 'Prompt API', description: 'Multimodal conversational core for instant on-device analysis and responses.' },
        { icon: '📝', title: 'Proofreader API', description: 'Corrects scores, lyrics, and theory in real-time as you type.' },
        { icon: '📑', title: 'Summarizer API', description: 'Synthesizes long lessons and practice sessions into concise, motivational summaries.' },
        { icon: '🌐', title: 'Translator API', description: 'Translates materials into 100+ languages locally, without using data.' },
        { icon: '🗣️', title: 'Language Detector', description: 'Automatically identifies and adapts to the student\'s language.' },
        { icon: '✍️', title: 'Writer API', description: 'Assists in composing music, lyrics, and essays like a creative partner.' },
        { icon: '✨', title: 'Rewriter API', description: 'Refines and elevates your existing compositions, maintaining your original intent.' },
    ];
    const cloudFeatures = [
        { icon: '🧠', title: 'Analysis with Gemini Pro', description: 'Deep music and art evaluations by comparing against thousands of professional references.' },
        { icon: '🎤', title: 'Collaborative Practice Rooms', description: 'Practice in real-time with students worldwide, synced via WebRTC.' },
        { icon: '📈', title: 'Advanced Technical Assessments', description: 'Multiple AIs analyze precision, expressiveness, style, and originality in parallel.' },
        { icon: '📚', title: 'Global Symphonies Repository', description: 'Access a curated library of works from historically silenced artists.' },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Hybrid Architecture: The Technological Heart</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">
                        The perfect balance of privacy, performance, and power. A master on your device and a conservatory in the cloud.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 text-amber-400">Local Layer: Gemini Nano</h3>
                        <p className="text-gray-400 mb-8">Runs 100% on your device, ensuring total privacy, offline access, and zero latency for daily learning.</p>
                        <div className="space-y-6">
                            {localFeatures.map(f => <FeatureCard key={f.title} {...f} />)}
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 text-amber-400">Cloud Layer: Gemini Pro</h3>
                         <p className="text-gray-400 mb-8">Amplifies your capabilities with massive processing for deep analysis, global collaboration, and access to unique resources.</p>
                        <div className="space-y-6">
                            {cloudFeatures.map(f => <FeatureCard key={f.title} {...f} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
