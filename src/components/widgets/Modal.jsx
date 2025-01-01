"use client";

/**
 * DELETE CONFIRM MODAL HERE
 */
// region DELETE MODAL
export const DeleteConfirmModal = ({ onClickYes, onClickNo }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-80">
        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClickNo}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            No
          </button>
          <button
            onClick={onClickYes}
            className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
