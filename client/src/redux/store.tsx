import { configureStore } from "@reduxjs/toolkit";
import serachReducer from "./slice/searchSlice";

export const store = configureStore({
  reducer: {
    search: serachReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
