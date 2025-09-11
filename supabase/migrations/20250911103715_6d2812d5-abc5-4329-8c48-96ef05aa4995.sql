-- Enable Row Level Security on bookmark_insights table
ALTER TABLE public.bookmark_insights ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view only insights for their own bookmarks
CREATE POLICY "Users can view own bookmark insights" 
ON public.bookmark_insights 
FOR SELECT 
USING (
  auth.uid() IN (
    SELECT user_id 
    FROM public.bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);

-- Create policy to allow users to insert insights for their own bookmarks
CREATE POLICY "Users can insert own bookmark insights" 
ON public.bookmark_insights 
FOR INSERT 
WITH CHECK (
  auth.uid() IN (
    SELECT user_id 
    FROM public.bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);

-- Create policy to allow users to update insights for their own bookmarks
CREATE POLICY "Users can update own bookmark insights" 
ON public.bookmark_insights 
FOR UPDATE 
USING (
  auth.uid() IN (
    SELECT user_id 
    FROM public.bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);

-- Create policy to allow users to delete insights for their own bookmarks
CREATE POLICY "Users can delete own bookmark insights" 
ON public.bookmark_insights 
FOR DELETE 
USING (
  auth.uid() IN (
    SELECT user_id 
    FROM public.bookmarks 
    WHERE bookmarks.id = bookmark_insights.bookmark_id
  )
);