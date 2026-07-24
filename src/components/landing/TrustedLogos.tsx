import React from 'react';

export const TrustedLogos: React.FC = () => {
  const logos = [
    'Vercel', 'Linear', 'Supabase', 'Stripe', 'Notion', 'Scale', 'Ramp'
  ];

  return (
    <div className="py-12 border-y border-borderLight dark:border-borderDark/60 bg-surfaceLight/50 dark:bg-surfaceDark/30">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-xs font-semibold text-bodyLight dark:text-bodyDark uppercase tracking-widest mb-6">
          Trusted by founders & executives from world-class teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo, i) => (
            <div key={i} className="text-lg font-bold tracking-tight text-headingLight dark:text-headingDark hover:text-brand-indigo transition-colors cursor-pointer">
              {logo}<span className="text-brand-indigo">.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
