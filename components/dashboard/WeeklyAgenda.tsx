
import React from 'react';

const AgendaItem: React.FC<{ day: string; title: string; type: 'lesson' | 'masterclass' | 'evaluation' }> = ({ day, title, type }) => {
    const typeStyles = {
        lesson: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-500' },
        masterclass: { bg: 'bg-purple-900/50', text: 'text-purple-300', border: 'border-purple-500' },
        evaluation: { bg: 'bg-amber-900/50', text: 'text-amber-300', border: 'border-amber-500' },
    };
    const style = typeStyles[type];

    return (
        <div className={`p-4 rounded-lg flex items-center space-x-4 ${style.bg} border-l-4 ${style.border}`}>
            <div className="w-16 text-center">
                <p className="font-bold text-lg text-white">{day.slice(0,3)}</p>
                <p className="text-xs text-gray-400">{day.slice(3)}</p>
            </div>
            <div className="flex-grow">
                <p className={`text-xs font-bold uppercase ${style.text}`}>{type}</p>
                <p className="font-semibold text-white">{title}</p>
            </div>
        </div>
    );
};

export const WeeklyAgenda: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Weekly Agenda</h2>
            <div className="space-y-3">
                <AgendaItem day="Today" title="Lesson 3.4: Minor Scales" type="lesson" />
                <AgendaItem day="Tomorrow" title="Masterclass: Baroque Harmony" type="masterclass" />
                <AgendaItem day="Friday" title="Module 3 Evaluation" type="evaluation" />
            </div>
        </div>
    );
};
