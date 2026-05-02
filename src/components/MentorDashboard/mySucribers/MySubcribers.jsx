

// import { useState } from "react";
// import {
//     useGetSessionsByMentorQuery,
//     useGetSubscribersByMentorQuery,
//     useUpdateByMentorSessionMutation,
// } from "./mysubcriberspislice";

// const STATUS_CONFIG = {
//     pending: { color: "#00c2ff", bg: "rgba(0,194,255,0.08)", border: "rgba(0,194,255,0.22)", label: "Pending" },
//     completed: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", label: "Completed" },
//     cancelled: { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.22)", label: "Cancelled" },
//     missed: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", label: "Missed" },
//     active: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", label: "Active" },
//     onprocess: { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.22)", label: "On Process" },
//     approved: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", label: "Approved" },
// };

// const PLAN_LABELS = { one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" };

// const fmt = (iso) => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
// const fmtDT = (iso) => iso ? new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

// function StatusPill({ status }) {
//     const s = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
//     return (
//         <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 5px ${s.color}`, flexShrink: 0 }} />
//             {s.label}
//         </span>
//     );
// }

// function ShortId({ id }) {
//     return (
//         <code style={{ fontFamily: "monospace", fontSize: 11, color: "#6db892", background: "#0b2418", border: "1px solid #0d3020", borderRadius: 6, padding: "2px 7px" }}>
//             …{id?.slice(-8)}
//         </code>
//     );
// }

// function ProgressBar({ done, total }) {
//     const pct = total > 0 ? Math.round((done / total) * 100) : 0;
//     return (
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div style={{ flex: 1, height: 5, borderRadius: 99, background: "#0b2418", overflow: "hidden" }}>
//                 <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#0098cc,#00c2ff)", borderRadius: 99, transition: "width .5s ease" }} />
//             </div>
//             <span style={{ fontSize: 11, fontWeight: 700, color: "#00c2ff", minWidth: 32, textAlign: "right" }}>{pct}%</span>
//         </div>
//     );
// }

// function Spinner() {
//     return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "48px 0" }}>
//             <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #0d3020", borderTopColor: "#00c2ff", animation: "spin .8s linear infinite" }} />
//             <span style={{ fontSize: 12, color: "#6db892" }}>Loading…</span>
//             <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//         </div>
//     );
// }

// function Toast({ toast }) {
//     if (!toast) return null;
//     const ok = toast.type === "success";
//     return (
//         <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, background: "#071a10", border: `1px solid ${ok ? "rgba(52,211,153,0.4)" : "rgba(248,113,113,0.4)"}`, color: ok ? "#34d399" : "#f87171", boxShadow: "0 8px 32px rgba(0,0,0,.5)", animation: "toastIn .2s ease" }}>
//             {ok ? "✓" : "✕"} {toast.msg}
//             <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
//         </div>
//     );
// }

// // ── Session Edit Modal ──────────────────────────────────────────────────────
// function SessionEditModal({ session, onClose, onSave }) {
//     const [saving, setSaving] = useState(false);
//     const [tab, setTab] = useState("details");
//     const [form, setForm] = useState({
//         session_title: session.session_title || "",
//         session_date: session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : "",
//         meeting_link: session.meeting_link || "",
//         meeting_description: session.meeting_description || "",
//         tasks_given: session.tasks_given || "",
//         task_completed: session.task_completed || false,
//         mentee_feedback: session.mentee_feedback || "",
//         mentee_rating: session.mentee_rating || 0,
//         status: session.status || "pending",
//     });

//     const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
//     const st = STATUS_CONFIG[form.status] || STATUS_CONFIG.pending;

//     const inputStyle = { width: "100%", background: "#020e09", border: "1px solid #0d3020", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#e6f7f0", outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
//     const roStyle = { ...inputStyle, background: "#0b2418", color: "#6db892", cursor: "default" };
//     const labelStyle = { display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00c2ff", marginBottom: 6 };

//     const handleSave = async () => {
//         setSaving(true);
//         await onSave(session._id, form);
//         setSaving(false);
//         onClose();
//     };

//     const TABS = ["details", "tasks", "feedback"];

//     return (
//         <>
//             <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,14,9,0.9)", backdropFilter: "blur(8px)", zIndex: 90 }} />
//             <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(680px, calc(100vw - 24px))", maxHeight: "calc(100vh - 40px)", background: "#071a10", border: `1px solid ${st.border}`, borderTop: `3px solid ${st.color}`, borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,.7)", zIndex: 100, display: "flex", flexDirection: "column", overflow: "hidden", animation: "modalIn .22s cubic-bezier(.22,1,.36,1)" }}>

