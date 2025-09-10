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
      {/* Hero Section */}
      <div className="text-center py-6 px-4 bg-gradient-to-br from-sakura/10 via-gold/5 to-transparent rounded-2xl border border-sakura/20">
        <div className="w-16 h-16 bg-gradient-sakura rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-ink mb-2">AI Discovery Engine</h2>
        <p className="text-muted-foreground max-w-md mx-auto">Let our AI uncover hidden patterns and suggest the most relevant content based on your interests and behavior</p>
      </div>

      {/* AI-Powered Recommendations */}
      <Card className="paper-card p-6 border-2 border-sakura/10 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-sakura rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">Personalized for You</h3>
            <p className="text-sm text-muted-foreground">AI-curated content matching your learning patterns</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {recommendations.map((item) => (
            <div key={item.id} className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-washi to-white hover:from-sakura/10 hover:to-gold/5 transition-all duration-200 border border-transparent hover:border-sakura/20 hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sakura/20 to-gold/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-ink group-hover:text-sakura transition-colors">{item.title}</h4>
                    {item.trending && (
                      <Badge variant="secondary" className="text-xs bg-seal/20 text-seal border-seal/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                    {item.collaborative && (
                      <Badge variant="secondary" className="text-xs bg-bamboo/20 text-bamboo border-bamboo/30">
                        <Users className="w-3 h-3 mr-1" />
                        Team
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gradient-sakura rounded-full"></div>
                      <span className="text-sm font-medium text-sakura">
                        {Math.round(item.relevanceScore * 100)}% relevance
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs hover:bg-sakura/10 hover:border-sakura/30 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-sakura" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Content Clusters */}
      <Card className="paper-card p-6 border border-gold/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">Knowledge Networks</h3>
            <p className="text-sm text-muted-foreground">Explore interconnected topics and themes</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clusters.map((cluster) => (
            <Card key={cluster.id} className={`group p-5 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-gold/30 ${cluster.color} bg-gradient-to-br from-white to-washi`}>
              <div className="space-y-3">
                <h4 className="font-bold text-lg group-hover:text-gold transition-colors">{cluster.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{cluster.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-gold rounded-full"></div>
                    <span className="text-sm font-medium text-gold">24 resources</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Contextual Suggestions */}
      <Card className="paper-card p-6 border border-bamboo/20 bg-gradient-to-br from-bamboo/5 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-bamboo rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">Smart Suggestions</h3>
            <p className="text-sm text-muted-foreground">Based on your recent activity and interests</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {contextualSuggestions.map((item) => (
            <div key={item.id} className="group flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white transition-all duration-200 border border-bamboo/10 hover:border-bamboo/30 hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-bamboo/20 rounded-lg flex items-center justify-center group-hover:bg-bamboo/30 transition-colors">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-ink group-hover:text-bamboo transition-colors">{item.title}</span>
                  <div className="flex gap-1 mt-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-bamboo/10 text-bamboo border-bamboo/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-bamboo" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}