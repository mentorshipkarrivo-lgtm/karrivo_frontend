// import React, { useState } from "react";
// import {
//   useGetSessionsByMentorQuery,
//   useGetSubscribersByMentorQuery,
//   useUpdateByMentorSessionMutation,
// } from "./mysubcriberspislice";

// const STATUS_STYLES = {
//   pending: "bg-cyan-50 text-cyan-600 border border-cyan-200",
//   completed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
//   cancelled: "bg-red-50 text-red-500 border border-red-200",
//   missed: "bg-amber-50 text-amber-600 border border-amber-200",
//   active: "bg-emerald-50 text-emerald-600 border border-emerald-200",
//   approved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
//   onprocess: "bg-blue-50 text-blue-600 border border-blue-200",
// };

// const PLAN_LABELS = {
//   one_month: "1 Month",
//   three_months: "3 Months",
//   six_months: "6 Months",
// };

// const formatDate = (iso) =>
//   iso
//     ? new Date(iso).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//     : "—";

// function StatusPill({ status }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
//         STATUS_STYLES[status] || STATUS_STYLES.pending
//       }`}
//     >
//       {status || "pending"}
//     </span>
//   );
// }

// function ShortId({ id }) {
//   return (
//     <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-mono border">
//       ...{id?.slice(-8)}
//     </span>
//   );
// }

// export default function MentorSessionsTable() {
//   const [activeTab, setActiveTab] = useState("sessions");
//   const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

//   const { data: sessionsResult, isLoading: sessionsLoading } =
//     useGetSessionsByMentorQuery(mentorId);

//   const { data: subscribersResult, isLoading: subscribersLoading } =
//     useGetSubscribersByMentorQuery(mentorId);

//   const [updateSession] = useUpdateByMentorSessionMutation();

//   const sessions = sessionsResult?.data || [];
//   const subscribers =
//     subscribersResult?.data || subscribersResult?.subscriptions || [];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
//         <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
//           Mentorship Portal
//         </p>

//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div>
//             <h1 className="text-3xl font-bold text-[#1a1a2e]">
//               Sessions Overview
//             </h1>
//             <p className="text-gray-500 mt-1">
//               {subscribers.length} subscribers · {sessions.length} total sessions
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             {[
//               ["Subscribers", subscribers.length],
//               [
//                 "Completed",
//                 sessions.filter((s) => s.status === "completed").length,
//               ],
//               [
//                 "Pending",
//                 sessions.filter((s) => s.status === "pending").length,
//               ],
//             ].map(([label, value]) => (
//               <div
//                 key={label}
//                 className="bg-white border border-gray-200 rounded-xl px-5 py-4 min-w-[120px]"
//               >
//                 <p className="text-2xl font-bold text-[#0098cc]">{value}</p>
//                 <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
//                   {label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-6 mt-6 border-b border-gray-200">
//           {["subscribers", "sessions"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-3 text-sm font-semibold capitalize border-b-2 transition ${
//                 activeTab === tab
//                   ? "text-[#0098cc] border-[#0098cc]"
//                   : "text-gray-500 border-transparent"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Subscribers */}
//       {activeTab === "subscribers" && (
//         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   {[
//                     "#",
//                     "Mentee",
//                     "Plan",
//                     "Sessions",
//                     "Amount",
//                     "Status",
//                   ].map((head) => (
//                     <th
//                       key={head}
//                       className="text-left px-5 py-4 text-xs uppercase tracking-wide text-gray-500"
//                     >
//                       {head}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {subscribers.map((sub, index) => (
//                   <tr
//                     key={sub._id}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="px-5 py-4 font-medium text-gray-500">
//                       {index + 1}
//                     </td>
//                     <td className="px-5 py-4">
//                       <ShortId id={sub.mentee_id} />
//                     </td>
//                     <td className="px-5 py-4 font-semibold text-[#0098cc]">
//                       {PLAN_LABELS[sub.plan_type] || sub.plan_type}
//                     </td>
//                     <td className="px-5 py-4">{sub.total_sessions}</td>
//                     <td className="px-5 py-4 font-semibold text-emerald-600">
//                       ₹{sub.amount?.toLocaleString("en-IN")}
//                     </td>
//                     <td className="px-5 py-4">
//                       <StatusPill status={sub.status} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Sessions */}
//       {activeTab === "sessions" && (
//         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   {["#", "Subscription", "Plan", "Total", "Status"].map(
//                     (head) => (
//                       <th
//                         key={head}
//                         className="text-left px-5 py-4 text-xs uppercase tracking-wide text-gray-500"
//                       >
//                         {head}
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>

//               <tbody>
//                 {sessions.map((item, index) => (
//                   <tr
//                     key={item._id}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="px-5 py-4">{index + 1}</td>
//                     <td className="px-5 py-4">
//                       <ShortId id={item.subscription_id} />
//                     </td>
//                     <td className="px-5 py-4 font-semibold text-[#0098cc]">
//                       Session
//                     </td>
//                     <td className="px-5 py-4">1</td>
//                     <td className="px-5 py-4">
//                       <StatusPill status={item.status} />
//                     </td>
//                   </tr>
//                 ))}
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
  useUpdateByMentorSessionMutation,
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
  <span className="font-mono text-gray-500">
    ...{id?.slice(-8)}
  </span>
);

export default function MentorSessionsTable() {
  const [activeTab, setActiveTab] = useState("sessions");
  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const { data: sessionsResult } = useGetSessionsByMentorQuery(mentorId);
  const { data: subscribersResult } = useGetSubscribersByMentorQuery(mentorId);

  const sessions = sessionsResult?.data || [];
  const subscribers =
    subscribersResult?.data || subscribersResult?.subscriptions || [];

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-gray-800">

      {/* HEADER */}
      <div className="mb-6">
    

        <h1 className="text-2xl font-bold mt-1">
          Sessions Overview
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {subscribers.length} subscribers · {sessions.length} sessions
        </p>

        {/* INLINE METRICS (PLAIN TEXT) */}
        <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">
          <span>Subscribers: {subscribers.length}</span>
          <span>
            Completed: {sessions.filter((s) => s.status === "completed").length}
          </span>
          <span>
            Pending: {sessions.filter((s) => s.status === "pending").length}
          </span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm">
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="py-3 font-medium">#</th>
                <th className="font-medium">Mentee</th>
                <th className="font-medium">Plan</th>
                <th className="font-medium">Sessions</th>
                <th className="font-medium">Amount</th>
                <th className="font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {subscribers.map((sub, index) => (
                <tr key={sub._id} className="border-b">
                  <td className="py-3">{index + 1}</td>

                  <td>
                    <ShortId id={sub.mentee_id} />
                  </td>

                  <td className="text-[#0098cc]">
                    {PLAN_LABELS[sub.plan_type] || sub.plan_type}
                  </td>

                  <td>{sub.total_sessions}</td>

                  <td className="text-emerald-600 font-medium">
                    ₹{sub.amount?.toLocaleString("en-IN")}
                  </td>

                  <td className={STATUS_STYLES[sub.status] || "text-gray-500"}>
                    {sub.status || "pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SESSIONS TABLE */}
      {activeTab === "sessions" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="py-3 font-medium">#</th>
                <th className="font-medium">Subscription</th>
                <th className="font-medium">Type</th>
                <th className="font-medium">Total</th>
                <th className="font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td className="py-3">{index + 1}</td>

                  <td>
                    <ShortId id={item.subscription_id} />
                  </td>

                  <td>Session</td>

                  <td>1</td>

                  <td className={STATUS_STYLES[item.status] || "text-gray-500"}>
                    {item.status || "pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}