//                 {/* Header */}
//                 <div style={{ padding: "18px 22px 0", flexShrink: 0 }}>
//                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                             <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(0,194,255,0.1)", border: "1.5px solid rgba(0,194,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#00c2ff" }}>
//                                 {session.session_number}
//                             </div>
//                             <div>
//                                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 3px" }}>Session {session.session_number}</p>
//                                 <h2 style={{ fontSize: 15, fontWeight: 700, color: "#e6f7f0", margin: 0 }}>{form.session_title || `Session ${session.session_number}`}</h2>
//                             </div>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                             <StatusPill status={form.status} />
//                             <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, background: "#0b2418", border: "1px solid #0d3020", color: "#6db892", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>✕</button>
//                         </div>
//                     </div>
//                     {/* Tabs */}
//                     <div style={{ display: "flex", gap: 2, background: "#0b2418", border: "1px solid #0d3020", borderRadius: 10, padding: 3, marginBottom: 0 }}>
//                         {TABS.map(t => (
//                             <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", textTransform: "capitalize", transition: "all .15s", background: tab === t ? "rgba(0,194,255,0.12)" : "transparent", color: tab === t ? "#00c2ff" : "#2e6647", boxShadow: tab === t ? "inset 0 0 0 1px rgba(0,194,255,0.25)" : "none" }}>
//                                 {t === "details" ? "Session Details" : t === "tasks" ? "Tasks" : "Feedback"}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Body */}
//                 <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>

//                     {tab === "details" && (
//                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//                             <div style={{ gridColumn: "1/-1" }}>
//                                 <label style={labelStyle}>Session Title</label>
//                                 <input style={inputStyle} value={form.session_title} onChange={set("session_title")} placeholder="e.g. Introduction & Goal Setting" />
//                             </div>
//                             <div>
//                                 <label style={labelStyle}>Date & Time</label>
//                                 <input type="datetime-local" style={inputStyle} value={form.session_date} onChange={set("session_date")} />
//                             </div>
//                             <div>
//                                 <label style={labelStyle}>Status</label>
//                                 <select style={inputStyle} value={form.status} onChange={set("status")}>
//                                     <option value="pending">Pending</option>
//                                     <option value="completed">Completed</option>
//                                     <option value="cancelled">Cancelled</option>
//                                     <option value="missed">Missed</option>
//                                 </select>
//                             </div>
//                             <div style={{ gridColumn: "1/-1" }}>
//                                 <label style={labelStyle}>Meeting Link</label>
//                                 <input style={inputStyle} value={form.meeting_link} onChange={set("meeting_link")} placeholder="https://zoom.us/j/…" />
//                             </div>
//                             <div style={{ gridColumn: "1/-1" }}>
//                                 <label style={labelStyle}>Your Description (Mentor)</label>
//                                 <textarea rows={4} style={{ ...inputStyle, resize: "none" }} value={form.meeting_description} onChange={set("meeting_description")} placeholder="Agenda for this session…" />
//                             </div>
//                             <div style={{ gridColumn: "1/-1" }}>
//                                 <label style={labelStyle}>Mentee's Description</label>
//                                 {session.mentee_meeting_description
//                                     ? <textarea rows={3} readOnly style={{ ...roStyle, resize: "none" }} value={session.mentee_meeting_description} />
//                                     : <div style={{ padding: "12px 14px", borderRadius: 8, background: "#0b2418", border: "1px dashed #0d3020", fontSize: 12, color: "#2e6647" }}>No description from mentee yet</div>
//                                 }
//                             </div>
//                         </div>
//                     )}

//                     {tab === "tasks" && (
//                         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                             <div>
//                                 <label style={labelStyle}>Tasks Assigned</label>
//                                 <textarea rows={5} style={{ ...inputStyle, resize: "none" }} value={form.tasks_given} onChange={set("tasks_given")} placeholder="Enter tasks for the mentee…" />
//                             </div>
//                             <div>
//                                 <label style={labelStyle}>Mentee's Submission</label>
//                                 {session.task_submission
//                                     ? <a href={session.task_submission} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", borderRadius: 9, background: "#020e09", border: "1px solid #0d3020", color: "#00c2ff", fontSize: 12, textDecoration: "none", wordBreak: "break-all" }}>
//                                         🔗 {session.task_submission}
//                                     </a>
//                                     : <div style={{ padding: "14px", borderRadius: 8, background: "#0b2418", border: "1px dashed #0d3020", fontSize: 12, color: "#2e6647", textAlign: "center" }}>No submission yet</div>
//                                 }
//                             </div>
//                             {session.task_submitted_at && (
//                                 <p style={{ fontSize: 11, color: "#2e6647", margin: 0 }}>Submitted: {fmtDT(session.task_submitted_at)}</p>
//                             )}
//                         </div>
//                     )}

