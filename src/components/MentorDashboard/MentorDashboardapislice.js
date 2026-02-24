import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // 🔹 Get user / mentor details by userId
        getUserDetails: builder.query({
            query: (mentorId) => `/mentor/dashboard/user/${mentorId}`,
            providesTags: ["User"],
        }),

        // 🔹 Get mentor session bookings by email
        // Sends email → backend resolves mentorId → returns all bookings
        getMentorSessionBookings: builder.query({
            query: (email) => `/mentor/dashboard/sessions/by-email/${encodeURIComponent(email)}`,
            providesTags: ["SessionBookings"],
        }),


        getMentorSessions: builder.query({
            query: (mentorId) => `/sessions/mentor/${mentorId}`,
            providesTags: ["SessionBookings"],
        }),

    }),
});

export const {
    useGetUserDetailsQuery,
    useGetMentorSessionBookingsQuery,
    useGetMentorSessionsQuery,

} = userApiSlice;