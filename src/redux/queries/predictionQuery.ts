import { createApi } from "@reduxjs/toolkit/query/react";
import { PredictionRequestSchema, PredictionResponseSchema } from "../../core/models/predictionModelSchema";
import axiosAuthBaseQuery from "../../core/axiosAuthBaseQuery";

export const predictQuery = createApi({
  reducerPath: "predictQuery",
  baseQuery: axiosAuthBaseQuery(),
  endpoints: (builder) => ({
    requestPrediction: builder.mutation<PredictionResponseSchema, PredictionRequestSchema>({
      query: (requestData) => {
        return {
          url: "/predict/request-prediction",
          method: "POST",
          data: requestData,
        };
      },
    }),
    requestPredictionStatus: builder.mutation<PredictionResponseSchema, string>({
      query: (predictionId) => {
        return {
          url: `/predict/get-prediction-status/${predictionId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useRequestPredictionMutation, useRequestPredictionStatusMutation } = predictQuery;
