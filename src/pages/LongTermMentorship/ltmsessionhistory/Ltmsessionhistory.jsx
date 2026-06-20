import React, { useState } from "react";
import {
  Trophy, Layers, CheckSquare, Star, Search,
  CalendarDays, Hash, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, AlertCircle,
} from "lucide-react";
import { useGetCompletedSessionsQuery } from "./ltmsessionhistoryapislice";

// ── Constants ─────────────────────────────────────────────────────────────────
const FONT = "'DM Sans', 'Segoe UI', sans-serif";

const C = {
  dark: "#1a1a2e",
  blue: "#0091c3",
  white: "#ffffff",
  border: "#e2e8f0",
  muted: "#94a3b8",
  text: "#1a1a2e",
  sub: "#475569",
  rowHov: "#f8fafc",
  th: "#1a1a2e",
  thText: "#ffffff",
};

const fmtDate = (s) =>
  s ? new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// ── Global CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; font-family: ${FONT} !important; }
  body { margin: 0; background: ${C.white}; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .scroll-hide::-webkit-scrollbar { display: none; }
  .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
  table tr:last-child td { border-bottom: none; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
`;

// ── Shared styles ─────────────────────────────────────────────────────────────
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
  padding: "12px 14px",
  fontSize: 13,
  color: C.text,
  verticalAlign: "middle",
  borderBottom: `1px solid #f1f5f9`,
  background: C.white,
};

const selStyle = {
  background: C.white,
  border: `1px solid ${C.border}`,
  color: C.text,
  borderRadius: 7,
  padding: "6px 28px 6px 10px",
  fontSize: 12,
  fontWeight: 500,
  outline: "none",
  cursor: "pointer",
  WebkitAppearance: "none",
  appearance: "none",
  fontFamily: FONT,
};

// ── Star Row ──────────────────────────────────────────────────────────────────
const StarRow = ({ value = 0 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={11} style={{
        color: i < value ? "#f59e0b" : C.border,
        fill: i < value ? "#f59e0b" : "none",
      }} />
    ))}
    <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 600, color: C.blue, fontFamily: FONT }}>
      {value}/5
    </span>
  </div>
);

// ── Task Badge ────────────────────────────────────────────────────────────────
const TaskBadge = ({ done }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    fontSize: 11, fontWeight: 700, fontFamily: FONT,
    padding: "3px 8px", borderRadius: 5,
    background: done ? "#f0fdf6" : "#fff1f2",
    color: done ? "#16a34a" : "#e11d48",
    border: `1px solid ${done ? "#bbf7d0" : "#fecdd3"}`,
    whiteSpace: "nowrap",
  }}>
    {done ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
    {done ? "Done" : "Pending"}
  </span>
);

