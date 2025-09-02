# Knowledge Hub - Project Structure Guide

## Overview
This is a React-based Knowledge Hub application built with Vite, TypeScript, and Tailwind CSS. The app features a Japanese stationary-inspired design system and includes smart content discovery, workflow automation, and learning analytics.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React hooks, TanStack Query
- **Build Tool**: Vite
- **Deployment**: Lovable platform

## Project Structure

```
project-root/
├── public/                   # Static assets
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # Base UI components (shadcn/ui)
│   │   ├── knowledge/       # Knowledge management features
│   │   ├── layout/          # Layout components
│   │   ├── twitter/         # Twitter-like social features
│   │   ├── capture/         # Content capture features
│   │   ├── card/            # Card components
│   │   ├── augment/         # Content augmentation
│   │   ├── search/          # Search functionality
│   │   ├── user/            # User interface components
│   │   └── icons/           # Icon components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── pages/               # Page components (routes)
│   ├── assets/              # Images and static files
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   ├── index.css            # Global styles & design system
│   └── vite-env.d.ts        # Vite type definitions
├── docs/                    # Documentation files
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project readme
```

## Key Components Overview

### Core Layout
- **`src/components/layout/AppLayout.tsx`** - Main app wrapper with navigation
- **`src/components/layout/Header.tsx`** - Top navigation header
- **`src/components/layout/BottomNavigation.tsx`** - Mobile bottom navigation

### Knowledge Management Features
- **`src/components/knowledge/SmartDiscovery.tsx`** - AI-powered content recommendations
- **`src/components/knowledge/WorkflowAutomation.tsx`** - Task automation and templates
- **`src/components/knowledge/LearningAnalytics.tsx`** - Learning progress tracking
- **`src/components/knowledge/KnowledgeHubFAB.tsx`** - Floating action button
- **`src/components/knowledge/EnhancedSearch.tsx`** - Advanced search functionality

### UI Components (`src/components/ui/`)
Based on shadcn/ui but customized for Japanese stationary theme:
- `button.tsx` - Button component with theme variants
- `card.tsx` - Card components with paper effects
- `input.tsx` - Form inputs with paper texture
- `badge.tsx` - Status and category badges
- `progress.tsx` - Progress indicators
- `tabs.tsx` - Tab navigation
- Plus many more UI primitives

### Page Components (`src/pages/`)
- **`Index.tsx`** - Home page
- **`KnowledgeHub.tsx`** - Main knowledge management interface
- **`Add.tsx`** - Content addition page
- **`Search.tsx`** - Search results page
- **`Review.tsx`** - Content review interface
- **Twitter pages** - Social media like features

### Custom Hooks (`src/hooks/`)
- **`use-keyboard-navigation.tsx`** - Global keyboard shortcuts
- **`use-mobile.tsx`** - Mobile device detection
- **`use-toast.ts`** - Toast notification system

## Routing Structure

```typescript
// Main routes defined in src/App.tsx
Routes:
  "/" - Home page (Index)
  "/knowledge" - Knowledge Hub main interface
  "/add" - Add new content
  "/search" - Search interface
  "/review" - Review content
  "/document/:id" - Individual document view
  "/twitter/*" - Twitter-like social features
  "*" - 404 Not Found page
```

## Design System Integration

### CSS Architecture
- **`src/index.css`** - Contains all design tokens and CSS variables
- Uses HSL color format for better control
- Japanese stationary theme with semantic naming
- Mobile-first responsive design

### Component Styling Approach
```typescript
// Always use semantic design tokens
className="text-ink bg-washi paper-card shadow-elegant"

// Never use direct colors
// ❌ className="text-black bg-white border-gray-200"
```

## Development Workflows

### Component Creation Pattern
1. Create in appropriate directory (`components/[category]/`)
2. Use TypeScript interfaces for props
3. Import UI components from `components/ui/`
4. Apply design system tokens consistently
5. Include responsive design considerations

### Adding New Features
1. Create feature components in appropriate folder
2. Add routes in `src/App.tsx` if needed
3. Update navigation in layout components
4. Follow existing patterns and conventions

### Styling Guidelines
1. Use existing design tokens from `src/index.css`
2. Follow Japanese stationary aesthetic
3. Implement mobile-first responsive design
4. Use semantic color names, not direct colors
5. Leverage shadcn/ui components as base

## State Management

### Local State
- React hooks (`useState`, `useEffect`, `useReducer`)
- Context API for shared state when needed

### Server State
- TanStack Query for API calls and caching
- Configured in `src/App.tsx` with QueryClient

### Navigation State
- React Router for routing and navigation
- Browser history management

## Performance Considerations

### Code Splitting
- Route-based code splitting with React.lazy()
- Component-level splitting for large features

### Asset Optimization
- Image optimization and lazy loading
- CSS/JS minification in production build

### Caching Strategy
- TanStack Query for API response caching
- Browser caching for static assets

## Mobile Optimization

### Responsive Design
- Mobile-first Tailwind CSS approach
- Touch-friendly interaction targets (44px minimum)
- Safe area insets for modern mobile devices

### Performance
- Optimized animations for mobile
- Touch gesture support
- Reduced motion preferences

## Build and Deployment

### Development
```bash
npm run dev    # Start development server
npm run build  # Create production build  
npm run preview # Preview production build
```

### Deployment
- Automatic deployment through Lovable platform
- GitHub integration for version control
- Environment-specific configurations

## TypeScript Configuration

### Key Features
- Strict mode enabled
- Path aliases (`@/` maps to `src/`)
- Component prop type checking
- Modern ES features support

### Import Patterns
```typescript
// UI components
import { Button } from "@/components/ui/button"

// Feature components  
import { SmartDiscovery } from "@/components/knowledge/SmartDiscovery"

// Utilities
import { cn } from "@/lib/utils"
```

## Testing Strategy

### Component Testing
- Focus on user interactions and accessibility
- Test responsive behavior across breakpoints
- Verify design system token usage

### Integration Testing
- Route navigation and state management
- API integration with TanStack Query
- Cross-component communication

## Security Considerations

### Input Validation
- TypeScript interfaces for type safety
- Form validation with proper error handling
- XSS prevention through React's built-in protections

### Data Handling
- Secure API communication patterns
- Local storage usage best practices
- User privacy considerations

## Future Enhancements

### Planned Features
- Real-time collaboration
- Advanced analytics dashboard
- AI-powered content suggestions
- Offline support with service workers

### Architecture Improvements
- State management optimization
- Performance monitoring
- Accessibility enhancements
- Progressive Web App features

This project structure follows modern React best practices while maintaining a clear separation of concerns and scalable architecture.