import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const sessionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // 🔹 Create session
        createSession: builder.mutation({
            query: (data) => ({
                url: "/sessions/create",
                method: "POST",
                body: data,
            }),
        }),

        // 🔹 Mentor sessions
        getMentorSessions: builder.query({
            query: (mentorId) => `/sessions/mentor/${mentorId}`,
            providesTags: ["Sessions"],
        }),

        // 🔹 Mentee sessions
        getMenteeSessions: builder.query({
            query: (menteeId) => `/sessions/mentee/${menteeId}`,
            providesTags: ["Sessions"],
        }),

        // 🔹 Update status
        updateSessionStatus: builder.mutation({
            query: ({ sessionId, status }) => ({
                url: `/sessions/update-status/${sessionId}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Sessions"],
        }),
    }),
});

export const {
    useCreateSessionMutation,
    useGetMentorSessionsQuery,
    useGetMenteeSessionsQuery,
    useUpdateSessionStatusMutation,
} = sessionApiSlice;
