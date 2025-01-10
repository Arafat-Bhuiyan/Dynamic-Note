"use client";
import axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";

const DefaultNote = () => {
  const selectedNote = useStoreState((state) => state.selectedNote);
  const updateData = useStoreActions((actions) => actions.updateData);
  const [data, setData] = useState({
    id: null,
    title: "Title",
    body: "Description",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setData(selectedNote);
    }
  }, [selectedNote]);

  const handleSave = async () => {
    if (data.title.trim() === "" || data.body.trim() === "") {
      alert("Title and description cannot be empty.");
      return;
    }

    // Update in the global store
    updateData(data);
    // Save updates to the server
    try {
      await axios.put(`/notes.json/${data.id}`, data);
      alert("Note updated successfully!");
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("Failed to save note on the server.");
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="w-full bg-gray-100 flex flex-col p-6 rounded-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-600">
          {!isEditing ? (
            data.title
          ) : (
            <input
              type="text"
              placeholder="Title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="text-xl font-bold text-gray-600 mb-2 w-full h-10 p-0 "
            />
          )}
        </h1>
        {/* Description */}
        <p className="text-lg">
          {!isEditing ? (
            data.body
          ) : (
            <textarea
              placeholder="Take a note..."
              value={data.body}
              onChange={(e) => setData({ ...data, body: e.target.value })}
              className="w-full text-gray-400 h-40 p-2 border rounded resize-none"
            />
          )}
        </p>

        <div>
          <button
            onClick={() => {
              if (isEditing) {
                handleSave(); // Save changes when exiting edit mode
              } else {
                setIsEditing(!isEditing); // Enter edit mode
              }
            }}
            className="btn bg-blue-500 hover:bg-blue-600 py-3 px-5 font-bold text-white mt-4 rounded-md"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DefaultNote;
