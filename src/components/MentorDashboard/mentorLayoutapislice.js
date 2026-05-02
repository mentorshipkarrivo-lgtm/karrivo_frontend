

import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const mentorSectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        fetchMentorById: builder.query({
            query: ({ mentorId, currentStatus }) => ({
                url: `/Mentor/view/${mentorId}`,   // ✅ param
                params: { currentStatus },         // ✅ query
            }),
            transformResponse: (response) => response.data,
            providesTags: (result, error, arg) => [
                { type: "Mentor", id: arg.mentorId },
            ],
        }),



    }),
});

export const {
    useFetchMentorByIdQuery,
} = mentorSectionApiSlice;
