

import { useState } from "react";
import {
  useGetSessionsByMenteeQuery,
  useUpdateByMenteeSessionMutation,
} from "./ltmupcommingsessionsapislice";

// ── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className="text-xl focus:outline-none transition-transform active:scale-90"
      >
        <span className={n <= (value || 0) ? "text-blue-500" : "text-blue-100"}>
          ★
        </span>
      </button>
    ))}
  </div>
);

// ── Status config ────────────────────────────────────────────────────────────
const STATUS = {
  pending:   { label: "Pending",   pill: "bg-blue-50 text-blue-500 border border-blue-200",   dot: "bg-blue-400"   },
  completed: { label: "Completed", pill: "bg-blue-500 text-white border border-blue-500",      dot: "bg-blue-500"   },
  cancelled: { label: "Cancelled", pill: "bg-red-50 text-red-500 border border-red-200",       dot: "bg-red-400"    },
  missed:    { label: "Missed",    pill: "bg-amber-50 text-amber-600 border border-amber-200", dot: "bg-amber-400"  },
};

// ── Reusable field components ────────────────────────────────────────────────
const Field = ({ label, children, span2 = false }) => (
  <div className={span2 ? "col-span-1 sm:col-span-2" : "col-span-1"}>
    <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-400 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full bg-white border border-blue-100 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-blue-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";

// ── Session Card ─────────────────────────────────────────────────────────────
function SessionCard({ session, onSave, index }) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    session_title:       session.session_title || "",
    session_date:        session.session_date
                           ? new Date(session.session_date).toISOString().slice(0, 16)
                           : "",
    meeting_link:        session.meeting_link || "",
    meeting_description: session.meeting_description || "",
    tasks_given:         session.tasks_given || "",
    task_completed:      session.task_completed || false,
    mentee_feedback:     session.mentee_feedback || "",
    mentee_rating:       session.mentee_rating || 0,
    status:              session.status || "pending",
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

  return (
    <div className={`w-full border rounded-xl overflow-hidden transition-colors duration-150 bg-white
      ${expanded ? "border-blue-500" : "border-blue-100 hover:border-blue-300"}`}
    >
      {/* ── Header ── */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none"
      >
        {/* Number */}
        <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {session.session_number}
        </div>

        {/* Title + date */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
            {form.session_title || `Session ${session.session_number}`}
          </p>
          <p className="text-xs text-blue-400 mt-0.5 leading-tight">
            {form.session_date
              ? new Date(form.session_date).toLocaleDateString("en-US", {
                  weekday: "short", month: "short", day: "numeric", year: "numeric",
                })
              : "No date set"}
          </p>
        </div>

        {/* Status pill – hidden on xs, dot on xs */}
        <span className={`hidden sm:inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${st.pill}`}>
          {st.label}
        </span>
        <span className={`sm:hidden w-2 h-2 rounded-full shrink-0 ${st.dot}`} />

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-blue-400 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Body ── */}
      {expanded && (
        <div className="border-t border-blue-100 bg-blue-50/30 px-5 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Field label="Session Title" span2>
              <input
                className={inputCls}
                value={form.session_title}
                onChange={set("session_title")}
                placeholder="e.g. Introduction & Goal Setting"
              />
            </Field>

            <Field label="Date & Time">
              <input
                type="datetime-local"
                className={inputCls}
                value={form.session_date}
                onChange={set("session_date")}
              />
            </Field>

            <Field label="Status">
              <select className={inputCls} value={form.status} onChange={set("status")}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="missed">Missed</option>
              </select>
            </Field>

            <Field label="Meeting Link" span2>
              <input
                className={inputCls}
                value={form.meeting_link}
                onChange={set("meeting_link")}
                placeholder="https://meet.google.com/..."
              />
            </Field>

            <Field label="Agenda / Description" span2>
              <textarea
                rows={3}
                className={`${inputCls} resize-none`}
                value={form.meeting_description}
                onChange={set("meeting_description")}
                placeholder="Topics to be covered in this session..."
              />
            </Field>

            <Field label="Tasks Given by Mentor" span2>
              <textarea
                rows={3}
                className={`${inputCls} resize-none`}
                value={form.tasks_given}
                onChange={set("tasks_given")}
                placeholder="Tasks assigned for this session..."
              />
            </Field>

            <Field label="Task Completion" span2>
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.task_completed}
                  onChange={set("task_completed")}
                  className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Task completed</span>
              </label>
            </Field>

            <Field label="Your Feedback" span2>
              <textarea
                rows={3}
                className={`${inputCls} resize-none`}
                value={form.mentee_feedback}
                onChange={set("mentee_feedback")}
                placeholder="Your thoughts on this session..."
              />
            </Field>

            <Field label="Your Rating" span2>
              <Stars
                value={form.mentee_rating}
                onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))}
              />
            </Field>

            {session.mentor_feedback && (
              <Field label="Mentor Feedback" span2>
                <textarea
                  rows={3}
                  readOnly
                  className={`${inputCls} resize-none bg-blue-50 cursor-default text-gray-500`}
                  value={session.mentor_feedback}
                />
              </Field>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-5 pt-5 border-t border-blue-100">
            <button
              onClick={() => setExpanded(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-blue-200 text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium
      ${toast.type === "success"
        ? "bg-white border-blue-200 text-blue-600"
        : "bg-white border-red-200 text-red-500"
      }`}
    >
      {toast.type === "success" ? (
        <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {toast.msg}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Ltmupcommingsessions() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { data: result, isLoading, isError } = useGetSessionsByMenteeQuery(userData?._id);
  const [updateSession] = useUpdateByMenteeSessionMutation();
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const sessions = result?.data ?? [];
  const filtered = filter === "all" ? sessions : sessions.filter((s) => s.status === filter);

  const counts = sessions.reduce(
    (acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }),
    {}
  );

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
    <div className="min-h-screen w-full bg-white">

      {/* ── Page header ── */}
      <div className="w-full border-b border-blue-100 bg-white px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-400 mb-1">
              Mentorship
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              My Sessions
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {sessions.length > 0
                ? `${sessions.length} sessions · ${counts.completed || 0} completed`
                : "No sessions yet"}
            </p>
          </div>

          {/* Stat pills */}
          {sessions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(counts).map(([status, count]) => {
                const st = STATUS[status];
                return (
                  <div
                    key={status}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${st?.pill}`}
                  >
                    {count} {st?.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Filter bar */}
        <div className="flex gap-1 mt-6 overflow-x-auto pb-px">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors
                ${filter === f
                  ? "bg-blue-500 text-white"
                  : "text-blue-400 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              {f === "all" ? `All (${sessions.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f] || 0})`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-6">

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-8 h-8 border-2 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm text-blue-400">Loading sessions…</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Failed to load sessions.</p>
              <p className="text-xs text-gray-400 mt-1">Please refresh and try again.</p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">
              No {filter !== "all" ? filter : ""} sessions found.
            </p>
          </div>
        )}

        {/* Session list */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map((session, i) => (
              <SessionCard
                key={session._id}
                session={session}
                onSave={handleSave}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      <Toast toast={toast} />
    </div>
  );
}

// Usage: <MenteeSessions />
// Reads mentee_id from localStorage key "userData"