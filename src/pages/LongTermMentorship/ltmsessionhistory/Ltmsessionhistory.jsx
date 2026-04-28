

// import React, { useState } from "react";
// import {
//   Trophy,
//   Layers,
//   CheckSquare,
//   Star,
//   MessageSquareQuote,
//   Search,
//   ExternalLink,
//   CalendarDays,
//   ClipboardList,
//   BookOpen,
//   AlertCircle,
//   Hash,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { useGetCompletedSessionsQuery } from "./ltmsessionhistoryapislice";

// /* ─── Helpers ─────────────────────────────────────────── */
// const fmtDate = (s) =>
//   s
//     ? new Date(s).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     })
//     : "—";

// const StarRow = ({ value = 0 }) => (
//   <div className="flex items-center gap-0.5">
//     {Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         size={12}
//         style={{
//           color: i < value ? "#f59e0b" : "#cbd5e1",
//           fill: i < value ? "#f59e0b" : "none",
//         }}
//       />
//     ))}
//     <span className="ml-1 text-xs font-semibold" style={{ color: "#2563eb" }}>
//       {value}/5
//     </span>
//   </div>
// );

// /* ─── Stat Card ───────────────────────────────────────── */
// const StatCard = ({ icon, label, value }) => (
//   <div
//     className="bg-white rounded-xl p-4 flex items-center gap-3"
//     style={{ border: "1.5px solid #dbeafe" }}
//   >
//     <div
//       className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
//       style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}
//     >
//       {icon}
//     </div>
//     <div>
//       <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1e293b" }}>
//         {label}
//       </p>
//       <p className="text-2xl font-bold leading-none mt-0.5" style={{ color: "#1e293b" }}>
//         {value}
//       </p>
//     </div>
//   </div>
// );

// /* ─── Skeleton ────────────────────────────────────────── */
// const SkeletonCard = () => (
//   <div className="bg-white rounded-xl p-4 space-y-3" style={{ border: "1.5px solid #dbeafe" }}>
//     <div className="h-5 rounded animate-pulse" style={{ background: "#eff6ff", width: "60%" }} />
//     <div className="h-4 rounded animate-pulse" style={{ background: "#eff6ff", width: "45%" }} />
//     <div className="h-4 rounded animate-pulse" style={{ background: "#eff6ff", width: "70%" }} />
//   </div>
// );

// /* ─── Empty ───────────────────────────────────────────── */
// const EmptyState = () => (
//   <div className="bg-white rounded-xl py-16 flex flex-col items-center gap-3"
//     style={{ border: "1.5px solid #dbeafe" }}>
//     <div className="w-14 h-14 rounded-xl flex items-center justify-center"
//       style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
//       <Trophy size={26} style={{ color: "#2563eb" }} />
//     </div>
//     <p className="text-base font-bold" style={{ color: "#1e3a8a" }}>No completed sessions yet</p>
//     <p className="text-sm" style={{ color: "#64748b" }}>Your completed LTM sessions will appear here.</p>
//   </div>
// );

// /* ─── Error ───────────────────────────────────────────── */
// const ErrorState = () => (
//   <div className="bg-white rounded-xl py-12 flex flex-col items-center gap-3"
//     style={{ border: "1.5px solid #fecaca" }}>
//     <AlertCircle size={30} style={{ color: "#ef4444" }} />
//     <p className="text-base font-bold" style={{ color: "#1e3a8a" }}>Failed to load sessions</p>
//     <p className="text-sm" style={{ color: "#64748b" }}>Please refresh and try again.</p>
//   </div>
// );

// /* ─── Mobile Card ─────────────────────────────────────── */
// const MobileCard = ({ session, index }) => {
//   const [open, setOpen] = useState(false);
//   const {
//     session_number, session_title, session_date,
//     task_completed, mentee_rating, meeting_link,
//     meeting_description, tasks_given, mentor_feedback,
//     mentee_feedback,
//   } = session;

