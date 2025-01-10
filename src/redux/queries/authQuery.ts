import axiosBaseQuery from "../../core/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse, LoginRequest } from "../../core/models/loginSchema";
import { UserRegistrationResponse, UserRegistrationRequest } from "../../core/models/userRegistrationSchema";

export const authQuery = createApi({
  reducerPath: "authQuery",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        const formData = new FormData();
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);
        return {
          url: "/auth/login",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    register: builder.mutation<UserRegistrationResponse, UserRegistrationRequest>({
      query: (userData) => {
        return {
          url: "/auth/register",
          method: "POST",
          data: userData,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authQuery;
