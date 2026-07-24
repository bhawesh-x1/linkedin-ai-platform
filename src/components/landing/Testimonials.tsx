import React from 'react';
import { Card } from '../ui/Card';
import { Star, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'VP of Marketing @ ScaleMetric',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      quote: 'LinkedIn AI completely transformed our executive team’s presence. In 60 days, our inbound demo requests grew by +420% directly from our CEO’s posts.',
      metric: '+420% Inbound Demos',
    },
    {
      name: 'David Chen',
      role: 'Founder & CEO @ NeuralFlow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      quote: 'The hook score analyzer alone is worth 10x the monthly price. It catches weak headlines before I hit publish. My average post reach went from 2k to 45k impressions.',
      metric: '45k Avg Impressions',
    },
    {
      name: 'Elena Rostova',
      role: 'Managing Partner @ Apex Ventures',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      quote: 'As a VC, I don’t have time to spend hours editing drafts. This platform learns my voice persona perfectly. It sounds 100% like me, but takes 3 minutes instead of an hour.',
      metric: 'Saved 8 Hours / Week',
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-brand-indigo uppercase tracking-widest">
            Wall of Love
          </h2>
          <p className="text-3xl font-extrabold text-headingLight dark:text-headingDark tracking-tight">
            Loved by 12,000+ top founders and leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Card key={i} hoverEffect padding="lg" className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-headingLight dark:text-headingDark leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-borderLight dark:border-borderDark flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover border border-borderLight dark:border-borderDark"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-headingLight dark:text-headingDark flex items-center gap-1">
                      {r.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-indigo inline" />
                    </h4>
                    <p className="text-xs text-bodyLight dark:text-bodyDark">{r.role}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                  {r.metric}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
