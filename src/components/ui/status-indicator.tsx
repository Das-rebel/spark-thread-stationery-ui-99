import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const statusConfig = {
  online: {
    color: 'bg-green-500',
    label: 'Online'
  },
  offline: {
    color: 'bg-gray-400',
    label: 'Offline'
  },
  away: {
    color: 'bg-yellow-500',
    label: 'Away'
  },
  busy: {
    color: 'bg-red-500',
    label: 'Busy'
  }
};

const sizeConfig = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
};

export function StatusIndicator({ 
  status, 
  size = 'md', 
  animated = true,
  className 
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const sizeClass = sizeConfig[size];

  return (
    <div
      className={cn(
        "rounded-full border-2 border-background",
        sizeClass,
        config.color,
        animated && status === 'online' && "animate-pulse",
        className
      )}
      title={config.label}
    />
  );
}