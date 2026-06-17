
import { useEffect, useState } from "react";
import { useGetMentorSessionsQuery } from "./sessionsapislice";
import { BookOpen } from "lucide-react";

const Badge = ({ color, label }) => (
    <span style={{
        color,
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.2px",
    }}>{label}</span>
);

const StatusBadge = ({ status }) => {
    const map = {
        inprogress: { color: "#0091c3", label: "In Progress" },
        completed: { color: "#16a34a", label: "Completed" },
        cancelled: { color: "#6b7280", label: "Cancelled" },
        expired: { color: "#dc2626", label: "Expired" },
    };
    const s = map[status] || { color: "#6b7280", label: status || "—" };
    return <Badge color={s.color} label={s.label} />;
};

const PaymentBadge = ({ status }) => {
    const map = {
        unpaid: { color: "#d97706", label: "Pending" },
        Approved: { color: "#16a34a", label: "Paid" },
        failed: { color: "#dc2626", label: "Failed" },
        free: { color: "#0091c3", label: "Free" },
    };
    const s = map[status] || { color: "#6b7280", label: status || "—" };
    return <Badge color={s.color} label={s.label} />;
};

const formatDate = (d) => d
    ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

const PBtn = ({ onClick, disabled, children, active }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        style={{
            padding: "5px 10px",
            fontSize: "12px",
            fontWeight: active ? 700 : 500,
            color: disabled ? "#cbd5e1" : active ? "#fff" : "#1a1a2e",
            background: active ? "#1a1a2e" : "#fff",
            border: `1px solid ${active ? "#1a1a2e" : "#e2e8f0"}`,
            borderRadius: "6px",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
            minWidth: "32px",
            lineHeight: 1,
            transition: "all 0.15s",
        }}
    >{children}</button>
);

const thStyle = {
    padding: "11px 14px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "0.6px",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #e2e8f0",
    background: "#1a1a2e",
};

const tdStyle = {
    padding: "13px 14px",
    fontSize: "13px",
    color: "#1a1a2e",
    verticalAlign: "middle",
    borderBottom: "1px solid #f1f5f9",
    whiteSpace: "nowrap",
    background: "#fff",
};

