"use client";
import { AddNoteButton } from "@/components/widgets";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const hardReFresh = () => {
    // window.location.href = '/';
    window.location.assign("/");
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800" onClick={hardReFresh}>
        My Notes
      </h1>

      {/* ADD NOTE BUTTON */}
      <AddNoteButton title="Add Note" onClick={() => router.push(`/`)} />
    </header>
  );
};

export default Header;
