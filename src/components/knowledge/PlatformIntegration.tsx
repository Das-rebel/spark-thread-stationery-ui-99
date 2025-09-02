import React, { useState } from 'react';
import { 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Zap,
  Clock,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

/**
 * Platform Integration Component
 * 
 * This component manages multi-platform bookmark integration and displays
 * statistics for content saved from various platforms like Instagram, YouTube,
 * Twitter, LinkedIn, Reddit, etc.
 * 
 * Features:
 * - Platform-specific bookmark import and management
 * - Real-time sync status for each connected platform
 * - Platform analytics and content distribution insights
 * - Unified bookmark organization across all platforms
 * - Smart categorization based on platform content types
 */

interface Platform {
  id: string;
  name: string;
  icon: string; // Using emoji for simplicity in demo
  connected: boolean;
  bookmarkCount: number;
  lastSync: string;
  syncStatus: 'synced' | 'syncing' | 'error' | 'pending';
  contentTypes: string[];
  color: string;
  recentActivity: number; // bookmarks added in last 7 days
}

export function PlatformIntegration() {
  // Demo platforms with their connection status and metrics
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      connected: true,
      bookmarkCount: 89,
      lastSync: '2 minutes ago',
      syncStatus: 'synced',
      contentTypes: ['Threads', 'Tweets', 'Spaces'],
      color: 'bg-blue-500',
      recentActivity: 12
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '📺',
      connected: true,
      bookmarkCount: 34,
      lastSync: '5 minutes ago',
      syncStatus: 'synced',
      contentTypes: ['Videos', 'Playlists', 'Channels'],
      color: 'bg-red-500',
      recentActivity: 8
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      connected: true,
      bookmarkCount: 27,
      lastSync: '1 hour ago',
      syncStatus: 'synced',
      contentTypes: ['Articles', 'Posts', 'Documents'],
      color: 'bg-blue-600',
      recentActivity: 5
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      connected: false,
      bookmarkCount: 0,
      lastSync: 'Never',
      syncStatus: 'pending',
      contentTypes: ['Posts', 'Stories', 'Reels'],
      color: 'bg-pink-500',
      recentActivity: 0
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: '🔴',
      connected: true,
      bookmarkCount: 156,
      lastSync: '10 minutes ago',
      syncStatus: 'synced',
      contentTypes: ['Posts', 'Comments', 'Communities'],
      color: 'bg-orange-500',
      recentActivity: 23
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐱',
      connected: true,
      bookmarkCount: 45,
      lastSync: '30 minutes ago',
      syncStatus: 'synced',
      contentTypes: ['Repositories', 'Issues', 'Gists'],
      color: 'bg-gray-800',
      recentActivity: 7
    },
    {
      id: 'medium',
      name: 'Medium',
      icon: '📝',
      connected: false,
      bookmarkCount: 0,
      lastSync: 'Never',
      syncStatus: 'pending',
      contentTypes: ['Articles', 'Publications'],
      color: 'bg-green-600',
      recentActivity: 0
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      connected: false,
      bookmarkCount: 0,
      lastSync: 'Never',
      syncStatus: 'pending',
      contentTypes: ['Videos', 'Sounds', 'Effects'],
      color: 'bg-black',
      recentActivity: 0
    }
  ]);

  // Get status color for sync indicators
  const getStatusColor = (status: string) => {
    const colors = {
      synced: 'text-green-600 bg-green-50',
      syncing: 'text-blue-600 bg-blue-50',
      error: 'text-red-600 bg-red-50',
      pending: 'text-gray-600 bg-gray-50'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    const icons = {
      synced: CheckCircle2,
      syncing: Clock,
      error: AlertCircle,
      pending: Download
    };
    return icons[status as keyof typeof icons] || Download;
  };

  // Toggle platform connection
  const togglePlatformConnection = (platformId: string) => {
    setPlatforms(platforms.map(platform =>
      platform.id === platformId
        ? { 
            ...platform, 
            connected: !platform.connected,
            syncStatus: !platform.connected ? 'syncing' : 'pending'
          }
        : platform
    ));
  };

  const connectedPlatforms = platforms.filter(p => p.connected);
  const totalBookmarks = platforms.reduce((sum, p) => sum + p.bookmarkCount, 0);
  const recentActivity = platforms.reduce((sum, p) => sum + p.recentActivity, 0);

  return (
    <div className="space-y-6">
      {/* Platform Integration Overview */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Platform Integration</h2>
          <Badge variant="secondary" className="ml-auto">
            {connectedPlatforms.length}/{platforms.length} Connected
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Connect your favorite platforms to automatically import and organize bookmarks from multiple sources.
        </p>

        {/* Integration Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-primary">{totalBookmarks}</div>
            <div className="text-sm text-muted-foreground">Total Bookmarks</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-bamboo">{connectedPlatforms.length}</div>
            <div className="text-sm text-muted-foreground">Connected Platforms</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-gold">{recentActivity}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </div>
          <div className="text-center p-3 bg-washi rounded-lg">
            <div className="text-xl font-bold text-purple-600">12</div>
            <div className="text-sm text-muted-foreground">Auto-Synced</div>
          </div>
        </div>
      </Card>

      {/* Platform Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const StatusIcon = getStatusIcon(platform.syncStatus);
          
          return (
            <Card key={platform.id} className="paper-card p-4 hover:shadow-floating transition-shadow">
              <div className="space-y-4">
                {/* Platform Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{platform.name}</h3>
                      <div className={`flex items-center gap-1 text-xs ${getStatusColor(platform.syncStatus)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {platform.syncStatus}
                      </div>
                    </div>
                  </div>
                  
                  {/* Connection Toggle */}
                  <Button
                    variant={platform.connected ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePlatformConnection(platform.id)}
                    className={platform.connected 
                      ? "bg-gradient-sakura text-white" 
                      : "border-2 hover:border-primary"
                    }
                  >
                    {platform.connected ? 'Connected' : 'Connect'}
                  </Button>
                </div>

                {/* Platform Metrics */}
                {platform.connected && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bookmarks</span>
                        <span className="font-medium">{platform.bookmarkCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Sync</span>
                        <span className="font-medium">{platform.lastSync}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">This Week</span>
                        <span className="font-medium text-bamboo">+{platform.recentActivity}</span>
                      </div>
                    </div>

                    {/* Content Types */}
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Content Types</div>
                      <div className="flex flex-wrap gap-1">
                        {platform.contentTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Download className="w-3 h-3 mr-1" />
                        Sync
                      </Button>
                    </div>
                  </>
                )}

                {/* Connection Prompt for Disconnected Platforms */}
                {!platform.connected && (
                  <div className="text-center p-4 bg-washi rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect {platform.name} to start importing your {platform.contentTypes.join(', ').toLowerCase()}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {platform.contentTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Custom Platform */}
      <Card className="paper-card p-6 border-2 border-dashed border-border hover:border-primary transition-colors">
        <div className="text-center">
          <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <h3 className="font-medium text-ink mb-1">Add Custom Platform</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect additional platforms or custom RSS feeds
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-washi">
            <Plus className="w-4 h-4 mr-1" />
            Add Platform
          </Button>
        </div>
      </Card>

      {/* Sync Activity Timeline */}
      <Card className="paper-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-ink">Recent Sync Activity</h3>
        </div>
        
        <div className="space-y-3">
          {[
            { platform: 'Twitter', action: 'Imported 5 new bookmarks', time: '2 min ago', icon: '🐦' },
            { platform: 'Reddit', action: 'Synced 12 saved posts', time: '10 min ago', icon: '🔴' },
            { platform: 'YouTube', action: 'Added 3 video bookmarks', time: '1 hour ago', icon: '📺' },
            { platform: 'LinkedIn', action: 'Imported 2 articles', time: '2 hours ago', icon: '💼' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-washi transition-colors">
              <div className="text-lg">{activity.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-ink">{activity.action}</div>
                <div className="text-xs text-muted-foreground">{activity.platform} • {activity.time}</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}