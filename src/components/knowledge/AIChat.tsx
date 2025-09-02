import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, BookOpen, Brain, Search } from "lucide-react";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  suggestions?: string[];
  bookmarks?: Array<{
    id: string;
    title: string;
    url: string;
    relevance: number;
  }>;
}

const mockResponses = [
  "I found 12 bookmarks related to AI safety from last month. Here are the most relevant ones...",
  "Based on your bookmark patterns, you seem interested in transformer architectures. Here are some related concepts you might want to explore...",
  "I notice you often bookmark content about Japanese design principles. This connects to your minimalism collection...",
  "Your knowledge graph shows a strong connection between machine learning and design thinking. Would you like me to explore this intersection?",
];

const quickPrompts = [
  "Show me my AI bookmarks from last week",
  "What topics am I most interested in?",
  "Find connections between my design and tech bookmarks",
  "Suggest new topics based on my interests"
];

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "ai",
      content: "Hello! I'm your personal knowledge assistant. I can help you explore your bookmarks, discover connections, and suggest new learning paths. What would you like to know?",
      timestamp: new Date().toLocaleTimeString(),
      suggestions: quickPrompts.slice(0, 2)
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (message: string = input) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date().toLocaleTimeString(),
        bookmarks: message.toLowerCase().includes("bookmark") ? [
          {
            id: "1",
            title: "AI Safety Research Paper",
            url: "https://example.com/ai-safety",
            relevance: 0.95
          },
          {
            id: "2", 
            title: "Neural Network Architecture Guide",
            url: "https://example.com/neural-nets",
            relevance: 0.87
          }
        ] : undefined,
        suggestions: quickPrompts.slice(Math.floor(Math.random() * 2), Math.floor(Math.random() * 2) + 2)
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="paper-card h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-sakura rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-ink">Knowledge Assistant</h3>
            <p className="text-sm text-muted-foreground">Your personal AI guide</p>
          </div>
          <Badge variant="secondary" className="ml-auto bg-gradient-bamboo text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-gradient-ink text-white ml-4"
                    : "bg-washi border border-border mr-4"
                }`}
              >
                <p className={`text-sm ${message.type === "user" ? "text-white" : "text-foreground"}`}>
                  {message.content}
                </p>
                
                {/* Bookmarks Results */}
                {message.bookmarks && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-bamboo">Related Bookmarks:</p>
                    {message.bookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="p-2 bg-background rounded border border-border hover:shadow-paper transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-medium text-foreground">{bookmark.title}</p>
                            <p className="text-xs text-muted-foreground">{bookmark.url}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {(bookmark.relevance * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium text-bamboo">Try asking:</p>
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(suggestion)}
                        className="block w-full text-left text-xs p-2 rounded bg-background hover:bg-muted border border-border transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-2">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-washi border border-border rounded-lg p-3 mr-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-bamboo rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-bamboo rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-bamboo rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border">
        <div className="flex gap-2 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSend("Show me my recent bookmarks")}
            className="text-xs"
          >
            <BookOpen className="w-3 h-3 mr-1" />
            Recent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSend("Find knowledge gaps")}
            className="text-xs"
          >
            <Search className="w-3 h-3 mr-1" />
            Gaps
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSend("Suggest new topics")}
            className="text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Discover
          </Button>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your knowledge..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="bg-gradient-sakura text-white hover:shadow-floating"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}