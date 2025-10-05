# Knowledge Hub - AI-Powered Learning Platform

A beautiful, mobile-first knowledge management application with AI-powered insights, semantic search, and learning analytics.

## 🚀 Features

- **Smart Knowledge Capture**: Multi-platform content aggregation with AI analysis
- **Semantic Search**: Natural language search powered by AI
- **Learning Analytics**: Track your learning progress and streaks
- **Smart Collections**: Auto-organized content based on topics
- **Gamification**: Levels, XP, and achievements to motivate learning
- **Platform Integration**: Connect Gmail, Twitter, GitHub, and more

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with Japanese Stationary design theme
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **UI Components**: Radix UI + Custom components
- **State Management**: TanStack Query
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (for backend)
- Git

## 🏃‍♂️ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-name>
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🎨 Design System

This project uses a custom "Retro Japanese Stationary" design theme:

- **Color Palette**: Sakura pink, Ink black, Washi cream, Bamboo green
- **Typography**: Clean sans-serif with Japanese-inspired spacing
- **Components**: Paper-textured cards with elegant shadows
- **Responsive**: Mobile-first with tablet and desktop breakpoints

See `DESIGN_SYSTEM.md` for detailed guidelines.

## 🗄 Backend Development

For backend development with Cursor IDE, see detailed guide:
**[CURSOR_BACKEND_SETUP.md](./CURSOR_BACKEND_SETUP.md)**

### Database Schema

Core tables:
- `user_profiles` - User information and settings
- `bookmarks` - Saved content from various sources
- `collections` - Organized content groups
- `smart_actionables` - AI-generated action items
- `learning_paths` - Structured learning journeys
- `learning_streaks` - Gamification data
- `daily_activities` - Usage analytics

All tables use Row Level Security (RLS) for data protection.

## 📂 Project Structure

```
src/
├── components/
│   ├── knowledge/      # Knowledge hub features
│   ├── twitter/        # Social feed features
│   ├── layout/         # App layout components
│   ├── ui/             # Reusable UI components
│   └── user/           # User-specific components
├── hooks/              # Custom React hooks
├── pages/              # Route pages
├── integrations/       # Supabase integration
│   └── supabase/
│       ├── client.ts   # Supabase client
│       └── types.ts    # Generated types
└── lib/                # Utilities

supabase/
├── migrations/         # Database migrations
└── config.toml         # Supabase config
```

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- User-scoped data access only
- Secure authentication via Supabase Auth
- No sensitive data in frontend code

**Security Issues**: See active security findings and fixes needed in the Lovable dashboard.

## 🚢 Deployment

### Deploy to Lovable Cloud (Recommended)

1. Changes auto-deploy when connected to GitHub
2. Database migrations run through Lovable UI
3. Environment variables managed in Lovable dashboard

### Self-Hosting

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy `dist/` folder to any static hosting (Vercel, Netlify, etc.)

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📱 Mobile Development

This app is mobile-first and works great as a PWA. For native mobile apps:

See Capacitor setup in the docs (not yet configured).

## 🤝 Contributing

When using Cursor IDE for development:

1. Use AI to understand the codebase: "Explain the bookmark flow"
2. Generate new features: "Add a tagging system for bookmarks"  
3. Create migrations: "Create a migration for tags table with RLS"
4. Fix bugs: "Debug why bookmarks aren't loading"

## 📝 Development Workflow

### With Lovable + GitHub + Cursor

1. **Connect GitHub in Lovable**: Click GitHub button → Create Repository
2. **Clone locally**: `git clone <your-repo-url>`
3. **Make changes in Cursor**: Edit code, create migrations, add features
4. **Push to GitHub**: `git push origin main`
5. **Auto-syncs to Lovable**: Changes appear in Lovable automatically
6. **Or use Lovable**: Make UI changes in Lovable → auto-pushes to GitHub

### Backend Changes with Cursor

1. Create migration files in `supabase/migrations/`
2. Test locally with `supabase start`
3. Push to GitHub
4. Apply in production via Lovable UI

See `CURSOR_BACKEND_SETUP.md` for detailed backend workflow.

## 🐛 Troubleshooting

### Frontend Issues
- Clear browser cache and reload
- Check console for errors
- Verify environment variables

### Backend Issues  
- Check RLS policies if queries fail
- Ensure user is authenticated
- Review Supabase logs

### Build Issues
- Run `npm install` to update dependencies
- Clear `node_modules` and reinstall
- Check Node.js version (18+)

## 📚 Documentation

- [Design System](./DESIGN_SYSTEM.md) - UI/UX guidelines
- [Backend Setup](./CURSOR_BACKEND_SETUP.md) - Database and API development
- [Cursor Guide](./CURSOR_GUIDE.md) - AI development tips

## 🔗 Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built with [Lovable](https://lovable.dev) - The AI-powered app builder  
Powered by [Supabase](https://supabase.com) - Open source Firebase alternative
