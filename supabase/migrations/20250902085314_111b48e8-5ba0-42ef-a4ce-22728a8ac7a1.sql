-- Fix function search path security warnings by setting search_path
DROP FUNCTION IF EXISTS public.extract_domain_from_url(TEXT);
DROP FUNCTION IF EXISTS public.format_time_ago(TIMESTAMP WITH TIME ZONE);

-- Recreate functions with secure search_path
CREATE OR REPLACE FUNCTION public.extract_domain_from_url(url_input TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.format_time_ago(timestamp_input TIMESTAMP WITH TIME ZONE)
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;