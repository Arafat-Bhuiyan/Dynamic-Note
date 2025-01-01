"use client";
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Spinner } from "@/components/widgets";

const NoteDetail = ({ noteId }) => {
  const storeSingleData = useStoreState((state) => state.singleData);
  const isDataLoading = useStoreState((state) => state.isLoading);
  const fetchSingleData = useStoreActions((actions) => actions.getSingleData);
  const updateData = useStoreActions((actions) => actions.updateData);

  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSingleData(noteId);
  }, [noteId, fetchSingleData]);

  useEffect(() => {
    if (storeSingleData?.id) {
      setNoteData({
        title: storeSingleData?.title ?? "",
        description: storeSingleData?.body ?? "",
      });
    }
  }, [storeSingleData]);

  // UPDATE FUNCITON..
  const handleUpdateData = () => {
    if (storeSingleData?.id) {
      if (
        noteData?.title?.trim() === "" ||
        noteData?.description?.trim() === ""
      ) {
        alert("Empty Fields can not be Saved");
      }

      // Update here..
      updateData({
        ...noteData,
        id: storeSingleData?.id,
        body: noteData?.description,
      });
    } else {
      alert("Item Pending...");
    }

    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center p-6 rounded-md">
      <div className="w-full max-w-3xl">
        {isDataLoading ? (
          <Spinner />
        ) : (
          <header className="mb-6">
            {!isEditing ? (
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {noteData.title?.trim() === "" ? "Loading.." : noteData.title}
              </h1>
            ) : (
              <input
                type="text"
                placeholder="Note Title"
                value={noteData.title}
                onChange={(e) =>
                  setNoteData({ ...noteData, title: e.target.value })
                }
                className="text-3xl font-bold text-gray-800 mb-2"
              />
            )}
          </header>
        )}

        {isDataLoading ? (
          <Spinner />
        ) : (
          <main className="mb-6">
            {!isEditing ? (
              <p className="text-gray-700 text-2xl leading-relaxed">
                {noteData.description?.trim() === ""
                  ? "Loading.."
                  : noteData.description}
              </p>
            ) : (
              <textarea
                placeholder="Content here..."
                value={noteData.description}
                onChange={(e) =>
                  setNoteData({ ...noteData, description: e.target.value })
                }
                className="w-full h-80 p-2 text-2xl border rounded resize-none"
              />
            )}
          </main>
        )}

        <footer className="flex justify-between items-center">
          {!isEditing ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              onClick={() => setIsEditing(!isEditing)}
              disabled={isDataLoading}
            >
              {isDataLoading ? "Editing.." : "Edit"}
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              onClick={handleUpdateData}
              disabled={isDataLoading}
            >
              {isDataLoading ? "Saving.." : "Save"}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default NoteDetail;
