import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetSessionsByMentorQuery,
  useGetSubscribersByMentorQuery,
} from "./mysubcriberspislice";

const STATUS_STYLES = {
  pending: "text-cyan-500",
  completed: "text-emerald-500",
  cancelled: "text-red-400",
  missed: "text-amber-500",
  active: "text-emerald-500",
  approved: "text-emerald-500",
  onprocess: "text-blue-400",
};

const STATUS_PILL = {
  pending: { color: "#0098cc", border: "#0a3020", bg: "#0a2818" },
  completed: { color: "#10b981", border: "#064e3b", bg: "#022c22" },
  cancelled: { color: "#f87171", border: "#3b1a1a", bg: "#1f0d0d" },
  missed: { color: "#fbbf24", border: "#3b2a0a", bg: "#1f1608" },
  active: { color: "#10b981", border: "#064e3b", bg: "#022c22" },
  approved: { color: "#10b981", border: "#064e3b", bg: "#022c22" },
  onprocess: { color: "#60a5fa", border: "#1e3a5f", bg: "#0f1e33" },
};

const PLAN_LABELS = {
  one_month: "1 Month",
  three_months: "3 Months",
  six_months: "6 Months",
};

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const ShortId = ({ id }) => (
  <span className="font-mono text-xs" style={{ color: "#0098cc" }}>
    ...{id?.slice(-8)}
  </span>
);

function StatusBadge({ status }) {
  const sp = STATUS_PILL[status];
  if (!sp) return <span className="text-xs text-gray-500">{status || "—"}</span>;
  return (
    <span
      className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
      style={{ color: sp.color, border: `1px solid ${sp.border}`, background: sp.bg }}
    >
      {status}
    </span>
  );
}

