
import React, { useState } from 'react';
import { LessonDetail } from './LessonDetail';
import type { Lesson, AppState } from '../App';

const ModuleCard: React.FC<{ module: any; index: number; isUnlocked: boolean; isActive: boolean; onClick: () => void; }> = ({ module, index, isUnlocked, isActive, onClick }) => (
  <div 
    onClick={isUnlocked ? onClick : undefined}
    className={`relative p-6 rounded-lg border transition-all duration-300 ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'} ${isActive ? 'bg-gray-700 border-amber-500 ring-2 ring-amber-500' : isUnlocked ? 'bg-gray-800 border-amber-500/50 hover:border-amber-500' : 'bg-gray-800/50 border-gray-700'}`}>
    {!isUnlocked && <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center z-10">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
      </svg>
    </div>}
    <div className={`transition-opacity duration-300 ${!isUnlocked ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-amber-400">Module {index + 1}</h3>
        <span className="text-xs font-semibold text-gray-400">{module.duration}</span>
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{module.title}</h4>
      <p className="text-sm text-gray-400">{module.description}</p>
    </div>
  </div>
);

const LessonItem: React.FC<{lesson: Lesson; onClick: () => void; isCompleted: boolean}> = ({ lesson, onClick, isCompleted }) => (
    <button onClick={onClick} className="w-full text-left flex items-center space-x-4 p-4 rounded-md bg-gray-800 hover:bg-gray-700/80 transition-colors">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'border-2 border-gray-500'}`}>
            {isCompleted && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className="flex-grow text-white">{lesson.name}</span>
    </button>
);


export const PersonalizedCurriculumView: React.FC<{ plan: any; onStartPractice: (lesson: Lesson) => void; onNavigate: (state: AppState) => void; }> = ({ plan, onStartPractice, onNavigate }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (!plan) {
    return <div className="text-center py-20">
      <h2 className="text-2xl font-bold">No curriculum found.</h2>
      <p className="text-gray-400">Please complete the initial diagnostic first.</p>
       <button onClick={() => onNavigate('onboarding')} className="mt-4 bg-amber-500 text-gray-900 font-bold py-2 px-4 rounded-full">
        Start Diagnostic
      </button>
    </div>
  }

  const modules = plan.modules;
  const activeModule = modules[activeModuleIndex];
  // Simulate 4 lessons per module
  const lessons: Lesson[] = Array.from({ length: 4 }, (_, i) => ({
    id: `${activeModule.title}-lesson-${i + 1}`,
    name: `${activeModule.title}, Lesson ${i + 1}`,
    module: activeModule.title,
    description: `Detailed content for lesson ${i+1} of the module on ${activeModule.title}.`
  }));

  if (selectedLesson) {
    return <LessonDetail lesson={selectedLesson} onBack={() => setSelectedLesson(null)} onStartPractice={onStartPractice} />
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Your Personalized Roadmap</h2>
          <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">This is the journey we have designed for you. Select a module to view the lessons.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module: any, index: number) => (
            <ModuleCard 
                key={module.title} 
                module={module} 
                index={index} 
                isUnlocked={index < 3} 
                isActive={index === activeModuleIndex}
                onClick={() => setActiveModuleIndex(index)}
            />
          ))}
        </div>

        {activeModule && (
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-6 text-center">Lessons for Module {activeModuleIndex + 1}: {activeModule.title}</h3>
                <div className="space-y-3">
                    {lessons.map((lesson, i) => (
                        <LessonItem key={lesson.id} lesson={lesson} onClick={() => setSelectedLesson(lesson)} isCompleted={i < 2} />
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};
