// import React, { useState, useEffect } from 'react';
// import {
//   TrendingUp, Users, Calendar, Star, MapPin, Phone,
//   Mail, UserRound, BadgeCheck, CircleAlert, Loader2,
//   Copy, Check, CheckCircle2, Video, Clock, IndianRupee,
//   ExternalLink, ChevronDown, ChevronUp, Wifi, WifiOff
// } from 'lucide-react';
// import { useGetUserDetailsQuery, useGetMentorSessionBookingsQuery } from './MentorDashboardapislice';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../global/Loader';

// // ── Helpers ───────────────────────────────────────────────────
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   return new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'long', day: 'numeric',
//   });
// };

// const formatShortDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   return new Date(dateString).toLocaleDateString('en-US', {
//     month: 'short', day: 'numeric', year: 'numeric',
//   });
// };

// const statusConfig = {
//   confirmed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Confirmed' },
//   completed: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400', label: 'Completed' },
//   cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400', label: 'Cancelled' },
//   pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', label: 'Pending' },
// };

// // ── Stat Card ─────────────────────────────────────────────────
// const StatCard = ({ label, value, icon: Icon, iconColor, sub, subColor }) => (
//   <div className="bg-[#062117] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start justify-between transition-shadow">
//     <div className="flex flex-col gap-1 min-w-0 flex-1 pr-3">
//       <span className="text-white/50 text-xs sm:text-sm font-medium">{label}</span>
//       <span className="text-white text-2xl sm:text-3xl font-bold mt-1 tracking-tight truncate">{value}</span>
//       {sub && <span className={`text-xs mt-1 font-medium ${subColor || 'text-white/40'}`}>{sub}</span>}
//     </div>
//     <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
//       <Icon size={20} className={iconColor} />
//     </div>
//   </div>
// );

// // ── Tab Button ────────────────────────────────────────────────
// const TabBtn = ({ label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${active ? 'bg-[#0098cc] text-white shadow-sm' : 'text-white/50 hover:bg-white/10'
//       }`}
//   >
//     {label}
//   </button>
// );

// const TABS = ['Overview', 'Profile', 'Activity'];

// // ── Info Row ─────────────────────────────────────────────────
// const InfoRow = ({ icon: Icon, label, value }) => (
//   <div className="bg-[#031610] rounded-xl p-3 border border-white/10 flex items-center gap-2.5">
//     <div className="w-7 h-7 rounded-lg bg-[#0098cc]/10 flex items-center justify-center shrink-0">
//       <Icon size={12} className="text-[#0098cc]" />
//     </div>
//     <div className="min-w-0">
//       <p className="text-white/40 text-[10px]">{label}</p>
//       <p className="text-white text-xs font-semibold truncate">{value || '—'}</p>
//     </div>
//   </div>
// );

// // ── Session Booking Card ──────────────────────────────────────
// const BookingCard = ({ booking }) => {
//   const [expanded, setExpanded] = useState(false);
//   const cfg = statusConfig[booking.status] || statusConfig.pending;

//   return (
//     <div className="bg-[#031610] border border-white/10 rounded-2xl overflow-hidden transition-all duration-200">
//       {/* Header row */}
//       <div className="p-4 flex items-start justify-between gap-3">
//         <div className="flex items-start gap-3 min-w-0 flex-1">
//           <div className="w-9 h-9 rounded-xl bg-[#0098cc]/10 flex items-center justify-center shrink-0 mt-0.5">
//             <Video size={14} className="text-[#0098cc]" />
//           </div>
//           <div className="min-w-0">
//             <p className="text-white font-semibold text-sm truncate">{booking.topic || 'Session'}</p>
//             <p className="text-white/40 text-xs mt-0.5 truncate">{booking.menteeName}</p>
//             <div className="flex items-center gap-2 mt-1.5 flex-wrap">
//               {/* Status badge */}
//               <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>
//                 <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
//                 {cfg.label}
//               </span>
//               {/* Free / paid badge */}
//               <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${booking.isFreeSession ? 'bg-violet-500/10 text-violet-400' : 'bg-emerald-500/10 text-emerald-400'
//                 }`}>
//                 {booking.isFreeSession ? 'Free' : `₹${booking.price}`}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-end gap-2 shrink-0">
//           <div className="flex items-center gap-1 text-white/40 text-[10px]">
//             <Clock size={10} />
//             <span>{booking.startTime}</span>
//           </div>
//           <p className="text-white/40 text-[10px]">{formatShortDate(booking.sessionDate)}</p>
//           <button
//             onClick={() => setExpanded(!expanded)}
//             className="text-[#0098cc]/60 hover:text-[#0098cc] transition-colors"
//           >
//             {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//           </button>
//         </div>
//       </div>

