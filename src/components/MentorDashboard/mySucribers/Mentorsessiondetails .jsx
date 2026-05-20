// // pages/MentorSessionDetails.jsx
// import { useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useUpdateByMentorSessionMutation } from "./mysubcriberspislice";

// // ─── Stars ────────────────────────────────────────────────────────────────────
// const Stars = ({ value, onChange, readonly = false }) => (
//     <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((n) => (
//             <button
//                 key={n}
//                 type="button"
//                 onClick={() => !readonly && onChange?.(n)}
//                 disabled={readonly}
//                 className={`text-xl focus:outline-none transition-transform ${!readonly ? "active:scale-90 cursor-pointer" : "cursor-default"}`}
//             >
//                 <span style={{ color: n <= (value || 0) ? "#0098cc" : "#0a3020" }}>★</span>
//             </button>
//         ))}
//     </div>
// );

// // ─── Constants ────────────────────────────────────────────────────────────────
// const STATUS = {
//     pending: { label: "Pending", textColor: "#0098cc", borderColor: "#0a3020", bgColor: "#0a2818" },
//     completed: { label: "Completed", textColor: "#031610", borderColor: "#0098cc", bgColor: "#0098cc" },
//     cancelled: { label: "Cancelled", textColor: "#f87171", borderColor: "#3b1a1a", bgColor: "#1f0d0d" },
//     missed: { label: "Missed", textColor: "#fbbf24", borderColor: "#3b2a0a", bgColor: "#1f1608" },
// };

// const inputStyle = {
//     width: "100%",
//     background: "#031610",
//     border: "1px solid #0a3020",
//     borderRadius: "8px",
//     padding: "10px 14px",
//     fontSize: "14px",
//     color: "#e2f5ef",
//     outline: "none",
//     transition: "border-color 0.15s",
//     fontFamily: "inherit",
// };

// // ─── Field wrapper ────────────────────────────────────────────────────────────
// const Field = ({ label, children, span2 = false }) => (
//     <div className={span2 ? "col-span-1 sm:col-span-2" : "col-span-1"}>
//         <label
//             className="block text-[11px] font-semibold tracking-[0.08em] uppercase mb-1.5"
//             style={{ color: "#0098cc" }}
//         >
//             {label}
//         </label>
//         {children}
//     </div>
// );

// // ─── SessionCard ──────────────────────────────────────────────────────────────
// function SessionCard({ session, onSave }) {
//     const [expanded, setExpanded] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [form, setForm] = useState({
//         session_title: session.session_title || "",
//         session_date: session.session_date
//             ? new Date(session.session_date).toISOString().slice(0, 16)
//             : "",
//         meeting_link: session.meeting_link || "",
//         meeting_description: session.meeting_description || "",
//         tasks_given: session.tasks_given || "",
//         task_completed: session.task_completed || false,
//         mentee_feedback: session.mentee_feedback || "",
//         mentee_rating: session.mentee_rating || 0,
//         status: session.status || "pending",
//     });

//     const set = (key) => (e) =>
//         setForm((f) => ({
//             ...f,
//             [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
//         }));

//     const handleSave = async () => {
//         setSaving(true);
//         await onSave(session._id, form);
//         setSaving(false);
//         setExpanded(false);
//     };

//     const st = STATUS[form.status] || STATUS.pending;
//     const focusHandler = (e) => (e.target.style.borderColor = "#0098cc");
//     const blurHandler = (e) => (e.target.style.borderColor = "#0a3020");

//     return (
//         <div
//             className="w-full rounded-xl overflow-hidden transition-colors duration-150"
//             style={{
//                 background: "#051f12",
//                 border: expanded ? "1px solid #0098cc" : "1px solid #0a3020",
//             }}
//         >
//             {/* Header */}
//             <button
//                 type="button"
//                 onClick={() => setExpanded((v) => !v)}
//                 className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none"
//             >
//                 <div
//                     className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
//                     style={{ background: "#0098cc", color: "#031610" }}
//                 >
//                     {session.session_number}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold truncate leading-tight" style={{ color: "#e2f5ef" }}>
//                         {form.session_title || `Session ${session.session_number}`}
//                     </p>
//                     <p className="text-xs mt-0.5 leading-tight" style={{ color: "#2a7a52" }}>
//                         {form.session_date
//                             ? new Date(form.session_date).toLocaleDateString("en-US", {
//                                 weekday: "short", month: "short", day: "numeric", year: "numeric",
//                             })
//                             : "No date set"}
//                     </p>
//                 </div>

