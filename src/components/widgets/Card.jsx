"use client";
import { DeleteButton, LinkButton } from ".";

export const Card = ({ title, body, handleViewNote, handleDeleteNote }) => {
  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }
  
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg">
      <h3 className="text-xl font-bold mb-2">{truncateText(title, 3)}</h3>
      <p className="text-gray-600 mb-4">{truncateText(body, 5)}</p>
      <div className="flex justify-between items-center">
        <LinkButton title="View Note" onClick={handleViewNote} />

        <DeleteButton title="Remove" onClick={handleDeleteNote} />
      </div>
    </div>
  );
};
