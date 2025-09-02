import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Sparkles, TrendingUp, Clock, Star, Brain, Zap, Eye, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CustomIcons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url?: string;
  type: 'document' | 'note' | 'bookmark' | 'concept' | 'video';
  similarity: number;
  relevanceScore: number;
  lastAccessed: string;
  category: string;
  tags: string[];
  connections: string[];
  aiInsights?: string;
  visualPreview?: string;
}

interface SearchSuggestion {
  query: string;
  type: 'similar' | 'related' | 'trending';
  confidence: number;
}

export function EnhancedSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchMode, setSearchMode] = useState<'semantic' | 'visual' | 'timeline'>('semantic');
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [isAIMode, setIsAIMode] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock data for demonstration
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Building a Second Brain: The Definitive Guide',
      content: 'Learn how to create a comprehensive knowledge management system using the CODE method: Capture, Organize, Distill, and Express your ideas effectively.',
      url: 'https://buildingasecondbrain.com',
      type: 'document',
      similarity: 0.95,
      relevanceScore: 0.92,
      lastAccessed: '2 hours ago',
      category: 'Productivity',
      tags: ['knowledge-management', 'productivity', 'note-taking', 'creativity'],
      connections: ['zettelkasten-method', 'obsidian-workflow', 'creative-process'],
      aiInsights: 'This content aligns with your interest in systematic knowledge capture and creative workflows.',
      visualPreview: '/api/preview/second-brain'
    },
    {
      id: '2',
      title: 'The Zettelkasten Method: Connected Thinking',
      content: 'Discover how the slip-box system can revolutionize your research and writing by creating meaningful connections between ideas.',
      type: 'note',
      similarity: 0.89,
      relevanceScore: 0.87,
      lastAccessed: '1 day ago',
      category: 'Research',
      tags: ['zettelkasten', 'research', 'writing', 'connections'],
      connections: ['second-brain', 'networked-thought', 'research-methods'],
      aiInsights: 'High synergy with your existing notes on knowledge systems and creative processes.',
      visualPreview: '/api/preview/zettelkasten'
    },
    {
      id: '3',
      title: 'Visual Knowledge Mapping with Obsidian',
      content: 'Explore advanced techniques for creating visual knowledge maps and leveraging graph view for discovery.',
      type: 'video',
      similarity: 0.84,
      relevanceScore: 0.81,
      lastAccessed: '3 days ago',
      category: 'Tools',
      tags: ['obsidian', 'visualization', 'knowledge-graph', 'tools'],
      connections: ['visual-thinking', 'mind-mapping', 'knowledge-graph'],
      aiInsights: 'Complements your visual learning style and tool preferences.',
      visualPreview: '/api/preview/obsidian-graph'
    }
  ];

  const mockSuggestions: SearchSuggestion[] = [
    { query: 'knowledge management systems', type: 'similar', confidence: 0.92 },
    { query: 'creative workflow optimization', type: 'related', confidence: 0.87 },
    { query: 'digital note-taking methods', type: 'trending', confidence: 0.83 }
  ];

  const handleSearch = async (searchQuery?: string) => {
    const queryToSearch = searchQuery || query;
    if (!queryToSearch.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI-powered search
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setResults(mockResults);
    setSuggestions(mockSuggestions);
    setIsSearching(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Productivity': 'bg-gradient-sakura text-white',
      'Research': 'bg-gradient-bamboo text-white',
      'Tools': 'bg-gradient-gold text-white',
      'Education': 'bg-gradient-ink text-white'
    };
    return colors[category as keyof typeof colors] || 'bg-gradient-seal';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'document': CustomIcons.Bookmark,
      'note': CustomIcons.BrainAI,
      'bookmark': CustomIcons.SearchEnhanced,
      'video': CustomIcons.Analytics,
      'concept': Brain
    };
    return icons[type as keyof typeof icons] || CustomIcons.Bookmark;
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="space-y-6">
      {/* Enhanced Search Header */}
      <Card className="paper-card p-6 bg-gradient-to-br from-card to-muted/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-ink">Neural Search</h2>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={searchMode === 'semantic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSearchMode('semantic')}
                className="text-xs"
              >
                <Brain className="w-3 h-3 mr-1" />
                Semantic
              </Button>
              <Button
                variant={searchMode === 'visual' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSearchMode('visual')}
                className="text-xs"
              >
                <Eye className="w-3 h-3 mr-1" />
                Visual
              </Button>
              <Button
                variant={searchMode === 'timeline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSearchMode('timeline')}
                className="text-xs"
              >
                <Clock className="w-3 h-3 mr-1" />
                Timeline
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Ask anything about your knowledge... (Cmd+K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 pr-32 h-14 paper-input text-lg placeholder:text-muted-foreground/60"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button 
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="bg-gradient-sakura text-white hover:opacity-90"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2" />
                    Searching
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Smart Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Smart suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setQuery(suggestion.query);
                      handleSearch(suggestion.query);
                    }}
                    className="text-xs hover:bg-gradient-sakura hover:text-white transition-all"
                  >
                    {suggestion.type === 'trending' && <TrendingUp className="w-3 h-3 mr-1" />}
                    {suggestion.type === 'similar' && <Brain className="w-3 h-3 mr-1" />}
                    {suggestion.type === 'related' && <ArrowRight className="w-3 h-3 mr-1" />}
                    {suggestion.query}
                    <span className="ml-1 opacity-60">
                      {Math.round(suggestion.confidence * 100)}%
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Search Progress */}
      {isSearching && (
        <Card className="paper-card p-4">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 animate-pulse text-primary" />
            <div className="flex-1">
              <p className="font-medium text-ink">Neural search in progress...</p>
              <p className="text-sm text-muted-foreground">Analyzing semantic connections and relevance patterns</p>
            </div>
          </div>
          <Progress value={75} className="mt-3" />
        </Card>
      )}

      {/* Search Results */}
      {results.length > 0 && !isSearching && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-ink">Found {results.length} relevant results</h3>
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Ranked
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <Star className="w-4 h-4 mr-1" />
              Save Search
            </Button>
          </div>

          {results.map((result, index) => {
            const IconComponent = getTypeIcon(result.type);
            return (
              <Card 
                key={result.id} 
                className={cn(
                  "paper-card transition-all cursor-pointer hover:shadow-floating",
                  selectedResult === result.id && "ring-2 ring-primary shadow-floating"
                )}
                onClick={() => setSelectedResult(selectedResult === result.id ? null : result.id)}
              >
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-sakura rounded-xl flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-ink hover:text-primary transition-colors line-clamp-2">
                          {result.title}
                        </h4>
                        {result.url && (
                          <p className="text-sm text-muted-foreground mt-1">{result.url}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={cn("text-xs", getCategoryColor(result.category))}>
                        {result.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          result.similarity > 0.9 ? 'bg-green-500' : 
                          result.similarity > 0.8 ? 'bg-yellow-500' : 'bg-gray-500'
                        )} />
                        {Math.round(result.similarity * 100)}%
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.content}
                  </p>

                  {/* AI Insights */}
                  {result.aiInsights && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-500 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-purple-700 mb-1">AI Insight</p>
                          <p className="text-sm text-purple-600">{result.aiInsights}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {selectedResult === result.id && (
                    <div className="space-y-3 border-t pt-4">
                      {/* Connected Content */}
                      <div>
                        <h5 className="text-sm font-medium text-ink mb-2">Connected Content</h5>
                        <div className="flex flex-wrap gap-1">
                          {result.connections.map(connection => (
                            <Button
                              key={connection}
                              variant="ghost"
                              size="sm"
                              className="text-xs h-6 px-2 hover:bg-primary hover:text-primary-foreground"
                            >
                              {connection}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          <Eye className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                        <Button size="sm" variant="outline">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          Connect
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Tags and Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {result.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 text-xs rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                      {result.tags.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{result.tags.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {result.lastAccessed}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {results.length === 0 && !isSearching && query && (
        <Card className="paper-card p-12 text-center">
          <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-semibold text-ink mb-2">No results found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your search terms or explore these suggestions
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm">Broaden Search</Button>
            <Button variant="outline" size="sm">Try AI Suggestions</Button>
          </div>
        </Card>
      )}

      {/* Help Text */}
      {!query && !isSearching && (
        <Card className="paper-card p-6 bg-gradient-to-br from-muted/30 to-background">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-ink">Start your neural search</h3>
            <p className="text-sm text-muted-foreground">
              Use natural language to find connections across your knowledge base
            </p>
            <div className="flex justify-center gap-2 text-xs text-muted-foreground">
              <span>Try: "productivity systems" • "creative workflows" • "learning methods"</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}