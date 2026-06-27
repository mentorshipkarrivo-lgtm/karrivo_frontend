import { useEffect, useState } from "react";
import { useGetMentorSessionsQuery } from "./sessionsapislice";
import { BookOpen, Clock3 } from "lucide-react";

const StatusBadge = ({ status }) => {
    const map = {
        inprogress: { className: "bg-[#0098cc]/10 text-[#0098cc]", label: "In Progress" },
        completed: { className: "bg-green-500/10 text-green-600", label: "Completed" },
        cancelled: { className: "bg-gray-100 text-gray-600", label: "Cancelled" },
        expired: { className: "bg-red-500/10 text-red-600", label: "Expired" },
    };
    const s = map[status] || { className: "bg-gray-100 text-gray-600", label: status || "—" };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap `}>
            {s.label}
        </span>
    );
};

const TopicCell = ({ text }) => {
    const [expanded, setExpanded] = useState(false);
    if (!text) return <span className="text-gray-400">—</span>;

    const words = text.split(" ");
    const isLong = words.length > 10;
    const preview = words.slice(0, 10).join(" ");

    return (
        <div style={{ maxWidth: "220px" }}>
            {!expanded ? (
                <span className="text-[#0098cc] text-xs leading-relaxed">
                    {isLong ? (
                        <>
                            <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                                {preview}
                            </span>
                            <button
                                onClick={() => setExpanded(true)}
                                className="text-[10px] text-gray-400 hover:text-[#0098cc] underline underline-offset-2 transition mt-0.5"
                            >
                                Read more
                            </button>
                        </>
                    ) : (
                        <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                            {text}
                        </span>
                    )}
                </span>
            ) : (
                <span className="text-[#0098cc] text-xs leading-relaxed">
                    {text}
                    <button
                        onClick={() => setExpanded(false)}
                        className="block text-[10px] text-gray-400 hover:text-[#0098cc] underline underline-offset-2 transition mt-0.5"
                    >
                        Read less
                    </button>
                </span>
            )}
        </div>
    );
};

const getSessionStart = (s) => {
    if (!s?.sessionDate || !s?.startTime) return null;
    const datePart = new Date(s.sessionDate).toISOString().split("T")[0];
    const [h, m] = s.startTime.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return new Date(`${datePart}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
};

const JOIN_WINDOW_MS = 10 * 60 * 1000;


const PaymentBadge = ({ status }) => {
    const map = {
        unpaid: { className: "bg-amber-500/10 text-amber-600", label: "Pending" },
        Approved: { className: "bg-green-500/10 text-green-600", label: "Paid" },
        failed: { className: "bg-red-500/10 text-red-600", label: "Failed" },
        free: { className: "bg-[#0098cc]/10 text-[#0098cc]", label: "Free" },
    };
    const s = map[status] || { className: "bg-gray-100 text-gray-600", label: status || "—" };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap `}>
            {s.label}
        </span>
    );
};

const formatDate = (d) => d
    ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

const PBtn = ({ onClick, disabled, children, active }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-1.5 text-xs rounded-xl border transition whitespace-nowrap ${active
            ? "bg-[#1a1a2e] text-white border-[#1a1a2e] font-semibold"
            : disabled
                ? "bg-white text-gray-300 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-600 border-gray-300 hover:border-[#0098cc] font-medium"
            }`}
    >{children}</button>
);

// Base td style — single line, no wrap
const TD = "px-4 py-3 text-xs whitespace-nowrap align-middle";

