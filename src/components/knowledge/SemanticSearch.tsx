import React, { useState } from 'react';
import { Search, Filter, Tag, TrendingUp, Clock, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CustomIcons } from '@/components/icons';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  tags: string[];
  similarity: number;
  lastAccessed: string;
  category: string;
}

export function SemanticSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Advanced React Patterns for Building Scalable Applications',
      url: 'https://react-patterns.dev',
      snippet: 'Learn about compound components, render props, and hooks patterns that make React applications more maintainable...',
      tags: ['React', 'JavaScript', 'Architecture'],
      similarity: 0.95,
      lastAccessed: '2 hours ago',
      category: 'Development'
    },
    {
      id: '2',
      title: 'The Science of Learning: How Memory Works',
      url: 'https://learning-science.edu',
      snippet: 'Understanding cognitive load theory and spaced repetition can dramatically improve how we acquire new knowledge...',
      tags: ['Learning', 'Psychology', 'Memory'],
      similarity: 0.87,
      lastAccessed: '1 day ago',
      category: 'Education'
    },
    {
      id: '3',
      title: 'Design Systems: Building Consistent User Interfaces',
      url: 'https://design-systems.guide',
      snippet: 'A comprehensive guide to creating and maintaining design systems that scale across teams and products...',
      tags: ['Design', 'UI/UX', 'Systems'],
      similarity: 0.82,
      lastAccessed: '3 days ago',
      category: 'Design'
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Development': 'bg-gradient-sakura',
      'Education': 'bg-gradient-bamboo',
      'Design': 'bg-gradient-gold'
    };
    return colors[category as keyof typeof colors] || 'bg-gradient-seal';
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <CustomIcons.BrainAI className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Semantic Search</h2>
          <Badge variant="secondary" className="ml-auto">
            <TrendingUp className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ask anything about your bookmarks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 paper-input"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-sakura text-white hover:opacity-90"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['Recent', 'Trending', 'Unread', 'AI/ML', 'Design', 'Code'].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="text-xs hover:bg-gradient-sakura hover:text-white transition-all"
            >
              {filter}
            </Button>
          ))}
        </div>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-ink">Found {results.length} relevant bookmarks</h3>
            <Button variant="ghost" size="sm">
              <Star className="w-4 h-4 mr-1" />
              Save Search
            </Button>
          </div>

          {results.map((result) => (
            <Card key={result.id} className="paper-card p-4 hover:shadow-elegant transition-all cursor-pointer">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-ink hover:text-primary transition-colors">
                      {result.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{result.url}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge 
                      className={`${getCategoryColor(result.category)} text-white text-xs`}
                    >
                      {result.category}
                    </Badge>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${result.similarity > 0.9 ? 'bg-green-500' : result.similarity > 0.8 ? 'bg-yellow-500' : 'bg-gray-500'}`} />
                      {Math.round(result.similarity * 100)}%
                    </div>
                  </div>
                </div>

                {/* Snippet */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.snippet}
                </p>

                {/* Tags and Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {result.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-washi text-xs rounded-full text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {result.lastAccessed}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {results.length === 0 && !isSearching && query && (
        <Card className="paper-card p-8 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-ink mb-2">No results found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or use different keywords
          </p>
        </Card>
      )}
    </div>
  );
}