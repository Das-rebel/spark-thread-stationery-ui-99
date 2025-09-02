import React, { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Play, Pause, Search, BookOpen, FileText, Video, Lightbulb, Zap } from "lucide-react";

interface KnowledgeNode {
  id: string;
  position: [number, number, number];
  type: 'concept' | 'document' | 'bookmark' | 'note' | 'video';
  title: string;
  content: string;
  connections: string[];
  strength: number;
  category: string;
  lastAccessed: string;
  tags: string[];
}

const nodeTypeConfig = {
  concept: { color: '#FF6B9D', icon: Lightbulb, size: 0.4 },
  document: { color: '#4ECDC4', icon: FileText, size: 0.3 },
  bookmark: { color: '#45B7D1', icon: BookOpen, size: 0.3 },
  note: { color: '#F7DC6F', icon: FileText, size: 0.35 },
  video: { color: '#FF7043', icon: Video, size: 0.35 }
};

function KnowledgeNodeMesh({ 
  node, 
  isSelected, 
  isHighlighted,
  onClick, 
  onHover 
}: { 
  node: KnowledgeNode;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = hovered || isSelected ? 1.2 : 1.0;
      const activity = 0.8 + Math.sin(time * 2 + node.strength * 10) * 0.2;
      meshRef.current.scale.setScalar(scale * activity);
      
      // Gentle floating animation
      meshRef.current.position.y = node.position[1] + Math.sin(time * 0.5 + node.id.length) * 0.1;
    }
  });

  const config = nodeTypeConfig[node.type];
  const color = useMemo(() => new THREE.Color(config.color), [config.color]);

  return (
    <group position={node.position}>
      <mesh 
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true);
          onHover(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(false);
        }}
      >
        <sphereGeometry args={[config.size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={isHighlighted ? 0.6 : (hovered || isSelected ? 0.4 : 0.2)}
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={isHighlighted ? 1.0 : 0.9}
        />
      </mesh>
      
      {/* Node label */}
      <Text
        position={[0, -config.size - 0.3, 0]}
        fontSize={0.2}
        color={hovered || isSelected ? "#FFFFFF" : "#888888"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {node.title.substring(0, 20)}...
      </Text>

      {/* Hover preview */}
      {hovered && (
        <Html position={[0.5, 0.5, 0]} style={{ pointerEvents: 'none' }}>
          <Card className="paper-card p-3 max-w-xs bg-background/95 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <config.icon className="w-4 h-4 mt-0.5" style={{ color: config.color }} />
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-ink">{node.title}</h4>
                <p className="text-xs text-muted-foreground">{node.content.substring(0, 100)}...</p>
                <div className="flex gap-1">
                  {node.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Html>
      )}
    </group>
  );
}

function ConnectionLine({ 
  start, 
  end, 
  strength,
  isHighlighted
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  strength: number;
  isHighlighted: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const time = state.clock.getElapsedTime();
      const opacity = isHighlighted ? 0.8 : (0.2 + strength * 0.4);
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = 
        opacity + Math.sin(time * 2) * 0.1;
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const color = useMemo(() => {
    const lightness = isHighlighted ? 80 : Math.max(30, Math.min(70, 40 + strength * 40));
    return new THREE.Color(`hsl(200, 70%, ${lightness}%)`);
  }, [strength, isHighlighted]);

  return (
    <primitive 
      ref={lineRef}
      object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.4,
        linewidth: isHighlighted ? 3 : 1
      }))} 
    />
  );
}

