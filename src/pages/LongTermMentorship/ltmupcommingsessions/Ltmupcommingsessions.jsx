

// import { useState, useEffect } from "react";
// import {
//   Layers, ClipboardCheck, CheckCircle2, Circle, AlertCircle,
//   Loader2, X, BookOpen, ClipboardList, MessageSquare,
//   ExternalLink, CheckCheck, Link2, Search, ChevronLeft, ChevronRight,
// } from "lucide-react";
// import {
//   useGetSessionsByMenteeQuery,
//   useUpdateByMenteeSessionMutation,
//   useSubmitTaskMutation,
// } from "./ltmupcommingsessionsapislice";

// // ── Constants ─────────────────────────────────────────────────────────────────
// const PAGE_SIZE = 10;
// const FONT = "'Cambria', 'Georgia', serif";

// // ── Helpers ───────────────────────────────────────────────────────────────────
// const fmtDate = (iso) =>
//   iso
//     ? new Date(iso).toLocaleDateString("en-IN", {
//         day: "numeric", month: "short", year: "numeric",
//       })
//     : "—";

// const getUserData = () => {
//   try { return JSON.parse(localStorage.getItem("userData") || "{}"); }
//   catch { return {}; }
// };

// // ── Global styles ─────────────────────────────────────────────────────────────
// const GLOBAL_CSS = `
//   *, *::before, *::after { box-sizing: border-box; }
//   body { margin: 0; }
//   ::-webkit-scrollbar { width: 0; height: 0; }
//   * { scrollbar-width: none; -ms-overflow-style: none; }
//   @keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//   @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
//   @keyframes slideUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes spin      { to{transform:rotate(360deg)} }
//   .ltm-spin { animation: spin 1s linear infinite; }
// `;

// // ── Shared primitives ─────────────────────────────────────────────────────────

// function Label({ children }) {
//   return (
//     <label style={{
//       display: "block",
//       fontSize: 10,
//       fontWeight: 700,
//       color: "#94a3b8",
//       textTransform: "uppercase",
//       letterSpacing: "0.09em",
//       marginBottom: 6,
//       fontFamily: FONT,
//     }}>
//       {children}
//     </label>
//   );
// }

// function FInp({ value, onChange, placeholder, type = "text", readOnly }) {
//   return (
//     <input
//       type={type}
//       value={value ?? ""}
//       onChange={onChange}
//       placeholder={placeholder}
//       readOnly={readOnly}
//       style={{
//         width: "100%",
//         fontSize: 13,
//         borderRadius: 10,
//         padding: "10px 13px",
//         border: "1.5px solid #e2e8f0",
//         outline: "none",
//         background: readOnly ? "#f8fafc" : "#fff",
//         color: readOnly ? "#94a3b8" : "#1e293b",
//         cursor: readOnly ? "default" : "text",
//         fontFamily: FONT,
//         transition: "border-color 0.15s",
//       }}
//       onFocus={(e) => { if (!readOnly) e.target.style.borderColor = "#0098cc"; }}
//       onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; }}
//     />
//   );
// }

// function FTxt({ value, onChange, placeholder, rows = 3, readOnly }) {
//   return (
//     <textarea
//       rows={rows}
//       value={value ?? ""}
//       onChange={onChange}
//       placeholder={placeholder}
//       readOnly={readOnly}
//       style={{
//         width: "100%",
//         fontSize: 13,
//         borderRadius: 10,
//         padding: "10px 13px",
//         border: "1.5px solid #e2e8f0",
//         outline: "none",
//         resize: "vertical",
//         lineHeight: 1.65,
//         background: readOnly ? "#f8fafc" : "#fff",
//         color: readOnly ? "#64748b" : "#1e293b",
//         cursor: readOnly ? "default" : "text",
//         fontFamily: FONT,
//         transition: "border-color 0.15s",
//       }}
//       onFocus={(e) => { if (!readOnly) e.target.style.borderColor = "#0098cc"; }}
//       onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; }}
//     />
//   );
// }

// function FSel({ value, onChange, children }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       style={{
//         width: "100%",
//         fontSize: 13,
//         borderRadius: 10,
//         padding: "10px 13px",
//         border: "1.5px solid #e2e8f0",
//         background: "#fff",
//         color: "#1e293b",
//         outline: "none",
//         cursor: "pointer",
//         fontFamily: FONT,
//       }}
//     >
//       {children}
//     </select>
//   );
// }

// // ── Star components ───────────────────────────────────────────────────────────

// function StarDisplay({ value, max = 5 }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
//       {Array.from({ length: max }).map((_, i) => (
//         <span key={i} style={{ fontSize: 15, color: i < (value || 0) ? "#f59e0b" : "#e2e8f0" }}>★</span>
//       ))}
//       <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginLeft: 5, fontFamily: FONT }}>
//         {value || 0}/{max}
//       </span>
//     </div>
//   );
// }

// function StarPicker({ value, onChange }) {
//   const [hov, setHov] = useState(0);
//   return (
//     <div style={{ display: "flex", gap: 5 }}>
//       {[1, 2, 3, 4, 5].map((n) => (
//         <button
//           key={n}
//           type="button"
//           onClick={() => onChange(n)}
//           onMouseEnter={() => setHov(n)}
//           onMouseLeave={() => setHov(0)}
//           style={{
//             fontSize: 24,
//             lineHeight: 1,
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             padding: 2,
//             color: n <= (hov || value || 0) ? "#f59e0b" : "#e2e8f0",
//             transition: "color 0.1s",
//           }}
//         >★</button>
//       ))}
//     </div>
//   );
// }

// // ── Status Badge ──────────────────────────────────────────────────────────────

// function StatusBadge({ status }) {
//   const map = {
//     pending:   { bg: "#eff9fd", color: "#0083b1", dot: "#0083b1", label: "Pending" },
//     completed: { bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a", label: "Completed" },
//     cancelled: { bg: "#fff5f5", color: "#dc2626", dot: "#dc2626", label: "Cancelled" },
//     missed:    { bg: "#fffbeb", color: "#d97706", dot: "#d97706", label: "Missed" },
//   };
//   const m = map[status] ?? { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8", label: status || "—" };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       background: m.bg, color: m.color,
//       fontSize: 11, fontWeight: 700, fontFamily: FONT,
//       padding: "3px 10px 3px 7px", borderRadius: 20, whiteSpace: "nowrap",
//     }}>
//       <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
//       {m.label}
//     </span>
//   );
// }

// // ── Section divider used inside modal ────────────────────────────────────────

// function ModalSection({ icon: Icon, title, children }) {
//   return (
//     <div style={{ marginBottom: 20 }}>
//       <div style={{
//         display: "flex", alignItems: "center", gap: 8,
//         marginBottom: 14,
//         paddingBottom: 10,
//         borderBottom: "1.5px solid #f1f5f9",
//       }}>
//         {Icon && <Icon size={13} style={{ color: "#0098cc", flexShrink: 0 }} />}
//         <span style={{
//           fontSize: 10, fontWeight: 800, color: "#0098cc",
//           textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT,
//         }}>
//           {title}
//         </span>
//       </div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// function Field({ label, children }) {
//   return (
//     <div>
//       <Label>{label}</Label>
//       {children}
//     </div>
//   );
// }

// // ── Session Modal ─────────────────────────────────────────────────────────────

// function SessionModal({ session, menteeId, onClose, onSave }) {
//   const [saving, setSaving] = useState(false);
//   const [tab, setTab] = useState("details");
//   const [savedOk, setSavedOk] = useState(false);

//   const [form, setForm] = useState({
//     mentee_meeting_description: session.mentee_meeting_description || "",
//     task_completed:             session.task_completed             || false,
//     task_submission:            session.task_submission            || "",
//     mentee_feedback:            session.mentee_feedback            || "",
//     mentee_rating:              session.mentee_rating              || 0,
//   });

//   const set = (key) => (e) =>
//     setForm((f) => ({
//       ...f,
//       [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
//     }));

//   const handleSave = async () => {
//     setSaving(true);
//     const ok = await onSave(session._id, menteeId, form);
//     setSaving(false);
//     if (ok) {
//       setSavedOk(true);
//       setTimeout(() => { setSavedOk(false); onClose(); }, 1200);
//     }
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     document.addEventListener("keydown", h);
//     return () => {
//       document.body.style.overflow = "";
//       document.removeEventListener("keydown", h);
//     };
//   }, [onClose]);

