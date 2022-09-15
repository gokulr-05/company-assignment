import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice/authSlice";
import searchReducer from "../slice/searchSlice/searchSlice";

let store = configureStore({
  reducer: { authReducer: authReducer, searchReducer: searchReducer },
});

export default store;
