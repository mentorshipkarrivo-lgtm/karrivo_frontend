// features/sessions/sessionsApiSlice.js

import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const sessionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({


        getSessionsByMentor: builder.query({
            query: (mentor_id) => `sessions/get-all-sessions-mentor/${mentor_id}`,
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
    useUpdateByMentorSessionMutation,
} = sessionsApi;