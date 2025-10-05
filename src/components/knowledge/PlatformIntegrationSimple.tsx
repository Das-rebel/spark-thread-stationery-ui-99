import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';

export function PlatformIntegrationSimple() {
  const connectedPlatforms = [
    { name: 'Gmail', icon: '📧', status: 'connected', color: 'bg-red-500' },
    { name: 'GitHub', icon: '🐱', status: 'connected', color: 'bg-gray-800' },
    { name: 'Twitter', icon: '🐦', status: 'syncing', color: 'bg-blue-500' },
    { name: 'YouTube', icon: '📺', status: 'connected', color: 'bg-red-600' },
  ];

  const availablePlatforms = [
    { name: 'LinkedIn', icon: '💼' },
    { name: 'Reddit', icon: '🔴' },
    { name: 'Medium', icon: '📝' },
  ];

  return (
    <Card className="paper-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-ink">Connected Platforms</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {connectedPlatforms.length} Active
        </Badge>
      </div>

      {/* Connected platforms - horizontal scroll for mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {connectedPlatforms.map((platform) => (
          <div 
            key={platform.name}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-washi rounded-lg min-w-fit hover:shadow-sm transition-shadow"
          >
            <div className={`w-7 h-7 ${platform.color} rounded-lg flex items-center justify-center text-sm shadow-sm`}>
              {platform.icon}
            </div>
            <span className="text-sm font-medium text-ink whitespace-nowrap">{platform.name}</span>
            {platform.status === 'connected' ? (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            ) : (
              <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {/* Add more platforms */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground mb-2">Add more platforms:</p>
        <div className="flex flex-wrap gap-2">
          {availablePlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 hover:bg-washi transition-colors"
            >
              <span className="text-sm">{platform.icon}</span>
              <span className="text-xs font-medium">{platform.name}</span>
              <Plus className="w-3 h-3" />
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}