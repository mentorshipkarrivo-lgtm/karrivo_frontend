// src/features/dashboard/dashboardApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/karrivoApi";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMenteeDashboard: builder.query({
            query: (userId) => ({
                url: `/mentee/dashboard/mentee-details/${userId}`, // change endpoint if needed
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

            providesTags: (result, error, userId) => [
                { type: "Dashboard", id: userId },
            ],
        }),

    }),
});

export const { useGetMenteeDashboardQuery } = dashboardApiSlice;