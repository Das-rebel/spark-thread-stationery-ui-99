
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
        <header className="sticky top-0 z-10 bg-gradient-to-br from-washi to-background/95 backdrop-blur-sm border-b">
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
              onClick={() => navigate('/add')}
              className="bg-gradient-sakura text-white hover:shadow-floating focus-ring"
              size="sm"
              aria-label="Add new content"
            >
              <Plus className="w-4 h-4" />
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
              className="h-16 bg-gradient-bamboo text-white hover:shadow-floating flex flex-col gap-1 focus-ring"
              aria-label="Search your knowledge base"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm">Search Knowledge</span>
            </Button>
            <Button 
              onClick={() => navigate('/add')}
              className="h-16 bg-gradient-seal text-white hover:shadow-floating flex flex-col gap-1 focus-ring"
              aria-label="Add new content to your knowledge base"
            >
              <Zap className="w-5 h-5" />
              <span className="text-sm">Add Content</span>
            </Button>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default Index;
