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
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card 
          className={`paper-card hover:shadow-floating transition-smooth group cursor-pointer select-none ${
            longPressActive ? "scale-95 shadow-paper" : ""
          }`}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          onTouchMove={handleLongPressMove}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseMove={handleLongPressMove}
          onMouseLeave={handleLongPressEnd}
        >
        <div className="p-3">
        {/* Bookmark Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-9 h-9 bg-gradient-sakura rounded-full flex items-center justify-center text-base seal-stamp"
            >
              {tweet.author.avatar}
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-ink text-sm">{tweet.author.name}</span>
                {tweet.author.verified && (
                  <div className="w-4 h-4 bg-seal rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white">✓</span>
                  </div>
                )}
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs">{tweet.timestamp}</span>
              </div>
              <span className="text-xs text-bamboo">{tweet.author.handle}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-smooth">
            <MoreHorizontal className="w-3.5 h-3.5" />
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
              variant="secondary" 
              className="mb-4 hover:bg-gradient-sakura transition-smooth cursor-pointer thread-swipe"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              {tweet.threadCount} bookmark collection
            </Badge>
          </Link>
        )}

        {/* Images */}
        {tweet.images.length > 0 && (
          <div className={`mb-4 rounded-lg overflow-hidden shadow-paper ${
            tweet.images.length === 1 ? "max-h-96" : 
            tweet.images.length === 2 ? "grid grid-cols-2 gap-2 max-h-64" :
            "grid grid-cols-2 gap-2 max-h-64"
          }`}>
            {tweet.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tweet image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-smooth cursor-pointer"
                onClick={() => setShowPreview(true)}
              />
            ))}
          </div>
        )}
        {/* URL Preview */}
        {tweet.url && (
          <div className="mb-4 p-4 bg-washi rounded-lg border border-border washi-texture hover:shadow-paper transition-smooth cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-ink rounded-lg flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-bamboo font-medium">{tweet.domain}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-seal transition-smooth" />
                </div>
                <p className="text-sm text-foreground font-medium line-clamp-2">
                  {tweet.content.split('.')[0]}...
                </p>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {tweet.url}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Bookmark Preview */}
        {showPreview && (
          <div className="mb-4 p-4 bg-washi rounded-lg border border-border washi-texture">
            <div className="flex items-center gap-2 mb-2">
              <Bookmark className="w-4 h-4 text-bamboo" />
              <span className="text-sm text-bamboo font-medium">Bookmark Preview</span>
            </div>
            <p className="text-sm text-muted-foreground">
              "{tweet.content.substring(0, 100)}..." • saved by {tweet.author.name}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-1 pt-2 border-t border-border/50">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBookmark}
              className={`flex flex-col items-center gap-0.5 py-2 w-full transition-bounce h-auto ${
                isBookmarked ? "text-gold" : "text-muted-foreground hover:text-gold"
              }`}
            >
              <CustomIcons.Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              <span className="text-[10px]">Save</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-0.5 py-2 w-full text-muted-foreground hover:text-bamboo h-auto">
              <CustomIcons.Share className="w-4 h-4" />
              <span className="text-[10px]">Share</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-0.5 py-2 w-full text-muted-foreground hover:text-seal h-auto">
              <CustomIcons.ActionBolt className="w-4 h-4" />
              <span className="text-[10px]">Action</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-0.5 py-2 w-full text-muted-foreground hover:text-bamboo h-auto">
              <CustomIcons.BrainAI className="w-4 h-4" />
              <span className="text-[10px]">AI</span>
            </Button>
          </motion.div>
        </div>

        {/* Source Badge */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Source:</span>
            <div className="flex items-center gap-1">
              {tweet.source === 'whatsapp' ? (
                <MessageSquare className="w-3 h-3 text-green-500" />
              ) : (
                <Twitter className="w-3 h-3 text-blue-500" />
              )}
              <span className="text-[10px] text-muted-foreground capitalize">
                {tweet.source || 'twitter'}
              </span>
            </div>
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