//                 <span
//                     className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
//                     style={{ color: st.textColor, border: `1px solid ${st.borderColor}`, background: st.bgColor }}
//                 >
//                     {st.label}
//                 </span>
//                 <span
//                     className="sm:hidden w-2 h-2 rounded-full shrink-0"
//                     style={{ background: st.textColor }}
//                 />

//                 <svg
//                     className="w-4 h-4 shrink-0 transition-transform duration-200"
//                     style={{
//                         color: expanded ? "#0098cc" : "#2a7a52",
//                         transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
//                     }}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                 </svg>
//             </button>

//             {/* Body */}
//             {expanded && (
//                 <div className="px-5 py-5" style={{ borderTop: "1px solid #0a3020", background: "#031610" }}>
//                     {[
//                         {
//                             title: "Session Details",
//                             fields: (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <Field label="Session Title" span2>
//                                         <input className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.session_title} onChange={set("session_title")} placeholder="e.g. Introduction & Goal Setting" onFocus={focusHandler} onBlur={blurHandler} />
//                                     </Field>
//                                     <Field label="Date & Time">
//                                         <input type="datetime-local" className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.session_date} onChange={set("session_date")} onFocus={focusHandler} onBlur={blurHandler} />
//                                     </Field>
//                                     <Field label="Status">
//                                         <select className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.status} onChange={set("status")} onFocus={focusHandler} onBlur={blurHandler}>
//                                             <option value="pending">Pending</option>
//                                             <option value="completed">Completed</option>
//                                             <option value="cancelled">Cancelled</option>
//                                             <option value="missed">Missed</option>
//                                         </select>
//                                     </Field>
//                                     <Field label="Meeting Link" span2>
//                                         <input className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.meeting_link} onChange={set("meeting_link")} placeholder="https://meet.google.com/..." onFocus={focusHandler} onBlur={blurHandler} />
//                                     </Field>
//                                     <Field label="Agenda / Description" span2>
//                                         <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={inputStyle} value={form.meeting_description} onChange={set("meeting_description")} placeholder="Topics  discussed" onFocus={focusHandler} onBlur={blurHandler} />
//                                     </Field>
//                                 </div>
//                             ),
//                         },
//                         {
//                             title: "Tasks",
//                             fields: (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <Field label="Tasks Giving to mentor " span2>
//                                         <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={{ ...inputStyle, background: "#051f12", cursor: "default", color: "#6aab8e" }} readOnly value={form.tasks_given || "assigned a task."} />
//                                     </Field>
//                                     <Field label="Task Status" span2>
//                                         <label className="inline-flex items-center gap-3 cursor-pointer">
//                                             <input type="checkbox" checked={form.task_completed} onChange={set("task_completed")} className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: "#0098cc" }} />
//                                             <span className="text-sm" style={{ color: "#a3d9c2" }}>Mark task as completed</span>
//                                         </label>
//                                     </Field>
//                                 </div>
//                             ),
//                         },
//                         {
//                             title: "Feedback",
//                             fields: (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <Field label="Mentee Feedback" span2>
//                                         <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={inputStyle} value={form.mentee_feedback} onChange={set("mentee_feedback")} placeholder="Share thoughts on this session..." onFocus={focusHandler} onBlur={blurHandler} />
//                                     </Field>
//                                     <Field label="Mentee Rating" span2>
//                                         <Stars value={form.mentee_rating} onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))} />
//                                     </Field>
//                                     {session.mentor_feedback && (
//                                         <Field label="Mentor's Feedback" span2>
//                                             <textarea rows={3} readOnly className="w-full rounded-lg text-sm focus:outline-none resize-none" style={{ ...inputStyle, background: "#051f12", cursor: "default", color: "#6aab8e" }} value={session.mentor_feedback} />
//                                         </Field>
//                                     )}
//                                     {session.mentor_rating > 0 && (
//                                         <Field label="Mentor's Rating" span2>
//                                             <Stars value={session.mentor_rating} readonly />
//                                         </Field>
//                                     )}
//                                 </div>
//                             ),
//                         },
//                     ].map(({ title, fields }) => (
//                         <div key={title} className="mb-6">
//                             <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "#2a7a52" }}>
//                                 {title}
//                             </p>
//                             {fields}
//                         </div>
//                     ))}

