

// import React, { useState } from "react";
// import {
//   CheckCircle2,
//   Star,
//   Link2,
//   CalendarDays,
//   ClipboardList,
//   MessageSquareQuote,
//   BookOpen,
//   ChevronDown,
//   ChevronUp,
//   Hash,
//   Clock,
//   CheckSquare,
//   XSquare,
//   ExternalLink,
//   Trophy,
//   Layers,
//   AlertCircle,
// } from "lucide-react";
// import { useGetCompletedSessionsQuery } from "./ltmsessionhistoryapislice";

// /* ─── Font injection ─────────────────────────────────── */
// if (typeof document !== "undefined" && !document.getElementById("cs-font")) {
//   const l = document.createElement("link");
//   l.id = "cs-font";
//   l.rel = "stylesheet";
//   l.href =
//     "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
//   document.head.appendChild(l);
// }

// /* ─── Design tokens (same green palette) ─────────────── */
// const C = {
//   bg:         "#030f0a",
//   surface:    "#071a10",
//   surfaceAlt: "#0a2318",
//   surfaceHi:  "#0d2d1e",
//   border:     "#0f4028",
//   borderMid:  "#1a6040",
//   accent:     "#00c8a0",
//   accentDim:  "#007a62",
//   accentGlow: "rgba(0,200,160,0.18)",
//   accentSoft: "rgba(0,200,160,0.07)",
//   gold:       "#f0b429",
//   goldDim:    "#7a5c00",
//   goldSoft:   "rgba(240,180,41,0.09)",
//   red:        "#f05060",
//   redDim:     "#7a1d28",
//   redSoft:    "rgba(240,80,96,0.08)",
//   text:       "#e8fff8",
//   textMuted:  "#5a9e82",
//   textDim:    "#2a6648",
//   sans:       "'Syne', system-ui, sans-serif",
//   mono:       "'JetBrains Mono', monospace",
// };

// /* ─── Global CSS ─────────────────────────────────────── */
// const injectCSS = () => {
//   if (typeof document === "undefined" || document.getElementById("cs-css")) return;
//   const s = document.createElement("style");
//   s.id = "cs-css";
//   s.textContent = `
//     .cs-root *, .cs-root *::before, .cs-root *::after { box-sizing:border-box; margin:0; padding:0; }
//     .cs-root { font-family:${C.sans}; background:${C.bg}; color:${C.text}; min-height:100vh; }

//     /* scrollbar */
//     .cs-root::-webkit-scrollbar { width:4px; }
//     .cs-root::-webkit-scrollbar-track { background:transparent; }
//     .cs-root::-webkit-scrollbar-thumb { background:${C.border}; border-radius:99px; }

//     /* card */
//     .cs-card {
//       background:${C.surface};
//       border:1.5px solid ${C.border};
//       border-radius:16px;
//       overflow:hidden;
//       transition: border-color .2s, box-shadow .2s;
//     }
//     .cs-card:hover { border-color:${C.borderMid}; }

//     /* expand button */
//     .cs-expand-btn {
//       width:100%; background:none; border:none; cursor:pointer;
//       font-family:${C.sans}; display:flex; align-items:center;
//       justify-content:space-between; padding:20px 22px;
//       transition:background .15s;
//     }
//     .cs-expand-btn:hover { background:${C.surfaceAlt}; }

//     /* detail row */
//     .cs-detail-row {
//       display:flex; align-items:flex-start; gap:11px;
//       padding:12px 22px;
//       border-top:1px solid ${C.border};
//     }

//     /* star filled/empty */
//     .cs-star-filled { color:${C.gold}; fill:${C.gold}; }
//     .cs-star-empty  { color:${C.border}; }

//     /* link */
//     .cs-link {
//       display:inline-flex; align-items:center; gap:5px;
//       color:${C.accent}; font-size:12px; font-weight:600;
//       text-decoration:none; font-family:${C.mono};
//       transition:opacity .15s;
//     }
//     .cs-link:hover { opacity:.75; }

//     /* stat pill */
//     .cs-pill {
//       display:inline-flex; align-items:center; gap:5px;
//       border-radius:99px; padding:3px 10px;
//       font-size:11px; font-weight:700; white-space:nowrap;
//     }

//     /* animations */
//     @keyframes csFadeUp   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
//     @keyframes csSlideDown{ from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
//     @keyframes csSpin     { to{transform:rotate(360deg)} }
//     .cs-fadeup   { animation:csFadeUp   .32s ease both; }
//     .cs-slidedown{ animation:csSlideDown .22s ease both; }
//     .cs-spin     { animation:csSpin 1s linear infinite; }

