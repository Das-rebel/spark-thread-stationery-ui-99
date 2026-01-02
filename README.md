# BrainSpark - Knowledge Management System

A beautiful, Japanese stationary-inspired knowledge management and bookmark organization application built with React, TypeScript, and Supabase.

## 🚀 Features

### ✅ Implemented
- **Authentication**: Secure email/password authentication with Supabase
- **User Profiles**: Role-based access control (admin, moderator, user)
- **Design System**: Japanese stationary-inspired theme with semantic tokens
- **Input Validation**: Comprehensive Zod schemas for all forms
- **Security**: Row-Level Security (RLS) on all tables, XSS protection
- **Mobile-First**: Responsive design with touch optimizations

### 🚧 In Progress
- **Bookmark Management**: UI complete, backend integration needed
- **Collections**: Database ready, UI implementation needed
- **Search**: Basic structure, needs full-text search implementation

### 📋 Planned
- **Content Capture**: Web scraping, YouTube transcripts, PDF processing
- **Smart Discovery**: AI-powered content recommendations
- **Learning Analytics**: Progress tracking, streaks, achievements
- **Workflow Automation**: Task automation and triggers
- **Knowledge Graph**: Visual relationship mapping

**See complete roadmap**: `CURSOR_FEATURE_ROADMAP.md`

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom Japanese stationary design system
- **UI Components**: shadcn/ui (40+ customized components)
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions, Storage)
- **Validation**: Zod
- **Icons**: Lucide React
- **Charts**: Recharts

## 📚 Documentation for Cursor Development

### Essential Files for Replication ⭐

This project includes comprehensive documentation for easy frontend replication in Cursor:

1. **[CURSOR_DESIGN_TOKENS.md](./CURSOR_DESIGN_TOKENS.md)** - START HERE
   - Complete color palette (all HSL format)
   - Gradients, shadows, typography
   - Component patterns & best practices
   - Copy-paste code snippets

2. **[CURSOR_COMPONENTS_GUIDE.md](./CURSOR_COMPONENTS_GUIDE.md)** 
   - Full component architecture
   - File structure & organization
   - Custom hooks reference
   - React patterns & examples

3. **[CURSOR_FEATURE_ROADMAP.md](./CURSOR_FEATURE_ROADMAP.md)** 
   - Implementation status checklist
   - Phase-by-phase plan (10 weeks)
   - Backend requirements
   - Testing & security checklists

4. **[CURSOR_API_REFERENCE.md](./CURSOR_API_REFERENCE.md)** 
   - Complete database schema with TypeScript interfaces
   - API operation patterns
   - Security best practices
   - React Query integration examples

5. **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** 
   - Design philosophy
   - Usage guidelines
   - Component examples

## 🏃‍♂️ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd brainspark2
npm install
```

### 2. Environment Setup

Create `.env` file:

```env
VITE_SUPABASE_URL=https://srjirjaldpdvsafsuyes.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🎨 Design System

### Japanese Stationary Theme

This project uses a comprehensive design system inspired by retro Japanese stationary:

**Color Palette (HSL format):**
- **Sakura** (`345 50% 85%`) - Cherry blossom pink for accents
- **Ink** (`25 15% 15%`) - Traditional Japanese ink for text
- **Washi** (`45 30% 94%`) - Paper texture cream for backgrounds
- **Seal** (`355 70% 60%`) - Seal stamp red for CTAs
- **Bamboo** (`120 25% 45%`) - Bamboo green for success
- **Gold** (`45 80% 70%`) - Gold for premium features

**Key Features:**
- Semantic color tokens (never use direct colors like `bg-white`)
- Custom gradients and shadows
- Paper card effects with texture
- Typography: Inter (sans), Playfair Display (serif)
- Mobile-first responsive design
- Smooth animations and transitions

**See complete reference**: `CURSOR_DESIGN_TOKENS.md`

## 🗄 Database Schema

### Main Tables

- **`user_profiles`** - User information and preferences
- **`user_roles`** - Role-based access control
- **`bookmarks`** - Saved content from various sources
- **`collections`** - Organized bookmark groups
- **`content_relationships`** - Knowledge graph connections
- **`daily_activities`** - Usage analytics
- **`learning_streaks`** - Gamification data
- **`learning_paths`** - Structured learning journeys
- **`smart_actionables`** - AI-generated suggestions
- **`bookmark_analysis`** - AI analysis results

All tables use Row Level Security (RLS) for user data isolation.

**See complete schema**: `CURSOR_API_REFERENCE.md`

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (40+)
│   ├── knowledge/       # Knowledge hub features (15+)
│   ├── twitter/         # Social feed features (8+)
│   ├── layout/          # App layout components
│   ├── capture/         # Content capture
│   ├── export/          # Import/export
│   └── user/            # User components
├── hooks/               # Custom React hooks
│   ├── use-auth.tsx     # Authentication
│   ├── use-bookmarks.ts # Bookmark operations
│   └── use-mobile.tsx   # Mobile detection
├── pages/               # Route pages (15+)
├── lib/
│   ├── utils.ts         # Utility functions
│   └── validation.ts    # Zod schemas
└── integrations/
    └── supabase/
        ├── client.ts    # Supabase client
        └── types.ts     # Generated types

