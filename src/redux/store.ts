import { configureStore } from "@reduxjs/toolkit";
import { UiReducer } from "./slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { authQuery } from "./queries/authQuery";
import { storyQuery } from "./queries/storyQuery";

const store = configureStore({
  reducer: {
    ui: UiReducer,
    [authQuery.reducerPath]: authQuery.reducer,
    [storyQuery.reducerPath]: storyQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authQuery.middleware, storyQuery.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
