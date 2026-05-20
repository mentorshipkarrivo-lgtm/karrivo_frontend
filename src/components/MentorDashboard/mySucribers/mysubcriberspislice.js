
import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const sessionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET all sessions for a mentor
        getSessionsByMentor: builder.query({
            query: (mentor_id) => `sessions/get-all-sessions-mentor/${mentor_id}`,
        }),

        // GET all subscribers for a mentor
        getSubscribersByMentor: builder.query({
            query: (mentor_id) => `subscription/subcription-plans-mentor/${mentor_id}`,
        }),

        // UPDATE session (shared by both mentor & mentee)
        updateByMentorSession: builder.mutation({
            query: ({ session_id, ...body }) => ({
                url: `/sessions/update-session/${session_id}`,
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGetSessionsByMentorQuery,
    useGetSubscribersByMentorQuery,
    useUpdateByMentorSessionMutation,
} = sessionsApi;