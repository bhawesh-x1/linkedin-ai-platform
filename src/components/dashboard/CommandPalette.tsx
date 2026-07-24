import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { DashboardModule } from '../../types';
import { Search, PenTool, Gauge, RefreshCw, History, Bookmark, BarChart3, UserCheck, Settings, Sparkles } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isCmdPaletteOpen, setIsCmdPaletteOpen, setActiveModule } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(!isCmdPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCmdPaletteOpen, setIsCmdPaletteOpen]);

  if (!isCmdPaletteOpen) return null;

  const items: { id: DashboardModule; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'generator', label: 'AI Post Generator', desc: 'Create a new LinkedIn post with custom hook options', icon: <PenTool className="w-4 h-4 text-brand-indigo" /> },
    { id: 'analyzer', label: 'AI Post Analyzer', desc: 'Evaluate post quality score & dwell-time tips', icon: <Gauge className="w-4 h-4 text-brand-violet" /> },
    { id: 'rewrite', label: 'Rewrite Assistant', desc: 'Transform posts into Thought Leadership or Listicles', icon: <RefreshCw className="w-4 h-4 text-brand-blue" /> },
    { id: 'history', label: 'Generation History', desc: 'Browse previously generated LinkedIn content', icon: <History className="w-4 h-4 text-amber-500" /> },
    { id: 'drafts', label: 'Saved Drafts & Planner', desc: 'Inspect scheduled posts & feed simulator', icon: <Bookmark className="w-4 h-4 text-emerald-500" /> },
    { id: 'analytics', label: 'Analytics Dashboard', desc: 'View impression stats & top-performing tone charts', icon: <BarChart3 className="w-4 h-4 text-rose-500" /> },
    { id: 'brand-voice', label: 'Brand Voice Settings', desc: 'Configure voice persona, pillars & excluded words', icon: <UserCheck className="w-4 h-4 text-indigo-500" /> },
    { id: 'settings', label: 'Profile & API Keys', desc: 'Manage OpenAI API keys & LinkedIn connection', icon: <Settings className="w-4 h-4 text-slate-500" /> },
  ];

  const filtered = items.filter(
    i => i.label.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (id: DashboardModule) => {
    setActiveModule(id);
    setIsCmdPaletteOpen(false);
    setQuery('');
  };

  return (
    <Modal
      isOpen={isCmdPaletteOpen}
      onClose={() => setIsCmdPaletteOpen(false)}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark">
          <Search className="w-4 h-4 text-bodyLight dark:text-bodyDark shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to module..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-headingLight dark:text-headingDark placeholder:text-bodyLight dark:placeholder:text-bodyDark focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-bgLight dark:bg-bgDark text-[10px] font-mono border border-borderLight dark:border-borderDark">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-xs text-bodyLight dark:text-bodyDark">
              No matching modules found.
            </p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surfaceLight dark:hover:bg-surfaceDark transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-headingLight dark:text-headingDark group-hover:text-brand-indigo transition-colors truncate">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-bodyLight dark:text-bodyDark truncate">
                    {item.desc}
                  </p>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-bodyLight dark:text-bodyDark opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
