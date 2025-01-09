import axiosBaseQuery from "../../core/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { StoryPromptResponse, StoryPromptRequest } from "../../core/models/storyPromptSchema";

export const storyQuery = createApi({
  reducerPath: "storyQuery",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    generatePrompts: builder.mutation<StoryPromptResponse, StoryPromptRequest>({
      query: (storyData) => {
        return {
          url: "/story/generate-prompts",
          method: "POST",
          data: storyData,
        };
      },
    }),
  }),
});

export const { useGeneratePromptsMutation } = storyQuery;
