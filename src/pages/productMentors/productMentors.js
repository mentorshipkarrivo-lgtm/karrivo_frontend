import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const productMentorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProductMentors: builder.query({
            query: (filters = {}) => {
                const params = {};
                
                // Category filter (Product Area)
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
                    url: "/ProductMentors/allmentors",
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
            providesTags: ["ProductMentors"],
        }),

        getProductMentorById: builder.query({
            query: (id) => `/productmentors/${id}`,
            providesTags: (result, error, id) => [{ type: "ProductMentors", id }],
        }),

        bookProductSession: builder.mutation({
            query: ({ mentorId, sessionData }) => ({
                url: `/productmentors/${mentorId}/book`,
                method: "POST",
                body: sessionData,
            }),
            invalidatesTags: ["ProductMentors"],
        }),

        getProductMentorCategories: builder.query({
            query: () => "/productmentors/categories",
        }),

        getProductMentorStats: builder.query({
            query: (mentorId) => `/productmentors/${mentorId}/stats`,
        }),

    }),
});

export const {
    useGetProductMentorsQuery,
    useGetProductMentorByIdQuery,
    useBookProductSessionMutation,
    useGetProductMentorCategoriesQuery,
    useGetProductMentorStatsQuery,
} = productMentorsApiSlice;