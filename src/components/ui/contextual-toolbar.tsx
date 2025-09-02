import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Copy,
  Trash2,
  Palette,
  Link2,
  Lock,
  Unlock,
  Group,
  Ungroup,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCw,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextualToolbarProps {
  selectedItems: string[];
  onAction: (action: string, data?: any) => void;
  position: { x: number; y: number };
  visible: boolean;
  className?: string;
}

export function ContextualToolbar({ 
  selectedItems, 
  onAction, 
  position, 
  visible, 
  className 
}: ContextualToolbarProps) {
  if (!visible || selectedItems.length === 0) return null;

  const isMultipleSelection = selectedItems.length > 1;
  
  const toolbarActions = [
    {
      group: 'basic',
      actions: [
        { id: 'copy', icon: Copy, label: 'Copy', shortcut: 'Ctrl+C' },
        { id: 'delete', icon: Trash2, label: 'Delete', shortcut: 'Del', variant: 'destructive' as const }
      ]
    },
    {
      group: 'style',
      actions: [
        { id: 'color', icon: Palette, label: 'Color' },
        { id: 'link', icon: Link2, label: 'Add Link' }
      ]
    },
    ...(isMultipleSelection ? [{
      group: 'multiple',
      actions: [
        { id: 'group', icon: Group, label: 'Group' },
        { id: 'align-left', icon: AlignLeft, label: 'Align Left' },
        { id: 'align-center', icon: AlignCenter, label: 'Align Center' },
        { id: 'align-right', icon: AlignRight, label: 'Align Right' }
      ]
    }] : []),
    {
      group: 'transform',
      actions: [
        { id: 'lock', icon: Lock, label: 'Lock Position' },
        { id: 'rotate', icon: RotateCw, label: 'Rotate' },
        { id: 'layer-up', icon: Layers, label: 'Bring Forward' }
      ]
    }
  ];

  return (
    <Card 
      className={cn(
        "fixed z-50 bg-card/95 backdrop-blur-md border shadow-floating p-2 transition-all duration-200",
        "animate-scale-in",
        className
      )}
      style={{
        left: position.x,
        top: position.y - 60, // Position above the selection
        transform: 'translateX(-50%)'
      }}
    >
      <div className="flex items-center gap-1">
        <Badge variant="secondary" className="text-xs mr-2">
          {selectedItems.length} selected
        </Badge>
        
        {toolbarActions.map((group, groupIndex) => (
          <React.Fragment key={group.group}>
            {groupIndex > 0 && <Separator orientation="vertical" className="h-6 mx-1" />}
            
            <div className="flex items-center gap-1">
              {group.actions.map(action => (
                <Button
                  key={action.id}
                  variant={action.variant || "ghost"}
                  size="sm"
                  onClick={() => onAction(action.id)}
                  className={cn(
                    "w-8 h-8 p-0 hover:bg-muted/80",
                    action.variant === 'destructive' && "hover:bg-destructive/10 hover:text-destructive"
                  )}
                  title={`${action.label}${action.shortcut ? ` (${action.shortcut})` : ''}`}
                >
                  <action.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      
      {/* Action feedback */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-2 h-2 bg-card border rotate-45" />
      </div>
    </Card>
  );
}