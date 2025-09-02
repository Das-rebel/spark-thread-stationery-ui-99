import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock, TrendingUp, Users, BookOpen, ArrowRight } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'document' | 'note' | 'task';
  relevanceScore: number;
  tags: string[];
  lastAccessed?: Date;
  trending?: boolean;
  collaborative?: boolean;
}

interface ContentCluster {
  id: string;
  name: string;
  description: string;
  items: ContentItem[];
  color: string;
}

export function SmartDiscovery() {
  const [recommendations, setRecommendations] = useState<ContentItem[]>([]);
  const [clusters, setClusters] = useState<ContentCluster[]>([]);
  const [contextualSuggestions, setContextualSuggestions] = useState<ContentItem[]>([]);

  useEffect(() => {
    // Mock smart recommendations based on user behavior
    setRecommendations([
      {
        id: '1',
        title: 'Advanced React Patterns You Should Know',
        type: 'article',
        relevanceScore: 0.95,
        tags: ['react', 'patterns', 'advanced'],
        trending: true
      },
      {
        id: '2', 
        title: 'API Design Best Practices',
        type: 'document',
        relevanceScore: 0.89,
        tags: ['api', 'design', 'backend'],
        collaborative: true
      },
      {
        id: '3',
        title: 'Performance Optimization Notes',
        type: 'note',
        relevanceScore: 0.87,
        tags: ['performance', 'optimization'],
        lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]);

    // Mock content clusters
    setClusters([
      {
        id: 'frontend',
        name: 'Frontend Development',
        description: 'React, TypeScript, and UI/UX resources',
        color: 'bg-gradient-bamboo/10 text-bamboo',
        items: []
      },
      {
        id: 'backend',
        name: 'Backend & APIs',
        description: 'Server architecture and API design',
        color: 'bg-gradient-sakura/10 text-seal',
        items: []
      },
      {
        id: 'productivity',
        name: 'Productivity & Tools',
        description: 'Workflows and development tools',
        color: 'bg-gradient-gold/10 text-gold',
        items: []
      }
    ]);

    // Mock contextual suggestions
    setContextualSuggestions([
      {
        id: 'ctx1',
        title: 'Related: Component Testing Strategies',
        type: 'article',
        relevanceScore: 0.82,
        tags: ['testing', 'components']
      },
      {
        id: 'ctx2',
        title: 'Follow-up: TypeScript Error Handling',
        type: 'note',
        relevanceScore: 0.78,
        tags: ['typescript', 'errors']
      }
    ]);
  }, []);

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'document': return <BookOpen className="w-4 h-4" />;
      case 'note': return <BookOpen className="w-4 h-4" />;
      case 'task': return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Recommendations */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-semibold text-ink">Smart Recommendations</h3>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-washi hover:bg-white transition-colors">
              <div className="flex items-center gap-3">
                {getTypeIcon(item.type)}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-ink">{item.title}</h4>
                    {item.trending && (
                      <Badge variant="secondary" className="text-xs bg-seal/10 text-seal">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {item.collaborative && (
                      <Badge variant="secondary" className="text-xs bg-bamboo/10 text-bamboo">
                        <Users className="w-3 h-3 mr-1" />
                        Team
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {Math.round(item.relevanceScore * 100)}% match
                    </span>
                    <div className="flex gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Content Clusters */}
      <Card className="paper-card p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">Knowledge Clusters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clusters.map((cluster) => (
            <Card key={cluster.id} className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${cluster.color}`}>
              <h4 className="font-semibold mb-2">{cluster.name}</h4>
              <p className="text-sm opacity-80 mb-3">{cluster.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-60">12 items</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Contextual Suggestions */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-bamboo" />
          <h3 className="text-lg font-semibold text-ink">Contextual Suggestions</h3>
        </div>
        
        <div className="space-y-2">
          {contextualSuggestions.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 rounded bg-washi hover:bg-white transition-colors">
              <div className="flex items-center gap-2">
                {getTypeIcon(item.type)}
                <span className="text-sm text-ink">{item.title}</span>
                <div className="flex gap-1 ml-2">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}