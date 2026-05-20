// import React, { useState } from "react";
// import {
//   useGetSessionsByMentorQuery,
//   useGetSubscribersByMentorQuery,
// } from "./mysubcriberspislice";

// const STATUS_STYLES = {
//   pending: "text-cyan-600",
//   completed: "text-emerald-600",
//   cancelled: "text-red-500",
//   missed: "text-amber-600",
//   active: "text-emerald-600",
//   approved: "text-emerald-600",
//   onprocess: "text-blue-600",
// };

// const PLAN_LABELS = {
//   one_month: "1 Month",
//   three_months: "3 Months",
//   six_months: "6 Months",
// };

// const ShortId = ({ id }) => (
//   <span className="font-mono text-xs text-gray-500">
//     ...{id?.slice(-8)}
//   </span>
// );

// export default function MentorSessionsTable() {
//   const [activeTab, setActiveTab] = useState("sessions");

//   const mentorId = JSON.parse(
//     localStorage.getItem("userData") || "{}"
//   )?._id;

//   const { data: sessionsResult } =
//     useGetSessionsByMentorQuery(mentorId);

//   const { data: subscribersResult } =
//     useGetSubscribersByMentorQuery(mentorId);

//   const sessions = sessionsResult?.data || [];

//   const subscribers =
//     subscribersResult?.data ||
//     subscribersResult?.subscriptions ||
//     [];

//   return (
//     <div className="min-h-screen bg-white px-6 py-8 text-gray-700">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-xl md:text-2xl font-bold text-[#1a1a2e]">
//           Sessions Overview
//         </h1>

//         <p className="text-xs text-gray-500 mt-1">
//           {subscribers.length} subscribers · {sessions.length} sessions
//         </p>

//         {/* INLINE METRICS */}
//         <div className="flex flex-wrap gap-5 mt-3 text-xs text-gray-600">
//           <span>
//             Subscribers: {subscribers.length}
//           </span>

//           <span>
//             Completed:{" "}
//             {
//               sessions.filter(
//                 (s) => s.status === "completed"
//               ).length
//             }
//           </span>

