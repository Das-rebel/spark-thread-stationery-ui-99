# Icons Reference Guide

Complete icon inventory and usage patterns for BrainSpark application.

## Icon Libraries

### Primary: Lucide React

The main icon library used throughout the application.

```bash
npm install lucide-react
```

### Secondary: Custom SVG Icons

Custom icons defined in `src/components/icons/index.tsx`.

---

## Lucide React Icons Used

### Navigation Icons

| Icon | Import | Usage |
|------|--------|-------|
| `Home` | `lucide-react` | Bottom nav, sidebar |
| `Brain` | `lucide-react` | Knowledge hub nav |
| `Plus` | `lucide-react` | Add content nav |
| `Search` | `lucide-react` | Search nav, inputs |
| `Twitter` | `lucide-react` | Social section nav |
| `Menu` | `lucide-react` | Mobile menu toggle |
| `X` | `lucide-react` | Close buttons |

```typescript
import { Home, Brain, Plus, Search, Twitter, Menu, X } from 'lucide-react';
```

### Content Icons

| Icon | Import | Usage |
|------|--------|-------|
| `BookOpen` | `lucide-react` | Reading content |
| `Bookmark` | `lucide-react` | Saved items |
| `FileText` | `lucide-react` | Documents |
| `Image` | `lucide-react` | Media content |
| `Link` | `lucide-react` | URL content |
| `Video` | `lucide-react` | Video content |
| `Mic` | `lucide-react` | Audio content |

```typescript
import { BookOpen, Bookmark, FileText, Image, Link, Video, Mic } from 'lucide-react';
```

### Action Icons

| Icon | Import | Usage |
|------|--------|-------|
| `Heart` | `lucide-react` | Like/favorite |
| `MessageCircle` | `lucide-react` | Comments/replies |
| `Share2` | `lucide-react` | Share content |
| `Repeat2` | `lucide-react` | Retweet/repost |
| `Send` | `lucide-react` | Submit/send |
| `Edit` | `lucide-react` | Edit mode |
| `Trash2` | `lucide-react` | Delete action |
| `Copy` | `lucide-react` | Copy to clipboard |
| `Download` | `lucide-react` | Download content |
| `Upload` | `lucide-react` | Upload files |

```typescript
import { Heart, MessageCircle, Share2, Repeat2, Send, Edit, Trash2, Copy, Download, Upload } from 'lucide-react';
```

### Status Icons

| Icon | Import | Usage |
|------|--------|-------|
| `Check` | `lucide-react` | Success/complete |
| `CheckCircle` | `lucide-react` | Verified/success |
| `AlertCircle` | `lucide-react` | Warning/alert |
| `XCircle` | `lucide-react` | Error/failed |
| `Info` | `lucide-react` | Information |
| `Loader2` | `lucide-react` | Loading spinner |
| `RefreshCw` | `lucide-react` | Refresh/sync |

```typescript
import { Check, CheckCircle, AlertCircle, XCircle, Info, Loader2, RefreshCw } from 'lucide-react';
```

### UI Navigation Icons

| Icon | Import | Usage |
|------|--------|-------|
| `ChevronRight` | `lucide-react` | Navigate forward |
| `ChevronLeft` | `lucide-react` | Navigate back |
| `ChevronDown` | `lucide-react` | Expand dropdown |
| `ChevronUp` | `lucide-react` | Collapse dropdown |
| `ArrowLeft` | `lucide-react` | Back navigation |
| `ArrowRight` | `lucide-react` | Forward navigation |
| `ExternalLink` | `lucide-react` | Open in new tab |

```typescript
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
```

### Feature Icons

| Icon | Import | Usage |
|------|--------|-------|
| `Sparkles` | `lucide-react` | AI features |
| `Target` | `lucide-react` | Goals/focus |
| `TrendingUp` | `lucide-react` | Analytics/growth |
| `Award` | `lucide-react` | Achievements |
| `Star` | `lucide-react` | Favorites |
| `Compass` | `lucide-react` | Explore/discover |
| `Calendar` | `lucide-react` | Scheduling |
| `Clock` | `lucide-react` | Time/history |
| `Bell` | `lucide-react` | Notifications |
| `Settings` | `lucide-react` | Settings/config |

```typescript
import { Sparkles, Target, TrendingUp, Award, Star, Compass, Calendar, Clock, Bell, Settings } from 'lucide-react';
```

### User Icons

| Icon | Import | Usage |
|------|--------|-------|
| `User` | `lucide-react` | User profile |
| `Users` | `lucide-react` | Multiple users |
| `UserPlus` | `lucide-react` | Add user/follow |
| `UserMinus` | `lucide-react` | Remove user/unfollow |
| `LogIn` | `lucide-react` | Login action |
| `LogOut` | `lucide-react` | Logout action |

```typescript
import { User, Users, UserPlus, UserMinus, LogIn, LogOut } from 'lucide-react';
```

---

## Custom Icons

Defined in `src/components/icons/index.tsx`:

### CustomIcons.Bookmark
```tsx
<CustomIcons.Bookmark className="w-5 h-5" />
```
Save/collection actions with enhanced design.

### CustomIcons.Share
```tsx
<CustomIcons.Share className="w-5 h-5" />
```
Sharing functionality with node network design.

