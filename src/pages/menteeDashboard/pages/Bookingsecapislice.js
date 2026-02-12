import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const trialBookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 Get mentors list - FIXED: Changed from "useGetMentorsQuery" to "getMentors"
    getMentors: builder.mutation({
      query: (userData) => ({
        url: "/Mentor/get-mentor-details",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response) => response.data.data,
    }),

    // 🔹 Get available slots
    getSlots: builder.query({
      query: ({ mentorId, date }) => ({
        url: `/trial/slots?mentorId=${mentorId}&date=${date}`,
      }),
    }),

    // 🔹 Book free trial
    bookFreeTrial: builder.mutation({
      query: (body) => ({
        url: "/trial/free",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyBookings"],
    }),

    // 🔹 Book premium trial
    bookPremiumTrial: builder.mutation({
      query: (body) => ({
        url: "/trial/premium",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyBookings"],
    }),
  }),
});

export const {
  useGetMentorsMutation,
  useGetSlotsQuery,
  useBookFreeTrialMutation,
  useBookPremiumTrialMutation,
} = trialBookingApiSlice;