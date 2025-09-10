import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Brain, 
  TrendingUp,
  Calendar,
  Award,
  Flame,
  BookOpen,
  Link2,
  Lightbulb,
  Users,
  Crown,
  Medal,
  Gift
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'learning' | 'social' | 'productivity' | 'creativity';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockedAt?: string;
}

interface LearningStreak {
  current: number;
  longest: number;
  lastActivity: string;
}

interface KnowledgeStats {
  totalNodes: number;
  totalConnections: number;
  weeklyGrowth: number;
  knowledgeScore: number;
  level: number;
  nextLevelXP: number;
  currentXP: number;
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-gradient-to-r from-yellow-400 to-orange-500'
};

const categoryIcons = {
  learning: Brain,
  social: Users,
  productivity: Zap,
  creativity: Lightbulb
};

export function GamificationHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCelebration, setShowCelebration] = useState(false);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

  // Mock data
  const knowledgeStats: KnowledgeStats = {
    totalNodes: 847,
    totalConnections: 1203,
    weeklyGrowth: 23,
    knowledgeScore: 2847,
    level: 12,
    nextLevelXP: 3000,
    currentXP: 2847
  };

  const learningStreak: LearningStreak = {
    current: 18,
    longest: 47,
    lastActivity: '2 hours ago'
  };

  const achievements: Achievement[] = [
    {
      id: 'first-connection',
      title: 'Connection Master',
      description: 'Create your first knowledge connection',
      icon: Link2,
      category: 'learning',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: 'common',
      points: 50,
      unlockedAt: '2 days ago'
    },
    {
      id: 'knowledge-curator',
      title: 'Knowledge Curator',
      description: 'Organize 100 pieces of content',
      icon: BookOpen,
      category: 'productivity',
      progress: 87,
      maxProgress: 100,
      unlocked: false,
      rarity: 'rare',
      points: 200
    },
    {
      id: 'insight-generator',
      title: 'Insight Generator',
      description: 'Generate 50 AI-powered insights',
      icon: Brain,
      category: 'creativity',
      progress: 23,
      maxProgress: 50,
      unlocked: false,
      rarity: 'epic',
      points: 500
    },
    {
      id: 'network-architect',
      title: 'Network Architect',
      description: 'Build a knowledge network with 500+ connections',
      icon: Crown,
      category: 'learning',
      progress: 203,
      maxProgress: 500,
      unlocked: false,
      rarity: 'legendary',
      points: 1000
    },
    {
      id: 'streak-warrior',
      title: 'Streak Warrior',
      description: 'Maintain a 30-day learning streak',
      icon: Flame,
      category: 'productivity',
      progress: 18,
      maxProgress: 30,
      unlocked: false,
      rarity: 'rare',
      points: 300
    }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  // Simulate achievement unlocking
  useEffect(() => {
    const timer = setTimeout(() => {
      const unlockedAchievement = achievements.find(a => a.id === 'knowledge-curator');
      if (unlockedAchievement && unlockedAchievement.progress >= unlockedAchievement.maxProgress) {
        setRecentAchievement(unlockedAchievement);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Celebration Modal */}
      {showCelebration && recentAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="paper-card p-8 max-w-md mx-4 text-center animate-scale-in">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-ink">Achievement Unlocked!</h2>
              <div className="space-y-2">
                <Badge className={cn("text-white", rarityColors[recentAchievement.rarity])}>
                  {recentAchievement.rarity.toUpperCase()}
                </Badge>
                <h3 className="font-semibold">{recentAchievement.title}</h3>
                <p className="text-sm text-muted-foreground">{recentAchievement.description}</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">+{recentAchievement.points} XP</span>
                </div>
              </div>
              <Button onClick={() => setShowCelebration(false)} className="w-full">
                Awesome!
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="paper-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-sakura rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <p className="text-2xl font-bold text-ink">{knowledgeStats.level}</p>
            </div>
          </div>
        </Card>

        <Card className="paper-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-bamboo rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-ink">{learningStreak.current}d</p>
            </div>
          </div>
        </Card>

        <Card className="paper-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">XP</p>
              <p className="text-2xl font-bold text-ink">{knowledgeStats.currentXP.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="paper-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-ink rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Knowledge Score</p>
              <p className="text-2xl font-bold text-ink">{knowledgeStats.knowledgeScore}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="paper-card p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">Learning Progress</h3>
            <p className="text-sm text-muted-foreground">Track your knowledge journey</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Level Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-ink">Level {knowledgeStats.level} Progress</span>
              <span className="text-sm text-muted-foreground">
                {knowledgeStats.currentXP} / {knowledgeStats.nextLevelXP} XP
              </span>
            </div>
            <Progress 
              value={(knowledgeStats.currentXP / knowledgeStats.nextLevelXP) * 100} 
              className="h-4 bg-gradient-to-r from-primary/20 to-primary/10"
            />
            <p className="text-xs text-muted-foreground">
              {knowledgeStats.nextLevelXP - knowledgeStats.currentXP} XP until next level
            </p>
          </div>

          {/* Streak Progress */}
          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-orange-100 to-red-50 rounded-xl border border-orange-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-orange-700 text-lg">
                  {learningStreak.current} Day Streak! 🔥
                </p>
                <p className="text-sm text-orange-600">
                  Personal best: {learningStreak.longest} days
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
              {learningStreak.lastActivity}
            </Badge>
          </div>

          {/* Weekly Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-xl border border-primary/10">
              <p className="text-2xl font-bold text-ink">{knowledgeStats.totalNodes}</p>
              <p className="text-sm text-muted-foreground font-medium">Total Nodes</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl border border-primary/10">
              <p className="text-2xl font-bold text-ink">{knowledgeStats.totalConnections}</p>
              <p className="text-sm text-muted-foreground font-medium">Connections</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl border border-primary/10">
              <p className="text-2xl font-bold text-green-600">+{knowledgeStats.weeklyGrowth}</p>
              <p className="text-sm text-muted-foreground font-medium">This Week</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements Section */}
      <Card className="paper-card p-6 border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink">Achievements</h3>
              <p className="text-sm text-muted-foreground">Unlock rewards as you learn</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="text-xs"
            >
              All
            </Button>
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                <Icon className="w-3 h-3" />
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAchievements.map((achievement) => {
            const CategoryIcon = categoryIcons[achievement.category];
            const AchievementIcon = achievement.icon;
            
            return (
              <Card 
                key={achievement.id} 
                className={cn(
                  "transition-all hover:shadow-elegant border-2",
                  achievement.unlocked ? 
                    "bg-gradient-to-br from-white to-gold/10 border-gold/30" : 
                    "opacity-75 border-gray-200"
                )}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg",
                      achievement.unlocked 
                        ? rarityColors[achievement.rarity]
                        : "bg-muted"
                    )}>
                      <AchievementIcon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className={cn(
                            "font-bold text-lg",
                            achievement.unlocked ? "text-ink" : "text-muted-foreground"
                          )}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                        <div className="ml-2">
                          {achievement.unlocked ? (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <Trophy className="w-3 h-3 mr-1" />
                              Unlocked
                            </Badge>
                          ) : (
                            <Badge className={cn("text-xs text-white", rarityColors[achievement.rarity])}>
                              {achievement.rarity}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-1">
                            <CategoryIcon className="w-4 h-4" />
                            <span className="capitalize font-medium">{achievement.category}</span>
                          </span>
                          <span className="font-bold">
                            {achievement.progress} / {achievement.maxProgress}
                          </span>
                        </div>
                        
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="h-3"
                        />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {achievement.unlocked ? `Unlocked ${achievement.unlockedAt}` : 
                             `${achievement.maxProgress - achievement.progress} more to unlock`}
                          </span>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-yellow-600">{achievement.points} XP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Daily Challenges */}
      <Card className="paper-card p-6 border border-bamboo/20 bg-gradient-to-br from-bamboo/5 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-bamboo rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">Daily Challenges</h3>
            <p className="text-sm text-muted-foreground">Complete tasks to earn extra XP</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { task: 'Create 3 new knowledge connections', progress: 2, max: 3, xp: 100 },
            { task: 'Add 5 bookmarks to your collection', progress: 3, max: 5, xp: 75 },
            { task: 'Write 1 insight or reflection', progress: 0, max: 1, xp: 150 }
          ].map((challenge, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-bamboo/10 hover:bg-white/80 transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-sm text-ink">{challenge.task}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Progress 
                    value={(challenge.progress / challenge.max) * 100}
                    className="flex-1 h-3"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {challenge.progress}/{challenge.max}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-6 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-200">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-600">{challenge.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}