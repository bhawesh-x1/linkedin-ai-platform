import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Sparkles, Gauge, RefreshCw, BarChart3, CheckCircle2 } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'analyzer' | 'rewrite' | 'analytics'>('generator');

  return (
    <section id="showcase" className="py-20 md:py-28 bg-surfaceLight/40 dark:bg-surfaceDark/20 border-y border-borderLight dark:border-borderDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold text-brand-indigo uppercase tracking-widest">
            Interactive Product Showcase
          </h2>
          <p className="text-3xl font-extrabold text-headingLight dark:text-headingDark tracking-tight">
            See how the LinkedIn AI engine works
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { id: 'generator', label: '1. AI Generator', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'analyzer', label: '2. Post Analyzer', icon: <Gauge className="w-4 h-4" /> },
            { id: 'rewrite', label: '3. Rewrite Assistant', icon: <RefreshCw className="w-4 h-4" /> },
            { id: 'analytics', label: '4. Reach Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-indigo text-white shadow-lg shadow-brand-indigo/30'
                  : 'glass-panel text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Display Card */}
        <Card className="shadow-floating border border-borderLight dark:border-borderDark p-6 sm:p-10">
          {activeTab === 'generator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider">Module 01</span>
                <h3 className="text-2xl font-bold text-headingLight dark:text-headingDark">
                  Structured AI Generator
                </h3>
                <p className="text-sm text-bodyLight dark:text-bodyDark leading-relaxed">
                  Provide your core achievement or story. Select tone, target audience, and emoji level. The AI crafts a high-performing post broken into 4 modular cards.
                </p>
                <div className="space-y-2 text-xs font-medium text-headingLight dark:text-headingDark">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Instant Hook & Dwell Time Scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Automatic Hashtags & Call-to-Action Generation</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-5 rounded-2xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-3">
                <div className="p-4 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20">
                  <div className="text-xs font-bold text-brand-indigo mb-1">🪝 HOOK CARD</div>
                  <p className="text-sm font-semibold text-headingLight dark:text-headingDark">
                    "I spent 6 months analyzing 1,000 viral LinkedIn posts. Here are the 3 structural rules behind 90% of them:"
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark">
                  <div className="text-xs font-bold text-bodyLight dark:text-bodyDark mb-1">📝 BODY CARD</div>
                  <p className="text-sm text-bodyLight dark:text-bodyDark">
                    1. First line creates open curiosity loops.<br />
                    2. Single sentence paragraph spacing.<br />
                    3. Actionable takeaways over generic inspiration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analyzer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-brand-violet uppercase tracking-wider">Module 02</span>
                <h3 className="text-2xl font-bold text-headingLight dark:text-headingDark">
                  AI Post Analyzer & Scoring
                </h3>
                <p className="text-sm text-bodyLight dark:text-bodyDark leading-relaxed">
                  Never guess if a post will perform. Paste any draft and receive a multi-metric score breakdown with actionable line-by-line feedback.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 rounded-2xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-headingLight dark:text-headingDark">Post Quality Score</span>
                  <span className="text-2xl font-black text-emerald-500">94/100</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark">
                    <span className="text-bodyLight dark:text-bodyDark">Hook Impact</span>
                    <span className="block text-sm font-bold text-brand-indigo mt-0.5">98 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark">
                    <span className="text-bodyLight dark:text-bodyDark">Readability</span>
                    <span className="block text-sm font-bold text-emerald-500 mt-0.5">92 / 100</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewrite' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Module 03</span>
                <h3 className="text-2xl font-bold text-headingLight dark:text-headingDark">
                  Multi-Format Rewrite Assistant
                </h3>
                <p className="text-sm text-bodyLight dark:text-bodyDark leading-relaxed">
                  Instantly rewrite any post into Thought Leadership, Storytelling, Listicle, or Carousel format with 1 click.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark">
                  <span className="text-xs font-bold text-rose-500 uppercase">Original Draft</span>
                  <p className="text-xs text-bodyLight dark:text-bodyDark mt-2">
                    "We launched our AI product today and got 100 signups. We worked really hard on it."
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20">
                  <span className="text-xs font-bold text-brand-indigo uppercase">AI Storytelling Rewrite</span>
                  <p className="text-xs font-medium text-headingLight dark:text-headingDark mt-2">
                    "100 users in 24 hours. No paid ads. Here is what happened when we shipped our v1 AI engine..."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Module 04</span>
                <h3 className="text-2xl font-bold text-headingLight dark:text-headingDark">
                  Reach & Engagement Analytics
                </h3>
                <p className="text-sm text-bodyLight dark:text-bodyDark leading-relaxed">
                  Track impression growth, favorite performing tones, quality trends, and AI token usage in an intuitive visual dashboard.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 rounded-2xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark">
                    <span className="text-[11px] text-bodyLight dark:text-bodyDark">Impressions</span>
                    <span className="block text-base font-extrabold text-headingLight dark:text-headingDark">148.2K</span>
                  </div>
                  <div className="p-3 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark">
                    <span className="text-[11px] text-bodyLight dark:text-bodyDark">Engagements</span>
                    <span className="block text-base font-extrabold text-brand-indigo">12.4K</span>
                  </div>
                  <div className="p-3 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark">
                    <span className="text-[11px] text-bodyLight dark:text-bodyDark">Avg Score</span>
                    <span className="block text-base font-extrabold text-emerald-500">94/100</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
