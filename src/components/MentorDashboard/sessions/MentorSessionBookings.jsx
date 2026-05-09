
// // import React, { useState, useEffect } from 'react';
// // import {
// //     Calendar, User, Video, RefreshCw,
// //     TriangleAlert, CalendarX, Clock, BadgeCheck, CircleDot, CircleX,
// //     CircleCheck, X, Eye, Mail, Phone, Link2, Users, CreditCard, Timer,
// //     Tag, MessageSquare, Shield, Copy, Check, ExternalLink, ChevronDown
// // } from 'lucide-react';
// // import { useGetMentorSessionsQuery } from '../MentorDashboardapislice';
// // import Loader from '../../../global/Loader';

// // // ── Status badge ──────────────────────────────────────────────
// // const StatusBadge = ({ status }) => {
// //     const map = {
// //         confirmed: { label: 'Confirmed', icon: BadgeCheck, cls: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30' },
// //         pending: { label: 'Pending', icon: CircleDot, cls: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30' },
// //         cancelled: { label: 'Cancelled', icon: CircleX, cls: 'bg-red-500/10 text-red-400 ring-1 ring-red-500/30' },
// //         completed: { label: 'Completed', icon: CircleCheck, cls: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30' },
// //     };
// //     const cfg = map[status] || { label: status, icon: CircleDot, cls: 'bg-white/5 text-white/40 ring-1 ring-white/10' };
// //     const Icon = cfg.icon;
// //     return (
// //         <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${cfg.cls}`}>
// //             <Icon size={10} />
// //             {cfg.label}
// //         </span>
// //     );
// // };

// // // ── Payment badge ─────────────────────────────────────────────
// // const PaymentBadge = ({ paymentStatus, isFreeSession }) => {
// //     if (isFreeSession) return (
// //         <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/30">
// //             Free
// //         </span>
// //     );
// //     const map = {
// //         paid: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30',
// //         pending: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30',
// //         failed: 'bg-red-500/10 text-red-400 ring-1 ring-red-500/30',
// //     };
// //     return (
// //         <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${map[paymentStatus] || 'bg-white/5 text-white/40 ring-1 ring-white/10'}`}>
// //             {paymentStatus?.charAt(0).toUpperCase() + paymentStatus?.slice(1)}
// //         </span>
// //     );
// // };

// // // ── Copy button ───────────────────────────────────────────────
// // const CopyButton = ({ text }) => {
// //     const [copied, setCopied] = useState(false);
// //     const handle = () => {
// //         navigator.clipboard.writeText(text);
// //         setCopied(true);
// //         setTimeout(() => setCopied(false), 2000);
// //     };
// //     return (
// //         <button
// //             onClick={handle}
// //             className={`shrink-0 p-1.5 rounded transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'}`}
// //             title="Copy"
// //         >
// //             {copied ? <Check size={10} /> : <Copy size={10} />}
// //         </button>
// //     );
// // };

// // // ── Detail row ────────────────────────────────────────────────
// // const DetailRow = ({ icon: Icon, label, value, copyable, isLink }) => {
// //     if (!value && value !== 0) return null;
// //     return (
// //         <div className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
// //             <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-white/5">
// //                 <Icon size={12} className="text-white/30" />
// //             </div>
// //             <div className="flex-1 min-w-0">
// //                 <p className="text-[10px] uppercase tracking-widest mb-0.5 text-white/30">{label}</p>
// //                 {isLink ? (
// //                     <a href={value} target="_blank" rel="noopener noreferrer"
// //                         className="text-sm font-medium text-[#0098cc] break-all flex items-center gap-1.5 hover:text-[#0098cc]/80 transition-colors">
// //                         <span className="truncate">{value}</span>
// //                         <ExternalLink size={10} className="shrink-0 text-[#0098cc]/50" />
// //                     </a>
// //                 ) : (
// //                     <p className="text-sm font-medium text-white break-all">{value}</p>
// //                 )}
// //             </div>
// //             {copyable && <CopyButton text={value} />}
// //         </div>
// //     );
// // };

// // // ══════════════════════════════════════════════════════════════
// // // SESSION DETAIL MODAL
// // // ══════════════════════════════════════════════════════════════
// // const SessionDetailModal = ({ session, onClose, formatDate }) => {
// //     if (!session) return null;
// //     return (
// //         <div
// //             className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
// //             onClick={onClose}
// //         >
// //             <div
// //                 className="w-full sm:max-w-lg bg-[#062117] border border-white/10 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] shadow-2xl"
// //                 onClick={e => e.stopPropagation()}
// //             >
// //                 {/* Drag handle on mobile */}
// //                 <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
// //                     <div className="w-10 h-1 rounded-full bg-white/20" />
// //                 </div>

// //                 {/* Header */}
// //                 <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between shrink-0 border-b border-white/10">
// //                     <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
// //                         <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
// //                             <User size={15} className="text-[#0098cc]" />
// //                         </div>
// //                         <div className="min-w-0">
// //                             <p className="text-white font-bold text-sm truncate">{session.menteeName}</p>
// //                             <p className="text-white/40 text-xs truncate">{session.menteeEmail}</p>
// //                         </div>
// //                     </div>
// //                     <button
// //                         onClick={onClose}
// //                         className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white/60 transition-all shrink-0"
// //                     >
// //                         <X size={14} />
// //                     </button>
// //                 </div>

// //                 {/* Scrollable body */}
// //                 <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
// //                     {/* Status row */}
// //                     <div className="flex items-center gap-2 flex-wrap pb-3 mb-1 border-b border-white/10">
// //                         <StatusBadge status={session.status} />
// //                         <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
// //                     </div>

// //                     <DetailRow icon={Tag} label="Topic" value={session.topic} />
// //                     {session.description && <DetailRow icon={MessageSquare} label="Description" value={session.description} />}
// //                     <DetailRow icon={Calendar} label="Session Date" value={formatDate(session.sessionDate)} />
// //                     <DetailRow icon={Clock} label="Time Slot" value={`${session.startTime} → ${session.endTime}`} />
// //                     <DetailRow icon={Timer} label="Duration" value={`${session.durationMinutes} minutes`} />
// //                     <DetailRow icon={Users} label="Session Type" value={session.sessionType} />
// //                     <DetailRow icon={Mail} label="Email" value={session.email || session.menteeEmail} copyable />
// //                     <DetailRow icon={Phone} label="Phone" value={session.phone} copyable />
// //                     <DetailRow icon={CreditCard} label="Price" value={session.isFreeSession ? 'Free Session' : `${session.price} (${session.currency})`} />
// //                     <DetailRow icon={CreditCard} label="Payment Method" value={session.paymentMethod} />
// //                     <DetailRow icon={Shield} label="Payment Status" value={session.paymentStatus} />
// //                     <DetailRow icon={User} label="Created By" value={session.createdBy} />

// //                     {session.zoomMeeting && (
// //                         <>
// //                             <div className="pt-3 pb-2">
// //                                 <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Zoom Meeting Details</p>
// //                             </div>
// //                             <DetailRow icon={Video} label="Meeting ID" value={session.zoomMeeting.meetingId || session.zoomMeetingId} copyable />
// //                             <DetailRow icon={Link2} label="Start URL" value={session.zoomMeeting.startUrl} copyable isLink />
// //                         </>
// //                     )}
// //                     {!session.zoomMeeting && session.meetingLink && (
// //                         <DetailRow icon={Video} label="Meeting Link" value={session.meetingLink} copyable isLink />
// //                     )}
// //                 </div>

// //                 {/* Footer */}
// //                 <div className="px-4 sm:px-5 py-3 shrink-0 flex gap-2 border-t border-white/10 bg-[#031610]/60">
// //                     {session.meetingLink ? (
// //                         <a
// //                             href={session.zoomMeeting?.startUrl || session.meetingLink}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className="flex-1 flex items-center justify-center gap-2 bg-[#0098cc] hover:bg-[#0098cc]/80 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
// //                         >
// //                             <Video size={14} />
// //                             <span className="hidden xs:inline">Start / Join Meeting</span>
// //                             <span className="xs:hidden">Join</span>
// //                         </a>
// //                     ) : (
// //                         <div className="flex-1 flex items-center justify-center bg-white/5 text-white/30 py-2.5 rounded-xl text-sm font-medium">
// //                             No meeting link
// //                         </div>
// //                     )}
// //                     <button
// //                         onClick={onClose}
// //                         className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70 transition-all"
// //                     >
// //                         Close
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // // ══════════════════════════════════════════════════════════════
// // // MOBILE CARD  (< md)
// // // ══════════════════════════════════════════════════════════════
// // // const SessionCard = ({ session, formatDate, onViewDetails }) => (
// // //     <div className="bg-[#062117] border border-white/10 rounded-xl p-3.5 flex flex-col gap-3">
// // //         {/* Header row */}
// // //         <div className="flex items-start justify-between gap-2">
// // //             <div className="flex items-center gap-2.5 min-w-0">
// // //                 <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
// // //                     <User size={14} className="text-[#0098cc]" />
// // //                 </div>
// // //                 <div className="min-w-0">
// // //                     <p className="text-white text-sm font-semibold truncate leading-tight">{session.menteeName}</p>
// // //                     <p className="text-white/40 text-[11px] truncate">{session.menteeEmail}</p>
// // //                 </div>
// // //             </div>
// // //             <StatusBadge status={session.status} />
// // //         </div>

