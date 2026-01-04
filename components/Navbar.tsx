
import React from 'react';
import { Brain, Globe, Users, Menu, X } from 'lucide-react';
import { UserRole, ViewState, Language } from '../types';
import { TEXT } from '../constants';

interface NavbarProps {
  currentRole: UserRole;
  currentView: ViewState;
  isMobileMenuOpen: boolean;
  language: Language;
  onViewChange: (view: ViewState) => void;
  onRoleChange: (role: UserRole) => void;
  onLanguageChange: (lang: Language) => void;
  onMobileMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentView,
  isMobileMenuOpen,
  language,
  onViewChange,
  onRoleChange,
  onLanguageChange,
  onMobileMenuToggle
}) => {
  const t = TEXT[language];

  const getNavItems = () => {
    const common = [{ label: t.nav.home, view: ViewState.HOME }];
    
    switch (currentRole) {
      case UserRole.VISITOR:
        return common;
      case UserRole.STUDENT:
        return [
          ...common,
          { label: t.nav.companion, view: ViewState.AI_COMPANION },
          { label: t.nav.skill, view: ViewState.SKILL_ANALYSIS },
        ];
      case UserRole.TEACHER:
        return [
          ...common,
          { label: t.nav.companion, view: ViewState.AI_COMPANION },
          { label: t.nav.skill, view: ViewState.SKILL_ANALYSIS },
          { label: t.nav.learning, view: ViewState.LEARNING_ANALYSIS },
        ];
      case UserRole.ADMIN:
        return [
          ...common,
          { label: t.nav.companion, view: ViewState.AI_COMPANION },
          { label: t.nav.skill, view: ViewState.SKILL_ANALYSIS },
          { label: t.nav.learning, view: ViewState.LEARNING_ANALYSIS },
          { label: t.nav.process, view: ViewState.PROCESS_DATA },
        ];
      default:
        return common;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange(ViewState.HOME)}>
            <div className="bg-teal-600 p-2 rounded-lg text-white shadow-lg shadow-teal-200">
              <Brain size={24} />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">{t.app.title}</h1>
              <p className="text-xs text-slate-500 font-medium">{t.app.subtitle}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => onViewChange(item.view)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  currentView === item.view 
                    ? 'bg-teal-50 text-teal-700 font-bold' 
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onLanguageChange(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1 text-slate-600 hover:text-teal-600 px-2 py-1 rounded transition-colors"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中'}</span>
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors border border-slate-200">
                <Users size={16} />
                {t.roles[currentRole]}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                {Object.values(UserRole).map(role => (
                  <button
                    key={role}
                    onClick={() => onRoleChange(role)}
                    className={`block w-full text-left px-4 py-3 text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg ${
                      currentRole === role ? 'text-teal-600 font-bold bg-teal-50' : 'text-slate-600'
                    }`}
                  >
                    {t.roles[role]}
                  </button>
                ))}
              </div>
            </div>
            
            <button className="md:hidden p-2 text-slate-600" onClick={onMobileMenuToggle}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  onViewChange(item.view);
                  onMobileMenuToggle();
                }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentView === item.view ? 'bg-teal-50 text-teal-700' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
