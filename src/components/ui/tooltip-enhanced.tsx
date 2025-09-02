import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TooltipEnhancedProps {
  children: React.ReactNode;
  content: string;
  description?: string;
  shortcut?: string;
  delay?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

export function TooltipEnhanced({
  children,
  content,
  description,
  shortcut,
  delay = 500,
  side = 'top',
  className,
  disabled = false
}: TooltipEnhancedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        let x, y;
        
        switch (side) {
          case 'top':
            x = rect.left + scrollX + rect.width / 2;
            y = rect.top + scrollY - 10;
            break;
          case 'bottom':
            x = rect.left + scrollX + rect.width / 2;
            y = rect.bottom + scrollY + 10;
            break;
          case 'left':
            x = rect.left + scrollX - 10;
            y = rect.top + scrollY + rect.height / 2;
            break;
          case 'right':
            x = rect.right + scrollX + 10;
            y = rect.top + scrollY + rect.height / 2;
            break;
          default:
            x = rect.left + scrollX + rect.width / 2;
            y = rect.top + scrollY - 10;
        }

        setPosition({ x, y });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getTransformOrigin = () => {
    switch (side) {
      case 'top': return 'bottom center';
      case 'bottom': return 'top center';
      case 'left': return 'center right';
      case 'right': return 'center left';
      default: return 'bottom center';
    }
  };

  const getTransform = () => {
    switch (side) {
      case 'top': return 'translateX(-50%) translateY(-100%)';
      case 'bottom': return 'translateX(-50%)';
      case 'left': return 'translateX(-100%) translateY(-50%)';
      case 'right': return 'translateY(-50%)';
      default: return 'translateX(-50%) translateY(-100%)';
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transform: getTransform(),
            transformOrigin: getTransformOrigin()
          }}
        >
          <Card className={cn(
            "bg-card/95 backdrop-blur-md border shadow-floating p-3 max-w-xs",
            "animate-scale-in",
            className
          )}>
            <div className="space-y-1">
              <div className="font-medium text-sm text-foreground">
                {content}
              </div>
              
              {description && (
                <div className="text-xs text-muted-foreground">
                  {description}
                </div>
              )}
              
              {shortcut && (
                <Badge variant="outline" className="text-xs font-mono">
                  {shortcut}
                </Badge>
              )}
            </div>
            
            {/* Arrow */}
            <div 
              className={cn(
                "absolute w-2 h-2 bg-card border rotate-45",
                side === 'top' && "bottom-[-5px] left-1/2 transform -translate-x-1/2 border-b-0 border-r-0",
                side === 'bottom' && "top-[-5px] left-1/2 transform -translate-x-1/2 border-t-0 border-l-0",
                side === 'left' && "right-[-5px] top-1/2 transform -translate-y-1/2 border-t-0 border-r-0",
                side === 'right' && "left-[-5px] top-1/2 transform -translate-y-1/2 border-b-0 border-l-0"
              )}
            />
          </Card>
        </div>
      )}
    </>
  );
}