import { createSlice } from "@reduxjs/toolkit";

let searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchInput: "",
    searchResultsArr: [],
  },
  reducers: {
    updateSearchInput: (state, action) => {
      state.searchInput = action.payload.searchInput;
    },

    updateSearchResultArr: (state, action) => {
      state.searchResultsArr = [...action.payload.searchResultsArr];
    },

    emptySearchResultsArr: (state, action) => {
      state.searchResultsArr = [];
    },
  },
});

export default searchSlice.reducer;
export let searchActions = searchSlice.actions;
