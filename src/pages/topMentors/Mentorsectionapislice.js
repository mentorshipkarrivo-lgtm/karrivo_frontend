import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const mentorSectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Check Free Session Eligibility
        checkFreeSessionEligibility: builder.query({
            query: (userId) => ({
                url: '/mentee/trailbookings/check-free-session',
                method: 'POST',
                body: { userId }
            }),
            transformResponse: (response) => response,
            providesTags: ['FreeSession'],
        }),

        // Fetch Top Mentors
        fetchTopMentors: builder.query({
            query: ({ limit = 4 }) => `/Mentor/topmentors?limit=${limit}`,
            transformResponse: (response) => response.data,
            providesTags: (result = []) =>
                result.length
                    ? result.map((mentor) => ({
                        type: "TopMentors",
                        id: mentor._id,
                    }))
                    : [{ type: "TopMentors", id: "LIST" }],
        }),

        // Fetch Mentor By ID
        fetchMentorById: builder.query({
            query: (mentorId) => `/Mentor/view/${mentorId}`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, mentorId) => [
                { type: "Mentor", id: mentorId }
            ],
        }),

        // Fetch Mentor Availability
        fetchMentorAvailability: builder.query({
            query: ({ mentorId, date }) => ({
                url: `/Mentor/${mentorId}/availability`,
                params: { date },
            }),
            transformResponse: (response) => response.data,
        }),

        // Create Initial Booking (handles both free and paid)
        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: '/mentee/trailbookings/bookings_session',
                method: 'POST',
                body: bookingData,
            }),
            transformResponse: (response) => response,
            invalidatesTags: [
                { type: "Booking", id: "LIST" },
                'FreeSession'
            ],
        }),

        // Complete Booking with Payment (only for paid bookings)
        completeBooking: builder.mutation({
            query: ({ bookingId, ...paymentDetails }) => ({
                url: `/mentee/trailbookings/bookings/${bookingId}/complete`,
                method: 'POST',
                body: paymentDetails,
            }),
            transformResponse: (response) => response,
            invalidatesTags: (result, error, { bookingId }) => [
                { type: "Booking", id: bookingId },
                { type: "Booking", id: "LIST" },
            ],
        }),

        // Fetch User Bookings
        fetchUserBookings: builder.query({
            query: ({ userId }) => ({
                url: '/mentee/trailbookings/my-bookings',
                method: 'POST',
                body: { userId }
            }),
            transformResponse: (response) => response,
            providesTags: (result = {}) => {
                const bookings = result.data || [];
                return bookings.length
                    ? [
                        ...bookings.map((booking) => ({
                            type: "Booking",
                            id: booking._id,
                        })),
                        { type: "Booking", id: "LIST" },
                    ]
                    : [{ type: "Booking", id: "LIST" }];
            },
        }),

        // Cancel Booking
        cancelBooking: builder.mutation({
            query: ({ bookingId, reason }) => ({
                url: `/mentee/trailbookings/bookings/${bookingId}/cancel`,
                method: 'POST',
                body: { reason },
            }),
            transformResponse: (response) => response,
            invalidatesTags: (result, error, { bookingId }) => [
                { type: "Booking", id: bookingId },
                { type: "Booking", id: "LIST" },
                'FreeSession'
            ],
        }),

        // Verify Payment
        verifyPayment: builder.mutation({
            query: (paymentData) => ({
                url: '/Mentor/payments/verify',
                method: 'POST',
                body: paymentData,
            }),
            transformResponse: (response) => response.data,
        }),

        // Fetch Mentor Reviews
        fetchMentorReviews: builder.query({
            query: ({ mentorId, page = 1, limit = 5 }) => ({
                url: `/Mentor/${mentorId}/reviews`,
                params: { page, limit },
            }),
            transformResponse: (response) => response.data,
            providesTags: (result, error, { mentorId }) => [
                { type: "Review", id: mentorId }
            ],
        }),

        // Submit Review
        submitReview: builder.mutation({
            query: ({ bookingId, rating, comment }) => ({
                url: '/Mentor/reviews',
                method: 'POST',
                body: { bookingId, rating, comment },
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: (result, error, { bookingId }) => [
                { type: "Review", id: "LIST" },
                { type: "Booking", id: bookingId },
            ],
        }),


        // Legacy - Book Session (keeping for backwards compatibility)
        bookSession: builder.mutation({
            query: (data) => ({
                url: '/Mentor/book-session',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response) => response.data,
        }),

    }),
});

export const {
    useCheckFreeSessionEligibilityQuery,
    useFetchTopMentorsQuery,
    useFetchMentorByIdQuery,
    useFetchMentorAvailabilityQuery,
    useCreateBookingMutation,
    useCompleteBookingMutation,
    useVerifyPaymentMutation,
    useFetchUserBookingsQuery,
    useCancelBookingMutation,
    useFetchMentorReviewsQuery,
    useSubmitReviewMutation,
    useBookSessionMutation
} = mentorSectionApiSlice;


