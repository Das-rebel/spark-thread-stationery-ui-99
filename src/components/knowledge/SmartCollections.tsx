import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Sparkles, Folder, TrendingUp, Clock, Zap } from "lucide-react";

interface SmartCollection {
  id: string;
  name: string;
  type: "static" | "dynamic";
  description: string;
  itemCount: number;
  lastUpdated: string;
  rules?: string[];
  trending?: boolean;
  growthRate?: number;
}

const mockCollections: SmartCollection[] = [
  {
    id: "1",
    name: "AI Research",
    type: "static",
    description: "Curated AI papers and articles",
    itemCount: 47,
    lastUpdated: "2 hours ago"
  },
  {
    id: "2", 
    name: "Emerging AI Trends",
    type: "dynamic",
    description: "Auto-updating collection of trending AI content",
    itemCount: 23,
    lastUpdated: "5 minutes ago",
    rules: ["Contains: AI, machine learning, neural", "Published: Last 30 days", "Engagement: >100 likes"],
    trending: true,
    growthRate: 15
  },
  {
    id: "3",
    name: "Design Philosophy",
    type: "static", 
    description: "Japanese design and minimalism principles",
    itemCount: 34,
    lastUpdated: "1 day ago"
  },
  {
    id: "4",
    name: "Weekly Discoveries",
    type: "dynamic",
    description: "Content you engage with most each week",
    itemCount: 12,
    lastUpdated: "1 hour ago",
    rules: ["Time saved: This week", "Engagement: High", "Auto-archive: Weekly"],
    trending: false,
    growthRate: 8
  }
];

export function SmartCollections() {
  const [collections, setCollections] = useState(mockCollections);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateCollection = (type: "static" | "dynamic") => {
    if (!newCollectionName.trim()) return;

    const newCollection: SmartCollection = {
      id: Date.now().toString(),
      name: newCollectionName,
      type,
      description: type === "dynamic" ? "Smart collection with AI-powered rules" : "Manually curated collection",
      itemCount: 0,
      lastUpdated: "Just created"
    };

    setCollections([...collections, newCollection]);
    setNewCollectionName("");
    setShowCreateForm(false);
  };

  const staticCollections = collections.filter(c => c.type === "static");
  const dynamicCollections = collections.filter(c => c.type === "dynamic");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">Smart Collections</h2>
          <p className="text-muted-foreground">Organize your knowledge with AI-powered intelligence</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-sakura text-white hover:shadow-floating"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Collection
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="paper-card p-6 border-2 border-dashed border-bamboo">
          <div className="space-y-4">
            <h3 className="font-semibold text-ink">Create New Collection</h3>
            <Input
              placeholder="Collection name..."
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCreateCollection("static")}
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => handleCreateCollection("static")}
                variant="outline"
                className="border-ink text-ink hover:bg-washi"
              >
                <Folder className="w-4 h-4 mr-2" />
                Static Collection
              </Button>
              <Button 
                onClick={() => handleCreateCollection("dynamic")}
                className="bg-gradient-bamboo text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Smart Collection
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Collections Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Collections</TabsTrigger>
          <TabsTrigger value="static">Static</TabsTrigger>
          <TabsTrigger value="dynamic">Smart</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="static" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staticCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dynamic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dynamicCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CollectionCard({ collection }: { collection: SmartCollection }) {
  return (
    <Card className="paper-card p-4 hover:shadow-floating transition-shadow cursor-pointer">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {collection.type === "dynamic" ? (
              <Sparkles className="w-5 h-5 text-bamboo" />
            ) : (
              <Folder className="w-5 h-5 text-ink" />
            )}
            <h3 className="font-semibold text-ink">{collection.name}</h3>
          </div>
          {collection.trending && (
            <Badge variant="secondary" className="bg-gradient-seal text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{collection.description}</p>

        {/* Smart Rules */}
        {collection.rules && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-bamboo">Smart Rules:</p>
            {collection.rules.map((rule, index) => (
              <div key={index} className="text-xs text-muted-foreground bg-washi px-2 py-1 rounded">
                {rule}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium">{collection.itemCount} items</span>
            {collection.growthRate && (
              <div className="flex items-center gap-1 text-bamboo">
                <Zap className="w-3 h-3" />
                <span>+{collection.growthRate}%</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{collection.lastUpdated}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-bamboo text-bamboo hover:bg-washi"
        >
          Open Collection
        </Button>
      </div>
    </Card>
  );
}