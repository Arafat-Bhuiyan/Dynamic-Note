"use client";
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Spinner } from "@/components/widgets";
import axios from "axios";

const NoteDetail = ({ noteId }) => {
  const storeSingleData = useStoreState((state) => state.singleData);
  const isDataLoading = useStoreState((state) => state.isLoading);
  const fetchSingleNote = useStoreActions((actions) => actions.fetchSingleNote);
  const updateData = useStoreActions((actions) => actions.updateData);
  const setTempNote = useStoreActions((actions) => actions.setTempNote);

  const [noteData, setNoteData] = useState({
    id: null,
    title: "",
    body: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (noteId) {
      fetchSingleNote(noteId); // Fetch note when noteId changes
    }
  }, [noteId, fetchSingleNote]);

  useEffect(() => {
    if (storeSingleData?.id) {
      setNoteData({
        id: storeSingleData.id ?? null,
        title: storeSingleData.title ?? "",
        body: storeSingleData.body ?? "",
      });
    }
  }, [storeSingleData]);

  const handleInputChange = (field, value) => {
    const updatedNote = { ...noteData, [field]: value };
    setNoteData(updatedNote);
    setTempNote(updatedNote); // Live updates to tempNote
  };

  const handleSave = async () => {
    if (noteData.title.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }
    if (noteData.body.trim() === "") {
      alert("Body cannot be empty.");
      return;
    }

    const updatedNoteData = {
      ...noteData,
      lastUpdated: new Date().toISOString(),
    };

    try {
      await axios.put(`/notes/${noteData.id}`, updatedNoteData);
      alert("Note updated successfully!");
      updateData(updatedNoteData);
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("Error updating note. Please try again.");
    }

    setTempNote(null); // Reset tempNote
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="w-full bg-gray-100 flex flex-col p-6 rounded-md">
      {isDataLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-600">
            {!isEditing ? (
              noteData.title
            ) : (
              <input
                type="text"
                placeholder="Title"
                value={noteData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="text-xl font-bold text-gray-600 mb-2 w-full h-10 p-0"
              />
            )}
          </h1>
          <p className="text-lg">
            {!isEditing ? (
              noteData.body
            ) : (
              <textarea
                placeholder="Take a note..."
                value={noteData.body}
                onChange={(e) => handleInputChange("body", e.target.value)}
                className="w-full text-gray-400 h-40 p-2 border rounded resize-none"
              />
            )}
          </p>
          <div>
            <button
              onClick={() => {
                isEditing ? handleSave() : setIsEditing(true);
              }}
              className="btn bg-blue-500 hover:bg-blue-600 py-3 px-5 font-bold text-white mt-4 rounded-md"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteDetail;