//                     {tab === "feedback" && (
//                         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

//                             {/* Mentee Feedback */}
//                             <div>
//                                 <label style={labelStyle}>Mentee Feedback (by you)</label>
//                                 <textarea
//                                     rows={4}
//                                     style={{ ...inputStyle, resize: "none" }}
//                                     value={form.mentee_feedback}
//                                     onChange={set("mentee_feedback")}
//                                     placeholder="Share thoughts on this session…"
//                                 />
//                             </div>

//                             {/* Mentee Rating (READ ONLY) */}
//                             <div>
//                                 <label style={labelStyle}>Rating (1–5)</label>
//                                 <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                                     {[1, 2, 3, 4, 5].map(n => (
//                                         <span
//                                             key={n}
//                                             style={{
//                                                 fontSize: 26,
//                                                 color: n <= form.mentee_rating ? "#00c2ff" : "#0d3020",
//                                                 cursor: "default" // 👈 no pointer
//                                             }}
//                                         >
//                                             ★
//                                         </span>
//                                     ))}
//                                     <span style={{ fontSize: 12, color: "#6db892", marginLeft: 4 }}>
//                                         {form.mentee_rating > 0 ? `${form.mentee_rating}/5` : "Not rated"}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Mentor Feedback */}
//                             {session.mentor_feedback && (
//                                 <div>
//                                     <label style={labelStyle}>Mentor Feedback (read-only)</label>
//                                     <textarea
//                                         rows={3}
//                                         readOnly
//                                         style={{ ...roStyle, resize: "none" }}
//                                         value={session.mentor_feedback}
//                                     />
//                                 </div>
//                             )}

//                             {/* Mentor Rating (READ ONLY) */}
//                             {session.mentor_rating > 0 && (
//                                 <div>
//                                     <label style={labelStyle}>Mentor Rating</label>
//                                     <div style={{ display: "flex", gap: 8 }}>
//                                         {[1, 2, 3, 4, 5].map(n => (
//                                             <span
//                                                 key={n}
//                                                 style={{
//                                                     fontSize: 24,
//                                                     color: n <= session.mentor_rating ? "#00c2ff" : "#0d3020"
//                                                 }}
//                                             >
//                                                 ★
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                         </div>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <div style={{ padding: "14px 22px 18px", borderTop: "1px solid #0d3020", display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0 }}>
//                     <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, background: "transparent", border: "1px solid #0d3020", color: "#00c2ff", cursor: "pointer" }}>Cancel</button>
//                     <button onClick={handleSave} disabled={saving} style={{ padding: "9px 24px", borderRadius: 9, fontSize: 13, fontWeight: 700, background: saving ? "#0098cc" : "#00c2ff", color: "#020e09", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? .75 : 1, display: "flex", alignItems: "center", gap: 8 }}>
//                         {saving && <span style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid #020e09", borderTopColor: "transparent", animation: "spin .7s linear infinite", display: "inline-block" }} />}
//                         {saving ? "Saving…" : "Save Changes"}
//                     </button>
//                 </div>
//             </div>
//             <style>{`@keyframes modalIn{from{opacity:0;transform:translate(-50%,-48%) scale(.96)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}`}</style>
//         </>
//     );
// }

// // ── Session Drawer ───────────────────────────────────────────────────────────
// function SessionDrawer({ row, subscription, onClose, onSave }) {
//     const [filter, setFilter] = useState("all");
//     const [editingSession, setEditingSession] = useState(null);

//     const counts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
//     const filtered = filter === "all" ? row.sessions : row.sessions.filter(s => s.status === filter);
//     const FILTERS = ["all", "pending", "completed", "missed", "cancelled"];

//     return (
//         <>
//             {!editingSession && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,14,9,0.82)", backdropFilter: "blur(6px)", zIndex: 40 }} />}
//             <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(640px, 100vw)", background: "#071a10", borderLeft: "1px solid #0d3020", zIndex: 50, display: "flex", flexDirection: "column", animation: "slideIn .25s cubic-bezier(.22,1,.36,1)" }}>

