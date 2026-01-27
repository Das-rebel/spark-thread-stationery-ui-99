# Testing Guide

Step-by-step testing instructions for BrainSpark application.

## Environment Setup

### Prerequisites

- Node.js 18+ 
- npm or bun package manager
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd brainspark2

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://srjirjaldpdvsafsuyes.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Demo Account Setup

### Create Test Account

1. Navigate to `/auth`
2. Click "Sign Up" tab
3. Enter credentials:
   - **Email:** `demo@example.com`
   - **Password:** `Demo123456`
4. Submit and verify email if required

### Quick Login

Use the test credentials above or create your own account.

---

## Testing Scenarios

### 1. Authentication Flow

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/` without login | Redirect to `/auth` |
| 2 | Enter invalid email format | Validation error shown |
| 3 | Enter weak password | Password requirements shown |
| 4 | Submit valid credentials | Redirect to home page |
| 5 | Click logout button | Return to auth page |

### 2. Navigation Testing

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tap "Home" in bottom nav | Navigate to `/` |
| 2 | Tap "Knowledge" | Navigate to `/knowledge` |
| 3 | Tap "Add" | Navigate to `/add` |
| 4 | Tap "Social" | Navigate to `/twitter` |
| 5 | Tap "Search" | Navigate to `/search` |
| 6 | Verify active indicator | Dot appears under active item |

### 3. Twitter/Social Section

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/twitter` | Feed loads with sample content |
| 2 | Tap compose button (FAB) | Compose modal/page opens |
| 3 | Enter tweet content | Character count updates |
| 4 | Like a tweet | Heart fills, count increases |
| 5 | Navigate to Search | Twitter search page loads |
| 6 | Navigate to Profile | User profile page loads |

### 4. Knowledge Hub Features

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/knowledge` | Knowledge hub loads |
| 2 | View Quick Stats section | Stats cards display |
| 3 | Test AI Chat feature | Chat interface responds |
| 4 | View Collections | Collections list appears |
| 5 | Test Search | Search filters work |

### 5. Content Management

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/add` | Add content form loads |
| 2 | Enter URL | URL is validated |
| 3 | Add tags | Tags appear as chips |
| 4 | Submit form | Content saved, redirect to home |
| 5 | View saved bookmark | Bookmark appears in feed |

---

## Responsive Testing

### Breakpoints

| Breakpoint | Width | Device Class |
|------------|-------|--------------|
| Mobile | < 640px | Phone |
| SM | ≥ 640px | Large phone |
| MD | ≥ 768px | Tablet |
| LG | ≥ 1024px | Small laptop |
| XL | ≥ 1280px | Desktop |
| 2XL | ≥ 1536px | Large desktop |

### Mobile Testing Checklist

- [ ] Bottom navigation is visible and functional
- [ ] Cards stack vertically
- [ ] Touch targets are ≥ 44px
- [ ] Safe area padding works (iPhone notch)
- [ ] Pull-to-refresh works where implemented
- [ ] Modals are full-screen on mobile
- [ ] Text is readable without zooming

### Desktop Testing Checklist

- [ ] Sidebar navigation works (Twitter section)
- [ ] Multi-column layouts display correctly
- [ ] Hover states are visible
- [ ] Keyboard navigation works
- [ ] Focus states are clear

---

## Dark Mode Testing

### Toggle Dark Mode

1. Use system preferences OR
2. Navigate to Settings
3. Toggle theme preference

### Verification

- [ ] All text remains readable
- [ ] Contrast ratios meet WCAG AA (4.5:1)
- [ ] Icons are visible
- [ ] Borders are distinguishable
- [ ] Shadows work appropriately
- [ ] Images don't clash with dark backgrounds

---

## Accessibility Testing

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element |
| `Shift+Tab` | Move to previous element |
| `Enter` | Activate button/link |
| `Space` | Toggle checkbox/switch |
| `Escape` | Close modal/dropdown |
| `Arrow keys` | Navigate within menus |

### Screen Reader Testing

1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate through the app
3. Verify:
   - [ ] All buttons have accessible names
   - [ ] Images have alt text
   - [ ] Form inputs have labels
   - [ ] Headings are properly structured
   - [ ] Live regions announce updates

### Color Contrast

Use browser DevTools or axe extension to verify:
- [ ] Text contrast ≥ 4.5:1 (normal text)
- [ ] Text contrast ≥ 3:1 (large text)
- [ ] UI component contrast ≥ 3:1

---

## Performance Testing

### Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### Target Scores

| Category | Target |
|----------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

### Performance Checklist

- [ ] Initial load < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] No layout shifts (CLS < 0.1)
- [ ] Images are lazy loaded
- [ ] Code splitting works

---

## Common Issues & Troubleshooting

### Issue: Blank Page After Login

**Solution:**
1. Clear browser cache
2. Check console for errors
3. Verify Supabase connection
4. Check environment variables

### Issue: Styles Not Loading

**Solution:**
1. Restart dev server
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Reinstall dependencies: `rm -rf node_modules && npm install`

### Issue: Authentication Errors

**Solution:**
1. Verify Supabase URL and anon key
2. Check if user exists in Supabase Auth
3. Clear local storage: `localStorage.clear()`

### Issue: Navigation Not Working

**Solution:**
1. Check React Router configuration
2. Verify route paths match
3. Check for console errors

### Issue: Components Not Rendering

**Solution:**
1. Check import paths (use `@/` alias)
2. Verify component exports
3. Check for TypeScript errors

---

## Test Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Preview production build
npm run preview
```

---

## Browser Compatibility

### Supported Browsers

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Features Requiring Polyfills

- CSS `env()` for safe areas
- CSS `gap` in flexbox (older Safari)
- Backdrop filter (partial support)

---

## Reporting Issues

When reporting bugs, include:

1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Screenshots/recordings**
5. **Browser and version**
6. **Device type (mobile/desktop)**
7. **Console errors**

---

**Last Updated:** January 2025
