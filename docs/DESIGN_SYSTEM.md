# Knowledge Hub - Design System Documentation

## Overview
This Knowledge Hub application uses a Japanese stationary-inspired design system built with Tailwind CSS. All design tokens are centralized in `src/index.css` and `tailwind.config.ts` for consistency and maintainability.

## Design Files Location

### Core Design Files
- **`src/index.css`** - Main design system with CSS variables and semantic tokens
- **`tailwind.config.ts`** - Tailwind configuration with design tokens
- **`src/components/ui/`** - shadcn/ui components library (customized)

## Color System

### Semantic Color Tokens (HSL Format)
All colors use HSL values and semantic naming:

```css
/* Primary Colors - Japanese Ink Theme */
--background: 45 25% 97%;           /* Warm cream paper */
--foreground: 25 15% 15%;           /* Dark ink */
--primary: 220 40% 25%;             /* Deep ink blue */
--secondary: 45 20% 90%;            /* Soft washi paper */
--accent: 355 60% 65%;              /* Traditional seal red */

/* Custom Japanese Theme Colors */
--sakura: 345 50% 85%;              /* Cherry blossom pink */
--ink-black: 25 15% 15%;            /* Traditional ink */
--washi-cream: 45 30% 94%;          /* Paper texture */
--seal-red: 355 70% 60%;            /* Seal stamp red */
--bamboo-green: 120 25% 45%;        /* Bamboo green */
--gold-accent: 45 80% 70%;          /* Gold details */
```

### Usage in Components
Always use semantic tokens, never direct colors:

```tsx
// ✅ CORRECT - Using semantic tokens
<div className="text-ink bg-washi border-border">

// ❌ WRONG - Direct colors
<div className="text-black bg-white border-gray-200">
```

## Gradient System

### Available Gradients
- `--gradient-paper`: Subtle paper background
- `--gradient-ink`: Deep ink flow effect
- `--gradient-sakura`: Cherry blossom gradient
- `--gradient-bamboo`: Bamboo green gradient
- `--gradient-seal`: Seal red gradient
- `--gradient-gold`: Gold accent gradient

### Usage
```tsx
<div className="bg-gradient-sakura">
<Button className="bg-gradient-bamboo">
```

## Shadow System

### Shadow Tokens
- `--shadow-paper`: Subtle paper depth
- `--shadow-elegant`: Light elegant shadow
- `--shadow-deep`: Deeper shadow for modals
- `--shadow-floating`: Floating button shadow

### Usage
```tsx
<Card className="shadow-paper">
<Button className="shadow-floating">
```

## Component Patterns

### Paper Card Effect
```tsx
<Card className="paper-card">  // Includes gradient background and shadow
```

### Japanese UI Elements
```tsx
<div className="ink-brush-underline">  // Animated underline effect
<div className="seal-stamp">           // Hover stamp effect
<input className="paper-input">       // Paper texture input
```

## Typography

### Font Stack
- **Sans**: Inter (primary UI font)
- **Serif**: Playfair Display (headings)
- **Mono**: JetBrains Mono (code)
- **Display**: Playfair Display (decorative)

## Animations

### Animation Tokens
- `--transition-smooth`: Standard smooth transition
- `--transition-bounce`: Bouncy interaction effect

### Component Animations
- `.thread-swipe`: Swipe interaction
- `.animate-fade-slide-up`: Entrance animation
- `.hover-lift`: Lift on hover

## Mobile Optimizations

### Safe Area Support
- `--safe-area-inset-top/bottom`: iPhone notch support
- `.mobile-optimized`: Touch optimization
- `.touch-target`: Minimum 44px touch targets

## Component Architecture

### UI Components (`src/components/ui/`)
All UI components are based on shadcn/ui but customized with our design system:
- Button variants using semantic colors
- Card components with paper effects  
- Form elements with Japanese aesthetics

### Feature Components
- **Knowledge Components**: `src/components/knowledge/`
- **Layout Components**: `src/components/layout/`
- **Twitter Components**: `src/components/twitter/`

## Best Practices

### 1. Always Use Semantic Tokens
```tsx
// ✅ Good
className="text-ink bg-washi"

// ❌ Bad  
className="text-gray-900 bg-gray-50"
```

### 2. Use Component Variants
```tsx
// ✅ Good - Create variants in button.tsx
<Button variant="sakura">

// ❌ Bad - Custom classes
<Button className="bg-pink-200 text-pink-800">
```

### 3. Consistent Spacing
Use Tailwind's spacing scale consistently:
- `gap-4`, `p-6`, `mb-4` for standard spacing
- `space-y-6` for vertical rhythm

### 4. Responsive Design
Always consider mobile-first design:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
```

## Component Examples

### Smart Discovery Component
- Uses `paper-card` class for consistent styling
- Implements `text-ink`, `bg-washi` for theming
- Applies `hover:shadow-md` for interactions

### Workflow Automation
- Tab-based interface with semantic colors
- Progress indicators using design system colors
- Consistent badge styling with theme variants

### Learning Analytics
- Data visualization with theme colors
- Responsive grid layouts
- Interactive elements with hover effects

## File Structure

```
src/
├── index.css                 # Design system CSS variables
├── components/
│   ├── ui/                   # Base UI components (shadcn)
│   ├── knowledge/            # Feature components
│   ├── layout/               # Layout components
│   └── icons/                # Icon components
├── hooks/                    # Custom hooks
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
└── pages/                   # Page components

tailwind.config.ts           # Tailwind configuration
```

## Development Guidelines

### For Cursor IDE Users
1. Always reference this design system before creating new components
2. Use the existing semantic tokens in `src/index.css`
3. Follow the component patterns established in `src/components/ui/`
4. Test responsive design across mobile and desktop
5. Maintain the Japanese stationary aesthetic

### Adding New Colors
1. Add to `src/index.css` with HSL values
2. Update `tailwind.config.ts` with the new token
3. Create utility classes if needed
4. Document the new color's purpose

### Component Creation
1. Start with semantic tokens from design system
2. Use existing UI components as building blocks
3. Follow mobile-first responsive design
4. Add proper TypeScript interfaces
5. Include accessibility considerations

This design system ensures consistency, maintainability, and a cohesive Japanese stationary aesthetic throughout the application.