//                 {/* Sticky Header */}
//                 <div style={{ padding: "20px 22px 14px", borderBottom: "1px solid #0d3020", position: "sticky", top: 0, background: "#071a10", zIndex: 10 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
//                         <div>
//                             <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 5px" }}>Session Details</p>
//                             <h2 style={{ fontSize: 16, fontWeight: 700, color: "#e6f7f0", margin: "0 0 4px" }}>
//                                 {PLAN_LABELS[subscription?.plan_type] || "Plan"} · {row.sessions.length} Sessions
//                             </h2>
//                             <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//                                 <ShortId id={row.subscription_id} />
//                                 {subscription && <StatusPill status={subscription.status} />}
//                             </div>
//                         </div>
//                         <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, background: "#0b2418", border: "1px solid #0d3020", color: "#6db892", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>✕</button>
//                     </div>

//                     {/* Subscription Info Strip */}
//                     {subscription && (
//                         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14 }}>
//                             {[
//                                 ["Amount", `₹${subscription.amount?.toLocaleString("en-IN")}`, "#34d399"],
//                                 ["Sessions", `${subscription.total_sessions}`, "#00c2ff"],
//                                 ["Start", fmt(subscription.subscribed_at), "#e6f7f0"],
//                                 ["End", fmt(subscription.effective_end_date), "#fbbf24"],
//                             ].map(([label, val, color]) => (
//                                 <div key={label} style={{ background: "#0b2418", border: "1px solid #0d3020", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
//                                     <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", marginBottom: 3 }}>{label}</div>
//                                     <div style={{ fontSize: 12, fontWeight: 700, color }}>{val}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {/* Status summary */}
//                     <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
//                         {["completed", "pending", "missed", "cancelled"].map(st => {
//                             const s = STATUS_CONFIG[st];
//                             return (
//                                 <div key={st} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "8px 0", textAlign: "center" }}>
//                                     <div style={{ fontSize: 18, fontWeight: 800, color: s.color, lineHeight: 1 }}>{counts[st] || 0}</div>
//                                     <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: s.color, marginTop: 3, opacity: 0.7 }}>{st}</div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* Progress */}
//                     <div style={{ marginBottom: 12 }}>
//                         <ProgressBar done={counts.completed || 0} total={row.sessions.length} />
//                     </div>

//                     {/* Filter tabs */}
//                     <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 2 }}>
//                         {FILTERS.map(f => (
//                             <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all .15s", background: filter === f ? "#00c2ff" : "#0b2418", color: filter === f ? "#020e09" : "#2e6647" }}>
//                                 {f === "all" ? `All (${row.sessions.length})` : `${f} (${counts[f] || 0})`}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Session Rows */}
//                 <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
//                     {filtered.length === 0
//                         ? <div style={{ textAlign: "center", padding: "40px 0", color: "#2e6647", fontSize: 13 }}>No {filter !== "all" ? filter : ""} sessions</div>
//                         : (
//                             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 8px" }}>Click any session to edit</p>
//                                 {filtered.map((session, i) => {
//                                     const st = STATUS_CONFIG[session.status] || STATUS_CONFIG.pending;
//                                     return (
//                                         <div key={session._id || i} onClick={() => setEditingSession(session)}
//                                             style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, cursor: "pointer", background: "#020e09", border: `1px solid #0d3020`, borderLeft: `3px solid ${st.color}`, transition: "all .15s" }}
//                                             onMouseEnter={e => { e.currentTarget.style.background = "#0b2418"; e.currentTarget.style.borderColor = "#134030"; }}
//                                             onMouseLeave={e => { e.currentTarget.style.background = "#020e09"; e.currentTarget.style.borderColor = "#0d3020"; }}>
//                                             <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#00c2ff", flexShrink: 0 }}>
//                                                 {session.session_number || i + 1}
//                                             </div>
//                                             <div style={{ flex: 1, minWidth: 0 }}>
//                                                 <p style={{ fontSize: 13, fontWeight: 600, color: "#e6f7f0", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                                     {session.session_title || `Session ${session.session_number || i + 1}`}
//                                                 </p>
//                                                 <p style={{ fontSize: 11, color: "#2e6647", margin: 0 }}>
//                                                     {session.session_date ? fmtDT(session.session_date) : "No date set"}
//                                                     {session.task_completed ? " · ✓ Task done" : ""}
//                                                 </p>
//                                             </div>
//                                             <StatusPill status={session.status} />
//                                             <span style={{ fontSize: 11, color: "#6db892", flexShrink: 0 }}>Edit →</span>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>

//             {editingSession && (
//                 <SessionEditModal session={editingSession} onClose={() => setEditingSession(null)} onSave={onSave} />
//             )}

//             <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
//         </>
//     );
// }

