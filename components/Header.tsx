
import React from 'react';
import { AppState } from '../App';

const MusicNoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

interface HeaderProps {
  appState: AppState;
  onNavigate: (state: AppState) => void;
}


export const Header: React.FC<HeaderProps> = ({ appState, onNavigate }) => {
  const navItems = [
    { state: 'dashboard', label: 'Dashboard' },
    { state: 'curriculum', label: 'Curriculum' },
    { state: 'aulaMagna', label: 'Aula Magna' },
    { state: 'knowledgeHall', label: 'Knowledge Hall' },
    { state: 'extensionLab', label: 'Lab' },
  ];

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <MusicNoteIcon className="w-8 h-8 text-amber-400" />
          <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Maestre Arco
          </span>
        </div>
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map(item => (
            <button
              key={item.state}
              onClick={() => onNavigate(item.state as AppState)}
              className={`transition-colors text-sm font-medium ${appState === item.state ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'}`}
            >
              {item.label}
            </button>
          ))}
           <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2 px-4 rounded-full transition-colors text-sm">
             My Profile
           </button>
        </nav>
      </div>
    </header>
  );
};
