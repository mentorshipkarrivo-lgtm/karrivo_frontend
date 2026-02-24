import React, { useState } from 'react';
import {
    TrendingUp, Users, Calendar, Loader2, AlertCircle,
    User, Clock, MapPin, Mail, Phone, ChevronLeft, ChevronRight, Menu, X, Video
} from 'lucide-react';
import { useGetMenteeDashboardQuery } from "./dashboardsecapislice";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../global/Loader';

const DashboardSection = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = userData?.username || userData?._id;
    const navigate = useNavigate()

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [calMonth, setCalMonth] = useState(new Date());

    const { data: dashboardResponse, isLoading, isError } = useGetMenteeDashboardQuery(userId, {
        skip: !userId,
    });
    const dashboardData = dashboardResponse?.data || {};

    /* ── helpers ── */
    const formatTimeAgo = (ts) => {
        const ms = Date.now() - new Date(ts);
        const m = Math.floor(ms / 60000), h = Math.floor(ms / 3600000), d = Math.floor(ms / 86400000);
        if (m < 60) return `${m}m ago`;
        if (h < 24) return `${h}h ago`;
        return `${d}d ago`;
    };

    const formatDate = (ds) => {
        const date = new Date(ds), today = new Date(), tom = new Date();
        tom.setDate(today.getDate() + 1);
        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tom.toDateString()) return 'Tomorrow';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getInitials = (name) => {
        if (!name) return '?';
        const p = name.trim().split(' ');
        return p.length === 1 ? p[0][0].toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
    };

    /* ── calendar ── */
    const year = calMonth.getFullYear();
    const month = calMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthName = calMonth.toLocaleString('default', { month: 'long' });
    const calendarDays = Array.from({ length: firstDay }, () => null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    // Mark days that have sessions
    const sessionDays = new Set(
        (dashboardData?.upcomingSessions || []).map((s) => {
            const d = new Date(s.date);
            if (d.getMonth() === month && d.getFullYear() === year) return d.getDate();
            return null;
        }).filter(Boolean)
    );

    const todayDate = new Date().getDate();
    const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;
    const prevMonth = () => setCalMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCalMonth(new Date(year, month + 1, 1));
    const now = new Date();

    /* ── loading ── */
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <Loader/>
                </div>
            </div>
        );
    }

    /* ── error ── */
    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Failed to load dashboard. Please try again.</p>
                </div>
            </div>
        );
    }

    /* ────────────────── SUB-COMPONENTS ────────────────── */

    const CalendarCard = () => (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#062117] font-semibold text-sm">{monthName} {year}</h3>
                <div className="flex items-center gap-1">
                    <button onClick={prevMonth} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                    <button onClick={nextMonth} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-[10px] text-gray-400 font-medium py-1">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center">
                {calendarDays.map((day, i) => (
                    <div
                        key={i}
                        className={`text-xs rounded-full w-7 h-7 flex items-center justify-center mx-auto transition-colors
                            ${!day ? '' :
                                isCurrentMonth && day === todayDate
                                    ? 'bg-blue-500 text-white font-bold'
                                    : sessionDays.has(day)
                                        ? 'bg-green-400 text-white font-semibold cursor-pointer'
                                        : 'text-gray-600 hover:bg-blue-50 cursor-pointer'
                            }`}
                    >
                        {day || ''}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 flex-wrap">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                    <span className="text-[10px] text-gray-500">Today</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    <span className="text-[10px] text-gray-500">Session</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-200 inline-block" />
                    <span className="text-[10px] text-gray-500">Free</span>
                </div>
            </div>
        </div>
    );

    const ProfileCard = () => (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <h3 className="text-[#062117] font-semibold text-sm mb-3">Your Profile</h3>
            <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                        {getInitials(dashboardData?.user?.name || userData?.name)}
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-[#062117] text-sm truncate">
                        {dashboardData?.user?.name || userData?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                        {dashboardData?.user?.role || 'Mentee'}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                {[
                    { icon: <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />, val: dashboardData?.user?.email || userData?.email || 'N/A' },
                    { icon: <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />, val: dashboardData?.user?.phone || 'N/A' },
                    {
                        icon: <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />,
                        val: dashboardData?.user?.city && dashboardData?.user?.country
                            ? `${dashboardData.user.city}, ${dashboardData.user.country}` : 'N/A'
                    },
                ].map(({ icon, val }, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        {icon}
                        <span className="truncate">{val}</span>
                    </div>
                ))}
            </div>
            {!dashboardData?.profileCompleted && (
                <button
                    onClick={() => navigate("/mentee/profile")}
                    className="mt-3 w-full text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg py-1.5 font-medium">
                    Complete Profile →
                </button>
            )}
        </div>
    );

    // const TodaySessionsCard = () => {
    //     const todayStr = now.toDateString();
    //     const todaySessions = (dashboardData?.upcomingSessions || []).filter(
    //         (s) => new Date(s.date).toDateString() === todayStr
    //     );
    //     return (
    //         <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex-1">
    //             <h3 className="text-[#062117] font-semibold text-sm mb-3">Today's Sessions</h3>
    //             <div className="flex flex-col gap-2">
    //                 {todaySessions.length > 0 ? (
    //                     todaySessions.slice(0, 3).map((s) => (
    //                         <div key={s.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
    //                             <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
    //                                 <span className="text-white font-bold text-xs">{s.mentorInitials}</span>
    //                             </div>
    //                             <div className="flex-1 min-w-0">
    //                                 <p className="text-xs font-semibold text-[#062117] truncate">{s.title}</p>
    //                                 <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
    //                                     <Clock className="w-3 h-3 flex-shrink-0" />{s.time}
    //                                 </p>
    //                             </div>
    //                             {s.meetingLink && (
    //                                 <a
    //                                     href={s.meetingLink}
    //                                     target="_blank"
    //                                     rel="noopener noreferrer"
    //                                     className="flex-shrink-0 p-1.5 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
    //                                     title="Join Zoom"
    //                                 >
    //                                     <Video className="w-3.5 h-3.5 text-white" />
    //                                 </a>
    //                             )}
    //                         </div>
    //                     ))
    //                 ) : (
    //                     <div className="text-center py-6">
    //                         <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
    //                         <p className="text-gray-400 text-xs">No sessions today</p>
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // };

    // const MentorsListCard = () => (
    //     <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
    //         <div className="flex items-center justify-between mb-3">
    //             <h3 className="text-[#062117] text-sm font-semibold">My Mentors</h3>
    //             <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
    //                 {dashboardData?.mentors?.length || 0}
    //             </span>
    //         </div>
    //         <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-0.5">
    //             {dashboardData?.mentors?.length > 0 ? (
    //                 dashboardData.mentors.map((m) => (
    //                     <div key={m.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
    //                         <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
    //                             <span className="text-white font-bold text-xs">{m.initials || getInitials(m.name)}</span>
    //                         </div>
    //                         <div className="flex-1 min-w-0">
    //                             <p className="font-semibold text-[#062117] text-xs truncate">{m.name}</p>
    //                             <p className="text-[10px] text-gray-400 truncate">{m.email}</p>
    //                         </div>
    //                     </div>
    //                 ))
    //             ) : (
    //                 <div className="text-center py-6">
    //                     <User className="w-8 h-8 text-gray-300 mx-auto mb-2" />
    //                     <p className="text-gray-400 text-xs">No mentors yet</p>
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );

    /* Left sidebar inner content */
    const LeftContent = () => (
        <div className="flex flex-col gap-4">
            <CalendarCard />
            <ProfileCard />
            {/* <TodaySessionsCard /> */}
        </div>
    );

    /* Center column */
    const CenterContent = () => (
        <div className="flex flex-col gap-4">
            {/* Overview */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div>
                        <h3 className="text-[#062117] text-base sm:text-lg font-bold">Daily Mentorship Overview</h3>
                        <p className="text-gray-400 text-xs mt-0.5">Track your progress and engagements</p>
                    </div>
                    {/* <div className="text-right">
                        <p className="text-3xl sm:text-4xl font-bold text-[#062117]">
                            {dashboardData?.stats?.totalSessions || 0}
                        </p>
                        <p className="text-xs text-gray-400">Total Sessions</p>
                    </div> */}
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                        {
                            label: 'Active Mentors',
                            value: dashboardData?.stats?.activeMentors || 0,
                            bg: 'bg-blue-50',
                            sub: `${dashboardData?.mentors?.length || 0} available`,
                            color: 'text-blue-600'
                        },
                        {
                            label: 'Upcoming',
                            value: dashboardData?.upcomingSessions?.length || 0,
                            bg: 'bg-purple-50',
                            sub: 'sessions booked',
                            color: 'text-gray-400'
                        },
                        // {
                        //     label: 'Growth',
                        //     value: `${dashboardData?.stats?.monthlyGrowth?.sessions ?? 0}%`,
                        //     bg: 'bg-green-50',
                        //     sub: '↑ vs last month',
                        //     color: 'text-green-600'
                        // },
                    ].map(({ label, value, bg, sub, color }) => (
                        <div key={label} className={`${bg} rounded-xl p-2.5 sm:p-3`}>
                            <p className="text-[10px] sm:text-xs text-gray-500 mb-1 truncate">{label}</p>
                            <p className="text-xl sm:text-2xl font-bold text-[#062117]">{value}</p>
                            <p className={`text-[10px] sm:text-xs mt-1 ${color} truncate`}>{sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <div>
                        <h3 className="text-[#062117] text-base font-bold">Upcoming Sessions</h3>
                        <p className="text-gray-400 text-xs">Your scheduled mentorship meetings</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full font-medium">
                        {dashboardData?.upcomingSessions?.length || 0} sessions
                    </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-0.5">
                    {dashboardData?.upcomingSessions?.length > 0 ? (
                        dashboardData.upcomingSessions.map((s) => (
                            <div key={s.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-xs sm:text-sm">{s.mentorInitials}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-[#062117] text-sm truncate">{s.title}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                        <Calendar className="w-3 h-3 flex-shrink-0" />
                                        {formatDate(s.date)} at {s.time}
                                    </p>
                                    {s.mentorName && (
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                            <User className="w-3 h-3 flex-shrink-0" />
                                            {s.mentorName}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                    <span className="hidden sm:inline text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full whitespace-nowrap capitalize">
                                        {s.status || 'Scheduled'}
                                    </span>
                                    {s.meetingLink && (
                                        <a
                                            href={s.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-0.5 rounded-full transition-colors"
                                        >
                                            <Video className="w-3 h-3" />
                                            <span className="hidden sm:inline">Join</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">No upcoming sessions</p>
                            <p className="text-xs text-gray-400 mt-1">Book a session to get started</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                <h3 className="text-[#062117] text-base font-bold mb-3">Recent Activity</h3>
                <div className="space-y-1 max-h-52 overflow-y-auto pr-0.5">
                    {dashboardData?.recentActivity?.length > 0 ? (
                        dashboardData.recentActivity.slice(0, 6).map((a, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.status === 'completed' ? 'bg-green-500' :
                                        a.status === 'confirmed' ? 'bg-blue-500' : 'bg-gray-400'
                                        }`} />
                                    <p className="text-gray-700 text-sm truncate">{a.action}</p>
                                </div>
                                <p className="text-xs text-gray-400 whitespace-nowrap ml-3 flex-shrink-0">
                                    {formatTimeAgo(a.timestamp)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <TrendingUp className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">No recent activity</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    /* ────────────────── RENDER ────────────────── */
    return (
        <div className="bg-gray-50 min-h-screen">

            {/* ── MOBILE DRAWER OVERLAY ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── MOBILE DRAWER ── */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-gray-50 z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto p-4 lg:hidden shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-[#062117] text-sm">Dashboard Menu</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
                <LeftContent />
            </aside>

            {/* ── MAIN WRAPPER ── */}
            <div className="p-3 sm:p-4 md:p-5 lg:p-5">

                {/* ── HEADER ── */}
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden mt-0.5 p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex-shrink-0"
                            aria-label="Open sidebar"
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="min-w-0">
                            <h2 className="text-base sm:text-xl font-bold text-[#062117] truncate">
                                Welcome back, {dashboardData?.user?.name || userData?.name || 'User'}!
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm">
                                {now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                {' · '}{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>

                    {/* Profile-incomplete alert — desktop */}
                    {!dashboardData?.profileCompleted && (
                        <div className="hidden sm:flex bg-[#eff6ff] border border-blue-200 px-3 py-2 rounded-xl items-center gap-2 flex-shrink-0">
                            <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <p className="text-blue-700 text-xs font-medium whitespace-nowrap">Complete your profile</p>
                        </div>
                    )}
                </div>

                {/* Profile-incomplete alert — mobile */}
                {!dashboardData?.profileCompleted && (
                    <div className="sm:hidden bg-[#eff6ff] border border-blue-200 px-3 py-2 rounded-xl flex items-center gap-2 mb-4">
                        <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <p className="text-blue-700 text-xs font-medium">Complete your profile for better matches</p>
                    </div>
                )}

                {/* ── RESPONSIVE GRID ──
                    xs/sm  (<768px):  1 col — center → stat tiles → mentors
                    md     (768px+):  2 cols — center (7/12) | right (5/12)
                    lg     (1024px+): 3 cols — left (3/12) | center (6/12) | right (3/12)
                */}
                <div className="grid grid-cols-12 gap-3 sm:gap-4">

                    {/* LEFT — desktop persistent sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-5">
                            <LeftContent />
                        </div>
                    </div>

                    {/* CENTER */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-6">
                        <CenterContent />
                    </div>

                    {/* RIGHT */}
                    <div className="col-span-12 md:col-span-5 lg:col-span-3">

                        {/* Mobile: 2-col stat tiles + mentors */}
                        <div className="md:hidden space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-500 rounded-2xl p-4 text-white shadow-sm">
                                    <p className="text-blue-100 text-[10px] font-medium mb-1">Total Sessions</p>
                                    <p className="text-3xl font-bold">{dashboardData?.stats?.totalSessions || 0}</p>
                                    <p className="text-blue-200 text-[10px] mt-0.5">All-time</p>
                                </div>
                                <div className="bg-purple-500 rounded-2xl p-4 text-white shadow-sm">
                                    <p className="text-purple-100 text-[10px] font-medium mb-1">Active Mentors</p>
                                    <p className="text-3xl font-bold">{dashboardData?.stats?.activeMentors || 0}</p>
                                    <p className="text-purple-200 text-[10px] mt-0.5">{dashboardData?.mentors?.length || 0} available</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                                    <p className="text-gray-500 text-[10px] font-medium mb-1">Growth</p>
                                    <p className="text-3xl font-bold text-[#062117]">{dashboardData?.stats?.monthlyGrowth?.sessions ?? 0}%</p>
                                    <p className="text-green-600 text-[10px] mt-0.5">↑ Last month</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm">
                                    <p className="text-gray-500 text-[10px] font-medium mb-1">Upcoming</p>
                                    <p className="text-3xl font-bold text-[#062117]">{dashboardData?.upcomingSessions?.length || 0}</p>
                                    <p className="text-gray-400 text-[10px] mt-0.5">Sessions</p>
                                </div>
                            </div>
                            {/* <MentorsListCard /> */}
                        </div>

                        {/* Tablet & Desktop: right column stats + mentors */}
                        <div className="hidden md:flex flex-col gap-4">
                            <div className="bg-blue-500 rounded-2xl p-4 shadow-sm text-white">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-blue-100 text-xs font-medium">Total Sessions</p>
                                    <Calendar className="w-4 h-4 text-blue-200" />
                                </div>
                                <p className="text-4xl font-bold">{dashboardData?.stats?.totalSessions || 0}</p>
                                <p className="text-blue-200 text-xs mt-1">All-time completed</p>
                                <div className="flex items-end gap-1 mt-3 h-10">
                                    {[3, 5, 4, 7, 6, 8, 5, 7, 9, 6, 8, 10].map((h, i) => (
                                        <div key={i} className="flex-1 bg-blue-300 rounded-sm opacity-70" style={{ height: `${h * 4}px` }} />
                                    ))}
                                </div>
                            </div>

                            <div className="bg-purple-500 rounded-2xl p-4 shadow-sm text-white">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-purple-100 text-xs font-medium">Active Mentors</p>
                                    <Users className="w-4 h-4 text-purple-200" />
                                </div>
                                <p className="text-4xl font-bold">{dashboardData?.stats?.activeMentors || 0}</p>
                                <p className="text-purple-200 text-xs mt-1">{dashboardData?.mentors?.length || 0} available</p>
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {Array.from({ length: 15 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-2.5 h-2.5 rounded-full ${i < (dashboardData?.stats?.activeMentors || 0) ? 'bg-purple-200' : 'bg-purple-400 opacity-30'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-gray-500 text-xs font-medium">Monthly Growth</p>
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                </div>
                                <p className="text-4xl font-bold text-[#062117]">
                                    {dashboardData?.stats?.monthlyGrowth?.sessions ?? 0}%
                                </p>
                                <p className="text-xs text-green-600 mt-1">↑ Since last month</p>
                            </div> */}

                            {/* <MentorsListCard /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSection;