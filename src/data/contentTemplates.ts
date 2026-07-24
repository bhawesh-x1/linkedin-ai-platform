export interface ContentTemplate {
  id: string;
  name: string;
  category: 'Milestones' | 'Case Studies' | 'Hiring' | 'Frameworks' | 'Personal';
  icon: string;
  description: string;
  topic: string;
  audience: string;
  tone: string;
  writingStyle: string;
  length: string;
}

export const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: 'template-1',
    name: 'SaaS Milestone / Revenue Growth',
    category: 'Milestones',
    icon: '🚀',
    description: 'Break down how your company hit a major milestone without paid ads.',
    topic: 'Scaled our AI platform from $0 to $1M ARR in 9 months without paid ads',
    audience: 'Founders & C-Suite',
    tone: 'Thought Leader (Insightful & Authoritative)',
    writingStyle: 'Hook + Story + Takeaway Framework',
    length: 'Medium (~250 words)',
  },
  {
    id: 'template-2',
    name: 'Hiring & Culture Lesson',
    category: 'Hiring',
    icon: '👥',
    description: 'Share a costly hiring mistake and the framework you now use.',
    topic: 'The hardest lesson I learned fire-testing 10 engineers and $180k lost',
    audience: 'Software Engineers & Tech',
    tone: 'Storyteller (Vulnerable & Engaging)',
    writingStyle: 'Personal Milestone & Lesson Learned',
    length: 'Medium (~250 words)',
  },
  {
    id: 'template-3',
    name: 'Contrarian Take / Industry Myth',
    category: 'Frameworks',
    icon: '⚡',
    description: 'Challenge a popular industry myth with data and counter-arguments.',
    topic: 'Why 90% of AI wrappers fail and how to build defensible workflow moats',
    audience: 'Venture Capital & Investors',
    tone: 'Data-Driven Expert (Analytical)',
    writingStyle: 'Contrarian Stance / Myth Busting',
    length: 'Long (~400 words)',
  },
  {
    id: 'template-4',
    name: 'Product Feature Launch',
    category: 'Case Studies',
    icon: '✨',
    description: 'Announce a new feature by focusing on customer pain points solved.',
    topic: 'Shipped real-time post reach analytics after 3 months of customer feedback',
    audience: 'Product Managers & Designers',
    tone: 'Direct & Actionable (No-BS Practical)',
    writingStyle: 'Case Study Breakdown',
    length: 'Short (~100 words)',
  },
  {
    id: 'template-5',
    name: '10x Productivity Playbook',
    category: 'Frameworks',
    icon: '📋',
    description: 'Provide an actionable 5-step checklist or tool stack listicle.',
    topic: 'The 5 AI tools our 10-person team uses to run like a 50-person enterprise',
    audience: 'Sales & Growth Marketers',
    tone: 'Inspirational & High-Energy',
    writingStyle: 'Bullet-Point Listicle & Playbook',
    length: 'Medium (~250 words)',
  },
];
