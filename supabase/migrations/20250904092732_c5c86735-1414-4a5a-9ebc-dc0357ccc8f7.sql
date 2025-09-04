-- Update track_daily_activity function with SET search_path
CREATE OR REPLACE FUNCTION public.track_daily_activity(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    today_bookmarks INTEGER;
    today_reading_time INTEGER;
    avg_focus_score FLOAT;
BEGIN
    -- Count bookmarks added today
    SELECT COUNT(*) INTO today_bookmarks
    FROM bookmarks 
    WHERE user_id = user_uuid AND DATE(created_at) = CURRENT_DATE;
    
    -- Calculate reading time for today
    SELECT COALESCE(SUM(reading_time_minutes), 0) INTO today_reading_time
    FROM bookmarks 
    WHERE user_id = user_uuid AND DATE(created_at) = CURRENT_DATE;
    
    -- Calculate average focus score for today
    SELECT COALESCE(AVG(focus_score), 0.0) INTO avg_focus_score
    FROM bookmarks 
    WHERE user_id = user_uuid AND DATE(created_at) = CURRENT_DATE;
    
    -- Insert or update daily activity
    INSERT INTO daily_activities (user_id, activity_date, bookmarks_added, reading_time_minutes, focus_score)
    VALUES (user_uuid, CURRENT_DATE, today_bookmarks, today_reading_time, avg_focus_score)
    ON CONFLICT (user_id, activity_date) 
    DO UPDATE SET 
        bookmarks_added = EXCLUDED.bookmarks_added,
        reading_time_minutes = EXCLUDED.reading_time_minutes,
        focus_score = EXCLUDED.focus_score,
        updated_at = NOW();
END;
$function$;

-- Update update_updated_at_column function with SET search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;