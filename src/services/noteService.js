import { db } from "../lib/firebase"; // Assuming you're using Firebase
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";

// Create note
export const createNote = async (userId, noteData) => {
  try {
    const noteRef = await addDoc(collection(db, "users", userId, "notes"), noteData);
    return noteRef;
  } catch (error) {
    console.error("Error adding note: ", error);
    throw new Error("Failed to create note.");
  }
};

// Get notes for user
export const getUserNotes = async (userId) => {
  try {
    const notesQuery = query(collection(db, "users", userId, "notes"));
    const querySnapshot = await getDocs(notesQuery);
    const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return notes;
  } catch (error) {
    console.error("Error fetching notes: ", error);
    throw new Error("Failed to fetch notes.");
  }
};

// Update note
export const updateNote = async (noteId, noteData) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, noteData);
  } catch (error) {
    console.error("Error updating note: ", error);
    throw new Error("Failed to update note.");
  }
};

// Delete note
export const deleteNote = async (noteId) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
  } catch (error) {
    console.error("Error deleting note: ", error);
    throw new Error("Failed to delete note.");
  }
};
