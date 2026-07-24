import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Sparkles, 
  Check, 
  User, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';

export const TopHeader: React.FC = () => {
  const { activeModule, setActiveModule, setViewMode, setIsCmdPaletteOpen, userProfile } = useApp();
  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const moduleTitles: Record<string, { title: string; desc: string }> = {
    generator: { title: 'AI LinkedIn Post Generator', desc: 'Craft high-converting, hook-optimized LinkedIn posts in seconds.' },
    analyzer: { title: 'AI Post Analyzer & Scoring', desc: 'Multi-metric post quality evaluation, hook strength, and readability tips.' },
    rewrite: { title: 'Multi-Format Rewrite Assistant', desc: 'Transform posts into Thought Leadership, Storytelling, or Listicles instantly.' },
    history: { title: 'Generation History', desc: 'Search and inspect all previously generated LinkedIn content.' },
    drafts: { title: 'Saved Drafts & Content Planner', desc: 'Manage draft status, schedule posts, and simulate feed rendering.' },
    analytics: { title: 'Analytics & Performance Dashboard', desc: 'Track reach trends, quality growth, and engagement metrics.' },
    'brand-voice': { title: 'Brand Voice & Persona Settings', desc: 'Model custom AI personas, excluded buzzwords, and tone parameters.' },
    settings: { title: 'Profile & Provider Settings', desc: 'Manage account credentials, LinkedIn connection, and AI API keys.' },
  };

  const currentInfo = moduleTitles[activeModule] || { title: 'Dashboard', desc: 'LinkedIn AI SaaS Platform' };

  return (
    <header className="sticky top-0 z-20 bg-bgLight/80 dark:bg-bgDark/80 backdrop-blur-xl border-b border-borderLight dark:border-borderDark px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
      
      {/* Left Title & Workspace Switcher */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-headingLight dark:text-headingDark tracking-tight flex items-center gap-2">
            {currentInfo.title}
          </h1>
          <p className="text-xs text-bodyLight dark:text-bodyDark hidden sm:block">
            {currentInfo.desc}
          </p>
        </div>

        {/* Multi-Account Agency Workspace Switcher */}
        <div className="hidden lg:block border-l border-borderLight dark:border-borderDark pl-4">
          <WorkspaceSwitcher />
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3">
        {/* Cmd + K Search Button */}
        <button
          onClick={() => setIsCmdPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-xs text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search or Jump...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark text-[10px] font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Return to Home Landing Page button for small screens */}
        <button
          onClick={() => setViewMode('landing')}
          className="sm:hidden p-2 rounded-xl border border-borderLight dark:border-borderDark text-bodyLight dark:text-bodyDark"
          title="Return to Landing Page"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-borderLight dark:border-borderDark hover:bg-surfaceLight dark:hover:bg-surfaceDark text-bodyLight dark:text-bodyDark transition-colors"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl border border-borderLight dark:border-borderDark hover:bg-surfaceLight dark:hover:bg-surfaceDark text-bodyLight dark:text-bodyDark transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-indigo animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-indigo" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 shadow-floating border border-borderLight dark:border-borderDark z-50 animate-fade-in space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
                <span className="text-xs font-bold text-headingLight dark:text-headingDark">Notifications</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-indigo/10 text-brand-indigo">
                  2 New
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark flex gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-headingLight dark:text-headingDark">GPT-4o Model Updated</p>
                    <p className="text-bodyLight dark:text-bodyDark text-[11px]">Hook score accuracy improved by 14%.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark flex gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-headingLight dark:text-headingDark">LinkedIn Connected</p>
                    <p className="text-bodyLight dark:text-bodyDark text-[11px]">OAuth token valid & rate limits healthy.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-surfaceLight dark:hover:bg-surfaceDark transition-colors"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover border border-borderLight dark:border-borderDark"
            />
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 shadow-floating border border-borderLight dark:border-borderDark z-50 animate-fade-in text-xs space-y-1">
              <div className="p-3 border-b border-borderLight dark:border-borderDark">
                <p className="font-bold text-headingLight dark:text-headingDark">{userProfile.name}</p>
                <p className="text-bodyLight dark:text-bodyDark text-[11px] truncate">{userProfile.email}</p>
              </div>
              <button
                onClick={() => { setActiveModule('settings'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surfaceLight dark:hover:bg-surfaceDark text-headingLight dark:text-headingDark"
              >
                <User className="w-3.5 h-3.5 text-brand-indigo" /> View Profile
              </button>
              <button
                onClick={() => { setActiveModule('brand-voice'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surfaceLight dark:hover:bg-surfaceDark text-headingLight dark:text-headingDark"
              >
                <Settings className="w-3.5 h-3.5 text-brand-violet" /> Brand Persona
              </button>
              <button
                onClick={() => setViewMode('landing')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-500 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" /> Return to Landing
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
