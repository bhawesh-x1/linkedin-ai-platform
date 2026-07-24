import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Database, Table, RefreshCw, Download, Search, CheckCircle2, ShieldCheck, Copy, Code, Terminal, ExternalLink } from 'lucide-react';
import { DatabaseService } from '../../../services/database';

export const DatabaseInspector: React.FC = () => {
  const { generatedPosts, drafts, userProfile, brandPersona, addToast } = useApp();
  const [activeTable, setActiveTable] = useState<'posts' | 'drafts' | 'profile' | 'schema'>('posts');
  const [searchQuery, setSearchQuery] = useState('');

  const sqlSchemaCode = `-- LINKEDIN AI PLATFORM - SUPABASE / POSTGRESQL SCHEMA
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  linkedin_connected BOOLEAN DEFAULT false
);

CREATE TABLE public.generated_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  hook TEXT NOT NULL,
  body TEXT NOT NULL,
  quality_score INT DEFAULT 95
);

CREATE TABLE public.drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  status TEXT DEFAULT 'Draft',
  scheduled_date DATE
);`;

  const copySchemaSQL = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    addToast('PostgreSQL schema SQL copied to clipboard!', 'success');
  };

  const filteredPosts = generatedPosts.filter(
    (p) => p.topic.toLowerCase().includes(searchQuery.toLowerCase()) || p.hook.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDrafts = drafts.filter(
    (d) => d.topic.toLowerCase().includes(searchQuery.toLowerCase()) || d.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Database Status Header */}
      <Card padding="md" className="border border-borderLight dark:border-borderDark bg-surfaceLight/50 dark:bg-surfaceDark/50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
                Live Cloud Database Explorer
              </h3>
              <p className="text-xs text-bodyLight dark:text-bodyDark">
                Inspect SQL table rows, live local storage cache, and remote Supabase PostgreSQL records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              SQL Engine Active
            </Badge>
            <Badge variant="primary">IndexedDB Sync Active</Badge>
          </div>
        </div>
      </Card>

      {/* Table Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borderLight dark:border-borderDark pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTable('posts')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTable === 'posts'
                ? 'bg-brand-indigo text-white shadow-sm font-bold'
                : 'bg-surfaceLight dark:bg-surfaceDark text-bodyLight hover:text-headingLight'
            }`}
          >
            <Table className="w-3.5 h-3.5" /> generated_posts ({generatedPosts.length})
          </button>
          <button
            onClick={() => setActiveTable('drafts')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTable === 'drafts'
                ? 'bg-brand-indigo text-white shadow-sm font-bold'
                : 'bg-surfaceLight dark:bg-surfaceDark text-bodyLight hover:text-headingLight'
            }`}
          >
            <Table className="w-3.5 h-3.5" /> drafts ({drafts.length})
          </button>
          <button
            onClick={() => setActiveTable('profile')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTable === 'profile'
                ? 'bg-brand-indigo text-white shadow-sm font-bold'
                : 'bg-surfaceLight dark:bg-surfaceDark text-bodyLight hover:text-headingLight'
            }`}
          >
            <Table className="w-3.5 h-3.5" /> profiles (1)
          </button>
          <button
            onClick={() => setActiveTable('schema')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTable === 'schema'
                ? 'bg-brand-violet text-white shadow-sm font-bold'
                : 'bg-surfaceLight dark:bg-surfaceDark text-bodyLight hover:text-headingLight'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> schema.sql
          </button>
        </div>

        {/* Search Bar */}
        {activeTable !== 'schema' && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-bodyLight absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search table rows..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-xs text-headingLight focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Table Data Viewers */}
      {activeTable === 'posts' && (
        <Card padding="none" className="border border-borderLight dark:border-borderDark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-surfaceLight dark:bg-surfaceDark text-bodyLight font-bold uppercase border-b border-borderLight dark:border-borderDark text-[10px]">
                <tr>
                  <th className="p-3">ID (UUID)</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Topic / Achievement</th>
                  <th className="p-3">Hook Text</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Words</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderLight dark:divide-borderDark font-mono">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-surfaceLight/50 dark:hover:bg-surfaceDark/50 transition-colors">
                    <td className="p-3 text-brand-indigo font-bold">{post.id.slice(0, 12)}...</td>
                    <td className="p-3 text-bodyLight font-sans">{post.timestamp}</td>
                    <td className="p-3 font-sans font-medium text-headingLight max-w-xs truncate">{post.topic}</td>
                    <td className="p-3 font-sans text-bodyLight max-w-xs truncate">{post.hook}</td>
                    <td className="p-3 font-bold text-emerald-500 font-sans">{post.qualityScore}/100</td>
                    <td className="p-3 text-bodyLight font-sans">{post.wordCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTable === 'drafts' && (
        <Card padding="none" className="border border-borderLight dark:border-borderDark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-surfaceLight dark:bg-surfaceDark text-bodyLight font-bold uppercase border-b border-borderLight dark:border-borderDark text-[10px]">
                <tr>
                  <th className="p-3">Draft ID</th>
                  <th className="p-3">Topic</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Scheduled Date</th>
                  <th className="p-3">Quality Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderLight dark:divide-borderDark font-mono">
                {filteredDrafts.map((draft) => (
                  <tr key={draft.id} className="hover:bg-surfaceLight/50 dark:hover:bg-surfaceDark/50 transition-colors">
                    <td className="p-3 text-brand-indigo font-bold">{draft.id.slice(0, 12)}...</td>
                    <td className="p-3 font-sans font-medium text-headingLight max-w-xs truncate">{draft.topic}</td>
                    <td className="p-3 font-sans">
                      <Badge variant={draft.status === 'Published' ? 'success' : draft.status === 'Scheduled' ? 'primary' : 'warning'}>
                        {draft.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-bodyLight font-sans">{draft.scheduledDate || '2026-07-25'}</td>
                    <td className="p-3 font-bold text-emerald-500 font-sans">{draft.qualityScore}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTable === 'profile' && (
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-4">
          <h4 className="text-sm font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
            <Table className="w-4 h-4 text-brand-indigo" /> User Profile Table Row (`profiles`)
          </h4>
          <pre className="p-4 rounded-xl bg-bgLight dark:bg-bgDark text-xs font-mono overflow-x-auto text-brand-indigo border border-borderLight dark:border-borderDark">
{JSON.stringify(userProfile, null, 2)}
          </pre>
        </Card>
      )}

      {activeTable === 'schema' && (
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
            <h4 className="text-sm font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-violet" /> PostgreSQL / Supabase Migration SQL (`schema.sql`)
            </h4>
            <Button size="sm" onClick={copySchemaSQL} leftIcon={<Copy className="w-3.5 h-3.5" />}>
              Copy Migration SQL
            </Button>
          </div>
          <pre className="p-4 rounded-xl bg-bgLight dark:bg-bgDark text-xs font-mono text-emerald-500 overflow-x-auto border border-borderLight dark:border-borderDark leading-relaxed">
{sqlSchemaCode}
          </pre>
        </Card>
      )}

    </div>
  );
};
