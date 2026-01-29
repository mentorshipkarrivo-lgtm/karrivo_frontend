import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const startupMentorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getStartupMentors: builder.query({
            query: (filters = {}) => {
                const params = {};
                
                // Category filter (Expertise Area)
                if (filters.category && filters.category !== "All") {
                    params.mentorCategory = filters.category;
                }
                
                // Experience filter (Startup Experience)
                if (filters.experience && filters.experience !== "All") {
                    params.startupExperience = filters.experience;
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
                    params.search = filters.search.trim();
                }

                // Build query string
                const queryString = new URLSearchParams(params).toString();

                return {
                    url: `/StartupMentors/allmentors${queryString ? `?${queryString}` : ''}`,
                    method: 'GET',
                };
            },
            // Transform the response to handle different API response structures
            transformResponse: (response) => {
                // Handle case where response.data is the array directly
                if (Array.isArray(response.data)) {
                    return {
                        mentors: response.data,
                        total: response.data.length,
                        page: 1,
                        limit: response.data.length,
                    };
                }
                
                // Handle case where response.data.data is the array
                if (response.data?.data && Array.isArray(response.data.data)) {
                    return {
                        mentors: response.data.data,
                        total: response.data.total || response.data.data.length,
                        page: response.data.page || 1,
                        limit: response.data.limit || 20,
                    };
                }
                
                // Fallback for unexpected structure
                return {
                    mentors: [],
                    total: 0,
                    page: 1,
                    limit: 20,
                };
            },
            providesTags: ["StartupMentors"],
        }),

        getStartupMentorById: builder.query({
            query: (id) => ({
                url: `/StartupMentors/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: "StartupMentors", id }],
        }),

        bookStartupSession: builder.mutation({
            query: ({ mentorId, sessionData }) => ({
                url: `/StartupMentors/${mentorId}/book`,
                method: "POST",
                body: sessionData,
            }),
            invalidatesTags: ["StartupMentors"],
        }),

        getStartupMentorCategories: builder.query({
            query: () => ({
                url: "/StartupMentors/categories",
                method: 'GET',
            }),
        }),

        getStartupMentorStats: builder.query({
            query: (mentorId) => ({
                url: `/StartupMentors/${mentorId}/stats`,
                method: 'GET',
            }),
        }),

    }),
});

export const {
    useGetStartupMentorsQuery,
    useGetStartupMentorByIdQuery,
    useBookStartupSessionMutation,
    useGetStartupMentorCategoriesQuery,
    useGetStartupMentorStatsQuery,
} = startupMentorsApiSlice;