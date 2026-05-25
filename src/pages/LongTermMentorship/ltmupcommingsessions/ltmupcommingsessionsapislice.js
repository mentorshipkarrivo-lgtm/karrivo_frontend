// // // features/sessions/sessionsApiSlice.js

// // import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

// // export const sessionsApi = apiSlice.injectEndpoints({
// //     endpoints: (builder) => ({

// //         // GET all sessions for a mentee
// //         getSessionsByMentee: builder.query({
// //             query: (mentee_id) => `/sessions/get-all-sessions-mentee/${mentee_id}`,
// //         }),

// //         // UPDATE session
// //         updateByMenteeSession: builder.mutation({
// //             query: ({ session_id, ...body }) => ({
// //                 url: `/sessions/update-session/${session_id}`,
// //                 method: "POST",
// //                 body,
// //             }),
// //         }),

// //         // SUBMIT task link
// //         submitTask: builder.mutation({
// //             query: ({ session_id, task_submission }) => ({
// //                 url: `/sessions/submit-task/${session_id}`,
// //                 method: "PATCH",
// //                 body: { task_submission },
// //             }),
// //         }),

// //     }),
// // });

// // export const {
// //     useGetSessionsByMenteeQuery,
// //     useUpdateByMenteeSessionMutation,
// //     useSubmitTaskMutation,
// // } = sessionsApi;

// // features/sessions/ltmupcommingsessionsapislice.js

// import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

// export const sessionsApi = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({

//         // GET paginated sessions for a mentee
//         // GET /sessions/get-all-sessions-mentee/:mentee_id?page=1&pageSize=10&status=all
//         getSessionsByMentee: builder.query({
//             query: ({ mentee_id, page = 1, pageSize = 10, status = null }) => {
//                 const params = new URLSearchParams({ page, pageSize });
//                 if (status && status !== "all") params.set("status", status);
//                 return `sessions/get-all-sessions-mentee/${mentee_id}?${params.toString()}`;
//             },
//             providesTags: (result, error, { mentee_id }) => [
//                 { type: "MenteeSessions", id: mentee_id },
//             ],
//         }),

//         // UPDATE session (mentee-editable fields)
//         // POST /sessions/update-session/:session_id
//         updateByMenteeSession: builder.mutation({
//             query: ({ session_id, ...body }) => ({
//                 url: `sessions/update-session/${session_id}`,
//                 method: "POST",
//                 body,
//             }),
//             invalidatesTags: (result, error, { mentee_id }) => [
//                 { type: "MenteeSessions", id: mentee_id },
//             ],
//         }),

//         // SUBMIT task link
//         // PATCH /sessions/submit-task/:session_id
//         submitTask: builder.mutation({
//             query: ({ session_id, task_submission }) => ({
//                 url: `sessions/submit-task/${session_id}`,
//                 method: "PATCH",
//                 body: { task_submission },
//             }),
//         }),
//     }),
// });

// export const {
//     useGetSessionsByMenteeQuery,
//     useUpdateByMenteeSessionMutation,
//     useSubmitTaskMutation,
// } = sessionsApi;


// features/sessions/ltmupcommingsessionsapislice.js

import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const sessionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET paginated sessions for a mentee
        // GET /sessions/get-all-sessions-mentee/:mentee_id?page=1&pageSize=10&status=all
        getSessionsByMentee: builder.query({
            query: ({ mentee_id, page = 1, pageSize = 10, status = null }) => {
                const params = new URLSearchParams({ page, pageSize });
                if (status && status !== "all") params.set("status", status);
                return `sessions/get-all-sessions-mentee/${mentee_id}?${params.toString()}`;
            },
            providesTags: (result, error, { mentee_id }) => [
                { type: "MenteeSessions", id: mentee_id },
            ],
        }),

        // UPDATE session (mentee-editable fields)
        // POST /sessions/update-session/:session_id
        updateByMenteeSession: builder.mutation({
            query: ({ session_id, ...body }) => ({
                url: `sessions/update-session/${session_id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, { mentee_id }) => [
                { type: "MenteeSessions", id: mentee_id },
            ],
        }),

        // SUBMIT task link
        // PATCH /sessions/submit-task/:session_id
        submitTask: builder.mutation({
            query: ({ session_id, task_submission }) => ({
                url: `sessions/submit-task/${session_id}`,
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

