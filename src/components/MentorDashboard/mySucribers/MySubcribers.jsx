




// import React, {
//   useState,
//   useMemo,
//   useCallback,
//   useEffect,
// } from "react";
// import {
//   useGetSessionsByMentorQuery,
//   useGetSubscribersByMentorQuery,
//   useUpdateByMentorSessionMutation,
// } from "./mysubcriberspislice";

// // ─── Constants ────────────────────────────────────────────────────────────────

// const DEFAULT_PAGE_SIZE = 10;
// const PAGE_SIZE_OPTIONS = [5, 10, 20];

// const PLAN_LABELS = {
//   one_month: "1 Month",
//   three_months: "3 Months",
//   six_months: "6 Months",
// };

// const STATUS_META = {
//   pending: { label: "Pending", bg: "#eff9fd", color: "#0083b1", dot: "#0083b1" },
//   completed: { label: "Completed", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
//   cancelled: { label: "Cancelled", bg: "#fff5f5", color: "#dc2626", dot: "#dc2626" },
//   missed: { label: "Missed", bg: "#fffbeb", color: "#d97706", dot: "#d97706" },
//   active: { label: "Active", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
//   approved: { label: "Approved", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
//   onprocess: { label: "On Process", bg: "#eff6ff", color: "#2563eb", dot: "#2563eb" },
// };

// // ─── Utilities ────────────────────────────────────────────────────────────────

// const getMentorId = () =>
//   JSON.parse(localStorage.getItem("userData") || "{}")?._id ?? null;

// const formatDate = (d) =>
//   d
//     ? new Date(d).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     })
//     : "—";

// const formatAmount = (a) =>
//   a != null ? `₹${a.toLocaleString("en-IN")}` : "—";

// const shortId = (id) => (id ? `…${id.slice(-6)}` : "—");

// const paginate = (arr, page, size) =>
//   arr.slice((page - 1) * size, page * size);

// // ─── Stars ───────────────────────────────────────────────────────────────────

// function Stars({ value, onChange, readonly = false }) {
//   const [hovered, setHovered] = useState(0);
//   return (
//     <div style={{ display: "flex", gap: 4 }}>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           onClick={() => !readonly && onChange?.(star)}
//           onMouseEnter={() => !readonly && setHovered(star)}
//           onMouseLeave={() => !readonly && setHovered(0)}
//           style={{
//             fontSize: 20,
//             cursor: readonly ? "default" : "pointer",
//             color: star <= (hovered || value) ? "#f59e0b" : "#e2e8f0",
//             transition: "color 0.1s",
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// // ─── StatusBadge ─────────────────────────────────────────────────────────────

// function StatusBadge({ status }) {
//   const m = STATUS_META[status] ?? {
//     label: status ?? "—",
//     bg: "#f5f5f5",
//     color: "#6b7280",
//     dot: "#9ca3af",
//   };
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 5,
//         background: m.bg,
//         color: m.color,
//         fontSize: 11,
//         fontWeight: 600,
//         padding: "3px 9px 3px 7px",
//         borderRadius: 20,
//         letterSpacing: "0.02em",
//         whiteSpace: "nowrap",
//       }}
//     >
//       <span
//         style={{
//           width: 6,
//           height: 6,
//           borderRadius: "50%",
//           background: m.dot,
//           flexShrink: 0,
//         }}
//       />
//       {m.label}
//     </span>
//   );
// }

// // ─── MetricCard ───────────────────────────────────────────────────────────────

// function MetricCard({ label, value, color, icon }) {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         border: "1.5px solid #e9edf2",
//         borderRadius: 14,
//         padding: "14px 20px",
//         minWidth: 120,
//         display: "flex",
//         flexDirection: "column",
//         gap: 4,
//       }}
//     >
//       <p
//         style={{
//           fontSize: 11,
//           color: "#94a3b8",
//           fontWeight: 600,
//           marginBottom: 2,
//           letterSpacing: "0.04em",
//           textTransform: "uppercase",
//           display: "flex",
//           alignItems: "center",
//           gap: 5,
//         }}
//       >
//         {icon && (
//           <span style={{ fontSize: 14, color: color ?? "#1a1a2e" }}>
//             {icon}
//           </span>
//         )}
//         {label}
//       </p>
//       <p
//         style={{
//           fontSize: 24,
//           fontWeight: 800,
//           color: color ?? "#1a1a2e",
//           lineHeight: 1.1,
//           margin: 0,
//         }}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// // ─── Pagination ───────────────────────────────────────────────────────────────

// function Pagination({ page, total, pageSize, onPage, onPageSize, isFetching }) {
//   const totalPages = Math.ceil(total / pageSize) || 1;

//   const pageNumbers = useMemo(() => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       if (i === 1 || i === totalPages || Math.abs(i - page) <= 1)
//         pages.push(i);
//       else if (pages[pages.length - 1] !== "…") pages.push("…");
//     }
//     return pages;
//   }, [page, totalPages]);

//   if (totalPages <= 1 && total <= PAGE_SIZE_OPTIONS[0]) return null;

//   const btn = (active, disabled) => ({
//     minWidth: 32,
//     height: 32,
//     borderRadius: 8,
//     border: active ? "1.5px solid #0083b1" : "1.5px solid #e2e8f0",
//     background: active ? "#0083b1" : "#fff",
//     color: active ? "#fff" : "#64748b",
//     fontSize: 12,
//     fontWeight: 600,
//     cursor: disabled ? "not-allowed" : "pointer",
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "all 0.15s",
//     opacity: disabled ? 0.4 : 1,
//   });

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 10,
//         padding: "14px 20px",
//         borderTop: "1px solid #f1f5f9",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//         <span style={{ fontSize: 12, color: "#94a3b8" }}>Rows:</span>
//         <select
//           value={pageSize}
//           onChange={(e) => {
//             onPageSize(Number(e.target.value));
//             onPage(1);
//           }}
//           style={{
//             border: "1.5px solid #e2e8f0",
//             borderRadius: 8,
//             fontSize: 12,
//             color: "#1a1a2e",
//             padding: "4px 8px",
//             background: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           {PAGE_SIZE_OPTIONS.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//         <span style={{ fontSize: 12, color: "#94a3b8" }}>
//           {total === 0
//             ? "0"
//             : `${(page - 1) * pageSize + 1}–${Math.min(
//               page * pageSize,
//               total
//             )}`}{" "}
//           of {total}
//         </span>
//         {isFetching && (
//           <span
//             style={{
//               fontSize: 11,
//               color: "#0083b1",
//               fontWeight: 600,
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 4,
//             }}
//           >
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               style={{ animation: "spin 0.8s linear infinite" }}
//             >
//               <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
//             </svg>
//             Loading…
//           </span>
//         )}
//       </div>
//       <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//         <button
//           style={btn(false, page === 1)}
//           disabled={page === 1 || isFetching}
//           onClick={() => onPage(page - 1)}
//         >
//           ‹
//         </button>
//         {pageNumbers.map((p, i) =>
//           p === "…" ? (
//             <span
//               key={`e${i}`}
//               style={{ padding: "0 4px", color: "#94a3b8", fontSize: 12 }}
//             >
//               …
//             </span>
//           ) : (
//             <button
//               key={p}
//               style={btn(p === page, isFetching)}
//               disabled={isFetching}
//               onClick={() => onPage(p)}
//             >
//               {p}
//             </button>
//           )
//         )}
//         <button
//           style={btn(false, page === totalPages)}
//           disabled={page === totalPages || isFetching}
//           onClick={() => onPage(page + 1)}
//         >
//           ›
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Table helpers ────────────────────────────────────────────────────────────

// function TableCard({ children }) {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         border: "1.5px solid #e9edf2",
//         borderRadius: 18,
//         overflow: "hidden",
//         boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// function Th({ children }) {
//   return (
//     <th
//       style={{
//         padding: "12px 20px",
//         textAlign: "left",
//         fontSize: 11,
//         fontWeight: 700,
//         color: "#94a3b8",
//         textTransform: "uppercase",
//         letterSpacing: "0.06em",
//         whiteSpace: "nowrap",
//         background: "#fafbfc",
//         borderBottom: "1.5px solid #f1f5f9",
//       }}
//     >
//       {children}
//     </th>
//   );
// }

// function Td({ children, style }) {
//   return (
//     <td
//       style={{
//         padding: "14px 20px",
//         borderBottom: "1px solid #f8fafc",
//         verticalAlign: "middle",
//         ...style,
//       }}
//     >
//       {children}
//     </td>
//   );
// }

// function SkeletonRows({ cols, rows = DEFAULT_PAGE_SIZE }) {
//   return Array.from({ length: rows }).map((_, i) => (
//     <tr key={i}>
//       {Array.from({ length: cols }).map((_, j) => (
//         <td key={j} style={{ padding: "14px 20px" }}>
//           <div
//             style={{
//               height: 12,
//               borderRadius: 6,
//               background:
//                 "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
//               backgroundSize: "200% 100%",
//               animation: "shimmer 1.4s infinite",
//               width: j === 0 ? 24 : j === 1 ? "60%" : "45%",
//             }}
//           />
//         </td>
//       ))}
//     </tr>
//   ));
// }

// function EmptyState({ message }) {
//   return (
//     <tr>
//       <td colSpan={10} style={{ textAlign: "center", padding: "60px 20px" }}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 10,
//           }}
//         >
//           <svg
//             width="40"
//             height="40"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#cbd5e1"
//             strokeWidth="1.5"
//           >
//             <rect x="3" y="3" width="18" height="18" rx="3" />
//             <path d="M3 9h18M9 21V9" />
//           </svg>
//           <p style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>
//             {message}
//           </p>
//         </div>
//       </td>
//     </tr>
//   );
// }

// // ─── SESSION MODAL ────────────────────────────────────────────────────────────

// const inputClass = `
//   w-full rounded-xl border border-gray-300 bg-white px-4 py-3
//   text-sm text-gray-800 outline-none transition
//   focus:border-[#0083b1] focus:ring-4 focus:ring-[#0083b1]/10
// `;

// const readonlyInputClass = `
//   w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3
//   text-sm text-gray-500 outline-none
// `;



// function SessionModal({ session, onClose, onSave }) {
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   const isMobile =
//     window.innerWidth < 768;

//   const isSmallMobile =
//     window.innerWidth < 480;

//   const [form, setForm] = useState({
//     session_title:
//       session.session_title || "",

//     session_date:
//       session.session_date
//         ? new Date(
//           session.session_date
//         )
//           .toISOString()
//           .slice(0, 16)
//         : "",

