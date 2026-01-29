// src/features/support/supportApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const supportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all support tickets for a user
        getSupportTickets: builder.query({
            query: (userId) => ({
                url: `mentee/support/get-tickets/${userId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: ["SupportTickets"],
        }),

        // Create a new support ticket
        createSupportTicket: builder.mutation({
            query: (ticketData) => ({
                url: "mentee/support/create-ticket",
                method: "POST",
                body: {
                    username: ticketData.username,
                    subject: ticketData.subject,
                    category: ticketData.category,
                    priority: ticketData.priority,
                    description: ticketData.description,
                    status: "pending", // Default status
                    createdAt: new Date().toISOString(),
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["SupportTickets"],
        }),

        // Get a single ticket by ID
        getSupportTicketById: builder.query({
            query: (ticketId) => ({
                url: `mentee/support/get-ticket/${ticketId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, ticketId) => [{ type: "SupportTickets", id: ticketId }],
        }),

        // Update ticket status (optional - for when admin responds)
        updateSupportTicket: builder.mutation({
            query: ({ ticketId, updates }) => ({
                url: `mentee/support/update-ticket/${ticketId}`,
                method: "PATCH",
                body: updates,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: (result, error, { ticketId }) => [
                "SupportTickets",
                { type: "SupportTickets", id: ticketId }
            ],
        }),
    }),
});

export const {
    useGetSupportTicketsQuery,
    useCreateSupportTicketMutation,
    useGetSupportTicketByIdQuery,
    useUpdateSupportTicketMutation,
} = supportApiSlice;