//     /* skeleton */
//     @keyframes csShimmer {
//       0%   { background-position:-600px 0 }
//       100% { background-position:600px 0  }
//     }
//     .cs-skeleton {
//       background: linear-gradient(90deg, ${C.surface} 25%, ${C.surfaceAlt} 50%, ${C.surface} 75%);
//       background-size:600px 100%;
//       animation:csShimmer 1.4s infinite;
//       border-radius:8px;
//     }
//   `;
//   document.head.appendChild(s);
// };

// /* ─── Helpers ────────────────────────────────────────── */
// const fmtDate = (s) =>
//   s
//     ? new Date(s).toLocaleDateString("en-US", {
//         weekday: "short",
//         month:   "short",
//         day:     "numeric",
//         year:    "numeric",
//       })
//     : "—";

// const fmtTime = (s) =>
//   s
//     ? new Date(s).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
//     : "";

// const StarRating = ({ value = 0, max = 5 }) => (
//   <div style={{ display: "flex", gap: 3 }}>
//     {Array.from({ length: max }, (_, i) => (
//       <Star
//         key={i}
//         size={14}
//         className={i < value ? "cs-star-filled" : "cs-star-empty"}
//       />
//     ))}
//   </div>
// );

// const Pill = ({ children, color = C.accent, bg = C.accentSoft, border = C.accentDim }) => (
//   <span
//     className="cs-pill"
//     style={{ background: bg, border: `1px solid ${border}`, color }}
//   >
//     {children}
//   </span>
// );

// /* ─── Skeleton card ──────────────────────────────────── */
// const SkeletonCard = ({ delay = 0 }) => (
//   <div
//     className="cs-card cs-fadeup"
//     style={{ padding: 22, animationDelay: `${delay}ms` }}
//   >
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//       <div className="cs-skeleton" style={{ width: 160, height: 20 }} />
//       <div className="cs-skeleton" style={{ width: 80, height: 20 }} />
//     </div>
//     <div className="cs-skeleton" style={{ width: "70%", height: 14, marginBottom: 10 }} />
//     <div className="cs-skeleton" style={{ width: "45%", height: 14 }} />
//   </div>
// );

// /* ─── Session Card ───────────────────────────────────── */
// const SessionCard = ({ session, index }) => {
//   const [open, setOpen] = useState(false);

//   const {
//     session_number,
//     session_title,
//     meeting_link,
//     meeting_description,
//     tasks_given,
//     task_completed,
//     mentor_feedback,
//     mentee_feedback,
//     mentee_rating,
//     session_date,
//     createdAt,
//     updatedAt,
//   } = session;

//   const rating     = mentee_rating ?? 0;
//   const taskDone   = task_completed === true;
//   const hasMFb     = mentor_feedback && mentor_feedback.trim();
//   const hasMteeFb  = mentee_feedback && mentee_feedback.trim();

//   return (
//     <div
//       className="cs-card cs-fadeup"
//       style={{ animationDelay: `${index * 60}ms` }}
//     >
//       {/* ── Top accent bar ── */}
//       <div
//         style={{
//           height: 3,
//           background: `linear-gradient(90deg, ${C.accentDim}, ${C.accent}, #00f5c8)`,
//         }}
//       />

//       {/* ── Expand / collapse button ── */}
//       <button className="cs-expand-btn" onClick={() => setOpen((v) => !v)}>
//         {/* Left: session number + title */}
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           {/* Number badge */}
//           <div
//             style={{
//               width: 38,
//               height: 38,
//               borderRadius: 10,
//               background: C.accentSoft,
//               border: `1.5px solid ${C.accentDim}`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             <span
//               style={{
//                 fontFamily: C.mono,
//                 fontSize: 14,
//                 fontWeight: 700,
//                 color: C.accent,
//               }}
//             >
//               {String(session_number).padStart(2, "0")}
//             </span>
//           </div>

