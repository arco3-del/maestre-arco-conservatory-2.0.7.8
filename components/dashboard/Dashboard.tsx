
import React from 'react';
import { DailyProgressPanel } from './DailyProgressPanel';
import { QuickAccessPanel } from './QuickAccessPanel';
import { TeacherMessages } from './TeacherMessages';
import { WeeklyAgenda } from './WeeklyAgenda';
import { AppState } from '../App';
import { HowItWorks } from '../HowItWorks';
import { Maestros } from '../Maestros';
import { Repository } from '../Repository';
import { Community } from '../Community';

interface DashboardProps {
    personalizedPlan: any;
    onNavigate: (state: AppState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ personalizedPlan, onNavigate }) => {
  const studentName = "Artist"; 

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Welcome back, {studentName}</h1>
        <p className="text-lg text-gray-400">This is your command center. Let's continue the journey!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DailyProgressPanel plan={personalizedPlan} />
          <QuickAccessPanel onNavigate={onNavigate} />
          <WeeklyAgenda />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <TeacherMessages />
        </div>
      </div>
      
      <div className="mt-16">
        <Maestros />
        <HowItWorks />
        <Repository />
        <Community />
      </div>

    </div>
  );
};
