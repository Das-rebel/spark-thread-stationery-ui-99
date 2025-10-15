# Component Architecture Guide for Cursor

## 🏗️ Complete Component Structure Reference

This guide provides the complete component architecture for replicating the frontend in Cursor.

## Component Organization

```
src/
├── components/
│   ├── ui/                      # Base UI components (shadcn/ui)
│   │   ├── button.tsx           # Button with custom variants
│   │   ├── card.tsx             # Card component
│   │   ├── input.tsx            # Form inputs
│   │   ├── dialog.tsx           # Modal dialogs
│   │   ├── tabs.tsx             # Tab navigation
│   │   └── ... (40+ components)
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Top navigation
│   │   ├── BottomNavigation.tsx # Mobile bottom nav
│   │   └── AppLayout.tsx        # Main app wrapper
│   │
│   ├── knowledge/               # Feature components
│   │   ├── SmartDiscovery.tsx
│   │   ├── WorkflowAutomation.tsx
│   │   ├── LearningAnalytics.tsx
│   │   └── ... (15+ components)
│   │
│   ├── twitter/                 # Twitter-like features
│   │   ├── TweetCard.tsx
│   │   ├── TwitterFeed.tsx
│   │   └── ... (8+ components)
│   │
│   └── capture/                 # Content capture
│       └── AddContent.tsx
│
├── pages/                       # Page components
│   ├── Index.tsx                # Home page
│   ├── KnowledgeHub.tsx         # Main knowledge hub
│   ├── Auth.tsx                 # Authentication
│   └── ... (15+ pages)
│
├── hooks/                       # Custom React hooks
│   ├── use-auth.tsx             # Authentication hook
│   ├── use-bookmarks.tsx        # Bookmark management
│   └── use-mobile.tsx           # Mobile detection
│
└── lib/
    ├── utils.ts                 # Utility functions
    └── validation.ts            # Input validation schemas
```

## Core UI Components (shadcn/ui)

### Button Component
Located: `src/components/ui/button.tsx`

**Custom Variants Added:**
```tsx
{
  variant: {
    sakura: "bg-gradient-sakura text-foreground hover:opacity-90",
    ink: "bg-gradient-ink text-primary-foreground",
    bamboo: "bg-gradient-bamboo text-primary-foreground",
    seal: "bg-gradient-seal text-primary-foreground",
    // ... standard variants
  }
}
```

**Usage:**
```tsx
import { Button } from "@/components/ui/button";

<Button variant="sakura">Save</Button>
<Button variant="ink" size="lg">Submit</Button>
```

### Card Component
Located: `src/components/ui/card.tsx`

**Custom Classes:**
- `paper-card` - Applies paper texture and shadow
- `paper-card-floating` - Elevated card effect

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card className="paper-card">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Layout Components

### Header Component
Located: `src/components/layout/Header.tsx`

**Features:**
- User profile display
- Sign out functionality
- Mobile responsive

**Implementation:**
```tsx
import { Header } from "@/components/layout/Header";

// In layout
<Header />
```

### Bottom Navigation
Located: `src/components/layout/BottomNavigation.tsx`

**Mobile-first navigation with icons:**
```tsx
const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/knowledge', icon: Brain, label: 'Knowledge' },
  { path: '/add', icon: Plus, label: 'Add' },
  { path: '/search', icon: Search, label: 'Search' },
];
```

## Feature Components

### Smart Discovery
Located: `src/components/knowledge/SmartDiscovery.tsx`

**Purpose:** Content recommendation engine UI

**Key Features:**
- Tab-based filtering
- Card grid layout
- Hover effects with `hover-lift`

**Code Pattern:**
```tsx
<Tabs defaultValue="all">
  <TabsList className="grid grid-cols-4">
    {categories.map(cat => (
      <TabsTrigger value={cat.value}>{cat.label}</TabsTrigger>
    ))}
  </TabsList>
  
  <TabsContent value="all">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(item => (
        <Card className="paper-card hover-lift">
          {/* item content */}
        </Card>
      ))}
    </div>
  </TabsContent>
</Tabs>
```

### Workflow Automation
Located: `src/components/knowledge/WorkflowAutomation.tsx`

**Purpose:** Task automation interface

**Components Used:**
- Progress bars
- Status badges
- Action buttons

### Learning Analytics
Located: `src/components/knowledge/LearningAnalytics.tsx`

**Purpose:** Data visualization dashboard

**Libraries:**
- `recharts` for charts
- Custom chart wrapper: `src/components/ui/chart.tsx`

**Pattern:**
```tsx
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

<ChartContainer config={chartConfig}>
  <LineChart data={data}>
    <Line dataKey="value" stroke="hsl(var(--primary))" />
  </LineChart>
</ChartContainer>
```

## Form Components

### Input Validation Pattern
Located: `src/lib/validation.ts`

**All forms use Zod schemas:**
```tsx
import { z } from 'zod';
import { bookmarkSchema } from '@/lib/validation';

const handleSubmit = () => {
  try {
    const validatedData = bookmarkSchema.parse(formData);
    // Process validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => toast.error(err.message));
    }
  }
};
```