//       {/* Expanded detail */}
//       {expanded && (
//         <div className="border-t border-white/10 px-4 pb-4 pt-3 flex flex-col gap-2.5">
//           <div className="grid grid-cols-2 gap-2 text-xs">
//             {[
//               { label: 'Duration', value: `${booking.durationMinutes} min` },
//               { label: 'Session Type', value: booking.sessionType },
//               { label: 'Mentee Email', value: booking.menteeEmail },
//               { label: 'Payment', value: booking.paymentStatus },
//               { label: 'Method', value: booking.paymentMethod },
//               { label: 'Transaction ID', value: booking.transactionId },
//             ].map(({ label, value }) => (
//               <div key={label} className="bg-[#062117] rounded-lg p-2 border border-white/5">
//                 <p className="text-white/30 text-[9px] uppercase tracking-wide">{label}</p>
//                 <p className="text-white/80 font-medium mt-0.5 truncate">{value || '—'}</p>
//               </div>
//             ))}
//           </div>

//           {/* Zoom link */}
//           {booking.meetingLink && (
//             <a
//               href={booking.meetingLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 rounded-xl px-3 py-2 text-[#0098cc] text-xs font-medium transition-all"
//             >
//               <Wifi size={12} />
//               Join Zoom Meeting
//               <ExternalLink size={10} className="ml-auto" />
//             </a>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Sessions Panel ────────────────────────────────────────────
// const SessionsPanel = ({ email }) => {
//   const [filter, setFilter] = useState('all');

//   const { data: sessionData, isLoading, isError } =
//     useGetMentorSessionBookingsQuery(email, { skip: !email });

//   const bookings = sessionData?.data?.bookings || [];
//   const stats = sessionData?.data?.stats || {};

//   const filtered = filter === 'all'
//     ? bookings
//     : bookings.filter((b) => b.status === filter);

//   if (isLoading) return (
//     <div className="flex items-center justify-center py-12">
//       <Loader2 size={24} className="animate-spin text-[#0098cc]" />
//     </div>
//   );

//   if (isError) return (
//     <div className="flex flex-col items-center justify-center py-12 gap-2">
//       <WifiOff size={28} className="text-red-400/50" />
//       <p className="text-white/30 text-sm">Failed to load bookings</p>
//     </div>
//   );

//   const filterBtns = [
//     { key: 'all', label: `All (${stats.total || 0})` },
//     { key: 'confirmed', label: `Confirmed (${stats.confirmed || 0})` },
//     { key: 'completed', label: `Completed (${stats.completed || 0})` },
//     { key: 'pending', label: `Pending (${stats.pending || 0})` },
//     { key: 'cancelled', label: `Cancelled (${stats.cancelled || 0})` },
//   ];

