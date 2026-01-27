# Navigation Architecture Reference

Complete navigation system documentation for BrainSpark application.

## Route Structure

```text
+-- / (Home) [Protected]
|   └── Main dashboard with bookmarks feed
|
+-- /auth (Authentication) [Public]
|   └── Login/Signup forms
|
+-- /knowledge (Knowledge Hub) [Protected]
|   └── AI-powered knowledge management
|
+-- /add (Add Content) [Protected]
|   └── Content capture interface
|
+-- /search (Search) [Protected]
|   └── Advanced search with filters
|
+-- /review (Review) [Protected]
|   └── Spaced repetition review
|
+-- /document/:documentId [Protected]
|   └── Individual document view
|
+-- /settings (User Settings) [Protected]
|   └── Account preferences
|
+-- /twitter [Protected]
    +-- /twitter (Home Feed)
    +-- /twitter/explore (Explore/Collections)
    +-- /twitter/notifications (Favorites)
    +-- /twitter/search (Search)
    +-- /twitter/settings (Settings)
    +-- /twitter/thread/:threadId (Thread View)
    +-- /twitter/compose (Compose Tweet)
    +-- /twitter/messages (Messages)
    +-- /twitter/profile (Profile)
```

## Navigation Components

### AppLayout Structure

```text
AppLayout
├── Header (top, conditional - hidden on Twitter routes)
├── Main Content Area
│   └── Page Components (routed via React Router)
├── FloatingTweetButton (Twitter routes only)
├── KnowledgeHubFAB (non-Twitter routes)
└── BottomNavigation (always visible on mobile)
    ├── Home (/)
    ├── Knowledge (/knowledge)
    ├── Add (/add)
    ├── Social (/twitter)
    └── Search (/search)
```

### Bottom Navigation Configuration

**File:** `src/components/layout/BottomNavigation.tsx`

```typescript
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'knowledge', label: 'Knowledge', icon: Brain, path: '/knowledge' },
  { id: 'add', label: 'Add', icon: Plus, path: '/add' },
  { id: 'social', label: 'Social', icon: Twitter, path: '/twitter' },
  { id: 'search', label: 'Search', icon: Search, path: '/search' },
];
```

**Features:**
- Mobile-optimized with safe area support
- Framer Motion animations for smooth transitions
- Active state indicator with animated dot
- Badge support for notifications

### Twitter Sidebar Navigation

**File:** `src/components/twitter/TwitterSidebar.tsx`

```typescript
const navItems = [
  { icon: Home, label: 'Home', path: '/twitter', exact: true },
  { icon: Search, label: 'Search', path: '/twitter/search' },
  { icon: Compass, label: 'Collections', path: '/twitter/explore' },
  { icon: Star, label: 'Favorites', path: '/twitter/notifications' },
  { icon: Settings, label: 'Settings', path: '/twitter/settings' },
];
```

**Features:**
- Desktop: Sidebar with expanded labels
- Mobile: Bottom navigation bar
- Framer Motion layout animations
- Active state highlighting

## Route Guards

### Protected Route Pattern

```typescript
// In App.tsx routing
<Route 
  path="/" 
  element={
    <ProtectedRoute>
      <Index />
    </ProtectedRoute>
  } 
/>
```

### Authentication Check

```typescript
// use-auth.tsx hook
const { user, loading } = useAuth();

if (loading) return <LoadingSpinner />;
if (!user) return <Navigate to="/auth" />;
```

