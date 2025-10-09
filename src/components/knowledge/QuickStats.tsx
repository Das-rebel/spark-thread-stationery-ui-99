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
      gradient: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      label: 'This Week',
      value: '47',
      change: '+8%',
      icon: Clock,
      gradient: 'from-green-50 to-green-100',
      iconColor: 'text-green-600'
    },
    {
      label: 'Reading Time',
      value: '12h',
      change: '+23%',
      icon: TrendingUp,
      gradient: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      label: 'Tasks Ready',
      value: '24',
      change: 'New',
      icon: Target,
      gradient: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.label} className="paper-card p-3 hover:shadow-elegant transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-2">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-muted-foreground block truncate">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs font-medium text-primary">
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}