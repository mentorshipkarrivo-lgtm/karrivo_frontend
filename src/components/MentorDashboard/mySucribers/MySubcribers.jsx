// import { useState } from "react";
// import {
//     useGetSessionsByMentorQuery,
//     useUpdateSessionMutation,
// } from "./mysubcriberspislice";

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

// const STATUS = {
//     pending: { label: "Pending", textColor: "#0098cc", borderColor: "#0a3020", bgColor: "#0a2818" },
//     completed: { label: "Completed", textColor: "#031610", borderColor: "#0098cc", bgColor: "#0098cc" },
//     cancelled: { label: "Cancelled", textColor: "#f87171", borderColor: "#3b1a1a", bgColor: "#1f0d0d" },
//     missed: { label: "Missed", textColor: "#fbbf24", borderColor: "#3b2a0a", bgColor: "#1f1608" },
// };

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
//                     style={{ color: expanded ? "#0098cc" : "#2a7a52", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                 </svg>
//             </button>

//             {/* Body */}
//             {expanded && (
//                 <div
//                     className="px-5 py-5"
//                     style={{ borderTop: "1px solid #0a3020", background: "#031610" }}
//                 >
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
//                                         <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={inputStyle} value={form.meeting_description} onChange={set("meeting_description")} placeholder="Topics to be covered..." onFocus={focusHandler} onBlur={blurHandler} />
//                                     </Field>
//                                 </div>
//                             ),
//                         },
//                         {
//                             title: "Tasks",
//                             fields: (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <Field label="Tasks Given by Mentor" span2>
//                                         <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={{ ...inputStyle, background: "#051f12", cursor: "default", color: "#6aab8e" }} readOnly value={form.tasks_given || "No tasks assigned yet."} />
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
//                             title: "Your Feedback",
//                             fields: (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <Field label="Your Feedback" span2>
//                                         <textarea rows={3} className="w-full rounded-lg text-sm focus:outline-none resize-none" style={inputStyle} value={form.mentee_feedback} onChange={set("mentee_feedback")} placeholder="Share your thoughts on this session..." onFocus={focusHandler} onBlur={blurHandler} />
//                                     </Field>
//                                     <Field label="Your Rating" span2>
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

// export default function MenteeSessions() {
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const { data: result, isLoading, isError } = useGetSessionsByMentorQuery(userData?._id);
//     const [updateSession] = useUpdateSessionMutation();
//     const [filter, setFilter] = useState("all");
//     const [toast, setToast] = useState(null);

//     const sessions = result?.data ?? [];
//     const filtered = filter === "all" ? sessions : sessions.filter((s) => s.status === filter);
//     const counts = sessions.reduce(
//         (acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }),
//         {}
//     );

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

//     const STATUS_PILL = {
//         pending: { color: "#0098cc", border: "#0a3020", bg: "#0a2818" },
//         completed: { color: "#031610", border: "#0098cc", bg: "#0098cc" },
//         cancelled: { color: "#f87171", border: "#3b1a1a", bg: "#1f0d0d" },
//         missed: { color: "#fbbf24", border: "#3b2a0a", bg: "#1f1608" },
//     };

//     return (
//         <div className="min-h-screen w-full" style={{ background: "#031610" }}>

//             {/* Header */}
//             <div className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10" style={{ borderBottom: "1px solid #0a3020" }}>
//                 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//                     <div>
//                         <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "#2a7a52" }}>
//                             Mentorship
//                         </p>
//                         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#e2f5ef" }}>
//                             My Sessions
//                         </h1>
//                         <p className="text-sm mt-1" style={{ color: "#2a7a52" }}>
//                             {sessions.length > 0
//                                 ? `${sessions.length} sessions · ${counts.completed || 0} completed`
//                                 : "No sessions yet"}
//                         </p>
//                     </div>

//                     {sessions.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                             {Object.entries(counts).map(([status, count]) => {
//                                 const sp = STATUS_PILL[status];
//                                 return (
//                                     <div
//                                         key={status}
//                                         className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
//                                         style={{ color: sp?.color, border: `1px solid ${sp?.border}`, background: sp?.bg }}
//                                     >
//                                         {count} {STATUS[status]?.label}
//                                     </div>
//                                 );
//                             })}
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

//             {/* List */}
//             <div className="w-full px-4 sm:px-8 lg:px-12 py-6">

//                 {isLoading && (
//                     <div className="flex flex-col items-center justify-center py-32 gap-3">
//                         <div className="w-8 h-8 rounded-full animate-spin" style={{ border: "2px solid #0a3020", borderTopColor: "#0098cc" }} />
//                         <p className="text-sm" style={{ color: "#2a7a52" }}>Loading sessions…</p>
//                     </div>
//                 )}

