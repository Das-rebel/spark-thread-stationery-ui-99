import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

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

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'now';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return created.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const extractDomain = (url: string | null) => {
    if (!url) return undefined;
    try {
      const domain = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
      return domain;
    } catch {
      return undefined;
    }
  };

  const transformBookmarkToTweet = (bookmark: any): Tweet => {
    return {
      id: bookmark.id,
      author: {
        name: bookmark.author_name || 'Unknown Author',
        handle: bookmark.author_handle || '@unknown',
        avatar: bookmark.author_avatar || '📚',
        verified: bookmark.author_verified || false,
      },
      content: bookmark.description || bookmark.title || '',
      timestamp: formatTimeAgo(bookmark.created_at),
      stats: {
        likes: bookmark.likes_count || 0,
        retweets: 0, // Simplified - not using retweets as requested
        replies: 0, // Simplified - not using replies as requested
      },
      hasThread: bookmark.has_thread || false,
      threadCount: bookmark.thread_count || 0,
      images: bookmark.images || [],
      url: bookmark.url,
      domain: extractDomain(bookmark.url),
      source: (bookmark.source_platform as 'twitter' | 'whatsapp' | 'web') || 'twitter',
    };
  };

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (fetchError) {
        throw fetchError;
      }

      const transformedBookmarks = (data || []).map(transformBookmarkToTweet);
      setBookmarks(transformedBookmarks);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookmarks');
      toast({
        title: "Error loading bookmarks",
        description: "Failed to fetch your saved content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (newBookmark: Partial<Tweet>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const bookmarkData = {
        user_id: user.id,
        title: newBookmark.content || '',
        description: newBookmark.content || '',
        author_name: newBookmark.author?.name,
        author_handle: newBookmark.author?.handle,
        author_avatar: newBookmark.author?.avatar,
        author_verified: newBookmark.author?.verified || false,
        likes_count: newBookmark.stats?.likes || 0,
        has_thread: newBookmark.hasThread || false,
        thread_count: newBookmark.threadCount || 0,
        images: newBookmark.images || [],
        url: newBookmark.url,
        source_platform: newBookmark.source || 'twitter',
        content_type: 'bookmark',
      };

      const { data, error: insertError } = await supabase
        .from('bookmarks')
        .insert([bookmarkData])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      const transformedBookmark = transformBookmarkToTweet(data);
      setBookmarks(prev => [transformedBookmark, ...prev]);
      
      // Track bookmark creation
      analytics.bookmarkCreated(data.id, data.source_platform || 'unknown');
      
      toast({
        title: "Bookmark added! 🔖",
        description: "Added to your knowledge vault",
      });

      return transformedBookmark;
    } catch (err) {
      console.error('Error adding bookmark:', err);
      toast({
        title: "Error adding bookmark",
        description: "Failed to save bookmark. Please try again.",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return {
    bookmarks,
    loading,
    error,
    refetch: fetchBookmarks,
    addBookmark,
  };
}