// import React, { useState, useEffect } from 'react';
// import { TrendingUp, Users, Calendar, Star, MapPin, Phone, Mail, User } from 'lucide-react';
// import { useGetUserDetailsQuery } from './MentorDashboardapislice';

// const MentorDashboardSection = () => {
//   const [mentorId, setMentorId] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');

//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setMentorId(parsedUser?._id);
//       } catch (error) {
//         console.error('Error parsing userData:', error);
//       }
//     }
//   }, []);

//   const { data: userDetails, isLoading, isError, error } =
//     useGetUserDetailsQuery(mentorId, {
//       skip: !mentorId,
//     });

//   // ✅ API response is { success, data }
//   const user = userDetails?.data;

//   // ✅ Store mentorId in localStorage when user data is available
//   useEffect(() => {
//     if (user?.mentorId) {
//       try {
//         localStorage.setItem('mentorId', user.mentorId);
//         console.log('Mentor ID stored in localStorage:', user.mentorId);
//       } catch (error) {
//         console.error('Error storing mentorId in localStorage:', error);
//       }
//     }
//   }, [user]);

//   // ✅ API sends ISO string dates
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 flex items-center justify-center min-h-screen">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6 flex items-center justify-center min-h-screen">
//         <div className="text-red-400 text-xl">
//           {error?.data?.message || 'Failed to load user details'}
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="p-6 flex items-center justify-center min-h-screen">
//         <div className="text-gray-400 text-xl">No user data available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">

//       {/* Welcome Header */}
//       <div className="mb-6">
//         <h2 className="text-white text-3xl font-bold mb-2">
//           Welcome back, {user?.name || 'Mentor'}!
//         </h2>
//         <p className="text-gray-400">
//           Here's what's happening with your mentorship today.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

//         <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-gray-400 text-sm">Total Bookings</h3>
//             <Calendar className="w-5 h-5 text-[#0098cc]" />
//           </div>
//           <p className="text-white text-3xl font-bold">
//             {user?.totalBookings || 0}
//           </p>
//         </div>

//         <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-gray-400 text-sm">Completed Sessions</h3>
//             <Star className="w-5 h-5 text-[#0098cc]" />
//           </div>
//           <p className="text-white text-3xl font-bold">
//             {user?.completedBookings || 0}
//           </p>
//         </div>

//         <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-gray-400 text-sm">Wallet Balance</h3>
//             <TrendingUp className="w-5 h-5 text-[#0098cc]" />
//           </div>
//           <p className="text-white text-3xl font-bold">
//             ₹{user?.Inr || 0}
//           </p>
//         </div>

//         <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-gray-400 text-sm">Account Status</h3>
//             <Users className="w-5 h-5 text-[#0098cc]" />
//           </div>
//           <p className="text-white text-3xl font-bold">
//             {user?.isActive ? 'Active' : 'Inactive'}
//           </p>
//           <p className={`text-sm mt-2 ${user?.isVerified ? 'text-green-400' : 'text-yellow-400'}`}>
//             {user?.isVerified ? '✓ Verified' : '⚠ Not Verified'}
//           </p>
//         </div>

//       </div>

//       {/* Profile Information */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

//         <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
//           <h3 className="text-white text-xl font-semibold mb-4">Profile Information</h3>

//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <User className="w-5 h-5 text-[#0098cc] mt-1" />
//               <div>
//                 <p className="text-gray-400 text-sm">Full Name</p>
//                 <p className="text-white font-medium">{user?.name || 'N/A'}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Mail className="w-5 h-5 text-[#0098cc] mt-1" />
//               <div>
//                 <p className="text-gray-400 text-sm">Email</p>
//                 <p className="text-white font-medium">{user?.email || 'N/A'}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Phone className="w-5 h-5 text-[#0098cc] mt-1" />
//               <div>
//                 <p className="text-gray-400 text-sm">Phone</p>
//                 <p className="text-white font-medium">
//                   +{user?.countryCode} {user?.phone || 'N/A'}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <User className="w-5 h-5 text-[#0098cc] mt-1" />
//               <div>
//                 <p className="text-gray-400 text-sm">Username</p>
//                 <p className="text-white font-medium">{user?.username || 'N/A'}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default MentorDashboardSection;

