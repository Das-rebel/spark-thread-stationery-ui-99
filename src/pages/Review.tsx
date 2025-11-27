import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  ArrowLeft, 
  RotateCcw, 
  Eye, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Trophy,
  Flame,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Review() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [todayReviews, setTodayReviews] = useState(0);
  const [streak, setStreak] = useState(7);

  const reviewCards = [
    {
      id: 1,
      question: 'What are the three main types of machine learning?',
      answer: 'The three main types are:\n1. **Supervised Learning** - Learning with labeled data\n2. **Unsupervised Learning** - Finding patterns in unlabeled data\n3. **Reinforcement Learning** - Learning through rewards and actions',
      source: 'ML Fundamentals Guide',
      type: 'definition',
      difficulty: 'easy',
      nextReview: '2024-01-20',
      interval: 3
    },
    {
      id: 2,
      question: 'Explain the concept of overfitting in machine learning.',
      answer: 'Overfitting occurs when a model learns the training data too well, including noise and irrelevant patterns. This results in poor performance on new, unseen data. Signs include high training accuracy but low validation accuracy.',
      source: 'Deep Learning Research Paper',
      type: 'concept',
      difficulty: 'medium',
      nextReview: '2024-01-22',
      interval: 7
    },
    {
      id: 3,
      question: 'What is the primary goal of unsupervised learning?',
      answer: 'The primary goal is to discover hidden patterns, structures, or relationships in data without using labeled examples. Common tasks include clustering, dimensionality reduction, and anomaly detection.',
      source: 'AI Ethics Discussion',
      type: 'application',
      difficulty: 'medium',
      nextReview: '2024-01-25',
      interval: 14
    }
  ];

  const currentCard = reviewCards[currentCardIndex];
  const progress = ((currentCardIndex + (showAnswer ? 0.5 : 0)) / reviewCards.length) * 100;

  const handleGrade = (grade: 'hard' | 'good' | 'easy') => {
    setTodayReviews(prev => prev + 1);
    
    if (currentCardIndex < reviewCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Review session complete
      console.log('Review session completed!');
    }
  };

  const resetCard = () => {
    setShowAnswer(false);
  };

  const difficultyColors = {
    easy: 'text-bamboo bg-bamboo/10',
    medium: 'text-gold bg-gold/10',
    hard: 'text-destructive bg-destructive/10'
  };

  const typeIcons = {
    definition: '📝',
    concept: '🧠',
    application: '⚡'
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-washi/30">
        {/* Header with Stats */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Knowledge Hub
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Flame className="w-4 h-4 text-accent" />
                  <span className="font-medium">{streak}</span>
                  <span className="text-muted-foreground">day streak</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium">{todayReviews}</span>
                  <span className="text-muted-foreground">reviewed today</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">Daily Review Progress</span>
                <span className="text-muted-foreground">{currentCardIndex + 1} of {reviewCards.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Review Card */}
        <div className="p-4 max-w-2xl mx-auto">
          <Card className="paper-card-floating min-h-[500px] relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-sakura rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-ink">Active Recall</CardTitle>
                    <p className="text-sm text-muted-foreground">Review #{currentCardIndex + 1}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-xs", difficultyColors[currentCard.difficulty])}>
                    {currentCard.difficulty}
                  </Badge>
                  <span className="text-lg">{typeIcons[currentCard.type]}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Question */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>From: {currentCard.source}</span>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-ink leading-relaxed">
                    {currentCard.question}
                  </h3>
                </div>
              </div>

              {/* Answer (revealed) */}
              {showAnswer && (
                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-bamboo" />
                    <span>Answer revealed</span>
                  </div>
                  <div className="bg-bamboo/10 border border-bamboo/20 p-4 rounded-lg">
                    <div className="prose prose-sm max-w-none">
                      <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                        {currentCard.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                {!showAnswer ? (
                  <div className="space-y-3">
                    <Button
                      variant="sakura"
                      size="lg"
                      onClick={() => setShowAnswer(true)}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetCard}
                      className="w-full"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Card
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-center text-muted-foreground mb-3">
                      How well did you know this?
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleGrade('hard')}
                        className="flex flex-col items-center gap-1 h-16 border-destructive/20 hover:bg-destructive/10"
                      >
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-xs">Hard</span>
                        <span className="text-xs text-muted-foreground">1 day</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleGrade('good')}
                        className="flex flex-col items-center gap-1 h-16 border-gold/20 hover:bg-gold/10"
                      >
                        <AlertCircle className="w-4 h-4 text-gold" />
                        <span className="text-xs">Good</span>
                        <span className="text-xs text-muted-foreground">3 days</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleGrade('easy')}
                        className="flex flex-col items-center gap-1 h-16 border-bamboo/20 hover:bg-bamboo/10"
                      >
                        <Trophy className="w-4 h-4 text-bamboo" />
                        <span className="text-xs">Easy</span>
                        <span className="text-xs text-muted-foreground">7 days</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session Complete */}
          {currentCardIndex >= reviewCards.length - 1 && showAnswer && (
            <Card className="mt-4 paper-card bg-bamboo/10 border-bamboo/20">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-bamboo rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground">Session Complete!</h3>
                <p className="text-sm text-muted-foreground">
                  Great job! You've completed today's review session.
                </p>
                <Button variant="sakura" className="mt-4">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}