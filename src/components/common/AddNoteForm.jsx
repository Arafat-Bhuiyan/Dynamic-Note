"use client"
import { useState, useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import { useRouter } from "next/navigation";

const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const addData = useStoreActions((actions) => actions.addData);
  const setTempNote = useStoreActions((actions) => actions.setTempNote);
  const router = useRouter();

  // Handle file selection and validate type
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      !["image/png", "image/jpeg", "application/pdf"].includes(
        selectedFile.type
      )
    ) {
      alert("Please select a valid file type (.png, .jpg, .jpeg, .pdf)");
      return;
    }
    setFile(selectedFile);
  };

  // Live update note while typing
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    if (name === "body") setBody(value);

    setTempNote({
      title: name === "title" ? value : title,
      body: name === "body" ? value : body,
    });
  };

  // Generate file URL on file change
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
    return () => fileUrl && URL.revokeObjectURL(fileUrl);
  }, [file]);

  const handleAddNote = () => {
    if (!title.trim() || !body.trim()) {
      alert("Both title and description are required.");
      return;
    }

    const newNote = {
      title,
      body,
      fileUrl,
      lastUpdated: new Date().toISOString(),
    };

    addData(newNote);
    setTempNote(null); // Clear preview
    setFile(null); // Reset file input
    setFileUrl(null); // Reset file URL
    router.push("/"); // Redirect after saving
  };

  return (
    <div className="w-full bg-gray-100 flex flex-col p-6 rounded-md">
      <h1 className="text-2xl font-bold text-gray-600 mb-4">Add New Note</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleInputChange}
        className="text-xl font-bold text-gray-600 mb-4 p-2 border rounded w-full"
      />
      <textarea
        name="body"
        placeholder="Take a note..."
        value={body}
        onChange={handleInputChange}
        className="w-full h-40 p-2 border rounded resize-none"
      />
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf" // Accept specific file types
        onChange={handleFileChange}
        className="border p-2 rounded"
      />

      <button
        onClick={handleAddNote}
        className="btn bg-blue-500 hover:bg-blue-600 py-3 px-5 font-bold text-white mt-4 rounded-md"
      >
        Save Note
      </button>
    </div>
  );
};

export default AddNoteForm;
