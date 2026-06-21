import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getSubscriptionsByMenteeId: builder.query({
      query: (mentee_id) => `/subscription/subcription-plans-mentee/${mentee_id}`,
      providesTags: (result, error, mentee_id) => [{ type: "Subscription", id: mentee_id }],
      transformResponse: (response) => {
        if (!response.success) return [];
        const raw = response.data;
        return raw ? (Array.isArray(raw) ? raw : [raw]) : [];
      },
    }),

    getRefundPreview: builder.query({
      query: (subscription_id) => `/subscription/refund-preview/${subscription_id}`,
      transformResponse: (response) => response.data,
    }),

    // ── NEW: fetch refund request by subscription_id ──
    getRefundBySubscriptionId: builder.query({
      query: (subscription_id) => `/refunds/by-subscription/${subscription_id}`,
      transformResponse: (response) => response.data,
    }),

    cancelSubscription: builder.mutation({
      query: ({ subscription_id, cancellation_reason }) => ({
        url: `/subscription/cancel-subscription/${subscription_id}`,
        method: "PUT",
        body: { cancellation_reason },
      }),
      invalidatesTags: (result, error, { mentee_id }) => [
        { type: "Subscription", id: mentee_id },
      ],
    }),

  }),
});

export const {
  useGetSubscriptionsByMenteeIdQuery,
  useGetRefundPreviewQuery,
  useGetRefundBySubscriptionIdQuery,
  useCancelSubscriptionMutation,
} = subscriptionApiSlice;