// import React, { useState, useEffect } from 'react';
// import {
//   TrendingUp, Users, Calendar, Star, MapPin, Phone,
//   Mail, UserRound, BadgeCheck, CircleAlert, Loader2,
//   Copy, Check, CheckCircle2
// } from 'lucide-react';
// import { useGetUserDetailsQuery } from './MentorDashboardapislice';
// import { useNavigate } from 'react-router-dom';

// // ── Helpers ───────────────────────────────────────────────────
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   return new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'long', day: 'numeric',
//   });
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

// // ── Main ──────────────────────────────────────────────────────
// const MentorDashboardSection = () => {
//   const [mentorId, setMentorId] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const [copied, setCopied] = useState(false);
//   const [isPanelOpen, setIsPanelOpen] = useState(false); // mobile left-panel toggle
//   const navigate = useNavigate();

//   const handleCopy = (text) => {
//     if (!text) return;
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');
//     if (userData) {
//       try {
//         const parsed = JSON.parse(userData);
//         setMentorId(parsed?._id);
//       } catch (e) {
//         console.error('Error parsing userData:', e);
//       }
//     }
//   }, []);

//   const { data: userDetails, isLoading, isError, error } =
//     useGetUserDetailsQuery(mentorId, { skip: !mentorId });

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
//         <Loader2 size={32} className="animate-spin text-white" />
//         <p className="text-white/70 text-sm">Loading dashboard…</p>
//       </div>
//     </div>
//   );

//   // ── Error ───────────────────────────────────────────────
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

//   const completionRate = user?.totalBookings > 0
//     ? Math.round((user.completedBookings / user.totalBookings) * 100)
//     : 0;

//   return (
//     <div className="flex flex-col min-h-full bg-[#031610]">

//       {/* ══ TOP BAR ════════════════════════════════════════════ */}
//       <div className="bg-[#062117] border-b border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">

//         {/* Greeting */}
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

//         {/* Mentor ID box */}
//         {/* <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 sm:px-4 py-2">
//           <div>
//             <p className="text-white/40 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider">Mentor ID</p>
//             <p className="text-white font-bold text-xs sm:text-sm font-mono">{user?.mentorId || '—'}</p>
//           </div>
//           <button
//             onClick={() => handleCopy(user?.mentorId)}
//             className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all ml-1 sm:ml-2 ${
//               copied
//                 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
//                 : 'bg-white/10 hover:bg-white/20 text-white/50 hover:text-white border border-white/10'
//             }`}
//           >
//             {copied ? <><Check size={11} /> <span className="hidden sm:inline">Copied</span></> : <><Copy size={11} /> <span className="hidden sm:inline">Copy</span></>}
//           </button>
//         </div> */}
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
//         {/* On mobile: collapsible. On xl+: always visible fixed-width sidebar */}
//         <div className={`xl:w-80 xl:shrink-0 flex flex-col bg-[#062117] border border-white/10 rounded-2xl overflow-hidden ${isPanelOpen ? 'flex' : 'hidden xl:flex'
//           }`}>

//           {/* Tab strip */}
//           <div className="flex gap-1 p-2 border-b border-white/10">
//             {TABS.map((t, i) => (
//               <TabBtn key={t} label={t} active={activeTab === i} onClick={() => setActiveTab(i)} />
//             ))}
//           </div>

//           {/* Panel body */}
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
//                     <p className="text-[#0098cc] text-[10px] font-bold uppercase tracking-wide">Bookings</p>
//                     <p className="text-white text-2xl font-bold mt-0.5">{user?.totalBookings || 0}</p>
//                   </div>
//                   <div className="bg-[#031610] rounded-xl p-3 border border-white/10">
//                     <p className="text-blue-400 text-[10px] font-bold uppercase tracking-wide">Completed</p>
//                     <p className="text-white text-2xl font-bold mt-0.5">{user?.completedBookings || 0}</p>
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

//         {/* ── RIGHT: STAT CARDS ───────────────────────────────── */}
//         <div className="flex-1 flex flex-col gap-4 min-w-0">

