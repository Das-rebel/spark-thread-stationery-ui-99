import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft, Sparkles, Brain, Zap, Target } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to Brain Spark',
    description: 'Your AI-powered knowledge management system. Capture, organize, and recall everything that matters.',
    icon: Sparkles,
    color: 'from-sakura to-bamboo'
  },
  {
    title: 'Smart Capture',
    description: 'Save content from Twitter, web clips, and messages. Our AI automatically organizes and tags everything.',
    icon: Brain,
    color: 'from-bamboo to-primary'
  },
  {
    title: 'Intelligent Search',
    description: 'Find anything instantly with semantic search. Ask questions in natural language.',
    icon: Zap,
    color: 'from-primary to-seal'
  },
  {
    title: 'Take Action',
    description: 'Get AI-powered insights, summaries, and actionable tasks from your saved content.',
    icon: Target,
    color: 'from-seal to-sakura'
  }
];

export function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = steps[currentStep];
  const IconComponent = step.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <Card className="paper-card max-w-md w-full p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="absolute top-4 right-4"
              aria-label="Skip onboarding"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="text-center space-y-6">
              <motion.div
                key={currentStep}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-elegant`}
              >
                <IconComponent className="w-10 h-10 text-white" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-ink">{step.title}</h2>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-primary w-8'
                        : 'bg-muted hover:bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1 gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  className={`gap-2 ${currentStep === 0 ? 'flex-1' : 'flex-1'}`}
                >
                  {currentStep === steps.length - 1 ? (
                    'Get Started'
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                {currentStep + 1} of {steps.length}
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
