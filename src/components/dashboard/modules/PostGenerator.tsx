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
  Image as ImageIcon,
  Zap,
  Sliders
} from 'lucide-react';

export const PostGenerator: React.FC = () => {
  const { addGeneratedPost, saveAsDraft, setPreviewPost, setExportPost, setPublishPost, addToast, brandPersona, isSimpleMode, setIsSimpleMode } = useApp();

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
    }, 1200);
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    addToast(`${sectionName} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Simple / Advanced Mode Banner */}
      <div className="flex items-center justify-between p-3 rounded-2xl glass-panel border border-borderLight dark:border-borderDark">
        <div className="flex items-center gap-2 text-xs font-bold text-headingLight dark:text-headingDark">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>{isSimpleMode ? 'Simple Streamlined AI Post Generator' : 'Enterprise Advanced AI Post Engine'}</span>
        </div>
        <button
          onClick={() => setIsSimpleMode(!isSimpleMode)}
          className="text-xs font-bold text-brand-indigo hover:underline flex items-center gap-1"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{isSimpleMode ? 'Switch to Advanced Options' : 'Switch to Simple Mode'}</span>
        </button>
      </div>

      {/* CLEAN SIMPLE MODE LAYOUT */}
      {isSimpleMode ? (
        <Card padding="lg" className="border-2 border-brand-indigo/30 bg-surfaceLight dark:bg-surfaceDark space-y-6 shadow-floating">
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-headingLight dark:text-headingDark flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-indigo" /> What topic or lesson do you want to post about today?
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Scaled our platform from $0 to $1M ARR in 9 months without paid ads..."
              className="w-full px-4 py-3 rounded-2xl border border-borderLight dark:border-borderDark bg-bgLight dark:bg-bgDark text-headingLight dark:text-headingDark text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
            />
          </div>

          {/* Quick Tone Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-bodyLight">Pick Tone Style:</label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Thought Leader (Insightful & Authoritative)',
                'Storyteller (Vulnerable & Engaging)',
                'Data-Driven Expert (Analytical)',
                'Direct & Actionable (No-BS Practical)'
              ].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                    tone === t
                      ? 'bg-brand-indigo text-white border-brand-indigo shadow-sm'
                      : 'border-borderLight dark:border-borderDark bg-bgLight dark:bg-bgDark text-bodyLight hover:text-headingLight'
                  }`}
                >
                  {t.split(' ')[0]} {t.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Big Action Button */}
          <Button
            onClick={handleGenerate}
            isLoading={isGenerating}
            rightIcon={<Sparkles className="w-5 h-5 animate-pulse" />}
            className="w-full py-4 text-base font-extrabold shadow-lg shadow-brand-indigo/30"
          >
            Generate High-Converting LinkedIn Post ✨
          </Button>

          {/* Generated Result Output */}
          {currentPost && (
            <div className="pt-6 border-t border-borderLight dark:border-borderDark space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <Badge variant="success">Quality Score: 96/100 Great Hook!</Badge>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm"
                    className="bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold"
                    onClick={() => setPublishPost(currentPost)}
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Publish to LinkedIn
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(`${currentPost.hook}\n\n${currentPost.body}\n\n${currentPost.cta}\n\n${currentPost.hashtags.join(' ')}`, 'Full Post')}
                    leftIcon={copiedSection === 'Full Post' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    Copy All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setPreviewPost(currentPost)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-brand-violet" />}
                  >
                    Preview
                  </Button>
                </div>
              </div>

              {/* Clean Output Box */}
              <div className="p-5 rounded-2xl bg-bgLight dark:bg-bgDark border border-borderLight dark:border-borderDark text-sm leading-relaxed whitespace-pre-line text-headingLight dark:text-headingDark font-sans">
                <p className="font-bold text-brand-indigo">{currentPost.hook}</p>
                <p className="my-3">{currentPost.body}</p>
                <p className="font-semibold text-brand-violet">{currentPost.cta}</p>
                <p className="text-brand-indigo font-semibold">{currentPost.hashtags.join(' ')}</p>
              </div>
            </div>
          )}
        </Card>
      ) : (
        /* ADVANCED MODE FULL FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark">
                <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-indigo" /> Advanced Settings
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-headingLight dark:text-headingDark">Topic / Achievement</label>
                <textarea
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight text-xs leading-relaxed focus:outline-none"
                />
              </div>

              <ImageAttachmentPicker selectedImage={selectedPhoto} onSelectImage={setSelectedPhoto} />

              <Button onClick={handleGenerate} isLoading={isGenerating} className="w-full py-3">
                Generate Post
              </Button>
            </Card>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {currentPost && (
              <Card padding="lg" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="success">Score: 96/100</Badge>
                  <Button size="sm" onClick={() => setPublishPost(currentPost)}>Publish</Button>
                </div>
                <div className="text-sm whitespace-pre-line leading-relaxed">
                  <p className="font-bold">{currentPost.hook}</p>
                  <p className="my-3">{currentPost.body}</p>
                  <p className="font-semibold text-brand-indigo">{currentPost.cta}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
