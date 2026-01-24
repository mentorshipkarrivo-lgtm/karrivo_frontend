import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mentorApi = createApi({
  reducerPath: 'mentorApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Mentees', 'MentorStats', 'Sessions'],
  endpoints: (builder) => ({
    // Get all mentees for a mentor
    getMentees: builder.query({
      query: (mentorId) => `/mentor/${mentorId}/mentees`,
      providesTags: ['Mentees'],
    }),
    
    // Get mentor statistics
    getMentorStats: builder.query({
      query: (mentorId) => `/mentor/${mentorId}/stats`,
      providesTags: ['MentorStats'],
    }),
    
    // Get upcoming sessions
    getUpcomingSessions: builder.query({
      query: (mentorId) => `/mentor/${mentorId}/sessions/upcoming`,
      providesTags: ['Sessions'],
    }),
    
    // Get mentee progress
    getMenteeProgress: builder.query({
      query: ({ mentorId, menteeId }) => 
        `/mentor/${mentorId}/mentee/${menteeId}/progress`,
    }),
    
    // Update mentee status
    updateMenteeStatus: builder.mutation({
      query: ({ mentorId, menteeId, status }) => ({
        url: `/mentor/${mentorId}/mentee/${menteeId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Mentees', 'MentorStats'],
    }),
    
    // Schedule a session
    scheduleSession: builder.mutation({
      query: ({ mentorId, sessionData }) => ({
        url: `/mentor/${mentorId}/sessions`,
        method: 'POST',
        body: sessionData,
      }),
      invalidatesTags: ['Sessions'],
    }),
  }),
});

export const {
  useGetMenteesQuery,
  useGetMentorStatsQuery,
  useGetUpcomingSessionsQuery,
  useGetMenteeProgressQuery,
  useUpdateMenteeStatusMutation,
  useScheduleSessionMutation,
} = mentorApi;
