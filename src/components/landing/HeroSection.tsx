import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle2, Copy, Zap, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export const HeroSection: React.FC = () => {
  const { setViewMode, addToast } = useApp();
  
  // Interactive Live Mini Demo State inside Hero
  const [heroTopic, setHeroTopic] = useState('Scaled SaaS ARR from $0 to $1M in 9 months');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<{
    hook: string;
    body: string;
    cta: string;
    hashtags: string;
  } | null>({
    hook: '9 months ago, we launched with 0 customers and $0 in revenue.\nToday we crossed $1,000,000 ARR with 0 dollars spent on paid ads.\n\nHere is the 4-step LinkedIn engine we used:',
    body: '1. Document, don\'t create.\nEvery customer call contained gold. We transcribed objections and posted solutions publically.\n\n2. The 80/20 Hook Rule.\nWe spent 30 minutes crafting the first 2 lines for every 5 minutes spent writing the body.',
    cta: 'Want our exact 1-page LinkedIn Content Matrix?\nDrop a comment "MATRIX" below and I\'ll DM it over.',
    hashtags: '#SaaSGrowth #Bootstrapping #AIStartups #PersonalBranding'
  });

  const handleHeroGenerate = () => {
    setIsGenerating(true);
    setGeneratedOutput(null);
    setTimeout(() => {
      setGeneratedOutput({
        hook: `I spent 6 months studying top 1% LinkedIn creators.\nHere is what separates posts that get 500k impressions from posts that get 5 likes:`,
        body: `1. They don't pitch. They educate.\n2. The first line acts like a magnetic pull.\n3. Paragraphs are 1-2 sentences maximum for effortless scrolling.\n4. Strong opinions provoke thoughtful discussions.`,
        cta: `Which creator rule resonates most with you? Let's discuss below 👇`,
        hashtags: `#PersonalBranding #LinkedInGrowth #AI #ThoughtLeadership`
      });
      setIsGenerating(false);
      addToast('Sample post generated with AI!', 'success');
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Copied sample post to clipboard!', 'success');
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="ambient-glow top-10 left-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-brand-violet animate-pulse" />
            <span>Introducing AI Brand Voice 2.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-ping" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-headingLight dark:text-headingDark leading-[1.12]">
            Build an Authority Brand on LinkedIn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-blue">Enterprise AI</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-bodyLight dark:text-bodyDark font-normal leading-relaxed">
            Craft viral, high-converting LinkedIn posts in seconds. Fine-tune your persona, score hooks before publishing, and turn achievements into inbound revenue opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              onClick={() => setViewMode('dashboard')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto text-base"
            >
              Start Free Trial – No Card Needed
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setViewMode('dashboard')}
              leftIcon={<Zap className="w-5 h-5 text-amber-500" />}
              className="w-full sm:w-auto text-base"
            >
              Try Interactive Sandbox
            </Button>
          </div>

          {/* Trust Checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-bodyLight dark:text-bodyDark font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Over 12,000+ Verified Founders & Leaders
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% WCAG Accessible & Fast
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              4.9/5 Rating across 2,400+ Reviews
            </span>
          </div>

        </div>

        {/* Live Mini Generator Card in Hero */}
        <div className="mt-14 max-w-4xl mx-auto">
          <Card className="shadow-floating border border-borderLight dark:border-borderDark p-6 sm:p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-borderLight dark:border-borderDark">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-semibold text-bodyLight dark:text-bodyDark">
                  Live AI Generator Preview
                </span>
              </div>
              <Badge variant="primary" icon={<Sparkles className="w-3 h-3" />}>
                GPT-4o Trained
              </Badge>
            </div>

            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                value={heroTopic}
                onChange={(e) => setHeroTopic(e.target.value)}
                placeholder="Type any achievement, milestone or post idea..."
                className="flex-1 px-4 py-3 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
              />
              <Button
                onClick={handleHeroGenerate}
                isLoading={isGenerating}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate Post
              </Button>
            </div>

            {/* Output Display */}
            {isGenerating ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo animate-bounce">
                  <Sparkles className="w-5 h-5 animate-spin" />
                </div>
                <p className="text-sm font-medium text-bodyLight dark:text-bodyDark">
                  Modeling brand voice & optimizing hook strength...
                </p>
              </div>
            ) : generatedOutput ? (
              <div className="space-y-4 animate-fade-in">
                {/* Hook Box */}
                <div className="p-4 rounded-xl bg-brand-indigo/5 border border-brand-indigo/20">
                  <div className="flex items-center justify-between text-xs font-bold text-brand-indigo mb-1">
                    <span>🪝 THE HOOK (Impact Score: 98/100)</span>
                    <button 
                      onClick={() => copyToClipboard(generatedOutput.hook)} 
                      className="hover:text-brand-600 flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Hook
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-headingLight dark:text-headingDark whitespace-pre-line leading-relaxed">
                    {generatedOutput.hook}
                  </p>
                </div>

                {/* Body Box */}
                <div className="p-4 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark">
                  <div className="text-xs font-bold text-bodyLight dark:text-bodyDark mb-1">
                    📝 STORY BODY
                  </div>
                  <p className="text-sm text-headingLight dark:text-headingDark whitespace-pre-line leading-relaxed">
                    {generatedOutput.body}
                  </p>
                </div>

                {/* CTA & Hashtags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark text-xs">
                    <span className="font-bold text-brand-violet block mb-1">📢 CALL TO ACTION</span>
                    <span className="text-headingLight dark:text-headingDark">{generatedOutput.cta}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark text-xs">
                    <span className="font-bold text-brand-blue block mb-1">🏷️ HASHTAGS</span>
                    <span className="text-headingLight dark:text-headingDark font-medium">{generatedOutput.hashtags}</span>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-bodyLight dark:text-bodyDark">
                    Score: <span className="font-bold text-emerald-500">96/100 Great Hook!</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setViewMode('dashboard')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Open in Full AI Editor
                  </Button>
                </div>
              </div>
            ) : null}

          </Card>
        </div>

      </div>
    </section>
  );
};
