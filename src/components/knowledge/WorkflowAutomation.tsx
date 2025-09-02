import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Play, Pause, CheckCircle, Clock, ArrowRight, Plus, Settings } from 'lucide-react';

interface WorkflowTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number; // in minutes
  sourceContent?: string;
  dueDate?: Date;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  tasks: number;
  category: string;
  isActive: boolean;
}

interface AutomatedFollowUp {
  id: string;
  title: string;
  triggerDate: Date;
  content: string;
  type: 'reminder' | 'review' | 'practice';
}

export function WorkflowAutomation() {
  const [tasks, setTasks] = useState<WorkflowTask[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [followUps, setFollowUps] = useState<AutomatedFollowUp[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'templates' | 'followups'>('tasks');

  useEffect(() => {
    // Mock workflow tasks
    setTasks([
      {
        id: '1',
        title: 'Implement React Component',
        description: 'Based on the "Advanced React Patterns" article',
        status: 'in_progress',
        priority: 'high',
        estimatedTime: 45,
        sourceContent: 'Advanced React Patterns Article',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Update API Documentation',
        description: 'Apply best practices from API design guide',
        status: 'pending',
        priority: 'medium',
        estimatedTime: 30,
        sourceContent: 'API Design Best Practices'
      },
      {
        id: '3',
        title: 'Performance Audit',
        description: 'Run optimization checks based on notes',
        status: 'completed',
        priority: 'medium',
        estimatedTime: 60,
        sourceContent: 'Performance Optimization Notes'
      }
    ]);

    // Mock workflow templates
    setTemplates([
      {
        id: 'article-to-action',
        name: 'Article → Implementation',
        description: 'Convert learning articles into actionable tasks',
        tasks: 3,
        category: 'Learning',
        isActive: true
      },
      {
        id: 'research-synthesis',
        name: 'Research Synthesis',
        description: 'Organize research into structured insights',
        tasks: 4,
        category: 'Research',
        isActive: true
      },
      {
        id: 'project-kickoff',
        name: 'Project Kickoff',
        description: 'Standard project initialization workflow',
        tasks: 6,
        category: 'Project Management',
        isActive: false
      }
    ]);

    // Mock automated follow-ups
    setFollowUps([
      {
        id: '1',
        title: 'Review React Patterns Implementation',
        triggerDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        content: 'Check if the React patterns were successfully implemented',
        type: 'review'
      },
      {
        id: '2',
        title: 'Practice TypeScript Error Handling',
        triggerDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        content: 'Revisit error handling concepts from your notes',
        type: 'practice'
      }
    ]);
  }, []);

  const getPriorityColor = (priority: WorkflowTask['priority']) => {
    switch (priority) {
      case 'high': return 'bg-seal/10 text-seal';
      case 'medium': return 'bg-gold/10 text-gold';
      case 'low': return 'bg-bamboo/10 text-bamboo';
    }
  };

  const getStatusIcon = (status: WorkflowTask['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-bamboo" />;
      case 'in_progress': return <Play className="w-4 h-4 text-ink" />;
      case 'pending': return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getProgress = () => {
    const completed = tasks.filter(t => t.status === 'completed').length;
    return (completed / tasks.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card className="paper-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold" />
            <h3 className="text-lg font-semibold text-ink">Workflow Automation</h3>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium text-ink">{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-ink">{tasks.filter(t => t.status === 'completed').length}</div>
            <div className="text-xs text-muted-foreground">of {tasks.length} completed</div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {(['tasks', 'templates', 'followups'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === 'followups' ? 'Follow-ups' : tab}
          </Button>
        ))}
      </div>

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <Card className="paper-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-ink">Smart Generated Tasks</h4>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Generate from Content
            </Button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-washi hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-ink">{task.title}</h5>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {task.sourceContent && (
                        <span>From: {task.sourceContent}</span>
                      )}
                      <span>{task.estimatedTime}min</span>
                      {task.dueDate && (
                        <span>Due: {task.dueDate.toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <Card className="paper-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-ink">Workflow Templates</h4>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className={`p-4 cursor-pointer transition-all ${
                template.isActive ? 'ring-2 ring-primary' : 'hover:shadow-md'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-semibold text-ink">{template.name}</h5>
                  <Badge variant={template.isActive ? 'default' : 'secondary'}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{template.tasks} tasks</span>
                    <span>{template.category}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Follow-ups Tab */}
      {activeTab === 'followups' && (
        <Card className="paper-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-ink">Automated Follow-ups</h4>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
          
          <div className="space-y-3">
            {followUps.map((followUp) => (
              <div key={followUp.id} className="flex items-center justify-between p-4 rounded-lg bg-washi hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    followUp.type === 'reminder' ? 'bg-bamboo' :
                    followUp.type === 'review' ? 'bg-seal' : 'bg-gold'
                  }`} />
                  <div>
                    <h5 className="font-medium text-ink">{followUp.title}</h5>
                    <p className="text-sm text-muted-foreground">{followUp.content}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {followUp.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {followUp.triggerDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}