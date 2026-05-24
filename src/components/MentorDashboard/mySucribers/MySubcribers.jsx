






// import React, { useState } from "react";
// import {
//   useGetSessionsByMentorQuery,
//   useGetSubscribersByMentorQuery,
// } from "./mysubcriberspislice";

// const STATUS_STYLES = {
//   pending: "text-cyan-600",
//   completed: "text-emerald-600",
//   cancelled: "text-red-500",
//   missed: "text-amber-600",
//   active: "text-emerald-600",
//   approved: "text-emerald-600",
//   onprocess: "text-blue-600",
// };

// const PLAN_LABELS = {
//   one_month: "1 Month",
//   three_months: "3 Months",
//   six_months: "6 Months",
// };

// const ShortId = ({ id }) => (
//   <span className="font-mono text-xs text-gray-500">
//     ...{id?.slice(-8)}
//   </span>
// );

// export default function MentorSessionsTable() {
//   const [activeTab, setActiveTab] = useState("sessions");

//   const mentorId = JSON.parse(
//     localStorage.getItem("userData") || "{}"
//   )?._id;

//   const { data: sessionsResult } =
//     useGetSessionsByMentorQuery(mentorId);

//   const { data: subscribersResult } =
//     useGetSubscribersByMentorQuery(mentorId);

//   const sessions = sessionsResult?.data || [];

//   const subscribers =
//     subscribersResult?.data ||
//     subscribersResult?.subscriptions ||
//     [];

//   return (
//     <div className="min-h-screen bg-white px-6 py-8 text-gray-700">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-xl md:text-2xl font-bold text-[#1a1a2e]">
//           Sessions Overview
//         </h1>

//         <p className="text-xs text-gray-500 mt-1">
//           {subscribers.length} subscribers · {sessions.length} sessions
//         </p>

//         {/* INLINE METRICS */}
//         <div className="flex flex-wrap gap-5 mt-3 text-xs text-gray-600">
//           <span>
//             Subscribers: {subscribers.length}
//           </span>

//           <span>
//             Completed:{" "}
//             {
//               sessions.filter(
//                 (s) => s.status === "completed"
//               ).length
//             }
//           </span>

//           <span>
//             Pending:{" "}
//             {
//               sessions.filter(
//                 (s) => s.status === "pending"
//               ).length
//             }
//           </span>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-6 border-b border-gray-200 mb-6 text-xs font-medium">
//         {["subscribers", "sessions"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-2 capitalize transition ${activeTab === tab
//                 ? "text-[#0098cc] border-b-2 border-[#0098cc]"
//                 : "text-gray-500"
//               }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* SUBSCRIBERS TABLE */}
//       {activeTab === "subscribers" && (
//         <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left border-b border-gray-200 bg-gray-50">
//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     #
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Mentee
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Plan
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Sessions
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Amount
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {subscribers.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="6"
//                       className="text-center py-14 text-sm text-gray-500"
//                     >
//                       No subscribers found
//                     </td>
//                   </tr>
//                 ) : (
//                   subscribers.map((sub, index) => (
//                     <tr
//                       key={sub._id}
//                       className="border-b border-gray-100 hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-xs">
//                         {index + 1}
//                       </td>

//                       <td className="px-6 py-4">
//                         <ShortId id={sub.mentee_id} />
//                       </td>

//                       <td className="px-6 py-4 text-xs font-medium text-[#0098cc]">
//                         {PLAN_LABELS[sub.plan_type] ||
//                           sub.plan_type}
//                       </td>

//                       <td className="px-6 py-4 text-xs">
//                         {sub.total_sessions}
//                       </td>

//                       <td className="px-6 py-4 text-xs font-medium text-emerald-600">
//                         ₹
//                         {sub.amount?.toLocaleString(
//                           "en-IN"
//                         )}
//                       </td>

//                       <td
//                         className={`px-6 py-4 text-xs font-medium ${STATUS_STYLES[sub.status] ||
//                           "text-gray-500"
//                           }`}
//                       >
//                         {sub.status || "pending"}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* SESSIONS TABLE */}
//       {activeTab === "sessions" && (
//         <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left border-b border-gray-200 bg-gray-50">
//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     #
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Subscription
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Type
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Total
//                   </th>

//                   <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase">
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {sessions.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="text-center py-14 text-sm text-gray-500"
//                     >
//                       No sessions found
//                     </td>
//                   </tr>
//                 ) : (
//                   sessions.map((item, index) => (
//                     <tr
//                       key={item._id}
//                       className="border-b border-gray-100 hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-xs">
//                         {index + 1}
//                       </td>

//                       <td className="px-6 py-4">
//                         <ShortId
//                           id={item.subscription_id}
//                         />
//                       </td>

//                       <td className="px-6 py-4 text-xs">
//                         Session
//                       </td>

//                       <td className="px-6 py-4 text-xs">
//                         1
//                       </td>

//                       <td
//                         className={`px-6 py-4 text-xs font-medium ${STATUS_STYLES[item.status] ||
//                           "text-gray-500"
//                           }`}
//                       >
//                         {item.status || "pending"}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
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
        className="text-xl focus:outline-none transition-transform"
        style={{ cursor: readonly ? "default" : "pointer" }}
        onMouseEnter={(e) => { if (!readonly) e.currentTarget.style.transform = "scale(1.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <span style={{ color: n <= (value || 0) ? "#0098cc" : "#1a4030" }}>★</span>
      </button>
    ))}
  </div>
);

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS = {
  pending: { label: "Pending", textColor: "#0098cc", borderColor: "#0a3020", bgColor: "#0a2818" },
  completed: { label: "Completed", textColor: "#10b981", borderColor: "#064e3b", bgColor: "#022c22" },
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
  boxSizing: "border-box",
};

