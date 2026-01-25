import { Card } from "@/components/ui/card";
import { TweetCard } from "./TweetCard";
import { TweetComposer } from "./TweetComposer";
import { PullToRefresh } from "@/components/ui/pulltorefresh";
import { toast } from "@/hooks/use-toast";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function TwitterFeed() {
  const { bookmarks, loading, error, refetch } = useBookmarks();

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Feed refreshed! ↓",
        description: "Latest bookmarks loaded successfully",
      });
    } catch (err) {
      toast({
        title: "Refresh failed",
        description: "Could not load latest bookmarks",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex-1 overflow-hidden pb-20">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 z-10 safe-area-inset-top">
            <h2 className="text-xl font-semibold text-ink brush-stroke">Collections</h2>
            <p className="text-sm text-muted-foreground">Your curated knowledge</p>
          </div>

          {/* Error State */}
          <div className="p-4">
            <Card className="paper-card p-8 text-center">
              <p className="text-muted-foreground mb-4">Failed to load your bookmarks</p>
              <div className="w-16 h-16 mx-auto bg-gradient-sakura rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <button 
                onClick={handleRefresh}
                className="text-seal hover:text-bamboo transition-smooth"
              >
                Try again
              </button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="h-full overflow-y-auto scrollbar-hide pb-24">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border/50 px-4 py-3 z-10"
          >
            <h2 className="text-lg font-semibold text-foreground">Collections</h2>
            <p className="text-xs text-muted-foreground">Your curated knowledge</p>
          </motion.div>

          {/* Compose Bookmark Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4"
          >
            <Card className="bg-card border border-border/50 rounded-xl p-4 shadow-sm">
              <TweetComposer compact />
            </Card>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="p-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card border border-border/50 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1.5" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full mb-3" />
                  <div className="flex gap-2 pt-3 border-t border-border/30">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Bookmarks */}
          {!loading && bookmarks.length > 0 && (
            <div className="px-3 pb-3 space-y-3">
              {bookmarks.map((bookmark, index) => (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <TweetCard tweet={bookmark} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && bookmarks.length === 0 && (
            <div className="p-4">
              <Card className="bg-card border border-border/50 rounded-xl p-8 text-center">
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-foreground font-medium mb-1">No bookmarks yet</p>
                <p className="text-sm text-muted-foreground">
                  Start saving content to build your knowledge collection
                </p>
              </Card>
            </div>
          )}

          {/* Load More - Only show when we have bookmarks */}
          {!loading && bookmarks.length > 0 && (
            <div className="p-4">
              <Card className="bg-card border border-border/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">✓</span>
                </div>
                <p className="text-muted-foreground text-sm">You've caught up with all your bookmarks!</p>
              </Card>
            </div>
          )}
        </div>
      </PullToRefresh>
    </div>
  );
}