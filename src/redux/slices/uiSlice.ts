import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setTheme: (state, actions: PayloadAction<string>) => {
      state.theme = actions.payload;
    },
  },
});

export const UiReducer = uiSlice.reducer;
export const ActionsUi = uiSlice.actions;
