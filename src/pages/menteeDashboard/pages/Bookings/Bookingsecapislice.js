


import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const menteeBookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ─── Get mentee bookings (paginated) ───────────────────────────────────
    getMenteeBookings: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => {
        let userId = null;
        try {
          const userData = localStorage.getItem("userData");
          if (userData) {
            const user = JSON.parse(userData);
            userId = user._id || user.id;
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
        return {
          url: "/mentee/trailbookings/my-bookings",
          method: "POST",
          body: { userId, page, limit },
        };
      },
      // Merge pages together in the cache
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (!arg || arg.page === 1) {
          // Fresh load or reset — replace
          return newItems;
        }
        // Append new bookings to existing list
        return {
          ...newItems,
          data: [...(currentCache?.data ?? []), ...(newItems?.data ?? [])],
        };
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page,
      providesTags: ["MenteeBookings"],
    }),

    // ─── Get recommended mentors (paginated) ───────────────────────────────
    getMentorsList: builder.mutation({
      query: ({ menteeType, page = 1, limit = 10 }) => ({
        url: "/mentee/get-mentor-details-for-mentee",
        method: "POST",
        body: { menteeType, page, limit },
      }),
    }),

    // ─── Get available reschedule slots ────────────────────────────────────
    getRescheduleSlots: builder.query({
      query: ({ mentorId }) => ({
        url: `/mentee/trailbookings/get-all-meetings-to-reshedule/${mentorId}`,
        method: "GET",
      }),
      providesTags: ["RescheduleSlots"],
    }),

    // ─── Cancel booking ────────────────────────────────────────────────────
    cancelBooking: builder.mutation({
      query: ({ bookingId, reason }) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["MenteeBookings"],
    }),

    // ─── Reschedule booking ────────────────────────────────────────────────
    rescheduleBooking: builder.mutation({
      query: ({ bookingId, bookedMeetingSlot }) => ({
        url: `/mentee/trailbookings/reshedule-meeting/${bookingId}`,
        method: "POST",
        body: { bookedMeetingSlot },
      }),
      invalidatesTags: ["MenteeBookings", "RescheduleSlots"],
    }),

    // ─── Get booking by ID ─────────────────────────────────────────────────
    getBookingById: builder.query({
      query: (bookingId) => `/bookings/${bookingId}`,
      providesTags: (result, error, bookingId) => [
        { type: "MenteeBookings", id: bookingId },
      ],
    }),
  }),
});

export const {
  useGetMenteeBookingsQuery,
  useGetMentorsListMutation,
  useGetRescheduleSlotsQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
  useGetBookingByIdQuery,
} = menteeBookingsApiSlice;