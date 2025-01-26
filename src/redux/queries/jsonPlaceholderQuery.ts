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
    deleteItemAtIndex: builder.mutation<void, number>({
      queryFn: async (index, { dispatch }) => {
        dispatch(
          jsonPlaceholderApi.util.updateQueryData("getPosts", undefined, (draft) => {
            if (index >= 0 && index < draft.length) {
              draft.splice(index, 1); // Remove the item at the given index
            }
          })
        );
        return { data: undefined };
      },
    }),
    addNewItem: builder.mutation<void, void>({
      queryFn: async (_, { dispatch }) => {
        dispatch(
          jsonPlaceholderApi.util.updateQueryData("getPosts", undefined, (draft) => {
            draft.push({
              id: draft.length + 1, // Generate a new unique ID
              title: `New Post ${draft.length + 1}`,
              body: "This is a new post added to the list",
            });
          })
        );
        return { data: undefined };
      },
    }),
    reorderItem: builder.mutation<void, number>({
      queryFn: async (indexToMove, { dispatch }) => {
        dispatch(
          jsonPlaceholderApi.util.updateQueryData("getPosts", undefined, (draft) => {
            if (indexToMove >= 0 && indexToMove < draft.length) {
              const item = draft.splice(indexToMove, 1)[0];
              draft.unshift(item); // Move it to the top
            }
          })
        );
        return { data: undefined };
      },
    }),
    upsertData: builder.mutation<void, Post>({
      queryFn: async (newPost, { dispatch }) => {
        dispatch(
          jsonPlaceholderApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const index = draft.findIndex((post) => post.id === newPost.id);
            if (index >= 0) {
              // Update existing post
              draft[index] = newPost;
            } else {
              // Add new post
              draft.push(newPost);
            }
          })
        );
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useClearPostsCacheMutation,
  useRemoveFirstPostMutation,
  useRemoveLastPostMutation,
  useDeleteItemAtIndexMutation,
  useAddNewItemMutation,
  useReorderItemMutation,
  useUpsertDataMutation,
} = jsonPlaceholderApi;
