// src/features/profile/profileApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch and Save User Profile (Single Endpoint)
        manageUserProfile: builder.query({
            query: (userId) => ({
                url: `mentee/dashboard/get-mentee-profile/${userId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: ["UserProfile"],
        }),

        // Save/Update Profile (Single Mutation)
        saveUserProfile: builder.mutation({
            query: (profileData) => ({
                url: "mentee/dashboard/save-profile",
                method: "POST",
                body: profileData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["UserProfile"],
        }),
    }),
});

export const {
    useManageUserProfileQuery,
    useSaveUserProfileMutation,
} = profileApiSlice;