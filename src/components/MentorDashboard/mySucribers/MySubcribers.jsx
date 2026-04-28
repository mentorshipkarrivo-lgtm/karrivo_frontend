// import { useState } from "react";
// import {
//     useGetSessionsByMentorQuery,
//     useGetSubscribersByMentorQuery,
//     useUpdateByMentorSessionMutation,
// } from "./mysubcriberspislice";


// const T = {
//     bg: "#020e09",
//     surface: "#071a10",
//     surfaceHi: "#0b2418",
//     border: "#0d3020",
//     borderLt: "#134030",
//     accent: "#00c2ff",
//     accentDim: "#0098cc",
//     accentGlow: "rgba(0,194,255,0.12)",
//     green: "#34d399",
//     greenGlow: "rgba(52,211,153,0.10)",
//     text: "#e6f7f0",
//     textSec: "#6db892",
//     textMuted: "#2e6647",
// };

// const STATUS = {
//     pending: { color: "#00c2ff", bg: "rgba(0,194,255,0.08)", border: "rgba(0,194,255,0.22)", label: "Pending" },
//     completed: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", label: "Completed" },
//     cancelled: { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.22)", label: "Cancelled" },
//     missed: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", label: "Missed" },
// };

// const inp = {
//     width: "100%", background: T.bg, border: `1px solid ${T.border}`,
//     borderRadius: 8, padding: "10px 13px", fontSize: 13, color: T.text,
//     outline: "none", fontFamily: "inherit", transition: "border-color 0.15s",
//     boxSizing: "border-box",
// };
// const inpRO = { ...inp, background: T.surfaceHi, cursor: "default", color: T.textSec };
// const fi = (e) => (e.target.style.borderColor = T.accent);
// const fo = (e) => (e.target.style.borderColor = T.border);


// function ShortId({ id }) {
//     return (
//         <code style={{
//             fontFamily: "'JetBrains Mono','Fira Code',monospace",
//             fontSize: 11, color: T.textSec, background: T.surfaceHi,
//             border: `1px solid ${T.border}`, borderRadius: 6,
//             padding: "2px 7px", letterSpacing: "0.02em",
//         }}>
//             …{id?.slice(-8)}
//         </code>
//     );
// }

// function StatusPill({ status, count }) {
//     const s = STATUS[status] || STATUS.pending;
//     return (
//         <span style={{
//             display: "inline-flex", alignItems: "center", gap: 5,
//             fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
//             textTransform: "uppercase", color: s.color,
//             background: s.bg, border: `1px solid ${s.border}`,
//             borderRadius: 20, padding: "3px 9px",
//         }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 5px ${s.color}` }} />
//             {count !== undefined ? `${count} ` : ""}{s.label}
//         </span>
//     );
// }

// function ProgressBar({ pct }) {
//     return (
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div style={{ flex: 1, height: 4, borderRadius: 99, background: T.surfaceHi, overflow: "hidden" }}>
//                 <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${T.accentDim},${T.accent})`, borderRadius: 99, transition: "width .6s ease" }} />
//             </div>
//             <span style={{ fontSize: 11, fontWeight: 700, color: T.accent, minWidth: 30 }}>{pct}%</span>
//         </div>
//     );
// }

// function Divider() {
//     return <div style={{ height: 1, background: T.border, margin: "18px 0" }} />;
// }

// function SecLabel({ children }) {
//     return (
//         <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMuted, margin: "0 0 12px" }}>
//             {children}
//         </p>
//     );
// }

// function Field({ label, children, full = false }) {
//     return (
//         <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
//             <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent, marginBottom: 6 }}>
//                 {label}
//             </label>
//             {children}
//         </div>
//     );
// }

// function Stars({ value, onChange, readonly = false }) {
//     return (
//         <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
//             {[1, 2, 3, 4, 5].map((n) => (
//                 <button key={n} type="button" disabled={readonly}
//                     onClick={() => !readonly && onChange?.(n)}
//                     style={{ background: "none", border: "none", padding: 0, fontSize: 24, lineHeight: 1, cursor: readonly ? "default" : "pointer", color: n <= (value || 0) ? T.accent : T.border, transition: "transform .1s, color .15s" }}
//                     onMouseEnter={e => { if (!readonly) e.currentTarget.style.transform = "scale(1.25)"; }}
//                     onMouseLeave={e => { if (!readonly) e.currentTarget.style.transform = "scale(1)"; }}>
//                     ★
//                 </button>
//             ))}
//         </div>
//     );
// }

// function Spinner({ label = "Loading…" }) {
//     return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "40px 0" }}>
//             <div style={{ width: 30, height: 30, borderRadius: "50%", border: `2px solid ${T.border}`, borderTopColor: T.accent, animation: "spin .8s linear infinite" }} />
//             <span style={{ fontSize: 12, color: T.textSec }}>{label}</span>
//             <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//         </div>
//     );
// }

// function ErrBox({ msg }) {
//     return (
//         <div style={{ display: "flex", alignItems: "center", gap: 12, background: STATUS.cancelled.bg, border: `1px solid ${STATUS.cancelled.border}`, borderRadius: 12, padding: "14px 18px" }}>
//             <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={STATUS.cancelled.color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
//             <span style={{ fontSize: 13, color: T.text }}>{msg}</span>
//         </div>
//     );
// }

// function Toast({ toast }) {
//     if (!toast) return null;
//     const ok = toast.type === "success";
//     return (
//         <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 300, display: "flex", alignItems: "center", gap: 10, padding: "13px 20px", borderRadius: 14, fontSize: 13, fontWeight: 600, background: T.surface, border: `1px solid ${ok ? T.borderLt : STATUS.cancelled.border}`, color: ok ? T.green : STATUS.cancelled.color, boxShadow: "0 8px 32px rgba(0,0,0,.45)", animation: "toastIn .22s cubic-bezier(.22,1,.36,1)" }}>
//             {ok
//                 ? <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
//                 : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
//             }
//             {toast.msg}
//             <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
//         </div>
//     );
// }


// function SessionEditModal({ session, onClose, onSave }) {
//     const [saving, setSaving] = useState(false);
//     const [activeSection, setActiveSection] = useState("details"); // details | tasks | feedback
//     const [form, setForm] = useState({
//         session_title: session.session_title || "",
//         session_date: session.session_date
//             ? new Date(session.session_date).toISOString().slice(0, 16) : "",
//         meeting_link: session.meeting_link || "",
//         meeting_description: session.meeting_description || "",
//         tasks_given: session.tasks_given || "",
//         task_completed: session.task_completed || false,
//         mentee_feedback: session.mentee_feedback || "",
//         mentee_rating: session.mentee_rating || 0,
//         status: session.status || "pending",
//     });

//     const set = (key) => (e) =>
//         setForm(f => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

//     const handleSave = async () => {
//         setSaving(true);
//         await onSave(session._id, form);
//         setSaving(false);
//         onClose();
//     };

//     const st = STATUS[form.status] || STATUS.pending;

//     const TABS = [
//         { id: "details", label: "Session Details" },
//         { id: "tasks", label: "Tasks" },
//         { id: "feedback", label: "Feedback" },
//     ];

//     return (
//         <>
//             {/* Backdrop */}
//             <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,14,9,0.88)", backdropFilter: "blur(8px)", zIndex: 90, animation: "fadeIn .18s ease" }} />

//             {/* Modal box */}
//             <div style={{
//                 position: "fixed", top: "50%", left: "50%",
//                 transform: "translate(-50%,-50%)",
//                 width: "min(680px, calc(100vw - 32px))",
//                 maxHeight: "calc(100vh - 48px)",
//                 background: T.surface,
//                 border: `1px solid ${T.borderLt}`,
//                 borderTop: `3px solid ${st.color}`,
//                 borderRadius: 20,
//                 boxShadow: "0 24px 80px rgba(0,0,0,.6)",
//                 zIndex: 100,
//                 display: "flex", flexDirection: "column",
//                 animation: "modalIn .24s cubic-bezier(.22,1,.36,1)",
//                 overflow: "hidden",
//             }}>

//                 {/* ── Modal Header ─────────────────────────────────── */}
//                 <div style={{ padding: "20px 24px 0", flexShrink: 0 }}>
//                     <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
//                         {/* Left: session identity */}
//                         <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
//                             <div style={{
//                                 width: 44, height: 44, borderRadius: 13, flexShrink: 0,
//                                 background: T.accentGlow, border: `1.5px solid rgba(0,194,255,0.35)`,
//                                 display: "flex", alignItems: "center", justifyContent: "center",
//                                 fontSize: 16, fontWeight: 800, color: T.accent,
//                             }}>
//                                 {session.session_number || "#"}
//                             </div>
//                             <div style={{ minWidth: 0 }}>
//                                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMuted, marginBottom: 4 }}>
//                                     Session {session.session_number}
//                                 </p>
//                                 <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                     {form.session_title || `Session ${session.session_number}`}
//                                 </h2>
//                             </div>
//                         </div>

