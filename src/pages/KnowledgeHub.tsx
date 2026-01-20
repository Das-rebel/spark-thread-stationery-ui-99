import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      <div className="min-h-screen pb-20 md:pb-8 safe-area-inset-bottom">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/98 backdrop-blur-xl border-b border-border/30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Knowledge Hub</h1>
                <p className="text-xs text-muted-foreground">AI learning companion</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={() => setShowOnboarding(true)} 
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Platform Integration */}
          <div className="px-4 pb-3">
            <PlatformIntegrationSimple />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 md:p-4 space-y-4">
          {/* Quick Stats */}
          <QuickStats />

          {/* Categorized Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            {/* Primary Category Cards - Only show on overview */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-3 gap-2">
                {/* Discover Category */}
                <motion.div 
                  whileTap={{ scale: 0.97 }}
                  className="bg-card border border-border/50 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all" 
                  onClick={() => handleTabClick("discovery", "discover-card")}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Discover</h3>
                      <p className="text-[10px] text-muted-foreground hidden md:block">Smart insights</p>
                    </div>
                  </div>
                </motion.div>

                {/* Create Category */}
                <motion.div 
                  whileTap={{ scale: 0.97 }}
                  className="bg-card border border-border/50 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all" 
                  onClick={() => handleTabClick("workflows", "create-card")}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Create</h3>
                      <p className="text-[10px] text-muted-foreground hidden md:block">Automate</p>
                    </div>
                  </div>
                </motion.div>

                {/* Analyze Category */}
                <motion.div 
                  whileTap={{ scale: 0.97 }}
                  className="bg-card border border-border/50 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all" 
                  onClick={() => handleTabClick("analytics", "analyze-card")}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Analyze</h3>
                      <p className="text-[10px] text-muted-foreground hidden md:block">Track trends</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Progress Section - Always visible on overview */}
            {activeTab === "overview" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border/50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Trophy className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground">Learning Progress</h3>
                      <p className="text-xs text-muted-foreground hidden md:block">Track your achievements</p>
                    </div>
                  </div>
                  <Button 
                    variant="tonal" 
                    size="sm" 
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("achievements", "progress-button");
                    }}
                  >
                    View
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                <WelcomeScreen />
              </div>
            </TabsContent>

            {/* Discovery Tab */}
            <TabsContent value="discovery" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon-sm" 
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick("overview", "back-button");
                    }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-base font-semibold text-foreground">Smart Discovery</h2>
                </div>
                <SmartDiscovery />
              </motion.div>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabClick("overview", "back-button");
                  }}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-base font-semibold text-foreground">Neural Search</h2>
                </div>
                <EnhancedSearch />
              </div>
            </TabsContent>

            {/* Workflows Tab */}
            <TabsContent value="workflows" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabClick("overview", "back-button");
                  }}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-base font-semibold text-foreground">Workflow Automation</h2>
                </div>
                <WorkflowAutomation />
              </div>
            </TabsContent>

            {/* Actionables Tab */}
            <TabsContent value="actionables" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabClick("overview", "back-button");
                  }}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-base font-semibold text-foreground">Smart Actionables</h2>
                </div>
                <SmartActionables />
              </div>
            </TabsContent>

            {/* Collections Tab */}
            <TabsContent value="collections" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabClick("overview", "back-button");
                  }}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-base font-semibold text-foreground">Enhanced Collections</h2>
                </div>
                <EnhancedCollections />
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabClick("overview", "back-button");
                  }}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-base font-semibold text-foreground">Learning Analytics</h2>
                </div>
                <LearningAnalytics />
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabClick("overview", "back-button");
                  }}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-base font-semibold text-foreground">Progress & Achievements</h2>
                </div>
                <GamificationHub />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>;
}