//                     <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-2 pt-5" style={{ borderTop: "1px solid #0a3020" }}>
//                         <button
//                             onClick={() => setExpanded(false)}
//                             className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none"
//                             style={{ border: "1px solid #0a3020", color: "#0098cc", background: "transparent" }}
//                             onMouseEnter={(e) => (e.currentTarget.style.background = "#0a2818")}
//                             onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={handleSave}
//                             disabled={saving}
//                             className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
//                             style={{ background: "#0098cc", color: "#031610" }}
//                             onMouseEnter={(e) => !saving && (e.currentTarget.style.background = "#007aaa")}
//                             onMouseLeave={(e) => !saving && (e.currentTarget.style.background = "#0098cc")}
//                         >
//                             {saving ? "Saving…" : "Save Changes"}
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// // ─── Toast ────────────────────────────────────────────────────────────────────
// function Toast({ toast }) {
//     if (!toast) return null;
//     return (
//         <div
//             className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
//             style={{
//                 background: "#051f12",
//                 border: toast.type === "success" ? "1px solid #0a3020" : "1px solid #3b1a1a",
//                 color: toast.type === "success" ? "#0098cc" : "#f87171",
//             }}
//         >
//             {toast.type === "success" ? (
//                 <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#0098cc" }}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//                 </svg>
//             ) : (
//                 <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#f87171" }}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             )}
//             {toast.msg}
//         </div>
//     );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const STATUS_PILL = {
//     pending: { color: "#0098cc", border: "#0a3020", bg: "#0a2818" },
//     completed: { color: "#031610", border: "#0098cc", bg: "#0098cc" },
//     cancelled: { color: "#f87171", border: "#3b1a1a", bg: "#1f0d0d" },
//     missed: { color: "#fbbf24", border: "#3b2a0a", bg: "#1f1608" },
// };

// export default function MentorSessionDetails() {
//     const navigate = useNavigate();
//     const { subscription_id } = useParams();
//     const { state } = useLocation();

//     // Sessions can come via router state (fast) or you could re-fetch here
//     const sessions = state?.sessions ?? [];
//     const mentee_id = state?.mentee_id ?? "";

//     const [updateSession] = useUpdateByMentorSessionMutation();
//     const [filter, setFilter] = useState("all");
//     const [toast, setToast] = useState(null);

//     const filtered = filter === "all" ? sessions : sessions.filter((s) => s.status === filter);
//     const counts = sessions.reduce(
//         (acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }),
//         {}
//     );
//     const completedPct = Math.round(((counts.completed || 0) / (sessions.length || 1)) * 100);

//     const showToast = (msg, type = "success") => {
//         setToast({ msg, type });
//         setTimeout(() => setToast(null), 3500);
//     };

//     const handleSave = async (session_id, form) => {
//         try {
//             await updateSession({ session_id, ...form }).unwrap();
//             showToast("Session updated successfully.");
//         } catch {
//             showToast("Failed to update session.", "error");
//         }
//     };

//     const FILTERS = ["all", "pending", "completed", "missed", "cancelled"];

//     return (
//         <div className="min-h-screen w-full" style={{ background: "#031610" }}>

