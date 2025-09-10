-- Ensure bookmark_insights view has proper security settings and check for any table conflicts
-- First, check if there's a table with the same name and drop it if exists
DROP TABLE IF EXISTS public.bookmark_insights CASCADE;

-- Recreate the view with explicit security settings to ensure proper protection
DROP VIEW IF EXISTS public.bookmark_insights CASCADE;

CREATE VIEW public.bookmark_insights 
WITH (security_invoker = true, security_barrier = true)
AS 
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
            WHERE ba.bookmark_id = b.id AND ba.analysis_type = 'sentiment'
            LIMIT 1
        ),
        'categories', (
            SELECT ba.result
            FROM bookmark_analysis ba
            WHERE ba.bookmark_id = b.id AND ba.analysis_type = 'categories'
            LIMIT 1
        ),
        'keywords', (
            SELECT ba.result
            FROM bookmark_analysis ba
            WHERE ba.bookmark_id = b.id AND ba.analysis_type = 'keywords'
            LIMIT 1
        )
    ) AS ai_insights
FROM bookmarks b
WHERE b.user_id = auth.uid();

-- Add a comment to document the security approach
COMMENT ON VIEW public.bookmark_insights IS 'Secure view that exposes bookmark insights filtered by authenticated user. Uses security_invoker=true to inherit RLS from underlying tables.';