//                         {/* Right: status pill + close */}
//                         <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
//                             <span style={{
//                                 display: "inline-flex", alignItems: "center", gap: 5,
//                                 fontSize: 10, fontWeight: 700, letterSpacing: "0.07em",
//                                 textTransform: "uppercase", color: st.color,
//                                 background: st.bg, border: `1px solid ${st.border}`,
//                                 borderRadius: 20, padding: "4px 11px",
//                             }}>
//                                 <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.color, boxShadow: `0 0 5px ${st.color}` }} />
//                                 {st.label}
//                             </span>
//                             <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, background: T.surfaceHi, border: `1px solid ${T.border}`, color: T.textSec, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
//                                 <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Sub-meta row */}
//                     <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
//                         {form.session_date && (
//                             <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: T.textSec }}>
//                                 <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>
//                                 {new Date(form.session_date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
//                                 {" · "}
//                                 {new Date(form.session_date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
//                             </span>
//                         )}
//                         {session._id && <ShortId id={session._id} />}
//                     </div>

//                     {/* Section tab switcher */}
//                     <div style={{ display: "flex", gap: 2, background: T.surfaceHi, border: `1px solid ${T.border}`, borderRadius: 10, padding: 3 }}>
//                         {TABS.map(tab => (
//                             <button key={tab.id} onClick={() => setActiveSection(tab.id)} style={{
//                                 flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600,
//                                 border: "none", cursor: "pointer", transition: "all .15s",
//                                 background: activeSection === tab.id ? T.accentGlow : "transparent",
//                                 color: activeSection === tab.id ? T.accent : T.textMuted,
//                                 boxShadow: activeSection === tab.id ? `inset 0 0 0 1px rgba(0,194,255,0.28)` : "none",
//                             }}>
//                                 {tab.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* ── Scrollable form body ─────────────────────────── */}
//                 <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

//                     {/* ── SECTION: Session Details ── */}
//                     {activeSection === "details" && (
//                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//                             <Field label="Session Title" full>
//                                 <input style={inp} value={form.session_title} onChange={set("session_title")}
//                                     placeholder="e.g. Introduction & Goal Setting" onFocus={fi} onBlur={fo} />
//                             </Field>

//                             <Field label="Date & Time">
//                                 <input type="datetime-local" style={inp} value={form.session_date}
//                                     onChange={set("session_date")} onFocus={fi} onBlur={fo} />
//                             </Field>

//                             <Field label="Status">
//                                 <select style={inp} value={form.status} onChange={set("status")} onFocus={fi} onBlur={fo}>
//                                     <option value="pending">Pending</option>
//                                     <option value="completed">Completed</option>
//                                     <option value="cancelled">Cancelled</option>
//                                     <option value="missed">Missed</option>
//                                 </select>
//                             </Field>

//                             <Field label="Meeting Link" full>
//                                 <input style={inp} value={form.meeting_link} onChange={set("meeting_link")}
//                                     placeholder="https://meet.google.com/…" onFocus={fi} onBlur={fo} />
//                             </Field>

//                             {/* Mentor description — editable */}
//                             <Field label="Your Description (Mentor)" full>
//                                 <textarea rows={4} style={{ ...inp, resize: "none" }}
//                                     value={form.meeting_description} onChange={set("meeting_description")}
//                                     placeholder="Your notes / agenda for this session…" onFocus={fi} onBlur={fo} />
//                             </Field>

//                             {/* Mentee description — read-only */}
//                             <Field label="Mentee's Description" full>
//                                 {session.mentee_meeting_description ? (
//                                     <textarea rows={4} readOnly
//                                         style={{ ...inpRO, resize: "none" }}
//                                         value={session.mentee_meeting_description} />
//                                 ) : (
//                                     <div style={{
//                                         padding: "14px 16px", borderRadius: 8,
//                                         background: T.surfaceHi, border: `1px dashed ${T.border}`,
//                                         display: "flex", alignItems: "center", gap: 8,
//                                     }}>
//                                         <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={T.textMuted} strokeWidth={1.5}>
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                         <span style={{ fontSize: 12, color: T.textMuted }}>Mentee hasn't added a description yet</span>
//                                     </div>
//                                 )}
//                             </Field>
//                         </div>
//                     )}

//                     {activeSection === "tasks" && (
//                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//                             <Field label="Tasks Assigned to Mentee" full>
//                                 <textarea rows={5} style={{ ...inp, resize: "none" }}
//                                     value={form.tasks_given || ""}
//                                     onChange={set("tasks_given")}
//                                     placeholder="Enter tasks for the mentee…"
//                                     onFocus={fi} onBlur={fo} />
//                             </Field>

//                             {/* ── Mentee Task Submission ── */}
//                             <Field label="Mentee's Submission" full>
//                                 {session.task_submission ? (
//                                     <div style={{
//                                         background: T.surfaceHi,
//                                         border: `1px solid ${T.borderLt}`,
//                                         borderRadius: 10,
//                                         padding: "14px 16px",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         gap: 10,
//                                     }}>
//                                         {/* Submitted badge */}
//                                         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                                             <span style={{
//                                                 display: "inline-flex", alignItems: "center", gap: 5,
//                                                 fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
//                                                 textTransform: "uppercase", color: T.green,
//                                                 background: T.greenGlow, border: "1px solid rgba(52,211,153,0.22)",
//                                                 borderRadius: 20, padding: "3px 10px",
//                                             }}>
//                                                 <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.green, boxShadow: `0 0 5px ${T.green}` }} />
//                                                 Submitted
//                                             </span>
//                                             <span style={{ fontSize: 11, color: T.textMuted }}>Mentee submitted a link</span>
//                                         </div>