//     meeting_link:
//       session.meeting_link || "",

//     meeting_description:
//       session.meeting_description ||
//       "",

//     tasks_given:
//       session.tasks_given || "",

//     task_completed:
//       session.task_completed ||
//       false,

//     // READ ONLY API RESPONSE
//     mentee_feedback:
//       session.mentee_feedback ||
//       "",

//     mentee_rating:
//       session.mentee_rating || 0,

//     // MENTOR EDITABLE
//     mentor_feedback:
//       session.mentor_feedback ||
//       "",

//     mentor_rating:
//       session.mentor_rating || 0,

//     status:
//       session.status || "pending",
//   });

//   useEffect(() => {
//     document.body.style.overflow =
//       "hidden";

//     return () => {
//       document.body.style.overflow =
//         "";
//     };
//   }, []);

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener(
//       "keydown",
//       handleEsc
//     );

//     return () => {
//       document.removeEventListener(
//         "keydown",
//         handleEsc
//       );
//     };
//   }, [onClose]);

//   const updateField = useCallback(
//     (key) => (e) => {
//       setForm((prev) => ({
//         ...prev,

//         [key]:
//           e.target.type ===
//             "checkbox"
//             ? e.target.checked
//             : e.target.value,
//       }));
//     },
//     []
//   );

//   const handleSave = useCallback(
//     async () => {
//       setSaving(true);

//       const success =
//         await onSave(
//           session._id,
//           form
//         );

//       setSaving(false);

//       if (success) {
//         setSaved(true);

//         setTimeout(() => {
//           setSaved(false);
//         }, 2200);
//       }
//     },
//     [form, onSave, session._id]
//   );

//   return (
//     <div
//       style={styles.overlay}
//       onClick={(e) => {
//         if (
//           e.target ===
//           e.currentTarget
//         ) {
//           onClose();
//         }
//       }}
//     >
//       <div
//         style={{
//           ...styles.modal,
//           borderRadius:
//             isMobile
//               ? 18
//               : 24,
//         }}
//       >
//         {/* HEADER */}
//         <div
//           style={{
//             ...styles.header,
//             flexWrap:
//               isMobile
//                 ? "wrap"
//                 : "nowrap",
//           }}
//         >
//           <div
//             style={
//               styles.sessionNumber
//             }
//           >
//             {
//               session.session_number
//             }
//           </div>

//           <div
//             style={{
//               flex: 1,
//               minWidth: 0,
//             }}
//           >
//             <p
//               style={{
//                 ...styles.title,
//                 fontSize:
//                   isMobile
//                     ? 15
//                     : 18,
//               }}
//             >
//               {form.session_title ||
//                 `Session ${session.session_number}`}
//             </p>

//             <p
//               style={
//                 styles.date
//               }
//             >
//               {form.session_date
//                 ? new Date(
//                   form.session_date
//                 ).toLocaleDateString(
//                   "en-US",
//                   {
//                     weekday:
//                       "short",
//                     month:
//                       "short",
//                     day: "numeric",
//                     year:
//                       "numeric",
//                   }
//                 )
//                 : "No date set"}
//             </p>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems:
//                 "center",
//               gap: 10,
//             }}
//           >
//             <StatusBadge
//               status={
//                 form.status
//               }
//             />

//             <button
//               onClick={
//                 onClose
//               }
//               style={
//                 styles.closeBtn
//               }
//             >
//               ✕
//             </button>
//           </div>
//         </div>

//         {/* BODY */}
//         <div
//           style={{
//             ...styles.body,
//             padding:
//               isMobile
//                 ? 16
//                 : 24,
//           }}
//         >

//           {/* SESSION DETAILS */}
//           <section>
//             <SectionTitle>
//               Session Details
//             </SectionTitle>

//             <div
//               style={{
//                 ...styles.grid,
//                 gridTemplateColumns:
//                   isMobile
//                     ? "1fr"
//                     : "1fr 1fr",
//               }}
//             >

//               <ModalField
//                 label="Session Title"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <input
//                   style={
//                     styles.input
//                   }
//                   value={
//                     form.session_title
//                   }
//                   onChange={updateField(
//                     "session_title"
//                   )}
//                   placeholder="Introduction & Goal Setting"
//                 />
//               </ModalField>

//               <ModalField
//                 label="Date & Time"
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <input
//                   type="datetime-local"
//                   style={
//                     styles.input
//                   }
//                   value={
//                     form.session_date
//                   }
//                   onChange={updateField(
//                     "session_date"
//                   )}
//                 />
//               </ModalField>

//               <ModalField
//                 label="Status"
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <select
//                   style={
//                     styles.input
//                   }
//                   value={
//                     form.status
//                   }
//                   onChange={updateField(
//                     "status"
//                   )}
//                 >
//                   <option value="pending">
//                     Pending
//                   </option>

//                   <option value="completed">
//                     Completed
//                   </option>

//                   <option value="cancelled">
//                     Cancelled
//                   </option>

//                   <option value="missed">
//                     Missed
//                   </option>
//                 </select>
//               </ModalField>

//               <ModalField
//                 label="Meeting Link"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <input
//                   style={
//                     styles.input
//                   }
//                   value={
//                     form.meeting_link
//                   }
//                   onChange={updateField(
//                     "meeting_link"
//                   )}
//                   placeholder="https://meet.google.com"
//                 />
//               </ModalField>

//               <ModalField
//                 label="Agenda / Description"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <textarea
//                   rows={4}
//                   style={{
//                     ...styles.input,
//                     resize:
//                       "vertical",
//                     minHeight: 110,
//                   }}
//                   value={
//                     form.meeting_description
//                   }
//                   onChange={updateField(
//                     "meeting_description"
//                   )}
//                   placeholder="Topics to discuss..."
//                 />
//               </ModalField>
//             </div>
//           </section>

//           {/* TASKS & FEEDBACK */}
//           <section
//             style={
//               styles.section
//             }
//           >
//             <SectionTitle>
//               Tasks & Feedback
//             </SectionTitle>

//             <div
//               style={{
//                 ...styles.grid,
//                 gridTemplateColumns:
//                   isMobile
//                     ? "1fr"
//                     : "1fr 1fr",
//               }}
//             >

//               {/* ASSIGN TASKS */}
//               <ModalField
//                 label="Assign Tasks"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <textarea
//                   rows={4}
//                   style={{
//                     ...styles.input,
//                     resize:
//                       "vertical",
//                     minHeight: 120,
//                   }}
//                   value={
//                     form.tasks_given ||
//                     ""
//                   }
//                   onChange={updateField(
//                     "tasks_given"
//                   )}
//                   placeholder="Assign tasks for mentee..."
//                 />
//               </ModalField>

//               {/* TASK COMPLETION */}
//               <ModalField
//                 label="Task Completion"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <label
//                   style={
//                     styles.checkboxLabel
//                   }
//                 >
//                   <input
//                     type="checkbox"
//                     checked={
//                       form.task_completed
//                     }
//                     onChange={updateField(
//                       "task_completed"
//                     )}
//                     style={{
//                       width: 18,
//                       height: 18,
//                       accentColor:
//                         "#1a1a2e",
//                     }}
//                   />

//                   <span
//                     style={{
//                       color:
//                         "#475569",
//                       fontSize: 14,
//                       fontWeight: 500,
//                     }}
//                   >
//                     Mark task as
//                     completed
//                   </span>
//                 </label>
//               </ModalField>

//               {/* MENTOR DESCRIPTION */}
//               <ModalField
//                 label="Mentor Description"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <textarea
//                   rows={5}
//                   style={{
//                     ...styles.input,
//                     resize:
//                       "vertical",
//                     minHeight: 140,
//                   }}
//                   value={
//                     form.mentor_feedback
//                   }
//                   onChange={updateField(
//                     "mentor_feedback"
//                   )}
//                   placeholder="Write mentor notes, session summary, guidance..."
//                 />
//               </ModalField>

//               {/* MENTEE DESCRIPTION */}
//               <ModalField
//                 label="Mentee Description"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <textarea
//                   rows={5}
//                   readOnly
//                   style={{
//                     ...styles.readonlyInput,
//                     resize:
//                       "vertical",
//                     minHeight: 140,
//                     cursor:
//                       "not-allowed",
//                   }}
//                   value={
//                     session.mentee_feedback ||
//                     "No mentee feedback available."
//                   }
//                 />
//               </ModalField>

//               {/* MENTOR RATING */}
//               <ModalField
//                 label="Mentor Rating"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <Stars
//                   value={
//                     form.mentor_rating
//                   }
//                   onChange={(
//                     value
//                   ) =>
//                     setForm(
//                       (
//                         prev
//                       ) => ({
//                         ...prev,
//                         mentor_rating:
//                           value,
//                       })
//                     )
//                   }
//                 />
//               </ModalField>

//               {/* MENTEE RATING */}
//               <ModalField
//                 label="Mentee Rating"
//                 span2
//                 isMobile={
//                   isMobile
//                 }
//               >
//                 <div
//                   style={{
//                     padding:
//                       "14px 16px",

//                     borderRadius: 12,

//                     background:
//                       "#f8fafc",

//                     border:
//                       "1px solid #e5e7eb",

//                     display: "flex",
//                     alignItems:
//                       "center",

//                     gap: 10,
//                   }}
//                 >
//                   <Stars
//                     value={
//                       session.mentee_rating ||
//                       0
//                     }
//                     readonly
//                   />

//                   <span
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 700,
//                       color:
//                         "#64748b",
//                     }}
//                   >
//                     {session.mentee_rating ||
//                       0}
//                     /5
//                   </span>
//                 </div>
//               </ModalField>
//             </div>
//           </section>
//         </div>

//         {/* FOOTER */}
//         <div
//           style={{
//             ...styles.footer,
//             flexDirection:
//               isSmallMobile
//                 ? "column"
//                 : "row",
//             alignItems:
//               isSmallMobile
//                 ? "stretch"
//                 : "center",
//           }}
//         >
//           {saved && (
//             <div
//               style={
//                 styles.saved
//               }
//             >
//               Saved successfully
//             </div>
//           )}

//           <div
//             style={{
//               ...styles.footerBtns,
//               width:
//                 isSmallMobile
//                   ? "100%"
//                   : "auto",
//               flexDirection:
//                 isSmallMobile
//                   ? "column"
//                   : "row",
//             }}
//           >
//             <button
//               onClick={
//                 onClose
//               }
//               style={{
//                 ...styles.cancelBtn,
//                 width:
//                   isSmallMobile
//                     ? "100%"
//                     : "auto",
//               }}
//             >
//               Cancel
//             </button>

//             <button
//               onClick={
//                 handleSave
//               }
//               disabled={
//                 saving
//               }
//               style={{
//                 ...styles.saveBtn,
//                 width:
//                   isSmallMobile
//                     ? "100%"
//                     : "auto",

//                 opacity:
//                   saving
//                     ? 0.7
//                     : 1,
//               }}
//             >
//               {saving
//                 ? "Saving..."
//                 : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MODAL FIELD
// ========================= */

// function ModalField({
//   label,
//   children,
//   span2,
//   isMobile,
// }) {
//   return (
//     <div
//       style={{
//         gridColumn:
//           span2 &&
//             !isMobile
//             ? "span 2"
//             : "span 1",

//         width: "100%",
//         minWidth: 0,
//       }}
//     >
//       <label
//         style={{
//           display: "block",

//           fontSize: 11,

//           fontWeight: 800,

//           color: "#0083b1",

//           textTransform:
//             "uppercase",

//           letterSpacing:
//             "0.08em",

//           marginBottom: 8,

//           lineHeight: 1.5,
//         }}
//       >
//         {label}
//       </label>

//       {children}
//     </div>
//   );
// }

// /* =========================
//    SECTION TITLE
// ========================= */

// function SectionTitle({
//   children,
// }) {
//   return (
//     <p
//       style={{
//         fontSize: 11,
//         fontWeight: 800,
//         color: "#0083b1",

//         textTransform:
//           "uppercase",

//         letterSpacing:
//           "0.1em",

//         marginBottom: 16,
//       }}
//     >
//       {children}
//     </p>
//   );
// }

// /* =========================
//    STYLES
// ========================= */

// const styles = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     zIndex: 1000,

//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",

//     padding: 14,

//     background:
//       "rgba(0,0,0,0.45)",

//     backdropFilter:
//       "blur(4px)",
//   },

//   modal: {
//     width: "100%",
//     maxWidth: 850,

//     maxHeight: "95vh",

//     background: "#fff",

//     border:
//       "1px solid #e5e7eb",

//     overflow: "hidden",

//     display: "flex",
//     flexDirection: "column",

//     boxShadow:
//       "0 24px 80px rgba(0,0,0,0.16)",
//   },

//   header: {
//     display: "flex",
//     alignItems: "center",

//     gap: 14,

//     padding: "18px 22px",

//     borderBottom:
//       "1px solid #f1f5f9",

//     background: "#fff",
//   },

//   sessionNumber: {
//     width: 44,
//     height: 44,

//     borderRadius: 12,

//     background:
//       "#1a1a2e",

//     color: "#fff",

//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",

//     fontWeight: 800,
//     fontSize: 14,

//     flexShrink: 0,
//   },

//   title: {
//     margin: 0,

//     fontWeight: 700,

//     color: "#0083b1",

//     overflow: "hidden",

//     textOverflow:
//       "ellipsis",

//     whiteSpace: "nowrap",
//   },

//   date: {
//     margin:
//       "4px 0 0 0",

//     color: "#94a3b8",

//     fontSize: 12,
//   },

//   closeBtn: {
//     width: 36,
//     height: 36,

//     borderRadius: 10,

//     border:
//       "1px solid #e5e7eb",

//     background: "#fff",

//     color: "#64748b",

//     fontSize: 16,

//     cursor: "pointer",
//   },

//   body: {
//     flex: 1,
//     overflowY: "auto",

//     display: "flex",
//     flexDirection: "column",

//     gap: 28,
//   },

//   grid: {
//     display: "grid",
//     gap: 16,
//   },

//   input: {
//     width: "100%",

//     padding:
//       "12px 14px",

//     borderRadius: 12,

//     border:
//       "1px solid #dbe3ea",

//     background: "#fff",

//     fontSize: 14,

//     color: "#1a1a2e",

//     outline: "none",

//     boxSizing:
//       "border-box",
//   },

//   readonlyInput: {
//     width: "100%",

//     padding:
//       "12px 14px",

//     borderRadius: 12,

//     border:
//       "1px solid #e5e7eb",

//     background:
//       "#f8fafc",

//     fontSize: 14,

//     color: "#475569",

//     outline: "none",

//     boxSizing:
//       "border-box",
//   },

//   section: {
//     borderTop:
//       "1px solid #f1f5f9",

//     paddingTop: 24,
//   },

//   checkboxLabel: {
//     display: "flex",
//     alignItems: "center",

//     gap: 12,

//     flexWrap: "wrap",
//   },

//   footer: {
//     borderTop:
//       "1px solid #f1f5f9",

//     padding: "16px 22px",

//     background: "#fff",

//     display: "flex",

//     justifyContent:
//       "space-between",

//     gap: 14,
//   },

//   saved: {
//     fontSize: 13,
//     fontWeight: 600,
//     color: "#16a34a",
//   },

//   footerBtns: {
//     display: "flex",
//     gap: 10,
//   },

//   cancelBtn: {
//     padding:
//       "12px 18px",

//     borderRadius: 12,

//     border:
//       "1px solid #dbe3ea",

//     background: "#fff",

//     color: "#475569",

//     fontWeight: 600,

//     cursor: "pointer",
//   },

//   saveBtn: {
//     padding:
//       "12px 20px",

//     borderRadius: 12,

//     border: "none",

//     background:
//       "#1a1a2e",

//     color: "#fff",

//     fontWeight: 700,

//     cursor: "pointer",
//   },
// };

// // ─── Subscriber Modal ─────────────────────────────────────────────────────────

// function DetailRow({ label, value, valueStyle }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         gap: 16,
//         padding: "11px 0",
//         borderBottom: "1px solid #f8fafc",
//       }}
//     >
//       <span
//         style={{
//           fontSize: 11,
//           color: "#94a3b8",
//           fontWeight: 600,
//           flexShrink: 0,
//           textTransform: "uppercase",
//           letterSpacing: "0.04em",
//         }}
//       >
//         {label}
//       </span>
//       <span
//         style={{
//           fontSize: 13,
//           color: "#1a1a2e",
//           fontWeight: 600,
//           textAlign: "right",
//           ...valueStyle,
//         }}
//       >
//         {value ?? "—"}
//       </span>
//     </div>
//   );
// }

// function SubscriberModal({ sub, onClose }) {
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);
//   useEffect(() => {
//     const h = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", h);
//     return () => document.removeEventListener("keydown", h);
//   }, [onClose]);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 1000,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 16,
//         background: "rgba(15,23,42,0.45)",
//         backdropFilter: "blur(4px)",
//         animation: "fadeIn 0.2s ease",
//       }}
//       onClick={(e) => {
//         if (e.target === e.currentTarget) onClose();
//       }}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: 20,
//           width: "100%",
//           maxWidth: 480,
//           maxHeight: "90vh",
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
//           animation: "slideUp 0.25s ease",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "18px 22px",
//             borderBottom: "1px solid #f1f5f9",
//           }}
//         >
//           <h2
//             style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}
//           >
//             Subscriber Details
//           </h2>
//           <button
//             onClick={onClose}
//             style={{
//               width: 32,
//               height: 32,
//               borderRadius: 8,
//               border: "1.5px solid #e2e8f0",
//               background: "#fff",
//               cursor: "pointer",
//               fontSize: 18,
//               color: "#64748b",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             ×
//           </button>
//         </div>
//         <div style={{ overflowY: "auto", padding: "20px 22px", flex: 1 }}>
//           <DetailRow label="Mentee ID" value={shortId(sub.mentee_id)} />
//           <DetailRow label="Mentor ID" value={shortId(sub.mentor_id)} />
//           <DetailRow
//             label="Plan"
//             value={PLAN_LABELS[sub.plan_type] || sub.plan_type}
//             valueStyle={{ color: "#0083b1" }}
//           />
//           <DetailRow label="Total Sessions" value={sub.total_sessions} />
//           <DetailRow
//             label="Amount"
//             value={formatAmount(sub.amount)}
//             valueStyle={{ color: "#16a34a" }}
//           />
//           <DetailRow label="Start Date" value={formatDate(sub.subscribed_at)} />
//           <DetailRow
//             label="End Date"
//             value={formatDate(sub.subscription_end_date)}
//           />
//           <DetailRow label="Status" value={<StatusBadge status={sub.status} />} />
//         </div>
//         <div
//           style={{
//             padding: "14px 22px",
//             borderTop: "1px solid #f1f5f9",
//             display: "flex",
//             justifyContent: "flex-end",
//           }}
//         >
//           <button
//             onClick={onClose}
//             style={{
//               padding: "9px 24px",
//               borderRadius: 9,
//               border: "none",
//               background: "#1a1a2e",
//               color: "#fff",
//               fontWeight: 700,
//               fontSize: 13,
//               cursor: "pointer",
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Subscribers Table ────────────────────────────────────────────────────────