supabase/
├── migrations/          # Database migrations
└── config.toml          # Supabase config
```

## 🔒 Security

### Implemented Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ Input validation with Zod schemas
- ✅ XSS protection (removed dangerouslySetInnerHTML)
- ✅ User authentication required
- ✅ User data isolation
- ✅ Secure password hashing (Supabase)
- ✅ CSRF protection
- ✅ Safe HTML sanitization

### Security Best Practices

```typescript
// ✅ CORRECT - Always include user_id filter
const { data } = await supabase
  .from('bookmarks')
  .select('*')
  .eq('user_id', user.id);

// ✅ CORRECT - Validate before inserting
const validated = bookmarkSchema.parse(formData);

// ✅ CORRECT - Use semantic tokens
<div className="text-ink bg-washi">
```

## 🎯 Implementation Phases

### Phase 1: Core Functionality ✅ (Week 1-2)
- [x] Authentication system
- [x] Design system implementation
- [x] Input validation
- [ ] Complete bookmark CRUD operations
- [ ] Collections management UI
- [ ] Basic search functionality

### Phase 2: Content Capture (Week 3-4)
- [ ] Web content capture (Edge Function)
- [ ] YouTube transcript extraction
- [ ] PDF processing
- [ ] File storage setup

### Phase 3: Analytics & Insights (Week 5-6)
- [ ] Activity tracking system
- [ ] Learning analytics dashboard
- [ ] Smart actionables generation

### Phase 4: Advanced Features (Week 7-8)
- [ ] Smart discovery algorithm
- [ ] Knowledge graph visualization
- [ ] Workflow automation engine

### Phase 5: Integrations (Week 9-10)
- [ ] Platform integrations (Twitter, YouTube)
- [ ] Browser extension
- [ ] Enhanced export/import

**See full roadmap**: `CURSOR_FEATURE_ROADMAP.md`

## 🚢 Deployment

### Deploy to Lovable Cloud (Recommended)

1. Connect GitHub in Lovable dashboard
2. Changes auto-deploy when pushed to GitHub
3. Database migrations run through Lovable UI
4. Environment variables managed in dashboard

### Self-Hosting

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy `dist/` folder to Vercel, Netlify, or any static hosting.

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 🐛 Troubleshooting

### Frontend Issues
- Clear browser cache and reload
- Check console for errors
- Verify environment variables in `.env`

### Backend Issues  
- Check RLS policies if queries fail
- Ensure user is authenticated
- Review Supabase logs in dashboard

### Build Issues
- Run `npm install` to update dependencies
- Clear `node_modules` and reinstall
- Check Node.js version (18+)

## 📱 Mobile Development

This app is mobile-first and works great as a PWA. Features:

- Touch-optimized interactions
- Safe area support (iPhone notch)
- Bottom navigation for mobile
- Pull-to-refresh capability
- Responsive breakpoints

For native mobile apps, see Capacitor documentation.

## 🤝 Contributing

### With Lovable + GitHub + Cursor

1. **Connect GitHub in Lovable**: Click GitHub button → Create Repository
2. **Clone locally**: `git clone <your-repo-url>`
3. **Make changes in Cursor**: 
   - Read `CURSOR_DESIGN_TOKENS.md` for styling
   - Read `CURSOR_COMPONENTS_GUIDE.md` for architecture
   - Read `CURSOR_API_REFERENCE.md` for database operations
4. **Push to GitHub**: `git push origin main`
5. **Auto-syncs to Lovable**: Changes appear automatically

### Development Tips

- Use semantic color tokens, never direct colors
- Follow existing component patterns
- Validate all user inputs with Zod
- Always include RLS policies for new tables
- Test on mobile and desktop
- Reference documentation files frequently

## 📚 Complete Documentation

### For Cursor Development
- **[CURSOR_DESIGN_TOKENS.md](./CURSOR_DESIGN_TOKENS.md)** - Design system reference (START HERE)
- **[CURSOR_COMPONENTS_GUIDE.md](./CURSOR_COMPONENTS_GUIDE.md)** - Component architecture
- **[CURSOR_FEATURE_ROADMAP.md](./CURSOR_FEATURE_ROADMAP.md)** - Implementation roadmap
- **[CURSOR_API_REFERENCE.md](./CURSOR_API_REFERENCE.md)** - Database & API reference

### General Documentation
- **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** - Design guidelines
- **[CURSOR_BACKEND_SETUP.md](./CURSOR_BACKEND_SETUP.md)** - Backend setup
- **[CURSOR_GUIDE.md](./CURSOR_GUIDE.md)** - AI development tips

## 🔗 Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built with [Lovable](https://lovable.dev) - The AI-powered app builder  
Powered by [Supabase](https://supabase.com) - Open source Firebase alternative
### TypeScript
- `examples/typescript/typescript-tasks.yaml` – TypeScript-specific task patterns