//                                         {/* Clickable link */}
//                                         <a href={session.task_submission} target="_blank" rel="noopener noreferrer"
//                                             style={{
//                                                 display: "flex", alignItems: "center", gap: 10,
//                                                 padding: "10px 13px", borderRadius: 9,
//                                                 background: T.bg, border: `1px solid ${T.border}`,
//                                                 color: T.accent, fontSize: 12, fontWeight: 500,
//                                                 textDecoration: "none", wordBreak: "break-all",
//                                                 transition: "border-color .15s",
//                                             }}
//                                             onMouseEnter={e => e.currentTarget.style.borderColor = T.accent}
//                                             onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
//                                             <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}>
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
//                                             </svg>
//                                             {session.task_submission}
//                                             <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ marginLeft: "auto", flexShrink: 0, opacity: 0.6 }}>
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 ) : (
//                                     <div style={{
//                                         background: T.surfaceHi,
//                                         border: `1px dashed ${T.border}`,
//                                         borderRadius: 10,
//                                         padding: "20px 16px",
//                                         display: "flex", alignItems: "center", justifyContent: "center",
//                                         gap: 8,
//                                     }}>
//                                         <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={T.textMuted} strokeWidth={1.5}>
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                         <span style={{ fontSize: 12, color: T.textMuted }}>No submission yet from mentee</span>
//                                     </div>
//                                 )}
//                             </Field>
//                         </div>
//                     )}

//                     {/* ── SECTION: Feedback ── */}
//                     {activeSection === "feedback" && (
//                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//                             <Field label="Mentee Feedback" full>
//                                 <textarea rows={4} style={{ ...inp, resize: "none" }}
//                                     value={form.mentee_feedback} onChange={set("mentee_feedback")}
//                                     placeholder="Share thoughts on this session…" onFocus={fi} onBlur={fo} />
//                             </Field>

//                             <Field label="Mentee Rating" full>
//                                 <div style={{ background: T.surfaceHi, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px" }}>
//                                     <Stars value={form.mentee_rating} onChange={(v) => setForm(f => ({ ...f, mentee_rating: v }))} />
//                                     <p style={{ fontSize: 11, color: T.textMuted, marginTop: 8 }}>
//                                         {form.mentee_rating > 0 ? `${form.mentee_rating} / 5 stars` : "Not rated yet"}
//                                     </p>
//                                 </div>
//                             </Field>

//                             {session.mentor_feedback && (
//                                 <Field label="Mentor's Feedback (Read-only)" full>
//                                     <textarea rows={4} readOnly style={{ ...inpRO, resize: "none" }} value={session.mentor_feedback} />
//                                 </Field>
//                             )}

//                             {session.mentor_rating > 0 && (
//                                 <Field label="Mentor's Rating (Read-only)" full>
//                                     <div style={{ background: T.surfaceHi, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px" }}>
//                                         <Stars value={session.mentor_rating} readonly />
//                                         <p style={{ fontSize: 11, color: T.textMuted, marginTop: 8 }}>{session.mentor_rating} / 5 stars</p>
//                                     </div>
//                                 </Field>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 {/* ── Modal Footer ─────────────────────────────────── */}
//                 <div style={{
//                     padding: "14px 24px 20px",
//                     borderTop: `1px solid ${T.border}`,
//                     display: "flex", justifyContent: "space-between", alignItems: "center",
//                     flexShrink: 0, gap: 12, flexWrap: "wrap",
//                 }}>
//                     {/* Section nav arrows */}
//                     <div style={{ display: "flex", gap: 6 }}>
//                         {TABS.map((tab, i) => (
//                             <button key={tab.id} onClick={() => setActiveSection(tab.id)} style={{
//                                 width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
//                                 background: activeSection === tab.id ? T.accent : T.border,
//                                 transition: "background .15s",
//                             }} />
//                         ))}
//                     </div>

//                     <div style={{ display: "flex", gap: 10 }}>
//                         <button onClick={onClose} style={{
//                             padding: "9px 22px", borderRadius: 10, fontSize: 13, fontWeight: 600,
//                             background: "transparent", border: `1px solid ${T.border}`, color: T.accent,
//                             cursor: "pointer", transition: "background .15s",
//                         }}
//                             onMouseEnter={e => e.currentTarget.style.background = T.surfaceHi}
//                             onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
//                             Cancel
//                         </button>
//                         <button onClick={handleSave} disabled={saving} style={{
//                             padding: "9px 26px", borderRadius: 10, fontSize: 13, fontWeight: 700,
//                             background: saving ? T.accentDim : T.accent, color: T.bg,
//                             border: "none", cursor: saving ? "not-allowed" : "pointer",
//                             opacity: saving ? .75 : 1, transition: "all .15s",
//                             display: "flex", alignItems: "center", gap: 8,
//                         }}
//                             onMouseEnter={e => { if (!saving) e.currentTarget.style.background = T.accentDim; }}
//                             onMouseLeave={e => { if (!saving) e.currentTarget.style.background = T.accent; }}>
//                             {saving && <span style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${T.bg}`, borderTopColor: "transparent", animation: "spin .7s linear infinite", display: "inline-block" }} />}
//                             {saving ? "Saving…" : "Save Changes"}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes fadeIn  { from{opacity:0}              to{opacity:1}             }
//                 @keyframes modalIn { from{opacity:0;transform:translate(-50%,-48%) scale(.96)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
//             `}</style>
//         </>
//     );
// }


// function SessionRow({ session, idx, onClick }) {
//     const st = STATUS[session.status] || STATUS.pending;
//     const date = session.session_date ? new Date(session.session_date) : null;
//     const [hov, setHov] = useState(false);

//     return (
//         <div onClick={onClick}
//             onMouseEnter={() => setHov(true)}
//             onMouseLeave={() => setHov(false)}
//             style={{
//                 display: "flex", alignItems: "center", gap: 14,
//                 padding: "13px 16px", borderRadius: 12, cursor: "pointer",
//                 background: hov ? T.surfaceHi : T.surface,
//                 border: `1px solid ${hov ? T.borderLt : T.border}`,
//                 borderLeft: `3px solid ${st.color}`,
//                 transition: "all .15s",
//             }}>
//             {/* Number */}
//             <div style={{
//                 width: 34, height: 34, borderRadius: 10, flexShrink: 0,
//                 background: T.accentGlow, border: `1px solid rgba(0,194,255,0.28)`,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 12, fontWeight: 800, color: T.accent,
//             }}>
//                 {session.session_number || idx + 1}
//             </div>

//             {/* Title + date */}
//             <div style={{ flex: 1, minWidth: 0 }}>
//                 <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                     {session.session_title || `Session ${session.session_number || idx + 1}`}
//                 </p>
//                 <p style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>
//                     {date
//                         ? date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
//                         : "No date set"}
//                     {session.duration_minutes ? ` · ${session.duration_minutes} min` : ""}
//                 </p>
//             </div>

//             {/* Status pill */}
//             <span style={{
//                 display: "inline-flex", alignItems: "center", gap: 5,
//                 fontSize: 10, fontWeight: 700, letterSpacing: "0.07em",
//                 textTransform: "uppercase", color: st.color,
//                 background: st.bg, border: `1px solid ${st.border}`,
//                 borderRadius: 20, padding: "3px 9px", flexShrink: 0,
//             }}>
//                 <span style={{ width: 4, height: 4, borderRadius: "50%", background: st.color, boxShadow: `0 0 4px ${st.color}` }} />
//                 {st.label}
//             </span>

//             {/* Edit caret */}
//             <div style={{ display: "flex", alignItems: "center", gap: 4, color: hov ? T.accent : T.textMuted, fontSize: 11, fontWeight: 600, flexShrink: 0, transition: "color .15s" }}>
//                 Edit
//                 <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//                 </svg>
//             </div>
//         </div>
//     );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SESSION DETAIL DRAWER — lists session rows; clicking one → modal
// // ─────────────────────────────────────────────────────────────────────────────
// function SessionDetailDrawer({ row, onClose, onSave }) {
//     const [filter, setFilter] = useState("all");
//     const [editingSession, setEditingSession] = useState(null);

//     const counts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
//     const pct = Math.round(((counts.completed || 0) / row.sessions.length) * 100);
//     const FILTERS = ["all", "pending", "completed", "missed", "cancelled"];
//     const filtered = filter === "all" ? row.sessions : row.sessions.filter(s => s.status === filter);

//     return (
//         <>
//             {/* Drawer backdrop — only when modal is NOT open */}
//             {!editingSession && (
//                 <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,14,9,0.80)", backdropFilter: "blur(6px)", zIndex: 40, animation: "fadeIn .18s ease" }} />
//             )}

//             {/* Drawer panel */}
//             <div style={{
//                 position: "fixed", top: 0, right: 0, bottom: 0,
//                 width: "min(620px, 100vw)",
//                 background: T.surface, borderLeft: `1px solid ${T.border}`,
//                 zIndex: 50, overflowY: "auto",
//                 display: "flex", flexDirection: "column",
//                 animation: "slideIn .26s cubic-bezier(.22,1,.36,1)",
//             }}>

//                 {/* ── Sticky header ── */}
//                 <div style={{ padding: "22px 24px 16px", borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, background: T.surface, zIndex: 10 }}>
//                     {/* Title + close */}
//                     <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
//                         <div>
//                             <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMuted, marginBottom: 5 }}>
//                                 Sessions · Subscription
//                             </p>
//                             <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
//                                 <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: 0 }}>Session Details</h2>
//                                 <ShortId id={row.subscription_id} />
//                             </div>
//                             <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                                 <span style={{ fontSize: 11, color: T.textMuted }}>Mentee:</span>
//                                 <ShortId id={row.mentee_id} />
//                             </div>
//                         </div>
//                         <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: T.surfaceHi, border: `1px solid ${T.border}`, color: T.textSec, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
//                             <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
//                         </button>
//                     </div>

//                     {/* Status summary grid */}
//                     <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
//                         {["completed", "pending", "missed", "cancelled"].map(st => (
//                             <div key={st} style={{ background: T.surfaceHi, border: `1px solid ${STATUS[st].border}`, borderRadius: 10, padding: "9px 0", textAlign: "center" }}>
//                                 <div style={{ fontSize: 18, fontWeight: 800, color: STATUS[st].color, lineHeight: 1 }}>{counts[st] || 0}</div>
//                                 <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginTop: 3 }}>{st}</div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Progress */}
//                     <div style={{ marginBottom: 14 }}><ProgressBar pct={pct} /></div>

//                     {/* Filter tabs */}
//                     <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 2 }}>
//                         {FILTERS.map(f => (
//                             <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all .15s", background: filter === f ? T.accent : T.surfaceHi, color: filter === f ? T.bg : T.textMuted }}>
//                                 {f === "all" ? `All (${row.sessions.length})` : `${f} (${counts[f] || 0})`}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* ── Session rows ── */}
//                 <div style={{ padding: "18px 24px", flex: 1 }}>
//                     {filtered.length === 0 ? (
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", gap: 10 }}>
//                             <div style={{ width: 44, height: 44, borderRadius: 14, background: T.surfaceHi, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                 <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={T.textMuted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>
//                             </div>
//                             <p style={{ fontSize: 13, color: T.textSec }}>No {filter !== "all" ? filter : ""} sessions.</p>
//                         </div>
//                     ) : (
//                         <>
//                             <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMuted, margin: "0 0 12px" }}>
//                                 Click any session to edit
//                             </p>
//                             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                                 {filtered.map((session, i) => (
//                                     <SessionRow
//                                         key={session._id || i}
//                                         session={session}
//                                         idx={i}
//                                         onClick={() => setEditingSession(session)}
//                                     />
//                                 ))}
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* ── Session Edit Modal (renders on top of everything) ── */}
//             {editingSession && (
//                 <SessionEditModal
//                     session={editingSession}
//                     onClose={() => setEditingSession(null)}
//                     onSave={onSave}
//                 />
//             )}