const readonlyInputStyle = {
  ...inputStyle,
  background: "#051f12",
  cursor: "default",
  color: "#6aab8e",
};

const focusHandler = (e) => (e.target.style.borderColor = "#0098cc");
const blurHandler = (e) => (e.target.style.borderColor = "#0a3020");

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children, span2 = false }) => (
  <div style={{ gridColumn: span2 ? "1 / -1" : undefined }}>
    <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase mb-1.5" style={{ color: "#0098cc" }}>
      {label}
    </label>
    {children}
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
function SessionModal({ session, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
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
    const success = await onSave(session._id, form);
    setSaving(false);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const st = STATUS[form.status] || STATUS.pending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(3, 22, 16, 0.85)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "#051f12", border: "1px solid #0a3020", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center gap-4 px-6 py-4 shrink-0"
          style={{ borderBottom: "1px solid #0a3020", background: "#031610" }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
            style={{ background: "#0098cc", color: "#031610" }}
          >
            {session.session_number}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate" style={{ color: "#e2f5ef" }}>
              {form.session_title || `Session ${session.session_number}`}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#2a7a52" }}>
              {form.session_date
                ? new Date(form.session_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                : "No date set"}
            </p>
          </div>
          <span
            className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0"
            style={{ color: st.textColor, border: `1px solid ${st.borderColor}`, background: st.bgColor }}
          >
            {st.label}
          </span>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors focus:outline-none"
            style={{ color: "#2a7a52", border: "1px solid #0a3020" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0a2818"; e.currentTarget.style.color = "#0098cc"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2a7a52"; }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body — Scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

          {/* Section: Session Details */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "#2a7a52" }}>Session Details</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Session Title" span2>
                <input
                  style={inputStyle}
                  value={form.session_title}
                  onChange={set("session_title")}
                  placeholder="e.g. Introduction & Goal Setting"
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </Field>
              <Field label="Date & Time">
                <input
                  type="datetime-local"
                  style={inputStyle}
                  value={form.session_date}
                  onChange={set("session_date")}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </Field>
              <Field label="Status">
                <select
                  style={inputStyle}
                  value={form.status}
                  onChange={set("status")}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="missed">Missed</option>
                </select>
              </Field>
              <Field label="Meeting Link" span2>
                <input
                  style={inputStyle}
                  value={form.meeting_link}
                  onChange={set("meeting_link")}
                  placeholder="https://meet.google.com/..."
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </Field>
              <Field label="Agenda / Description" span2>
                <textarea
                  rows={3}
                  style={{ ...inputStyle, resize: "none" }}
                  value={form.meeting_description}
                  onChange={set("meeting_description")}
                  placeholder="Topics discussed…"
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </Field>
            </div>
          </div>

          {/* Section: Tasks */}
          <div style={{ borderTop: "1px solid #0a3020", paddingTop: 20 }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "#2a7a52" }}>Tasks</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Tasks Assigned to Mentee" span2>
                <textarea
                  rows={3}
                  style={{ ...readonlyInputStyle, resize: "none" }}
                  readOnly
                  value={form.tasks_given || "No task assigned."}
                />
              </Field>
              <Field label="Task Completion" span2>
                <label className="inline-flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.task_completed}
                    onChange={set("task_completed")}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: "#0098cc" }}
                  />
                  <span className="text-sm" style={{ color: "#a3d9c2" }}>Mark task as completed</span>
                </label>
              </Field>
            </div>
          </div>

          {/* Section: Feedback */}
          <div style={{ borderTop: "1px solid #0a3020", paddingTop: 20 }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "#2a7a52" }}>Feedback</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Mentee Feedback" span2>
                <textarea
                  rows={3}
                  style={{ ...inputStyle, resize: "none" }}
                  value={form.mentee_feedback}
                  onChange={set("mentee_feedback")}
                  placeholder="Share thoughts on this session…"
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </Field>
              <Field label="Mentee Rating" span2>
                <Stars
                  value={form.mentee_rating}
                  onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))}
                />
              </Field>
              {session.mentor_feedback && (
                <Field label="Mentor's Feedback" span2>
                  <textarea
                    rows={3}
                    readOnly
                    style={{ ...readonlyInputStyle, resize: "none" }}
                    value={session.mentor_feedback}
                  />
                </Field>
              )}
              {session.mentor_rating > 0 && (
                <Field label="Mentor's Rating" span2>
                  <Stars value={session.mentor_rating} readonly />
                </Field>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="flex flex-col-reverse sm:flex-row justify-end gap-2 px-6 py-4 shrink-0"
          style={{ borderTop: "1px solid #0a3020", background: "#031610" }}
        >
          {saved && (
            <span className="flex items-center gap-1.5 text-xs font-medium mr-auto" style={{ color: "#10b981" }}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Saved successfully
            </span>
          )}
          <button
            onClick={onClose}
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
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
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

// ─── Status Pill ──────────────────────────────────────────────────────────────
const STATUS_PILL = {
  pending: { color: "#0098cc", border: "#0a3020", bg: "#0a2818" },
  completed: { color: "#10b981", border: "#064e3b", bg: "#022c22" },
  cancelled: { color: "#f87171", border: "#3b1a1a", bg: "#1f0d0d" },
  missed: { color: "#fbbf24", border: "#3b2a0a", bg: "#1f1608" },
};

function StatusBadge({ status }) {
  const sp = STATUS_PILL[status];
  if (!sp) return <span className="text-xs" style={{ color: "#6aab8e" }}>{status || "—"}</span>;
  return (
    <span
      className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
      style={{ color: sp.color, border: `1px solid ${sp.border}`, background: sp.bg }}
    >
      {status}
    </span>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
const PAGE_SIZE_OPTIONS = [5, 10, 20];

function Pagination({ page, total, pageSize, onPage, onPageSize }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1 && total <= PAGE_SIZE_OPTIONS[0]) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btnBase = {
    minWidth: 32, height: 32,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    borderRadius: 8, fontSize: 12, fontWeight: 600,
    cursor: "pointer", border: "1px solid #0a3020",
    background: "transparent", color: "#2a7a52", transition: "all 0.15s",
  };
  const activeBtnStyle = { ...btnBase, background: "#0098cc", color: "#031610", border: "1px solid #0098cc" };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4" style={{ borderTop: "1px solid #0a3020" }}>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: "#2a7a52" }}>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => { onPageSize(Number(e.target.value)); onPage(1); }}
          className="rounded-lg text-xs focus:outline-none"
          style={{ background: "#051f12", border: "1px solid #0a3020", color: "#e2f5ef", padding: "4px 8px" }}
        >
          {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-xs" style={{ color: "#2a7a52" }}>
          {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of {total}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          style={{ ...btnBase, opacity: page === 1 ? 0.4 : 1 }}
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          onMouseEnter={(e) => { if (page !== 1) e.currentTarget.style.background = "#0a2818"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >‹</button>
        {pages.map((p) => (
          <button
            key={p}
            style={p === page ? activeBtnStyle : btnBase}
            onClick={() => onPage(p)}
            onMouseEnter={(e) => { if (p !== page) e.currentTarget.style.background = "#0a2818"; }}
            onMouseLeave={(e) => { if (p !== page) e.currentTarget.style.background = "transparent"; }}
          >{p}</button>
        ))}
        <button
          style={{ ...btnBase, opacity: page === totalPages ? 0.4 : 1 }}
          disabled={page === totalPages}
          onClick={() => onPage(page + 1)}
          onMouseEnter={(e) => { if (page !== totalPages) e.currentTarget.style.background = "#0a2818"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >›</button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MentorSessionDetails() {
  const navigate = useNavigate();
  const { subscription_id } = useParams();
  const { state } = useLocation();

  const initialSessions = state?.sessions ?? [];
  const mentee_id = state?.mentee_id ?? "";

  // Local sessions state so UI updates after save
  const [sessions, setSessions] = useState(initialSessions);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSession, setSelectedSession] = useState(null);
  const [toast, setToast] = useState(null);

  const [updateSession] = useUpdateByMentorSessionMutation();

  const filtered = filter === "all" ? sessions : sessions.filter((s) => s.status === filter);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

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
      const result = await updateSession({ session_id, ...form }).unwrap();
      // Update local state so UI reflects changes immediately
      setSessions((prev) =>
        prev.map((s) =>
          s._id === session_id
            ? { ...s, ...form, session_date: form.session_date ? new Date(form.session_date).toISOString() : s.session_date }
            : s
        )
      );
      showToast("Session updated successfully.");
      return true;
    } catch {
      showToast("Failed to update session.", "error");
      return false;
    }
  };

  const FILTERS = ["all", "pending", "completed", "missed", "cancelled"];

  return (
    <div className="min-h-screen w-full" style={{ background: "#031610" }}>

      {/* Header */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10" style={{ borderBottom: "1px solid #0a3020" }}>
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

          {sessions.length > 0 && (
            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
              <div className="flex gap-1.5 flex-wrap sm:justify-end">
                {Object.entries(counts).map(([status, count]) => {
                  const sp = STATUS_PILL[status];
                  if (!sp) return null;
                  return (
                    <div
                      key={status}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                      style={{ color: sp.color, border: `1px solid ${sp.border}`, background: sp.bg }}
                    >
                      {count} {STATUS[status]?.label}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 w-48">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#0a3020" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${completedPct}%`, background: "#0098cc" }}
                  />
                </div>
                <span className="text-xs font-semibold shrink-0" style={{ color: "#0098cc" }}>{completedPct}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-1 mt-6 overflow-x-auto pb-px">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
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

      {/* Session Table */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#051f12", border: "1px solid #0a3020" }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#2a7a52" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: "#2a7a52" }}>
              No {filter !== "all" ? filter : ""} sessions found.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #0a3020", background: "#051f12" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #0a3020", background: "#031610" }}>
                    {["#", "Session", "Date & Time", "Task", "Status", "Action"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#2a7a52" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((session, index) => {
                    const st = STATUS[session.status] || STATUS.pending;
                    return (
                      <tr
                        key={session._id}
                        className="transition-colors cursor-pointer"
                        style={{ borderBottom: "1px solid #0a3020" }}
                        onClick={() => setSelectedSession(session)}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#0a2818")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="px-5 py-4 text-xs" style={{ color: "#6aab8e" }}>
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                              style={{ background: "#0098cc", color: "#031610" }}
                            >
                              {session.session_number}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold truncate max-w-[160px]" style={{ color: "#e2f5ef" }}>
                                {session.session_title || `Session ${session.session_number}`}
                              </p>
                              {session.meeting_link && (
                                <p className="text-[10px] truncate max-w-[160px]" style={{ color: "#2a7a52" }}>
                                  {session.meeting_link}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-xs" style={{ color: "#6aab8e" }}>
                          {session.session_date
                            ? new Date(session.session_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                            : "—"}
                          {session.session_date && (
                            <div className="text-[10px]" style={{ color: "#2a7a52" }}>
                              {new Date(session.session_date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md"
                            style={
                              session.task_completed
                                ? { color: "#10b981", border: "1px solid #064e3b", background: "#022c22" }
                                : { color: "#fbbf24", border: "1px solid #3b2a0a", background: "#1f1608" }
                            }
                          >
                            {session.task_completed ? "Done" : "Pending"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={session.status} />
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedSession(session); }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors focus:outline-none"
                            style={{ color: "#0098cc", border: "1px solid #0a3020", background: "transparent" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#0a2818"; e.currentTarget.style.borderColor = "#0098cc"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#0a3020"; }}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                            </svg>
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              total={filtered.length}
              pageSize={pageSize}
              onPage={setPage}
              onPageSize={setPageSize}
            />
          </div>
        )}
      </div>

      {/* Session Edit Modal */}
      {selectedSession && (
        <SessionModal
          key={selectedSession._id}
          session={sessions.find((s) => s._id === selectedSession._id) || selectedSession}
          onClose={() => setSelectedSession(null)}
          onSave={handleSave}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
