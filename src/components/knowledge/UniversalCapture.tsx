import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Link, 
  FileText, 
  Youtube, 
  Edit3, 
  Upload,
  Plus,
  Globe,
  FileUp,
  Mic,
  Camera,
  Brain,
  Tags,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaptureResult {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: string;
  confidence: number;
  aiSummary: string;
  extractedEntities: string[];
  suggestedConnections: string[];
}

export function UniversalCapture() {
  const [activeTab, setActiveTab] = useState('smart');
  const [url, setUrl] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CaptureResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateAIProcessing = async (type: string, data: any) => {
    setIsProcessing(true);
    setProgress(0);
    
    const stages = [
      'Analyzing content...',
      'Extracting key information...',
      'Generating AI summary...',
      'Auto-tagging content...',
      'Finding related content...',
      'Creating knowledge connections...'
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      setProgress((i + 1) * (100 / stages.length));
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Mock AI results
    const mockResult: CaptureResult = {
      id: `capture-${Date.now()}`,
      title: type === 'url' ? 'Advanced React Patterns' : 
             type === 'note' ? noteTitle : 
             'Captured Content',
      content: type === 'url' ? 'Comprehensive guide to React patterns including compound components, render props, and custom hooks.' :
               type === 'note' ? noteContent :
               'AI-processed content with extracted insights and key points.',
      tags: ['react', 'javascript', 'programming', 'frontend'],
      type: type,
      confidence: Math.random() * 0.3 + 0.7,
      aiSummary: 'This content discusses advanced React development patterns that improve code reusability and maintenance. Key concepts include component composition and hook patterns.',
      extractedEntities: ['React', 'JavaScript', 'Components', 'Hooks', 'Frontend Development'],
      suggestedConnections: ['web-development-basics', 'javascript-fundamentals', 'component-architecture']
    };

    setResult(mockResult);
    setIsProcessing(false);
    setProgress(100);
  };

  const captureTypes = [
    { 
      id: 'smart', 
      label: 'Smart Capture', 
      icon: Brain, 
      description: 'AI-powered content analysis and auto-tagging',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    { 
      id: 'url', 
      label: 'Web Page', 
      icon: Globe, 
      description: 'Extract and analyze web content',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    { 
      id: 'voice', 
      label: 'Voice Note', 
      icon: Mic, 
      description: 'Record and transcribe audio',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    { 
      id: 'visual', 
      label: 'Visual', 
      icon: Camera, 
      description: 'OCR text from images',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-floating">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-ink">Universal Capture</h1>
        <p className="text-muted-foreground">AI-powered content capture with automatic insights and connections</p>
      </div>

      {/* Capture Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {captureTypes.map((type) => (
          <Card 
            key={type.id}
            className={cn(
              "paper-card cursor-pointer transition-all hover:shadow-floating",
              activeTab === type.id && "ring-2 ring-primary shadow-floating"
            )}
            onClick={() => setActiveTab(type.id)}
          >
            <CardContent className="p-4 text-center space-y-3">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto", type.gradient)}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-ink">{type.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processing Status */}
      {isProcessing && (
        <Card className="paper-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <div className="flex-1">
                  <h3 className="font-semibold text-ink">Processing Content</h3>
                  <p className="text-sm text-muted-foreground">{processingStage}</p>
                </div>
                <Badge variant="secondary">{Math.round(progress)}%</Badge>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Panel */}
      {result && !isProcessing && (
        <Card className="paper-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Content Captured Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-ink mb-2">Title</h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">{result.title}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-ink mb-2">AI Summary</h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">{result.aiSummary}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-ink mb-2">Auto-Generated Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-gradient-sakura text-white">
                        <Tags className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-ink mb-2">Confidence Score</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={result.confidence * 100} className="flex-1" />
                    <span className="text-sm font-medium">{Math.round(result.confidence * 100)}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-ink mb-2">Extracted Entities</h4>
                  <div className="flex flex-wrap gap-1">
                    {result.extractedEntities.map(entity => (
                      <Badge key={entity} variant="outline" className="text-xs">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-ink mb-2">Suggested Connections</h4>
                  <div className="space-y-1">
                    {result.suggestedConnections.map(connection => (
                      <div key={connection} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{connection}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="default" className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Add to Knowledge Base
              </Button>
              <Button variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Smart Capture Form */}
      {activeTab === 'smart' && !result && (
        <Card className="paper-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Smart Capture
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Paste any content and let AI analyze, extract insights, and create connections
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Title (optional - AI will generate if empty)"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="h-12"
            />
            <Textarea
              placeholder="Paste your content here... (URLs, text, notes, quotes, etc.)"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[150px] resize-none"
            />
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                <Brain className="w-3 h-3 mr-1" />
                AI Analysis
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Tags className="w-3 h-3 mr-1" />
                Auto-tagging
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Smart Connections
              </Badge>
            </div>
            <Button 
              onClick={() => simulateAIProcessing('smart', { title: noteTitle, content: noteContent })}
              disabled={!noteContent || isProcessing}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isProcessing ? 'Processing...' : 'Capture with AI'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* URL Capture Form */}
      {activeTab === 'url' && !result && (
        <Card className="paper-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Web Page Capture
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Extract content, generate summary, and create searchable knowledge
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
              onClick={() => simulateAIProcessing('url', { url })}
              disabled={!url || isProcessing}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {isProcessing ? 'Processing...' : 'Capture Page'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Voice Capture */}
      {activeTab === 'voice' && !result && (
        <Card className="paper-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-green-500" />
              Voice Note Capture
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Record audio and get AI transcription with key insights
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                onClick={() => setIsRecording(!isRecording)}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Mic className={cn("w-8 h-8", isRecording && "animate-pulse")} />
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
              </p>
            </div>
            {isRecording && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm">Recording in progress...</span>
                </div>
                <Progress value={30} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Visual Capture */}
      {activeTab === 'visual' && !result && (
        <Card className="paper-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-orange-500" />
              Visual Content Capture
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Extract text from images using advanced OCR technology
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm font-medium mb-2">Drop image here or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, PDF • Max 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    simulateAIProcessing('visual', { file: e.target.files[0] });
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                OCR Text Extraction
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Smart Formatting
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Multi-language Support
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}