// // ── Main Component ───────────────────────────────────────────────────────────
// export default function MentorSessionsTable() {
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [activeTab, setActiveTab] = useState("sessions");
//     const [toast, setToast] = useState(null);

//     const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

//     const { data: sessionsResult, isLoading: sessionsLoading, isError: sessionsError } = useGetSessionsByMentorQuery(mentorId);
//     const { data: subscribersResult, isLoading: subscribersLoading, isError: subscribersError } = useGetSubscribersByMentorQuery(mentorId);
//     const [updateSession] = useUpdateByMentorSessionMutation();

//     const sessions = sessionsResult?.data ?? [];
//     const subscribers = subscribersResult?.data ?? subscribersResult?.subscriptions ?? [];

//     // Group sessions by subscription_id, also map subscription doc
//     const subMap = subscribers.reduce((acc, s) => { acc[s._id || s.id] = s; return acc; }, {});
//     const grouped = sessions.reduce((acc, s) => {
//         const k = s.subscription_id;
//         if (!acc[k]) acc[k] = { subscription_id: k, mentor_id: s.mentor_id, mentee_id: s.mentee_id, sessions: [] };
//         acc[k].sessions.push(s);
//         return acc;
//     }, {});
//     const rows = Object.values(grouped);

//     const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

//     const handleSave = async (session_id, form) => {
//         try {
//             await updateSession({ session_id, ...form }).unwrap();
//             showToast("Session updated successfully.");
//         } catch {
//             showToast("Failed to update session.", "error");
//         }
//     };

//     const thStyle = { fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2e6647", padding: "12px 16px", background: "#0b2418", textAlign: "left", whiteSpace: "nowrap" };
//     const tdStyle = { padding: "14px 16px", borderBottom: "1px solid #0d3020", verticalAlign: "middle", fontSize: 13, color: "#e6f7f0" };

//     return (
//         <div style={{ minHeight: "100vh", background: "#020e09", fontFamily: "'DM Sans',sans-serif" }}>
//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//                 * { box-sizing: border-box; }
//                 ::-webkit-scrollbar { width: 5px; height: 5px; }
//                 ::-webkit-scrollbar-track { background: #020e09; }
//                 ::-webkit-scrollbar-thumb { background: #0d3020; border-radius: 99px; }
//                 tr:hover td { background: #0b2418 !important; }
//                 @keyframes spin { to { transform: rotate(360deg); } }
//                 @media (max-width: 768px) {
//                     .desktop-table { display: none !important; }
//                     .mobile-cards  { display: flex !important; }
//                 }
//             `}</style>

//             {/* Page Header */}
//             <div style={{ padding: "28px 28px 0", borderBottom: "1px solid #0d3020" }}>
//                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#2e6647", marginBottom: 6 }}>Mentorship Portal</p>
//                 <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 22 }}>
//                     <div>
//                         <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: "#e6f7f0", margin: 0 }}>Sessions Overview</h1>
//                         <p style={{ fontSize: 13, color: "#6db892", marginTop: 4 }}>
//                             {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} · {sessions.length} total sessions
//                         </p>
//                     </div>
//                     {/* Stat pills */}
//                     <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//                         {[
//                             { label: "Subscribers", value: subscribersLoading ? "—" : subscribers.length, color: "#34d399" },
//                             { label: "Completed", value: sessionsLoading ? "—" : sessions.filter(s => s.status === "completed").length, color: "#34d399" },
//                             { label: "Pending", value: sessionsLoading ? "—" : sessions.filter(s => s.status === "pending").length, color: "#00c2ff" },
//                             { label: "Missed", value: sessionsLoading ? "—" : sessions.filter(s => s.status === "missed").length, color: "#fbbf24" },
//                         ].map(({ label, value, color }) => (
//                             <div key={label} style={{ background: "#071a10", border: "1px solid #0d3020", borderRadius: 12, padding: "10px 18px", textAlign: "center", minWidth: 76 }}>
//                                 <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
//                                 <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2e6647", marginTop: 4 }}>{label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {/* Tabs */}
//                 <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #0d3020" }}>
//                     {[["subscribers", "Subscribers", subscribers.length], ["sessions", "Sessions", rows.length]].map(([id, label, count]) => (
//                         <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "10px 22px", fontSize: 13, fontWeight: 700, background: "transparent", border: "none", cursor: "pointer", color: activeTab === id ? "#00c2ff" : "#2e6647", borderBottom: activeTab === id ? "2px solid #00c2ff" : "2px solid transparent", marginBottom: -2, transition: "all .15s", display: "flex", alignItems: "center", gap: 7 }}>
//                             {label}
//                             {count > 0 && <span style={{ fontSize: 10, fontWeight: 800, color: activeTab === id ? "#020e09" : "#6db892", background: activeTab === id ? "#00c2ff" : "#0b2418", border: `1px solid ${activeTab === id ? "#00c2ff" : "#0d3020"}`, borderRadius: 10, padding: "1px 6px" }}>{count}</span>}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Body */}
//             <div style={{ padding: "24px 28px" }}>

