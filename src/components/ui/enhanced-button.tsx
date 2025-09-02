import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  haptic?: boolean;
  ripple?: boolean;
}

export function EnhancedButton({
  children,
  loading = false,
  success = false,
  haptic = true,
  ripple = true,
  className,
  onClick,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add haptic feedback on mobile
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Add ripple effect
    if (ripple) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    if (onClick && !loading && !disabled) {
      onClick(e);
    }
  };

  return (
    <>
      <style>
        {`
          .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          }
          
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `}
      </style>
      <Button
        {...props}
        disabled={disabled || loading}
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          "active:scale-95 hover:shadow-md",
          success && "bg-green-500 hover:bg-green-600 text-white",
          loading && "cursor-not-allowed",
          className
        )}
      >
        {loading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        {success && !loading && (
          <div className="w-4 h-4 mr-2 rounded-full bg-white flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        )}
        {children}
      </Button>
    </>
  );
}