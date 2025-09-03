# Knowledge Hub - AI-Powered Learning Companion

A beautiful, responsive web application built with React, TypeScript, and Tailwind CSS, featuring a unique **Retro Japanese Stationary** design theme.

## 🎨 Design System

This project features a comprehensive design system inspired by traditional Japanese stationary:

- **Color Palette**: Warm creams, deep ink blues, cherry blossom pinks, and bamboo greens
- **Typography**: Elegant font combinations with Playfair Display and Inter
- **Effects**: Paper textures, ink brush animations, and seal stamp interactions
- **Components**: Fully styled UI library with consistent theming

👉 **Full design documentation**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling with custom design system
- **Shadcn/ui** components with custom theming
- **Lucide React** for icons
- **React Router** for navigation
- **React Query** for state management

### Backend Integration
- **Supabase** for database and authentication
- **Real-time updates** and data synchronization
- **Row Level Security** for data protection

### Build Tools
- **Vite** for fast development and building
- **TypeScript** for type safety
- **ESLint** for code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Base UI components (buttons, cards, etc.)
│   ├── layout/             # Layout components (header, navigation)
│   ├── knowledge/          # Knowledge hub features
│   ├── twitter/            # Social media features
│   └── user/               # User-related components
├── pages/                  # Main application pages
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── assets/                 # Images and static assets
└── integrations/           # External service integrations
```

## 🔧 Backend Development with Cursor

This project is optimized for **dual development**:

- **Frontend**: Continue using Lovable for UI/UX development
- **Backend**: Use Cursor/VS Code for API development, database schema, etc.

### GitHub Sync Setup

1. **Connect to GitHub in Lovable**:
   - Click the GitHub button in the top right
   - Authorize the Lovable GitHub App
   - Select your GitHub account/organization
   - Click "Create Repository" to sync your project

2. **Bidirectional Sync**:
   - Changes in Lovable → Automatically push to GitHub
   - Changes in GitHub → Automatically sync to Lovable
   - Work simultaneously in both tools

3. **Working with Cursor**:
   ```bash
   # Clone the repository
   git clone <your-github-url>
   cd <your-project>
   
   # Install dependencies
   npm install
   
   # Start development
   npm run dev
   ```

### Development Workflow
1. **Lovable**: Use for UI components, styling, frontend features
2. **Cursor**: Use for database migrations, API routes, backend logic
3. **Automatic Sync**: Both tools stay in sync via GitHub

## 🎯 Key Features

### Knowledge Hub
- **AI-Powered Discovery**: Smart content recommendations
- **Enhanced Search**: Semantic search with AI insights
- **Smart Actionables**: AI-generated tasks from bookmarks
- **Workflow Automation**: Automated task generation and follow-ups
- **Learning Analytics**: Progress tracking and insights

### Social Features
- **Twitter Integration**: Bookmark and organize tweets
- **Thread Viewer**: Beautiful thread reading experience
- **Social Bookmarking**: Save and categorize social content

### UI/UX Excellence
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode Support**: Automatic theme switching
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized loading, lazy loading, virtual scrolling

## 🎨 Design System Usage

### Color Guidelines
```tsx
// ✅ CORRECT - Use semantic tokens
<Button className="bg-gradient-sakura text-white">
<div className="text-ink bg-washi">

// ❌ WRONG - Don't use direct colors
<Button className="bg-pink-200 text-black">
```

### Available Design Tokens
- **Colors**: `text-ink`, `text-sakura`, `bg-washi`, `bg-gradient-primary`
- **Effects**: `paper-card`, `interactive-button`, `category-card`
- **Animations**: `transition-smooth`, `hover-lift`

### Typography Classes
- **Headings**: `font-display` (Playfair Display)
- **Body**: `font-sans` (Inter)
- **Code**: `font-mono` (JetBrains Mono)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🛠 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🚀 Deployment

### Lovable Platform (Recommended)
- Click "Publish" in Lovable for instant deployment
- Custom domain support available
- Automatic HTTPS and CDN

### Self-Hosting
```bash
npm run build        # Create production build
# Deploy the 'dist' folder to your hosting platform
```

Compatible with: Vercel, Netlify, AWS, GitHub Pages, etc.

## 📄 Environment Variables

Create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 Component Library

### Core UI Components
- **Button**: Multiple variants with consistent theming
- **Card**: Paper-effect cards with shadows
- **Input**: Styled form inputs with validation states
- **Navigation**: Tab and menu components

### Feature Components
- **Knowledge Hub**: AI-powered learning interface
- **Search**: Enhanced search with filters and AI
- **Actionables**: Task management with automation
- **Analytics**: Progress tracking and insights

---

## 🤝 Contributing

This project uses a dual development approach:
1. **UI/Frontend**: Use Lovable for rapid development
2. **Backend/Logic**: Use Cursor for detailed development
3. **Automatic Sync**: GitHub keeps everything synchronized

**Built with ❤️ using Lovable and designed for Cursor integration**