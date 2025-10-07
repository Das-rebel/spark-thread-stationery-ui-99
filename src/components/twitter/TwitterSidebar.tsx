import { Home, Bookmark, Star } from "lucide-react";
import { CustomIcons } from "@/components/icons";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  { icon: Home, label: "Home", href: "/twitter" },
  { icon: CustomIcons.SearchEnhanced, label: "Search", href: "/twitter/search" },
  { icon: Bookmark, label: "Collections", href: "/twitter/explore" },
  { icon: Star, label: "Favorites", href: "/twitter/notifications" },
  { icon: CustomIcons.Settings, label: "Settings", href: "/twitter/settings" },
];

export function TwitterSidebar() {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 shadow-floating z-50 max-w-2xl mx-auto"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {/* Mobile Bottom Navigation */}
      <div className="flex items-center justify-around py-2 px-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1"
            >
              <Link
                to={item.href}
                className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all duration-200 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground group-hover:bg-accent group-hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={`text-[10px] font-medium transition-all ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}