// function SubscribersTable({ subscribers, isLoading }) {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
//   const [selected, setSelected] = useState(null);

//   const paged = useMemo(
//     () => paginate(subscribers, page, pageSize),
//     [subscribers, page, pageSize]
//   );

//   const openModal = useCallback((sub) => setSelected(sub), []);
//   const closeModal = useCallback(() => setSelected(null), []);

//   return (
//     <>
//       <TableCard>
//         <div style={{ overflowX: "auto" }}>
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               tableLayout: "fixed",
//             }}
//           >
//             <colgroup>
//               <col style={{ width: 40 }} />
//               <col style={{ width: 120 }} />
//               <col style={{ width: 110 }} />
//               <col style={{ width: 90 }} />
//               <col style={{ width: 120 }} />
//               <col style={{ width: 110 }} />
//               <col style={{ width: 110 }} />
//               <col style={{ width: 100 }} />
//             </colgroup>
//             <thead>
//               <tr>
//                 {[
//                   "#",
//                   "Mentee ID",
//                   "Plan",
//                   "Sessions",
//                   "Amount",
//                   "Start Date",
//                   "Status",
//                 ].map((h) => (
//                   <Th key={h}>{h}</Th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <SkeletonRows cols={8} />
//               ) : paged.length === 0 ? (
//                 <EmptyState message="No subscribers found" />
//               ) : (
//                 paged.map((sub, idx) => (
//                   <SubscriberRow
//                     key={sub._id}
//                     sub={sub}
//                     idx={(page - 1) * pageSize + idx + 1}
//                     onView={openModal}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         <Pagination
//           page={page}
//           total={subscribers.length}
//           pageSize={pageSize}
//           onPage={setPage}
//           onPageSize={setPageSize}
//           isFetching={false}
//         />
//       </TableCard>
//       {selected && <SubscriberModal sub={selected} onClose={closeModal} />}
//     </>
//   );
// }


