# Backend Setup Guide for Cursor

## 🔌 Connecting to Existing Supabase Backend

This project is already connected to a Supabase backend. All database tables, RLS policies, and functions are configured and ready to use.

## 📊 Supabase Configuration

**Project ID:** `srjirjaldpdvsafsuyes`  
**Project URL:** `https://srjirjaldpdvsafsuyes.supabase.co`  
**Anon Key:** Already configured in `src/integrations/supabase/client.ts`

## 🗄️ Database Schema Overview

All tables are created with Row-Level Security (RLS) enabled:

### Core Tables
- `user_profiles` - User profile information
- `user_roles` - Role-based access control (admin, moderator, user)
- `bookmarks` - Main content storage (tweets, articles, notes, etc.)
- `collections` - Organize bookmarks into collections
- `bookmark_analysis` - AI-powered bookmark analysis
- `bookmark_insights` - AI-generated insights and metadata

### Analytics & Learning
- `daily_activities` - Daily activity tracking
- `learning_streaks` - Learning streak management
- `learning_paths` - Structured learning paths
- `learning_path_items` - Individual items in learning paths
- `smart_actionables` - AI-generated action suggestions

### Relationships
- `content_relationships` - Graph connections between content

## 🔐 Authentication Flow

The project uses Supabase Auth with email/password authentication.

### User Registration Flow
1. User signs up via `/auth` page
2. `handle_new_user()` trigger creates:
   - User profile in `user_profiles`
   - Default role in `user_roles`
3. User is redirected to home page

### Protected Routes
Use the `RequireAuth` component to protect routes:

```typescript
import { RequireAuth } from '@/hooks/use-auth';

// In App.tsx
<Route path="/protected" element={
  <RequireAuth>
    <ProtectedPage />
  </RequireAuth>
} />
```

### Getting Current User
```typescript
import { useAuth } from '@/hooks/use-auth';

const { user, session, loading } = useAuth();
```

## 📝 CRUD Operations

### Bookmarks

**Create:**
```typescript
const { data, error } = await supabase
  .from('bookmarks')
  .insert({
    user_id: user.id,
    title: 'Article Title',
    url: 'https://example.com',
    description: 'Description',
    tags: ['tag1', 'tag2'],
    collection_id: 'uuid-here' // optional
  })
  .select()
  .single();
```

**Read:**
```typescript
const { data, error } = await supabase
  .from('bookmarks')
  .select('*, collections(*)')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

**Update:**
```typescript
const { data, error } = await supabase
  .from('bookmarks')
  .update({ 
    title: 'New Title',
    is_favorite: true 
  })
  .eq('id', bookmarkId)
  .select()
  .single();
```

**Delete:**
```typescript
const { error } = await supabase
  .from('bookmarks')
  .delete()
  .eq('id', bookmarkId);
```

### Collections

**Create Collection:**
```typescript
const { data, error } = await supabase
  .from('collections')
  .insert({
    user_id: user.id,
    name: 'My Collection',
    description: 'Collection description',
    color: '#3B82F6',
    icon: '📚'
  })
  .select()
  .single();
```

**Get Collections with Bookmark Count:**
```typescript
const { data, error } = await supabase
  .from('collections')
  .select(`
    *,
    bookmarks:bookmarks(count)
  `)
  .eq('user_id', user.id);
```

### Daily Activities

**Track Activity:**
```typescript
// Call the database function
const { error } = await supabase
  .rpc('track_daily_activity', { 
    user_uuid: user.id 
  });
```

**Get Activity Data:**
```typescript
const { data, error } = await supabase
  .from('daily_activities')
  .select('*')
  .eq('user_id', user.id)
  .gte('activity_date', '2024-01-01')
  .order('activity_date', { ascending: false });
```

### Learning Streaks

**Update Streak:**
```typescript
const { error } = await supabase
  .rpc('update_learning_streak', { 
    user_uuid: user.id 
  });
```

**Get Current Streak:**
```typescript
const { data, error } = await supabase
  .from('learning_streaks')
  .select('*')
  .eq('user_id', user.id)
  .single();
```

### Smart Actionables

**Generate Actionables:**
```typescript
const { error } = await supabase
  .rpc('generate_smart_actionables', { 
    user_uuid: user.id 
  });
```

**Get Actionables:**
```typescript
const { data, error } = await supabase
  .from('smart_actionables')
  .select('*')
  .eq('user_id', user.id)
  .eq('is_completed', false)
  .order('priority', { ascending: false });
```

## 🔍 Search Implementation

### Full-Text Search
```typescript
const { data, error } = await supabase
  .from('bookmarks')
  .select('*')
  .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
  .eq('user_id', user.id)
  .limit(20);
```

### Tag-Based Search
```typescript
const { data, error } = await supabase
  .from('bookmarks')
  .select('*')
  .contains('tags', [searchTag])
  .eq('user_id', user.id);
```

### Advanced Filters
```typescript
const { data, error } = await supabase
  .from('bookmarks')
  .select('*')
  .eq('user_id', user.id)
  .eq('is_favorite', true)
  .gte('created_at', startDate)
  .lte('created_at', endDate)
  .order('created_at', { ascending: false });
```

## 📊 Database Functions

### Available Functions

1. **track_daily_activity(user_uuid)** - Track user's daily activity
2. **update_learning_streak(user_uuid)** - Update learning streak
3. **generate_smart_actionables(user_uuid)** - Generate AI suggestions
4. **has_role(user_id, role)** - Check user role
5. **extract_domain_from_url(url)** - Extract domain from URL
6. **format_time_ago(timestamp)** - Format timestamp as relative time

## 🎨 Real-time Subscriptions

### Listen to Bookmark Changes
```typescript
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
      console.log('Change received!', payload);
      // Refresh data
    }
  )
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

## 🔒 Security Notes

1. **RLS is Enabled:** All tables have Row-Level Security policies
2. **User Isolation:** Users can only access their own data
3. **Role-Based Access:** Admin features use `has_role()` function
4. **Input Validation:** Always validate input on client side
5. **Never Expose Secrets:** Use environment variables for sensitive data

## 🚀 Edge Functions (Future Implementation)

When implementing Edge Functions, create them in `supabase/functions/`:

### Example: Content Capture
```typescript
// supabase/functions/capture-web-content/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { url } = await req.json();
  
  // Create Supabase client with service role
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
  
  // Your logic here
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

## 📱 React Hooks Pattern

Create custom hooks for data operations:

```typescript
// src/hooks/use-bookmarks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';

export function useBookmarks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ['bookmarks', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*, collections(*)')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createBookmark = useMutation({
    mutationFn: async (bookmark: any) => {
      const { data, error } = await supabase
        .from('bookmarks')
        .insert({ ...bookmark, user_id: user!.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  return { bookmarks, isLoading, createBookmark };
}
```

## 🧪 Testing Database

Use Supabase SQL Editor to test queries:
https://supabase.com/dashboard/project/srjirjaldpdvsafsuyes/sql/new

## 📚 Additional Resources

- [CURSOR_API_REFERENCE.md](./CURSOR_API_REFERENCE.md) - Complete API documentation
- [CURSOR_FEATURE_ROADMAP.md](./CURSOR_FEATURE_ROADMAP.md) - Feature implementation plan
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
