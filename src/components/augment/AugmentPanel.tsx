import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  ExternalLink, 
  X, 
  ChevronRight,
  Lightbulb,
  Quote,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AugmentPanelProps {
  selectedText: string;
  isVisible: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
}

export function AugmentPanel({ selectedText, isVisible, onClose, position }: AugmentPanelProps) {
  const [relatedItems, setRelatedItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock related content based on selected text
  useEffect(() => {
    if (selectedText && isVisible) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setRelatedItems([
          {
            id: 1,
            title: 'Understanding Neural Networks',
            type: 'pdf',
            snippet: 'Deep learning architectures consist of multiple layers...',
            confidence: 0.92,
            source: 'research-paper.pdf',
            matchType: 'concept'
          },
          {
            id: 2,
            title: 'Machine Learning Fundamentals',
            type: 'url',
            snippet: 'The foundation of AI systems relies on pattern recognition...',
            confidence: 0.87,
            source: 'ml-guide.com',
            matchType: 'definition'
          },
          {
            id: 3,
            title: 'AI Ethics Discussion',
            type: 'youtube',
            snippet: 'Responsible AI development requires careful consideration...',
            confidence: 0.76,
            source: 'AI Ethics Talk - YouTube',
            matchType: 'related'
          },
          {
            id: 4,
            title: 'Personal Notes on AI',
            type: 'note',
            snippet: 'My thoughts on the implications of artificial intelligence...',
            confidence: 0.71,
            source: 'My Notes',
            matchType: 'personal'
          }
        ]);
        setIsLoading(false);
      }, 800);
    }
  }, [selectedText, isVisible]);

  const typeIcons = {
    url: '🌐',
    pdf: '📄',
    youtube: '🎥',
    note: '📝'
  };

  const matchTypeColors = {
    concept: 'bg-blue-100 text-blue-700',
    definition: 'bg-green-100 text-green-700', 
    related: 'bg-purple-100 text-purple-700',
    personal: 'bg-orange-100 text-orange-700'
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 w-80 max-h-96 shadow-floating"
      style={{
        top: position?.y || '50%',
        left: position?.x || '50%',
        transform: position ? 'translate(-50%, -120%)' : 'translate(-50%, -50%)'
      }}
    >
      <Card className="paper-card-floating border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-sakura rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <CardTitle className="text-sm font-medium text-ink">
                Knowledge Context
              </CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
              <X className="w-3 h-3" />
            </Button>
          </div>
          
          {selectedText && (
            <div className="bg-muted/50 p-2 rounded text-xs">
              <div className="flex items-center gap-1 text-muted-foreground mb-1">
                <Quote className="w-3 h-3" />
                <span>Selected text:</span>
              </div>
              <p className="text-foreground font-medium line-clamp-2">
                "{selectedText}"
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-3 pt-0">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {relatedItems.length > 0 ? (
                  relatedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm">{typeIcons[item.type]}</span>
                          <h4 className="font-medium text-xs truncate text-ink">
                            {item.title}
                          </h4>
                          <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {item.snippet}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          className={cn(
                            "text-xs px-2 py-0.5", 
                            matchTypeColors[item.matchType]
                          )}
                        >
                          {item.matchType}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span>{Math.round(item.confidence * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No related content found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
          
          {!isLoading && relatedItems.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <Button variant="ghost" size="sm" className="w-full text-xs h-7">
                <Lightbulb className="w-3 h-3 mr-1" />
                View All Connections ({relatedItems.length})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}