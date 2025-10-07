import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Activity,
  Zap,
  BookOpen,
  Code,
  Sparkles
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Hero Analytics Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bamboo/20 via-washi to-sakura/20 p-8"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-bamboo">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink">Learning Analytics</h2>
              <p className="text-sm text-muted-foreground">Track your progress and insights</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-5 h-5 text-bamboo" />
                <Badge variant="secondary" className="text-xs bg-bamboo/10 text-bamboo">+12%</Badge>
              </div>
              <div className="text-3xl font-bold text-ink mb-1">{totalHoursThisWeek.toFixed(1)}h</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <Brain className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">+3%</Badge>
              </div>
              <div className="text-3xl font-bold text-ink mb-1">76%</div>
              <div className="text-xs text-muted-foreground">Retention Rate</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <Target className="w-5 h-5 text-seal" />
                <Badge variant="secondary" className="text-xs bg-seal/10 text-seal">
                  {Math.round((goals.filter(g => g.status === 'completed').length / goals.length) * 100)}%
                </Badge>
              </div>
              <div className="text-3xl font-bold text-ink mb-1">
                {goals.filter(g => g.status === 'completed').length}/{goals.length}
              </div>
              <div className="text-xs text-muted-foreground">Goals Completed</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-xl bg-background/80 backdrop-blur border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <Award className="w-5 h-5 text-gold" />
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <div className="text-3xl font-bold text-ink mb-1">12</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Analytics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="patterns" className="space-y-4">
          <TabsList className="grid grid-cols-3 bg-washi p-1 rounded-xl">
            <TabsTrigger value="patterns" className="rounded-lg">
              <Activity className="w-4 h-4 mr-2" />
              Patterns
            </TabsTrigger>
            <TabsTrigger value="gaps" className="rounded-lg">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Gaps
            </TabsTrigger>
            <TabsTrigger value="goals" className="rounded-lg">
              <Target className="w-4 h-4 mr-2" />
              Goals
            </TabsTrigger>
          </TabsList>

          {/* Learning Patterns */}
          <TabsContent value="patterns" className="space-y-4">
            <Card className="paper-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-ink flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Learning Behavior Analysis
                </h4>
              </div>
              
              <div className="space-y-4">
                {patterns.map((pattern, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 rounded-xl bg-gradient-to-r from-washi to-background border border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-ink text-lg">{pattern.category}</h5>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {getTrendIcon(pattern.trend)}
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <Clock className="w-4 h-4 text-bamboo mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground mb-1">Time Spent</div>
                          <div className="font-bold text-ink">{pattern.timeSpent}h</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <BookOpen className="w-4 h-4 text-primary mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground mb-1">Items</div>
                          <div className="font-bold text-ink">{pattern.itemsConsumed}</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <Brain className="w-4 h-4 text-seal mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground mb-1">Retention</div>
                          <div className="font-bold text-ink">{Math.round(pattern.retentionRate * 100)}%</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-background/50">
                          <Calendar className="w-4 h-4 text-gold mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground mb-1">Best Time</div>
                          <div className="font-bold text-ink">{pattern.preferredTime}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Weekly Activity Chart */}
            <Card className="paper-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-ink flex items-center gap-2">
                  <Activity className="w-5 h-5 text-bamboo" />
                  Weekly Activity Breakdown
                </h4>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-bamboo" />
                    <span>Reading</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-seal" />
                    <span>Practicing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                    <span>Creating</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {weeklyActivity.map((day, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-20 text-sm font-medium text-ink">
                      {new Date(day.date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.reading / 5) * 100}%` }}
                          transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                          className="bg-gradient-bamboo flex items-center justify-center text-xs text-white font-medium"
                        >
                          {day.reading > 0.5 && `${day.reading}h`}
                        </motion.div>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.practicing / 5) * 100}%` }}
                          transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                          className="bg-seal flex items-center justify-center text-xs text-white font-medium"
                        >
                          {day.practicing > 0.5 && `${day.practicing}h`}
                        </motion.div>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.creating / 5) * 100}%` }}
                          transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                          className="bg-gold flex items-center justify-center text-xs text-white font-medium"
                        >
                          {day.creating > 0.5 && `${day.creating}h`}
                        </motion.div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        Total: {(day.reading + day.practicing + day.creating).toFixed(1)}h
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Knowledge Gaps */}
          <TabsContent value="gaps" className="space-y-4">
            <Card className="paper-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-gold" />
                <h4 className="font-semibold text-ink">Identified Knowledge Gaps</h4>
                <Badge variant="secondary" className="ml-auto">
                  {knowledgeGaps.length} Areas
                </Badge>
              </div>
              
              <div className="space-y-4">
                {knowledgeGaps.map((gap, index) => (
                  <motion.div 
                    key={gap.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 rounded-xl bg-gradient-to-br from-washi to-background border border-border"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h5 className="font-semibold text-ink text-lg mb-2">{gap.topic}</h5>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getSeverityColor(gap.severity)} font-semibold`}>
                            {gap.severity} priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Lightbulb className="w-3 h-3 mr-1" />
                            {gap.relatedContent} resources
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-background/50">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-primary" />
                        <h6 className="text-sm font-semibold text-ink">Recommended Actions:</h6>
                      </div>
                      <ul className="space-y-2">
                        {gap.suggestedActions.map((action, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">{idx + 1}</span>
                            </div>
                            <span>{action}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Progress Tracking */}
          <TabsContent value="goals" className="space-y-4">
            <Card className="paper-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-seal" />
                  <h4 className="font-semibold text-ink">Learning Goals</h4>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" className="bg-gradient-bamboo text-white">
                    <Target className="w-4 h-4 mr-2" />
                    New Goal
                  </Button>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <motion.div 
                    key={goal.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 rounded-xl bg-gradient-to-r from-washi to-background border border-border"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold text-ink text-lg">{goal.title}</h5>
                          <Badge className={`${getGoalStatusColor(goal.status)} font-semibold`}>
                            {goal.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="outline" className="text-xs">
                            <Code className="w-3 h-3 mr-1" />
                            {goal.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {goal.targetDate.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Progress</span>
                        <span className="font-bold text-ink text-lg">{goal.progress}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={goal.progress} className="h-3" />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className="absolute top-0 left-0 h-3 bg-gradient-bamboo rounded-full"
                          style={{ maxWidth: '100%' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}