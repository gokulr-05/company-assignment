import { createSlice } from "@reduxjs/toolkit";

let authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
});

export default authSlice.reducer;
export let authActions = authSlice.actions;
