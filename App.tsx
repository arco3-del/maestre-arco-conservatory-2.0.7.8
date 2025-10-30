import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Dashboard } from './components/dashboard/Dashboard';
import { PersonalizedCurriculumView } from './components/curriculum/PersonalizedCurriculumView';
import { PracticeRoom } from './components/practice/PracticeRoom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AulaMagnaView } from './components/aula-magna/AulaMagnaView';
import { KnowledgeHallView } from './components/knowledge-hall/KnowledgeHallView';
import { ExtensionLab } from './components/laboratorio/ExtensionLab';


export type AppState = 'welcome' | 'onboarding' | 'extensionLab' | 'dashboard' | 'curriculum' | 'practice' | 'aulaMagna' | 'knowledgeHall';
export type Lesson = { id: string; name: string; module: string, description: string };

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [personalizedPlan, setPersonalizedPlan] = useState(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const handleWelcomeComplete = useCallback(() => {
    setAppState('onboarding');
  }, []);

  const handleOnboardingComplete = useCallback((plan: any) => {
    setPersonalizedPlan(plan);
    setAppState('extensionLab');
  }, []);
  
  const handleExtensionLabComplete = useCallback(() => {
    setAppState('dashboard');
  }, []);

  const navigateTo = useCallback((state: AppState) => {
    setAppState(state);
  }, []);

  const startPracticeSession = useCallback((lesson: Lesson) => {
    setCurrentLesson(lesson);
    setAppState('practice');
  }, []);


  const renderContent = () => {
    switch (appState) {
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'extensionLab':
        return <ExtensionLab onComplete={handleExtensionLabComplete} />;
      case 'dashboard':
        return <Dashboard personalizedPlan={personalizedPlan} onNavigate={navigateTo} />;
      case 'curriculum':
        return <PersonalizedCurriculumView plan={personalizedPlan} onStartPractice={startPracticeSession} onNavigate={navigateTo} />;
      case 'practice':
        return <PracticeRoom lesson={currentLesson} onNavigate={navigateTo} />;
      case 'aulaMagna':
        return <AulaMagnaView />;
      case 'knowledgeHall':
        return <KnowledgeHallView />;
      case 'welcome':
      default:
        return <WelcomeScreen onComplete={handleWelcomeComplete} />;
    }
  };

  const showHeaderAndFooter = appState !== 'welcome' && appState !== 'onboarding' && appState !== 'extensionLab';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {showHeaderAndFooter && <Header appState={appState} onNavigate={navigateTo} />}
      <main className="flex-grow">
        {renderContent()}
      </main>
      {showHeaderAndFooter && <Footer />}
    </div>
  );
};

export default App;