// // //         {/* Topic */}
// // //         <div className="bg-[#031610] rounded-lg px-3 py-2">
// // //             <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Topic</p>
// // //             <p className="text-white text-sm font-medium leading-snug">{session.topic}</p>
// // //             {session.description && (
// // //                 <p className="text-white/40 text-xs mt-1 line-clamp-2">{session.description}</p>
// // //             )}
// // //         </div>

// // //         {/* Stats grid 2×2 */}
// // //         <div className="grid grid-cols-2 gap-2">
// // //             <div className="bg-[#031610] rounded-lg p-2.5">
// // //                 <p className="text-white/30 text-[10px] mb-1">Date</p>
// // //                 <p className="text-white/80 text-xs font-medium">{formatDate(session.sessionDate)}</p>
// // //             </div>
// // //             <div className="bg-[#031610] rounded-lg p-2.5">
// // //                 <p className="text-white/30 text-[10px] mb-1">Time</p>
// // //                 <p className="text-white/80 text-xs font-medium flex items-center gap-1">
// // //                     <Clock size={9} className="text-[#0098cc]" />
// // //                     {session.startTime}
// // //                 </p>
// // //             </div>
// // //             <div className="bg-[#031610] rounded-lg p-2.5">
// // //                 <p className="text-white/30 text-[10px] mb-1">Duration</p>
// // //                 <p className="text-white/80 text-xs font-medium">{session.durationMinutes} min</p>
// // //             </div>
// // //             <div className="bg-[#031610] rounded-lg p-2.5">
// // //                 <p className="text-white/30 text-[10px] mb-1">Price</p>
// // //                 <p className={`text-xs font-semibold ${session.isFreeSession ? 'text-violet-400' : 'text-white'}`}>
// // //                     {session.isFreeSession ? 'Free' : session.price}
// // //                 </p>
// // //             </div>
// // //         </div>

// // //         {/* Footer */}
// // //         <div className="flex items-center justify-between pt-0.5">
// // //             <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
// // //             <button
// // //                 onClick={() => onViewDetails(session)}
// // //                 className="inline-flex items-center gap-1.5 bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 text-[#0098cc] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
// // //             >
// // //                 <Eye size={11} />
// // //                 Details
// // //             </button>
// // //         </div>
// // //     </div>
// // // );

// // const SessionCard = ({ session, formatDate, onViewDetails }) => (
// //     <div className={`bg-[#062117] border border-white/10 rounded-xl p-3.5 flex flex-col gap-3
// //     ${session.isExpired ? "opacity-60 grayscale" : ""}`}>

// //         {/* Header row */}
// //         <div className="flex items-start justify-between gap-2">
// //             <div className="flex items-center gap-2.5 min-w-0">
// //                 <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
// //                     <User size={14} className="text-[#0098cc]" />
// //                 </div>
// //                 <div className="min-w-0">
// //                     <p className="text-white text-sm font-semibold truncate leading-tight">
// //                         {session.menteeName}
// //                     </p>
// //                     <p className="text-white/40 text-[11px] truncate">
// //                         {session.menteeEmail}
// //                     </p>
// //                 </div>
// //             </div>

// //             {/* 🔥 FIXED STATUS */}
// //             <StatusBadge status={session.isExpired ? "expired" : session.status} />
// //         </div>

// //         {/* Topic */}
// //         <div className="bg-[#031610] rounded-lg px-3 py-2">
// //             <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Topic</p>
// //             <p className="text-white text-sm font-medium leading-snug">{session.topic}</p>
// //             {session.description && (
// //                 <p className="text-white/40 text-xs mt-1 line-clamp-2">{session.description}</p>
// //             )}
// //         </div>

// //         {/* Stats */}
// //         <div className="grid grid-cols-2 gap-2">
// //             <div className="bg-[#031610] rounded-lg p-2.5">
// //                 <p className="text-white/30 text-[10px] mb-1">Date</p>
// //                 <p className="text-white/80 text-xs font-medium">
// //                     {formatDate(session.sessionDate)}
// //                 </p>
// //             </div>
// //             <div className="bg-[#031610] rounded-lg p-2.5">
// //                 <p className="text-white/30 text-[10px] mb-1">Time</p>
// //                 <p className="text-white/80 text-xs font-medium flex items-center gap-1">
// //                     <Clock size={9} className="text-[#0098cc]" />
// //                     {session.startTime}
// //                 </p>
// //             </div>
// //             <div className="bg-[#031610] rounded-lg p-2.5">
// //                 <p className="text-white/30 text-[10px] mb-1">Duration</p>
// //                 <p className="text-white/80 text-xs font-medium">
// //                     {session.durationMinutes} min
// //                 </p>
// //             </div>
// //             <div className="bg-[#031610] rounded-lg p-2.5">
// //                 <p className="text-white/30 text-[10px] mb-1">Price</p>
// //                 <p className={`text-xs font-semibold ${session.isFreeSession ? 'text-violet-400' : 'text-white'}`}>
// //                     {session.isFreeSession ? 'Free' : session.price}
// //                 </p>
// //             </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="flex items-center justify-between pt-0.5">
// //             <PaymentBadge
// //                 paymentStatus={session.paymentStatus}
// //                 isFreeSession={session.isFreeSession}
// //             />

// //             <button
// //                 onClick={() => !session.isExpired && onViewDetails(session)}
// //                 disabled={session.isExpired}
// //                 className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
// //                 ${session.isExpired
// //                         ? "bg-gray-500/20 border border-gray-400/20 text-gray-400 cursor-not-allowed opacity-60"
// //                         : "bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 text-[#0098cc]"
// //                     }`}
// //             >
// //                 <Eye size={11} />
// //                 {session.isExpired ? "Expired" : "Details"}
// //             </button>
// //         </div>
// //     </div>
// // );

// // // ══════════════════════════════════════════════════════════════
// // // TABLET CARD  (md → lg)
// // // ══════════════════════════════════════════════════════════════
// // // const SessionCardTablet = ({ session, formatDate, onViewDetails }) => (
// // //     <div className="bg-[#062117] border border-white/10 rounded-xl p-4 flex gap-4">
// // //         {/* Avatar */}
// // //         <div className="w-10 h-10 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0 mt-0.5">
// // //             <User size={16} className="text-[#0098cc]" />
// // //         </div>

// // //         {/* Main content */}
// // //         <div className="flex-1 min-w-0">
// // //             {/* Row 1 */}
// // //             <div className="flex items-start justify-between gap-3 mb-2">
// // //                 <div className="min-w-0">
// // //                     <p className="text-white text-sm font-semibold truncate">{session.menteeName}</p>
// // //                     <p className="text-white/40 text-xs truncate">{session.menteeEmail}</p>
// // //                 </div>
// // //                 <div className="flex items-center gap-1.5 shrink-0">
// // //                     <StatusBadge status={session.status} />
// // //                     <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
// // //                 </div>
// // //             </div>

// // //             {/* Topic */}
// // //             <p className="text-white/80 text-sm font-medium mb-2 truncate">{session.topic}</p>

// // //             {/* Row 3 — meta chips */}
// // //             <div className="flex items-center gap-3 flex-wrap text-xs text-white/50">
// // //                 <span className="flex items-center gap-1">
// // //                     <Calendar size={11} className="text-[#0098cc]" />
// // //                     {formatDate(session.sessionDate)}
// // //                 </span>
// // //                 <span className="flex items-center gap-1">
// // //                     <Clock size={11} className="text-[#0098cc]" />
// // //                     {session.startTime}
// // //                 </span>
// // //                 <span className="flex items-center gap-1">
// // //                     <Timer size={11} className="text-[#0098cc]" />
// // //                     {session.durationMinutes} min
// // //                 </span>
// // //                 <span className={`font-semibold ${session.isFreeSession ? 'text-violet-400' : 'text-white/70'}`}>
// // //                     {session.isFreeSession ? 'Free' : session.price}
// // //                 </span>
// // //             </div>
// // //         </div>

// // //         {/* Action */}
// // //         <div className="shrink-0 flex items-center">
// // //             <button
// // //                 onClick={() => onViewDetails(session)}
// // //                 className="inline-flex items-center gap-1.5 bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 text-[#0098cc] px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
// // //             >
// // //                 <Eye size={12} />
// // //                 Details
// // //             </button>
// // //         </div>
// // //     </div>
// // // );


// // const SessionCardTablet = ({ session, formatDate, onViewDetails }) => (
// //     <div className={`bg-[#062117] border border-white/10 rounded-xl p-4 flex gap-4
// //     ${session.isExpired ? "opacity-60 grayscale" : ""}`}>

// //         {/* Avatar */}
// //         <div className="w-10 h-10 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0 mt-0.5">
// //             <User size={16} className="text-[#0098cc]" />
// //         </div>

// //         {/* Main content */}
// //         <div className="flex-1 min-w-0">

// //             {/* Row 1 */}
// //             <div className="flex items-start justify-between gap-3 mb-2">
// //                 <div className="min-w-0">
// //                     <p className="text-white text-sm font-semibold truncate">{session.menteeName}</p>
// //                     <p className="text-white/40 text-xs truncate">{session.menteeEmail}</p>
// //                 </div>

// //                 <div className="flex items-center gap-1.5 shrink-0">
// //                     {/* 🔥 FIXED STATUS */}
// //                     <StatusBadge status={session.isExpired ? "expired" : session.status} />

// //                     <PaymentBadge
// //                         paymentStatus={session.paymentStatus}
// //                         isFreeSession={session.isFreeSession}
// //                     />
// //                 </div>
// //             </div>

