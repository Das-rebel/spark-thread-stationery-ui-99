import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Target,
  Sparkles,
  TrendingUp,
  Filter
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

  const completionRate = Math.round(
    (actionables.filter(a => a.status === 'completed').length / actionables.length) * 100
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sakura/20 via-washi to-bamboo/20 p-8"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-gradient-sakura">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink">Smart Actionables</h2>
              <p className="text-sm text-muted-foreground">AI-powered task suggestions from your content</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <div className="text-2xl font-bold text-ink">
                {actionables.filter(a => a.status === 'pending').length}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-4 h-4 text-bamboo" />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <div className="text-2xl font-bold text-bamboo">
                {actionables.filter(a => a.status === 'in-progress').length}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-bamboo" />
                <span className="text-xs text-muted-foreground">Done</span>
              </div>
              <div className="text-2xl font-bold text-bamboo">
                {actionables.filter(a => a.status === 'completed').length}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gold" />
                <span className="text-xs text-muted-foreground">Rate</span>
              </div>
              <div className="text-2xl font-bold text-ink">{completionRate}%</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Filter Controls */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 flex-wrap"
      >
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-ink">Filter:</span>
        {['all', 'pending', 'in-progress', 'completed'].map((status, index) => (
          <motion.div key={status} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status as any)}
              className={filter === status ? "bg-gradient-sakura text-white" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Actionables List */}
      <AnimatePresence mode="popLayout">
        {filteredActionables.map((actionable, index) => {
          const TypeIcon = getTypeIcon(actionable.type);
          
          return (
            <motion.div
              key={actionable.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className="paper-card p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Actionable Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 rounded-xl ${getPriorityColor(actionable.priority)}`}
                      >
                        <TypeIcon className="w-5 h-5" />
                      </motion.div>
                    
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
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          className="flex items-center gap-2 mb-2"
                        >
                          <Progress value={actionable.progress} className="flex-1 h-2" />
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-semibold text-bamboo"
                          >
                            {actionable.progress}%
                          </motion.span>
                        </motion.div>
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
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                      </motion.div>
                    )}
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="sm">
                        View Sources
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* AI Suggestions Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="paper-card p-6 bg-gradient-to-r from-sakura/10 via-washi/50 to-bamboo/10 border-2 border-primary/20">
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-ink mb-1">AI-Powered Insights</h4>
              <p className="text-sm text-muted-foreground">
                Smart actionables are generated from your saved content. Complete tasks to unlock more personalized suggestions and improve accuracy.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}