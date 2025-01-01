"use client";
import { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

export const NoteForm = () => {
  // const storeData = useStoreState((state) => state.data);
  const addData = useStoreActions((actions) => actions.addData);

  const [noteData, setNoteData] = useState({
    title: "",
    body: "",
  });

  const handleSaveNote = () => {
    if (noteData.title?.trim() === "" || noteData.body?.trim() === "") {
      alert("Please Fill All Fields");
      return;
    }

    addData(noteData);
    setNoteData({
      title: "",
      body: "",
    });
  };

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center p-6 rounded-md">
      <div className="w-full max-w-3xl">
        <header className="mb-6">
          <input
            type="text"
            placeholder="Title Here"
            value={noteData.title}
            onChange={(e) =>
              setNoteData({ ...noteData, title: e.target.value })
            }
            className="text-3xl font-bold text-gray-800 mb-2"
          />
        </header>

        <main className="mb-6">
          <textarea
            placeholder="Content Here..."
            value={noteData.body}
            onChange={(e) => setNoteData({ ...noteData, body: e.target.value })}
            className="w-full h-40 p-2 border rounded resize-none"
          />
        </main>

        <footer className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            onClick={handleSaveNote}
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};
