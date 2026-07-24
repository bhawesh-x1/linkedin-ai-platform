import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, ChevronDown, Check, Plus, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface Workspace {
  id: string;
  name: string;
  role: 'Owner' | 'Admin' | 'Writer' | 'Approver';
  membersCount: number;
  activeHandle: string;
}

export const INITIAL_WORKSPACES: Workspace[] = [
  { id: 'ws-1', name: 'Personal Executive Brand', role: 'Owner', membersCount: 1, activeHandle: 'alexmorgan-ai' },
  { id: 'ws-2', name: 'ScaleMetric GTM Team', role: 'Admin', membersCount: 6, activeHandle: 'scalemetric-corp' },
  { id: 'ws-3', name: 'Apex VC Portfolio Fund', role: 'Approver', membersCount: 14, activeHandle: 'apex-ventures' },
];

export const WorkspaceSwitcher: React.FC = () => {
  const { addToast } = useApp();
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [currentWs, setCurrentWs] = useState<Workspace>(INITIAL_WORKSPACES[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (ws: Workspace) => {
    setCurrentWs(ws);
    setIsOpen(false);
    addToast(`Switched workspace to: ${ws.name} (${ws.role})`, 'info');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark hover:bg-bgLight dark:hover:bg-bgDark text-xs font-semibold text-headingLight dark:text-headingDark transition-all"
      >
        <Building2 className="w-3.5 h-3.5 text-brand-indigo shrink-0" />
        <span className="truncate max-w-[120px] sm:max-w-[160px]">{currentWs.name}</span>
        <Badge variant="primary" size="sm">{currentWs.role}</Badge>
        <ChevronDown className="w-3.5 h-3.5 text-bodyLight" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 glass-panel rounded-2xl p-2 shadow-floating border border-borderLight dark:border-borderDark z-50 animate-fade-in text-xs space-y-1">
          <div className="px-3 py-2 border-b border-borderLight dark:border-borderDark text-[11px] font-bold text-bodyLight uppercase tracking-wider">
            Switch Agency Workspace
          </div>
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => handleSelect(ws)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surfaceLight dark:hover:bg-surfaceDark text-left transition-colors"
            >
              <div className="truncate">
                <p className="font-bold text-headingLight dark:text-headingDark truncate">{ws.name}</p>
                <p className="text-[11px] text-bodyLight truncate">{ws.activeHandle} • {ws.membersCount} members</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge variant={ws.id === currentWs.id ? 'primary' : 'neutral'} size="sm">
                  {ws.role}
                </Badge>
                {ws.id === currentWs.id && <Check className="w-4 h-4 text-emerald-500" />}
              </div>
            </button>
          ))}
          <button
            onClick={() => { setIsOpen(false); addToast('Agency Team Workspace invite dialog opened', 'info'); }}
            className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl text-brand-indigo font-bold hover:bg-brand-indigo/10 transition-colors pt-2 border-t border-borderLight dark:border-borderDark"
          >
            <Plus className="w-3.5 h-3.5" /> Create Agency Workspace
          </button>
        </div>
      )}
    </div>
  );
};
