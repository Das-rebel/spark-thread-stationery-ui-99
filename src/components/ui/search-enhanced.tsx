import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'trending' | 'ai';
  category?: string;
}

interface EnhancedSearchProps {
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onSearch?: (query: string) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  className?: string;
  autoFocus?: boolean;
}

const mockSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'machine learning', type: 'recent' },
  { id: '2', text: 'react hooks', type: 'trending', category: 'Development' },
  { id: '3', text: 'productivity tips', type: 'ai', category: 'Lifestyle' },
  { id: '4', text: 'typescript best practices', type: 'recent', category: 'Development' },
  { id: '5', text: 'design systems', type: 'trending', category: 'Design' },
];

export function EnhancedSearch({
  placeholder = "Search your knowledge...",
  suggestions = mockSuggestions,
  onSearch,
  onSuggestionClick,
  className,
  autoFocus = false
}: EnhancedSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions(
        suggestions.filter(s => 
          s.text.toLowerCase().includes(query.toLowerCase()) ||
          s.category?.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, suggestions]);

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsOpen(false);
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return <Clock className="w-3 h-3 text-muted-foreground" />;
      case 'trending':
        return <Sparkles className="w-3 h-3 text-gold" />;
      case 'ai':
        return <Sparkles className="w-3 h-3 text-sakura" />;
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          placeholder={placeholder}
          className="pl-10 pr-20 h-12 rounded-xl border-2 border-border/50 focus:border-sakura transition-all duration-200"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuery('')}
              className="w-6 h-6 p-0 hover:bg-muted"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 hover:bg-sakura/10"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 z-50 shadow-lg border-2 border-border/50 max-h-80 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            <div className="space-y-1">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    {getSuggestionIcon(suggestion.type)}
                    <span className="text-sm">{suggestion.text}</span>
                  </div>
                  {suggestion.category && (
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.category}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No suggestions found
            </div>
          )}
        </Card>
      )}
    </div>
  );
}