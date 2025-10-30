
import React from 'react';

const MasterclassCard: React.FC<{ title: string; instructor: string; date: string; isLive?: boolean; isArchived?: boolean }> = ({ title, instructor, date, isLive, isArchived }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
            <div className="flex items-center mb-1">
                {isLive && <span className="text-xs font-bold uppercase text-red-400 bg-red-900/50 px-2 py-1 rounded-full mr-2">LIVE</span>}
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-amber-400">with {instructor}</p>
            <p className="text-sm text-gray-400 mt-1">{date}</p>
        </div>
        <div>
            {isArchived ? (
                <button className="font-bold py-2 px-6 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">View Recording</button>
            ) : (
                <button className={`font-bold py-2 px-6 rounded-full ${isLive ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}>
                    {isLive ? 'Join Now' : 'Reserve Spot'}
                </button>
            )}
        </div>
    </div>
);


export const Masterclasses: React.FC = () => {
    const upcomingClasses = [
        { title: "Breathing Technique for Opera", instructor: "Luciano Pavarotti (Special Guest)", date: "Today at 7:00 PM", isLive: true },
        { title: "Experimental Use of Color", instructor: "Frida Kahlo (Special Guest)", date: "Tomorrow at 5:00 PM" },
    ];
    
    const archivedClasses = [
        { title: "Advanced Baroque Harmony", instructor: "J.S. Bach (Special Guest)", date: "Last week", isArchived: true },
        { title: "Sculpting with Non-Traditional Materials", instructor: "Louise Bourgeois (Special Guest)", date: "Last month", isArchived: true },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h3 className="text-2xl font-bold mb-4">Upcoming Masterclasses</h3>
                <div className="space-y-4">
                    {upcomingClasses.map(mc => <MasterclassCard key={mc.title} {...mc} />)}
                </div>
            </div>
             <div>
                <h3 className="text-2xl font-bold mb-4">Masterclass Archive</h3>
                <div className="space-y-4">
                     {archivedClasses.map(mc => <MasterclassCard key={mc.title} {...mc} />)}
                </div>
            </div>
        </div>
    );
};