//             <style>{`
//                 @keyframes fadeIn  { from{opacity:0}              to{opacity:1}             }
//                 @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
//             `}</style>
//         </>
//     );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SUBSCRIBER CARD  (mobile)
// // ─────────────────────────────────────────────────────────────────────────────
// function SubscriberCard({ sub }) {
//     const planName = sub?.plan_name || sub?.planName || sub?.title || "Plan";
//     const menteeName = sub?.mentee_name || sub?.menteeName || null;
//     const menteeId = sub?.mentee_id || sub?.menteeId || sub?.user_id;
//     const status = sub?.status || "active";
//     const price = sub?.price ?? sub?.amount ?? null;
//     const startDate = sub?.start_date || sub?.startDate || sub?.createdAt || null;
//     const subId = sub?._id || sub?.subscription_id;
//     const isActive = status === "active";
//     const sc = isActive ? T.green : STATUS.cancelled.color;

//     return (
//         <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderTop: `2px solid ${sc}`, borderRadius: 14, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
//             <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                     <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.surfaceHi, border: `1.5px solid ${T.borderLt}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: T.accent, flexShrink: 0 }}>
//                         {menteeName ? menteeName[0].toUpperCase() : "M"}
//                     </div>
//                     <div>
//                         <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 3 }}>{menteeName || "Mentee"}</div>
//                         <ShortId id={menteeId} />
//                     </div>
//                 </div>
//                 <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: sc, background: isActive ? T.greenGlow : STATUS.cancelled.bg, border: `1px solid ${isActive ? "rgba(52,211,153,0.22)" : STATUS.cancelled.border}`, borderRadius: 20, padding: "3px 10px", flexShrink: 0 }}>
//                     <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc, boxShadow: `0 0 5px ${sc}` }} />
//                     {status}
//                 </span>
//             </div>
//             <div style={{ background: T.surfaceHi, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
//                 {[["Plan", planName, T.text, 600], ["Price", price !== null ? `₹${price}` : "—", T.green, 700]].map(([l, v, c, fw]) => (
//                     <div key={l}>
//                         <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: 3 }}>{l}</div>
//                         <div style={{ fontSize: 13, fontWeight: fw, color: c }}>{v}</div>
//                     </div>
//                 ))}
//                 {startDate && (
//                     <div>
//                         <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: 3 }}>Since</div>
//                         <div style={{ fontSize: 12, color: T.textSec }}>{new Date(startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
//                     </div>
//                 )}
//                 <div>
//                     <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: 3 }}>Sub ID</div>
//                     <ShortId id={subId} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// export default function MentorSessionsTable() {
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [activeTab, setActiveTab] = useState("sessions");
//     const [toast, setToast] = useState(null);

//     const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//     const mentorId = userData?._id;

//     // ── API ──────────────────────────────────────────────────────────────────
//     const { data: sessionsResult, isLoading: sessionsLoading, isError: sessionsError } = useGetSessionsByMentorQuery(mentorId);
//     const { data: subscribersResult, isLoading: subscribersLoading, isError: subscribersError } = useGetSubscribersByMentorQuery(mentorId);
//     const [updateSession] = useUpdateByMentorSessionMutation();

//     // ── Derived ──────────────────────────────────────────────────────────────
//     const sessions = sessionsResult?.data ?? [];
//     const subscribers = subscribersResult?.data ?? subscribersResult?.subscriptions ?? [];

//     const grouped = sessions.reduce((acc, s) => {
//         const k = s.subscription_id;
//         if (!acc[k]) acc[k] = { subscription_id: k, mentor_id: s.mentor_id, mentee_id: s.mentee_id, sessions: [] };
//         acc[k].sessions.push(s);
//         return acc;
//     }, {});
//     const rows = Object.values(grouped);

//     const completedCount = sessions.filter(s => s.status === "completed").length;
//     const pendingCount = sessions.filter(s => s.status === "pending").length;

//     const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

//     const handleSave = async (session_id, form) => {
//         try {
//             await updateSession({ session_id, ...form }).unwrap();
//             showToast("Session updated successfully.");
//         } catch {
//             showToast("Failed to update session.", "error");
//         }
//     };

//     const tabStyle = (id) => ({
//         padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
//         cursor: "pointer", border: "none", transition: "all .15s",
//         ...(activeTab === id
//             ? { background: T.accentGlow, color: T.accent, boxShadow: `inset 0 0 0 1px rgba(0,194,255,0.28)` }
//             : { background: "transparent", color: T.textMuted }
//         ),
//     });

//     return (
//         <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>

//             {/* ── Page Header ─────────────────────────────────────── */}
//             <div style={{ padding: "28px 32px 22px", borderBottom: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface} 0%,${T.bg} 100%)` }}>
//                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, marginBottom: 8 }}>Mentorship Portal</p>
//                 <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
//                     <div>
//                         <h1 style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 800, color: T.text, margin: 0, letterSpacing: "-0.02em" }}>Sessions Overview</h1>
//                         <p style={{ fontSize: 13, color: T.textSec, marginTop: 5 }}>
//                             {subscribers.length > 0 ? `${subscribers.length} subscriber${subscribers.length !== 1 ? "s" : ""} · ${sessions.length} total sessions` : "No subscribers yet"}
//                         </p>
//                     </div>
//                     <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//                         {[
//                             { label: "Subscribers", value: subscribersLoading ? "—" : subscribers.length, color: T.green },
//                             { label: "Completed", value: sessionsLoading ? "—" : completedCount, color: STATUS.completed.color },
//                             { label: "Pending", value: sessionsLoading ? "—" : pendingCount, color: STATUS.pending.color },
//                         ].map(({ label, value, color }) => (
//                             <div key={label} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "10px 18px", textAlign: "center", minWidth: 78 }}>
//                                 <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
//                                 <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textMuted, marginTop: 4 }}>{label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {/* Tabs */}
//                 <div style={{ display: "flex", gap: 4, background: T.surfaceHi, border: `1px solid ${T.border}`, borderRadius: 12, padding: 4, width: "fit-content" }}>
//                     <button style={tabStyle("subscribers")} onClick={() => setActiveTab("subscribers")}>
//                         Subscribers
//                         {!subscribersLoading && subscribers.length > 0 && (
//                             <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 800, color: T.green, background: T.greenGlow, border: "1px solid rgba(52,211,153,0.22)", borderRadius: 10, padding: "1px 6px" }}>{subscribers.length}</span>
//                         )}
//                     </button>
//                     <button style={tabStyle("sessions")} onClick={() => setActiveTab("sessions")}>
//                         Sessions
//                         {!sessionsLoading && rows.length > 0 && (
//                             <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 800, color: T.accent, background: T.accentGlow, border: "1px solid rgba(0,194,255,0.22)", borderRadius: 10, padding: "1px 6px" }}>{rows.length}</span>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             {/* ── Body ────────────────────────────────────────────── */}
//             <div style={{ padding: "28px 32px" }}>

//                 {/* ══ SUBSCRIBERS TAB ══ */}
//                 {activeTab === "subscribers" && (
//                     <>
//                         {subscribersLoading && <Spinner label="Loading subscribers…" />}
//                         {subscribersError && <ErrBox msg="Failed to load subscribers." />}
//                         {!subscribersLoading && !subscribersError && subscribers.length === 0 && (
//                             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", gap: 12 }}>
//                                 <div style={{ width: 50, height: 50, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                     <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={T.textMuted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
//                                 </div>
//                                 <p style={{ fontSize: 14, color: T.textSec, fontWeight: 500 }}>No subscribers yet.</p>
//                                 <p style={{ fontSize: 12, color: T.textMuted }}>Mentees who subscribe to your plans will appear here.</p>
//                             </div>
//                         )}
//                         {!subscribersLoading && !subscribersError && subscribers.length > 0 && (
//                             <>
//                                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, margin: "0 0 14px" }}>All Subscribers · {subscribers.length} total</p>
//                                 {/* Desktop */}
//                                 <div className="sub-desktop" style={{ borderRadius: 16, border: `1px solid ${T.border}`, overflow: "hidden" }}>
//                                     <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 1fr 120px 110px", padding: "11px 20px", gap: 16, background: T.surfaceHi, borderBottom: `1px solid ${T.border}` }}>
//                                         {["#", "Mentee", "Plan", "Sub ID", "Price", "Status"].map(h => (
//                                             <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textMuted }}>{h}</div>
//                                         ))}
//                                     </div>
//                                     {subscribers.map((sub, idx) => {
//                                         const planName = sub?.plan_name || sub?.planName || sub?.title || "Plan";
//                                         const menteeName = sub?.mentee_name || sub?.menteeName || null;
//                                         const menteeId = sub?.mentee_id || sub?.menteeId || sub?.user_id;
//                                         const subId = sub?._id || sub?.subscription_id;
//                                         const price = sub?.price ?? sub?.amount ?? null;
//                                         const status = sub?.status || "active";
//                                         const isActive = status === "active";
//                                         const sc = isActive ? T.green : STATUS.cancelled.color;
//                                         return (
//                                             <div key={subId || idx} style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 1fr 120px 110px", padding: "14px 20px", gap: 16, background: idx % 2 === 0 ? T.bg : T.surface, borderBottom: idx < subscribers.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "center", transition: "background .15s" }}
//                                                 onMouseEnter={e => e.currentTarget.style.background = T.surfaceHi}
//                                                 onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? T.bg : T.surface}>
//                                                 <div style={{ width: 30, height: 30, borderRadius: 9, background: T.surfaceHi, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: T.textMuted }}>{idx + 1}</div>
//                                                 <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
//                                                     <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.surfaceHi, border: `1.5px solid ${T.borderLt}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.accent, flexShrink: 0 }}>
//                                                         {menteeName ? menteeName[0].toUpperCase() : "M"}
//                                                     </div>
//                                                     <div style={{ minWidth: 0 }}>
//                                                         {menteeName && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{menteeName}</div>}
//                                                         <ShortId id={menteeId} />
//                                                     </div>
//                                                 </div>
//                                                 <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{planName}</div>
//                                                 <ShortId id={subId} />
//                                                 <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{price !== null ? `₹${price}` : <span style={{ color: T.textMuted }}>—</span>}</div>
//                                                 <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: sc, background: isActive ? T.greenGlow : STATUS.cancelled.bg, border: `1px solid ${isActive ? "rgba(52,211,153,0.22)" : STATUS.cancelled.border}`, borderRadius: 20, padding: "3px 9px" }}>
//                                                     <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc, boxShadow: `0 0 5px ${sc}` }} />
//                                                     {status}
//                                                 </span>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                                 {/* Mobile */}
//                                 <div className="sub-mobile" style={{ display: "none", flexDirection: "column", gap: 12 }}>
//                                     {subscribers.map((sub, idx) => <SubscriberCard key={sub?._id || idx} sub={sub} />)}
//                                 </div>
//                             </>
//                         )}
//                     </>
//                 )}

