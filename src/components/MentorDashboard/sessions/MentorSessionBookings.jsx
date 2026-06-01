import { useEffect, useState } from "react";
import { useGetMentorSessionsQuery } from "./sessionsapislice";

const StatusBadge = ({ status, isExpired }) => {
    if (isExpired) return <Badge bg="#fef2f2" color="#dc2626" border="#fecaca" label="Expired" />;
    const map = {
        inprogress: { bg: "#e0f5fc", color: "#0091c3", border: "#b3e5f7", label: "In Progress" },
        completed:  { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", label: "Completed" },
        cancelled:  { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb", label: "Cancelled" },
    };
    const s = map[status] || map.inprogress;
    return <Badge {...s} />;
};

const PaymentBadge = ({ status }) => {
    const map = {
        inprogress: { bg: "#f8fafc", color: "#0091c3", border: "#b3e5f7", label: "Pending" },
        Approved:       { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", label: "Paid" },
        failed:     { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", label: "Failed" },
    };
    const s = map[status] || map.inprogress;
    return <Badge {...s} />;
};

const Badge = ({ bg, color, border, label }) => (
    <span style={{
        background: bg, color, border: `1px solid ${border}`,
        padding: "2px 7px", borderRadius: "20px",
        fontSize: "10px", fontWeight: 600,
        letterSpacing: "0.4px", textTransform: "uppercase",
        whiteSpace: "nowrap", display: "inline-block",
    }}>{label}</span>
);

const formatDate = (d) => d
    ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

const COLS = [
    { key: "menteeName",  label: "Mentee" },
    { key: "topic",       label: "Topic" },
    { key: "sessionDate", label: "Date" },
    { key: "time",        label: "Time" },
    { key: "sessionType", label: "Type" },
    { key: "price",       label: "Amount" },
    { key: "payment",     label: "Payment" },
    { key: "meeting",     label: "Join" },
];

const PBtn = ({ onClick, disabled, children, active }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        style={{
            padding: "4px 9px", fontSize: "11px",
            fontWeight: active ? 700 : 500,
            color: disabled ? "#b0c4ce" : active ? "#fff" : "#0091c3",
            background: active ? "#1a1a2e" : "#fff",
            border: `1px solid ${active ? "#1a1a2e" : "#b3e5f7"}`,
            borderRadius: "5px",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            whiteSpace: "nowrap",
            minWidth: "28px",
        }}
    >{children}</button>
);

export default function SessionsTable() {
    const [mentorId, setMentorId] = useState(null);
    const [page, setPage]         = useState(1);
    const limit = 10;

    useEffect(() => {
        const storedId = localStorage.getItem('mentorId');
        if (storedId) { setMentorId(storedId); return; }
        const userData = localStorage.getItem('userData');
        if (userData) {
            try { setMentorId(JSON.parse(userData)?._id); } catch { }
        }
    }, []);

    const { data, isLoading, isError, isFetching } = useGetMentorSessionsQuery(
        `${mentorId}?page=${page}&limit=${limit}`,
        { skip: !mentorId }
    );

    const sessions    = data?.data       || [];
    const totalPages  = data?.totalPages || 1;
    const totalCount  = data?.count      || 0;
    const hasNext     = data?.hasNextPage;
    const hasPrev     = data?.hasPrevPage;

    const cell = {
        padding: "9px 10px", fontSize: "12px",
        color: "#0091c3", whiteSpace: "nowrap", verticalAlign: "middle",
    };

    return (
        <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: "16px", background: "#ffffff", minHeight: "100vh" }}>

            {/* Header */}
            <div style={{ marginBottom: "14px" }}>
                <h1 style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                    Session Bookings
                </h1>
                <p style={{ color: "#0091c3", fontSize: "11px", margin: "3px 0 0" }}>
                    {isLoading ? "Loading…" : `${totalCount} total sessions`}
                </p>
            </div>

            {/* Table card */}
            <div style={{
                background: "#ffffff",
                borderRadius: "10px",
                border: "1px solid #b3e5f7",
                boxShadow: "0 1px 6px rgba(0,145,195,0.08)",
                overflow: "hidden",
            }}>
                <div className="scroll-hide" style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>

                        {/* Head */}
                        <thead>
                            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #b3e5f7" }}>
                                {COLS.map(c => (
                                    <th key={c.key} style={{
                                        padding: "9px 10px", textAlign: "left",
                                        fontSize: "10px", fontWeight: 700,
                                        color: "#1a1a2e", letterSpacing: "0.5px",
                                        textTransform: "uppercase", whiteSpace: "nowrap",
                                    }}>{c.label}</th>
                                ))}
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {isLoading
                                ? Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                                        {COLS.map(c => (
                                            <td key={c.key} style={{ padding: "10px" }}>
                                                <div style={{
                                                    height: "11px",
                                                    background: "#b3e5f7",
                                                    borderRadius: "3px",
                                                    width: c.key === "meeting" ? "32px" : "70%",
                                                    animation: "pulse 1.5s ease-in-out infinite",
                                                }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                                : isError
                                    ? (
                                        <tr>
                                            <td colSpan={COLS.length} style={{ textAlign: "center", padding: "40px", color: "#ef4444", fontSize: "12px" }}>
                                                Failed to load sessions.
                                            </td>
                                        </tr>
                                    )
                                    : sessions.length === 0
                                        ? (
                                            <tr>
                                                <td colSpan={COLS.length} style={{ textAlign: "center", padding: "40px", color: "#0091c3", fontSize: "12px" }}>
                                                    No sessions found.
                                                </td>
                                            </tr>
                                        )
                                        : sessions.map((s, idx) => (
                                            <tr
                                                key={s._id}
                                                style={{
                                                    borderBottom: "1px solid #e0f5fc",
                                                    background: isFetching ? "#f7fdff" : idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                                                }}
                                            >
                                                {/* Mentee */}
                                                <td style={cell}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                        <span style={{ fontSize: "12px", color: "#1a1a2e", fontWeight: 500 }}>
                                                            {s.menteeName}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Topic */}
                                                <td style={cell}>
                                                    <span style={{
                                                        maxWidth: "90px", overflow: "hidden",
                                                        textOverflow: "ellipsis", display: "block",
                                                        color: "#0091c3", fontSize: "11px",
                                                    }} title={s.topic}>{s.topic || "—"}</span>
                                                </td>

                                                {/* Date */}
                                                <td style={{ ...cell, color: "#1a1a2e" }}>{formatDate(s.sessionDate)}</td>

                                                {/* Time */}
                                                <td style={{ ...cell, color: "#0091c3" }}>{s.startTime} – {s.endTime}</td>

                                                {/* Type */}
                                                <td style={cell}>
                                                    <span style={{
                                                        fontSize: "10px", color: "#0091c3",
                                                        background: "#f8fafc", border: "1px solid #b3e5f7",
                                                        padding: "2px 7px", borderRadius: "20px", fontWeight: 600,
                                                    }}>{s.sessionType}</span>
                                                </td>

                                                {/* Amount */}
                                                <td style={{ ...cell, fontWeight: 700, color: "#1a1a2e" }}>
                                                    ₹{s.price}
                                                </td>

                                                {/* Payment */}
                                                <td style={cell}><PaymentBadge status={s.paymentStatus} /></td>

                                                {/* Join */}
                                                <td style={cell}>
                                                    {s.meetingLink && !s.isExpired ? (
                                                        <a
                                                            href={s.meetingLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                background: "#1a1a2e", color: "#ffffff",
                                                                padding: "4px 10px", borderRadius: "5px",
                                                                fontSize: "11px", fontWeight: 600,
                                                                textDecoration: "none", display: "inline-block",
                                                            }}
                                                        >Join</a>
                                                    ) : (
                                                        <span style={{ color: "#b3e5f7", fontSize: "11px" }}>—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && !isError && sessions.length > 0 && (
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 14px", borderTop: "1px solid #b3e5f7",
                        flexWrap: "wrap", gap: "8px",
                        background: "#ffffff",
                    }}>
                        <span style={{ fontSize: "11px", color: "#0091c3" }}>
                            Page <b style={{ color: "#1a1a2e" }}>{page}</b> of{" "}
                            <b style={{ color: "#1a1a2e" }}>{totalPages}</b>
                            &nbsp;·&nbsp;
                            <b style={{ color: "#1a1a2e" }}>{totalCount}</b> sessions
                        </span>

                        <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
                            <PBtn onClick={() => setPage(1)}           disabled={!hasPrev || isFetching}>«</PBtn>
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
                                        ? <span key={`d${i}`} style={{ color: "#0091c3", fontSize: "11px", padding: "0 2px" }}>…</span>
                                        : <PBtn key={item} onClick={() => setPage(item)} disabled={isFetching} active={page === item}>{item}</PBtn>
                                )
                            }

                            <PBtn onClick={() => setPage(p => p + 1)} disabled={!hasNext || isFetching}>Next ›</PBtn>
                            <PBtn onClick={() => setPage(totalPages)} disabled={!hasNext || isFetching}>»</PBtn>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .scroll-hide::-webkit-scrollbar { display: none; }
                .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
            `}</style>
        </div>
    );
}