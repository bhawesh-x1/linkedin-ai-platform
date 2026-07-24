import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Brand Voice Modeling work?',
      a: 'We analyze your target audience, core pillars, past writing style, and tone preferences to generate content that captures your distinct cadence and personality while omitting robotic AI buzzwords.'
    },
    {
      q: 'Will LinkedIn penalize AI-generated posts?',
      a: 'LinkedIn algorithms prioritize dwell time, high comment velocity, and formatting readability. Our engine structures content specifically to optimize dwell time with short line lengths, compelling hooks, and genuine questions.'
    },
    {
      q: 'Can I bring my own OpenAI / Claude API keys?',
      a: 'Yes! Pro and Enterprise users can either use our managed high-speed AI infrastructure or plug in their custom API key in the Settings panel.'
    },
    {
      q: 'Is my company data and content kept private?',
      a: 'Absolutely. We enforce zero data-retention rules with underlying LLM providers. Your raw company data, drafts, and strategies are never used to train global public models.'
    },
    {
      q: 'Can I preview how posts look before publishing?',
      a: 'Yes, our built-in LinkedIn Feed Simulator displays an exact pixel-matched preview of how your post will render on desktop and mobile LinkedIn feeds.'
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold text-brand-indigo uppercase tracking-widest">
            Frequently Asked Questions
          </h2>
          <p className="text-3xl font-extrabold text-headingLight dark:text-headingDark tracking-tight">
            Everything you need to know
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={idx}
                padding="md"
                className="cursor-pointer transition-all border border-borderLight dark:border-borderDark"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-headingLight dark:text-headingDark">
                    {faq.q}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-bodyLight dark:text-bodyDark transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-indigo' : ''}`} />
                </div>
                {isOpen && (
                  <p className="mt-3 pt-3 border-t border-borderLight dark:border-borderDark/60 text-sm text-bodyLight dark:text-bodyDark leading-relaxed animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
