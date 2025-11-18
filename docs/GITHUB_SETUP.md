# GitHub Integration & Deployment Guide

## 🔗 Connect to GitHub

### Step 1: Connect Your Account
1. Click the **GitHub** button in the top-right corner of Lovable
2. Select **Connect to GitHub**
3. Authorize the Lovable GitHub App on GitHub
4. Choose your GitHub account/organization

### Step 2: Create Repository
1. In Lovable, click **Create Repository**
2. Your project code will be automatically pushed to a new GitHub repo
3. All future changes in Lovable will sync automatically to GitHub

### Step 3: Two-Way Sync
- **Lovable → GitHub**: Changes in Lovable auto-push to GitHub
- **GitHub → Lovable**: Commits to GitHub auto-sync to Lovable
- No manual pull/push required!

---

## 🧪 Testing Setup

### Installed Dependencies
- ✅ Vitest - Fast unit test framework
- ✅ @testing-library/react - React component testing
- ✅ @testing-library/jest-dom - DOM matchers
- ✅ @vitest/ui - Test UI dashboard
- ✅ jsdom - Browser environment simulation

### Run Tests Locally
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Open test UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test File Structure
```
src/
├── __tests__/
│   ├── setup.ts              # Test configuration
│   ├── hooks/
│   │   ├── use-auth.test.tsx
│   │   └── use-bookmarks.test.ts
│   └── components/
│       └── ...
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
Located at `.github/workflows/ci.yml`

### Pipeline Stages

#### 1. **Test** 
- Runs all unit tests
- Uploads coverage to Codecov
- Fails if tests don't pass

#### 2. **Lint**
- Checks code style with ESLint
- Ensures consistent formatting

#### 3. **Type Check**
- Validates TypeScript types
- Catches type errors early

#### 4. **Build**
- Compiles production bundle
- Uploads build artifacts
- Only runs if tests/lint/typecheck pass

#### 5. **Security Scan**
- Runs npm audit for vulnerabilities
- Scans for exposed secrets with TruffleHog

### Required GitHub Secrets
Add these in your repo settings:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**To add secrets:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret with the exact name above

---

## 📊 Analytics Tracking

### Implemented Features
- ✅ User authentication tracking
- ✅ Page view analytics
- ✅ Bookmark creation/viewing
- ✅ Search analytics
- ✅ Error tracking
- ✅ Performance metrics

### Usage in Code
```typescript
import { analytics } from '@/lib/analytics';

// Track custom events
analytics.track('custom_event', { key: 'value' });

// Track page views
analytics.page('/custom-page');

// Track errors
analytics.errorOccurred(error, 'context');
```

### Analytics Events Logged
- `user_signed_in` - User authentication
- `user_signed_out` - User logout
- `page_view` - Page navigation
- `bookmark_created` - Content saved
- `bookmark_viewed` - Content accessed
- `search_performed` - Search usage
- `error_occurred` - Error tracking

---

## 🛡️ Error Boundaries

### Enhanced Error Handling
- ✅ Global error boundary in App.tsx
- ✅ Automatic error tracking to analytics
- ✅ User-friendly error messages
- ✅ Recovery options (retry/go home)
- ✅ Development mode stack traces

### Error Boundary Usage
```typescript
import { ErrorBoundary } from '@/components/ui/error-boundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

---

## 🔄 Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests in watch mode
npm run test:watch

# Type check
npx tsc --noEmit

# Lint code
npm run lint
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
```

### Pull Request Checklist
- [ ] Tests pass locally
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Code reviewed
- [ ] CI pipeline passes
- [ ] Changes documented

---

## 📦 Deployment Options

### Option 1: Lovable Hosting (Recommended)
1. Click **Publish** in Lovable (top-right)
2. Click **Update** to deploy frontend changes
3. Backend changes (edge functions, DB) deploy automatically

### Option 2: Self-Hosting
After connecting to GitHub, you can deploy anywhere:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

**Custom Server:**
```bash
npm run build
# Deploy the 'dist' folder to your server
```

---

## 🔐 Environment Variables

### Required for Production
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Setting Environment Variables

**GitHub Actions (CI/CD):**
- Repository Settings → Secrets and variables → Actions

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Environment Variables

---

## 📚 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [GitHub Integration Guide](https://docs.lovable.dev/features/github)
- [Deployment Guide](https://docs.lovable.dev/deployment)
- [Troubleshooting](https://docs.lovable.dev/tips-tricks/troubleshooting)

---

## 🎯 Next Steps

1. ✅ **Connect to GitHub** (see Step 1 above)
2. ✅ **Add GitHub Secrets** (Supabase credentials)
3. ✅ **Create First PR** (test CI/CD pipeline)
4. ✅ **Monitor Analytics** (track user engagement)
5. ✅ **Deploy to Production** (click Publish in Lovable)

**Questions?** Join the [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
