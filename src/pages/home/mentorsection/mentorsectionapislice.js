import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const mentorSectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Fetch Top Mentors (Frontend only)
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

        // Fetch Mentor By ID (for profile view and booking)
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

        // Create Initial Booking
        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: '/mentee/trailbookings/bookings_session',
                method: 'POST',
                body: bookingData,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: [{ type: "Booking", id: "LIST" }],
        }),

        // Complete Booking with Payment
        completeBooking: builder.mutation({
            query: ({ bookingId, paymentDetails }) => ({
                url: `/mentee/trailbookings/bookings/${bookingId}/complete`,
                method: 'POST',
                body: paymentDetails,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: (result, error, { bookingId }) => [
                { type: "Booking", id: bookingId },
                { type: "Booking", id: "LIST" },
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

        // Fetch User Bookings
        fetchUserBookings: builder.query({
            query: ({ status = 'all', page = 1, limit = 10 }) => ({
                url: '/Mentor/bookings/user',
                params: { status, page, limit },
            }),
            transformResponse: (response) => response.data,
            providesTags: (result = {}) => {
                const bookings = result.bookings || [];
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
                url: `/Mentor/bookings/${bookingId}/cancel`,
                method: 'POST',
                body: { reason },
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: (result, error, { bookingId }) => [
                { type: "Booking", id: bookingId },
                { type: "Booking", id: "LIST" },
            ],
        }),

        // Apply for Scholarship
        applyScholarship: builder.mutation({
            query: (applicationData) => ({
                url: '/Mentor/scholarships/apply',
                method: 'POST',
                body: applicationData,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: [{ type: "Scholarship", id: "LIST" }],
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
    useFetchTopMentorsQuery,
    useFetchMentorByIdQuery,
    useFetchMentorAvailabilityQuery,
    useCreateBookingMutation,
    useCompleteBookingMutation,
    useVerifyPaymentMutation,
    useFetchUserBookingsQuery,
    useCancelBookingMutation,
    useApplyScholarshipMutation,
    useFetchMentorReviewsQuery,
    useSubmitReviewMutation,
    useBookSessionMutation,
} = mentorSectionApiSlice;