import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Network, MessageSquare, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function KnowledgeHubFAB() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
      {/* Quick Actions - shown when expanded */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-fade-slide-up">
          <Link to="/knowledge">
            <Button 
              size="sm" 
              className="bg-gradient-bamboo text-white shadow-floating hover:shadow-deep w-12 h-12 rounded-full"
              onClick={() => setIsExpanded(false)}
            >
              <Network className="w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            size="sm" 
            className="bg-gradient-seal text-white shadow-floating hover:shadow-deep w-12 h-12 rounded-full"
            onClick={() => setIsExpanded(false)}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
          
          <Button 
            size="sm" 
            className="bg-gradient-gold text-white shadow-floating hover:shadow-deep w-12 h-12 rounded-full"
            onClick={() => setIsExpanded(false)}
          >
            <Sparkles className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          bg-gradient-sakura text-white shadow-floating hover:shadow-deep 
          w-16 h-16 rounded-full transition-all duration-300 
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}
      >
        <Brain className="w-6 h-6" />
      </Button>
    </div>
  );
}