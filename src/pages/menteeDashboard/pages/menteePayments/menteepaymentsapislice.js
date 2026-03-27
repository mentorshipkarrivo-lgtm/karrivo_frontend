import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const paymentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMenteeMyPayments: builder.query({
            query: (menteeId) => ({
                url: `/payments/get-mentee-my-payments/${menteeId}`,
                method: "GET",
            }),

            providesTags: (result, error, menteeId) => [
                { type: "MenteePayments", id: menteeId },
            ],

            transformResponse: (response) => {
                if (response?.success && Array.isArray(response?.data)) {
                    return response.data;
                }
                return [];
            },

            transformErrorResponse: (response) => {
                return {
                    status: response.status,
                    message:
                        response?.data?.message ||
                        "Failed to fetch payments. Please try again.",
                };
            },
        }),

    }),
});

export const { useGetMenteeMyPaymentsQuery } = paymentsApiSlice;