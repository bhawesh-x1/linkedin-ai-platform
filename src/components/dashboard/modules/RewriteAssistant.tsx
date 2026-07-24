import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { RefreshCw, Sparkles, Copy, Check, ArrowRight, Wand2, Layout } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { CarouselSlidePreview } from '../../ui/CarouselSlidePreview';

export const RewriteAssistant: React.FC = () => {
  const { addToast } = useApp();

  const [originalText, setOriginalText] = useState(
    `We launched our new AI analytics feature today after 3 months of hard work. The team stayed up late shipping it. Users can now see their post reach in real time.`
  );

  const [selectedFormat, setSelectedFormat] = useState<'story' | 'listicle' | 'concise' | 'carousel' | 'executive'>('story');

  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenText, setRewrittenText] = useState(
    `3 months of late nights.\n400+ git commits.\n1 goal: Real-time reach insights for every creator.\n\nToday, we finally shipped our new AI Analytics Engine. Here is what we learned building it:`
  );
  const [copied, setCopied] = useState(false);

  const handleRewrite = (presetFormat?: string) => {
    setIsRewriting(true);
    setTimeout(() => {
      let output = '';
      if (presetFormat === 'story' || selectedFormat === 'story') {
        output = `90 days ago, our team made a bold decision.\nWe paused all feature requests to fix 1 critical creator pain point: real-time reach analytics.\n\nToday, the engine is officially live.\nHere is what changed:`;
      } else if (presetFormat === 'listicle' || selectedFormat === 'listicle') {
        output = `Here is the 3-step engine we shipped today:\n\n• Real-Time Impressions: Updated every 60 seconds.\n• Dwell-Time Analytics: See exact scrolling drop-offs.\n• Hook Score Benchmarks: Measure performance vs top 1% creators.`;
      } else if (presetFormat === 'concise' || selectedFormat === 'concise') {
        output = `Shipped after 3 months of development:\nReal-Time AI Analytics for LinkedIn.\n\nNo more guessing post reach. Get instant feedback on every draft.`;
      } else {
        output = `Executive Summary:\nWe shipped our v2 Real-Time Analytics module, improving customer post performance by 40%.`;
      }

      setRewrittenText(output);
      setIsRewriting(false);
      addToast('Rewritten successfully!', 'success');
    }, 1000);
  };

  const copyRewritten = () => {
    navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    addToast('Rewritten post copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Format & Tone Selector Bar */}
      <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Format Switcher */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-headingLight dark:text-headingDark block">
              Target Content Format
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'story', label: '📖 Storytelling' },
                { id: 'listicle', label: '📋 Listicle & Framework' },
                { id: 'concise', label: '⚡ Ultra Concise' },
                { id: 'carousel', label: '🎠 Carousel Slide Text' },
                { id: 'executive', label: '💼 Executive Summary' },
              ].map(fmt => (
                <button
                  key={fmt.id}
                  onClick={() => { setSelectedFormat(fmt.id as any); handleRewrite(fmt.id); }}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                    selectedFormat === fmt.id
                      ? 'bg-brand-indigo text-white border-brand-indigo shadow-md'
                      : 'border-borderLight dark:border-borderDark text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRewrite('concise')}
              leftIcon={<Wand2 className="w-3.5 h-3.5 text-brand-violet" />}
            >
              Make Punchier
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRewrite('story')}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-indigo" />}
            >
              Convert to Story
            </Button>
          </div>

        </div>
      </Card>

      {/* Dual Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Pane: Original Draft */}
        <Card padding="lg" className="border border-borderLight dark:border-borderDark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
              <span className="text-xs font-bold text-bodyLight dark:text-bodyDark uppercase tracking-wider">
                Original Draft / Raw Text
              </span>
              <Badge variant="neutral">Raw Input</Badge>
            </div>
            <textarea
              rows={10}
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste raw thoughts or old post..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 font-sans"
            />
          </div>

          <Button
            onClick={() => handleRewrite()}
            isLoading={isRewriting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full"
          >
            Rewrite with AI Persona
          </Button>
        </Card>

        {/* Right Pane: AI Rewritten Post or Carousel Slide Builder */}
        {selectedFormat === 'carousel' ? (
          <CarouselSlidePreview
            hook={originalText.slice(0, 80) + '...'}
            body={rewrittenText}
            cta="What is your take on real-time analytics? Drop a comment below!"
          />
        ) : (
          <Card padding="lg" className="border-2 border-brand-indigo/30 bg-brand-indigo/5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-brand-indigo/20">
                <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> AI Rewritten Content
                </span>
                <Badge variant="primary">Format: {selectedFormat.toUpperCase()}</Badge>
              </div>

              {isRewriting ? (
                <div className="py-20 text-center space-y-2">
                  <RefreshCw className="w-6 h-6 text-brand-indigo animate-spin mx-auto" />
                  <p className="text-xs text-bodyLight dark:text-bodyDark">Rewriting in {selectedFormat} format...</p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark min-h-[220px]">
                  <p className="text-xs sm:text-sm text-headingLight dark:text-headingDark whitespace-pre-line leading-relaxed font-medium">
                    {rewrittenText}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-bodyLight dark:text-bodyDark">
                Read Time: <strong className="text-headingLight dark:text-headingDark">25 seconds</strong>
              </span>
              <Button
                onClick={copyRewritten}
                leftIcon={copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied!' : 'Copy Rewritten Post'}
              </Button>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
};
