


// import React, { useState, useEffect } from 'react';
// import {
//   ChevronDown, ChevronUp, WifiOff, Wifi, ExternalLink, Loader2, CircleAlert, UserRound
// } from 'lucide-react';
// import { useGetUserDetailsQuery, useGetMentorSessionBookingsQuery } from './MentorDashboardapislice';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../global/Loader';

// const C = {
//   primary: '#0098cc',
//   btn: '#1a1a2e',
//   bg: '#ffffff',
//   surface: '#f8f9fb',
//   border: '#e8eaed',
//   borderLight: '#f0f1f3',
//   textDark: '#111318',
//   textMid: '#6b7280',
//   textLight: '#9ca3af',
//   success: '#10b981',
//   warning: '#f59e0b',
//   error: '#ef4444',
// };

// const STATUS = {
//   confirmed: { bg: '#ecfdf5', text: '#059669', dot: '#10b981' },
//   completed:  { bg: '#eff6ff', text: '#2563eb', dot: '#3b82f6' },
//   cancelled:  { bg: '#fff1f2', text: '#e11d48', dot: '#ef4444' },
//   pending:    { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
// };

// export default function MentorDashboard() {
//   const navigate = useNavigate();
//   const [mentorId, setMentorId] = useState(null);
//   const [mentorEmail, setMentorEmail] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [expanded, setExpanded] = useState(null);

//   useEffect(() => {
//     try {
//       const u = JSON.parse(localStorage.getItem('userData') || '{}');
//       setMentorId(u?._id);
//       setMentorEmail(u?.email);
//     } catch (e) { console.error(e); }
//   }, []);

//   const { data: userDetails, isLoading: detailsLoading, isError: detailsError, error } =
//     useGetUserDetailsQuery(mentorId, { skip: !mentorId });
//   const { data: sessionData, isLoading: sessionsLoading } =
//     useGetMentorSessionBookingsQuery(mentorEmail, { skip: !mentorEmail });

//   const user = userDetails?.data;
//   const stats = sessionData?.data?.stats || {};
//   const bookings = sessionData?.data?.bookings || [];

//   useEffect(() => {
//     if (user?.mentorId) {
//       try { localStorage.setItem('mentorId', user.mentorId); } catch (e) { console.error(e); }
//     }
//   }, [user]);

//   const today = new Date(); today.setHours(0, 0, 0, 0);
//   const upcoming = bookings.filter(b => b.status === 'confirmed' && new Date(b.sessionDate) >= today).length;
//   const total = stats.total || 0;
//   const completed = stats.completed || 0;
//   const cancelled = stats.cancelled || 0;
//   const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
//   const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

//   const fmt = (d, short) => !d ? '—' : new Date(d).toLocaleDateString('en-US',
//     short
//       ? { month: 'short', day: 'numeric', year: 'numeric' }
//       : { year: 'numeric', month: 'long', day: 'numeric' }
//   );

//   if (detailsLoading) return (
//     <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen">
//       <Loader />
//     </div>
//   );

//   if (detailsError) return (
//     <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen p-4">
//       <div className="text-center">
//         <CircleAlert size={36} style={{ color: C.error }} className="mx-auto mb-3 opacity-60" />
//         <p style={{ color: C.textLight }}>{error?.data?.message || 'Failed to load dashboard'}</p>
//       </div>
//     </div>
//   );

//   if (!user) return (
//     <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <UserRound size={36} style={{ color: C.textLight }} className="mx-auto mb-3 opacity-50" />
//         <p style={{ color: C.textLight }}>No user data found</p>
//       </div>
//     </div>
//   );

//   const initials = (user?.name || 'M').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

//   const filterOptions = [
//     { key: 'all',       label: `All`,        count: total },
//     { key: 'confirmed', label: 'Confirmed',  count: stats.confirmed || 0 },
//     { key: 'completed', label: 'Completed',  count: stats.completed || 0 },
//     { key: 'pending',   label: 'Pending',    count: stats.pending || 0 },
//     { key: 'cancelled', label: 'Cancelled',  count: stats.cancelled || 0 },
//   ];

