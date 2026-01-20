import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Brain, Plus, Twitter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t border-border/30"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.id} 
                to={item.path} 
                className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-200 group relative min-w-[56px]"
              >
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  <Icon className={cn("w-5 h-5 transition-all", active && "stroke-[2.5]")} />
                  {item.badge && (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                      {item.badge > 9 ? '9+' : item.badge}
                    </div>
                  )}
                </motion.div>
                <span className={cn(
                  "text-[11px] font-medium transition-all",
                  active ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
                {active && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}