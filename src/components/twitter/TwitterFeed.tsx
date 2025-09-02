import { Card } from "@/components/ui/card";
import { TweetCard } from "./TweetCard";
import { TweetComposer } from "./TweetComposer";
import { PullToRefresh } from "@/components/ui/pulltorefresh";
import { useBookmarks } from "@/hooks/useBookmarks";
import { toast } from "@/hooks/use-toast";

export function TwitterFeed() {
  const { bookmarks, loading, error, refetch, addMockBookmark } = useBookmarks();

  const handleRefresh = async () => {
    await refetch();
    addMockBookmark();
    toast({
      title: "Feed refreshed! ↓",
      description: "New bookmarks loaded successfully",
    });
  };

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

          {/* Bookmarks */}
          <div className="p-4 space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="paper-card p-4">
                    <div className="animate-pulse">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-muted rounded w-1/3"></div>
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="paper-card p-8 text-center">
                <p className="text-destructive mb-4">Failed to load bookmarks</p>
                <button 
                  onClick={refetch}
                  className="text-primary hover:underline"
                >
                  Try again
                </button>
              </Card>
            ) : bookmarks.length === 0 ? (
              <Card className="paper-card p-8 text-center">
                <p className="text-muted-foreground mb-4">No bookmarks found</p>
                <div className="w-16 h-16 mx-auto bg-gradient-sakura rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
              </Card>
            ) : (
              bookmarks.map((bookmark, index) => (
                <div
                  key={bookmark.id}
                  className="animate-fade-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TweetCard tweet={bookmark} />
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          <div className="p-4">
            <Card className="paper-card p-8 text-center">
              <p className="text-muted-foreground mb-4">You've caught up with all your bookmarks!</p>
              <div className="w-16 h-16 mx-auto bg-gradient-sakura rounded-full flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </Card>
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
}