//           <div style={{ textAlign: "left" }}>
//             <p
//               style={{
//                 fontSize: 15,
//                 fontWeight: 800,
//                 color: C.text,
//                 lineHeight: 1.2,
//                 marginBottom: 4,
//               }}
//             >
//               {session_title || "Untitled Session"}
//             </p>
//             {/* Meta pills row */}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
//               <Pill>
//                 <CheckCircle2 size={10} />
//                 Completed
//               </Pill>
//               <Pill
//                 color={taskDone ? C.accent : C.red}
//                 bg={taskDone ? C.accentSoft : C.redSoft}
//                 border={taskDone ? C.accentDim : C.redDim}
//               >
//                 {taskDone ? (
//                   <CheckSquare size={10} />
//                 ) : (
//                   <XSquare size={10} />
//                 )}
//                 Task {taskDone ? "Completed" : "Pending"}
//               </Pill>
//               {session_date && (
//                 <Pill color={C.textMuted} bg={C.surfaceAlt} border={C.border}>
//                   <CalendarDays size={10} />
//                   {fmtDate(session_date)}
//                 </Pill>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right: rating + chevron */}
//         <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
//             <StarRating value={rating} />
//             <span
//               style={{
//                 fontSize: 10,
//                 color: C.textDim,
//                 fontFamily: C.mono,
//               }}
//             >
//               {rating}/5
//             </span>
//           </div>
//           <div
//             style={{
//               width: 28,
//               height: 28,
//               borderRadius: 7,
//               background: C.surfaceAlt,
//               border: `1px solid ${C.border}`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {open ? (
//               <ChevronUp size={14} color={C.textMuted} />
//             ) : (
//               <ChevronDown size={14} color={C.textMuted} />
//             )}
//           </div>
//         </div>
//       </button>

//       {/* ── Expanded details ── */}
//       {open && (
//         <div className="cs-slidedown">
//           {/* Meeting link */}
//           {meeting_link && (
//             <div className="cs-detail-row">
//               <Link2 size={14} color={C.accentDim} style={{ marginTop: 2, flexShrink: 0 }} />
//               <div style={{ flex: 1 }}>
//                 <p
//                   style={{
//                     fontSize: 10,
//                     fontWeight: 700,
//                     color: C.accentDim,
//                     textTransform: "uppercase",
//                     letterSpacing: ".08em",
//                     marginBottom: 5,
//                   }}
//                 >
//                   Meeting Link
//                 </p>
//                 <a
//                   href={meeting_link}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="cs-link"
//                 >
//                   <ExternalLink size={11} />
//                   {meeting_link.length > 60
//                     ? meeting_link.slice(0, 60) + "…"
//                     : meeting_link}
//                 </a>
//               </div>
//             </div>
//           )}

