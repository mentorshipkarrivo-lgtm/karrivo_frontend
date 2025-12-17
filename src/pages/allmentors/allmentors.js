import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const allMentorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Get ALL mentors without any filters or conditions
        getAllMentors: builder.query({
            query: () => ({
                url: '/MarketingMentors/allmentors',
                method: 'GET',
            }),
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
            providesTags: ["AllMentors"],
        }),

        // Get mentor by ID (keep this for individual mentor details)
        getMentorById: builder.query({
            query: (id) => ({
                url: `/MarketingMentors/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: "AllMentors", id }],
        }),

        // Book a session with a mentor
        bookSession: builder.mutation({
            query: ({ mentorId, sessionData }) => ({
                url: `/MarketingMentors/${mentorId}/book`,
                method: "POST",
                body: sessionData,
            }),
            invalidatesTags: ["AllMentors"],
        }),

    }),
});

export const {
    useGetAllMentorsQuery,
    useGetMentorByIdQuery,
    useBookSessionMutation,
} = allMentorsApiSlice;