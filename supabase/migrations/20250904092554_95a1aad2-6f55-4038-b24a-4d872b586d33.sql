-- Fix security issue: Remove SECURITY DEFINER from bookmark_insights view
-- Drop the existing view that has SECURITY DEFINER
DROP VIEW IF EXISTS public.bookmark_insights;

-- Recreate the view without SECURITY DEFINER (defaults to SECURITY INVOKER)
-- This ensures the view respects the permissions and RLS policies of the querying user
CREATE VIEW public.bookmark_insights AS
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