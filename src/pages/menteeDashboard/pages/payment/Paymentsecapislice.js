import {apiSlice}  from "../../../../ApiSliceComponent/karrivoApi"

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ── POST /payments/submit ──
    submitPayment: builder.mutation({
      query: (body) => ({
        url: "/payments/submit",
        method: "POST",
        body,
      }),
    }),

  }),
});

export const { useSubmitPaymentMutation } = paymentApiSlice;