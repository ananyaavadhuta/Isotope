# Isotope Backend

This folder contains the backend logic and documentation for the Isotope platform.

## Architecture
Isotope uses **Supabase** as its primary backend-as-a-service. This provides:
- **Authentication**: Managed via Supabase Auth.
- **Database**: PostgreSQL with Row Level Security (RLS).
- **Storage**: For resumes and profile avatars.
- **Real-time**: For notifications and messaging.

## Database Schema
The schema is managed via migrations in `/supabase/migrations`.
- `profiles`: Extends `auth.users` with user types (seeker/employer) and profile data.
- `jobs`: Stores job postings created by employers.
- `applications`: Tracks job applications from seekers to jobs.
- `pricing_plans`: Defines available subscription tiers.
- `subscriptions`: Manages user subscription status.

## Business Logic
Most business logic is handled via:
1. **Database Functions/Triggers**: Automatic profile creation on signup.
2. **Row Level Security**: Fine-grained access control.
3. **Edge Functions** (Optional): For complex server-side logic (e.g., Stripe integration).

## Setup
To apply the schema to your live Supabase project, you can copy the contents of `supabase/migrations/20240213000000_initial_schema.sql` and run it in the **SQL Editor** on the [Supabase Dashboard](https://supabase.com/dashboard).
