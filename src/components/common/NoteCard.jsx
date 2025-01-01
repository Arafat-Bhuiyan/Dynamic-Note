"use client";

const NoteCard = ({ title, content, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex justify-between items-center">
        <button onClick={onEdit} className="text-blue-500 hover:underline">
          Edit
        </button>
        <button onClick={onDelete} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
