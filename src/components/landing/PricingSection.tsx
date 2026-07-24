import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { setViewMode } = useApp();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for solo founders and professionals building their personal brand.',
      priceMonthly: 24,
      priceAnnual: 19,
      features: [
        '50 AI Generated Posts / month',
        'Basic Hook Strength Scoring',
        '1 Custom Voice Persona Profile',
        'Standard Generation Speed',
        'Export to TXT & Markdown',
      ],
      popular: false,
      buttonText: 'Get Started',
    },
    {
      name: 'Pro',
      description: 'Built for growth creators, executives, and high-frequency posters.',
      priceMonthly: 59,
      priceAnnual: 49,
      features: [
        'Unlimited AI Post Generation',
        'Real-time Multi-Metric Post Analyzer',
        '3 Brand Voice Personas (Tone Modeling)',
        'Multi-Format Rewrite Assistant',
        'Dwell-Time Reach Predictor',
        'LinkedIn Feed Live Simulator',
        'Saved Drafts & Content Scheduler',
      ],
      popular: true,
      buttonText: 'Start Pro Free Trial',
    },
    {
      name: 'Enterprise',
      description: 'For executive teams, marketing agencies, and venture funds.',
      priceMonthly: 239,
      priceAnnual: 199,
      features: [
        'Everything in Pro',
        'Unlimited Brand Voice Profiles',
        'Dedicated GPT-4o Custom Fine-tuning',
        'Team Collaboration & Approvals',
        'Custom Excluded Word Guardrails',
        'Dedicated Account Manager',
        'SOC2 & HIPAA Compliance Guarantee',
      ],
      popular: false,
      buttonText: 'Contact Enterprise',
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-surfaceLight/50 dark:bg-surfaceDark/30 border-t border-borderLight dark:border-borderDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold text-brand-indigo uppercase tracking-widest">
            Transparent Pricing
          </h2>
          <p className="text-3xl font-extrabold text-headingLight dark:text-headingDark tracking-tight">
            Invest in your personal brand equity
          </p>

          {/* Billing Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-headingLight dark:text-headingDark font-bold' : 'text-bodyLight dark:text-bodyDark'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 rounded-full bg-brand-indigo/20 p-1 transition-colors"
            >
              <div
                className={`w-4 h-4 rounded-full bg-brand-indigo transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? 'text-headingLight dark:text-headingDark font-bold' : 'text-bodyLight dark:text-bodyDark'}`}>
              Annual
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <Card
              key={i}
              hoverEffect
              padding="lg"
              className={`relative flex flex-col justify-between ${
                p.popular ? 'border-2 border-brand-indigo shadow-floating' : ''
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-indigo text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular Tier
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-headingLight dark:text-headingDark">
                    {p.name}
                  </h3>
                  <p className="text-xs text-bodyLight dark:text-bodyDark mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-headingLight dark:text-headingDark">
                    ${isAnnual ? p.priceAnnual : p.priceMonthly}
                  </span>
                  <span className="text-xs font-semibold text-bodyLight dark:text-bodyDark">
                    / month
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2.5 pt-4 border-t border-borderLight dark:border-borderDark">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-headingLight dark:text-headingDark">
                      <div className="w-4 h-4 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant={p.popular ? 'primary' : 'outline'}
                  onClick={() => setViewMode('dashboard')}
                  className="w-full"
                >
                  {p.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
