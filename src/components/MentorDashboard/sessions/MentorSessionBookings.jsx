import React, { useState, useEffect } from 'react';
import {
    Calendar, User, Video, RefreshCw, Loader2, TriangleAlert,
    CalendarX, Clock, BadgeCheck, CircleDot, CircleX, CircleCheck
} from 'lucide-react';
import { useGetMentorSessionsQuery } from '../MentorDashboardapislice';
import Loader from '../../../global/Loader';

// ── Status badge ──────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const map = {
        confirmed: { label: 'Confirmed', icon: BadgeCheck, cls: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30' },
        pending: { label: 'Pending', icon: CircleDot, cls: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30' },
        cancelled: { label: 'Cancelled', icon: CircleX, cls: 'bg-red-500/10 text-red-400 ring-1 ring-red-500/30' },
        completed: { label: 'Completed', icon: CircleCheck, cls: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30' },
    };
    const cfg = map[status] || { label: status, icon: CircleDot, cls: 'bg-white/5 text-white/40 ring-1 ring-white/10' };
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${cfg.cls}`}>
            <Icon size={11} />
            {cfg.label}
        </span>
    );
};

// ── Payment badge ─────────────────────────────────────────────
const PaymentBadge = ({ paymentStatus, isFreeSession }) => {
    if (isFreeSession) return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/30">
            Free
        </span>
    );
    const map = {
        paid: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30',
        pending: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30',
        failed: 'bg-red-500/10 text-red-400 ring-1 ring-red-500/30',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${map[paymentStatus] || 'bg-white/5 text-white/40 ring-1 ring-white/10'}`}>
            {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
        </span>
    );
};

// ── Stat pill ─────────────────────────────────────────────────
const StatPill = ({ label, value, valueClass = 'text-white' }) => (
    <div className="flex items-center gap-2 bg-[#062117] border border-white/10 rounded-lg px-3 sm:px-4 py-2">
        <span className="text-white/40 text-xs">{label}</span>
        <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
);