// const SubscriberRow = React.memo(function SubscriberRow({
//   sub,
//   idx,
//   onView,
// }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <tr
//       style={{
//         background: hovered ? "#f8fbff" : "#fff",
//         transition: "background 0.12s",
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <Td>
//         <span
//           style={{
//             fontSize: 12,
//             color: "#94a3b8",
//             fontWeight: 600,
//           }}
//         >
//           {idx}
//         </span>
//       </Td>

//       {/* USER NAME */}
//       <Td>
//         <span
//           style={{
//             fontSize: 13,
//             color: "#0083b1",
//             fontWeight: 700,
//           }}
//         >
//           {sub.user || "—"}
//         </span>
//       </Td>

//       <Td>
//         <span
//           style={{
//             fontSize: 12,
//             fontWeight: 700,
//             color: "#0083b1",
//           }}
//         >
//           {PLAN_LABELS[sub.plan_type] ||
//             sub.plan_type ||
//             "—"}
//         </span>
//       </Td>

//       <Td>
//         <span
//           style={{
//             fontSize: 13,
//             fontWeight: 600,
//             color: "#1a1a2e",
//           }}
//         >
//           {sub.total_sessions ?? "—"}
//         </span>
//       </Td>

//       <Td>
//         <span
//           style={{
//             fontSize: 13,
//             fontWeight: 700,
//             color: "#16a34a",
//           }}
//         >
//           {formatAmount(sub.amount)}
//         </span>
//       </Td>

//       <Td>
//         <span
//           style={{
//             fontSize: 12,
//             color: "#64748b",
//           }}
//         >
//           {formatDate(sub.subscribed_at)}
//         </span>
//       </Td>

//       <Td>
//         <StatusBadge status={sub.status} />
//       </Td>

//       {/* <Td>
//         <button
//           onClick={() => onView(sub)}
//           style={{
//             padding: "6px 14px",
//             borderRadius: 8,
//             border: "1.5px solid #0083b1",
//             background: "#fff",
//             color: "#0083b1",
//             fontSize: 11,
//             fontWeight: 700,
//             cursor: "pointer",
//             transition: "all 0.15s",
//             whiteSpace: "nowrap",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background =
//               "#0083b1";
//             e.currentTarget.style.color = "#fff";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background =
//               "#fff";
//             e.currentTarget.style.color =
//               "#0083b1";
//           }}
//         >
//           View
//         </button>
//       </Td> */}
//     </tr>
//   );
// });

// // ─── LEVEL 1: Mentee Cards ────────────────────────────────────────────────────


// function MenteeCard({ sub, index, onClick }) {
//   const [hovered, setHovered] = useState(false);

//   const completedCount = 0;

//   const totalSessions =
//     sub.total_sessions ?? 0;

//   const progress =
//     totalSessions > 0
//       ? (completedCount / totalSessions) * 100
//       : 0;

//   // USER NAME
//   const userName =
//     sub.user || "Unknown User";

//   // INITIALS FROM NAME
//   const initials = userName
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);

//   const planColor = {
//     one_month: {
//       bg: "#eff9fd",
//       color: "#0083b1",
//     },

//     three_months: {
//       bg: "#f0fdf6",
//       color: "#16a34a",
//     },

//     six_months: {
//       bg: "#fdf4ff",
//       color: "#9333ea",
//     },
//   }[sub.plan_type] ?? {
//     bg: "#f1f5f9",
//     color: "#64748b",
//   };

//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() =>
//         setHovered(true)
//       }
//       onMouseLeave={() =>
//         setHovered(false)
//       }
//       style={{
//         background: "#fff",
//         border: hovered
//           ? "1.5px solid #0083b1"
//           : "1.5px solid #e9edf2",

//         borderRadius: 16,
//         padding: "20px",
//         cursor: "pointer",
//         transition: "all 0.18s",

//         boxShadow: hovered
//           ? "0 4px 20px rgba(0,131,177,0.12)"
//           : "0 1px 6px rgba(0,0,0,0.04)",

//         transform: hovered
//           ? "translateY(-2px)"
//           : "none",

//         display: "flex",
//         flexDirection: "column",
//         gap: 14,
//       }}
//     >
//       {/* TOP */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 12,
//         }}
//       >
//         {/* AVATAR */}
//         <div
//           style={{
//             width: 44,
//             height: 44,
//             borderRadius: 12,

//             background:
//               "linear-gradient(135deg, #0083b1 0%, #005f82 100%)",

//             color: "#fff",
//             fontSize: 14,
//             fontWeight: 800,

//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",

//             flexShrink: 0,
//             letterSpacing: "0.02em",
//           }}
//         >
//           {initials}
//         </div>

//         {/* USER INFO */}
//         <div
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         >
//           <p
//             style={{
//               fontSize: 14,
//               fontWeight: 700,
//               color: "#1a1a2e",
//               margin: 0,

//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {userName}
//           </p>

//           <p
//             style={{
//               fontSize: 11,
//               color: "#94a3b8",
//               margin: "2px 0 0",
//             }}
//           >
//             {formatDate(
//               sub.subscribed_at
//             )}{" "}
//             —{" "}
//             {formatDate(
//               sub.subscription_end_date
//             )}
//           </p>
//         </div>

