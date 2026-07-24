import React from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardModule } from '../../types';
import { PenTool, Gauge, RefreshCw, History, Bookmark, BarChart3, Settings } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeModule, setActiveModule } = useApp();

  const items: { id: DashboardModule; label: string; icon: React.ReactNode }[] = [
    { id: 'generator', label: 'Generator', icon: <PenTool className="w-5 h-5" /> },
    { id: 'analyzer', label: 'Analyzer', icon: <Gauge className="w-5 h-5" /> },
    { id: 'rewrite', label: 'Rewrite', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'drafts', label: 'Drafts', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-borderLight dark:border-borderDark px-2 py-2 flex items-center justify-around">
      {items.map((item) => {
        const isActive = activeModule === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-brand-indigo font-bold scale-105'
                : 'text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark'
            }`}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
