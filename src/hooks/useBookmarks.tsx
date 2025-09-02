import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Tweet {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  stats: {
    likes: number;
    retweets: number;
    replies: number;
  };
  hasThread: boolean;
  threadCount: number;
  images: string[];
  url?: string;
  domain?: string;
  source?: 'twitter' | 'whatsapp' | 'web';
}

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) return 'now';
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;
  
  return time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const extractDomain = (url: string | null) => {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return undefined;
  }
};

const transformBookmarkToTweet = (bookmark: any): Tweet => {
  return {
    id: bookmark.id,
    author: {
      name: bookmark.author_name || 'Anonymous',
      handle: bookmark.author_handle || '@unknown',
      avatar: bookmark.author_avatar || '📱',
      verified: bookmark.author_verified || false,
    },
    content: bookmark.description || bookmark.title || 'No content available',
    timestamp: formatTimeAgo(bookmark.created_at),
    stats: {
      likes: bookmark.likes_count || 0,
      retweets: 0, // Simplified as requested
      replies: 0,  // Simplified as requested
    },
    hasThread: bookmark.has_thread || false,
    threadCount: bookmark.thread_count || 0,
    images: bookmark.images || [],
    url: bookmark.url,
    domain: extractDomain(bookmark.url),
    source: bookmark.source_platform as 'twitter' | 'whatsapp' | 'web' || 'twitter',
  };
};

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const transformedBookmarks = (data || []).map(transformBookmarkToTweet);
      setBookmarks(transformedBookmarks);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookmarks');
      toast({
        title: "Error loading bookmarks",
        description: "Failed to load your saved content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addMockBookmark = () => {
    const newBookmark = {
      id: String(Date.now()),
      author: {
        name: "Fresh Knowledge",
        handle: "@freshknowledge",
        avatar: "✨",
        verified: false,
      },
      content: "Just refreshed! Here's a brand new bookmark about the latest breakthrough in AI research.",
      timestamp: "now",
      stats: { likes: 0, retweets: 0, replies: 0 },
      hasThread: false,
      threadCount: 0,
      images: [],
      url: "https://example.com/fresh-ai-research",
      domain: "research.ai",
      source: 'twitter' as const,
    };
    
    setBookmarks(prev => [newBookmark, ...prev]);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return {
    bookmarks,
    loading,
    error,
    refetch: fetchBookmarks,
    addMockBookmark,
  };
}