//                 {isError && (
//                     <div className="flex items-center justify-center py-32">
//                         <div className="text-center">
//                             <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "#1f0d0d", border: "1px solid #3b1a1a" }}>
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#f87171" }}>
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//                                 </svg>
//                             </div>
//                             <p className="text-sm" style={{ color: "#a3d9c2" }}>Failed to load sessions.</p>
//                             <p className="text-xs mt-1" style={{ color: "#2a7a52" }}>Please refresh and try again.</p>
//                         </div>
//                     </div>
//                 )}

//                 {!isLoading && !isError && filtered.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-32 gap-3">
//                         <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#051f12", border: "1px solid #0a3020" }}>
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#2a7a52" }}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
//                             </svg>
//                         </div>
//                         <p className="text-sm" style={{ color: "#2a7a52" }}>
//                             No {filter !== "all" ? filter : ""} sessions found.
//                         </p>
//                     </div>
//                 )}

//                 {!isLoading && !isError && filtered.length > 0 && (
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














// pages/MentorSessionsTable.jsx
import { useNavigate } from "react-router-dom";
import { useGetSessionsByMentorQuery } from "./mysubcriberspislice";

const STATUS_COLORS = {
    pending: { color: "#0098cc", bg: "#0a2818", border: "#0a3020" },
    completed: { color: "#031610", bg: "#0098cc", border: "#0098cc" },
    cancelled: { color: "#f87171", bg: "#1f0d0d", border: "#3b1a1a" },
    missed: { color: "#fbbf24", bg: "#1f1608", border: "#3b2a0a" },
};

function StatusDot({ status }) {
    const s = STATUS_COLORS[status] || STATUS_COLORS.pending;
    return (
        <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: s.color }}
        />
    );
}

function StatusBadge({ status, count }) {
    const s = STATUS_COLORS[status] || STATUS_COLORS.pending;
    if (!count) return null;
    return (
        <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
            style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
        >
            {count} {status}
        </span>
    );
}

function ShortId({ id }) {
    return (
        <code
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: "#051f12", color: "#2a7a52", border: "1px solid #0a3020" }}
        >
            …{id?.slice(-8)}
        </code>
    );
}

