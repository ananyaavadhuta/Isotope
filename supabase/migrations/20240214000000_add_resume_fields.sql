-- Add resume related columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS video_resume_url TEXT,
ADD COLUMN IF NOT EXISTS resume_content TEXT,
ADD COLUMN IF NOT EXISTS resume_score INTEGER,
ADD COLUMN IF NOT EXISTS resume_feedback JSONB;
