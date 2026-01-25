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
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border/30 z-50 max-w-2xl mx-auto"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {/* Mobile Bottom Navigation */}
      <div className="flex items-center justify-around py-1.5 px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all duration-200 mx-0.5 ${
                  isActive 
                    ? 'bg-primary/10' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <span className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}