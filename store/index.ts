import { configureStore } from "@reduxjs/toolkit";
import breathingReducer from "./breathingSlice";

export const store = configureStore({
  reducer: {
    breathing: breathingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
