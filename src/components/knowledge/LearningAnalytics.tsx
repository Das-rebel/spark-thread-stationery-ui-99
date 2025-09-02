import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Clock, 
  BarChart3, 
  Calendar,
  Lightbulb,
  AlertTriangle,
  Award,
  Activity
} from 'lucide-react';

interface LearningPattern {
  category: string;
  timeSpent: number; // hours
  itemsConsumed: number;
  retentionRate: number;
  preferredTime: string;
  trend: 'up' | 'down' | 'stable';
}

interface KnowledgeGap {
  id: string;
  topic: string;
  severity: 'low' | 'medium' | 'high';
  suggestedActions: string[];
  relatedContent: number;
}

interface LearningGoal {
  id: string;
  title: string;
  category: string;
  progress: number;
  targetDate: Date;
  status: 'on_track' | 'at_risk' | 'completed';
}

interface ActivityMetric {
  date: string;
  reading: number;
  practicing: number;
  creating: number;
}

export function LearningAnalytics() {
  const [patterns, setPatterns] = useState<LearningPattern[]>([]);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<ActivityMetric[]>([]);

  useEffect(() => {
    // Mock learning patterns
    setPatterns([
      {
        category: 'Frontend Development',
        timeSpent: 12.5,
        itemsConsumed: 23,
        retentionRate: 0.78,
        preferredTime: 'Morning',
        trend: 'up'
      },
      {
        category: 'Backend & APIs',
        timeSpent: 8.2,
        itemsConsumed: 15,
        retentionRate: 0.85,
        preferredTime: 'Afternoon',
        trend: 'stable'
      },
      {
        category: 'DevOps & Tools',
        timeSpent: 4.1,
        itemsConsumed: 8,
        retentionRate: 0.65,
        preferredTime: 'Evening',
        trend: 'down'
      }
    ]);

    // Mock knowledge gaps
    setKnowledgeGaps([
      {
        id: '1',
        topic: 'Advanced TypeScript Generics',
        severity: 'high',
        suggestedActions: [
          'Read TypeScript handbook section',
          'Complete practice exercises',
          'Build a generic utility library'
        ],
        relatedContent: 12
      },
      {
        id: '2',
        topic: 'Database Performance Optimization',
        severity: 'medium',
        suggestedActions: [
          'Study indexing strategies',
          'Learn query optimization',
          'Practice with real datasets'
        ],
        relatedContent: 8
      },
      {
        id: '3',
        topic: 'System Design Patterns',
        severity: 'low',
        suggestedActions: [
          'Review common patterns',
          'Analyze case studies'
        ],
        relatedContent: 5
      }
    ]);

    // Mock learning goals
    setGoals([
      {
        id: '1',
        title: 'Master React Server Components',
        category: 'Frontend',
        progress: 75,
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'on_track'
      },
      {
        id: '2',
        title: 'Learn Kubernetes Fundamentals',
        category: 'DevOps',
        progress: 40,
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'at_risk'
      },
      {
        id: '3',
        title: 'Complete API Security Course',
        category: 'Backend',
        progress: 100,
        targetDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'completed'
      }
    ]);

    // Mock weekly activity
    setWeeklyActivity([
      { date: '2024-01-15', reading: 2.5, practicing: 1.5, creating: 1.0 },
      { date: '2024-01-16', reading: 3.2, practicing: 2.0, creating: 0.5 },
      { date: '2024-01-17', reading: 1.8, practicing: 3.0, creating: 1.5 },
      { date: '2024-01-18', reading: 2.0, practicing: 1.0, creating: 2.0 },
      { date: '2024-01-19', reading: 2.8, practicing: 1.8, creating: 1.2 },
      { date: '2024-01-20', reading: 1.5, practicing: 2.5, creating: 0.8 },
      { date: '2024-01-21', reading: 3.0, practicing: 2.2, creating: 1.8 }
    ]);
  }, []);

  const getTrendIcon = (trend: LearningPattern['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-bamboo" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-seal rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: KnowledgeGap['severity']) => {
    switch (severity) {
      case 'high': return 'bg-seal/10 text-seal';
      case 'medium': return 'bg-gold/10 text-gold';
      case 'low': return 'bg-bamboo/10 text-bamboo';
    }
  };

  const getGoalStatusColor = (status: LearningGoal['status']) => {
    switch (status) {
      case 'completed': return 'bg-bamboo/10 text-bamboo';
      case 'on_track': return 'bg-ink/10 text-ink';
      case 'at_risk': return 'bg-seal/10 text-seal';
    }
  };

  const totalHoursThisWeek = weeklyActivity.reduce((sum, day) => 
    sum + day.reading + day.practicing + day.creating, 0
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="paper-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-bamboo" />
            <span className="text-sm text-muted-foreground">This Week</span>
          </div>
          <div className="text-2xl font-bold text-ink">{totalHoursThisWeek.toFixed(1)}h</div>
          <div className="text-xs text-bamboo">+12% from last week</div>
        </Card>

        <Card className="paper-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-ink" />
            <span className="text-sm text-muted-foreground">Retention</span>
          </div>
          <div className="text-2xl font-bold text-ink">76%</div>
          <div className="text-xs text-bamboo">+3% improvement</div>
        </Card>

        <Card className="paper-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-bamboo" />
            <span className="text-sm text-muted-foreground">Goals</span>
          </div>
          <div className="text-2xl font-bold text-ink">
            {goals.filter(g => g.status === 'completed').length}/{goals.length}
          </div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </Card>

        <Card className="paper-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-sm text-muted-foreground">Streak</span>
          </div>
          <div className="text-2xl font-bold text-ink">12</div>
          <div className="text-xs text-muted-foreground">Days</div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="patterns" className="space-y-4">
        <TabsList className="grid grid-cols-3 bg-washi">
          <TabsTrigger value="patterns">Learning Patterns</TabsTrigger>
          <TabsTrigger value="gaps">Knowledge Gaps</TabsTrigger>
          <TabsTrigger value="goals">Progress Tracking</TabsTrigger>
        </TabsList>

        {/* Learning Patterns */}
        <TabsContent value="patterns" className="space-y-4">
          <Card className="paper-card p-6">
            <h4 className="font-semibold text-ink mb-4">Learning Behavior Analysis</h4>
            
            <div className="space-y-4">
              {patterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-washi">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-medium text-ink">{pattern.category}</h5>
                      {getTrendIcon(pattern.trend)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Time Spent</span>
                        <div className="font-semibold">{pattern.timeSpent}h</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Items</span>
                        <div className="font-semibold">{pattern.itemsConsumed}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Retention</span>
                        <div className="font-semibold">{Math.round(pattern.retentionRate * 100)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Best Time</span>
                        <div className="font-semibold">{pattern.preferredTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Activity Chart */}
          <Card className="paper-card p-6">
            <h4 className="font-semibold text-ink mb-4">Weekly Activity</h4>
            <div className="space-y-3">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Reading: {day.reading}h</span>
                      <span>Practicing: {day.practicing}h</span>
                      <span>Creating: {day.creating}h</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div 
                        className="bg-bamboo rounded-sm"
                        style={{ width: `${(day.reading / 5) * 100}%` }}
                      />
                      <div 
                        className="bg-seal rounded-sm"
                        style={{ width: `${(day.practicing / 5) * 100}%` }}
                      />
                      <div 
                        className="bg-gold rounded-sm"
                        style={{ width: `${(day.creating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Knowledge Gaps */}
        <TabsContent value="gaps" className="space-y-4">
          <Card className="paper-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-gold" />
              <h4 className="font-semibold text-ink">Identified Knowledge Gaps</h4>
            </div>
            
            <div className="space-y-4">
              {knowledgeGaps.map((gap) => (
                <div key={gap.id} className="p-4 rounded-lg bg-washi">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-ink">{gap.topic}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getSeverityColor(gap.severity)}>
                          {gap.severity} priority
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {gap.relatedContent} related items
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-sm font-medium text-ink mb-2">Suggested Actions:</h6>
                    <ul className="space-y-1">
                      {gap.suggestedActions.map((action, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Progress Tracking */}
        <TabsContent value="goals" className="space-y-4">
          <Card className="paper-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-ink">Learning Goals</h4>
              <Button size="sm">
                <Target className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </div>
            
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 rounded-lg bg-washi">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-ink">{goal.title}</h5>
                        <Badge className={getGoalStatusColor(goal.status)}>
                          {goal.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{goal.category}</span>
                        <span>Due: {goal.targetDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-ink">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}