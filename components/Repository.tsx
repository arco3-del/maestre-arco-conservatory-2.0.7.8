
import React from 'react';

const ArchiveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
);


export const Repository: React.FC = () => {
    return (
        <section id="repository" className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full text-amber-400">
                             <ArchiveIcon className="w-8 h-8"/>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold">Global Symphonies Repository</h2>
                    <p className="text-lg text-gray-400 mt-4 mb-8">
                        Giving a voice back to the silenced artists. Our curated library rescues and celebrates the works of composers and artists ignored by history due to systems of oppression. Every recovered work is an act of justice and a treasure for new generations.
                    </p>
                    <button className="bg-amber-500/10 border border-amber-500 text-amber-500 font-bold py-3 px-8 rounded-full hover:bg-amber-500 hover:text-gray-900 transition-colors">
                        Explore the Archive
                    </button>
                </div>
            </div>
        </section>
    );
};
