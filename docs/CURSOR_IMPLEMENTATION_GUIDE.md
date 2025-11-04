# Cursor Implementation Guide

## 🎯 Purpose

This guide provides step-by-step instructions for implementing the Brain Spark UI in Cursor with full backend connectivity to the existing Supabase instance.

---

## 📋 Prerequisites

### 1. Environment Setup
```bash
# Node.js 18+ required
node --version

# Install dependencies
npm install

# Copy environment variables (already configured)
# VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are in code
```

### 2. Supabase Connection
The project is pre-configured to connect to Supabase:
- **Project URL:** Already embedded in `src/integrations/supabase/client.ts`
- **Anon Key:** Already embedded in client config
- **Database:** Tables and RLS policies are deployed
- **Authentication:** Email/password and Google OAuth enabled

---

## 🏗️ Implementation Phases

### Phase 1: Core Authentication (Week 1)

#### 1.1 Auth Hook Setup
File: `src/hooks/use-auth.tsx`

**Already Implemented:**
- Sign up with email/password
- Sign in with email/password
- Sign out functionality
- Session management
- User state tracking

**Test Checklist:**
- [ ] User can sign up with valid email
- [ ] User receives confirmation email
- [ ] User can sign in with credentials
- [ ] User session persists on refresh
- [ ] User can sign out successfully

#### 1.2 Protected Routes
File: `src/main.tsx`

**Implementation:**
```typescript
import { useAuth } from '@/hooks/use-auth';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/auth" />;
  
  return children;
}
```

**Test Checklist:**
- [ ] Unauthenticated users redirect to /auth
- [ ] Authenticated users can access protected pages
- [ ] Loading state shows during auth check

---

### Phase 2: Bookmark Management (Week 2)

#### 2.1 Bookmark CRUD Operations
File: `src/hooks/use-bookmarks.ts`

**Already Implemented:**
- Create bookmark
- Read bookmarks (all, by ID)
- Update bookmark
- Delete bookmark
- Toggle favorite
- Archive bookmark

**Database Table:** `bookmarks`
```typescript
interface Bookmark {
  id: string;
  user_id: string;
  title: string;
  url?: string;
  content_type: 'webpage' | 'youtube' | 'pdf' | 'note';
  content?: string;
  tags?: string[];
  collection_id?: string;
  is_favorite: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}
```

**Test Checklist:**
- [ ] Create bookmark from URL
- [ ] Create bookmark from YouTube URL
- [ ] Create note bookmark
- [ ] Update bookmark title and tags
- [ ] Delete bookmark
- [ ] Toggle favorite status
- [ ] Archive and unarchive

#### 2.2 UI Components
Files:
- `src/components/capture/AddContent.tsx` (Create)
- `src/components/card/RecallCard.tsx` (Display)
- `src/pages/Add.tsx` (Page wrapper)

**Implementation Status:** ✅ Complete

---

### Phase 3: Collections (Week 3)

#### 3.1 Collection Management
File: `src/hooks/use-collections.ts`

**Already Implemented:**
- Create collection
- Read collections with bookmark counts
- Update collection (name, description, color)
- Delete collection
- Assign bookmarks to collections

**Database Table:** `collections`
```typescript
interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}
```

**Test Checklist:**
- [ ] Create new collection
- [ ] View all collections
- [ ] Update collection name
- [ ] Assign bookmark to collection
- [ ] Remove bookmark from collection
- [ ] Delete empty collection
- [ ] Prevent deleting collection with bookmarks

#### 3.2 UI Components
Files:
- `src/components/knowledge/SmartCollections.tsx`
- `src/components/knowledge/EnhancedCollections.tsx`

**Implementation Status:** ✅ Complete

---

### Phase 4: Analytics & Tracking (Week 4)

#### 4.1 Analytics Hooks
File: `src/hooks/use-analytics.ts`

**Already Implemented:**
- Fetch daily activities
- Fetch learning streaks
- Track activity
- Update streak

**Database Tables:**
- `daily_activities`
- `learning_streaks`

**Test Checklist:**
- [ ] Daily activity increments on bookmark creation
- [ ] Learning streak updates daily
- [ ] Analytics dashboard shows correct data
- [ ] Weekly/monthly charts display

