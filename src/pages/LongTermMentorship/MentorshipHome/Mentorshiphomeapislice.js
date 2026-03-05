import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const mentorshipHomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getLtmAllMentors: builder.query({
      query: () => ({
        url: "/ltmAvailability/mentors",
        method: "GET",
      }),
    }),

    searchMentor: builder.mutation({
      query: (data) => ({
        url: "/ltmAvailability/mentors/search",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useGetLtmAllMentorsQuery,
  useSearchMentorMutation,
} = mentorshipHomeApiSlice;