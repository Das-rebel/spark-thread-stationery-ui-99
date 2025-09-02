import { Card } from "@/components/ui/card";
import { TweetCard } from "./TweetCard";
import { TweetComposer } from "./TweetComposer";
import { PullToRefresh } from "@/components/ui/pulltorefresh";
import { toast } from "@/hooks/use-toast";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="flex-1 overflow-hidden pb-20">
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 z-10 safe-area-inset-top">
            <h2 className="text-xl font-semibold text-ink brush-stroke">Collections</h2>
            <p className="text-sm text-muted-foreground">Your curated knowledge</p>
          </div>

          {/* Compose Bookmark Section */}
          <div className="p-4">
            <Card className="paper-card p-4">
              <TweetComposer compact />
            </Card>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="paper-card p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-12 w-full" />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Bookmarks */}
          {!loading && bookmarks.length > 0 && (
            <div className="p-4 space-y-4">
              {bookmarks.map((bookmark, index) => (
                <div
                  key={bookmark.id}
                  className="animate-fade-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TweetCard tweet={bookmark} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && bookmarks.length === 0 && (
            <div className="p-4">
              <Card className="paper-card p-8 text-center">
                <p className="text-muted-foreground mb-4">No bookmarks found</p>
                <div className="w-16 h-16 mx-auto bg-gradient-sakura rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Start saving content to build your knowledge collection
                </p>
              </Card>
            </div>
          )}

          {/* Load More - Only show when we have bookmarks */}
          {!loading && bookmarks.length > 0 && (
            <div className="p-4">
              <Card className="paper-card p-8 text-center">
                <p className="text-muted-foreground mb-4">You've caught up with all your bookmarks!</p>
                <div className="w-16 h-16 mx-auto bg-gradient-sakura rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </PullToRefresh>
    </div>
  );
}