//   return (
//     <div
//       className="bg-white rounded-xl overflow-hidden"
//       style={{ border: "1.5px solid #dbeafe" }}
//     >
//       {/* Blue top stripe */}
//       <div className="h-1 w-full" style={{ background: "#2563eb" }} />

//       {/* Tap header */}
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 transition-colors"
//         style={{ background: open ? "#eff6ff" : "white" }}
//       >
//         <div className="flex items-center gap-3 min-w-0">
//           {/* # badge */}
//           <div
//             className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//             style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}
//           >
//             <span className="font-bold text-sm font-mono" style={{ color: "#2563eb" }}>
//               {String(session_number).padStart(2, "0")}
//             </span>
//           </div>
//           <div className="min-w-0">
//             <p className="font-bold text-sm truncate" style={{ color: "#1e3a8a" }}>
//               {session_title || "Untitled Session"}
//             </p>
//             <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "#64748b" }}>
//               <CalendarDays size={10} style={{ color: "#93c5fd" }} />
//               {fmtDate(session_date)}
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
//           <StarRow value={mentee_rating ?? 0} />
//           <span
//             className="text-xs font-semibold px-2 py-0.5 rounded-full"
//             style={
//               task_completed
//                 ? { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }
//                 : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
//             }
//           >
//             {task_completed ? "Task Done" : "Pending"}
//           </span>
//           {open ? (
//             <ChevronUp size={14} style={{ color: "#93c5fd" }} />
//           ) : (
//             <ChevronDown size={14} style={{ color: "#93c5fd" }} />
//           )}
//         </div>
//       </button>


//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */
// export default function LtmsessionsCompleted() {
//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const menteeId = userData?._id;

//   const { data, isLoading, isError } = useGetCompletedSessionsQuery(menteeId, {
//     skip: !menteeId,
//   });

//   const sessions = data?.data || data || [];

//   const [search, setSearch] = useState("");
//   const [filterTask, setFilterTask] = useState("all");
//   const [sortBy, setSortBy] = useState("date_desc");
//   const [perPage, setPerPage] = useState(10);

//   const filtered = sessions
//     .filter((s) => {
//       const q = search.toLowerCase();
//       const matchSearch =
//         !q ||
//         s.session_title?.toLowerCase().includes(q) ||
//         String(s.session_number).includes(q);
//       const matchTask =
//         filterTask === "all" ? true
//           : filterTask === "done" ? s.task_completed === true
//             : s.task_completed !== true;
//       return matchSearch && matchTask;
//     })
//     .sort((a, b) => {
//       if (sortBy === "date_desc") return new Date(b.session_date || b.createdAt) - new Date(a.session_date || a.createdAt);
//       if (sortBy === "date_asc") return new Date(a.session_date || a.createdAt) - new Date(b.session_date || b.createdAt);
//       if (sortBy === "rating_desc") return (b.mentee_rating ?? 0) - (a.mentee_rating ?? 0);
//       if (sortBy === "number_asc") return a.session_number - b.session_number;
//       return 0;
//     })
//     .slice(0, perPage);

//   const total = sessions.length;
//   const tasksDone = sessions.filter((s) => s.task_completed).length;
//   const avgRating =
//     total > 0
//       ? (sessions.reduce((s, r) => s + (r.mentee_rating ?? 0), 0) / total).toFixed(1)
//       : "0";
//   const withFb = sessions.filter((s) => s.mentee_feedback?.trim()).length;

//   /* shared select style */
//   const sel = {
//     background: "white",
//     border: "1.5px solid #dbeafe",
//     color: "#1e3a8a",
//     borderRadius: 8,
//     padding: "7px 28px 7px 11px",
//     fontSize: 12,
//     fontWeight: 500,
//     outline: "none",
//     cursor: "pointer",
//     WebkitAppearance: "none",
//     appearance: "none",
//   };

//   const COLS = [
//     "S.No", "Session", "Date", "Description",
//     "Tasks Given", "Task Status", "Rating", "Feedback",
//   ];

