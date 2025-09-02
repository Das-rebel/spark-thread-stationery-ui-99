import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimapProps {
  nodes: Array<{
    id: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    type: string;
  }>;
  zoom: number;
  pan: { x: number; y: number };
  onPanChange: (pan: { x: number; y: number }) => void;
  className?: string;
}

export function Minimap({ nodes, zoom, pan, onPanChange, className }: MinimapProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // Calculate bounds of all nodes
  const bounds = React.useMemo(() => {
    if (nodes.length === 0) return { minX: 0, minY: 0, maxX: 400, maxY: 300 };
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    nodes.forEach(node => {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + node.size.width);
      maxY = Math.max(maxY, node.position.y + node.size.height);
    });
    
    // Add padding
    const padding = 100;
    return {
      minX: minX - padding,
      minY: minY - padding,
      maxX: maxX + padding,
      maxY: maxY + padding
    };
  }, [nodes]);
  
  const minimapScale = 0.1;
  const minimapWidth = (bounds.maxX - bounds.minX) * minimapScale;
  const minimapHeight = (bounds.maxY - bounds.minY) * minimapScale;
  
  const handleMinimapClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Convert minimap coordinates to canvas coordinates
    const canvasX = bounds.minX + (clickX / minimapScale);
    const canvasY = bounds.minY + (clickY / minimapScale);
    
    // Center the view on the clicked point
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    onPanChange({
      x: -(canvasX * zoom) + viewportWidth / 2,
      y: -(canvasY * zoom) + viewportHeight / 2
    });
  };
  
  // Calculate viewport rectangle in minimap coordinates
  const viewportRect = {
    x: (-pan.x / zoom - bounds.minX) * minimapScale,
    y: (-pan.y / zoom - bounds.minY) * minimapScale,
    width: (window.innerWidth / zoom) * minimapScale,
    height: (window.innerHeight / zoom) * minimapScale
  };
  
  return (
    <Card className={cn(
      "fixed bottom-4 right-4 z-30 bg-card/95 backdrop-blur-sm border-2 transition-all duration-300",
      isExpanded ? "w-64 h-48" : "w-16 h-16",
      className
    )}>
      <div className="p-2 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          {isExpanded && (
            <span className="text-xs font-medium text-muted-foreground">
              Canvas Overview
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6 p-0 ml-auto"
          >
            {isExpanded ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </Button>
        </div>
        
        {isExpanded && (
          <div 
            className="flex-1 relative bg-gradient-paper rounded border cursor-pointer overflow-hidden"
            style={{ 
              minWidth: Math.max(minimapWidth, 200),
              minHeight: Math.max(minimapHeight, 120)
            }}
            onClick={handleMinimapClick}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            />
            
            {/* Nodes */}
            {nodes.map(node => (
              <div
                key={node.id}
                className={cn(
                  "absolute rounded border opacity-80",
                  node.type === 'text' && "bg-blue-200 border-blue-300",
                  node.type === 'concept' && "bg-yellow-200 border-yellow-300",
                  node.type === 'link' && "bg-green-200 border-green-300",
                  node.type === 'image' && "bg-purple-200 border-purple-300"
                )}
                style={{
                  left: (node.position.x - bounds.minX) * minimapScale,
                  top: (node.position.y - bounds.minY) * minimapScale,
                  width: node.size.width * minimapScale,
                  height: node.size.height * minimapScale,
                  minWidth: 4,
                  minHeight: 4
                }}
              />
            ))}
            
            {/* Viewport indicator */}
            <div
              className="absolute border-2 border-primary bg-primary/10 pointer-events-none"
              style={{
                left: Math.max(0, viewportRect.x),
                top: Math.max(0, viewportRect.y),
                width: Math.min(viewportRect.width, minimapWidth - Math.max(0, viewportRect.x)),
                height: Math.min(viewportRect.height, minimapHeight - Math.max(0, viewportRect.y))
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
}