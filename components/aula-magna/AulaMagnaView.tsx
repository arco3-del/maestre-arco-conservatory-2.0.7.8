
import React, { useState } from 'react';
import { FormalEvaluation } from './FormalEvaluation';
import { Masterclasses } from './Masterclasses';

type AulaMagnaTab = 'evaluation' | 'masterclasses';

export const AulaMagnaView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AulaMagnaTab>('evaluation');

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold">Aula Magna</h2>
                <p className="text-lg text-gray-400 mt-2">The stage for your evaluations and advanced learning.</p>
            </div>

            <div className="flex justify-center border-b border-gray-700 mb-8">
                <button 
                    onClick={() => setActiveTab('evaluation')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'evaluation' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Formal Evaluation
                </button>
                <button 
                    onClick={() => setActiveTab('masterclasses')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'masterclasses' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Masterclasses
                </button>
            </div>

            <div>
                {activeTab === 'evaluation' && <FormalEvaluation />}
                {activeTab === 'masterclasses' && <Masterclasses />}
            </div>
        </div>
    );
};