//   const TABS = [
//     { id: "details",  label: "Details",  Icon: BookOpen },
//     { id: "tasks",    label: "Tasks",    Icon: ClipboardList },
//     { id: "feedback", label: "Feedback", Icon: MessageSquare },
//   ];

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         style={{
//           position: "fixed", inset: 0, zIndex: 100,
//           background: "rgba(15,23,42,0.5)",
//           backdropFilter: "blur(5px)",
//           animation: "fadeIn 0.18s ease",
//         }}
//       />

//       {/* Modal */}
//       <div style={{
//         position: "fixed",
//         top: "50%", left: "50%",
//         transform: "translate(-50%, -50%)",
//         zIndex: 101,
//         width: "min(540px, calc(100vw - 24px))",
//         maxHeight: "calc(100vh - 40px)",
//         background: "#fff",
//         borderRadius: 22,
//         border: "1.5px solid #e2e8f0",
//         boxShadow: "0 24px 70px rgba(0,0,0,0.2)",
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//         animation: "slideUp 0.22s ease",
//         fontFamily: FONT,
//       }}>

//         {/* ── Header ── */}
//         <div style={{ padding: "18px 22px 0", flexShrink: 0 }}>
//           <div style={{
//             display: "flex", alignItems: "center",
//             justifyContent: "space-between", marginBottom: 16,
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
//               <div style={{
//                 width: 40, height: 40, borderRadius: 11,
//                 background: "#1a1a2e", color: "#fff",
//                 fontSize: 13, fontWeight: 700,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 flexShrink: 0, fontFamily: FONT,
//               }}>
//                 {String(session.session_number).padStart(2, "0")}
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <p style={{
//                   fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
//                   textTransform: "uppercase", color: "#94a3b8",
//                   margin: "0 0 3px", fontFamily: FONT,
//                 }}>
//                   Session {session.session_number}
//                 </p>
//                 <h2 style={{
//                   fontSize: 15, fontWeight: 700, color: "#0f172a",
//                   margin: 0, fontFamily: FONT,
//                   overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
//                 }}>
//                   {session.session_title || `Session ${session.session_number}`}
//                 </h2>
//               </div>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//               <StatusBadge status={session.status} />
//               <button
//                 onClick={onClose}
//                 style={{
//                   width: 32, height: 32, borderRadius: 8,
//                   background: "#f8fafc", border: "1.5px solid #e2e8f0",
//                   color: "#94a3b8", display: "flex",
//                   alignItems: "center", justifyContent: "center",
//                   cursor: "pointer",
//                 }}
//               ><X size={13} /></button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div style={{ display: "flex", borderBottom: "1.5px solid #f1f5f9" }}>
//             {TABS.map(({ id, label, Icon }) => (
//               <button
//                 key={id}
//                 onClick={() => setTab(id)}
//                 style={{
//                   display: "flex", alignItems: "center", gap: 6,
//                   padding: "9px 16px",
//                   fontSize: 11, fontWeight: 700, fontFamily: FONT,
//                   letterSpacing: "0.04em",
//                   border: "none",
//                   borderBottom: tab === id ? "2.5px solid #0098cc" : "2.5px solid transparent",
//                   marginBottom: -1.5,
//                   background: "transparent",
//                   color: tab === id ? "#0098cc" : "#94a3b8",
//                   cursor: "pointer", transition: "color 0.15s",
//                 }}
//               >
//                 <Icon size={11} />{label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── Body (scrollable, single column) ── */}
//         <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>

//           {/* ══ DETAILS TAB ══ */}
//           {tab === "details" && (
//             <>
//               {/* READ-ONLY info from mentor */}
//               <ModalSection icon={BookOpen} title="Session Info">
//                 <Field label="Session Title">
//                   <FInp value={session.session_title || `Session ${session.session_number}`} readOnly />
//                 </Field>
//                 <Field label="Date & Time">
//                   <FInp
//                     type="datetime-local"
//                     value={session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : ""}
//                     readOnly
//                   />
//                 </Field>
//                 <Field label="Status">
//                   <div style={{ display: "flex" }}>
//                     <StatusBadge status={session.status} />
//                   </div>
//                 </Field>
//                 {session.meeting_link && (
//                   <Field label="Meeting Link">
//                     <div style={{
//                       display: "flex", alignItems: "center", gap: 8,
//                       padding: "10px 13px",
//                       border: "1.5px solid #e2e8f0", borderRadius: 10,
//                       background: "#f8fafc",
//                     }}>
//                       <Link2 size={12} style={{ color: "#94a3b8", flexShrink: 0 }} />
//                       <a
//                         href={session.meeting_link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{
//                           fontSize: 13, color: "#0098cc", flex: 1,
//                           overflow: "hidden", textOverflow: "ellipsis",
//                           whiteSpace: "nowrap", textDecoration: "none",
//                           fontFamily: FONT,
//                         }}
//                       >
//                         {session.meeting_link}
//                       </a>
//                       <ExternalLink size={11} style={{ color: "#0098cc", flexShrink: 0 }} />
//                     </div>
//                   </Field>
//                 )}
//                 <Field label="Mentor's Description">
//                   <FTxt
//                     value={session.meeting_description || "No description provided."}
//                     rows={3}
//                     readOnly
//                   />
//                 </Field>
//               </ModalSection>

//               {/* EDITABLE by mentee */}
//               <ModalSection icon={MessageSquare} title="Your Notes">
//                 <Field label="Your Notes / Meeting Description">
//                   <FTxt
//                     value={form.mentee_meeting_description}
//                     onChange={set("mentee_meeting_description")}
//                     placeholder="Add your own notes about this session…"
//                     rows={4}
//                   />
//                 </Field>
//               </ModalSection>
//             </>
//           )}

//           {/* ══ TASKS TAB ══ */}
//           {tab === "tasks" && (
//             <>
//               <ModalSection icon={ClipboardList} title="Task Assigned">
//                 {session.tasks_given ? (
//                   <Field label="Task by Mentor">
//                     <FTxt value={session.tasks_given} rows={4} readOnly />
//                   </Field>
//                 ) : (
//                   <div style={{
//                     display: "flex", flexDirection: "column",
//                     alignItems: "center", padding: "24px 0", gap: 8,
//                   }}>
//                     <ClipboardList size={28} style={{ color: "#e2e8f0" }} />
//                     <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontFamily: FONT }}>
//                       No task assigned yet.
//                     </p>
//                   </div>
//                 )}
//               </ModalSection>

//               {session.tasks_given && (
//                 <>
//                   <ModalSection icon={CheckCircle2} title="Task Completion">
//                     <Field label="Mark Completion">
//                       <label style={{
//                         display: "flex", alignItems: "center", gap: 12,
//                         padding: "12px 14px",
//                         border: `1.5px solid ${form.task_completed ? "#bbf7d0" : "#e2e8f0"}`,
//                         borderRadius: 10,
//                         background: form.task_completed ? "#f0fdf4" : "#f8fafc",
//                         cursor: "pointer", transition: "all 0.2s",
//                       }}>
//                         <input
//                           type="checkbox"
//                           checked={form.task_completed}
//                           onChange={set("task_completed")}
//                           style={{ width: 16, height: 16, accentColor: "#16a34a", cursor: "pointer" }}
//                         />
//                         <span style={{
//                           fontSize: 13, fontFamily: FONT, fontWeight: 600,
//                           color: form.task_completed ? "#16a34a" : "#64748b",
//                         }}>
//                           {form.task_completed ? "Task completed ✓" : "Mark task as completed"}
//                         </span>
//                       </label>
//                     </Field>
//                   </ModalSection>

//                   <ModalSection icon={Link2} title="Submit Task">
//                     <Field label="Submission Link">
//                       <div style={{ position: "relative" }}>
//                         <Link2 size={12} style={{
//                           position: "absolute", left: 11,
//                           top: "50%", transform: "translateY(-50%)",
//                           color: "#94a3b8", pointerEvents: "none",
//                         }} />
//                         <input
//                           type="url"
//                           value={form.task_submission}
//                           onChange={set("task_submission")}
//                           placeholder="Paste Google Drive or GitHub link…"
//                           style={{
//                             width: "100%", fontSize: 13,
//                             borderRadius: 10,
//                             paddingLeft: 32, paddingRight: 13,
//                             paddingTop: 10, paddingBottom: 10,
//                             border: "1.5px solid #e2e8f0",
//                             background: "#fff", color: "#1e293b",
//                             outline: "none", fontFamily: FONT,
//                           }}
//                           onFocus={(e) => { e.target.style.borderColor = "#0098cc"; }}
//                           onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; }}
//                         />
//                       </div>
//                     </Field>

//                     {form.task_submission && (
//                       <div style={{
//                         display: "flex", alignItems: "center", gap: 8,
//                         padding: "10px 13px",
//                         background: "#f0fdf4", border: "1.5px solid #bbf7d0",
//                         borderRadius: 10,
//                       }}>
//                         <CheckCheck size={13} style={{ color: "#16a34a", flexShrink: 0 }} />
//                         <a
//                           href={form.task_submission}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{
//                             fontSize: 12, color: "#15803d", flex: 1,
//                             overflow: "hidden", textOverflow: "ellipsis",
//                             whiteSpace: "nowrap", textDecoration: "none",
//                             fontFamily: FONT,
//                           }}
//                         >
//                           {form.task_submission}
//                         </a>
//                         <ExternalLink size={11} style={{ color: "#16a34a", flexShrink: 0 }} />
//                       </div>
//                     )}

//                     {session.task_submission && !form.task_submission && (
//                       <p style={{
//                         fontSize: 11, color: "#94a3b8", margin: 0, fontFamily: FONT,
//                       }}>
//                         Previously submitted: <em>{session.task_submission}</em>
//                       </p>
//                     )}
//                   </ModalSection>
//                 </>
//               )}
//             </>
//           )}

//           {/* ══ FEEDBACK TAB ══ */}
//           {tab === "feedback" && (
//             <>
//               {/* Mentee writes */}
//               <ModalSection icon={MessageSquare} title="Your Feedback">
//                 <Field label="Feedback to Mentor">
//                   <FTxt
//                     value={form.mentee_feedback}
//                     onChange={set("mentee_feedback")}
//                     placeholder="Share your thoughts about the session…"
//                     rows={4}
//                   />
//                 </Field>
//                 <Field label="Rate Your Mentor">
//                   <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                     <StarPicker
//                       value={form.mentee_rating}
//                       onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))}
//                     />
//                     <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: FONT }}>
//                       {form.mentee_rating > 0 ? `${form.mentee_rating} / 5` : "Not rated"}
//                     </span>
//                   </div>
//                 </Field>
//               </ModalSection>

//               {/* Mentor's feedback (read-only) */}
//               {(session.mentor_feedback || session.mentor_rating > 0) && (
//                 <ModalSection icon={BookOpen} title="Mentor's Feedback">
//                   {session.mentor_feedback && (
//                     <Field label="Mentor Notes">
//                       <FTxt value={session.mentor_feedback} rows={4} readOnly />
//                     </Field>
//                   )}
//                   {session.mentor_rating > 0 && (
//                     <Field label="Mentor Rating">
//                       <div style={{ padding: "10px 0" }}>
//                         <StarDisplay value={session.mentor_rating} />
//                       </div>
//                     </Field>
//                   )}
//                 </ModalSection>
//               )}
//             </>
//           )}
//         </div>

//         {/* ── Footer ── */}
//         <div style={{
//           display: "flex", justifyContent: "space-between", alignItems: "center",
//           gap: 8, padding: "14px 22px",
//           borderTop: "1.5px solid #f1f5f9",
//           background: "#fafbfc", flexShrink: 0,
//         }}>
//           {savedOk && (
//             <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", fontFamily: FONT }}>
//               ✓ Saved successfully
//             </span>
//           )}
//           {!savedOk && <span />}

//           <div style={{ display: "flex", gap: 8 }}>
//             <button
//               onClick={onClose}
//               style={{
//                 padding: "9px 20px", borderRadius: 9,
//                 fontSize: 13, fontWeight: 600, fontFamily: FONT,
//                 background: "#fff", border: "1.5px solid #e2e8f0",
//                 color: "#64748b", cursor: "pointer",
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               style={{
//                 display: "flex", alignItems: "center", gap: 7,
//                 padding: "9px 22px", borderRadius: 9,
//                 fontSize: 13, fontWeight: 700, fontFamily: FONT,
//                 background: saving ? "#94a3b8" : "#1a1a2e",
//                 color: "#fff", border: "none",
//                 cursor: saving ? "not-allowed" : "pointer",
//                 transition: "background 0.15s",
//               }}
//             >
//               {saving
//                 ? <><Loader2 size={13} className="ltm-spin" /> Saving…</>
//                 : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // ── Toast ─────────────────────────────────────────────────────────────────────

// function Toast({ toast }) {
//   if (!toast) return null;
//   const ok = toast.type === "success";
//   return (
//     <div style={{
//       position: "fixed", bottom: 24, right: 24, zIndex: 200,
//       display: "flex", alignItems: "center", gap: 10,
//       padding: "12px 18px", background: "#fff", borderRadius: 12,
//       boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
//       border: `1.5px solid ${ok ? "#bbf7d0" : "#fecaca"}`,
//       fontSize: 13, fontWeight: 600, fontFamily: FONT,
//       color: ok ? "#16a34a" : "#dc2626",
//       animation: "fadeIn 0.2s ease",
//       maxWidth: "calc(100vw - 48px)",
//     }}>
//       {ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
//       {toast.msg}
//     </div>
//   );
// }

// // ── Skeleton ──────────────────────────────────────────────────────────────────

// function SkeletonRows({ cols = 7, rows = PAGE_SIZE }) {
//   return Array.from({ length: rows }).map((_, i) => (
//     <tr key={i}>
//       {Array.from({ length: cols }).map((_, j) => (
//         <td key={j} style={{ padding: "14px 16px" }}>
//           <div style={{
//             height: 11, borderRadius: 6,
//             background: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
//             backgroundSize: "200% 100%",
//             animation: "shimmer 1.4s infinite",
//             width: j === 0 ? 28 : j === 1 ? "65%" : "45%",
//           }} />
//         </td>
//       ))}
//     </tr>
//   ));
// }

// // ── Mobile Card ───────────────────────────────────────────────────────────────

// function MobileCard({ session, onClick }) {
//   const [pressed, setPressed] = useState(false);
//   const hasTask     = !!session.tasks_given;
//   const taskDone    = !!session.task_submission;

//   return (
//     <div
//       onClick={() => onClick(session)}
//       onTouchStart={() => setPressed(true)}
//       onTouchEnd={() => setPressed(false)}
//       style={{
//         background: pressed ? "#f8fafc" : "#fff",
//         border: "1.5px solid #e9edf2", borderRadius: 14,
//         padding: "14px 16px", cursor: "pointer",
//         transition: "all 0.15s",
//         boxShadow: pressed ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
//         fontFamily: FONT,
//       }}
//     >
//       <div style={{
//         display: "flex", alignItems: "flex-start",
//         justifyContent: "space-between", gap: 10, marginBottom: 10,
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
//           <div style={{
//             width: 34, height: 34, borderRadius: 9,
//             background: "#0098cc", color: "#fff",
//             fontSize: 12, fontWeight: 700, fontFamily: FONT,
//             display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//           }}>
//             {String(session.session_number).padStart(2, "0")}
//           </div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <p style={{
//               fontSize: 13, fontWeight: 700, color: "#0f172a",
//               margin: 0, fontFamily: FONT,
//               overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
//             }}>
//               {session.session_title || `Session ${session.session_number}`}
//             </p>
//             <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0", fontFamily: FONT }}>
//               {fmtDate(session.session_date)}
//             </p>
//           </div>
//         </div>
//         <StatusBadge status={session.status} />
//       </div>

//       <div style={{
//         display: "grid", gridTemplateColumns: "1fr 1fr",
//         gap: "8px 16px", marginBottom: 10,
//       }}>
//         {[
//           ["Task", hasTask ? (taskDone ? "Submitted ✓" : "Pending") : "None"],
//           ["Rating", session.mentee_rating ? `${session.mentee_rating}/5 ★` : "—"],
//         ].map(([l, v]) => (
//           <div key={l}>
//             <div style={{
//               fontSize: 9, fontWeight: 700, color: "#94a3b8",
//               textTransform: "uppercase", letterSpacing: "0.08em",
//               marginBottom: 2, fontFamily: FONT,
//             }}>{l}</div>
//             <div style={{ fontSize: 12, color: "#475569", fontWeight: 500, fontFamily: FONT }}>{v}</div>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <span style={{ fontSize: 11, color: "#0098cc", fontWeight: 700, fontFamily: FONT }}>
//           View Details →
//         </span>
//       </div>
//     </div>
//   );
// }

// // ── Server-driven Pagination Bar ──────────────────────────────────────────────

// function PaginationBar({ pagination, onPage }) {
//   if (!pagination || pagination.totalPages <= 1) return null;
//   const { page, totalPages, total, pageSize } = pagination;

//   const pages = [];
//   for (let i = 1; i <= totalPages; i++) {
//     if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
//     else if (pages[pages.length - 1] !== "…") pages.push("…");
//   }

//   const btnBase = {
//     height: 32, minWidth: 32, borderRadius: 8, fontSize: 12,
//     fontWeight: 600, fontFamily: FONT,
//     cursor: "pointer", display: "inline-flex",
//     alignItems: "center", justifyContent: "center",
//     transition: "all 0.15s", padding: "0 8px", border: "1.5px solid #e2e8f0",
//   };

//   return (
//     <div style={{
//       display: "flex", flexWrap: "wrap",
//       alignItems: "center", justifyContent: "space-between",
//       gap: 10, padding: "12px 16px",
//       borderTop: "1.5px solid #f1f5f9",
//     }}>
//       <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: FONT }}>
//         {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
//       </span>
//       <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
//         <button
//           onClick={() => onPage(page - 1)}
//           disabled={!pagination.hasPrevPage}
//           style={{
//             ...btnBase,
//             background: "#fff", color: "#64748b",
//             opacity: pagination.hasPrevPage ? 1 : 0.4,
//             cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
//           }}
//         ><ChevronLeft size={14} /></button>

//         {pages.map((p, i) =>
//           p === "…"
//             ? <span key={`e${i}`} style={{ color: "#94a3b8", fontSize: 12, padding: "0 4px" }}>…</span>
//             : <button
//                 key={p}
//                 onClick={() => onPage(p)}
//                 style={{
//                   ...btnBase,
//                   background: p === page ? "#0098cc" : "#fff",
//                   borderColor: p === page ? "#0098cc" : "#e2e8f0",
//                   color: p === page ? "#fff" : "#64748b",
//                 }}
//               >{p}</button>
//         )}

//         <button
//           onClick={() => onPage(page + 1)}
//           disabled={!pagination.hasNextPage}
//           style={{
//             ...btnBase,
//             background: "#fff", color: "#64748b",
//             opacity: pagination.hasNextPage ? 1 : 0.4,
//             cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
//           }}
//         ><ChevronRight size={14} /></button>
//       </div>
//     </div>
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────

// export default function Ltmupcommingsessions() {
//   const userData = getUserData();
//   const menteeId = userData?._id;

//   // ── Pagination + filter state (drives API call) ──
//   const [page, setPage]             = useState(1);
//   const [statusFilter, setStatusFilter] = useState("all");

//   // ── Local UI state ──
//   const [search, setSearch]         = useState("");
//   const [sortOrder, setSortOrder]   = useState("asc");  // session_number asc from server
//   const [editSession, setEditSession] = useState(null);
//   const [toast, setToast]           = useState(null);

//   const { data: result, isLoading, isError, isFetching } = useGetSessionsByMenteeQuery(
//     { mentee_id: menteeId, page, pageSize: PAGE_SIZE, status: statusFilter },
//     { skip: !menteeId }
//   );

//   const [updateSession] = useUpdateByMenteeSessionMutation();

//   // Reset to page 1 when filter changes
//   useEffect(() => { setPage(1); }, [statusFilter]);

//   const sessions    = result?.data       ?? [];
//   const pagination  = result?.pagination ?? null;

//   // Client-side search filter (within current page results)
//   const displayed = search.trim()
//     ? sessions.filter((s) => {
//         const q = search.toLowerCase();
//         return (
//           (s.session_title || "").toLowerCase().includes(q) ||
//           (s.meeting_description || "").toLowerCase().includes(q)
//         );
//       })
//     : sessions;

//   const totalCount    = pagination?.total ?? 0;
//   const tasksCompleted = sessions.filter((s) => s.task_completed).length;

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3500);
//   };

//   // ── Save handler: sends only mentee-editable fields ──
//   const handleSave = async (session_id, mentee_id, form) => {
//     try {
//       await updateSession({
//         session_id,
//         mentee_id,
//         mentee_meeting_description: form.mentee_meeting_description,
//         task_completed:             form.task_completed,
//         task_submission:            form.task_submission,
//         mentee_feedback:            form.mentee_feedback,
//         mentee_rating:              form.mentee_rating,
//       }).unwrap();
//       showToast("Session updated successfully.");
//       return true;
//     } catch {
//       showToast("Failed to update session.", "error");
//       return false;
//     }
//   };

//   return (
//     <>
//       <style>{GLOBAL_CSS}</style>

//       <div style={{
//         minHeight: "100vh",
//         background: "#f8fafc",
//         padding: "clamp(16px, 4vw, 28px)",
//         fontFamily: FONT,
//       }}>
//         <div style={{ maxWidth: 1100, margin: "0 auto" }}>

//           {/* ── Header ── */}
//           <div style={{ marginBottom: 22 }}>
//             <h1 style={{
//               fontSize: "clamp(18px, 4vw, 22px)",
//               fontWeight: 800, color: "#1a1a2e",
//               margin: 0, letterSpacing: "-0.02em", fontFamily: FONT,
//             }}>
//               My Sessions
//             </h1>
//             <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0", fontFamily: FONT }}>
//               Track and manage all your mentoring sessions
//             </p>
//           </div>

//           {/* ── Stat cards ── */}
//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
//             gap: 12, marginBottom: 20,
//           }}>
//             {[
//               { Icon: Layers,         label: "Total Sessions",   value: totalCount,                       color: "#1a1a2e" },
//               { Icon: ClipboardCheck, label: "Tasks Completed",  value: `${tasksCompleted}/${sessions.length}`, color: "#16a34a" },
//             ].map(({ Icon, label, value, color }) => (
//               <div key={label} style={{
//                 display: "flex", alignItems: "center", gap: 14,
//                 background: "#fff", border: "1.5px solid #e9edf2",
//                 borderRadius: 14, padding: "14px 18px",
//               }}>
//                 <div style={{
//                   width: 40, height: 40, borderRadius: 11,
//                   background: "#eff9fd",
//                   display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//                 }}>
//                   <Icon size={18} style={{ color: "#0098cc" }} />
//                 </div>
//                 <div>
//                   <p style={{
//                     fontSize: 9, fontWeight: 700, color: "#94a3b8",
//                     textTransform: "uppercase", letterSpacing: "0.08em",
//                     margin: "0 0 3px", fontFamily: FONT,
//                   }}>{label}</p>
//                   <p style={{ fontSize: 22, fontWeight: 800, color, margin: 0, lineHeight: 1.1, fontFamily: FONT }}>
//                     {value}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── Main panel ── */}
//           <div style={{
//             background: "#fff", border: "1.5px solid #e9edf2",
//             borderRadius: 18, overflow: "hidden",
//             boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
//           }}>

//             {/* Panel toolbar */}
//             <div style={{
//               padding: "16px 16px 14px",
//               borderBottom: "1.5px solid #f1f5f9",
//               display: "flex", flexWrap: "wrap",
//               alignItems: "center", gap: 10,
//             }}>
//               <h2 style={{
//                 fontSize: 15, fontWeight: 700, color: "#0098cc",
//                 margin: 0, fontFamily: FONT, marginRight: 4,
//               }}>
//                 Sessions
//                 {pagination && (
//                   <span style={{ fontSize: 12, fontWeight: 500, color: "#94a3b8", marginLeft: 8 }}>
//                     ({totalCount})
//                   </span>
//                 )}
//               </h2>

//               <div style={{ flex: 1 }} />

//               {/* Status filter */}
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 style={{
//                   fontSize: 12, borderRadius: 8, padding: "7px 10px",
//                   border: "1.5px solid #e2e8f0", background: "#fff",
//                   color: "#475569", outline: "none", cursor: "pointer",
//                   minWidth: 120, fontFamily: FONT,
//                 }}
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="completed">Completed</option>
//                 <option value="cancelled">Cancelled</option>
//                 <option value="missed">Missed</option>
//               </select>

//               {/* Search (client-side within page) */}
//               <div style={{ position: "relative" }}>
//                 <Search size={13} style={{
//                   position: "absolute", left: 10,
//                   top: "50%", transform: "translateY(-50%)",
//                   color: "#94a3b8", pointerEvents: "none",
//                 }} />
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search…"
//                   style={{
//                     width: 170, fontSize: 12, borderRadius: 8,
//                     paddingLeft: 30, paddingRight: 12,
//                     paddingTop: 7, paddingBottom: 7,
//                     border: "1.5px solid #e2e8f0",
//                     background: "#fff", color: "#1e293b",
//                     outline: "none", fontFamily: FONT,
//                     transition: "width 0.2s, border-color 0.15s",
//                   }}
//                   onFocus={(e) => {
//                     e.target.style.borderColor = "#0098cc";
//                     e.target.style.width = "200px";
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = "#e2e8f0";
//                     e.target.style.width = "170px";
//                   }}
//                 />
//               </div>

//               {/* Fetching spinner */}
//               {isFetching && !isLoading && (
//                 <Loader2 size={14} style={{ color: "#0098cc" }} className="ltm-spin" />
//               )}
//             </div>

//             {/* Loading */}
//             {isLoading && (
//               <div style={{
//                 display: "flex", flexDirection: "column",
//                 alignItems: "center", padding: "60px 20px", gap: 12,
//               }}>
//                 <Loader2 size={24} style={{ color: "#cbd5e1" }} className="ltm-spin" />
//                 <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontFamily: FONT }}>
//                   Loading sessions…
//                 </p>
//               </div>
//             )}

//             {/* Error */}
//             {isError && (
//               <div style={{
//                 display: "flex", alignItems: "center", gap: 10,
//                 margin: 16, padding: "12px 16px",
//                 background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 10,
//               }}>
//                 <AlertCircle size={14} style={{ color: "#dc2626", flexShrink: 0 }} />
//                 <p style={{ fontSize: 13, color: "#dc2626", margin: 0, fontFamily: FONT }}>
//                   Failed to load sessions. Please refresh.
//                 </p>
//               </div>
//             )}

//             {/* Empty */}
//             {!isLoading && !isError && displayed.length === 0 && (
//               <div style={{
//                 display: "flex", flexDirection: "column",
//                 alignItems: "center", padding: "60px 20px", gap: 10,
//               }}>
//                 <Layers size={28} style={{ color: "#e2e8f0" }} />
//                 <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontFamily: FONT }}>
//                   No sessions found.
//                 </p>
//               </div>
//             )}

//             {/* ── DESKTOP TABLE ── */}
//             {!isLoading && !isError && displayed.length > 0 && (
//               <div style={{ overflowX: "auto" }} className="desktop-table">
//                 <table style={{
//                   width: "100%", borderCollapse: "collapse",
//                   tableLayout: "fixed", minWidth: 680,
//                 }}>
//                   <colgroup>
//                     <col style={{ width: 44 }} />
//                     <col style={{ width: "22%" }} />
//                     <col style={{ width: 110 }} />
//                     <col />
//                     <col style={{ width: 110 }} />
//                     <col style={{ width: 100 }} />
//                     <col style={{ width: 130 }} />
//                   </colgroup>
//                   <thead>
//                     <tr>
//                       {["#", "Session", "Date", "Description", "Task Status", "Rating", "Feedback"].map((h) => (
//                         <th key={h} style={{
//                           padding: "11px 16px", textAlign: "left",
//                           fontSize: 9, fontWeight: 700, color: "#94a3b8",
//                           textTransform: "uppercase", letterSpacing: "0.08em",
//                           background: "#fafbfc", borderBottom: "1.5px solid #f1f5f9",
//                           whiteSpace: "nowrap", fontFamily: FONT,
//                         }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {isFetching
//                       ? <SkeletonRows cols={7} rows={PAGE_SIZE} />
//                       : displayed.map((session, i) => {
//                           const hasTask  = !!session.tasks_given;
//                           const taskDone = !!session.task_submission;
//                           return (
//                             <tr
//                               key={session._id}
//                               onClick={() => setEditSession(session)}
//                               style={{
//                                 borderBottom: "1px solid #f8fafc",
//                                 cursor: "pointer", transition: "background 0.12s",
//                               }}
//                               onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fbff"; }}
//                               onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
//                             >
//                               <td style={{ padding: "13px 16px" }}>
//                                 <span style={{
//                                   fontSize: 12, color: "#94a3b8",
//                                   fontWeight: 600, fontFamily: FONT,
//                                 }}>
//                                   {(page - 1) * PAGE_SIZE + i + 1}
//                                 </span>
//                               </td>
//                               <td style={{ padding: "13px 16px" }}>
//                                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

//                                   <span style={{
//                                     fontSize: 13, fontWeight: 600, color: "#1a1a2e",
//                                     overflow: "hidden", textOverflow: "ellipsis",
//                                     whiteSpace: "nowrap", fontFamily: FONT,
//                                   }}>
//                                     {session.session_title || `Session ${session.session_number}`}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td style={{ padding: "13px 16px" }}>
//                                 <span style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap", fontFamily: FONT }}>
//                                   {fmtDate(session.session_date)}
//                                 </span>
//                               </td>
//                               <td style={{ padding: "13px 16px" }}>
//                                 <p style={{
//                                   margin: 0, fontSize: 12, color: "#94a3b8",
//                                   overflow: "hidden", textOverflow: "ellipsis",
//                                   whiteSpace: "nowrap", fontFamily: FONT,
//                                 }}>
//                                   {session.meeting_description || "—"}
//                                 </p>
//                               </td>
//                               <td style={{ padding: "13px 16px" }}>
//                                 {hasTask
//                                   ? <span style={{
//                                       display: "inline-flex", alignItems: "center", gap: 5,
//                                       fontSize: 11, fontWeight: 700, fontFamily: FONT,
//                                       padding: "3px 9px 3px 7px", borderRadius: 20,
//                                       background: taskDone ? "#f0fdf6" : "#f8fafc",
//                                       color: taskDone ? "#16a34a" : "#64748b",
//                                       border: `1.5px solid ${taskDone ? "#bbf7d0" : "#e2e8f0"}`,
//                                       whiteSpace: "nowrap",
//                                     }}>
//                                       {taskDone
//                                         ? <><CheckCircle2 size={10} />Done</>
//                                         : <><Circle size={10} />Pending</>}
//                                     </span>
//                                   : <span style={{ color: "#e2e8f0", fontSize: 13 }}>—</span>}
//                               </td>
//                               <td style={{ padding: "13px 16px" }}>
//                                 {session.mentee_rating > 0
//                                   ? <StarDisplay value={session.mentee_rating} />
//                                   : <span style={{ color: "#e2e8f0", fontSize: 13 }}>—</span>}
//                               </td>
//                               <td style={{ padding: "13px 16px" }}>
//                                 <p style={{
//                                   margin: 0, fontSize: 12, color: "#94a3b8",
//                                   overflow: "hidden", textOverflow: "ellipsis",
//                                   whiteSpace: "nowrap", fontFamily: FONT,
//                                 }}>
//                                   {session.mentee_feedback || "—"}
//                                 </p>
//                               </td>
//                             </tr>
//                           );
//                         })}
//                   </tbody>
//                 </table>

//                 <PaginationBar pagination={pagination} onPage={setPage} />
//               </div>
//             )}

//             {/* ── MOBILE CARDS ── */}
//             {!isLoading && !isError && displayed.length > 0 && (
//               <div className="mobile-cards" style={{
//                 flexDirection: "column", gap: 10, padding: "14px",
//               }}>
//                 {displayed.map((session) => (
//                   <MobileCard key={session._id} session={session} onClick={setEditSession} />
//                 ))}

//                 {/* Mobile pagination */}
//                 {pagination && pagination.totalPages > 1 && (
//                   <div style={{
//                     display: "flex", alignItems: "center",
//                     justifyContent: "space-between", paddingTop: 8, gap: 10,
//                   }}>
//                     <button
//                       onClick={() => setPage((p) => Math.max(1, p - 1))}
//                       disabled={!pagination.hasPrevPage}
//                       style={{
//                         display: "flex", alignItems: "center", gap: 6,
//                         padding: "9px 16px", borderRadius: 9,
//                         fontSize: 12, fontWeight: 700, fontFamily: FONT,
//                         background: pagination.hasPrevPage ? "#1a1a2e" : "#f1f5f9",
//                         color: pagination.hasPrevPage ? "#fff" : "#94a3b8",
//                         border: "none",
//                         cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
//                       }}
//                     >
//                       <ChevronLeft size={14} />Prev
//                     </button>
//                     <span style={{
//                       fontSize: 12, color: "#94a3b8", fontWeight: 600, fontFamily: FONT,
//                     }}>
//                       {pagination.page} / {pagination.totalPages}
//                     </span>
//                     <button
//                       onClick={() => setPage((p) => p + 1)}
//                       disabled={!pagination.hasNextPage}
//                       style={{
//                         display: "flex", alignItems: "center", gap: 6,
//                         padding: "9px 16px", borderRadius: 9,
//                         fontSize: 12, fontWeight: 700, fontFamily: FONT,
//                         background: pagination.hasNextPage ? "#1a1a2e" : "#f1f5f9",
//                         color: pagination.hasNextPage ? "#fff" : "#94a3b8",
//                         border: "none",
//                         cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
//                       }}
//                     >
//                       Next<ChevronRight size={14} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── Modal ── */}
//       {editSession && (
//         <SessionModal
//           session={editSession}
//           menteeId={menteeId}
//           onClose={() => setEditSession(null)}
//           onSave={handleSave}
//         />
//       )}

//       <Toast toast={toast} />

//       {/* Responsive classes */}
//       <style>{`
//         .desktop-table { display: block; }
//         .mobile-cards  { display: none;  }
//         @media (max-width: 768px) {
//           .desktop-table { display: none;  }
//           .mobile-cards  { display: flex; }
//         }
//       `}</style>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import {
  Layers, ClipboardCheck, CheckCircle2, Circle, AlertCircle,
  Loader2, X, BookOpen, ClipboardList, MessageSquare,
  ExternalLink, CheckCheck, Link2, Search, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  useGetSessionsByMenteeQuery,
  useUpdateByMenteeSessionMutation,
} from "./ltmupcommingsessionsapislice";

// ── Constants ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;
const FONT = "'DM Sans', 'Segoe UI', sans-serif";

// Color tokens (from Code 2)
const C = {
  dark: "#1a1a2e",
  blue: "#0091c3",
  white: "#ffffff",
  bg: "#ffffff",
  border: "#e2e8f0",
  muted: "#94a3b8",
  text: "#1a1a2e",
  sub: "#475569",
  rowHov: "#f8fafc",
  th: "#1a1a2e",
  thText: "#ffffff",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    })
    : "—";

const getUserData = () => {
  try { return JSON.parse(localStorage.getItem("userData") || "{}"); }
  catch { return {}; }
};

// ── Global styles ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  .scroll-hide::-webkit-scrollbar { display: none; }
  .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .ltm-spin { animation: spin 1s linear infinite; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
`;

// ── Shared primitives ─────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <label style={{
      display: "block", fontSize: 10, fontWeight: 700,
      color: C.muted, textTransform: "uppercase",
      letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT,
    }}>
      {children}
    </label>
  );
}

function FInp({ value, onChange, placeholder, type = "text", readOnly }) {
  return (
    <input
      type={type} value={value ?? ""} onChange={onChange}
      placeholder={placeholder} readOnly={readOnly}
      style={{
        width: "100%", fontSize: 12, borderRadius: 8,
        padding: "8px 11px", border: `1px solid ${C.border}`,
        outline: "none", background: readOnly ? "#f8fafc" : C.white,
        color: readOnly ? C.muted : C.text,
        cursor: readOnly ? "default" : "text", fontFamily: FONT,
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => { if (!readOnly) e.target.style.borderColor = C.blue; }}
      onBlur={(e) => { e.target.style.borderColor = C.border; }}
    />
  );
}

function FTxt({ value, onChange, placeholder, rows = 3, readOnly }) {
  return (
    <textarea
      rows={rows} value={value ?? ""} onChange={onChange}
      placeholder={placeholder} readOnly={readOnly}
      style={{
        width: "100%", fontSize: 12, borderRadius: 8,
        padding: "8px 11px", border: `1px solid ${C.border}`,
        outline: "none", resize: "vertical", lineHeight: 1.6,
        background: readOnly ? "#f8fafc" : C.white,
        color: readOnly ? C.sub : C.text,
        cursor: readOnly ? "default" : "text", fontFamily: FONT,
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => { if (!readOnly) e.target.style.borderColor = C.blue; }}
      onBlur={(e) => { e.target.style.borderColor = C.border; }}
    />
  );
}

// ── Star components ───────────────────────────────────────────────────────────
function StarDisplay({ value, max = 5 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: 13, color: i < (value || 0) ? "#f59e0b" : C.border }}>★</span>
      ))}
      <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, marginLeft: 4, fontFamily: FONT }}>
        {value || 0}/{max}
      </span>
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}
          onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)}
          style={{
            fontSize: 20, lineHeight: 1, background: "transparent",
            border: "none", cursor: "pointer", padding: 2,
            color: n <= (hov || value || 0) ? "#f59e0b" : C.border,
            transition: "color 0.1s",
          }}
        >★</button>
      ))}
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pending: { color: "#0091c3", label: "Pending" },
    completed: { color: "#16a34a", label: "Completed" },
    cancelled: { color: "#6b7280", label: "Cancelled" },
    missed: { color: "#d97706", label: "Missed" },
  };
  const m = map[status] ?? { color: "#6b7280", label: status || "—" };
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, color: m.color, fontFamily: FONT,
    }}>
      {m.label}
    </span>
  );
}

// ── Modal Section ─────────────────────────────────────────────────────────────
function ModalSection({ icon: Icon, title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 7,
        marginBottom: 12, paddingBottom: 8,
        borderBottom: `1px solid ${C.border}`,
      }}>
        {Icon && <Icon size={12} style={{ color: C.blue, flexShrink: 0 }} />}
        <span style={{
          fontSize: 10, fontWeight: 800, color: C.blue,
           letterSpacing: "0.1em", fontFamily: FONT,
        }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

// ── Session Modal (compact) ───────────────────────────────────────────────────
function SessionModal({ session, menteeId, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("details");
  const [savedOk, setSavedOk] = useState(false);

  const [form, setForm] = useState({
    mentee_meeting_description: session.mentee_meeting_description || "",
    task_completed: session.task_completed || false,
    task_submission: session.task_submission || "",
    mentee_feedback: session.mentee_feedback || "",
    mentee_rating: session.mentee_rating || 0,
  });

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSave = async () => {
    setSaving(true);
    const ok = await onSave(session._id, menteeId, form);
    setSaving(false);
    if (ok) {
      setSavedOk(true);
      setTimeout(() => { setSavedOk(false); onClose(); }, 1200);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", h);
    };
  }, [onClose]);

  const TABS = [
    { id: "details", label: "Details", Icon: BookOpen },
    { id: "tasks", label: "Tasks", Icon: ClipboardList },
    { id: "feedback", label: "Feedback", Icon: MessageSquare },
  ];

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.15s ease",
      }} />

      {/* Modal — medium size */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 101,
        width: "min(480px, calc(100vw - 20px))",
        maxHeight: "calc(100vh - 48px)",
        background: C.white,
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        animation: "slideUp 0.2s ease",
        fontFamily: FONT,
      }}>

        {/* Header */}
        <div style={{ background: C.dark, padding: "14px 18px 0", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.12)", color: C.white,
                fontSize: 12, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontFamily: FONT,
              }}>
                {String(session.session_number).padStart(2, "0")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                   color: "rgba(255,255,255,0.5)",
                  margin: "0 0 2px", fontFamily: FONT,
                }}>
                  Session {session.session_number}
                </p>
                <h2 style={{
                  fontSize: 14, fontWeight: 700, color: C.white,
                  margin: 0, fontFamily: FONT,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {session.session_title || `Session ${session.session_number}`}
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span style={{
                fontSize: 11, fontWeight: 600, fontFamily: FONT,
                color: (() => {
                  const m = { pending: "#60c8e8", completed: "#4ade80", cancelled: "#9ca3af", missed: "#fbbf24" };
                  return m[session.status] || "#9ca3af";
                })(),
              }}>
                {session.status ? session.status.charAt(0).toUpperCase() + session.status.slice(1) : "—"}
              </span>
              <button onClick={onClose} style={{
                width: 28, height: 28, borderRadius: 6,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)", display: "flex",
                alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}><X size={12} /></button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex" }}>
            {TABS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setTab(id)} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "8px 14px", fontSize: 11, fontWeight: 700,
                fontFamily: FONT, letterSpacing: "0.04em",
                border: "none",
                borderBottom: tab === id ? `2px solid ${C.blue}` : "2px solid transparent",
                marginBottom: -1,
                background: "transparent",
                color: tab === id ? C.blue : "rgba(255,255,255,0.45)",
                cursor: "pointer", transition: "color 0.15s",
              }}>
                <Icon size={10} />{label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="scroll-hide" style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>

          {/* DETAILS */}
          {tab === "details" && (
            <>
              <ModalSection icon={BookOpen} title="Session Info">
                <Field label="Title">
                  <FInp value={session.session_title || `Session ${session.session_number}`} readOnly />
                </Field>
                <Field label="Date & Time">
                  <FInp
                    type="datetime-local"
                    value={session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : ""}
                    readOnly
                  />
                </Field>
                {session.meeting_link && (
                  <Field label="Meeting Link">
                    <div style={{
                      display: "flex", alignItems: "center", gap: 7,
                      padding: "8px 11px", border: `1px solid ${C.border}`,
                      borderRadius: 8, background: "#f8fafc",
                    }}>
                      <Link2 size={11} style={{ color: C.muted, flexShrink: 0 }} />
                      <a href={session.meeting_link} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontSize: 12, color: C.blue, flex: 1,
                          overflow: "hidden", textOverflow: "ellipsis",
                          whiteSpace: "nowrap", textDecoration: "none", fontFamily: FONT,
                        }}
                      >{session.meeting_link}</a>
                      <ExternalLink size={10} style={{ color: C.blue, flexShrink: 0 }} />
                    </div>
                  </Field>
                )}
                <Field label="Mentor's Description">
                  <FTxt value={session.meeting_description || "No description provided."} rows={3} readOnly />
                </Field>
              </ModalSection>

              <ModalSection icon={MessageSquare} title="Your Notes">
                <Field label="Notes">
                  <FTxt
                    value={form.mentee_meeting_description}
                    onChange={set("mentee_meeting_description")}
                    placeholder="Add your notes about this session…"
                    rows={3}
                  />
                </Field>
              </ModalSection>
            </>
          )}

          {/* TASKS */}
          {tab === "tasks" && (
            <>
              <ModalSection icon={ClipboardList} title="Task Assigned">
                {session.tasks_given ? (
                  <Field label="Task by Mentor">
                    <FTxt value={session.tasks_given} rows={3} readOnly />
                  </Field>
                ) : (
                  <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", padding: "20px 0", gap: 6,
                  }}>
                    <ClipboardList size={24} style={{ color: C.border }} />
                    <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: FONT }}>
                      No task assigned yet.
                    </p>
                  </div>
                )}
              </ModalSection>

              {session.tasks_given && (
                <>
                  <ModalSection icon={CheckCircle2} title="Task Completion">
                    <Field label="Mark Completion">
                      <label style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px",
                        border: `1px solid ${form.task_completed ? "#bbf7d0" : C.border}`,
                        borderRadius: 8,
                        background: form.task_completed ? "#f0fdf4" : "#f8fafc",
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                        <input
                          type="checkbox" checked={form.task_completed}
                          onChange={set("task_completed")}
                          style={{ width: 14, height: 14, accentColor: "#16a34a", cursor: "pointer" }}
                        />
                        <span style={{
                          fontSize: 12, fontFamily: FONT, fontWeight: 600,
                          color: form.task_completed ? "#16a34a" : C.sub,
                        }}>
                          {form.task_completed ? "Task completed ✓" : "Mark task as completed"}
                        </span>
                      </label>
                    </Field>
                  </ModalSection>

                  <ModalSection icon={Link2} title="Submit Task">
                    <Field label="Submission Link">
                      <div style={{ position: "relative" }}>
                        <Link2 size={11} style={{
                          position: "absolute", left: 10,
                          top: "50%", transform: "translateY(-50%)",
                          color: C.muted, pointerEvents: "none",
                        }} />
                        <input
                          type="url" value={form.task_submission}
                          onChange={set("task_submission")}
                          placeholder="Paste Google Drive or GitHub link…"
                          style={{
                            width: "100%", fontSize: 12, borderRadius: 8,
                            paddingLeft: 30, paddingRight: 11,
                            paddingTop: 8, paddingBottom: 8,
                            border: `1px solid ${C.border}`,
                            background: C.white, color: C.text,
                            outline: "none", fontFamily: FONT,
                          }}
                          onFocus={(e) => { e.target.style.borderColor = C.blue; }}
                          onBlur={(e) => { e.target.style.borderColor = C.border; }}
                        />
                      </div>
                    </Field>
                    {form.task_submission && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 7,
                        padding: "8px 11px", background: "#f0fdf4",
                        border: "1px solid #bbf7d0", borderRadius: 8,
                      }}>
                        <CheckCheck size={12} style={{ color: "#16a34a", flexShrink: 0 }} />
                        <a href={form.task_submission} target="_blank" rel="noopener noreferrer"
                          style={{
                            fontSize: 11, color: "#15803d", flex: 1,
                            overflow: "hidden", textOverflow: "ellipsis",
                            whiteSpace: "nowrap", textDecoration: "none", fontFamily: FONT,
                          }}
                        >{form.task_submission}</a>
                        <ExternalLink size={10} style={{ color: "#16a34a", flexShrink: 0 }} />
                      </div>
                    )}
                  </ModalSection>
                </>
              )}
            </>
          )}

          {/* FEEDBACK */}
          {tab === "feedback" && (
            <>
              <ModalSection icon={MessageSquare} title="Your Feedback">
                <Field label="Feedback to Mentor">
                  <FTxt
                    value={form.mentee_feedback}
                    onChange={set("mentee_feedback")}
                    placeholder="Share your thoughts about the session…"
                    rows={3}
                  />
                </Field>
                <Field label="Rate Your Mentor">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <StarPicker
                      value={form.mentee_rating}
                      onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))}
                    />
                    <span style={{ fontSize: 11, color: C.muted, fontFamily: FONT }}>
                      {form.mentee_rating > 0 ? `${form.mentee_rating} / 5` : "Not rated"}
                    </span>
                  </div>
                </Field>
              </ModalSection>

              {(session.mentor_feedback || session.mentor_rating > 0) && (
                <ModalSection icon={BookOpen} title="Mentor's Feedback">
                  {session.mentor_feedback && (
                    <Field label="Mentor Notes">
                      <FTxt value={session.mentor_feedback} rows={3} readOnly />
                    </Field>
                  )}
                  {session.mentor_rating > 0 && (
                    <Field label="Mentor Rating">
                      <div style={{ padding: "6px 0" }}>
                        <StarDisplay value={session.mentor_rating} />
                      </div>
                    </Field>
                  )}
                </ModalSection>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 8, padding: "12px 18px",
          borderTop: `1px solid ${C.border}`,
          background: "#fafbfc", flexShrink: 0,
        }}>
          {savedOk
            ? <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a", fontFamily: FONT }}>✓ Saved</span>
            : <span />
          }
          <div style={{ display: "flex", gap: 7 }}>
            <button onClick={onClose} style={{
              padding: "7px 16px", borderRadius: 7,
              fontSize: 12, fontWeight: 600, fontFamily: FONT,
              background: C.white, border: `1px solid ${C.border}`,
              color: C.sub, cursor: "pointer",
            }}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 18px", borderRadius: 7,
              fontSize: 12, fontWeight: 700, fontFamily: FONT,
              background: saving ? C.muted : C.dark,
              color: C.white, border: "none",
              cursor: saving ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}>
              {saving
                ? <><Loader2 size={12} className="ltm-spin" /> Saving…</>
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 200,
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 16px", background: C.white, borderRadius: 10,
      boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
      border: `1px solid ${ok ? "#bbf7d0" : "#fecaca"}`,
      fontSize: 12, fontWeight: 600, fontFamily: FONT,
      color: ok ? "#16a34a" : "#dc2626",
      animation: "fadeIn 0.2s ease",
      maxWidth: "calc(100vw - 40px)",
    }}>
      {ok ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
      {toast.msg}
    </div>
  );
}

// ── Skeleton rows ─────────────────────────────────────────────────────────────
function SkeletonRows({ cols = 7, rows = PAGE_SIZE }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }).map((_, j) => (
        <td key={j} style={{ padding: "13px 14px", background: C.white, borderBottom: `1px solid ${C.border}` }}>
          <div style={{
            height: 11, borderRadius: 4,
            background: "#f1f5f9",
            animation: "pulse 1.5s ease-in-out infinite",
            width: j === 0 ? 24 : j === 1 ? "65%" : "45%",
          }} />
        </td>
      ))}
    </tr>
  ));
}

// ── Mobile Card ───────────────────────────────────────────────────────────────
function MobileCard({ session, onClick }) {
  const [pressed, setPressed] = useState(false);
  const hasTask = !!session.tasks_given;
  const taskDone = !!session.task_submission;

  return (
    <div
      onClick={() => onClick(session)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        background: pressed ? "#f8fafc" : C.white,
        border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "12px 14px", cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: pressed ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
        fontFamily: FONT,
      }}
    >
      <div style={{
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", gap: 8, marginBottom: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 7,
            background: C.dark, color: C.white,
            fontSize: 11, fontWeight: 700, fontFamily: FONT,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {String(session.session_number).padStart(2, "0")}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 13, fontWeight: 700, color: C.text,
              margin: 0, fontFamily: FONT,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {session.session_title || `Session ${session.session_number}`}
            </p>
            <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0", fontFamily: FONT }}>
              {fmtDate(session.session_date)}
            </p>
          </div>
        </div>
        <StatusBadge status={session.status} />
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "6px 14px", marginBottom: 8,
      }}>
        {[
          ["Task", hasTask ? (taskDone ? "Submitted ✓" : "Pending") : "None"],
          ["Rating", session.mentee_rating ? `${session.mentee_rating}/5 ★` : "—"],
        ].map(([l, v]) => (
          <div key={l}>
            <div style={{
              fontSize: 9, fontWeight: 700, color: C.muted,
               letterSpacing: "0.08em",
              marginBottom: 2, fontFamily: FONT,
            }}>{l}</div>
            <div style={{ fontSize: 12, color: C.sub, fontWeight: 500, fontFamily: FONT }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11, color: C.blue, fontWeight: 700, fontFamily: FONT }}>
          View Details →
        </span>
      </div>
    </div>
  );
}

// ── Pagination Bar ────────────────────────────────────────────────────────────
function PBtn({ onClick, disabled, children, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "5px 10px", fontSize: 12,
        fontWeight: active ? 700 : 500,
        color: disabled ? "#cbd5e1" : active ? C.white : C.dark,
        background: active ? C.dark : C.white,
        border: `1px solid ${active ? C.dark : C.border}`,
        borderRadius: 6, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1, minWidth: 32, lineHeight: 1,
        transition: "all 0.15s", fontFamily: FONT,
      }}
    >{children}</button>
  );
}

function PaginationBar({ pagination, onPage }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages, total, pageSize, hasPrevPage, hasNextPage } = pagination;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
    .reduce((acc, n, i, arr) => {
      if (i > 0 && arr[i - 1] !== n - 1) acc.push("…");
      acc.push(n);
      return acc;
    }, []);

  return (
    <div style={{
      display: "flex", flexWrap: "wrap",
      alignItems: "center", justifyContent: "space-between",
      gap: 10, padding: "12px 14px",
      borderTop: `1px solid ${C.border}`,
    }}>
      <span style={{ fontSize: 12, color: C.muted, fontFamily: FONT }}>
        Page <b style={{ color: C.text }}>{page}</b> of{" "}
        <b style={{ color: C.text }}>{totalPages}</b>
        &nbsp;·&nbsp;
        <b style={{ color: C.text }}>{total}</b> sessions
      </span>
      <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
        <PBtn onClick={() => onPage(1)} disabled={!hasPrevPage}>«</PBtn>
        <PBtn onClick={() => onPage(page - 1)} disabled={!hasPrevPage}>‹ Prev</PBtn>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e${i}`} style={{ color: C.muted, fontSize: 12, padding: "0 4px" }}>…</span>
            : <PBtn key={p} onClick={() => onPage(p)} active={p === page}>{p}</PBtn>
        )}
        <PBtn onClick={() => onPage(page + 1)} disabled={!hasNextPage}>Next ›</PBtn>
        <PBtn onClick={() => onPage(totalPages)} disabled={!hasNextPage}>»</PBtn>
      </div>
    </div>
  );
}

// ── Table header/cell styles ──────────────────────────────────────────────────
const thStyle = {
  padding: "11px 14px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  color: C.thText,
  letterSpacing: "0.6px",

  whiteSpace: "nowrap",
  background: C.th,
  borderBottom: `1px solid ${C.border}`,
};

const tdStyle = {
  padding: "13px 14px",
  fontSize: 13,
  color: C.text,
  verticalAlign: "middle",
  borderBottom: `1px solid #f1f5f9`,
  whiteSpace: "nowrap",
  background: C.white,
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function Ltmupcommingsessions() {
  const userData = getUserData();
  const menteeId = userData?._id;

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editSession, setEditSession] = useState(null);
  const [toast, setToast] = useState(null);

  const { data: result, isLoading, isError, isFetching } = useGetSessionsByMenteeQuery(
    { mentee_id: menteeId, page, pageSize: PAGE_SIZE, status: statusFilter },
    { skip: !menteeId }
  );

  const [updateSession] = useUpdateByMenteeSessionMutation();

  useEffect(() => { setPage(1); }, [statusFilter]);

  const sessions = result?.data ?? [];
  const pagination = result?.pagination ?? null;

  const displayed = search.trim()
    ? sessions.filter((s) => {
      const q = search.toLowerCase();
      return (
        (s.session_title || "").toLowerCase().includes(q) ||
        (s.meeting_description || "").toLowerCase().includes(q)
      );
    })
    : sessions;

  const totalCount = pagination?.total ?? 0;
  const tasksCompleted = sessions.filter((s) => s.task_completed).length;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async (session_id, mentee_id, form) => {
    try {
      await updateSession({
        session_id, mentee_id,
        mentee_meeting_description: form.mentee_meeting_description,
        task_completed: form.task_completed,
        task_submission: form.task_submission,
        mentee_feedback: form.mentee_feedback,
        mentee_rating: form.mentee_rating,
      }).unwrap();
      showToast("Session updated successfully.");
      return true;
    } catch {
      showToast("Failed to update session.", "error");
      return false;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{
        minHeight: "100vh",
        background: C.bg,
        padding: "clamp(16px, 4vw, 24px)",
        fontFamily: FONT,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{
              fontSize: "clamp(16px, 4vw, 20px)",
              fontWeight: 700, color: C.text,
              margin: "0 0 3px", fontFamily: FONT,
            }}>
              Upcoming Sessions
            </h1>
            <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT }}>
              {isLoading ? "Loading…" : `${totalCount} total sessions`}
            </p>
          </div>

          {/* Stat cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: 10, marginBottom: 18,
          }}>
            {[
              { Icon: Layers, label: "Total Sessions", value: totalCount, color: C.text },
              { Icon: ClipboardCheck, label: "Tasks Completed", value: `${tasksCompleted}/${sessions.length}`, color: "#16a34a" },
            ].map(({ Icon, label, value, color }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: C.white, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "12px 16px",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: C.dark,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={16} style={{ color: C.white }} />
                </div>
                <div>
                  <p style={{
                    fontSize: 9, fontWeight: 700, color: C.muted,
                     letterSpacing: "0.08em",
                    margin: "0 0 2px", fontFamily: FONT,
                  }}>{label}</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color, margin: 0, lineHeight: 1.1, fontFamily: FONT }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 10, overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>

            {/* Toolbar */}
            <div style={{
              padding: "12px 14px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex", flexWrap: "wrap",
              alignItems: "center", gap: 8,
            }}>
              <h2 style={{
                fontSize: 14, fontWeight: 700, color: C.text,
                margin: 0, fontFamily: FONT, marginRight: 4,
              }}>
                Sessions
                {pagination && (
                  <span style={{ fontSize: 12, fontWeight: 400, color: C.muted, marginLeft: 6 }}>
                    ({totalCount})
                  </span>
                )}
              </h2>

              <div style={{ flex: 1 }} />

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  fontSize: 12, borderRadius: 7, padding: "6px 10px",
                  border: `1px solid ${C.border}`, background: C.white,
                  color: C.sub, outline: "none", cursor: "pointer",
                  minWidth: 110, fontFamily: FONT,
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="missed">Missed</option>
              </select>

              {/* Search */}
              <div style={{ position: "relative" }}>
                <Search size={12} style={{
                  position: "absolute", left: 9,
                  top: "50%", transform: "translateY(-50%)",
                  color: C.muted, pointerEvents: "none",
                }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search…"
                  style={{
                    width: 160, fontSize: 12, borderRadius: 7,
                    paddingLeft: 28, paddingRight: 10,
                    paddingTop: 6, paddingBottom: 6,
                    border: `1px solid ${C.border}`,
                    background: C.white, color: C.text,
                    outline: "none", fontFamily: FONT,
                    transition: "width 0.2s, border-color 0.15s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = C.blue;
                    e.target.style.width = "190px";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = C.border;
                    e.target.style.width = "160px";
                  }}
                />
              </div>

              {isFetching && !isLoading && (
                <Loader2 size={13} style={{ color: C.blue }} className="ltm-spin" />
              )}
            </div>

            {/* Loading */}
            {isLoading && (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", padding: "48px 20px", gap: 10,
              }}>
                <Loader2 size={22} style={{ color: "#cbd5e1" }} className="ltm-spin" />
                <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT }}>
                  Loading sessions…
                </p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                margin: 14, padding: "10px 14px",
                background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 8,
              }}>
                <AlertCircle size={13} style={{ color: "#dc2626", flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: "#dc2626", margin: 0, fontFamily: FONT }}>
                  Failed to load sessions. Please refresh.
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && displayed.length === 0 && (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", padding: "48px 20px", gap: 8,
              }}>
                <Layers size={24} style={{ color: C.border }} />
                <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT }}>
                  No sessions found.
                </p>
              </div>
            )}

            {/* DESKTOP TABLE */}
            {!isLoading && !isError && displayed.length > 0 && (
              <div className="scroll-hide desktop-table" style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%", borderCollapse: "collapse",
                  tableLayout: "fixed", minWidth: 680,
                }}>
                  <colgroup>
                    <col style={{ width: 44 }} />
                    <col style={{ width: "22%" }} />
                    <col style={{ width: 110 }} />
                    <col />
                    <col style={{ width: 110 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 130 }} />
                  </colgroup>
                  <thead style={{ background: C.th }}>
                    <tr>
                      {["S.No", "Session", "Date", "Description", "Task", "Rating", "Feedback"].map((h) => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isFetching
                      ? <SkeletonRows cols={7} rows={PAGE_SIZE} />
                      : displayed.map((session, i) => {
                        const hasTask = !!session.tasks_given;
                        const taskDone = !!session.task_submission;
                        return (
                          <tr
                            key={session._id}
                            onClick={() => setEditSession(session)}
                            style={{ cursor: "pointer", transition: "background 0.1s", opacity: isFetching ? 0.6 : 1 }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = C.rowHov; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = C.white; }}
                          >
                            <td style={{ ...tdStyle, color: C.muted, fontSize: 12 }}>
                              {(page - 1) * PAGE_SIZE + i + 1}
                            </td>
                            <td style={tdStyle}>
                              <span style={{
                                fontSize: 13, fontWeight: 600, color: C.text,
                                overflow: "hidden", textOverflow: "ellipsis",
                                whiteSpace: "nowrap", display: "block", fontFamily: FONT,
                              }}>
                                {session.session_title || `Session ${session.session_number}`}
                              </span>
                            </td>
                            <td style={{ ...tdStyle, color: C.sub }}>
                              {fmtDate(session.session_date)}
                            </td>
                            <td style={tdStyle}>
                              <p style={{
                                margin: 0, fontSize: 12, color: C.muted,
                                overflow: "hidden", textOverflow: "ellipsis",
                                whiteSpace: "nowrap", fontFamily: FONT,
                              }}>
                                {session.meeting_description || "—"}
                              </p>
                            </td>
                            <td style={tdStyle}>
                              {hasTask
                                ? <span style={{
                                  display: "inline-flex", alignItems: "center", gap: 4,
                                  fontSize: 11, fontWeight: 700, fontFamily: FONT,
                                  padding: "3px 8px", borderRadius: 5,
                                  background: taskDone ? "#f0fdf6" : "#f8fafc",
                                  color: taskDone ? "#16a34a" : C.sub,
                                  border: `1px solid ${taskDone ? "#bbf7d0" : C.border}`,
                                }}>
                                  {taskDone
                                    ? <><CheckCircle2 size={10} />Done</>
                                    : <><Circle size={10} />Pending</>}
                                </span>
                                : <span style={{ color: C.border }}>—</span>}
                            </td>
                            <td style={tdStyle}>
                              {session.mentee_rating > 0
                                ? <StarDisplay value={session.mentee_rating} />
                                : <span style={{ color: C.border }}>—</span>}
                            </td>
                            <td style={tdStyle}>
                              <p style={{
                                margin: 0, fontSize: 12, color: C.muted,
                                overflow: "hidden", textOverflow: "ellipsis",
                                whiteSpace: "nowrap", fontFamily: FONT,
                              }}>
                                {session.mentee_feedback || "—"}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <PaginationBar pagination={pagination} onPage={setPage} />
              </div>
            )}

            {/* MOBILE CARDS */}
            {!isLoading && !isError && displayed.length > 0 && (
              <div className="mobile-cards" style={{
                flexDirection: "column", gap: 8, padding: "12px",
              }}>
                {displayed.map((session) => (
                  <MobileCard key={session._id} session={session} onClick={setEditSession} />
                ))}
                {pagination && pagination.totalPages > 1 && (
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", paddingTop: 8, gap: 8,
                  }}>
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={!pagination.hasPrevPage}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "8px 14px", borderRadius: 7,
                        fontSize: 12, fontWeight: 700, fontFamily: FONT,
                        background: pagination.hasPrevPage ? C.dark : "#f1f5f9",
                        color: pagination.hasPrevPage ? C.white : C.muted,
                        border: "none",
                        cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
                      }}
                    >
                      <ChevronLeft size={13} />Prev
                    </button>
                    <span style={{ fontSize: 12, color: C.muted, fontWeight: 600, fontFamily: FONT }}>
                      {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={!pagination.hasNextPage}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "8px 14px", borderRadius: 7,
                        fontSize: 12, fontWeight: 700, fontFamily: FONT,
                        background: pagination.hasNextPage ? C.dark : "#f1f5f9",
                        color: pagination.hasNextPage ? C.white : C.muted,
                        border: "none",
                        cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
                      }}
                    >
                      Next<ChevronRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {editSession && (
        <SessionModal
          session={editSession}
          menteeId={menteeId}
          onClose={() => setEditSession(null)}
          onSave={handleSave}
        />
      )}

      <Toast toast={toast} />

      <style>{`
        .desktop-table { display: block; }
        .mobile-cards  { display: none; }
        @media (max-width: 768px) {
          .desktop-table { display: none; }
          .mobile-cards  { display: flex; }
        }
        table tr:last-child td { border-bottom: none; }
      `}</style>
    </>
  );
}


