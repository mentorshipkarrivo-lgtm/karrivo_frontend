


import React, { useState, useMemo, useCallback, useEffect } from "react";
import { X, User, Users, Mail, Phone, CalendarDays, CalendarX2, BookOpen, ClipboardList, CheckCircle2, CheckCheck, ExternalLink, MessageSquare, Link2 } from "lucide-react";
import {
  useGetSessionsByMentorQuery,
  useGetSubscribersByMentorQuery,
  useUpdateByMentorSessionMutation,
} from "./mysubcriberspislice";

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const DEFAULT_PAGE_SIZE = 10;

const PLAN_LABELS = {
  one_month: "1 Month",
  three_months: "3 Months",
  six_months: "6 Months",
};

const STATUS_META = {
  pending: { label: "Pending", bg: "#eff9fd", color: "#0c9dce", dot: "#0c9dce" },
  completed: { label: "Completed", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
  cancelled: { label: "Cancelled", bg: "#fff5f5", color: "#dc2626", dot: "#dc2626" },
  missed: { label: "Missed", bg: "#fffbeb", color: "#d97706", dot: "#d97706" },
  active: { label: "Active", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
  approved: { label: "Approved", bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a" },
  onprocess: { label: "On Process", bg: "#eff6ff", color: "#2563eb", dot: "#2563eb" },
};

const getMentorId = () =>
  JSON.parse(localStorage.getItem("userData") || "{}")?._id ?? null;

const fmt = {
  date: (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—",
  amount: (a) => (a != null ? `₹${a.toLocaleString("en-IN")}` : "—"),
};

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const m = STATUS_META[status] ?? { label: status ?? "—", bg: "#f5f5f5", color: "#6b7280", dot: "#9ca3af" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: m.bg, color: m.color,
      fontSize: 11, fontWeight: 600,
      padding: "3px 9px 3px 7px", borderRadius: 20,
      letterSpacing: "0.02em", whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
      {m.label}
    </span>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────

function Stars({ value = 0 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ fontSize: 18, color: s <= value ? "#f59e0b" : "#e2e8f0" }}>★</span>
      ))}
    </div>
  );
}

// ── Table primitives ──────────────────────────────────────────────────────────

function Th({ children }) {
  return (
    <th style={{
      padding: "11px 18px", textAlign: "left",
      fontSize: 11, fontWeight: 700, color: "#94a3b8",
      letterSpacing: "0.06em",
      whiteSpace: "nowrap", background: "#fafbfc",
      borderBottom: "1.5px solid #f1f5f9",
    }}>{children}</th>
  );
}

function Td({ children, style }) {
  return (
    <td style={{ padding: "13px 18px", borderBottom: "1px solid #f8fafc", verticalAlign: "middle", ...style }}>
      {children}
    </td>
  );
}

function SkeletonRows({ cols, rows = 6 }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }).map((_, j) => (
        <td key={j} style={{ padding: "13px 18px" }}>
          <div style={{
            height: 11, borderRadius: 6,
            background: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
            backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
            width: j === 0 ? 24 : j === 1 ? "60%" : "45%",
          }} />
        </td>
      ))}
    </tr>
  ));
}

function EmptyState({ message, cols }) {
  return (
    <tr>
      <td colSpan={cols} style={{ textAlign: "center", padding: "56px 20px" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"
          style={{ display: "block", margin: "0 auto 10px" }}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <p style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, margin: 0 }}>{message}</p>
      </td>
    </tr>
  );
}

function TableCard({ children }) {
  return (
    <div style={{
      background: "#fff", border: "1.5px solid #e9edf2",
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    }}>{children}</div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({ page, total, pageSize, onPage, onPageSize, isFetching }) {
  const totalPages = Math.ceil(total / pageSize) || 1;

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) arr.push(i);
      else if (arr[arr.length - 1] !== "…") arr.push("…");
    }
    return arr;
  }, [page, totalPages]);

  if (totalPages <= 1 && total <= PAGE_SIZE_OPTIONS[0]) return null;

  const btn = (active, disabled) => ({
    minWidth: 30, height: 30, borderRadius: 7,
    border: active ? `1.5px solid #0c9dce` : "1.5px solid #e2e8f0",
    background: active ? "#0c9dce" : "#fff",
    color: active ? "#fff" : "#1a1a2e",
    fontSize: 12, fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    opacity: disabled ? 0.4 : 1,
  });

  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center",
      justifyContent: "space-between", gap: 10,
      padding: "12px 18px", borderTop: "1px solid #f1f5f9",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Rows:</span>
        <select
          value={pageSize}
          onChange={e => { onPageSize(Number(e.target.value)); onPage(1); }}
          style={{ border: "1.5px solid #e2e8f0", borderRadius: 7, fontSize: 12, color: "#1a1a2e", padding: "3px 8px", background: "#fff" }}
        >
          {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>
          {total === 0 ? "0" : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)}`} of {total}
        </span>
        {isFetching && <span style={{ fontSize: 11, color: "#0c9dce", fontWeight: 600 }}>Loading…</span>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <button style={btn(false, page === 1)} disabled={page === 1 || isFetching} onClick={() => onPage(page - 1)}>‹</button>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e${i}`} style={{ padding: "0 4px", color: "#94a3b8", fontSize: 12 }}>…</span>
            : <button key={p} style={btn(p === page, isFetching)} disabled={isFetching} onClick={() => onPage(p)}>{p}</button>
        )}
        <button style={btn(false, page === totalPages)} disabled={page === totalPages || isFetching} onClick={() => onPage(page + 1)}>›</button>
      </div>
    </div>
  );
}

