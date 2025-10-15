# Design Tokens Reference for Cursor IDE

## 🎨 Complete Design Token Reference

This file contains all design tokens, icons, and visual elements for easy frontend replication in Cursor.

## Color Palette (All HSL Format)

### Base Colors
```css
--background: 45 25% 97%;           /* Warm cream paper background */
--foreground: 25 15% 15%;           /* Dark ink text */
--card: 45 30% 96%;                 /* Card background */
--card-foreground: 25 15% 15%;      /* Card text */
```

### Primary Palette
```css
--primary: 220 40% 25%;             /* Deep ink blue - main brand color */
--primary-foreground: 45 25% 97%;   /* Text on primary */
--secondary: 45 20% 90%;            /* Soft washi paper tone */
--secondary-foreground: 25 15% 25%; /* Text on secondary */
```

### Japanese Theme Colors
```css
--sakura: 345 50% 85%;              /* Cherry blossom pink */
--ink-black: 25 15% 15%;            /* Traditional Japanese ink */
--washi-cream: 45 30% 94%;          /* Washi paper texture */
--seal-red: 355 70% 60%;            /* Traditional seal stamp red */
--bamboo-green: 120 25% 45%;        /* Bamboo green accent */
--gold-accent: 45 80% 70%;          /* Gold decorative details */
```

### Utility Colors
```css
--accent: 355 60% 65%;              /* Warm red accent */
--destructive: 15 75% 55%;          /* Error/delete actions */
--muted: 45 15% 88%;                /* Subtle backgrounds */
--muted-foreground: 25 10% 50%;     /* Muted text */
--border: 45 15% 85%;               /* Subtle borders */
```

## Usage in Components

### Color Classes
```tsx
// Background colors
className="bg-washi"          // Washi paper cream
className="bg-sakura"         // Cherry blossom pink
className="bg-gradient-paper" // Subtle paper gradient

// Text colors
className="text-ink"          // Dark ink
className="text-seal"         // Seal red
className="text-bamboo"       // Bamboo green

// Borders
className="border-border"     // Standard border
```

## Gradients

### Gradient Variables
```css
--gradient-paper: linear-gradient(135deg, hsl(45 30% 96%), hsl(45 25% 94%));
--gradient-ink: linear-gradient(135deg, hsl(220 40% 25%), hsl(220 45% 20%));
--gradient-sakura: linear-gradient(135deg, hsl(345 50% 85%), hsl(345 40% 80%));
--gradient-bamboo: linear-gradient(135deg, hsl(120 25% 45%), hsl(120 30% 40%));
--gradient-seal: linear-gradient(135deg, hsl(355 70% 60%), hsl(355 65% 55%));
--gradient-gold: linear-gradient(135deg, hsl(45 80% 70%), hsl(45 75% 65%));
```

### Usage
```tsx
<div className="bg-gradient-sakura">
<Button className="bg-gradient-bamboo">
```

## Shadows

### Shadow Tokens
```css
--shadow-paper: 0 2px 8px hsl(25 15% 15% / 0.08);
--shadow-elegant: 0 4px 16px hsl(25 15% 15% / 0.06);
--shadow-deep: 0 8px 24px hsl(25 15% 15% / 0.12);
--shadow-floating: 0 12px 32px hsl(25 15% 15% / 0.15);
```

### Usage Classes
```tsx
className="shadow-paper"      // Subtle card shadow
className="shadow-elegant"    // Medium shadow
className="shadow-floating"   // Floating element shadow
```

## Typography

### Font Families
```typescript
fontFamily: {
  'sans': ['Inter', 'system-ui', 'sans-serif'],
  'serif': ['Playfair Display', 'Georgia', 'serif'],
  'mono': ['JetBrains Mono', 'Menlo', 'monospace'],
  'display': ['Playfair Display', 'Georgia', 'serif'],
}
```

### Usage
```tsx
className="font-sans"         // Body text
className="font-serif"        // Headings
className="font-mono"         // Code blocks
className="font-display"      // Decorative headings
```

## Spacing & Border Radius

### Border Radius
```css
--radius: 0.75rem;            /* 12px - default */
lg: var(--radius)             /* 12px */
md: calc(var(--radius) - 2px) /* 10px */
sm: calc(var(--radius) - 4px) /* 8px */
```

## Component Patterns

### Paper Card Effect
```tsx
// Includes gradient background, border, and shadow
<Card className="paper-card">
  {/* content */}
</Card>
```