//         {/* CHEVRON */}
//         <svg
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke={
//             hovered
//               ? "#0083b1"
//               : "#cbd5e1"
//           }
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{
//             transition: "stroke 0.15s",
//             flexShrink: 0,
//           }}
//         >
//           <path d="M9 18l6-6-6-6" />
//         </svg>
//       </div>

//       {/* PILLS */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 8,
//         }}
//       >
//         <span
//           style={{
//             fontSize: 11,
//             fontWeight: 700,

//             padding: "4px 10px",
//             borderRadius: 20,

//             background: planColor.bg,
//             color: planColor.color,
//           }}
//         >
//           {PLAN_LABELS[sub.plan_type] ||
//             sub.plan_type}
//         </span>

//         <span
//           style={{
//             fontSize: 11,
//             fontWeight: 600,

//             padding: "4px 10px",
//             borderRadius: 20,

//             background: "#f8fafc",
//             color: "#64748b",
//           }}
//         >
//           {totalSessions} sessions
//         </span>

//         <span
//           style={{
//             fontSize: 11,
//             fontWeight: 700,

//             padding: "4px 10px",
//             borderRadius: 20,

//             background: "#f0fdf4",
//             color: "#16a34a",
//           }}
//         >
//           {formatAmount(sub.amount)}
//         </span>
//       </div>

//       {/* PROGRESS */}
//       <div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent:
//               "space-between",

//             alignItems: "center",
//             marginBottom: 6,
//           }}
//         >
//           <span
//             style={{
//               fontSize: 11,
//               color: "#94a3b8",
//               fontWeight: 600,
//             }}
//           >
//             Session Progress
//           </span>

//           <span
//             style={{
//               fontSize: 11,
//               color: "#0083b1",
//               fontWeight: 700,
//             }}
//           >
//             {completedCount}/
//             {totalSessions}
//           </span>
//         </div>

//         <div
//           style={{
//             height: 5,
//             background: "#f1f5f9",
//             borderRadius: 99,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               height: "100%",
//               width: `${progress}%`,

//               background:
//                 "linear-gradient(90deg, #0083b1, #00b4d8)",

//               borderRadius: 99,
//               transition:
//                 "width 0.4s ease",
//             }}
//           />
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent:
//             "space-between",
//         }}
//       >
//         <StatusBadge
//           status={sub.status}
//         />

//         <span
//           style={{
//             fontSize: 11,
//             color: hovered
//               ? "#0083b1"
//               : "#94a3b8",

//             fontWeight: 600,
//             transition: "color 0.15s",
//           }}
//         >
//           View sessions →
//         </span>
//       </div>
//     </div>
//   );
// }

// // ─── LEVEL 2: Sessions list for a selected mentee ─────────────────────────────

// function MenteeSessionsView({ sub, mentorId, onBack }) {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
//   const [selectedSession, setSelectedSession] = useState(null);

//   const [updateSession] = useUpdateByMentorSessionMutation();

//   const { data, isLoading, isFetching } = useGetSessionsByMentorQuery(
//     { mentorId, page, pageSize },
//     { skip: !mentorId }
//   );

//   const sessions = data?.data ?? [];
//   const pagination = data?.pagination ?? { total: 0, totalPages: 1 };

//   const handlePageSize = useCallback((newSize) => {
//     setPageSize(newSize);
//     setPage(1);
//   }, []);

//   const handleSave = useCallback(
//     async (session_id, form) => {
//       try {
//         await updateSession({ session_id, mentor_id: mentorId, ...form }).unwrap();
//         setSelectedSession((prev) => (prev ? { ...prev, ...form } : prev));
//         return true;
//       } catch {
//         return false;
//       }
//     },
//     [updateSession, mentorId]
//   );

//   const openModal = useCallback((s) => setSelectedSession(s), []);
//   const closeModal = useCallback(() => setSelectedSession(null), []);

//   return (
//     <>
//       {/* Breadcrumb */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           marginBottom: 20,
//           flexWrap: "wrap",
//         }}
//       >
//         <button
//           onClick={onBack}
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 6,
//             padding: "7px 14px",
//             borderRadius: 9,
//             border: "1.5px solid #e2e8f0",
//             background: "#fff",
//             color: "#0083b1",
//             fontSize: 12,
//             fontWeight: 700,
//             cursor: "pointer",
//             transition: "all 0.15s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = "#eff9fd";
//             e.currentTarget.style.borderColor = "#0083b1";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = "#fff";
//             e.currentTarget.style.borderColor = "#e2e8f0";
//           }}
//         >
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M15 18l-6-6 6-6" />
//           </svg>
//           All Mentees
//         </button>
//         <span style={{ color: "#cbd5e1", fontSize: 16 }}>/</span>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             background: "#f8fafc",
//             border: "1.5px solid #e9edf2",
//             borderRadius: 9,
//             padding: "7px 14px",
//           }}
//         >
//           <div
//             style={{
//               width: 20,
//               height: 20,
//               borderRadius: 6,
//               background: "#0083b1",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             <span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>
//               {shortId(sub.mentee_id).replace("…", "").toUpperCase().slice(0, 2)}
//             </span>
//           </div>
//           <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>
//             Mentee {shortId(sub.mentee_id)}
//           </span>
//           <span
//             style={{
//               fontSize: 11,
//               color: "#94a3b8",
//               borderLeft: "1px solid #e2e8f0",
//               paddingLeft: 8,
//               marginLeft: 2,
//             }}
//           >
//             {PLAN_LABELS[sub.plan_type]} · {sub.total_sessions} sessions
//           </span>
//         </div>
//       </div>

//       {/* Mentee summary strip */}
//       <div
//         style={{
//           background: "#eff9fd",
//           border: "1.5px solid #bae6fd",
//           borderRadius: 12,
//           padding: "12px 18px",
//           display: "flex",
//           alignItems: "center",
//           gap: 20,
//           marginBottom: 18,
//           flexWrap: "wrap",
//         }}
//       >
//         <div>
//           <p style={{ fontSize: 10, color: "#0083b1", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
//             Plan
//           </p>
//           <p style={{ fontSize: 13, color: "#1a1a2e", fontWeight: 700, margin: "2px 0 0" }}>
//             {PLAN_LABELS[sub.plan_type] || sub.plan_type}
//           </p>
//         </div>
//         <div style={{ width: 1, height: 30, background: "#bae6fd" }} />
//         <div>
//           <p style={{ fontSize: 10, color: "#0083b1", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
//             Total Sessions
//           </p>
//           <p style={{ fontSize: 13, color: "#1a1a2e", fontWeight: 700, margin: "2px 0 0" }}>
//             {pagination.total || sub.total_sessions}
//           </p>
//         </div>
//         <div style={{ width: 1, height: 30, background: "#bae6fd" }} />
//         <div>
//           <p style={{ fontSize: 10, color: "#0083b1", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
//             Amount
//           </p>
//           <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 700, margin: "2px 0 0" }}>
//             {formatAmount(sub.amount)}
//           </p>
//         </div>
//         <div style={{ width: 1, height: 30, background: "#bae6fd" }} />
//         <div>
//           <p style={{ fontSize: 10, color: "#0083b1", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
//             Valid Until
//           </p>
//           <p style={{ fontSize: 13, color: "#1a1a2e", fontWeight: 700, margin: "2px 0 0" }}>
//             {formatDate(sub.subscription_end_date)}
//           </p>
//         </div>
//         <div style={{ marginLeft: "auto" }}>
//           <StatusBadge status={sub.status} />
//         </div>
//       </div>

//       {/* Sessions Table */}
//       <TableCard>
//         <div style={{ overflowX: "auto" }}>
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               tableLayout: "fixed",
//             }}
//           >
//             <colgroup>
//               <col style={{ width: 44 }} />
//               <col />
//               <col style={{ width: 130 }} />
//               <col style={{ width: 90 }} />
//               <col style={{ width: 110 }} />
//               <col style={{ width: 100 }} />
//             </colgroup>
//             <thead>
//               <tr>
//                 {["#", "Session", "Date", "Duration", "Status", "Action"].map(
//                   (h) => (
//                     <Th key={h}>{h}</Th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading || isFetching ? (
//                 <SkeletonRows cols={6} rows={pageSize} />
//               ) : sessions.length === 0 ? (
//                 <EmptyState message="No sessions found" />
//               ) : (
//                 sessions.map((item, idx) => (
//                   <SessionRow
//                     key={item._id}
//                     item={item}
//                     idx={(page - 1) * pageSize + idx + 1}
//                     onView={openModal}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         <Pagination
//           page={page}
//           total={pagination.total}
//           pageSize={pageSize}
//           onPage={setPage}
//           onPageSize={handlePageSize}
//           isFetching={isFetching}
//         />
//       </TableCard>

//       {selectedSession && (
//         <SessionModal
//           session={selectedSession}
//           onClose={closeModal}
//           onSave={handleSave}
//         />
//       )}
//     </>
//   );
// }

// // ─── Session Row ──────────────────────────────────────────────────────────────

// const SessionRow = React.memo(function SessionRow({ item, idx, onView }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <tr
//       style={{
//         background: hovered ? "#f8fbff" : "#fff",
//         transition: "background 0.12s",
//         cursor: "pointer",
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={() => onView(item)}
//     >
//       <Td>
//         <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>
//           {idx}
//         </span>
//       </Td>
//       <Td>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <div
//             style={{
//               width: 30,
//               height: 30,
//               borderRadius: 8,
//               background: "#0083b1",
//               color: "#fff",
//               fontSize: 12,
//               fontWeight: 800,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             {item.session_number ?? "?"}
//           </div>
//           <span
//             style={{
//               fontSize: 13,
//               fontWeight: 600,
//               color: "#1a1a2e",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {item.session_title || `Session ${item.session_number}`}
//           </span>
//         </div>
//       </Td>
//       <Td>
//         <span style={{ fontSize: 12, color: "#64748b" }}>
//           {formatDate(item.session_date)}
//         </span>
//       </Td>
//       <Td>
//         <span style={{ fontSize: 12, color: "#64748b" }}>
//           {item.duration ? `${item.duration} min` : "—"}
//         </span>
//       </Td>
//       <Td>
//         <StatusBadge status={item.status} />
//       </Td>
//       <Td>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onView(item);
//           }}
//           style={{
//             padding: "6px 14px",
//             borderRadius: 8,
//             border: "1.5px solid #0083b1",
//             background: "#fff",
//             color: "#0083b1",
//             fontSize: 11,
//             fontWeight: 700,
//             cursor: "pointer",
//             transition: "all 0.15s",
//             whiteSpace: "nowrap",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = "#0083b1";
//             e.currentTarget.style.color = "#fff";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = "#fff";
//             e.currentTarget.style.color = "#0083b1";
//           }}
//         >
//           View
//         </button>
//       </Td>
//     </tr>
//   );
// });

// // ─── LEVEL 1: Mentee Grid View ────────────────────────────────────────────────

// function MenteeGridView({ subscribers, isLoading, onSelectMentee }) {
//   if (isLoading) {
//     return (
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           gap: 16,
//         }}
//       >
//         {Array.from({ length: 4 }).map((_, i) => (
//           <div
//             key={i}
//             style={{
//               background: "#fff",
//               border: "1.5px solid #e9edf2",
//               borderRadius: 16,
//               padding: 20,
//               height: 180,
//             }}
//           >
//             {[60, 40, 80, 100, 40].map((w, j) => (
//               <div
//                 key={j}
//                 style={{
//                   height: 10,
//                   borderRadius: 6,
//                   background:
//                     "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
//                   backgroundSize: "200% 100%",
//                   animation: "shimmer 1.4s infinite",
//                   width: `${w}%`,
//                   marginBottom: 12,
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (subscribers.length === 0) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           padding: "80px 20px",
//           background: "#fff",
//           border: "1.5px solid #e9edf2",
//           borderRadius: 18,
//         }}
//       >
//         <svg
//           width="48"
//           height="48"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#cbd5e1"
//           strokeWidth="1.5"
//           style={{ margin: "0 auto 12px" }}
//         >
//           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//           <circle cx="9" cy="7" r="4" />
//           <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//         </svg>
//         <p style={{ fontSize: 15, color: "#94a3b8", fontWeight: 500 }}>
//           No mentees yet
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//         gap: 16,
//       }}
//     >
//       {subscribers.map((sub, i) => (
//         <MenteeCard
//           key={sub._id}
//           sub={sub}
//           index={i}
//           onClick={() => onSelectMentee(sub)}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── Sessions Tab (orchestrates levels 1 + 2) ─────────────────────────────────

// function SessionsTab({ mentorId, subscribers, subLoading, sessionsOverview }) {
//   const [selectedMentee, setSelectedMentee] = useState(null);

//   const handleSelectMentee = useCallback((sub) => setSelectedMentee(sub), []);
//   const handleBack = useCallback(() => setSelectedMentee(null), []);

//   if (selectedMentee) {
//     return (
//       <MenteeSessionsView
//         sub={selectedMentee}
//         mentorId={mentorId}
//         onBack={handleBack}
//       />
//     );
//   }

//   return (
//     <MenteeGridView
//       subscribers={subscribers}
//       isLoading={subLoading}
//       onSelectMentee={handleSelectMentee}
//     />
//   );
// }

// // ─── Main Dashboard ───────────────────────────────────────────────────────────

// export default function MentorSessionsDashboard() {
//   const [activeTab, setActiveTab] = useState("sessions");
//   const mentorId = useMemo(() => getMentorId(), []);

//   const { data: subscribersResult, isLoading: subLoading } =
//     useGetSubscribersByMentorQuery(mentorId, { skip: !mentorId });

//   const { data: sessionsOverview } = useGetSessionsByMentorQuery(
//     { mentorId, page: 1, pageSize: DEFAULT_PAGE_SIZE },
//     { skip: !mentorId }
//   );

//   const subscribers = useMemo(
//     () => subscribersResult?.data ?? subscribersResult?.subscriptions ?? [],
//     [subscribersResult]
//   );

//   const overviewPagination = sessionsOverview?.pagination ?? {};
//   const totalSessions = overviewPagination.total ?? 0;
//   const completedSessions = useMemo(
//     () =>
//       (sessionsOverview?.data ?? []).filter((s) => s.status === "completed")
//         .length,
//     [sessionsOverview]
//   );
//   const pendingSessions = useMemo(
//     () =>
//       (sessionsOverview?.data ?? []).filter((s) => s.status === "pending")
//         .length,
//     [sessionsOverview]
//   );

//   const handleTab = useCallback((tab) => setActiveTab(tab), []);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//         @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
//         @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//         * { box-sizing: border-box; }
//         body { margin: 0; }
//         ::-webkit-scrollbar { width: 0px; height: 0px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: transparent; }
//         * { scrollbar-width: none; }
//       `}</style>

//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#f8fafc",
//           padding: "28px 20px",
//           fontFamily: "'DM Sans','Segoe UI',sans-serif",
//         }}
//       >
//         <div style={{ maxWidth: 1100, margin: "0 auto" }}>

//           {/* Header */}
//           <div style={{ marginBottom: 28 }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 marginBottom: 6,
//               }}
//             >
//               <div
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 12,
//                   background: "#0083b1",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#fff"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <rect x="3" y="4" width="18" height="18" rx="2" />
//                   <line x1="16" y1="2" x2="16" y2="6" />
//                   <line x1="8" y1="2" x2="8" y2="6" />
//                   <line x1="3" y1="10" x2="21" y2="10" />
//                 </svg>
//               </div>
//               <div>
//                 <h1
//                   style={{
//                     fontSize: 22,
//                     fontWeight: 800,
//                     color: "#1a1a2e",
//                     margin: 0,
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   Sessions Overview
//                 </h1>
//                 <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
//                   Manage your mentee sessions and subscriptions
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Metrics */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
//               gap: 12,
//               marginBottom: 24,
//             }}
//           >
//             <MetricCard
//               label="Mentees"
//               value={subscribers.length}
//               color="#0083b1"
//             />
//             <MetricCard
//               label="Total Sessions"
//               value={totalSessions}
//               color="#1a1a2e"
//             />
//             <MetricCard
//               label="Completed"
//               value={completedSessions}
//               color="#16a34a"
//             />
//             <MetricCard
//               label="Pending"
//               value={pendingSessions}
//               color="#d97706"
//             />
//           </div>

//           {/* Tabs */}
//           <div
//             style={{
//               display: "flex",
//               gap: 4,
//               background: "#fff",
//               border: "1.5px solid #e9edf2",
//               borderRadius: 12,
//               padding: 4,
//               width: "fit-content",
//               marginBottom: 22,
//             }}
//           >
//             {["sessions", "subscribers"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => handleTab(tab)}
//                 style={{
//                   padding: "8px 20px",
//                   borderRadius: 9,
//                   border: "none",
//                   background: activeTab === tab ? "#0083b1" : "transparent",
//                   color: activeTab === tab ? "#fff" : "#64748b",
//                   fontWeight: 700,
//                   fontSize: 13,
//                   cursor: "pointer",
//                   transition: "all 0.18s",
//                   textTransform: "capitalize",
//                   letterSpacing: "0.01em",
//                 }}
//               >
//                 {tab === "sessions"
//                   ? `Sessions${totalSessions ? ` (${totalSessions})` : ""}`
//                   : `Subscribers${subscribers.length ? ` (${subscribers.length})` : ""}`}
//               </button>
//             ))}
//           </div>

//           {/* Content */}
//           {activeTab === "subscribers" && (
//             <SubscribersTable
//               subscribers={subscribers}
//               isLoading={subLoading}
//             />
//           )}
//           {activeTab === "sessions" && (
//             <SessionsTab
//               mentorId={mentorId}
//               subscribers={subscribers}
//               subLoading={subLoading}
//               sessionsOverview={sessionsOverview}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  useGetSessionsByMentorQuery,
  useGetSubscribersByMentorQuery,
  useUpdateByMentorSessionMutation,
} from "./mysubcriberspislice";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 20];

