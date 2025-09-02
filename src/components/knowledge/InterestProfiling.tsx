import React, { useState } from 'react';
import { Brain, TrendingUp, Target, Clock, Star, Eye, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomIcons } from '@/components/icons';

interface Interest {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  lastActivity: string;
  bookmarkCount: number;
}

interface LearningPattern {
  pattern: string;
  description: string;
  frequency: string;
  effectiveness: number;
}

export function InterestProfiling() {
  const [interests] = useState<Interest[]>([
    {
      name: 'Machine Learning',
      score: 95,
      trend: 'up',
      category: 'Technology',
      lastActivity: '2 hours ago',
      bookmarkCount: 47
    },
    {
      name: 'React Development',
      score: 89,
      trend: 'stable',
      category: 'Programming',
      lastActivity: '5 hours ago',
      bookmarkCount: 34
    },
    {
      name: 'UI/UX Design',
      score: 82,
      trend: 'up',
      category: 'Design',
      lastActivity: '1 day ago',
      bookmarkCount: 28
    },
    {
      name: 'Data Science',
      score: 76,
      trend: 'down',
      category: 'Analytics',
      lastActivity: '3 days ago',
      bookmarkCount: 19
    },
    {
      name: 'Productivity',
      score: 71,
      trend: 'stable',
      category: 'Lifestyle',
      lastActivity: '1 day ago',
      bookmarkCount: 15
    }
  ]);

  const [learningPatterns] = useState<LearningPattern[]>([
    {
      pattern: 'Deep Dive Sessions',
      description: 'You prefer comprehensive, in-depth content over quick reads',
      frequency: '3-4 times per week',
      effectiveness: 87
    },
    {
      pattern: 'Visual Learning',
      description: 'You engage more with content that includes diagrams and visuals',
      frequency: 'Daily',
      effectiveness: 82
    },
    {
      pattern: 'Tutorial Following',
      description: 'You often bookmark step-by-step guides and tutorials',
      frequency: '2-3 times per week',
      effectiveness: 78
    },
    {
      pattern: 'Evening Study',
      description: 'Most active learning happens between 7-10 PM',
      frequency: 'Daily',
      effectiveness: 74
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-gradient-sakura';
    if (score >= 80) return 'bg-gradient-bamboo';
    if (score >= 70) return 'bg-gradient-gold';
    return 'bg-gradient-seal';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <CustomIcons.BrainAI className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Interest Profiling</h2>
          <Badge variant="secondary" className="ml-auto">
            <Brain className="w-3 h-3 mr-1" />
            Learning AI
          </Badge>
        </div>

        {/* Profile Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-washi rounded-lg">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-xl font-bold text-ink">5</div>
            <div className="text-sm text-muted-foreground">Core Interests</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <Zap className="w-6 h-6 text-bamboo mx-auto mb-2" />
            <div className="text-xl font-bold text-ink">87%</div>
            <div className="text-sm text-muted-foreground">Profile Accuracy</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <Clock className="w-6 h-6 text-gold mx-auto mb-2" />
            <div className="text-xl font-bold text-ink">2.5h</div>
            <div className="text-sm text-muted-foreground">Daily Learning</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-ink">143</div>
            <div className="text-sm text-muted-foreground">Total Bookmarks</div>
          </div>
        </div>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="interests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="interests">Interest Map</TabsTrigger>
          <TabsTrigger value="patterns">Learning Patterns</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Interest Map */}
        <TabsContent value="interests" className="space-y-4">
          <Card className="paper-card p-6">
            <h3 className="font-semibold text-ink mb-4">Your Interest Landscape</h3>
            <div className="space-y-4">
              {interests.map((interest, index) => (
                <div key={interest.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-ink">{interest.name}</div>
                      {getTrendIcon(interest.trend)}
                      <Badge variant="outline" className="text-xs">
                        {interest.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {interest.bookmarkCount} bookmarks
                      </span>
                      <span className="text-sm font-medium">{interest.score}%</span>
                    </div>
                  </div>
                  <Progress 
                    value={interest.score} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    Last activity: {interest.lastActivity}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Interest Categories */}
          <Card className="paper-card p-6">
            <h3 className="font-semibold text-ink mb-4">Interest Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Technology', 'Programming', 'Design', 'Analytics', 'Lifestyle', 'Business'].map((category) => (
                <div key={category} className="p-3 bg-washi rounded-lg text-center">
                  <div className="w-12 h-12 bg-gradient-sakura rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-medium text-ink">{category}</div>
                  <div className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 20 + 5)} items
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Learning Patterns */}
        <TabsContent value="patterns" className="space-y-4">
          <Card className="paper-card p-6">
            <h3 className="font-semibold text-ink mb-4">Your Learning Patterns</h3>
            <div className="space-y-4">
              {learningPatterns.map((pattern, index) => (
                <Card key={pattern.pattern} className="p-4 bg-washi">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-ink">{pattern.pattern}</h4>
                    <Badge variant="secondary">
                      {pattern.effectiveness}% effective
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {pattern.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {pattern.frequency}
                    </span>
                    <div className="flex-1">
                      <Progress value={pattern.effectiveness} className="h-1" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-4">
          <Card className="paper-card p-6">
            <h3 className="font-semibold text-ink mb-4">AI-Generated Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-sakura/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="font-medium text-ink">Learning Velocity</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your learning pace has increased 23% this month. You're most productive during evening sessions and show strong retention for visual content.
                </p>
              </div>

              <div className="p-4 bg-gradient-bamboo/10 rounded-lg border border-bamboo/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-bamboo" />
                  <span className="font-medium text-ink">Knowledge Gaps</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your interests in ML and React, you might benefit from exploring TypeScript and testing frameworks. Consider adding more backend development content.
                </p>
              </div>

              <div className="p-4 bg-gradient-gold/10 rounded-lg border border-gold/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  <span className="font-medium text-ink">Trending Interests</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your interest in AI/ML has grown significantly. We recommend exploring advanced topics like neural networks and deep learning frameworks.
                </p>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="paper-card p-6">
            <h3 className="font-semibold text-ink mb-4">Personalized Recommendations</h3>
            <div className="grid gap-3">
              {[
                'Advanced React Patterns for ML Applications',
                'TypeScript for Data Science Projects', 
                'Building AI-Powered UI Components',
                'Design Systems for Technical Products'
              ].map((recommendation, index) => (
                <div key={recommendation} className="flex items-center justify-between p-3 bg-washi rounded-lg">
                  <span className="text-sm font-medium text-ink">{recommendation}</span>
                  <Button size="sm" variant="outline">
                    <Star className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}