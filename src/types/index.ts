export type ViewMode = 'landing' | 'dashboard' | 'auth';

export type DashboardModule = 
  | 'generator' 
  | 'analyzer' 
  | 'rewrite' 
  | 'history' 
  | 'drafts' 
  | 'analytics' 
  | 'brand-voice' 
  | 'settings'
  | 'database';

export type AudienceType = 
  | 'Founders & C-Suite' 
  | 'Software Engineers & Tech' 
  | 'Product Managers & Designers' 
  | 'Sales & Growth Marketers' 
  | 'Recruiters & Talent Leads' 
  | 'Venture Capital & Investors';

export type IndustryType = 
  | 'SaaS & Enterprise Tech' 
  | 'AI & Machine Learning' 
  | 'Fintech & Web3' 
  | 'Healthcare & Biotech' 
  | 'Consumer & E-Commerce' 
  | 'Media & Marketing Services';

export type ToneType = 
  | 'Thought Leader (Insightful & Authoritative)' 
  | 'Storyteller (Vulnerable & Engaging)' 
  | 'Data-Driven Expert (Analytical)' 
  | 'Direct & Actionable (No-BS Practical)' 
  | 'Inspirational & High-Energy';

export type WritingStyleType = 
  | 'Hook + Story + Takeaway Framework' 
  | 'Bullet-Point Listicle & Playbook' 
  | 'Contrarian Stance / Myth Busting' 
  | 'Case Study Breakdown' 
  | 'Personal Milestone & Lesson Learned';

export type LengthType = 'Short (~100 words)' | 'Medium (~250 words)' | 'Long (~400 words)';

export type EmojiLevelType = 'None' | 'Subtle (1-3 per post)' | 'High (Bullet point emojis)';

export type CtaType = 
  | 'Ask Question (Drive Comments)' 
  | 'Link in Comments (Drive Clicks)' 
  | 'DM for PDF / Free Template' 
  | 'Follow for Daily Insights';

export type ContentGoalType = 
  | 'Build Authority & Reach' 
  | 'Generate Inbound Leads' 
  | 'Hire Top Talent' 
  | 'Showcase Product / Milestone';

export interface GeneratedPost {
  id: string;
  timestamp: string;
  topic: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  qualityScore: number;
  wordCount: number;
  readTimeSeconds: number;
  tone: string;
  isSaved?: boolean;
}

export interface PostAnalysisResult {
  overallScore: number;
  hookScore: number;
  readabilityScore: number;
  engagementScore: number;
  algorithmScore: number;
  hookCritique: string;
  strengths: string[];
  improvements: string[];
  estimatedReachMultiplier: string;
}

export interface DraftItem extends GeneratedPost {
  status: 'Draft' | 'Scheduled' | 'Published';
  scheduledDate?: string;
  notes?: string;
}

export interface BrandPersona {
  fullName: string;
  headline: string;
  targetAudience: string;
  corePillars: string[];
  excludedWords: string[];
  signatureSignoff: string;
  formalityLevel: number; // 0 - 100
  humorLevel: number; // 0 - 100
  storytellingDensity: number; // 0 - 100
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  company: string;
  avatarUrl: string;
  linkedInConnected: boolean;
  linkedInHandle: string;
  aiProvider: 'OpenAI (GPT-4o)' | 'Claude 3.5 Sonnet' | 'Custom API Key';
  apiKey: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  tokensUsed: number;
  tokensTotal: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
