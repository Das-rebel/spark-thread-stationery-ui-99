-- Fix security issue: Restrict user_profiles access
-- Drop the overly permissive policy that allows public access to all profiles
DROP POLICY IF EXISTS "Users can view public profiles" ON public.user_profiles;

-- Create a more secure policy that only allows users to view their own profiles
CREATE POLICY "Users can view own profile only" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- If you need public profile viewing in the future, you can add a separate policy
-- that checks for a specific "is_public" column or similar privacy control mechanism