// import React, { useState } from 'react';
// import {
//   TrendingUp, Users, Calendar, AlertCircle,
//   User, Clock, MapPin, Mail, Phone,
//   ChevronLeft, ChevronRight, Video, Wifi
// } from 'lucide-react';
// import { useGetMenteeDashboardQuery } from './dashboardsecapislice';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../../../global/Loader';

// /* ── Helpers ─────────────────────────────────────────────────── */
// const formatTimeAgo = (ts) => {
//   const ms = Date.now() - new Date(ts);
//   const m = Math.floor(ms / 60000), h = Math.floor(ms / 3600000), d = Math.floor(ms / 86400000);
//   if (m < 60) return `${m}m ago`;
//   if (h < 24) return `${h}h ago`;
//   return `${d}d ago`;
// };

// const formatDate = (ds) => {
//   const date = new Date(ds), today = new Date(), tom = new Date();
//   tom.setDate(today.getDate() + 1);
//   if (date.toDateString() === today.toDateString()) return 'Today';
//   if (date.toDateString() === tom.toDateString()) return 'Tomorrow';
//   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// };

// const getInitials = (name) => {
//   if (!name) return '?';
//   const p = name.trim().split(' ');
//   return p.length === 1 ? p[0][0].toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
// };

// /* ── Shared primitives ───────────────────────────────────────── */
// const SectionLabel = ({ children }) => (
//   <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
//     {children}
//   </p>
// );

// const Divider = () => <div className="border-b border-gray-100" />;

// const Pill = ({ children, cls }) => (
//   <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${cls}`}>
//     {children}
//   </span>
// );

// const DataRow = ({ label, value }) => (
//   <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
//     <span className="text-sm text-gray-400">{label}</span>
//     <span className="text-sm font-medium text-gray-800 text-right max-w-[60%] truncate">
//       {value || '—'}
//     </span>
//   </div>
// );

// /* ── Mini calendar ───────────────────────────────────────────── */
// const MiniCalendar = ({ sessions }) => {
//   const [calMonth, setCalMonth] = useState(new Date());
//   const year = calMonth.getFullYear();
//   const month = calMonth.getMonth();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const firstDay = new Date(year, month, 1).getDay();
//   const monthName = calMonth.toLocaleString('default', { month: 'long' });
//   const calDays = Array.from({ length: firstDay }, () => null)
//     .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

//   const sessionDays = new Set(
//     (sessions || []).map(s => {
//       const d = new Date(s.date);
//       return d.getMonth() === month && d.getFullYear() === year ? d.getDate() : null;
//     }).filter(Boolean)
//   );

//   const todayDate = new Date().getDate();
//   const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

//   return (
//     <div className="py-5 border-b border-gray-100">
//       <SectionLabel>Calendar</SectionLabel>

//       {/* nav */}
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-sm font-medium text-gray-800">{monthName} {year}</span>
//         <div className="flex gap-1">
//           <button
//             onClick={() => setCalMonth(new Date(year, month - 1, 1))}
//             className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <ChevronLeft size={13} className="text-gray-400" />
//           </button>
//           <button
//             onClick={() => setCalMonth(new Date(year, month + 1, 1))}
//             className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <ChevronRight size={13} className="text-gray-400" />
//           </button>
//         </div>
//       </div>

//       {/* day headers */}
//       <div className="grid grid-cols-7 text-center mb-1">
//         {['S','M','T','W','T','F','S'].map((d, i) => (
//           <div key={i} className="text-[10px] text-gray-300 py-1">{d}</div>
//         ))}
//       </div>

//       {/* day cells */}
//       <div className="grid grid-cols-7 text-center gap-y-0.5">
//         {calDays.map((day, i) => (
//           <div
//             key={i}
//             className={`text-xs w-7 h-7 flex items-center justify-center mx-auto rounded-full transition-colors
//               ${!day ? '' :
//                 isCurrentMonth && day === todayDate
//                   ? 'bg-[#0098cc] text-white font-medium'
//                   : sessionDays.has(day)
//                     ? 'bg-blue-100 text-blue-600 font-medium cursor-pointer'
//                     : 'text-gray-500 hover:bg-gray-100 cursor-pointer'
//               }`}
//           >
//             {day || ''}
//           </div>
//         ))}
//       </div>

