import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";

const store = createStore({
  data: [],
  tempNote: null,
  singleData: {},
  selectedNote: null,
  isLoading: false,

  // Actions
  setData: action((state, payload) => {
    state.data = [...payload];
    if (payload.length > 0) {
      state.selectedNote = payload[0]; // Automatically select the first note
    }
  }),
  setSelectedNote: action((state, payload) => {
    state.selectedNote = payload;
  }),
  addData: action((state, payload) => {
    const highestId = Math.max(...state.data.map((item) => item.id), 0);
    payload.id = highestId + 1;
    state.data.unshift(payload);
    state.selectedNote = payload; // Set the new note as selected
    localStorage.setItem("notes", JSON.stringify(state.data));
  }),
  setTempNote: action((state, payload) => {
    state.tempNote = { ...payload };
    if (state.selectedNote) {
      state.selectedNote = { ...state.selectedNote, ...payload }; // Live update
    }
  }),
  removeData: action((state, id) => {
    state.data = state.data.filter(
      (item) => parseInt(item.id) !== parseInt(id)
    );
    if (state.selectedNote?.id === id) {
      state.selectedNote = state.data[0] || null; // Reset selected note
    }
    localStorage.setItem("notes", JSON.stringify(state.data));
  }),
  updateData: action((state, updatedData) => {
    const foundIndex = state.data.findIndex(
      (item) => parseInt(item.id) === parseInt(updatedData.id)
    );
    if (foundIndex !== -1) {
      state.data[foundIndex] = { ...updatedData };
      const updatedNote = state.data.splice(foundIndex, 1)[0];
      state.data = [updatedNote, ...state.data];
      state.selectedNote = updatedNote; // Update selected note
    }
    localStorage.setItem("notes", JSON.stringify(state.data));
  }),
  setSingleData: action((state, payload) => {
    state.singleData = payload;
  }),

  // Thunks
  fetchData: thunk(async (actions) => {
    try {
      const response = await axios.get("/notes.json");
      const responseData = response.data.map((todo) => ({ ...todo }));
      actions.setData(responseData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }),
  fetchSingleNote: thunk(async (actions, noteId, { getState }) => {
    try {
      const allNotes = getState().data;

      if (!noteId || !Number.isInteger(parseInt(noteId))) {
        console.error(
          "Invalid note ID provided! Note ID must be a valid number."
        );
        return;
      }

      if (!allNotes || allNotes.length === 0) {
        console.warn(
          "No notes available. Attempting to load from localStorage..."
        );
        await actions.loadFromLocalStorage();
        const updatedNotes = getState().data;
        if (!updatedNotes || updatedNotes.length === 0) {
          console.error("Data is still empty after loading from localStorage!");
          return;
        }
      }

      const singleNote = allNotes.find(
        (note) => parseInt(note.id) === parseInt(noteId)
      );

      if (singleNote) {
        actions.setSingleData(singleNote);
        actions.setSelectedNote(singleNote); // Automatically select the fetched note
      } else {
        console.error(`Note not found! ID: ${noteId}`);
      }
    } catch (error) {
      console.error("Error fetching single note:", error);
    }
  }),

  loadFromLocalStorage: thunk((actions) => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      console.log("Stored Notes from LocalStorage:", storedNotes);

      if (storedNotes.length === 0) {
        console.warn("No notes found in localStorage.");
      }

      actions.setData(storedNotes);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }),
});

export default store;
