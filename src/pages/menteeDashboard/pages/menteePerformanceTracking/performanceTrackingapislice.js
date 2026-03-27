import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const performanceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMenteeAnalytics: builder.query({
            query: (menteeId) => ({
                url: `/performance/analytics/${menteeId}`,
                method: "GET",
            }),

            providesTags: (result, error, menteeId) => [
                { type: "MenteeAnalytics", id: menteeId },
            ],

            transformResponse: (response) => {
                if (response?.success && response?.data) {
                    return response.data;
                }
                return null;
            },

            transformErrorResponse: (response) => {
                return {
                    status: response.status,
                    message:
                        response?.data?.message ||
                        "Failed to fetch analytics. Please try again.",
                };
            },
        }),

    }),
});

export const { useGetMenteeAnalyticsQuery } = performanceApiSlice;