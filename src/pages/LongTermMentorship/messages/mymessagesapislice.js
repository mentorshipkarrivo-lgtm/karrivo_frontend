// src/features/messages/messageApiSlice.js
import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // ─── GET INBOX (all sessions with last message) ─────────────────────────
        fetchInbox: builder.query({
            query: (userId) => ({
                url: `/messages/inbox/${userId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: [{ type: "Inbox", id: "LIST" }],
        }),

        // ─── GET MESSAGES FOR A SESSION ───────────────────────────────────────
        fetchMessages: builder.query({
            query: ({ sessionId, userId }) => ({
                url: `/messages/session/${sessionId}?userId=${userId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, { sessionId }) => [
                { type: "Messages", id: sessionId },
            ],
        }),

        // ─── SEND MESSAGE ──────────────────────────────────────────────────────
        sendMessage: builder.mutation({
            query: (body) => ({
                url: `/messages/send`,
                method: "POST",
                body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: (result, error, { sessionId }) => [
                { type: "Messages", id: sessionId },
                { type: "Inbox", id: "LIST" },
            ],
        }),

        // ─── GET UNREAD COUNT ──────────────────────────────────────────────────
        fetchUnreadCount: builder.query({
            query: (userId) => ({
                url: `/messages/unread/${userId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: [{ type: "Inbox", id: "LIST" }],
        }),

    }),
});

export const {
    useFetchInboxQuery,
    useFetchMessagesQuery,
    useSendMessageMutation,
    useFetchUnreadCountQuery,
} = messageApiSlice;