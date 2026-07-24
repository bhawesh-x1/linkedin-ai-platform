import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkles, ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, Github, Globe } from 'lucide-react';

interface AuthPageProps {
  onSuccess?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const { setViewMode, setUserProfile, addToast, setIsOAuthOpen } = useApp();
  
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('alex.morgan@enterprise.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Alex Morgan');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter an email address', 'warning');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setUserProfile(prev => ({
        ...prev,
        email,
        name: fullName || 'Alex Morgan',
      }));
      setViewMode('dashboard');
      addToast(`Welcome back, ${fullName || 'Alex'}! Logged in successfully.`, 'success');
      if (onSuccess) onSuccess();
    }, 1000);
  };

  const handleLinkedInAuth = () => {
    setIsOAuthOpen(true);
    setViewMode('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-bgLight dark:bg-bgDark text-headingLight dark:text-headingDark relative overflow-hidden">
      
      {/* Radial Background Glows */}
      <div className="ambient-glow top-0 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bottom-0 right-10" />

      <div className="w-full max-w-md relative z-10 space-y-6 animate-fade-in">
        
        {/* Brand Header */}
        <div 
          className="text-center space-y-2 cursor-pointer"
          onClick={() => setViewMode('landing')}
        >
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-indigo/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-headingLight dark:text-headingDark">
            LinkedIn<span className="text-brand-indigo">.AI</span>
          </h1>
          <p className="text-xs text-bodyLight dark:text-bodyDark">
            Enterprise Personal Branding & Automated Content Platform
          </p>
        </div>

        {/* Auth Card Container */}
        <Card padding="lg" className="shadow-floating border border-borderLight dark:border-borderDark space-y-5 backdrop-blur-2xl">
          
          {/* Top Auth Mode Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark text-xs font-semibold">
            <button
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'signin'
                  ? 'bg-brand-indigo text-white shadow-sm'
                  : 'text-bodyLight hover:text-headingLight dark:hover:text-headingDark'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'signup'
                  ? 'bg-brand-indigo text-white shadow-sm'
                  : 'text-bodyLight hover:text-headingLight dark:hover:text-headingDark'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social OAuth Buttons */}
          <div className="space-y-2.5">
            
            {/* LinkedIn 1-Click OAuth Sign-In Button */}
            <button
              onClick={handleLinkedInAuth}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-xs shadow-md shadow-[#0A66C2]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="w-5 h-5 rounded bg-white text-[#0A66C2] flex items-center justify-center font-bold text-xs">
                in
              </div>
              <span>Continue with LinkedIn OAuth 2.0</span>
            </button>

            {/* Google OAuth Button */}
            <button
              onClick={() => { setViewMode('dashboard'); addToast('Signed in with Google!', 'success'); }}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark hover:bg-bgLight dark:hover:bg-bgDark text-headingLight dark:text-headingDark font-semibold text-xs transition-all"
            >
              <Globe className="w-4 h-4 text-rose-500" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-borderLight dark:border-borderDark" />
            <span className="absolute bg-surfaceLight dark:bg-surfaceDark px-3 text-[10px] uppercase font-bold text-bodyLight tracking-wider">
              Or continue with email
            </span>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5 text-xs">
            
            {authMode === 'signup' && (
              <div className="space-y-1">
                <label className="font-semibold text-headingLight dark:text-headingDark">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-bodyLight absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-headingLight dark:text-headingDark">Password</label>
                {authMode === 'signin' && (
                  <button type="button" className="text-[11px] font-bold text-brand-indigo hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-bodyLight absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-bodyLight dark:text-bodyDark">
              <input type="checkbox" id="remember" defaultChecked className="rounded accent-brand-indigo" />
              <label htmlFor="remember">Remember login session on this device</label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full py-3 text-xs font-bold mt-2"
            >
              {authMode === 'signin' ? 'Sign In to Platform' : 'Create Free Enterprise Account'}
            </Button>
          </form>

          {/* Bottom Security Footer */}
          <div className="pt-3 border-t border-borderLight dark:border-borderDark flex items-center justify-between text-[10px] text-bodyLight dark:text-bodyDark">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SOC2 Type II Certified
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-brand-indigo" /> 256-bit SSL Encrypted
            </span>
          </div>

        </Card>

        {/* Back to Home Link */}
        <div className="text-center">
          <button
            onClick={() => setViewMode('landing')}
            className="text-xs font-semibold text-bodyLight dark:text-bodyDark hover:text-brand-indigo transition-colors"
          >
            ← Return to Landing Page
          </button>
        </div>

      </div>
    </div>
  );
};
