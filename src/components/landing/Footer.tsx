import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const { setViewMode } = useApp();

  return (
    <footer className="bg-surfaceLight dark:bg-surfaceDark border-t border-borderLight dark:border-borderDark pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Pre-footer Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-16 text-center space-y-6 bg-gradient-to-br from-brand-indigo/10 via-brand-violet/5 to-transparent border border-brand-indigo/20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-indigo/10 text-brand-indigo text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Ready to elevate your LinkedIn presence?
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-headingLight dark:text-headingDark tracking-tight">
            Start generating high-converting LinkedIn posts today
          </h2>
          <p className="text-sm text-bodyLight dark:text-bodyDark max-w-xl mx-auto">
            Join over 12,000+ founders, venture capitalists, and leaders building their category authority on LinkedIn.
          </p>
          <div>
            <Button
              size="lg"
              onClick={() => setViewMode('dashboard')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              pill
            >
              Launch Dashboard Now
            </Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-borderLight dark:border-borderDark text-xs">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-indigo flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-headingLight dark:text-headingDark">
                LinkedIn<span className="text-brand-indigo">.AI</span>
              </span>
            </div>
            <p className="text-bodyLight dark:text-bodyDark leading-relaxed max-w-xs">
              Enterprise-grade AI SaaS platform for executive personal branding, viral hook scoring, and audience growth.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-headingLight dark:text-headingDark uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-bodyLight dark:text-bodyDark">
              <li><a href="#features" className="hover:text-brand-indigo">AI Generator</a></li>
              <li><a href="#showcase" className="hover:text-brand-indigo">Post Analyzer</a></li>
              <li><a href="#showcase" className="hover:text-brand-indigo">Rewrite Assistant</a></li>
              <li><a href="#pricing" className="hover:text-brand-indigo">Pricing Plans</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-headingLight dark:text-headingDark uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-bodyLight dark:text-bodyDark">
              <li><a href="#" className="hover:text-brand-indigo">LinkedIn Playbook 2026</a></li>
              <li><a href="#" className="hover:text-brand-indigo">Hook Score Index</a></li>
              <li><a href="#" className="hover:text-brand-indigo">Brand Voice Guide</a></li>
              <li><a href="#" className="hover:text-brand-indigo">API Documentation</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-headingLight dark:text-headingDark uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-bodyLight dark:text-bodyDark">
              <li><a href="#" className="hover:text-brand-indigo">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-indigo">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-indigo">Security & SOC2</a></li>
              <li><a href="#" className="hover:text-brand-indigo">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bodyLight dark:text-bodyDark">
          <p>© 2026 LinkedIn AI Platform. Built for Enterprise Brand Growth.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-brand-indigo" /> WCAG 2.1 AA Compliant
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