//           {/* 2-col stat grid — single col on xs, 2-col on sm+ */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             <StatCard
//               label="Total Bookings"
//               value={user?.totalBookings || 0}
//               icon={Calendar}
//               iconColor="text-[#0098cc]"
//             />
//             <StatCard
//               label="Pending Sessions"
//               value={user?.Inr || 0}
//               icon={TrendingUp}
//               iconColor="text-red-400"
//             />
//             <StatCard
//               label="Completed Sessions"
//               value={user?.completedBookings || 0}
//               icon={Star}
//               iconColor="text-pink-400"
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
  Copy, Check, CheckCircle2, Clock, Activity, Zap,
  BarChart2, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useGetUserDetailsQuery } from './MentorDashboardapislice';
import { useNavigate } from 'react-router-dom';

// ── Helpers ────────────────────────────────────────────────────────────────
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

const now = new Date();
const MONTH_DAYS = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
const TODAY = now.getDate();
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAME = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
const FIRST_DOW = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

// Fake bar data for session chart
const MONTHLY_BARS = [
  { m: 'Jan', v: 40 }, { m: 'Feb', v: 65 }, { m: 'Mar', v: 50 },
  { m: 'Apr', v: 80 }, { m: 'May', v: 55 }, { m: 'Jun', v: 90 },
  { m: 'Jul', v: 70 },
];

