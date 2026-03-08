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


  }),
});

export const {
  useGetSubscriptionsByMenteeIdQuery,

} = subscriptionApiSlice;