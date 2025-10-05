# Backend Development with Cursor IDE

This guide helps you set up and develop the backend for this Knowledge Hub application using Cursor IDE.

## Project Overview

This is a full-stack knowledge management application built with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL database + Edge Functions)
- **Hosting**: Lovable Cloud

## Quick Start for Backend Development

### 1. Clone from GitHub

```bash
git clone <your-repo-url>
cd <project-name>
npm install
```

### 2. Set Up Supabase Locally (Optional)

For local backend development:

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# This will give you local URLs and keys
```

### 3. Environment Variables

Create a `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from:
- Lovable Dashboard → Settings → Supabase Connection
- Or Supabase Dashboard → Project Settings → API

## Database Schema

### Current Tables

```sql
-- User Profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Collections
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Smart Actionables
CREATE TABLE smart_actionables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Learning Paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Learning Streaks
CREATE TABLE learning_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Daily Activities
CREATE TABLE daily_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_date DATE NOT NULL,
  items_saved INTEGER DEFAULT 0,
  actions_completed INTEGER DEFAULT 0,
  reading_time_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Row Level Security (RLS)

All tables have RLS enabled with policies like:

```sql
-- Users can only see their own data
CREATE POLICY "Users view own data" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data  
CREATE POLICY "Users insert own data" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "Users update own data" ON bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "Users delete own data" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);
```

## Adding New Features

### 1. Create a Migration

```bash
cd supabase/migrations
# Create new migration file with timestamp
# Format: YYYYMMDDHHMMSS_description.sql

# Example: 20250105120000_add_tags_table.sql
```

```sql
-- Example: Add tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own tags" ON tags
  FOR ALL USING (auth.uid() = user_id);
```

### 2. Create Edge Function (Optional)

For serverless backend logic:

```bash
supabase/functions/my-function/index.ts
```

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  // Your logic here
  const { data, error } = await supabaseClient
    .from("bookmarks")
    .select("*");

  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### 3. Update Frontend Types

After database changes, update types:

```bash
# Generate TypeScript types from your Supabase schema
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

## Common Backend Tasks

### Add Authentication

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Sign out
const { error } = await supabase.auth.signOut();
```

### Query Data

```typescript
// Get current user's bookmarks
const { data, error } = await supabase
  .from('bookmarks')
  .select('*')
  .order('created_at', { ascending: false });

// Insert new bookmark
const { data, error } = await supabase
  .from('bookmarks')
  .insert({
    user_id: user.id,
    title: 'My Bookmark',
    url: 'https://example.com',
  });
```

### Real-time Subscriptions

```typescript
// Listen to changes
const subscription = supabase
  .channel('bookmarks-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'bookmarks' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
```

## Testing

### Local Testing

```bash
# Run frontend dev server
npm run dev

# Run Supabase locally
supabase start

# Reset local database
supabase db reset
```

### Run Migrations

```bash
# Apply all migrations
supabase migration up

# Create new migration from database changes
supabase db diff -f migration_name
```

## Deployment

### Push to GitHub

```bash
git add .
git commit -m "Add new feature"
git push origin main
```

Changes will automatically sync to Lovable if GitHub integration is connected.

### Database Migrations in Production

⚠️ **Important**: Database migrations in Lovable Cloud are applied through the Lovable interface:

1. Use the Lovable AI to create migrations
2. Review the migration
3. Approve and run through Lovable UI

Do NOT run migrations directly against production database.

## Security Best Practices

1. **Always use RLS**: Every table should have Row Level Security enabled
2. **Never expose service_role key**: Only use anon key in frontend
3. **Validate user_id**: Always check `auth.uid()` in policies
4. **Use SECURITY DEFINER carefully**: Add explicit auth checks in functions
5. **Sanitize inputs**: Use parameterized queries

## Cursor AI Tips

When using Cursor AI for backend development:

1. **Ask for schema changes**: "Create a migration to add a tags feature with many-to-many relationship"
2. **Request RLS policies**: "Add RLS policies for the tags table"
3. **Generate queries**: "Write a query to get all bookmarks with their tags"
4. **Create edge functions**: "Create an edge function to process bookmark content with AI"

## Troubleshooting

### Common Issues

**Issue**: RLS blocking queries
- **Fix**: Check that user is authenticated and policies are correct

**Issue**: Migration fails
- **Fix**: Check for syntax errors, missing dependencies, or conflicting changes

**Issue**: Types out of sync
- **Fix**: Regenerate types after schema changes

**Issue**: Local vs Production differences
- **Fix**: Ensure migrations are applied in both environments

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Lovable Documentation](https://docs.lovable.dev/)

## Getting Help

1. Check the [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
2. Review error logs in Supabase Dashboard → Database → Logs
3. Use Cursor AI to debug: "Why is this query failing?"
4. Check RLS policies: "Review the RLS policies for this table"