### Common Validation Schemas
```typescript
// URL validation
urlSchema: z.string().url().max(2048)

// Text content
textContentSchema: z.string().trim().min(1).max(5000)

// Title
titleSchema: z.string().trim().min(1).max(200)

// Tags
tagsSchema: z.string().max(500).transform(/* parse tags */)
```

## Authentication Components

### Auth Page
Located: `src/pages/Auth.tsx`

**Features:**
- Sign in / Sign up tabs
- Form validation with Zod
- Supabase integration

**Pattern:**
```tsx
import { useAuth } from '@/hooks/use-auth';

const { signIn, signUp, user } = useAuth();

const handleSignIn = async (email: string, password: string) => {
  const { error } = await signIn(email, password);
  if (error) {
    toast.error(error.message);
  }
};
```

### Protected Routes
Located: `src/App.tsx`

```tsx
import { RequireAuth } from '@/hooks/use-auth';

<Route path="/" element={
  <RequireAuth>
    <Index />
  </RequireAuth>
} />
```

## Custom Hooks

### useAuth Hook
Located: `src/hooks/use-auth.tsx`

**Provides:**
```tsx
{
  user: User | null,
  session: Session | null,
  loading: boolean,
  signUp: (email, password, fullName?) => Promise,
  signIn: (email, password) => Promise,
  signOut: () => Promise,
}
```

### useBookmarks Hook
Located: `src/hooks/use-bookmarks.ts`

**Provides:**
```tsx
{
  bookmarks: Bookmark[],
  loading: boolean,
  addBookmark: (data) => Promise,
  updateBookmark: (id, data) => Promise,
  deleteBookmark: (id) => Promise,
}
```

### useMobile Hook
Located: `src/hooks/use-mobile.tsx`

**Detects mobile viewport:**
```tsx
const isMobile = useMobile();

{isMobile ? <MobileView /> : <DesktopView />}
```

## Page Components

### Index (Home) Page
Located: `src/pages/Index.tsx`

**Structure:**
```tsx
<AppLayout>
  <UserGreeting />
  <QuickStats />
  <SmartDiscovery />
  <RecentActivity />
</AppLayout>
```

### Knowledge Hub Page
Located: `src/pages/KnowledgeHub.tsx`

**Features:**
- Tab-based navigation
- Multiple feature sections
- Responsive grid layouts

## Utility Functions

### cn Helper (Class Names)
Located: `src/lib/utils.ts`

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)} />
```

## Routing

### React Router Setup
Located: `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/auth" element={<Auth />} />
    <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
    <Route path="/knowledge" element={<RequireAuth><KnowledgeHub /></RequireAuth>} />
    {/* ... more routes */}
  </Routes>
</BrowserRouter>
```

## State Management

### React Query Setup
Located: `src/App.tsx`

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

## Supabase Integration

### Client Setup
Located: `src/integrations/supabase/client.ts`

```tsx
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
```

### Database Operations Pattern
```tsx
import { supabase } from '@/integrations/supabase/client';

// Insert
const { data, error } = await supabase
  .from('bookmarks')
  .insert({ user_id: user.id, title, url })
  .select()
  .single();

// Query
const { data, error } = await supabase
  .from('bookmarks')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });

// Update
const { error } = await supabase
  .from('bookmarks')
  .update({ title: newTitle })
  .eq('id', bookmarkId);

// Delete
const { error } = await supabase
  .from('bookmarks')
  .delete()
  .eq('id', bookmarkId);
```

## Component Creation Checklist

When creating new components in Cursor:

1. ✅ Import semantic tokens from design system
2. ✅ Use TypeScript interfaces for props
3. ✅ Apply `cn()` helper for className merging
4. ✅ Use mobile-first responsive design
5. ✅ Add proper error handling
6. ✅ Include loading states
7. ✅ Follow accessibility guidelines
8. ✅ Add input validation with Zod
9. ✅ Use existing UI components
10. ✅ Test on mobile and desktop

## Quick Reference: Common Patterns

### Form with Validation
```tsx
import { z } from 'zod';
import { toast } from 'sonner';

const schema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
});

const handleSubmit = (formData) => {
  try {
    const validated = schema.parse(formData);
    // Process data
    toast.success("Success!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => toast.error(err.message));
    }
  }
};
```

### Protected Database Query
```tsx
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

const { user } = useAuth();

const fetchData = async () => {
  if (!user) return;
  
  const { data, error } = await supabase
    .from('table')
    .select('*')
    .eq('user_id', user.id);
    
  if (error) {
    toast.error(error.message);
    return;
  }
  
  return data;
};
```

### Responsive Card Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {items.map(item => (
    <Card key={item.id} className="paper-card hover-lift cursor-pointer">
      <CardHeader>
        <CardTitle className="text-ink">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

---

**This guide covers the complete component architecture. Reference this when building new features in Cursor.**