#### 4.2 UI Components
Files:
- `src/components/knowledge/QuickStats.tsx`
- `src/components/knowledge/LearningAnalytics.tsx`

**Implementation Status:** ✅ Complete

---

### Phase 5: Smart Features (Week 5-6)

#### 5.1 Smart Actionables
File: `src/hooks/use-actionables.ts`

**Already Implemented:**
- Fetch actionables for user
- Generate new actionables
- Complete actionable
- Dismiss actionable

**Database Table:** `smart_actionables`
```typescript
interface SmartActionable {
  id: string;
  user_id: string;
  bookmark_id?: string;
  action_type: 'review' | 'explore' | 'connect' | 'share';
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dismissed: boolean;
  due_date?: string;
  created_at: string;
}
```

**Test Checklist:**
- [ ] Actionables appear on dashboard
- [ ] Complete actionable updates UI
- [ ] Dismiss actionable removes from view
- [ ] Generate new actionables

#### 5.2 UI Components
Files:
- `src/components/knowledge/SmartActionables.tsx`

**Implementation Status:** ✅ Complete

---

### Phase 6: Search & Discovery (Week 7-8)

#### 6.1 Search Implementation
Files:
- `src/components/knowledge/EnhancedSearch.tsx`
- `src/components/knowledge/SemanticSearch.tsx`
- `src/pages/Search.tsx`

**Features:**
- Full-text search
- Tag filtering
- Collection filtering
- Date range filtering
- Content type filtering
- Semantic search (requires AI)

**Implementation:**
```typescript
// Basic search
const { data: bookmarks } = useQuery({
  queryKey: ['bookmarks', 'search', query],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .textSearch('title', query)
      .eq('user_id', user.id);
    
    if (error) throw error;
    return data;
  }
});
```

**Test Checklist:**
- [ ] Search by title
- [ ] Filter by tags
- [ ] Filter by collection
- [ ] Filter by date range
- [ ] Combine multiple filters

---

### Phase 7: Advanced Features (Week 9-10)

#### 7.1 Knowledge Graph
File: `src/components/knowledge/KnowledgeGraph3D.tsx`

**Dependencies:**
- `three` - 3D rendering
- `@react-three/fiber` - React Three.js
- `@react-three/drei` - Three.js helpers

**Status:** UI complete, needs data integration

#### 7.2 AI Chat
File: `src/components/knowledge/AIChat.tsx`

**Requires:**
- Lovable AI Gateway enabled
- Edge function for chat endpoint

**Implementation:** Pending backend setup

#### 7.3 Platform Integrations
File: `src/components/knowledge/PlatformIntegration.tsx`

**Integrations:**
- Browser extension
- Mobile app
- Email forwarding
- API access

**Status:** UI ready, needs OAuth setup

---

## 🔧 Development Workflow

### Daily Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Make changes
# Edit files in src/

# 5. Test changes
# Check browser at http://localhost:5173

# 6. Commit changes
git add .
git commit -m "feat: add feature description"
git push origin main
```

### Database Changes

```bash
# 1. Create migration in Supabase dashboard
# SQL Editor → New Query

# 2. Test migration
# Run in staging environment

# 3. Document in CURSOR_BACKEND_SETUP.md

