import { configureStore } from "@reduxjs/toolkit";


import userReducer from "./UserSlice";
import adminReducer from './AdminSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
