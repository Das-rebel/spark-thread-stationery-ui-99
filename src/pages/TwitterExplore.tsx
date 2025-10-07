import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Users, Hash } from "lucide-react";
import { motion } from "framer-motion";

const trendingTopics = [
  { tag: "#NeuralNetworks", tweets: "234K", growth: "+12%" },
  { tag: "#MachineLearning", tweets: "187K", growth: "+8%" },
  { tag: "#AI", tweets: "456K", growth: "+15%" },
  { tag: "#DeepLearning", tweets: "98K", growth: "+5%" },
  { tag: "#TechInnovation", tweets: "76K", growth: "+23%" },
];

const suggestedUsers = [
  { name: "Dr. Neural", handle: "@drneural", followers: "125K", bio: "AI Researcher at Tech Corp" },
  { name: "Code Whisperer", handle: "@codewhisper", followers: "89K", bio: "ML Engineer & Blogger" },
  { name: "Data Sage", handle: "@datasage", followers: "203K", bio: "Chief Data Scientist" },
];

const TwitterExplore = () => {
  return (
    <AppLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gradient-paper pb-24"
      >
        <div className="max-w-2xl mx-auto p-3 space-y-3">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="paper-card p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search topics, people..." className="pl-10 bg-background/50 border-border text-sm" />
              </div>
            </Card>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="paper-card p-3">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="text-base font-semibold text-ink">Trending</h2>
              </div>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-smooth cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Hash className="w-3 h-3 text-bamboo" />
                        <span className="font-semibold text-ink text-sm">{topic.tag}</span>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {topic.growth}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{topic.tweets} tweets</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Suggested Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="paper-card p-3">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <h2 className="text-base font-semibold text-ink">Suggested</h2>
              </div>
              <div className="space-y-2">
                {suggestedUsers.map((user, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-smooth"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-10 h-10 bg-gradient-sakura rounded-full flex items-center justify-center text-base seal-stamp"
                      >
                        {user.name[0]}
                      </motion.div>
                      <div>
                        <div className="font-semibold text-ink text-sm">{user.name}</div>
                        <div className="text-xs text-bamboo">{user.handle}</div>
                        <div className="text-[10px] text-muted-foreground">{user.bio}</div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Follow
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Popular Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="paper-card p-3">
              <h2 className="text-base font-semibold text-ink mb-3">Categories</h2>
              <div className="grid grid-cols-2 gap-2">
                {["Technology", "Science", "Business", "Design"].map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button variant="outline" className="h-16 w-full flex flex-col items-center justify-center gap-1">
                      <Hash className="w-4 h-4 text-primary" />
                      <span className="font-medium text-xs">{category}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default TwitterExplore;
