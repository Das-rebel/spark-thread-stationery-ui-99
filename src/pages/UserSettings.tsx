import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { UserGreeting } from "@/components/user/UserGreeting";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomIcons } from "@/components/icons";
import { 
  Bell, 
  Moon, 
  Download, 
  Upload, 
  Trash2, 
  Shield, 
  Eye,
  Palette,
  Volume2,
  Vibrate,
  Brain,
  Zap,
  Users,
  Database
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function UserSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    soundEnabled: true,
    hapticFeedback: true,
    autoBookmark: false,
    aiTraining: true,
    userName: "Knowledge Seeker",
    avatar: "🧠"
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: `${key} has been updated successfully.`,
    });
  };

  return (
    <AppLayout>
      <div className="min-h-screen pb-8">
        {/* User Greeting */}
        <div className="p-4">
          <UserGreeting 
            userName={settings.userName}
            avatar={settings.avatar}
          />
        </div>

        {/* Enhanced Settings with Tabs */}
        <div className="p-4">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-washi">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <CustomIcons.UserProfile className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI & Learning
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="paper-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CustomIcons.UserProfile className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-ink">Profile & Preferences</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="userName" className="text-sm font-medium">Display Name</Label>
                      <Input
                        id="userName"
                        value={settings.userName}
                        onChange={(e) => handleSettingChange('userName', e.target.value)}
                        className="mt-1 paper-input"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Avatar</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-12 h-12 bg-gradient-sakura rounded-full flex items-center justify-center text-2xl">
                          {settings.avatar}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {['🧠', '🎯', '📚', '💡', '🌸', '⭐', '🚀', '🎨'].map((emoji) => (
                            <Button
                              key={emoji}
                              variant="outline"
                              size="sm"
                              className="w-10 h-10 p-0"
                              onClick={() => handleSettingChange('avatar', emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Notification Preferences */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-ink">Notification Preferences</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-muted-foreground">Get notified about new insights</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Sound Effects</div>
                          <div className="text-sm text-muted-foreground">Audio feedback for interactions</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.soundEnabled}
                        onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Vibrate className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Haptic Feedback</div>
                          <div className="text-sm text-muted-foreground">Vibration on touch</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.hapticFeedback}
                        onCheckedChange={(checked) => handleSettingChange('hapticFeedback', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Dark Mode</div>
                          <div className="text-sm text-muted-foreground">Switch to dark theme</div>
                        </div>
                      </div>
                      <Switch
                        checked={settings.darkMode}
                        onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* AI & Learning Settings */}
            <TabsContent value="ai" className="space-y-6">
              <Card className="paper-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CustomIcons.BrainAI className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-ink">AI & Learning Intelligence</h3>
                  <Badge variant="secondary" className="ml-auto">
                    <Eye className="w-3 h-3 mr-1" />
                    89% Trained
                  </Badge>
                </div>
                
                <div className="space-y-6">
                  {/* Learning Preferences */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-ink">Learning Preferences</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Auto-bookmark Links</div>
                        <div className="text-sm text-muted-foreground">Automatically save shared content</div>
                      </div>
                      <Switch
                        checked={settings.autoBookmark}
                        onCheckedChange={(checked) => handleSettingChange('autoBookmark', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">AI Training Data</div>
                        <div className="text-sm text-muted-foreground">Help improve recommendations</div>
                      </div>
                      <Switch
                        checked={settings.aiTraining}
                        onCheckedChange={(checked) => handleSettingChange('aiTraining', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Smart Tagging</div>
                        <div className="text-sm text-muted-foreground">AI-powered content categorization</div>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={() => {}}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Semantic Search</div>
                        <div className="text-sm text-muted-foreground">Enhanced search understanding</div>
                      </div>
                      <Switch
                        checked={true}
                        onCheckedChange={() => {}}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* AI Stats */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-ink">Learning Analytics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-washi rounded-lg">
                        <div className="text-xl font-bold text-primary">127</div>
                        <div className="text-sm text-muted-foreground">Items Learned</div>
                      </div>
                      <div className="text-center p-3 bg-washi rounded-lg">
                        <div className="text-xl font-bold text-bamboo">5</div>
                        <div className="text-sm text-muted-foreground">Interest Areas</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Data Management */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-ink">Data Management</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex flex-col gap-2 h-16">
                        <Upload className="w-5 h-5" />
                        <span className="text-xs">Export Data</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col gap-2 h-16">
                        <Download className="w-5 h-5" />
                        <span className="text-xs">Import Data</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Platform Integrations */}
            <TabsContent value="integrations" className="space-y-6">
              <Card className="paper-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-gold" />
                  <h3 className="font-semibold text-ink">Platform Integrations</h3>
                  <Badge variant="secondary" className="ml-auto">
                    Phase 2
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {/* Browser Integration */}
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-sakura rounded-lg flex items-center justify-center">
                          <Database className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">Browser Extension</div>
                          <div className="text-sm text-muted-foreground">Cross-platform bookmark sync</div>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>

                  {/* Mobile App */}
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-bamboo rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">Mobile Sharing</div>
                          <div className="text-sm text-muted-foreground">Share directly from mobile apps</div>
                        </div>
                      </div>
                      <Button variant="outline">Setup</Button>
                    </div>
                  </div>

                  {/* API Access */}
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">API Access</div>
                          <div className="text-sm text-muted-foreground">Developer API for custom integrations</div>
                        </div>
                      </div>
                      <Button variant="outline">Generate Key</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Privacy & Security */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="paper-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-ink">Privacy & Security</h3>
                </div>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Eye className="w-4 h-4" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Shield className="w-4 h-4" />
                    Security Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Database className="w-4 h-4" />
                    Data Export
                  </Button>
                  
                  <Separator />
                  
                  <Button variant="outline" className="w-full justify-start gap-3 text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}