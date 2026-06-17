import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewsByMentorId: builder.query({
            // was: query: (mentorId) => `/reviews/${mentorId}`,
            query: ({ mentorId, page = 1, limit = 9 }) =>
                `/get-reviews/get-reviews/${mentorId}?page=${page}&limit=${limit}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetReviewsByMentorIdQuery } = reviewsApiSlice;