//   return (
//     <div className="flex flex-col gap-4">
//       {/* Mini stats row */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//         {[
//           { label: 'Total', value: stats.total || 0, color: 'text-[#0098cc]' },
//           { label: 'Confirmed', value: stats.confirmed || 0, color: 'text-emerald-400' },
//           { label: 'Completed', value: stats.completed || 0, color: 'text-blue-400' },
//           { label: 'Revenue', value: `₹${stats.totalRevenue || 0}`, color: 'text-amber-400' },
//         ].map(({ label, value, color }) => (
//           <div key={label} className="bg-[#062117] border border-white/10 rounded-xl p-3 text-center">
//             <p className={`text-lg font-bold ${color}`}>{value}</p>
//             <p className="text-white/40 text-[10px] mt-0.5">{label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filter strip */}
//       <div className="flex gap-1.5 flex-wrap">
//         {filterBtns.map(({ key, label }) => (
//           <button
//             key={key}
//             onClick={() => setFilter(key)}
//             className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${filter === key
//                 ? 'bg-[#0098cc] text-white'
//                 : 'bg-[#062117] border border-white/10 text-white/40 hover:text-white/70'
//               }`}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {/* Booking cards */}
//       {filtered.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-10 gap-2">
//           <Calendar size={28} className="text-white/10" />
//           <p className="text-white/30 text-sm">No bookings found</p>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {filtered.map((booking) => (
//             <BookingCard key={booking._id} booking={booking} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Main ──────────────────────────────────────────────────────
// const MentorDashboardSection = () => {
//   const [mentorId, setMentorId] = useState(null);
//   const [mentorEmail, setMentorEmail] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isPanelOpen, setIsPanelOpen] = useState(false);
//   const [showSessions, setShowSessions] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');
//     if (userData) {
//       try {
//         const parsed = JSON.parse(userData);
//         setMentorId(parsed?._id);
//         setMentorEmail(parsed?.email);
//       } catch (e) {
//         console.error('Error parsing userData:', e);
//       }
//     }
//   }, []);

//   const { data: userDetails, isLoading, isError, error } =
//     useGetUserDetailsQuery(mentorId, { skip: !mentorId });

//   // ── Fetch sessions by email at top level ─────────────────
//   const { data: sessionData, isLoading: sessionsLoading } =
//     useGetMentorSessionBookingsQuery(mentorEmail, { skip: !mentorEmail });

//   const sessionStats = sessionData?.data?.stats || {};
//   const sessionBookings = sessionData?.data?.bookings || [];

//   // Derive upcoming = confirmed sessions whose date is today or future
//   const today = new Date(); today.setHours(0, 0, 0, 0);
//   const upcoming = sessionBookings.filter(
//     (b) => b.status === 'confirmed' && new Date(b.sessionDate) >= today
//   ).length;
//   const completed = sessionStats.completed || 0;
//   const total = sessionStats.total || 0;
//   const cancelled = sessionStats.cancelled || 0;

//   const user = userDetails?.data;

//   useEffect(() => {
//     if (user?.mentorId) {
//       try { localStorage.setItem('mentorId', user.mentorId); } catch (e) { }
//     }
//   }, [user]);

//   // ── Loading ─────────────────────────────────────────────
//   if (isLoading) return (
//     <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610]">
//       <div className="flex flex-col items-center gap-3">
//         <Loader />
//       </div>
//     </div>
//   );

//   if (isError) return (
//     <div className="flex-1 flex items-center justify-center p-4 min-h-[300px] bg-[#031610]">
//       <div className="bg-[#062117] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
//         <CircleAlert size={36} className="text-red-400 mx-auto mb-3" />
//         <p className="text-white/50 text-sm">{error?.data?.message || 'Failed to load user details'}</p>
//       </div>
//     </div>
//   );

//   if (!user) return (
//     <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610]">
//       <div className="bg-[#062117] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
//         <UserRound size={36} className="text-white/20 mx-auto mb-3" />
//         <p className="text-white/40 text-sm">No user data available</p>
//       </div>
//     </div>
//   );

//   const completionRate = total > 0
//     ? Math.round((completed / total) * 100)
//     : 0;

//   return (
//     <div className="flex flex-col min-h-full bg-[#031610]">

//       {/* ══ TOP BAR ════════════════════════════════════════════ */}
//       <div className="bg-[#062117] border-b border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0098cc]/20 border-2 border-[#0098cc] flex items-center justify-center shrink-0">
//             <UserRound size={16} className="text-[#0098cc]" />
//           </div>
//           <div>
//             <p className="text-white font-bold text-sm sm:text-base leading-tight">
//               Hey {user?.name?.toUpperCase() || 'MENTOR'}
//             </p>
//             <p className="text-white/40 text-[10px] sm:text-xs">Welcome to your dashboard</p>
//           </div>
//         </div>
//       </div>

//       {/* ══ BODY ════════════════════════════════════════════════ */}
//       <div className="flex flex-col xl:flex-row flex-1 gap-4 p-4 sm:p-5">

