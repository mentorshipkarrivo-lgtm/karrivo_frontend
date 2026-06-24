import { useEffect, useState } from "react";
import { useGetMentorSessionsQuery } from "./sessionsapislice";
import { BookOpen } from "lucide-react";

const StatusBadge = ({ status }) => {
    const map = {
        inprogress: { className: "bg-[#0098cc]/10 text-[#0098cc]", label: "In Progress" },
        completed: { className: "bg-green-500/10 text-green-600", label: "Completed" },
        cancelled: { className: "bg-gray-100 text-gray-600", label: "Cancelled" },
        expired: { className: "bg-red-500/10 text-red-600", label: "Expired" },
    };
    const s = map[status] || { className: "bg-gray-100 text-gray-600", label: status || "—" };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${s.className}`}>
            {s.label}
        </span>
    );
};

const PaymentBadge = ({ status }) => {
    const map = {
        unpaid: { className: "bg-amber-500/10 text-amber-600", label: "Pending" },
        Approved: { className: "bg-green-500/10 text-green-600", label: "Paid" },
        failed: { className: "bg-red-500/10 text-red-600", label: "Failed" },
        free: { className: "bg-[#0098cc]/10 text-[#0098cc]", label: "Free" },
    };
    const s = map[status] || { className: "bg-gray-100 text-gray-600", label: status || "—" };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${s.className}`}>
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
        <div className="min-h-screen bg-white p-5 text-gray-700">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
                            <BookOpen size={24} className="text-[#0098cc]" strokeWidth={2.2} />
                            Sessions
                        </h1>
                        <p className="text-gray-500 mt-2 text-xs">
                            View and manage your mentoring sessions
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto scroll-hide">
                        <table className="w-full" style={{ minWidth: "860px" }}>
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {["S.No", "Mentee", "Topic", "Date", "Time", "Type", "Amount", "Payment", "Status", "Join"].map((item) => (
                                        <th
                                            key={item}
                                            className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase whitespace-nowrap"
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
                                                        <td className={`${TD} text-[#0098cc]`} style={{ maxWidth: "200px" }}>
                                                            <span
                                                                className="block overflow-hidden text-ellipsis whitespace-nowrap"
                                                                title={s.topic}
                                                            >
                                                                {s.topic || "—"}
                                                            </span>
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
                                                        <td className={`${TD} text-gray-500`}>
                                                            {s.sessionType || "—"}
                                                        </td>

                                                        {/* Amount */}
                                                        <td className={`${TD} font-bold text-[#1a1a2e]`}>
                                                            ₹{s.price}
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
                                                            {s.meetingLink
                                                                ? s.status === "inprogress"
                                                                    ? (
                                                                        <a
                                                                            href={s.meetingLink}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-block bg-[#1a1a2e] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition whitespace-nowrap"
                                                                        >
                                                                            Join
                                                                        </a>
                                                                    )
                                                                    : (
                                                                        <span className="inline-block border border-gray-200 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed whitespace-nowrap">
                                                                            Join
                                                                        </span>
                                                                    )
                                                                : <span className="text-gray-300 text-xs">—</span>
                                                            }
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
        </div>
    );
}