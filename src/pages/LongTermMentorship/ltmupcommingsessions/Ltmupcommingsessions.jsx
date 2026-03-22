import { useState, useMemo } from "react";
import {
  Layers, ClipboardCheck, CheckCircle2, Circle, AlertCircle,
  Loader2, Send, X, BookOpen, ClipboardList, MessageSquare,
  ExternalLink, CheckCheck, Link2, Calendar,
} from "lucide-react";
import {
  useGetSessionsByMenteeQuery,
  useUpdateByMenteeSessionMutation,
} from "./ltmupcommingsessionsapislice";

const FONT = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
const ff = "'Inter', sans-serif";

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const fmtTime = (iso) =>
  iso ? new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : null;

const iBase = {
  width: "100%", fontFamily: ff, fontSize: 13, color: "#1e293b",
  background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
  padding: "9px 12px", outline: "none", boxSizing: "border-box",
  transition: "border-color .15s, box-shadow .15s",
};
const iRO = { ...iBase, background: "#f8fafc", color: "#94a3b8", cursor: "default" };

function FInp({ value, onChange, placeholder, type = "text", readOnly }) {
  const [f, setF] = useState(false);
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      readOnly={readOnly}
      style={{ ...(readOnly ? iRO : iBase), borderColor: f ? "#3b82f6" : "#e2e8f0", boxShadow: f ? "0 0 0 3px rgba(59,130,246,.1)" : "none" }}
      onFocus={() => setF(true)} onBlur={() => setF(false)} />
  );
}
function FTxt({ value, onChange, placeholder, rows = 3, readOnly }) {
  const [f, setF] = useState(false);
  return (
    <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder}
      readOnly={readOnly}
      style={{ ...(readOnly ? iRO : iBase), resize: "none", lineHeight: 1.6, borderColor: f ? "#3b82f6" : "#e2e8f0", boxShadow: f ? "0 0 0 3px rgba(59,130,246,.1)" : "none" }}
      onFocus={() => setF(true)} onBlur={() => setF(false)} />
  );
}
function FSel({ value, onChange, children }) {
  const [f, setF] = useState(false);
  return (
    <select value={value} onChange={onChange}
      style={{
        ...iBase, appearance: "none", cursor: "pointer", paddingRight: 32,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
        borderColor: f ? "#3b82f6" : "#e2e8f0", boxShadow: f ? "0 0 0 3px rgba(59,130,246,.1)" : "none"
      }}
      onFocus={() => setF(true)} onBlur={() => setF(false)}>
      {children}
    </select>
  );
}

// ── Stars (display) ───────────────────────────────────────────────────────────
function StarDisplay({ value, max = 5 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: 15, color: i < (value || 0) ? "#f59e0b" : "#e2e8f0" }}>★</span>
      ))}
      <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginLeft: 4 }}>
        {value || 0}/{max}
      </span>
    </div>
  );
}

// ── Stars (interactive) ───────────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)}
          style={{
            background: "none", border: "none", padding: 2, cursor: "pointer",
            fontSize: 22, lineHeight: 1, color: n <= (hov || value || 0) ? "#f59e0b" : "#e2e8f0",
            transform: hov === n ? "scale(1.2)" : "scale(1)", transition: "all .1s"
          }}>
          ★
        </button>
      ))}
    </div>
  );
}

