
import { AppLayout } from "@/components/layout/AppLayout";
import { WelcomeScreen } from "@/components/user/WelcomeScreen";
import { QuickStats } from "@/components/knowledge/QuickStats";
import { FeatureCategories } from "@/components/knowledge/FeatureCategories";
import { PlatformIntegrationSimple } from "@/components/knowledge/PlatformIntegrationSimple";
import { Button } from "@/components/ui/button";
import { Brain, Plus, Search, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    switch (category) {
      case 'search':
        navigate('/knowledge');
        break;
      case 'collections':
        navigate('/knowledge');
        break;
      case 'actionables':
        navigate('/knowledge');
        break;
      default:
        navigate('/knowledge');
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen pb-8 safe-area-inset-bottom">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gradient-to-br from-washi via-background/98 to-background/95 backdrop-blur-md border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-sakura rounded-xl flex items-center justify-center shadow-paper">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ink">Knowledge Hub</h1>
                <p className="text-xs text-muted-foreground font-medium">AI learning companion</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/add')}
              className="bg-gradient-sakura text-white hover:shadow-floating focus-ring shadow-sm"
              size="sm"
              aria-label="Add new content"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Platform Integration */}
          <div className="px-4 pb-4">
            <PlatformIntegrationSimple />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 space-y-6">
          {/* Quick Stats */}
          <QuickStats />

          {/* Welcome Screen */}
          <WelcomeScreen />

          {/* Feature Categories */}
          <FeatureCategories onCategorySelect={handleCategorySelect} />

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => navigate('/knowledge')}
              className="h-20 bg-gradient-bamboo text-white hover:shadow-floating flex flex-col gap-2 focus-ring transition-all hover:scale-[1.02] shadow-sm"
              aria-label="Search your knowledge base"
            >
              <Search className="w-6 h-6" />
              <span className="text-sm font-semibold">Search Knowledge</span>
            </Button>
            <Button 
              onClick={() => navigate('/add')}
              className="h-20 bg-gradient-seal text-white hover:shadow-floating flex flex-col gap-2 focus-ring transition-all hover:scale-[1.02] shadow-sm"
              aria-label="Add new content to your knowledge base"
            >
              <Zap className="w-6 h-6" />
              <span className="text-sm font-semibold">Add Content</span>
            </Button>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default Index;
