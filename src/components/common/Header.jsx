'use client';
import { useRouter } from "next/navigation";
import { useStoreActions } from "easy-peasy";

const Header = () => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push("/add-note"); // Route to add-note form
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1
        className="text-3xl font-bold text-gray-800 cursor-pointer"
        onClick={() => router.push("/")}
      >
        My Notes
      </h1>
      <button
        className="btn bg-green-500 text-white py-2 px-4 rounded"
        onClick={handleAddClick}
      >
        Add Note
      </button>
    </header>
  );
};

export default Header;