//             {/* Header */}
//             <div
//                 className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10"
//                 style={{ borderBottom: "1px solid #0a3020" }}
//             >
//                 {/* Back button */}
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="inline-flex items-center gap-2 text-sm font-medium mb-5 focus:outline-none transition-colors"
//                     style={{ color: "#2a7a52" }}
//                     onMouseEnter={(e) => (e.currentTarget.style.color = "#0098cc")}
//                     onMouseLeave={(e) => (e.currentTarget.style.color = "#2a7a52")}
//                 >
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//                     </svg>
//                     Back to Overview
//                 </button>

//                 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//                     <div>
//                         <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "#2a7a52" }}>
//                             Subscription · <code className="font-mono normal-case tracking-normal" style={{ color: "#0098cc" }}>…{subscription_id?.slice(-8)}</code>
//                         </p>
//                         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#e2f5ef" }}>
//                             Session Details
//                         </h1>
//                         <p className="text-sm mt-1" style={{ color: "#2a7a52" }}>
//                             Mentee <code className="font-mono text-xs" style={{ color: "#0098cc" }}>…{mentee_id?.slice(-8)}</code>
//                             {" · "}
//                             {sessions.length} sessions · {counts.completed || 0} completed
//                         </p>
//                     </div>

//                     {/* Progress summary */}
//                     {sessions.length > 0 && (
//                         <div className="flex flex-col items-end gap-2 shrink-0">
//                             <div className="flex gap-1.5 flex-wrap justify-end">
//                                 {Object.entries(counts).map(([status, count]) => {
//                                     const sp = STATUS_PILL[status];
//                                     return (
//                                         <div
//                                             key={status}
//                                             className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
//                                             style={{ color: sp?.color, border: `1px solid ${sp?.border}`, background: sp?.bg }}
//                                         >
//                                             {count} {STATUS[status]?.label}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                             {/* Overall progress bar */}
//                             <div className="flex items-center gap-2 w-48">
//                                 <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#0a3020" }}>
//                                     <div
//                                         className="h-full rounded-full transition-all"
//                                         style={{ width: `${completedPct}%`, background: "#0098cc" }}
//                                     />
//                                 </div>
//                                 <span className="text-xs font-semibold shrink-0" style={{ color: "#0098cc" }}>
//                                     {completedPct}%
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Filters */}
//                 <div className="flex gap-1 mt-6 overflow-x-auto pb-px">
//                     {FILTERS.map((f) => (
//                         <button
//                             key={f}
//                             onClick={() => setFilter(f)}
//                             className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none"
//                             style={
//                                 filter === f
//                                     ? { background: "#0098cc", color: "#031610" }
//                                     : { background: "transparent", color: "#2a7a52" }
//                             }
//                             onMouseEnter={(e) => filter !== f && (e.currentTarget.style.background = "#0a2818")}
//                             onMouseLeave={(e) => filter !== f && (e.currentTarget.style.background = "transparent")}
//                         >
//                             {f === "all"
//                                 ? `All (${sessions.length})`
//                                 : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f] || 0})`}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Session list */}
//             <div className="w-full px-4 sm:px-8 lg:px-12 py-6">
//                 {filtered.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-32 gap-3">
//                         <div
//                             className="w-12 h-12 rounded-xl flex items-center justify-center"
//                             style={{ background: "#051f12", border: "1px solid #0a3020" }}
//                         >
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#2a7a52" }}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
//                             </svg>
//                         </div>
//                         <p className="text-sm" style={{ color: "#2a7a52" }}>
//                             No {filter !== "all" ? filter : ""} sessions found.
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="space-y-2">
//                         {filtered.map((session) => (
//                             <SessionCard key={session._id} session={session} onSave={handleSave} />
//                         ))}
//                     </div>
//                 )}
//             </div>

//             <Toast toast={toast} />
//         </div>
//     );
// }


