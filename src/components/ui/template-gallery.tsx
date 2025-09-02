import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  Lightbulb,
  Target,
  GitBranch,
  Users,
  Calendar,
  Search,
  Plus,
  Star,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  preview: string;
  nodes: number;
  connections: number;
  tags: string[];
  popular?: boolean;
  recent?: boolean;
}

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
  className?: string;
}

const templates: Template[] = [
  {
    id: 'project-planning',
    name: 'Project Planning',
    description: 'Plan and organize your project goals, tasks, and timeline',
    category: 'Planning',
    icon: Target,
    preview: '/templates/project-planning.png',
    nodes: 12,
    connections: 15,
    tags: ['planning', 'goals', 'timeline'],
    popular: true
  },
  {
    id: 'mind-map',
    name: 'Mind Map',
    description: 'Brainstorm ideas and explore connections between concepts',
    category: 'Brainstorming',
    icon: Lightbulb,
    preview: '/templates/mind-map.png',
    nodes: 8,
    connections: 10,
    tags: ['brainstorming', 'ideas', 'creativity'],
    popular: true
  },
  {
    id: 'learning-path',
    name: 'Learning Path',
    description: 'Structure your learning journey with progressive concepts',
    category: 'Education',
    icon: BookOpen,
    preview: '/templates/learning-path.png',
    nodes: 15,
    connections: 18,
    tags: ['learning', 'education', 'progression']
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    description: 'Map out decision points and potential outcomes',
    category: 'Analysis',
    icon: GitBranch,
    preview: '/templates/decision-tree.png',
    nodes: 10,
    connections: 12,
    tags: ['decisions', 'analysis', 'logic'],
    recent: true
  },
  {
    id: 'team-workflow',
    name: 'Team Workflow',
    description: 'Visualize team processes and collaboration points',
    category: 'Collaboration',
    icon: Users,
    preview: '/templates/team-workflow.png',
    nodes: 14,
    connections: 20,
    tags: ['team', 'workflow', 'collaboration']
  },
  {
    id: 'research-board',
    name: 'Research Board',
    description: 'Collect and organize research findings and sources',
    category: 'Research',
    icon: Search,
    preview: '/templates/research-board.png',
    nodes: 20,
    connections: 25,
    tags: ['research', 'sources', 'findings'],
    recent: true
  }
];

const categories = ['All', 'Planning', 'Brainstorming', 'Education', 'Analysis', 'Collaboration', 'Research'];

export function TemplateGallery({ onSelectTemplate, className }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("gap-2", className)}>
          <Plus className="w-4 h-4" />
          Templates
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">Template Gallery</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Start with a pre-built template to organize your knowledge faster
          </p>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden p-6 pt-0">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-full">
            {filteredTemplates.map(template => (
              <Card 
                key={template.id}
                className="paper-card hover:shadow-floating transition-all duration-200 cursor-pointer group"
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-sakura rounded-lg flex items-center justify-center">
                        <template.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {template.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {template.popular && (
                        <Badge variant="secondary" className="text-xs bg-gold/20 text-gold border-gold/30">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {template.recent && (
                        <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                          <Clock className="w-3 h-3 mr-1" />
                          New
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="h-24 bg-gradient-paper rounded border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <template.icon className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">
                        {template.nodes} nodes, {template.connections} connections
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action */}
                  <Button 
                    className="w-full bg-gradient-sakura text-white hover:shadow-floating transition-all"
                    size="sm"
                  >
                    Use Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-muted-foreground mb-2">No templates found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}