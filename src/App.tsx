import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PullToRefresh } from "@/components/ui/pulltorefresh";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { OfflineIndicator } from "@/components/ui/offline-indicator";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { PageLoadingFallback } from "@/components/ui/page-loading-fallback";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { AuthProvider, RequireAuth } from "@/hooks/use-auth";

// Eager load critical routes
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Lazy load other routes for code splitting
const KnowledgeHub = lazy(() => import("./pages/KnowledgeHub"));
const Add = lazy(() => import("./pages/Add"));
const Search = lazy(() => import("./pages/Search"));
const Document = lazy(() => import("./pages/Document"));
const Review = lazy(() => import("./pages/Review"));
const TwitterHome = lazy(() => import("./pages/TwitterHome"));
const TwitterExplore = lazy(() => import("./pages/TwitterExplore"));
const TwitterNotifications = lazy(() => import("./pages/TwitterNotifications"));
const TwitterMessages = lazy(() => import("./pages/TwitterMessages"));
const TwitterProfile = lazy(() => import("./pages/TwitterProfile"));
const TwitterSearch = lazy(() => import("./pages/TwitterSearch"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const ThreadView = lazy(() => import("./pages/ThreadView"));
const TweetCompose = lazy(() => import("./pages/TweetCompose"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

// Component that needs to be inside Router context
function AppRoutes() {
  useKeyboardNavigation();
  
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
        <Route path="/knowledge" element={<RequireAuth><KnowledgeHub /></RequireAuth>} />
        <Route path="/add" element={<RequireAuth><Add /></RequireAuth>} />
        <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
        <Route path="/document/:documentId" element={<RequireAuth><Document /></RequireAuth>} />
        <Route path="/review" element={<RequireAuth><Review /></RequireAuth>} />
        <Route path="/twitter" element={<RequireAuth><TwitterHome /></RequireAuth>} />
        <Route path="/twitter/explore" element={<RequireAuth><TwitterExplore /></RequireAuth>} />
        <Route path="/twitter/notifications" element={<RequireAuth><TwitterNotifications /></RequireAuth>} />
        <Route path="/twitter/search" element={<RequireAuth><TwitterSearch /></RequireAuth>} />
        <Route path="/twitter/settings" element={<RequireAuth><UserSettings /></RequireAuth>} />
        <Route path="/twitter/thread/:threadId" element={<RequireAuth><ThreadView /></RequireAuth>} />
        <Route path="/twitter/compose" element={<RequireAuth><TweetCompose /></RequireAuth>} />
        <Route path="/twitter/messages" element={<RequireAuth><TwitterMessages /></RequireAuth>} />
        <Route path="/twitter/profile" element={<RequireAuth><TwitterProfile /></RequireAuth>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function AppContent() {
  return (
    <>
      <OnboardingTour />
      <OfflineIndicator />
      <PullToRefresh
        onRefresh={async () => {
          try {
            // Refresh the current page content
            window.location.reload();
          } catch (error) {
            console.error('Error during refresh:', error);
          }
        }}
      >
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </PullToRefresh>
    </>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
