
import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { MdOutlineSummarize } from "react-icons/md";

const NoteCard = ({ note, onEdit, onDelete, onSummarize }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle Firebase Timestamp conversion to date for formatting
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now";
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  
  return (
    <motion.div
      className="note-card h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{note.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {formatTimestamp(note.createdAt)}
        </p>
        <p className="text-foreground mb-4 flex-grow line-clamp-4">
          {note.content}
        </p>
        
        <div className="flex justify-end space-x-2 mt-2">
          <motion.button
            onClick={() => onSummarize(note)}
            className="p-2 rounded-full text-purple hover:bg-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdOutlineSummarize className="text-lg" />
          </motion.button>
          <motion.button
            onClick={() => onEdit(note)}
            className="p-2 rounded-full text-purple hover:bg-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiEdit3 />
          </motion.button>
          <motion.button
            onClick={() => onDelete(note.id)}
            className="p-2 rounded-full text-destructive hover:bg-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTrash2 />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
