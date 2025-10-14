-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Fix nullable user_id columns to be NOT NULL
ALTER TABLE public.bookmarks ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.collections ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.daily_activities ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.learning_paths ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.learning_streaks ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.smart_actionables ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.user_profiles ALTER COLUMN user_id SET NOT NULL;

-- Add authorization checks to security definer functions
CREATE OR REPLACE FUNCTION public.update_learning_streak(user_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_date_val DATE := CURRENT_DATE;
    last_activity DATE;
    current_streak_val INTEGER;
    longest_streak_val INTEGER;
BEGIN
    -- Authorization check: users can only update their own streaks
    IF auth.uid() != user_uuid THEN
        RAISE EXCEPTION 'Unauthorized: Cannot update another user''s streak';
    END IF;
    
    SELECT last_activity_date, current_streak, longest_streak 
    INTO last_activity, current_streak_val, longest_streak_val
    FROM learning_streaks 
    WHERE user_id = user_uuid;
    
    IF last_activity IS NULL THEN
        INSERT INTO learning_streaks (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (user_uuid, 1, 1, current_date_val);
        RETURN;
    END IF;
    
    IF last_activity = current_date_val - INTERVAL '1 day' THEN
        current_streak_val := current_streak_val + 1;
        longest_streak_val := GREATEST(current_streak_val, longest_streak_val);
    ELSIF last_activity = current_date_val THEN
        RETURN;
    ELSE
        current_streak_val := 1;
    END IF;
    
    UPDATE learning_streaks 
    SET current_streak = current_streak_val,
        longest_streak = longest_streak_val,
        last_activity_date = current_date_val,
        updated_at = NOW()
    WHERE user_id = user_uuid;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_smart_actionables(user_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    unorganized_count INTEGER;
    recent_bookmarks_count INTEGER;
    low_focus_count INTEGER;
BEGIN
    -- Authorization check
    IF auth.uid() != user_uuid THEN
        RAISE EXCEPTION 'Unauthorized: Cannot generate actionables for another user';
    END IF;
    
    SELECT COUNT(*) INTO unorganized_count
    FROM bookmarks 
    WHERE user_id = user_uuid AND collection_id IS NULL;
    
    SELECT COUNT(*) INTO recent_bookmarks_count
    FROM bookmarks 
    WHERE user_id = user_uuid AND created_at >= CURRENT_DATE - INTERVAL '7 days';
    
    SELECT COUNT(*) INTO low_focus_count
    FROM bookmarks 
    WHERE user_id = user_uuid AND focus_score < 0.5;
    
    IF unorganized_count > 5 THEN
        INSERT INTO smart_actionables (user_id, action_type, title, description, priority, reasoning)
        VALUES (user_uuid, 'organize_collection', 'Organize Unorganized Content', 
                'You have ' || unorganized_count || ' bookmarks without collections. Consider organizing them.', 
                0.8, 'High number of unorganized items detected');
    END IF;
    
    IF recent_bookmarks_count > 10 THEN
        INSERT INTO smart_actionables (user_id, action_type, title, description, priority, reasoning)
        VALUES (user_uuid, 'review_content', 'Review Recent Additions', 
                'You''ve added ' || recent_bookmarks_count || ' bookmarks this week. Consider reviewing them.', 
                0.6, 'High volume of recent content detected');
    END IF;
    
    IF low_focus_count > 3 THEN
        INSERT INTO smart_actionables (user_id, action_type, title, description, priority, reasoning)
        VALUES (user_uuid, 'optimize_workflow', 'Improve Focus Quality', 
                'You have ' || low_focus_count || ' items with low focus scores. Consider improving content quality.', 
                0.7, 'Low focus content detected');
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.track_daily_activity(user_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    today_bookmarks INTEGER;
    today_reading_time INTEGER;
    avg_focus_score FLOAT;
BEGIN
    -- Authorization check
    IF auth.uid() != user_uuid THEN
        RAISE EXCEPTION 'Unauthorized: Cannot track activity for another user';
    END IF;
    
    SELECT COUNT(*) INTO today_bookmarks
    FROM bookmarks 
    WHERE user_id = user_uuid AND DATE(created_at) = CURRENT_DATE;
    
    SELECT COALESCE(SUM(reading_time_minutes), 0) INTO today_reading_time
    FROM bookmarks 
    WHERE user_id = user_uuid AND DATE(created_at) = CURRENT_DATE;
    
    SELECT COALESCE(AVG(focus_score), 0.0) INTO avg_focus_score
    FROM bookmarks 
    WHERE user_id = user_uuid AND DATE(created_at) = CURRENT_DATE;
    
    INSERT INTO daily_activities (user_id, activity_date, bookmarks_added, reading_time_minutes, focus_score)
    VALUES (user_uuid, CURRENT_DATE, today_bookmarks, today_reading_time, avg_focus_score)
    ON CONFLICT (user_id, activity_date) 
    DO UPDATE SET 
        bookmarks_added = EXCLUDED.bookmarks_added,
        reading_time_minutes = EXCLUDED.reading_time_minutes,
        focus_score = EXCLUDED.focus_score,
        updated_at = NOW();
END;
$$;

-- Trigger to auto-create user profile and assign default role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create user profile
    INSERT INTO public.user_profiles (user_id, full_name, username)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'username'
    );
    
    -- Assign default user role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();