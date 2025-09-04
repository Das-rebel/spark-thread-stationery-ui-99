-- Fix security issue: Remove SECURITY DEFINER from mobile_bookmarks view
-- Drop the existing view that has SECURITY DEFINER
DROP VIEW IF EXISTS public.mobile_bookmarks;

-- Recreate the mobile_bookmarks view without SECURITY DEFINER (defaults to SECURITY INVOKER)
-- This ensures the view respects the permissions and RLS policies of the querying user
CREATE VIEW public.mobile_bookmarks AS
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