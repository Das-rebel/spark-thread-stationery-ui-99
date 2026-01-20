import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, Brain, RefreshCw, CheckCircle, XCircle, Clock, Twitter, MessageSquare, Globe, Settings, Info, Network, Home, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { NetworkStatus } from "@/components/ui/offline-indicator";
import { useAccessibilityAnnouncer } from "@/components/ui/accessibility-announcer";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface Source {
  id: string;
  name: string;
  icon: React.ElementType;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  count: number;
  color: string;
}

const sources: Source[] = [
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    status: 'connected',
    lastSync: '2 mins ago',
    count: 1247,
    color: 'text-blue-500'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageSquare,
    status: 'syncing',
    lastSync: 'Syncing...',
    count: 89,
    color: 'text-green-500'
  },
  {
    id: 'web',
    name: 'Web Clips',
    icon: Globe,
    status: 'disconnected',
    lastSync: '1 hour ago',
    count: 324,
    color: 'text-purple-500'
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const { announceMessage } = useAccessibilityAnnouncer();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    setIsMenuOpen(false);
  };

  const handleRefresh = async (sourceId: string) => {
    setRefreshing(sourceId);
    const sourceName = sources.find(s => s.id === sourceId)?.name || sourceId;
    announceMessage(`Refreshing ${sourceName}...`);
    
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 2000));
      announceMessage(`${sourceName} refreshed successfully`);
    } catch (error) {
      announceMessage(`Failed to refresh ${sourceName}`);
    } finally {
      setRefreshing(null);
    }
  };

  const getStatusIcon = (status: Source['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-bamboo" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'syncing':
        return <Clock className="w-4 h-4 text-primary animate-pulse" />;
    }
  };

  const getStatusBadge = (status: Source['status']) => {
    const variants = {
      connected: 'bg-green-500/10 text-green-600 border-green-500/20',
      disconnected: 'bg-red-500/10 text-red-600 border-red-500/20',
      syncing: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
    };
    
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-xl border-b border-border/30" role="banner">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 focus-ring rounded-lg p-1 -m-1"
          aria-label="Brain Spark Home"
        >
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-base text-foreground">Brain Spark</span>
        </Link>

        {/* Network Status */}
        <NetworkStatus />

        {/* Hamburger Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-80 p-0 bg-card">
            <SheetHeader className="p-5 border-b border-border/50">
              <SheetTitle className="flex items-center gap-2 text-base font-semibold">
                <Settings className="w-4 h-4 text-primary" />
                Sources & Settings
              </SheetTitle>
            </SheetHeader>

            <div className="p-5 space-y-6">
              {/* Sources Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Data Sources</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      sources.forEach(source => handleRefresh(source.id));
                    }}
                    className="text-xs h-7"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Sync All
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {sources.map((source) => (
                    <Card key={source.id} variant="outlined" className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <source.icon className="w-4 h-4 text-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{source.name}</span>
                              {getStatusIcon(source.status)}
                            </div>
                            <p className="text-xs text-muted-foreground">{source.lastSync} • {source.count} items</p>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRefresh(source.id)}
                          disabled={refreshing === source.id}
                        >
                          <RefreshCw 
                            className={`w-3.5 h-3.5 ${refreshing === source.id ? 'animate-spin' : ''}`} 
                          />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Navigation</h3>
                <div className="space-y-1">
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm h-9">
                      <Home className="w-4 h-4" />
                      Home
                    </Button>
                  </Link>
                  <Link to="/knowledge" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm h-9">
                      <Network className="w-4 h-4" />
                      Knowledge Hub
                    </Button>
                  </Link>
                  <Link to="/twitter" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm h-9">
                      <Twitter className="w-4 h-4" />
                      Social Feed
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Settings Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Settings</h3>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start gap-3 text-sm h-9">
                    <Settings className="w-4 h-4" />
                    General Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 text-sm h-9">
                    <Brain className="w-4 h-4" />
                    AI Training
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 text-sm h-9">
                    <Info className="w-4 h-4" />
                    About
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 text-sm h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}