"use client";
import { DeleteButton } from "./Button";
import { useEffect } from "react";

export const Card = ({
  title = "",
  body = "",
  fileUrl,
  handleViewNote,
  handleDeleteNote,
  isLive = false, // Optional prop for live notes
}) => {
  function truncateText(text = "", wordLimit) {
    if (typeof text !== "string") return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  // Cleanup fileUrl when component unmounts
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handleClick = (e) => {
    // Prevent handleViewNote from firing when interacting with child elements
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "A") {
      handleViewNote();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white p-4 rounded shadow hover:shadow-lg ${
        isLive ? "border-2 border-blue-500" : ""
      } transition`}
    >
      {/* Title */}
      <h3 className="text-xl font-bold mb-2">{truncateText(title, 3)}</h3>

      {/* Body */}
      <p className="text-gray-600 mb-4">{truncateText(body, 5)}</p>

      {/* File URL */}
      {fileUrl ? (
        <div className="mt-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Attached File
          </a>
        </div>
      ) : (
        <p className="text-red-500">No file attached</p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <DeleteButton title="Remove" onClick={handleDeleteNote} />
      </div>
    </div>
  );
};
