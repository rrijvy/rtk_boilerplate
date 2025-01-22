import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Defining the structure of the Post data
export type Post = {
  id: number;
  title: string;
  body: string;
};

// Create the API slice
export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Post" as const, id })), { type: "Post", id: "LIST" }]
          : [{ type: "Post", id: "LIST" }],
    }),
    clearPostsCache: builder.mutation<void, void>({
      queryFn: async (_, { dispatch }) => {
        dispatch(
          jsonPlaceholderApi.util.updateQueryData("getPosts", undefined, (draft) => {
            draft = [];
            return draft;
          })
        );

        return { data: undefined };
      },
    }),

    removeFirstPost: builder.mutation<void, void>({
      queryFn: async (_, { dispatch }) => {
        dispatch(
          jsonPlaceholderApi.util.updateQueryData("getPosts", undefined, (draft) => {
            draft.shift();
          })
        );
        return { data: undefined };
      },
    }),
    removeLastPost: builder.mutation<void, void>({
      queryFn: async (_, { dispatch }) => {
        dispatch(
          jsonPlaceholderApi.util.updateQueryData("getPosts", undefined, (draft) => {
            if (!draft || draft.length === 0) return;
            draft.pop();
          })
        );
        return { data: undefined };
      },
    }),
  }),
});

export const { useGetPostsQuery, useClearPostsCacheMutation, useRemoveFirstPostMutation, useRemoveLastPostMutation } = jsonPlaceholderApi;
