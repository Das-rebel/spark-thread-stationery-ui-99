import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Zap,
  Download,
  ArrowRight,
  Target,
  FolderOpen,
  MessageSquare
} from 'lucide-react';

interface FeatureCategoriesProps {
  onCategorySelect: (category: string) => void;
}

export function FeatureCategories({ onCategorySelect }: FeatureCategoriesProps) {
  const categories = [
    {
      id: 'search',
      title: 'Semantic Search',
      description: 'Find anything with AI-powered natural language search',
      icon: Search,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-50 to-blue-100',
      stats: '1.2k searches',
      badge: 'Most Used'
    },
    {
      id: 'actionables',
      title: 'Smart Actionables',
      description: 'AI suggests next steps based on your saved content',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      gradient: 'from-yellow-50 to-yellow-100',
      stats: '24 tasks ready',
      badge: 'New'
    },
    {
      id: 'sync',
      title: 'Multi-Platform Sync',
      description: 'Unified bookmarks from all your favorite platforms',
      icon: Download,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-50 to-green-100',
      stats: '5 platforms',
      badge: 'Active'
    }
  ];

  const additionalFeatures = [
    {
      id: 'collections',
      title: 'Smart Collections',
      icon: FolderOpen,
      stats: '8 collections'
    },
    {
      id: 'chat',
      title: 'AI Knowledge Chat',
      icon: MessageSquare,
      stats: 'Ask anything'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Main feature categories */}
      <div className="space-y-3">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id}
              className="paper-card p-4 cursor-pointer hover:shadow-floating transition-all"
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${category.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-ink truncate">{category.title}</h3>
                    {category.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {category.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                    {category.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {category.stats}
                  </p>
                </div>
                
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional features - compact view */}
      <div className="grid grid-cols-2 gap-3">
        {additionalFeatures.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card 
              key={feature.id}
              className="paper-card p-3 cursor-pointer hover:shadow-paper transition-all"
              onClick={() => onCategorySelect(feature.id)}
            >
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-washi rounded-lg flex items-center justify-center mx-auto">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-ink">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.stats}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}