//   return (
//     <div style={{ background: C.bg, minHeight: '100%', fontFamily: "'DM Sans', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
//         * { box-sizing: border-box; }
//         .hover-row:hover { background: #f8f9fb !important; }
//         .hover-btn:hover { opacity: 0.8; }
//         .hover-link:hover { opacity: 0.7; }
//         .filter-btn:hover { background: #f0f8fc !important; color: #0098cc !important; }
//       `}</style>

//       <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

//         {/* ── HEADER ── */}
//         <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 28, marginBottom: 32 }}>
//           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//               <div style={{
//                 width: 52, height: 52, borderRadius: '50%',
//                 background: `${C.primary}15`, color: C.primary,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontWeight: 700, fontSize: 18, fontFamily: "'DM Mono', monospace", flexShrink: 0,
//                 border: `2px solid ${C.primary}25`,
//               }}>
//                 {initials}
//               </div>
//               <div>
//                 <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textDark, letterSpacing: '-0.4px' }}>
//                   {user?.name || 'Mentor'}
//                 </h1>
//                 <p style={{ margin: '3px 0 0', fontSize: 13, color: C.textMid }}>
//                   {user?.email}
//                   {user?.phone && <span style={{ color: C.textLight, margin: '0 6px' }}>·</span>}
//                   {user?.phone && `+${user.countryCode} ${user.phone}`}
//                 </p>
//                 <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
//                   {user?.isVerified && (
//                     <span style={{ background: '#ecfdf5', color: '#059669', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
//                       ✓ Verified
//                     </span>
//                   )}
//                   {user?.isActive && (
//                     <span style={{ background: '#ecfdf5', color: '#059669', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
//                       ● Active
//                     </span>
//                   )}
//                   {user?.city && (
//                     <span style={{ background: `${C.primary}12`, color: C.primary, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
//                       📍 {user.city}{user.country ? `, ${user.country}` : ''}
//                     </span>
//                   )}
//                   {user?.username && (
//                     <span style={{ background: C.surface, color: C.textMid, fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20, border: `1px solid ${C.border}` }}>
//                       @{user.username}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <span style={{ fontSize: 12, color: C.textLight, paddingTop: 4 }}>
//               Member since {fmt(user?.createdAt)}
//             </span>
//           </div>
//         </div>

//         {/* ── STATS GRID ── */}
//         <div style={{
//           display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
//           border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 28
//         }}>
//           {[
//             { label: 'Total Sessions', value: sessionsLoading ? '—' : total, color: C.primary },
//             { label: 'Upcoming',       value: sessionsLoading ? '—' : upcoming, color: C.warning },
//             { label: 'Completed',      value: sessionsLoading ? '—' : completed, color: C.success },
//             { label: 'Cancelled',      value: sessionsLoading ? '—' : cancelled, color: C.error },
//           ].map(({ label, value, color }, i) => (
//             <div key={label} style={{
//               padding: '24px 16px', textAlign: 'center',
//               borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
//               background: C.bg,
//             }}>
//               <p style={{ margin: 0, fontSize: 34, fontWeight: 700, color, fontFamily: "'DM Mono', monospace", letterSpacing: '-1px' }}>
//                 {value}
//               </p>
//               <p style={{ margin: '6px 0 0', fontSize: 11, color: C.textLight, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                 {label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* ── COMPLETION RATE ── */}
//         <div style={{ marginBottom: 32 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//             <span style={{ fontSize: 12, color: C.textMid, fontWeight: 500 }}>Session Completion Rate</span>
//             <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, fontFamily: "'DM Mono', monospace" }}>
//               {completionRate}%
//             </span>
//           </div>
//           <div style={{ height: 4, borderRadius: 4, background: C.border, overflow: 'hidden' }}>
//             <div style={{ height: '100%', width: `${completionRate}%`, background: C.primary, borderRadius: 4, transition: 'width 0.8s ease' }} />
//           </div>
//         </div>