//         {/* ── MOBILE: Toggle Left Panel ──────────────────────── */}
//         <button
//           onClick={() => setIsPanelOpen(!isPanelOpen)}
//           className="xl:hidden flex items-center justify-between bg-[#062117] border border-white/10 rounded-2xl px-4 py-3 text-white/70 text-sm font-medium"
//         >
//           <span>Account Overview</span>
//           <span className="text-[#0098cc] text-xs">{isPanelOpen ? 'Hide ▲' : 'Show ▼'}</span>
//         </button>

//         {/* ── LEFT PANEL ─────────────────────────────────────── */}
//         <div className={`xl:w-80 xl:shrink-0 flex flex-col bg-[#062117] border border-white/10 rounded-2xl overflow-hidden ${isPanelOpen ? 'flex' : 'hidden xl:flex'
//           }`}>
//           <div className="flex gap-1 p-2 border-b border-white/10">
//             {TABS.map((t, i) => (
//               <TabBtn key={t} label={t} active={activeTab === i} onClick={() => setActiveTab(i)} />
//             ))}
//           </div>

//           <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3 bg-[#031610] overflow-auto">

//             {/* ── OVERVIEW TAB ──────────────────────────────── */}
//             {activeTab === 0 && (
//               <>
//                 <div className="flex items-center justify-between bg-[#031610] rounded-xl px-4 py-3 border border-white/10">
//                   <div>
//                     <p className="text-white font-semibold text-sm">Mentor Account</p>
//                     <p className="text-white/40 text-xs mt-0.5">{user?.username || 'N/A'}</p>
//                   </div>
//                 </div>

//                 <div className="bg-[#031610] rounded-xl px-4 py-3 border border-white/10 flex items-center gap-2.5">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${user?.isVerified ? 'bg-emerald-500/10' : 'bg-amber-500/10'
//                     }`}>
//                     {user?.isVerified
//                       ? <CheckCircle2 size={16} className="text-emerald-500" />
//                       : <CircleAlert size={16} className="text-amber-500" />
//                     }
//                   </div>
//                   <div>
//                     <p className="text-white text-xs font-semibold">
//                       {user?.isVerified ? 'Verified Account' : 'Not Verified'}
//                     </p>
//                     <p className="text-white/40 text-[10px]">
//                       {user?.isVerified ? 'Your account is verified' : 'Complete verification to unlock all features'}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="bg-[#031610] rounded-xl p-3 border border-white/10">
//                     <p className="text-[#0098cc] text-[10px] font-bold uppercase tracking-wide">Total</p>
//                     <p className="text-white text-2xl font-bold mt-0.5">{sessionsLoading ? '…' : total}</p>
//                   </div>
//                   <div className="bg-[#031610] rounded-xl p-3 border border-white/10">
//                     <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wide">Completed</p>
//                     <p className="text-white text-2xl font-bold mt-0.5">{sessionsLoading ? '…' : completed}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="bg-[#031610] rounded-xl p-3 border border-white/10">
//                     <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wide">Upcoming</p>
//                     <p className="text-white text-2xl font-bold mt-0.5">{sessionsLoading ? '…' : upcoming}</p>
//                   </div>
//                   <div className="bg-[#031610] rounded-xl p-3 border border-white/10">
//                     <p className="text-red-400 text-[10px] font-bold uppercase tracking-wide">Cancelled</p>
//                     <p className="text-white text-2xl font-bold mt-0.5">{sessionsLoading ? '…' : cancelled}</p>
//                   </div>
//                 </div>

//                 <div className="bg-[#031610] rounded-xl p-3 border border-white/10">
//                   <div className="flex justify-between text-[10px] mb-1.5">
//                     <span className="text-[#0098cc] font-semibold flex items-center gap-1">
//                       <TrendingUp size={10} /> Completion rate
//                     </span>
//                     <span className="text-white/60 font-semibold">{completionRate}%</span>
//                   </div>
//                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
//                     <div
//                       className="h-full rounded-full transition-all duration-700"
//                       style={{
//                         width: `${completionRate}%`,
//                         background: 'linear-gradient(90deg, #0098cc, #00b8f0)'
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <p className="text-[10px] text-[#0098cc]/60 text-center mt-auto px-2">
//                   Member since {formatDate(user?.createdAt)}
//                 </p>
//               </>
//             )}

