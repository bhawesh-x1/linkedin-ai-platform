import React from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardModule } from '../../types';
import { 
  Sparkles, 
  SearchCheck, 
  Wand2, 
  History, 
  FolderKanban, 
  BarChart3, 
  UserCheck, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sliders,
  Check
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, setViewMode, userProfile, isSimpleMode, setIsSimpleMode } = useApp();

  const simpleNavItems: Array<{ id: DashboardModule; label: string; icon: React.ReactNode }> = [
    { id: 'generator', label: '✍️ Create & Write', icon: <Sparkles className="w-4 h-4 text-brand-indigo" /> },
    { id: 'analyzer', label: '🔍 Check Quality', icon: <SearchCheck className="w-4 h-4 text-brand-blue" /> },
    { id: 'drafts', label: '📅 Saved Calendar', icon: <FolderKanban className="w-4 h-4 text-emerald-500" /> },
  ];

  const advancedNavItems: Array<{ id: DashboardModule; label: string; icon: React.ReactNode }> = [
    { id: 'generator', label: 'AI Post Generator', icon: <Sparkles className="w-4 h-4 text-brand-indigo" /> },
    { id: 'analyzer', label: 'AI Post Analyzer', icon: <SearchCheck className="w-4 h-4 text-brand-blue" /> },
    { id: 'rewrite', label: 'Rewrite Assistant', icon: <Wand2 className="w-4 h-4 text-brand-violet" /> },
    { id: 'history', label: 'Generation History', icon: <History className="w-4 h-4 text-amber-500" /> },
    { id: 'drafts', label: 'Saved Drafts & Planner', icon: <FolderKanban className="w-4 h-4 text-emerald-500" /> },
    { id: 'analytics', label: 'Analytics Dashboard', icon: <BarChart3 className="w-4 h-4 text-rose-500" /> },
    { id: 'brand-voice', label: 'Brand Voice Persona', icon: <UserCheck className="w-4 h-4 text-indigo-400" /> },
    { id: 'settings', label: 'Profile & Settings', icon: <Settings className="w-4 h-4 text-slate-400" /> },
  ];

  const navItems = isSimpleMode ? simpleNavItems : advancedNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-borderLight dark:border-borderDark bg-surfaceLight/50 dark:bg-surfaceDark/50 backdrop-blur-xl p-4 justify-between h-screen sticky top-0 z-30 transition-all">
      
      <div className="space-y-6">
        
        {/* Brand Logo Header */}
        <div 
          className="flex items-center justify-between cursor-pointer px-2 py-1"
          onClick={() => setViewMode('landing')}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-blue flex items-center justify-center text-white shadow-md shadow-brand-indigo/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-black text-base tracking-tight text-headingLight dark:text-headingDark">
                LinkedIn<span className="text-brand-indigo">.AI</span>
              </span>
              <span className="block text-[10px] font-semibold text-bodyLight">
                {isSimpleMode ? 'Simple Mode' : 'Enterprise Power'}
              </span>
            </div>
          </div>
        </div>

        {/* Simple Mode / Advanced Mode Switcher Toggle */}
        <div className="p-1 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark flex items-center justify-between text-xs font-semibold">
          <button
            onClick={() => setIsSimpleMode(true)}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              isSimpleMode
                ? 'bg-brand-indigo text-white shadow-sm'
                : 'text-bodyLight hover:text-headingLight'
            }`}
          >
            Simple Mode
          </button>
          <button
            onClick={() => setIsSimpleMode(false)}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              !isSimpleMode
                ? 'bg-brand-indigo text-white shadow-sm'
                : 'text-bodyLight hover:text-headingLight'
            }`}
          >
            Advanced
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-brand-indigo text-white shadow-md shadow-brand-indigo/20'
                    : 'text-bodyLight dark:text-bodyDark hover:bg-surfaceLight dark:hover:bg-surfaceDark hover:text-headingLight dark:hover:text-headingDark'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      {/* User Profile Footer */}
      <div className="pt-4 border-t border-borderLight dark:border-borderDark space-y-3">
        <div className="flex items-center gap-3 px-2">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-8 h-8 rounded-full object-cover border border-brand-indigo"
          />
          <div className="truncate">
            <p className="font-bold text-xs text-headingLight dark:text-headingDark truncate">{userProfile.name}</p>
            <p className="text-[10px] text-bodyLight truncate">{userProfile.linkedInHandle}</p>
          </div>
        </div>

        <button
          onClick={() => setViewMode('landing')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-bodyLight hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Return to Landing
        </button>
      </div>

    </aside>
  );
};