### Paper Input (with texture)
```tsx
<Input className="paper-input" />
```

### Japanese UI Elements
```tsx
// Animated ink brush underline
<h2 className="ink-brush-underline">Title</h2>

// Seal stamp hover effect
<div className="seal-stamp">Content</div>

// Washi paper texture background
<div className="washi-texture">Content</div>
```

## Animations

### Transition Tokens
```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Classes
```tsx
className="transition-smooth"      // Smooth transitions
className="hover-lift"             // Lift on hover
className="animate-fade-slide-up"  // Entrance animation
className="thread-swipe"           // Swipe interaction
```

### Keyframes Available
- `accordion-down` / `accordion-up`
- `swipe-in` / `swipe-out`
- `fade-slide-up`
- `ink-flow`

## Mobile Optimizations

### Safe Area Support
```tsx
// iPhone notch support
className="safe-area-inset-top"
className="safe-area-inset-bottom"
className="pb-safe"
```

### Touch Optimizations
```tsx
className="active-scale-98:active"  // Haptic feedback
className="mobile-optimized"        // Touch-friendly spacing
```

## Icons

All icons use `lucide-react` library. Common icons:

```tsx
import { 
  Home, Search, Plus, Settings, User,
  BookOpen, Sparkles, Brain, Target,
  Calendar, Clock, TrendingUp, Award,
  ChevronRight, ChevronDown, X, Menu
} from 'lucide-react';

// Usage
<Home className="w-5 h-5 text-ink" />
<Sparkles className="w-4 h-4 text-sakura" />
```

## Button Variants

### Custom Variants Available
```tsx
<Button variant="default">Default</Button>
<Button variant="sakura">Sakura Pink</Button>
<Button variant="ink">Ink Blue</Button>
<Button variant="bamboo">Bamboo Green</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
```

## Best Practices for Cursor

### 1. Always Use Semantic Tokens
```tsx
// ✅ CORRECT
<div className="text-ink bg-washi border-border">

// ❌ WRONG
<div className="text-gray-900 bg-gray-50 border-gray-200">
```

### 2. Import From Design System
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

### 3. HSL Color Format Only
```css
/* ✅ CORRECT */
color: hsl(var(--primary));

/* ❌ WRONG */
color: #1a1a1a;
color: rgb(26, 26, 26);
```

### 4. Responsive Design Pattern
```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 5. Component Structure
```tsx
// Standard component pattern
import { cn } from "@/lib/utils";

export function MyComponent({ className, ...props }) {
  return (
    <div 
      className={cn(
        "paper-card p-6 space-y-4",
        className
      )}
      {...props}
    >
      {/* content */}
    </div>
  );
}
```

## File References

### Core Design Files
- `src/index.css` - All CSS variables and design tokens
- `tailwind.config.ts` - Tailwind configuration
- `src/lib/utils.ts` - Utility functions (cn helper)

### Component Libraries
- `src/components/ui/` - Base UI components (shadcn)
- `src/components/knowledge/` - Feature components
- `src/components/layout/` - Layout components

## Quick Copy-Paste Snippets

### Card with Paper Effect
```tsx
<Card className="paper-card p-6">
  <CardHeader>
    <CardTitle className="text-ink">Title</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* content */}
  </CardContent>
</Card>
```

### Button with Icon
```tsx
<Button className="gap-2 bg-gradient-sakura">
  <Sparkles className="w-4 h-4" />
  Action
</Button>
```

### Input with Label
```tsx
<div className="space-y-2">
  <Label className="text-ink">Field Name</Label>
  <Input className="paper-input" placeholder="Enter value..." />
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} className="paper-card hover-lift">
      {/* card content */}
    </Card>
  ))}
</div>
```

## Color Reference Chart

| Color Name | HSL Value | Use Case |
|------------|-----------|----------|
| Background | 45 25% 97% | Page background |
| Foreground | 25 15% 15% | Body text |
| Primary | 220 40% 25% | Buttons, links |
| Sakura | 345 50% 85% | Accent, highlights |
| Ink | 25 15% 15% | Headings, important text |
| Washi | 45 30% 94% | Card backgrounds |
| Seal | 355 70% 60% | CTAs, important actions |
| Bamboo | 120 25% 45% | Success, positive actions |
| Gold | 45 80% 70% | Premium, special features |

---

**Note**: This design system ensures consistency across the entire application. Always reference these tokens when creating new components in Cursor.