// ── Mini Calendar ──────────────────────────────────────────────────────────
const MiniCalendar = ({ bookedDays = [] }) => {
  const [offset, setOffset] = useState(0);

  const calDays = Array.from({ length: FIRST_DOW + MONTH_DAYS }, (_, i) =>
    i < FIRST_DOW ? null : i - FIRST_DOW + 1
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-[11px] font-semibold">{MONTH_NAME}</span>
        <div className="flex gap-1">
          <button onClick={() => setOffset(o => o - 1)} className="w-5 h-5 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <ChevronLeft size={10} className="text-white/40" />
          </button>
          <button onClick={() => setOffset(o => o + 1)} className="w-5 h-5 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <ChevronRight size={10} className="text-white/40" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[9px] text-white/30 font-semibold py-0.5">{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-0.5">
        {calDays.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const isToday = d === TODAY;
          const isBooked = bookedDays.includes(d);
          return (
            <button
              key={d}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-[10px] font-semibold transition-all
                ${isToday ? 'bg-[#0098cc] text-white shadow-lg shadow-[#0098cc]/30' :
                  isBooked ? 'bg-[#0098cc]/20 text-[#0098cc]' :
                  'text-white/40 hover:bg-white/10 hover:text-white'}
              `}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 pt-1">
        <span className="flex items-center gap-1 text-[9px] text-white/30">
          <span className="w-2 h-2 rounded-full bg-[#0098cc]" /> Today
        </span>
        <span className="flex items-center gap-1 text-[9px] text-white/30">
          <span className="w-2 h-2 rounded-full bg-[#0098cc]/30" /> Booked
        </span>
        <span className="flex items-center gap-1 text-[9px] text-white/30">
          <span className="w-2 h-2 rounded-full bg-white/10" /> Open
        </span>
      </div>
    </div>
  );
};

// ── Mini Bar Chart ─────────────────────────────────────────────────────────
const MiniBarChart = ({ bars, accentColor = '#0098cc', height = 60 }) => (
  <div className="flex items-end gap-1" style={{ height }}>
    {bars.map((b, i) => {
      const pct = (b.v / 100) * 100;
      const isLast = i === bars.length - 1;
      return (
        <div key={b.m} className="flex flex-col items-center gap-0.5 flex-1">
          <div
            className="w-full rounded-t-sm transition-all duration-700"
            style={{
              height: `${pct}%`,
              background: isLast
                ? `linear-gradient(180deg, ${accentColor}, ${accentColor}80)`
                : 'rgba(255,255,255,0.12)',
              minHeight: 4,
            }}
          />
          <span className="text-[8px] text-white/30">{b.m}</span>
        </div>
      );
    })}
  </div>
);

// ── Tiny Pulse Bars (for right cards) ─────────────────────────────────────
const PulseBars = ({ count = 8, color = '#0098cc' }) => (
  <div className="flex items-end gap-0.5 h-8">
    {Array.from({ length: count }).map((_, i) => {
      const h = [40, 70, 55, 90, 65, 80, 50, 75][i % 8];
      return (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{ height: `${h}%`, background: color, opacity: 0.7 + (i / count) * 0.3 }}
        />
      );
    })}
  </div>
);

// ── Dot Grid (tracking) ────────────────────────────────────────────────────
const DotGrid = ({ cols = 14, rows = 4, filled = [], color = '#0098cc' }) => (
  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
    {Array.from({ length: cols * rows }).map((_, i) => (
      <div
        key={i}
        className="aspect-square rounded-full"
        style={{
          background: filled.includes(i) ? color : 'rgba(255,255,255,0.08)',
          boxShadow: filled.includes(i) ? `0 0 6px ${color}60` : 'none',
        }}
      />
    ))}
  </div>
);

// ── Main ───────────────────────────────────────────────────────────────────
const MentorDashboardSection = () => {
  const [mentorId, setMentorId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setMentorId(parsed?._id);
      } catch (e) { console.error('Error parsing userData:', e); }
    }
  }, []);

  const { data: userDetails, isLoading, isError, error } =
    useGetUserDetailsQuery(mentorId, { skip: !mentorId });

  const user = userDetails?.data;

  useEffect(() => {
    if (user?.mentorId) {
      try { localStorage.setItem('mentorId', user.mentorId); } catch (e) { }
    }
  }, [user]);

  const completionRate = user?.totalBookings > 0
    ? Math.round((user.completedBookings / user.totalBookings) * 100)
    : 0;

  // Booked days simulation from totalBookings
  const bookedDays = user?.totalBookings > 0
    ? [3, 7, 10, TODAY, 18, 22, 25].slice(0, Math.min(user.totalBookings, 7))
    : [];

  // Dot grid filled cells
  const filledDots = Array.from({ length: Math.min(user?.completedBookings || 0, 30) }, (_, i) => i * 2);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[#031610]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#0098cc]" />
        <p className="text-white/50 text-sm">Loading dashboard…</p>
      </div>
    </div>
  );

  const displayUser = user || {};

  return (
    <div className="min-h-screen bg-[#031610] p-3 sm:p-4 lg:p-5 font-sans">

      {/* ══ BENTO GRID ════════════════════════════════════════════════════ */}
      {/* 
        Layout (mirrors reference image):
        [LEFT col]  [CENTER col — 2 rows]  [RIGHT col — 3 stacked cards]
        [      BOTTOM full-width row      ]
      */}
      <div className="grid gap-3 sm:gap-4"
        style={{
          gridTemplateColumns: 'repeat(1, 1fr)',
          gridTemplateAreas: `
            "left"
            "center-top"
            "center-main"
            "right-a"
            "right-b"
            "right-c"
            "bottom"
          `
        }}
      >
        {/* Override with real 3-col layout on lg+ */}
        <style>{`
          @media (min-width: 1024px) {
            .bento { 
              grid-template-columns: 220px 1fr 200px !important;
              grid-template-rows: auto auto 1fr auto !important;
              grid-template-areas:
                "left center-top right-a"
                "left center-main right-b"
                "left center-main right-c"
                "bottom bottom bottom" !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .bento {
              grid-template-columns: 1fr 1fr !important;
              grid-template-areas:
                "left center-top"
                "left center-main"
                "right-a right-b"
                "right-c ."
                "bottom bottom" !important;
            }
          }
        `}</style>

        <div className="bento grid gap-3 sm:gap-4"
          style={{
            gridTemplateAreas: `
              "left"
              "center-top"
              "center-main"
              "right-a"
              "right-b"
              "right-c"
              "bottom"
            `
          }}
        >

          {/* ── LEFT PANEL: Profile + Calendar ────────────────────────── */}
          <div
            className="bg-[#062117] border border-white/10 rounded-2xl p-4 flex flex-col gap-4 row-span-3"
            style={{ gridArea: 'left' }}
          >
            {/* Header */}
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Mentor Dashboard</p>
              <h2 className="text-white font-bold text-base leading-tight mt-0.5">
                {displayUser?.name || 'Your Account'}
              </h2>
              <p className="text-white/30 text-[11px] mt-0.5">{displayUser?.email || '—'}</p>
            </div>

            {/* Verification badge */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${displayUser?.isVerified ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-amber-500/20 bg-amber-500/5'}`}>
              {displayUser?.isVerified
                ? <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                : <CircleAlert size={13} className="text-amber-400 shrink-0" />
              }
              <span className={`text-[11px] font-semibold ${displayUser?.isVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                {displayUser?.isVerified ? 'Verified Account' : 'Not Verified'}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Calendar */}
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-3">
                Available dates for sessions
              </p>
              <MiniCalendar bookedDays={bookedDays} />
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Today's sessions */}
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2">Sessions today</p>
              <div className="flex flex-col gap-2">
                {displayUser?.totalBookings > 0 ? (
                  <>
                    <div className="flex items-center gap-2 bg-[#031610] rounded-xl p-2.5 border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-[#0098cc]/20 flex items-center justify-center shrink-0">
                        <Clock size={13} className="text-[#0098cc]" />
                      </div>
                      <div>
                        <p className="text-white text-[11px] font-semibold">10:00 AM</p>
                        <p className="text-white/30 text-[9px]">Session booked</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-[#031610] rounded-xl p-2.5 border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-[#0098cc]/20 flex items-center justify-center shrink-0">
                        <Clock size={13} className="text-[#0098cc]" />
                      </div>
                      <div>
                        <p className="text-white text-[11px] font-semibold">2:00 PM</p>
                        <p className="text-white/30 text-[9px]">Session booked</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-white/20 text-[11px] text-center py-3">No sessions today</p>
                )}
              </div>
            </div>

            {/* Profile button */}
            <button
              onClick={() => navigate('/mentor-profile')}
              className="mt-auto w-full py-2.5 rounded-xl bg-[#0098cc] hover:bg-[#0098cc]/80 text-white text-xs font-semibold transition-all"
            >
              View Full Profile
            </button>
          </div>

          {/* ── CENTER TOP: Overview heading + mini stat ───────────────── */}
          <div
            className="bg-[#062117] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4"
            style={{ gridArea: 'center-top' }}
          >
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h1 className="text-white font-bold text-xl sm:text-2xl leading-tight mt-1">
                Mentor overview
              </h1>
              <p className="text-white/30 text-xs mt-0.5">
                {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Right: Completion % + big number */}
            <div className="flex items-end gap-4">
              {/* Mini chart-like badge */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <div className="flex items-end gap-px h-6">
                    {[30, 50, 40, 70, 55].map((v, i) => (
                      <div key={i} className="w-1.5 rounded-sm bg-[#0098cc]/40" style={{ height: `${v}%` }} />
                    ))}
                  </div>
                </div>
                <span className="text-white/40 text-[10px]">Completion</span>
              </div>
              <div>
                <span className="text-white text-5xl sm:text-6xl font-black leading-none">
                  {displayUser?.totalBookings || 0}
                </span>
                <p className="text-white/30 text-[10px] text-right mt-1">total bookings</p>
              </div>
            </div>
          </div>

          {/* ── CENTER MAIN: Session performance chart ─────────────────── */}
          <div
            className="bg-[#062117] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-4"
            style={{ gridArea: 'center-main' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#0098cc]/20 flex items-center justify-center">
                    <BarChart2 size={12} className="text-[#0098cc]" />
                  </div>
                  <p className="text-white font-bold text-sm">Session performance</p>
                </div>
                <p className="text-white/30 text-[11px] mt-1">Track your completed sessions monthly</p>
              </div>
              <span className="text-[10px] text-[#0098cc] border border-[#0098cc]/30 px-2 py-0.5 rounded-full font-semibold">Monthly</span>
            </div>

            {/* Big stat */}
            <div className="flex items-end gap-5">
              <div>
                <p className="text-white/40 text-[10px] mb-0.5">Avg sessions</p>
                <p className="text-white text-5xl font-black leading-none">
                  {displayUser?.completedBookings || 0}
                </p>
                <p className="text-white/30 text-[10px] mt-1">sessions</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-white/40 text-[10px] mb-0.5">Pending</p>
                <p className="text-white text-3xl font-bold leading-none text-[#0098cc]">
                  {(displayUser?.totalBookings || 0) - (displayUser?.completedBookings || 0)}
                </p>
                <p className="text-white/30 text-[10px] mt-1">remaining</p>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex-1 min-h-[80px]">
              <MiniBarChart bars={MONTHLY_BARS} height={90} />
            </div>

            {/* Completion bar */}
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-[#0098cc] font-semibold flex items-center gap-1">
                  <TrendingUp size={10} /> Completion rate
                </span>
                <span className="text-white/60 font-semibold">{completionRate}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${completionRate}%`,
                    background: 'linear-gradient(90deg, #0098cc, #00d4ff)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT A: Total Bookings pulse card ─────────────────────── */}
          <div
            className="bg-[#062117] border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col gap-2"
            style={{ gridArea: 'right-a' }}
          >
            <div className="flex items-center justify-between">
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wide">Total Bookings</p>
              <Calendar size={12} className="text-[#0098cc]" />
            </div>
            <PulseBars color="#0098cc" />
            <div className="flex items-end justify-between">
              <p className="text-white text-3xl font-black leading-none">{displayUser?.totalBookings || 0}</p>
              <p className="text-white/30 text-[9px]">All time</p>
            </div>
          </div>

          {/* ── RIGHT B: Account status — cyan accent card ─────────────── */}
          <div
            className="rounded-2xl p-3 sm:p-4 flex flex-col justify-between gap-2"
            style={{
              gridArea: 'right-b',
              background: 'linear-gradient(135deg, #0098cc 0%, #005f80 100%)',
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wide">Account Status</p>
              <Activity size={12} className="text-white/70" />
            </div>
            <p className="text-white text-4xl font-black leading-none">
              {displayUser?.isActive ? '●' : '○'}
            </p>
            <div className="flex items-end justify-between">
              <p className="text-white font-bold text-sm">
                {displayUser?.isActive ? 'Active' : 'Inactive'}
              </p>
              <p className="text-white/60 text-[9px]">
                {displayUser?.isVerified ? '✓ Verified' : '⚠ Unverified'}
              </p>
            </div>
          </div>

          {/* ── RIGHT C: Completed bookings dot card ───────────────────── */}
          <div
            className="bg-[#062117] border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col gap-2"
            style={{ gridArea: 'right-c' }}
          >
            <div className="flex items-center justify-between">
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wide">Completed</p>
              <CheckCircle2 size={12} className="text-emerald-400" />
            </div>
            {/* Dot pulse */}
            <div className="flex items-center gap-0.5 py-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    height: 6,
                    background: i < Math.round((completionRate / 100) * 10)
                      ? `linear-gradient(90deg, #0098cc, #00d4ff)`
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
            <div className="flex items-end justify-between">
              <p className="text-white text-3xl font-black leading-none">
                {displayUser?.completedBookings || 0}
              </p>
              <p className="text-white/30 text-[9px]">sessions</p>
            </div>
          </div>

          {/* ── BOTTOM: Booking tracking full-width ────────────────────── */}
          <div
            className="bg-[#062117] border border-white/10 rounded-2xl p-4 sm:p-5"
            style={{ gridArea: 'bottom' }}
          >
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <p className="text-white font-bold text-sm">Booking Tracking</p>
                <p className="text-white/30 text-[11px] mt-0.5">Visual overview of all session activity</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {[
                  { color: '#0098cc', label: `${displayUser?.completedBookings || 0} completed` },
                  { color: 'rgba(255,255,255,0.12)', label: 'pending' },
                ].map(({ color, label }) => (
                  <span key={label} className="flex items-center gap-1.5 text-[10px] text-white/40">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <DotGrid
              cols={Math.min(Math.max(displayUser?.totalBookings || 14, 14), 20)}
              rows={4}
              filled={filledDots}
              color="#0098cc"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MentorDashboardSection;