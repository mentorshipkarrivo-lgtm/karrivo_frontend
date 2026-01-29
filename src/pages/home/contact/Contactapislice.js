// pages/contact/contactApiSlice.js
import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 📧 Submit contact form
    submitContactForm: builder.mutation({
      query: (contactData) => ({
        url: `/contact/req-submit`,
        method: "POST",
        body: contactData,
      }),
      // Invalidate cache if you have a contact list to refresh
      invalidatesTags: ["Contacts"],
      // Transform response
      transformResponse: (response) => {
        console.log('✅ Contact Form Response:', response);
        return response;
      },
      // Handle errors gracefully
      transformErrorResponse: (error) => {
        console.error('❌ Contact Form Error:', error);
        return {
          success: false,
          message: error?.data?.message || 'Failed to submit form. Please try again.',
          error: error
        };
      }
    }),

    // 📋 Get all contact submissions (Admin only)
    getAllContacts: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/contact/all`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: ["Contacts"],
      transformResponse: (response) => {
        return {
          contacts: Array.isArray(response.data) ? response.data : [],
          total: response.total || 0,
          page: response.page || 1,
          totalPages: response.totalPages || 1
        };
      },
    }),

    // 👁️ Get contact by ID (Admin only)
    getContactById: builder.query({
      query: (contactId) => ({
        url: `/contact/${contactId}`,
        method: "GET",
      }),
      providesTags: (result, error, contactId) => [
        { type: "Contacts", id: contactId }
      ],
    }),

    // 🗑️ Delete contact submission (Admin only)
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/contact/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),

    // ✏️ Update contact status (Admin only - mark as read/resolved)
    updateContactStatus: builder.mutation({
      query: ({ contactId, status }) => ({
        url: `/contact/${contactId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { contactId }) => [
        { type: "Contacts", id: contactId },
        "Contacts"
      ],
    }),

  }),
});

// Export hooks for usage in components
export const {
  useSubmitContactFormMutation,      // Submit contact form
  useGetAllContactsQuery,            // Get all contacts (Admin)
  useGetContactByIdQuery,            // Get single contact (Admin)
  useDeleteContactMutation,          // Delete contact (Admin)
  useUpdateContactStatusMutation,    // Update status (Admin)
} = contactApiSlice;