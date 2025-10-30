
import React from 'react';
import type { Lesson } from '../App';

interface LessonDetailProps {
    lesson: Lesson;
    onBack: () => void;
    onStartPractice: (lesson: Lesson) => void;
}

const Quiz: React.FC = () => (
    <div className="bg-gray-900/50 p-6 rounded-lg mt-8 border border-gray-700">
        <h4 className="text-xl font-bold mb-4 text-amber-400">Theory Quiz</h4>
        <p className="mb-4 text-gray-300">What characterizes a harmonic minor scale?</p>
        <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-800 rounded-md hover:bg-gray-700">A) It has 5 notes</button>
            <button className="w-full text-left p-3 bg-gray-800 rounded-md hover:bg-gray-700">B) The seventh degree is raised by a half step</button>
            <button className="w-full text-left p-3 bg-gray-800 rounded-md hover:bg-gray-700">C) It always sounds happy</button>
        </div>
    </div>
);

export const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack, onStartPractice }) => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
            <button onClick={onBack} className="text-amber-400 hover:text-amber-300 mb-6">&larr; Back to lessons</button>
            
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8">
                <span className="text-sm font-semibold text-amber-400">{lesson.module}</span>
                <h2 className="text-4xl font-bold mt-1 mb-6 text-white">{lesson.name}</h2>

                <div className="aspect-video bg-gray-900 rounded-md mb-8 flex items-center justify-center">
                    <p className="text-gray-500">Maestro's introductory video</p>
                </div>

                <h3 className="text-2xl font-bold mb-4">Interactive Content</h3>
                <p className="text-gray-400 mb-6">{lesson.description} Here there would be interactive sheet music, theory, and practical exercises.</p>

                <div className="text-center my-8">
                    <button 
                        onClick={() => onStartPractice(lesson)}
                        className="bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-600 transition-transform transform hover:scale-105"
                    >
                        Start Practice with AI Assistance
                    </button>
                </div>

                <Quiz />

                 <div className="mt-8 bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                     <h4 className="text-xl font-bold mb-4 text-amber-400">Practical Assessment</h4>
                     <p className="text-gray-400 mb-4">Record a performance demonstrating the newly learned skill. The system will analyze your accuracy, tempo, and quality.</p>
                     <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md">
                        Begin Practical Recording
                     </button>
                 </div>
            </div>
        </div>
    );
};
