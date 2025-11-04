# Complete Cursor Development Guide

## 🎯 Quick Start

This project is a fully-featured knowledge management application built with React, TypeScript, Tailwind CSS, and Supabase. Everything is ready to connect and use.

## 📚 Essential Documentation

Read these files in order to understand the project:

1. **[CURSOR_BACKEND_SETUP.md](./CURSOR_BACKEND_SETUP.md)** - Backend connection guide
2. **[CURSOR_API_REFERENCE.md](./CURSOR_API_REFERENCE.md)** - Complete API documentation
3. **[CURSOR_DESIGN_TOKENS.md](./CURSOR_DESIGN_TOKENS.md)** - Design system tokens
4. **[CURSOR_COMPONENTS_GUIDE.md](./CURSOR_COMPONENTS_GUIDE.md)** - Component architecture
5. **[CURSOR_FEATURE_ROADMAP.md](./CURSOR_FEATURE_ROADMAP.md)** - Feature implementation plan

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── knowledge/      # Knowledge hub features
│   ├── twitter/        # Twitter-like UI components
│   ├── capture/        # Content capture components
│   ├── search/         # Search components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
│   ├── use-auth.tsx   # Authentication hook
│   ├── use-bookmarks.ts    # Bookmark CRUD operations
│   ├── use-collections.ts  # Collections management
│   ├── use-analytics.ts    # Analytics data
│   └── use-actionables.ts  # Smart actionables
├── pages/              # Page components
├── lib/                # Utilities
│   ├── utils.ts       # General utilities
│   └── validation.ts  # Input validation schemas
├── integrations/
│   └── supabase/      # Supabase client and types
├── index.css          # Design system tokens
└── main.tsx           # App entry point
```

## 🎨 Design System

This project uses a **Japanese stationery-inspired design system** with:

- **Semantic color tokens** defined in `src/index.css`
- **Tailwind configuration** in `tailwind.config.ts`
- **40+ customized shadcn/ui components**
- **Gradient system** for beautiful effects
- **Typography scale** for consistent text
- **Animation framework** for smooth interactions

### Key Design Principles

1. **Always use semantic tokens** - Never hardcode colors
2. **HSL color format** - All colors must be in HSL
3. **Component variants** - Use variants for different states
4. **Responsive design** - Mobile-first approach
5. **Dark mode support** - All components support dark mode

## 🔌 Backend Integration

### Supabase Client

```typescript
import { supabase } from '@/integrations/supabase/client';
```

### Authentication

```typescript
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, session, signIn, signOut } = useAuth();
  
  // user.id to access current user ID
}
```

### Data Fetching

```typescript
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useCollections } from '@/hooks/use-collections';

function MyComponent() {
  const { user } = useAuth();
  const { bookmarks, createBookmark } = useBookmarks(user?.id);
  const { collections } = useCollections(user?.id);
}
```

## 🛠️ Development Workflow

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

## 📝 Common Patterns

### Creating a New Feature Component

1. **Create component file** in appropriate directory
2. **Import design tokens** from index.css
3. **Use custom hooks** for data fetching
4. **Add error handling** and loading states
5. **Make it responsive** with Tailwind classes

### Example Component Structure

```typescript
import { useAuth } from '@/hooks/use-auth';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function MyFeature() {
  const { user } = useAuth();
  const { bookmarks, isLoading, createBookmark } = useBookmarks(user?.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        {/* Your content */}
      </Card>
    </div>
  );
}
```

### Form Handling with Validation

```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1).max(200),
  url: z.string().url().optional(),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // Handle submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## 🎯 Implementation Phases

### Phase 1: Core Functionality ✅
- Authentication and user management
- Bookmark CRUD operations
- Collections management
- Basic search

### Phase 2: Content Capture
- Web page capture
- YouTube video capture
- PDF upload
- Note creation

### Phase 3: Analytics & Insights
- Activity tracking
- Learning analytics
- Smart actionables
- Progress tracking

### Phase 4: Advanced Features
- Knowledge graph
- Smart discovery
- Workflow automation
- Advanced search

### Phase 5: Integrations
- Platform integrations
- Export/import
- Browser extension

## 🔐 Security Best Practices

1. **Always use RLS policies** - Data is protected at database level
2. **Validate all inputs** - Use Zod schemas
3. **Never expose secrets** - Use environment variables
4. **Use prepared statements** - Supabase client handles this
5. **Implement CSRF protection** - Built into Supabase Auth

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can sign up and sign in
- [ ] User can create bookmarks
- [ ] User can create collections
- [ ] User can search bookmarks
- [ ] User can view analytics
- [ ] Mobile responsiveness works
- [ ] Dark mode works
- [ ] Error states display correctly

## 📊 Database Access

### Supabase Dashboard Links

- **SQL Editor:** https://supabase.com/dashboard/project/srjirjaldpdvsafsuyes/sql/new
- **Table Editor:** https://supabase.com/dashboard/project/srjirjaldpdvsafsuyes/editor
- **Authentication:** https://supabase.com/dashboard/project/srjirjaldpdvsafsuyes/auth/users
- **Storage:** https://supabase.com/dashboard/project/srjirjaldpdvsafsuyes/storage/buckets

## 🚀 Deployment

This project can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Cloudflare Pages**
- Any static hosting service

### Environment Variables

When deploying, set these environment variables:
- `VITE_SUPABASE_URL` - Already in code
- `VITE_SUPABASE_ANON_KEY` - Already in code

## 🆘 Troubleshooting

### Common Issues

**Issue:** "User not authenticated"
- **Solution:** Check if user is signed in with `useAuth()` hook

**Issue:** "RLS policy violation"
- **Solution:** Ensure user is accessing their own data only

**Issue:** "Type errors with Supabase"
- **Solution:** Types are auto-generated in `src/integrations/supabase/types.ts`

**Issue:** "Dark mode not working"
- **Solution:** Check if semantic tokens are used, not hardcoded colors

## 📞 Support

For questions or issues:
1. Check existing documentation files
2. Review Supabase logs
3. Check browser console for errors
4. Review RLS policies in database

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tanstack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com/)
