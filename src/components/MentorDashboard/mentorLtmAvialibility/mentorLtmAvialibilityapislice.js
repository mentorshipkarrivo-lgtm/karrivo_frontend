// mentorLtmAvialibilityapislice.js
import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const mentorAvailabilityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ── Get LTM Availability ──────────────────────────────────────────────
    getMentorAvailability: builder.query({
      query: (mentorId) => ({
        url: `/ltmMentorAvialabilty/mentor/ltm-availability/${mentorId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["MentorAvailability"],
    }),

    // ── Upsert LTM Availability ───────────────────────────────────────────
    upsertMentorAvailability: builder.mutation({
      query: (payload) => ({
        url: "/ltmMentorAvialabilty/mentor/ltm-availability",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MentorAvailability"],
    }),

    // ── Get Unavailability list ───────────────────────────────────────────
    getMentorUnavailability: builder.query({
      query: (mentorId) => ({
        url: `/ltmMentorAvialabilty/mentor/unavailability/${mentorId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["MentorUnavailability"],
    }),

    // ── Add Unavailability ────────────────────────────────────────────────
    addMentorUnavailability: builder.mutation({
      query: (payload) => ({
        url: "/ltmMentorAvialabilty/mentor/unavailability",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MentorUnavailability"],
    }),

    // ── Delete Unavailability by mentorId + unavailId ─────────────────────
    // Route: DELETE /mentor/unavailability/:mentorId/:unavailId
    deleteMentorUnavailability: builder.mutation({
      query: ({ mentor_Id, unavailId }) => ({
        url: `/ltmMentorAvialabilty/mentor/unavailability/${mentor_Id}/${unavailId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MentorUnavailability"],
    }),
  }),
});

export const {
  useGetMentorAvailabilityQuery,
  useUpsertMentorAvailabilityMutation,
  useGetMentorUnavailabilityQuery,
  useAddMentorUnavailabilityMutation,
  useDeleteMentorUnavailabilityMutation,
} = mentorAvailabilityApiSlice;