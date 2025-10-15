# API & Database Reference for Cursor

## 🗄️ Complete Database Schema Reference

### Authentication Tables

#### auth.users (Supabase Managed)
**Do not directly reference** - use `public.user_profiles` instead

#### user_profiles
```typescript
interface UserProfile {
  id: uuid;                    // Primary key
  user_id: uuid;               // References auth.users.id
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  preferences: Record<string, any>;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**RLS Policies:**
- Users can manage their own profile
- Users can view their own profile only

#### user_roles
```typescript
type AppRole = 'admin' | 'moderator' | 'user';

interface UserRole {
  id: uuid;
  user_id: uuid;
  role: AppRole;
  created_at: timestamp;
}
```

**RLS Policies:**
- Users can view their own roles
- Admins can manage all roles

### Content Tables

#### bookmarks
```typescript
interface Bookmark {
  id: uuid;
  user_id: uuid;               // References auth.users
  title: string;               // Required
  url: string | null;
  description: string | null;
  content_type: string | null; // 'bookmark' | 'note' | 'article' | 'video'
  tags: string[];              // Array of tags
  collection_id: uuid | null;
  source_platform: string | null; // 'web' | 'youtube' | 'twitter' | 'manual'
  platform_id: string | null;
  
  // Visual metadata
  image_url: string | null;
  favicon_url: string | null;
  author_name: string | null;
  author_handle: string | null;
  author_avatar: string | null;
  author_verified: boolean;
  
  // Stats
  likes_count: number;
  thread_count: number;
  has_thread: boolean;
  images: string[];            // Array of image URLs
  
  // User preferences
  is_favorite: boolean;
  is_archived: boolean;
  is_private: boolean;
  read_status: string;         // 'unread' | 'reading' | 'read'
  
  // Analytics
  focus_score: number | null;
  reading_time_minutes: number;
  energy_level: number | null;
  mood: string | null;
  priority: string | null;
  
