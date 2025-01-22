import { configureStore } from "@reduxjs/toolkit";
import { UiReducer } from "./slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { authQuery } from "./queries/authQuery";
import { storyQuery } from "./queries/storyQuery";
import { predictQuery } from "./queries/predictionQuery";
import { jsonPlaceholderApi } from "./queries/jsonPlaceholderQuery";
import { PromptGeneratorReducer } from "./slices/promptGeneratorSlice";

const store = configureStore({
  reducer: {
    ui: UiReducer,
    promptGenerator: PromptGeneratorReducer,
    [authQuery.reducerPath]: authQuery.reducer,
    [storyQuery.reducerPath]: storyQuery.reducer,
    [predictQuery.reducerPath]: predictQuery.reducer,
    [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authQuery.middleware, storyQuery.middleware, predictQuery.middleware, jsonPlaceholderApi.middleware),
});

export const resetJsonPlaceholderApiCache = () => store.dispatch(jsonPlaceholderApi.util.resetApiState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;
