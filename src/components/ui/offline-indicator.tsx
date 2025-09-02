import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { Card } from './card';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineBanner(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <Card className={cn(
        "paper-card mx-auto max-w-md transition-all duration-300",
        "bg-destructive/10 border-destructive/20"
      )}>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                You're offline
              </p>
              <p className="text-xs text-muted-foreground">
                Some features may be limited
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowOfflineBanner(false)}
            className="text-destructive"
          >
            ×
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-1">
      {isOnline ? (
        <Wifi className="w-4 h-4 text-bamboo" />
      ) : (
        <WifiOff className="w-4 h-4 text-destructive" />
      )}
      <span className={cn(
        "text-xs",
        isOnline ? "text-bamboo" : "text-destructive"
      )}>
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}