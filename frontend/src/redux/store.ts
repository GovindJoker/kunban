// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
