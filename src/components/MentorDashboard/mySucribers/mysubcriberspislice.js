// mysubcriberspislice.js — RTK Query slice with pagination support

import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const sessionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET paginated sessions for a mentor
        // Usage: useGetSessionsByMentorQuery({ mentorId, page: 1, pageSize: 10, status: 'all' })
        getSessionsByMentor: builder.query({
            query: ({ mentorId, page = 1, pageSize = 10, status = null }) => {
                const params = new URLSearchParams({ page, pageSize });
                if (status && status !== "all") params.set("status", status);
                return `sessions/get-all-sessions-mentor/${mentorId}?${params.toString()}`;
            },
            // Cache separately per page/filter combo
            serializeQueryArgs: ({ queryArgs }) => {
                const { mentorId } = queryArgs;
                return mentorId; // base cache key
            },
            // Merge pages if you want infinite scroll — keep separate for table pagination
            forceRefetch: ({ currentArg, previousArg }) =>
                currentArg?.page !== previousArg?.page ||
                currentArg?.pageSize !== previousArg?.pageSize ||
                currentArg?.status !== previousArg?.status,
        }),

        // GET all subscribers for a mentor (no pagination — typically small list)
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