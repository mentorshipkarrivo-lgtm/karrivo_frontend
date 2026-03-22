// features/sessions/sessionsApiSlice.js

import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const sessionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET all sessions for a mentee
        getSessionsByMentee: builder.query({
            query: (mentee_id) => `/sessions/get-all-sessions-mentee/${mentee_id}`,
        }),

        // UPDATE session
        updateByMenteeSession: builder.mutation({
            query: ({ session_id, ...body }) => ({
                url: `/sessions/update-session/${session_id}`,
                method: "POST",
                body,
            }),
        }),

        // SUBMIT task link
        submitTask: builder.mutation({
            query: ({ session_id, task_submission }) => ({
                url: `/sessions/submit-task/${session_id}`,
                method: "PATCH",
                body: { task_submission },
            }),
        }),

    }),
});

export const {
    useGetSessionsByMenteeQuery,
    useUpdateByMenteeSessionMutation,
    useSubmitTaskMutation,
} = sessionsApi;