// pages/MentorSessionDetails.jsx
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUpdateByMentorSessionMutation } from "./mysubcriberspislice";

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ value, onChange, readonly = false }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
            <button
                key={n}
                type="button"
                onClick={() => !readonly && onChange?.(n)}
                disabled={readonly}
                className={`text-xl focus:outline-none transition-transform ${!readonly ? "active:scale-90 cursor-pointer" : "cursor-default"}`}
            >
                <span style={{ color: n <= (value || 0) ? "#0098cc" : "#0a3020" }}>★</span>
            </button>
        ))}
    </div>
);

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS = {
    pending: { label: "Pending", textColor: "#0098cc", borderColor: "#0a3020", bgColor: "#0a2818" },
    completed: { label: "Completed", textColor: "#031610", borderColor: "#0098cc", bgColor: "#0098cc" },
    cancelled: { label: "Cancelled", textColor: "#f87171", borderColor: "#3b1a1a", bgColor: "#1f0d0d" },
    missed: { label: "Missed", textColor: "#fbbf24", borderColor: "#3b2a0a", bgColor: "#1f1608" },
};

const inputStyle = {
    width: "100%",
    background: "#031610",
    border: "1px solid #0a3020",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#e2f5ef",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
};

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children, span2 = false }) => (
    <div className={span2 ? "col-span-1 sm:col-span-2" : "col-span-1"}>
        <label
            className="block text-[11px] font-semibold tracking-[0.08em] uppercase mb-1.5"
            style={{ color: "#0098cc" }}
        >
            {label}
        </label>
        {children}
    </div>
);