export default function MentorSessionsTable() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const { data: result, isLoading, isError } = useGetSessionsByMentorQuery(userData?._id);

    const sessions = result?.data ?? [];

    // Group sessions by subscription_id
    const grouped = sessions.reduce((acc, s) => {
        const key = s.subscription_id;
        if (!acc[key]) {
            acc[key] = {
                subscription_id: s.subscription_id,
                mentor_id: s.mentor_id,
                mentee_id: s.mentee_id,
                sessions: [],
            };
        }
        acc[key].sessions.push(s);
        return acc;
    }, {});

    const rows = Object.values(grouped);


    return (
        <div className="min-h-screen w-full" style={{ background: "#031610" }}>

            {/* Header */}
            <div
                className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10"
                style={{ borderBottom: "1px solid #0a3020" }}
            >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "#2a7a52" }}>
                    Mentorship
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#e2f5ef" }}>
                    Sessions Overview
                </h1>
                <p className="text-sm mt-1" style={{ color: "#2a7a52" }}>
                    {rows.length > 0
                        ? `${rows.length} active subscription${rows.length > 1 ? "s" : ""} · ${sessions.length} total sessions`
                        : "No subscriptions yet"}
                </p>
            </div>

            {/* Content */}
            <div className="w-full px-4 sm:px-8 lg:px-12 py-6">

                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-3">
                        <div
                            className="w-8 h-8 rounded-full animate-spin"
                            style={{ border: "2px solid #0a3020", borderTopColor: "#0098cc" }}
                        />
                        <p className="text-sm" style={{ color: "#2a7a52" }}>Loading sessions…</p>
                    </div>
                )}

                {isError && (
                    <div className="flex items-center justify-center py-32">
                        <div className="text-center">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                                style={{ background: "#1f0d0d", border: "1px solid #3b1a1a" }}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#f87171" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                            <p className="text-sm" style={{ color: "#a3d9c2" }}>Failed to load sessions.</p>
                            <p className="text-xs mt-1" style={{ color: "#2a7a52" }}>Please refresh and try again.</p>
                        </div>
                    </div>
                )}

                {!isLoading && !isError && rows.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "#051f12", border: "1px solid #0a3020" }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#2a7a52" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                            </svg>
                        </div>
                        <p className="text-sm" style={{ color: "#2a7a52" }}>No sessions found.</p>
                    </div>
                )}

                {!isLoading && !isError && rows.length > 0 && (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-hidden rounded-xl" style={{ border: "1px solid #0a3020" }}>
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr style={{ background: "#051f12", borderBottom: "1px solid #0a3020" }}>
                                        {["#", "Mentee ID", "Subscription ID", "Total Sessions", "Status Breakdown", ""].map((h, i) => (
                                            <th
                                                key={i}
                                                className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                                                style={{ color: "#2a7a52" }}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, idx) => {
                                        const counts = row.sessions.reduce((acc, s) => {
                                            acc[s.status] = (acc[s.status] || 0) + 1;
                                            return acc;
                                        }, {});
                                        const completedPct = Math.round(((counts.completed || 0) / row.sessions.length) * 100);

                                        return (
                                            <tr
                                                key={row.subscription_id}
                                                style={{
                                                    background: idx % 2 === 0 ? "#031610" : "#041914",
                                                    borderBottom: "1px solid #0a3020",
                                                    transition: "background 0.12s",
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = "#051f12")}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#031610" : "#041914")}
                                            >
                                                {/* # */}
                                                <td className="px-5 py-4">
                                                    <div
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                                                        style={{ background: "#0098cc", color: "#031610" }}
                                                    >
                                                        {idx + 1}
                                                    </div>
                                                </td>

                                                {/* Mentee ID */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                                            style={{ background: "#0a2818", border: "1px solid #0a3020", color: "#0098cc" }}
                                                        >
                                                            M
                                                        </div>
                                                        <ShortId id={row.mentee_id} />
                                                    </div>
                                                </td>

                                                {/* Subscription ID */}
                                                <td className="px-5 py-4">
                                                    <ShortId id={row.subscription_id} />
                                                </td>

                                                {/* Total Sessions + progress bar */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-semibold" style={{ color: "#e2f5ef" }}>
                                                            {row.sessions.length}
                                                        </span>
                                                        <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: "#0a3020" }}>
                                                            <div
                                                                className="h-full rounded-full transition-all"
                                                                style={{ width: `${completedPct}%`, background: "#0098cc" }}
                                                            />
                                                        </div>
                                                        <span className="text-xs" style={{ color: "#2a7a52" }}>{completedPct}%</span>
                                                    </div>
                                                </td>

                                                {/* Status Breakdown */}
                                                <td className="px-5 py-4">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {["pending", "completed", "missed", "cancelled"].map((st) =>
                                                            counts[st] ? <StatusBadge key={st} status={st} count={counts[st]} /> : null
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Action */}
                                                <td className="px-5 py-4 text-right">
                                                    <button
                                                        onClick={() =>
                                                            navigate(`/mentor/dashboard/mentor/sessions/${row.subscription_id}`, {
                                                                state: {
                                                                    sessions: row.sessions,
                                                                    mentee_id: row.mentee_id,
                                                                    subscription_id: row.subscription_id,
                                                                },
                                                            })
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors focus:outline-none"
                                                        style={{ background: "#0098cc", color: "#031610" }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#007aaa")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.background = "#0098cc")}
                                                    >
                                                        View Details
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-3">
                            {rows.map((row, idx) => {
                                const counts = row.sessions.reduce((acc, s) => {
                                    acc[s.status] = (acc[s.status] || 0) + 1;
                                    return acc;
                                }, {});
                                const completedPct = Math.round(((counts.completed || 0) / row.sessions.length) * 100);

                                return (
                                    <div
                                        key={row.subscription_id}
                                        className="rounded-xl p-4"
                                        style={{ background: "#051f12", border: "1px solid #0a3020" }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                                                    style={{ background: "#0098cc", color: "#031610" }}
                                                >
                                                    {idx + 1}
                                                </div>
                                                <span className="text-sm font-semibold" style={{ color: "#e2f5ef" }}>
                                                    Subscription
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold" style={{ color: "#0098cc" }}>
                                                {row.sessions.length} sessions
                                            </span>
                                        </div>

                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#2a7a52" }}>Mentee</span>
                                                <ShortId id={row.mentee_id} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#2a7a52" }}>Subscription</span>
                                                <ShortId id={row.subscription_id} />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#2a7a52" }}>Progress</span>
                                                <span className="text-xs" style={{ color: "#0098cc" }}>{completedPct}%</span>
                                            </div>
                                            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#0a3020" }}>
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${completedPct}%`, background: "#0098cc" }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {["pending", "completed", "missed", "cancelled"].map((st) =>
                                                counts[st] ? <StatusBadge key={st} status={st} count={counts[st]} /> : null
                                            )}
                                        </div>

                                        <button
                                            onClick={() =>
                                                navigate(`/mentor/dashboard/mentor/sessions/${row.subscription_id}`, {
                                                    state: {
                                                        sessions: row.sessions,
                                                        mentee_id: row.mentee_id,
                                                        subscription_id: row.subscription_id,
                                                    },
                                                })
                                            }
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold focus:outline-none"
                                            style={{ background: "#0098cc", color: "#031610" }}
                                        >
                                            View Details
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