//             {/* ── PROFILE TAB ───────────────────────────────── */}
//             {activeTab === 1 && (
//               <>
//                 <p className="text-white font-semibold text-sm flex items-center gap-1.5">
//                   <UserRound size={13} className="text-[#0098cc]" />
//                   Profile Information
//                 </p>
//                 {[
//                   { icon: UserRound, label: 'Full Name', value: user?.name },
//                   { icon: Mail, label: 'Email', value: user?.email },
//                   { icon: Phone, label: 'Phone', value: user?.phone ? `+${user.countryCode} ${user.phone}` : null },
//                   { icon: UserRound, label: 'Username', value: user?.username },
//                   { icon: MapPin, label: 'Location', value: user?.city ? `${user.city}, ${user.country}` : null },
//                 ].map((item) => (
//                   <InfoRow key={item.label} {...item} />
//                 ))}
//               </>
//             )}

//             {/* ── ACTIVITY TAB ──────────────────────────────── */}
//             {activeTab === 2 && (
//               <>
//                 <p className="text-white font-semibold text-sm flex items-center gap-1.5">
//                   <TrendingUp size={13} className="text-[#0098cc]" />
//                   Account Activity
//                 </p>
//                 {[
//                   { label: 'Account Created', value: formatDate(user?.createdAt) },
//                   { label: 'Last Updated', value: formatDate(user?.updatedAt) },
//                   { label: 'Account Status', value: user?.isActive ? 'Active' : 'Inactive' },
//                   { label: 'Verification', value: user?.isVerified ? 'Verified' : 'Pending' },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="bg-[#031610] rounded-xl p-3 border border-white/10 flex items-center justify-between gap-2">
//                     <div className="flex items-center gap-2 min-w-0">
//                       <div className="w-1.5 h-1.5 bg-[#0098cc] rounded-full shrink-0" />
//                       <p className="text-white/40 text-xs truncate">{label}</p>
//                     </div>
//                     <p className="text-white text-xs font-semibold shrink-0">{value}</p>
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>

//         {/* ── RIGHT: STAT CARDS + SESSIONS ───────────────────── */}
//         <div className="flex-1 flex flex-col gap-4 min-w-0">

//           {/* 2-col stat grid — powered by live session data */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             <StatCard
//               label="Total Sessions"
//               value={sessionsLoading ? '…' : total}
//               icon={Calendar}
//               iconColor="text-[#0098cc]"
//               sub={`${cancelled} cancelled`}
//               subColor="text-white/30"
//             />
//             <StatCard
//               label="Upcoming Sessions"
//               value={sessionsLoading ? '…' : upcoming}
//               icon={TrendingUp}
//               iconColor="text-amber-400"
//               sub="Confirmed & future"
//               subColor="text-amber-400/60"
//             />
//             <StatCard
//               label="Completed Sessions"
//               value={sessionsLoading ? '…' : completed}
//               icon={Star}
//               iconColor="text-emerald-400"
//               sub={total > 0 ? `${Math.round((completed / total) * 100)}% completion rate` : 'No sessions yet'}
//               subColor="text-emerald-400/60"
//             />
//             <StatCard
//               label="Account Status"
//               value={user?.isActive ? 'Active' : 'Inactive'}
//               icon={Users}
//               iconColor="text-violet-400"
//               sub={user?.isVerified ? '✓ Verified' : '⚠ Not Verified'}
//               subColor={user?.isVerified ? 'text-emerald-500' : 'text-amber-500'}
//             />
//           </div>

//           {/* Full-width profile card */}
//           <div className="bg-[#062117] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
//             <div className="flex flex-col gap-1 min-w-0">
//               <span className="text-white/50 text-sm font-medium">Profile Details</span>
//               <span className="text-white text-xl sm:text-2xl font-bold mt-1 truncate">
//                 {user?.name || 'Mentor'}
//               </span>
//               <span className="text-white/40 text-xs truncate">{user?.email}</span>
//               <button
//                 onClick={() => navigate('/mentor-profile')}
//                 className="mt-3 flex items-center gap-2 bg-[#0098cc] hover:bg-[#0098cc]/80 text-white text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors w-fit font-medium"
//               >
//                 View Full Profile
//               </button>
//             </div>
//             <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
//               <BadgeCheck size={22} className="text-[#0098cc]" />
//             </div>
//           </div>