// ─── SessionCard ──────────────────────────────────────────────────────────────
function SessionCard({ session, onSave }) {
    const [expanded, setExpanded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        session_title: session.session_title || "",
        session_date: session.session_date
            ? new Date(session.session_date).toISOString().slice(0, 16)
            : "",
        meeting_link: session.meeting_link || "",
        meeting_description: session.meeting_description || "",
        tasks_given: session.tasks_given || "",
        task_completed: session.task_completed || false,
        mentee_feedback: session.mentee_feedback || "",
        mentee_rating: session.mentee_rating || 0,
        status: session.status || "pending",
    });

    const set = (key) => (e) =>
        setForm((f) => ({
            ...f,
            [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
        }));

    const handleSave = async () => {
        setSaving(true);
        await onSave(session._id, form);
        setSaving(false);
        setExpanded(false);
    };

    const st = STATUS[form.status] || STATUS.pending;
    const focusHandler = (e) => (e.target.style.borderColor = "#0098cc");
    const blurHandler = (e) => (e.target.style.borderColor = "#0a3020");

    return (
        <div
            className="w-full rounded-xl overflow-hidden transition-colors duration-150"
            style={{
                background: "#051f12",
                border: expanded ? "1px solid #0098cc" : "1px solid #0a3020",
            }}
        >
            {/* Header */}
            <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none"
            >
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: "#0098cc", color: "#031610" }}
                >
                    {session.session_number}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate leading-tight" style={{ color: "#e2f5ef" }}>
                        {form.session_title || `Session ${session.session_number}`}
                    </p>
                    <p className="text-xs mt-0.5 leading-tight" style={{ color: "#2a7a52" }}>
                        {form.session_date
                            ? new Date(form.session_date).toLocaleDateString("en-US", {
                                weekday: "short", month: "short", day: "numeric", year: "numeric",
                            })
                            : "No date set"}
                    </p>
                </div>

                <span
                    className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{ color: st.textColor, border: `1px solid ${st.borderColor}`, background: st.bgColor }}
                >
                    {st.label}
                </span>
                <span
                    className="sm:hidden w-2 h-2 rounded-full shrink-0"
                    style={{ background: st.textColor }}
                />

                <svg
                    className="w-4 h-4 shrink-0 transition-transform duration-200"
                    style={{
                        color: expanded ? "#0098cc" : "#2a7a52",
                        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Body */}
            {expanded && (
                <div className="px-5 py-5" style={{ borderTop: "1px solid #0a3020", background: "#031610" }}>
                    {[
                        {
                            title: "Session Details",
                            fields: (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Session Title" span2>
                                        <input className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.session_title} onChange={set("session_title")} placeholder="e.g. Introduction & Goal Setting" onFocus={focusHandler} onBlur={blurHandler} />
                                    </Field>
                                    <Field label="Date & Time">
                                        <input type="datetime-local" className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.session_date} onChange={set("session_date")} onFocus={focusHandler} onBlur={blurHandler} />
                                    </Field>
                                    <Field label="Status">
                                        <select className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.status} onChange={set("status")} onFocus={focusHandler} onBlur={blurHandler}>
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="missed">Missed</option>
                                        </select>
                                    </Field>
                                    <Field label="Meeting Link" span2>
                                        <input className="w-full rounded-lg text-sm focus:outline-none" style={inputStyle} value={form.meeting_link} onChange={set("meeting_link")} placeholder="https://meet.google.com/..." onFocus={focusHandler} onBlur={blurHandler} />
                                    </Field>
                                    <Field label="Agenda / Description" span2>
                                        <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={inputStyle} value={form.meeting_description} onChange={set("meeting_description")} placeholder="Topics  discussed" onFocus={focusHandler} onBlur={blurHandler} />
                                    </Field>
                                </div>
                            ),
                        },
                        {
                            title: "Tasks",
                            fields: (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Tasks Giving to mentor " span2>
                                        <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={{ ...inputStyle, background: "#051f12", cursor: "default", color: "#6aab8e" }} readOnly value={form.tasks_given || "assigned a task."} />
                                    </Field>
                                    <Field label="Task Status" span2>
                                        <label className="inline-flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" checked={form.task_completed} onChange={set("task_completed")} className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: "#0098cc" }} />
                                            <span className="text-sm" style={{ color: "#a3d9c2" }}>Mark task as completed</span>
                                        </label>
                                    </Field>
                                </div>
                            ),
                        },
                        {
                            title: "Feedback",
                            fields: (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Mentee Feedback" span2>
                                        <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={inputStyle} value={form.mentee_feedback} onChange={set("mentee_feedback")} placeholder="Share thoughts on this session..." onFocus={focusHandler} onBlur={blurHandler} />
                                    </Field>
                                    <Field label="Mentee Rating" span2>
                                        <Stars value={form.mentee_rating} onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))} />
                                    </Field>
                                    {session.mentor_feedback && (
                                        <Field label="Mentor's Feedback" span2>
                                            <textarea rows={3} readOnly className="w-full rounded-lg text-sm focus:outline-none resize-none" style={{ ...inputStyle, background: "#051f12", cursor: "default", color: "#6aab8e" }} value={session.mentor_feedback} />
                                        </Field>
                                    )}
                                    {session.mentor_rating > 0 && (
                                        <Field label="Mentor's Rating" span2>
                                            <Stars value={session.mentor_rating} readonly />
                                        </Field>
                                    )}
                                </div>
                            ),
                        },
                    ].map(({ title, fields }) => (
                        <div key={title} className="mb-6">
                            <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "#2a7a52" }}>
                                {title}
                            </p>
                            {fields}
                        </div>
                    ))}

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-2 pt-5" style={{ borderTop: "1px solid #0a3020" }}>
                        <button
                            onClick={() => setExpanded(false)}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none"
                            style={{ border: "1px solid #0a3020", color: "#0098cc", background: "transparent" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#0a2818")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                            style={{ background: "#0098cc", color: "#031610" }}
                            onMouseEnter={(e) => !saving && (e.currentTarget.style.background = "#007aaa")}
                            onMouseLeave={(e) => !saving && (e.currentTarget.style.background = "#0098cc")}
                        >
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
    if (!toast) return null;
    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
            style={{
                background: "#051f12",
                border: toast.type === "success" ? "1px solid #0a3020" : "1px solid #3b1a1a",
                color: toast.type === "success" ? "#0098cc" : "#f87171",
            }}
        >
            {toast.type === "success" ? (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#0098cc" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            ) : (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#f87171" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}
            {toast.msg}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const STATUS_PILL = {
    pending: { color: "#0098cc", border: "#0a3020", bg: "#0a2818" },
    completed: { color: "#031610", border: "#0098cc", bg: "#0098cc" },
    cancelled: { color: "#f87171", border: "#3b1a1a", bg: "#1f0d0d" },
    missed: { color: "#fbbf24", border: "#3b2a0a", bg: "#1f1608" },
};

export default function MentorSessionDetails() {
    const navigate = useNavigate();
    const { subscription_id } = useParams();
    const { state } = useLocation();

    // Sessions can come via router state (fast) or you could re-fetch here
    const sessions = state?.sessions ?? [];
    const mentee_id = state?.mentee_id ?? "";

    const [updateSession] = useUpdateByMentorSessionMutation();
    const [filter, setFilter] = useState("all");
    const [toast, setToast] = useState(null);

    const filtered = filter === "all" ? sessions : sessions.filter((s) => s.status === filter);
    const counts = sessions.reduce(
        (acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }),
        {}
    );
    const completedPct = Math.round(((counts.completed || 0) / (sessions.length || 1)) * 100);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleSave = async (session_id, form) => {
        try {
            await updateSession({ session_id, ...form }).unwrap();
            showToast("Session updated successfully.");
        } catch {
            showToast("Failed to update session.", "error");
        }
    };

    const FILTERS = ["all", "pending", "completed", "missed", "cancelled"];

    return (
        <div className="min-h-screen w-full" style={{ background: "#031610" }}>

            {/* Header */}
            <div
                className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10"
                style={{ borderBottom: "1px solid #0a3020" }}
            >
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-medium mb-5 focus:outline-none transition-colors"
                    style={{ color: "#2a7a52" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0098cc")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#2a7a52")}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Overview
                </button>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "#2a7a52" }}>
                            Subscription · <code className="font-mono normal-case tracking-normal" style={{ color: "#0098cc" }}>…{subscription_id?.slice(-8)}</code>
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#e2f5ef" }}>
                            Session Details
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "#2a7a52" }}>
                            Mentee <code className="font-mono text-xs" style={{ color: "#0098cc" }}>…{mentee_id?.slice(-8)}</code>
                            {" · "}
                            {sessions.length} sessions · {counts.completed || 0} completed
                        </p>
                    </div>

                    {/* Progress summary */}
                    {sessions.length > 0 && (
                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="flex gap-1.5 flex-wrap justify-end">
                                {Object.entries(counts).map(([status, count]) => {
                                    const sp = STATUS_PILL[status];
                                    return (
                                        <div
                                            key={status}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                                            style={{ color: sp?.color, border: `1px solid ${sp?.border}`, background: sp?.bg }}
                                        >
                                            {count} {STATUS[status]?.label}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Overall progress bar */}
                            <div className="flex items-center gap-2 w-48">
                                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#0a3020" }}>
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{ width: `${completedPct}%`, background: "#0098cc" }}
                                    />
                                </div>
                                <span className="text-xs font-semibold shrink-0" style={{ color: "#0098cc" }}>
                                    {completedPct}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex gap-1 mt-6 overflow-x-auto pb-px">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none"
                            style={
                                filter === f
                                    ? { background: "#0098cc", color: "#031610" }
                                    : { background: "transparent", color: "#2a7a52" }
                            }
                            onMouseEnter={(e) => filter !== f && (e.currentTarget.style.background = "#0a2818")}
                            onMouseLeave={(e) => filter !== f && (e.currentTarget.style.background = "transparent")}
                        >
                            {f === "all"
                                ? `All (${sessions.length})`
                                : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f] || 0})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Session list */}
            <div className="w-full px-4 sm:px-8 lg:px-12 py-6">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "#051f12", border: "1px solid #0a3020" }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#2a7a52" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                            </svg>
                        </div>
                        <p className="text-sm" style={{ color: "#2a7a52" }}>
                            No {filter !== "all" ? filter : ""} sessions found.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filtered.map((session) => (
                            <SessionCard key={session._id} session={session} onSave={handleSave} />
                        ))}
                    </div>
                )}
            </div>

            <Toast toast={toast} />
        </div>
    );
}