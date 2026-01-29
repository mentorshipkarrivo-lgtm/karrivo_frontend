// src/features/dashboard/dashboardApiSlice.js

import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenteeDashboard: builder.query({
            query: (userId) => ({
                url: `mentee/dashboard/details/${userId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: (result, error, userId) => [
                { type: "Dashboard", id: userId }
            ],
        }),
    }),
});

export const { useGetMenteeDashboardQuery } = dashboardApiSlice;