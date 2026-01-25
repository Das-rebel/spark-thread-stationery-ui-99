import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, ExternalLink, Bookmark, Twitter, MessageSquare, MessageCircle } from "lucide-react";
import { CustomIcons } from "@/components/icons";
import { Link } from "react-router-dom";
import { BookmarkPeep } from "./BookmarkPeep";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Tweet {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  stats: {
    likes: number;
    retweets: number;
    replies: number;
  };
  hasThread: boolean;
  threadCount: number;
  images: string[];
  url?: string;
  domain?: string;
  source?: 'twitter' | 'whatsapp' | 'web';
}

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showPeep, setShowPeep] = useState(false);
  const [longPressActive, setLongPressActive] = useState(false);
  
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const touchStartPos = useRef({ x: 0, y: 0 });

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from saved" : "Saved forever! 🔖",
      description: isBookmarked ? "Bookmark removed from your collection" : "Added to your knowledge vault",
    });
  };

  // Long press handlers
  const handleLongPressStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    touchStartPos.current = { x: clientX, y: clientY };
    setLongPressActive(true);
    
    longPressTimer.current = setTimeout(() => {
      setShowPeep(true);
      setLongPressActive(false);
    }, 500); // 500ms for long press
  }, []);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setLongPressActive(false);
  }, []);

  const handleLongPressMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!longPressTimer.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = Math.abs(clientX - touchStartPos.current.x);
    const deltaY = Math.abs(clientY - touchStartPos.current.y);
    
    // Cancel long press if user moves too much
    if (deltaX > 10 || deltaY > 10) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      setLongPressActive(false);
    }
  }, []);

  return (
    <>
      <motion.div
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card 
          className={`bg-card border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer select-none ${
            longPressActive ? "scale-[0.98] shadow-sm" : ""
          }`}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          onTouchMove={handleLongPressMove}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseMove={handleLongPressMove}
          onMouseLeave={handleLongPressEnd}
        >
        <div className="p-4">
        {/* Bookmark Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
              {tweet.author.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground text-sm">{tweet.author.name}</span>
                {tweet.author.verified && (
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-primary-foreground">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">{tweet.author.handle}</span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs">{tweet.timestamp}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Tweet Content */}
        <div className="mb-3">
          <p className="text-foreground text-sm leading-relaxed">{tweet.content}</p>
        </div>

        {/* Collection Badge */}
        {tweet.hasThread && (
          <Link to={`/twitter/thread/${tweet.id}`}>
            <Badge 
              variant="info" 
              className="mb-3 cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              {tweet.threadCount} in collection
            </Badge>
          </Link>
        )}

        {/* Images */}
        {tweet.images.length > 0 && (
          <div className={`mb-3 rounded-lg overflow-hidden border border-border/50 ${
            tweet.images.length === 1 ? "max-h-80" : 
            tweet.images.length === 2 ? "grid grid-cols-2 gap-0.5 max-h-56" :
            "grid grid-cols-2 gap-0.5 max-h-56"
          }`}>
            {tweet.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tweet image ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                onClick={() => setShowPreview(true)}
              />
            ))}
          </div>
        )}
        {/* URL Preview */}
        {tweet.url && (
          <div className="mb-3 p-3 bg-muted/50 rounded-lg border border-border/50 hover:bg-muted/70 transition-colors cursor-pointer group/url">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-muted-foreground font-medium">{tweet.domain}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover/url:text-primary transition-colors" />
                </div>
                <p className="text-sm text-foreground font-medium line-clamp-2">
                  {tweet.content.split('.')[0]}...
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {tweet.url}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Bookmark Preview */}
        {showPreview && (
          <div className="mb-3 p-3 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Bookmark className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Preview</span>
            </div>
            <p className="text-sm text-muted-foreground">
              "{tweet.content.substring(0, 100)}..." • saved by {tweet.author.name}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBookmark}
              className={`h-8 px-3 rounded-full transition-colors ${
                isBookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              <CustomIcons.Bookmark className={`w-4 h-4 mr-1.5 ${isBookmarked ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">Save</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
              <CustomIcons.Share className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium">Share</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
              <CustomIcons.ActionBolt className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
              <CustomIcons.BrainAI className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Source Badge */}
        <div className="flex items-center pt-2">
          <div className="flex items-center gap-1.5">
            {tweet.source === 'whatsapp' ? (
              <MessageSquare className="w-3 h-3 text-muted-foreground" />
            ) : (
              <Twitter className="w-3 h-3 text-muted-foreground" />
            )}
            <span className="text-[10px] text-muted-foreground capitalize">
              {tweet.source || 'twitter'}
            </span>
          </div>
        </div>
      </div>
    </Card>
      </motion.div>

    {/* Bookmark Peep Modal */}
    <BookmarkPeep 
      tweet={tweet}
      isOpen={showPeep}
      onClose={() => setShowPeep(false)}
    />
    </>
  );
}