function Pagination({ page, total, pageSize, onPage, onPageSize }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1 && total <= PAGE_SIZE_OPTIONS[0]) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  const btnBase = {
    minWidth: 32,
    height: 32,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid #0a3020",
    background: "transparent",
    color: "#2a7a52",
    transition: "all 0.15s",
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
          style={btnBase}
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          onMouseEnter={(e) => { if (page !== 1) e.currentTarget.style.background = "#0a2818"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          ‹
        </button>
        {pages.map((p) => (
          <button
            key={p}
            style={p === page ? activeBtnStyle : btnBase}
            onClick={() => onPage(p)}
            onMouseEnter={(e) => { if (p !== page) e.currentTarget.style.background = "#0a2818"; }}
            onMouseLeave={(e) => { if (p !== page) e.currentTarget.style.background = "transparent"; }}
          >
            {p}
          </button>
        ))}
        <button
          style={btnBase}
          disabled={page === totalPages}
          onClick={() => onPage(page + 1)}
          onMouseEnter={(e) => { if (page !== totalPages) e.currentTarget.style.background = "#0a2818"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function MentorSessionsTable() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [sessPage, setSessPage] = useState(1);
  const [sessPageSize, setSessPageSize] = useState(10);
  const [subPage, setSubPage] = useState(1);
  const [subPageSize, setSubPageSize] = useState(10);
  const navigate = useNavigate();

  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const { data: sessionsResult, isLoading: sessLoading } = useGetSessionsByMentorQuery(mentorId);
  const { data: subscribersResult, isLoading: subLoading } = useGetSubscribersByMentorQuery(mentorId);

  const sessions = sessionsResult?.data || [];
  const subscribers = subscribersResult?.data || subscribersResult?.subscriptions || [];

  // Group sessions by subscription_id for navigation
  const sessionsBySubscription = sessions.reduce((acc, s) => {
    const key = s.subscription_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  // Paginate
  const paginatedSessions = sessions.slice((sessPage - 1) * sessPageSize, sessPage * sessPageSize);
  const paginatedSubscribers = subscribers.slice((subPage - 1) * subPageSize, subPage * subPageSize);

  const handleSessionRowClick = (session) => {
    const subSessions = sessionsBySubscription[session.subscription_id] || [session];
    navigate(`/mentor/sessions/${session.subscription_id}`, {
      state: {
        sessions: subSessions.sort((a, b) => a.session_number - b.session_number),
        mentee_id: session.mentee_id,
      },
    });
  };

  const handleSubscriberRowClick = (sub) => {
    const subSessions = sessionsBySubscription[sub._id] || [];
    navigate(`/mentor/sessions/${sub._id}`, {
      state: {
        sessions: subSessions.sort((a, b) => a.session_number - b.session_number),
        mentee_id: sub.mentee_id,
      },
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8" style={{ background: "#031610", color: "#e2f5ef" }}>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#e2f5ef" }}>
          Sessions Overview
        </h1>
        <p className="text-xs mt-1" style={{ color: "#2a7a52" }}>
          {subscribers.length} subscribers · {sessions.length} sessions
        </p>

        <div className="flex flex-wrap gap-5 mt-3 text-xs" style={{ color: "#2a7a52" }}>
          <span>Subscribers: <strong style={{ color: "#0098cc" }}>{subscribers.length}</strong></span>
          <span>Completed: <strong style={{ color: "#10b981" }}>{sessions.filter((s) => s.status === "completed").length}</strong></span>
          <span>Pending: <strong style={{ color: "#0098cc" }}>{sessions.filter((s) => s.status === "pending").length}</strong></span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 mb-6 text-xs font-medium" style={{ borderBottom: "1px solid #0a3020" }}>
        {["subscribers", "sessions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="pb-2 capitalize transition"
            style={
              activeTab === tab
                ? { color: "#0098cc", borderBottom: "2px solid #0098cc" }
                : { color: "#2a7a52", borderBottom: "2px solid transparent" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SUBSCRIBERS TABLE */}
      {activeTab === "subscribers" && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #0a3020", background: "#051f12" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #0a3020", background: "#031610" }}>
                  {["#", "Mentee", "Plan", "Sessions", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#2a7a52" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subLoading ? (
                  <tr><td colSpan="6" className="text-center py-14 text-sm" style={{ color: "#2a7a52" }}>Loading…</td></tr>
                ) : paginatedSubscribers.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-14 text-sm" style={{ color: "#2a7a52" }}>No subscribers found</td></tr>
                ) : (
                  paginatedSubscribers.map((sub, index) => (
                    <tr
                      key={sub._id}
                      className="transition-colors cursor-pointer"
                      style={{ borderBottom: "1px solid #0a3020" }}
                      onClick={() => handleSubscriberRowClick(sub)}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#0a2818")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-5 py-4 text-xs" style={{ color: "#6aab8e" }}>{(subPage - 1) * subPageSize + index + 1}</td>
                      <td className="px-5 py-4"><ShortId id={sub.mentee_id} /></td>
                      <td className="px-5 py-4 text-xs font-medium" style={{ color: "#0098cc" }}>
                        {PLAN_LABELS[sub.plan_type] || sub.plan_type}
                      </td>
                      <td className="px-5 py-4 text-xs" style={{ color: "#e2f5ef" }}>{sub.total_sessions}</td>
                      <td className="px-5 py-4 text-xs font-medium" style={{ color: "#10b981" }}>
                        ₹{sub.amount?.toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={sub.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={subPage}
            total={subscribers.length}
            pageSize={subPageSize}
            onPage={setSubPage}
            onPageSize={setSubPageSize}
          />
        </div>
      )}

      {/* SESSIONS TABLE */}
      {activeTab === "sessions" && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #0a3020", background: "#051f12" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #0a3020", background: "#031610" }}>
                  {["#", "Session", "Subscription", "Date", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#2a7a52" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessLoading ? (
                  <tr><td colSpan="5" className="text-center py-14 text-sm" style={{ color: "#2a7a52" }}>Loading…</td></tr>
                ) : paginatedSessions.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-14 text-sm" style={{ color: "#2a7a52" }}>No sessions found</td></tr>
                ) : (
                  paginatedSessions.map((item, index) => (
                    <tr
                      key={item._id}
                      className="transition-colors cursor-pointer"
                      style={{ borderBottom: "1px solid #0a3020" }}
                      onClick={() => handleSessionRowClick(item)}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#0a2818")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-5 py-4 text-xs" style={{ color: "#6aab8e" }}>{(sessPage - 1) * sessPageSize + index + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background: "#0098cc", color: "#031610" }}
                          >
                            {item.session_number}
                          </div>
                          <span className="text-xs font-medium truncate max-w-[140px]" style={{ color: "#e2f5ef" }}>
                            {item.session_title || `Session ${item.session_number}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4"><ShortId id={item.subscription_id} /></td>
                      <td className="px-5 py-4 text-xs" style={{ color: "#6aab8e" }}>
                        {item.session_date
                          ? new Date(item.session_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={sessPage}
            total={sessions.length}
            pageSize={sessPageSize}
            onPage={setSessPage}
            onPageSize={setSessPageSize}
          />
        </div>
      )}
    </div>
  );
}