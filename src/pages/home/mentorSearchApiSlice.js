// pages/search/mentorSearchApiSlice.js
import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const mentorSearchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔍 Search mentors by query
    searchMentors: builder.query({
      query: (searchQuery = "") => ({
        url: `/Mentor/search`,
        method: "GET",
        params: {
          q: searchQuery.trim()
        }
      }),
      providesTags: ["Mentors"],
      // Transform response to ensure it's always an array
      transformResponse: (response) => {
        console.log('🔄 Transform Response:', response);
        return Array.isArray(response) ? response : [];
      },
      // Handle errors gracefully
      transformErrorResponse: (error) => {
        console.error('❌ API Error:', error);
        return error;
      }
    }),

    // 👤 Get mentor by ID (for profile page)
    getMentorById: builder.query({
      query: (mentorId) => ({
        url: `/mentors/${mentorId}`,
        method: "GET",
      }),
      providesTags: (result, error, mentorId) => [
        { type: "Mentors", id: mentorId }
      ],
    }),

    // 📋 Get all mentors (without search query)
    getAllMentors: builder.query({
      query: () => ({
        url: "/mentors",
        method: "GET",
      }),
      providesTags: ["Mentors"],
      transformResponse: (response) => {
        return Array.isArray(response) ? response : [];
      },
    }),

  }),
});

// Export hooks for usage in components
export const {
  useSearchMentorsQuery,        // Auto-fetch on component mount
  useLazySearchMentorsQuery,    // Manual trigger (better for search)
  useGetMentorByIdQuery,         // Get single mentor
  useGetAllMentorsQuery,         // Get all mentors
} = mentorSearchApiSlice;