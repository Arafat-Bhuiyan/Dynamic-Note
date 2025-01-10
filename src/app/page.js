'use client'
import DefaultNote from "@/components/common/DefaultNote";
import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";

const Page = () => {
  const loadFromLocalStorage = useStoreActions((actions) => actions.loadFromLocalStorage);

  useEffect(() => {
    loadFromLocalStorage(); // Load notes on app load
  }, [loadFromLocalStorage]);
  
  return (
    <>
      {/* <NoteForm/> */}
      <DefaultNote />
    </>
  );
};

export default Page;