// //             {/* Topic */}
// //             <p className="text-white/80 text-sm font-medium mb-2 truncate">
// //                 {session.topic}
// //             </p>

// //             {/* Meta */}
// //             <div className="flex items-center gap-3 flex-wrap text-xs text-white/50">
// //                 <span className="flex items-center gap-1">
// //                     <Calendar size={11} className="text-[#0098cc]" />
// //                     {formatDate(session.sessionDate)}
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                     <Clock size={11} className="text-[#0098cc]" />
// //                     {session.startTime}
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                     <Timer size={11} className="text-[#0098cc]" />
// //                     {session.durationMinutes} min
// //                 </span>
// //                 <span className={`font-semibold ${session.isFreeSession ? 'text-violet-400' : 'text-white/70'}`}>
// //                     {session.isFreeSession ? 'Free' : session.price}
// //                 </span>
// //             </div>
// //         </div>

// //         {/* Action */}
// //         <div className="shrink-0 flex items-center">
// //             <button
// //                 onClick={() => !session.isExpired && onViewDetails(session)}
// //                 disabled={session.isExpired}
// //                 className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors
// //                 ${session.isExpired
// //                         ? "bg-gray-500/20 border border-gray-400/20 text-gray-400 cursor-not-allowed opacity-60"
// //                         : "bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 text-[#0098cc]"
// //                     }`}
// //             >
// //                 <Eye size={12} />
// //                 {session.isExpired ? "Expired" : "Details"}
// //             </button>
// //         </div>
// //     </div>
// // );


// // // ══════════════════════════════════════════════════════════════
// // // STAT PILL
// // // ══════════════════════════════════════════════════════════════
// // const StatPill = ({ label, value, valueClass = 'text-white' }) => (
// //     <div className="flex items-center gap-2 bg-[#062117] border border-white/10 rounded-lg px-3 py-2">
// //         <span className="text-white/40 text-xs">{label}</span>
// //         <span className={`text-sm font-bold ${valueClass}`}>{value}</span>
// //     </div>
// // );

// // // ══════════════════════════════════════════════════════════════
// // // FILTERS
// // // ══════════════════════════════════════════════════════════════
// // const FILTERS = ['all', 'confirmed'];

// // // ══════════════════════════════════════════════════════════════
// // // MAIN COMPONENT
// // // ══════════════════════════════════════════════════════════════
// // const MentorSessionBookings = () => {
// //     const [mentorId, setMentorId] = useState(null);
// //     const [filter, setFilter] = useState('all');
// //     const [selectedSession, setSelectedSession] = useState(null);
// //     const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

// //     useEffect(() => {
// //         const storedId = localStorage.getItem('mentorId');
// //         if (storedId) { setMentorId(storedId); return; }
// //         const userData = localStorage.getItem('userData');
// //         if (userData) {
// //             try { setMentorId(JSON.parse(userData)?._id); } catch { }
// //         }
// //     }, []);

// //     const { data: sessionsData, isLoading, isError, error, refetch } =
// //         useGetMentorSessionsQuery(mentorId, { skip: !mentorId });

// //     const sessions = sessionsData?.data || [];
// //     const totalSessions = sessionsData?.count || 0;

// //     const formatDate = (d) =>
// //         d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

// //     const filteredSessions = filter === 'all'
// //         ? sessions
// //         : sessions.filter(s =>
// //             (s.isExpired ? "expired" : s.status) === filter
// //         );

// //     // Lock body scroll when modal open
// //     useEffect(() => {
// //         document.body.style.overflow = selectedSession ? 'hidden' : '';
// //         return () => { document.body.style.overflow = ''; };
// //     }, [selectedSession]);

// //     // ── Loading ───────────────────────────────────────────────
// //     if (isLoading) return (
// //         <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610]">
// //             <Loader />
// //         </div>
// //     );

// //     // ── Error ─────────────────────────────────────────────────
// //     if (isError) return (
// //         <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#031610] p-4">
// //             <div className="bg-[#062117] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center">
// //                 <TriangleAlert size={32} className="text-red-400 mx-auto mb-3" />
// //                 <h2 className="text-white font-semibold text-base mb-1">Failed to Load</h2>
// //                 <p className="text-white/50 text-sm mb-5">{error?.data?.message || 'Unable to load session bookings.'}</p>
// //                 <button
// //                     onClick={() => refetch()}
// //                     className="inline-flex items-center gap-2 bg-[#0098cc] hover:bg-[#0098cc]/80 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
// //                 >
// //                     <RefreshCw size={14} />
// //                     Retry
// //                 </button>
// //             </div>
// //         </div>
// //     );

// //     // ── Confirmed count ───────────────────────────────────────
// //     const confirmedCount = sessions.filter(s => s.status === 'confirmed').length;

// //     return (
// //         <div className="flex flex-col min-h-full bg-[#031610] p-3 sm:p-4 lg:p-5 gap-3 sm:gap-4">

// //             {/* ── Modal ── */}
// //             {selectedSession && (
// //                 <SessionDetailModal
// //                     session={selectedSession}
// //                     onClose={() => setSelectedSession(null)}
// //                     formatDate={formatDate}
// //                 />
// //             )}

// //             {/* ══════════════════════════════════════════════
// //                 TOP BAR
// //             ══════════════════════════════════════════════ */}
// //             <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3">
// //                 {/* Title */}
// //                 <div>
// //                     <h1 className="text-white text-base sm:text-lg lg:text-xl font-bold tracking-tight flex items-center gap-2">
// //                         <Calendar size={18} className="text-[#0098cc] shrink-0" />
// //                         Session Bookings
// //                     </h1>
// //                     <p className="text-white/40 text-xs sm:text-sm mt-0.5 ml-[26px]">
// //                         Manage and track all your mentorship sessions
// //                     </p>
// //                 </div>
// //                 {/* Stats */}
// //                 <div className="flex items-center gap-2 flex-wrap">
// //                     <StatPill label="Total" value={totalSessions} />
// //                     <StatPill label="Confirmed" value={confirmedCount} valueClass="text-emerald-400" />
// //                 </div>
// //             </div>

// //             {/* ══════════════════════════════════════════════
// //                 FILTER TABS
// //                 — Mobile: dropdown
// //                 — sm+: scrollable pill bar
// //             ══════════════════════════════════════════════ */}
// //             {/* Mobile dropdown filter */}
// //             <div className="relative sm:hidden">
// //                 <button
// //                     onClick={() => setMobileFilterOpen(v => !v)}
// //                     className="w-full flex items-center justify-between px-3 py-2 bg-[#062117] border border-white/10 rounded-xl text-sm font-semibold text-white"
// //                 >
// //                     <span className="capitalize">{filter === 'all' ? 'All Sessions' : filter}</span>
// //                     <ChevronDown size={15} className={`text-white/40 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
// //                 </button>
// //                 {mobileFilterOpen && (
// //                     <div className="absolute top-full left-0 right-0 mt-1 bg-[#062117] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl">
// //                         {FILTERS.map(f => (
// //                             <button
// //                                 key={f}
// //                                 onClick={() => { setFilter(f); setMobileFilterOpen(false); }}
// //                                 className={`w-full text-left px-4 py-2.5 text-sm capitalize transition-colors ${filter === f
// //                                     ? 'bg-[#0098cc]/20 text-[#0098cc] font-semibold'
// //                                     : 'text-white/60 hover:bg-white/5 hover:text-white'
// //                                     }`}
// //                             >
// //                                 {f === 'all' ? 'All Sessions' : f}
// //                                 <span className="ml-2 text-xs text-white/30">
// //                                     ({f === 'all' ? sessions.length : sessions.filter(s => s.status === f).length})
// //                                 </span>
// //                             </button>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>

// //             {/* sm+ pill bar */}
// //             <div className="hidden sm:flex items-center gap-2 flex-wrap">
// //                 {FILTERS.map(f => {
// //                     const count = f === 'all' ? sessions.length : sessions.filter(s => s.status === f).length;
// //                     return (
// //                         <button
// //                             key={f}
// //                             onClick={() => setFilter(f)}
// //                             className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all capitalize ${filter === f
// //                                 ? 'bg-[#0098cc] text-white'
// //                                 : 'bg-[#062117] border border-white/10 text-white/50 hover:text-white hover:border-white/20'
// //                                 }`}
// //                         >
// //                             {f}
// //                             <span className={`text-[11px] rounded-full px-1.5 py-0.5 ${filter === f ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'}`}>
// //                                 {count}
// //                             </span>
// //                         </button>
// //                     );
// //                 })}
// //             </div>

// //             {/* ══════════════════════════════════════════════
// //                 EMPTY STATE
// //             ══════════════════════════════════════════════ */}
// //             {filteredSessions.length === 0 ? (
// //                 <div className="flex-1 flex flex-col items-center justify-center py-16 sm:py-20 bg-[#062117] border border-white/10 rounded-xl">
// //                     <CalendarX size={32} className="text-white/10 mb-3" />
// //                     <p className="text-white/40 text-sm font-semibold">No sessions found</p>
// //                     <p className="text-white/20 text-xs mt-1">
// //                         {filter !== 'all' ? `No ${filter} sessions yet` : 'Your bookings will appear here'}
// //                     </p>
// //                 </div>
// //             ) : (
// //                 <>
// //                     {/* ══════════════════════════════════════════════
// //                         MOBILE CARDS  (< sm)
// //                     ══════════════════════════════════════════════ */}
// //                     <div className="flex flex-col gap-3 sm:hidden">
// //                         {filteredSessions.map(session => (
// //                             <SessionCard
// //                                 key={session._id}
// //                                 session={session}
// //                                 formatDate={formatDate}
// //                                 onViewDetails={setSelectedSession}
// //                             />
// //                         ))}
// //                         <p className="text-white/25 text-xs text-center py-1">
// //                             {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}
// //                         </p>
// //                     </div>

