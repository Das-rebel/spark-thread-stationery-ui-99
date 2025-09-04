-- Fix function search path security warnings
-- Add SET search_path = public to all custom functions

-- Update extract_domain_from_url function
CREATE OR REPLACE FUNCTION public.extract_domain_from_url(url_input text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    IF url_input IS NULL OR url_input = '' THEN
        RETURN NULL;
    END IF;
    
    -- Remove protocol and www, extract domain
    RETURN regexp_replace(
        regexp_replace(url_input, '^https?://(www\.)?', ''),
        '/.*$', ''
    );
END;
$function$;

-- Update format_time_ago function
CREATE OR REPLACE FUNCTION public.format_time_ago(timestamp_input timestamp with time zone)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    time_diff INTERVAL;
    hours_diff INTEGER;
    days_diff INTEGER;
BEGIN
    time_diff := NOW() - timestamp_input;
    hours_diff := EXTRACT(EPOCH FROM time_diff) / 3600;
    days_diff := EXTRACT(EPOCH FROM time_diff) / 86400;
    
    IF hours_diff < 1 THEN
        RETURN 'now';
    ELSIF hours_diff < 24 THEN
        RETURN hours_diff || 'h';
    ELSIF days_diff < 7 THEN
        RETURN days_diff || 'd';
    ELSE
        RETURN TO_CHAR(timestamp_input, 'MMM DD');
    END IF;
END;
$function$;

-- Update update_learning_streak function
CREATE OR REPLACE FUNCTION public.update_learning_streak(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    current_date_val DATE := CURRENT_DATE;
    last_activity DATE;
    current_streak_val INTEGER;
    longest_streak_val INTEGER;
BEGIN
    -- Get current streak info
    SELECT last_activity_date, current_streak, longest_streak 
    INTO last_activity, current_streak_val, longest_streak_val
    FROM learning_streaks 
    WHERE user_id = user_uuid;
    
    -- If no streak record exists, create one
    IF last_activity IS NULL THEN
        INSERT INTO learning_streaks (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (user_uuid, 1, 1, current_date_val);
        RETURN;
    END IF;
    
    -- Check if activity is consecutive
    IF last_activity = current_date_val - INTERVAL '1 day' THEN
        -- Consecutive day, increment streak
        current_streak_val := current_streak_val + 1;
        longest_streak_val := GREATEST(current_streak_val, longest_streak_val);
    ELSIF last_activity = current_date_val THEN
        -- Already updated today, do nothing
        RETURN;
    ELSE
        -- Break in streak, reset to 1
        current_streak_val := 1;
    END IF;
    
    -- Update streak record
    UPDATE learning_streaks 
    SET current_streak = current_streak_val,
        longest_streak = longest_streak_val,
        last_activity_date = current_date_val,
        updated_at = NOW()
    WHERE user_id = user_uuid;
END;
$function$;

-- Update generate_smart_actionables function
CREATE OR REPLACE FUNCTION public.generate_smart_actionables(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    unorganized_count INTEGER;
    recent_bookmarks_count INTEGER;
    low_focus_count INTEGER;
BEGIN
    -- Count unorganized bookmarks
    SELECT COUNT(*) INTO unorganized_count
    FROM bookmarks 
    WHERE user_id = user_uuid AND collection_id IS NULL;
    
    -- Count recent bookmarks
    SELECT COUNT(*) INTO recent_bookmarks_count
    FROM bookmarks 
    WHERE user_id = user_uuid AND created_at >= CURRENT_DATE - INTERVAL '7 days';
    
    -- Count low focus content
    SELECT COUNT(*) INTO low_focus_count
    FROM bookmarks 
    WHERE user_id = user_uuid AND focus_score < 0.5;
    
    -- Generate actionables based on patterns
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
$function$;