//       {/* legend */}
//       <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
//         {[
//           { color: 'bg-[#0098cc]', label: 'Today' },
//           { color: 'bg-blue-400', label: 'Session' },
//         ].map(({ color, label }) => (
//           <div key={label} className="flex items-center gap-1.5">
//             <span className={`w-2 h-2 rounded-full ${color}`} />
//             <span className="text-[10px] text-gray-400">{label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ── Session row ─────────────────────────────────────────────── */
// const SessionRow = ({ session }) => (
//   <div className="flex items-start gap-3 py-3.5 border-b border-gray-100 last:border-0">
//     {/* avatar */}
//     <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0 mt-0.5">
//       <span className="text-[#0098cc] text-xs font-medium">
//         {session.mentorInitials || getInitials(session.mentorName)}
//       </span>
//     </div>

//     {/* body */}
//     <div className="flex-1 min-w-0">
//       <p className="text-sm font-medium text-gray-800 truncate">{session.title}</p>
//       <p className="text-xs text-gray-400 mt-0.5">
//         {session.mentorName && <>{session.mentorName}<span className="mx-1.5 text-gray-300">·</span></>}
//         {formatDate(session.date)}
//         <span className="mx-1.5 text-gray-300">·</span>
//         {session.time}
//       </p>
//     </div>

//     {/* right */}
//     <div className="flex flex-col items-end gap-1.5 shrink-0">
//       {session.status && (
//         <Pill cls="bg-[#0098cc]/10 text-[#0098cc]">{session.status}</Pill>
//       )}
//       {session.meetingLink && (
//         <a
//           href={session.meetingLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center gap-1 text-[11px] text-[#0098cc] hover:underline"
//         >
//           <Wifi size={10} /> Join
//         </a>
//       )}
//     </div>
//   </div>
// );

// /* ── Activity row ────────────────────────────────────────────── */
// const ActivityRow = ({ item }) => (
//   <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
//     <div className="flex items-center gap-3 min-w-0">
//       <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
//         item.status === 'completed' ? 'bg-blue-400' :
//         item.status === 'confirmed' ? 'bg-[#0098cc]' : 'bg-gray-300'
//       }`} />
//       <p className="text-sm text-gray-600 truncate">{item.action}</p>
//     </div>
//     <p className="text-xs text-gray-300 shrink-0 ml-3">{formatTimeAgo(item.timestamp)}</p>
//   </div>
// );

// /* ══════════════════════════════════════════════════════════════
//    MAIN
// ══════════════════════════════════════════════════════════════ */
// const DashboardSection = () => {
//   const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//   const userId = userData?._id;
//   const navigate = useNavigate();
//   const now = new Date();

//   const { data: dashboardResponse, isLoading, isError } = useGetMenteeDashboardQuery(userId, {
//     skip: !userId,
//   });
//   const d = dashboardResponse?.data || {};

//   const userName = d?.user?.name || userData?.name || 'User';
//   const initials = getInitials(userName);
//   const upcomingSessions = d?.upcomingSessions || [];
//   const recentActivity   = d?.recentActivity   || [];
//   const stats            = d?.stats            || {};

//   if (isLoading) return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <Loader />
//     </div>
//   );

//   if (isError) return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="text-center">
//         <AlertCircle size={32} className="text-red-400/50 mx-auto mb-2" />
//         <p className="text-sm text-gray-400">Failed to load dashboard</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-full bg-white text-gray-800">
//       <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

