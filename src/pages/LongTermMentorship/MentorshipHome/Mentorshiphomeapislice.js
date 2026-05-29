

import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const mentorshipHomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // POST so we can send { domain, userCategory } as a body
    getLtmAllMentors: builder.query({
      query: (filters = {}) => ({
        url: "/ltmAvailability/mentors",
        method: "POST",
        body: filters,
      }),
    }),

    searchMentor: builder.mutation({
      query: (data) => ({
        url: "/ltmAvailability/mentors/search",
        method: "POST",
        body: data,
      }),
    }),

    advancedFilterMentors: builder.mutation({
      query: (data) => ({
        url: "/ltmAvailability/mentors/filter",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useGetLtmAllMentorsQuery,
  useSearchMentorMutation,
  useAdvancedFilterMentorsMutation,
} = mentorshipHomeApiSlice;