const PLAN_LABELS = {
  one_month: "1 Month",
  three_months: "3 Months",
  six_months: "6 Months",
};

const STATUS_META = {
  pending: { label: "Pending", bg: "#eff9fd", color: "#0083b1", dot: "#0083b1" },
  completed: { label: "Completed", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
  cancelled: { label: "Cancelled", bg: "#fff5f5", color: "#dc2626", dot: "#dc2626" },
  missed: { label: "Missed", bg: "#fffbeb", color: "#d97706", dot: "#d97706" },
  active: { label: "Active", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
  approved: { label: "Approved", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
  onprocess: { label: "On Process", bg: "#eff6ff", color: "#2563eb", dot: "#2563eb" },
};

// ─── Utilities ────────────────────────────────────────────────────────────────

const getMentorId = () =>
  JSON.parse(localStorage.getItem("userData") || "{}")?._id ?? null;

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : "—";

const formatAmount = (a) =>
  a != null ? `₹${a.toLocaleString("en-IN")}` : "—";

const shortId = (id) => (id ? `…${id.slice(-6)}` : "—");

const paginate = (arr, page, size) =>
  arr.slice((page - 1) * size, page * size);

// ─── Stars (read-only display only) ──────────────────────────────────────────

function Stars({ value }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: 20,
            color: star <= value ? "#f59e0b" : "#e2e8f0",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const m = STATUS_META[status] ?? {
    label: status ?? "—",
    bg: "#f5f5f5",
    color: "#6b7280",
    dot: "#9ca3af",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: m.bg,
        color: m.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px 3px 7px",
        borderRadius: 20,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: m.dot,
          flexShrink: 0,
        }}
      />
      {m.label}
    </span>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

function MetricCard({ label, value, color, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid #e9edf2",
        borderRadius: 14,
        padding: "14px 20px",
        minWidth: 120,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <p
        style={{
          fontSize: 11,
          color: "#94a3b8",
          fontWeight: 600,
          marginBottom: 2,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        {icon && (
          <span style={{ fontSize: 14, color: color ?? "#1a1a2e" }}>
            {icon}
          </span>
        )}
        {label}
      </p>
      <p
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: color ?? "#1a1a2e",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ page, total, pageSize, onPage, onPageSize, isFetching }) {
  const totalPages = Math.ceil(total / pageSize) || 1;

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1)
        pages.push(i);
      else if (pages[pages.length - 1] !== "…") pages.push("…");
    }
    return pages;
  }, [page, totalPages]);

  if (totalPages <= 1 && total <= PAGE_SIZE_OPTIONS[0]) return null;

  const btn = (active, disabled) => ({
    minWidth: 32,
    height: 32,
    borderRadius: 8,
    border: active ? "1.5px solid #0083b1" : "1.5px solid #e2e8f0",
    background: active ? "#0083b1" : "#fff",
    color: active ? "#fff" : "#64748b",
    fontSize: 12,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    opacity: disabled ? 0.4 : 1,
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "14px 20px",
        borderTop: "1px solid #f1f5f9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Rows:</span>
        <select
          value={pageSize}
          onChange={(e) => {
            onPageSize(Number(e.target.value));
            onPage(1);
          }}
          style={{
            border: "1.5px solid #e2e8f0",
            borderRadius: 8,
            fontSize: 12,
            color: "#1a1a2e",
            padding: "4px 8px",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>
          {total === 0
            ? "0"
            : `${(page - 1) * pageSize + 1}–${Math.min(
              page * pageSize,
              total
            )}`}{" "}
          of {total}
        </span>
        {isFetching && (
          <span
            style={{
              fontSize: 11,
              color: "#0083b1",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
            </svg>
            Loading…
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button
          style={btn(false, page === 1)}
          disabled={page === 1 || isFetching}
          onClick={() => onPage(page - 1)}
        >
          ‹
        </button>
        {pageNumbers.map((p, i) =>
          p === "…" ? (
            <span
              key={`e${i}`}
              style={{ padding: "0 4px", color: "#94a3b8", fontSize: 12 }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              style={btn(p === page, isFetching)}
              disabled={isFetching}
              onClick={() => onPage(p)}
            >
              {p}
            </button>
          )
        )}
        <button
          style={btn(false, page === totalPages)}
          disabled={page === totalPages || isFetching}
          onClick={() => onPage(page + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

// ─── Table helpers ────────────────────────────────────────────────────────────

function TableCard({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid #e9edf2",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  );
}

function Th({ children }) {
  return (
    <th
      style={{
        padding: "12px 20px",
        textAlign: "left",
        fontSize: 11,
        fontWeight: 700,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        whiteSpace: "nowrap",
        background: "#fafbfc",
        borderBottom: "1.5px solid #f1f5f9",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, style }) {
  return (
    <td
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid #f8fafc",
        verticalAlign: "middle",
        ...style,
      }}
    >
      {children}
    </td>
  );
}

function SkeletonRows({ cols, rows = DEFAULT_PAGE_SIZE }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }).map((_, j) => (
        <td key={j} style={{ padding: "14px 20px" }}>
          <div
            style={{
              height: 12,
              borderRadius: 6,
              background:
                "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
              width: j === 0 ? 24 : j === 1 ? "60%" : "45%",
            }}
          />
        </td>
      ))}
    </tr>
  ));
}

function EmptyState({ message }) {
  return (
    <tr>
      <td colSpan={10} style={{ textAlign: "center", padding: "60px 20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          <p style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
}

// ─── Read-only field display ──────────────────────────────────────────────────

function ReadonlyField({ label, children }) {
  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 800,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
          lineHeight: 1.5,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── SESSION MODAL ────────────────────────────────────────────────────────────

function SessionModal({ session, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;

  // Only mentor-editable fields in form state
  const [form, setForm] = useState({
    session_title: session.session_title || "",
    session_date: session.session_date
      ? new Date(session.session_date).toISOString().slice(0, 16)
      : "",
    meeting_link: session.meeting_link || "",
    meeting_description: session.meeting_description || "",
    tasks_given: session.tasks_given || "",
    task_completed: session.task_completed || false,
    mentor_feedback: session.mentor_feedback || "",
    status: session.status || "pending",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const updateField = useCallback(
    (key) => (e) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    const success = await onSave(session._id, form);
    setSaving(false);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } else {
      setError("Failed to save. Please try again.");
    }
  }, [form, onSave, session._id]);

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #dbe3ea",
    background: "#fff",
    fontSize: 14,
    color: "#1a1a2e",
    outline: "none",
    boxSizing: "border-box",
  };

  const readonlyStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    fontSize: 14,
    color: "#475569",
    outline: "none",
    boxSizing: "border-box",
    cursor: "not-allowed",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 850,
          maxHeight: "95vh",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: isMobile ? 18 : 24,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.16)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 22px",
            borderBottom: "1px solid #f1f5f9",
            background: "#fff",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#1a1a2e",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {session.session_number}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#0083b1",
                fontSize: isMobile ? 15 : 18,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {form.session_title || `Session ${session.session_number}`}
            </p>
            <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 12 }}>
              {form.session_date
                ? new Date(form.session_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                : "No date set"}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StatusBadge status={form.status} />
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                background: "#fff",
                color: "#64748b",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            padding: isMobile ? 16 : 24,
          }}
        >
          {/* ── SECTION: Session Details (mentor editable) ── */}
          <section>
            <SectionTitle color="#0083b1">Session Details</SectionTitle>
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {/* Session Title — editable */}
              <ModalField label="Session Title" span2={!isMobile}>
                <input
                  style={inputStyle}
                  value={form.session_title}
                  onChange={updateField("session_title")}
                  placeholder="Introduction & Goal Setting"
                />
              </ModalField>

              {/* Date & Time — editable */}
              <ModalField label="Date & Time">
                <input
                  type="datetime-local"
                  style={inputStyle}
                  value={form.session_date}
                  onChange={updateField("session_date")}
                />
              </ModalField>

              {/* Status — editable */}
              <ModalField label="Status">
                <select
                  style={inputStyle}
                  value={form.status}
                  onChange={updateField("status")}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="missed">Missed</option>
                </select>
              </ModalField>

              {/* Meeting Link — editable */}
              <ModalField label="Meeting Link" span2={!isMobile}>
                <input
                  style={inputStyle}
                  value={form.meeting_link}
                  onChange={updateField("meeting_link")}
                  placeholder="https://meet.google.com"
                />
              </ModalField>

              {/* Meeting Description — editable by mentor */}
              <ModalField label="Agenda / Description" span2={!isMobile}>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                  value={form.meeting_description}
                  onChange={updateField("meeting_description")}
                  placeholder="Topics to discuss..."
                />
              </ModalField>
            </div>
          </section>

          {/* ── SECTION: Tasks (mentor editable) ── */}
          <section style={{ borderTop: "1px solid #f1f5f9", paddingTop: 24 }}>
            <SectionTitle color="#0083b1">Tasks</SectionTitle>
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {/* Assign Tasks — editable */}
              <ModalField label="Assign Tasks" span2={!isMobile}>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  value={form.tasks_given || ""}
                  onChange={updateField("tasks_given")}
                  placeholder="Assign tasks for mentee..."
                />
              </ModalField>

              {/* Task Completion — editable */}
              <ModalField label="Task Completion" span2={!isMobile}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    padding: "12px 14px",
                    border: "1px solid #dbe3ea",
                    borderRadius: 12,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.task_completed}
                    onChange={updateField("task_completed")}
                    style={{ width: 18, height: 18, accentColor: "#0083b1" }}
                  />
                  <span style={{ color: "#475569", fontSize: 14, fontWeight: 500 }}>
                    Mark task as completed
                  </span>
                  {session.task_submission && (
                    <a
                      href={session.task_submission}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        marginLeft: "auto",
                        fontSize: 11,
                        color: "#0083b1",
                        fontWeight: 700,
                        textDecoration: "none",
                        padding: "4px 10px",
                        border: "1px solid #0083b1",
                        borderRadius: 8,
                      }}
                    >
                      View Submission →
                    </a>
                  )}
                </label>
              </ModalField>
            </div>
          </section>

          {/* ── SECTION: Feedback ── */}
          <section style={{ borderTop: "1px solid #f1f5f9", paddingTop: 24 }}>
            <SectionTitle color="#0083b1">Feedback</SectionTitle>
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {/* Mentor Feedback — EDITABLE */}
              <ModalField label="Mentor Notes / Feedback" span2={!isMobile}>
                <textarea
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
                  value={form.mentor_feedback}
                  onChange={updateField("mentor_feedback")}
                  placeholder="Write session summary, guidance, notes..."
                />
              </ModalField>

              {/* Mentee Feedback — READ ONLY from API */}
              <ReadonlyField label="Mentee Feedback (read-only)">
                <textarea
                  rows={5}
                  readOnly
                  style={{
                    ...readonlyStyle,
                    resize: "vertical",
                    minHeight: 140,
                  }}
                  value={
                    session.mentee_feedback
                      ? session.mentee_feedback
                      : "No mentee feedback submitted yet."
                  }
                />
              </ReadonlyField>
            </div>
          </section>

          {/* ── SECTION: Ratings (both read-only from API) ── */}
          <section style={{ borderTop: "1px solid #f1f5f9", paddingTop: 24 }}>
            <SectionTitle color="#0083b1">Ratings</SectionTitle>
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {/* Mentor Rating — read-only from API */}
              <ReadonlyField label="Mentor Rating">
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Stars value={session.mentor_rating || 0} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>
                    {session.mentor_rating || 0}/5
                  </span>
                </div>
              </ReadonlyField>

              {/* Mentee Rating — read-only from API */}
              <ReadonlyField label="Mentee Rating">
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Stars value={session.mentee_rating || 0} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>
                    {session.mentee_rating || 0}/5
                  </span>
                </div>
              </ReadonlyField>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            padding: "16px 22px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: isSmallMobile ? "stretch" : "center",
            flexDirection: isSmallMobile ? "column" : "row",
            gap: 14,
          }}
        >
          <div>
            {saved && (
              <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>
                ✓ Saved successfully
              </span>
            )}
            {error && (
              <span style={{ fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
                ✕ {error}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              width: isSmallMobile ? "100%" : "auto",
              flexDirection: isSmallMobile ? "column" : "row",
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid #dbe3ea",
                background: "#fff",
                color: "#475569",
                fontWeight: 600,
                cursor: "pointer",
                width: isSmallMobile ? "100%" : "auto",
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                border: "none",
                background: "#1a1a2e",
                color: "#fff",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
                width: isSmallMobile ? "100%" : "auto",
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal helpers ────────────────────────────────────────────────────────────

function ModalField({ label, children, span2 }) {
  return (
    <div
      style={{
        gridColumn: span2 ? "span 2" : "span 1",
        width: "100%",
        minWidth: 0,
      }}
    >
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 800,
          color: "#0083b1",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
          lineHeight: 1.5,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionTitle({ children, color = "#0083b1" }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 800,
        color,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 16,
        marginTop: 0,
      }}
    >
      {children}
    </p>
  );
}

// ─── Subscriber Modal ─────────────────────────────────────────────────────────

function DetailRow({ label, value, valueStyle }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        padding: "11px 0",
        borderBottom: "1px solid #f8fafc",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "#94a3b8",
          fontWeight: 600,
          flexShrink: 0,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          color: "#1a1a2e",
          fontWeight: 600,
          textAlign: "right",
          ...valueStyle,
        }}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}

function SubscriberModal({ sub, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 480,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 22px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
            Subscriber Details
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1.5px solid #e2e8f0",
              background: "#fff",
              cursor: "pointer",
              fontSize: 18,
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "20px 22px", flex: 1 }}>
          <DetailRow label="Mentee ID" value={shortId(sub.mentee_id)} />
          <DetailRow label="Mentor ID" value={shortId(sub.mentor_id)} />
          <DetailRow
            label="Plan"
            value={PLAN_LABELS[sub.plan_type] || sub.plan_type}
            valueStyle={{ color: "#0083b1" }}
          />
          <DetailRow label="Total Sessions" value={sub.total_sessions} />
          <DetailRow
            label="Amount"
            value={formatAmount(sub.amount)}
            valueStyle={{ color: "#16a34a" }}
          />
          <DetailRow label="Start Date" value={formatDate(sub.subscribed_at)} />
          <DetailRow label="End Date" value={formatDate(sub.subscription_end_date)} />
          <DetailRow label="Status" value={<StatusBadge status={sub.status} />} />
        </div>
        <div
          style={{
            padding: "14px 22px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "9px 24px",
              borderRadius: 9,
              border: "none",
              background: "#1a1a2e",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Subscribers Table ────────────────────────────────────────────────────────

function SubscribersTable({ subscribers, isLoading }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  const paged = useMemo(
    () => paginate(subscribers, page, pageSize),
    [subscribers, page, pageSize]
  );

  const openModal = useCallback((sub) => setSelected(sub), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <>
      <TableCard>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}
          >
            <colgroup>
              <col style={{ width: 40 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 110 }} />
              <col style={{ width: 90 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 110 }} />
              <col style={{ width: 110 }} />
              <col style={{ width: 100 }} />
            </colgroup>
            <thead>
              <tr>
                {["#", "Mentee", "Plan", "Sessions", "Amount", "Start Date", "Status"].map(
                  (h) => <Th key={h}>{h}</Th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonRows cols={7} />
              ) : paged.length === 0 ? (
                <EmptyState message="No subscribers found" />
              ) : (
                paged.map((sub, idx) => (
                  <SubscriberRow
                    key={sub._id}
                    sub={sub}
                    idx={(page - 1) * pageSize + idx + 1}
                    onView={openModal}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          total={subscribers.length}
          pageSize={pageSize}
          onPage={setPage}
          onPageSize={setPageSize}
          isFetching={false}
        />
      </TableCard>
      {selected && <SubscriberModal sub={selected} onClose={closeModal} />}
    </>
  );
}

const SubscriberRow = React.memo(function SubscriberRow({ sub, idx, onView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      style={{ background: hovered ? "#f8fbff" : "#fff", transition: "background 0.12s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Td>
        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{idx}</span>
      </Td>
      <Td>
        <span style={{ fontSize: 13, color: "#0083b1", fontWeight: 700 }}>
          {sub.user || "—"}
        </span>
      </Td>
      <Td>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#0083b1" }}>
          {PLAN_LABELS[sub.plan_type] || sub.plan_type || "—"}
        </span>
      </Td>
      <Td>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>
          {sub.total_sessions ?? "—"}
        </span>
      </Td>
      <Td>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>
          {formatAmount(sub.amount)}
        </span>
      </Td>
      <Td>
        <span style={{ fontSize: 12, color: "#64748b" }}>
          {formatDate(sub.subscribed_at)}
        </span>
      </Td>
      <Td>
        <StatusBadge status={sub.status} />
      </Td>
    </tr>
  );
});

// ─── Mentee Card ─────────────────────────────────────────────────────────────

function MenteeCard({ sub, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  const totalSessions = sub.total_sessions ?? 0;
  const userName = sub.user || "Unknown User";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const planColor = {
    one_month: { bg: "#eff9fd", color: "#0083b1" },
    three_months: { bg: "#f0fdf6", color: "#16a34a" },
    six_months: { bg: "#fdf4ff", color: "#9333ea" },
  }[sub.plan_type] ?? { bg: "#f1f5f9", color: "#64748b" };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: hovered ? "1.5px solid #0083b1" : "1.5px solid #e9edf2",
        borderRadius: 16,
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.18s",
        boxShadow: hovered
          ? "0 4px 20px rgba(0,131,177,0.12)"
          : "0 1px 6px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, #0083b1 0%, #005f82 100%)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            letterSpacing: "0.02em",
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1a1a2e",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {userName}
          </p>
          <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>
            {formatDate(sub.subscribed_at)} — {formatDate(sub.subscription_end_date)}
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={hovered ? "#0083b1" : "#cbd5e1"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 0.15s", flexShrink: 0 }}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
            background: planColor.bg,
            color: planColor.color,
          }}
        >
          {PLAN_LABELS[sub.plan_type] || sub.plan_type}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 20,
            background: "#f8fafc",
            color: "#64748b",
          }}
        >
          {totalSessions} sessions
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
            background: "#f0fdf4",
            color: "#16a34a",
          }}
        >
          {formatAmount(sub.amount)}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StatusBadge status={sub.status} />
        <span
          style={{
            fontSize: 11,
            color: hovered ? "#0083b1" : "#94a3b8",
            fontWeight: 600,
            transition: "color 0.15s",
          }}
        >
          View sessions →
        </span>
      </div>
    </div>
  );
}

// ─── Mentee Sessions View ─────────────────────────────────────────────────────

function MenteeSessionsView({ sub, mentorId, onBack }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedSession, setSelectedSession] = useState(null);

  const [updateSession] = useUpdateByMentorSessionMutation();

  const { data, isLoading, isFetching, refetch } = useGetSessionsByMentorQuery(
    { mentorId, page, pageSize },
    { skip: !mentorId }
  );

  const sessions = data?.data ?? [];
  const pagination = data?.pagination ?? { total: 0, totalPages: 1 };

  const handlePageSize = useCallback((newSize) => {
    setPageSize(newSize);
    setPage(1);
  }, []);

  // ── Fixed handleSave: sends only mentor-editable fields ──
  const handleSave = useCallback(
    async (session_id, form) => {
      try {
        await updateSession({
          session_id,
          session_title: form.session_title,
          session_date: form.session_date,
          meeting_link: form.meeting_link,
          meeting_description: form.meeting_description,
          tasks_given: form.tasks_given,
          task_completed: form.task_completed,
          mentor_feedback: form.mentor_feedback,
          status: form.status,
        }).unwrap();

        // Update local modal state so UI reflects changes immediately
        setSelectedSession((prev) =>
          prev ? { ...prev, ...form } : prev
        );

        // Refetch so table updates
        refetch();
        return true;
      } catch (err) {
        console.error("Update session error:", err);
        return false;
      }
    },
    [updateSession, refetch]
  );

  const openModal = useCallback((s) => setSelectedSession(s), []);
  const closeModal = useCallback(() => setSelectedSession(null), []);

  return (
    <>
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 9,
            border: "1.5px solid #e2e8f0",
            background: "#fff",
            color: "#0083b1",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#eff9fd";
            e.currentTarget.style.borderColor = "#0083b1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          All Mentees
        </button>
        <span style={{ color: "#cbd5e1", fontSize: 16 }}>/</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#f8fafc",
            border: "1.5px solid #e9edf2",
            borderRadius: 9,
            padding: "7px 14px",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: "#0083b1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>
              {(sub.user || "??")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>
            {sub.user || shortId(sub.mentee_id)}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#94a3b8",
              borderLeft: "1px solid #e2e8f0",
              paddingLeft: 8,
              marginLeft: 2,
            }}
          >
            {PLAN_LABELS[sub.plan_type]} · {sub.total_sessions} sessions
          </span>
        </div>
      </div>

      {/* Mentee summary strip */}
      <div
        style={{
          background: "#eff9fd",
          border: "1.5px solid #bae6fd",
          borderRadius: 12,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Plan", value: PLAN_LABELS[sub.plan_type] || sub.plan_type },
          { label: "Total Sessions", value: pagination.total || sub.total_sessions },
          { label: "Amount", value: formatAmount(sub.amount), color: "#16a34a" },
          { label: "Valid Until", value: formatDate(sub.subscription_end_date) },
        ].map((item, i) => (
          <React.Fragment key={item.label}>
            {i > 0 && (
              <div style={{ width: 1, height: 30, background: "#bae6fd" }} />
            )}
            <div>
              <p
                style={{
                  fontSize: 10,
                  color: "#0083b1",
                  fontWeight: 700,
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: item.color || "#1a1a2e",
                  fontWeight: 700,
                  margin: "2px 0 0",
                }}
              >
                {item.value}
              </p>
            </div>
          </React.Fragment>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <StatusBadge status={sub.status} />
        </div>
      </div>

      {/* Sessions Table */}
      <TableCard>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}
          >
            <colgroup>
              <col style={{ width: 44 }} />
              <col />
              <col style={{ width: 130 }} />
              <col style={{ width: 90 }} />
              <col style={{ width: 110 }} />
              <col style={{ width: 100 }} />
            </colgroup>
            <thead>
              <tr>
                {["#", "Session", "Date", "Duration", "Status", "Action"].map((h) => (
                  <Th key={h}>{h}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <SkeletonRows cols={6} rows={pageSize} />
              ) : sessions.length === 0 ? (
                <EmptyState message="No sessions found" />
              ) : (
                sessions.map((item, idx) => (
                  <SessionRow
                    key={item._id}
                    item={item}
                    idx={(page - 1) * pageSize + idx + 1}
                    onView={openModal}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          total={pagination.total}
          pageSize={pageSize}
          onPage={setPage}
          onPageSize={handlePageSize}
          isFetching={isFetching}
        />
      </TableCard>

      {selectedSession && (
        <SessionModal
          session={selectedSession}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}

// ─── Session Row ──────────────────────────────────────────────────────────────

const SessionRow = React.memo(function SessionRow({ item, idx, onView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      style={{
        background: hovered ? "#f8fbff" : "#fff",
        transition: "background 0.12s",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onView(item)}
    >
      <Td>
        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{idx}</span>
      </Td>
      <Td>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#0083b1",
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {item.session_number ?? "?"}
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1a1a2e",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.session_title || `Session ${item.session_number}`}
          </span>
        </div>
      </Td>
      <Td>
        <span style={{ fontSize: 12, color: "#64748b" }}>
          {formatDate(item.session_date)}
        </span>
      </Td>
      <Td>
        <span style={{ fontSize: 12, color: "#64748b" }}>
          {item.duration ? `${item.duration} min` : "—"}
        </span>
      </Td>
      <Td>
        <StatusBadge status={item.status} />
      </Td>
      <Td>
        <button
          onClick={(e) => { e.stopPropagation(); onView(item); }}
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1.5px solid #0083b1",
            background: "#fff",
            color: "#0083b1",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0083b1";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#0083b1";
          }}
        >
          View
        </button>
      </Td>
    </tr>
  );
});

// ─── Mentee Grid View ─────────────────────────────────────────────────────────

function MenteeGridView({ subscribers, isLoading, onSelectMentee }) {
  if (isLoading) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1.5px solid #e9edf2",
              borderRadius: 16,
              padding: 20,
              height: 180,
            }}
          >
            {[60, 40, 80, 100, 40].map((w, j) => (
              <div
                key={j}
                style={{
                  height: 10,
                  borderRadius: 6,
                  background:
                    "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.4s infinite",
                  width: `${w}%`,
                  marginBottom: 12,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (subscribers.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "#fff",
          border: "1.5px solid #e9edf2",
          borderRadius: 18,
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          style={{ margin: "0 auto 12px" }}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <p style={{ fontSize: 15, color: "#94a3b8", fontWeight: 500 }}>
          No mentees yet
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {subscribers.map((sub, i) => (
        <MenteeCard
          key={sub._id}
          sub={sub}
          index={i}
          onClick={() => onSelectMentee(sub)}
        />
      ))}
    </div>
  );
}

// ─── Sessions Tab ─────────────────────────────────────────────────────────────

function SessionsTab({ mentorId, subscribers, subLoading, sessionsOverview }) {
  const [selectedMentee, setSelectedMentee] = useState(null);

  const handleSelectMentee = useCallback((sub) => setSelectedMentee(sub), []);
  const handleBack = useCallback(() => setSelectedMentee(null), []);

  if (selectedMentee) {
    return (
      <MenteeSessionsView
        sub={selectedMentee}
        mentorId={mentorId}
        onBack={handleBack}
      />
    );
  }

  return (
    <MenteeGridView
      subscribers={subscribers}
      isLoading={subLoading}
      onSelectMentee={handleSelectMentee}
    />
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function MentorSessionsDashboard() {
  const [activeTab, setActiveTab] = useState("sessions");
  const mentorId = useMemo(() => getMentorId(), []);

  const { data: subscribersResult, isLoading: subLoading } =
    useGetSubscribersByMentorQuery(mentorId, { skip: !mentorId });

  const { data: sessionsOverview } = useGetSessionsByMentorQuery(
    { mentorId, page: 1, pageSize: DEFAULT_PAGE_SIZE },
    { skip: !mentorId }
  );

  const subscribers = useMemo(
    () => subscribersResult?.data ?? subscribersResult?.subscriptions ?? [],
    [subscribersResult]
  );

  const overviewPagination = sessionsOverview?.pagination ?? {};
  const totalSessions = overviewPagination.total ?? 0;

  const completedSessions = useMemo(
    () => (sessionsOverview?.data ?? []).filter((s) => s.status === "completed").length,
    [sessionsOverview]
  );
  const pendingSessions = useMemo(
    () => (sessionsOverview?.data ?? []).filter((s) => s.status === "pending").length,
    [sessionsOverview]
  );

  const handleTab = useCallback((tab) => setActiveTab(tab), []);

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 0px; height: 0px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: transparent; }
        * { scrollbar-width: none; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "28px 20px",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "#0083b1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <h1
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Sessions Overview
                </h1>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
                  Manage your mentee sessions and subscriptions
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <MetricCard label="Mentees" value={subscribers.length} color="#0083b1" />
            <MetricCard label="Total Sessions" value={totalSessions} color="#1a1a2e" />
            <MetricCard label="Completed" value={completedSessions} color="#16a34a" />
            <MetricCard label="Pending" value={pendingSessions} color="#d97706" />
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "#fff",
              border: "1.5px solid #e9edf2",
              borderRadius: 12,
              padding: 4,
              width: "fit-content",
              marginBottom: 22,
            }}
          >
            {["sessions", "subscribers"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTab(tab)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9,
                  border: "none",
                  background: activeTab === tab ? "#0083b1" : "transparent",
                  color: activeTab === tab ? "#fff" : "#64748b",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.18s",
                  textTransform: "capitalize",
                  letterSpacing: "0.01em",
                }}
              >
                {tab === "sessions"
                  ? `Sessions${totalSessions ? ` (${totalSessions})` : ""}`
                  : `Subscribers${subscribers.length ? ` (${subscribers.length})` : ""}`}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "subscribers" && (
            <SubscribersTable subscribers={subscribers} isLoading={subLoading} />
          )}
          {activeTab === "sessions" && (
            <SessionsTab
              mentorId={mentorId}
              subscribers={subscribers}
              subLoading={subLoading}
              sessionsOverview={sessionsOverview}
            />
          )}
        </div>
      </div>
    </>
  );
}