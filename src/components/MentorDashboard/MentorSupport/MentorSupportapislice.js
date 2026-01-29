// src/features/mentorDashboard/mentorSupportApiSlice.js
import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const mentorSupportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all support tickets for a mentor
        getMentorSupportTickets: builder.query({
            query: (mentorId) => ({
                url: `mentor/support/get-tickets/${mentorId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: ["MentorSupportTickets"],
        }),

        // Create a new support ticket for mentor
        createMentorSupportTicket: builder.mutation({
            query: (ticketData) => ({
                url: "mentor/support/create-ticket",
                method: "POST",
                body: {
                    mentorId: ticketData.mentorId,
                    subject: ticketData.subject,
                    category: ticketData.category,
                    priority: ticketData.priority,
                    description: ticketData.description,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["MentorSupportTickets"],
        }),

        // Get a single ticket by ID
        getMentorSupportTicketById: builder.query({
            query: (ticketId) => ({
                url: `mentor/support/get-ticket/${ticketId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, ticketId) => [
                { type: "MentorSupportTickets", id: ticketId }
            ],
        }),

        // Update ticket (for feedback)
        updateMentorSupportTicket: builder.mutation({
            query: ({ ticketId, updates }) => ({
                url: `mentor/support/update-ticket/${ticketId}`,
                method: "PATCH",
                body: updates,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: (result, error, { ticketId }) => [
                "MentorSupportTickets",
                { type: "MentorSupportTickets", id: ticketId }
            ],
        }),
    }),
});

export const {
    useGetMentorSupportTicketsQuery,
    useCreateMentorSupportTicketMutation,
    useGetMentorSupportTicketByIdQuery,
    useUpdateMentorSupportTicketMutation,
} = mentorSupportApiSlice;