import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PullToRefresh } from "@/components/ui/pulltorefresh";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { OfflineIndicator } from "@/components/ui/offline-indicator";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import Index from "./pages/Index";
import TwitterHome from "./pages/TwitterHome";
import TwitterExplore from "./pages/TwitterExplore";
import TwitterNotifications from "./pages/TwitterNotifications";
import TwitterMessages from "./pages/TwitterMessages";
import TwitterProfile from "./pages/TwitterProfile";
import TwitterSearch from "./pages/TwitterSearch";
import UserSettings from "./pages/UserSettings";
import ThreadView from "./pages/ThreadView";
import TweetCompose from "./pages/TweetCompose";
import NotFound from "./pages/NotFound";
import KnowledgeHub from "./pages/KnowledgeHub";
import Add from "./pages/Add";
import Document from "./pages/Document";
import Review from "./pages/Review";

import Search from "./pages/Search";

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
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/knowledge" element={<KnowledgeHub />} />
      <Route path="/add" element={<Add />} />
      
      <Route path="/search" element={<Search />} />
      <Route path="/document/:documentId" element={<Document />} />
      <Route path="/review" element={<Review />} />
      <Route path="/twitter" element={<TwitterHome />} />
      <Route path="/twitter/explore" element={<TwitterExplore />} />
      <Route path="/twitter/notifications" element={<TwitterNotifications />} />
      <Route path="/twitter/search" element={<TwitterSearch />} />
      <Route path="/twitter/settings" element={<UserSettings />} />
      <Route path="/twitter/thread/:threadId" element={<ThreadView />} />
      <Route path="/twitter/compose" element={<TweetCompose />} />
      <Route path="/twitter/messages" element={<TwitterMessages />} />
      <Route path="/twitter/profile" element={<TwitterProfile />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <>
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
          <AppRoutes />
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
