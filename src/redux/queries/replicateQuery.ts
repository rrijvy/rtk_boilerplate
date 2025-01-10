import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PredictionResponseSchema } from "../../core/models/predictionModelSchema";

const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN || "";

export const replicateQuery = createApi({
  reducerPath: "replicateQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.replicate.com/v1",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${REPLICATE_API_TOKEN}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    requestPredictionStatus: builder.mutation<PredictionResponseSchema, string>({
      query: (predictionId) => `/predictions/${predictionId}`,
    }),
  }),
});

export const { useRequestPredictionStatusMutation } = replicateQuery;
