


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  
  prepareHeaders: (headers, { getState }) => {


    const token = localStorage.getItem("token");

    // If we have a token, add it to the request
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // ✅ Capital 'A' in Authorization
    }
    
    return headers;
  },
});

/**
 * Custom base query to handle token refresh and retry logic.
 */
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If a 408 error occurs, try to refresh the token
  if (result?.error?.status === 408 || result?.error?.data?.status_code === 408) {
    console.log("Token expired, attempting refresh...");
    
    const refreshResult = await baseQuery(
      { url: "/Auth/refreshToken", method: "GET" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Store the new token
      const newToken = refreshResult.data?.data?.token;
      if (newToken) {
        localStorage.setItem("token", newToken);
        console.log("Token refreshed successfully");

        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      // Token refresh failed - logout
      console.error("Token refresh failed, logging out");
      localStorage.clear();
      window.location.href = "/login";
      return refreshResult;
    }
  }

  // If a 401 error occurs, logout
  if (result?.error?.status === 401 || result?.error?.data?.status_code === 401) {
    console.error("Unauthorized: Logging out");
    localStorage.clear();
    window.location.href = "/login";
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "getComment", 
    "updateDetails", 
    "getTicket", 
    "shareholder",
    // Add more tag types as needed
  ],
  endpoints: (builder) => ({}),
});

export const { usePrefetch } = apiSlice;