//         {/* ── HERO ─────────────────────────────────────────────── */}
//         <div className="flex items-start justify-between gap-4 pb-8 border-b border-gray-100 flex-wrap">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-[#0098cc]/10 flex items-center justify-center text-[#0098cc] font-medium text-lg shrink-0">
//               {initials}
//             </div>
//             <div>
//               <h1 className="text-xl font-medium text-gray-900 leading-tight">
//                 Welcome back, {userName}
//               </h1>
//               <p className="text-sm text-gray-400 mt-0.5">
//                 {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//                 <span className="mx-2 text-gray-200">·</span>
//                 {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//               </p>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {d?.user?.role && (
//                   <Pill cls="bg-[#0098cc]/10 text-[#0098cc] capitalize">{d.user.role}</Pill>
//                 )}
//                 {!d?.profileCompleted && (
//                   <button
//                     onClick={() => navigate('/mentee/profile')}
//                     className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-500 hover:bg-amber-100 transition-colors"
//                   >
//                     Complete profile →
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <p className="text-xs text-gray-300 self-start pt-1">
//             {d?.user?.email || userData?.email}
//           </p>
//         </div>

//         {/* ── STAT NUMBERS ─────────────────────────────────────── */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-100">
//           {[
//             { label: 'Total sessions',  value: stats.totalSessions  || 0, color: 'text-[#0098cc]'  },
//             { label: 'Active mentors',  value: stats.activeMentors  || 0, color: 'text-blue-400'   },
//             { label: 'Upcoming',        value: upcomingSessions.length,   color: 'text-amber-400'  },
//             { label: 'Monthly growth',  value: `${stats.monthlyGrowth?.sessions ?? 0}%`, color: 'text-blue-300' },
//           ].map(({ label, value, color }, i) => (
//             <div
//               key={label}
//               className={`py-7 text-center
//                 ${i < 3 ? 'border-r border-gray-100' : ''}
//                 ${i >= 2 ? 'border-t border-gray-100 sm:border-t-0' : ''}
//               `}
//             >
//               <p className={`text-4xl font-medium ${color}`}>{value}</p>
//               <p className="text-xs text-gray-400 mt-1.5">{label}</p>
//             </div>
//           ))}
//         </div>

//         {/* ── THREE COLUMNS ────────────────────────────────────── */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-0 border-b border-gray-100">

//           {/* LEFT — calendar + profile ────────────────────────── */}
//           <div className="py-6 lg:pr-8 lg:border-r border-gray-100 border-b lg:border-b-0">

//             {/* calendar */}
//             <MiniCalendar sessions={upcomingSessions} />

//             {/* profile */}
//             <div className="pt-5">
//               <SectionLabel>Profile</SectionLabel>
//               <DataRow label="Name"     value={d?.user?.name || userData?.name} />
//               <DataRow label="Email"    value={d?.user?.email || userData?.email} />
//               <DataRow label="Phone"    value={d?.user?.phone || null} />
//               <DataRow
//                 label="Location"
//                 value={d?.user?.city ? `${d.user.city}, ${d.user.country}` : null}
//               />
//               <div className="pt-4">
//                 <button
//                   onClick={() => navigate('/mentee/profile')}
//                   className="text-xs text-[#0098cc] hover:underline"
//                 >
//                   View full profile →
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* CENTER — upcoming sessions ───────────────────────── */}
//           <div className="py-6 lg:px-8 lg:border-r border-gray-100 border-b lg:border-b-0">
//             <SectionLabel>Upcoming sessions</SectionLabel>

//             {upcomingSessions.length > 0 ? (
//               <div>
//                 {upcomingSessions.map((s) => (
//                   <SessionRow key={s.id || s._id} session={s} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center py-10 gap-2 text-center">
//                 <Calendar size={24} className="text-gray-200" />
//                 <p className="text-sm text-gray-400">No upcoming sessions</p>
//                 <p className="text-xs text-gray-300">Book a session to get started</p>
//               </div>
//             )}
//           </div>

//           {/* RIGHT — recent activity ──────────────────────────── */}
//           <div className="py-6 lg:pl-8">
//             <SectionLabel>Recent activity</SectionLabel>

