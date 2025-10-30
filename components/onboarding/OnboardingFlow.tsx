
import React, { useState, useCallback } from 'react';
import { generatePersonalizedPlan } from '../../services/geminiService';

const STEPS = {
    EXPERIENCE: 1,
    INSTRUMENT: 2,
    VISUAL_ART: 3,
    TIME_COMMITMENT: 4,
    PRACTICAL_TEST: 5,
    GENERATING_PLAN: 6,
};

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    const percentage = (current / total) * 100;
    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
            <div className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export const OnboardingFlow: React.FC<{ onComplete: (plan: any) => void }> = ({ onComplete }) => {
    const [step, setStep] = useState(STEPS.EXPERIENCE);
    const [answers, setAnswers] = useState<any>({});
    const [error, setError] = useState<string | null>(null);

    const handleNext = useCallback(async (data: object) => {
        const newAnswers = { ...answers, ...data };
        setAnswers(newAnswers);
        setError(null);

        if (step === STEPS.PRACTICAL_TEST) {
            setStep(STEPS.GENERATING_PLAN);
            try {
                const generatedPlan = await generatePersonalizedPlan(newAnswers);
                onComplete(generatedPlan);
            } catch (e: any) {
                 setError("There was an error generating your plan. Please try again.");
                 setStep(STEPS.PRACTICAL_TEST); // Go back to the previous step on error
            }
        } else {
            setStep(prev => prev + 1);
        }
    }, [step, answers, onComplete]);

    const renderStep = () => {
        switch (step) {
            case STEPS.EXPERIENCE:
                return <Question title="What is your current musical experience?" options={["Absolute Beginner", "I have some theory knowledge", "Amateur Musician", "Professional seeking refinement"]} onSelect={(experience) => handleNext({ experience })} />;
            case STEPS.INSTRUMENT:
                return <Question title="Which instrument interests you?" options={["Voice & Singing", "Piano", "Guitar", "Violin", "Digital Production"]} onSelect={(instrument) => handleNext({ instrument })} />;
            case STEPS.VISUAL_ART:
                return <Question title="Are you also interested in visual art?" options={["Yes, painting and sculpture", "Yes, only painting", "Yes, only sculpture", "No, just music"]} onSelect={(visualArt) => handleNext({ visualArt })} />;
            case STEPS.TIME_COMMITMENT:
                return <Question title="How much time can you dedicate weekly?" options={["1-2 hours (casual)", "3-5 hours (moderate)", "5-10 hours (serious)", "10+ hours (immersive)"]} onSelect={(timeCommitment) => handleNext({ timeCommitment })} />;
            case STEPS.PRACTICAL_TEST:
                return <PracticalTest onComplete={() => handleNext({ practicalTest: 'completed' })} error={error} />;
            case STEPS.GENERATING_PLAN:
                return <GeneratingPlan />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {step < STEPS.GENERATING_PLAN && <ProgressBar current={step} total={Object.keys(STEPS).length - 1} />}
                {renderStep()}
            </div>
        </div>
    );
};

const Question: React.FC<{ title: string; options: string[]; onSelect: (selection: string) => void }> = ({ title, options, onSelect }) => (
    <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map(opt => (
                <button key={opt} onClick={() => onSelect(opt)} className="text-left p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-amber-500/20 hover:border-amber-500 transition-all duration-200">
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

const PracticalTest: React.FC<{ onComplete: () => void; error: string | null }> = ({ onComplete, error }) => {
    return (
        <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-white">Practical Test (Optional)</h2>
            <p className="text-gray-400 mb-6">"If you feel comfortable, sing or play something. I'm not looking for perfection, just to know your starting point."</p>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            <button onClick={onComplete} className="bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-600 transition-colors">
                Finish and Generate Plan
            </button>
             <button onClick={onComplete} className="block mx-auto text-gray-400 text-sm mt-4 hover:text-white transition-colors">
                Skip test
            </button>
        </div>
    );
};

const GeneratingPlan: React.FC = () => (
    <div className="text-center animate-fade-in">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto"></div>
        <h2 className="text-3xl font-bold mt-6 text-white">Creating your personalized plan...</h2>
        <p className="text-gray-400 mt-2">Maestre Arco is consulting the pedagogical cosmos to design your unique educational roadmap.</p>
    </div>
);
