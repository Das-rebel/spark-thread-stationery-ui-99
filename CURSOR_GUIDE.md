# Cursor IDE - Knowledge Hub Project Guide

## Quick Start for Cursor Users

This is your complete guide to working with the Knowledge Hub project in Cursor IDE. This file contains everything you need to understand the project structure, design system, and development workflow.

## 🏗️ Project Overview

**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui  
**Theme**: Japanese stationary-inspired design system  
**Architecture**: Component-based with semantic design tokens  

## 📁 Essential Files to Know

### Core Configuration
- `tailwind.config.ts` - Tailwind config with design tokens
- `src/index.css` - Complete design system (CSS variables)
- `src/App.tsx` - Routing and app configuration
- `vite.config.ts` - Build configuration

### Key Components
- `src/components/ui/` - Base UI components (shadcn/ui customized)
- `src/components/knowledge/` - Main feature components
- `src/components/layout/` - Layout and navigation
- `src/pages/` - Route components

### Documentation
- `docs/DESIGN_SYSTEM.md` - Complete design system guide
- `docs/PROJECT_STRUCTURE.md` - Detailed project architecture
- `README.md` - General project information

## 🎨 Design System Quick Reference

### Always Use These Semantic Tokens
```tsx
// ✅ CORRECT - Use semantic design tokens
className="text-ink bg-washi border-border paper-card shadow-elegant"

// ❌ WRONG - Never use direct colors
className="text-black bg-white border-gray-200"
```

### Color Palette (HSL Values)
```css
/* Primary Theme Colors */
--ink-black: 25 15% 15%;        /* Main text */
--washi-cream: 45 30% 94%;      /* Light backgrounds */
--sakura: 345 50% 85%;          /* Pink accents */
--bamboo-green: 120 25% 45%;    /* Green accents */
--seal-red: 355 70% 60%;        /* Red accents */
--gold-accent: 45 80% 70%;      /* Gold accents */

/* Semantic Tokens */
--background: 45 25% 97%;       /* Main background */
--foreground: 25 15% 15%;       /* Main text */
--primary: 220 40% 25%;         /* Primary buttons */
--muted: 45 15% 88%;           /* Muted elements */
```

### Component Classes
```tsx
// Paper Effect Cards
<Card className="paper-card">

// Japanese UI Effects  
<div className="ink-brush-underline">
<button className="seal-stamp">
<input className="paper-input">

// Gradients
<div className="bg-gradient-sakura">
<div className="bg-gradient-bamboo">
```

## 🧩 Component Development Pattern

### 1. Import Structure
```tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SomeIcon } from 'lucide-react';
```

### 2. TypeScript Interfaces
```tsx
interface ComponentProps {
  title: string;
  items: ItemType[];
  onAction?: (id: string) => void;
}

interface ItemType {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}
```