// ── Modal Field / Section (stable — defined outside modal) ────────────────────

function ModalField({ label, children, span2, isMobile }) {
  return (
    <div style={{ gridColumn: span2 && !isMobile ? "span 2" : "span 1", width: "100%", minWidth: 0 }}>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 800, color: "#0c9dce",
        letterSpacing: "0.08em", marginBottom: 7,
      }}>{label}</label>
      {children}
    </div>
  );
}

function ModalSection({ title, children, top, isMobile }) {
  return (
    <section style={top ? { borderTop: "1px solid #f1f5f9", paddingTop: 22 } : {}}>
      <p style={{
        fontSize: 11, fontWeight: 800, color: "#0c9dce",
        letterSpacing: "0.1em",
        marginBottom: 14, marginTop: 0,
      }}>{title}</p>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
        {children}
      </div>
    </section>
  );
}


// ── Lock helper ───────────────────────────────────────────────────────────────
function isSessionLocked(session) {
  if (session.status !== "completed") return false;
  const completedAt = session.updatedAt || session.session_date;
  if (!completedAt) return false;
  return Date.now() - new Date(completedAt).getTime() > 24 * 60 * 60 * 1000;
}


// ── Session Edit Modal (tabbed) ───────────────────────────────────────────────
// function SessionModal({ session, onClose, onSave }) {
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [tab, setTab] = useState("details");
//   const isMobile = window.innerWidth < 768;

//   const [form, setForm] = useState({
//     session_title: session.session_title || "",
//     session_date: session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : "",
//     meeting_link: session.meeting_link || "",
//     meeting_description: session.meeting_description || "",
//     tasks_given: session.tasks_given || "",
//     task_completed: session.task_completed || false,
//     mentor_feedback: session.mentor_feedback || "",
//     status: session.status || "pending",
//   });

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);

//   useEffect(() => {
//     const fn = (e) => { if (e.key === "Escape") onClose(); };
//     document.addEventListener("keydown", fn);
//     return () => document.removeEventListener("keydown", fn);
//   }, [onClose]);

//   const handleChange = useCallback((key) => (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
//     }));
//   }, []);

//   const handleSave = useCallback(async () => {
//     setSaving(true); setError(null);
//     const ok = await onSave(session._id, form);
//     setSaving(false);
//     if (ok) { onClose(); }
//     else { setError("Failed to save. Please try again."); }
//   }, [form, onSave, session._id, onClose]);

//   const FONT = "'DM Sans','Segoe UI',sans-serif";
//   const C = {
//     dark: "#1a1a2e", blue: "#0091c3", white: "#ffffff",
//     border: "#e2e8f0", muted: "#94a3b8", text: "#1a1a2e", sub: "#475569",
//   };

//   const inp = {
//     width: "100%", padding: "8px 11px", borderRadius: 8,
//     border: `1px solid ${C.border}`, background: C.white,
//     fontSize: 12, color: C.text, outline: "none",
//     fontFamily: FONT, transition: "border-color 0.15s",
//   };
//   const ro = { ...inp, background: "#f8fafc", color: C.muted, cursor: "default" };