function KnowledgeScene({ 
  nodes, 
  isAnimating,
  selectedNode,
  searchQuery,
  onNodeSelect
}: { 
  nodes: KnowledgeNode[];
  isAnimating: boolean;
  selectedNode: string | null;
  searchQuery: string;
  onNodeSelect: (nodeId: string | null) => void;
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { camera } = useThree();

  // Filter nodes based on search
  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodes;
    return nodes.filter(node => 
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [nodes, searchQuery]);

  // Calculate connections
  const connections = useMemo(() => {
    const conns: Array<{ 
      start: [number, number, number]; 
      end: [number, number, number]; 
      strength: number;
      isHighlighted: boolean;
    }> = [];
    
    filteredNodes.forEach((node) => {
      node.connections.forEach((connId) => {
        const targetNode = filteredNodes.find(n => n.id === connId);
        if (targetNode) {
          const isHighlighted = selectedNode === node.id || 
                               selectedNode === targetNode.id ||
                               hoveredNode === node.id ||
                               hoveredNode === targetNode.id;
          
          conns.push({
            start: node.position,
            end: targetNode.position,
            strength: (node.strength + targetNode.strength) / 2,
            isHighlighted
          });
        }
      });
    });
    
    return conns;
  }, [filteredNodes, selectedNode, hoveredNode]);

  const focusOnNode = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node && camera) {
      camera.position.set(
        node.position[0] + 5,
        node.position[1] + 5,
        node.position[2] + 5
      );
      camera.lookAt(new THREE.Vector3(...node.position));
    }
  }, [nodes, camera]);

  return (
    <>
      {/* Dynamic lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, 5, 5]} intensity={0.6} color="#ff9999" />
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.8}
        castShadow
      />
      
      {/* Render connections */}
      {connections.map((conn, index) => (
        <ConnectionLine
          key={`conn-${index}`}
          start={conn.start}
          end={conn.end}
          strength={conn.strength}
          isHighlighted={conn.isHighlighted}
        />
      ))}
      
      {/* Render nodes */}
      {filteredNodes.map((node) => (
        <KnowledgeNodeMesh
          key={node.id}
          node={node}
          isSelected={selectedNode === node.id}
          isHighlighted={searchQuery ? (
            node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          ) : false}
          onClick={() => {
            onNodeSelect(node.id === selectedNode ? null : node.id);
            focusOnNode(node.id);
          }}
          onHover={(hovered) => setHoveredNode(hovered ? node.id : null)}
        />
      ))}

      {/* Floating particles for ambiance */}
      {isAnimating && Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`particle-${i}`} position={[
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
          Math.random() * 20 - 10
        ]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

export function KnowledgeGraph3D() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'explore' | 'focus' | 'timeline'>('explore');
  
  // Mock knowledge nodes data
  const nodes: KnowledgeNode[] = useMemo(() => [
    {
      id: 'concept-1',
      position: [0, 0, 0],
      type: 'concept',
      title: 'Knowledge Management',
      content: 'The systematic approach to capturing, developing, sharing and effectively using knowledge.',
      connections: ['doc-1', 'note-1', 'bookmark-1'],
      strength: 0.9,
      category: 'Core Concepts',
      lastAccessed: '2 hours ago',
      tags: ['productivity', 'learning', 'systems']
    },
    {
      id: 'doc-1',
      position: [-3, 2, 1],
      type: 'document',
      title: 'Building a Second Brain',
      content: 'A proven method to organize your digital life and unlock your creative potential.',
      connections: ['concept-1', 'note-2'],
      strength: 0.85,
      category: 'Books',
      lastAccessed: '1 day ago',
      tags: ['productivity', 'note-taking', 'creativity']
    },
    {
      id: 'bookmark-1',
      position: [3, -1, 2],
      type: 'bookmark',
      title: 'Obsidian Graph View',
      content: 'Interactive graph database for knowledge management and note connections.',
      connections: ['concept-1', 'video-1'],
      strength: 0.75,
      category: 'Tools',
      lastAccessed: '3 hours ago',
      tags: ['tools', 'visualization', 'notes']
    },
    {
      id: 'note-1',
      position: [-2, -2, -1],
      type: 'note',
      title: 'My Learning System',
      content: 'Personal notes on creating an effective learning and retention system.',
      connections: ['concept-1', 'doc-1'],
      strength: 0.8,
      category: 'Personal',
      lastAccessed: '5 hours ago',
      tags: ['personal', 'learning', 'system']
    },
    {
      id: 'video-1',
      position: [2, 3, -2],
      type: 'video',
      title: 'Zettelkasten Method Explained',
      content: 'Video tutorial on implementing the Zettelkasten method for knowledge work.',
      connections: ['bookmark-1', 'note-2'],
      strength: 0.7,
      category: 'Education',
      lastAccessed: '1 day ago',
      tags: ['video', 'method', 'tutorial']
    },
    {
      id: 'note-2',
      position: [0, -3, 3],
      type: 'note',
      title: 'Connection Insights',
      content: 'Observations about how different ideas connect and reinforce each other.',
      connections: ['doc-1', 'video-1'],
      strength: 0.6,
      category: 'Insights',
      lastAccessed: '2 days ago',
      tags: ['insights', 'connections', 'meta']
    }
  ], []);

  const selectedNodeData = useMemo(() => 
    nodes.find(node => node.id === selectedNode), 
    [nodes, selectedNode]
  );

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-background via-muted/30 to-background rounded-xl border border-border overflow-hidden">
      <Canvas
        camera={{ position: [8, 8, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        shadows
      >
        <KnowledgeScene 
          nodes={nodes} 
          isAnimating={isAnimating}
          selectedNode={selectedNode}
          searchQuery={searchQuery}
          onNodeSelect={setSelectedNode}
        />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={20}
          autoRotate={isAnimating && !selectedNode}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Control Panel */}
      <div className="absolute top-4 left-4 space-y-2">
        <Badge variant="secondary" className="text-xs font-inter bg-background/90 backdrop-blur-sm">
          <Zap className="w-3 h-3 mr-1" />
          Knowledge Graph 3D
        </Badge>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isAnimating ? "default" : "outline"}
            onClick={() => setIsAnimating(!isAnimating)}
            className="text-xs bg-background/90 backdrop-blur-sm"
          >
            {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedNode(null)}
            className="text-xs bg-background/90 backdrop-blur-sm"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="absolute top-4 right-4 w-64">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search knowledge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Node Info Panel */}
      {selectedNodeData && (
        <div className="absolute bottom-4 left-4 max-w-sm">
          <Card className="paper-card p-4 bg-background/95 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: nodeTypeConfig[selectedNodeData.type].color }}
              >
                {React.createElement(nodeTypeConfig[selectedNodeData.type].icon, {
                  className: "w-4 h-4 text-white"
                })}
              </div>
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-ink">{selectedNodeData.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedNodeData.content.substring(0, 120)}...
                </p>
                <div className="flex gap-1">
                  {selectedNodeData.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedNodeData.connections.length} connections • {selectedNodeData.lastAccessed}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Stats Panel */}
      <div className="absolute bottom-4 right-4">
        <Badge variant="outline" className="text-xs font-inter bg-background/90 backdrop-blur-sm">
          {nodes.length} Nodes • {nodes.reduce((acc, node) => acc + node.connections.length, 0)} Connections
        </Badge>
      </div>
    </div>
  );
}