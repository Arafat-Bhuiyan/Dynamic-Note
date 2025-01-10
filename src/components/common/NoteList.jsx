"use client";
import { useRouter } from "next/navigation";
import { DeleteConfirmModal, Card } from "@/components/widgets";
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Spinner } from "@/components/widgets";

const NoteList = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storeData = useStoreState((state) => state.data);
  const fetchData = useStoreActions((actions) => actions.fetchData);
  const loadFromLocalStorage = useStoreActions(
    (actions) => actions.loadFromLocalStorage
  );
  const setSelectedNote = useStoreActions((actions) => actions.setSelectedNote);
  const removeData = useStoreActions((actions) => actions.removeData);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const tempNote = useStoreState((state) => state.tempNote); // Get live note

  // First time Fetch all Notes..
  useEffect(() => {
    fetchData();
    loadFromLocalStorage();
  }, [fetchData, loadFromLocalStorage]);

  // Sort notes by lastUpdated before rendering
  const sortedNotes = storeData?.slice().sort((a, b) => {
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  });

  const handleDelete = () => {
    if (selectedItemId) {
      removeData(selectedItemId); 
    } else {
      alert("Nothing Selected");
    }
    setIsModalOpen(false);
  };

  const handleIdStoreToDelete = (id) => {
    if (id) {
      setSelectedItemId(id);
    }
    setIsModalOpen(true);
  };

  const handleDeleteModalCancel = () => {
    setSelectedItemId(null);
    setIsModalOpen(false);
  };

  const handleViewNote = (id, note) => {
    setSelectedNote(note); // Update the selected note
    router.push(`/notes/${id}`); // Navigate to the note's route
    console.log("id - ", id, "note - ", note);
  };

  return (
    <div className="flex flex-col gap-6 w-1/3 h-[80vh] overflow-y-scroll bg-[#e1e1e1] rounded-md p-2">
      {/* Live Note */}
      {(tempNote?.title || tempNote?.body) && (
        <Card title={tempNote.title} body={tempNote.body} isLive={true} />
      )}
      {/* Note List */}
      {sortedNotes?.length > 0 ? (
        sortedNotes.map((data, index) => (
          <Card
            key={data.id || index}
            title={data.title}
            body={data.body}
            fileUrl={data.fileUrl} // Pass the fileUrl to the Card component
            handleViewNote={() => handleViewNote(data.id, data)}
            handleDeleteNote={() => handleIdStoreToDelete(data.id)}
          />
        ))
      ) : (
        <div>
          <Spinner />
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <DeleteConfirmModal
          onClickYes={handleDelete}
          onClickNo={handleDeleteModalCancel}
        />
      )}
    </div>
  );
};

export default NoteList;