### 3. Component Structure
```tsx
export function MyComponent({ title, items, onAction }: ComponentProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Always use semantic design tokens
  return (
    <Card className="paper-card p-6">
      <h3 className="text-lg font-semibold text-ink mb-4">{title}</h3>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-3 rounded-lg bg-washi hover:bg-white transition-colors">
            <span className="text-ink">{item.name}</span>
            <Badge className={item.status === 'active' ? 'bg-bamboo/10 text-bamboo' : 'bg-muted'}>
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

## 🛣️ Navigation Structure

### Routes (defined in `src/App.tsx`)
```
/ - Home (Index.tsx)
/knowledge - Knowledge Hub (KnowledgeHub.tsx)
/add - Add Content (Add.tsx)  
/search - Search (Search.tsx)
/review - Review Content (Review.tsx)
/twitter/* - Social features
```

### Navigation Components
- `src/components/layout/Header.tsx` - Top navigation
- `src/components/layout/BottomNavigation.tsx` - Mobile bottom nav
- `src/components/layout/AppLayout.tsx` - Main layout wrapper

## 📱 Mobile-First Development

### Responsive Patterns
```tsx
// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

// Conditional Display
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>

// Typography Scale
<h1 className="text-xl md:text-3xl font-bold">
```

### Touch Optimization
```tsx
// Touch Targets (minimum 44px)
<button className="min-h-[44px] min-w-[44px] touch-target">

// Mobile Gestures
<div className="active:scale-98 transition-transform">
```

## 🎯 Common Tasks

### Adding New Component
1. Create in appropriate `src/components/[category]/` folder
2. Use TypeScript interfaces for props
3. Import from `@/components/ui/` for base components
4. Apply semantic design tokens consistently
5. Test on mobile and desktop

### Adding New Route
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in layout components
4. Test navigation flow

### Styling New Element
1. Check existing design tokens in `src/index.css`
2. Use semantic color names (text-ink, bg-washi, etc.)
3. Apply paper-card for container styling
4. Use component utility classes (ink-brush-underline, etc.)

## 🔍 Debugging

### Common Issues
- **White text on white background**: Use `text-ink` instead of `text-white`
- **Colors not appearing**: Check if using semantic tokens properly
- **Mobile layout broken**: Ensure mobile-first responsive classes
- **TypeScript errors**: Check import paths use `@/` prefix

### Dev Tools
- Console logs accessible in Lovable dev panel
- Network requests monitoring available
- Use browser dev tools for responsive testing

## 📦 Key Dependencies

### Core Libraries
- `react` - UI framework
- `react-router-dom` - Routing
- `tailwindcss` - Styling
- `@tanstack/react-query` - Server state
- `lucide-react` - Icons

### UI Components
- `@radix-ui/*` - Accessible primitives (via shadcn/ui)
- `class-variance-authority` - Component variants
- `tailwindcss-animate` - Animations

## 🚀 Development Commands

### In Lovable Platform
- Code changes are auto-applied
- Use "Try to Fix" for automatic error resolution
- Preview updates in real-time

### Local Development (if connected to GitHub)
```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
```

## 🎨 Design Best Practices

### 1. Always Use Design System
```tsx
// ✅ Good - Semantic tokens
<Button className="bg-gradient-sakura text-white">

// ❌ Bad - Direct colors  
<Button className="bg-pink-300 text-white">
```

### 2. Component Composition
```tsx
// ✅ Good - Composable components
<Card className="paper-card">
  <CardHeader>
    <CardTitle className="text-ink">Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content with semantic styling
  </CardContent>
</Card>
```

### 3. Responsive Design
```tsx
// ✅ Good - Mobile-first responsive
<div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
```

## 🔧 Integration Points

### State Management
- Local state with React hooks
- Global state with Context when needed
- Server state with TanStack Query

### API Integration
- Configured in `src/App.tsx` QueryClient
- Use React Query hooks for data fetching
- Handle loading and error states

### Routing
- React Router v6 configuration
- Route protection patterns available
- Navigation state management

## 📚 Recent Features Added

### Smart Discovery (`src/components/knowledge/SmartDiscovery.tsx`)
- AI-powered content recommendations
- Content clustering and organization
- Contextual suggestions based on user behavior

### Workflow Automation (`src/components/knowledge/WorkflowAutomation.tsx`)
- Automated task generation from content
- Workflow templates and configurations
- Follow-up scheduling and tracking

### Learning Analytics (`src/components/knowledge/LearningAnalytics.tsx`)
- Learning pattern analysis
- Knowledge gap identification
- Progress tracking and goal management

## 🎯 Next Steps

When working on this project:

1. **Always reference the design system** in `src/index.css`
2. **Use existing UI components** from `src/components/ui/`
3. **Follow the established patterns** shown in recent components
4. **Test on mobile** - this is a mobile-first application
5. **Maintain the Japanese aesthetic** - it's a key differentiator

## 📝 Documentation Files

- `docs/DESIGN_SYSTEM.md` - Complete design system documentation
- `docs/PROJECT_STRUCTURE.md` - Detailed architecture guide
- `CURSOR_GUIDE.md` - This file (quick reference)
- `README.md` - General project information

## 🤝 Contributing

This project follows modern React patterns with:
- TypeScript for type safety
- Component composition over inheritance  
- Mobile-first responsive design
- Semantic design tokens for consistency
- Accessibility considerations built-in

Happy coding! 🚀