import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const userEarningApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getActivePaymentGateway: builder.query({
      query: () => ({
        url: '/user/get-active-paymentgateway',
        method: "GET",
      }),
    }),
  }),
});

export const { useGetActivePaymentGatewayQuery } = userEarningApiSlice;