//           {/* Description */}
//           {meeting_description && (
//             <div className="cs-detail-row">
//               <BookOpen size={14} color={C.accentDim} style={{ marginTop: 2, flexShrink: 0 }} />
//               <div style={{ flex: 1 }}>
//                 <p
//                   style={{
//                     fontSize: 10,
//                     fontWeight: 700,
//                     color: C.accentDim,
//                     textTransform: "uppercase",
//                     letterSpacing: ".08em",
//                     marginBottom: 5,
//                   }}
//                 >
//                   Description
//                 </p>
//                 <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
//                   {meeting_description}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Tasks given */}
//           {tasks_given && (
//             <div className="cs-detail-row">
//               <ClipboardList
//                 size={14}
//                 color={C.accentDim}
//                 style={{ marginTop: 2, flexShrink: 0 }}
//               />
//               <div style={{ flex: 1 }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     marginBottom: 5,
//                   }}
//                 >
//                   <p
//                     style={{
//                       fontSize: 10,
//                       fontWeight: 700,
//                       color: C.accentDim,
//                       textTransform: "uppercase",
//                       letterSpacing: ".08em",
//                     }}
//                   >
//                     Tasks Given
//                   </p>
//                   <span
//                     style={{
//                       fontSize: 10,
//                       fontWeight: 700,
//                       color: taskDone ? C.accent : C.red,
//                       background: taskDone ? C.accentSoft : C.redSoft,
//                       border: `1px solid ${taskDone ? C.accentDim : C.redDim}`,
//                       borderRadius: 99,
//                       padding: "1px 7px",
//                     }}
//                   >
//                     {taskDone ? "Done ✓" : "Pending"}
//                   </span>
//                 </div>
//                 <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
//                   {tasks_given}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Mentor feedback */}
//           {hasMFb && (
//             <div className="cs-detail-row">
//               <MessageSquareQuote
//                 size={14}
//                 color={C.gold}
//                 style={{ marginTop: 2, flexShrink: 0 }}
//               />
//               <div style={{ flex: 1 }}>
//                 <p
//                   style={{
//                     fontSize: 10,
//                     fontWeight: 700,
//                     color: C.goldDim,
//                     textTransform: "uppercase",
//                     letterSpacing: ".08em",
//                     marginBottom: 5,
//                   }}
//                 >
//                   Mentor Feedback
//                 </p>
//                 <div
//                   style={{
//                     background: C.goldSoft,
//                     border: `1px solid ${C.goldDim}`,
//                     borderRadius: 9,
//                     padding: "10px 13px",
//                   }}
//                 >
//                   <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
//                     {mentor_feedback}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Mentee feedback + rating */}
//           {hasMteeFb && (
//             <div className="cs-detail-row">
//               <MessageSquareQuote
//                 size={14}
//                 color={C.accentDim}
//                 style={{ marginTop: 2, flexShrink: 0 }}
//               />
//               <div style={{ flex: 1 }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     marginBottom: 5,
//                     flexWrap: "wrap",
//                     gap: 6,
//                   }}
//                 >
//                   <p
//                     style={{
//                       fontSize: 10,
//                       fontWeight: 700,
//                       color: C.accentDim,
//                       textTransform: "uppercase",
//                       letterSpacing: ".08em",
//                     }}
//                   >
//                     Your Feedback
//                   </p>
//                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                     <StarRating value={rating} />
//                     <span
//                       style={{
//                         fontFamily: C.mono,
//                         fontSize: 11,
//                         fontWeight: 700,
//                         color: C.gold,
//                       }}
//                     >
//                       {rating}.0
//                     </span>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     background: C.accentSoft,
//                     border: `1px solid ${C.border}`,
//                     borderRadius: 9,
//                     padding: "10px 13px",
//                   }}
//                 >
//                   <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
//                     {mentee_feedback}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Timestamps footer */}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 16,
//               padding: "12px 22px",
//               borderTop: `1px solid ${C.border}`,
//               background: C.bg,
//             }}
//           >
//             {[
//               { icon: <CalendarDays size={11} />, label: "Session Date", val: session_date ? `${fmtDate(session_date)} · ${fmtTime(session_date)}` : "—" },
//               { icon: <Clock size={11} />, label: "Created",      val: fmtDate(createdAt) },
//               { icon: <Clock size={11} />, label: "Last Updated", val: fmtDate(updatedAt) },
//             ].map(({ icon, label, val }) => (
//               <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                 <span style={{ color: C.textDim }}>{icon}</span>
//                 <span style={{ fontSize: 11, color: C.textDim }}>{label}:</span>
//                 <span
//                   style={{
//                     fontSize: 11,
//                     fontWeight: 600,
//                     color: C.textMuted,
//                     fontFamily: C.mono,
//                   }}
//                 >
//                   {val}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─── Summary bar ────────────────────────────────────── */
// const SummaryBar = ({ sessions }) => {
//   const total       = sessions.length;
//   const tasksDone   = sessions.filter((s) => s.task_completed).length;
//   const avgRating   =
//     total > 0
//       ? (sessions.reduce((sum, s) => sum + (s.mentee_rating ?? 0), 0) / total).toFixed(1)
//       : "—";
//   const withFb = sessions.filter(
//     (s) => s.mentee_feedback && s.mentee_feedback.trim()
//   ).length;

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
//         gap: 10,
//         marginBottom: 24,
//       }}
//     >
//       {[
//         { icon: <Layers size={16} color={C.accent} />,       label: "Total Sessions",  val: total,             color: C.accent  },
//         { icon: <CheckSquare size={16} color={C.accent} />,  label: "Tasks Completed", val: `${tasksDone}/${total}`, color: C.accent },
//         { icon: <Star size={16} color={C.gold} />,           label: "Avg. Rating",     val: avgRating,         color: C.gold    },
//         { icon: <MessageSquareQuote size={16} color={C.textMuted} />, label: "Feedback Given", val: withFb, color: C.textMuted },
//       ].map(({ icon, label, val, color }) => (
//         <div
//           key={label}
//           style={{
//             background: C.surface,
//             border: `1.5px solid ${C.border}`,
//             borderRadius: 12,
//             padding: "14px 16px",
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//           }}
//         >
//           <div
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: 9,
//               background: C.accentSoft,
//               border: `1px solid ${C.border}`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             {icon}
//           </div>
//           <div>
//             <p style={{ fontSize: 10, color: C.textDim, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>
//               {label}
//             </p>
//             <p
//               style={{
//                 fontSize: 18,
//                 fontWeight: 800,
//                 color,
//                 fontFamily: C.mono,
//                 marginTop: 1,
//                 lineHeight: 1,
//               }}
//             >
//               {val}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ─── Empty state ────────────────────────────────────── */
// const EmptyState = () => (
//   <div
//     style={{
//       background: C.surface,
//       border: `1.5px solid ${C.border}`,
//       borderRadius: 16,
//       padding: "60px 24px",
//       textAlign: "center",
//     }}
//   >
//     <div
//       style={{
//         width: 56,
//         height: 56,
//         borderRadius: 14,
//         background: C.accentSoft,
//         border: `1.5px solid ${C.accentDim}`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         margin: "0 auto 16px",
//       }}
//     >
//       <Trophy size={24} color={C.accent} />
//     </div>
//     <p style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 6 }}>
//       No completed sessions yet
//     </p>
//     <p style={{ fontSize: 13, color: C.textMuted }}>
//       Your completed LTM sessions will appear here.
//     </p>
//   </div>
// );

