import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { OAuthTokenHealthStatus } from '../OAuthTokenHealthStatus';
import { exportSystemDatabase, importSystemDatabase } from '../../../services/dbBackupService';
import { User, Key, CheckCircle2, ShieldCheck, CreditCard, Save, Globe, RefreshCw, Download, Upload, Database } from 'lucide-react';

export const UserProfileSettings: React.FC = () => {
  const { userProfile, setUserProfile, brandPersona, setBrandPersona, generatedPosts, drafts, addToast, setIsOAuthOpen } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [role, setRole] = useState(userProfile.role);
  const [company, setCompany] = useState(userProfile.company);
  const [aiProvider, setAiProvider] = useState(userProfile.aiProvider);
  const [apiKey, setApiKey] = useState(userProfile.apiKey);

  const handleSaveProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      name,
      email,
      role,
      company,
      aiProvider: aiProvider as any,
      apiKey,
    }));
    addToast('Profile & API credentials saved!', 'success');
  };

  const handleExportDB = () => {
    exportSystemDatabase(userProfile, brandPersona, generatedPosts, drafts);
    addToast('Database backup file (.json) downloaded!', 'success');
  };

  const handleImportDB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importSystemDatabase(
      file,
      (data) => {
        setUserProfile(data.userProfile);
        setBrandPersona(data.brandPersona);
        addToast('Database restored successfully from backup file!', 'success');
      },
      (msg) => addToast(msg, 'error')
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Account Profile Column */}
      <div className="lg:col-span-7 space-y-6">
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark">
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
              <User className="w-4 h-4 text-brand-indigo" /> User Credentials
            </h3>
            <button onClick={() => setIsOAuthOpen(true)}>
              <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                {userProfile.linkedInConnected ? 'LinkedIn Connected' : 'Connect LinkedIn'}
              </Badge>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark">
            <div className="flex items-center gap-3">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-indigo shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-headingLight dark:text-headingDark">{userProfile.name}</h4>
                <p className="text-xs text-bodyLight dark:text-bodyDark">{userProfile.role} @ {userProfile.company}</p>
                <span className="text-[11px] text-brand-indigo font-semibold">{userProfile.linkedInHandle}</span>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsOAuthOpen(true)}
              leftIcon={<RefreshCw className="w-3.5 h-3.5 text-[#0A66C2]" />}
            >
              OAuth Settings
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Job Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
            </div>
          </div>

          <Button onClick={handleSaveProfile} rightIcon={<Save className="w-4 h-4" />} className="w-full py-3">
            Save Account Details
          </Button>

        </Card>

        {/* Database Export & Backup Manager */}
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-indigo" /> Centralized Database & Device Backup
            </h3>
            <Badge variant="primary">JSON Sync</Badge>
          </div>

          <p className="text-xs text-bodyLight leading-relaxed">
            Backup all generated history, drafts, custom voice personas, and credentials into an encrypted file to restore across computers or mobile browsers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button size="sm" onClick={handleExportDB} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Database (.json)
            </Button>
            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark hover:bg-bgLight text-xs font-semibold cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-brand-indigo" /> Restore Backup
              <input type="file" accept=".json" onChange={handleImportDB} className="hidden" />
            </label>
          </div>
        </Card>
      </div>

      {/* AI Provider & OAuth Health Monitor Column */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Token & Rate Limit Monitor Component */}
        <OAuthTokenHealthStatus />

        {/* AI Provider Card */}
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
              <Key className="w-4 h-4 text-brand-violet" /> AI Model Provider
            </h3>
            <Badge variant="primary">Active</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Model Infrastructure</label>
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              >
                <option>OpenAI (GPT-4o)</option>
                <option>Claude 3.5 Sonnet</option>
                <option>Custom API Key</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none font-mono"
              />
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
};
