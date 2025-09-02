import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  MessageSquare, 
  Edit3, 
  ExternalLink, 
  Clock,
  Tag,
  Share,
  Bookmark,
  Send,
  ChevronRight,
  Globe,
  FileText,
  Youtube
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecallCardProps {
  card: {
    id: string;
    title: string;
    type: 'url' | 'pdf' | 'youtube' | 'note';
    source?: string;
    content: string;
    summary: string;
    tags: string[];
    createdAt: string;
    readingTime?: number;
  };
}

export function RecallCard({ card }: RecallCardProps) {
  const [activeTab, setActiveTab] = useState('reader');
  const [chatMessage, setChatMessage] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const typeIcons = {
    url: Globe,
    pdf: FileText,
    youtube: Youtube,
    note: Edit3
  };

  const typeColors = {
    url: 'text-blue-500',
    pdf: 'text-red-500', 
    youtube: 'text-red-600',
    note: 'text-green-500'
  };

  const IconComponent = typeIcons[card.type];

  const mockChatHistory = [
    {
      type: 'user',
      message: 'What are the main points of this article?',
      timestamp: '2:34 PM'
    },
    {
      type: 'assistant', 
      message: 'Based on the content, here are the main points:\n\n1. **Key Concept**: The primary argument discusses...\n2. **Supporting Evidence**: The author provides data showing...\n3. **Implications**: This leads to the conclusion that...',
      sources: ['Section 2.1', 'Page 3', 'Abstract'],
      timestamp: '2:34 PM'
    }
  ];

  const mockReferences = [
    { title: 'Related Article 1', type: 'url', similarity: 0.85 },
    { title: 'Chapter from Book X', type: 'pdf', similarity: 0.78 },
    { title: 'YouTube Explanation', type: 'youtube', similarity: 0.72 }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Card Header */}
      <Card className="paper-card-floating">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-sakura rounded-lg flex items-center justify-center">
                <IconComponent className={cn("w-5 h-5", typeColors[card.type])} />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-ink leading-tight">{card.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {card.source && (
                    <>
                      <span className="truncate max-w-[200px]">{card.source}</span>
                      <ExternalLink className="w-3 h-3" />
                    </>
                  )}
                  <Separator orientation="vertical" className="h-4" />
                  <Clock className="w-3 h-3" />
                  <span>{card.readingTime || 5} min read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Tags and Summary */}
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
              {card.summary}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Card Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 bg-washi h-12">
          <TabsTrigger value="reader" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Reader</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="notebook" className="flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="references" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Related</span>
          </TabsTrigger>
        </TabsList>

        {/* Reader Tab */}
        <TabsContent value="reader" className="mt-0">
          <Card className="paper-card">
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div 
                  className="p-6 prose prose-sm max-w-none prose-headings:text-ink prose-p:text-foreground"
                  onMouseUp={() => {
                    const selection = window.getSelection()?.toString();
                    if (selection) {
                      setSelectedText(selection);
                    }
                  }}
                >
                  <div className="space-y-4">
                    {card.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollArea>
              
              {/* Selection Toolbar */}
              {selectedText && (
                <div className="border-t p-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      Selected: "{selectedText}"
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedText('')}>
                        Highlight
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        setChatMessage(`Explain this: "${selectedText}"`);
                        setActiveTab('chat');
                        setSelectedText('');
                      }}>
                        Ask About
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat" className="mt-0">
          <Card className="paper-card">
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="p-4 space-y-4">
                  {mockChatHistory.map((message, index) => (
                    <div key={index} className={cn(
                      "flex gap-3",
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}>
                      <div className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        {message.sources && (
                          <div className="mt-2 pt-2 border-t border-border/50">
                            <p className="text-xs font-medium mb-1">Sources:</p>
                            <div className="flex gap-1 flex-wrap">
                              {message.sources.map((source) => (
                                <Badge key={source} variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Chat Input */}
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about this content..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        // Handle send message
                        setChatMessage('');
                      }
                    }}
                  />
                  <Button size="icon" disabled={!chatMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Chat is scoped to this document's content
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notebook Tab */}
        <TabsContent value="notebook" className="mt-0">
          <Card className="paper-card">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-ink">Your Notes</h3>
                <Badge variant="secondary" className="text-xs">
                  Auto-saved
                </Badge>
              </div>
              <Textarea
                placeholder="Write your thoughts, insights, and key takeaways..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="min-h-[400px] resize-none"
              />
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  Markdown supported
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Link to highlights
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* References Tab */}
        <TabsContent value="references" className="mt-0">
          <Card className="paper-card">
            <CardHeader>
              <CardTitle className="text-lg">Related Content</CardTitle>
              <p className="text-sm text-muted-foreground">
                Similar items from your knowledge base
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockReferences.map((ref, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-sakura rounded flex items-center justify-center">
                      {React.createElement(typeIcons[ref.type], { 
                        className: "w-4 h-4 text-white" 
                      })}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{ref.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(ref.similarity * 100)}% similarity
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}