-- Add Twitter-specific metadata fields to bookmarks table
ALTER TABLE public.bookmarks 
ADD COLUMN IF NOT EXISTS author_name TEXT,
ADD COLUMN IF NOT EXISTS author_handle TEXT,
ADD COLUMN IF NOT EXISTS author_avatar TEXT,
ADD COLUMN IF NOT EXISTS author_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS has_thread BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS thread_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Add domain extraction function if URL is provided
CREATE OR REPLACE FUNCTION public.extract_domain_from_url(url_input TEXT)
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;

-- Create function to format timestamp for UI
CREATE OR REPLACE FUNCTION public.format_time_ago(timestamp_input TIMESTAMP WITH TIME ZONE)
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;