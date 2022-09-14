import { createSlice } from "@reduxjs/toolkit";

let authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
    loginData: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.loginData = null;
    },

    setLoginData: (state, action) => {
      state.loginData = action.payload.loginData;
    },
  },
});

export default authSlice.reducer;
export let authActions = authSlice.actions;
