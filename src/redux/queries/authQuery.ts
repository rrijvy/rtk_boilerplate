import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../core/axiosBaseQuery";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token?: string;
  token_type?: string;
}

interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

interface UserRegistrationResponse {
  username: string;
  email: string;
  fullName: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
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

export const { useLoginMutation } = authApi;