## Navigation Flow Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│                        App Entry                             │
│                           ↓                                  │
│                    Check Auth State                          │
│                    ↙           ↘                             │
│              Logged In      Not Logged In                    │
│                 ↓                ↓                            │
│           Main App          /auth Page                       │
│                ↓                                             │
│    ┌──────────────────────────────────────┐                  │
│    │          AppLayout                   │                  │
│    │  ┌────────────────────────────────┐  │                  │
│    │  │           Header               │  │                  │
│    │  └────────────────────────────────┘  │                  │
│    │  ┌────────────────────────────────┐  │                  │
│    │  │       Page Content             │  │                  │
│    │  │  (React Router Outlet)         │  │                  │
│    │  └────────────────────────────────┘  │                  │
│    │  ┌────────────────────────────────┐  │                  │
│    │  │     Bottom Navigation          │  │                  │
│    │  │  [Home][Knowledge][Add][Social]│  │                  │
│    │  └────────────────────────────────┘  │                  │
│    └──────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## Mobile vs Desktop Patterns

### Mobile Navigation (< 768px)

```text
┌─────────────────┐
│     Header      │ ← Sticky, backdrop blur
├─────────────────┤
│                 │
│  Page Content   │ ← Scrollable area
│                 │
├─────────────────┤
│ [🏠][🧠][➕][🐦][🔍] │ ← Fixed bottom nav
└─────────────────┘
```

### Desktop Navigation (≥ 768px)

```text
┌──────────────────────────────────────────┐
│                 Header                    │
├────────────┬─────────────────────────────┤
│            │                              │
│  Sidebar   │       Page Content           │
│  (Twitter) │                              │
│            │                              │
├────────────┴─────────────────────────────┤
│            Bottom Navigation              │
└──────────────────────────────────────────┘
```

## Header Configuration

**File:** `src/components/layout/Header.tsx`

```typescript
// Header shows on all routes except Twitter
const showHeader = !pathname.startsWith('/twitter');

// Header includes:
// - Status indicator (connected/syncing/offline)
// - User greeting
// - Auth button (login/logout)
```

## Animation Specifications

### Page Transitions

```typescript
// Framer Motion page transition
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
```

### Navigation Animations

```typescript
// Bottom navigation spring animation
const navAnimation = {
  initial: { y: 100 },
  animate: { y: 0 },
  transition: { type: "spring", stiffness: 400, damping: 35 }
};

// Active indicator layout animation
<motion.div 
  layoutId="navIndicator"
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
/>
```

## Best Practices

### Navigation Component Pattern

```typescript
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function NavItem({ path, icon: Icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === path || 
                   location.pathname.startsWith(`${path}/`);
  
  return (
    <Link 
      to={path}
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}
```

### Safe Area Support

```typescript
// Bottom navigation with safe area
<nav 
  className="fixed bottom-0 left-0 right-0 bg-card border-t"
  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
>
  {/* nav items */}
</nav>
```

### Conditional Rendering

```typescript
// Show different FAB based on route
{isTwitterRoute ? (
  <FloatingTweetButton />
) : (
  <KnowledgeHubFAB />
)}
```

## File References

| File | Purpose |
|------|---------|
| `src/App.tsx` | Route definitions |
| `src/components/layout/AppLayout.tsx` | Main layout wrapper |
| `src/components/layout/BottomNavigation.tsx` | Bottom nav component |
| `src/components/layout/Header.tsx` | Top header component |
| `src/components/twitter/TwitterSidebar.tsx` | Twitter section nav |
| `src/hooks/use-auth.tsx` | Authentication state |

## URL Structure

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Index` | Home dashboard |
| `/auth` | `Auth` | Login/Signup |
| `/knowledge` | `KnowledgeHub` | AI knowledge tools |
| `/add` | `Add` | Content capture |
| `/search` | `Search` | Advanced search |
| `/review` | `Review` | Spaced repetition |
| `/document/:id` | `Document` | Document viewer |
| `/settings` | `UserSettings` | Account settings |
| `/twitter` | `TwitterHome` | Social feed |
| `/twitter/explore` | `TwitterExplore` | Collections |
| `/twitter/search` | `TwitterSearch` | Social search |
| `/twitter/compose` | `TweetCompose` | New tweet |
| `/twitter/thread/:id` | `ThreadView` | Thread viewer |

---

**Last Updated:** January 2025
