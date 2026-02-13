export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    avatar_url: string | null
                    role: 'seeker' | 'employer' | null
                    headline: string | null
                    bio: string | null
                    phone_number: string | null
                    location: string | null
                    skills: string | null
                    experience: string | null
                    company_name: string | null
                    industry: string | null
                    pricing_plan: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'seeker' | 'employer' | null
                    headline?: string | null
                    bio?: string | null
                    phone_number?: string | null
                    location?: string | null
                    skills?: string | null
                    experience?: string | null
                    company_name?: string | null
                    industry?: string | null
                    pricing_plan?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'seeker' | 'employer' | null
                    headline?: string | null
                    bio?: string | null
                    phone_number?: string | null
                    location?: string | null
                    skills?: string | null
                    experience?: string | null
                    company_name?: string | null
                    industry?: string | null
                    pricing_plan?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            jobs: {
                Row: {
                    id: string
                    employer_id: string | null
                    title: string
                    description: string | null
                    location: string | null
                    salary_range: string | null
                    job_type: string | null
                    status: string | null
                    requirements: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    employer_id?: string | null
                    title: string
                    description?: string | null
                    location?: string | null
                    salary_range?: string | null
                    job_type?: string | null
                    status?: string | null
                    requirements?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    employer_id?: string | null
                    title?: string
                    description?: string | null
                    location?: string | null
                    salary_range?: string | null
                    job_type?: string | null
                    status?: string | null
                    requirements?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            applications: {
                Row: {
                    id: string
                    job_id: string | null
                    seeker_id: string | null
                    status: string | null
                    resume_url: string | null
                    cover_letter: string | null
                    applied_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    job_id?: string | null
                    seeker_id?: string | null
                    status?: string | null
                    resume_url?: string | null
                    cover_letter?: string | null
                    applied_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    job_id?: string | null
                    seeker_id?: string | null
                    status?: string | null
                    resume_url?: string | null
                    cover_letter?: string | null
                    applied_at?: string
                    updated_at?: string
                }
            }
            pricing_plans: {
                Row: {
                    id: number
                    name: string
                    description: string | null
                    price: number
                    interval: string
                    features: Json
                    created_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    description?: string | null
                    price: number
                    interval: string
                    features?: Json
                    created_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    description?: string | null
                    price?: number
                    interval?: string
                    features?: Json
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
