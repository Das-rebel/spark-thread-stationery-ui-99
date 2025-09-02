import React, { useRef, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface GestureHandlerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  enableBackGesture?: boolean;
  className?: string;
}

export function GestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  enableBackGesture = true,
  className
}: GestureHandlerProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const startTouch = useRef<{ x: number; y: number } | null>(null);
  const threshold = 50; // Minimum distance for a swipe

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    startTouch.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!startTouch.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startTouch.current.x;
    const deltaY = touch.clientY - startTouch.current.y;

    // Determine if it's a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          // Swipe right
          if (enableBackGesture && deltaX > threshold * 2) {
            navigate(-1); // Go back
          } else if (onSwipeRight) {
            onSwipeRight();
          }
        } else {
          // Swipe left
          if (onSwipeLeft) {
            onSwipeLeft();
          }
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          // Swipe down
          if (onSwipeDown) {
            onSwipeDown();
          }
        } else {
          // Swipe up
          if (onSwipeUp) {
            onSwipeUp();
          }
        }
      }
    }

    startTouch.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, enableBackGesture]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}