// src/features/mentorPricing/mentorPricingApiSlice.js

import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const mentorPricingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET mentor pricing
        getMyPricing: builder.query({
            query: (mentorId) => ({
                url: `/myPricing/mentor/pricing/${mentorId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        // Save or update all plans
        saveOrUpdatePricing: builder.mutation({
            query: ({ mentorId, plans }) => ({
                url: `/myPricing/mentor/pricing`,
                method: "POST",
                params: { mentorId },
                body: { plans },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
        }),

        // Update single pricing plan
        updateSinglePlan: builder.mutation({
            query: ({ mentorId, planKey, experienced, freshers }) => ({
                url: `/myPricing/mentor/pricing/${planKey}`,
                method: "PUT",
                params: { mentorId },
                body: { experienced, freshers },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
        }),

    }),
});

export const {
    useGetMyPricingQuery,
    useSaveOrUpdatePricingMutation,
    useUpdateSinglePlanMutation,
} = mentorPricingApiSlice;