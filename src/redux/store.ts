import { configureStore } from "@reduxjs/toolkit";
import { UiReducer } from "./slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    ui: UiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
