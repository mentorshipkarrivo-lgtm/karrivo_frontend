import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const completedSessionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompletedSessions: builder.query({
            query: (mentee_id) => ({
                url: `sessions/get-all-completed-sessions_mentee/${mentee_id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, mentee_id) => [
                { type: "CompletedSessions", id: mentee_id },
            ],
        }),
    }),
});

export const { useGetCompletedSessionsQuery } = completedSessionsApiSlice;