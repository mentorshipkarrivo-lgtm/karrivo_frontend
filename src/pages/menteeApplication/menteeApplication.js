// src/features/mentee/menteeApiSlice.js
import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const menteeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Submit Mentee Application
        submitMenteeApplication: builder.mutation({
            query: (formData) => ({
                url: "/mentee/apply",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["MenteeApplications"], // optional, triggers refetch
        }),

        // Fetch All Mentee Applications (admin)
        fetchMenteeApplications: builder.query({
            query: () => ({
                url: "/mentee/applications",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result = [], error) =>
                result
                    ? [
                        ...result.data.map(({ _id }) => ({ type: "MenteeApplications", id: _id })),
                        { type: "MenteeApplications", id: "LIST" },
                    ]
                    : [{ type: "MenteeApplications", id: "LIST" }],
        }),

        // Fetch Single Mentee Application by ID
        fetchMenteeApplicationById: builder.query({
            query: (id) => ({
                url: `/mentee/applications/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, id) => [{ type: "MenteeApplications", id }],
        }),

        // Update Application Status
        updateApplicationStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/mentee/applications/${id}/status`,
                method: "PATCH",
                body: { status },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "MenteeApplications", id }],
        }),
    }),
});

export const {
    useSubmitMenteeApplicationMutation,
    useFetchMenteeApplicationsQuery,
    useFetchMenteeApplicationByIdQuery,
    useUpdateApplicationStatusMutation,
} = menteeApiSlice;