// ── Mobile session card ───────────────────────────────────────
const SessionCard = ({ session, formatDate }) => (
    <div className="bg-[#062117] border border-white/10 rounded-xl p-4 flex flex-col gap-3">
        {/* Header row: mentee + status */}
        <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
                    <User size={15} className="text-[#0098cc]" />
                </div>
                <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{session.menteeName}</p>
                    <p className="text-white/40 text-xs truncate">{session.menteeEmail}</p>
                </div>
            </div>
            <StatusBadge status={session.status} />
        </div>

        {/* Topic */}
        <div>
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Topic</p>
            <p className="text-white text-sm font-medium">{session.topic}</p>
            {session.description && (
                <p className="text-white/40 text-xs mt-0.5 line-clamp-2">{session.description}</p>
            )}
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#031610] rounded-lg p-2.5">
                <p className="text-white/30 text-[10px] mb-0.5">Date</p>
                <p className="text-white/80 text-xs font-medium">{formatDate(session.sessionDate)}</p>
            </div>
            <div className="bg-[#031610] rounded-lg p-2.5">
                <p className="text-white/30 text-[10px] mb-0.5">Time</p>
                <p className="text-white/80 text-xs font-medium flex items-center gap-1">
                    <Clock size={10} className="text-[#0098cc]" />
                    {session.startTime}
                </p>
            </div>
            <div className="bg-[#031610] rounded-lg p-2.5">
                <p className="text-white/30 text-[10px] mb-0.5">Duration</p>
                <p className="text-white/80 text-xs font-medium">{session.durationMinutes} min</p>
            </div>
            <div className="bg-[#031610] rounded-lg p-2.5">
                <p className="text-white/30 text-[10px] mb-0.5">Price</p>
                <p className={`text-xs font-medium ${session.isFreeSession ? 'text-violet-400' : 'text-white'}`}>
                    {session.isFreeSession ? 'Free' : `${session.currency} ${session.price}`}
                </p>
            </div>
        </div>

        {/* Footer: payment + join */}
        <div className="flex items-center justify-between pt-1">
            <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
            {session.meetingLink ? (
                <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 text-[#0098cc] px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                >
                    <Video size={12} />
                    Join
                </a>
            ) : (
                <span className="text-white/20 text-xs">No link</span>
            )}
        </div>
    </div>
);

const FILTERS = ['all', 'confirmed', 'pending', 'cancelled', 'completed'];

const MentorSessionBookings = () => {
    const [mentorId, setMentorId] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const storedId = localStorage.getItem('mentorId');
        if (storedId) { setMentorId(storedId); return; }
        const userData = localStorage.getItem('userData');
        if (userData) {
            try { setMentorId(JSON.parse(userData)?._id); } catch { }
        }
    }, []);

    const { data: sessionsData, isLoading, isError, error, refetch } =
        useGetMentorSessionsQuery(mentorId, { skip: !mentorId });

    const sessions = sessionsData?.data || [];
    const totalSessions = sessionsData?.count || 0;

    const formatDate = (d) =>
        d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

    const filteredSessions = filter === 'all' ? sessions : sessions.filter(s => s.status === filter);

    // ── Loading ───────────────────────────────────────────────
    if (isLoading) return (
        <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610]">
            <div className="flex flex-col items-center gap-3">
               <Loader />
            </div>
        </div>
    );

    // ── Error ─────────────────────────────────────────────────
    if (isError) return (
        <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610] p-6">
            <div className="bg-[#062117] border border-white/10 rounded-xl p-8 max-w-sm w-full text-center">
                <TriangleAlert size={36} className="text-red-400 mx-auto mb-3" />
                <h2 className="text-white font-semibold mb-1">Failed to Load</h2>
                <p className="text-white/50 text-sm mb-5">{error?.data?.message || 'Unable to load session bookings.'}</p>
                <button
                    onClick={() => refetch()}
                    className="inline-flex items-center gap-2 bg-[#0098cc] hover:bg-[#0098cc]/80 text-white px-5 py-2 rounded-lg text-sm transition-colors"
                >
                    <RefreshCw size={14} />
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-full bg-[#031610] p-4 sm:p-5 gap-4">

            {/* ── Top bar ─────────────────────────────────────────── */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-white text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2">
                        <Calendar size={20} className="text-[#0098cc]" />
                        Session Bookings
                    </h1>
                    <p className="text-white/40 text-xs sm:text-sm mt-0.5">Manage and track all your mentorship sessions</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <StatPill label="Total" value={totalSessions} />
                    <StatPill
                        label="Confirmed"
                        value={sessions.filter(s => s.status === 'confirmed').length}
                        valueClass="text-emerald-400"
                    />
                </div>
            </div>

            {/* ── Filter tabs ─────────────────────────────────────── */}
            <div className="flex gap-2 flex-wrap">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${filter === f
                            ? 'bg-[#0098cc] text-white'
                            : 'bg-[#062117] border border-white/10 text-white/50 hover:text-white hover:border-white/20'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* ── Empty state ──────────────────────────────────────── */}
            {filteredSessions.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 bg-[#062117] border border-white/10 rounded-xl">
                    <CalendarX size={36} className="text-white/10 mb-3" />
                    <p className="text-white/40 text-sm font-medium">No sessions found</p>
                    <p className="text-white/20 text-xs mt-1">
                        {filter !== 'all' ? `No ${filter} sessions available` : 'Your bookings will appear here'}
                    </p>
                </div>
            ) : (
                <>
                    {/* ── MOBILE / TABLET: Card list (hidden on lg+) ─── */}
                    <div className="flex flex-col gap-3 lg:hidden">
                        {filteredSessions.map(session => (
                            <SessionCard key={session._id} session={session} formatDate={formatDate} />
                        ))}
                        <p className="text-white/25 text-xs text-center pt-1">
                            {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* ── DESKTOP: Scrollable table (hidden below lg) ── */}
                    <div className="hidden lg:flex flex-col flex-1 bg-[#062117] border border-white/10 rounded-xl overflow-hidden min-h-0">
                        <div className="overflow-auto flex-1">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        {['Mentee', 'Topic', 'Date & Time', 'Duration', 'Type', 'Status', 'Payment', 'Price', 'Action'].map(h => (
                                            <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest whitespace-nowrap bg-[#031610]/60">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSessions.map((session, i) => (
                                        <tr
                                            key={session._id}
                                            className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}
                                        >
                                            {/* Mentee */}
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
                                                        <User size={14} className="text-[#0098cc]" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-white text-sm font-medium truncate max-w-[120px]">{session.menteeName}</p>
                                                        <p className="text-white/40 text-xs truncate max-w-[120px]">{session.menteeEmail}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Topic */}
                                            <td className="px-4 py-3.5 max-w-[160px]">
                                                <p className="text-white text-sm font-medium truncate">{session.topic}</p>
                                                {session.description && (
                                                    <p className="text-white/40 text-xs mt-0.5 line-clamp-1">{session.description}</p>
                                                )}
                                            </td>

                                            {/* Date & Time */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={12} className="text-[#0098cc] shrink-0" />
                                                    <div>
                                                        <p className="text-white/80 text-xs">{formatDate(session.sessionDate)}</p>
                                                        <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                                                            <Clock size={10} />
                                                            {session.startTime}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Duration */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <span className="text-white/60 text-xs">{session.durationMinutes} min</span>
                                            </td>

                                            {/* Type */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <span className="text-white/60 text-xs capitalize">{session.sessionType}</span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <StatusBadge status={session.status} />
                                            </td>

                                            {/* Payment */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
                                            </td>

                                            {/* Price */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                {session.isFreeSession ? (
                                                    <span className="text-violet-400 text-xs font-medium">Free</span>
                                                ) : (
                                                    <span className="text-white text-sm font-medium">
                                                        {session.currency} {session.price}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                {session.meetingLink ? (
                                                    <a
                                                        href={session.meetingLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 text-[#0098cc] px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                                                    >
                                                        <Video size={12} />
                                                        Join
                                                    </a>
                                                ) : (
                                                    <span className="text-white/20 text-xs">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer count */}
                        <div className="px-4 py-2.5 border-t border-white/5 bg-[#031610]/40">
                            <p className="text-white/25 text-xs">
                                {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MentorSessionBookings;


