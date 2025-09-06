-- Enable Row Level Security on bookmark_insights table
ALTER TABLE public.bookmark_insights ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on mobile_bookmarks table  
ALTER TABLE public.mobile_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for bookmark_insights - users can only access insights for their own bookmarks
CREATE POLICY "Users can view their own bookmark insights" 
ON public.bookmark_insights 
FOR SELECT 
USING (
  auth.uid() IN (
    SELECT bookmarks.user_id 
    FROM bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);

-- Create RLS policy for bookmark_insights - users can insert insights for their own bookmarks
CREATE POLICY "Users can create insights for their own bookmarks" 
ON public.bookmark_insights 
FOR INSERT 
WITH CHECK (
  auth.uid() IN (
    SELECT bookmarks.user_id 
    FROM bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);

-- Create RLS policy for bookmark_insights - users can update insights for their own bookmarks
CREATE POLICY "Users can update their own bookmark insights" 
ON public.bookmark_insights 
FOR UPDATE 
USING (
  auth.uid() IN (
    SELECT bookmarks.user_id 
    FROM bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);

-- Create RLS policy for bookmark_insights - users can delete insights for their own bookmarks
CREATE POLICY "Users can delete their own bookmark insights" 
ON public.bookmark_insights 
FOR DELETE 
USING (
  auth.uid() IN (
    SELECT bookmarks.user_id 
    FROM bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);

-- Create RLS policy for mobile_bookmarks - users can only access their own bookmarks
CREATE POLICY "Users can view their own mobile bookmarks" 
ON public.mobile_bookmarks 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create RLS policy for mobile_bookmarks - users can insert their own bookmarks
CREATE POLICY "Users can create their own mobile bookmarks" 
ON public.mobile_bookmarks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policy for mobile_bookmarks - users can update their own bookmarks
CREATE POLICY "Users can update their own mobile bookmarks" 
ON public.mobile_bookmarks 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policy for mobile_bookmarks - users can delete their own bookmarks
CREATE POLICY "Users can delete their own mobile bookmarks" 
ON public.mobile_bookmarks 
FOR DELETE 
USING (auth.uid() = user_id);