//                 {/* ══ SESSIONS TAB ══ */}
//                 {activeTab === "sessions" && (
//                     <>
//                         {sessionsLoading && <Spinner label="Loading sessions…" />}
//                         {sessionsError && <ErrBox msg="Failed to load sessions." />}
//                         {!sessionsLoading && !sessionsError && rows.length === 0 && (
//                             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", gap: 12 }}>
//                                 <div style={{ width: 50, height: 50, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                     <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={T.textMuted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>
//                                 </div>
//                                 <p style={{ fontSize: 14, color: T.textSec, fontWeight: 500 }}>No sessions found.</p>
//                                 <p style={{ fontSize: 12, color: T.textMuted }}>Sessions appear once mentees subscribe.</p>
//                             </div>
//                         )}
//                         {!sessionsLoading && !sessionsError && rows.length > 0 && (
//                             <>
//                                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, margin: "0 0 14px" }}>Sessions by Subscription · {rows.length} group{rows.length !== 1 ? "s" : ""}</p>

//                                 {/* Desktop table */}
//                                 <div className="sessions-desktop" style={{ borderRadius: 16, border: `1px solid ${T.border}`, overflow: "hidden" }}>
//                                     <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 170px 1fr 144px", padding: "11px 20px", gap: 16, background: T.surfaceHi, borderBottom: `1px solid ${T.border}` }}>
//                                         {["#", "Mentee", "Subscription", "Progress", "Status", ""].map((h, i) => (
//                                             <div key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textMuted, textAlign: i === 5 ? "right" : "left" }}>{h}</div>
//                                         ))}
//                                     </div>
//                                     {rows.map((row, idx) => {
//                                         const cnts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
//                                         const p = Math.round(((cnts.completed || 0) / row.sessions.length) * 100);
//                                         return (
//                                             <div key={row.subscription_id} style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 170px 1fr 144px", padding: "15px 20px", gap: 16, background: idx % 2 === 0 ? T.bg : T.surface, borderBottom: idx < rows.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "center", transition: "background .15s" }}
//                                                 onMouseEnter={e => e.currentTarget.style.background = T.surfaceHi}
//                                                 onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? T.bg : T.surface}>
//                                                 <div style={{ width: 30, height: 30, borderRadius: 9, background: T.surfaceHi, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: T.textMuted }}>{idx + 1}</div>
//                                                 <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
//                                                     <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.surfaceHi, border: `1.5px solid ${T.borderLt}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.accent, flexShrink: 0 }}>M</div>
//                                                     <div style={{ minWidth: 0 }}>
//                                                         <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 2 }}>Mentee ID</div>
//                                                         <ShortId id={row.mentee_id} />
//                                                     </div>
//                                                 </div>
//                                                 <div style={{ minWidth: 0 }}>
//                                                     <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 2 }}>Sub ID</div>
//                                                     <ShortId id={row.subscription_id} />
//                                                 </div>
//                                                 <div>
//                                                     <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 5 }}>{row.sessions.length} sessions</div>
//                                                     <ProgressBar pct={p} />
//                                                 </div>
//                                                 <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
//                                                     {["pending", "completed", "missed", "cancelled"].map(st => cnts[st] ? <StatusPill key={st} status={st} count={cnts[st]} /> : null)}
//                                                 </div>
//                                                 <div style={{ textAlign: "right" }}>
//                                                     <button onClick={() => setSelectedRow(row)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: T.accentGlow, border: `1px solid rgba(0,194,255,0.28)`, color: T.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap" }}
//                                                         onMouseEnter={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = T.bg; }}
//                                                         onMouseLeave={e => { e.currentTarget.style.background = T.accentGlow; e.currentTarget.style.color = T.accent; }}>
//                                                         View Details
//                                                         <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>

//                                 {/* Mobile cards */}
//                                 <div className="sessions-mobile" style={{ display: "none", flexDirection: "column", gap: 12 }}>
//                                     {rows.map((row, idx) => {
//                                         const cnts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
//                                         const p = Math.round(((cnts.completed || 0) / row.sessions.length) * 100);
//                                         return (
//                                             <div key={row.subscription_id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 18 }}>
//                                                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
//                                                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                                                         <div style={{ width: 30, height: 30, borderRadius: 9, background: T.surfaceHi, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: T.textMuted }}>{idx + 1}</div>
//                                                         <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Subscription</span>
//                                                     </div>
//                                                     <span style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>{row.sessions.length} sessions</span>
//                                                 </div>
//                                                 <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
//                                                     {[["Mentee", row.mentee_id], ["Sub ID", row.subscription_id]].map(([l, id]) => (
//                                                         <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                                                             <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted }}>{l}</span>
//                                                             <ShortId id={id} />
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                                 <div style={{ marginBottom: 14 }}><ProgressBar pct={p} /></div>
//                                                 <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
//                                                     {["pending", "completed", "missed", "cancelled"].map(st => cnts[st] ? <StatusPill key={st} status={st} count={cnts[st]} /> : null)}
//                                                 </div>
//                                                 <button onClick={() => setSelectedRow(row)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", borderRadius: 11, background: T.accentGlow, border: `1px solid rgba(0,194,255,0.28)`, color: T.accent, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
//                                                     View Details
//                                                     <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
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

//             {/* ── Drawer (session list) ────────────────────────────── */}
//             {selectedRow && (
//                 <SessionDetailDrawer
//                     row={selectedRow}
//                     onClose={() => setSelectedRow(null)}
//                     onSave={handleSave}
//                 />
//             )}

//             <Toast toast={toast} />

//             <style>{`
//                 @media (max-width: 768px) {
//                     .sessions-desktop { display: none !important; }
//                     .sessions-mobile  { display: flex !important; }
//                     .sub-desktop      { display: none !important; }
//                     .sub-mobile       { display: flex !important; }
//                 }
//             `}</style>
//         </div>
//     );
// }



import { useState } from "react";
import {
    useGetSessionsByMentorQuery,
    useGetSubscribersByMentorQuery,
    useUpdateByMentorSessionMutation,
} from "./mysubcriberspislice";

const STATUS_CONFIG = {
    pending: { color: "#00c2ff", bg: "rgba(0,194,255,0.08)", border: "rgba(0,194,255,0.22)", label: "Pending" },
    completed: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", label: "Completed" },
    cancelled: { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.22)", label: "Cancelled" },
    missed: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", label: "Missed" },
    active: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", label: "Active" },
    onprocess: { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.22)", label: "On Process" },
    approved: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", label: "Approved" },
};

