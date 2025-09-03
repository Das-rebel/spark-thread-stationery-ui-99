# Design System Documentation

## Overview
This project uses a **Retro Japanese Stationary** design theme with warm, paper-like textures and traditional Japanese colors. All styling is managed through CSS custom properties and Tailwind CSS.

## Color Palette

### Base Colors (HSL Format)
```css
/* Warm cream paper inspired */
--background: 45 25% 97%;
--foreground: 25 15% 15%;

/* Card Colors - Paper texture feeling */
--card: 45 30% 96%;
--card-foreground: 25 15% 15%;

/* Primary - Deep ink blue like traditional Japanese ink */
--primary: 220 40% 25%;
--primary-foreground: 45 25% 97%;

/* Secondary - Soft washi paper tone */
--secondary: 45 20% 90%;
--secondary-foreground: 25 15% 25%;

/* Muted - Subtle paper grain */
--muted: 45 15% 88%;
--muted-foreground: 25 10% 50%;

/* Accent - Warm red like traditional seals */
--accent: 355 60% 65%;
--accent-foreground: 45 25% 97%;
```

### Japanese Theme Colors
```css
--sakura: 345 50% 85%;      /* Cherry blossom pink */
--ink-black: 25 15% 15%;    /* Traditional ink black */
--washi-cream: 45 30% 94%;  /* Washi paper cream */
--seal-red: 355 70% 60%;    /* Traditional seal red */
--bamboo-green: 120 25% 45%; /* Bamboo green */
--gold-accent: 45 80% 70%;   /* Gold accent */
```

### Gradients
```css
--gradient-paper: linear-gradient(135deg, hsl(45 30% 96%), hsl(45 25% 94%));
--gradient-ink: linear-gradient(135deg, hsl(220 40% 25%), hsl(220 45% 20%));
--gradient-primary: linear-gradient(135deg, hsl(220 40% 25%), hsl(220 35% 30%));
--gradient-sakura: linear-gradient(135deg, hsl(345 50% 85%), hsl(345 40% 80%));
--gradient-bamboo: linear-gradient(135deg, hsl(120 25% 45%), hsl(120 30% 40%));
--gradient-seal: linear-gradient(135deg, hsl(355 70% 60%), hsl(355 65% 55%));
--gradient-gold: linear-gradient(135deg, hsl(45 80% 70%), hsl(45 75% 65%));
```

## Typography

### Font Stack
```css
font-family: {
  'sans': ['Inter', 'system-ui', 'sans-serif'],
  'serif': ['Playfair Display', 'Georgia', 'serif'],
  'mono': ['JetBrains Mono', 'Menlo', 'monospace'],
  'display': ['Playfair Display', 'Georgia', 'serif'],
}
```

### Usage Guidelines
- **Headings**: Use `font-display` (Playfair Display) for elegant headings
- **Body Text**: Use `font-sans` (Inter) for readable body text
- **Code**: Use `font-mono` (JetBrains Mono) for code snippets
- **Color Classes**: Always use semantic tokens (e.g., `text-ink`, `text-sakura`) instead of direct colors

## Shadows & Effects

### Shadow System
```css
--shadow-light: 25 15% 15% / 0.05;
--shadow-medium: 25 15% 15% / 0.08;
--shadow-elegant: 0 4px 16px hsl(25 15% 15% / 0.06);
--shadow-paper: 0 2px 8px hsl(25 15% 15% / 0.08);
--shadow-deep: 0 8px 24px hsl(25 15% 15% / 0.12);
--shadow-floating: 0 12px 32px hsl(25 15% 15% / 0.15);
```

### Special Effects
- **Paper Card**: `.paper-card` - Adds paper-like background and subtle shadow
- **Washi Texture**: `.washi-texture` - Subtle texture pattern
- **Ink Brush Underline**: `.ink-brush-underline` - Animated underline effect
- **Seal Stamp**: `.seal-stamp` - Hover effect with red dot

## Interactive Elements

### Button Variants
- **Default**: Primary color with gradient background
- **Outline**: Border with transparent background
- **Ghost**: Transparent with hover effects
- **Interactive**: Enhanced with `interactive-button` class for better feedback

### Animation Classes
```css
.interactive-button         /* Enhanced button interactions */
.category-card             /* Card hover effects */
.tab-button               /* Tab switching animations */
.hover-lift              /* Lift effect on hover */
.transition-smooth       /* Smooth transitions */
.transition-bounce       /* Bouncy animations */
```

## Component Guidelines

### Cards
- Use `paper-card` class for consistent card styling
- Add `hover:shadow-floating` for interactive cards
- Use `category-card` for main navigation cards

### Navigation
- Use `tab-button` class for tab navigation
- Add proper event handling with `preventDefault()` and `stopPropagation()`
- Include console logging for debugging: `console.log('🎯 Tab switching to:', category)`

### Colors Usage
```tsx
// ✅ CORRECT - Use semantic tokens
<Button className="bg-gradient-sakura text-white">
<div className="text-ink bg-washi">

// ❌ WRONG - Don't use direct colors
<Button className="bg-pink-200 text-black">
<div className="text-gray-900 bg-gray-100">
```

## Spacing & Layout

### Container System
- **Mobile**: Full width with padding
- **Desktop**: Max width with centered layout
- **Safe Areas**: Use `safe-area-inset-bottom` for mobile

### Grid System
- **Overview Cards**: `grid-cols-1 md:grid-cols-3`
- **Stats**: `grid-cols-2 md:grid-cols-4`
- **Content**: Use flexbox for dynamic layouts

## Responsive Design

### Breakpoints (Tailwind defaults)
- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile Optimizations
- Touch-friendly button sizes (min 44px)
- Proper safe area handling
- Gesture support for swipe actions
- Optimized hover effects for touch devices

## Dark Mode Support

The design system includes full dark mode support with automatic color switching based on system preferences.

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... additional dark mode colors */
}
```

## File Structure

### Key Design Files
- `src/index.css` - Main design system and custom properties
- `tailwind.config.ts` - Tailwind configuration and theme extensions
- `src/components/ui/` - Reusable UI components with consistent styling
- `src/assets/` - Images, icons, and media assets

### Component Architecture
- **Layout Components**: Header, navigation, app layout
- **UI Components**: Buttons, cards, inputs with design system integration
- **Feature Components**: Knowledge hub, Twitter feed, user components
- **Utility Components**: Animations, accessibility, performance

## Development Guidelines

1. **Always use semantic color tokens** - Never hardcode colors
2. **Maintain HSL color format** - Consistent with design system
3. **Use component variants** - Leverage cva for consistent styling
4. **Test across devices** - Ensure responsive behavior
5. **Follow animation principles** - Smooth, purposeful animations
6. **Accessibility first** - Proper contrast, focus states, ARIA labels

This design system ensures consistency across the entire application while maintaining the beautiful Japanese stationary aesthetic.