

import React, { useState } from "react";
import {
  Trophy, Layers, CheckSquare, Star, Search,
  CalendarDays, Hash, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, AlertCircle,
} from "lucide-react";
import { useGetCompletedSessionsQuery } from "./ltmsessionhistoryapislice";

const fmtDate = (s) =>
  s ? new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

/* ══════════════════════════════════════════
   STAR ROW COMPONENT
══════════════════════════════════════════ */
const StarRow = ({ value = 0 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={11} style={{ color: i < value ? "#f59e0b" : "#cbd5e1", fill: i < value ? "#f59e0b" : "none" }} />
    ))}
    <span className="ml-1 text-xs font-semibold" style={{ color: "#0098cc" }}>{value}/5</span>
  </div>
);

/* ══════════════════════════════════════════
   MOBILE CARD
══════════════════════════════════════════ */
const MobileCard = ({ session }) => {
  const [open, setOpen] = useState(false);
  const {
    session_number, session_title, session_date,
    task_completed, mentee_rating,
    meeting_description, tasks_given, mentee_feedback,
  } = session;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#0098cc]/20 active:bg-blue-50 transition-colors">
      <div className="h-0.5 w-full" style={{ background: "#0098cc" }} />

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 sm:px-4 py-3 flex items-start justify-between gap-2 sm:gap-3 transition-colors"
        style={{ background: open ? "rgba(0,152,204,0.06)" : "white" }}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#0098cc]/20"
            style={{ background: "rgba(0,152,204,0.08)" }}>
            <span className="font-bold text-xs sm:text-sm font-mono" style={{ color: "#0098cc" }}>
              {String(session_number).padStart(2, "0")}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-xs sm:text-sm truncate" style={{ color: "#1a1a2e" }}>{session_title || "Untitled Session"}</p>
            <p className="text-[10px] sm:text-xs mt-0.5 flex items-center gap-1 text-slate-500">
              <CalendarDays size={9} style={{ color: "#0098cc" }} />
              {fmtDate(session_date)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 sm:gap-1.5 flex-shrink-0">
          <div className="hidden sm:block">
            <StarRow value={mentee_rating ?? 0} />
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
            style={
              task_completed
                ? { background: "rgba(0,152,204,0.08)", color: "#0098cc", border: "1px solid rgba(0,152,204,0.25)" }
                : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
            }
          >
            {task_completed ? "Done" : "Pending"}
          </span>
          <div className="sm:hidden">
            {task_completed ? 
              <CheckCircle2 size={16} style={{ color: "#0098cc" }} /> : 
              <XCircle size={16} style={{ color: "#e11d48" }} />
            }
          </div>
          {open
            ? <ChevronUp size={14} style={{ color: "#0098cc" }} />
            : <ChevronDown size={14} style={{ color: "#0098cc" }} />
          }
        </div>
      </button>

      {open && (
        <div className="px-3 sm:px-4 pb-4 space-y-3 border-t border-slate-100 bg-slate-50">
          <div className="block sm:hidden pt-2">
            <StarRow value={mentee_rating ?? 0} />
          </div>
          {meeting_description && (
            <div className="pt-2 sm:pt-3">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#0098cc" }}>Description</p>
              <p className="text-xs leading-relaxed" style={{ color: "#1a1a2e" }}>{meeting_description}</p>
            </div>
          )}
          {tasks_given && (
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#0098cc" }}>Tasks Given</p>
              <p className="text-xs leading-relaxed" style={{ color: "#1a1a2e" }}>{tasks_given}</p>
            </div>
          )}
          {mentee_feedback && (
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#0098cc" }}>Your Feedback</p>
              <p className="text-xs leading-relaxed" style={{ color: "#1a1a2e" }}>{mentee_feedback}</p>
            </div>
          )}
          {!meeting_description && !tasks_given && !mentee_feedback && (
            <p className="pt-2 text-xs text-slate-400">No additional details.</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
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

  const selStyle = {
    background: "white",
    border: "1px solid rgba(0,152,204,0.3)",
    color: "#1a1a2e",
    borderRadius: 8,
    padding: "7px 28px 7px 11px",
    fontSize: 12,
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
  };

  // CSS for hidden scrollbar
  const scrollableStyle = {
    scrollBehavior: "smooth",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 bg-gradient-to-br from-slate-50 to-blue-50" style={{ fontFamily: "Cambria, Georgia, serif" }}>
      <style>{`
        * {
          font-family: Cambria, Georgia, serif !important;
        }
        /* Hide scrollbar styling but keep functionality */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 152, 204, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 152, 204, 0.6);
        }
        /* Firefox scrollbar */
        * {
          scrollbar-color: rgba(0, 152, 204, 0.3) transparent;
          scrollbar-width: thin;
        }
        .hide-scrollbar {
          -ms-overflow-style: auto;
          scrollbar-width: thin;
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
      `}</style>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-[#0098cc]/20 hover:shadow-md transition-shadow">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 border border-[#0098cc]/20"
            style={{ background: "rgba(0,152,204,0.08)" }}>
            <Layers size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "#1a1a2e" }} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide" style={{ color: "#1a1a2e" }}>Total Sessions</p>
            <p className="text-xl sm:text-2xl font-bold leading-none mt-0.5" style={{ color: "#1a1a2e" }}>{total}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-[#0098cc]/20 hover:shadow-md transition-shadow">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 border border-[#0098cc]/20"
            style={{ background: "rgba(0,152,204,0.08)" }}>
            <CheckSquare size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: "#1a1a2e" }} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide" style={{ color: "#1a1a2e" }}>Tasks Done</p>
            <p className="text-xl sm:text-2xl font-bold leading-none mt-0.5" style={{ color: "#1a1a2e" }}>{tasksDone}/{total}</p>
          </div>
        </div>
      </div>

      {/* ── Main Panel ── */}
      <div className="bg-white rounded-lg sm:rounded-2xl overflow-hidden border border-[#0098cc]/20 shadow-sm">

        {/* Panel Header */}
        <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
          <h2 className="text-sm sm:text-base font-bold" style={{ color: "#1a1a2e" }}>Completed Sessions</h2>
        </div>

        {/* Toolbar - Responsive Grid */}
        <div className="px-3 sm:px-5 py-2 sm:py-3 flex flex-col gap-3 sm:flex-wrap sm:flex-row sm:items-center sm:justify-between bg-slate-50 border-b border-slate-100">
          <div className="relative w-full sm:w-auto">
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} style={selStyle} className="w-full sm:w-auto">
              {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n} rows</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-2">
            <div className="relative flex-1 sm:flex-none">
              <select value={filterTask} onChange={(e) => setFilterTask(e.target.value)} style={selStyle} className="w-full sm:w-auto">
                <option value="all">All Tasks</option>
                <option value="done">Task Done</option>
                <option value="pending">Task Pending</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
            </div>

            <div className="relative flex-1 sm:flex-none">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selStyle} className="w-full sm:w-auto">
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="rating_desc">Highest Rated</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
            </div>

            <div className="relative flex-1 sm:flex-none sm:w-40 md:w-48">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0098cc" }} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg pl-8 pr-3 py-2 text-xs outline-none bg-white placeholder:text-slate-400"
                style={{ border: "1px solid rgba(0,152,204,0.3)", color: "#1a1a2e" }}
                onFocus={(e) => (e.target.style.borderColor = "#0098cc")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,152,204,0.3)")}
              />
            </div>
          </div>
        </div>

        {/* ── Desktop Table (Hidden on mobile) ── */}
        <div className="hidden lg:block overflow-x-auto hide-scrollbar" style={scrollableStyle}>
          {isLoading ? (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#0098cc" }}>
                  {COLS.map((c) => (
                    <th key={c} className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {COLS.map((c) => (
                      <td key={c} className="px-3 sm:px-4 py-2 sm:py-3">
                        <div className="h-3 sm:h-4 rounded animate-pulse bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isError ? (
            <div className="p-8 sm:p-10 flex flex-col items-center gap-3">
              <AlertCircle size={30} className="text-red-400" />
              <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>Failed to load sessions</p>
              <p className="text-xs text-slate-400">Please refresh and try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 sm:p-10 flex flex-col items-center gap-3">
              {sessions.length === 0 ? (
                <>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border border-[#0098cc]/20"
                    style={{ background: "rgba(0,152,204,0.08)" }}>
                    <Trophy size={24} className="sm:w-[26px] sm:h-[26px]" style={{ color: "#0098cc" }} />
                  </div>
                  <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>No completed sessions yet</p>
                  <p className="text-xs text-slate-400">Your completed LTM sessions will appear here.</p>
                </>
              ) : (
                <>
                  <Hash size={28} className="text-slate-300" />
                  <p className="text-xs text-slate-400">No sessions match the current filter.</p>
                </>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#0098cc" }}>
                  {COLS.map((c) => (
                    <th key={c} className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s._id}
                    className="border-b border-slate-100 transition-colors bg-white cursor-default hover:bg-blue-50"
                  >
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs font-mono font-semibold" style={{ color: "#0098cc" }}>{i + 1}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className="text-xs sm:text-sm font-semibold line-clamp-1 sm:max-w-[130px]" style={{ color: "#1a1a2e" }}>
                        {s.session_title || "Untitled"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs font-mono whitespace-nowrap" style={{ color: "#1a1a2e" }}>
                      {fmtDate(s.session_date)}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs max-w-[120px] sm:max-w-[150px] text-slate-500">
                      <span className="line-clamp-2 leading-relaxed">
                        {s.meeting_description || <span className="text-slate-300">—</span>}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs max-w-[100px] sm:max-w-[130px] text-slate-500">
                      <span className="line-clamp-2 leading-relaxed">
                        {s.tasks_given || <span className="text-slate-300">—</span>}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap"
                        style={
                          s.task_completed
                            ? { background: "rgba(0,152,204,0.08)", color: "#0098cc", border: "1px solid rgba(0,152,204,0.25)" }
                            : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
                        }
                      >
                        {s.task_completed ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        {s.task_completed ? "Done" : "Pending"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3"><StarRow value={s.mentee_rating ?? 0} /></td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs max-w-[100px] sm:max-w-[140px] text-slate-500">
                      <span className="line-clamp-2 leading-relaxed">
                        {s.mentee_feedback || <span className="text-slate-300 italic">No feedback</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Tablet View (md: table with scroll) ── */}
        <div className="hidden md:block lg:hidden overflow-x-auto hide-scrollbar" style={scrollableStyle}>
          {isLoading ? (
            <table className="w-full min-w-[600px]">
              <thead>
                <tr style={{ background: "#0098cc" }}>
                  {["S.No", "Session", "Date", "Status", "Rating"].map((c) => (
                    <th key={c} className="px-3 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <td key={j} className="px-3 py-3">
                        <div className="h-4 rounded animate-pulse bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isError ? (
            <div className="p-8 flex flex-col items-center gap-3">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>Failed to load sessions</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 flex flex-col items-center gap-3">
              {sessions.length === 0 ? (
                <>
                  <Trophy size={24} style={{ color: "#0098cc" }} />
                  <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>No completed sessions yet</p>
                </>
              ) : (
                <>
                  <Hash size={24} className="text-slate-300" />
                  <p className="text-xs text-slate-400">No sessions match the filter.</p>
                </>
              )}
            </div>
          ) : (
            <table className="w-full min-w-[600px]">
              <thead>
                <tr style={{ background: "#0098cc" }}>
                  {["S.No", "Session", "Date", "Status", "Rating"].map((c) => (
                    <th key={c} className="px-3 py-3 text-left text-xs font-bold text-white tracking-wide whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s._id} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                    <td className="px-3 py-3 text-xs font-mono font-semibold" style={{ color: "#0098cc" }}>{i + 1}</td>
                    <td className="px-3 py-3">
                      <div className="text-xs font-semibold" style={{ color: "#1a1a2e" }}>{s.session_title || "Untitled"}</div>
                      <div className="text-xs text-slate-500 mt-1">{fmtDate(s.session_date)}</div>
                    </td>
                    <td className="px-3 py-3 text-xs max-w-[150px]">
                      <span className="line-clamp-1 text-slate-600">{s.meeting_description || "—"}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                        style={
                          s.task_completed
                            ? { background: "rgba(0,152,204,0.08)", color: "#0098cc", border: "1px solid rgba(0,152,204,0.25)" }
                            : { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }
                        }
                      >
                        {s.task_completed ? "Done" : "Pending"}
                      </span>
                    </td>
                    <td className="px-3 py-3"><StarRow value={s.mentee_rating ?? 0} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Mobile Cards (sm and below) ── */}
        <div className="md:hidden p-2 sm:p-4 space-y-2 sm:space-y-3 hide-scrollbar max-h-[calc(100vh-300px)] overflow-y-auto" style={scrollableStyle}>
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-3 space-y-2 border border-[#0098cc]/20">
                  <div className="h-4 rounded animate-pulse bg-slate-100 w-3/5" />
                  <div className="h-3 rounded animate-pulse bg-slate-100 w-2/5" />
                  <div className="h-3 rounded animate-pulse bg-slate-100 w-4/5" />
                </div>
              ))}
            </>
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>Failed to load sessions</p>
              <p className="text-xs text-slate-400">Please refresh and try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            sessions.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-[#0098cc]/20"
                  style={{ background: "rgba(0,152,204,0.08)" }}>
                  <Trophy size={22} style={{ color: "#0098cc" }} />
                </div>
                <p className="text-sm font-bold text-center" style={{ color: "#1a1a2e" }}>No completed sessions yet</p>
                <p className="text-xs text-slate-400 text-center">Your completed LTM sessions will appear here.</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <Hash size={24} className="mx-auto mb-2 text-slate-300" />
                <p className="text-xs text-slate-400">No sessions match the filter.</p>
              </div>
            )
          ) : (
            <>
              {filtered.map((session) => (
                <MobileCard key={session._id} session={session} />
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="px-3 sm:px-5 py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-slate-100 bg-slate-50 text-xs">
            <p className="font-mono text-slate-400">
              Showing {filtered.length} of {sessions.length} session{sessions.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}



