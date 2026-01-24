// features/zoom/zoomApiSlice.js
import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const zoomApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new Zoom meeting
        createZoomMeeting: builder.mutation({
            query: (meetingData) => ({
                url: '/meetings',
                method: 'POST',
                body: meetingData,
            }),
            invalidatesTags: ['ZoomMeetings', 'UpcomingMeetings'],
        }),

        // Get all meetings with pagination and filters
        getZoomMeetings: builder.query({
            query: ({ status, page = 1, limit = 10 } = {}) => {
                const params = new URLSearchParams();
                if (status) params.append('status', status);
                params.append('page', page);
                params.append('limit', limit);
                return `/meetings?${params.toString()}`;
            },
            providesTags: ['ZoomMeetings'],
        }),

        // Get upcoming meetings
        getUpcomingMeetings: builder.query({
            query: () => '/meetings/upcoming',
            providesTags: ['UpcomingMeetings'],
        }),

        // Get meeting by ID
        getZoomMeetingById: builder.query({
            query: (id) => `/meetings/${id}`,
            providesTags: (result, error, id) => [{ type: 'ZoomMeetings', id }],
        }),

        // Update meeting
        updateZoomMeeting: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/meetings/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'ZoomMeetings', id },
                'ZoomMeetings',
                'UpcomingMeetings',
            ],
        }),

        // Delete/Cancel meeting
        deleteZoomMeeting: builder.mutation({
            query: (id) => ({
                url: `/meetings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ZoomMeetings', 'UpcomingMeetings'],
        }),
    }),
});

export const {
    useCreateZoomMeetingMutation,
    useGetZoomMeetingsQuery,
    useGetUpcomingMeetingsQuery,
    useGetZoomMeetingByIdQuery,
    useUpdateZoomMeetingMutation,
    useDeleteZoomMeetingMutation,
} = zoomApiSlice;