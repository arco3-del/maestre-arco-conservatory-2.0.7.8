
import React, { useEffect, useState } from 'react';

export const WelcomeScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://picsum.photos/seed/conservatoryhall/1920/1080"
                    alt="Conservatory Hall"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-gray-900"></div>
            </div>
            <div className={`relative z-10 container mx-auto px-4 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto text-amber-400">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Welcome to the Maestre Arco Conservatory
                </h1>
                <p className="text-xl md:text-2xl text-amber-400 mb-10 max-w-3xl mx-auto">
                    Where silenced symphonies find their voice.
                </p>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-12">
                    "Here, there are no walls to limit your learning, no barriers to silence your artistic voice. I am here to guide you. Shall we begin?" - Maestre Arco
                </p>
                <button
                    onClick={onComplete}
                    className="bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-600 transition-transform transform hover:scale-105"
                >
                    Start My Journey
                </button>
            </div>
        </section>
    );
};