### CustomIcons.ActionBolt
```tsx
<CustomIcons.ActionBolt className="w-5 h-5" />
```
Quick actions and lightning-fast operations.

### CustomIcons.BrainAI
```tsx
<CustomIcons.BrainAI className="w-5 h-5" />
```
AI-powered features and intelligence.

### CustomIcons.SearchEnhanced
```tsx
<CustomIcons.SearchEnhanced className="w-5 h-5" />
```
Intelligent search with enhanced visualization.

### CustomIcons.UserProfile
```tsx
<CustomIcons.UserProfile className="w-5 h-5" />
```
User account with detail indicator.

### CustomIcons.Settings
```tsx
<CustomIcons.Settings className="w-5 h-5" />
```
Configuration with gear and path detail.

### CustomIcons.Analytics
```tsx
<CustomIcons.Analytics className="w-5 h-5" />
```
Data visualization and charts.

---

## Usage Patterns

### Basic Usage

```tsx
import { Home, Search, Plus } from 'lucide-react';

// Default size (24px)
<Home />

// Custom size
<Home className="w-5 h-5" />
<Search className="w-6 h-6" />
<Plus className="w-4 h-4" />
```

### With Semantic Colors

```tsx
// Using design system tokens
<Home className="w-5 h-5 text-primary" />
<Heart className="w-5 h-5 text-destructive" />
<Check className="w-5 h-5 text-bamboo" />
<Sparkles className="w-5 h-5 text-gold" />
<Star className="w-5 h-5 text-sakura" />
```

### In Buttons

```tsx
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';

<Button className="gap-2">
  <Plus className="w-4 h-4" />
  Add New
</Button>

<Button variant="sakura" className="gap-2">
  <Sparkles className="w-4 h-4" />
  AI Suggest
</Button>
```

### Loading States

```tsx
import { Loader2 } from 'lucide-react';

<Button disabled>
  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  Loading...
</Button>
```

### Interactive Icons

```tsx
<button 
  onClick={handleLike}
  className="p-2 rounded-full hover:bg-destructive/10 transition-colors"
>
  <Heart 
    className={cn(
      "w-5 h-5 transition-colors",
      isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
    )} 
  />
</button>
```

### Icon with Badge

```tsx
<div className="relative">
  <Bell className="w-5 h-5" />
  {notificationCount > 0 && (
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
      {notificationCount}
    </span>
  )}
</div>
```

---

## Size Guidelines

| Context | Size Class | Pixels |
|---------|------------|--------|
| Inline text | `w-4 h-4` | 16px |
| Buttons | `w-4 h-4` or `w-5 h-5` | 16-20px |
| Navigation | `w-5 h-5` | 20px |
| Cards/Headers | `w-6 h-6` | 24px |
| Feature icons | `w-8 h-8` | 32px |
| Hero sections | `w-12 h-12` | 48px |

---

## Stroke Width

```tsx
// Default stroke width is 2
<Home strokeWidth={2} />

// Thinner for subtle icons
<Home strokeWidth={1.5} />

// Bolder for emphasis
<Home strokeWidth={2.5} />
```

---

## Icon-to-Feature Mapping

| Feature | Primary Icon | Secondary Icons |
|---------|--------------|-----------------|
| Home/Dashboard | `Home` | `TrendingUp`, `Clock` |
| Knowledge Hub | `Brain` | `Sparkles`, `BookOpen` |
| Add Content | `Plus` | `Link`, `Upload`, `Mic` |
| Search | `Search` | `Filter`, `SlidersHorizontal` |
| Social/Twitter | `Twitter` | `Heart`, `MessageCircle`, `Share2` |
| Collections | `Folder` | `Tag`, `Archive` |
| Favorites | `Star` | `Heart`, `Bookmark` |
| Settings | `Settings` | `User`, `Bell`, `Moon` |
| Analytics | `TrendingUp` | `BarChart3`, `PieChart` |
| Achievements | `Award` | `Trophy`, `Medal` |

---

## Complete Import Statement

```tsx
// Most commonly used icons
import { 
  // Navigation
  Home, Brain, Plus, Search, Twitter, Menu, X,
  
  // Content
  BookOpen, Bookmark, FileText, Link,
  
  // Actions
  Heart, MessageCircle, Share2, Repeat2, Send, Edit, Trash2,
  
  // Status
  Check, CheckCircle, AlertCircle, Loader2,
  
  // UI
  ChevronRight, ChevronDown, ArrowLeft, ExternalLink,
  
  // Features
  Sparkles, Target, TrendingUp, Award, Star, Calendar, Clock,
  
  // User
  User, Settings, Bell, LogOut
} from 'lucide-react';

// Custom icons
import { CustomIcons } from '@/components/icons';
```

---

## Accessibility

Always provide accessible labels for icon-only buttons:

```tsx
// With visible label
<Button>
  <Plus className="w-4 h-4 mr-2" />
  Add Item
</Button>

// Icon-only with aria-label
<Button size="icon" aria-label="Add new item">
  <Plus className="w-4 h-4" />
</Button>

// With sr-only text
<Button size="icon">
  <Plus className="w-4 h-4" />
  <span className="sr-only">Add new item</span>
</Button>
```

---

**Last Updated:** January 2025
