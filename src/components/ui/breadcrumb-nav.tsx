import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ElementType;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      <Link
        to="/"
        className="flex items-center text-muted-foreground hover:text-ink transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          
          {item.path && index < items.length - 1 ? (
            <Link
              to={item.path}
              className="flex items-center gap-1 text-muted-foreground hover:text-ink transition-colors"
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-ink font-medium">
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}