import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // 🔹 Get user / mentor details
        getUserDetails: builder.query({
            query: (mentorId) => `/mentor/dashboard/user/${mentorId}`,
            providesTags: ["User"],
        }),

        // 🔹 Get mentor session bookings
        getMentorSessionBookings: builder.query({
            query: (mentorId) => `/mentor/dashboard/mentor/${mentorId}/sessions`,
            providesTags: ["SessionBookings"],
        }),

    }),
});

export const {
    useGetUserDetailsQuery,
    useGetMentorSessionBookingsQuery,
} = userApiSlice;