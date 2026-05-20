

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

        // GET all subscribers for a mentor (used for tier resolution)
        getSubscribersByMentor: builder.query({
            query: (mentor_id) => `subscription/subcription-plans-mentor/${mentor_id}`,
        }),

        // GET all commission tiers
        getCommissionTiers: builder.query({
            query: () => `settings/commission-tiers`,
        }),



        // =====================================================
        // COUPON ROUTES
        // =====================================================



        // CREATE COUPON
        createCoupon: builder.mutation({
            query: (data) => ({
                url: `/Coupons/create-coupon`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
        }),

        // GET ALL COUPONS
        getAllCoupons: builder.query({
            query: () => ({
                url: `/Coupons/all-coupons`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        // UPDATE COUPON
        updateCoupon: builder.mutation({
            query: ({ couponId, ...data }) => ({
                url: `/Coupons/update-coupon/${couponId}`,
                method: "PUT",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
        }),

        // DELETE COUPON
        deleteCoupon: builder.mutation({
            query: (couponId) => ({
                url: `/Coupons/delete-coupon/${couponId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),


    }),
});

export const {
    useGetMyPricingQuery,
    useSaveOrUpdatePricingMutation,
    useUpdateSinglePlanMutation,
    useGetSubscribersByMentorQuery,
    useGetCommissionTiersQuery,



    useCreateCouponMutation,
    useGetAllCouponsQuery,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
} = mentorPricingApiSlice;