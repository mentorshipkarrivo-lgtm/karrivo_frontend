import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewsByMentorId: builder.query({
            query: (mentorId) => `/get-reviews/get-reviews/${mentorId}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetReviewsByMentorIdQuery } = reviewsApiSlice;