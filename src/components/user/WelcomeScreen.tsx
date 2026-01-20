import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Calendar, 
  Target, 
  Flame, 
  Award, 
  BookOpen,
  Brain,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WelcomeScreenProps {
  userName?: string;
  className?: string;
}

export function WelcomeScreen({ 
  userName = "Knowledge Seeker", 
  className 
}: WelcomeScreenProps) {
  const currentHour = new Date().getHours();
  
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getTimeBasedEmoji = () => {
    if (currentHour < 6) return "🌙";
    if (currentHour < 12) return "☀️";
    if (currentHour < 17) return "🌤️";
    return "🌅";
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Mock data - in real app this would come from Supabase
  const streak = 7;
  const dailyGoal = 5;
  const completed = 3;
  const weeklyXP = 1420;
  const level = 12;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Welcome Header */}
      <Card variant="elevated" className="p-5 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                {getGreeting()} <span className="text-xl">{getTimeBasedEmoji()}</span>
              </h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {today}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center bg-destructive/10 rounded-xl px-3 py-2">
            <div className="flex items-center gap-1 text-destructive">
              <Flame className="w-5 h-5" />
              <span className="text-lg font-bold">{streak}</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">streak</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-muted-foreground">Daily Goal</span>
            <span className="text-xs font-semibold text-foreground">{completed}/{dailyGoal}</span>
          </div>
          <Progress value={(completed / dailyGoal) * 100} className="h-2" />
        </div>

        {/* Level & XP */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <Badge variant="secondary" className="text-xs font-medium">
            <Award className="w-3 h-3 mr-1" />
            Level {level}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            <span>{weeklyXP} XP this week</span>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card variant="outlined" className="p-3 text-center">
          <div className="text-2xl font-bold text-foreground">247</div>
          <div className="text-[10px] text-muted-foreground font-medium">Saved</div>
        </Card>
        <Card variant="outlined" className="p-3 text-center">
          <div className="text-2xl font-bold text-foreground">18</div>
          <div className="text-[10px] text-muted-foreground font-medium">Collections</div>
        </Card>
        <Card variant="outlined" className="p-3 text-center">
          <div className="text-2xl font-bold text-foreground">34</div>
          <div className="text-[10px] text-muted-foreground font-medium">Actions</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="default" className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <Link to="/add">
            <Button 
              variant="tonal" 
              className="w-full h-auto flex flex-col gap-1.5 py-3"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px]">Add</span>
            </Button>
          </Link>
          
          <Link to="/knowledge">
            <Button 
              variant="tonal" 
              className="w-full h-auto flex flex-col gap-1.5 py-3"
            >
              <Brain className="w-5 h-5" />
              <span className="text-[10px]">Actions</span>
            </Button>
          </Link>
          
          <Button 
            variant="tonal" 
            className="w-full h-auto flex flex-col gap-1.5 py-3"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px]">Analytics</span>
          </Button>
        </div>
      </Card>

      {/* Today's Focus */}
      <Card variant="default" className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Today's Focus
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Review AI Research Papers</p>
              <p className="text-xs text-muted-foreground">3 articles saved yesterday</p>
            </div>
            <Badge variant="outline" className="text-[10px] shrink-0">Priority</Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Complete Learning Path</p>
              <p className="text-xs text-muted-foreground">Machine Learning Basics (2/5)</p>
            </div>
            <Progress value={40} className="w-12 h-1.5" />
          </div>
        </div>
      </Card>
    </div>
  );
}