  // Metadata
  personal_metadata: Record<string, any>;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**RLS Policies:**
- Users can manage their own bookmarks
- Users can view public bookmarks OR their own

**Indexes:**
```sql
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_created_at ON bookmarks(created_at DESC);
CREATE INDEX idx_bookmarks_collection_id ON bookmarks(collection_id);
CREATE INDEX idx_bookmarks_tags ON bookmarks USING GIN(tags);
```

#### collections
```typescript
interface Collection {
  id: uuid;
  user_id: uuid;
  name: string;                // Required
  description: string | null;
  color: string;               // Hex color, default '#3B82F6'
  icon: string;                // Emoji, default '📁'
  is_public: boolean;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**RLS Policies:**
- Users can manage their own collections
- Users can view public collections OR their own

#### content_relationships
```typescript
interface ContentRelationship {
  id: uuid;
  source_id: uuid;             // References bookmarks
  target_id: uuid;             // References bookmarks
  relationship_type: string;   // 'related' | 'prerequisite' | 'similar'
  strength: number;            // 0.0 to 1.0
  notes: string | null;
  created_at: timestamp;
}
```

**RLS Policies:**
- Users can manage relationships for their own content

### Analytics Tables

#### daily_activities
```typescript
interface DailyActivity {
  id: uuid;
  user_id: uuid;
  activity_date: date;
  bookmarks_added: number;
  reading_time_minutes: number;
  focus_score: number;
  mood: string | null;
  energy_level: number | null;
  notes: string | null;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**Unique Constraint:** (user_id, activity_date)

**RLS Policies:**
- Users can manage their own daily activities

#### learning_streaks
```typescript
interface LearningStreak {
  id: uuid;
  user_id: uuid;               // Unique per user
  current_streak: number;
  longest_streak: number;
  last_activity_date: date;
  streak_type: string;         // 'daily' | 'weekly'
  created_at: timestamp;
  updated_at: timestamp;
}
```

**RLS Policies:**
- Users can manage their own learning streaks

### Learning Tables

#### learning_paths
```typescript
interface LearningPath {
  id: uuid;
  user_id: uuid;
  title: string;
  description: string | null;
  difficulty: string;          // 'beginner' | 'intermediate' | 'advanced'
  estimated_duration_hours: number;
  prerequisites: string[];
  outcomes: string[];
  progress_percentage: number;
  is_active: boolean;
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### learning_path_items
```typescript
interface LearningPathItem {
  id: uuid;
  learning_path_id: uuid;
  content_id: uuid | null;     // References bookmarks
  title: string;
  description: string | null;
  item_type: string;           // 'article' | 'video' | 'exercise' | 'quiz'
  order_index: number;
  estimated_duration_minutes: number;
  is_completed: boolean;
  completed_at: timestamp | null;
  created_at: timestamp;
}
```

### Smart Features Tables

#### smart_actionables
```typescript
interface SmartActionable {
  id: uuid;
  user_id: uuid;
  action_type: string;         // 'review_content' | 'organize_collection' | 'optimize_workflow'
  title: string;
  description: string | null;
  reasoning: string | null;    // AI explanation
  priority: number;            // 0.0 to 1.0
  suggested_content_ids: uuid[];
  is_completed: boolean;
  completed_at: timestamp | null;
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### bookmark_analysis
```typescript
interface BookmarkAnalysis {
  id: uuid;
  bookmark_id: uuid;
  analysis_type: string;       // 'summary' | 'tags' | 'category' | 'sentiment'
  provider: string | null;     // 'openai' | 'lovable-ai' | 'custom'
  result: Record<string, any>; // JSON result
  confidence_score: number;
  created_at: timestamp;
}
```

## 🔧 Database Functions

### has_role
```sql
CREATE FUNCTION has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

**Usage:**
```sql
SELECT has_role(auth.uid(), 'admin');
```

### update_learning_streak
```sql
CREATE FUNCTION update_learning_streak(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
```

**Usage from TypeScript:**
```typescript
await supabase.rpc('update_learning_streak', { user_uuid: user.id });
```

### track_daily_activity
```sql
CREATE FUNCTION track_daily_activity(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
```

### generate_smart_actionables
```sql
CREATE FUNCTION generate_smart_actionables(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
```

## 📡 API Patterns

### 1. Bookmark Operations

#### Create Bookmark
```typescript
import { supabase } from '@/integrations/supabase/client';

const createBookmark = async (data: {
  title: string;
  url?: string;
  description?: string;
  tags?: string[];
  collection_id?: string;
}) => {
  const { data: bookmark, error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: user.id,  // From useAuth
      ...data,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) throw error;
  return bookmark;
};
```

#### Fetch User Bookmarks
```typescript
const fetchBookmarks = async (filters?: {
  collection_id?: string;
  is_favorite?: boolean;
  is_archived?: boolean;
  search?: string;
}) => {
  let query = supabase
    .from('bookmarks')
    .select(`
      *,
      collection:collections(id, name, color, icon)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  if (filters?.collection_id) {
    query = query.eq('collection_id', filters.collection_id);
  }
  
  if (filters?.is_favorite) {
    query = query.eq('is_favorite', true);
  }
  
  if (filters?.is_archived !== undefined) {
    query = query.eq('is_archived', filters.is_archived);
  }
  
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};
```

#### Update Bookmark
```typescript
const updateBookmark = async (id: string, updates: Partial<Bookmark>) => {
  const { error } = await supabase
    .from('bookmarks')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id); // Security: only update own bookmarks
  
  if (error) throw error;
};
```

#### Delete Bookmark
```typescript
const deleteBookmark = async (id: string) => {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
  
  if (error) throw error;
};
```

### 2. Collection Operations

#### Create Collection
```typescript
const createCollection = async (data: {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}) => {
  const { data: collection, error } = await supabase
    .from('collections')
    .insert({
      user_id: user.id,
      ...data,
    })
    .select()
    .single();
  
  if (error) throw error;
  return collection;
};
```

#### Fetch Collections with Count
```typescript
const fetchCollectionsWithCount = async () => {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      bookmarks:bookmarks(count)
    `)
    .eq('user_id', user.id);
  
  if (error) throw error;
  return data;
};
```

### 3. Search Operations

#### Full-Text Search
```typescript
const searchBookmarks = async (query: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
    .limit(20);
  
  if (error) throw error;
  return data;
};
```

### 4. Analytics Operations

#### Track Activity
```typescript
const trackActivity = async () => {
  await supabase.rpc('track_daily_activity', {
    user_uuid: user.id
  });
};
```

#### Fetch Analytics Data
```typescript
const fetchAnalytics = async (days: number = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('daily_activities')
    .select('*')
    .eq('user_id', user.id)
    .gte('activity_date', startDate.toISOString())
    .order('activity_date', { ascending: true });
  
  if (error) throw error;
  return data;
};
```

#### Get Learning Streak
```typescript
const getLearningStreak = async () => {
  const { data, error } = await supabase
    .from('learning_streaks')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  if (error) throw error;
  return data;
};
```

### 5. Smart Features

#### Generate Actionables
```typescript
const generateActionables = async () => {
  await supabase.rpc('generate_smart_actionables', {
    user_uuid: user.id
  });
};
```

#### Fetch Actionables
```typescript
const fetchActionables = async () => {
  const { data, error } = await supabase
    .from('smart_actionables')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_completed', false)
    .order('priority', { ascending: false });
  
  if (error) throw error;
  return data;
};
```

## 🔒 Security Patterns

### Always Include User ID
```typescript
// ✅ CORRECT - Filters by user_id
const { data } = await supabase
  .from('bookmarks')
  .select('*')
  .eq('user_id', user.id);

// ❌ WRONG - Missing user_id filter
const { data } = await supabase
  .from('bookmarks')
  .select('*');
```

### Check Authentication
```typescript
import { useAuth } from '@/hooks/use-auth';

const MyComponent = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/auth" />;
  
  // Safe to use user.id
};
```

### Validate Before Database Operations
```typescript
import { bookmarkSchema } from '@/lib/validation';

const createBookmark = async (formData: any) => {
  // Validate first
  const validated = bookmarkSchema.parse(formData);
  
  // Then insert
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: user.id,
      ...validated
    })
    .select()
    .single();
};
```

## 🚀 Real-time Subscriptions

### Subscribe to Bookmark Changes
```typescript
useEffect(() => {
  const channel = supabase
    .channel('bookmarks-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookmarks',
        filter: `user_id=eq.${user.id}`
      },
      (payload) => {
        console.log('Bookmark changed:', payload);
        // Update local state
      }
    )
    .subscribe();
  
  return () => {
    supabase.removeChannel(channel);
  };
}, [user.id]);
```

## 📊 Query Optimization

### Use Select Specific Columns
```typescript
// ✅ GOOD - Only select needed columns
const { data } = await supabase
  .from('bookmarks')
  .select('id, title, url, created_at')
  .eq('user_id', user.id);

// ❌ BAD - Selects all columns
const { data } = await supabase
  .from('bookmarks')
  .select('*')
  .eq('user_id', user.id);
```

### Use Pagination
```typescript
const fetchPaginatedBookmarks = async (page: number, pageSize: number = 20) => {
  const from = page * pageSize;
  const to = from + pageSize - 1;
  
  const { data, error, count } = await supabase
    .from('bookmarks')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)
    .range(from, to)
    .order('created_at', { ascending: false });
  
  return { data, count };
};
```

## 🔄 React Query Integration

### Custom Hook Pattern
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useBookmarks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ['bookmarks', user?.id],
    queryFn: () => fetchBookmarks(),
    enabled: !!user,
  });
  
  const createMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
  
  return {
    bookmarks,
    isLoading,
    createBookmark: createMutation.mutate,
  };
};
```

---

**This reference covers all database operations and API patterns needed for Cursor development.**
