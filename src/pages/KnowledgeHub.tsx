
import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIChat } from "@/components/knowledge/AIChat";
import { WelcomeScreen } from "@/components/user/WelcomeScreen";
import { SmartActionables } from "@/components/knowledge/SmartActionables";
import { EnhancedCollections } from "@/components/knowledge/EnhancedCollections";
import { EnhancedSearch } from "@/components/knowledge/EnhancedSearch";
import { SmartDiscovery } from "@/components/knowledge/SmartDiscovery";
import { WorkflowAutomation } from "@/components/knowledge/WorkflowAutomation";
import { LearningAnalytics } from "@/components/knowledge/LearningAnalytics";
import { GamificationHub } from "@/components/knowledge/GamificationHub";
import { OnboardingFlow } from "@/components/knowledge/OnboardingFlow";
import { PlatformIntegrationSimple } from "@/components/knowledge/PlatformIntegrationSimple";
import { FeatureCategories } from "@/components/knowledge/FeatureCategories";
import { QuickStats } from "@/components/knowledge/QuickStats";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  FolderOpen, 
  Home,
  MessageSquare,
  Network,
  Search, 
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap
} from "lucide-react";

export default function KnowledgeHub() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstTime] = useState(false);

  // Show onboarding for first-time users
  if (showOnboarding || isFirstTime) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  const handleCategorySelect = (category: string) => {
    console.log('🎯 Tab switching to:', category);
    setActiveTab(category);
  };

  // Enhanced click handler with feedback
  const handleTabClick = (tab: string, source: string) => {
    console.log('🔥 Click detected:', { tab, source, timestamp: new Date().toISOString() });
    setActiveTab(tab);
  };

  return (
    <AppLayout>
      <div className="min-h-screen pb-8 safe-area-inset-bottom">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-washi to-background/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-sakura rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ink">Knowledge Hub</h1>
                <p className="text-xs text-muted-foreground">AI learning companion</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowOnboarding(true)}
              className="p-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Platform Integration */}
          <div className="px-4 pb-4">
            <PlatformIntegrationSimple />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Quick Stats */}
          <QuickStats />

          {/* Categorized Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Primary Category Cards - Only show on overview */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Discover Category */}
                <div className="group category-card bg-gradient-to-br from-sakura/10 via-sakura/5 to-transparent border border-sakura/20 rounded-xl p-6 space-y-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                     onClick={() => handleTabClick("discovery", "discover-card")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-sakura rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-sakura/30 transition-all">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-ink">Discover</h3>
                        <p className="text-xs text-sakura/70 font-medium">AI insights & connections</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sakura/60 group-hover:text-sakura transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-center p-3 bg-white/50 rounded-lg border border-sakura/10">
                      <Brain className="w-5 h-5 text-sakura mx-auto mb-1" />
                      <span className="text-xs text-sakura/80 font-medium">Smart AI</span>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg border border-sakura/10">
                      <Network className="w-5 h-5 text-sakura mx-auto mb-1" />
                      <span className="text-xs text-sakura/80 font-medium">Connections</span>
                    </div>
                  </div>
                </div>

                {/* Create Category */}
                <div className="group category-card bg-gradient-to-br from-seal/10 via-seal/5 to-transparent border border-seal/20 rounded-xl p-6 space-y-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                     onClick={() => handleTabClick("workflows", "create-card")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-seal rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-seal/30 transition-all">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-ink">Create</h3>
                        <p className="text-xs text-seal/70 font-medium">Workflows & automation</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-seal/60 group-hover:text-seal transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-center p-3 bg-white/50 rounded-lg border border-seal/10">
                      <Bot className="w-5 h-5 text-seal mx-auto mb-1" />
                      <span className="text-xs text-seal/80 font-medium">Automate</span>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg border border-seal/10">
                      <Settings className="w-5 h-5 text-seal mx-auto mb-1" />
                      <span className="text-xs text-seal/80 font-medium">Organize</span>
                    </div>
                  </div>
                </div>

                {/* Analyze Category */}
                <div className="group category-card bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6 space-y-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                     onClick={() => handleTabClick("analytics", "analyze-card")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-all">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-ink">Analyze</h3>
                        <p className="text-xs text-primary/70 font-medium">Progress & insights</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary/60 group-hover:text-primary transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-center p-3 bg-white/50 rounded-lg border border-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-xs text-primary/80 font-medium">Trends</span>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg border border-primary/10">
                      <Target className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-xs text-primary/80 font-medium">Goals</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Section - Always visible on overview */}
            {activeTab === "overview" && (
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-ink">Learning Progress</h3>
                      <p className="text-sm text-muted-foreground">Track your achievements</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("achievements", "progress-button");
                    }}
                    className="interactive-button shrink-0"
                  >
                    View Progress
                  </Button>
                </div>
              </div>
            )}

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                <WelcomeScreen />
              </div>
            </TabsContent>

            {/* Discovery Tab */}
            <TabsContent value="discovery" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                    className="interactive-button p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Smart Discovery</h2>
                </div>
                <SmartDiscovery />
              </div>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                    className="interactive-button p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Neural Search</h2>
                </div>
                <EnhancedSearch />
              </div>
            </TabsContent>

            {/* Workflows Tab */}
            <TabsContent value="workflows" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                    className="interactive-button p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Workflow Automation</h2>
                </div>
                <WorkflowAutomation />
              </div>
            </TabsContent>


            {/* Actionables Tab */}
            <TabsContent value="actionables" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                    className="interactive-button p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Smart Actionables</h2>
                </div>
                <SmartActionables />
              </div>
            </TabsContent>

            {/* Collections Tab */}
            <TabsContent value="collections" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                    className="interactive-button p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Enhanced Collections</h2>
                </div>
                <EnhancedCollections />
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                    className="interactive-button p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Learning Analytics</h2>
                </div>
                <LearningAnalytics />
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                    className="interactive-button p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-ink">Progress & Achievements</h2>
                </div>
                <GamificationHub />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
