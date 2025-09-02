import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardNavigationOptions {
  enableGlobalShortcuts?: boolean;
  enableListNavigation?: boolean;
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions = {}) {
  const navigate = useNavigate();
  const { enableGlobalShortcuts = true, enableListNavigation = true } = options;

  const handleGlobalKeydown = useCallback((event: KeyboardEvent) => {
    // Skip if user is typing in an input
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.contentEditable === 'true') {
      return;
    }

    // Global shortcuts
    if (enableGlobalShortcuts) {
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case 'k':
            event.preventDefault();
            navigate('/search');
            break;
          case 'n':
            event.preventDefault();
            navigate('/add');
            break;
          case 'h':
            event.preventDefault();
            navigate('/');
            break;
          case '/':
            event.preventDefault();
            navigate('/search');
            break;
        }
      }

      // Single key shortcuts
      switch (event.key) {
        case 'Escape':
          // Close any open modals or go back
          if (window.history.length > 1) {
            window.history.back();
          }
          break;
        case '?':
          event.preventDefault();
          // Show keyboard shortcuts help
          console.log('Keyboard shortcuts: Cmd+K (Search), Cmd+N (Add), Cmd+H (Home), Escape (Back)');
          break;
      }
    }
  }, [navigate, enableGlobalShortcuts]);

  useEffect(() => {
    if (!enableGlobalShortcuts) return;

    const keydownHandler = (event: KeyboardEvent) => {
      handleGlobalKeydown(event);
    };

    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, [enableGlobalShortcuts, handleGlobalKeydown]);

  return {
    // Helper for list navigation
    createListKeyHandler: (items: any[], selectedIndex: number, onSelect: (index: number) => void) => {
      return (event: React.KeyboardEvent) => {
        if (!enableListNavigation) return;

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            onSelect(Math.min(selectedIndex + 1, items.length - 1));
            break;
          case 'ArrowUp':
            event.preventDefault();
            onSelect(Math.max(selectedIndex - 1, 0));
            break;
          case 'Enter':
            event.preventDefault();
            // Trigger action on selected item
            break;
        }
      };
    }
  };
}