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
import { ArrowLeft, ArrowRight, BarChart3, Bot, Brain, FolderOpen, Home, MessageSquare, Network, Search, Settings, Sparkles, Target, TrendingUp, Trophy, Zap } from "lucide-react";
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
    console.log('🔥 Click detected:', {
      tab,
      source,
      timestamp: new Date().toISOString()
    });
    setActiveTab(tab);
  };
  return <AppLayout>
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
            <Button variant="ghost" size="sm" onClick={() => setShowOnboarding(true)} className="p-2">
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
            {activeTab === "overview" && <div className="grid grid-cols-3 gap-3">
                {/* Discover Category */}
                <div className="paper-card p-4 hover:shadow-paper transition-all cursor-pointer" onClick={() => handleTabClick("discovery", "discover-card")}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink mb-1">Discover</h3>
                      <p className="text-xs text-muted-foreground">Smart AI insights</p>
                    </div>
                  </div>
                </div>

                {/* Create Category */}
                <div className="paper-card p-4 hover:shadow-paper transition-all cursor-pointer" onClick={() => handleTabClick("workflows", "create-card")}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink mb-1">Create</h3>
                      <p className="text-xs text-muted-foreground">Automate flows</p>
                    </div>
                  </div>
                </div>

                {/* Analyze Category */}
                <div className="paper-card p-4 hover:shadow-paper transition-all cursor-pointer" onClick={() => handleTabClick("analytics", "analyze-card")}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink mb-1">Analyze</h3>
                      <p className="text-xs text-muted-foreground">Track trends</p>
                    </div>
                  </div>
                </div>
              </div>}

            {/* Progress Section - Always visible on overview */}
            {activeTab === "overview" && <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-ink">Learning Progress</h3>
                      <p className="text-sm text-muted-foreground">Track your achievements</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleTabClick("achievements", "progress-button");
              }} className="interactive-button shrink-0">
                    View Progress
                  </Button>
                </div>
              </div>}

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
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick("overview", "back-button");
                }} className="interactive-button p-1">
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
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick("overview", "back-button");
                }} className="interactive-button p-1">
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
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick("overview", "back-button");
                }} className="interactive-button p-1">
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
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick("overview", "back-button");
                }} className="interactive-button p-1">
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
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick("overview", "back-button");
                }} className="interactive-button p-1">
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
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick("overview", "back-button");
                }} className="interactive-button p-1">
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
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick("overview", "back-button");
                }} className="interactive-button p-1">
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
    </AppLayout>;
}