
import React from 'react';
import { AppState } from '../App';

interface QuickAccessPanelProps {
    onNavigate: (state: AppState) => void;
}

const AccessButton: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; onClick: () => void; }> = ({ title, subtitle, icon, onClick }) => (
    <button onClick={onClick} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300 text-left w-full flex items-center space-x-4">
        <div className="text-amber-400 text-3xl">{icon}</div>
        <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400">{subtitle}</p>
        </div>
    </button>
);

const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0a5 5 0 01-5 5a5 5 0 01-5-5a1 1 0 10-2 0a7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /></svg>;
const ScaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l-6-2m0 0l-3 9" /></svg>;
const LibraryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
const BeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" /></svg>;


export const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({ onNavigate }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AccessButton
                    title="Curriculum"
                    subtitle="Your next lesson: Minor Scales"
                    icon={<BookOpenIcon />}
                    onClick={() => onNavigate('curriculum')}
                />
                <AccessButton
                    title="Practice Room"
                    subtitle="Multimodal feedback with video"
                    icon={<MicrophoneIcon />}
                    onClick={() => onNavigate('practice')}
                />
                 <AccessButton
                    title="Aula Magna"
                    subtitle="Live conversational evaluation"
                    icon={<ScaleIcon />}
                    onClick={() => onNavigate('aulaMagna')}
                />
                 <AccessButton
                    title="Knowledge Hall"
                    subtitle="Research with cited sources"
                    icon={<LibraryIcon />}
                    onClick={() => onNavigate('knowledgeHall')}
                />
                 <AccessButton
                    title="Extension Lab"
                    subtitle="Technological empowerment"
                    icon={<BeakerIcon />}
                    onClick={() => onNavigate('extensionLab')}
                />
            </div>
        </div>
    );
};
