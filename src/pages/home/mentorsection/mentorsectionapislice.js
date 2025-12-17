// src/features/mentors/mentorsectionapislice.js
import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const mentorSectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Fetch Top Mentors (Frontend only)
        fetchTopMentors: builder.query({
            query: ({ limit = 4 }) => `/Mentor/topmentors?limit=${limit}`,

            // ✅ extract array from helper.success response
            transformResponse: (response) => response.data,

            // ✅ now result is ALWAYS an array
            providesTags: (result = []) =>
                result.length
                    ? result.map((mentor) => ({
                        type: "TopMentors",
                        id: mentor._id,
                    }))
                    : [{ type: "TopMentors", id: "LIST" }],
        }),

        bookSession: builder.mutation({
            query: (data) => ({
                url: '/mentors/book-session',
                method: 'POST',
                body: data,
            }),
        }),


    }),
});

export const {
    useFetchTopMentorsQuery,
    useBookSessionMutation
} = mentorSectionApiSlice;
