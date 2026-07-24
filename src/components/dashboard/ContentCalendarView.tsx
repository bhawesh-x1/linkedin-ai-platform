import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DraftItem } from '../../types';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ContentCalendarViewProps {
  drafts: DraftItem[];
}

export const ContentCalendarView: React.FC<ContentCalendarViewProps> = ({ drafts }) => {
  const { setPreviewPost } = useApp();

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Simulated July 2026 Calendar Grid Days (1 to 31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Map drafts to specific calendar days
  const getDraftsForDay = (day: number) => {
    if (day === 12) return [drafts[0]];
    if (day === 15) return [drafts[1]];
    if (day === 24) return [{ ...drafts[0], id: 'cal-3', topic: 'AI Moat Breakdown', status: 'Scheduled' as const }];
    if (day === 28) return [{ ...drafts[0], id: 'cal-4', topic: 'Hiring Playbook v2', status: 'Draft' as const }];
    return [];
  };

  return (
    <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-6">
      
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-borderLight dark:border-borderDark">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-indigo/10 text-brand-indigo">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark">
              LinkedIn Content Publishing Schedule
            </h3>
            <p className="text-xs text-bodyLight dark:text-bodyDark">July 2026 • 4 Scheduled Posts</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <button className="p-1.5 rounded-lg border border-borderLight dark:border-borderDark hover:bg-surfaceLight dark:hover:bg-surfaceDark text-bodyLight dark:text-bodyDark">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 rounded-lg bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark">
            July 2026
          </span>
          <button className="p-1.5 rounded-lg border border-borderLight dark:border-borderDark hover:bg-surfaceLight dark:hover:bg-surfaceDark text-bodyLight dark:text-bodyDark">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-bodyLight dark:text-bodyDark uppercase tracking-wider pb-2 border-b border-borderLight dark:border-borderDark/60">
        {daysOfWeek.map(day => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      {/* 31 Calendar Grid Cells */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map(day => {
          const dayDrafts = getDraftsForDay(day);
          const isToday = day === 24;

          return (
            <div
              key={day}
              className={`min-h-[90px] p-2 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                isToday
                  ? 'border-brand-indigo bg-brand-indigo/5 shadow-soft'
                  : 'border-borderLight/60 dark:border-borderDark/60 bg-surfaceLight/50 dark:bg-surfaceDark/30 hover:border-brand-indigo/40'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className={isToday ? 'text-brand-indigo' : 'text-headingLight dark:text-headingDark'}>
                  {day}
                </span>
                {isToday && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-brand-indigo text-white uppercase">
                    Today
                  </span>
                )}
              </div>

              {/* Scheduled Posts Pills */}
              <div className="space-y-1 mt-1">
                {dayDrafts.map((d, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPreviewPost(d as any)}
                    className={`p-1.5 rounded-lg text-[10px] font-bold truncate cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
                      d.status === 'Published'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : d.status === 'Scheduled'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-brand-indigo/15 text-brand-indigo border border-brand-indigo/20'
                    }`}
                    title={d.topic}
                  >
                    🕒 {d.topic.slice(0, 18)}...
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </Card>
  );
};
