import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Sun, Moon, ArrowRight, UserCheck, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { setViewMode } = useApp();
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-6xl glass-nav rounded-2xl px-5 py-3 shadow-soft flex items-center justify-between">
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-blue flex items-center justify-center text-white shadow-md shadow-brand-indigo/30 group-hover:scale-105 transition-transform">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="font-extrabold text-base tracking-tight text-headingLight dark:text-headingDark">
            LinkedIn<span className="text-brand-indigo">.AI</span>
          </span>
          <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20 uppercase tracking-wider">
            Enterprise
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-7 text-sm font-medium text-bodyLight dark:text-bodyDark">
        <button onClick={() => scrollTo('features')} className="hover:text-brand-indigo transition-colors">
          Features
        </button>
        <button onClick={() => scrollTo('showcase')} className="hover:text-brand-indigo transition-colors">
          Showcase
        </button>
        <button onClick={() => scrollTo('testimonials')} className="hover:text-brand-indigo transition-colors">
          Wall of Love
        </button>
        <button onClick={() => scrollTo('pricing')} className="hover:text-brand-indigo transition-colors">
          Pricing
        </button>
        <button onClick={() => scrollTo('faq')} className="hover:text-brand-indigo transition-colors">
          FAQ
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-borderLight dark:border-borderDark hover:bg-surfaceLight dark:hover:bg-surfaceDark text-bodyLight dark:text-bodyDark transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Sign In Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode('auth')}
          leftIcon={<LogIn className="w-4 h-4 text-brand-indigo" />}
          className="hidden sm:flex"
        >
          Sign In
        </Button>

        {/* Go to App Dashboard CTA */}
        <Button
          onClick={() => setViewMode('dashboard')}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          pill
          size="sm"
        >
          <span className="hidden sm:inline">Launch App</span>
          <span className="sm:hidden">App</span>
        </Button>
      </div>
    </nav>
  );
};
