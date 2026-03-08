import { apiSlice } from "../api/apiSlice"; // adjust path to your base apiSlice

export const commissionTierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ── GET all tiers
    getCommissionTiers: builder.query({
      query: () => "/commission-tiers",
      providesTags: ["CommissionTiers"],
    }),

    // ── GET tier for mentor by ltm_count
    getMentorTier: builder.query({
      query: (ltm_count) => `/commission-tiers/mentor?ltm_count=${ltm_count}`,
      providesTags: ["CommissionTiers"],
    }),

    // ── UPDATE a single tier by ltm_range
    updateCommissionTier: builder.mutation({
      query: ({ ltm_range, ...body }) => ({
        url: `/commission-tiers/${ltm_range}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CommissionTiers"],
    }),

    // ── UPDATE all tiers at once
    updateAllCommissionTiers: builder.mutation({
      query: (tiers) => ({
        url: "/commission-tiers",
        method: "PUT",
        body: { tiers },
      }),
      invalidatesTags: ["CommissionTiers"],
    }),
  }),
});

export const {
  useGetCommissionTiersQuery,
  useGetMentorTierQuery,
  useUpdateCommissionTierMutation,
  useUpdateAllCommissionTiersMutation,
} = commissionTierApiSlice;