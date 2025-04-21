
import { motion } from "framer-motion";
import { FiClipboard } from "react-icons/fi";

const EmptyState = ({ message }) => {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-accent rounded-full p-8 mb-6">
        <FiClipboard className="text-6xl text-purple-light" />
      </div>
      <h3 className="text-xl font-medium mb-2">No notes found</h3>
      <p className="text-muted-foreground max-w-md">
        {message || "Start creating notes and they will appear here."}
      </p>
    </motion.div>
  );
};

export default EmptyState;
