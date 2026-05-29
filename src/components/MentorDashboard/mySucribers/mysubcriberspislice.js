

import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const sessionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET paginated sessions for a mentor
        getSessionsByMentor: builder.query({
            query: ({ mentorId, page = 1, pageSize = 10, status = null }) => {
                const params = new URLSearchParams({ page, pageSize });
                if (status && status !== "all") params.set("status", status);
                return `sessions/get-all-sessions-mentor/${mentorId}?${params.toString()}`;
            },
            providesTags: (result, error, { mentorId }) => [
                { type: "Sessions", id: mentorId },
            ],
        }),

        // GET all subscribers for a mentor
        getSubscribersByMentor: builder.query({
            query: (mentor_id) =>
                `subscription/subcription-plans-mentor/${mentor_id}`,
            providesTags: (result, error, mentor_id) => [
                { type: "Subscribers", id: mentor_id },
            ],
        }),

        // UPDATE session — only mentor-editable fields
        // POST /sessions/update-session/:session_id
        updateByMentorSession: builder.mutation({
            query: ({ session_id, ...body }) => ({
                url: `sessions/update-session/${session_id}`,
                method: "POST",
                body,
            }),
            // Invalidate by mentorId so the sessions list refetches
            invalidatesTags: (result, error, { mentor_id }) => [
                { type: "Sessions", id: mentor_id },
            ],
        }),
    }),
});

export const {
    useGetSessionsByMentorQuery,
    useGetSubscribersByMentorQuery,
    useUpdateByMentorSessionMutation,
} = sessionsApi;