// /* ─── Error state ────────────────────────────────────── */
// const ErrorState = () => (
//   <div
//     style={{
//       background: C.surface,
//       border: `1.5px solid ${C.redDim}`,
//       borderRadius: 16,
//       padding: "40px 24px",
//       textAlign: "center",
//     }}
//   >
//     <AlertCircle size={32} color={C.red} style={{ margin: "0 auto 12px" }} />
//     <p style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 5 }}>
//       Failed to load sessions
//     </p>
//     <p style={{ fontSize: 13, color: C.textMuted }}>
//       Please refresh and try again.
//     </p>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */
// export default function LtmsessionsCompleted() {
//   injectCSS();

//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const menteeId = userData?._id;

//   const {
//     data,
//     isLoading,
//     isError,
//   } = useGetCompletedSessionsQuery(menteeId, { skip: !menteeId });

//   const sessions = data?.data || data || [];

//   /* ─── Sorting / filter state ── */
//   const [sortBy,    setSortBy]    = useState("date_desc");
//   const [filterTask, setFilterTask] = useState("all");

//   const filtered = sessions
//     .filter((s) => {
//       if (filterTask === "done")    return s.task_completed === true;
//       if (filterTask === "pending") return s.task_completed !== true;
//       return true;
//     })
//     .sort((a, b) => {
//       if (sortBy === "date_desc")   return new Date(b.session_date || b.createdAt) - new Date(a.session_date || a.createdAt);
//       if (sortBy === "date_asc")    return new Date(a.session_date || a.createdAt) - new Date(b.session_date || b.createdAt);
//       if (sortBy === "rating_desc") return (b.mentee_rating ?? 0) - (a.mentee_rating ?? 0);
//       if (sortBy === "number_asc")  return a.session_number - b.session_number;
//       return 0;
//     });

//   /* ─── Field/select shared style ── */
//   const selectStyle = {
//     background: C.surfaceAlt,
//     border: `1.5px solid ${C.border}`,
//     color: C.textMuted,
//     borderRadius: 8,
//     padding: "7px 12px",
//     fontSize: 12,
//     fontFamily: C.sans,
//     fontWeight: 600,
//     outline: "none",
//     cursor: "pointer",
//     WebkitAppearance: "none",
//     appearance: "none",
//   };

//   return (
//     <div className="cs-root" style={{ padding: "28px 24px 60px", maxWidth: 740, margin: "0 auto" }}>

//       {/* ── Page header ── */}
//       <div className="cs-fadeup" style={{ marginBottom: 24 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 5 }}>
//           <div
//             style={{
//               width: 38,
//               height: 38,
//               borderRadius: 10,
//               background: C.accentSoft,
//               border: `1.5px solid ${C.accentDim}`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Trophy size={18} color={C.accent} />
//           </div>
//           <div>
//             <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1 }}>
//               Completed Sessions
//             </h1>
//             <p style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>
//               Your full LTM session history
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ── Loading skeletons ── */}
//       {isLoading && (
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           {[0, 1, 2].map((i) => <SkeletonCard key={i} delay={i * 80} />)}
//         </div>
//       )}

//       {/* ── Error ── */}
//       {isError && !isLoading && <ErrorState />}

//       {/* ── Content ── */}
//       {!isLoading && !isError && (
//         <>
//           {/* Summary bar */}
//           {sessions.length > 0 && <SummaryBar sessions={sessions} />}

//           {/* Sort + filter toolbar */}
//           {sessions.length > 0 && (
//             <div
//               className="cs-fadeup"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 flexWrap: "wrap",
//                 gap: 10,
//                 marginBottom: 16,
//                 padding: "12px 16px",
//                 background: C.surface,
//                 border: `1.5px solid ${C.border}`,
//                 borderRadius: 12,
//               }}
//             >
//               <p
//                 style={{
//                   fontSize: 12,
//                   color: C.textDim,
//                   fontFamily: C.mono,
//                 }}
//               >
//                 {filtered.length} of {sessions.length} session{sessions.length !== 1 ? "s" : ""}
//               </p>
//               <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                 {/* Filter by task */}
//                 <select
//                   value={filterTask}
//                   onChange={(e) => setFilterTask(e.target.value)}
//                   style={selectStyle}
//                 >
//                   <option value="all">All Tasks</option>
//                   <option value="done">Task Done</option>
//                   <option value="pending">Task Pending</option>
//                 </select>

