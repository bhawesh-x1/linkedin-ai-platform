import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles, Gauge, RefreshCw, TrendingUp, Calendar, ShieldCheck } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-brand-indigo" />,
      title: 'Brand Voice Modeling Engine',
      description: 'Train custom AI personas on your tone, past posts, core pillars, and excluded buzzwords for 100% authentic writing.'
    },
    {
      icon: <Gauge className="w-6 h-6 text-brand-violet" />,
      title: 'Real-time Hook Optimization Score',
      description: 'Instantly evaluate your first 2 lines against millions of viral LinkedIn posts before publishing to maximize feed dwell time.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-brand-blue" />,
      title: 'Multi-Format Rewrite Assistant',
      description: 'Transform any raw paragraph into a storytelling post, bullet-point listicle, contrarian take, or slide carousel outline in 1 click.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      title: 'Algorithm Dwell-Time Predictor',
      description: 'Predict reach multipliers, engagement probability, and readability scores using machine learning insights.'
    },
    {
      icon: <Calendar className="w-6 h-6 text-amber-500" />,
      title: 'Smart Content Draft Scheduler',
      description: 'Organize drafts by topic, schedule posting queues, and simulate how posts look on desktop & mobile feeds.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      title: 'Enterprise Guardrails & Privacy',
      description: 'Zero training on private customer data. SOC2 compliant encryption with team approval workflows.'
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-brand-indigo uppercase tracking-widest">
            Enterprise Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-headingLight dark:text-headingDark tracking-tight">
            Everything you need to turn LinkedIn into an inbound growth channel
          </p>
          <p className="text-base text-bodyLight dark:text-bodyDark">
            Built for executives, founders, and creators who demand high-signal content without spending 10 hours a week writing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} hoverEffect padding="lg" className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-headingLight dark:text-headingDark">
                {f.title}
              </h3>
              <p className="text-sm text-bodyLight dark:text-bodyDark leading-relaxed">
                {f.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
