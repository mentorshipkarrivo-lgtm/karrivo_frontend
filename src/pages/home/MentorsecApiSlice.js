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
      providesTags: ["Mentors"]
    }),

    // 👤 Get mentor by ID (for profile page)
    getMentorById: builder.query({
      query: (mentorId) => ({
        url: `/mentors/${mentorId}`,
        method: "GET",
      }),
      providesTags: (result, error, mentorId) => [
        { type: "Mentors", id: mentorId }
      ]
    }),

    // 📋 Get all mentors (without search query)
    getAllMentors: builder.query({
      query: () => ({
        url: "/mentors",
        method: "GET",
      }),
      providesTags: ["Mentors"]
    }),

  }),
});

// Export hooks for usage in components
export const {
  useSearchMentorsQuery,
  useLazySearchMentorsQuery,
  useGetMentorByIdQuery,
  useGetAllMentorsQuery,
} = mentorSearchApiSlice;