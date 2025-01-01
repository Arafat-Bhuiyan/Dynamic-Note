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
  const removeData = useStoreActions((actions) => actions.removeData);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // First time Fetch all Notes..
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // handle Delete..
  const handleDelete = () => {
    console.log("My ID - ", selectedItemId);

    if (selectedItemId) {
      removeData(selectedItemId);
    }

    if (!selectedItemId) {
      alert("Nothing Selected");
    }

    router.push('/');
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

  const handleViewNote = (id) => {
    // if (router.asPath === `/notes/${id}`) return;
    router.push(`/notes/${id}`);
  };

  return (
    <div className="flex flex-col gap-6 w-1/3 h-[80vh] overflow-y-scroll bg-[#e1e1e1] rounded-md p-2">
      {/* Note Cards */}

      {storeData?.length > 0 ? (
        storeData?.map((data) => {
          return (
            <div key={data.id}>
              <Card
                title={data.title}
                body={data.body}
                handleViewNote={() => handleViewNote(data?.id)}
                handleDeleteNote={() => handleIdStoreToDelete(data?.id)}
              />
            </div>
          );
        })
      ) : (
        <div>
          <Spinner />
        </div>
      )}
      {/* Add more cards */}

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
