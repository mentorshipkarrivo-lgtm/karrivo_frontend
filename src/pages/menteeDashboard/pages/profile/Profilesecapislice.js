import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        manageUserProfile: builder.query({
            query: (userId) => ({
                url: `mentee/dashboard/get-mentee-profile/${userId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, userId) => [
                { type: "UserProfile", id: userId }
            ],
            transformResponse: (response) => {
                return response;
            },
            transformErrorResponse: (response) => {
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
            transformResponse: (response) => {
                console.log('💾 Save Response:', response);
                return response;
            },
            async onQueryStarted(profileData, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

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


        uploadProfilePhoto: builder.mutation({
            query: ({ userId, profilePhotoUrl }) => ({
                url: "mentee/dashboard/upload-profile-photo",
                method: "POST",
                body: { userId, profilePhotoUrl },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: "UserProfile", id: userId }
            ],
        }),

        deleteProfilePhoto: builder.mutation({
            query: (userId) => ({
                url: "mentee/dashboard/delete-profile-photo",
                method: "POST",
                body: { userId },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: (result, error, userId) => [
                { type: "UserProfile", id: userId }
            ],
        }),

    }),



});

export const {
    useManageUserProfileQuery,
    useSaveUserProfileMutation,
    useUploadProfilePhotoMutation,  // ADD
    useDeleteProfilePhotoMutation,   // ADD
} = profileApiSlice;



