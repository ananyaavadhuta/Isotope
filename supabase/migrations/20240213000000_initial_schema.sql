-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('seeker', 'employer')),
  headline TEXT,
  bio TEXT,
  phone_number TEXT,
  location TEXT,
  skills TEXT,
  experience TEXT,
  company_name TEXT,
  industry TEXT,
  pricing_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  salary_range TEXT,
  job_type TEXT, -- 'full-time', 'part-time', 'contract', 'freelance'
  status TEXT DEFAULT 'open',
  requirements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  seeker_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'review', 'accepted', 'rejected')),
  resume_url TEXT,
  cover_letter TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  interval TEXT NOT NULL, -- 'monthly', 'yearly'
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES public.pricing_plans(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Jobs Policies
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs
  FOR SELECT USING (true);

CREATE POLICY "Employers can insert their own jobs" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update their own jobs" ON public.jobs
  FOR UPDATE USING (auth.uid() = employer_id);

-- Applications Policies
CREATE POLICY "Seekers can view their own applications" ON public.applications
  FOR SELECT USING (auth.uid() = seeker_id);

CREATE POLICY "Employers can view applications for their jobs" ON public.applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = applications.job_id AND jobs.employer_id = auth.uid()
    )
  );

CREATE POLICY "Seekers can insert applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = seeker_id);

-- Trigger for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'seeker'),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed pricing plans
INSERT INTO public.pricing_plans (name, description, price, interval, features)
VALUES 
('Basic Seeker', 'Standard features for job seekers', 0, 'monthly', '["Limited job applications", "Basic profile display"]'::jsonb),
('Premium Seeker', 'Advanced matching for job seekers', 15, 'monthly', '["Unlimited applications", "Priority matching", "Who viewed your profile"]'::jsonb),
('Basic Employer', 'Standard hiring tools', 50, 'monthly', '["Post up to 3 jobs", "Basic candidate sorting"]'::jsonb),
('Professional Employer', 'Complete hiring solution', 150, 'monthly', '["Unlimited job posts", "Advanced candidate search", "Priority support"]'::jsonb);
