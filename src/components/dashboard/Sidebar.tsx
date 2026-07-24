import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardModule } from '../../types';
import { 
  Sparkles, 
  PenTool, 
  Gauge, 
  RefreshCw, 
  History, 
  Bookmark, 
  BarChart3, 
  UserCheck, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpRight,
  Home
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, setViewMode, userProfile } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const modules: { id: DashboardModule; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'generator', label: 'AI Post Generator', icon: <PenTool className="w-4 h-4" />, badge: 'AI' },
    { id: 'analyzer', label: 'AI Post Analyzer', icon: <Gauge className="w-4 h-4" /> },
    { id: 'rewrite', label: 'Rewrite Assistant', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'history', label: 'Generation History', icon: <History className="w-4 h-4" /> },
    { id: 'drafts', label: 'Saved Drafts', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'brand-voice', label: 'Brand Voice Persona', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'settings', label: 'Profile & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between h-screen sticky top-0 bg-surfaceLight dark:bg-surfaceDark border-r border-borderLight dark:border-borderDark transition-all duration-300 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header / Brand Logo */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-borderLight dark:border-borderDark">
          {!collapsed ? (
            <div 
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setViewMode('landing')}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-blue flex items-center justify-center text-white shadow-md shadow-brand-indigo/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-headingLight dark:text-headingDark">
                LinkedIn<span className="text-brand-indigo">.AI</span>
              </span>
            </div>
          ) : (
            <div 
              className="w-8 h-8 mx-auto rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet flex items-center justify-center text-white shadow-md"
              onClick={() => setViewMode('landing')}
            >
              <Sparkles className="w-4 h-4" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg border border-borderLight dark:border-borderDark hover:bg-bgLight dark:hover:bg-bgDark text-bodyLight dark:text-bodyDark transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Return to Landing Page Quick Link */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setViewMode('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark hover:bg-bgLight dark:hover:bg-bgDark transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Home className="w-4 h-4 text-brand-indigo" />
            {!collapsed && <span>Return to Home</span>}
          </button>
        </div>

        {/* Navigation Modules */}
        <nav className="p-3 space-y-1 mt-2">
          {modules.map((m) => {
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-brand-indigo text-white shadow-md shadow-brand-indigo/30 font-semibold'
                    : 'text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark hover:bg-bgLight dark:hover:bg-bgDark'
                }`}
                title={collapsed ? m.label : undefined}
              >
                <span className={isActive ? 'text-white' : 'text-bodyLight dark:text-bodyDark'}>
                  {m.icon}
                </span>
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="truncate">{m.label}</span>
                    {m.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-indigo/20 text-brand-indigo dark:text-brand-blue uppercase">
                        {m.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Quota Bar */}
      <div className="p-4 border-t border-borderLight dark:border-borderDark space-y-3">
        {!collapsed && (
          <div className="p-3.5 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-bodyLight dark:text-bodyDark">AI Tokens</span>
              <span className="text-brand-indigo font-bold">
                {userProfile.tokensUsed.toLocaleString()} / {userProfile.tokensTotal.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-surfaceLight dark:bg-surfaceDark overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-indigo to-brand-violet transition-all"
                style={{ width: `${(userProfile.tokensUsed / userProfile.tokensTotal) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setActiveModule('settings')}
              className="w-full flex items-center justify-center gap-1 text-[11px] font-bold text-brand-indigo hover:underline pt-1"
            >
              Upgrade Token Quota <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* User Card */}
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-bgLight dark:hover:bg-bgDark transition-colors cursor-pointer ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-9 h-9 rounded-full object-cover border border-borderLight dark:border-borderDark shrink-0"
          />
          {!collapsed && (
            <div className="truncate">
              <h4 className="text-xs font-bold text-headingLight dark:text-headingDark truncate">
                {userProfile.name}
              </h4>
              <p className="text-[11px] text-bodyLight dark:text-bodyDark truncate">
                {userProfile.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
