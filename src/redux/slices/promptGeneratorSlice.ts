import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPromptQueue {
  storyId: string;
  sceneNo: number;
  predictionId: string;
  output?: string;
  status?: string;
  percentage?: number;
}

type IntialState = {
  promptQueue: IPromptQueue[];
};

const initialState: IntialState = {
  promptQueue: [],
};

const uiSlice = createSlice({
  name: "promptGenerator",
  initialState: initialState,
  reducers: {
    queuePrompt: (state, actions: PayloadAction<IPromptQueue>) => {
      state.promptQueue.push(actions.payload);
    },
    updatePromptInQueue: (state, actions: PayloadAction<IPromptQueue>) => {
      for (let i = 0; i < state.promptQueue.length; i++) {
        const prompt = state.promptQueue[i];
        if (prompt.predictionId === actions.payload.predictionId) {
          state.promptQueue[i] = actions.payload;
        }
      }
    },
  },
});

export const PromptGeneratorReducer = uiSlice.reducer;
export const ActionsPromptGenerator = uiSlice.actions;
