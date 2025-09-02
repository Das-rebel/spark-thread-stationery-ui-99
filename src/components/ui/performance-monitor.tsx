import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Clock, 
  HardDrive,
  Wifi,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
  nodesRendered: number;
  connectionsRendered: number;
  networkLatency: number;
}

interface PerformanceMonitorProps {
  className?: string;
  minimal?: boolean;
}

export function PerformanceMonitor({ className, minimal = false }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 45,
    renderTime: 16.7,
    nodesRendered: 0,
    connectionsRendered: 0,
    networkLatency: 120
  });
  
  const [isExpanded, setIsExpanded] = useState(!minimal);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsArray: number[] = [];
    let animationId: number;

    const measurePerformance = () => {
      const now = performance.now();
      frameCount++;
      
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        fpsArray.push(fps);
        if (fpsArray.length > 10) fpsArray.shift();
        
        const avgFps = fpsArray.reduce((a, b) => a + b, 0) / fpsArray.length;
        
        setMetrics(prev => ({
          ...prev,
          fps: Math.round(avgFps),
          memory: Math.round((performance as any).memory?.usedJSHeapSize / 1048576) || 45,
          renderTime: 1000 / avgFps
        }));
        
        frameCount = 0;
        lastTime = now;
      }
      
      if (isVisible) {
        animationId = requestAnimationFrame(measurePerformance);
      }
    };

    // Start monitoring when component is visible
    if (isVisible) {
      animationId = requestAnimationFrame(measurePerformance);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  const getStatusColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value >= thresholds.good) return 'text-green-600';
    if (value >= thresholds.fair) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMemoryColor = (memory: number) => {
    if (memory < 50) return 'text-green-600';
    if (memory < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (minimal && !isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className={cn("fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border", className)}
      >
        <Activity className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Card className={cn(
      "fixed bottom-20 right-4 z-40 bg-card/95 backdrop-blur-md border transition-all duration-300",
      isExpanded ? "w-64 h-auto" : "w-16 h-16",
      className
    )}>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            {isExpanded && (
              <span className="text-sm font-medium">Performance</span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-3">
            {/* FPS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs">FPS</span>
              </div>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getStatusColor(metrics.fps, { good: 50, fair: 30 }))}
              >
                {metrics.fps}
              </Badge>
            </div>

            {/* Memory */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs">Memory</span>
                </div>
                <span className={cn("text-xs", getMemoryColor(metrics.memory))}>
                  {metrics.memory}MB
                </span>
              </div>
              <Progress value={metrics.memory} className="h-1" />
            </div>

            {/* Render Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs">Render</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {metrics.renderTime.toFixed(1)}ms
              </span>
            </div>

            {/* Network */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs">Latency</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {metrics.networkLatency}ms
              </span>
            </div>

            {/* Canvas Stats */}
            <div className="pt-2 border-t border-border">
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Nodes: {metrics.nodesRendered}</div>
                <div>Connections: {metrics.connectionsRendered}</div>
              </div>
            </div>

            {/* Performance Tips */}
            {(metrics.fps < 30 || metrics.memory > 80) && (
              <div className="pt-2 border-t border-border">
                <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                  💡 Performance tip: Try reducing visible nodes or zoom level
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}