export default function SessionsTable() {
    const [mentorId, setMentorId] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        const storedId = localStorage.getItem("mentorId");
        if (storedId) { setMentorId(storedId); return; }
        const userData = localStorage.getItem("userData");
        if (userData) {
            try { setMentorId(JSON.parse(userData)?._id); } catch { }
        }
    }, []);

    const { data, isLoading, isError, isFetching } = useGetMentorSessionsQuery(
        `${mentorId}?page=${page}&limit=${limit}`,
        { skip: !mentorId }
    );

    const sessions = data?.data || [];
    const totalPages = data?.totalPages || 1;
    const totalCount = data?.count || 0;
    const hasNext = data?.hasNextPage;
    const hasPrev = data?.hasPrevPage;

    return (
        <div style={{
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            padding: "24px",
            background: "#fff",
            minHeight: "100vh",
        }}>

            <div style={{ marginBottom: "20px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                    }}
                >
                    <BookOpen size={20} color="#1a1a2e" />
                    <h1
                        style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#1a1a2e",
                            margin: 0,
                        }}
                    >
                        Sessions
                    </h1>
                </div>

                <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
                    {isLoading ? "Loading…" : `${totalCount} total sessions`}
                </p>
            </div>

            {/* Table wrapper */}
            <div className="scroll-hide" style={{
                width: "100%",
                overflowX: "auto",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "820px",
                }}>
                    <thead
                        style={{
                            backgroundColor: "#1a1a2e",
                        }}
                    >
                        <tr>
                            <th style={{ ...thStyle, width: "40px" }}>S.No</th>
                            <th style={thStyle}>Mentee</th>
                            <th style={thStyle}>Topic</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Time</th>
                            <th style={thStyle}>Type</th>
                            <th style={thStyle}>Amount</th>
                            <th style={thStyle}>Payment</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: "center" }}>Join</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i}>
                                    {Array.from({ length: 10 }).map((_, j) => (
                                        <td key={j} style={tdStyle}>
                                            <div style={{
                                                height: "12px",
                                                background: "#f1f5f9",
                                                borderRadius: "4px",
                                                width: j === 0 ? "24px" : "70%",
                                                animation: "pulse 1.5s ease-in-out infinite",
                                            }} />
                                        </td>
                                    ))}
                                </tr>
                            ))
                            : isError
                                ? (
                                    <tr>
                                        <td colSpan={10} style={{ ...tdStyle, textAlign: "center", padding: "48px", color: "#dc2626" }}>
                                            Failed to load sessions.
                                        </td>
                                    </tr>
                                )
                                : sessions.length === 0
                                    ? (
                                        <tr>
                                            <td colSpan={10} style={{ ...tdStyle, textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                                                No sessions found.
                                            </td>
                                        </tr>
                                    )
                                    : sessions.map((s, idx) => {
                                        const serial = (page - 1) * limit + idx + 1;
                                        return (
                                            <tr key={s._id} style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}>

                                                {/* S.No */}
                                                <td style={{ ...tdStyle, color: "#94a3b8", fontSize: "12px", fontWeight: 500 }}>
                                                    {serial}
                                                </td>

                                                {/* Mentee */}
                                                <td style={{ ...tdStyle, fontWeight: 600, color: "#1a1a2e" }}>
                                                    {s.menteeName || "—"}
                                                </td>

                                                {/* Topic */}
                                                <td style={{ ...tdStyle, color: "#0091c3", maxWidth: "120px" }}>
                                                    <span style={{
                                                        display: "block",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }} title={s.topic}>
                                                        {s.topic || "—"}
                                                    </span>
                                                </td>

                                                {/* Date */}
                                                <td style={{ ...tdStyle, color: "#475569" }}>
                                                    {formatDate(s.sessionDate)}
                                                </td>

                                                {/* Time */}
                                                <td style={{ ...tdStyle, color: "#0091c3", fontWeight: 500 }}>
                                                    {s.startTime} – {s.endTime}
                                                </td>

                                                {/* Type */}
                                                <td style={{ ...tdStyle, color: "#475569" }}>
                                                    {s.sessionType || "—"}
                                                </td>

                                                {/* Amount */}
                                                <td style={{ ...tdStyle, fontWeight: 700, color: "#1a1a2e" }}>
                                                    ₹{s.price}
                                                </td>

                                                {/* Payment */}
                                                <td style={tdStyle}>
                                                    <PaymentBadge status={s.paymentStatus} />
                                                </td>

                                                {/* Status */}
                                                <td style={tdStyle}>
                                                    <StatusBadge status={s.status} />
                                                </td>

                                                {/* Join */}
                                                <td style={{ ...tdStyle, textAlign: "center" }}>
                                                    {s.meetingLink
                                                        ? s.status === "inprogress"
                                                            ? (

                                                                <a href={s.meetingLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{
                                                                        display: "inline-block",
                                                                        background: "#1a1a2e",
                                                                        color: "#fff",
                                                                        padding: "5px 14px",
                                                                        borderRadius: "6px",
                                                                        fontSize: "12px",
                                                                        fontWeight: 600,
                                                                        textDecoration: "none",
                                                                        letterSpacing: "0.2px",
                                                                    }}
                                                                >Join</a>
                                                            )
                                                            : (
                                                                <span style={{
                                                                    display: "inline-block",
                                                                    color: "#cbd5e1",
                                                                    padding: "5px 14px",
                                                                    borderRadius: "6px",
                                                                    fontSize: "12px",
                                                                    fontWeight: 600,
                                                                    border: "1px solid #e2e8f0",
                                                                    cursor: "not-allowed",
                                                                }}>Join</span>
                                                            )
                                                        : <span style={{ color: "#cbd5e1", fontSize: "13px" }}>—</span>
                                                    }
                                                </td>

                                            </tr>
                                        );
                                    })
                        }
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!isLoading && !isError && sessions.length > 0 && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0 0",
                    flexWrap: "wrap",
                    gap: "10px",
                }}>
                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                        Page <b style={{ color: "#1a1a2e" }}>{page}</b> of{" "}
                        <b style={{ color: "#1a1a2e" }}>{totalPages}</b>
                        &nbsp;·&nbsp;
                        <b style={{ color: "#1a1a2e" }}>{totalCount}</b> sessions
                    </span>

                    <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
                        <PBtn onClick={() => setPage(1)} disabled={!hasPrev || isFetching}>«</PBtn>
                        <PBtn onClick={() => setPage(p => p - 1)} disabled={!hasPrev || isFetching}>‹ Prev</PBtn>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                            .reduce((acc, n, i, arr) => {
                                if (i > 0 && arr[i - 1] !== n - 1) acc.push("…");
                                acc.push(n);
                                return acc;
                            }, [])
                            .map((item, i) =>
                                item === "…"
                                    ? <span key={`d${i}`} style={{ color: "#94a3b8", fontSize: "13px", padding: "0 4px" }}>…</span>
                                    : <PBtn key={item} onClick={() => setPage(item)} disabled={isFetching} active={page === item}>{item}</PBtn>
                            )
                        }

                        <PBtn onClick={() => setPage(p => p + 1)} disabled={!hasNext || isFetching}>Next ›</PBtn>
                        <PBtn onClick={() => setPage(totalPages)} disabled={!hasNext || isFetching}>»</PBtn>
                    </div>
                </div>
            )}

            <style>{`
                .scroll-hide::-webkit-scrollbar { display: none; }
                .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                table tr:last-child td { border-bottom: none; }
            `}</style>
        </div>
    );
}

