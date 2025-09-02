import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Zap, 
  Calendar, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Star,
  Target
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

/**
 * Smart Actionables Component
 * 
 * This component provides AI-driven actionable suggestions based on user's recent bookmarks.
 * It analyzes saved content and generates personalized tasks, reminders, and learning paths.
 * 
 * Features:
 * - AI-generated actionable suggestions from bookmark content
 * - Task completion tracking with progress indicators
 * - Automated actions (calendar scheduling, reminders, follow-ups)
 * - Priority-based task organization
 * - Integration with user's learning goals and patterns
 */

interface Actionable {
  id: string;
  title: string;
  description: string;
  type: 'learning' | 'creation' | 'research' | 'networking' | 'reminder' | 'habit';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'automated';
  estimatedTime: string;
  dueDate?: string;
  sourceBookmarks: string[];
  aiGenerated: boolean;
  automationType?: 'calendar' | 'reminder' | 'email' | 'research';
  progress: number;
  tags: string[];
}

export function SmartActionables() {
  // Demo actionables with expanded use cases
  const [actionables, setActionables] = useState<Actionable[]>([
    {
      id: '1',
      title: 'Create Learning Path: Machine Learning Fundamentals',
      description: 'Build a structured learning sequence from your 12 saved ML articles and videos',
      type: 'learning',
      priority: 'high',
      status: 'pending',
      estimatedTime: '4 hours',
      dueDate: '2024-01-25',
      sourceBookmarks: ['ML Basics', 'Neural Networks', 'Deep Learning Guide'],
      aiGenerated: true,
      progress: 0,
      tags: ['ML', 'learning-path', 'fundamentals']
    },
    {
      id: '2',
      title: 'Generate Newsletter: Weekly Tech Digest',
      description: 'Create a curated newsletter from this week\'s tech bookmarks for your audience',
      type: 'creation',
      priority: 'high',
      status: 'in-progress',
      estimatedTime: '2 hours',
      dueDate: '2024-01-22',
      sourceBookmarks: ['React 19 Updates', 'AI Trends 2024', 'Web Performance'],
      aiGenerated: true,
      progress: 40,
      tags: ['newsletter', 'tech', 'curation']
    },
    {
      id: '3',
      title: 'Research Project: Sustainable Design Practices',
      description: 'Compile research notes and create presentation from your sustainability bookmarks',
      type: 'research',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '6 hours',
      dueDate: '2024-02-01',
      sourceBookmarks: ['Green Design', 'Sustainable UX', 'Eco-friendly Tech'],
      aiGenerated: true,
      progress: 0,
      tags: ['sustainability', 'design', 'research']
    },
    {
      id: '4',
      title: 'Network with AI Researchers',
      description: 'Connect with authors and thought leaders from your saved AI papers',
      type: 'networking',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '1 hour',
      dueDate: '2024-01-30',
      sourceBookmarks: ['AI Safety Research', 'Transformer Papers'],
      aiGenerated: true,
      progress: 0,
      tags: ['networking', 'AI', 'researchers']
    },
    {
      id: '5',
      title: 'Practice Daily: Coding Challenges',
      description: 'Build habit from your saved coding practice resources',
      type: 'habit',
      priority: 'medium',
      status: 'in-progress',
      estimatedTime: '30 min/day',
      dueDate: 'Ongoing',
      sourceBookmarks: ['LeetCode Solutions', 'Algorithm Practice'],
      aiGenerated: true,
      progress: 65,
      tags: ['coding', 'practice', 'daily']
    },
    {
      id: '6',
      title: 'Follow-up: Conference Insights',
      description: 'Set reminders to revisit key insights from tech conference videos you saved',
      type: 'reminder',
      priority: 'low',
      status: 'automated',
      estimatedTime: '1 hour',
      dueDate: '2024-01-28',
      sourceBookmarks: ['React Conf 2024', 'AI Summit Talks'],
      aiGenerated: true,
      automationType: 'reminder',
      progress: 100,
      tags: ['conference', 'insights', 'review']
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  // Filter actionables based on selected status
  const filteredActionables = actionables.filter(actionable => 
    filter === 'all' || actionable.status === filter
  );

  // Get priority color for visual indicators
  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600 bg-red-50 border-red-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
      low: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  // Get type icon for actionable
  const getTypeIcon = (type: string) => {
    const icons = {
      learning: Star,
      creation: Zap,
      research: AlertCircle,
      networking: ArrowRight,
      reminder: Calendar,
      habit: Target
    };
    return icons[type as keyof typeof icons] || Star;
  };

  // Get status color for progress indicators
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-muted-foreground',
      'in-progress': 'text-bamboo',
      completed: 'text-green-600',
      automated: 'text-purple-600'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  // Toggle actionable completion status
  const toggleActionableStatus = (id: string) => {
    setActionables(actionables.map(actionable =>
      actionable.id === id
        ? { 
            ...actionable, 
            status: actionable.status === 'completed' ? 'pending' : 'completed',
            progress: actionable.status === 'completed' ? 0 : 100
          }
        : actionable
    ));
  };

  // Start/pause actionable progress
  const toggleActionableProgress = (id: string) => {
    setActionables(actionables.map(actionable =>
      actionable.id === id
        ? { 
            ...actionable, 
            status: actionable.status === 'in-progress' ? 'pending' : 'in-progress'
          }
        : actionable
    ));
  };

  return (
    <div className="space-y-6">
      {/* Smart Actionables Header */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Smart Actionables</h2>
          <Badge variant="secondary" className="ml-auto">
            <Target className="w-3 h-3 mr-1" />
            AI-Driven
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          AI analyzes your bookmarks to suggest actionable next steps. Complete tasks to unlock more personalized suggestions.
        </p>

        {/* Actionables Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-primary">{actionables.filter(a => a.status === 'pending').length}</div>
            <div className="text-sm text-muted-foreground">Pending Tasks</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-bamboo">{actionables.filter(a => a.status === 'in-progress').length}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-green-600">{actionables.filter(a => a.status === 'completed').length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-purple-600">{actionables.filter(a => a.automationType).length}</div>
            <div className="text-sm text-muted-foreground">Automated</div>
          </div>
        </div>
      </Card>

      {/* Filter Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-ink">Filter:</span>
        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status as any)}
            className={filter === status ? "bg-gradient-sakura text-white" : ""}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
          </Button>
        ))}
      </div>

      {/* Actionables List */}
      <div className="space-y-4">
        {filteredActionables.map((actionable) => {
          const TypeIcon = getTypeIcon(actionable.type);
          
          return (
            <Card key={actionable.id} className="paper-card p-6">
              <div className="space-y-4">
                {/* Actionable Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${getPriorityColor(actionable.priority)}`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-ink">{actionable.title}</h3>
                        {actionable.aiGenerated && (
                          <Badge variant="secondary" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                        {actionable.automationType && (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            Auto: {actionable.automationType}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{actionable.description}</p>
                      
                      {/* Progress Bar */}
                      {actionable.progress > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <Progress value={actionable.progress} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">{actionable.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className={`text-sm font-medium ${getStatusColor(actionable.status)}`}>
                    {actionable.status.replace('-', ' ')}
                  </div>
                </div>

                {/* Actionable Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {actionable.estimatedTime}
                  </div>
                  {actionable.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due {actionable.dueDate}
                    </div>
                  )}
                  <div>
                    {actionable.sourceBookmarks.length} source bookmark{actionable.sourceBookmarks.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {actionable.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {actionable.status !== 'completed' && (
                    <Button
                      size="sm"
                      onClick={() => toggleActionableProgress(actionable.id)}
                      className={actionable.status === 'in-progress' 
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" 
                        : "bg-gradient-bamboo text-white"
                      }
                    >
                      {actionable.status === 'in-progress' ? (
                        <>
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActionableStatus(actionable.id)}
                  >
                    {actionable.status === 'completed' ? (
                      <>
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reopen
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Complete
                      </>
                    )}
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    View Sources
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Suggestions Footer */}
      <Card className="paper-card p-4 bg-gradient-to-r from-washi to-background">
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">
            AI will generate new actionables as you save more bookmarks. 
            Complete tasks to improve suggestion accuracy.
          </span>
        </div>
      </Card>
    </div>
  );
}