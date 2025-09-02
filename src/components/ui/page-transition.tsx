import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`w-full transition-all duration-300 ease-out ${
        isAnimating 
          ? 'opacity-0 translate-x-2 scale-[0.98]' 
          : 'opacity-100 translate-x-0 scale-100'
      }`}
    >
      {children}
    </div>
  );
}