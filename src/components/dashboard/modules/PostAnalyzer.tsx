import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Gauge, Sparkles, AlertCircle, CheckCircle2, TrendingUp, Lightbulb, Flame, Eye, ShieldAlert } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const PostAnalyzer: React.FC = () => {
  const { addToast } = useApp();

  const [inputPost, setInputPost] = useState(
    `I made a massive hiring mistake last year that cost us $180,000.\n\nI hired for technical pedigree instead of speed of execution.\n\nWhen you are building early-stage AI products, speed of iteration is everything.\n\nThe engineers who thrived weren't the ones with CS PhDs. They were the ones who built scrappy prototypes in 4 hours.\n\nHow do you test for execution speed during technical interviews?`
  );

  const [showHeatmap, setShowHeatmap] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    overallScore: number;
    hookScore: number;
    readabilityScore: number;
    engagementScore: number;
    algorithmScore: number;
    hookCritique: string;
    strengths: string[];
    improvements: string[];
    estimatedReach: string;
  }>({
    overallScore: 94,
    hookScore: 98,
    readabilityScore: 90,
    engagementScore: 92,
    algorithmScore: 95,
    hookCritique: 'Excellent curiosity loop! Dollar values ($180,000) create high visual contrast in feeds.',
    strengths: [
      'Strong line break spacing allows effortless mobile reading.',
      'Dollar amount ($180,000) grabs high visual attention.',
      'Ends with a clear open-ended question to drive comment velocity.'
    ],
    improvements: [
      'Consider adding 2-3 targeted hashtags (e.g. #Hiring #Startups).',
      'The 4th paragraph is slightly long (24 words). Split into two lines for higher dwell time.'
    ],
    estimatedReach: '3.8x baseline reach (High Engagement Likelihood)'
  });

  const handleAnalyze = () => {
    if (!inputPost.trim()) {
      addToast('Please enter post text to analyze', 'warning');
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      addToast('Post analysis complete!', 'success');
    }, 1000);
  };

  const handleAutoFix = () => {
    const fixed = inputPost.replace(
      `The engineers who thrived weren't the ones with CS PhDs. They were the ones who built scrappy prototypes in 4 hours.`,
      `The engineers who thrived weren't the ones with CS PhDs.\n\nThey were the ones who built scrappy prototypes in 4 hours.`
    );
    setInputPost(fixed);
    setAnalysisResult(prev => ({ ...prev, overallScore: 98, readabilityScore: 96 }));
    addToast('Auto-fixed long sentence breaks! Score increased to 98/100.', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Input Box & Heatmap Column */}
      <div className="lg:col-span-6 space-y-4">
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark">
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
              <Gauge className="w-4 h-4 text-brand-indigo" /> Input Post Draft
            </h3>
            
            {/* Heatmap Toggle */}
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                showHeatmap
                  ? 'bg-brand-indigo/10 text-brand-indigo border-brand-indigo/30'
                  : 'border-borderLight dark:border-borderDark text-bodyLight'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHeatmap ? 'Dwell Heatmap ON' : 'Show Heatmap'}</span>
            </button>
          </div>

          {/* Dwell Time Heatmap Display */}
          {showHeatmap ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-2 text-xs leading-relaxed font-sans">
                <span className="p-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                  🟢 [98% Dwell] I made a massive hiring mistake last year that cost us $180,000.
                </span>
                <p className="p-1 rounded bg-brand-indigo/15 text-headingLight dark:text-headingDark font-medium">
                  🔵 [90% Dwell] I hired for technical pedigree instead of speed of execution.
                </p>
                <p className="p-1 rounded bg-brand-indigo/15 text-headingLight dark:text-headingDark font-medium">
                  🔵 [88% Dwell] When you are building early-stage AI products, speed of iteration is everything.
                </p>
                <p className="p-1 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold border border-rose-500/30">
                  🔴 [Drop-off Risk] The engineers who thrived weren't the ones with CS PhDs. They were the ones who built scrappy prototypes in 4 hours.
                </p>
                <span className="p-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30 block">
                  🟢 [95% Dwell] How do you test for execution speed during technical interviews?
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-bodyLight dark:text-bodyDark">
                  Heatmap Legend: 🟢 High Dwell | 🔵 Good | 🔴 Drop-off Risk
                </span>
                <Button size="sm" variant="outline" onClick={handleAutoFix} leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-indigo" />}>
                  Auto-Fix Drop-off Risks
                </Button>
              </div>
            </div>
          ) : (
            <textarea
              rows={12}
              value={inputPost}
              onChange={(e) => setInputPost(e.target.value)}
              placeholder="Paste your LinkedIn post draft here..."
              className="w-full px-4 py-3 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 font-sans"
            />
          )}

          <Button
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            rightIcon={<Sparkles className="w-4 h-4" />}
            className="w-full py-3"
          >
            Analyze Post Quality & Reach
          </Button>
        </Card>
      </div>

      {/* Right Score Output Column */}
      <div className="lg:col-span-6 space-y-6">
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-6">
          
          {/* Top Score Banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-brand-indigo/10 via-brand-violet/10 to-transparent border border-brand-indigo/20">
            <div>
              <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider block">
                Overall Quality Score
              </span>
              <span className="text-3xl font-black text-headingLight dark:text-headingDark">
                {analysisResult.overallScore} / 100
              </span>
            </div>
            <Badge variant="success" icon={<TrendingUp className="w-3.5 h-3.5" />}>
              {analysisResult.estimatedReach}
            </Badge>
          </div>

          {/* 4 Score Meters */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            
            {/* Hook Meter */}
            <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-bodyLight dark:text-bodyDark">Hook Impact</span>
                <span className="text-brand-indigo">{analysisResult.hookScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-bgLight dark:bg-bgDark overflow-hidden">
                <div className="h-full bg-brand-indigo" style={{ width: `${analysisResult.hookScore}%` }} />
              </div>
            </div>

            {/* Readability Meter */}
            <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-bodyLight dark:text-bodyDark">Readability</span>
                <span className="text-emerald-500">{analysisResult.readabilityScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-bgLight dark:bg-bgDark overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${analysisResult.readabilityScore}%` }} />
              </div>
            </div>

            {/* Engagement Meter */}
            <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-bodyLight dark:text-bodyDark">Engagement</span>
                <span className="text-brand-violet">{analysisResult.engagementScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-bgLight dark:bg-bgDark overflow-hidden">
                <div className="h-full bg-brand-violet" style={{ width: `${analysisResult.engagementScore}%` }} />
              </div>
            </div>

            {/* Algorithm Meter */}
            <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-bodyLight dark:text-bodyDark">Algorithm Fit</span>
                <span className="text-amber-500">{analysisResult.algorithmScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-bgLight dark:bg-bgDark overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${analysisResult.algorithmScore}%` }} />
              </div>
            </div>

          </div>

          {/* Hook Critique Box */}
          <div className="p-4 rounded-xl bg-brand-indigo/5 border border-brand-indigo/20 space-y-1 text-xs">
            <span className="font-bold text-brand-indigo flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> HOOK CRITIQUE & DWELL TIME
            </span>
            <p className="text-headingLight dark:text-headingDark font-medium leading-relaxed">
              {analysisResult.hookCritique}
            </p>
          </div>

          {/* Strengths List */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              ✅ What's Working Great
            </span>
            {analysisResult.strengths.map((str, i) => (
              <div key={i} className="flex items-center gap-2 text-headingLight dark:text-headingDark">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{str}</span>
              </div>
            ))}
          </div>

          {/* Actionable Recommendations List */}
          <div className="space-y-2 text-xs pt-2 border-t border-borderLight dark:border-borderDark">
            <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              💡 Actionable Improvements
            </span>
            {analysisResult.improvements.map((imp, i) => (
              <div key={i} className="flex items-center gap-2 text-headingLight dark:text-headingDark">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{imp}</span>
              </div>
            ))}
          </div>

        </Card>
      </div>

    </div>
  );
};