//   return (
//     <div className="min-h-screen p-4 sm:p-6" style={{ background: "#f8fafc" }}>

//       {/* ── Stat cards ── */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
//         <StatCard
//           icon={<Layers size={18} style={{ color: "#1e293b" }} />}
//           label="Total Sessions"
//           value={total}
//         />
//         <StatCard
//           icon={<CheckSquare size={18} style={{ color: "#1e293b" }} />}
//           label="Tasks Completed"
//           value={`${tasksDone}/${total}`}
//         />
//         {/* <StatCard
//           icon={<Star size={18} style={{ color: "#2563eb", fill: "#2563eb" }} />}
//           label="Avg. Rating"
//           value={avgRating}
//         />
//         <StatCard
//           icon={<MessageSquareQuote size={18} style={{ color: "#2563eb" }} />}
//           label="Feedback Given"
//           value={withFb}
//         /> */}
//       </div>

//       {/* ── Panel ── */}
//       <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1.5px solid #dbeafe" }}>

//         {/* Panel title */}
//         <div className="px-5 py-4" style={{ borderBottom: "1px solid #dbeafe" }}>
//           <h2 className="text-base font-bold" style={{ color: "#1e293b" }}>
//             Completed Sessions
//           </h2>
//         </div>

//         {/* Toolbar */}
//         <div
//           className="px-5 py-3 flex flex-wrap items-center justify-between gap-3"
//           style={{ borderBottom: "1px solid #dbeafe", background: "#f8fafc" }}
//         >
//           {/* Per page */}
//           <div className="relative">
//             <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} style={sel}>
//               {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
//             </select>
//             <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
//               style={{ color: "#2563eb" }} />
//           </div>

//           {/* Right filters */}
//           <div className="flex flex-wrap items-center gap-2">
//             <div className="relative">
//               <select value={filterTask} onChange={(e) => setFilterTask(e.target.value)} style={sel}>
//                 <option value="all">All Tasks</option>
//                 <option value="done">Task Done</option>
//                 <option value="pending">Task Pending</option>
//               </select>
//               <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
//                 style={{ color: "#2563eb" }} />
//             </div>

//             <div className="relative">
//               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={sel}>
//                 <option value="date_desc">Newest First</option>
//                 <option value="date_asc">Oldest First</option>
//                 <option value="rating_desc">Highest Rated</option>
//                 {/* <option value="number_asc">Session #</option> */}
//               </select>
//               <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
//                 style={{ color: "#2563eb" }} />
//             </div>

//             <div className="relative">
//               <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
//                 style={{ color: "#93c5fd" }} />
//               <input
//                 type="text"
//                 placeholder="Search session..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="rounded-lg pl-8 pr-3 py-2 text-xs outline-none w-40 sm:w-48 transition-all"
//                 style={{
//                   background: "white",
//                   border: "1.5px solid #dbeafe",
//                   color: "#1e3a8a",
//                 }}
//                 onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                 onBlur={(e) => (e.target.style.borderColor = "#dbeafe")}
//               />
//             </div>
//           </div>
//         </div>

//         {/* ══ DESKTOP TABLE ══ */}
//         <div className="hidden md:block overflow-x-auto">
//           {isLoading ? (
//             <table className="w-full">
//               <thead>
//                 <tr style={{ background: "#3b82f6" }}>
//                   {COLS.map((c) => (
//                     <th key={c} className="px-4 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">
//                       {c}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {[1, 2, 3].map((i) => (
//                   <tr key={i} style={{ borderBottom: "1px solid #dbeafe" }}>
//                     {COLS.map((c) => (
//                       <td key={c} className="px-4 py-3">
//                         <div className="h-4 rounded animate-pulse" style={{ background: "#eff6ff" }} />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : isError ? (
//             <div className="p-6"><ErrorState /></div>
//           ) : filtered.length === 0 ? (
//             <div className="p-6">
//               {sessions.length === 0 ? <EmptyState /> : (
//                 <div className="text-center py-10">
//                   <Hash size={28} className="mx-auto mb-2" style={{ color: "#bfdbfe" }} />
//                   <p className="text-sm" style={{ color: "#64748b" }}>No sessions match the current filter.</p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <table className="w-full">
//               <thead>
//                 <tr style={{ background: "#2563eb" }}>
//                   {COLS.map((c) => (
//                     <th key={c} className="px-4 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">
//                       {c}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((s, i) => (
//                   <tr
//                     key={s._id}
//                     style={{ borderBottom: "1px solid #dbeafe" }}
//                     className="transition-colors"
//                     onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
//                     onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//                   >
//                     {/* S.No */}
//                     <td className="px-4 py-3 text-xs font-mono font-semibold" style={{ color: "#93c5fd" }}>
//                       {i + 1}
//                     </td>

