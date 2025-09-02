import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, BookOpen, Clock, Target } from 'lucide-react';

export function QuickStats() {
  const stats = [
    {
      label: 'Total Saved',
      value: '2.1k',
      change: '+12%',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'This Week',
      value: '47',
      change: '+8%',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      label: 'Reading Time',
      value: '12h',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      label: 'Tasks Ready',
      value: '24',
      change: 'New',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.label} className="paper-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <IconComponent className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground truncate">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-ink">{stat.value}</span>
              <span className={`text-xs ${
                stat.change === 'New' ? 'text-orange-600' : 'text-green-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}