//             {recentActivity.length > 0 ? (
//               <div>
//                 {recentActivity.slice(0, 8).map((a, i) => (
//                   <ActivityRow key={i} item={a} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center py-10 gap-2 text-center">
//                 <TrendingUp size={24} className="text-gray-200" />
//                 <p className="text-sm text-gray-400">No recent activity</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── OVERVIEW STRIP ───────────────────────────────────── */}
//         <div className="pt-6">
//           <SectionLabel>Overview</SectionLabel>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
//             {[
//               {
//                 label: 'Active mentors',
//                 value: stats.activeMentors || 0,
//                 sub: `${d?.mentors?.length || 0} available`,
//                 color: 'text-blue-400',
//               },
//               {
//                 label: 'Upcoming sessions',
//                 value: upcomingSessions.length,
//                 sub: 'sessions booked',
//                 color: 'text-[#0098cc]',
//               },
//               {
//                 label: 'Monthly growth',
//                 value: `${stats.monthlyGrowth?.sessions ?? 0}%`,
//                 sub: 'vs last month',
//                 color: 'text-blue-300',
//               },
//             ].map(({ label, value, sub, color }, i) => (
//               <div
//                 key={label}
//                 className={`py-5 ${i < 2 ? 'sm:border-r border-gray-100' : ''} ${i > 0 ? 'sm:pl-8' : ''} border-b sm:border-b-0 border-gray-100 last:border-b-0`}
//               >
//                 <p className={`text-3xl font-medium ${color}`}>{value}</p>
//                 <p className="text-sm text-gray-600 mt-1">{label}</p>
//                 <p className="text-xs text-gray-300 mt-0.5">{sub}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DashboardSection;

import React, { useState } from 'react';
import {
  TrendingUp, Calendar, AlertCircle,
  ChevronLeft, ChevronRight, Wifi
} from 'lucide-react';
import { useGetMenteeDashboardQuery } from './dashboardsecapislice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../global/Loader';

/* ── Helpers ─────────────────────────────────────────────────── */
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

