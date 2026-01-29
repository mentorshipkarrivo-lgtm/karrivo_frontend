import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: (data) => ({
        url: `/mentee/addTransaction`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddTransactionMutation,
} = walletApiSlice;
