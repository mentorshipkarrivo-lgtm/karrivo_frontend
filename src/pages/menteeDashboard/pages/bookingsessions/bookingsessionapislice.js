import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const menteeBookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 🔹 Get mentee bookings - sends userId in body
    getMenteeBookings: builder.query({
      query: () => {
        // Get userId from localStorage
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
          url: '/bookings/mentee',
          method: 'POST',
          body: { userId }
        };
      },
      providesTags: ['MenteeBookings'],
      transformResponse: (response) => {
        // Adjust based on your API response structure
        // If response is { data: [...] } use response.data
        // If response is { bookings: [...] } use response.bookings
        return response.data || response.bookings || response;
      }
    }),

    // 🔹 Cancel booking
    cancelBooking: builder.mutation({
      query: ({ bookingId, reason }) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: 'POST',
        body: { reason }
      }),
      invalidatesTags: ['MenteeBookings'],
    }),

    // 🔹 Reschedule booking
    rescheduleBooking: builder.mutation({
      query: ({ bookingId, newDate, newTime }) => ({
        url: `/bookings/${bookingId}/reschedule`,
        method: 'POST',
        body: { 
          newDate, 
          newTime 
        }
      }),
      invalidatesTags: ['MenteeBookings'],
    }),

    // 🔹 Get booking details by ID
    getBookingById: builder.query({
      query: (bookingId) => `/bookings/${bookingId}`,
      providesTags: (result, error, bookingId) => [
        { type: 'MenteeBookings', id: bookingId }
      ],
    }),
  }),
});

export const {
  useGetMenteeBookingsQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
  useGetBookingByIdQuery,
} = menteeBookingsApiSlice;