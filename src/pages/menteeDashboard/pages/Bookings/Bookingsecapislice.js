

// import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

// export const menteeBookingsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // 🔹 Get mentee bookings
//     getMenteeBookings: builder.query({
//       query: () => {
//         let userId = null;
//         try {
//           const userData = localStorage.getItem("userData");
//           if (userData) {
//             const user = JSON.parse(userData);
//             userId = user._id || user.id;
//           }
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//         }
//         return {
//           url: "/mentee/trailbookings/my-bookings",
//           method: "POST",
//           body: { userId },
//         };
//       },
//       providesTags: ["MenteeBookings"],
//     }),

//     getRescheduleSlots: builder.query({
//       query: ({ mentorId }) => ({
//         url: `/mentee/trailbookings/get-all-meetings-to-reshedule/${mentorId}`,
//         method: "GET",
//       }),
//       providesTags: ["RescheduleSlots"],
//     }),

//     // 🔹 Cancel booking
//     cancelBooking: builder.mutation({
//       query: ({ bookingId, reason }) => ({
//         url: `/bookings/${bookingId}/cancel`,
//         method: "POST",
//         body: { reason },
//       }),
//       invalidatesTags: ["MenteeBookings"],
//     }),

//     // 🔹 Reschedule booking — sends selected day slot
//     rescheduleBooking: builder.mutation({
//       query: ({ bookingId, bookedMeetingSlot }) => ({
//         url: `/mentee/trailbookings/reshedule-meeting/${bookingId}`,
//         method: "POST",
//         body: { bookedMeetingSlot },
//       }),
//       invalidatesTags: ["MenteeBookings", "RescheduleSlots"],
//     }),

//     // 🔹 Get booking details by ID
//     getBookingById: builder.query({
//       query: (bookingId) => `/bookings/${bookingId}`,
//       providesTags: (result, error, bookingId) => [
//         { type: "MenteeBookings", id: bookingId },
//       ],
//     }),
//   }),
// });

// export const {
//   useGetMenteeBookingsQuery,
//   useGetRescheduleSlotsQuery,
//   useLazyGetRescheduleSlotsQuery,
//   useCancelBookingMutation,
//   useRescheduleBookingMutation,
//   useGetBookingByIdQuery,
// } = menteeBookingsApiSlice;

import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const menteeBookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get mentee bookings
    getMenteeBookings: builder.query({
      query: () => {
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
          body: { userId },
        };
      },
      providesTags: ["MenteeBookings"],
    }),

    // Get available reschedule slots
    getRescheduleSlots: builder.query({
      query: ({ mentorId }) => ({
        url: `/mentee/trailbookings/get-all-meetings-to-reshedule/${mentorId}`,
        method: "GET",
      }),
      providesTags: ["RescheduleSlots"],
    }),

    // Cancel booking
    cancelBooking: builder.mutation({
      query: ({ bookingId, reason }) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["MenteeBookings"],
    }),

    // Reschedule booking — sends selected day slot
    rescheduleBooking: builder.mutation({
      query: ({ bookingId, bookedMeetingSlot }) => ({
        url: `/mentee/trailbookings/reshedule-meeting/${bookingId}`,
        method: "POST",
        body: { bookedMeetingSlot },
      }),
      invalidatesTags: ["MenteeBookings", "RescheduleSlots"],
    }),

    // Get booking details by ID
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
  useGetRescheduleSlotsQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
  useGetBookingByIdQuery,
} = menteeBookingsApiSlice;


