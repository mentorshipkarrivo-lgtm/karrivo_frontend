

import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const mentorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMentors: builder.query({
            query: (filters = {}) => ({
                url: "/mentors",
                params: {
                    category: filters.category !== "All" ? filters.category : undefined,
                    experience: filters.experience !== "All" ? filters.experience : undefined,
                    availability: filters.availability !== "All" ? filters.availability : undefined,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    languages:
                        filters.languages?.length > 0
                            ? filters.languages.join(",")
                            : undefined,
                    search: filters.search,
                },
            }),
            providesTags: ["Mentors"],
        }),

        getMentorById: builder.query({
            query: (id) => `/mentors/${id}`,
            providesTags: (result, error, id) => [{ type: "Mentors", id }],
        }),

        bookSession: builder.mutation({
            query: ({ mentorId, sessionData }) => ({
                url: `/mentors/${mentorId}/book`,
                method: "POST",
                body: sessionData,
            }),
            invalidatesTags: ["Mentors"],
        }),

        getMentorCategories: builder.query({
            query: () => "/mentors/categories",
        }),

        getMentorStats: builder.query({
            query: (mentorId) => `/mentors/${mentorId}/stats`,
        }),

    }),
});

export const {
    useGetMentorsQuery,
    useGetMentorByIdQuery,
    useBookSessionMutation,
    useGetMentorCategoriesQuery,
    useGetMentorStatsQuery,
} = mentorsApiSlice;