//                 {/* Sort */}
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   style={selectStyle}
//                 >
//                   <option value="date_desc">Newest First</option>
//                   <option value="date_asc">Oldest First</option>
//                   <option value="rating_desc">Highest Rated</option>
//                   <option value="number_asc">Session #</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Session cards */}
//           {filtered.length === 0 && sessions.length > 0 ? (
//             <div
//               style={{
//                 background: C.surface,
//                 border: `1.5px solid ${C.border}`,
//                 borderRadius: 12,
//                 padding: "32px 24px",
//                 textAlign: "center",
//               }}
//             >
//               <Hash size={28} color={C.textDim} style={{ margin: "0 auto 10px" }} />
//               <p style={{ fontSize: 14, color: C.textMuted }}>
//                 No sessions match the current filter.
//               </p>
//             </div>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//               {filtered.map((session, i) => (
//                 <SessionCard key={session._id} session={session} index={i} />
//               ))}
//             </div>
//           )}

//           {sessions.length === 0 && <EmptyState />}
//         </>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import {
  Trophy,
  Layers,
  CheckSquare,
  Star,
  MessageSquareQuote,
  Search,
  ExternalLink,
  CalendarDays,
  ClipboardList,
  BookOpen,
  AlertCircle,
  Hash,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useGetCompletedSessionsQuery } from "./ltmsessionhistoryapislice";

/* ─── Helpers ─────────────────────────────────────────── */
const fmtDate = (s) =>
  s
    ? new Date(s).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const StarRow = ({ value = 0 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        style={{
          color: i < value ? "#2563eb" : "#cbd5e1",
          fill:  i < value ? "#2563eb" : "none",
        }}
      />
    ))}
    <span className="ml-1 text-xs font-semibold" style={{ color: "#2563eb" }}>
      {value}/5
    </span>
  </div>
);

/* ─── Stat Card ───────────────────────────────────────── */
const StatCard = ({ icon, label, value }) => (
  <div
    className="bg-white rounded-xl p-4 flex items-center gap-3"
    style={{ border: "1.5px solid #dbeafe" }}
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}
    >
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#93c5fd" }}>
        {label}
      </p>
      <p className="text-2xl font-bold leading-none mt-0.5" style={{ color: "#2563eb" }}>
        {value}
      </p>
    </div>
  </div>
);

/* ─── Skeleton ────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-xl p-4 space-y-3" style={{ border: "1.5px solid #dbeafe" }}>
    <div className="h-5 rounded animate-pulse" style={{ background: "#eff6ff", width: "60%" }} />
    <div className="h-4 rounded animate-pulse" style={{ background: "#eff6ff", width: "45%" }} />
    <div className="h-4 rounded animate-pulse" style={{ background: "#eff6ff", width: "70%" }} />
  </div>
);

/* ─── Empty ───────────────────────────────────────────── */
const EmptyState = () => (
  <div className="bg-white rounded-xl py-16 flex flex-col items-center gap-3"
    style={{ border: "1.5px solid #dbeafe" }}>
    <div className="w-14 h-14 rounded-xl flex items-center justify-center"
      style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
      <Trophy size={26} style={{ color: "#2563eb" }} />
    </div>
    <p className="text-base font-bold" style={{ color: "#1e3a8a" }}>No completed sessions yet</p>
    <p className="text-sm" style={{ color: "#64748b" }}>Your completed LTM sessions will appear here.</p>
  </div>
);

/* ─── Error ───────────────────────────────────────────── */
const ErrorState = () => (
  <div className="bg-white rounded-xl py-12 flex flex-col items-center gap-3"
    style={{ border: "1.5px solid #fecaca" }}>
    <AlertCircle size={30} style={{ color: "#ef4444" }} />
    <p className="text-base font-bold" style={{ color: "#1e3a8a" }}>Failed to load sessions</p>
    <p className="text-sm" style={{ color: "#64748b" }}>Please refresh and try again.</p>
  </div>
);