//         {/* ── PROFILE + ACCOUNT ── */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 40 }}>
//           {/* Profile */}
//           <div style={{ padding: '24px 28px', borderRight: `1px solid ${C.border}` }}>
//             <p style={{ margin: '0 0 16px', fontSize: 10, fontWeight: 700, color: C.textLight, textTransform: 'uppercase', letterSpacing: '1px' }}>
//               Profile Info
//             </p>
//             {[
//               ['Full Name', user?.name],
//               ['Username',  user?.username ? `@${user.username}` : null],
//               ['Email',     user?.email],
//               ['Phone',     user?.phone ? `+${user.countryCode} ${user.phone}` : null],
//             ].map(([label, value]) => (
//               <div key={label} style={{ padding: '12px 0', borderBottom: `1px solid ${C.borderLight}` }}>
//                 <p style={{ margin: 0, fontSize: 11, color: C.textLight }}>{label}</p>
//                 <p style={{ margin: '3px 0 0', fontSize: 13, fontWeight: 600, color: C.textDark }}>{value || '—'}</p>
//               </div>
//             ))}
//           </div>

//           {/* Account */}
//           <div style={{ padding: '24px 28px' }}>
//             <p style={{ margin: '0 0 16px', fontSize: 10, fontWeight: 700, color: C.textLight, textTransform: 'uppercase', letterSpacing: '1px' }}>
//               Account Status
//             </p>
//             {[
//               ['Created',      fmt(user?.createdAt), null],
//               ['Last Updated', fmt(user?.updatedAt), null],
//               ['Status',       user?.isActive ? 'Active' : 'Inactive', user?.isActive ? C.success : C.error],
//               ['Verification', user?.isVerified ? 'Verified' : 'Pending', user?.isVerified ? C.success : C.warning],
//             ].map(([label, value, color]) => (
//               <div key={label} style={{ padding: '12px 0', borderBottom: `1px solid ${C.borderLight}` }}>
//                 <p style={{ margin: 0, fontSize: 11, color: C.textLight }}>{label}</p>
//                 <p style={{ margin: '3px 0 0', fontSize: 13, fontWeight: 600, color: color || C.textDark }}>{value}</p>
//               </div>
//             ))}
//             <button
//               onClick={() => navigate('/mentor-profile')}
//               className="hover-link"
//               style={{
//                 marginTop: 14, background: 'none', border: 'none', padding: 0,
//                 cursor: 'pointer', fontSize: 12, fontWeight: 600, color: C.primary,
//                 display: 'inline-flex', alignItems: 'center', gap: 4,
//               }}
//             >
//               View full profile →
//             </button>
//           </div>
//         </div>

//         {/* ── SESSIONS ── */}
//         <div>
//           <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: C.textDark, letterSpacing: '-0.3px' }}>
//             Session Bookings
//           </h2>

//           {/* Filters */}
//           <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
//             {filterOptions.map(({ key, label, count }) => {
//               const active = filter === key;
//               return (
//                 <button
//                   key={key}
//                   onClick={() => setFilter(key)}
//                   className={active ? '' : 'filter-btn'}
//                   style={{
//                     padding: '6px 14px', borderRadius: 8, border: `1px solid ${active ? C.primary : C.border}`,
//                     background: active ? C.btn : C.bg, color: active ? '#fff' : C.textMid,
//                     fontSize: 12, fontWeight: 600, cursor: 'pointer',
//                     display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'all 0.15s',
//                   }}
//                 >
//                   {label}
//                   <span style={{
//                     fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10,
//                     background: active ? 'rgba(255,255,255,0.2)' : C.surface,
//                     color: active ? '#fff' : C.textLight,
//                     fontFamily: "'DM Mono', monospace",
//                   }}>
//                     {count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* List */}
//           {sessionsLoading ? (
//             <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
//               <Loader2 size={22} style={{ color: C.textLight }} className="animate-spin" />
//             </div>
//           ) : filtered.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: '48px 0', color: C.textLight }}>
//               <WifiOff size={26} style={{ margin: '0 auto 10px', opacity: 0.4, display: 'block' }} />
//               <p style={{ margin: 0, fontSize: 13 }}>No sessions found</p>
//             </div>
//           ) : (
//             <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
//               {filtered.map((b, idx) => {
//                 const isOpen = expanded === b._id;
//                 const sc = STATUS[b.status] || STATUS.pending;
//                 return (
//                   <div key={b._id} style={{ borderBottom: idx < filtered.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
//                     {/* Row */}
//                     <div
//                       onClick={() => setExpanded(isOpen ? null : b._id)}
//                       className="hover-row"
//                       style={{
//                         display: 'flex', alignItems: 'center', gap: 12,
//                         padding: '14px 20px', cursor: 'pointer', transition: 'background 0.12s',
//                         background: isOpen ? '#f5fbfe' : C.bg,
//                       }}
//                     >
//                       {/* Status dot */}
//                       <div style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, flexShrink: 0 }} />

