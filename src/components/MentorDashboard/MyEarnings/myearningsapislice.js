import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const earningsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // ─────────────────────────────────────
        // Mentor Earnings
        // ─────────────────────────────────────

        getMentorEarnings: builder.query({
            query: ({
                mentor_id,
                page = 1,
                limit = 10,
            }) =>
                `/earnings/mentor-booking-payments/${mentor_id}?page=${page}&limit=${limit}`,
        }),

        // ─────────────────────────────────────
        // Get Payout Details
        // ─────────────────────────────────────

        getPayoutDetails: builder.query({
            query: (userId) =>
                `/earnings/payout-details/${userId}`,

            providesTags: ["PayoutDetails"],
        }),

        // ─────────────────────────────────────
        // Save Payout Details
        // ─────────────────────────────────────

        savePayoutDetails: builder.mutation({
            query: ({ userId, ...body }) => ({
                url: `/earnings/payout-details/${userId}`,
                method: "POST",
                body,
            }),

            invalidatesTags: ["PayoutDetails"],
        }),

    }),

    overrideExisting: false,
});

export const {
    useGetMentorEarningsQuery,
    useGetPayoutDetailsQuery,
    useSavePayoutDetailsMutation,
} = earningsApi;