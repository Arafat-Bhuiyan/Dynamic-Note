import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";

const store = createStore({
  data: [],
  singleData: {},
  isLoading: false,

  // Set Storage Data..
  setData: action((state, payload) => {
    state.data = [...payload];
  }),

  // Store / Add data to beggining...
  addData: action((state, payload) => {
    state.isLoading = true;
    const size = state.data.length;
    payload.id = size + 1;
    state.data?.unshift(payload);
    state.isLoading = false;
  }),

  // remove Data Action..
  removeData: action((state, id) => {
    state.isLoading = true;
    // Clone state.data before filtering
    const dataClone = state.data.map((proxyItem) => ({ ...proxyItem }));
    const filteredData = dataClone.filter((item) => {
      console.log("Compare ID - ", item.id, id);

      return parseInt(item.id) !== parseInt(id);
    });

    console.log("filtered data - ", filteredData);

    state.data = filteredData;
    state.isLoading = false;
  }),

  // Update Data Action..
  updateData: action((state, updatedData) => {
    state.isLoading = true;
    const dataClone = state.data.map((proxyItem) => ({ ...proxyItem }));
    const foundIndex = dataClone.findIndex(
      (item) => parseInt(item.id) === parseInt(updatedData.id)
    );

    console.log("FoundIndex - ", foundIndex);

    if (foundIndex !== -1) {
      dataClone[foundIndex] = { ...updatedData };
      state.data = dataClone;
    }

    state.isLoading = false;
  }),

  // Specific Data..
  getSingleData: action((state, id) => {
    state.isLoading = true;
    const dataClone = state.data.map((proxyItem) => ({ ...proxyItem }));
    const foundObj = dataClone?.find(
      (item) => parseInt(item.id) === parseInt(id)
    );

    if (foundObj) {
      state.singleData = foundObj;
    }
    state.isLoading = false;
  }),

  // API CALL USING THUNK..
  fetchData: thunk(async (actions) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const responseData = response.data.map((todo) => ({ ...todo }));
    actions.setData(responseData);
  }),
});

export default store;