//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.textDark }}>
//                           {b.topic || 'Session'}
//                         </p>
//                         <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textMid }}>
//                           {b.menteeName}
//                           <span style={{ color: C.textLight, margin: '0 5px' }}>·</span>
//                           {fmt(b.sessionDate, true)}
//                           <span style={{ color: C.textLight, margin: '0 5px' }}>·</span>
//                           {b.startTime}
//                           <span style={{ color: C.textLight, margin: '0 5px' }}>·</span>
//                           {b.durationMinutes} min
//                         </p>
//                       </div>

//                       <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//                         <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 6, background: sc.bg, color: sc.text }}>
//                           {b.status}
//                         </span>
//                         <span style={{
//                           fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 6,
//                           background: b.isFreeSession ? `${C.primary}12` : '#ecfdf5',
//                           color: b.isFreeSession ? C.primary : C.success,
//                         }}>
//                           {b.isFreeSession ? 'Free' : `₹${b.price}`}
//                         </span>
//                         <span style={{ color: C.textLight }}>
//                           {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Expanded */}
//                     {isOpen && (
//                       <div style={{ padding: '16px 20px 20px', background: '#f8fbfd', borderTop: `1px solid ${C.borderLight}` }}>
//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 20px' }}>
//                           {[
//                             ['Duration',       `${b.durationMinutes} min`],
//                             ['Type',           b.sessionType],
//                             ['Email',          b.menteeEmail],
//                             ['Payment Status', b.paymentStatus],
//                             ['Method',         b.paymentMethod],
//                             ['Transaction ID', b.transactionId],
//                           ].map(([label, val]) => (
//                             <div key={label}>
//                               <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                                 {label}
//                               </p>
//                               <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textMid, fontFamily: label === 'Transaction ID' ? "'DM Mono', monospace" : 'inherit', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                                 {val || '—'}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                         {b.meetingLink && (
//                           <a
//                             href={b.meetingLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="hover-link"
//                             style={{
//                               marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 5,
//                               fontSize: 12, fontWeight: 600, color: C.primary, textDecoration: 'none',
//                               padding: '6px 14px', border: `1px solid ${C.primary}30`,
//                               borderRadius: 8, background: `${C.primary}08`,
//                             }}
//                           >
//                             <Wifi size={12} /> Join meeting <ExternalLink size={11} />
//                           </a>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import {
  ChevronRight, WifiOff,   
  CalendarDays,
  CheckCircle,Loader2, CircleAlert, UserRound, TrendingUp, BarChart3, Activity
} from 'lucide-react';
import { useGetUserDetailsQuery, useGetMentorSessionBookingsQuery } from './MentorDashboardapislice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../global/Loader';

