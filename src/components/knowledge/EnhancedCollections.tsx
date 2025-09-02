import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Plus, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronRight, 
  Search,
  Filter,
  Grid,
  List,
  BookOpen,
  Video,
  FileText,
  Link as LinkIcon,
  Image,
  Archive
} from "lucide-react";

interface CollectionItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'document' | 'link' | 'image';
  url?: string;
  tags: string[];
  createdAt: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  color: string;
  itemCount: number;
  lastUpdated: string;
  category: string;
  subcategories: SubCategory[];
  items: CollectionItem[];
  isOpen?: boolean;
}

interface SubCategory {
  id: string;
  name: string;
  itemCount: number;
  items: CollectionItem[];
  isOpen?: boolean;
}

const typeIcons = {
  article: BookOpen,
  video: Video,
  document: FileText,
  link: LinkIcon,
  image: Image
};

const mockCollections: Collection[] = [
  {
    id: "1",
    name: "Machine Learning",
    description: "AI and ML resources",
    color: "bg-blue-500",
    itemCount: 34,
    lastUpdated: "2 hours ago",
    category: "Technology",
    subcategories: [
      {
        id: "1-1",
        name: "Fundamentals",
        itemCount: 12,
        items: [],
        isOpen: false
      },
      {
        id: "1-2", 
        name: "Deep Learning",
        itemCount: 15,
        items: [],
        isOpen: false
      },
      {
        id: "1-3",
        name: "Applications",
        itemCount: 7,
        items: [],
        isOpen: false
      }
    ],
    items: [],
    isOpen: false
  },
  {
    id: "2",
    name: "Design Systems",
    description: "UI/UX design resources",
    color: "bg-purple-500",
    itemCount: 28,
    lastUpdated: "1 day ago",
    category: "Design",
    subcategories: [
      {
        id: "2-1",
        name: "Component Libraries",
        itemCount: 10,
        items: [],
        isOpen: false
      },
      {
        id: "2-2",
        name: "Design Tokens",
        itemCount: 8,
        items: [],
        isOpen: false
      },
      {
        id: "2-3",
        name: "Case Studies",
        itemCount: 10,
        items: [],
        isOpen: false
      }
    ],
    items: [],
    isOpen: false
  },
  {
    id: "3",
    name: "Productivity",
    description: "Tools and methodologies",
    color: "bg-green-500",
    itemCount: 22,
    lastUpdated: "3 hours ago",
    category: "Personal Development",
    subcategories: [
      {
        id: "3-1",
        name: "Time Management",
        itemCount: 8,
        items: [],
        isOpen: false
      },
      {
        id: "3-2",
        name: "Note Taking",
        itemCount: 9,
        items: [],
        isOpen: false
      },
      {
        id: "3-3",
        name: "Workflow Automation",
        itemCount: 5,
        items: [],
        isOpen: false
      }
    ],
    items: [],
    isOpen: false
  }
];

export function EnhancedCollections() {
  const [collections, setCollections] = useState(mockCollections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const categories = ["all", ...Array.from(new Set(collections.map(c => c.category)))];

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || collection.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCollection = (collectionId: string) => {
    setCollections(collections.map(c => 
      c.id === collectionId ? { ...c, isOpen: !c.isOpen } : c
    ));
  };

  const toggleSubCategory = (collectionId: string, subCategoryId: string) => {
    setCollections(collections.map(c => 
      c.id === collectionId 
        ? {
            ...c,
            subcategories: c.subcategories.map(sub =>
              sub.id === subCategoryId ? { ...sub, isOpen: !sub.isOpen } : sub
            )
          }
        : c
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">Enhanced Collections</h2>
          <p className="text-muted-foreground">Organize with hierarchical categories</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-sakura text-white hover:shadow-floating"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Collection
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="paper-card p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === 'all' ? 'All' : category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="paper-card p-6 border-2 border-dashed border-bamboo">
          <div className="space-y-4">
            <h3 className="font-semibold text-ink">Create New Collection</h3>
            <Input
              placeholder="Collection name..."
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <div className="flex gap-2">
              <Button className="bg-gradient-bamboo text-white">
                Create Collection
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Collections */}
      <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
        {filteredCollections.map((collection) => (
          <CollectionCard 
            key={collection.id} 
            collection={collection}
            viewMode={viewMode}
            onToggle={() => toggleCollection(collection.id)}
            onToggleSubCategory={(subId) => toggleSubCategory(collection.id, subId)}
          />
        ))}
      </div>
    </div>
  );
}

function CollectionCard({ 
  collection, 
  viewMode,
  onToggle,
  onToggleSubCategory 
}: { 
  collection: Collection;
  viewMode: 'grid' | 'list';
  onToggle: () => void;
  onToggleSubCategory: (subId: string) => void;
}) {
  return (
    <Card className="paper-card p-4 hover:shadow-floating transition-shadow">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${collection.color}`} />
            <div>
              <h3 className="font-semibold text-ink">{collection.name}</h3>
              <p className="text-sm text-muted-foreground">{collection.description}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onToggle}
            className="text-muted-foreground hover:text-ink"
          >
            {collection.isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium">{collection.itemCount} items</span>
            <Badge variant="outline" className="text-xs">{collection.category}</Badge>
          </div>
          <span className="text-muted-foreground">{collection.lastUpdated}</span>
        </div>

        {/* Subcategories */}
        <Collapsible open={collection.isOpen}>
          <CollapsibleContent>
            <div className="space-y-2 pl-4 border-l-2 border-border">
              {collection.subcategories.map((subCategory) => (
                <div key={subCategory.id} className="space-y-1">
                  <button
                    onClick={() => onToggleSubCategory(subCategory.id)}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-washi text-left"
                  >
                    <div className="flex items-center gap-2">
                      {subCategory.isOpen ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                      <span className="text-sm font-medium">{subCategory.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{subCategory.itemCount}</span>
                  </button>
                  
                  <Collapsible open={subCategory.isOpen}>
                    <CollapsibleContent>
                      <div className="pl-6 space-y-1">
                        {/* Sample items - in real app would show actual items */}
                        {Array.from({ length: Math.min(3, subCategory.itemCount) }).map((_, i) => (
                          <div key={i} className="flex items-center gap-2 p-1 text-xs text-muted-foreground">
                            <FileText className="w-3 h-3" />
                            <span>Sample item {i + 1}</span>
                          </div>
                        ))}
                        {subCategory.itemCount > 3 && (
                          <div className="text-xs text-muted-foreground pl-5">
                            +{subCategory.itemCount - 3} more items
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

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