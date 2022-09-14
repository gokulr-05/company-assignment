import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice/authSlice";

let store = configureStore({ reducer: { authReducer: authReducer } });

export default store;