// ── Mobile Card ───────────────────────────────────────────────────────────────
const MobileCard = ({ session }) => {
  const [open, setOpen] = useState(false);
  const {
    session_number, session_title, session_date,
    task_completed, mentee_rating,
    meeting_description, tasks_given, mentee_feedback,
  } = session;

  return (
    <div style={{
      background: C.white, borderRadius: 10,
      overflow: "hidden", border: `1px solid ${C.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      fontFamily: FONT,
    }}>
      {/* top accent bar */}
      <div style={{ height: 3, background: C.dark }} />

      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", textAlign: "left",
          padding: "12px 14px",
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", gap: 10,
          background: open ? "#f8fafc" : C.white,
          border: "none", cursor: "pointer",
          transition: "background 0.15s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8, flexShrink: 0,
            background: C.dark, color: C.white,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: FONT }}>
              {String(session_number).padStart(2, "0")}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 13, fontWeight: 700, color: C.text,
              margin: 0, fontFamily: FONT,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {session_title }
            </p>
            <p style={{
              fontSize: 11, color: C.muted, margin: "2px 0 0",
              display: "flex", alignItems: "center", gap: 4, fontFamily: FONT,
            }}>
              <CalendarDays size={9} style={{ color: C.blue }} />
              {fmtDate(session_date)}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
          <TaskBadge done={task_completed} />
          {open
            ? <ChevronUp size={13} style={{ color: C.blue }} />
            : <ChevronDown size={13} style={{ color: C.blue }} />}
        </div>
      </button>

      {open && (
        <div style={{
          padding: "12px 14px 14px",
          borderTop: `1px solid ${C.border}`,
          background: "#fafbfc",
          animation: "fadeIn 0.15s ease",
        }}>
          <div style={{ marginBottom: 8 }}>
            <StarRow value={mentee_rating ?? 0} />
          </div>
          {[
            ["Description", meeting_description],
            ["Tasks Given", tasks_given],
            ["Your Feedback", mentee_feedback],
          ].map(([label, val]) => val ? (
            <div key={label} style={{ marginBottom: 10 }}>
              <p style={{
                fontSize: 9, fontWeight: 700, 
                letterSpacing: "0.1em", color: C.blue, margin: "0 0 3px", fontFamily: FONT,
              }}>{label}</p>
              <p style={{ fontSize: 12, color: C.text, margin: 0, lineHeight: 1.6, fontFamily: FONT }}>{val}</p>
            </div>
          ) : null)}
          {!meeting_description && !tasks_given && !mentee_feedback && (
            <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: FONT }}>No additional details.</p>
          )}
        </div>
      )}
    </div>
  );
};

// ── Skeleton Rows ─────────────────────────────────────────────────────────────
const SkeletonRows = ({ cols = 8, rows = 4 }) =>
  Array.from({ length: rows }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }).map((_, j) => (
        <td key={j} style={{ ...tdStyle }}>
          <div style={{
            height: 11, borderRadius: 4, background: "#f1f5f9",
            animation: "pulse 1.5s ease-in-out infinite",
            width: j === 0 ? 24 : j === 1 ? "60%" : "45%",
          }} />
        </td>
      ))}
    </tr>
  ));

// ── Main Component ────────────────────────────────────────────────────────────
export default function LtmsessionsCompleted() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const menteeId = userData?._id;

  const { data, isLoading, isError } = useGetCompletedSessionsQuery(menteeId, { skip: !menteeId });
  const sessions = data?.data || data || [];

  const [search, setSearch] = useState("");
  const [filterTask, setFilterTask] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [perPage, setPerPage] = useState(10);

  const filtered = sessions
    .filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.session_title?.toLowerCase().includes(q) || String(s.session_number).includes(q);
      const matchTask =
        filterTask === "all" ? true
          : filterTask === "done" ? s.task_completed === true
            : s.task_completed !== true;
      return matchSearch && matchTask;
    })
    .sort((a, b) => {
      if (sortBy === "date_desc") return new Date(b.session_date || b.createdAt) - new Date(a.session_date || a.createdAt);
      if (sortBy === "date_asc") return new Date(a.session_date || a.createdAt) - new Date(b.session_date || b.createdAt);
      if (sortBy === "rating_desc") return (b.mentee_rating ?? 0) - (a.mentee_rating ?? 0);
      if (sortBy === "number_asc") return a.session_number - b.session_number;
      return 0;
    })
    .slice(0, perPage);

  const total = sessions.length;
  const tasksDone = sessions.filter((s) => s.task_completed).length;

  const COLS = ["S.No", "Session", "Date", "Description", "Tasks Given", "Task Status", "Rating", "Feedback"];

  // ── Empty / Error states ──────────────────────────────────────────────────
  const EmptyState = ({ noData }) => (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", padding: "48px 20px", gap: 8,
    }}>
      {noData
        ? <>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: "#f1f5f9",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Trophy size={22} style={{ color: C.muted }} />
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>
            No completed sessions yet
          </p>
          <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: FONT }}>
            Your completed sessions will appear here.
          </p>
        </>
        : <>
          <Hash size={24} style={{ color: C.border }} />
          <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: FONT }}>
            No sessions match the current filter.
          </p>
        </>
      }
    </div>
  );

  const ErrorState = () => (
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
  );

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{
        minHeight: "100vh",
        background: C.white,
        padding: "clamp(14px, 4vw, 24px)",
        fontFamily: FONT,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 18 }}>
            <h1 style={{
              fontSize: "clamp(16px, 4vw, 20px)",
              fontWeight: 700, color: C.text,
              margin: "0 0 3px", fontFamily: FONT,
            }}>
              Session History
            </h1>
            <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT }}>
              {isLoading ? "Loading…" : `${total} total sessions`}
            </p>
          </div>

          {/* Stat Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: 10, marginBottom: 18,
          }}>
            {[
              { Icon: Layers, label: "Total Sessions", value: total, color: C.text },
              { Icon: CheckSquare, label: "Tasks Done", value: `${tasksDone}/${total}`, color: "#16a34a" },
            ].map(({ Icon, label, value, color }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: C.white, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "12px 16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
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

          {/* Main Panel */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 10, overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>

            {/* Panel header */}
            <div style={{
              padding: "12px 14px",
              borderBottom: `1px solid ${C.border}`,
            }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>
                Session History
              </h2>
            </div>

            {/* Toolbar */}
            <div style={{
              padding: "10px 14px",
              borderBottom: `1px solid ${C.border}`,
              background: "#fafbfc",
              display: "flex", flexWrap: "wrap",
              alignItems: "center", gap: 8,
            }}>
              {/* Rows per page */}
              <div style={{ position: "relative" }}>
                <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} style={selStyle}>
                  {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n} rows</option>)}
                </select>
                <ChevronDown size={11} style={{
                  position: "absolute", right: 8, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none", color: C.muted,
                }} />
              </div>

              <div style={{ flex: 1 }} />

              {/* Task filter */}
              <div style={{ position: "relative" }}>
                <select value={filterTask} onChange={(e) => setFilterTask(e.target.value)} style={selStyle}>
                  <option value="all">All Tasks</option>
                  <option value="done">Task Done</option>
                  <option value="pending">Task Pending</option>
                </select>
                <ChevronDown size={11} style={{
                  position: "absolute", right: 8, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none", color: C.muted,
                }} />
              </div>

              {/* Sort */}
              <div style={{ position: "relative" }}>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selStyle}>
                  <option value="date_desc">Newest First</option>
                  <option value="date_asc">Oldest First</option>
                  <option value="rating_desc">Highest Rated</option>
                  <option value="number_asc">By Number</option>
                </select>
                <ChevronDown size={11} style={{
                  position: "absolute", right: 8, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none", color: C.muted,
                }} />
              </div>

              {/* Search */}
              <div style={{ position: "relative" }}>
                <Search size={12} style={{
                  position: "absolute", left: 9, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none", color: C.muted,
                }} />
                <input
                  type="text" placeholder="Search…" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: 160, fontSize: 12, borderRadius: 7,
                    paddingLeft: 28, paddingRight: 10,
                    paddingTop: 6, paddingBottom: 6,
                    border: `1px solid ${C.border}`,
                    background: C.white, color: C.text,
                    outline: "none", fontFamily: FONT,
                    transition: "width 0.2s, border-color 0.15s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = C.blue; e.target.style.width = "190px"; }}
                  onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.width = "160px"; }}
                />
              </div>
            </div>

            {/* ── DESKTOP TABLE ── */}
            <div className="scroll-hide desktop-table" style={{ overflowX: "auto" }}>
              {isError ? <ErrorState /> : (
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
                  <thead style={{ background: C.th }}>
                    <tr>
                      {COLS.map((c) => <th key={c} style={thStyle}>{c}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading
                      ? <SkeletonRows cols={8} rows={5} />
                      : filtered.length === 0
                        ? <tr><td colSpan={8} style={{ padding: 0 }}>
                          <EmptyState noData={sessions.length === 0} />
                        </td></tr>
                        : filtered.map((s, i) => (
                          <tr
                            key={s._id}
                            style={{ cursor: "default", transition: "background 0.1s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = C.rowHov; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = C.white; }}
                          >
                            <td style={{ ...tdStyle, color: C.muted, fontSize: 12 }}>{i + 1}</td>
                            <td style={tdStyle}>
                              <span style={{
                                fontSize: 13, fontWeight: 600, color: C.text,
                                display: "block", maxWidth: 140,
                                overflow: "hidden", textOverflow: "ellipsis",
                                whiteSpace: "nowrap", fontFamily: FONT,
                              }}>
                                {s.session_title }
                              </span>
                            </td>
                            <td style={{ ...tdStyle, color: C.sub, whiteSpace: "nowrap" }}>
                              {fmtDate(s.session_date)}
                            </td>
                            <td style={{ ...tdStyle, maxWidth: 150 }}>
                              <span style={{
                                display: "block", fontSize: 12, color: C.muted,
                                overflow: "hidden", textOverflow: "ellipsis",
                                whiteSpace: "nowrap", fontFamily: FONT,
                              }}>
                                {s.meeting_description || "—"}
                              </span>
                            </td>
                            <td style={{ ...tdStyle, maxWidth: 130 }}>
                              <span style={{
                                display: "block", fontSize: 12, color: C.muted,
                                overflow: "hidden", textOverflow: "ellipsis",
                                whiteSpace: "nowrap", fontFamily: FONT,
                              }}>
                                {s.tasks_given || "—"}
                              </span>
                            </td>
                            <td style={tdStyle}>
                              <TaskBadge done={s.task_completed} />
                            </td>
                            <td style={tdStyle}>
                              <StarRow value={s.mentee_rating ?? 0} />
                            </td>
                            <td style={{ ...tdStyle, maxWidth: 140 }}>
                              <span style={{
                                display: "block", fontSize: 12,
                                color: s.mentee_feedback ? C.muted : C.border,
                                overflow: "hidden", textOverflow: "ellipsis",
                                whiteSpace: "nowrap", fontStyle: s.mentee_feedback ? "normal" : "italic",
                                fontFamily: FONT,
                              }}>
                                {s.mentee_feedback || "No feedback"}
                              </span>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
              )}
            </div>

            {/* ── MOBILE CARDS ── */}
            <div className="scroll-hide mobile-cards" style={{
              flexDirection: "column", gap: 8, padding: 12,
              maxHeight: "calc(100vh - 280px)", overflowY: "auto",
            }}>
              {isError ? <ErrorState /> : isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} style={{
                    background: C.white, borderRadius: 10,
                    padding: 12, border: `1px solid ${C.border}`,
                  }}>
                    {[3, 5, 4].map((w, j) => (
                      <div key={j} style={{
                        height: j === 0 ? 13 : 11, borderRadius: 4,
                        background: "#f1f5f9", marginBottom: 8,
                        width: `${w * 15}%`,
                        animation: "pulse 1.5s ease-in-out infinite",
                      }} />
                    ))}
                  </div>
                ))
                : filtered.length === 0
                  ? <EmptyState noData={sessions.length === 0} />
                  : filtered.map((session) => (
                    <MobileCard key={session._id} session={session} />
                  ))
              }
            </div>

            {/* Footer */}
            {!isLoading && !isError && filtered.length > 0 && (
              <div style={{
                padding: "10px 14px",
                borderTop: `1px solid ${C.border}`,
                background: "#fafbfc",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: FONT }}>
                  Showing <b style={{ color: C.text }}>{filtered.length}</b> of{" "}
                  <b style={{ color: C.text }}>{sessions.length}</b> session{sessions.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .desktop-table { display: block; }
        .mobile-cards  { display: none; }
        @media (max-width: 768px) {
          .desktop-table { display: none; }
          .mobile-cards  { display: flex; }
        }
      `}</style>
    </>
  );
}