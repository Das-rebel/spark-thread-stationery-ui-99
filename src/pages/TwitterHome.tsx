
import { AppLayout } from "@/components/layout/AppLayout";
import { TwitterFeed } from "@/components/twitter/TwitterFeed";
import { motion } from "framer-motion";

const TwitterHome = () => {
  return (
    <AppLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gradient-paper"
      >
        <div className="max-w-2xl mx-auto">
          <TwitterFeed />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default TwitterHome;
