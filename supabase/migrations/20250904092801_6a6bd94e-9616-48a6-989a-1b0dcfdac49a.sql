-- Final fix for SECURITY DEFINER views
-- Force recreate both views explicitly as SECURITY INVOKER

-- Drop and recreate bookmark_insights view
DROP VIEW IF EXISTS public.bookmark_insights CASCADE;
CREATE VIEW public.bookmark_insights 
WITH (security_invoker = true) AS
SELECT 
    b.id AS bookmark_id,
    b.title,
    b.content_type,
    b.mood,
    b.priority,
    b.focus_score,
    jsonb_build_object(
        'sentiment', (
            SELECT ba.result 
            FROM bookmark_analysis ba 
            WHERE ba.bookmark_id = b.id 
            AND ba.analysis_type = 'sentiment' 
            LIMIT 1
        ),
        'categories', (
            SELECT ba.result 
            FROM bookmark_analysis ba 
            WHERE ba.bookmark_id = b.id 
            AND ba.analysis_type = 'categories' 
            LIMIT 1
        ),
        'keywords', (
            SELECT ba.result 
            FROM bookmark_analysis ba 
            WHERE ba.bookmark_id = b.id 
            AND ba.analysis_type = 'keywords' 
            LIMIT 1
        )
    ) AS ai_insights
FROM bookmarks b;

-- Drop and recreate mobile_bookmarks view
DROP VIEW IF EXISTS public.mobile_bookmarks CASCADE;
CREATE VIEW public.mobile_bookmarks 
WITH (security_invoker = true) AS
SELECT 
    id,
    user_id,
    collection_id,
    title,
    description,
    url,
    source_platform,
    platform_id,
    tags,
    content_type,
    is_favorite,
    is_archived,
    read_status,
    image_url,
    favicon_url,
    reading_time_minutes,
    created_at,
    updated_at,
    personal_metadata,
    mood,
    priority,
    energy_level,
    focus_score
FROM bookmarks
WHERE (is_private = false) OR (user_id = auth.uid());