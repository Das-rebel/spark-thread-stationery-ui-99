import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Brain, Plus, Twitter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/',
  },
  {
    id: 'knowledge',
    label: 'Knowledge',
    icon: Brain,
    path: '/knowledge',
  },
  {
    id: 'add',
    label: 'Add',
    icon: Plus,
    path: '/add',
  },
  {
    id: 'social',
    label: 'Social',
    icon: Twitter,
    path: '/twitter',
  },
  {
    id: 'search',
    label: 'Search',
    icon: Search,
    path: '/search',
  },
];

export function BottomNavigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-inset-bottom">
      <div className="max-w-md mx-auto px-2 py-2 pb-safe"
           style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            
            return (
              <Link key={item.id} to={item.path} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-2 px-2 w-full transition-all duration-200",
                    "hover:bg-sakura/10 hover:scale-105",
                    active
                      ? "text-sakura bg-sakura/5 shadow-sm"
                      : "text-muted-foreground hover:text-ink"
                  )}
                >
                  <div className="relative">
                    <Icon className={cn(
                      "w-5 h-5 transition-all duration-200",
                      active ? "scale-110" : ""
                    )} />
                    {item.badge && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-seal text-white text-xs rounded-full flex items-center justify-center font-bold min-w-4">
                        {item.badge > 9 ? '9+' : item.badge}
                      </div>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs font-medium transition-all duration-200",
                    active ? "opacity-100" : "opacity-70"
                  )}>
                    {item.label}
                  </span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}