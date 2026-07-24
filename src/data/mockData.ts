import { GeneratedPost, DraftItem, BrandPersona, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@enterprise.ai',
  role: 'Founder & CEO',
  company: 'ScaleMetric AI',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  linkedInConnected: true,
  linkedInHandle: 'linkedin.com/in/alexmorgan-ai',
  aiProvider: 'OpenAI (GPT-4o)',
  apiKey: 'sk-proj-••••••••••••••••3A79',
  plan: 'Pro',
  tokensUsed: 45200,
  tokensTotal: 100000,
};

export const INITIAL_BRAND_PERSONA: BrandPersona = {
  fullName: 'Alex Morgan',
  headline: 'Building AI SaaS for Enterprise Sales Teams | 2x Founder',
  targetAudience: 'B2B Founders, VP of Sales, AI Product Leaders',
  corePillars: ['AI Productivity', 'SaaS Growth & GTM', 'Founder Mental Models', 'Engineering Leadership'],
  excludedWords: ['game-changer', 'synergy', 'deep-dive', 'paradigm shift', 'delve'],
  signatureSignoff: 'P.S. How is your team leveraging AI workflows this quarter?',
  formalityLevel: 65,
  humorLevel: 30,
  storytellingDensity: 80,
};

export const INITIAL_GENERATED_POSTS: GeneratedPost[] = [
  {
    id: 'post-1',
    timestamp: '2 hours ago',
    topic: 'Scaled our AI platform from $0 to $1M ARR in 9 months without paid ads',
    hook: '9 months ago, we launched with 0 customers and $0 in revenue.\nToday we crossed $1,000,000 ARR with 0 dollars spent on paid ads.\n\nHere is the 4-step LinkedIn engine we used:',
    body: '1. Document, don\'t create.\nEvery customer call contained gold. We transcribed objections and posted solutions publically.\n\n2. The 80/20 Hook Rule.\nWe spent 30 minutes crafting the first 2 lines for every 5 minutes spent writing the body.\n\n3. Zero fluff, 100% actionable playbooks.\nNo motivational quotes. Just step-by-step code snippets, teardowns, and metrics.\n\n4. Dwell-time optimization.\nBy structuring posts with 1-sentence paragraphs, readers spent an average of 42 seconds on our content.',
    cta: 'Want our exact 1-page LinkedIn Content Matrix spreadsheet?\nDrop a comment "MATRIX" below and I\'ll DM it over.',
    hashtags: ['#SaaSGrowth', '#Bootstrapping', '#AIStartups', '#PersonalBranding'],
    qualityScore: 96,
    wordCount: 168,
    readTimeSeconds: 45,
    tone: 'Thought Leader (Insightful)',
    isSaved: true,
  },
  {
    id: 'post-2',
    timestamp: 'Yesterday',
    topic: 'Why 90% of AI wrappers fail and how to build defensible moats',
    hook: 'If your entire startup can be replaced by a single OpenAI system prompt, you don\'t have a product.\nYou have a temporary UI.\n\nHere is how we built a $10M moat around our AI platform:',
    body: '• Proprietary Fine-Tuning: We trained specialized models on 50,000+ top-performing LinkedIn posts.\n• Contextual Data Loops: Every user edit feeds back into model personalization.\n• Enterprise Workflow Integration: We embedded directly into Slack, Chrome, and HubSpot.\n\nDon\'t compete on raw LLM capability. Compete on domain workflow integration.',
    cta: 'What is your take? Are standalone wrapper startups doomed in 2026?',
    hashtags: ['#ArtificialIntelligence', '#TechLeadership', '#VentureCapital', '#Startups'],
    qualityScore: 92,
    wordCount: 142,
    readTimeSeconds: 35,
    tone: 'Data-Driven Expert',
    isSaved: false,
  },
  {
    id: 'post-3',
    timestamp: '3 days ago',
    topic: 'The hardest lesson I learned fire-testing 10 engineers',
    hook: 'I made a massive hiring mistake last year that cost us $180,000.\n\nI hired for technical pedigree instead of speed of execution.',
    body: 'When you are building early-stage AI products, speed of iteration is everything.\n\nThe engineers who thrived weren\'t the ones with CS PhDs.\nThey were the ones who built scrappy prototypes in 4 hours and iterated based on customer feedback.\n\nGreat hiring is about alignment with your company\'s current stage.',
    cta: 'How do you test for execution speed during technical interviews?',
    hashtags: ['#EngineeringLeadership', '#Hiring', '#Culture', '#TechFounders'],
    qualityScore: 89,
    wordCount: 124,
    readTimeSeconds: 30,
    tone: 'Storyteller (Vulnerable)',
    isSaved: true,
  }
];

export const INITIAL_DRAFTS: DraftItem[] = [
  {
    ...INITIAL_GENERATED_POSTS[0],
    id: 'draft-101',
    status: 'Scheduled',
    scheduledDate: 'Tomorrow at 9:00 AM EST',
    notes: 'A/B testing first line hook'
  },
  {
    ...INITIAL_GENERATED_POSTS[2],
    id: 'draft-102',
    status: 'Draft',
    notes: 'Need to add specific team retention metrics before posting'
  }
];

export const ANALYTICS_DATA = {
  impressionsTotal: 148200,
  impressionsGrowth: '+34.2%',
  engagementsTotal: 12450,
  engagementsGrowth: '+28.1%',
  profileViewsTotal: 1840,
  profileViewsGrowth: '+52.0%',
  avgQualityScore: 94,
  qualityGrowth: '+4 pts',
  topPerformingTone: 'Thought Leader (Insightful)',
  weeklyImpressions: [
    { day: 'Mon', count: 18200 },
    { day: 'Tue', count: 24500 },
    { day: 'Wed', count: 32100 },
    { day: 'Thu', count: 29800 },
    { day: 'Fri', count: 22400 },
    { day: 'Sat', count: 11200 },
    { day: 'Sun', count: 10000 },
  ],
  tonePerformance: [
    { tone: 'Thought Leader', avgScore: 96, posts: 14 },
    { tone: 'Storyteller', avgScore: 92, posts: 9 },
    { tone: 'Data-Driven', avgScore: 90, posts: 7 },
    { tone: 'Direct / Actionable', avgScore: 88, posts: 11 },
  ]
};