const PLAN_LABELS = { one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" };

const fmt = (iso) => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const fmtDT = (iso) => iso ? new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

function StatusPill({ status }) {
    const s = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 5px ${s.color}`, flexShrink: 0 }} />
            {s.label}
        </span>
    );
}

function ShortId({ id }) {
    return (
        <code style={{ fontFamily: "monospace", fontSize: 11, color: "#6db892", background: "#0b2418", border: "1px solid #0d3020", borderRadius: 6, padding: "2px 7px" }}>
            …{id?.slice(-8)}
        </code>
    );
}

function ProgressBar({ done, total }) {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 5, borderRadius: 99, background: "#0b2418", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#0098cc,#00c2ff)", borderRadius: 99, transition: "width .5s ease" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#00c2ff", minWidth: 32, textAlign: "right" }}>{pct}%</span>
        </div>
    );
}

function Spinner() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "48px 0" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #0d3020", borderTopColor: "#00c2ff", animation: "spin .8s linear infinite" }} />
            <span style={{ fontSize: 12, color: "#6db892" }}>Loading…</span>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    );
}

function Toast({ toast }) {
    if (!toast) return null;
    const ok = toast.type === "success";
    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, background: "#071a10", border: `1px solid ${ok ? "rgba(52,211,153,0.4)" : "rgba(248,113,113,0.4)"}`, color: ok ? "#34d399" : "#f87171", boxShadow: "0 8px 32px rgba(0,0,0,.5)", animation: "toastIn .2s ease" }}>
            {ok ? "✓" : "✕"} {toast.msg}
            <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
    );
}

// ── Session Edit Modal ──────────────────────────────────────────────────────
function SessionEditModal({ session, onClose, onSave }) {
    const [saving, setSaving] = useState(false);
    const [tab, setTab] = useState("details");
    const [form, setForm] = useState({
        session_title: session.session_title || "",
        session_date: session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : "",
        meeting_link: session.meeting_link || "",
        meeting_description: session.meeting_description || "",
        tasks_given: session.tasks_given || "",
        task_completed: session.task_completed || false,
        mentee_feedback: session.mentee_feedback || "",
        mentee_rating: session.mentee_rating || 0,
        status: session.status || "pending",
    });

    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
    const st = STATUS_CONFIG[form.status] || STATUS_CONFIG.pending;

    const inputStyle = { width: "100%", background: "#020e09", border: "1px solid #0d3020", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#e6f7f0", outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
    const roStyle = { ...inputStyle, background: "#0b2418", color: "#6db892", cursor: "default" };
    const labelStyle = { display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00c2ff", marginBottom: 6 };

    const handleSave = async () => {
        setSaving(true);
        await onSave(session._id, form);
        setSaving(false);
        onClose();
    };

    const TABS = ["details", "tasks", "feedback"];

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,14,9,0.9)", backdropFilter: "blur(8px)", zIndex: 90 }} />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(680px, calc(100vw - 24px))", maxHeight: "calc(100vh - 40px)", background: "#071a10", border: `1px solid ${st.border}`, borderTop: `3px solid ${st.color}`, borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,.7)", zIndex: 100, display: "flex", flexDirection: "column", overflow: "hidden", animation: "modalIn .22s cubic-bezier(.22,1,.36,1)" }}>

                {/* Header */}
                <div style={{ padding: "18px 22px 0", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(0,194,255,0.1)", border: "1.5px solid rgba(0,194,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#00c2ff" }}>
                                {session.session_number}
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 3px" }}>Session {session.session_number}</p>
                                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#e6f7f0", margin: 0 }}>{form.session_title || `Session ${session.session_number}`}</h2>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <StatusPill status={form.status} />
                            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, background: "#0b2418", border: "1px solid #0d3020", color: "#6db892", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>✕</button>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div style={{ display: "flex", gap: 2, background: "#0b2418", border: "1px solid #0d3020", borderRadius: 10, padding: 3, marginBottom: 0 }}>
                        {TABS.map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", textTransform: "capitalize", transition: "all .15s", background: tab === t ? "rgba(0,194,255,0.12)" : "transparent", color: tab === t ? "#00c2ff" : "#2e6647", boxShadow: tab === t ? "inset 0 0 0 1px rgba(0,194,255,0.25)" : "none" }}>
                                {t === "details" ? "Session Details" : t === "tasks" ? "Tasks" : "Feedback"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>

                    {tab === "details" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Session Title</label>
                                <input style={inputStyle} value={form.session_title} onChange={set("session_title")} placeholder="e.g. Introduction & Goal Setting" />
                            </div>
                            <div>
                                <label style={labelStyle}>Date & Time</label>
                                <input type="datetime-local" style={inputStyle} value={form.session_date} onChange={set("session_date")} />
                            </div>
                            <div>
                                <label style={labelStyle}>Status</label>
                                <select style={inputStyle} value={form.status} onChange={set("status")}>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="missed">Missed</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Meeting Link</label>
                                <input style={inputStyle} value={form.meeting_link} onChange={set("meeting_link")} placeholder="https://zoom.us/j/…" />
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Your Description (Mentor)</label>
                                <textarea rows={4} style={{ ...inputStyle, resize: "none" }} value={form.meeting_description} onChange={set("meeting_description")} placeholder="Agenda for this session…" />
                            </div>
                            <div style={{ gridColumn: "1/-1" }}>
                                <label style={labelStyle}>Mentee's Description</label>
                                {session.mentee_meeting_description
                                    ? <textarea rows={3} readOnly style={{ ...roStyle, resize: "none" }} value={session.mentee_meeting_description} />
                                    : <div style={{ padding: "12px 14px", borderRadius: 8, background: "#0b2418", border: "1px dashed #0d3020", fontSize: 12, color: "#2e6647" }}>No description from mentee yet</div>
                                }
                            </div>
                        </div>
                    )}

                    {tab === "tasks" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <div>
                                <label style={labelStyle}>Tasks Assigned</label>
                                <textarea rows={5} style={{ ...inputStyle, resize: "none" }} value={form.tasks_given} onChange={set("tasks_given")} placeholder="Enter tasks for the mentee…" />
                            </div>
                            <div>
                                <label style={labelStyle}>Mentee's Submission</label>
                                {session.task_submission
                                    ? <a href={session.task_submission} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", borderRadius: 9, background: "#020e09", border: "1px solid #0d3020", color: "#00c2ff", fontSize: 12, textDecoration: "none", wordBreak: "break-all" }}>
                                        🔗 {session.task_submission}
                                    </a>
                                    : <div style={{ padding: "14px", borderRadius: 8, background: "#0b2418", border: "1px dashed #0d3020", fontSize: 12, color: "#2e6647", textAlign: "center" }}>No submission yet</div>
                                }
                            </div>
                            {session.task_submitted_at && (
                                <p style={{ fontSize: 11, color: "#2e6647", margin: 0 }}>Submitted: {fmtDT(session.task_submitted_at)}</p>
                            )}
                        </div>
                    )}

                    {tab === "feedback" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                            {/* Mentee Feedback */}
                            <div>
                                <label style={labelStyle}>Mentee Feedback (by you)</label>
                                <textarea
                                    rows={4}
                                    style={{ ...inputStyle, resize: "none" }}
                                    value={form.mentee_feedback}
                                    onChange={set("mentee_feedback")}
                                    placeholder="Share thoughts on this session…"
                                />
                            </div>

                            {/* Mentee Rating (READ ONLY) */}
                            <div>
                                <label style={labelStyle}>Rating (1–5)</label>
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <span
                                            key={n}
                                            style={{
                                                fontSize: 26,
                                                color: n <= form.mentee_rating ? "#00c2ff" : "#0d3020",
                                                cursor: "default" // 👈 no pointer
                                            }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span style={{ fontSize: 12, color: "#6db892", marginLeft: 4 }}>
                                        {form.mentee_rating > 0 ? `${form.mentee_rating}/5` : "Not rated"}
                                    </span>
                                </div>
                            </div>

                            {/* Mentor Feedback */}
                            {session.mentor_feedback && (
                                <div>
                                    <label style={labelStyle}>Mentor Feedback (read-only)</label>
                                    <textarea
                                        rows={3}
                                        readOnly
                                        style={{ ...roStyle, resize: "none" }}
                                        value={session.mentor_feedback}
                                    />
                                </div>
                            )}

                            {/* Mentor Rating (READ ONLY) */}
                            {session.mentor_rating > 0 && (
                                <div>
                                    <label style={labelStyle}>Mentor Rating</label>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <span
                                                key={n}
                                                style={{
                                                    fontSize: 24,
                                                    color: n <= session.mentor_rating ? "#00c2ff" : "#0d3020"
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: "14px 22px 18px", borderTop: "1px solid #0d3020", display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0 }}>
                    <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, background: "transparent", border: "1px solid #0d3020", color: "#00c2ff", cursor: "pointer" }}>Cancel</button>
                    <button onClick={handleSave} disabled={saving} style={{ padding: "9px 24px", borderRadius: 9, fontSize: 13, fontWeight: 700, background: saving ? "#0098cc" : "#00c2ff", color: "#020e09", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? .75 : 1, display: "flex", alignItems: "center", gap: 8 }}>
                        {saving && <span style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid #020e09", borderTopColor: "transparent", animation: "spin .7s linear infinite", display: "inline-block" }} />}
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>
            <style>{`@keyframes modalIn{from{opacity:0;transform:translate(-50%,-48%) scale(.96)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}`}</style>
        </>
    );
}

// ── Session Drawer ───────────────────────────────────────────────────────────
function SessionDrawer({ row, subscription, onClose, onSave }) {
    const [filter, setFilter] = useState("all");
    const [editingSession, setEditingSession] = useState(null);

    const counts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
    const filtered = filter === "all" ? row.sessions : row.sessions.filter(s => s.status === filter);
    const FILTERS = ["all", "pending", "completed", "missed", "cancelled"];

    return (
        <>
            {!editingSession && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,14,9,0.82)", backdropFilter: "blur(6px)", zIndex: 40 }} />}
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(640px, 100vw)", background: "#071a10", borderLeft: "1px solid #0d3020", zIndex: 50, display: "flex", flexDirection: "column", animation: "slideIn .25s cubic-bezier(.22,1,.36,1)" }}>

                {/* Sticky Header */}
                <div style={{ padding: "20px 22px 14px", borderBottom: "1px solid #0d3020", position: "sticky", top: 0, background: "#071a10", zIndex: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div>
                            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 5px" }}>Session Details</p>
                            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#e6f7f0", margin: "0 0 4px" }}>
                                {PLAN_LABELS[subscription?.plan_type] || "Plan"} · {row.sessions.length} Sessions
                            </h2>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                <ShortId id={row.subscription_id} />
                                {subscription && <StatusPill status={subscription.status} />}
                            </div>
                        </div>
                        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, background: "#0b2418", border: "1px solid #0d3020", color: "#6db892", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>✕</button>
                    </div>

                    {/* Subscription Info Strip */}
                    {subscription && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14 }}>
                            {[
                                ["Amount", `₹${subscription.amount?.toLocaleString("en-IN")}`, "#34d399"],
                                ["Sessions", `${subscription.total_sessions}`, "#00c2ff"],
                                ["Start", fmt(subscription.subscribed_at), "#e6f7f0"],
                                ["End", fmt(subscription.effective_end_date), "#fbbf24"],
                            ].map(([label, val, color]) => (
                                <div key={label} style={{ background: "#0b2418", border: "1px solid #0d3020", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", marginBottom: 3 }}>{label}</div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color }}>{val}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Status summary */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
                        {["completed", "pending", "missed", "cancelled"].map(st => {
                            const s = STATUS_CONFIG[st];
                            return (
                                <div key={st} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "8px 0", textAlign: "center" }}>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: s.color, lineHeight: 1 }}>{counts[st] || 0}</div>
                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: s.color, marginTop: 3, opacity: 0.7 }}>{st}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress */}
                    <div style={{ marginBottom: 12 }}>
                        <ProgressBar done={counts.completed || 0} total={row.sessions.length} />
                    </div>

                    {/* Filter tabs */}
                    <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 2 }}>
                        {FILTERS.map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all .15s", background: filter === f ? "#00c2ff" : "#0b2418", color: filter === f ? "#020e09" : "#2e6647" }}>
                                {f === "all" ? `All (${row.sessions.length})` : `${f} (${counts[f] || 0})`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Session Rows */}
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
                    {filtered.length === 0
                        ? <div style={{ textAlign: "center", padding: "40px 0", color: "#2e6647", fontSize: 13 }}>No {filter !== "all" ? filter : ""} sessions</div>
                        : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 8px" }}>Click any session to edit</p>
                                {filtered.map((session, i) => {
                                    const st = STATUS_CONFIG[session.status] || STATUS_CONFIG.pending;
                                    return (
                                        <div key={session._id || i} onClick={() => setEditingSession(session)}
                                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, cursor: "pointer", background: "#020e09", border: `1px solid #0d3020`, borderLeft: `3px solid ${st.color}`, transition: "all .15s" }}
                                            onMouseEnter={e => { e.currentTarget.style.background = "#0b2418"; e.currentTarget.style.borderColor = "#134030"; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = "#020e09"; e.currentTarget.style.borderColor = "#0d3020"; }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#00c2ff", flexShrink: 0 }}>
                                                {session.session_number || i + 1}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: 13, fontWeight: 600, color: "#e6f7f0", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {session.session_title || `Session ${session.session_number || i + 1}`}
                                                </p>
                                                <p style={{ fontSize: 11, color: "#2e6647", margin: 0 }}>
                                                    {session.session_date ? fmtDT(session.session_date) : "No date set"}
                                                    {session.task_completed ? " · ✓ Task done" : ""}
                                                </p>
                                            </div>
                                            <StatusPill status={session.status} />
                                            <span style={{ fontSize: 11, color: "#6db892", flexShrink: 0 }}>Edit →</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    }
                </div>
            </div>

            {editingSession && (
                <SessionEditModal session={editingSession} onClose={() => setEditingSession(null)} onSave={onSave} />
            )}

            <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
        </>
    );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function MentorSessionsTable() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [activeTab, setActiveTab] = useState("sessions");
    const [toast, setToast] = useState(null);

    const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

    const { data: sessionsResult, isLoading: sessionsLoading, isError: sessionsError } = useGetSessionsByMentorQuery(mentorId);
    const { data: subscribersResult, isLoading: subscribersLoading, isError: subscribersError } = useGetSubscribersByMentorQuery(mentorId);
    const [updateSession] = useUpdateByMentorSessionMutation();

    const sessions = sessionsResult?.data ?? [];
    const subscribers = subscribersResult?.data ?? subscribersResult?.subscriptions ?? [];

    // Group sessions by subscription_id, also map subscription doc
    const subMap = subscribers.reduce((acc, s) => { acc[s._id || s.id] = s; return acc; }, {});
    const grouped = sessions.reduce((acc, s) => {
        const k = s.subscription_id;
        if (!acc[k]) acc[k] = { subscription_id: k, mentor_id: s.mentor_id, mentee_id: s.mentee_id, sessions: [] };
        acc[k].sessions.push(s);
        return acc;
    }, {});
    const rows = Object.values(grouped);

    const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

    const handleSave = async (session_id, form) => {
        try {
            await updateSession({ session_id, ...form }).unwrap();
            showToast("Session updated successfully.");
        } catch {
            showToast("Failed to update session.", "error");
        }
    };

    const thStyle = { fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2e6647", padding: "12px 16px", background: "#0b2418", textAlign: "left", whiteSpace: "nowrap" };
    const tdStyle = { padding: "14px 16px", borderBottom: "1px solid #0d3020", verticalAlign: "middle", fontSize: 13, color: "#e6f7f0" };

    return (
        <div style={{ minHeight: "100vh", background: "#020e09", fontFamily: "'DM Sans',sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 5px; height: 5px; }
                ::-webkit-scrollbar-track { background: #020e09; }
                ::-webkit-scrollbar-thumb { background: #0d3020; border-radius: 99px; }
                tr:hover td { background: #0b2418 !important; }
                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 768px) {
                    .desktop-table { display: none !important; }
                    .mobile-cards  { display: flex !important; }
                }
            `}</style>

            {/* Page Header */}
            <div style={{ padding: "28px 28px 0", borderBottom: "1px solid #0d3020" }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#2e6647", marginBottom: 6 }}>Mentorship Portal</p>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 22 }}>
                    <div>
                        <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: "#e6f7f0", margin: 0 }}>Sessions Overview</h1>
                        <p style={{ fontSize: 13, color: "#6db892", marginTop: 4 }}>
                            {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} · {sessions.length} total sessions
                        </p>
                    </div>
                    {/* Stat pills */}
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {[
                            { label: "Subscribers", value: subscribersLoading ? "—" : subscribers.length, color: "#34d399" },
                            { label: "Completed", value: sessionsLoading ? "—" : sessions.filter(s => s.status === "completed").length, color: "#34d399" },
                            { label: "Pending", value: sessionsLoading ? "—" : sessions.filter(s => s.status === "pending").length, color: "#00c2ff" },
                            { label: "Missed", value: sessionsLoading ? "—" : sessions.filter(s => s.status === "missed").length, color: "#fbbf24" },
                        ].map(({ label, value, color }) => (
                            <div key={label} style={{ background: "#071a10", border: "1px solid #0d3020", borderRadius: 12, padding: "10px 18px", textAlign: "center", minWidth: 76 }}>
                                <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
                                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2e6647", marginTop: 4 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Tabs */}
                <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #0d3020" }}>
                    {[["subscribers", "Subscribers", subscribers.length], ["sessions", "Sessions", rows.length]].map(([id, label, count]) => (
                        <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "10px 22px", fontSize: 13, fontWeight: 700, background: "transparent", border: "none", cursor: "pointer", color: activeTab === id ? "#00c2ff" : "#2e6647", borderBottom: activeTab === id ? "2px solid #00c2ff" : "2px solid transparent", marginBottom: -2, transition: "all .15s", display: "flex", alignItems: "center", gap: 7 }}>
                            {label}
                            {count > 0 && <span style={{ fontSize: 10, fontWeight: 800, color: activeTab === id ? "#020e09" : "#6db892", background: activeTab === id ? "#00c2ff" : "#0b2418", border: `1px solid ${activeTab === id ? "#00c2ff" : "#0d3020"}`, borderRadius: 10, padding: "1px 6px" }}>{count}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 28px" }}>

                {/* ══ SUBSCRIBERS TAB ══ */}
                {activeTab === "subscribers" && (
                    <>
                        {subscribersLoading && <Spinner />}
                        {subscribersError && <div style={{ padding: "14px 18px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: 12, color: "#f87171", fontSize: 13 }}>Failed to load subscribers.</div>}

                        {!subscribersLoading && !subscribersError && subscribers.length === 0 && (
                            <div style={{ textAlign: "center", padding: "60px 0", color: "#2e6647", fontSize: 14 }}>No subscribers yet.</div>
                        )}

                        {!subscribersLoading && !subscribersError && subscribers.length > 0 && (
                            <>
                                {/* Desktop Table */}
                                <div className="desktop-table" style={{ borderRadius: 16, border: "1px solid #0d3020", overflow: "hidden" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                {["#", "Mentee ID", "Plan", "Total Sessions", "Amount", "Payment", "Start Date", "End Date", "Status"].map(h => (
                                                    <th key={h} style={thStyle}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscribers.map((sub, idx) => {
                                                const isActive = sub.status === "active";
                                                return (
                                                    <tr key={sub._id || idx} style={{ background: idx % 2 === 0 ? "#020e09" : "#071a10" }}>
                                                        <td style={{ ...tdStyle, color: "#2e6647", fontWeight: 700 }}>{idx + 1}</td>
                                                        <td style={tdStyle}><ShortId id={sub.mentee_id} /></td>
                                                        <td style={{ ...tdStyle, fontWeight: 600, color: "#00c2ff" }}>{PLAN_LABELS[sub.plan_type] || sub.plan_type}</td>
                                                        <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700, color: "#00c2ff" }}>{sub.total_sessions}</td>
                                                        <td style={{ ...tdStyle, fontWeight: 700, color: "#34d399" }}>₹{sub.amount?.toLocaleString("en-IN")}</td>
                                                        <td style={tdStyle}><StatusPill status={sub.payment_status} /></td>
                                                        <td style={{ ...tdStyle, color: "#6db892", fontSize: 12 }}>{fmt(sub.subscribed_at)}</td>
                                                        <td style={{ ...tdStyle, color: "#fbbf24", fontSize: 12 }}>{fmt(sub.effective_end_date || sub.subscription_end_date)}</td>
                                                        <td style={tdStyle}><StatusPill status={sub.status} /></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="mobile-cards" style={{ display: "none", flexDirection: "column", gap: 12 }}>
                                    {subscribers.map((sub, idx) => (
                                        <div key={sub._id || idx} style={{ background: "#071a10", border: "1px solid #0d3020", borderTop: "2px solid #00c2ff", borderRadius: 14, padding: "16px 18px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                                <div>
                                                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 4px" }}>Subscriber #{idx + 1}</p>
                                                    <ShortId id={sub.mentee_id} />
                                                </div>
                                                <StatusPill status={sub.status} />
                                            </div>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
                                                {[
                                                    ["Plan", PLAN_LABELS[sub.plan_type] || sub.plan_type, "#00c2ff"],
                                                    ["Sessions", sub.total_sessions, "#00c2ff"],
                                                    ["Amount", `₹${sub.amount?.toLocaleString("en-IN")}`, "#34d399"],
                                                    ["Payment", sub.payment_status, "#e6f7f0"],
                                                    ["Start", fmt(sub.subscribed_at), "#6db892"],
                                                    ["Expires", fmt(sub.effective_end_date), "#fbbf24"],
                                                ].map(([label, val, color]) => (
                                                    <div key={label}>
                                                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", marginBottom: 3 }}>{label}</div>
                                                        <div style={{ fontSize: 13, fontWeight: 600, color }}>{val}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* ══ SESSIONS TAB ══ */}
                {activeTab === "sessions" && (
                    <>
                        {sessionsLoading && <Spinner />}
                        {sessionsError && <div style={{ padding: "14px 18px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: 12, color: "#f87171", fontSize: 13 }}>Failed to load sessions.</div>}

                        {!sessionsLoading && !sessionsError && rows.length === 0 && (
                            <div style={{ textAlign: "center", padding: "60px 0", color: "#2e6647", fontSize: 14 }}>No sessions found.</div>
                        )}

                        {!sessionsLoading && !sessionsError && rows.length > 0 && (
                            <>
                                {/* Desktop Table */}
                                <div className="desktop-table" style={{ borderRadius: 16, border: "1px solid #0d3020", overflow: "hidden" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                {["#", "Mentee", "Subscription ID", "Plan", "Total", "Done", "Pending", "Missed", "Progress", "Status", "Action"].map(h => (
                                                    <th key={h} style={thStyle}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, idx) => {
                                                const sub = subMap[row.subscription_id];
                                                const cnts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
                                                return (
                                                    <tr key={row.subscription_id} style={{ background: idx % 2 === 0 ? "#020e09" : "#071a10" }}>
                                                        <td style={{ ...tdStyle, color: "#2e6647", fontWeight: 700 }}>{idx + 1}</td>
                                                        <td style={tdStyle}><ShortId id={row.mentee_id} /></td>
                                                        <td style={tdStyle}><ShortId id={row.subscription_id} /></td>
                                                        <td style={{ ...tdStyle, fontWeight: 600, color: "#00c2ff" }}>{sub ? PLAN_LABELS[sub.plan_type] || sub.plan_type : "—"}</td>
                                                        <td style={{ ...tdStyle, fontWeight: 700, color: "#00c2ff", textAlign: "center" }}>{row.sessions.length}</td>
                                                        <td style={{ ...tdStyle, fontWeight: 700, color: "#34d399", textAlign: "center" }}>{cnts.completed || 0}</td>
                                                        <td style={{ ...tdStyle, fontWeight: 700, color: "#00c2ff", textAlign: "center" }}>{cnts.pending || 0}</td>
                                                        <td style={{ ...tdStyle, fontWeight: 700, color: "#fbbf24", textAlign: "center" }}>{cnts.missed || 0}</td>
                                                        <td style={{ ...tdStyle, minWidth: 120 }}>
                                                            <ProgressBar done={cnts.completed || 0} total={row.sessions.length} />
                                                        </td>
                                                        <td style={tdStyle}>{sub && <StatusPill status={sub.status} />}</td>
                                                        <td style={tdStyle}>
                                                            <button onClick={() => setSelectedRow(row)}
                                                                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00c2ff", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s" }}
                                                                onMouseEnter={e => { e.currentTarget.style.background = "#00c2ff"; e.currentTarget.style.color = "#020e09"; }}
                                                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,194,255,0.1)"; e.currentTarget.style.color = "#00c2ff"; }}>
                                                                View →
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="mobile-cards" style={{ display: "none", flexDirection: "column", gap: 12 }}>
                                    {rows.map((row, idx) => {
                                        const sub = subMap[row.subscription_id];
                                        const cnts = row.sessions.reduce((a, s) => { a[s.status] = (a[s.status] || 0) + 1; return a; }, {});
                                        return (
                                            <div key={row.subscription_id} style={{ background: "#071a10", border: "1px solid #0d3020", borderTop: "2px solid #00c2ff", borderRadius: 14, padding: "16px 18px" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                                    <div>
                                                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", margin: "0 0 4px" }}>Subscription #{idx + 1}</p>
                                                        <ShortId id={row.subscription_id} />
                                                    </div>
                                                    {sub && <StatusPill status={sub.status} />}
                                                </div>
                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 12 }}>
                                                    {[
                                                        ["Plan", sub ? PLAN_LABELS[sub.plan_type] || sub.plan_type : "—", "#00c2ff"],
                                                        ["Total", row.sessions.length, "#00c2ff"],
                                                        ["Completed", cnts.completed || 0, "#34d399"],
                                                        ["Pending", cnts.pending || 0, "#00c2ff"],
                                                        ["Missed", cnts.missed || 0, "#fbbf24"],
                                                        ["Cancelled", cnts.cancelled || 0, "#f87171"],
                                                    ].map(([label, val, color]) => (
                                                        <div key={label}>
                                                            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2e6647", marginBottom: 3 }}>{label}</div>
                                                            <div style={{ fontSize: 14, fontWeight: 700, color }}>{val}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginBottom: 14 }}><ProgressBar done={cnts.completed || 0} total={row.sessions.length} /></div>
                                                <button onClick={() => setSelectedRow(row)} style={{ width: "100%", padding: "11px", borderRadius: 10, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00c2ff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                                                    View Sessions →
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {selectedRow && (
                <SessionDrawer
                    row={selectedRow}
                    subscription={subMap[selectedRow.subscription_id]}
                    onClose={() => setSelectedRow(null)}
                    onSave={handleSave}
                />
            )}

            <Toast toast={toast} />
        </div>
    );
}


