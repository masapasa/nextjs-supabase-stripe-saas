-- PROFILES
CREATE TABLE IF NOT EXISTS public.profile (
    id                  uuid references auth.users(id) on delete cascade PRIMARY KEY,
    email               text UNIQUE,
    is_subscribed       boolean NOT NULL DEFAULT false,
    interval            text,
    stripe_customer     text,
    created_at          timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
comment on table public.profiles is 'Profile data for active users';

-- LESSONS
CREATE TABLE IF NOT EXISTS public.lesson (
    id                  bigint generated always as identity PRIMARY KEY,
    text                text,
    description         text,
    created_at          timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
comment on table public.profiles is 'Lessons for users to view';

-- PREMIUM CONTENT
CREATE TABLE IF NOT EXISTS public.premium_content (
    id                  bigint generated always as identity PRIMARY KEY,
    video_url           text,
    created_at          timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
comment on table public.profiles is 'Premium content for lessons';

-- ENABLE RLS POLICIES
ALTER TABLE public.profile enable row level security;
ALTER TABLE public.lesson enable row level security;
ALTER TABLE public.premium_content enable row level security;

-- CREATE RLS POLICIES
CREATE POLICY "Only user can select their own profile" ON public.profile FOR
SELECT
USING (auth.uid() = id)

CREATE POLICY "Enable read access for all users" ON public.lesson FOR
SELECT
USING (true);

CREATE POLICY "Subscribed users can select premium content" ON public.lesson FOR
SELECT
USING (EXISTS
    (SELECT 1
    FROM profile
    WHERE ((auth.uid() = profile.id) AND (profile.is_subscribed = true))))

-- Trigger automatically creates a public.profile entry when a new user is created in auth.users.
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER
AS $$
    BEGIN
        INSERT INTO public.profile (id, email)
        VALUES (NEW.id, NEW.email);
        RETURN NEW;
    END;
$$
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public;

CREATE TRIGGER create_new_profile_for_user
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_user();