export default function SessionsTable() {
    const [mentorId, setMentorId] = useState(null);
    const [page, setPage] = useState(1);
    const [now, setNow] = useState(Date.now());
    const [expandedTopics, setExpandedTopics] = useState({});

    const toggleTopic = (id) => {
        setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
    };


    const limit = 10;

    useEffect(() => {
        const storedId = localStorage.getItem("mentorId");
        if (storedId) { setMentorId(storedId); return; }
        const userData = localStorage.getItem("userData");
        if (userData) {
            try { setMentorId(JSON.parse(userData)?._id); } catch { }
        }
    }, []);
    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 30000);
        return () => clearInterval(t);
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
        <div className="min-h-screen bg-white p-5 text-gray-700">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex flex-col gap-4">
                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
                        <BookOpen
                            size={24}
                            className="text-[#0098cc]"
                            strokeWidth={2.2}
                        />
                        Sessions
                    </h1>

                    {/* Subtitle + Info */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <p className="text-xs text-gray-500">
                            View and manage your mentoring sessions
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            {/* <Clock3 className="h-4 w-4 text-[#0098cc] shrink-0" /> */}
                            <span>
                                <span className="font-medium">Join Button</span> is activates
                                {" "}
                                <span className="font-semibold text-[#0098cc]">
                                    10 minutes before
                                </span>{" "}
                                the session starts.
                            </span>
                        </div>
                    </div>
                </div>
                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto scroll-hide">
                        <table className="w-full" style={{ minWidth: "860px" }}>
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {["S No", "Mentee", "Topic", "Date", "Time", "Amount", "Payment", "Status", "Join"].map((item) => (
                                        <th
                                            key={item}
                                            className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500  whitespace-nowrap"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading
                                    ? Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="border-b border-gray-100">
                                            {Array.from({ length: 10 }).map((_, j) => (
                                                <td key={j} className="px-4 py-3">
                                                    <div
                                                        className="h-3 bg-gray-100 rounded animate-pulse"
                                                        style={{ width: j === 0 ? "24px" : "70%" }}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                    : isError
                                        ? (
                                            <tr>
                                                <td colSpan={10} className="text-center py-16 text-red-500 text-sm font-medium">
                                                    Failed to load sessions.
                                                </td>
                                            </tr>
                                        )
                                        : sessions.length === 0
                                            ? (
                                                <tr>
                                                    <td colSpan={10} className="text-center py-16">
                                                        <BookOpen size={38} className="mx-auto text-gray-300 mb-3" />
                                                        <p className="text-gray-500 text-sm font-medium">No sessions found</p>
                                                    </td>
                                                </tr>
                                            )
                                            : sessions.map((s, idx) => {
                                                const serial = (page - 1) * limit + idx + 1;

                                                // ── Join eligibility ──  ADD THESE 4 LINES
                                                const startDT = getSessionStart(s);
                                                const joinOpensAt = startDT ? startDT.getTime() - JOIN_WINDOW_MS : null;
                                                const canJoin = !!s.meetingLink && joinOpensAt !== null && now >= joinOpensAt;
                                                const minutesUntilJoin = joinOpensAt !== null
                                                    ? Math.max(0, Math.ceil((joinOpensAt - now) / 60000))
                                                    : null;
                                                return (
                                                    <tr
                                                        key={s._id}
                                                        className="border-b border-gray-100 hover:bg-gray-50"
                                                        style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}
                                                    >
                                                        {/* S.No */}
                                                        <td className={`${TD} text-gray-400 font-medium`}>
                                                            {serial}
                                                        </td>

                                                        {/* Mentee */}
                                                        <td className={`${TD} font-semibold text-[#1a1a2e]`}>
                                                            {s.menteeName || "—"}
                                                        </td>

                                                        {/* Topic — truncate at 200px, full text on hover */}
                                                        <td className={`${TD}`} style={{ maxWidth: "220px", whiteSpace: "normal" }}>
                                                            <TopicCell text={s.topic} />
                                                        </td>

                                                        {/* Date */}
                                                        <td className={`${TD} text-gray-500`}>
                                                            {formatDate(s.sessionDate)}
                                                        </td>

                                                        {/* Time */}
                                                        <td className={`${TD} font-medium text-[#0098cc]`}>
                                                            {s.startTime} – {s.endTime}
                                                        </td>

                                                        {/* Type */}
                                                        {/* <td className={`${TD} text-gray-500`}>
                                                            {s.sessionType || "—"}
                                                        </td> */}

                                                        {/* Amount */}
                                                        <td className={`${TD} font-bold`}>
                                                            {s.isFreeSession ? (
                                                                <span className="text-green-600">Free Session</span>
                                                            ) : (
                                                                <span className="text-[#1a1a2e]">₹{s.price}</span>
                                                            )}
                                                        </td>

                                                        {/* Payment */}
                                                        <td className={TD}>
                                                            <PaymentBadge status={s.paymentStatus} />
                                                        </td>

                                                        {/* Status */}
                                                        <td className={TD}>
                                                            <StatusBadge status={s.status} />
                                                        </td>

                                                        {/* Join */}
                                                        <td className={`${TD} text-center`}>
                                                            {canJoin ? (

                                                                <a href={s.meetingLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-block bg-[#1a1a2e] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition whitespace-nowrap"
                                                                >
                                                                    Join
                                                                </a>
                                                            ) : (
                                                                <span
                                                                    title={
                                                                        !s.meetingLink
                                                                            ? "Meeting link not available"
                                                                            : minutesUntilJoin
                                                                                ? `Join activates in ${minutesUntilJoin} min`
                                                                                : "Join activates 10 min before session"
                                                                    }
                                                                    className="inline-block border border-gray-200 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed whitespace-nowrap"
                                                                >
                                                                    Join
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {!isLoading && !isError && sessions.length > 0 && (
                    <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                        <span className="text-xs text-gray-400">
                            Page <b className="text-[#1a1a2e]">{page}</b> of{" "}
                            <b className="text-[#1a1a2e]">{totalPages}</b>
                            &nbsp;·&nbsp;
                            <b className="text-[#1a1a2e]">{totalCount}</b> sessions
                        </span>

                        <div className="flex gap-1.5 items-center flex-wrap">
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
                                        ? <span key={`d${i}`} className="text-gray-400 text-xs px-1">…</span>
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
            `}</style>
        </div >
    );
}