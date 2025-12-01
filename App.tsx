
import React, { useState } from 'react';
import { UserRole, ViewState, Language } from './types';
import Navbar from './components/Navbar';
import Home from './views/Home';
import PlatformIntro from './views/PlatformIntro';
import AICompanion from './views/AICompanion';
import SkillAnalysis from './views/SkillAnalysis';
import LearningAnalysis from './views/LearningAnalysis';
import ProcessData from './views/ProcessData';
import { TEXT } from './constants';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.VISITOR);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('zh');

  const t = TEXT[language];

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentView(ViewState.HOME);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar 
        currentRole={currentRole}
        currentView={currentView}
        isMobileMenuOpen={isMobileMenuOpen}
        language={language}
        onViewChange={setCurrentView}
        onRoleChange={handleRoleChange}
        onLanguageChange={setLanguage}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <main className="flex-1">
        {currentView === ViewState.HOME && (
          <Home language={language} currentRole={currentRole} onRoleChange={handleRoleChange} />
        )}
        {currentView === ViewState.PLATFORM_INTRO && (
          <PlatformIntro language={language} />
        )}
        {currentView === ViewState.AI_COMPANION && (
          <AICompanion language={language} />
        )}
        {currentView === ViewState.SKILL_ANALYSIS && (
          <SkillAnalysis language={language} currentRole={currentRole} />
        )}
        {currentView === ViewState.LEARNING_ANALYSIS && (
          <LearningAnalysis language={language} currentRole={currentRole} />
        )}
        {currentView === ViewState.PROCESS_DATA && (
          <ProcessData language={language} />
        )}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>{t.app.footer}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
