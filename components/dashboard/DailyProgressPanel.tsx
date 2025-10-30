
import React from 'react';

const StatCard: React.FC<{ value: string; label: string; icon: string; }> = ({ value, label, icon }) => (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-gray-400">{label}</div>
        </div>
    </div>
);

export const DailyProgressPanel: React.FC<{ plan: any }> = ({ plan }) => {
    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">Daily Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <StatCard value="7" label="Day streak" icon="🔥" />
                <StatCard value="4.5/5h" label="Weekly practice" icon="⏱️" />
                <StatCard value="60%" label="Module 3 completed" icon="📊" />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Current Module: Intermediate Solfege</h3>
                 <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
            </div>
        </div>
    );
};
