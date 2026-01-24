// import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

// export const menteeApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({

//         getMentorDetails: builder.mutation({
//             query: (email) => ({
//                 url: "/Mentor/get-mentor-details",
//                 method: "POST",
//                 body: { email },
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json",
//                 },
//             }),
//         }),
//         updateMentorDetails: builder.mutation({
//             query: (payload) => ({  // ✅ Accept full payload without destructuring
//                 url: "/Mentor/update-mentor-details",
//                 method: "PUT",
//                 body: payload,  // ✅ Send the entire payload as-is
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json",
//                 },
//             }),
//         }),

//     }),
// });

// export const {
//     useGetMentorDetailsMutation,
//     useUpdateMentorDetailsMutation,
// } = menteeApiSlice;





import { apiSlice } from "../../../ApiSliceComponent/karrivoApi";

export const menteeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMentorDetails: builder.mutation({
            query: (email) => ({
                url: "/Mentor/get-mentor-details",
                method: "POST",
                body: { email },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            providesTags: ['MentorDetails'],  // ✅ Add cache tag
        }),

        updateMentorDetails: builder.mutation({
            query: (payload) => ({  // ✅ Changed from destructuring to full payload
                url: "/Mentor/update-mentor-details",
                method: "PUT",
                body: payload,  // ✅ Send entire payload
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['MentorDetails'],  // ✅ Invalidate cache after update
        }),

    }),
});

export const {
    useGetMentorDetailsMutation,
    useUpdateMentorDetailsMutation,
} = menteeApiSlice;