# 4. Update TypeScript types
# Types auto-generate from Supabase
```

---

## 🐛 Debugging Guide

### Common Issues

#### 1. "User not authenticated"
**Cause:** No active session
**Solution:**
```typescript
const { user } = useAuth();
if (!user) {
  // Redirect to /auth
  return <Navigate to="/auth" />;
}
```

#### 2. "Row Level Security policy violation"
**Cause:** RLS policy blocks access
**Solution:**
- Check user_id matches auth.uid()
- Verify RLS policies in Supabase dashboard
- Test with `supabase.rpc()` for complex queries

#### 3. "Type errors with Supabase"
**Cause:** Outdated TypeScript types
**Solution:**
- Types are in `src/integrations/supabase/types.ts`
- Regenerate with Supabase CLI if schema changes

#### 4. "CORS errors"
**Cause:** Incorrect Supabase URL
**Solution:**
- Verify URL in `src/integrations/supabase/client.ts`
- Check Supabase project settings

---

## 🧪 Testing Checklist

### Authentication
- [ ] Sign up with email
- [ ] Confirm email
- [ ] Sign in
- [ ] Sign out
- [ ] Password reset
- [ ] Session persistence

### Bookmarks
- [ ] Create bookmark
- [ ] Edit bookmark
- [ ] Delete bookmark
- [ ] Favorite bookmark
- [ ] Archive bookmark
- [ ] View bookmark detail

### Collections
- [ ] Create collection
- [ ] Rename collection
- [ ] Add bookmark to collection
- [ ] Remove bookmark from collection
- [ ] Delete collection

### Search
- [ ] Search by title
- [ ] Filter by tag
- [ ] Filter by collection
- [ ] Clear filters
- [ ] No results state

### Analytics
- [ ] View daily stats
- [ ] View learning streak
- [ ] Activity chart displays
- [ ] Weekly summary shows

### UI/UX
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Animations smooth
- [ ] Loading states show
- [ ] Error messages clear

---

## 📚 Reference Documentation

### Project Files
- `CURSOR_GUIDE.md` - Complete development guide
- `CURSOR_BACKEND_SETUP.md` - Supabase integration
- `CURSOR_API_REFERENCE.md` - Database schemas and APIs
- `CURSOR_FEATURE_ROADMAP.md` - Feature implementation plan
- `CURSOR_DESIGN_TOKENS.md` - Design system tokens
- `docs/UI_SCREENSHOTS.md` - Screenshots and user flows

### External Resources
- [Supabase Docs](https://supabase.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)

---

## 🚀 Deployment

### Build for Production

```bash
# 1. Build the app
npm run build

# 2. Preview build
npm run preview

# 3. Deploy to hosting
# Vercel, Netlify, Cloudflare Pages, etc.
```

### Environment Variables

Production environment needs:
- `VITE_SUPABASE_URL` (embedded in code)
- `VITE_SUPABASE_ANON_KEY` (embedded in code)

No additional setup required.

---

## 🎓 Learning Path for New Developers

### Week 1: Setup & Authentication
1. Read `CURSOR_GUIDE.md`
2. Set up development environment
3. Understand authentication flow
4. Implement sign-up/sign-in

### Week 2: Core Features
1. Study bookmark schema
2. Implement bookmark CRUD
3. Build AddContent component
4. Test all operations

### Week 3: Collections & Organization
1. Understand collection model
2. Implement collection management
3. Build collection UI
4. Test organization features

### Week 4: Analytics & Insights
1. Review analytics schema
2. Implement tracking hooks
3. Build analytics dashboard
4. Test data visualization

### Week 5-6: Advanced Features
1. Smart actionables
2. Search improvements
3. Knowledge graph
4. AI integration

### Week 7-8: Polish & Testing
1. Mobile optimization
2. Performance tuning
3. Comprehensive testing
4. Bug fixes

---

## 💡 Tips for Success

1. **Start Small:** Implement one feature at a time
2. **Test Often:** Check each feature before moving on
3. **Read Docs:** Refer to documentation files frequently
4. **Use Supabase Dashboard:** Inspect data directly
5. **Check Console:** Watch for errors during development
6. **Ask Questions:** Consult the team when stuck
7. **Follow Patterns:** Use existing code as examples
8. **Keep It Simple:** Don't over-engineer solutions

---

## 🤝 Support

For questions or issues:
1. Check documentation files in `/docs`
2. Review `CURSOR_GUIDE.md` troubleshooting section
3. Inspect Supabase dashboard for data issues
4. Check browser console for frontend errors
5. Review RLS policies for permission issues

---

## 📝 Next Steps

1. **Read all documentation files**
2. **Set up development environment**
3. **Test authentication flow**
4. **Implement core bookmark features**
5. **Build collection management**
6. **Add analytics tracking**
7. **Implement search**
8. **Add advanced features**
9. **Polish UI/UX**
10. **Deploy to production**

Good luck building Brain Spark! 🚀