// //                     {/* ══════════════════════════════════════════════
// //                         TABLET CARDS  (sm → lg)
// //                     ══════════════════════════════════════════════ */}
// //                     <div className="hidden sm:flex lg:hidden flex-col gap-3">
// //                         {filteredSessions.map(session => (
// //                             <SessionCardTablet
// //                                 key={session._id}
// //                                 session={session}
// //                                 formatDate={formatDate}
// //                                 onViewDetails={setSelectedSession}
// //                             />
// //                         ))}
// //                         <p className="text-white/25 text-xs text-center py-1">
// //                             {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}
// //                         </p>
// //                     </div>

// //                     {/* ══════════════════════════════════════════════
// //                         DESKTOP TABLE  (lg+)
// //                     ══════════════════════════════════════════════ */}
// //                     <div className="hidden lg:flex flex-col flex-1 bg-[#062117] border border-white/10 rounded-xl overflow-hidden min-h-0">
// //                         <div className="overflow-x-auto flex-1">
// //                             <table className="w-full border-collapse min-w-[780px]">
// //                                 <thead>
// //                                     <tr className="border-b border-white/10">
// //                                         {['Mentee', 'Topic', 'Date & Time', 'Duration', 'Type', 'Status', 'Payment', 'Price', 'Action'].map(h => (
// //                                             <th
// //                                                 key={h}
// //                                                 className="px-3 xl:px-4 py-3 text-left text-[10px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap bg-[#031610]/70"
// //                                             >
// //                                                 {h}
// //                                             </th>
// //                                         ))}
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {filteredSessions.map((session, i) => (
// //                                         <tr
// //                                             key={session._id}
// //                                             className={`border-b border-white/5 transition-colors hover:bg-white/[0.025] ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}
// //                                         >
// //                                             {/* Mentee */}
// //                                             <td className="px-3 xl:px-4 py-3.5">
// //                                                 <div className="flex items-center gap-2.5">
// //                                                     <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
// //                                                         <User size={13} className="text-[#0098cc]" />
// //                                                     </div>
// //                                                     <div className="min-w-0">
// //                                                         <p className="text-white text-sm font-semibold truncate max-w-[110px] xl:max-w-[140px]">{session.menteeName}</p>
// //                                                         <p className="text-white/40 text-xs truncate max-w-[110px] xl:max-w-[140px]">{session.menteeEmail}</p>
// //                                                     </div>
// //                                                 </div>
// //                                             </td>

// //                                             {/* Topic */}
// //                                             <td className="px-3 xl:px-4 py-3.5 max-w-[140px] xl:max-w-[180px]">
// //                                                 <p className="text-white text-sm font-medium truncate">{session.topic}</p>
// //                                                 {session.description && (
// //                                                     <p className="text-white/40 text-xs mt-0.5 truncate">{session.description}</p>
// //                                                 )}
// //                                             </td>

// //                                             {/* Date & Time */}
// //                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
// //                                                 <div className="flex items-start gap-1.5">
// //                                                     <Calendar size={11} className="text-[#0098cc] mt-0.5 shrink-0" />
// //                                                     <div>
// //                                                         <p className="text-white/80 text-xs">{formatDate(session.sessionDate)}</p>
// //                                                         <p className="text-white/40 text-xs flex items-center gap-0.5 mt-0.5">
// //                                                             <Clock size={9} />
// //                                                             {session.startTime}
// //                                                         </p>
// //                                                     </div>
// //                                                 </div>
// //                                             </td>

// //                                             {/* Duration */}
// //                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
// //                                                 <span className="text-white/60 text-xs">{session.durationMinutes} min</span>
// //                                             </td>

// //                                             {/* Type */}
// //                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
// //                                                 <span className="text-white/60 text-xs capitalize">{session.sessionType}</span>
// //                                             </td>

// //                                             {/* Status */}
// //                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
// //                                                 <StatusBadge status={session.isExpired ? "expired" : session.status} />
// //                                             </td>

// //                                             {/* Payment */}
// //                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
// //                                                 <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
// //                                             </td>

// //                                             {/* Price */}
// //                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
// //                                                 {session.isFreeSession ? (
// //                                                     <span className="text-violet-400 text-xs font-semibold">Free</span>
// //                                                 ) : (
// //                                                     <span className="text-white text-sm font-semibold">{session.price}</span>
// //                                                 )}
// //                                             </td>

// //                                             {/* Action */}
// //                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
// //                                                 <button
// //                                                     onClick={() => !session.isExpired && setSelectedSession(session)}
// //                                                     disabled={session.isExpired}
// //                                                     className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
// //         ${session.isExpired
// //                                                             ? "bg-gray-500/20 border border-gray-400/20 text-gray-400 cursor-not-allowed opacity-60"
// //                                                             : "bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 text-[#0098cc]"
// //                                                         }`}
// //                                                 >
// //                                                     <Eye size={11} />
// //                                                     {session.isExpired ? "Expired" : "View"}
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                             </table>
// //                         </div>

// //                         {/* Table footer */}
// //                         <div className="px-4 py-2.5 border-t border-white/5 bg-[#031610]/50">
// //                             <p className="text-white/25 text-xs">
// //                                 Showing {filteredSessions.length} of {totalSessions} session{totalSessions !== 1 ? 's' : ''}
// //                             </p>
// //                         </div>
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default MentorSessionBookings;

// import React, { useState, useEffect } from 'react';
// import {
//     Calendar, User, Video, RefreshCw, TriangleAlert, CalendarX, Clock,
//     BadgeCheck, CircleDot, CircleX, CircleCheck, X, Eye, Mail, Phone,
//     Link2, Users, CreditCard, Timer, Tag, MessageSquare, Shield, Copy,
//     Check, ExternalLink, ChevronDown
// } from 'lucide-react';
// import { useGetMentorSessionsQuery } from '../MentorDashboardapislice';
// import Loader from '../../../global/Loader';

// const MentorSessionBookings = () => {
//     const [mentorId, setMentorId] = useState(null);
//     const [filter, setFilter] = useState('all');
//     const [selectedSession, setSelectedSession] = useState(null);
//     const [mobileFilterOpen, setMobileFilterOpen] = useState(null);
//     const [copiedKey, setCopiedKey] = useState(null);

//     useEffect(() => {
//         const storedId = localStorage.getItem('mentorId');
//         if (storedId) { setMentorId(storedId); return; }
//         const userData = localStorage.getItem('userData');
//         if (userData) {
//             try { setMentorId(JSON.parse(userData)?._id); } catch { }
//         }
//     }, []);

//     const { data: sessionsData, isLoading, isError, error, refetch } =
//         useGetMentorSessionsQuery(mentorId, { skip: !mentorId });

//     const sessions = sessionsData?.data || [];
//     const totalSessions = sessionsData?.count || 0;

//     const formatDate = (d) =>
//         d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

//     const effectiveStatus = (s) => s.isExpired ? 'expired' : s.status;

//     const copy = (text, key) => {
//         navigator.clipboard.writeText(text);
//         setCopiedKey(key);
//         setTimeout(() => setCopiedKey(null), 2000);
//     };

//     const FILTERS = ['all', 'confirmed', 'pending', 'completed'];

//     const filteredSessions = filter === 'all'
//         ? sessions
//         : sessions.filter(s => effectiveStatus(s) === filter);

//     const confirmedCount = sessions.filter(s => s.status === 'confirmed').length;

//     useEffect(() => {
//         document.body.style.overflow = selectedSession ? 'hidden' : '';
//         return () => { document.body.style.overflow = ''; };
//     }, [selectedSession]);

//     // ── Status badge ──────────────────────────────────────────
//     const StatusBadge = ({ status }) => {
//         const map = {
//             confirmed: { label: 'Confirmed', Icon: BadgeCheck, cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' },
//             pending: { label: 'Pending', Icon: CircleDot, cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
//             cancelled: { label: 'Cancelled', Icon: CircleX, cls: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
//             completed: { label: 'Completed', Icon: CircleCheck, cls: 'bg-blue-50 text-[#0098cc] ring-1 ring-blue-200' },
//             expired: { label: 'Expired', Icon: CircleX, cls: 'bg-gray-100 text-gray-400 ring-1 ring-gray-200' },
//         };
//         const cfg = map[status] || { label: status, Icon: CircleDot, cls: 'bg-gray-100 text-gray-400 ring-1 ring-gray-200' };
//         return (
//             <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${cfg.cls}`}>
//                 <cfg.Icon size={10} />
//                 {cfg.label}
//             </span>
//         );
//     };

//     // ── Payment badge ─────────────────────────────────────────
//     const PaymentBadge = ({ paymentStatus, isFreeSession }) => {
//         if (isFreeSession) return (
//             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200">
//                 Free
//             </span>
//         );
//         const map = {
//             paid: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
//             pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
//             failed: 'bg-red-50 text-red-700 ring-1 ring-red-200',
//         };
//         return (
//             <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${map[paymentStatus] || 'bg-gray-100 text-gray-400 ring-1 ring-gray-200'}`}>
//                 {paymentStatus?.charAt(0).toUpperCase() + paymentStatus?.slice(1) || '—'}
//             </span>
//         );
//     };

//     // ── Loading ───────────────────────────────────────────────
//     if (isLoading) return (
//         <div className="flex-1 flex items-center justify-center min-h-[300px] bg-white">
//             <Loader />
//         </div>
//     );

//     // ── Error ─────────────────────────────────────────────────
//     if (isError) return (
//         <div className="flex-1 flex items-center justify-center min-h-[300px] bg-white p-4">
//             <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
//                 <TriangleAlert size={32} className="text-red-400 mx-auto mb-3" />
//                 <h2 className="text-gray-800 font-semibold text-base mb-1">Failed to Load</h2>
//                 <p className="text-gray-400 text-sm mb-5">{error?.data?.message || 'Unable to load session bookings.'}</p>
//                 <button
//                     onClick={() => refetch()}
//                     className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
//                 >
//                     <RefreshCw size={14} />
//                     Retry
//                 </button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="flex flex-col min-h-full bg-white p-3 sm:p-4 lg:p-5 gap-3 sm:gap-4">

//             {/* ── Modal ── */}
//             {selectedSession && (
//                 <div
//                     className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm"
//                     onClick={() => setSelectedSession(null)}
//                 >
//                     <div
//                         className="w-full sm:max-w-lg bg-white border border-gray-200 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] shadow-xl"
//                         onClick={e => e.stopPropagation()}
//                     >
//                         {/* Drag handle mobile */}
//                         <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
//                             <div className="w-10 h-1 rounded-full bg-gray-200" />
//                         </div>

//                         {/* Modal Header */}
//                         <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between shrink-0 border-b border-gray-100">
//                             <div className="flex items-center gap-2.5 min-w-0">
//                                 <div className="w-9 h-9 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
//                                     <User size={15} className="text-[#0098cc]" />
//                                 </div>
//                                 <div className="min-w-0">
//                                     <p className="text-gray-800 font-bold text-sm truncate">{selectedSession.menteeName}</p>
//                                     <p className="text-gray-400 text-xs truncate">{selectedSession.menteeEmail}</p>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={() => setSelectedSession(null)}
//                                 className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all shrink-0"
//                             >
//                                 <X size={14} />
//                             </button>
//                         </div>

//                         {/* Modal Body */}
//                         <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
//                             <div className="flex items-center gap-2 flex-wrap pb-3 mb-1 border-b border-gray-100">
//                                 <StatusBadge status={effectiveStatus(selectedSession)} />
//                                 <PaymentBadge paymentStatus={selectedSession.paymentStatus} isFreeSession={selectedSession.isFreeSession} />
//                             </div>

//                             {[
//                                 { Icon: Tag, label: 'Topic', value: selectedSession.topic },
//                                 { Icon: MessageSquare, label: 'Description', value: selectedSession.description },
//                                 { Icon: Calendar, label: 'Session Date', value: formatDate(selectedSession.sessionDate) },
//                                 { Icon: Clock, label: 'Time Slot', value: `${selectedSession.startTime} → ${selectedSession.endTime}` },
//                                 { Icon: Timer, label: 'Duration', value: `${selectedSession.durationMinutes} minutes` },
//                                 { Icon: Users, label: 'Session Type', value: selectedSession.sessionType },
//                                 { Icon: Mail, label: 'Email', value: selectedSession.email || selectedSession.menteeEmail, copyable: true },
//                                 { Icon: Phone, label: 'Phone', value: selectedSession.phone, copyable: true },
//                                 { Icon: CreditCard, label: 'Price', value: selectedSession.isFreeSession ? 'Free Session' : `${selectedSession.price} (${selectedSession.currency})` },
//                                 { Icon: CreditCard, label: 'Payment Method', value: selectedSession.paymentMethod },
//                                 { Icon: Shield, label: 'Payment Status', value: selectedSession.paymentStatus },
//                                 { Icon: User, label: 'Created By', value: selectedSession.createdBy },
//                             ].map(({ Icon, label, value, copyable }) => {
//                                 if (!value && value !== 0) return null;
//                                 return (
//                                     <div key={label} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
//                                         <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gray-100">
//                                             <Icon size={12} className="text-gray-400" />
//                                         </div>
//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-[10px] uppercase tracking-widest mb-0.5 text-gray-400">{label}</p>
//                                             <p className="text-sm font-medium text-gray-700 break-all">{value}</p>
//                                         </div>
//                                         {copyable && value && (
//                                             <button
//                                                 onClick={() => copy(value, label)}
//                                                 className={`shrink-0 p-1.5 rounded transition-all ${copiedKey === label ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
//                                             >
//                                                 {copiedKey === label ? <Check size={10} /> : <Copy size={10} />}
//                                             </button>
//                                         )}
//                                     </div>
//                                 );
//                             })}

//                             {selectedSession.zoomMeeting && (
//                                 <>
//                                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-3 pb-2">Zoom Meeting Details</p>
//                                     {[
//                                         { Icon: Video, label: 'Meeting ID', value: selectedSession.zoomMeeting.meetingId || selectedSession.zoomMeetingId, copyable: true },
//                                         { Icon: Link2, label: 'Start URL', value: selectedSession.zoomMeeting.startUrl, copyable: true, isLink: true },
//                                     ].map(({ Icon, label, value, copyable, isLink }) => (
//                                         <div key={label} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
//                                             <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gray-100">
//                                                 <Icon size={12} className="text-gray-400" />
//                                             </div>
//                                             <div className="flex-1 min-w-0">
//                                                 <p className="text-[10px] uppercase tracking-widest mb-0.5 text-gray-400">{label}</p>
//                                                 {isLink
//                                                     ? <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0098cc] break-all flex items-center gap-1.5 hover:opacity-80 transition-opacity"><span className="truncate">{value}</span><ExternalLink size={10} /></a>
//                                                     : <p className="text-sm font-medium text-gray-700 break-all">{value}</p>
//                                                 }
//                                             </div>
//                                             {copyable && value && (
//                                                 <button onClick={() => copy(value, label)} className={`shrink-0 p-1.5 rounded transition-all ${copiedKey === label ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
//                                                     {copiedKey === label ? <Check size={10} /> : <Copy size={10} />}
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </>
//                             )}
//                             {!selectedSession.zoomMeeting && selectedSession.meetingLink && (
//                                 <div className="flex items-start gap-3 py-2.5">
//                                     <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gray-100">
//                                         <Video size={12} className="text-gray-400" />
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <p className="text-[10px] uppercase tracking-widest mb-0.5 text-gray-400">Meeting Link</p>
//                                         <a href={selectedSession.meetingLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0098cc] break-all hover:opacity-80">{selectedSession.meetingLink}</a>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Modal Footer */}
//                         <div className="px-4 sm:px-5 py-3 shrink-0 flex gap-2 border-t border-gray-100 bg-gray-50">
//                             {selectedSession.meetingLink ? (
//                                 <a
//                                     href={selectedSession.zoomMeeting?.startUrl || selectedSession.meetingLink}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
//                                 >
//                                     <Video size={14} />
//                                     Start / Join Meeting
//                                 </a>
//                             ) : (
//                                 <div className="flex-1 flex items-center justify-center bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-medium">
//                                     No meeting link
//                                 </div>
//                             )}
//                             <button
//                                 onClick={() => setSelectedSession(null)}
//                                 className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* ── Top Bar ── */}
//             <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3">
//                 <div>
//                     <h1 className="text-gray-800 text-base sm:text-lg lg:text-xl font-bold tracking-tight flex items-center gap-2">
//                         <Calendar size={18} className="text-[#0098cc] shrink-0" />
//                         Session Bookings
//                     </h1>
//                     <p className="text-gray-400 text-xs sm:text-sm mt-0.5 ml-[26px]">
//                         Manage and track all your mentorship sessions
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2 flex-wrap">
//                     {[
//                         { label: 'Total', value: totalSessions, cls: 'text-gray-800' },
//                         { label: 'Confirmed', value: confirmedCount, cls: 'text-emerald-600' },
//                     ].map(({ label, value, cls }) => (
//                         <div key={label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
//                             <span className="text-gray-400 text-xs">{label}</span>
//                             <span className={`text-sm font-bold ${cls}`}>{value}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* ── Mobile Filter Dropdown ── */}
//             <div className="relative sm:hidden">
//                 <button
//                     onClick={() => setMobileFilterOpen(v => !v)}
//                     className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm"
//                 >
//                     <span className="capitalize">{filter === 'all' ? 'All Sessions' : filter}</span>
//                     <ChevronDown size={15} className={`text-gray-400 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
//                 </button>
//                 {mobileFilterOpen && (
//                     <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl overflow-hidden z-20 shadow-lg">
//                         {FILTERS.map(f => (
//                             <button
//                                 key={f}
//                                 onClick={() => { setFilter(f); setMobileFilterOpen(false); }}
//                                 className={`w-full text-left px-4 py-2.5 text-sm capitalize transition-colors ${filter === f ? 'bg-[#0098cc]/10 text-[#0098cc] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
//                             >
//                                 {f === 'all' ? 'All Sessions' : f}
//                                 <span className="ml-2 text-xs text-gray-400">
//                                     ({f === 'all' ? sessions.length : sessions.filter(s => s.status === f).length})
//                                 </span>
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* ── Desktop Filter Pills ── */}
//             <div className="hidden sm:flex items-center gap-2 flex-wrap">
//                 {FILTERS.map(f => {
//                     const count = f === 'all' ? sessions.length : sessions.filter(s => s.status === f).length;
//                     return (
//                         <button
//                             key={f}
//                             onClick={() => setFilter(f)}
//                             className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all capitalize ${filter === f
//                                     ? 'bg-[#1a1a2e] text-white'
//                                     : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 shadow-sm'
//                                 }`}
//                         >
//                             {f}
//                             <span className={`text-[11px] rounded-full px-1.5 py-0.5 ${filter === f ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
//                                 {count}
//                             </span>
//                         </button>
//                     );
//                 })}
//             </div>

//             {/* ── Empty State ── */}
//             {filteredSessions.length === 0 ? (
//                 <div className="flex-1 flex flex-col items-center justify-center py-16 sm:py-20 bg-gray-50 border border-gray-200 rounded-xl">
//                     <CalendarX size={32} className="text-gray-300 mb-3" />
//                     <p className="text-gray-400 text-sm font-semibold">No sessions found</p>
//                     <p className="text-gray-300 text-xs mt-1">
//                         {filter !== 'all' ? `No ${filter} sessions yet` : 'Your bookings will appear here'}
//                     </p>
//                 </div>
//             ) : (
//                 <>
//                     {/* ── Mobile Cards (< sm) ── */}
//                     <div className="flex flex-col gap-3 sm:hidden">
//                         {filteredSessions.map(session => (
//                             <div key={session._id} className={`bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col gap-3 shadow-sm ${session.isExpired ? 'opacity-60 grayscale' : ''}`}>
//                                 <div className="flex items-start justify-between gap-2">
//                                     <div className="flex items-center gap-2.5 min-w-0">
//                                         <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
//                                             <User size={14} className="text-[#0098cc]" />
//                                         </div>
//                                         <div className="min-w-0">
//                                             <p className="text-gray-800 text-sm font-semibold truncate">{session.menteeName}</p>
//                                             <p className="text-gray-400 text-[11px] truncate">{session.menteeEmail}</p>
//                                         </div>
//                                     </div>
//                                     <StatusBadge status={effectiveStatus(session)} />
//                                 </div>
//                                 <div className="bg-gray-50 rounded-lg px-3 py-2">
//                                     <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Topic</p>
//                                     <p className="text-gray-700 text-sm font-medium">{session.topic}</p>
//                                     {session.description && <p className="text-gray-400 text-xs mt-1 line-clamp-2">{session.description}</p>}
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-2">
//                                     {[
//                                         { label: 'Date', value: formatDate(session.sessionDate) },
//                                         { label: 'Time', value: session.startTime, dot: true },
//                                         { label: 'Duration', value: `${session.durationMinutes} min` },
//                                         { label: 'Price', value: session.isFreeSession ? 'Free' : session.price, accent: session.isFreeSession },
//                                     ].map(({ label, value, dot, accent }) => (
//                                         <div key={label} className="bg-gray-50 rounded-lg p-2.5">
//                                             <p className="text-gray-400 text-[10px] mb-1">{label}</p>
//                                             <p className={`text-xs font-medium flex items-center gap-1 ${accent ? 'text-violet-600' : 'text-gray-600'}`}>
//                                                 {dot && <Clock size={9} className="text-[#0098cc]" />}
//                                                 {value}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex items-center justify-between pt-0.5">
//                                     <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
//                                     <button
//                                         onClick={() => !session.isExpired && setSelectedSession(session)}
//                                         disabled={session.isExpired}
//                                         className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${session.isExpired
//                                                 ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
//                                                 : 'bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90'
//                                             }`}
//                                     >
//                                         <Eye size={11} />
//                                         {session.isExpired ? 'Expired' : 'Details'}
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                         <p className="text-gray-300 text-xs text-center py-1">{filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}</p>
//                     </div>

//                     {/* ── Tablet Cards (sm → lg) ── */}
//                     <div className="hidden sm:flex lg:hidden flex-col gap-3">
//                         {filteredSessions.map(session => (
//                             <div key={session._id} className={`bg-white border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm ${session.isExpired ? 'opacity-60 grayscale' : ''}`}>
//                                 <div className="w-10 h-10 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0 mt-0.5">
//                                     <User size={16} className="text-[#0098cc]" />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <div className="flex items-start justify-between gap-3 mb-2">
//                                         <div className="min-w-0">
//                                             <p className="text-gray-800 text-sm font-semibold truncate">{session.menteeName}</p>
//                                             <p className="text-gray-400 text-xs truncate">{session.menteeEmail}</p>
//                                         </div>
//                                         <div className="flex items-center gap-1.5 shrink-0">
//                                             <StatusBadge status={effectiveStatus(session)} />
//                                             <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-700 text-sm font-medium mb-2 truncate">{session.topic}</p>
//                                     <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400">
//                                         <span className="flex items-center gap-1"><Calendar size={11} className="text-[#0098cc]" />{formatDate(session.sessionDate)}</span>
//                                         <span className="flex items-center gap-1"><Clock size={11} className="text-[#0098cc]" />{session.startTime}</span>
//                                         <span className="flex items-center gap-1"><Timer size={11} className="text-[#0098cc]" />{session.durationMinutes} min</span>
//                                         <span className={`font-semibold ${session.isFreeSession ? 'text-violet-600' : 'text-gray-600'}`}>
//                                             {session.isFreeSession ? 'Free' : session.price}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="shrink-0 flex items-center">
//                                     <button
//                                         onClick={() => !session.isExpired && setSelectedSession(session)}
//                                         disabled={session.isExpired}
//                                         className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${session.isExpired
//                                                 ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
//                                                 : 'bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90'
//                                             }`}
//                                     >
//                                         <Eye size={12} />
//                                         {session.isExpired ? 'Expired' : 'Details'}
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                         <p className="text-gray-300 text-xs text-center py-1">{filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}</p>
//                     </div>

//                     {/* ── Desktop Table (lg+) ── */}
//                     <div className="hidden lg:flex flex-col flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//                         <div className="overflow-x-auto flex-1">
//                             <table className="w-full border-collapse min-w-[780px]">
//                                 <thead>
//                                     <tr className="border-b border-gray-100 bg-gray-50">
//                                         {['Mentee', 'Topic', 'Date & Time', 'Duration', 'Type', 'Status', 'Payment', 'Price', 'Action'].map(h => (
//                                             <th key={h} className="px-3 xl:px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
//                                                 {h}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredSessions.map((session, i) => (
//                                         <tr
//                                             key={session._id}
//                                             className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${i % 2 !== 0 ? 'bg-gray-50/50' : ''} ${session.isExpired ? 'opacity-60' : ''}`}
//                                         >
//                                             <td className="px-3 xl:px-4 py-3.5">
//                                                 <div className="flex items-center gap-2.5">
//                                                     <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
//                                                         <User size={13} className="text-[#0098cc]" />
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <p className="text-gray-800 text-sm font-semibold truncate max-w-[130px]">{session.menteeName}</p>
//                                                         <p className="text-gray-400 text-xs truncate max-w-[130px]">{session.menteeEmail}</p>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 max-w-[160px]">
//                                                 <p className="text-gray-700 text-sm font-medium truncate">{session.topic}</p>
//                                                 {session.description && <p className="text-gray-400 text-xs mt-0.5 truncate">{session.description}</p>}
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
//                                                 <div className="flex items-start gap-1.5">
//                                                     <Calendar size={11} className="text-[#0098cc] mt-0.5 shrink-0" />
//                                                     <div>
//                                                         <p className="text-gray-600 text-xs">{formatDate(session.sessionDate)}</p>
//                                                         <p className="text-gray-400 text-xs flex items-center gap-0.5 mt-0.5">
//                                                             <Clock size={9} />{session.startTime}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
//                                                 <span className="text-gray-500 text-xs">{session.durationMinutes} min</span>
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
//                                                 <span className="text-gray-500 text-xs capitalize">{session.sessionType}</span>
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
//                                                 <StatusBadge status={effectiveStatus(session)} />
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
//                                                 <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
//                                                 {session.isFreeSession
//                                                     ? <span className="text-violet-600 text-xs font-semibold">Free</span>
//                                                     : <span className="text-gray-700 text-sm font-semibold">{session.price}</span>
//                                                 }
//                                             </td>
//                                             <td className="px-3 xl:px-4 py-3.5 whitespace-nowrap">
//                                                 <button
//                                                     onClick={() => !session.isExpired && setSelectedSession(session)}
//                                                     disabled={session.isExpired}
//                                                     className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${session.isExpired
//                                                             ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
//                                                             : 'bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90'
//                                                         }`}
//                                                 >
//                                                     <Eye size={11} />
//                                                     {session.isExpired ? 'Expired' : 'View'}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
//                             <p className="text-gray-300 text-xs">
//                                 Showing {filteredSessions.length} of {totalSessions} session{totalSessions !== 1 ? 's' : ''}
//                             </p>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MentorSessionBookings;








import React, { useState, useEffect } from 'react';
import {
    Calendar, User, Video, RefreshCw, TriangleAlert, CalendarX, Clock,
    BadgeCheck, CircleDot, CircleX, CircleCheck, X, Eye, Mail, Phone,
    Link2, Users, CreditCard, Timer, Tag, MessageSquare, Shield, Copy,
    Check, ExternalLink, ChevronDown
} from 'lucide-react';
import { useGetMentorSessionsQuery } from '../MentorDashboardapislice';
import Loader from '../../../global/Loader';

/*
  KEY CHANGE: Uses CSS container queries (@container) instead of viewport
  breakpoints. The root wrapper gets `container-type: inline-size` so all
  child @container rules react to the component's own available width —
  whether the sidebar is open or closed.

  Breakpoints (container width, not viewport):
    < 480px  → mobile cards
    480–720px → tablet cards
    ≥ 720px  → desktop table
*/

const containerStyles = `
  .msb-root {
    container-type: inline-size;
    container-name: msb;
  }

  /* Mobile cards: always visible, hidden at wider container widths */
  .msb-mobile  { display: flex; flex-direction: column; gap: 0.75rem; }
  .msb-tablet  { display: none; }
  .msb-desktop { display: none; }

  /* Filter: mobile dropdown default */
  .msb-filter-mobile  { display: block; position: relative; }
  .msb-filter-desktop { display: none; }

  @container msb (min-width: 480px) {
    .msb-mobile         { display: none; }
    .msb-tablet         { display: flex; flex-direction: column; gap: 0.75rem; }
    .msb-filter-mobile  { display: none; }
    .msb-filter-desktop { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
  }

  @container msb (min-width: 720px) {
    .msb-tablet         { display: none; }
    .msb-desktop        { display: flex; flex-direction: column; flex: 1; }
  }
`;

const MentorSessionBookings = () => {
    const [mentorId, setMentorId] = useState(null);
    const [filter, setFilter] = useState('all');
    const [selectedSession, setSelectedSession] = useState(null);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [copiedKey, setCopiedKey] = useState(null);

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

    const effectiveStatus = (s) => s.isExpired ? 'expired' : s.status;

    const copy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const FILTERS = ['all', 'confirmed', 'pending', 'completed'];

    const filteredSessions = filter === 'all'
        ? sessions
        : sessions.filter(s => effectiveStatus(s) === filter);

    const confirmedCount = sessions.filter(s => s.status === 'confirmed').length;

    useEffect(() => {
        document.body.style.overflow = selectedSession ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedSession]);

    // ── Status badge ──────────────────────────────────────────
    const StatusBadge = ({ status }) => {
        const map = {
            confirmed: { label: 'Confirmed', Icon: BadgeCheck, cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' },
            pending: { label: 'Pending', Icon: CircleDot, cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
            cancelled: { label: 'Cancelled', Icon: CircleX, cls: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
            completed: { label: 'Completed', Icon: CircleCheck, cls: 'bg-blue-50 text-[#0098cc] ring-1 ring-blue-200' },
            expired: { label: 'Expired', Icon: CircleX, cls: 'bg-gray-100 text-gray-400 ring-1 ring-gray-200' },
        };
        const cfg = map[status] || { label: status, Icon: CircleDot, cls: 'bg-gray-100 text-gray-400 ring-1 ring-gray-200' };
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${cfg.cls}`}>
                <cfg.Icon size={10} />
                {cfg.label}
            </span>
        );
    };

    // ── Payment badge ─────────────────────────────────────────
    const PaymentBadge = ({ paymentStatus, isFreeSession }) => {
        if (isFreeSession) return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200">
                Free
            </span>
        );
        const map = {
            paid: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
            pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
            failed: 'bg-red-50 text-red-700 ring-1 ring-red-200',
        };
        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${map[paymentStatus] || 'bg-gray-100 text-gray-400 ring-1 ring-gray-200'}`}>
                {paymentStatus?.charAt(0).toUpperCase() + paymentStatus?.slice(1) || '—'}
            </span>
        );
    };

    // ── Loading ───────────────────────────────────────────────
    if (isLoading) return (
        <div className="msb-root flex-1 flex items-center justify-center min-h-[300px] bg-white">
            <Loader />
        </div>
    );

    // ── Error ─────────────────────────────────────────────────
    if (isError) return (
        <div className="msb-root flex-1 flex items-center justify-center min-h-[300px] bg-white p-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
                <TriangleAlert size={32} className="text-red-400 mx-auto mb-3" />
                <h2 className="text-gray-800 font-semibold text-base mb-1">Failed to Load</h2>
                <p className="text-gray-400 text-sm mb-5">{error?.data?.message || 'Unable to load session bookings.'}</p>
                <button
                    onClick={() => refetch()}
                    className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <RefreshCw size={14} />
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Inject container-query styles once */}
            <style>{containerStyles}</style>

            <div className="msb-root flex flex-col min-h-full bg-white  gap-3" style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}>

                {/* ── Modal ── */}
                {selectedSession && (
                    <div
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSelectedSession(null)}
                    >
                        <div
                            className="w-full sm:max-w-lg bg-white border border-gray-200 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] shadow-xl"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Drag handle mobile */}
                            <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                                <div className="w-10 h-1 rounded-full bg-gray-200" />
                            </div>

                            {/* Modal Header */}
                            <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between shrink-0 border-b border-gray-100">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-9 h-9 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
                                        <User size={15} className="text-[#0098cc]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-gray-800 font-bold text-sm truncate">{selectedSession.menteeName}</p>
                                        <p className="text-gray-400 text-xs truncate">{selectedSession.menteeEmail}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedSession(null)}
                                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all shrink-0"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
                                <div className="flex items-center gap-2 flex-wrap pb-3 mb-1 border-b border-gray-100">
                                    <StatusBadge status={effectiveStatus(selectedSession)} />
                                    <PaymentBadge paymentStatus={selectedSession.paymentStatus} isFreeSession={selectedSession.isFreeSession} />
                                </div>

                                {[
                                    { Icon: Tag, label: 'Topic', value: selectedSession.topic },
                                    { Icon: MessageSquare, label: 'Description', value: selectedSession.description },
                                    { Icon: Calendar, label: 'Session Date', value: formatDate(selectedSession.sessionDate) },
                                    { Icon: Clock, label: 'Time Slot', value: `${selectedSession.startTime} → ${selectedSession.endTime}` },
                                    { Icon: Timer, label: 'Duration', value: `${selectedSession.durationMinutes} minutes` },
                                    { Icon: Users, label: 'Session Type', value: selectedSession.sessionType },
                                    { Icon: Mail, label: 'Email', value: selectedSession.email || selectedSession.menteeEmail, copyable: true },
                                    { Icon: Phone, label: 'Phone', value: selectedSession.phone, copyable: true },
                                    { Icon: CreditCard, label: 'Price', value: selectedSession.isFreeSession ? 'Free Session' : `${selectedSession.price} (${selectedSession.currency})` },
                                    { Icon: CreditCard, label: 'Payment Method', value: selectedSession.paymentMethod },
                                    { Icon: Shield, label: 'Payment Status', value: selectedSession.paymentStatus },
                                    { Icon: User, label: 'Created By', value: selectedSession.createdBy },
                                ].map(({ Icon, label, value, copyable }) => {
                                    if (!value && value !== 0) return null;
                                    return (
                                        <div key={label} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                                            <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gray-100">
                                                <Icon size={12} className="text-gray-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] uppercase tracking-widest mb-0.5 text-gray-400">{label}</p>
                                                <p className="text-sm font-medium text-gray-700 break-all">{value}</p>
                                            </div>
                                            {copyable && value && (
                                                <button
                                                    onClick={() => copy(value, label)}
                                                    className={`shrink-0 p-1.5 rounded transition-all ${copiedKey === label ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                                >
                                                    {copiedKey === label ? <Check size={10} /> : <Copy size={10} />}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}

                                {selectedSession.zoomMeeting && (
                                    <>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-3 pb-2">Zoom Meeting Details</p>
                                        {[
                                            { Icon: Video, label: 'Meeting ID', value: selectedSession.zoomMeeting.meetingId || selectedSession.zoomMeetingId, copyable: true },
                                            { Icon: Link2, label: 'Start URL', value: selectedSession.zoomMeeting.startUrl, copyable: true, isLink: true },
                                        ].map(({ Icon, label, value, copyable, isLink }) => (
                                            <div key={label} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                                                <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gray-100">
                                                    <Icon size={12} className="text-gray-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] uppercase tracking-widest mb-0.5 text-gray-400">{label}</p>
                                                    {isLink
                                                        ? <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0098cc] break-all flex items-center gap-1.5 hover:opacity-80 transition-opacity"><span className="truncate">{value}</span><ExternalLink size={10} /></a>
                                                        : <p className="text-sm font-medium text-gray-700 break-all">{value}</p>
                                                    }
                                                </div>
                                                {copyable && value && (
                                                    <button onClick={() => copy(value, label)} className={`shrink-0 p-1.5 rounded transition-all ${copiedKey === label ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                                                        {copiedKey === label ? <Check size={10} /> : <Copy size={10} />}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}
                                {!selectedSession.zoomMeeting && selectedSession.meetingLink && (
                                    <div className="flex items-start gap-3 py-2.5">
                                        <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gray-100">
                                            <Video size={12} className="text-gray-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] uppercase tracking-widest mb-0.5 text-gray-400">Meeting Link</p>
                                            <a href={selectedSession.meetingLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0098cc] break-all hover:opacity-80">{selectedSession.meetingLink}</a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="px-4 sm:px-5 py-3 shrink-0 flex gap-2 border-t border-gray-100 bg-gray-50">
                                {selectedSession.meetingLink ? (
                                    <a
                                        href={selectedSession.zoomMeeting?.startUrl || selectedSession.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
                                    >
                                        <Video size={14} />
                                        Start / Join Meeting
                                    </a>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-medium">
                                        No meeting link
                                    </div>
                                )}
                                <button
                                    onClick={() => setSelectedSession(null)}
                                    className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Top Bar ── */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-gray-800 text-base font-bold tracking-tight flex items-center gap-2">
                            <Calendar size={18} className="text-[#0098cc] shrink-0" />
                            Session Bookings
                        </h1>
                        <p className="text-gray-400 text-xs mt-0.5 ml-[26px]">
                            Manage and track all your mentorship sessions
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {[
                            { label: 'Total', value: totalSessions, cls: 'text-gray-800' },
                            { label: 'Confirmed', value: confirmedCount, cls: 'text-emerald-600' },
                        ].map(({ label, value, cls }) => (
                            <div key={label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                                <span className="text-gray-400 text-xs">{label}</span>
                                <span className={`text-sm font-bold ${cls}`}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Mobile Filter Dropdown (< 480px container) ── */}
                <div className="msb-filter-mobile">
                    <button
                        onClick={() => setMobileFilterOpen(v => !v)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm"
                    >
                        <span className="capitalize">{filter === 'all' ? 'All Sessions' : filter}</span>
                        <ChevronDown size={15} className={`text-gray-400 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileFilterOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl overflow-hidden z-20 shadow-lg">
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => { setFilter(f); setMobileFilterOpen(false); }}
                                    className={`w-full text-left px-4 py-2.5 text-sm capitalize transition-colors ${filter === f ? 'bg-[#0098cc]/10 text-[#0098cc] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    {f === 'all' ? 'All Sessions' : f}
                                    <span className="ml-2 text-xs text-gray-400">
                                        ({f === 'all' ? sessions.length : sessions.filter(s => s.status === f).length})
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Desktop Filter Pills (≥ 480px container) ── */}
                <div className="msb-filter-desktop">
                    {FILTERS.map(f => {
                        const count = f === 'all' ? sessions.length : sessions.filter(s => s.status === f).length;
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${filter === f
                                    ? 'bg-[#1a1a2e] text-white'
                                    : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 shadow-sm'
                                    }`}
                            >
                                {f}
                                <span className={`text-[11px] rounded-full px-1.5 py-0.5 ${filter === f ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ── Empty State ── */}
                {filteredSessions.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-16 bg-gray-50 border border-gray-200 rounded-xl">
                        <CalendarX size={32} className="text-gray-300 mb-3" />
                        <p className="text-gray-400 text-sm font-semibold">No sessions found</p>
                        <p className="text-gray-300 text-xs mt-1">
                            {filter !== 'all' ? `No ${filter} sessions yet` : 'Your bookings will appear here'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* ── Mobile Cards (container < 480px) ── */}
                        <div className="msb-mobile">
                            {filteredSessions.map(session => (
                                <div key={session._id} className={`bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col gap-3 shadow-sm ${session.isExpired ? 'opacity-60 grayscale' : ''}`}>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
                                                <User size={14} className="text-[#0098cc]" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-gray-800 text-sm font-semibold truncate">{session.menteeName}</p>
                                                <p className="text-gray-400 text-[11px] truncate">{session.menteeEmail}</p>
                                            </div>
                                        </div>
                                        <StatusBadge status={effectiveStatus(session)} />
                                    </div>
                                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                                        <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Topic</p>
                                        <p className="text-gray-700 text-sm font-medium">{session.topic}</p>
                                        {session.description && <p className="text-gray-400 text-xs mt-1 line-clamp-2">{session.description}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { label: 'Date', value: formatDate(session.sessionDate) },
                                            { label: 'Time', value: session.startTime, dot: true },
                                            { label: 'Duration', value: `${session.durationMinutes} min` },
                                            { label: 'Price', value: session.isFreeSession ? 'Free' : session.price, accent: session.isFreeSession },
                                        ].map(({ label, value, dot, accent }) => (
                                            <div key={label} className="bg-gray-50 rounded-lg p-2.5">
                                                <p className="text-gray-400 text-[10px] mb-1">{label}</p>
                                                <p className={`text-xs font-medium flex items-center gap-1 ${accent ? 'text-violet-600' : 'text-gray-600'}`}>
                                                    {dot && <Clock size={9} className="text-[#0098cc]" />}
                                                    {value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-0.5">
                                        <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
                                        <button
                                            onClick={() => !session.isExpired && setSelectedSession(session)}
                                            disabled={session.isExpired}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${session.isExpired
                                                ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90'
                                                }`}
                                        >
                                            <Eye size={11} />
                                            {session.isExpired ? 'Expired' : 'Details'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <p className="text-gray-300 text-xs text-center py-1">{filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}</p>
                        </div>

                        {/* ── Tablet Cards (container 480–720px) ── */}
                        <div className="msb-tablet">
                            {filteredSessions.map(session => (
                                <div key={session._id} className={`bg-white border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm ${session.isExpired ? 'opacity-60 grayscale' : ''}`}>
                                    <div className="w-10 h-10 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <User size={16} className="text-[#0098cc]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div className="min-w-0">
                                                <p className="text-gray-800 text-sm font-semibold truncate">{session.menteeName}</p>
                                                <p className="text-gray-400 text-xs truncate">{session.menteeEmail}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <StatusBadge status={effectiveStatus(session)} />
                                                <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm font-medium mb-2 truncate">{session.topic}</p>
                                        <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><Calendar size={11} className="text-[#0098cc]" />{formatDate(session.sessionDate)}</span>
                                            <span className="flex items-center gap-1"><Clock size={11} className="text-[#0098cc]" />{session.startTime}</span>
                                            <span className="flex items-center gap-1"><Timer size={11} className="text-[#0098cc]" />{session.durationMinutes} min</span>
                                            <span className={`font-semibold ${session.isFreeSession ? 'text-violet-600' : 'text-gray-600'}`}>
                                                {session.isFreeSession ? 'Free' : session.price}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex items-center">
                                        <button
                                            onClick={() => !session.isExpired && setSelectedSession(session)}
                                            disabled={session.isExpired}
                                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${session.isExpired
                                                ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90'
                                                }`}
                                        >
                                            <Eye size={12} />
                                            {session.isExpired ? 'Expired' : 'Details'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <p className="text-gray-300 text-xs text-center py-1">{filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}</p>
                        </div>

                        {/* ── Desktop Table (container ≥ 720px) ── */}
                        <div className="msb-desktop bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full border-collapse" style={{ minWidth: '680px' }}>
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50">
                                            {['Mentee', 'Topic', 'Date & Time', 'Duration', 'Type', 'Status', 'Payment', 'Price', 'Action'].map(h => (
                                                <th key={h} className="px-3 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSessions.map((session, i) => (
                                            <tr
                                                key={session._id}
                                                className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${i % 2 !== 0 ? 'bg-gray-50/50' : ''} ${session.isExpired ? 'opacity-60' : ''}`}
                                            >
                                                <td className="px-3 py-3.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-full bg-[#0098cc]/10 flex items-center justify-center shrink-0">
                                                            <User size={13} className="text-[#0098cc]" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-gray-800 text-sm font-semibold truncate max-w-[120px]">{session.menteeName}</p>
                                                            <p className="text-gray-400 text-xs truncate max-w-[120px]">{session.menteeEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3.5 max-w-[140px]">
                                                    <p className="text-gray-700 text-sm font-medium truncate">{session.topic}</p>
                                                    {session.description && <p className="text-gray-400 text-xs mt-0.5 truncate">{session.description}</p>}
                                                </td>
                                                <td className="px-3 py-3.5 whitespace-nowrap">
                                                    <div className="flex items-start gap-1.5">
                                                        <Calendar size={11} className="text-[#0098cc] mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-gray-600 text-xs">{formatDate(session.sessionDate)}</p>
                                                            <p className="text-gray-400 text-xs flex items-center gap-0.5 mt-0.5">
                                                                <Clock size={9} />{session.startTime}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3.5 whitespace-nowrap">
                                                    <span className="text-gray-500 text-xs">{session.durationMinutes} min</span>
                                                </td>
                                                <td className="px-3 py-3.5 whitespace-nowrap">
                                                    <span className="text-gray-500 text-xs capitalize">{session.sessionType}</span>
                                                </td>
                                                <td className="px-3 py-3.5 whitespace-nowrap">
                                                    <StatusBadge status={effectiveStatus(session)} />
                                                </td>
                                                <td className="px-3 py-3.5 whitespace-nowrap">
                                                    <PaymentBadge paymentStatus={session.paymentStatus} isFreeSession={session.isFreeSession} />
                                                </td>
                                                <td className="px-3 py-3.5 whitespace-nowrap">
                                                    {session.isFreeSession
                                                        ? <span className="text-violet-600 text-xs font-semibold">Free</span>
                                                        : <span className="text-gray-700 text-sm font-semibold">{session.price}</span>
                                                    }
                                                </td>
                                                <td className="px-3 py-3.5 whitespace-nowrap">
                                                    <button
                                                        onClick={() => !session.isExpired && setSelectedSession(session)}
                                                        disabled={session.isExpired}
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${session.isExpired
                                                            ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                                            : 'bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90'
                                                            }`}
                                                    >
                                                        <Eye size={11} />
                                                        {session.isExpired ? 'Expired' : 'View'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
                                <p className="text-gray-300 text-xs">
                                    Showing {filteredSessions.length} of {totalSessions} session{totalSessions !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default MentorSessionBookings;




