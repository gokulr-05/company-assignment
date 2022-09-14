import { createSlice } from "@reduxjs/toolkit";

let authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
    loginData: null,
    list: [
      "Thriller Movies",
      "Top Rated",
      "Action Movies",
      "Comedy Movies",
      "Horrer Movies",
      "Documentaries",
    ],
    recommendationList: [],
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

    setList: (state, action) => {
      state.list = [...action.payload.list];
    },

    setRecommendationList: (state, action) => {
      state.recommendationList = [...action.payload.recommendationList];
    },

    addDataToList: (state, action) => {
      let val = state.recommendationList.splice(action.payload.index, 1);
      state.list.unshift(val);
    },
    addDataToRecommendationList: (state, action) => {
      let val = state.list.splice(action.payload.index, 1);
      state.recommendationList.unshift(val);
    },
  },
});

export default authSlice.reducer;
export let authActions = authSlice.actions;