//   const TABS = [
//     { id: "details", label: "Details", Icon: BookOpen },
//     { id: "tasks", label: "Tasks", Icon: ClipboardList },
//     { id: "feedback", label: "Feedback", Icon: MessageSquare },
//   ];

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         style={{
//           position: "fixed", inset: 0, zIndex: 1000,
//           background: "rgba(15,23,42,0.45)",
//           backdropFilter: "blur(4px)",
//           animation: "fadeIn 0.15s ease",
//         }}
//       />

//       {/* Modal */}
//       <div style={{
//         position: "fixed",
//         top: "50%", left: "50%",
//         transform: "translate(-50%,-50%)",
//         zIndex: 1001,
//         width: isMobile ? "70%" : "60%",
//         maxHeight: "calc(100vh - 48px)",
//         background: C.white,
//         borderRadius: 14,
//         border: `1px solid ${C.border}`,
//         boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
//         display: "flex", flexDirection: "column",
//         overflow: "hidden",
//         animation: "slideUp 0.2s ease",
//         fontFamily: FONT,
//       }}>

//         {/* Header + Tabs */}
//         <div style={{ background: C.dark, padding: "14px 18px 0", flexShrink: 0 }}>
//           <div style={{
//             display: "flex", alignItems: "center",
//             justifyContent: "space-between", marginBottom: 12,
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
//               <div style={{
//                 width: 34, height: 34, borderRadius: 8,
//                 background: "rgba(255,255,255,0.12)", color: C.white,
//                 fontSize: 12, fontWeight: 700, fontFamily: FONT,
//                 display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//               }}>
//                 {String(session.session_number).padStart(2, "0")}
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <h2 style={{
//                   fontSize: 14, fontWeight: 700, color: C.white,
//                   margin: 0, fontFamily: FONT,
//                   overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
//                 }}>
//                   {form.session_title || `Session ${session.session_number}`}
//                 </h2>
//               </div>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//               <span style={{
//                 fontSize: 11, fontWeight: 600, fontFamily: FONT,
//                 color: ({ pending: "#60c8e8", completed: "#4ade80", cancelled: "#9ca3af", missed: "#fbbf24" })[form.status] || "#9ca3af",
//               }}>
//                 {form.status ? form.status.charAt(0).toUpperCase() + form.status.slice(1) : "—"}
//               </span>
//               <button onClick={onClose} style={{
//                 width: 28, height: 28, borderRadius: 6,
//                 background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
//                 color: "rgba(255,255,255,0.7)", display: "flex",
//                 alignItems: "center", justifyContent: "center", cursor: "pointer",
//               }}><X size={12} /></button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div style={{ display: "flex" }}>
//             {TABS.map(({ id, label, Icon }) => (
//               <button key={id} onClick={() => setTab(id)} style={{
//                 display: "flex", alignItems: "center", gap: 5,
//                 padding: "8px 14px", fontSize: 11, fontWeight: 700,
//                 fontFamily: FONT, letterSpacing: "0.04em",
//                 border: "none",
//                 borderBottom: tab === id ? `2px solid ${C.blue}` : "2px solid transparent",
//                 marginBottom: -1,
//                 background: "transparent",
//                 color: tab === id ? C.blue : "rgba(255,255,255,0.45)",
//                 cursor: "pointer", transition: "color 0.15s",
//               }}>
//                 <Icon size={10} />{label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Body */}
//         <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>

//           {/* ── DETAILS ── */}
//           {tab === "details" && (
//             <>
//               {/* Session Info */}
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
//                   <BookOpen size={12} style={{ color: C.blue }} />
//                   <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>SESSION INFO</span>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>

//                   <div>
//                     <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Title</label>
//                     <input
//                       style={inp} value={form.session_title}
//                       onChange={handleChange("session_title")}
//                       placeholder="Introduction & Goal Setting"
//                       onFocus={(e) => e.target.style.borderColor = C.blue}
//                       onBlur={(e) => e.target.style.borderColor = C.border}
//                     />
//                   </div>

//                   <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 11 }}>
//                     <div>
//                       <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Date & Time</label>
//                       <input
//                         type="datetime-local" style={inp}
//                         value={form.session_date} onChange={handleChange("session_date")}
//                         onFocus={(e) => e.target.style.borderColor = C.blue}
//                         onBlur={(e) => e.target.style.borderColor = C.border}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Status</label>
//                       <select
//                         style={inp} value={form.status} onChange={handleChange("status")}
//                         onFocus={(e) => e.target.style.borderColor = C.blue}
//                         onBlur={(e) => e.target.style.borderColor = C.border}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="completed">Completed</option>
//                         <option value="cancelled">Cancelled</option>
//                         <option value="missed">Missed</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Meeting Link</label>
//                     <div style={{ position: "relative" }}>
//                       <Link2 size={11} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.muted, pointerEvents: "none" }} />
//                       <input
//                         style={{ ...inp, paddingLeft: 30 }} value={form.meeting_link}
//                         onChange={handleChange("meeting_link")}
//                         placeholder="https://meet.google.com/…"
//                         onFocus={(e) => e.target.style.borderColor = C.blue}
//                         onBlur={(e) => e.target.style.borderColor = C.border}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Agenda / Description</label>
//                     <textarea
//                       rows={3} style={{ ...inp, resize: "vertical" }}
//                       value={form.meeting_description} onChange={handleChange("meeting_description")}
//                       placeholder="Topics to discuss…"
//                       onFocus={(e) => e.target.style.borderColor = C.blue}
//                       onBlur={(e) => e.target.style.borderColor = C.border}
//                     />
//                   </div>

//                 </div>
//               </div>
//             </>
//           )}

//           {/* ── TASKS ── */}
//           {tab === "tasks" && (
//             <>
//               {/* Assign Task */}
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
//                   <ClipboardList size={12} style={{ color: C.blue }} />
//                   <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>ASSIGN TASK</span>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
//                   <div>
//                     <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Task for Mentee</label>
//                     <textarea
//                       rows={4} style={{ ...inp, resize: "vertical" }}
//                       value={form.tasks_given} onChange={handleChange("tasks_given")}
//                       placeholder="Describe the task to assign…"
//                       onFocus={(e) => e.target.style.borderColor = C.blue}
//                       onBlur={(e) => e.target.style.borderColor = C.border}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Task Completion */}
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
//                   <CheckCircle2 size={12} style={{ color: C.blue }} />
//                   <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>TASK COMPLETION</span>
//                 </div>
//                 <label style={{
//                   display: "flex", alignItems: "center", gap: 10,
//                   padding: "10px 12px",
//                   border: `1px solid ${form.task_completed ? "#bbf7d0" : C.border}`,
//                   borderRadius: 8,
//                   background: form.task_completed ? "#f0fdf4" : "#f8fafc",
//                   cursor: "pointer", transition: "all 0.2s",
//                 }}>
//                   <input
//                     type="checkbox" checked={form.task_completed}
//                     onChange={handleChange("task_completed")}
//                     style={{ width: 14, height: 14, accentColor: "#16a34a", cursor: "pointer" }}
//                   />
//                   <span style={{ fontSize: 12, fontFamily: FONT, fontWeight: 600, color: form.task_completed ? "#16a34a" : C.sub }}>
//                     {form.task_completed ? "Task marked as completed ✓" : "Mark task as completed"}
//                   </span>
//                 </label>

//                 {/* Mentee submission link */}
//                 {session.task_submission && (
//                   <div style={{
//                     display:"flex", alignItems:"center", gap:7, marginTop:10,
//                     padding:"8px 11px", background:"#f0fdf4",
//                     border:"1px solid #bbf7d0", borderRadius:8,
//                   }}>
//                     <CheckCheck size={12} style={{ color:"#16a34a", flexShrink:0 }} />

//                     <a  href={session.task_submission} target="_blank" rel="noopener noreferrer"
//                       style={{ fontSize:11, color:"#15803d", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textDecoration:"none", fontFamily:FONT }}
//                     >{session.task_submission}</a>
//                     <ExternalLink size={10} style={{ color:"#16a34a", flexShrink:0 }} />
//                   </div>
//                 )}
//             </div>
//         </>
//           )}

//         {/* ── FEEDBACK ── */}
//         {tab === "feedback" && (
//           <>
//             {/* Mentor notes */}
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
//                 <MessageSquare size={12} style={{ color: C.blue }} />
//                 <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>YOUR NOTES</span>
//               </div>
//               <div>
//                 <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Session Summary / Feedback</label>
//                 <textarea
//                   rows={4} style={{ ...inp, resize: "vertical" }}
//                   value={form.mentor_feedback} onChange={handleChange("mentor_feedback")}
//                   placeholder="Write session summary, guidance, notes…"
//                   onFocus={(e) => e.target.style.borderColor = C.blue}
//                   onBlur={(e) => e.target.style.borderColor = C.border}
//                 />
//               </div>
//             </div>

//             {/* Mentee feedback (read-only) */}
//             {(session.mentee_feedback || session.mentee_rating > 0) && (
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
//                   <BookOpen size={12} style={{ color: C.blue }} />
//                   <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>MENTEE FEEDBACK</span>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
//                   {session.mentee_feedback && (
//                     <div>
//                       <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Mentee Notes</label>
//                       <textarea rows={3} style={{ ...ro, resize: "vertical" }} readOnly value={session.mentee_feedback} />
//                     </div>
//                   )}
//                   {session.mentee_rating > 0 && (
//                     <div>
//                       <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Mentee Rating</label>
//                       <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 0" }}>
//                         {[1, 2, 3, 4, 5].map(s => (
//                           <span key={s} style={{ fontSize: 13, color: s <= session.mentee_rating ? "#f59e0b" : C.border }}>★</span>
//                         ))}
//                         <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, marginLeft: 4, fontFamily: FONT }}>
//                           {session.mentee_rating}/5
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//       </div>

//       {/* Footer */}
//       <div style={{
//         display: "flex", justifyContent: "space-between", alignItems: "center",
//         gap: 8, padding: "12px 18px",
//         borderTop: `1px solid ${C.border}`,
//         background: "#fafbfc", flexShrink: 0,
//       }}>
//         <div>
//           {error && <span style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", fontFamily: FONT }}>✕ {error}</span>}
//         </div>
//         <div style={{ display: "flex", gap: 7 }}>
//           <button onClick={onClose} style={{
//             padding: "7px 16px", borderRadius: 7,
//             fontSize: 12, fontWeight: 600, fontFamily: FONT,
//             background: C.white, border: `1px solid ${C.border}`,
//             color: C.sub, cursor: "pointer",
//           }}>Cancel</button>
//           <button onClick={handleSave} disabled={saving} style={{
//             display: "flex", alignItems: "center", gap: 6,
//             padding: "7px 18px", borderRadius: 7,
//             fontSize: 12, fontWeight: 700, fontFamily: FONT,
//             background: saving ? C.muted : C.dark,
//             color: C.white, border: "none",
//             cursor: saving ? "not-allowed" : "pointer",
//             transition: "background 0.15s",
//           }}>
//             {saving ? "Saving…" : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div >
//     </>
//   );
// }


function SessionModal({ session, onClose, onSave }) {
  const locked = isSessionLocked(session);  // ← ADD THIS
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("details");
  const isMobile = window.innerWidth < 768;

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
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  const handleChange = useCallback((key) => (e) => {
    if (locked) return;  // ← block changes when locked
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }, [locked]);

  const handleSave = useCallback(async () => {
    if (locked) return;
    setSaving(true); setError(null);
    const ok = await onSave(session._id, form);
    setSaving(false);
    if (ok) { onClose(); }
    else { setError("Failed to save. Please try again."); }
  }, [form, onSave, session._id, onClose, locked]);

  const FONT = "'DM Sans','Segoe UI',sans-serif";
  const C = {
    dark: "#1a1a2e", blue: "#0091c3", white: "#ffffff",
    border: "#e2e8f0", muted: "#94a3b8", text: "#1a1a2e", sub: "#475569",
  };

  // ← inputs become read-only style when locked
  const inp = {
    width: "100%", padding: "8px 11px", borderRadius: 8,
    border: `1px solid ${locked ? "#f1f5f9" : C.border}`,
    background: locked ? "#f8fafc" : C.white,
    fontSize: 12, color: locked ? C.muted : C.text,
    outline: "none", fontFamily: FONT,
    cursor: locked ? "default" : "text",
    pointerEvents: locked ? "none" : "auto",
  };
  const ro = { ...inp, background: "#f8fafc", color: C.muted, cursor: "default", pointerEvents: "none" };

  const TABS = [
    { id: "details", label: "Details", Icon: BookOpen },
    { id: "tasks", label: "Tasks", Icon: ClipboardList },
    { id: "feedback", label: "Feedback", Icon: MessageSquare },
  ];

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(15,23,42,0.45)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 1001,
        width: isMobile ? "70%" : "60%",
        maxHeight: "calc(100vh - 48px)",
        background: C.white,
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        fontFamily: FONT,
      }}>

        {/* Header + Tabs */}
        <div style={{ background: C.dark, padding: "14px 18px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.12)", color: C.white,
                fontSize: 12, fontWeight: 700, fontFamily: FONT,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {String(session.session_number).padStart(2, "0")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{
                  fontSize: 14, fontWeight: 700, color: C.white,
                  margin: 0, fontFamily: FONT,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {form.session_title || `Session ${session.session_number}`}
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              {/* ← lock indicator */}
              {locked && (
                <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  🔒 Locked
                </span>
              )}
              <span style={{
                fontSize: 11, fontWeight: 600, fontFamily: FONT,
                color: ({ pending: "#60c8e8", completed: "#4ade80", cancelled: "#9ca3af", missed: "#fbbf24" })[form.status] || "#9ca3af",
              }}>
                {form.status ? form.status.charAt(0).toUpperCase() + form.status.slice(1) : "—"}
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
                cursor: "pointer",
              }}>
                <Icon size={10} />{label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>

          {/* ── DETAILS ── */}
          {tab === "details" && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                <BookOpen size={12} style={{ color: C.blue }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>SESSION INFO</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Title</label>
                  <input style={inp} value={form.session_title} onChange={handleChange("session_title")} placeholder="Introduction & Goal Setting" readOnly={locked} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 11 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Date & Time</label>
                    <input type="datetime-local" style={inp} value={form.session_date} onChange={handleChange("session_date")} readOnly={locked} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Status</label>
                    <select style={inp} value={form.status} onChange={handleChange("status")} disabled={locked}>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="missed">Missed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Meeting Link</label>
                  <div style={{ position: "relative" }}>
                    <Link2 size={11} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.muted, pointerEvents: "none" }} />
                    <input style={{ ...inp, paddingLeft: 30 }} value={form.meeting_link} onChange={handleChange("meeting_link")} placeholder="https://meet.google.com/…" readOnly={locked} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Agenda / Description</label>
                  <textarea rows={3} style={{ ...inp, resize: locked ? "none" : "vertical" }} value={form.meeting_description} onChange={handleChange("meeting_description")} placeholder="Topics to discuss…" readOnly={locked} />
                </div>
              </div>
            </div>
          )}

          {/* ── TASKS ── */}
          {tab === "tasks" && (
            <>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <ClipboardList size={12} style={{ color: C.blue }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>ASSIGN TASK</span>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Task for Mentee</label>
                  <textarea rows={4} style={{ ...inp, resize: locked ? "none" : "vertical" }} value={form.tasks_given} onChange={handleChange("tasks_given")} placeholder="Describe the task to assign…" readOnly={locked} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <CheckCircle2 size={12} style={{ color: C.blue }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>TASK COMPLETION</span>
                </div>
                <label style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px",
                  border: `1px solid ${form.task_completed ? "#bbf7d0" : C.border}`,
                  borderRadius: 8,
                  background: form.task_completed ? "#f0fdf4" : "#f8fafc",
                  cursor: locked ? "default" : "pointer",
                  opacity: locked ? 0.7 : 1,
                }}>
                  <input
                    type="checkbox" checked={form.task_completed}
                    onChange={handleChange("task_completed")}
                    disabled={locked}
                    style={{ width: 14, height: 14, accentColor: "#16a34a", cursor: locked ? "default" : "pointer" }}
                  />
                  <span style={{ fontSize: 12, fontFamily: FONT, fontWeight: 600, color: form.task_completed ? "#16a34a" : C.sub }}>
                    {form.task_completed ? "Task marked as completed ✓" : "Mark task as completed"}
                  </span>
                </label>

                {session.task_submission && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 7, marginTop: 10,
                    padding: "8px 11px", background: "#f0fdf4",
                    border: "1px solid #bbf7d0", borderRadius: 8,
                  }}>
                    <CheckCheck size={12} style={{ color: "#16a34a", flexShrink: 0 }} />
                    <a href={session.task_submission} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 11, color: "#15803d", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: "none", fontFamily: FONT }}>
                      {session.task_submission}
                    </a>
                    <ExternalLink size={10} style={{ color: "#16a34a", flexShrink: 0 }} />
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── FEEDBACK ── */}
          {tab === "feedback" && (
            <>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <MessageSquare size={12} style={{ color: C.blue }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>YOUR NOTES</span>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Session Summary / Feedback</label>
                  <textarea rows={4} style={{ ...inp, resize: locked ? "none" : "vertical" }} value={form.mentor_feedback} onChange={handleChange("mentor_feedback")} placeholder="Write session summary, guidance, notes…" readOnly={locked} />
                </div>
              </div>

              {(session.mentee_feedback || session.mentee_rating > 0) && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                    <BookOpen size={12} style={{ color: C.blue }} />
                    <span style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.1em", fontFamily: FONT }}>MENTEE FEEDBACK</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {session.mentee_feedback && (
                      <div>
                        <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Mentee Notes</label>
                        <textarea rows={3} style={{ ...ro, resize: "none" }} readOnly value={session.mentee_feedback} />
                      </div>
                    )}
                    {session.mentee_rating > 0 && (
                      <div>
                        <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5, fontFamily: FONT }}>Mentee Rating</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 0" }}>
                          {[1, 2, 3, 4, 5].map(s => (
                            <span key={s} style={{ fontSize: 13, color: s <= session.mentee_rating ? "#f59e0b" : C.border }}>★</span>
                          ))}
                          <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, marginLeft: 4, fontFamily: FONT }}>{session.mentee_rating}/5</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
          <div>
            {locked
              ? <span style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", fontFamily: FONT, display: "flex", alignItems: "center", gap: 5 }}>🔒 This session is locked after 24hrs of completion</span>
              : error
                ? <span style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", fontFamily: FONT }}>✕ {error}</span>
                : null
            }
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            <button onClick={onClose} style={{
              padding: "7px 16px", borderRadius: 7,
              fontSize: 12, fontWeight: 600, fontFamily: FONT,
              background: C.white, border: `1px solid ${C.border}`,
              color: C.sub, cursor: "pointer",
            }}>
              {locked ? "Close" : "Cancel"}
            </button>
            {/* ← hide Save when locked */}
            {!locked && (
              <button onClick={handleSave} disabled={saving} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 18px", borderRadius: 7,
                fontSize: 12, fontWeight: 700, fontFamily: FONT,
                background: saving ? C.muted : C.dark,
                color: C.white, border: "none",
                cursor: saving ? "not-allowed" : "pointer",
              }}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


function SubscriberModal({ sub, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  const mentee = sub.mentee || {};
  const name = mentee.name || "Unknown";
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const iconBox = {
    width: 30, height: 30, borderRadius: 8,
    background: "#f1f5f9", border: "1px solid #e2e8f0",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  };

  const Row = ({ icon: Icon, label, value, valueStyle }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: "1px solid #f1f5f9" }}>
      <div style={iconBox}><Icon size={14} stroke="#1a1a2e" strokeWidth={2} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.06em" }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: 13, color: "#1a1a2e", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", ...valueStyle }}>{value}</p>
      </div>
    </div>
  );

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div style={{
        background: "#fff", borderRadius: 18, width: "100%", maxWidth: 500,
        border: "1.5px solid #e2e8f0", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 70px rgba(0,0,0,0.11)",
      }}>

        {/* Header */}
        {/* Header */}
        <div style={{ padding: "18px 22px 15px", display: "flex", alignItems: "center", gap: 13, borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0, letterSpacing: "0.04em" }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>{name}</p>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mentee.email}</p>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", flexShrink: 0 }}>
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Status strip — no close button here anymore */}
        <div style={{ padding: "12px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc" }}>
          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.06em" }}>Status</span>
          <StatusBadge status={sub.status} />
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
          {[
            { label: "Plan", value: PLAN_LABELS[sub.plan_type] || sub.plan_type },
            { label: "Sessions", value: sub.total_sessions },
            { label: "Amount", value: fmt.amount(sub.amount) },
          ].map(({ label, value }, i) => (
            <div key={label} style={{ padding: "14px 18px", borderRight: i < 2 ? "1px solid #e9edf2" : "none" }}>
              <p style={{ margin: "0 0 4px", fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.06em" }}>{label}</p>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>{value ?? "—"}</p>
            </div>
          ))}
        </div>

        <Row icon={User} label="Name" value={name} />
        <Row icon={Mail} label="Email" value={mentee.email} />
        <Row icon={Phone} label="Phone" value={mentee.phone ? `${mentee.countryCode || ""} ${mentee.phone}` : "—"} />

        {/* Dates */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #f1f5f9" }}>
          {[
            { icon: CalendarDays, label: "Start date", value: fmt.date(sub.subscribed_at), border: true },
            { icon: CalendarX2, label: "End date", value: fmt.date(sub.subscription_end_date), border: false },
          ].map(({ icon: Icon, label, value, border }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderRight: border ? "1px solid #f1f5f9" : "none" }}>
              <div style={iconBox}><Icon size={14} stroke="#1a1a2e" strokeWidth={2} /></div>
              <div>
                <p style={{ margin: 0, fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.06em" }}>{label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Status + Close */}


      </div>
    </div>
  );
}
// ── Subscribers Table ─────────────────────────────────────────────────────────

function SubscribersTable({ subscribers, isLoading }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  const paged = useMemo(() => subscribers.slice((page - 1) * pageSize, page * pageSize), [subscribers, page, pageSize]);

  return (
    <>
      <TableCard>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["S NO", "Mentee", "Plan", "Sessions", "Amount", "Start Date", "Status"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody>
              {isLoading ? <SkeletonRows cols={7} /> : paged.length === 0 ? <EmptyState message="No subscribers found" cols={7} /> : (
                paged.map((sub, idx) => (
                  <tr key={sub._id} style={{ cursor: "pointer" }} onClick={() => setSelected(sub)}>
                    <Td><span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{(page - 1) * pageSize + idx + 1}</span></Td>
                    <Td><span style={{ fontSize: 13, color: "#0c9dce", fontWeight: 700 }}>{sub.mentee?.name || "—"}</span></Td>
                    <Td><span style={{ fontSize: 12, fontWeight: 700, color: "#0c9dce" }}>{PLAN_LABELS[sub.plan_type] || sub.plan_type || "—"}</span></Td>
                    <Td><span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{sub.total_sessions ?? "—"}</span></Td>
                    <Td><span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{fmt.amount(sub.amount)}</span></Td>
                    <Td><span style={{ fontSize: 12, color: "#64748b" }}>{fmt.date(sub.subscribed_at)}</span></Td>
                    <Td><StatusBadge status={sub.status} /></Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={subscribers.length} pageSize={pageSize} onPage={setPage} onPageSize={s => { setPageSize(s); setPage(1); }} isFetching={false} />
      </TableCard>
      {selected && <SubscriberModal sub={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ── Mentee Card ───────────────────────────────────────────────────────────────

function MenteeCard({ sub, onClick }) {
  const name = sub.mentee?.name || "Unknown User";
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const planColor = ({ one_month: { bg: "#eff9fd", color: "#0c9dce" }, three_months: { bg: "#f0fdf6", color: "#16a34a" }, six_months: { bg: "#fdf4ff", color: "#9333ea" } }[sub.plan_type] ?? { bg: "#f1f5f9", color: "#64748b" });

  return (
    <div onClick={onClick} style={{ background: "#fff", border: "1.5px solid #e9edf2", borderRadius: 14, padding: 18, cursor: "pointer", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: "linear-gradient(135deg,#0c9dce 0%,#0077a8 100%)", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
          <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>{fmt.date(sub.subscribed_at)} — {fmt.date(sub.subscription_end_date)}</p>
        </div>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: planColor.bg, color: planColor.color }}>{PLAN_LABELS[sub.plan_type] || sub.plan_type}</span>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: "#f8fafc", color: "#64748b" }}>{sub.total_sessions ?? 0} sessions</span>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: "#f0fdf4", color: "#16a34a" }}>{fmt.amount(sub.amount)}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <StatusBadge status={sub.status} />
        <span style={{ fontSize: 11, color: "#0c9dce", fontWeight: 600 }}>View sessions →</span>
      </div>
    </div>
  );
}

// ── Mentee Sessions View ──────────────────────────────────────────────────────

function MenteeSessionsView({ sub, mentorId, onBack }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedSession, setSelectedSession] = useState(null);
  const [updateSession] = useUpdateByMentorSessionMutation();

  console.log(sub, "sub1w23f4")
  const { data, isLoading, isFetching, refetch } = useGetSessionsByMentorQuery(
    { mentorId, page, pageSize },
    { skip: !mentorId }
  );

  const sessions = data?.data ?? [];
  const pagination = data?.pagination ?? { total: 0, totalPages: 1 };

  const handleSave = useCallback(async (session_id, form) => {
    try {
      await updateSession({ session_id, ...form }).unwrap();
      setSelectedSession(p => p ? { ...p, ...form } : p);
      refetch();
      return true;
    } catch { return false; }
  }, [updateSession, refetch]);

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", color: "#0c9dce", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          All Mentees
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{sub?.mentee?.name || sub?.user}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", borderLeft: "1px solid #e2e8f0", paddingLeft: 12 }}>
            {PLAN_LABELS[sub.plan_type]} • {sub.total_sessions} Sessions
          </span>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ background: "#eff9fd", border: "1.5px solid #bae6fd", borderRadius: 10, padding: "11px 16px", display: "flex", alignItems: "center", gap: 18, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          ["Plan", PLAN_LABELS[sub.plan_type] || sub.plan_type, null],
          ["Total Sessions", pagination.total || sub.total_sessions, null],
          ["Amount", fmt.amount(sub.amount), "#16a34a"],
          ["Valid Until", fmt.date(sub.subscription_end_date), null],
        ].map(([label, value, color], i) => (
          <React.Fragment key={label}>
            {i > 0 && <div style={{ width: 1, height: 28, background: "#bae6fd" }} />}
            <div>
              <p style={{ fontSize: 10, color: "#0c9dce", fontWeight: 700, margin: 0, letterSpacing: "0.06em" }}>{label}</p>
              <p style={{ fontSize: 13, color: color || "#1a1a2e", fontWeight: 700, margin: "2px 0 0" }}>{value}</p>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Sessions Table */}
      <TableCard>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["S no", "Session", "Date", "Status", "Action"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <SkeletonRows cols={6} rows={pageSize} />
              ) : sessions.length === 0 ? (
                <EmptyState message="No sessions found" cols={6} />
              ) : (
                // sessions.map((item, idx) => (
                //   <tr key={item._id} onClick={() => setSelectedSession(item)} style={{ cursor: "pointer" }}>
                //     <Td><span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{(page - 1) * pageSize + idx + 1}</span></Td>
                //     <Td>
                //       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                //         {/* <div style={{ width: 28, height: 28, borderRadius: 7, background: "#1a1a2e", color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                //           {item.session_number}
                //         </div> */}
                //         <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>
                //           {item.session_title || `Session ${item.session_number}`}
                //         </span>
                //       </div>
                //     </Td>
                //     <Td><span style={{ fontSize: 12, color: "#64748b" }}>{fmt.date(item.session_date)}</span></Td>
                //     <Td><StatusBadge status={item.status} /></Td>
                //     <Td>
                //       <button
                //         onClick={e => { e.stopPropagation(); setSelectedSession(item); }}
                //         style={{ padding: "5px 13px", borderRadius: 7, border: "1.5px solid #0c9dce", background: "#fff", color: "#0c9dce", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                //       >
                //         View
                //       </button>
                //     </Td>
                //   </tr>
                // ))

                sessions.map((item, idx) => {
                  const locked = isSessionLocked(item);  // ← ADD
                  return (
                    <tr
                      key={item._id}
                      onClick={() => !locked && setSelectedSession(item)}  // ← block click when locked
                      style={{
                        cursor: locked ? "not-allowed" : "pointer",
                        opacity: locked ? 0.5 : 1,
                        background: locked ? "#fafbfc" : "transparent",
                        transition: "opacity 0.2s",
                      }}
                    >
                      <Td><span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{(page - 1) * pageSize + idx + 1}</span></Td>
                      <Td>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>
                          {item.session_title || `Session ${item.session_number}`}
                        </span>
                      </Td>
                      <Td><span style={{ fontSize: 12, color: "#64748b" }}>{fmt.date(item.session_date)}</span></Td>
                      <Td><StatusBadge status={item.status} /></Td>
                      <Td>
                        {locked
                          ? (
                            // ← lock icon instead of View button
                            <span style={{ fontSize: 11, color: "#cbd5e1", display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
                            Locked
                            </span>
                          ) : (
                            <button
                              onClick={e => { e.stopPropagation(); setSelectedSession(item); }}
                              style={{ padding: "5px 13px", borderRadius: 7, border: "1.5px solid #0c9dce", background: "#fff", color: "#0c9dce", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                            >
                              View
                            </button>
                          )
                        }
                      </Td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          total={pagination.total}
          pageSize={pageSize}
          onPage={setPage}
          onPageSize={s => { setPageSize(s); setPage(1); }}
          isFetching={isFetching}
        />
      </TableCard>

      {selectedSession && (
        <SessionModal session={selectedSession} onClose={() => setSelectedSession(null)} onSave={handleSave} />
      )}
    </>
  );
}

// ── Sessions Tab ──────────────────────────────────────────────────────────────

function SessionsTab({ mentorId, subscribers, subLoading }) {
  const [selectedMentee, setSelectedMentee] = useState(null);

  if (selectedMentee) {
    return <MenteeSessionsView sub={selectedMentee} mentorId={mentorId} onBack={() => setSelectedMentee(null)} />;
  }

  if (subLoading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 14 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ background: "#fff", border: "1.5px solid #e9edf2", borderRadius: 14, padding: 18, height: 170 }}>
            {[60, 40, 80, 100, 40].map((w, j) => (
              <div key={j} style={{ height: 10, borderRadius: 6, background: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", width: `${w}%`, marginBottom: 11 }} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (subscribers.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", border: "1.5px solid #e9edf2", borderRadius: 16 }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" style={{ margin: "0 auto 12px", display: "block" }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <p style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500, margin: 0 }}>No mentees yet</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 14 }}>
      {subscribers.map(sub => <MenteeCard key={sub._id} sub={sub} onClick={() => setSelectedMentee(sub)} />)}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function MentorSessionsDashboard() {
  const [activeTab, setActiveTab] = useState("sessions");
  const mentorId = useMemo(() => getMentorId(), []);

  const { data: subscribersResult, isLoading: subLoading } = useGetSubscribersByMentorQuery(mentorId, { skip: !mentorId });
  const { data: sessionsOverview } = useGetSessionsByMentorQuery({ mentorId, page: 1, pageSize: DEFAULT_PAGE_SIZE }, { skip: !mentorId });

  const subscribers = useMemo(() => subscribersResult?.data ?? subscribersResult?.subscriptions ?? [], [subscribersResult]);
  const totalSessions = sessionsOverview?.pagination?.total ?? 0;

  console.log(totalSessions, "totalSessions")
  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        * { scrollbar-width: none; }
      `}</style>
      <div style={{ minHeight: "100vh", padding: "20px", fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#fff" }}>        <div style={{ maxWidth: 1100, margin: "0 auto" }}>


        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-[20px]">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <Users size={24} className="text-[#0098cc]" strokeWidth={2.2} />
              Subscriptions            </h1>

            <p className="text-gray-500 mt-2 text-xs">
              Manage your mentee sessions and subscriptions
            </p>
          </div>

        </div>


        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "#f8fafc", border: "1.5px solid #e9edf2", borderRadius: 11, padding: 4, width: "fit-content", marginBottom: 20 }}>
          {["sessions", "subscribers"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "7px 18px", borderRadius: 8, border: "none",
              background: activeTab === tab ? "#1a1a2e" : "transparent",
              color: activeTab === tab ? "#fff" : "#64748b",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>
              {tab === "sessions"
                ? `Sessions${totalSessions ? ` (${totalSessions})` : ""}`
                : `Subscribers${subscribers.length ? ` (${subscribers.length})` : ""}`}
            </button>
          ))}
        </div>

        {activeTab === "subscribers" && <SubscribersTable subscribers={subscribers} isLoading={subLoading} />}
        {activeTab === "sessions" && <SessionsTab mentorId={mentorId} subscribers={subscribers} subLoading={subLoading} />}
      </div>
      </div>
    </>
  );
}
