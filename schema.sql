-- ===================================================
-- LINKEDIN AI PLATFORM - SUPABASE / POSTGRESQL SCHEMA
-- ===================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  linkedin_connected BOOLEAN DEFAULT false,
  linkedin_handle TEXT,
  ai_provider TEXT DEFAULT 'OpenAI (GPT-4o)',
  plan TEXT DEFAULT 'Pro'
);

-- 2. Brand Personas Table
CREATE TABLE IF NOT EXISTS public.brand_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  target_audience TEXT,
  core_pillars TEXT[] DEFAULT '{}',
  excluded_words TEXT[] DEFAULT '{}',
  signature_signoff TEXT,
  formality_level INT DEFAULT 60,
  humor_level INT DEFAULT 20,
  storytelling_density INT DEFAULT 80
);

-- 3. Generated Posts Table
CREATE TABLE IF NOT EXISTS public.generated_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  topic TEXT NOT NULL,
  hook TEXT NOT NULL,
  body TEXT NOT NULL,
  cta TEXT NOT NULL,
  hashtags TEXT[] DEFAULT '{}',
  quality_score INT DEFAULT 95,
  word_count INT DEFAULT 180,
  read_time_seconds INT font DEFAULT 45,
  tone TEXT
);

-- 4. Drafts & Scheduled Calendar Table
CREATE TABLE IF NOT EXISTS public.drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  topic TEXT NOT NULL,
  hook TEXT NOT NULL,
  body TEXT NOT NULL,
  cta TEXT NOT NULL,
  hashtags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Draft', -- 'Draft', 'Scheduled', 'Published'
  scheduled_date DATE,
  notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;
