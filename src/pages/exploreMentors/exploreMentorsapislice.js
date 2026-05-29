
import { apiSlice } from "../../ApiSliceComponent/karrivoApi";

export const mentorshipHomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ FIX: Accept either queryString OR params object
    getLtmAllMentors: builder.query({
      query: (arg = {}) => {
        // Handle two input formats:
        // 1. queryString: "domain=Backend&userCategory=Working+Professional"
        // 2. params object: { domain: "Backend", userCategory: "Working Professional" }

        let queryString = "";

        if (typeof arg === "string") {
          // Already a query string
          queryString = arg;
        } else if (typeof arg === "object" && Object.keys(arg).length > 0) {
          // Convert object to query string
          const params = new URLSearchParams();
          
          if (arg.domain) {
            params.set("domain", arg.domain);
          }
          if (arg.userCategory) {
            params.set("userCategory", arg.userCategory);
          }
          
          queryString = params.toString();
        }

        const url = `/ltmAvailability/mentors${queryString ? `?${queryString}` : ""}`;
        
        console.log("🔗 API Request URL:", url);
        console.log("📊 Query String:", queryString);
        console.log("📥 Full Args:", arg);

        return {
          url,
          method: "GET",
        };
      },

      // ✅ Improved cache serialization to handle different query formats
      serializeQueryArgs: ({ queryArgs }) => {
        if (typeof queryArgs === "string") {
          return `mentors-query-${queryArgs}`;
        }
        
        const domain = queryArgs?.domain || "all";
        const category = queryArgs?.userCategory || "all";
        return `mentors-${domain}-${category}`;
      },

      providesTags: ["Mentors"],
    }),

    searchMentor: builder.mutation({
      query: (data) => ({
        url: "/ltmAvailability/mentors/search",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mentors"],
    }),

    advancedFilterMentors: builder.mutation({
      query: (data) => ({
        url: "/ltmAvailability/mentors/advanced-filter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mentors"],
    }),

  }),
});

export const {
  useGetLtmAllMentorsQuery,
  useSearchMentorMutation,
  useAdvancedFilterMentorsMutation,
} = mentorshipHomeApiSlice;

