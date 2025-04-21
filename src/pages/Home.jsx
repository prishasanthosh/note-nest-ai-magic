import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createNote, updateNote, deleteNote, getUserNotes } from "../services/noteService";
import { generateSummary } from "../services/aiService";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import EmptyState from "../components/EmptyState";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [currentSummary, setCurrentSummary] = useState("");
  const [summarizingNote, setSummarizingNote] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const userNotes = await getUserNotes(currentUser.uid);
        setNotes(userNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load notes. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [notes, searchQuery]);

  const handleAddNote = async (noteData) => {
    try {
      // Add timestamp if not present
      const noteWithTimestamp = {
        ...noteData,
        timestamp: new Date().toISOString(), // Add timestamp
      };

      // Create note in Firestore
      await createNote(currentUser.uid, noteWithTimestamp);

      setIsModalOpen(false);
      const updatedNotes = await getUserNotes(currentUser.uid);
      setNotes(updatedNotes);

      toast({
        title: "Success",
        description: "Note created successfully!",
      });
    } catch (error) {
      console.error("Error adding note:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create note. Please try again.",
      });
    }
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await updateNote(currentNote.id, noteData);
      setIsModalOpen(false);
      setCurrentNote(null);
      const updatedNotes = await getUserNotes(currentUser.uid);
      setNotes(updatedNotes);
      toast({
        title: "Success",
        description: "Note updated successfully!",
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update note. Please try again.",
      });
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(noteId);
        const updatedNotes = await getUserNotes(currentUser.uid);
        setNotes(updatedNotes);
        toast({
          title: "Success",
          description: "Note deleted successfully!",
        });
      } catch (error) {
        console.error("Error deleting note:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete note. Please try again.",
        });
      }
    }
  };

  const handleSummarizeNote = async (note) => {
    try {
      setSummarizingNote(note);
      setCurrentSummary("Generating summary...");
      setSummaryDialogOpen(true);

      const summary = await generateSummary(note.content);
      setCurrentSummary(summary);
    } catch (error) {
      console.error("Error summarizing note:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate summary. Please try again.",
      });
      setSummaryDialogOpen(false);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row">
      {/* Notes Section */}
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Your Notes</h1>
          <div className="w-full md:w-auto flex">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 pr-10 w-full"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <p className="text-lg text-muted-foreground">Loading notes...</p>
            </div>
          </div>
        ) : filteredNotes.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <NoteCard
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onSummarize={handleSummarizeNote}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 mt-10 text-center w-full">
            {searchQuery ? (
              <p className="text-muted-foreground text-lg">No notes match your search.</p>
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/3 bg-gray-50 p-6 border-l border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Add a New Note</h2>
        <NoteForm onSubmit={handleAddNote} />
      </div>

      {/* Note Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentNote ? "Edit Note" : "Add Note"}</DialogTitle>
            <DialogDescription>
              {currentNote ? "Edit your note details below." : "Create a new note."}
            </DialogDescription>
          </DialogHeader>
          <NoteForm
            currentNote={currentNote}
            onSubmit={currentNote ? handleUpdateNote : handleAddNote}
            onClose={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Summary Dialog */}
      <Dialog open={summaryDialogOpen} onOpenChange={setSummaryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Summary</DialogTitle>
            <DialogDescription>{currentSummary}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
