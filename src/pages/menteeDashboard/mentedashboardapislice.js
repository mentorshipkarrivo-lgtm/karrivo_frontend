// store/slices/menteeProfileApiSlice.js
import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const menteeProfileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenteeProfile: builder.query({
            query: (userId) => ({
                url: `/mentee/dashboard/profile-status/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, userId) => [
                { type: "MenteeProfile", id: userId },
            ],
        }),

        saveMenteeProfile: builder.mutation({
            query: ({ userId, ...body }) => ({
                url: `/mentee/dashboard/profile-status/${userId}`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: "MenteeProfile", id: userId },
            ],
        }),
    }),
});

export const {
    useGetMenteeProfileQuery,
    useSaveMenteeProfileMutation,
} = menteeProfileApiSlice;