//                     {/* Session */}
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">

//                         <span className="text-sm font-semibold whitespace-nowrap max-w-[130px] truncate"
//                           style={{ color: "#1e293b" }}>
//                           {s.session_title || "Untitled"}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Date */}
//                     <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: "#475569" }}>
//                       {fmtDate(s.session_date)}
//                     </td>

//                     {/* Description */}
//                     <td className="px-4 py-3 text-xs max-w-[150px]" style={{ color: "#475569" }}>
//                       <span className="line-clamp-2 leading-relaxed">
//                         {s.meeting_description || <span style={{ color: "#cbd5e1" }}>—</span>}
//                       </span>
//                     </td>

//                     {/* Tasks Given */}
//                     <td className="px-4 py-3 text-xs max-w-[130px]" style={{ color: "#475569" }}>
//                       <span className="line-clamp-2 leading-relaxed">
//                         {s.tasks_given || <span style={{ color: "#cbd5e1" }}>—</span>}
//                       </span>
//                     </td>

//                     {/* Task Status */}
//                     <td className="px-4 py-3">
//                       <span
//                         className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
//                         style={
//                           s.task_completed
//                             ? { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }
//                             : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
//                         }
//                       >
//                         {s.task_completed ? (
//                           <CheckCircle2 size={11} />
//                         ) : (
//                           <XCircle size={11} />
//                         )}
//                         {s.task_completed ? "Done" : "Pending"}
//                       </span>
//                     </td>

//                     {/* Rating */}
//                     <td className="px-4 py-3">
//                       <StarRow value={s.mentee_rating ?? 0} />
//                     </td>

//                     {/* Feedback */}
//                     <td className="px-4 py-3 text-xs max-w-[140px]" style={{ color: "#475569" }}>
//                       <span className="line-clamp-2 leading-relaxed">
//                         {s.mentee_feedback || (
//                           <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>No feedback</span>
//                         )}
//                       </span>
//                     </td>

//                     {/* Meeting */}
//                     {/* <td className="px-4 py-3">
//                       {s.meeting_link ? (
//                         <a
//                           href={s.meeting_link}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-2.5 py-1.5 transition-opacity hover:opacity-75"
//                           style={{
//                             background: "#eff6ff",
//                             border: "1.5px solid #bfdbfe",
//                             color: "#2563eb",
//                           }}
//                         >
//                           <ExternalLink size={11} />
//                           Open
//                         </a>
//                       ) : (
//                         <span style={{ color: "#cbd5e1", fontSize: 12 }}>—</span>
//                       )}
//                     </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* ══ MOBILE / TABLET CARDS ══ */}
//         <div className="md:hidden p-4">
//           {isLoading ? (
//             <div className="space-y-3">
//               {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
//             </div>
//           ) : isError ? (
//             <ErrorState />
//           ) : filtered.length === 0 ? (
//             sessions.length === 0 ? <EmptyState /> : (
//               <div className="text-center py-10">
//                 <Hash size={28} className="mx-auto mb-2" style={{ color: "#bfdbfe" }} />
//                 <p className="text-sm" style={{ color: "#64748b" }}>No sessions match the filter.</p>
//               </div>
//             )
//           ) : (
//             <div className="space-y-3">
//               {filtered.map((session, i) => (
//                 <MobileCard key={session._id} session={session} index={i} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer count */}
//         {!isLoading && !isError && filtered.length > 0 && (
//           <div
//             className="px-5 py-3 flex items-center justify-between"
//             style={{ borderTop: "1px solid #dbeafe", background: "#f8fafc" }}
//           >
//             <p className="text-xs font-mono" style={{ color: "#94a3b8" }}>
//               Showing {filtered.length} of {sessions.length} session{sessions.length !== 1 ? "s" : ""}
//             </p>
//             {/* <div className="flex items-center gap-1.5">
//               <div className="w-2 h-2 rounded-full" style={{ background: "#2563eb" }} />
//               <span className="text-xs font-semibold" style={{ color: "#93c5fd" }}>All Completed</span>
//             </div> */}
//           </div>
//         )}
//       </div>
//     </div>