const C = {
  primary: '#0098cc',
  btn: '#1a1a2e',
  bg: '#ffffff',
  surface: '#f8f9fb',
  border: '#e8eaed',
  borderLight: '#f0f1f3',
  textDark: '#111318',
  textMid: '#6b7280',
  textLight: '#9ca3af',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

const STATUS = {
  confirmed: { bg: '#ecfdf5', text: '#059669', dot: '#10b981' },
  completed: { bg: '#eff6ff', text: '#2563eb', dot: '#3b82f6' },
  cancelled: { bg: '#fff1f2', text: '#e11d48', dot: '#ef4444' },
  pending: { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
};

// Simple Line Chart Component
const LineChart = () => {
  return (
    <svg viewBox="0 0 200 80" style={{ width: '100%', height: 80 }}>
      <polyline
        points="10,60 30,45 50,50 70,30 90,40 110,25 130,35 150,20 170,30 190,15"
        fill="none"
        stroke={C.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Simple Bar Chart Component
const BarChart = ({ dataPoints = [6, 8, 5, 7, 9, 6, 8] }) => {
  const maxValue = 10;
  const barWidth = 24;
  const spacing = 4;

  return (
    <svg viewBox="0 0 180 80" style={{ width: '100%', height: 60 }}>
      {dataPoints.map((value, idx) => {
        const x = idx * (barWidth + spacing) + 10;
        const height = (value / maxValue) * 60;
        const y = 70 - height;

        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            fill={idx % 2 === 0 ? C.primary : `${C.primary}40`}
            rx="2"
          />
        );
      })}
    </svg>
  );
};

export default function MentorDashboard() {
  const navigate = useNavigate();
  const [mentorId, setMentorId] = useState(null);
  const [mentorEmail, setMentorEmail] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('userData') || '{}');
      setMentorId(u?._id);
      setMentorEmail(u?.email);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const { data: userDetails, isLoading: detailsLoading, isError: detailsError, error } =
    useGetUserDetailsQuery(mentorId, { skip: !mentorId });
  const { data: sessionData, isLoading: sessionsLoading } =
    useGetMentorSessionBookingsQuery(mentorEmail, { skip: !mentorEmail });

  const user = userDetails?.data;
  const stats = sessionData?.data?.stats || {};
  const bookings = sessionData?.data?.bookings || [];

  useEffect(() => {
    if (user?.mentorId) {
      try {
        localStorage.setItem('mentorId', user.mentorId);
      } catch (e) {
        console.error(e);
      }
    }
  }, [user]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = bookings.filter(b => b.status === 'confirmed' && new Date(b.sessionDate) >= today).length;
  const total = stats.total || 0;
  const completed = stats.completed || 0;
  const cancelled = stats.cancelled || 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const fmt = (d, short) =>
    !d
      ? '—'
      : new Date(d).toLocaleDateString('en-US', short ? { month: 'short', day: 'numeric', year: 'numeric' } : { year: 'numeric', month: 'long', day: 'numeric' });

  if (detailsLoading)
    return (
      <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );

  if (detailsError)
    return (
      <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <CircleAlert size={36} style={{ color: C.error }} className="mx-auto mb-3 opacity-60" />
          <p style={{ color: C.textLight }}>{error?.data?.message || 'Failed to load dashboard'}</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <UserRound size={36} style={{ color: C.textLight }} className="mx-auto mb-3 opacity-50" />
          <p style={{ color: C.textLight }}>No user data found</p>
        </div>
      </div>
    );

  const initials = (user?.name || 'M')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-2px); }
        .session-row:hover { background: #ffffff !important; }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* ── HEADER ── */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize:18, fontWeight: 700, color: C.textDark, letterSpacing: '-0.5px' }}>
            Mentor Dashboard
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textLight }}>
            {todayDate}
          </p>
        </div>

        {/* ── TOP STATS CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            {
              label: "Total Sessions",
              value: sessionsLoading ? "—" : total,
              unit: "",
              icon: <BarChart3 size={20} />,
            },
            {
              label: "Upcoming",
              value: sessionsLoading ? "—" : upcoming,
              unit: "",
              icon: <CalendarDays size={20} />,
            },
            {
              label: "Completion Rate",
              value: `${completionRate}%`,
              unit: "",
              icon: <CheckCircle size={20} />,
            },
          ].map(({ label, value, unit, icon }, i) => (
            <div
              key={label}
              className="stat-card"
              style={{
                background: '#ffffff',
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div className="stat-icon" style={{ color: '#fff', fontSize: 20 }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 11, color: C.textLight, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {label}
                </p>
                <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 700, color: C.textDark, fontFamily: "'DM Mono', monospace", letterSpacing: '-1px' }}>
                  {value}
                  <span style={{ fontSize: 14, color: C.textMid, fontWeight: 500, marginLeft: 4 }}>
                    {unit}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CHARTS SECTION ── */}
        {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textDark }}>
                Activity Hours
              </h3>
              <select
                style={{
                  fontSize: 12,
                  border: `1px solid ${C.border}`,
                  borderRadius: 6,
                  padding: '4px 8px',
                  background: '#ffffff',
                  color: C.textMid,
                  cursor: 'pointer',
                }}
              >
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
            <div style={{ height: 100 }}>
              <BarChart dataPoints={[6, 8, 5, 7, 9, 6, 8]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                <span key={day} style={{ fontSize: 11, color: C.textLight, fontWeight: 500 }}>
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '24px',
            }}
          >
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: C.textDark }}>
              Performance
            </h3>
            <div style={{ marginBottom: 24 }}>
              <LineChart />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Time spent', value: 28, unit: 'hrs', color: '#3b82f6' },
                { label: 'Session taken', value: 50, unit: 'hrs', color: '#10b981' },
                { label: 'Events passed', value: 10, unit: 'hrs', color: '#f59e0b' },
              ].map(({ label, value, unit, color }) => (
                <div
                  key={label}
                  style={{
                    padding: '12px',
                    background: '#f8f9fb',
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 12, color: C.textLight, fontWeight: 500 }}>
                    {label}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 700, color }}>
                    {value} <span style={{ fontSize: 11, color: C.textMid }}>{unit}</span>
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '12px', background: '#f8f9fb', borderRadius: 8, textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 12, color: C.textMid }}>
                Your productivity is <strong style={{ color: C.success }}>30%</strong> higher compared to last month
              </p>
            </div>
          </div>
        </div> */}

        {/* ── SESSIONS & PROFILE ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Session Bookings */}
          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '24px', borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textDark }}>
                Session Bookings
              </h3>
            </div>

            {sessionsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                <Loader2 size={22} style={{ color: C.textLight }} className="animate-spin" />
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', color: C.textLight }}>
                <WifiOff size={26} style={{ margin: '0 auto 10px', opacity: 0.4, display: 'block' }} />
                <p style={{ margin: 0, fontSize: 13 }}>No sessions found</p>
              </div>
            ) : (
              <div>
                {bookings.slice(0, 5).map((b, idx) => {
                  const sc = STATUS[b.status] || STATUS.pending;
                  return (
                    <div
                      key={b._id}
                      className="session-row"
                      onClick={() => navigate(`/session/${b._id}`)}
                      style={{
                        padding: '16px 24px',
                        borderBottom: idx < Math.min(4, bookings.length - 1) ? `1px solid ${C.borderLight}` : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.12s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#ffffff',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.textDark }}>
                          {b.topic || 'Session'}
                        </p>
                        <p style={{ margin: '3px 0 0', fontSize: 11, color: C.textMid }}>
                          {b.menteeName}
                          <span style={{ color: C.textLight, margin: '0 5px' }}>·</span>
                          {fmt(b.sessionDate, true)}
                        </p>
                      </div>
                      <ChevronRight size={16} style={{ color: C.textLight, flexShrink: 0, marginLeft: 12 }} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '24px', borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textDark }}>
                Profile Info
              </h3>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: `${C.primary}15`,
                    color: C.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: "'DM Mono', monospace",
                    border: `2px solid ${C.primary}25`,
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.textDark }}>
                    {user?.name || 'Mentor'}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: C.textMid }}>
                    {user?.email}
                  </p>
                  {user?.isActive && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.success, marginTop: 6, display: 'inline-block' }}>
                      ● Active
                    </span>
                  )}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 16 }}>
                {[
                  ['Member Since', fmt(user?.createdAt)],
                  ['Phone', user?.phone ? `+${user.countryCode} ${user.phone}` : '—'],
                  // ['Location', user?.city ? `${user.city}${user.country ? `, ${user.country}` : ''}` : '—'],
                  // ['Status', user?.isVerified ? '✓ Verified' : 'Pending'],
                ].map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <p style={{ margin: 0, fontSize: 10, color: C.textLight, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {label}
                    </p>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textDark, fontWeight: 600 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/mentor-profile')}
                style={{
                  marginTop: 16,
                  width: '100%',
                  padding: '10px 14px',
                  background: C.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={e => (e.target.style.opacity = '0.9')}
                onMouseOut={e => (e.target.style.opacity = '1')}
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





