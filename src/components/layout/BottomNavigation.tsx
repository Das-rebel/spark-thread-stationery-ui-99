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
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-elegant"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-2xl mx-auto px-2 py-1.5">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-1"
              >
                <Link to={item.path} className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 group relative">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "p-2 rounded-xl transition-all relative",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.badge && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center font-bold"
                      >
                        {item.badge > 9 ? '9+' : item.badge}
                      </motion.div>
                    )}
                  </motion.div>
                  <span className={cn(
                    "text-[10px] font-medium transition-all",
                    active ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                  {active && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}