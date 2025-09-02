import { useEffect, useRef } from 'react';

interface AccessibilityAnnouncerProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clear?: boolean;
}

export function AccessibilityAnnouncer({ 
  message, 
  priority = 'polite', 
  clear = false 
}: AccessibilityAnnouncerProps) {
  const announceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announceRef.current) {
      if (clear) {
        announceRef.current.textContent = '';
        setTimeout(() => {
          if (announceRef.current) {
            announceRef.current.textContent = message;
          }
        }, 100);
      } else {
        announceRef.current.textContent = message;
      }
    }
  }, [message, clear]);

  return (
    <div
      ref={announceRef}
      className="sr-only"
      aria-live={priority}
      aria-atomic="true"
    />
  );
}

// Hook for programmatic announcements
export function useAccessibilityAnnouncer() {
  const announceMessage = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Simple console logging for now - avoiding DOM manipulation that can cause React errors
    console.log(`Accessibility announcement (${priority}): ${message}`);
    
    // Use browser's speech synthesis if available
    if ('speechSynthesis' in window && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.volume = 0; // Silent but still triggers screen readers
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        // Silently fail if speech synthesis isn't supported
      }
    }
  };

  return { announceMessage };
}