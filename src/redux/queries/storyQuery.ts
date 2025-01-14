import { createApi } from "@reduxjs/toolkit/query/react";
import { StoryPromptRequest } from "../../core/models/storyPromptSchema";
import axiosAuthBaseQuery from "../../core/axiosAuthBaseQuery";

export const storyQuery = createApi({
  reducerPath: "storyQuery",
  baseQuery: axiosAuthBaseQuery(),
  endpoints: (builder) => ({
    generatePrompts: builder.mutation<string[], StoryPromptRequest>({
      query: (storyData) => {
        return {
          url: "/story/generate-prompts-json",
          method: "POST",
          data: storyData,
        };
      },
    }),
  }),
});

export const { useGeneratePromptsMutation } = storyQuery;
