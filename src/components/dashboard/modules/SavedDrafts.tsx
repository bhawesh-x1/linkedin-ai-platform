import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Bookmark, Calendar as CalendarIcon, Clock, Eye, Trash2, LayoutList, Calendar } from 'lucide-react';
import { DraftItem } from '../../../types';
import { ContentCalendarView } from '../ContentCalendarView';

export const SavedDrafts: React.FC = () => {
  const { drafts, deleteDraft, updateDraftStatus, setPreviewPost } = useApp();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Draft' | 'Scheduled' | 'Published'>('All');
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');

  const filteredDrafts = drafts.filter(
    d => filterStatus === 'All' || d.status === filterStatus
  );

  return (
    <div className="space-y-6">
      
      {/* View Switcher & Filter Header */}
      <Card padding="md" className="border border-borderLight dark:border-borderDark">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-indigo/10 text-brand-indigo">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-headingLight dark:text-headingDark">
                Saved Content & Planner
              </h3>
              <p className="text-xs text-bodyLight dark:text-bodyDark">
                Manage post drafts, scheduled publishing queues, and calendar views
              </p>
            </div>
          </div>

          {/* List vs Calendar View Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark text-xs">
              <button
                onClick={() => setViewType('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  viewType === 'list'
                    ? 'bg-brand-indigo text-white shadow-sm'
                    : 'text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" /> List View
              </button>
              <button
                onClick={() => setViewType('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  viewType === 'calendar'
                    ? 'bg-brand-indigo text-white shadow-sm'
                    : 'text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" /> Calendar View
              </button>
            </div>

            {viewType === 'list' && (
              <div className="flex items-center gap-1.5 text-xs">
                {(['All', 'Draft', 'Scheduled', 'Published'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                      filterStatus === st
                        ? 'bg-brand-indigo text-white border-brand-indigo shadow-md'
                        : 'border-borderLight dark:border-borderDark text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Render View Mode */}
      {viewType === 'calendar' ? (
        <ContentCalendarView drafts={drafts} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDrafts.length === 0 ? (
            <div className="col-span-2">
              <Card padding="lg" className="text-center py-16 text-xs text-bodyLight dark:text-bodyDark">
                No drafts found for status "{filterStatus}".
              </Card>
            </div>
          ) : (
            filteredDrafts.map((draft) => (
              <Card
                key={draft.id}
                hoverEffect
                padding="lg"
                className="border border-borderLight dark:border-borderDark space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <Badge
                      variant={
                        draft.status === 'Published'
                          ? 'success'
                          : draft.status === 'Scheduled'
                          ? 'warning'
                          : 'neutral'
                      }
                    >
                      {draft.status}
                    </Badge>

                    {draft.scheduledDate && (
                      <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {draft.scheduledDate}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-headingLight dark:text-headingDark">
                    {draft.topic}
                  </h4>

                  <p className="text-xs text-bodyLight dark:text-bodyDark line-clamp-3 leading-relaxed font-medium">
                    {draft.hook}
                  </p>
                </div>

                <div className="pt-3 border-t border-borderLight dark:border-borderDark flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPreviewPost(draft)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Preview
                    </Button>

                    <select
                      value={draft.status}
                      onChange={(e) => updateDraftStatus(draft.id, e.target.value as DraftItem['status'])}
                      className="px-2 py-1 rounded-lg border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark text-xs"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteDraft(draft.id)}
                    className="text-rose-500 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

    </div>
  );
};
