import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  Github, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Zap,
  BookOpen,
  Users
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const steps = [
    {
      title: "Welcome to Knowledge Hub",
      subtitle: "Your AI-powered learning companion",
      content: "WelcomeStep"
    },
    {
      title: "Connect Your Accounts",
      subtitle: "Import bookmarks from everywhere",
      content: "AccountConnection"
    },
    {
      title: "You're All Set!",
      subtitle: "Start exploring your knowledge",
      content: "CompletionStep"
    }
  ];

  const connectAccount = (provider: string) => {
    if (!connectedAccounts.includes(provider)) {
      setConnectedAccounts([...connectedAccounts, provider]);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const WelcomeStep = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-gradient-sakura rounded-full flex items-center justify-center mx-auto">
        <BookOpen className="w-12 h-12 text-white" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-ink">Welcome to Knowledge Hub</h2>
        <p className="text-muted-foreground text-sm">
          Your personal AI assistant that learns from everything you save. 
          Let's get you started in just 2 minutes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-washi rounded-lg">
          <Zap className="w-6 h-6 text-gold mb-2" />
          <h3 className="font-semibold text-sm text-ink">Smart Search</h3>
          <p className="text-xs text-muted-foreground">Find anything with AI</p>
        </div>
        <div className="p-4 bg-washi rounded-lg">
          <Users className="w-6 h-6 text-bamboo mb-2" />
          <h3 className="font-semibold text-sm text-ink">Auto-Organize</h3>
          <p className="text-xs text-muted-foreground">Smart collections</p>
        </div>
      </div>

      <Button onClick={nextStep} className="w-full bg-gradient-sakura text-white">
        Get Started
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const AccountConnection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-ink mb-2">Connect Your Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Choose which platforms to sync with your Knowledge Hub
        </p>
      </div>

      <div className="space-y-3">
        {/* Gmail */}
        <Card className="p-4 paper-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-ink">Gmail</h4>
                <p className="text-xs text-muted-foreground">Sync newsletters & articles</p>
              </div>
            </div>
            <Button
              variant={connectedAccounts.includes('gmail') ? "default" : "outline"}
              size="sm"
              onClick={() => connectAccount('gmail')}
              className={connectedAccounts.includes('gmail') ? "bg-green-500 text-white" : ""}
            >
              {connectedAccounts.includes('gmail') ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Connected
                </>
              ) : (
                'Connect'
              )}
            </Button>
          </div>
        </Card>

        {/* GitHub */}
        <Card className="p-4 paper-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-ink">GitHub</h4>
                <p className="text-xs text-muted-foreground">Import starred repos</p>
              </div>
            </div>
            <Button
              variant={connectedAccounts.includes('github') ? "default" : "outline"}
              size="sm"
              onClick={() => connectAccount('github')}
              className={connectedAccounts.includes('github') ? "bg-green-500 text-white" : ""}
            >
              {connectedAccounts.includes('github') ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Connected
                </>
              ) : (
                'Connect'
              )}
            </Button>
          </div>
        </Card>

        {/* Additional platforms - compact view */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Twitter', icon: '🐦', id: 'twitter' },
            { name: 'YouTube', icon: '📺', id: 'youtube' },
            { name: 'LinkedIn', icon: '💼', id: 'linkedin' },
            { name: 'Reddit', icon: '🔴', id: 'reddit' }
          ].map((platform) => (
            <Button
              key={platform.id}
              variant="outline"
              size="sm"
              onClick={() => connectAccount(platform.id)}
              className={`flex items-center gap-2 ${
                connectedAccounts.includes(platform.id) ? 'bg-green-50 border-green-300' : ''
              }`}
            >
              <span className="text-sm">{platform.icon}</span>
              <span className="text-xs">{platform.name}</span>
              {connectedAccounts.includes(platform.id) && (
                <CheckCircle2 className="w-3 h-3 text-green-600" />
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
        <Shield className="w-4 h-4 text-blue-600" />
        <p className="text-xs text-blue-800">
          We only read your bookmarks and saved content. Your data stays private.
        </p>
      </div>

      <Button 
        onClick={nextStep} 
        className="w-full bg-gradient-sakura text-white"
        disabled={connectedAccounts.length === 0}
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const CompletionStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-ink">You're All Set!</h2>
        <p className="text-sm text-muted-foreground">
          Connected {connectedAccounts.length} platforms. We're importing your bookmarks now.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Setting up your hub...</span>
          <span className="font-medium">85%</span>
        </div>
        <Progress value={85} className="h-2" />
      </div>

      <Button onClick={onComplete} className="w-full bg-gradient-sakura text-white">
        Start Exploring
      </Button>
    </div>
  );

  const getCurrentStepContent = () => {
    switch (steps[currentStep].content) {
      case "WelcomeStep":
        return <WelcomeStep />;
      case "AccountConnection":
        return <AccountConnection />;
      case "CompletionStep":
        return <CompletionStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-washi to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md paper-card p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Badge variant="outline" className="text-xs">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </Badge>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-1" />
        </div>

        {getCurrentStepContent()}
      </Card>
    </div>
  );
}