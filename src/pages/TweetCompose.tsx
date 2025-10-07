import { AppLayout } from "@/components/layout/AppLayout";
import { TweetComposer } from "@/components/twitter/TweetComposer";
import { motion } from "framer-motion";

const TweetCompose = () => {
  return (
    <AppLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gradient-paper pb-24"
      >
        <div className="max-w-2xl mx-auto p-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TweetComposer />
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default TweetCompose;