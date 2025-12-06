// import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

// export const mentorsApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({

//         getMentors: builder.query({
//             query: (filters = {}) => ({
//                 url: "/EngineeringMentors/allmentors",
//                 params: {
//                     category: filters.category !== "All" ? filters.category : undefined,
//                     experience: filters.experience !== "All" ? filters.experience : undefined,
//                     availability: filters.availability !== "All" ? filters.availability : undefined,
//                     minPrice: filters.minPrice,
//                     maxPrice: filters.maxPrice,
//                     languages:
//                         filters.languages?.length > 0
//                             ? filters.languages.join(",")
//                             : undefined,
//                     search: filters.search,
//                 },
//             }),
//             // Transform the response to extract the actual mentors array
//             transformResponse: (response) => {
//                 return {
//                     mentors: response.data?.data || [],
//                     total: response.data?.total || 0,
//                     page: response.data?.page || 1,
//                     limit: response.data?.limit || 20,
//                 };
//             },
//             providesTags: ["Mentors"],
//         }),

//         getMentorById: builder.query({
//             query: (id) => `/mentors/${id}`,
//             providesTags: (result, error, id) => [{ type: "Mentors", id }],
//         }),

//         bookSession: builder.mutation({
//             query: ({ mentorId, sessionData }) => ({
//                 url: `/mentors/${mentorId}/book`,
//                 method: "POST",
//                 body: sessionData,
//             }),
//             invalidatesTags: ["Mentors"],
//         }),

//         getMentorCategories: builder.query({
//             query: () => "/mentors/categories",
//         }),

//         getMentorStats: builder.query({
//             query: (mentorId) => `/mentors/${mentorId}/stats`,
//         }),

//     }),
// });

// export const {
//     useGetMentorsQuery,
//     useGetMentorByIdQuery,
//     useBookSessionMutation,
//     useGetMentorCategoriesQuery,
//     useGetMentorStatsQuery,
// } = mentorsApiSlice;




import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const mentorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMentors: builder.query({
            query: (filters = {}) => {
                const params = {};

                // Category filter
                if (filters.category && filters.category !== "All") {
                    params.mentorCategory = filters.category;
                }

                // Experience filter
                if (filters.experience && filters.experience !== "All") {
                    params.experience = filters.experience;
                }

                // Availability filter
                if (filters.availability && filters.availability !== "All") {
                    params.status = filters.availability === "Available" ? "approved" : "pending";
                }

                // Price range filters
                if (filters.minPrice !== undefined) {
                    params.minPrice = filters.minPrice;
                }
                if (filters.maxPrice !== undefined) {
                    params.maxPrice = filters.maxPrice;
                }

                // Languages filter
                if (filters.languages && filters.languages.length > 0) {
                    params.languages = filters.languages.join(",");
                }

                // Search filter
                if (filters.search && filters.search.trim() !== "") {
                    params.search = filters.search;
                }

                return {
                    url: "/EngineeringMentors/allmentors",
                    params: params,
                };
            },
            // Transform the response to extract the actual mentors array
            transformResponse: (response) => {
                return {
                    mentors: response.data?.data || [],
                    total: response.data?.total || 0,
                    page: response.data?.page || 1,
                    limit: response.data?.limit || 20,
                };
            },
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