//   );
// }



import React, { useState } from "react";
import {
  Trophy, Layers, CheckSquare, Star, Search,
  CalendarDays, Hash, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, AlertCircle,
} from "lucide-react";
import { useGetCompletedSessionsQuery } from "./ltmsessionhistoryapislice";

const fmtDate = (s) =>
  s ? new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const StarRow = ({ value = 0 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={11} style={{ color: i < value ? "#f59e0b" : "#cbd5e1", fill: i < value ? "#f59e0b" : "none" }} />
    ))}
    <span className="ml-1 text-xs font-semibold" style={{ color: "#0098cc" }}>{value}/5</span>
  </div>
);

/* ══════════════════════════════════════════
   MOBILE CARD
══════════════════════════════════════════ */
const MobileCard = ({ session }) => {
  const [open, setOpen] = useState(false);
  const {
    session_number, session_title, session_date,
    task_completed, mentee_rating,
    meeting_description, tasks_given, mentee_feedback,
  } = session;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#0098cc]/20">
      <div className="h-0.5 w-full" style={{ background: "#0098cc" }} />

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 transition-colors"
        style={{ background: open ? "rgba(0,152,204,0.06)" : "white" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#0098cc]/20"
            style={{ background: "rgba(0,152,204,0.08)" }}>
            <span className="font-bold text-sm font-mono" style={{ color: "#0098cc" }}>
              {String(session_number).padStart(2, "0")}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate" style={{ color: "#1a1a2e" }}>{session_title || "Untitled Session"}</p>
            <p className="text-xs mt-0.5 flex items-center gap-1 text-slate-500">
              <CalendarDays size={10} style={{ color: "#0098cc" }} />
              {fmtDate(session_date)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <StarRow value={mentee_rating ?? 0} />
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={
              task_completed
                ? { background: "rgba(0,152,204,0.08)", color: "#0098cc", border: "1px solid rgba(0,152,204,0.25)" }
                : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
            }
          >
            {task_completed ? "Task Done" : "Pending"}
          </span>
          {open
            ? <ChevronUp size={14} style={{ color: "#0098cc" }} />
            : <ChevronDown size={14} style={{ color: "#0098cc" }} />
          }
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100">
          {meeting_description && (
            <div className="pt-3">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#0098cc" }}>Description</p>
              <p className="text-xs leading-relaxed" style={{ color: "#1a1a2e" }}>{meeting_description}</p>
            </div>
          )}
          {tasks_given && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#0098cc" }}>Tasks Given</p>
              <p className="text-xs leading-relaxed" style={{ color: "#1a1a2e" }}>{tasks_given}</p>
            </div>
          )}
          {mentee_feedback && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#0098cc" }}>Your Feedback</p>
              <p className="text-xs leading-relaxed" style={{ color: "#1a1a2e" }}>{mentee_feedback}</p>
            </div>
          )}
          {!meeting_description && !tasks_given && !mentee_feedback && (
            <p className="pt-3 text-xs text-slate-400">No additional details available.</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function LtmsessionsCompleted() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const menteeId = userData?._id;

  const { data, isLoading, isError } = useGetCompletedSessionsQuery(menteeId, { skip: !menteeId });
  const sessions = data?.data || data || [];

  const [search, setSearch] = useState("");
  const [filterTask, setFilterTask] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [perPage, setPerPage] = useState(10);

  const filtered = sessions
    .filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.session_title?.toLowerCase().includes(q) || String(s.session_number).includes(q);
      const matchTask =
        filterTask === "all" ? true
          : filterTask === "done" ? s.task_completed === true
            : s.task_completed !== true;
      return matchSearch && matchTask;
    })
    .sort((a, b) => {
      if (sortBy === "date_desc") return new Date(b.session_date || b.createdAt) - new Date(a.session_date || a.createdAt);
      if (sortBy === "date_asc") return new Date(a.session_date || a.createdAt) - new Date(b.session_date || b.createdAt);
      if (sortBy === "rating_desc") return (b.mentee_rating ?? 0) - (a.mentee_rating ?? 0);
      if (sortBy === "number_asc") return a.session_number - b.session_number;
      return 0;
    })
    .slice(0, perPage);

  const total = sessions.length;
  const tasksDone = sessions.filter((s) => s.task_completed).length;

  const COLS = ["S.No", "Session", "Date", "Description", "Tasks Given", "Task Status", "Rating", "Feedback"];

  const selStyle = {
    background: "white",
    border: "1px solid rgba(0,152,204,0.3)",
    color: "#1a1a2e",
    borderRadius: 8,
    padding: "7px 28px 7px 11px",
    fontSize: 12,
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-slate-50">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm">
        <div className="bg-white rounded-xl p-4 flex items-center gap-3 border border-[#0098cc]/20">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#0098cc]/20"
            style={{ background: "rgba(0,152,204,0.08)" }}>
            <Layers size={18} style={{ color: "#1a1a2e" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#1a1a2e" }}>Total Sessions</p>
            <p className="text-2xl font-bold leading-none mt-0.5" style={{ color: "#1a1a2e" }}>{total}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 flex items-center gap-3 border border-[#0098cc]/20">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#0098cc]/20"
            style={{ background: "rgba(0,152,204,0.08)" }}>
            <CheckSquare size={18} style={{ color: "#1a1a2e" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#1a1a2e" }}>Tasks Done</p>
            <p className="text-2xl font-bold leading-none mt-0.5" style={{ color: "#1a1a2e" }}>{tasksDone}/{total}</p>
          </div>
        </div>
      </div>

      {/* ── Main Panel ── */}
      <div className="bg-white rounded-2xl overflow-hidden border border-[#0098cc]/20">

        {/* Panel Header */}
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold" style={{ color: "#1a1a2e" }}>Completed Sessions</h2>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border-b border-slate-100">
          <div className="relative">
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} style={selStyle}>
              {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n} rows</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select value={filterTask} onChange={(e) => setFilterTask(e.target.value)} style={selStyle}>
                <option value="all">All Tasks</option>
                <option value="done">Task Done</option>
                <option value="pending">Task Pending</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
            </div>

            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selStyle}>
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="rating_desc">Highest Rated</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
            </div>

            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
              <input
                type="text"
                placeholder="Search session..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg pl-8 pr-3 py-2 text-xs outline-none w-40 sm:w-48 bg-white placeholder:text-slate-400"
                style={{ border: "1px solid rgba(0,152,204,0.3)", color: "#1a1a2e" }}
                onFocus={(e) => (e.target.style.borderColor = "#0098cc")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,152,204,0.3)")}
              />
            </div>
          </div>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden md:block overflow-x-auto">
          {isLoading ? (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#0098cc" }}>
                  {COLS.map((c) => (
                    <th key={c} className="px-4 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {COLS.map((c) => (
                      <td key={c} className="px-4 py-3">
                        <div className="h-4 rounded animate-pulse bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isError ? (
            <div className="p-10 flex flex-col items-center gap-3">
              <AlertCircle size={30} className="text-red-400" />
              <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>Failed to load sessions</p>
              <p className="text-xs text-slate-400">Please refresh and try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 flex flex-col items-center gap-3">
              {sessions.length === 0 ? (
                <>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-[#0098cc]/20"
                    style={{ background: "rgba(0,152,204,0.08)" }}>
                    <Trophy size={26} style={{ color: "#0098cc" }} />
                  </div>
                  <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>No completed sessions yet</p>
                  <p className="text-xs text-slate-400">Your completed LTM sessions will appear here.</p>
                </>
              ) : (
                <>
                  <Hash size={28} className="text-slate-300" />
                  <p className="text-xs text-slate-400">No sessions match the current filter.</p>
                </>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#0098cc" }}>
                  {COLS.map((c) => (
                    <th key={c} className="px-4 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s._id}
                    className="border-b border-slate-100 transition-colors bg-white cursor-default"
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,152,204,0.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    {/* S.No */}
                    <td className="px-4 py-3 text-xs font-mono font-semibold" style={{ color: "#0098cc" }}>{i + 1}</td>

                    {/* Session */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold whitespace-nowrap max-w-[130px] truncate block" style={{ color: "#1a1a2e" }}>
                        {s.session_title || "Untitled"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: "#1a1a2e" }}>
                      {fmtDate(s.session_date)}
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3 text-xs max-w-[150px] text-slate-500">
                      <span className="line-clamp-2 leading-relaxed">
                        {s.meeting_description || <span className="text-slate-300">—</span>}
                      </span>
                    </td>

                    {/* Tasks Given */}
                    <td className="px-4 py-3 text-xs max-w-[130px] text-slate-500">
                      <span className="line-clamp-2 leading-relaxed">
                        {s.tasks_given || <span className="text-slate-300">—</span>}
                      </span>
                    </td>

                    {/* Task Status */}
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={
                          s.task_completed
                            ? { background: "rgba(0,152,204,0.08)", color: "#0098cc", border: "1px solid rgba(0,152,204,0.25)" }
                            : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
                        }
                      >
                        {s.task_completed ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                        {s.task_completed ? "Done" : "Pending"}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-3"><StarRow value={s.mentee_rating ?? 0} /></td>

                    {/* Feedback */}
                    <td className="px-4 py-3 text-xs max-w-[140px] text-slate-500">
                      <span className="line-clamp-2 leading-relaxed">
                        {s.mentee_feedback || <span className="text-slate-300 italic">No feedback</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Mobile Cards ── */}
        <div className="md:hidden p-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 space-y-3 border border-[#0098cc]/20">
                  <div className="h-5 rounded animate-pulse bg-slate-100 w-3/5" />
                  <div className="h-4 rounded animate-pulse bg-slate-100 w-2/5" />
                  <div className="h-4 rounded animate-pulse bg-slate-100 w-4/5" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <AlertCircle size={30} className="text-red-400" />
              <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>Failed to load sessions</p>
              <p className="text-xs text-slate-400">Please refresh and try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            sessions.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-[#0098cc]/20"
                  style={{ background: "rgba(0,152,204,0.08)" }}>
                  <Trophy size={26} style={{ color: "#0098cc" }} />
                </div>
                <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>No completed sessions yet</p>
                <p className="text-xs text-slate-400">Your completed LTM sessions will appear here.</p>
              </div>
            ) : (
              <div className="text-center py-10">
                <Hash size={28} className="mx-auto mb-2 text-slate-300" />
                <p className="text-xs text-slate-400">No sessions match the filter.</p>
              </div>
            )
          ) : (
            <div className="space-y-3">
              {filtered.map((session) => (
                <MobileCard key={session._id} session={session} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="px-5 py-3 flex items-center justify-between border-t border-slate-100 bg-slate-50">
            <p className="text-xs font-mono text-slate-400">
              Showing {filtered.length} of {sessions.length} session{sessions.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}