/* ─── Mobile Card ─────────────────────────────────────── */
const MobileCard = ({ session, index }) => {
  const [open, setOpen] = useState(false);
  const {
    session_number, session_title, session_date,
    task_completed, mentee_rating, meeting_link,
    meeting_description, tasks_given, mentor_feedback,
    mentee_feedback,
  } = session;

  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: "1.5px solid #dbeafe" }}
    >
      {/* Blue top stripe */}
      <div className="h-1 w-full" style={{ background: "#2563eb" }} />

      {/* Tap header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 transition-colors"
        style={{ background: open ? "#eff6ff" : "white" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* # badge */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}
          >
            <span className="font-bold text-sm font-mono" style={{ color: "#2563eb" }}>
              {String(session_number).padStart(2, "0")}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate" style={{ color: "#1e3a8a" }}>
              {session_title || "Untitled Session"}
            </p>
            <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "#64748b" }}>
              <CalendarDays size={10} style={{ color: "#93c5fd" }} />
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
                ? { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }
                : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
            }
          >
            {task_completed ? "Task Done" : "Pending"}
          </span>
          {open ? (
            <ChevronUp size={14} style={{ color: "#93c5fd" }} />
          ) : (
            <ChevronDown size={14} style={{ color: "#93c5fd" }} />
          )}
        </div>
      </button>


    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function LtmsessionsCompleted() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const menteeId = userData?._id;

  const { data, isLoading, isError } = useGetCompletedSessionsQuery(menteeId, {
    skip: !menteeId,
  });

  const sessions = data?.data || data || [];

  const [search,     setSearch]     = useState("");
  const [filterTask, setFilterTask] = useState("all");
  const [sortBy,     setSortBy]     = useState("date_desc");
  const [perPage,    setPerPage]    = useState(10);

  const filtered = sessions
    .filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        s.session_title?.toLowerCase().includes(q) ||
        String(s.session_number).includes(q);
      const matchTask =
        filterTask === "all" ? true
        : filterTask === "done" ? s.task_completed === true
        : s.task_completed !== true;
      return matchSearch && matchTask;
    })
    .sort((a, b) => {
      if (sortBy === "date_desc")   return new Date(b.session_date || b.createdAt) - new Date(a.session_date || a.createdAt);
      if (sortBy === "date_asc")    return new Date(a.session_date || a.createdAt) - new Date(b.session_date || b.createdAt);
      if (sortBy === "rating_desc") return (b.mentee_rating ?? 0) - (a.mentee_rating ?? 0);
      if (sortBy === "number_asc")  return a.session_number - b.session_number;
      return 0;
    })
    .slice(0, perPage);

  const total     = sessions.length;
  const tasksDone = sessions.filter((s) => s.task_completed).length;
  const avgRating =
    total > 0
      ? (sessions.reduce((s, r) => s + (r.mentee_rating ?? 0), 0) / total).toFixed(1)
      : "0";
  const withFb = sessions.filter((s) => s.mentee_feedback?.trim()).length;

  /* shared select style */
  const sel = {
    background: "white",
    border: "1.5px solid #dbeafe",
    color: "#1e3a8a",
    borderRadius: 8,
    padding: "7px 28px 7px 11px",
    fontSize: 12,
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
  };

  const COLS = [
    "S.No", "Session", "Date", "Description",
    "Tasks Given", "Task Status", "Rating", "Feedback",
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{ background: "#f8fafc" }}>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          icon={<Layers size={18} style={{ color: "#2563eb" }} />}
          label="Total Sessions"
          value={total}
        />
        <StatCard
          icon={<CheckSquare size={18} style={{ color: "#2563eb" }} />}
          label="Tasks Completed"
          value={`${tasksDone}/${total}`}
        />
        {/* <StatCard
          icon={<Star size={18} style={{ color: "#2563eb", fill: "#2563eb" }} />}
          label="Avg. Rating"
          value={avgRating}
        />
        <StatCard
          icon={<MessageSquareQuote size={18} style={{ color: "#2563eb" }} />}
          label="Feedback Given"
          value={withFb}
        /> */}
      </div>

      {/* ── Panel ── */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1.5px solid #dbeafe" }}>

        {/* Panel title */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #dbeafe" }}>
          <h2 className="text-base font-bold" style={{ color: "#1e3a8a" }}>
            Completed Sessions
          </h2>
        </div>

        {/* Toolbar */}
        <div
          className="px-5 py-3 flex flex-wrap items-center justify-between gap-3"
          style={{ borderBottom: "1px solid #dbeafe", background: "#f8fafc" }}
        >
          {/* Per page */}
          <div className="relative">
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} style={sel}>
              {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#2563eb" }} />
          </div>

          {/* Right filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select value={filterTask} onChange={(e) => setFilterTask(e.target.value)} style={sel}>
                <option value="all">All Tasks</option>
                <option value="done">Task Done</option>
                <option value="pending">Task Pending</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#2563eb" }} />
            </div>

            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={sel}>
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="number_asc">Session #</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#2563eb" }} />
            </div>

            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#93c5fd" }} />
              <input
                type="text"
                placeholder="Search session..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg pl-8 pr-3 py-2 text-xs outline-none w-40 sm:w-48 transition-all"
                style={{
                  background: "white",
                  border: "1.5px solid #dbeafe",
                  color: "#1e3a8a",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e)  => (e.target.style.borderColor = "#dbeafe")}
              />
            </div>
          </div>
        </div>

        {/* ══ DESKTOP TABLE ══ */}
        <div className="hidden md:block overflow-x-auto">
          {isLoading ? (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#2563eb" }}>
                  {COLS.map((c) => (
                    <th key={c} className="px-4 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #dbeafe" }}>
                    {COLS.map((c) => (
                      <td key={c} className="px-4 py-3">
                        <div className="h-4 rounded animate-pulse" style={{ background: "#eff6ff" }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isError ? (
            <div className="p-6"><ErrorState /></div>
          ) : filtered.length === 0 ? (
            <div className="p-6">
              {sessions.length === 0 ? <EmptyState /> : (
                <div className="text-center py-10">
                  <Hash size={28} className="mx-auto mb-2" style={{ color: "#bfdbfe" }} />
                  <p className="text-sm" style={{ color: "#64748b" }}>No sessions match the current filter.</p>
                </div>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#2563eb" }}>
                  {COLS.map((c) => (
                    <th key={c} className="px-4 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s._id}
                    style={{ borderBottom: "1px solid #dbeafe" }}
                    className="transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    {/* S.No */}
                    <td className="px-4 py-3 text-xs font-mono font-semibold" style={{ color: "#93c5fd" }}>
                      {i + 1}
                    </td>

                    {/* Session */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}
                        >
                          <span className="font-bold text-xs font-mono" style={{ color: "#2563eb" }}>
                            {String(s.session_number).padStart(2, "0")}
                          </span>
                        </div>
                        <span className="text-sm font-semibold whitespace-nowrap max-w-[130px] truncate"
                          style={{ color: "#1e3a8a" }}>
                          {s.session_title || "Untitled"}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: "#475569" }}>
                      {fmtDate(s.session_date)}
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3 text-xs max-w-[150px]" style={{ color: "#475569" }}>
                      <span className="line-clamp-2 leading-relaxed">
                        {s.meeting_description || <span style={{ color: "#cbd5e1" }}>—</span>}
                      </span>
                    </td>

                    {/* Tasks Given */}
                    <td className="px-4 py-3 text-xs max-w-[130px]" style={{ color: "#475569" }}>
                      <span className="line-clamp-2 leading-relaxed">
                        {s.tasks_given || <span style={{ color: "#cbd5e1" }}>—</span>}
                      </span>
                    </td>

                    {/* Task Status */}
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={
                          s.task_completed
                            ? { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }
                            : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
                        }
                      >
                        {s.task_completed ? (
                          <CheckCircle2 size={11} />
                        ) : (
                          <XCircle size={11} />
                        )}
                        {s.task_completed ? "Done" : "Pending"}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-3">
                      <StarRow value={s.mentee_rating ?? 0} />
                    </td>

                    {/* Feedback */}
                    <td className="px-4 py-3 text-xs max-w-[140px]" style={{ color: "#475569" }}>
                      <span className="line-clamp-2 leading-relaxed">
                        {s.mentee_feedback || (
                          <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>No feedback</span>
                        )}
                      </span>
                    </td>

                    {/* Meeting */}
                    {/* <td className="px-4 py-3">
                      {s.meeting_link ? (
                        <a
                          href={s.meeting_link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-2.5 py-1.5 transition-opacity hover:opacity-75"
                          style={{
                            background: "#eff6ff",
                            border: "1.5px solid #bfdbfe",
                            color: "#2563eb",
                          }}
                        >
                          <ExternalLink size={11} />
                          Open
                        </a>
                      ) : (
                        <span style={{ color: "#cbd5e1", fontSize: 12 }}>—</span>
                      )}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ══ MOBILE / TABLET CARDS ══ */}
        <div className="md:hidden p-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : isError ? (
            <ErrorState />
          ) : filtered.length === 0 ? (
            sessions.length === 0 ? <EmptyState /> : (
              <div className="text-center py-10">
                <Hash size={28} className="mx-auto mb-2" style={{ color: "#bfdbfe" }} />
                <p className="text-sm" style={{ color: "#64748b" }}>No sessions match the filter.</p>
              </div>
            )
          ) : (
            <div className="space-y-3">
              {filtered.map((session, i) => (
                <MobileCard key={session._id} session={session} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Footer count */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid #dbeafe", background: "#f8fafc" }}
          >
            <p className="text-xs font-mono" style={{ color: "#94a3b8" }}>
              Showing {filtered.length} of {sessions.length} session{sessions.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: "#2563eb" }} />
              <span className="text-xs font-semibold" style={{ color: "#93c5fd" }}>All Completed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