//           {/* ── SESSION BOOKINGS SECTION ─────────────────────── */}
//           <div className="bg-[#062117] border border-white/10 rounded-2xl overflow-hidden">
//             {/* Section header / toggle */}
//             <button
//               onClick={() => setShowSessions(!showSessions)}
//               className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/10"
//             >
//               <div className="flex items-center gap-2.5">
//                 <div className="w-7 h-7 rounded-lg bg-[#0098cc]/10 flex items-center justify-center">
//                   <Video size={13} className="text-[#0098cc]" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-white font-semibold text-sm">Session Bookings</p>
//                   <p className="text-white/40 text-[10px]">All your mentoring sessions</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-[#0098cc] text-xs font-medium">
//                   {showSessions ? 'Hide' : 'View All'}
//                 </span>
//                 {showSessions ? <ChevronUp size={14} className="text-[#0098cc]" /> : <ChevronDown size={14} className="text-[#0098cc]" />}
//               </div>
//             </button>

//             {showSessions && (
//               <div className="p-4 sm:p-5 bg-[#031610]">
//                 <SessionsPanel email={mentorEmail} />
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorDashboardSection;

import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Users, Calendar, Star, MapPin, Phone,
  Mail, UserRound, BadgeCheck, CircleAlert, Loader2,
  CheckCircle2, Video, Clock, ChevronDown, ChevronUp,
  WifiOff, Wifi, ExternalLink
} from 'lucide-react';
import { useGetUserDetailsQuery, useGetMentorSessionBookingsQuery } from './MentorDashboardapislice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../global/Loader';

