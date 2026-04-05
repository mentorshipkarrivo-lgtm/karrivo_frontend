import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const myMentorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyMentor: builder.query({
      query: (menteeId) => `/Mentor/get-my-mentor/${menteeId}`,

      providesTags: (result, error, menteeId) => [
        { type: "MyMentor", id: menteeId },
      ],

      transformResponse: (response) => {
        if (!response?.success) return null;
        return response ;
      },
    }),
  }),
});

export const {
  useGetMyMentorQuery,
} = myMentorApiSlice;