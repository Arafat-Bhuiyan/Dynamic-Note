"use client";

/**
 * ADD NOTE BUTTON
 */
// region ADD NOTE BUTTON
export const AddNoteButton = ({ title = "Add Note", onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

/**
 * NORMAL BUTTON
 */
// region NORMAL BUTTON
export const NormalButton = ({ title = "Normal Title", onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-outlined bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

/**
 * DELETE BUTTON
 */
// region DELETE BUTTON
export const DeleteButton = ({ title = "Delete", onClick }) => {
  return (
    <button onClick={onClick} className="text-red-500 hover:underline">
      {title}
    </button>
  );
};

/**
 * LINK BUTTON
 */
// region LINK BUTTON
export const LinkButton = ({ title = "View Link", onClick }) => {
  return (
    <button className="text-blue-500" onClick={onClick}>
      View note
    </button>
  );
};
