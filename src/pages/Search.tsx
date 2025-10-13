import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { EnhancedSearch } from "@/components/ui/search-enhanced";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { PageTransition } from "@/components/ui/page-transition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdvancedSearchDialog } from "@/components/search/AdvancedSearchDialog";
import { Search as SearchIcon, Brain, FileText, Video, Image, Link as LinkIcon, Filter, SortDesc } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'video' | 'image' | 'link' | 'note';
  tags: string[];
  relevance: number;
  source: string;
  createdAt: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'React Performance Best Practices',
    content: 'Essential techniques for optimizing React applications, including memoization, lazy loading, and bundle splitting...',
    type: 'article',
    tags: ['React', 'Performance', 'JavaScript'],
    relevance: 95,
    source: 'Medium',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'TypeScript Advanced Patterns',
    content: 'Deep dive into advanced TypeScript patterns including conditional types, mapped types, and template literals...',
    type: 'video',
    tags: ['TypeScript', 'Programming', 'Advanced'],
    relevance: 88,
    source: 'YouTube',
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'Design System Principles',
    content: 'Building scalable design systems with consistent components, tokens, and documentation...',
    type: 'article',
    tags: ['Design', 'UI/UX', 'Systems'],
    relevance: 82,
    source: 'Design Blog',
    createdAt: '2024-01-10'
  }
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
    
    // Simulate search
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (searchQuery.trim()) {
      setResults(mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
    } else {
      setResults([]);
    }
    
    setIsSearching(false);
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'link':
        return <LinkIcon className="w-4 h-4" />;
      case 'note':
        return <Brain className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'article':
        return 'text-blue-500 bg-blue-500/10';
      case 'video':
        return 'text-red-500 bg-red-500/10';
      case 'image':
        return 'text-green-500 bg-green-500/10';
      case 'link':
        return 'text-purple-500 bg-purple-500/10';
      case 'note':
        return 'text-sakura bg-sakura/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <AppLayout>
      <PageTransition>
        <div className="px-4 py-6 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <BreadcrumbNav 
              items={[
                { label: 'Search', icon: SearchIcon }
              ]}
            />
            
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-bold text-ink">
                Search Knowledge
              </h1>
              <p className="text-muted-foreground">
                Find anything you've saved across all your sources
              </p>
            </div>
          </div>

          {/* Search Interface */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <EnhancedSearch
                  placeholder="Search articles, videos, notes..."
                  onSearch={handleSearch}
                  autoFocus={true}
                />
              </div>
              <AdvancedSearchDialog 
                onSearch={(filters) => {
                  console.log('Advanced search:', filters);
                  handleSearch(filters.query);
                }}
              />
            </div>
            
            {/* Search Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="flex-shrink-0">
                <SortDesc className="w-4 h-4 mr-2" />
                Sort
              </Button>
              <Badge variant="secondary" className="flex-shrink-0">Articles</Badge>
              <Badge variant="secondary" className="flex-shrink-0">Videos</Badge>
              <Badge variant="secondary" className="flex-shrink-0">Notes</Badge>
            </div>
          </div>

          {/* Search Results */}
          {isSearching ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="paper-card p-4 animate-pulse">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-12 bg-muted rounded" />
                  </div>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {results.length} results for "{query}"
                </p>
                <p className="text-xs text-muted-foreground">
                  Search took 0.8s
                </p>
              </div>
              
              {results.map((result) => (
                <Card key={result.id} className="paper-card p-4 hover:shadow-floating transition-all cursor-pointer">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-ink line-clamp-1">
                            {result.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {result.source} • {result.createdAt}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {result.relevance}% match
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.content}
                    </p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-sakura rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-seal" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">
                Start searching
              </h3>
              <p className="text-muted-foreground">
                Search across all your saved content and knowledge
              </p>
            </div>
          )}
        </div>
      </PageTransition>
    </AppLayout>
  );
}