//                 {/* ══ SUBSCRIBERS TAB ══ */}
//                 {activeTab === "subscribers" && (
//                     <>
//                         {subscribersLoading && <Spinner />}
//                         {subscribersError && <div style={{ padding: "14px 18px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: 12, color: "#f87171", fontSize: 13 }}>Failed to load subscribers.</div>}

//                         {!subscribersLoading && !subscribersError && subscribers.length === 0 && (
//                             <div style={{ textAlign: "center", padding: "60px 0", color: "#2e6647", fontSize: 14 }}>No subscribers yet.</div>
//                         )}

//                         {!subscribersLoading && !subscribersError && subscribers.length > 0 && (
//                             <>
//                                 {/* Desktop Table */}
//                                 <div className="desktop-table" style={{ borderRadius: 16, border: "1px solid #0d3020", overflow: "hidden" }}>
//                                     <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                                         <thead>
//                                             <tr>
//                                                 {["#", "Mentee ID", "Plan", "Total Sessions", "Amount", "Payment", "Start Date", "End Date", "Status"].map(h => (
//                                                     <th key={h} style={thStyle}>{h}</th>
//                                                 ))}
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {subscribers.map((sub, idx) => {
//                                                 const isActive = sub.status === "active";
//                                                 return (
//                                                     <tr key={sub._id || idx} style={{ background: idx % 2 === 0 ? "#020e09" : "#071a10" }}>
//                                                         <td style={{ ...tdStyle, color: "#2e6647", fontWeight: 700 }}>{idx + 1}</td>
//                                                         <td style={tdStyle}><ShortId id={sub.mentee_id} /></td>
//                                                         <td style={{ ...tdStyle, fontWeight: 600, color: "#00c2ff" }}>{PLAN_LABELS[sub.plan_type] || sub.plan_type}</td>
//                                                         <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700, color: "#00c2ff" }}>{sub.total_sessions}</td>
//                                                         <td style={{ ...tdStyle, fontWeight: 700, color: "#34d399" }}>₹{sub.amount?.toLocaleString("en-IN")}</td>
//                                                         <td style={tdStyle}><StatusPill status={sub.payment_status} /></td>
//                                                         <td style={{ ...tdStyle, color: "#6db892", fontSize: 12 }}>{fmt(sub.subscribed_at)}</td>
//                                                         <td style={{ ...tdStyle, color: "#fbbf24", fontSize: 12 }}>{fmt(sub.effective_end_date || sub.subscription_end_date)}</td>
//                                                         <td style={tdStyle}><StatusPill status={sub.status} /></td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 {/* Mobile Cards */}
//                                 <div className="mobile-cards" style={{ display: "none", flexDirection: "column", gap: 12 }}>
//                                     {subscribers.map((sub, idx) => (
//                                         <div key={sub._id || idx} style={{ background: "#071a10", border: "1px solid #0d3020", borderTop: "2px solid #00c2ff", borderRadius: 14, padding: "16px 18px" }}>
//                                             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                                                 <div>
//                                                     <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 4px" }}>Subscriber #{idx + 1}</p>
//                                                     <ShortId id={sub.mentee_id} />
//                                                 </div>
//                                                 <StatusPill status={sub.status} />
//                                             </div>
//                                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
//                                                 {[
//                                                     ["Plan", PLAN_LABELS[sub.plan_type] || sub.plan_type, "#00c2ff"],
//                                                     ["Sessions", sub.total_sessions, "#00c2ff"],
//                                                     ["Amount", `₹${sub.amount?.toLocaleString("en-IN")}`, "#34d399"],
//                                                     ["Payment", sub.payment_status, "#e6f7f0"],
//                                                     ["Start", fmt(sub.subscribed_at), "#6db892"],
//                                                     ["Expires", fmt(sub.effective_end_date), "#fbbf24"],
//                                                 ].map(([label, val, color]) => (
//                                                     <div key={label}>
//                                                         <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", marginBottom: 3 }}>{label}</div>
//                                                         <div style={{ fontSize: 13, fontWeight: 600, color }}>{val}</div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </>
//                         )}
//                     </>
//                 )}

//                 {/* ══ SESSIONS TAB ══ */}
//                 {activeTab === "sessions" && (
//                     <>
//                         {sessionsLoading && <Spinner />}
//                         {sessionsError && <div style={{ padding: "14px 18px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: 12, color: "#f87171", fontSize: 13 }}>Failed to load sessions.</div>}

//                         {!sessionsLoading && !sessionsError && rows.length === 0 && (
//                             <div style={{ textAlign: "center", padding: "60px 0", color: "#2e6647", fontSize: 14 }}>No sessions found.</div>
//                         )}

//                         {!sessionsLoading && !sessionsError && rows.length > 0 && (
//                             <>
//                                 {/* Desktop Table */}
//                                 <div className="desktop-table" style={{ borderRadius: 16, border: "1px solid #0d3020", overflow: "hidden" }}>
//                                     <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                                         <thead>
//                                             <tr>
//                                                 {["#", "Mentee", "Subscription ID", "Plan", "Total", "Done", "Pending", "Missed", "Progress", "Status", "Action"].map(h => (
//                                                     <th key={h} style={thStyle}>{h}</th>
//                                                 ))}
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {rows.map((row, idx) => {
//                                                 const sub = subMap[row.subscription_id];
//                                                 const cnts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
//                                                 return (
//                                                     <tr key={row.subscription_id} style={{ background: idx % 2 === 0 ? "#020e09" : "#071a10" }}>
//                                                         <td style={{ ...tdStyle, color: "#2e6647", fontWeight: 700 }}>{idx + 1}</td>
//                                                         <td style={tdStyle}><ShortId id={row.mentee_id} /></td>
//                                                         <td style={tdStyle}><ShortId id={row.subscription_id} /></td>
//                                                         <td style={{ ...tdStyle, fontWeight: 600, color: "#00c2ff" }}>{sub ? PLAN_LABELS[sub.plan_type] || sub.plan_type : "—"}</td>
//                                                         <td style={{ ...tdStyle, fontWeight: 700, color: "#00c2ff", textAlign: "center" }}>{row.sessions.length}</td>
//                                                         <td style={{ ...tdStyle, fontWeight: 700, color: "#34d399", textAlign: "center" }}>{cnts.completed || 0}</td>
//                                                         <td style={{ ...tdStyle, fontWeight: 700, color: "#00c2ff", textAlign: "center" }}>{cnts.pending || 0}</td>
//                                                         <td style={{ ...tdStyle, fontWeight: 700, color: "#fbbf24", textAlign: "center" }}>{cnts.missed || 0}</td>
//                                                         <td style={{ ...tdStyle, minWidth: 120 }}>
//                                                             <ProgressBar done={cnts.completed || 0} total={row.sessions.length} />
//                                                         </td>
//                                                         <td style={tdStyle}>{sub && <StatusPill status={sub.status} />}</td>
//                                                         <td style={tdStyle}>
//                                                             <button onClick={() => setSelectedRow(row)}
//                                                                 style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00c2ff", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s" }}
//                                                                 onMouseEnter={e => { e.currentTarget.style.background = "#00c2ff"; e.currentTarget.style.color = "#020e09"; }}
//                                                                 onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,194,255,0.1)"; e.currentTarget.style.color = "#00c2ff"; }}>
//                                                                 View →
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 {/* Mobile Cards */}
//                                 <div className="mobile-cards" style={{ display: "none", flexDirection: "column", gap: 12 }}>
//                                     {rows.map((row, idx) => {
//                                         const sub = subMap[row.subscription_id];
//                                         const cnts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
//                                         return (
//                                             <div key={row.subscription_id} style={{ background: "#071a10", border: "1px solid #0d3020", borderTop: "2px solid #00c2ff", borderRadius: 14, padding: "16px 18px" }}>
//                                                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                                                     <div>
//                                                         <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 4px" }}>Subscription #{idx + 1}</p>
//                                                         <ShortId id={row.subscription_id} />
//                                                     </div>
//                                                     {sub && <StatusPill status={sub.status} />}
//                                                 </div>
//                                                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 12 }}>
//                                                     {[
//                                                         ["Plan", sub ? PLAN_LABELS[sub.plan_type] || sub.plan_type : "—", "#00c2ff"],
//                                                         ["Total", row.sessions.length, "#00c2ff"],
//                                                         ["Completed", cnts.completed || 0, "#34d399"],
//                                                         ["Pending", cnts.pending || 0, "#00c2ff"],
//                                                         ["Missed", cnts.missed || 0, "#fbbf24"],
//                                                         ["Cancelled", cnts.cancelled || 0, "#f87171"],
//                                                     ].map(([label, val, color]) => (
//                                                         <div key={label}>
//                                                             <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", marginBottom: 3 }}>{label}</div>
//                                                             <div style={{ fontSize: 14, fontWeight: 700, color }}>{val}</div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                                 <div style={{ marginBottom: 14 }}><ProgressBar done={cnts.completed || 0} total={row.sessions.length} /></div>
//                                                 <button onClick={() => setSelectedRow(row)} style={{ width: "100%", padding: "11px", borderRadius: 10, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00c2ff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
//                                                     View Sessions →
//                                                 </button>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </>
//                         )}
//                     </>
//                 )}
//             </div>

//             {selectedRow && (
//                 <SessionDrawer
//                     row={selectedRow}
//                     subscription={subMap[selectedRow.subscription_id]}
//                     onClose={() => setSelectedRow(null)}
//                     onSave={handleSave}
//                 />
//             )}

//             <Toast toast={toast} />
//         </div>
//     );
// }


// Full Tailwind conversion started
// Theme used:
// Primary text/accent: #0098cc
// Buttons/dark actions: #1a1a2e
// Background: white / gray-50
// Text: gray shades

import React, { useState } from "react";
import {
  useGetSessionsByMentorQuery,
  useGetSubscribersByMentorQuery,
  useUpdateByMentorSessionMutation,
} from "./mysubcriberspislice";

const STATUS_STYLES = {
  pending: "bg-cyan-50 text-cyan-600 border border-cyan-200",
  completed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
  missed: "bg-amber-50 text-amber-600 border border-amber-200",
  active: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  approved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  onprocess: "bg-blue-50 text-blue-600 border border-blue-200",
};

const PLAN_LABELS = {
  one_month: "1 Month",
  three_months: "3 Months",
  six_months: "6 Months",
};

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
        STATUS_STYLES[status] || STATUS_STYLES.pending
      }`}
    >
      {status || "pending"}
    </span>
  );
}

function ShortId({ id }) {
  return (
    <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-mono border">
      ...{id?.slice(-8)}
    </span>
  );
}

export default function MentorSessionsTable() {
  const [activeTab, setActiveTab] = useState("sessions");
  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const { data: sessionsResult, isLoading: sessionsLoading } =
    useGetSessionsByMentorQuery(mentorId);

  const { data: subscribersResult, isLoading: subscribersLoading } =
    useGetSubscribersByMentorQuery(mentorId);

  const [updateSession] = useUpdateByMentorSessionMutation();

  const sessions = sessionsResult?.data || [];
  const subscribers =
    subscribersResult?.data || subscribersResult?.subscriptions || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Mentorship Portal
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a2e]">
              Sessions Overview
            </h1>
            <p className="text-gray-500 mt-1">
              {subscribers.length} subscribers · {sessions.length} total sessions
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              ["Subscribers", subscribers.length],
              [
                "Completed",
                sessions.filter((s) => s.status === "completed").length,
              ],
              [
                "Pending",
                sessions.filter((s) => s.status === "pending").length,
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 min-w-[120px]"
              >
                <p className="text-2xl font-bold text-[#0098cc]">{value}</p>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-gray-200">
          {["subscribers", "sessions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize border-b-2 transition ${
                activeTab === tab
                  ? "text-[#0098cc] border-[#0098cc]"
                  : "text-gray-500 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribers */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "#",
                    "Mentee",
                    "Plan",
                    "Sessions",
                    "Amount",
                    "Status",
                  ].map((head) => (
                    <th
                      key={head}
                      className="text-left px-5 py-4 text-xs uppercase tracking-wide text-gray-500"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {subscribers.map((sub, index) => (
                  <tr
                    key={sub._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4">
                      <ShortId id={sub.mentee_id} />
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#0098cc]">
                      {PLAN_LABELS[sub.plan_type] || sub.plan_type}
                    </td>
                    <td className="px-5 py-4">{sub.total_sessions}</td>
                    <td className="px-5 py-4 font-semibold text-emerald-600">
                      ₹{sub.amount?.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill status={sub.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sessions */}
      {activeTab === "sessions" && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["#", "Subscription", "Plan", "Total", "Status"].map(
                    (head) => (
                      <th
                        key={head}
                        className="text-left px-5 py-4 text-xs uppercase tracking-wide text-gray-500"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {sessions.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">{index + 1}</td>
                    <td className="px-5 py-4">
                      <ShortId id={item.subscription_id} />
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#0098cc]">
                      Session
                    </td>
                    <td className="px-5 py-4">1</td>
                    <td className="px-5 py-4">
                      <StatusPill status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