//           <span>
//             Pending:{" "}
//             {
//               sessions.filter(
//                 (s) => s.status === "pending"
//               ).length
//             }
//           </span>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-6 border-b border-gray-200 mb-6 text-xs font-medium">
//         {["subscribers", "sessions"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-2 capitalize transition ${activeTab === tab
//                 ? "text-[#0098cc] border-b-2 border-[#0098cc]"
//                 : "text-gray-500"
//               }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* SUBSCRIBERS TABLE */}
//       {activeTab === "subscribers" && (
//         <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left border-b border-gray-200 bg-gray-50">
//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     #
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Mentee
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Plan
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Sessions
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Amount
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {subscribers.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="6"
//                       className="text-center py-14 text-sm text-gray-500"
//                     >
//                       No subscribers found
//                     </td>
//                   </tr>
//                 ) : (
//                   subscribers.map((sub, index) => (
//                     <tr
//                       key={sub._id}
//                       className="border-b border-gray-100 hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-xs">
//                         {index + 1}
//                       </td>

//                       <td className="px-6 py-4">
//                         <ShortId id={sub.mentee_id} />
//                       </td>

//                       <td className="px-6 py-4 text-xs font-medium text-[#0098cc]">
//                         {PLAN_LABELS[sub.plan_type] ||
//                           sub.plan_type}
//                       </td>

//                       <td className="px-6 py-4 text-xs">
//                         {sub.total_sessions}
//                       </td>

//                       <td className="px-6 py-4 text-xs font-medium text-emerald-600">
//                         ₹
//                         {sub.amount?.toLocaleString(
//                           "en-IN"
//                         )}
//                       </td>

//                       <td
//                         className={`px-6 py-4 text-xs font-medium ${STATUS_STYLES[sub.status] ||
//                           "text-gray-500"
//                           }`}
//                       >
//                         {sub.status || "pending"}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* SESSIONS TABLE */}
//       {activeTab === "sessions" && (
//         <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left border-b border-gray-200 bg-gray-50">
//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     #
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Subscription
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Type
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Total
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {sessions.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="text-center py-14 text-sm text-gray-500"
//                     >
//                       No sessions found
//                     </td>
//                   </tr>
//                 ) : (
//                   sessions.map((item, index) => (
//                     <tr
//                       key={item._id}
//                       className="border-b border-gray-100 hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-xs">
//                         {index + 1}
//                       </td>

//                       <td className="px-6 py-4">
//                         <ShortId
//                           id={item.subscription_id}
//                         />
//                       </td>

//                       <td className="px-6 py-4 text-xs">
//                         Session
//                       </td>

//                       <td className="px-6 py-4 text-xs">
//                         1
//                       </td>

//                       <td
//                         className={`px-6 py-4 text-xs font-medium ${STATUS_STYLES[item.status] ||
//                           "text-gray-500"
//                           }`}
//                       >
//                         {item.status || "pending"}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








import React, { useState } from "react";
import {
  useGetSessionsByMentorQuery,
  useGetSubscribersByMentorQuery,
} from "./mysubcriberspislice";

const STATUS_STYLES = {
  pending: "text-cyan-600",
  completed: "text-emerald-600",
  cancelled: "text-red-500",
  missed: "text-amber-600",
  active: "text-emerald-600",
  approved: "text-emerald-600",
  onprocess: "text-blue-600",
};

const PLAN_LABELS = {
  one_month: "1 Month",
  three_months: "3 Months",
  six_months: "6 Months",
};

const ShortId = ({ id }) => (
  <span className="font-mono text-xs text-gray-500">
    ...{id?.slice(-8)}
  </span>
);

export default function MentorSessionsTable() {
  const [activeTab, setActiveTab] = useState("sessions");

  const mentorId = JSON.parse(
    localStorage.getItem("userData") || "{}"
  )?._id;

  const { data: sessionsResult } =
    useGetSessionsByMentorQuery(mentorId);

  const { data: subscribersResult } =
    useGetSubscribersByMentorQuery(mentorId);

  const sessions = sessionsResult?.data || [];

  const subscribers =
    subscribersResult?.data ||
    subscribersResult?.subscriptions ||
    [];

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-gray-700">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#1a1a2e]">
          Sessions Overview
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          {subscribers.length} subscribers · {sessions.length} sessions
        </p>

        {/* INLINE METRICS */}
        <div className="flex flex-wrap gap-5 mt-3 text-xs text-gray-600">
          <span>
            Subscribers: {subscribers.length}
          </span>

          <span>
            Completed:{" "}
            {
              sessions.filter(
                (s) => s.status === "completed"
              ).length
            }
          </span>

          <span>
            Pending:{" "}
            {
              sessions.filter(
                (s) => s.status === "pending"
              ).length
            }
          </span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 text-xs font-medium">
        {["subscribers", "sessions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize transition ${activeTab === tab
                ? "text-[#0098cc] border-b-2 border-[#0098cc]"
                : "text-gray-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SUBSCRIBERS TABLE */}
      {activeTab === "subscribers" && (
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    #
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Mentee
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Plan
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Sessions
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Amount
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-14 text-sm text-gray-500"
                    >
                      No subscribers found
                    </td>
                  </tr>
                ) : (
                  subscribers.map((sub, index) => (
                    <tr
                      key={sub._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-xs">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <ShortId id={sub.mentee_id} />
                      </td>

                      <td className="px-6 py-4 text-xs font-medium text-[#0098cc]">
                        {PLAN_LABELS[sub.plan_type] ||
                          sub.plan_type}
                      </td>

                      <td className="px-6 py-4 text-xs">
                        {sub.total_sessions}
                      </td>

                      <td className="px-6 py-4 text-xs font-medium text-emerald-600">
                        ₹
                        {sub.amount?.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td
                        className={`px-6 py-4 text-xs font-medium ${STATUS_STYLES[sub.status] ||
                          "text-gray-500"
                          }`}
                      >
                        {sub.status || "pending"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SESSIONS TABLE */}
      {activeTab === "sessions" && (
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    #
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Subscription
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Type
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Total
                  </th>

                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-14 text-sm text-gray-500"
                    >
                      No sessions found
                    </td>
                  </tr>
                ) : (
                  sessions.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-xs">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <ShortId
                          id={item.subscription_id}
                        />
                      </td>

                      <td className="px-6 py-4 text-xs">
                        Session
                      </td>

                      <td className="px-6 py-4 text-xs">
                        1
                      </td>

                      <td
                        className={`px-6 py-4 text-xs font-medium ${STATUS_STYLES[item.status] ||
                          "text-gray-500"
                          }`}
                      >
                        {item.status || "pending"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}





