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
    <div className={`space-y-6 ${className}`}>
      {/* Welcome Header */}
      <Card className="paper-card-floating p-6 bg-gradient-to-br from-sakura/20 to-washi overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-sakura opacity-10 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-ink rounded-2xl flex items-center justify-center text-3xl seal-stamp shadow-paper">
              🧠
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                {getGreeting()}, {userName}! <span className="text-2xl">{getTimeBasedEmoji()}</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{today}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center bg-white/80 rounded-xl px-3 py-2 shadow-sm">
            <div className="flex items-center gap-1 text-orange-500 mb-1">
              <Flame className="w-6 h-6" />
              <span className="text-xl font-bold">{streak}</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">day streak</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-ink">Daily Learning Goal</span>
            <span className="text-sm font-bold text-ink">{completed}/{dailyGoal}</span>
          </div>
          <Progress value={(completed / dailyGoal) * 100} className="h-3" />
        </div>

        {/* Level & XP */}
        <div className="flex items-center justify-between relative z-10">
          <Badge variant="secondary" className="text-xs bg-gradient-ink text-white px-3 py-1">
            <Award className="w-4 h-4 mr-1" />
            Level {level}
          </Badge>
          <div className="flex items-center gap-1.5 text-sm font-medium text-ink">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>{weeklyXP} XP this week</span>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="paper-card p-4 text-center hover:shadow-paper transition-shadow">
          <div className="text-3xl font-bold text-ink mb-1">247</div>
          <div className="text-xs text-muted-foreground font-medium">Saved Items</div>
        </Card>
        <Card className="paper-card p-4 text-center hover:shadow-paper transition-shadow">
          <div className="text-3xl font-bold text-ink mb-1">18</div>
          <div className="text-xs text-muted-foreground font-medium">Collections</div>
        </Card>
        <Card className="paper-card p-4 text-center hover:shadow-paper transition-shadow">
          <div className="text-3xl font-bold text-ink mb-1">34</div>
          <div className="text-xs text-muted-foreground font-medium">Actions Done</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="paper-card p-4">
        <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-bamboo" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/add">
            <Button 
              variant="outline" 
              className="w-full h-12 flex flex-col gap-1 border-bamboo text-bamboo hover:bg-washi"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Add Content</span>
            </Button>
          </Link>
          
          <Link to="/knowledge">
            <Button 
              variant="outline" 
              className="w-full h-12 flex flex-col gap-1 border-bamboo text-bamboo hover:bg-washi"
            >
              <Brain className="w-5 h-5" />
              <span className="text-xs">Smart Actions</span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="w-full h-12 flex flex-col gap-1 border-bamboo text-bamboo hover:bg-washi"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Analytics</span>
          </Button>
        </div>
      </Card>

      {/* Today's Focus */}
      <Card className="paper-card p-4">
        <h3 className="text-lg font-semibold text-ink mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-bamboo" />
          Today's Focus
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-washi rounded-lg">
            <div className="w-8 h-8 bg-gradient-sakura rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-seal" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">Review AI Research Papers</p>
              <p className="text-xs text-muted-foreground">3 articles saved yesterday</p>
            </div>
            <Badge variant="outline" className="text-xs">Priority</Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-washi rounded-lg">
            <div className="w-8 h-8 bg-gradient-ink rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">Complete Learning Path</p>
              <p className="text-xs text-muted-foreground">Machine Learning Basics (2/5)</p>
            </div>
            <Progress value={40} className="w-16 h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
}