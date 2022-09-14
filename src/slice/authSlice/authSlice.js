import { createSlice } from "@reduxjs/toolkit";

let authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export let authActions = authSlice.actions;
