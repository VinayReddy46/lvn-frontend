// Import createApi and fetchBaseQuery from RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our base API slice
export const apiSlice = createApi({
  // The reducerPath is the key in our store where this API slice will be mounted
  reducerPath: "api",

  // The base query function we'll use to make requests
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.example.com", // Change this to your API base URL
    prepareHeaders: (headers) => {
      // You can set common headers here, like authentication tokens
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // The set of endpoints for this API
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Refresh token endpoint
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      }),
    }),
  }),
});

// Export hooks for the defined endpoints
export const { useLoginMutation, useRefreshTokenMutation } = apiSlice;