/* ── Helpers ─────────────────────────────────────────────────── */
const formatDate = (d) => {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
const formatShort = (d) => {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const STATUS_PILL = {
  confirmed: 'bg-emerald-500/10 text-emerald-400',
  completed: 'bg-blue-500/10 text-blue-400',
  cancelled: 'bg-red-500/10 text-red-400',
  pending: 'bg-amber-500/10 text-amber-400',
};

/* ── Pill ────────────────────────────────────────────────────── */
const Pill = ({ children, cls }) => (
  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${cls}`}>{children}</span>
);

/* ── Section label ───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-3">{children}</p>
);

/* ── Data row ────────────────────────────────────────────────── */
const DataRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0">
    <span className="text-sm text-white/40">{label}</span>
    <span className="text-sm font-medium text-white text-right max-w-[60%] truncate">{value || '—'}</span>
  </div>
);

/* ── Session row ─────────────────────────────────────────────── */
const SessionRow = ({ booking }) => {
  const [open, setOpen] = useState(false);
  const pill = STATUS_PILL[booking.status] || STATUS_PILL.pending;

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <div
        className="flex items-center gap-4 py-3.5 cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        {/* left */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{booking.topic || 'Session'}</p>
          <p className="text-xs text-white/40 mt-0.5">
            {booking.menteeName}
            <span className="mx-1.5 text-white/20">·</span>
            {formatShort(booking.sessionDate)}
            <span className="mx-1.5 text-white/20">·</span>
            {booking.startTime}
            <span className="mx-1.5 text-white/20">·</span>
            {booking.durationMinutes} min
          </p>
        </div>
        {/* right */}
        <div className="flex items-center gap-2 shrink-0">
          <Pill cls={pill}>{booking.status}</Pill>
          <Pill cls={booking.isFreeSession ? 'bg-violet-500/10 text-violet-400' : 'bg-emerald-500/10 text-emerald-400'}>
            {booking.isFreeSession ? 'Free' : `₹${booking.price}`}
          </Pill>
          <span className="text-white/20 group-hover:text-white/50 transition-colors">
            {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </span>
        </div>
      </div>

      {/* expanded */}
      {open && (
        <div className="pb-4 pl-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mb-3">
            {[
              ['Duration', `${booking.durationMinutes} min`],
              ['Type', booking.sessionType],
              ['Email', booking.menteeEmail],
              ['Payment', booking.paymentStatus],
              ['Method', booking.paymentMethod],
              ['Transaction', booking.transactionId],
            ].map(([l, v]) => (
              <div key={l}>
                <p className="text-[10px] text-white/25 uppercase tracking-wide">{l}</p>
                <p className="text-xs text-white/70 mt-0.5 truncate">{v || '—'}</p>
              </div>
            ))}
          </div>
          {booking.meetingLink && (
            <a
              href={booking.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#0098cc] hover:underline"
            >
              <Wifi size={11} /> Join meeting <ExternalLink size={10} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Sessions section ────────────────────────────────────────── */
const SessionsSection = ({ email }) => {
  const [filter, setFilter] = useState('all');
  const { data: sessionData, isLoading, isError } =
    useGetMentorSessionBookingsQuery(email, { skip: !email });

  const bookings = sessionData?.data?.bookings || [];
  const stats = sessionData?.data?.stats || {};
  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  if (isLoading) return (
    <div className="flex justify-center py-10">
      <Loader2 size={20} className="animate-spin text-white/20" />
    </div>
  );
  if (isError) return (
    <div className="flex flex-col items-center py-10 gap-2">
      <WifiOff size={22} className="text-white/20" />
      <p className="text-xs text-white/30">Failed to load sessions</p>
    </div>
  );

  const FILTERS = [
    { key: 'all', label: `All (${stats.total || 0})` },
    { key: 'confirmed', label: `Confirmed (${stats.confirmed || 0})` },
    { key: 'completed', label: `Completed (${stats.completed || 0})` },
    { key: 'pending', label: `Pending (${stats.pending || 0})` },
    { key: 'cancelled', label: `Cancelled (${stats.cancelled || 0})` },
  ];

  return (
    <>
      {/* filter strip */}
      <div className="flex gap-2 flex-wrap mb-4">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`text-[11px] px-3 py-1 rounded-full border transition-all ${filter === key
                ? 'border-white/20 text-white bg-white/[0.06]'
                : 'border-white/[0.08] text-white/30 hover:text-white/60'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* list */}
      {filtered.length === 0 ? (
        <p className="text-sm text-white/25 py-8 text-center">No sessions found</p>
      ) : (
        <div>
          {filtered.map(b => <SessionRow key={b._id} booking={b} />)}
        </div>
      )}
    </>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════ */
export default function MentorDashboardSection() {
  const [mentorId, setMentorId] = useState(null);
  const [mentorEmail, setMentorEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('userData') || '{}');
      setMentorId(parsed?._id);
      setMentorEmail(parsed?.email);
    } catch (e) { console.error(e); }
  }, []);

  const { data: userDetails, isLoading, isError, error } =
    useGetUserDetailsQuery(mentorId, { skip: !mentorId });

  const { data: sessionData, isLoading: sessionsLoading } =
    useGetMentorSessionBookingsQuery(mentorEmail, { skip: !mentorEmail });

  const stats = sessionData?.data?.stats || {};
  const bookings = sessionData?.data?.bookings || [];

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = bookings.filter(
    b => b.status === 'confirmed' && new Date(b.sessionDate) >= today
  ).length;

  const total = stats.total || 0;
  const completed = stats.completed || 0;
  const cancelled = stats.cancelled || 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const user = userDetails?.data;

  useEffect(() => {
    if (user?.mentorId) {
      try { localStorage.setItem('mentorId', user.mentorId); } catch (e) { }
    }
  }, [user]);

  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610]">
      <Loader />
    </div>
  );

  if (isError) return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-[300px] bg-[#031610]">
      <div className="text-center">
        <CircleAlert size={32} className="text-red-400/50 mx-auto mb-2" />
        <p className="text-sm text-white/30">{error?.data?.message || 'Failed to load'}</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610]">
      <div className="text-center">
        <UserRound size={32} className="text-white/10 mx-auto mb-2" />
        <p className="text-sm text-white/30">No user data</p>
      </div>
    </div>
  );

  const initials = (user?.name || 'M')
    .split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-full bg-[#031610] text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-8 sm:py-12">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 pb-8 border-b border-white/[0.08] flex-wrap">
          <div className="flex items-center gap-4">
            {/* avatar */}
            <div className="w-14 h-14 rounded-full bg-[#0098cc]/20 flex items-center justify-center text-[#0098cc] font-medium text-lg shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-medium text-white leading-tight">
                {user?.name || 'Mentor'}
              </h1>
              <p className="text-sm text-white/40 mt-0.5">
                {user?.email}
                {user?.phone && (
                  <>
                    <span className="mx-2 text-white/20">·</span>
                    +{user.countryCode} {user.phone}
                  </>
                )}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {user?.isVerified && (
                  <Pill cls="bg-emerald-500/10 text-emerald-400">Verified</Pill>
                )}
                {user?.isActive && (
                  <Pill cls="bg-emerald-500/10 text-emerald-400">Active</Pill>
                )}
                {user?.city && (
                  <Pill cls="bg-white/5 text-white/40">{user.city}, {user.country}</Pill>
                )}
                {user?.username && (
                  <Pill cls="bg-white/5 text-white/40">@{user.username}</Pill>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-white/25 self-start pt-1">
            Member since {formatDate(user?.createdAt)}
          </p>
        </div>

        {/* ── STAT NUMBERS ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/[0.08]">
          {[
            { label: 'Total sessions', value: sessionsLoading ? '…' : total, color: 'text-[#0098cc]' },
            { label: 'Upcoming', value: sessionsLoading ? '…' : upcoming, color: 'text-amber-400' },
            { label: 'Completed', value: sessionsLoading ? '…' : completed, color: 'text-emerald-400' },
            { label: 'Cancelled', value: sessionsLoading ? '…' : cancelled, color: 'text-red-400' },
          ].map(({ label, value, color }, i) => (
            <div
              key={label}
              className={`py-7 text-center ${i < 3 ? 'border-r border-white/[0.08]' : ''
                } ${i >= 2 ? 'border-t border-white/[0.08] sm:border-t-0' : ''
                }`}
            >
              <p className={`text-4xl font-medium ${color}`}>{value}</p>
              <p className="text-xs text-white/30 mt-1.5">{label}</p>
            </div>
          ))}
        </div>

        {/* ── COMPLETION BAR ───────────────────────────────────── */}
        <div className="py-5 border-b border-white/[0.08]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/40">Completion rate</span>
            <span className="text-xs font-medium text-white/60">{completionRate}%</span>
          </div>
          <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0098cc] transition-all duration-700"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* ── PROFILE + ACCOUNT ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-b border-white/[0.08]">
          {/* profile */}
          <div className="py-6 sm:pr-8 sm:border-r border-white/[0.08]">
            <SectionLabel>Profile</SectionLabel>
            <DataRow label="Full name" value={user?.name} />
            <DataRow label="Username" value={user?.username ? `@${user.username}` : null} />
            <DataRow label="Email" value={user?.email} />
            <DataRow label="Phone" value={user?.phone ? `+${user.countryCode} ${user.phone}` : null} />
            <DataRow label="Location" value={user?.city ? `${user.city}, ${user.country}` : null} />
          </div>

          {/* account */}
          <div className="py-6 sm:pl-8 border-t border-white/[0.08] sm:border-t-0">
            <SectionLabel>Account</SectionLabel>
            <DataRow label="Created" value={formatDate(user?.createdAt)} />
            <DataRow label="Last updated" value={formatDate(user?.updatedAt)} />
            <DataRow
              label="Status"
              value={
                <Pill cls={user?.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}>
                  {user?.isActive ? 'Active' : 'Inactive'}
                </Pill>
              }
            />
            <DataRow
              label="Verification"
              value={
                <Pill cls={user?.isVerified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}>
                  {user?.isVerified ? 'Verified' : 'Pending'}
                </Pill>
              }
            />
            <div className="pt-4">
              <button
                onClick={() => navigate('/mentor-profile')}
                className="text-xs text-[#0098cc] hover:underline"
              >
                View full profile →
              </button>
            </div>
          </div>
        </div>

        {/* ── SESSION BOOKINGS ─────────────────────────────────── */}
        {/* <div className="pt-6">
          <SectionLabel>Session bookings</SectionLabel>
          <SessionsSection email={mentorEmail} />
        </div> */}

      </div>
    </div>
  );
}