
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
      <div className="min-h-screen pb-20 safe-area-inset-bottom">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card/98 backdrop-blur-xl border-b border-border/30">
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
              onClick={() => navigate('/add')}
              variant="tonal"
              size="icon"
              aria-label="Add new content"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Platform Integration */}
          <div className="px-4 pb-3">
            <PlatformIntegrationSimple />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 space-y-4 pb-safe">
          {/* Quick Stats */}
          <QuickStats />

          {/* Welcome Screen */}
          <WelcomeScreen />

          {/* Feature Categories */}
          <FeatureCategories onCategorySelect={handleCategorySelect} />

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => navigate('/knowledge')}
              variant="tonal"
              className="h-20 flex flex-col gap-2"
              aria-label="Search your knowledge base"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs font-medium">Search Knowledge</span>
            </Button>
            <Button 
              onClick={() => navigate('/add')}
              variant="tonal"
              className="h-20 flex flex-col gap-2"
              aria-label="Add new content to your knowledge base"
            >
              <Zap className="w-5 h-5" />
              <span className="text-xs font-medium">Add Content</span>
            </Button>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default Index;
