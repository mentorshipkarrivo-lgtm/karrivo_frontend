// // src/features/profile/profileApiSlice.js
// import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

// export const profileApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         // Fetch and Save User Profile (Single Endpoint)
//         manageUserProfile: builder.query({
//             query: (userId) => ({
//                 url: `mentee/dashboard/get-mentee-profile/${userId}`,
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             }),
//             // ✅ CHANGE: Provide tag with specific userId
//             providesTags: (result, error, userId) => [
//                 { type: "UserProfile", id: userId }
//             ],
//         }),

//         // Save/Update Profile (Single Mutation)
//         saveUserProfile: builder.mutation({
//             query: (profileData) => ({
//                 url: "mentee/dashboard/save-profile",
//                 method: "POST",
//                 body: profileData,
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json",
//                 },
//             }),
//             // ✅ CHANGE: Invalidate tag with specific userId
//             invalidatesTags: (result, error, profileData) => [
//                 { type: "UserProfile", id: profileData.userId }
//             ],
//         }),
//     }),
// });

// export const {
//     useManageUserProfileQuery,
//     useSaveUserProfileMutation,
// } = profileApiSlice;



// src/features/profile/profileApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch User Profile
        manageUserProfile: builder.query({
            query: (userId) => ({
                url: `mentee/dashboard/get-mentee-profile/${userId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            // Provide specific tag for cache invalidation
            providesTags: (result, error, userId) => [
                { type: "UserProfile", id: userId }
            ],
            // ✅ ADD: Transform response to ensure consistent structure
            transformResponse: (response) => {
                console.log('🔍 API Response:', response);
                // If response has nested profile, return it
                // Otherwise return the response as is
                return response;
            },
            // ✅ ADD: Handle errors gracefully
            transformErrorResponse: (response) => {
                console.error('❌ API Error:', response);
                return response;
            },
        }),

        // Save/Update Profile
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
            // Invalidate cache to trigger refetch
            invalidatesTags: (result, error, profileData) => [
                { type: "UserProfile", id: profileData.userId }
            ],
            // ✅ ADD: Transform save response
            transformResponse: (response) => {
                console.log('💾 Save Response:', response);
                return response;
            },
            // ✅ ADD: Optimistic update for better UX (optional)
            async onQueryStarted(profileData, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('✅ Mutation successful:', data);
                    
                    // Manually update the cache with new data
                    dispatch(
                        profileApiSlice.util.updateQueryData(
                            'manageUserProfile',
                            profileData.userId,
                            (draft) => {
                                // Update draft with new profile data
                                Object.assign(draft, data);
                            }
                        )
                    );
                } catch (err) {
                    console.error('❌ Mutation failed:', err);
                }
            },
        }),
    }),
});

export const {
    useManageUserProfileQuery,
    useSaveUserProfileMutation,
} = profileApiSlice;