// ── Task Submit Panel ─────────────────────────────────────────────────────────
function TaskSubmitPanel({ session, onToast }) {
  const [link, setLink] = useState(session.task_submission || "");
  const [submitting, setSubmitting] = useState(false);
  const [submitTask] = useSubmitTaskMutation();

  if (!session.tasks_given) return null;
  const submitted = !!session.task_submission;

  const handleSubmit = async () => {
    if (!link.trim()) return;
    setSubmitting(true);
    try {
      await submitTask({ session_id: session._id, task_submission: link.trim() }).unwrap();
      onToast("Task submitted successfully.", "success");
    } catch {
      onToast("Failed to submit task.", "error");
    } finally { setSubmitting(false); }
  };

  return (
    <div style={{ border: "1px solid #bfdbfe", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#dbeafe", borderBottom: "1px solid #bfdbfe" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ClipboardList size={13} color="#2563eb" />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#2563eb", fontFamily: ff }}>Submit Task</span>
        </div>
        {submitted && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <CheckCheck size={12} color="#10b981" />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", fontFamily: ff }}>Submitted</span>
          </div>
        )}
      </div>
      <div style={{ padding: "12px 14px", background: "#f0f9ff", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ padding: "9px 12px", background: "#fff", border: "1px solid #bfdbfe", borderRadius: 7 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#93c5fd", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4, fontFamily: ff }}>Assigned Task</p>
          <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.6, margin: 0, fontFamily: ff }}>{session.tasks_given}</p>
        </div>
        {submitted && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 11px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 7 }}>
            <CheckCircle2 size={12} color="#10b981" style={{ flexShrink: 0 }} />
            <a href={session.task_submission} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#059669", textDecoration: "none", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: ff }}>
              {session.task_submission}
            </a>
            <ExternalLink size={11} color="#059669" />
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Link2 size={12} color="#93c5fd" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input type="url" value={link} onChange={(e) => setLink(e.target.value)}
              placeholder="Paste Google Drive or GitHub link…"
              style={{ ...iBase, paddingLeft: 30, fontSize: 12 }} />
          </div>
          <button onClick={handleSubmit} disabled={submitting || !link.trim()}
            style={{
              display: "flex", alignItems: "center", gap: 5, padding: "9px 14px", borderRadius: 8,
              background: submitting || !link.trim() ? "#93c5fd" : "#3b82f6",
              color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: submitting || !link.trim() ? "not-allowed" : "pointer",
              fontFamily: ff, whiteSpace: "nowrap"
            }}>
            {submitting ? <><Loader2 size={12} style={{ animation: "ltm-spin .7s linear infinite" }} />Sending…</>
              : <><Send size={12} />{submitted ? "Resubmit" : "Submit"}</>}
          </button>
        </div>
        {session.task_submitted_at && (
          <p style={{ fontSize: 11, color: "#93c5fd", margin: 0, fontFamily: ff }}>
            Submitted: {new Date(session.task_submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Session Edit Modal ────────────────────────────────────────────────────────
function SessionModal({ session, onClose, onSave, onToast }) {
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("details");
  const [form, setForm] = useState({
    session_title: session.session_title || "",
    session_date: session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : "",
    meeting_link: session.meeting_link || "",
    meeting_description: session.meeting_description || "",
    mentee_meeting_description: session.mentee_meeting_description || "",
    tasks_given: session.tasks_given || "",
    task_completed: session.task_completed || false,
    mentee_feedback: session.mentee_feedback || "",
    mentee_rating: session.mentee_rating || 0,
    status: session.status || "pending",
    task_submission: session.task_submission || "",

  });

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(session._id, form);
    setSaving(false);
    onClose();
  };

  const TABS = [
    { id: "details", label: "Details", Icon: BookOpen },
    { id: "tasks", label: "Tasks", Icon: ClipboardList },
    { id: "feedback", label: "Feedback", Icon: MessageSquare },
  ];

  const num = String(session.session_number).padStart(2, "0");

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15,23,42,.5)", backdropFilter: "blur(5px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        zIndex: 101, width: "min(680px,calc(100vw - 32px))", maxHeight: "calc(100vh - 48px)",
        background: "#fff", borderRadius: 18,
        boxShadow: "0 20px 60px rgba(15,23,42,.18), 0 0 0 1px rgba(59,130,246,.1)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        fontFamily: ff, animation: "ltm-modal-in .22s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* Header */}
        <div style={{ padding: "18px 22px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#3b82f6" }}>
                {num}
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 3px" }}>Session {session.session_number}</p>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>{form.session_title || `Session ${session.session_number}`}</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={13} />
            </button>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9" }}>
            {TABS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setTab(id)} style={{
                display: "flex", alignItems: "center", gap: 5, padding: "9px 14px",
                fontSize: 12, fontWeight: 600, border: "none", background: "none", cursor: "pointer",
                color: tab === id ? "#3b82f6" : "#94a3b8", fontFamily: ff,
                borderBottom: tab === id ? "2px solid #3b82f6" : "2px solid transparent", marginBottom: -1,
              }}>
                <Icon size={12} />{label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
          {tab === "details" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["col2", "Session Title", <FInp value={form.session_title} onChange={set("session_title")} placeholder="e.g. Goal Setting" />],
              [null, "Date & Time", <FInp type="datetime-local" value={form.session_date} onChange={set("session_date")} />],
              [null, "Status", <FSel value={form.status} onChange={set("status")}><option value="pending">Pending</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option><option value="missed">Missed</option></FSel>],
              ["col2", "Meeting Link", <FInp value={form.meeting_link} onChange={set("meeting_link")} placeholder="https://meet.google.com/…" />],
              ["col2", "Mentor's Description", <FTxt value={form.meeting_description} rows={3} readOnly />],
              ["col2", "Your Description (Mentee)", <FTxt value={form.mentee_meeting_description} onChange={set("mentee_meeting_description")} placeholder="Add your notes about this session…" rows={3} />],].map(([col2, lbl, child], i) => (
                <div key={i} style={{ gridColumn: col2 ? "1 / -1" : "span 1" }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 5, fontFamily: ff }}>{lbl}</label>
                  {child}
                </div>
              ))}
            </div>
          )}

          {tab === "tasks" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {session.tasks_given ? (
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 5, fontFamily: ff }}>Task by Mentor</label>
                  <FTxt value={form.tasks_given} rows={3} readOnly />
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0", gap: 8 }}>
                  <ClipboardList size={28} color="#e2e8f0" />
                  <p style={{ fontSize: 13, color: "#94a3b8", fontFamily: ff }}>No task assigned yet.</p>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", borderRadius: 8, background: form.task_completed ? "#ecfdf5" : "#f8fafc", border: `1px solid ${form.task_completed ? "#a7f3d0" : "#e2e8f0"}` }}>
                <input type="checkbox" id="tc" checked={form.task_completed} onChange={set("task_completed")} style={{ width: 15, height: 15, accentColor: "#10b981", cursor: "pointer" }} />
                <label htmlFor="tc" style={{ fontSize: 13, color: form.task_completed ? "#059669" : "#64748b", cursor: "pointer", fontFamily: ff }}>
                  {form.task_completed ? "Task completed ✓" : "Mark task as completed"}
                </label>
              </div>


              {session.tasks_given && (
                <div style={{ border: "1px solid #bfdbfe", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#dbeafe", borderBottom: "1px solid #bfdbfe" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <ClipboardList size={13} color="#2563eb" />
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#2563eb", fontFamily: ff }}>Submit Task</span>
                    </div>
                    {session.task_submission && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <CheckCheck size={12} color="#10b981" />
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", fontFamily: ff }}>Previously Submitted</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "12px 14px", background: "#f0f9ff", display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ position: "relative" }}>
                      <Link2 size={12} color="#93c5fd" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                      <input
                        type="url"
                        value={form.task_submission}
                        onChange={set("task_submission")}
                        placeholder="Paste Google Drive or GitHub link…"
                        style={{ ...iBase, paddingLeft: 30, fontSize: 12 }}
                      />
                    </div>
                    {form.task_submission && (
                      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 11px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 7 }}>
                        <CheckCircle2 size={12} color="#10b981" style={{ flexShrink: 0 }} />
                        <a href={form.task_submission} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 12, color: "#059669", textDecoration: "none", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: ff }}>
                          {form.task_submission}
                        </a>
                        <ExternalLink size={11} color="#059669" />
                      </div>
                    )}
                    <p style={{ fontSize: 11, color: "#93c5fd", margin: 0, fontFamily: ff }}>
                      Link will be saved when you click <strong>Save Changes</strong>.
                    </p>
                  </div>
                </div>
              )}
              {/* <TaskSubmitPanel session={session} onToast={onToast} /> */}
            </div>
          )}

          {tab === "feedback" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 5, fontFamily: ff }}>Your Feedback</label>
                <FTxt value={form.mentee_feedback} onChange={set("mentee_feedback")} placeholder="Share your thoughts…" rows={4} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 8, fontFamily: ff }}>Your Rating</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <StarPicker value={form.mentee_rating} onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))} />
                  <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: ff }}>{form.mentee_rating > 0 ? `${form.mentee_rating}/5` : "Not rated"}</span>
                </div>
              </div>
              {session.mentor_feedback && (
                <div style={{ padding: "13px 15px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 9 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7, fontFamily: ff }}>Mentor's Feedback</p>
                  <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0, fontFamily: ff }}>{session.mentor_feedback}</p>
                  {session.mentor_rating > 0 && <StarDisplay value={session.mentor_rating} />}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "12px 22px", borderTop: "1px solid #f1f5f9", background: "#fafafa", flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#fff", border: "1px solid #e2e8f0", color: "#64748b", cursor: "pointer", fontFamily: ff }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: saving ? "#93c5fd" : "#3b82f6", color: "#fff", border: "none", cursor: saving ? "not-allowed" : "pointer", fontFamily: ff }}
            onMouseEnter={(e) => { if (!saving) e.currentTarget.style.background = "#2563eb"; }}
            onMouseLeave={(e) => { if (!saving) e.currentTarget.style.background = saving ? "#93c5fd" : "#3b82f6"; }}>
            {saving ? <><Loader2 size={12} style={{ animation: "ltm-spin .7s linear infinite" }} />Saving…</> : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Mobile Card ───────────────────────────────────────────────────────────────
function MobileCard({ session, onEdit, index }) {
  const num = String(session.session_number).padStart(2, "0");
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", border: `1px solid ${hov ? "#93c5fd" : "#e2e8f0"}`, borderRadius: 12, padding: "16px", display: "flex", flexDirection: "column", gap: 10, boxShadow: hov ? "0 4px 16px rgba(59,130,246,.08)" : "0 1px 3px rgba(0,0,0,.04)", transition: "all .15s" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#3b82f6" }}>{num}</div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", fontFamily: ff }}>{session.session_title || `Session ${session.session_number}`}</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 99, padding: "3px 9px", textTransform: "capitalize" }}>{session.status}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
        {[
          ["Date", fmtDate(session.session_date)],
          ["Task", session.tasks_given ? (session.task_submission ? "Submitted" : "Pending") : "—"],
          ["Rating", session.mentee_rating ? `${session.mentee_rating}/5` : "—"],
          ["Feedback", session.mentee_feedback ? session.mentee_feedback.slice(0, 40) + (session.mentee_feedback.length > 40 ? "…" : "") : "—"],
        ].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 2, fontFamily: ff }}>{l}</div>
            <div style={{ fontSize: 12, color: "#475569", fontFamily: ff }}>{v}</div>
          </div>
        ))}
      </div>
      <button onClick={() => onEdit(session)} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, background: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>
        View Details
      </button>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, display: "flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: 10, fontSize: 13, fontWeight: 500, background: "#fff", border: `1px solid ${ok ? "#a7f3d0" : "#fca5a5"}`, color: ok ? "#059669" : "#ef4444", boxShadow: "0 8px 32px rgba(0,0,0,.1)", fontFamily: ff, animation: "ltm-toast-in .22s ease" }}>
      {ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
      {toast.msg}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Ltmupcommingsessions() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const { data: result, isLoading, isError } = useGetSessionsByMenteeQuery(userData?._id);
  const [updateSession] = useUpdateByMenteeSessionMutation();

  const [perPage, setPerPage] = useState(10);
  const [taskFilter, setTaskFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");
  const [editSession, setEditSession] = useState(null);
  const [toast, setToast] = useState(null);

  const sessions = result?.data ?? [];

  // Derived stats
  const totalSessions = sessions.length;
  const tasksCompleted = sessions.filter((s) => s.task_completed).length;

  // Filter + sort + search
  const displayed = useMemo(() => {
    let list = [...sessions];
    if (taskFilter === "done") list = list.filter((s) => s.task_completed);
    if (taskFilter === "pending") list = list.filter((s) => s.tasks_given && !s.task_completed);
    if (taskFilter === "none") list = list.filter((s) => !s.tasks_given);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) =>
        (s.session_title || "").toLowerCase().includes(q) ||
        (s.meeting_description || "").toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      const da = new Date(a.session_date || 0);
      const db = new Date(b.session_date || 0);
      return sortOrder === "newest" ? db - da : da - db;
    });
    return list;
  }, [sessions, taskFilter, sortOrder, search]);

  const paginated = displayed.slice(0, perPage);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const handleSave = async (session_id, form) => {
    try {
      await updateSession({ session_id, ...form }).unwrap();
      showToast("Session updated.");
    } catch { showToast("Failed to update session.", "error"); }
  };

  // Toolbar select style
  const selStyle = {
    ...iBase, width: "auto", fontSize: 13, paddingRight: 30, cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 9px center", appearance: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: ff }}>
      <link rel="stylesheet" href={FONT} />
      <style>{`
        * { box-sizing: border-box; }
        @keyframes ltm-spin     { to { transform: rotate(360deg); } }
        @keyframes ltm-modal-in { from { opacity:0; transform:translate(-50%,-48%) scale(.97); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes ltm-toast-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .ltm-tr:hover td { background: #eff6ff !important; }
        .ltm-show-mobile { display: none !important; }
        .ltm-show-desktop { display: block !important; }
        @media (max-width: 768px) {
          .ltm-show-mobile  { display: flex !important; }
          .ltm-show-desktop { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>

        {/* ── Stat cards ── */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { icon: Layers, label: "TOTAL SESSIONS", value: totalSessions },
            { icon: ClipboardCheck, label: "TASKS COMPLETED", value: `${tasksCompleted}/${totalSessions}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 16,
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14,
              padding: "18px 24px", minWidth: 180, flex: "1 1 180px",
              boxShadow: "0 1px 4px rgba(0,0,0,.04)",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={20} color="#3b82f6" />
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 4px", fontFamily: ff }}>{label}</p>
                <p style={{ fontSize: 26, fontWeight: 700, color: "#3b82f6", margin: 0, lineHeight: 1, fontFamily: ff }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main panel ── */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>

          {/* Panel header */}
          <div style={{ padding: "20px 24px 0", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 16px", fontFamily: ff }}>
              My Sessions
            </h2>

            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", paddingBottom: 16 }}>
              {/* Per page */}
              <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} style={{ ...selStyle, width: 72 }}>
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>

              <div style={{ flex: 1 }} />

              {/* Task filter */}
              <select value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)} style={{ ...selStyle, width: 140 }}>
                <option value="all">All Tasks</option>
                <option value="done">Completed</option>
                <option value="pending">Pending</option>
                <option value="none">No Task</option>
              </select>

              {/* Sort */}
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ ...selStyle, width: 140 }}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              {/* Search */}
              <div style={{ position: "relative" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search session…"
                  style={{ ...iBase, width: 180, paddingLeft: 30, fontSize: 13 }} />
              </div>
            </div>
          </div>

          {/* Loading / Error / Empty */}
          {isLoading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", gap: 12 }}>
              <Loader2 size={26} color="#3b82f6" style={{ animation: "ltm-spin .8s linear infinite" }} />
              <p style={{ fontSize: 13, color: "#94a3b8", fontFamily: ff }}>Loading sessions…</p>
            </div>
          )}
          {isError && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px", padding: "14px 16px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 9 }}>
              <AlertCircle size={15} color="#ef4444" />
              <p style={{ fontSize: 13, color: "#ef4444", margin: 0, fontFamily: ff }}>Failed to load sessions. Please refresh.</p>
            </div>
          )}
          {!isLoading && !isError && paginated.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", gap: 10 }}>
              <Layers size={28} color="#e2e8f0" />
              <p style={{ fontSize: 13, color: "#94a3b8", fontFamily: ff }}>No sessions found.</p>
            </div>
          )}

          {/* ── Desktop Table ── */}
          {!isLoading && !isError && paginated.length > 0 && (
            <div className="ltm-show-desktop" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: ff }}>
                <thead>
                  <tr style={{ background: "#3b82f6" }}>
                    {["S.No", "Session", "Date", "Description", "Tasks Given", "Task Status", "Rating", "Feedback"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#fff", textAlign: "left", whiteSpace: "nowrap", letterSpacing: "0.02em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((session, i) => {
                    const num = String(session.session_number).padStart(2, "0");
                    const taskSubmitted = !!session.task_submission;
                    const hasTask = !!session.tasks_given;
                    return (
                      <tr key={session._id} className="ltm-tr" style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }} onClick={() => setEditSession(session)}>

                        {/* S.No */}
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#94a3b8" }}>{i + 1}</td>

                        {/* Session */}
                        <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#3b82f6", flexShrink: 0 }}>{num}</div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{session.session_title || `Session ${session.session_number}`}</span>
                          </div>
                        </td>

                        {/* Date */}
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569", whiteSpace: "nowrap" }}>{fmtDate(session.session_date)}</td>

                        {/* Description */}
                        <td style={{ padding: "14px 16px", maxWidth: 180 }}>
                          <p style={{ fontSize: 13, color: "#475569", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>
                            {session.meeting_description || <span style={{ color: "#cbd5e1" }}>—</span>}
                          </p>
                        </td>

                        {/* Tasks Given */}
                        <td style={{ padding: "14px 16px", maxWidth: 160 }}>
                          <p style={{ fontSize: 13, color: "#475569", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
                            {session.tasks_given || <span style={{ color: "#cbd5e1" }}>—</span>}
                          </p>
                        </td>

                        {/* Task Status */}
                        <td style={{ padding: "14px 16px" }}>
                          {hasTask ? (
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600,
                              color: taskSubmitted ? "#2563eb" : "#64748b",
                              background: taskSubmitted ? "#eff6ff" : "#f8fafc",
                              border: `1px solid ${taskSubmitted ? "#bfdbfe" : "#e2e8f0"}`,
                              borderRadius: 99, padding: "4px 11px", whiteSpace: "nowrap",
                            }}>
                              {taskSubmitted
                                ? <><CheckCircle2 size={11} />Done</>
                                : <><Circle size={11} />Pending</>}
                            </span>
                          ) : <span style={{ color: "#cbd5e1", fontSize: 13 }}>—</span>}
                        </td>

                        {/* Rating */}
                        <td style={{ padding: "14px 16px" }}>
                          {session.mentee_rating > 0
                            ? <StarDisplay value={session.mentee_rating} />
                            : <span style={{ color: "#cbd5e1", fontSize: 13 }}>—</span>}
                        </td>

                        {/* Feedback */}
                        <td style={{ padding: "14px 16px", maxWidth: 180 }}>
                          <p style={{ fontSize: 13, color: "#475569", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", maxWidth: 160 }}>
                            {session.mentee_feedback || <span style={{ color: "#cbd5e1" }}>—</span>}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 13, color: "#94a3b8", fontFamily: ff }}>
                  Showing {paginated.length} of {displayed.length} session{displayed.length !== 1 ? "s" : ""}
                </span>
                {sessions.every((s) => s.status === "completed") && sessions.length > 0 && (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#3b82f6", fontWeight: 600, fontFamily: ff }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6" }} />
                    All Completed
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ── Mobile Cards ── */}
          {!isLoading && !isError && paginated.length > 0 && (
            <div className="ltm-show-mobile" style={{ flexDirection: "column", gap: 10, padding: "16px" }}>
              {paginated.map((session, i) => (
                <MobileCard key={session._id} session={session} onEdit={setEditSession} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {editSession && (
        <SessionModal session={editSession} onClose={() => setEditSession(null)} onSave={handleSave} onToast={showToast} />
      )}
      <Toast toast={toast} />
    </div>
  );
}