/* ── Shared primitives ───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">
    {children}
  </p>
);

const Pill = ({ children, cls }) => (
  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${cls}`}>
    {children}
  </span>
);

const DataRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-xs font-medium text-gray-700 text-right max-w-[60%] truncate">
      {value || '—'}
    </span>
  </div>
);

/* ── Mini calendar ───────────────────────────────────────────── */
const MiniCalendar = ({ sessions }) => {
  const [calMonth, setCalMonth] = useState(new Date());
  const year = calMonth.getFullYear();
  const month = calMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = calMonth.toLocaleString('default', { month: 'long' });
  const calDays = Array.from({ length: firstDay }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const sessionDays = new Set(
    (sessions || []).map(s => {
      const d = new Date(s.date);
      return d.getMonth() === month && d.getFullYear() === year ? d.getDate() : null;
    }).filter(Boolean)
  );

  const todayDate = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  return (
    <div className="py-4 border-b border-gray-100">
      <SectionLabel>Calendar</SectionLabel>

      {/* nav */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-700">{monthName} {year}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setCalMonth(new Date(year, month - 1, 1))}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={11} className="text-gray-400" />
          </button>
          <button
            onClick={() => setCalMonth(new Date(year, month + 1, 1))}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={11} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* day headers */}
      <div className="grid grid-cols-7 text-center mb-0.5">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-[10px] text-gray-300 py-0.5">{d}</div>
        ))}
      </div>

      {/* day cells */}
      <div className="grid grid-cols-7 text-center gap-y-0.5">
        {calDays.map((day, i) => (
          <div
            key={i}
            className={`text-[11px] w-6 h-6 flex items-center justify-center mx-auto rounded-full transition-colors
              ${!day ? '' :
                isCurrentMonth && day === todayDate
                  ? 'bg-[#0098cc] text-white font-medium'
                  : sessionDays.has(day)
                    ? 'bg-blue-100 text-blue-600 font-medium cursor-pointer'
                    : 'text-gray-500 hover:bg-gray-100 cursor-pointer'
              }`}
          >
            {day || ''}
          </div>
        ))}
      </div>

      {/* legend */}
      <div className="flex gap-3 mt-2.5 pt-2.5 border-t border-gray-100">
        {[
          { color: 'bg-[#0098cc]', label: 'Today' },
          { color: 'bg-blue-400', label: 'Session' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
            <span className="text-[10px] text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Session row ─────────────────────────────────────────────── */
const SessionRow = ({ session }) => (
  <div className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
    {/* avatar */}
    <div className="w-7 h-7 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0 mt-0.5">
      <span className="text-[#0098cc] text-[11px] font-medium">
        {session.mentorInitials || getInitials(session.mentorName)}
      </span>
    </div>

    {/* body */}
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-800 truncate leading-tight">{session.title}</p>
      <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
        {session.mentorName && <>{session.mentorName}<span className="mx-1 text-gray-300">·</span></>}
        {formatDate(session.date)}
        <span className="mx-1 text-gray-300">·</span>
        {session.time}
      </p>
    </div>

    {/* right */}
    <div className="flex flex-col items-end gap-1 shrink-0">
      {session.status && (
        <Pill cls="bg-[#0098cc]/10 text-[#0098cc]">{session.status}</Pill>
      )}
      {session.meetingLink && (
        <a
          href={session.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-[11px] text-[#0098cc] hover:underline"
        >
          <Wifi size={9} /> Join
        </a>
      )}
    </div>
  </div>
);

/* ── Activity row ────────────────────────────────────────────── */
const ActivityRow = ({ item }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2.5 min-w-0">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.status === 'completed' ? 'bg-blue-400' :
        item.status === 'confirmed' ? 'bg-[#0098cc]' : 'bg-gray-300'
        }`} />
      <p className="text-xs text-gray-600 truncate">{item.action}</p>
    </div>
    <p className="text-[11px] text-gray-300 shrink-0 ml-2">{formatTimeAgo(item.timestamp)}</p>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════ */
const DashboardSection = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userId = userData?._id;
  const navigate = useNavigate();
  const now = new Date();

  const { data: dashboardResponse, isLoading, isError } = useGetMenteeDashboardQuery(userId, {
    skip: !userId,
  });
  const d = dashboardResponse?.data || {};

  const userName = d?.user?.name || userData?.name || 'User';
  const initials = getInitials(userName);
  const upcomingSessions = d?.upcomingSessions || [];
  const recentActivity = d?.recentActivity || [];
  const stats = d?.stats || {};

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Loader />
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <AlertCircle size={28} className="text-red-400/50 mx-auto mb-1.5" />
        <p className="text-[11px] text-gray-400">Failed to load dashboard</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 pb-5 border-b border-gray-100 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0098cc]/10 flex items-center justify-center text-[#0098cc] font-medium text-sm shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-base font-medium text-gray-900 leading-tight">
                Welcome back, {userName}
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                <span className="mx-1.5 text-gray-200">·</span>
                {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                {d?.user?.role && (
                  <Pill cls="bg-[#0098cc]/10 text-[#0098cc] capitalize">{d.user.role}</Pill>
                )}
                {!d?.profileCompleted && (
                  <button
                    onClick={() => navigate('/mentee/profile')}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-500 hover:bg-amber-100 transition-colors"
                  >
                    Complete profile →
                  </button>
                )}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-gray-300 self-start pt-0.5">
            {d?.user?.email || userData?.email}
          </p>
        </div>

        {/* ── STAT NUMBERS ─────────────────────────────────────── */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-100">
          {[
            { label: 'Total sessions', value: stats.totalSessions || 0, color: 'text-[#0098cc]' },
            { label: 'Active mentors', value: stats.activeMentors || 0, color: 'text-blue-400' },
            { label: 'Upcoming', value: upcomingSessions.length, color: 'text-amber-400' },
            { label: 'Monthly growth', value: `${stats.monthlyGrowth?.sessions ?? 0}%`, color: 'text-blue-300' },
          ].map(({ label, value, color }, i) => (
            <div
              key={label}
              className={`py-5 text-center
                ${i < 3 ? 'border-r border-gray-100' : ''}
                ${i >= 2 ? 'border-t border-gray-100 sm:border-t-0' : ''}
              `}
            >
              <p className={`text-3xl font-medium ${color}`}>{value}</p>
              <p className="text-[11px] text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div> */}

        {/* ── THREE COLUMNS ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-0 border-b border-gray-100">

          {/* LEFT — calendar + profile ────────────────────────── */}
          <div className="py-5 lg:pr-6 lg:border-r border-gray-100 border-b lg:border-b-0">

            {/* calendar */}
            <MiniCalendar sessions={upcomingSessions} />

            {/* profile */}
            <div className="pt-4">
              <SectionLabel>Profile</SectionLabel>
              <DataRow label="Name" value={d?.user?.name || userData?.name} />
              <DataRow label="Email" value={d?.user?.email || userData?.email} />
              <DataRow label="Phone" value={d?.user?.phone || null} />
              <DataRow
                label="Location"
                value={d?.user?.city ? `${d.user.city}, ${d.user.country}` : null}
              />
              <div className="pt-3">
                <button
                  onClick={() => navigate('/mentee/profile')}
                  className="text-[11px] text-[#0098cc] hover:underline"
                >
                  View full profile →
                </button>
              </div>
            </div>
          </div>

          {/* CENTER — upcoming sessions ───────────────────────── */}
          <div className="py-5 lg:px-6 lg:border-r border-gray-100 border-b lg:border-b-0">
            <SectionLabel>Upcoming sessions</SectionLabel>

            {upcomingSessions.length > 0 ? (
              <div>
                {upcomingSessions.map((s) => (
                  <SessionRow key={s.id || s._id} session={s} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 gap-1.5 text-center">
                <Calendar size={20} className="text-gray-200" />
                <p className="text-xs text-gray-400">No upcoming sessions</p>
                <p className="text-[11px] text-gray-300">Book a session to get started</p>
              </div>
            )}
          </div>

          {/* RIGHT — recent activity ──────────────────────────── */}
          <div className="py-5 lg:pl-6">
            <SectionLabel>Recent activity</SectionLabel>

            {recentActivity.length > 0 ? (
              <div>
                {recentActivity.slice(0, 8).map((a, i) => (
                  <ActivityRow key={i} item={a} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 gap-1.5 text-center">
                <TrendingUp size={20} className="text-gray-200" />
                <p className="text-xs text-gray-400">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* ── OVERVIEW STRIP ───────────────────────────────────── */}
        <div className="pt-5">
          <SectionLabel>Overview</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              {
                label: 'Active mentors',
                value: stats.activeMentors || 0,
                sub: `${d?.mentors?.length || 0} available`,
                color: 'text-blue-400',
              },
              {
                label: 'Upcoming sessions',
                value: upcomingSessions.length,
                sub: 'sessions booked',
                color: 'text-[#0098cc]',
              },
              {
                label: 'Monthly growth',
                value: `${stats.monthlyGrowth?.sessions ?? 0}%`,
                sub: 'vs last month',
                color: 'text-blue-300',
              },
            ].map(({ label, value, sub, color }, i) => (
              <div
                key={label}
                className={`py-4 ${i < 2 ? 'sm:border-r border-gray-100' : ''} ${i > 0 ? 'sm:pl-6' : ''} border-b sm:border-b-0 border-gray-100 last:border-b-0`}
              >
                <p className={`text-2xl font-medium ${color}`}>{value}</p>
                <p className="text-xs text-gray-600 mt-0.5">{label}</p>
                <p className="text-[11px] text-gray-300 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardSection;