import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const leadershipMentorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getLeadershipMentors: builder.query({
            query: (filters = {}) => {
                const params = {};
                
                // Category filter (Leadership Area)
                if (filters.category && filters.category !== "All") {
                    params.mentorCategory = filters.category;
                }
                
                // Experience filter
                if (filters.experience && filters.experience !== "All") {
                    params.yearsOfExperience = filters.experience;
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
                    url: `/LeaderShipMentors/allmentors${queryString ? `?${queryString}` : ''}`,
                    method: 'GET',
                };
            },
            // Transform the response to handle the API structure
            transformResponse: (response) => {
                // Handle the nested data structure from your API
                if (response.success && response.data?.data && Array.isArray(response.data.data)) {
                    return {
                        mentors: response.data.data,
                        total: response.data.total || response.data.data.length,
                        page: response.data.page || 1,
                        limit: response.data.limit || 20,
                        totalPages: response.data.totalPages || 1,
                    };
                }
                
                // Fallback for unexpected structure
                return {
                    mentors: [],
                    total: 0,
                    page: 1,
                    limit: 20,
                    totalPages: 1,
                };
            },
            providesTags: ["LeadershipMentors"],
        }),

        getLeadershipMentorById: builder.query({
            query: (id) => ({
                url: `/LeadershipMentors/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: "LeadershipMentors", id }],
        }),

        bookLeadershipSession: builder.mutation({
            query: ({ mentorId, sessionData }) => ({
                url: `/LeadershipMentors/${mentorId}/book`,
                method: "POST",
                body: sessionData,
            }),
            invalidatesTags: ["LeadershipMentors"],
        }),

        getLeadershipMentorCategories: builder.query({
            query: () => ({
                url: "/LeadershipMentors/categories",
                method: 'GET',
            }),
        }),

        getLeadershipMentorStats: builder.query({
            query: (mentorId) => ({
                url: `/LeadershipMentors/${mentorId}/stats`,
                method: 'GET',
            }),
        }),

    }),
});

export const {
    useGetLeadershipMentorsQuery,
    useGetLeadershipMentorByIdQuery,
    useBookLeadershipSessionMutation,
    useGetLeadershipMentorCategoriesQuery,
    useGetLeadershipMentorStatsQuery,
} = leadershipMentorsApiSlice;