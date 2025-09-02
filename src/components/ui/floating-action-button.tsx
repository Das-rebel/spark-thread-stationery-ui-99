import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps extends ButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  offset?: string;
  pulse?: boolean;
}

const positionClasses = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
};

export function FloatingActionButton({
  children,
  position = 'bottom-right',
  offset,
  pulse = false,
  className,
  ...props
}: FloatingActionButtonProps) {
  return (
    <Button
      size="icon"
      className={cn(
        "fixed z-40 h-14 w-14 rounded-full shadow-floating hover:shadow-deep",
        "bg-sakura hover:bg-sakura/90 text-white",
        "transition-all duration-300 hover:scale-110",
        "active:scale-95",
        pulse && "animate-pulse",
        positionClasses[position],
        offset && `m-${offset}`,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}