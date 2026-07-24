import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { CONTENT_TEMPLATES, ContentTemplate } from '../../../data/contentTemplates';
import { ImageAttachmentPicker } from '../ImageAttachmentPicker';
import { 
  AudienceType, 
  IndustryType, 
  ToneType, 
  WritingStyleType, 
  LengthType, 
  EmojiLevelType, 
  CtaType, 
  ContentGoalType, 
  GeneratedPost 
} from '../../../types';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { FactCheckValidator } from '../FactCheckValidator';
import { 
  Sparkles, 
  Copy, 
  Bookmark, 
  Eye, 
  Download, 
  RefreshCw, 
  Check, 
  Wand2, 
  Maximize2, 
  Minimize2,
  FileText,
  Send,
  Split,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react';

export const PostGenerator: React.FC = () => {
  const { addGeneratedPost, saveAsDraft, setPreviewPost, setExportPost, setPublishPost, addToast, brandPersona } = useApp();

  // Structured Form States
  const [topic, setTopic] = useState('Scaled our AI platform from $0 to $1M ARR in 9 months without paid ads');
  const [audience, setAudience] = useState<AudienceType>('Founders & C-Suite');
  const [industry, setIndustry] = useState<IndustryType>('SaaS & Enterprise Tech');
  const [tone, setTone] = useState<ToneType>('Thought Leader (Insightful & Authoritative)');
  const [writingStyle, setWritingStyle] = useState<WritingStyleType>('Hook + Story + Takeaway Framework');
  const [length, setLength] = useState<LengthType>('Medium (~250 words)');
  const [emojiLevel, setEmojiLevel] = useState<EmojiLevelType>('Subtle (1-3 per post)');
  const [ctaType, setCtaType] = useState<CtaType>('Ask Question (Drive Comments)');
  const [contentGoal, setContentGoal] = useState<ContentGoalType>('Build Authority & Reach');
  
  // Photo Attachment State
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80');

  // Hook A/B Testing Lab Mode
  const [abTestHooks, setAbTestHooks] = useState<Array<{ text: string; score: number; style: string }> | null>(null);

  // Generation & Streaming state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPost, setCurrentPost] = useState<GeneratedPost | null>(null);
  const [streamingText, setStreamingText] = useState<{
    hook: string;
    body: string;
    cta: string;
    hashtags: string[];
  } | null>(null);

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const applyTemplate = (tpl: ContentTemplate) => {
    setTopic(tpl.topic);
    setAudience(tpl.audience as any);
    setTone(tpl.tone as any);
    setWritingStyle(tpl.writingStyle as any);
    setLength(tpl.length as any);
    addToast(`Loaded template: ${tpl.name}`, 'success');
  };

  const handleGenerate = () => {
    if (!topic.trim()) {
      addToast('Please enter an achievement or topic first', 'warning');
      return;
    }

    setIsGenerating(true);
    setCurrentPost(null);
    setAbTestHooks(null);
    setStreamingText({ hook: '', body: '', cta: '', hashtags: [] });

    const mockHook = `9 months ago, we launched with 0 customers and $0 in revenue.\nToday we crossed $1,000,000 ARR with 0 dollars spent on paid ads.\n\nHere is the exact 4-step framework we used:`;
    
    const mockBody = `1. Document, don't create.\nEvery customer call contained gold. We transcribed common objections and posted solutions publicly.\n\n2. The 80/20 Hook Rule.\nWe spent 30 minutes crafting the first 2 lines for every 5 minutes spent writing the body.\n\n3. Zero fluff, 100% actionable playbooks.\nNo motivational quotes. Just step-by-step code snippets, teardowns, and real metrics.\n\n4. Dwell-time optimization.\nBy structuring posts with 1-sentence paragraphs, readers spent an average of 42 seconds per post.`;
    
    const mockCta = `Want our exact 1-page LinkedIn Content Matrix spreadsheet?\nDrop a comment "MATRIX" below and I'll DM it over.`;
    
    const mockHashtags = ['#SaaSGrowth', '#Bootstrapping', '#AIStartups', '#PersonalBranding'];

    setTimeout(() => {
      setStreamingText({
        hook: mockHook,
        body: mockBody,
        cta: mockCta,
        hashtags: mockHashtags,
      });

      const newPost: GeneratedPost = {
        id: `post-${Date.now()}`,
        timestamp: 'Just now',
        topic,
        hook: mockHook,
        body: mockBody,
        cta: mockCta,
        hashtags: mockHashtags,
        qualityScore: 96,
        wordCount: 168,
        readTimeSeconds: 42,
        tone,
      };

      setCurrentPost(newPost);
      addGeneratedPost(newPost);
      setIsGenerating(false);
      addToast('Post generated successfully with GPT-4o!', 'success');
    }, 1400);
  };

  const handleGenerateABHooks = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAbTestHooks([
        {
          text: `9 months ago, we launched with 0 customers and $0 in revenue.\nToday we crossed $1,000,000 ARR with 0 dollars spent on paid ads.`,
          score: 98,
          style: 'Metric Contrast'
        },
        {
          text: `Most founders spend $50k on Facebook ads to hit $1M ARR.\nWe did it with $0 spent on paid marketing.\nHere is our secret LinkedIn engine:`,
          score: 94,
          style: 'Contrarian Pattern-Interrupt'
        },
        {
          text: `I spent 6 months studying top 1% SaaS founders on LinkedIn.\nHere are the 4 structural rules behind 90% of viral growth:`,
          score: 92,
          style: 'Authority Curiosity-Loop'
        }
      ]);
      setIsGenerating(false);
      addToast('Generated 3 A/B Testing Hooks!', 'success');
    }, 1000);
  };

  const handleQuickAction = (action: 'shorten' | 'expand' | 'rewrite' | 'casual') => {
    if (!currentPost) return;
    setIsGenerating(true);

    setTimeout(() => {
      let updatedHook = currentPost.hook;
      let updatedBody = currentPost.body;

      if (action === 'shorten') {
        updatedBody = `1. Document customer calls into public playbooks.\n2. Spend 80% of time perfecting the 2-line hook.\n3. Keep paragraphs to 1 sentence for maximum dwell-time.`;
      } else if (action === 'expand') {
        updatedBody = `${currentPost.body}\n\nBonus Insight:\nWe also tracked our comment reply speed. Answering every comment within 15 minutes quadrupled our feed reach.`;
      } else if (action === 'casual') {
        updatedHook = `Honest talk: We scaled to $1M ARR with zero ad spend.\nHere is what actually worked (and what failed hard):`;
      }

      const modifiedPost: GeneratedPost = {
        ...currentPost,
        hook: updatedHook,
        body: updatedBody,
        qualityScore: 94,
        id: `post-${Date.now()}`,
      };

      setCurrentPost(modifiedPost);
      addGeneratedPost(modifiedPost);
      setIsGenerating(false);
      addToast(`Post updated with action: ${action.toUpperCase()}`, 'success');
    }, 1000);
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    addToast(`${sectionName} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* 1-Click Proven Templates Bar */}
      <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-headingLight dark:text-headingDark flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-brand-indigo" /> 1-Click Proven Creator Templates
          </span>
          <span className="text-[11px] text-bodyLight dark:text-bodyDark">Select to auto-fill form</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {CONTENT_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => applyTemplate(tpl)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark hover:bg-brand-indigo/10 hover:border-brand-indigo/30 text-headingLight dark:text-headingDark font-medium transition-all"
            >
              <span>{tpl.icon}</span>
              <span>{tpl.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark">
              <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-indigo" /> Post Configuration
              </h3>
              <Badge variant="primary">AI Persona Active</Badge>
            </div>

            {/* Achievement / Topic Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-headingLight dark:text-headingDark flex items-center justify-between">
                <span>Topic, Achievement, or Key Lesson</span>
                <span className="text-[10px] text-bodyLight dark:text-bodyDark font-normal">Required</span>
              </label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Scaled our SaaS to $1M ARR, lessons learned from 100 customer calls..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
              />
            </div>

            {/* Photo & Image Attachment Selector */}
            <ImageAttachmentPicker selectedImage={selectedPhoto} onSelectImage={setSelectedPhoto} />

            {/* Grid Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* Target Audience */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">Target Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as AudienceType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>Founders & C-Suite</option>
                  <option>Software Engineers & Tech</option>
                  <option>Product Managers & Designers</option>
                  <option>Sales & Growth Marketers</option>
                  <option>Recruiters & Talent Leads</option>
                  <option>Venture Capital & Investors</option>
                </select>
              </div>

              {/* Industry */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">Industry Sector</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as IndustryType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>SaaS & Enterprise Tech</option>
                  <option>AI & Machine Learning</option>
                  <option>Fintech & Web3</option>
                  <option>Healthcare & Biotech</option>
                  <option>Consumer & E-Commerce</option>
                  <option>Media & Marketing Services</option>
                </select>
              </div>

              {/* Tone & Persona */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">Tone Persona</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ToneType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>Thought Leader (Insightful & Authoritative)</option>
                  <option>Storyteller (Vulnerable & Engaging)</option>
                  <option>Data-Driven Expert (Analytical)</option>
                  <option>Direct & Actionable (No-BS Practical)</option>
                  <option>Inspirational & High-Energy</option>
                </select>
              </div>

              {/* Writing Style */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">Writing Framework</label>
                <select
                  value={writingStyle}
                  onChange={(e) => setWritingStyle(e.target.value as WritingStyleType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>Hook + Story + Takeaway Framework</option>
                  <option>Bullet-Point Listicle & Playbook</option>
                  <option>Contrarian Stance / Myth Busting</option>
                  <option>Case Study Breakdown</option>
                  <option>Personal Milestone & Lesson Learned</option>
                </select>
              </div>

              {/* Post Length */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">Target Length</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as LengthType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>Short (~100 words)</option>
                  <option>Medium (~250 words)</option>
                  <option>Long (~400 words)</option>
                </select>
              </div>

              {/* Emoji Level */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">Emoji Level</label>
                <select
                  value={emojiLevel}
                  onChange={(e) => setEmojiLevel(e.target.value as EmojiLevelType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>Subtle (1-3 per post)</option>
                  <option>None</option>
                  <option>High (Bullet point emojis)</option>
                </select>
              </div>

              {/* CTA Type */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">CTA Strategy</label>
                <select
                  value={ctaType}
                  onChange={(e) => setCtaType(e.target.value as CtaType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>Ask Question (Drive Comments)</option>
                  <option>Link in Comments (Drive Clicks)</option>
                  <option>DM for PDF / Free Template</option>
                  <option>Follow for Daily Insights</option>
                </select>
              </div>

              {/* Content Goal */}
              <div className="space-y-1">
                <label className="font-semibold text-bodyLight dark:text-bodyDark">Primary Goal</label>
                <select
                  value={contentGoal}
                  onChange={(e) => setContentGoal(e.target.value as ContentGoalType)}
                  className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
                >
                  <option>Build Authority & Reach</option>
                  <option>Generate Inbound Leads</option>
                  <option>Hire Top Talent</option>
                  <option>Showcase Product / Milestone</option>
                </select>
              </div>

            </div>

            {/* Submit Action Buttons */}
            <div className="space-y-2 pt-2">
              <Button
                onClick={handleGenerate}
                isLoading={isGenerating}
                rightIcon={<Sparkles className="w-4 h-4" />}
                className="w-full py-3 text-sm font-bold"
              >
                Generate Post with AI (Ctrl + Enter)
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateABHooks}
                leftIcon={<Split className="w-4 h-4 text-brand-violet" />}
                className="w-full text-xs"
              >
                Run Hook A/B Testing Lab (3 Variations)
              </Button>
            </div>

            {/* Brand Voice Active Indicator */}
            <div className="p-3 rounded-xl bg-surfaceLight dark:bg-surfaceDark text-[11px] text-bodyLight dark:text-bodyDark flex items-center justify-between">
              <span>Voice: <strong className="text-headingLight dark:text-headingDark">{brandPersona.fullName} Persona</strong></span>
              <span className="text-emerald-500 font-bold">5 Excluded Words Shielded</span>
            </div>

          </Card>
        </div>

        {/* Right Generated Content Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Hook A/B Lab Display */}
          {abTestHooks && (
            <Card padding="lg" className="border-2 border-brand-violet/30 bg-brand-violet/5 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-brand-violet/20">
                <span className="text-xs font-bold text-brand-violet flex items-center gap-1.5">
                  <Split className="w-4 h-4" /> HOOK A/B LAB VARIATIONS
                </span>
                <Badge variant="secondary">3 Patterns Evaluated</Badge>
              </div>

              <div className="space-y-3">
                {abTestHooks.map((h, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-indigo">{h.style}</span>
                      <span className="font-bold text-emerald-500">Score: {h.score}/100</span>
                    </div>
                    <p className="font-medium text-headingLight dark:text-headingDark whitespace-pre-line">
                      "{h.text}"
                    </p>
                    <button
                      onClick={() => {
                        if (currentPost) {
                          setCurrentPost({ ...currentPost, hook: h.text, qualityScore: h.score });
                        }
                        addToast(`Applied ${h.style} hook!`, 'success');
                      }}
                      className="text-[11px] font-bold text-brand-indigo hover:underline"
                    >
                      Use This Hook →
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {isGenerating ? (
            <Card padding="lg" className="text-center py-24 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo animate-bounce">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-headingLight dark:text-headingDark">
                  Generating High-Converting Post...
                </h4>
                <p className="text-xs text-bodyLight dark:text-bodyDark">
                  Applying hook dwell-time algorithm and formatting line breaks.
                </p>
              </div>
            </Card>
          ) : (currentPost || streamingText) ? (
            <div className="space-y-5 animate-fade-in">
              
              {/* Top Toolbar */}
              <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-borderLight dark:border-borderDark">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-headingLight dark:text-headingDark">Quality Score:</span>
                  <Badge variant="success">{currentPost?.qualityScore || 96}/100 Great Hook!</Badge>
                  <span className="text-bodyLight dark:text-bodyDark">• 168 words</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm"
                    className="bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold"
                    onClick={() => currentPost && setPublishPost(currentPost)}
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Publish to LinkedIn
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => currentPost && copyToClipboard(`${currentPost.hook}\n\n${currentPost.body}\n\n${currentPost.cta}\n\n${currentPost.hashtags.join(' ')}`, 'Full Post')}
                    leftIcon={copiedSection === 'Full Post' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    Copy All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => currentPost && saveAsDraft(currentPost)}
                    leftIcon={<Bookmark className="w-3.5 h-3.5 text-brand-indigo" />}
                  >
                    Save Draft
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => currentPost && setPreviewPost(currentPost)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-brand-violet" />}
                  >
                    Feed Preview
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => currentPost && setExportPost(currentPost)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Fact Checking Metric Verifier Panel */}
              <FactCheckValidator postText={`${currentPost?.hook}\n${currentPost?.body}`} />

              {/* Attached Photo Preview Display */}
              {selectedPhoto && (
                <div className="rounded-2xl overflow-hidden border border-borderLight dark:border-borderDark">
                  <img src={selectedPhoto} alt="Attached Photo Graphic" className="w-full h-56 object-cover" />
                  <div className="p-2.5 bg-surfaceLight dark:bg-surfaceDark text-[11px] text-bodyLight font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-brand-indigo" /> Photo graphic attached to LinkedIn share payload
                    </span>
                    <button onClick={() => setSelectedPhoto(null)} className="text-rose-500 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Structured Card 1: HOOK */}
              <Card padding="md" className="border-2 border-brand-indigo/30 bg-brand-indigo/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-brand-indigo">
                  <span className="flex items-center gap-1.5">
                    🪝 HOOK CARD (Dwell-Time Score: {currentPost?.qualityScore || 96}/100)
                  </span>
                  <button
                    onClick={() => copyToClipboard(currentPost?.hook || streamingText?.hook || '', 'Hook')}
                    className="hover:underline text-[11px] flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy Hook
                  </button>
                </div>
                <p className="text-sm font-semibold text-headingLight dark:text-headingDark whitespace-pre-line leading-relaxed">
                  {currentPost?.hook || streamingText?.hook}
                </p>
              </Card>

              {/* Structured Card 2: BODY */}
              <Card padding="md" className="space-y-2 border border-borderLight dark:border-borderDark">
                <div className="flex items-center justify-between text-xs font-bold text-bodyLight dark:text-bodyDark">
                  <span>📝 STORY BODY</span>
                  <button
                    onClick={() => copyToClipboard(currentPost?.body || streamingText?.body || '', 'Body')}
                    className="hover:underline text-[11px] flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy Body
                  </button>
                </div>
                <p className="text-sm text-headingLight dark:text-headingDark whitespace-pre-line leading-relaxed">
                  {currentPost?.body || streamingText?.body}
                </p>
              </Card>

              {/* Structured Card 3 & 4: CTA and HASHTAGS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card padding="md" className="space-y-1.5 border border-borderLight dark:border-borderDark">
                  <span className="text-xs font-bold text-brand-violet block">📢 CALL TO ACTION</span>
                  <p className="text-xs text-headingLight dark:text-headingDark whitespace-pre-line">
                    {currentPost?.cta || streamingText?.cta}
                  </p>
                </Card>

                <Card padding="md" className="space-y-1.5 border border-borderLight dark:border-borderDark">
                  <span className="text-xs font-bold text-brand-blue block">🏷️ OPTIMIZED HASHTAGS</span>
                  <p className="text-xs font-medium text-brand-indigo">
                    {(currentPost?.hashtags || streamingText?.hashtags || []).join(' ')}
                  </p>
                </Card>
              </div>

              {/* One-Click Quick AI Action Controls */}
              <div className="p-4 rounded-2xl glass-panel border border-borderLight dark:border-borderDark space-y-3">
                <span className="text-xs font-bold text-headingLight dark:text-headingDark block">
                  ⚡ Instant AI One-Click Adjustments:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Button size="sm" variant="outline" onClick={() => handleQuickAction('shorten')} leftIcon={<Minimize2 className="w-3.5 h-3.5" />}>
                    Make More Concise
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleQuickAction('expand')} leftIcon={<Maximize2 className="w-3.5 h-3.5" />}>
                    Expand Insights
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleQuickAction('casual')} leftIcon={<Wand2 className="w-3.5 h-3.5 text-brand-violet" />}>
                    More Conversational
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleGenerate} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                    Regenerate
                  </Button>
                </div>
              </div>

            </div>
          ) : (
            <Card padding="lg" className="text-center py-24 space-y-4 border border-dashed border-borderLight dark:border-borderDark">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-surfaceLight dark:bg-surfaceDark flex items-center justify-center text-bodyLight dark:text-bodyDark">
                <Sparkles className="w-6 h-6 text-brand-indigo" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-base font-bold text-headingLight dark:text-headingDark">
                  Ready to Generate Your Post
                </h4>
                <p className="text-xs text-bodyLight dark:text-bodyDark">
                  Configure your achievement and preferences on the left, or pick a proven 1-click template above.
                </p>
              </div>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};
