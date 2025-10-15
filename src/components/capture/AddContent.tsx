import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Link, 
  FileText, 
  Youtube, 
  Edit3, 
  Upload,
  Plus,
  Globe,
  FileUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { urlSchema, noteSchema } from '@/lib/validation';
import { toast } from 'sonner';
import { z } from 'zod';

export function AddContent() {
  const [activeTab, setActiveTab] = useState('url');
  const [url, setUrl] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = async (type: string, data: any) => {
    setIsProcessing(true);
    
    try {
      // Validate based on type
      if (type === 'url' || type === 'youtube') {
        urlSchema.parse(data.url);
      } else if (type === 'note') {
        noteSchema.parse({ title: data.title, content: data.content, tags: '' });
      } else if (type === 'pdf') {
        // Validate file
        const file = data.file;
        if (!file || file.type !== 'application/pdf') {
          throw new Error('Invalid file type. Please upload a PDF file.');
        }
        if (file.size > 25 * 1024 * 1024) {
          throw new Error('File too large. Maximum size is 25MB.');
        }
      }
      
      // Mock success - actual processing would be handled by backend
      toast.success('Content captured successfully!');
      
      // Reset form
      if (type === 'url' || type === 'youtube') {
        setUrl('');
      } else if (type === 'note') {
        setNoteTitle('');
        setNoteContent('');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to capture content');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const captureTypes = [
    { 
      id: 'url', 
      label: 'Web Page', 
      icon: Globe, 
      description: 'Capture articles, blogs, documentation',
      placeholder: 'https://example.com/article'
    },
    { 
      id: 'youtube', 
      label: 'YouTube', 
      icon: Youtube, 
      description: 'Save video transcripts and notes',
      placeholder: 'https://youtube.com/watch?v=...'
    },
    { 
      id: 'pdf', 
      label: 'PDF', 
      icon: FileText, 
      description: 'Upload research papers, documents',
      placeholder: 'Upload PDF file'
    },
    { 
      id: 'note', 
      label: 'Note', 
      icon: Edit3, 
      description: 'Write your own thoughts and ideas',
      placeholder: 'Start writing...'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-sakura rounded-2xl flex items-center justify-center mx-auto">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-ink">Add to Knowledge Base</h1>
        <p className="text-muted-foreground">Capture content to create a new Recall Card</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-washi">
          {captureTypes.map((type) => (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className="flex flex-col items-center gap-2 p-4 h-auto data-[state=active]:bg-card data-[state=active]:shadow-paper"
            >
              <type.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* URL Capture */}
        <TabsContent value="url" className="space-y-4">
          <Card className="paper-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-primary" />
                Capture Web Page
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Extract clean text, generate summary, and create searchable content
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12"
              />
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Auto-extract text
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Generate summary
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Create Q&A cards
                </Badge>
              </div>
              <Button 
                onClick={() => handleCapture('url', { url })}
                disabled={!url || isProcessing}
                className="w-full h-12"
                variant="sakura"
              >
                {isProcessing ? 'Processing...' : 'Capture Page'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* YouTube Capture */}
        <TabsContent value="youtube" className="space-y-4">
          <Card className="paper-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Youtube className="w-5 h-5 text-red-500" />
                Capture YouTube Video
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Extract transcript, key moments, and create study materials
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12"
              />
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Auto-transcript
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Key moments
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Study cards
                </Badge>
              </div>
              <Button 
                onClick={() => handleCapture('youtube', { url })}
                disabled={!url || isProcessing}
                className="w-full h-12"
                variant="sakura"
              >
                {isProcessing ? 'Processing...' : 'Capture Video'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PDF Upload */}
        <TabsContent value="pdf" className="space-y-4">
          <Card className="paper-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-blue-500" />
                Upload PDF Document
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Process research papers, books, and documents
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <FileUp className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium mb-2">Drop PDF file here or click to browse</p>
                <p className="text-xs text-muted-foreground">Maximum file size: 25MB</p>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleCapture('pdf', { file: e.target.files[0] });
                    }
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Text extraction
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Chapter detection
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Reference parsing
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Note Creation */}
        <TabsContent value="note" className="space-y-4">
          <Card className="paper-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Edit3 className="w-5 h-5 text-green-500" />
                Create Note
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Write your thoughts, ideas, and personal insights
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Note title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="h-12 font-medium"
              />
              <Textarea
                placeholder="Start writing your note..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Markdown support
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Auto-save
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Smart linking
                </Badge>
              </div>
              <Button 
                onClick={() => handleCapture('note', { title: noteTitle, content: noteContent })}
                disabled={!noteTitle || !noteContent || isProcessing}
                className="w-full h-12"
                variant="sakura"
              >
                {isProcessing ? 'Saving...' : 'Create Note'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}