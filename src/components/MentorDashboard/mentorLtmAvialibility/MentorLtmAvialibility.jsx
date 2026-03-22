// // import React, { useEffect, useState } from "react";
// // import {
// //   useGetMentorAvailabilityQuery,
// //   useUpsertMentorAvailabilityMutation,
// //   useGetMentorUnavailabilityQuery,
// //   useAddMentorUnavailabilityMutation,
// //   useDeleteMentorUnavailabilityMutation,
// // } from "./mentorLtmAvialibilityapislice";
// // import Loader from "../../../global/Loader";

// // /* ═══════════════════════════════════════════════════════════════════════════
// //    CONSTANTS
// // ═══════════════════════════════════════════════════════════════════════════ */

// // const TIMEZONES = [
// //   { label: "UTC+05:30 — Asia/Kolkata (IST)", value: "Asia/Kolkata" },
// //   { label: "UTC+00:00 — Europe/London (GMT)", value: "Europe/London" },
// //   { label: "UTC+01:00 — Europe/Paris (CET)", value: "Europe/Paris" },
// //   { label: "UTC+02:00 — Europe/Helsinki (EET)", value: "Europe/Helsinki" },
// //   { label: "UTC+03:00 — Europe/Moscow (MSK)", value: "Europe/Moscow" },
// //   { label: "UTC+03:30 — Asia/Tehran (IRST)", value: "Asia/Tehran" },
// //   { label: "UTC+04:00 — Asia/Dubai (GST)", value: "Asia/Dubai" },
// //   { label: "UTC+04:30 — Asia/Kabul (AFT)", value: "Asia/Kabul" },
// //   { label: "UTC+05:00 — Asia/Karachi (PKT)", value: "Asia/Karachi" },
// //   { label: "UTC+05:45 — Asia/Kathmandu (NPT)", value: "Asia/Kathmandu" },
// //   { label: "UTC+06:00 — Asia/Dhaka (BST)", value: "Asia/Dhaka" },
// //   { label: "UTC+06:30 — Asia/Yangon (MMT)", value: "Asia/Yangon" },
// //   { label: "UTC+07:00 — Asia/Bangkok (ICT)", value: "Asia/Bangkok" },
// //   { label: "UTC+08:00 — Asia/Singapore (SGT)", value: "Asia/Singapore" },
// //   { label: "UTC+08:00 — Asia/Shanghai (CST)", value: "Asia/Shanghai" },
// //   { label: "UTC+09:00 — Asia/Tokyo (JST)", value: "Asia/Tokyo" },
// //   { label: "UTC+09:00 — Asia/Seoul (KST)", value: "Asia/Seoul" },
// //   { label: "UTC+09:30 — Australia/Darwin (ACST)", value: "Australia/Darwin" },
// //   { label: "UTC+10:00 — Australia/Sydney (AEST)", value: "Australia/Sydney" },
// //   { label: "UTC+12:00 — Pacific/Auckland (NZST)", value: "Pacific/Auckland" },
// //   { label: "UTC-03:00 — America/Sao_Paulo (BRT)", value: "America/Sao_Paulo" },
// //   { label: "UTC-04:00 — America/Halifax (ADT)", value: "America/Halifax" },
// //   { label: "UTC-05:00 — America/New_York (EST)", value: "America/New_York" },
// //   { label: "UTC-06:00 — America/Chicago (CST)", value: "America/Chicago" },
// //   { label: "UTC-07:00 — America/Denver (MST)", value: "America/Denver" },
// //   { label: "UTC-08:00 — America/Los_Angeles (PST)", value: "America/Los_Angeles" },
// //   { label: "UTC-09:00 — America/Anchorage (AKST)", value: "America/Anchorage" },
// //   { label: "UTC-10:00 — Pacific/Honolulu (HST)", value: "Pacific/Honolulu" },
// // ];

// // const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// // const DAY_TO_INDEX = {  Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4,  };
// // const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

// // const UNAVAIL_REASONS = [
// //   "Family Emergency", "Health Reason", "Personal Reason", "Work Reason",
// //   "Travel Plans", "Public Holiday", "Conference / Event", "Other",
// // ];

// // /**
// //  * Only 1, 3, 6 are shown as individual buttons.
// //  * When ALL THREE are selected simultaneously → stored as 0 (unlimited) in DB.
// //  */
// // const MONTH_OPTIONS = [
// //   { value: 1, label: "1 Month", desc: "Short term" },
// //   { value: 3, label: "3 Months", desc: "One quarter" },
// //   { value: 6, label: "6 Months", desc: "Half year" },
// // ];

// // /**
// //  * selectedMonths: Set<number> of currently highlighted values (1, 3, 6).
// //  * Sent to API as a sorted array e.g. [1, 3] or [1, 3, 6].
// //  */
// // const toApiMonths = (set) => [...set].sort((a, b) => a - b);
// // const fromApiMonths = (arr) => new Set(Array.isArray(arr) ? arr.map(Number) : [Number(arr)]);

// // /* ═══════════════════════════════════════════════════════════════════════════
// //    DESIGN TOKENS
// // ═══════════════════════════════════════════════════════════════════════════ */

// // const C = {
// //   bg: "#030f0a",
// //   surface: "#071a10",
// //   surfaceAlt: "#0a2318",
// //   border: "#0f4028",
// //   borderHover: "#1a6040",
// //   accent: "#00c8a0",
// //   accentDim: "#007a62",
// //   accentGlow: "rgba(0,200,160,0.15)",
// //   accentSoft: "rgba(0,200,160,0.08)",
// //   gold: "#f0b429",
// //   goldDim: "#7a5c00",
// //   goldBg: "#1a1400",
// //   red: "#f05060",
// //   redDim: "#7a1d28",
// //   redBg: "#150508",
// //   text: "#e8fff8",
// //   textMuted: "#5a9e82",
// //   textDim: "#2a6648",
// // };

// // const FIELD = {
// //   background: C.bg,
// //   border: `1.5px solid ${C.border}`,
// //   color: C.text,
// //   transition: "border-color 0.2s",
// // };

// // /* ═══════════════════════════════════════════════════════════════════════════
// //    HELPERS
// // ═══════════════════════════════════════════════════════════════════════════ */

// // const fmtDate = (s) =>
// //   s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

// // const fmtDateShort = (s) =>
// //   s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";

// // const calcEndDate = (startDate, months) => {
// //   if (!startDate || months === 0) return null;
// //   const end = new Date(startDate);
// //   end.setMonth(end.getMonth() + months);
// //   return end;
// // };

// // const daysUntil = (date) => {
// //   if (!date) return null;
// //   const diff = new Date(date) - new Date();
// //   return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
// // };

// // const getActiveUnavailForDay = (records = [], dayName) => {
// //   const dayIdx = DAY_TO_INDEX[dayName];
// //   const today = new Date(); today.setHours(0, 0, 0, 0);
// //   return records.find((u) => {
// //     if (!u.daysOfWeek?.includes(dayIdx)) return false;
// //     const from = new Date(u.unavailableFrom); from.setHours(0, 0, 0, 0);
// //     const to = new Date(u.unavailableTo); to.setHours(23, 59, 59, 999);
// //     return today >= from && today <= to;
// //   }) || null;
// // };

// // /* ═══════════════════════════════════════════════════════════════════════════
// //    PRIMITIVES
// // ═══════════════════════════════════════════════════════════════════════════ */

// // const Toggle = ({ checked, onChange }) => (
// //   <button
// //     type="button"
// //     role="switch"
// //     aria-checked={checked}
// //     onClick={() => onChange(!checked)}
// //     className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 focus:outline-none"
// //     style={{ background: checked ? C.accent : "#0a2318", boxShadow: checked ? `0 0 12px ${C.accentGlow}` : "none" }}
// //   >
// //     <span
// //       className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
// //       style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
// //     />
// //   </button>
// // );

// // const Card = ({ children, className = "", style = {}, glow = false }) => (
// //   <div
// //     className={`rounded-2xl ${className}`}
// //     style={{
// //       background: C.surface,
// //       border: `1.5px solid ${C.border}`,
// //       boxShadow: glow ? `0 0 32px ${C.accentGlow}, 0 4px 24px rgba(0,0,0,0.5)` : "0 4px 24px rgba(0,0,0,0.4)",
// //       ...style,
// //     }}
// //   >
// //     {children}
// //   </div>
// // );

// // const FieldLabel = ({ children }) => (
// //   <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest" style={{ color: C.accentDim }}>
// //     {children}
// //   </label>
// // );

// // const Divider = ({ className = "" }) => (
// //   <div className={`h-px w-full ${className}`} style={{ background: C.border }} />
// // );

// // const Badge = ({ children, color = C.accent, bg = C.surfaceAlt, glow = false }) => (
// //   <span
// //     className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold"
// //     style={{
// //       background: bg,
// //       border: `1.5px solid ${color}`,
// //       color,
// //       boxShadow: glow ? `0 0 10px ${color}33` : "none",
// //     }}
// //   >
// //     {children}
// //   </span>
// // );

// // /* ─── Subscription status banner ─────────────────────────────────────────── */
// // const SubscriptionBanner = ({ subscriptionStartDate, availableForMonths }) => {
// //   if (!subscriptionStartDate) return null;

// //   // availableForMonths is now an array e.g. [1, 3] or [1, 3, 6]
// //   const monthsArr = Array.isArray(availableForMonths) ? availableForMonths : [availableForMonths];
// //   const isUnlimited = monthsArr.length === 3;
// //   const maxMo = isUnlimited ? 0 : Math.max(...monthsArr);
// //   const endDate = (!isUnlimited && subscriptionStartDate)
// //     ? (() => { const d = new Date(subscriptionStartDate); d.setMonth(d.getMonth() + maxMo); return d; })()
// //     : null;
// //   const remaining = daysUntil(endDate);
// //   const isExpired = !isUnlimited && remaining === 0;
// //   const isWarning = !isUnlimited && remaining !== null && remaining <= 14;

// //   const borderColor = isExpired ? C.red : isWarning ? C.gold : C.accent;
// //   const bgColor = isExpired ? C.redBg : isWarning ? C.goldBg : C.accentSoft;
// //   const dotColor = isExpired ? C.red : isUnlimited ? C.accent : isWarning ? C.gold : C.accent;

// //   return (
// //     <div
// //       className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4"
// //       style={{ background: bgColor, border: `1.5px solid ${borderColor}` }}
// //     >
// //       <div className="flex items-center gap-3">
// //         <span className="relative flex h-3 w-3">
// //           <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: dotColor }} />
// //           <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: dotColor }} />
// //         </span>
// //         <div>
// //           <p className="text-xs font-bold text-white sm:text-sm">
// //              Subscription Plan
// //           </p>

// //         </div>
// //       </div>

// //       {isUnlimited && (
// //         <Badge color={C.accent} bg={C.surface} glow>
// //           <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M6 8H5a4 4 0 0 0 0 8h1" />
// //             <line x1="6" y1="12" x2="18" y2="12" />
// //           </svg>
// //           All Months
// //         </Badge>
// //       )}
// //       {!isUnlimited && (
// //         <div className="flex flex-wrap gap-1.5">
// //           {[...monthsArr].sort((a, b) => a - b).map((m) => (
// //             <Badge key={m} color={C.accentDim} bg={C.accentSoft}>{m} mo</Badge>
// //           ))}
// //         </div>
// //       )}
// //       {isExpired && (
// //         <Badge color={C.red} bg={C.redBg}>Renew Now</Badge>
// //       )}
// //     </div>
// //   );
// // };

// // /* ─── DayChip ─────────────────────────────────────────────────────────────── */
// // const DayChip = ({ day, slot, blocked }) => {
// //   if (!slot) {
// //     return (
// //       <div
// //         className="flex items-center gap-3 rounded-xl px-4 py-3"
// //         style={{ background: C.bg, border: `1.5px dashed ${C.border}`, opacity: 0.4 }}
// //       >
// //         <span className="w-9 text-[11px] font-bold uppercase tracking-widest" style={{ color: C.textDim }}>{day}</span>
// //         <span className="text-xs italic" style={{ color: C.textDim }}>Rest day</span>
// //       </div>
// //     );
// //   }
// //   if (blocked) {
// //     return (
// //       <div
// //         className="relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3"
// //         style={{ background: C.redBg, border: `1.5px solid ${C.redDim}` }}
// //       >
// //         <span
// //           className="absolute right-0 top-0 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white"
// //           style={{ background: C.red, borderBottomLeftRadius: 8 }}
// //         >BLOCKED</span>
// //         <span className="w-9 flex-shrink-0 text-[11px] font-bold uppercase tracking-widest text-red-400">{day}</span>
// //         <div className="min-w-0 flex-1">
// //           <p className="truncate text-xs font-semibold text-red-400">{blocked.reason}</p>
// //           <p className="text-[10px]" style={{ color: C.redDim }}>
// //             Until {fmtDateShort(blocked.unavailableTo)}
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }
// //   return (
// //     <div
// //       className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
// //       style={{ background: C.bg, border: `1.5px solid ${C.borderHover}`, boxShadow: `inset 0 0 0 0 ${C.accentGlow}` }}
// //     >
// //       <span className="w-9 flex-shrink-0 text-[11px] font-bold uppercase tracking-widest" style={{ color: C.accent }}>{day}</span>
// //       <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full" style={{ background: C.border }}>
// //         <div
// //           className="absolute h-full rounded-full"
// //           style={{
// //             background: `linear-gradient(90deg, ${C.accent}, #00f5d4)`,
// //             left: `${(parseInt(slot.from) / 24) * 100}%`,
// //             width: `${Math.max(((parseInt(slot.to) - parseInt(slot.from)) / 24) * 100, 4)}%`,
// //             boxShadow: `0 0 8px ${C.accent}66`,
// //           }}
// //         />
// //       </div>
// //       <span className="flex-shrink-0 whitespace-nowrap text-xs font-bold tabular-nums" style={{ color: C.accent }}>
// //         {slot.from}–{slot.to}
// //       </span>
// //     </div>
// //   );
// // };

// // /* ─── AvailabilityPreview ─────────────────────────────────────────────────── */
// // const AvailabilityPreview = ({
// //   daySlots, sessionsPerWeek, availableForMonths, timeZone, notes,
// //   unavailRecords, subscriptionStartDate, onEdit,
// // }) => (
// //   <Card className="mb-5" glow>
// //     {/* Subscription banner */}
// //     <div className="px-5 pt-5">
// //       <SubscriptionBanner
// //         subscriptionStartDate={subscriptionStartDate}
// //         availableForMonths={availableForMonths}
// //       />
// //     </div>

// //     {/* Header row */}
// //     <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-3">
// //       <div className="flex items-center gap-3">
// //         <div
// //           className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
// //           style={{ background: C.accentSoft, border: `1.5px solid ${C.accentDim}` }}
// //         >
// //           <div className="h-2.5 w-2.5 rounded-full" style={{ background: C.accent, boxShadow: `0 0 0 4px ${C.accentGlow}` }} />
// //         </div>
// //         <div>
// //           <h3 className="text-sm font-extrabold text-white">Current Schedule</h3>
// //           <p className="text-[11px]" style={{ color: C.textMuted }}>
// //             {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
// //           </p>
// //         </div>
// //       </div>
// //       <button
// //         onClick={onEdit}
// //         className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all hover:opacity-80"
// //         style={{ background: C.accentSoft, border: `1.5px solid ${C.accentDim}`, color: C.accent }}
// //       >
// //         <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //           <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
// //           <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
// //         </svg>
// //         Edit
// //       </button>
// //     </div>

// //     {/* Stat pills */}
// //     <div className="flex flex-wrap items-center gap-2 px-5 pb-4">
// //       <Badge color={C.accent} bg={C.accentSoft} glow>
// //         {sessionsPerWeek} session{sessionsPerWeek > 1 ? "s" : ""}/wk
// //       </Badge>
// //       <Badge color={C.accent} bg={C.surfaceAlt} glow={availableForMonths.length === 3}>
// //         {availableForMonths.length === 3
// //           ? "All months"
// //           : availableForMonths.map(m => `${m}mo`).join(" + ")}
// //       </Badge>
// //       <Badge color={C.textMuted} bg={C.surfaceAlt}>
// //         🌐 {timeZone.replace(/_/g, " ")}
// //       </Badge>
// //     </div>

// //     <Divider />

// //     {/* Day grid */}
// //     <div className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-2">
// //       {ALL_DAYS.map((day) => {
// //         const slot = daySlots.find((s) => s.day === day);
// //         const blocked = slot ? getActiveUnavailForDay(unavailRecords, day) : null;
// //         return <DayChip key={day} day={day} slot={slot} blocked={blocked} />;
// //       })}
// //     </div>

// //     {/* Legend */}
// //     <div className="flex flex-wrap gap-4 px-5 pb-4">
// //       {[[C.accent, "Available"], [C.red, "Blocked today"], [C.textDim, "Rest day"]].map(([c, l]) => (
// //         <div key={l} className="flex items-center gap-1.5">
// //           <span className="h-2 w-2 rounded-full" style={{ background: c }} />
// //           <span className="text-[11px]" style={{ color: C.textMuted }}>{l}</span>
// //         </div>
// //       ))}
// //     </div>

// //     {notes && (
// //       <div className="mx-5 mb-5 rounded-xl px-4 py-3" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
// //         <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>📝 {notes}</p>
// //       </div>
// //     )}
// //   </Card>
// // );

// // /* ─── DeleteConfirmModal ──────────────────────────────────────────────────── */
// // const DeleteConfirmModal = ({ record, onConfirm, onCancel, deleting }) => (
// //   <div
// //     className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
// //     style={{ background: "rgba(3,10,8,0.92)" }}
// //     onClick={(e) => e.target === e.currentTarget && onCancel()}
// //   >
// //     <div
// //       className="w-full max-w-sm overflow-hidden rounded-2xl"
// //       style={{ background: C.surface, border: `1.5px solid ${C.redDim}`, boxShadow: `0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(240,80,96,0.1)` }}
// //     >
// //       <div className="p-6">
// //         <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: C.redBg }}>
// //           <svg className="h-5 w-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
// //             <polyline points="3 6 5 6 21 6" />
// //             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //             <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
// //           </svg>
// //         </div>
// //         <h3 className="mb-2 text-base font-extrabold text-white">Remove this block?</h3>
// //         <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
// //           The <strong className="text-red-400">{record?.reason}</strong> block (
// //           {fmtDate(record?.unavailableFrom)} → {fmtDate(record?.unavailableTo)}) will be deleted and those sessions will become bookable again.
// //         </p>
// //       </div>
// //       <div className="flex gap-3 px-6 pb-6">
// //         <button
// //           onClick={onCancel}
// //           className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition hover:opacity-75"
// //           style={{ background: C.surfaceAlt, border: `1.5px solid ${C.border}`, color: C.textMuted }}
// //         >Cancel</button>
// //         <button
// //           onClick={onConfirm}
// //           disabled={deleting}
// //           className="flex-1 rounded-xl py-2.5 text-sm font-extrabold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
// //           style={{ background: C.red }}
// //         >{deleting ? "Removing…" : "Delete Block"}</button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // /* ═══════════════════════════════════════════════════════════════════════════
// //    MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════════════════ */

// // const MentorAvailability = () => {
// //   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
// //   const mentorId = userData?._id;

// //   /* ── UI state ── */
// //   const [tab, setTab] = useState("ltm");
// //   const [hasSaved, setHasSaved] = useState(false);
// //   const [isEditMode, setIsEditMode] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [deleteTarget, setDeleteTarget] = useState(null);

// //   /* ── Availability form state ── */
// //   const [selectedMonths, setSelectedMonths] = useState(new Set([1]));
// //   const [maxMonths, setMaxMonths] = useState(1);
// //   // what we send to the API — sorted array e.g. [1, 3]
// //   const availableForMonths = toApiMonths(selectedMonths);
// //   // effective max for subscription end date display
// //   const effectiveMaxMonths = selectedMonths.size === 3 ? 0 : Math.max(...selectedMonths);
// //   const [sessionsPerWeek, setSessionsPerWeek] = useState(1);
// //   const [timeZone, setTimeZone] = useState("Asia/Kolkata");
// //   const [availNotes, setAvailNotes] = useState("");
// //   const [snapshot, setSnapshot] = useState(null);
// //   // selectedMonths is derived above — no separate useState needed
// //   const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);
// //   const [daySlots, setDaySlots] = useState(
// //     ALL_DAYS.map((d) => ({
// //       day: d, enabled: ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(d),
// //       from: "09:00", to: "10:00",
// //     }))
// //   );

// //   /* ── Unavailability form state ── */
// //   const [unavailForm, setUnavailForm] = useState({
// //     unavailableFrom: "", unavailableTo: "",
// //     daysOfWeek: [], timeZone: "Asia/Kolkata",
// //     reason: "", customReason: "", notes: "",
// //   });

// //   /* ── API hooks ── */
// //   const { data: availData, isLoading: loadingAvail } = useGetMentorAvailabilityQuery(mentorId);
// //   const [upsertAvailability, { isLoading: saving }] = useUpsertMentorAvailabilityMutation();
// //   const { data: unavailData, isLoading: loadingUnavail } = useGetMentorUnavailabilityQuery(mentorId);
// //   const [addUnavailability, { isLoading: addingUnavail }] = useAddMentorUnavailabilityMutation();
// //   const [deleteUnavailability, { isLoading: deletingUnavail }] = useDeleteMentorUnavailabilityMutation();

// //   /* ── Hydrate from API ── */
// //   useEffect(() => {
// //     if (availData?.success && availData.data) {
// //       const d = availData.data;
// //       const slots = ALL_DAYS.map((day) => {
// //         const s = d.daySlots?.find((x) => x.day === day);
// //         return s ? { day, enabled: true, from: s.from, to: s.to }
// //           : { day, enabled: false, from: "09:00", to: "10:00" };
// //       });
// //       const spw = d.availableDaysPerWeek || 1;
// //       const tz = d.timeZone || "Asia/Kolkata";
// //       const nts = d.notes || "";
// //       // 0 = unlimited, default 1
// //       const afm = d.availableForMonths != null ? d.availableForMonths : 1;
// //       const ssd = d.subscriptionStartDate || null;

// //       setDaySlots(slots);
// //       setSessionsPerWeek(spw);
// //       setTimeZone(tz);
// //       setAvailNotes(nts);
// //       setSelectedMonths(fromApiMonths(afm));
// //       setSubscriptionStartDate(ssd);
// //       setHasSaved(true);
// //       setIsEditMode(false);
// //       setSnapshot({ daySlots: slots, sessionsPerWeek: spw, timeZone: tz, availNotes: nts, selectedMonths: fromApiMonths(afm) });
// //     }
// //   }, [availData]);

// //   /* ── Sync timezone into unavail form ── */
// //   useEffect(() => { setUnavailForm((p) => ({ ...p, timeZone })); }, [timeZone]);

// //   /* ── Auto-compute affected days for unavail form ── */
// //   useEffect(() => {
// //     const { unavailableFrom, unavailableTo } = unavailForm;
// //     if (!unavailableFrom || !unavailableTo) {
// //       setUnavailForm((p) => ({ ...p, daysOfWeek: [] }));
// //       return;
// //     }
// //     const mentorIdxs = daySlots.filter((s) => s.enabled).map((s) => DAY_TO_INDEX[s.day]);
// //     const affected = new Set();
// //     for (let d = new Date(unavailableFrom); d <= new Date(unavailableTo); d.setDate(d.getDate() + 1)) {
// //       if (mentorIdxs.includes(d.getDay())) affected.add(d.getDay());
// //     }
// //     setUnavailForm((p) => ({ ...p, daysOfWeek: [...affected] }));
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [unavailForm.unavailableFrom, unavailForm.unavailableTo, daySlots]);

// //   /* ── Helpers ── */
// //   const toggleDay = (i) => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s));
// //   const updateSlot = (i, f, v) => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, [f]: v } : s));

// //   const handleEdit = () => {
// //     setSnapshot({ daySlots: [...daySlots], sessionsPerWeek, timeZone, availNotes, selectedMonths: new Set(selectedMonths) });
// //     setIsEditMode(true);
// //   };

// //   const handleCancel = () => {
// //     if (snapshot) {
// //       setDaySlots(snapshot.daySlots);
// //       setSessionsPerWeek(snapshot.sessionsPerWeek);
// //       setTimeZone(snapshot.timeZone);
// //       setAvailNotes(snapshot.availNotes);
// //       setSelectedMonths(snapshot.selectedMonths);
// //     }
// //     setIsEditMode(false);
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const enabled = daySlots.filter((s) => s.enabled).map(({ day, from, to }) => ({ day, from, to }));
// //       await upsertAvailability({
// //         mentorId,
// //         daySlots: enabled,
// //         availableDaysPerWeek: sessionsPerWeek,
// //         timeZone,
// //         notes: availNotes,
// //         availableForMonths,
// //       }).unwrap();
// //       setHasSaved(true);
// //       setIsEditMode(false);
// //       setSnapshot({ daySlots: [...daySlots], sessionsPerWeek, timeZone, availNotes, selectedMonths: new Set(selectedMonths) });
// //     } catch (err) { console.error(err); }
// //   };

// //   const handleSubmitUnavailability = async (e) => {
// //     e.preventDefault();
// //     const finalReason = unavailForm.reason === "Other"
// //       ? (unavailForm.customReason.trim() || "Other") : unavailForm.reason;
// //     try {
// //       await addUnavailability({ mentorId, ...unavailForm, reason: finalReason }).unwrap();
// //       setShowModal(false);
// //       setUnavailForm({ unavailableFrom: "", unavailableTo: "", daysOfWeek: [], timeZone, reason: "", customReason: "", notes: "" });
// //     } catch (err) { console.error(err); }
// //   };

// //   const handleDeleteConfirm = async () => {
// //     if (!deleteTarget) return;
// //     try {
// //       await deleteUnavailability({ mentorId, unavailId: deleteTarget._id }).unwrap();
// //       setDeleteTarget(null);
// //     } catch (err) { console.error(err); }
// //   };

// //   if (loadingAvail || loadingUnavail) return <Loader />;

// //   const previewSlots = daySlots.filter((s) => s.enabled).map(({ day, from, to }) => ({ day, from, to }));
// //   const unavailRecords = unavailData?.data || [];
// //   const showPreviewOnly = hasSaved && !isEditMode;
// //   const affectedDayNames = [...(unavailForm.daysOfWeek || [])].sort((a, b) => a - b).map((i) => ALL_DAYS[i]);

// //   /* ── Subscription end date for unavail date picker max ── */
// //   const subEndDate = effectiveMaxMonths === 0
// //     ? ""
// //     : calcEndDate(subscriptionStartDate, effectiveMaxMonths)?.toISOString().slice(0, 10) || "";

// //   const submitDisabled =
// //     addingUnavail || !affectedDayNames.length || !unavailForm.reason ||
// //     (unavailForm.reason === "Other" && !unavailForm.customReason.trim());

// //   /* ══════════════════════════════════════════════════════════════════════════
// //      RENDER
// //   ══════════════════════════════════════════════════════════════════════════ */
// //   return (
// //     <div className="min-h-screen" style={{ background: C.bg, color: C.text }}>

// //       {/* ── Tab bar ──────────────────────────────────────────────────────── */}
// //       <div
// //         className="sticky top-0 z-40 flex"
// //         style={{ background: C.bg, borderBottom: `1.5px solid ${C.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
// //       >
// //         {[{ key: "ltm", label: "Schedule", icon: "📅" }, { key: "unavailability", label: "Blocked Dates", icon: "🚫" }].map(({ key, label, icon }) => (
// //           <button
// //             key={key}
// //             onClick={() => setTab(key)}
// //             className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold transition-all duration-200 focus:outline-none sm:py-5"
// //             style={{
// //               borderBottom: `3px solid ${tab === key ? C.accent : "transparent"}`,
// //               color: tab === key ? C.accent : C.textMuted,
// //               background: tab === key ? `${C.accentSoft}` : "transparent",
// //             }}
// //           >
// //             <span>{icon}</span>
// //             <span>{label}</span>
// //             {tab === key && (
// //               <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.accent, boxShadow: `0 0 6px ${C.accent}` }} />
// //             )}
// //           </button>
// //         ))}
// //       </div>

// //       {/* ════════════════ LTM TAB ═══════════════════════════════════════════ */}
// //       {tab === "ltm" && (
// //         <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8">

// //           {/* Page title */}
// //           <div className="mb-6">
// //             <h1 className="text-2xl font-black text-white sm:text-3xl">LTM Availability</h1>
// //             <p className="mt-1 text-sm" style={{ color: C.textMuted }}>
// //               Configure your weekly schedule for long-term mentoring sessions.
// //             </p>
// //           </div>

// //           {/* ── Preview Mode ── */}
// //           {showPreviewOnly && (
// //             <AvailabilityPreview
// //               daySlots={previewSlots}
// //               sessionsPerWeek={sessionsPerWeek}
// //               availableForMonths={availableForMonths}
// //               timeZone={timeZone}
// //               notes={availNotes}
// //               unavailRecords={unavailRecords}
// //               subscriptionStartDate={subscriptionStartDate}
// //               onEdit={handleEdit}
// //             />
// //           )}

// //           {/* ── Edit / Create Mode ── */}
// //           {!showPreviewOnly && (
// //             <div className="flex flex-col gap-4">

// //               {/* Editing banner */}
// //               {isEditMode && (
// //                 <div
// //                   className="flex items-center gap-3 rounded-2xl px-5 py-3.5"
// //                   style={{ background: C.goldBg, border: `1.5px solid ${C.goldDim}` }}
// //                 >
// //                   <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
// //                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
// //                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
// //                   </svg>
// //                   <p className="text-xs font-semibold sm:text-sm" style={{ color: C.gold }}>
// //                     Editing mode — changes take effect only after you save.
// //                   </p>
// //                 </div>
// //               )}

// //               {/* ── Combined Card: Sessions/Week + Available For — full width, stacked ── */}
// //               <Card className="overflow-hidden !p-0">

// //                 {/* ── SECTION 1: Sessions / Week ────────────────────────────── */}
// //                 <div className="p-5 sm:p-6">
// //                   <div className="mb-1 flex items-center justify-between">
// //                     <FieldLabel>Sessions / Week</FieldLabel>
// //                     <span
// //                       className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold"
// //                       style={{ background: C.accentSoft, color: C.accent, border: `1px solid ${C.accentDim}` }}
// //                     >{sessionsPerWeek}/wk</span>
// //                   </div>
// //                   <p className="mb-4 text-xs" style={{ color: C.textMuted }}>
// //                     How many LTM sessions per week?
// //                   </p>

// //                   {/* Number buttons — equal columns across full width */}
// //                   <div className="grid grid-cols-5 gap-2 sm:gap-3">
// //                     {[1, 2, 3, 4, 5].map((n) => (
// //                       <button
// //                         key={n}
// //                         type="button"
// //                         onClick={() => setSessionsPerWeek(n)}
// //                         className="flex flex-col items-center justify-center rounded-xl py-3 sm:py-4 transition-all"
// //                         style={{
// //                           border: `2px solid ${sessionsPerWeek === n ? C.accent : C.border}`,
// //                           background: sessionsPerWeek === n ? C.accentSoft : C.bg,
// //                           boxShadow: sessionsPerWeek === n ? `0 0 12px ${C.accentGlow}` : "none",
// //                         }}
// //                       >
// //                         <span
// //                           className="text-lg font-extrabold leading-none sm:text-xl"
// //                           style={{ color: sessionsPerWeek === n ? C.accent : C.textMuted }}
// //                         >{n}</span>
// //                         <span
// //                           className="mt-1 text-[9px] font-bold sm:text-[10px]"
// //                           style={{ color: sessionsPerWeek === n ? C.accentDim : C.textDim }}
// //                         >
// //                           {n === 1 ? "once" : n === 2 ? "twice" : `${n}×`}
// //                         </span>
// //                       </button>
// //                     ))}
// //                   </div>

// //                   {/* Intensity bar */}
// //                   <div className="mt-4">
// //                     <div className="mb-1.5 flex items-center justify-between">
// //                       <span className="text-[10px]" style={{ color: C.textMuted }}>Intensity</span>
// //                       <span className="text-[10px] font-bold" style={{ color: C.accent }}>
// //                         {["Light", "Steady", "Active", "Intense", "Full"][sessionsPerWeek - 1]}
// //                       </span>
// //                     </div>
// //                     <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: C.border }}>
// //                       <div
// //                         className="h-full rounded-full transition-all duration-500"
// //                         style={{
// //                           width: `${(sessionsPerWeek / 5) * 100}%`,
// //                           background: `linear-gradient(90deg, ${C.accentDim}, ${C.accent})`,
// //                           boxShadow: `0 0 8px ${C.accentGlow}`,
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* ── Divider ───────────────────────────────────────────────── */}
// //                 <div style={{ height: "1.5px", background: C.border, margin: "0 0" }} />

// //                 {/* ── SECTION 2: Available For ──────────────────────────────── */}
// //                 <div className="p-5 sm:p-6">
// //                   <div className="mb-1 flex items-center justify-between">
// //                     <FieldLabel>Available For</FieldLabel>
// //                     <button
// //                       type="button"
// //                       onClick={() =>
// //                         setSelectedMonths((prev) =>
// //                           prev.size === 3 ? new Set([1]) : new Set([1, 3, 6])
// //                         )
// //                       }
// //                       className="text-[10px] font-bold uppercase tracking-widest transition hover:opacity-75"
// //                       style={{ color: selectedMonths.size === 3 ? C.red : C.accentDim }}
// //                     >
// //                       {selectedMonths.size === 3 ? "Deselect all" : "Select all"}
// //                     </button>
// //                   </div>
// //                   <p className="mb-4 text-xs" style={{ color: C.textMuted }}>
// //                     Pick one or more windows. Selecting all three means you're open for any duration.
// //                   </p>

// //                   {/* Month buttons — 3 equal columns across full width */}
// //                   <div className="grid grid-cols-3 gap-2 sm:gap-3">
// //                     {MONTH_OPTIONS.map(({ value, label, desc }) => {
// //                       const on = selectedMonths.has(value);
// //                       return (
// //                         <button
// //                           key={value}
// //                           type="button"
// //                           onClick={() =>
// //                             setSelectedMonths((prev) => {
// //                               const next = new Set(prev);
// //                               if (next.has(value)) {
// //                                 if (next.size > 1) next.delete(value);
// //                               } else {
// //                                 next.add(value);
// //                               }
// //                               return next;
// //                             })
// //                           }
// //                           className="relative flex flex-col items-center rounded-xl py-4 px-3 transition-all"
// //                           style={{
// //                             border: `2px solid ${on ? C.accent : C.border}`,
// //                             background: on ? C.accentSoft : C.bg,
// //                             boxShadow: on ? `0 0 14px ${C.accentGlow}` : "none",
// //                           }}
// //                         >
// //                           {on && (
// //                             <span
// //                               className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-extrabold"
// //                               style={{ background: C.accent, color: C.bg }}
// //                             >✓</span>
// //                           )}
// //                           <span
// //                             className="text-xl font-extrabold leading-none sm:text-2xl"
// //                             style={{ color: on ? C.accent : C.textMuted }}
// //                           >{value}</span>
// //                           <span
// //                             className="mt-0.5 text-xs font-bold sm:text-sm"
// //                             style={{ color: on ? C.accent : C.textMuted }}
// //                           >mo</span>
// //                           <span
// //                             className="mt-1.5 text-[10px] sm:text-[11px]"
// //                             style={{ color: on ? C.accentDim : C.textDim }}
// //                           >{desc}</span>
// //                         </button>
// //                       );
// //                     })}
// //                   </div>

// //                   {/* Summary strip — shows exact combination selected */}
// //                   <div
// //                     className="mt-4 flex flex-wrap items-center gap-2 rounded-xl px-4 py-2.5"
// //                     style={{ background: C.bg, border: `1px solid ${C.border}` }}
// //                   >
// //                     <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: C.accent }} />
// //                     {selectedMonths.size === 3 ? (
// //                       <span className="text-xs font-semibold" style={{ color: C.accent }}>
// //                         All months selected — no fixed expiry
// //                       </span>
// //                     ) : (
// //                       <span className="flex flex-wrap items-center gap-1.5 text-xs" style={{ color: C.textMuted }}>
// //                         Open for
// //                         {[...selectedMonths].sort((a, b) => a - b).map((m, idx, arr) => (
// //                           <React.Fragment key={m}>
// //                             <strong
// //                               className="rounded-md px-1.5 py-0.5 font-extrabold"
// //                               style={{ background: C.accentSoft, color: C.accent, border: `1px solid ${C.accentDim}` }}
// //                             >{m} mo</strong>
// //                             {idx < arr.length - 1 && (
// //                               <span style={{ color: C.textDim }}>+</span>
// //                             )}
// //                           </React.Fragment>
// //                         ))}
// //                       </span>
// //                     )}
// //                   </div>

// //                   {/* Subscription window info */}
// //                   {subscriptionStartDate && (
// //                     <div
// //                       className="mt-3 flex flex-wrap items-center gap-2 rounded-xl px-4 py-2.5"
// //                       style={{ background: C.bg, border: `1px solid ${C.border}` }}
// //                     >
// //                       <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
// //                         <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
// //                       </svg>
// //                       <span className="text-xs" style={{ color: C.textMuted }}>
// //                         Since <strong className="text-white">{fmtDate(subscriptionStartDate)}</strong>
// //                       </span>
// //                       {effectiveMaxMonths !== 0 && (
// //                         <>
// //                           <span style={{ color: C.textDim }}>·</span>
// //                           <span className="text-xs" style={{ color: C.textMuted }}>
// //                             Ends <strong className="text-white">
// //                               {fmtDate(calcEndDate(subscriptionStartDate, effectiveMaxMonths))}
// //                             </strong>
// //                           </span>
// //                         </>
// //                       )}
// //                       {effectiveMaxMonths === 0 && (
// //                         <Badge color={C.accent} bg={C.accentSoft}>No expiry</Badge>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* ── SECTION 3: Timezone ───────────────────────────────────── */}
// //                 <div style={{ height: "1.5px", background: C.border }} />
// //                 <div className="p-5 sm:p-6">
// //                   <FieldLabel>Timezone</FieldLabel>
// //                   <p className="mb-3 text-xs" style={{ color: C.textMuted }}>Bookings are shown in this zone.</p>
// //                   <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
// //                     <select
// //                       value={timeZone}
// //                       onChange={(e) => setTimeZone(e.target.value)}
// //                       className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none sm:flex-1"
// //                       style={FIELD}
// //                     >
// //                       {TIMEZONES.map((tz) => (
// //                         <option key={tz.value} value={tz.value}>{tz.label}</option>
// //                       ))}
// //                     </select>
// //                     <div
// //                       className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5"
// //                       style={{ background: C.bg, border: `1.5px solid ${C.accentDim}` }}
// //                     >
// //                       <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: C.accent }} />
// //                       <span className="truncate text-xs font-semibold" style={{ color: C.accent }}>
// //                         {timeZone.replace(/_/g, " ")}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //               </Card>

// //               {/* ── Card 3: Weekly Schedule ── */}
// //               <Card className="overflow-hidden !p-0">
// //                 <div className="border-b px-5 py-4" style={{ borderColor: C.border }}>
// //                   <h3 className="text-sm font-extrabold text-white">Weekly Schedule</h3>
// //                   <p className="mt-0.5 text-xs" style={{ color: C.textMuted }}>Toggle days and set your available hours</p>
// //                 </div>
// //                 <div>
// //                   {daySlots.map((slot, i) => (
// //                     <div key={`${slot.day}-${i}`}>
// //                       <div
// //                         className="flex flex-wrap items-center gap-3 px-5 py-3.5 transition-colors sm:flex-nowrap"
// //                         style={{ background: slot.enabled ? C.surface : C.bg }}
// //                       >
// //                         <div className="flex flex-shrink-0 items-center gap-3">
// //                           <Toggle checked={slot.enabled} onChange={() => toggleDay(i)} />
// //                           <span
// //                             className="w-9 text-[11px] font-extrabold uppercase tracking-widest"
// //                             style={{ color: slot.enabled ? C.accent : C.textDim }}
// //                           >{slot.day}</span>
// //                         </div>

// //                         {slot.enabled ? (
// //                           <div className="flex flex-1 flex-wrap items-center gap-2 sm:gap-3">
// //                             <div className="flex items-center gap-2">
// //                               <span className="text-xs" style={{ color: C.textMuted }}>From</span>
// //                               <select
// //                                 value={slot.from}
// //                                 onChange={(e) => updateSlot(i, "from", e.target.value)}
// //                                 className="rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
// //                                 style={{ ...FIELD, color: C.accent }}
// //                               >
// //                                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
// //                               </select>
// //                             </div>
// //                             <div className="flex items-center gap-2">
// //                               <span className="text-xs" style={{ color: C.textMuted }}>To</span>
// //                               <select
// //                                 value={slot.to}
// //                                 onChange={(e) => updateSlot(i, "to", e.target.value)}
// //                                 className="rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
// //                                 style={{ ...FIELD, color: C.accent }}
// //                               >
// //                                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
// //                               </select>
// //                             </div>
// //                             <div className="ml-auto flex items-center gap-1.5">
// //                               <button
// //                                 type="button"
// //                                 title="Add another slot for this day"
// //                                 onClick={() =>
// //                                   setDaySlots((p) => {
// //                                     const c = [...p];
// //                                     c.splice(i + 1, 0, { day: slot.day, enabled: true, from: slot.from, to: slot.to });
// //                                     return c;
// //                                   })
// //                                 }
// //                                 className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:opacity-70"
// //                                 style={{ background: C.accentSoft, border: `1px solid ${C.accentDim}` }}
// //                               >
// //                                 <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
// //                                   <path d="M12 5v14M5 12h14" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" />
// //                                 </svg>
// //                               </button>
// //                               <button
// //                                 type="button"
// //                                 title="Remove this slot"
// //                                 onClick={() => setDaySlots((p) => p.filter((_, idx) => idx !== i))}
// //                                 className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:opacity-70"
// //                                 style={{ background: C.redBg, border: `1px solid ${C.redDim}` }}
// //                               >
// //                                 <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
// //                                   <path d="M5 12h14" stroke={C.red} strokeWidth="2.5" strokeLinecap="round" />
// //                                 </svg>
// //                               </button>
// //                             </div>
// //                           </div>
// //                         ) : (
// //                           <span className="text-xs italic" style={{ color: C.textDim }}>Not available</span>
// //                         )}
// //                       </div>
// //                       {i < daySlots.length - 1 && (
// //                         <div className="mx-5 h-px" style={{ background: C.border }} />
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </Card>

// //               {/* ── Card 4: Notes ── */}
// //               <Card>
// //                 <div className="p-5 sm:p-6">
// //                   <FieldLabel>
// //                     Notes for learners{" "}
// //                     <span className="text-[10px] font-normal normal-case tracking-normal" style={{ color: C.textDim }}>(optional)</span>
// //                   </FieldLabel>
// //                   <textarea
// //                     rows={3}
// //                     value={availNotes}
// //                     onChange={(e) => setAvailNotes(e.target.value)}
// //                     placeholder="e.g. I prefer sessions in the evening…"
// //                     className="mt-2 w-full resize-y rounded-xl px-4 py-3 text-sm focus:outline-none"
// //                     style={{ ...FIELD, lineHeight: 1.8 }}
// //                   />
// //                 </div>
// //               </Card>

// //               {/* ── Action buttons ── */}
// //               <div className="flex items-center justify-end gap-3 pt-1">
// //                 <button
// //                   onClick={isEditMode ? handleCancel : () => setTab("unavailability")}
// //                   className="rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-75"
// //                   style={{ background: C.surfaceAlt, border: `1.5px solid ${C.border}`, color: C.textMuted }}
// //                 >
// //                   {isEditMode ? "Cancel" : "Close"}
// //                 </button>
// //                 <button
// //                   onClick={handleSave}
// //                   disabled={saving}
// //                   className="rounded-xl px-6 py-2.5 text-sm font-extrabold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
// //                   style={{ background: C.accent, boxShadow: `0 4px 20px ${C.accentGlow}` }}
// //                 >
// //                   {saving ? "Saving…" : "Save Availability"}
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* ════════════════ UNAVAILABILITY TAB ════════════════════════════════ */}
// //       {tab === "unavailability" && (
// //         <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8">

// //           {/* Header */}
// //           <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
// //             <div>
// //               <h1 className="text-2xl font-black text-white sm:text-3xl">Blocked Dates</h1>
// //               <p className="mt-1 text-sm" style={{ color: C.textMuted }}>
// //                 Block date ranges — your available days within that period are blocked automatically.
// //               </p>
// //             </div>
// //             <button
// //               onClick={() => setShowModal(true)}
// //               className="flex flex-shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold text-white transition hover:opacity-80"
// //               style={{ background: C.accent, boxShadow: `0 4px 16px ${C.accentGlow}` }}
// //             >
// //               <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
// //                 <path d="M12 5v14M5 12h14" />
// //               </svg>
// //               Add Block
// //             </button>
// //           </div>

// //           {/* Subscription context strip */}
// //           {subscriptionStartDate && (
// //             <SubscriptionBanner
// //               subscriptionStartDate={subscriptionStartDate}
// //               availableForMonths={availableForMonths}
// //             />
// //           )}

// //           {/* Empty state */}
// //           {!unavailRecords.length ? (
// //             <Card className="py-20 text-center">
// //               <div className="mb-4 text-5xl">🎉</div>
// //               <p className="mb-1 text-base font-extrabold text-white">No blocked periods</p>
// //               <p className="text-sm" style={{ color: C.textMuted }}>All your available days are open for bookings.</p>
// //             </Card>
// //           ) : (
// //             <div className="flex flex-col gap-3">
// //               {unavailRecords.map((u) => {
// //                 const isActive = (() => {
// //                   const today = new Date(); today.setHours(0, 0, 0, 0);
// //                   const from = new Date(u.unavailableFrom); from.setHours(0, 0, 0, 0);
// //                   const to = new Date(u.unavailableTo); to.setHours(23, 59, 59, 999);
// //                   return today >= from && today <= to;
// //                 })();

// //                 const isPast = new Date(u.unavailableTo) < new Date();

// //                 const blocked = (u.daysOfWeek || [])
// //                   .filter((idx) => previewSlots.some((s) => DAY_TO_INDEX[s.day] === idx))
// //                   .sort((a, b) => a - b)
// //                   .map((idx) => ALL_DAYS[idx]);

// //                 return (
// //                   <div
// //                     key={u._id}
// //                     className="rounded-2xl overflow-hidden"
// //                     style={{
// //                       background: C.surface,
// //                       border: `1.5px solid ${isActive ? C.red : isPast ? C.border : C.redDim}`,
// //                       opacity: isPast ? 0.65 : 1,
// //                     }}
// //                   >
// //                     {/* Status bar */}
// //                     <div
// //                       className="flex items-center justify-between px-5 py-2"
// //                       style={{
// //                         background: isActive ? C.redBg : isPast ? C.bg : C.surface,
// //                         borderBottom: `1px solid ${isActive ? C.redDim : C.border}`,
// //                       }}
// //                     >
// //                       <div className="flex items-center gap-2">
// //                         <span
// //                           className="h-1.5 w-1.5 rounded-full"
// //                           style={{ background: isActive ? C.red : isPast ? C.textDim : C.gold }}
// //                         />
// //                         <span className="text-[10px] font-extrabold uppercase tracking-widest"
// //                           style={{ color: isActive ? C.red : isPast ? C.textDim : C.gold }}>
// //                           {isActive ? "Active Now" : isPast ? "Past" : "Upcoming"}
// //                         </span>
// //                       </div>
// //                       <button
// //                         onClick={() => setDeleteTarget(u)}
// //                         className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold text-red-400 transition hover:opacity-75"
// //                         style={{ background: C.redBg, border: `1px solid ${C.redDim}` }}
// //                       >
// //                         <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                           <polyline points="3 6 5 6 21 6" />
// //                           <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //                         </svg>
// //                         Delete
// //                       </button>
// //                     </div>

// //                     <div className="p-5">
// //                       {/* Reason + date range */}
// //                       <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
// //                         <p className="text-sm font-extrabold text-white sm:text-base">{u.reason}</p>
// //                         <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
// //                           <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
// //                             <rect x="3" y="4" width="18" height="18" rx="2" />
// //                             <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
// //                             <line x1="3" y1="10" x2="21" y2="10" />
// //                           </svg>
// //                           <span className="text-[11px] font-semibold tabular-nums" style={{ color: C.textMuted }}>
// //                             {fmtDateShort(u.unavailableFrom)}
// //                             <span className="mx-1.5" style={{ color: C.textDim }}>→</span>
// //                             {fmtDateShort(u.unavailableTo)}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       {/* Blocked day chips */}
// //                       {blocked.length > 0 && (
// //                         <div className="flex flex-wrap gap-1.5">
// //                           {blocked.map((d) => {
// //                             const sl = previewSlots.find((s) => s.day === d);
// //                             return (
// //                               <div
// //                                 key={d}
// //                                 className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
// //                                 style={{ background: C.redBg, border: `1.5px solid ${C.redDim}` }}
// //                               >
// //                                 <span className="text-xs font-bold text-red-400">{d}</span>
// //                                 {sl && <span className="text-[10px]" style={{ color: C.redDim }}>{sl.from}–{sl.to}</span>}
// //                               </div>
// //                             );
// //                           })}
// //                         </div>
// //                       )}

// //                       {u.notes && (
// //                         <p className="mt-3 text-xs italic" style={{ color: C.textMuted }}>{u.notes}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* ════════ ADD UNAVAILABILITY MODAL ════════════════════════════════════ */}
// //       {showModal && (
// //         <div
// //           className="fixed inset-0 z-40 flex items-end justify-center overflow-y-auto p-0 backdrop-blur-sm sm:items-center sm:p-4"
// //           style={{ background: "rgba(3,10,8,0.92)" }}
// //           onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
// //         >
// //           <div
// //             className="w-full max-w-lg overflow-hidden rounded-t-3xl sm:rounded-2xl"
// //             style={{ background: C.surface, border: `1.5px solid ${C.border}`, boxShadow: "0 24px 60px rgba(0,0,0,0.8)" }}
// //           >
// //             {/* Modal header */}
// //             <div className="px-6 pt-6 pb-5 sm:px-7" style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
// //               <div className="mx-auto mb-4 h-1 w-10 rounded-full sm:hidden" style={{ background: C.border }} />
// //               <div className="flex items-start justify-between gap-4">
// //                 <div>
// //                   <p className="text-base font-extrabold text-white">Block a Date Range</p>
// //                   <p className="mt-0.5 text-xs" style={{ color: C.textMuted }}>
// //                     Your available days within this window will be marked blocked
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowModal(false)}
// //                   className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-xl transition hover:opacity-75 focus:outline-none"
// //                   style={{ background: C.surfaceAlt, color: C.textMuted }}
// //                 >×</button>
// //               </div>

// //               {/* Progress indicator */}
// //               <div className="mt-4 flex items-center gap-2">
// //                 {[
// //                   { done: !!(unavailForm.unavailableFrom && unavailForm.unavailableTo), label: "Dates" },
// //                   { done: !!unavailForm.reason, label: "Reason" },
// //                   { done: affectedDayNames.length > 0, label: "Days confirmed" },
// //                 ].map(({ done, label }, idx) => (
// //                   <React.Fragment key={label}>
// //                     <div className="flex items-center gap-1.5">
// //                       <div
// //                         className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-extrabold transition-all"
// //                         style={{
// //                           background: done ? C.accent : C.surfaceAlt,
// //                           border: `1.5px solid ${done ? C.accent : C.border}`,
// //                           color: done ? C.bg : C.textDim,
// //                           boxShadow: done ? `0 0 8px ${C.accentGlow}` : "none",
// //                         }}
// //                       >{done ? "✓" : idx + 1}</div>
// //                       <span className="text-[10px] font-medium" style={{ color: done ? C.accent : C.textDim }}>{label}</span>
// //                     </div>
// //                     {idx < 2 && <div className="flex-1 h-px" style={{ background: C.border }} />}
// //                   </React.Fragment>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Form */}
// //             <form
// //               onSubmit={handleSubmitUnavailability}
// //               className="flex flex-col gap-4 overflow-y-auto p-6 sm:p-7"
// //               style={{ maxHeight: "70vh" }}
// //             >

// //               {/* Date range */}
// //               <div className="grid grid-cols-2 gap-3">
// //                 {[
// //                   { label: "From", key: "unavailableFrom" },
// //                   { label: "To", key: "unavailableTo" },
// //                 ].map(({ label, key }) => (
// //                   <div key={key}>
// //                     <FieldLabel>{label} <span className="text-red-400">*</span></FieldLabel>
// //                     <input
// //                       type="date"
// //                       required
// //                       value={unavailForm[key]}
// //                       min={new Date().toISOString().slice(0, 10)}
// //                       max={subEndDate || undefined}
// //                       onChange={(e) => setUnavailForm((p) => ({ ...p, [key]: e.target.value }))}
// //                       className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
// //                       style={FIELD}
// //                     />
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Subscription window hint */}
// //               {subscriptionStartDate && effectiveMaxMonths !== 0 && (
// //                 <div
// //                   className="flex items-center gap-2 rounded-xl px-4 py-2.5"
// //                   style={{ background: C.accentSoft, border: `1px solid ${C.accentDim}` }}
// //                 >
// //                   <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2">
// //                     <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
// //                   </svg>
// //                   <p className="text-xs" style={{ color: C.accent }}>
// //                     Your subscription runs until <strong>{fmtDate(subEndDate)}</strong>. Blocks outside this window won't apply.
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Affected days preview */}
// //               {unavailForm.unavailableFrom && unavailForm.unavailableTo && (
// //                 <div
// //                   className="rounded-xl p-4"
// //                   style={{
// //                     background: affectedDayNames.length ? C.redBg : C.bg,
// //                     border: `1.5px solid ${affectedDayNames.length ? C.redDim : C.border}`,
// //                   }}
// //                 >
// //                   <p className="mb-2 text-xs font-bold sm:text-sm"
// //                     style={{ color: affectedDayNames.length ? "#f87171" : C.textMuted }}>
// //                     {affectedDayNames.length
// //                       ? `${affectedDayNames.length} session day${affectedDayNames.length > 1 ? "s" : ""} will be blocked:`
// //                       : "⚠️ No available days fall in this range"}
// //                   </p>
// //                   {affectedDayNames.length > 0 && (
// //                     <div className="flex flex-wrap gap-1.5">
// //                       {affectedDayNames.map((d) => {
// //                         const sl = previewSlots.find((s) => s.day === d);
// //                         return (
// //                           <div
// //                             key={d}
// //                             className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
// //                             style={{ background: C.surface, border: `1.5px solid ${C.redDim}` }}
// //                           >
// //                             <span className="text-xs font-extrabold text-red-400">{d}</span>
// //                             {sl && <span className="text-[10px]" style={{ color: C.redDim }}>{sl.from}–{sl.to}</span>}
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Reason */}
// //               <div>
// //                 <FieldLabel>Reason <span className="text-red-400">*</span></FieldLabel>
// //                 <select
// //                   required
// //                   value={unavailForm.reason}
// //                   onChange={(e) => setUnavailForm((p) => ({ ...p, reason: e.target.value, customReason: "" }))}
// //                   className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
// //                   style={{ ...FIELD, color: !unavailForm.reason ? C.textMuted : C.text }}
// //                 >
// //                   <option value="" disabled>Select a reason…</option>
// //                   {UNAVAIL_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
// //                 </select>

// //                 {unavailForm.reason === "Other" && (
// //                   <div className="mt-3">
// //                     <FieldLabel>Specify reason <span className="text-red-400">*</span></FieldLabel>
// //                     <input
// //                       type="text"
// //                       required
// //                       placeholder="Describe your reason…"
// //                       value={unavailForm.customReason}
// //                       onChange={(e) => setUnavailForm((p) => ({ ...p, customReason: e.target.value }))}
// //                       className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
// //                       style={{ background: C.redBg, border: `1.5px solid ${C.redDim}`, color: C.text }}
// //                     />
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Timezone */}
// //               <div>
// //                 <FieldLabel>Timezone <span className="text-red-400">*</span></FieldLabel>
// //                 <select
// //                   required
// //                   value={unavailForm.timeZone}
// //                   onChange={(e) => setUnavailForm((p) => ({ ...p, timeZone: e.target.value }))}
// //                   className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
// //                   style={FIELD}
// //                 >
// //                   {TIMEZONES.map((tz) => (
// //                     <option key={tz.value} value={tz.value}>{tz.label}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Notes */}
// //               <div>
// //                 <FieldLabel>
// //                   Notes{" "}
// //                   <span className="text-[10px] font-normal normal-case tracking-normal" style={{ color: C.textDim }}>(optional)</span>
// //                 </FieldLabel>
// //                 <textarea
// //                   rows={3}
// //                   value={unavailForm.notes}
// //                   onChange={(e) => setUnavailForm((p) => ({ ...p, notes: e.target.value }))}
// //                   placeholder="Any extra context for your learners…"
// //                   className="w-full resize-y rounded-xl px-3 py-2.5 text-sm focus:outline-none"
// //                   style={{ ...FIELD, lineHeight: 1.8 }}
// //                 />
// //               </div>

// //               <button
// //                 type="submit"
// //                 disabled={submitDisabled}
// //                 className="w-full rounded-xl py-3.5 text-sm font-extrabold tracking-wide text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35 sm:text-base"
// //                 style={{
// //                   background: submitDisabled ? C.surfaceAlt : C.accent,
// //                   boxShadow: submitDisabled ? "none" : `0 4px 20px ${C.accentGlow}`,
// //                 }}
// //               >
// //                 {addingUnavail ? "Saving…" : "Confirm Block"}
// //               </button>

// //               {!affectedDayNames.length && unavailForm.unavailableFrom && unavailForm.unavailableTo && (
// //                 <p className="-mt-1 text-center text-xs" style={{ color: C.textMuted }}>
// //                   Pick a range that overlaps with at least one of your available days.
// //                 </p>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* ════════ DELETE CONFIRM ══════════════════════════════════════════════ */}
// //       {deleteTarget && (
// //         <DeleteConfirmModal
// //           record={deleteTarget}
// //           onConfirm={handleDeleteConfirm}
// //           onCancel={() => setDeleteTarget(null)}
// //           deleting={deletingUnavail}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default MentorAvailability;
// import React, { useEffect, useState } from "react";
// import {
//   useGetMentorAvailabilityQuery,
//   useUpsertMentorAvailabilityMutation,
//   useGetMentorUnavailabilityQuery,
//   useAddMentorUnavailabilityMutation,
//   useDeleteMentorUnavailabilityMutation,
// } from "./mentorLtmAvialibilityapislice";
// import Loader from "../../../global/Loader";

// /* ─── Google Fonts injected ─────────────────────────────────── */
// const FONT_LINK = (() => {
//   if (typeof document !== "undefined" && !document.getElementById("ma-fonts")) {
//     const l = document.createElement("link");
//     l.id = "ma-fonts";
//     l.rel = "stylesheet";
//     l.href =
//       "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display&display=swap";
//     document.head.appendChild(l);
//   }
// })();

// /* ═══════════════════════════════════════════════════════════════
//    CONSTANTS
// ═══════════════════════════════════════════════════════════════ */

// const TIMEZONES = [
//   { label: "UTC+05:30 — Asia/Kolkata (IST)", value: "Asia/Kolkata" },
//   { label: "UTC+00:00 — Europe/London (GMT)", value: "Europe/London" },
//   { label: "UTC+01:00 — Europe/Paris (CET)", value: "Europe/Paris" },
//   { label: "UTC+02:00 — Europe/Helsinki (EET)", value: "Europe/Helsinki" },
//   { label: "UTC+03:00 — Europe/Moscow (MSK)", value: "Europe/Moscow" },
//   { label: "UTC+03:30 — Asia/Tehran (IRST)", value: "Asia/Tehran" },
//   { label: "UTC+04:00 — Asia/Dubai (GST)", value: "Asia/Dubai" },
//   { label: "UTC+04:30 — Asia/Kabul (AFT)", value: "Asia/Kabul" },
//   { label: "UTC+05:00 — Asia/Karachi (PKT)", value: "Asia/Karachi" },
//   { label: "UTC+05:45 — Asia/Kathmandu (NPT)", value: "Asia/Kathmandu" },
//   { label: "UTC+06:00 — Asia/Dhaka (BST)", value: "Asia/Dhaka" },
//   { label: "UTC+06:30 — Asia/Yangon (MMT)", value: "Asia/Yangon" },
//   { label: "UTC+07:00 — Asia/Bangkok (ICT)", value: "Asia/Bangkok" },
//   { label: "UTC+08:00 — Asia/Singapore (SGT)", value: "Asia/Singapore" },
//   { label: "UTC+08:00 — Asia/Shanghai (CST)", value: "Asia/Shanghai" },
//   { label: "UTC+09:00 — Asia/Tokyo (JST)", value: "Asia/Tokyo" },
//   { label: "UTC+09:00 — Asia/Seoul (KST)", value: "Asia/Seoul" },
//   { label: "UTC+09:30 — Australia/Darwin (ACST)", value: "Australia/Darwin" },
//   { label: "UTC+10:00 — Australia/Sydney (AEST)", value: "Australia/Sydney" },
//   { label: "UTC+12:00 — Pacific/Auckland (NZST)", value: "Pacific/Auckland" },
//   { label: "UTC-03:00 — America/Sao_Paulo (BRT)", value: "America/Sao_Paulo" },
//   { label: "UTC-04:00 — America/Halifax (ADT)", value: "America/Halifax" },
//   { label: "UTC-05:00 — America/New_York (EST)", value: "America/New_York" },
//   { label: "UTC-06:00 — America/Chicago (CST)", value: "America/Chicago" },
//   { label: "UTC-07:00 — America/Denver (MST)", value: "America/Denver" },
//   { label: "UTC-08:00 — America/Los_Angeles (PST)", value: "America/Los_Angeles" },
//   { label: "UTC-09:00 — America/Anchorage (AKST)", value: "America/Anchorage" },
//   { label: "UTC-10:00 — Pacific/Honolulu (HST)", value: "Pacific/Honolulu" },
// ];

// const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// const DAY_TO_INDEX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4 };
// const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
// const UNAVAIL_REASONS = [
//   "Family Emergency", "Health Reason", "Personal Reason", "Work Reason",
//   "Travel Plans", "Public Holiday", "Conference / Event", "Other",
// ];
// const MONTH_OPTIONS = [
//   { value: 1, label: "1 Month", sub: "Short term" },
//   { value: 3, label: "3 Months", sub: "One quarter" },
//   { value: 6, label: "6 Months", sub: "Half year" },
// ];

// const toApiMonths = (set) => [...set].sort((a, b) => a - b);
// const fromApiMonths = (arr) => new Set(Array.isArray(arr) ? arr.map(Number) : [Number(arr)]);

// /* ═══════════════════════════════════════════════════════════════
//    DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════ */
// const T = {
//   /* Backgrounds */
//   bg0: "#0D1117",
//   bg1: "#161B27",
//   bg2: "#1E2437",
//   bg3: "#252D42",
//   /* Borders */
//   bd0: "#252D42",
//   bd1: "#2E3954",
//   bd2: "#3A4A6B",
//   /* Emerald accent */
//   em: "#10B981",
//   emDim: "#059669",
//   emMuted: "#064E3B",
//   emSoft: "rgba(16,185,129,0.10)",
//   emGlow: "rgba(16,185,129,0.25)",
//   /* Amber */
//   am: "#F59E0B",
//   amDim: "#92400E",
//   amSoft: "rgba(245,158,11,0.10)",
//   /* Rose */
//   ro: "#F43F5E",
//   roDim: "#881337",
//   roSoft: "rgba(244,63,94,0.10)",
//   /* Indigo accent */
//   in: "#818CF8",
//   inSoft: "rgba(129,140,248,0.10)",
//   /* Text */
//   t0: "#F1F5F9",
//   t1: "#94A3B8",
//   t2: "#4E6180",
//   t3: "#2E3D56",
//   /* Font */
//   font: "'DM Sans', system-ui, sans-serif",
// };

// /* ═══════════════════════════════════════════════════════════════
//    HELPERS
// ═══════════════════════════════════════════════════════════════ */
// const fmtDate = (s) =>
//   s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
// const fmtDateShort = (s) =>
//   s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";
// const calcEndDate = (startDate, months) => {
//   if (!startDate || months === 0) return null;
//   const end = new Date(startDate);
//   end.setMonth(end.getMonth() + months);
//   return end;
// };
// const daysUntil = (date) => {
//   if (!date) return null;
//   const diff = new Date(date) - new Date();
//   return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
// };
// const getActiveUnavailForDay = (records = [], dayName) => {
//   const dayIdx = DAY_TO_INDEX[dayName];
//   const today = new Date(); today.setHours(0, 0, 0, 0);
//   return records.find((u) => {
//     if (!u.daysOfWeek?.includes(dayIdx)) return false;
//     const from = new Date(u.unavailableFrom); from.setHours(0, 0, 0, 0);
//     const to = new Date(u.unavailableTo); to.setHours(23, 59, 59, 999);
//     return today >= from && today <= to;
//   }) || null;
// };

// /* ═══════════════════════════════════════════════════════════════
//    GLOBAL STYLES  (injected once)
// ═══════════════════════════════════════════════════════════════ */
// const GLOBAL_CSS = `
//   .ma-root *, .ma-root *::before, .ma-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   .ma-root { font-family: ${T.font}; background: ${T.bg0}; color: ${T.t0}; min-height: 100vh; }
//   .ma-input {
//     width: 100%; background: ${T.bg0}; border: 1.5px solid ${T.bd1};
//     color: ${T.t0}; border-radius: 10px; padding: 10px 14px;
//     font-family: ${T.font}; font-size: 14px; outline: none;
//     transition: border-color .2s, box-shadow .2s;
//     -webkit-appearance: none; appearance: none;
//   }
//   .ma-input:focus { border-color: ${T.em}; box-shadow: 0 0 0 3px ${T.emGlow}; }
//   .ma-input option { background: ${T.bg2}; }
//   .ma-btn-primary {
//     background: ${T.em}; color: #fff; border: none; border-radius: 10px;
//     font-family: ${T.font}; font-weight: 700; font-size: 14px; cursor: pointer;
//     padding: 11px 22px; transition: opacity .15s, transform .1s, box-shadow .2s;
//     box-shadow: 0 4px 20px ${T.emGlow};
//   }
//   .ma-btn-primary:hover:not(:disabled) { opacity: .88; transform: translateY(-1px); }
//   .ma-btn-primary:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
//   .ma-btn-ghost {
//     background: ${T.bg2}; color: ${T.t1}; border: 1.5px solid ${T.bd1};
//     border-radius: 10px; font-family: ${T.font}; font-weight: 600;
//     font-size: 14px; cursor: pointer; padding: 11px 22px;
//     transition: background .15s, border-color .15s;
//   }
//   .ma-btn-ghost:hover { background: ${T.bg3}; border-color: ${T.bd2}; }
//   @keyframes ma-fade-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
//   @keyframes ma-scale-in { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:scale(1); } }
//   @keyframes ma-ping { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.8);opacity:0} }
//   .ma-animate-up { animation: ma-fade-up .35s ease both; }
//   .ma-animate-in { animation: ma-scale-in .25s ease both; }
//   .ma-ping { animation: ma-ping 2s ease-in-out infinite; }
//   .ma-card { background: ${T.bg1}; border: 1.5px solid ${T.bd0}; border-radius: 16px; overflow: hidden; }
//   .ma-section-divider { height: 1px; background: ${T.bd0}; }
//   .ma-scroll { overflow-y: auto; }
//   .ma-scroll::-webkit-scrollbar { width: 4px; }
//   .ma-scroll::-webkit-scrollbar-track { background: ${T.bg1}; }
//   .ma-scroll::-webkit-scrollbar-thumb { background: ${T.bd2}; border-radius: 99px; }
//   input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
// `;

// const injectStyles = () => {
//   if (typeof document !== "undefined" && !document.getElementById("ma-styles")) {
//     const s = document.createElement("style");
//     s.id = "ma-styles";
//     s.textContent = GLOBAL_CSS;
//     document.head.appendChild(s);
//   }
// };

// /* ═══════════════════════════════════════════════════════════════
//    PRIMITIVES
// ═══════════════════════════════════════════════════════════════ */

// /* Toggle Switch */
// const Toggle = ({ checked, onChange, label }) => (
//   <button
//     type="button"
//     role="switch"
//     aria-checked={checked}
//     aria-label={label}
//     onClick={() => onChange(!checked)}
//     style={{
//       position: "relative", display: "inline-flex", alignItems: "center",
//       width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
//       background: checked ? T.em : T.bg3,
//       boxShadow: checked ? `0 0 14px ${T.emGlow}` : "none",
//       transition: "background .25s, box-shadow .25s", flexShrink: 0, outline: "none",
//     }}
//   >
//     <span style={{
//       position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "#fff",
//       left: checked ? 22 : 4, transition: "left .2s cubic-bezier(.4,0,.2,1)",
//       boxShadow: "0 1px 4px rgba(0,0,0,.4)",
//     }} />
//   </button>
// );

// /* Pill / Badge */
// const Pill = ({ children, color = T.em, bg = T.emSoft, border = T.em, size = "sm" }) => (
//   <span style={{
//     display: "inline-flex", alignItems: "center", gap: 5,
//     background: bg, border: `1.5px solid ${border}`, color,
//     borderRadius: 99, padding: size === "sm" ? "3px 10px" : "5px 14px",
//     fontSize: size === "sm" ? 11 : 13, fontWeight: 700, letterSpacing: ".01em",
//     whiteSpace: "nowrap",
//   }}>{children}</span>
// );

// /* Section Header */
// const SectionHead = ({ icon, title, sub, action }) => (
//   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
//     <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//       <div style={{
//         width: 38, height: 38, borderRadius: 10, background: T.emSoft,
//         border: `1.5px solid ${T.emDim}`, display: "flex", alignItems: "center",
//         justifyContent: "center", fontSize: 16, flexShrink: 0,
//       }}>{icon}</div>
//       <div>
//         <p style={{ fontWeight: 700, fontSize: 15, color: T.t0, lineHeight: 1.2 }}>{title}</p>
//         {sub && <p style={{ fontSize: 12, color: T.t2, marginTop: 2 }}>{sub}</p>}
//       </div>
//     </div>
//     {action}
//   </div>
// );

// /* FieldLabel */
// const FL = ({ children }) => (
//   <label style={{
//     display: "block", fontSize: 11, fontWeight: 700, color: T.t2,
//     textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8,
//   }}>{children}</label>
// );

// /* Stat Card */
// const StatCard = ({ icon, label, value, accent = T.em }) => (
//   <div style={{
//     background: T.bg2, border: `1.5px solid ${T.bd1}`, borderRadius: 12,
//     padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
//   }}>
//     <div style={{
//       width: 36, height: 36, borderRadius: 9, background: `${accent}18`,
//       border: `1.5px solid ${accent}44`, display: "flex", alignItems: "center",
//       justifyContent: "center", fontSize: 16, flexShrink: 0,
//     }}>{icon}</div>
//     <div>
//       <p style={{ fontSize: 11, color: T.t2, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</p>
//       <p style={{ fontSize: 15, fontWeight: 700, color: T.t0, marginTop: 2 }}>{value}</p>
//     </div>
//   </div>
// );

// /* ─── Subscription Banner ───────────────────────────────────── */
// const SubscriptionBanner = ({ subscriptionStartDate, availableForMonths }) => {
//   if (!subscriptionStartDate) return null;
//   const monthsArr = Array.isArray(availableForMonths) ? availableForMonths : [availableForMonths];
//   const isUnlimited = monthsArr.length === 3;
//   const maxMo = isUnlimited ? 0 : Math.max(...monthsArr);
//   const endDate = (!isUnlimited && subscriptionStartDate)
//     ? (() => { const d = new Date(subscriptionStartDate); d.setMonth(d.getMonth() + maxMo); return d; })()
//     : null;
//   const remaining = daysUntil(endDate);
//   const isExpired = !isUnlimited && remaining === 0;
//   const isWarning = !isUnlimited && remaining !== null && remaining <= 14;
//   const accent = isExpired ? T.ro : isWarning ? T.am : T.em;
//   const bg = isExpired ? T.roSoft : isWarning ? T.amSoft : T.emSoft;

//   return (
//     <div style={{
//       display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
//       gap: 12, borderRadius: 12, padding: "12px 16px", background: bg,
//       border: `1.5px solid ${accent}44`, marginBottom: 20,
//     }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
//           <div className="ma-ping" style={{
//             position: "absolute", inset: 0, borderRadius: "50%", background: accent,
//           }} />
//           <div style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: accent }} />
//         </div>
//         <div>
//           <p style={{ fontSize: 13, fontWeight: 700, color: T.t0 }}>
//             {isExpired ? "Subscription Expired" : isWarning ? `${remaining} days remaining` : "Active Subscription"}
//           </p>
//           <p style={{ fontSize: 11, color: T.t2, marginTop: 1 }}>
//             Started {fmtDate(subscriptionStartDate)}
//             {endDate && ` · Ends ${fmtDate(endDate)}`}
//           </p>
//         </div>
//       </div>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
//         {isUnlimited
//           ? <Pill color={T.em} bg={T.bg2} border={T.emDim}>∞ All durations</Pill>
//           : [...monthsArr].sort((a, b) => a - b).map(m => (
//             <Pill key={m} color={accent} bg={T.bg2} border={`${accent}44`}>{m} mo</Pill>
//           ))
//         }
//         {isExpired && <Pill color={T.ro} bg={T.roSoft} border={T.ro}>Renew Now</Pill>}
//       </div>
//     </div>
//   );
// };

// /* ─── Day Row in Preview ──────────────────────────────────────── */
// const DayRowPreview = ({ day, slot, blocked }) => {
//   if (!slot) return (
//     <div style={{
//       display: "flex", alignItems: "center", gap: 12,
//       padding: "10px 16px", borderRadius: 10, background: T.bg0,
//       border: `1.5px dashed ${T.bd0}`, opacity: .45,
//     }}>
//       <span style={{ width: 36, fontSize: 12, fontWeight: 700, color: T.t3, textTransform: "uppercase", letterSpacing: ".08em" }}>{day}</span>
//       <span style={{ fontSize: 12, color: T.t3, fontStyle: "italic" }}>Rest day</span>
//     </div>
//   );

//   if (blocked) return (
//     <div style={{
//       display: "flex", alignItems: "center", gap: 12,
//       padding: "10px 16px", borderRadius: 10,
//       background: T.roSoft, border: `1.5px solid ${T.roDim}`, position: "relative", overflow: "hidden",
//     }}>
//       <span style={{
//         position: "absolute", top: 0, right: 0, background: T.ro, color: "#fff",
//         fontSize: 9, fontWeight: 800, padding: "3px 8px",
//         borderBottomLeftRadius: 8, letterSpacing: ".08em",
//       }}>BLOCKED</span>
//       <span style={{ width: 36, fontSize: 12, fontWeight: 700, color: T.ro, textTransform: "uppercase", letterSpacing: ".08em" }}>{day}</span>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{ fontSize: 12, fontWeight: 600, color: "#fb7185", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{blocked.reason}</p>
//         <p style={{ fontSize: 11, color: T.roDim, marginTop: 1 }}>Until {fmtDateShort(blocked.unavailableTo)}</p>
//       </div>
//     </div>
//   );

//   const fromH = parseInt(slot.from);
//   const toH = parseInt(slot.to);
//   const pct = (fromH / 24) * 100;
//   const w = Math.max(((toH - fromH) / 24) * 100, 4);

//   return (
//     <div style={{
//       display: "flex", alignItems: "center", gap: 12,
//       padding: "10px 16px", borderRadius: 10,
//       background: T.bg0, border: `1.5px solid ${T.bd1}`,
//     }}>
//       <span style={{ width: 36, fontSize: 12, fontWeight: 700, color: T.em, textTransform: "uppercase", letterSpacing: ".08em" }}>{day}</span>
//       <div style={{ flex: 1, height: 6, background: T.bg3, borderRadius: 99, overflow: "hidden", position: "relative" }}>
//         <div style={{
//           position: "absolute", height: "100%", borderRadius: 99,
//           background: `linear-gradient(90deg, ${T.emDim}, ${T.em})`,
//           left: `${pct}%`, width: `${w}%`,
//           boxShadow: `0 0 8px ${T.emGlow}`,
//         }} />
//       </div>
//       <span style={{ fontSize: 12, fontWeight: 700, color: T.em, whiteSpace: "nowrap", tabularNums: true, fontVariantNumeric: "tabular-nums" }}>
//         {slot.from}–{slot.to}
//       </span>
//     </div>
//   );
// };

// /* ─── Availability Preview Card ─────────────────────────────── */
// const AvailabilityPreview = ({
//   daySlots, sessionsPerWeek, availableForMonths, timeZone,
//   notes, unavailRecords, subscriptionStartDate, onEdit,
// }) => (
//   <div className="ma-animate-up ma-card" style={{ marginBottom: 20 }}>
//     {/* Top strip */}
//     <div style={{
//       background: `linear-gradient(135deg, ${T.bg2} 0%, ${T.bg1} 100%)`,
//       borderBottom: `1px solid ${T.bd0}`, padding: "20px 24px",
//     }}>
//       <SubscriptionBanner subscriptionStartDate={subscriptionStartDate} availableForMonths={availableForMonths} />

//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
//         <div>
//           <p style={{ fontSize: 18, fontWeight: 800, color: T.t0, fontFamily: "'DM Serif Display', serif" }}>Your Schedule</p>
//           <p style={{ fontSize: 12, color: T.t2, marginTop: 3 }}>
//             {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
//           </p>
//         </div>
//         <button onClick={onEdit} style={{
//           display: "flex", alignItems: "center", gap: 8,
//           background: T.bg3, border: `1.5px solid ${T.bd2}`, color: T.t1,
//           borderRadius: 10, padding: "9px 18px", cursor: "pointer",
//           fontSize: 13, fontWeight: 600, fontFamily: T.font,
//           transition: "all .15s",
//         }}
//           onMouseEnter={e => { e.currentTarget.style.borderColor = T.em; e.currentTarget.style.color = T.em; }}
//           onMouseLeave={e => { e.currentTarget.style.borderColor = T.bd2; e.currentTarget.style.color = T.t1; }}
//         >
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//           </svg>
//           Edit Schedule
//         </button>
//       </div>

//       {/* Quick stats */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 18 }}>
//         <StatCard icon="📅" label="Sessions/Week" value={`${sessionsPerWeek} session${sessionsPerWeek > 1 ? "s" : ""}`} />
//         <StatCard icon="📆" label="Available For"
//           value={availableForMonths.length === 3 ? "All durations" : availableForMonths.map(m => `${m}mo`).join(" + ")}
//         />
//         <StatCard icon="🌐" label="Timezone" value={timeZone.replace("_", " ").split("/")[1] || timeZone} />
//       </div>
//     </div>

//     {/* Day grid */}
//     <div style={{ padding: "20px 24px" }}>
//       <p style={{ fontSize: 11, fontWeight: 700, color: T.t2, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>
//         Weekly Availability
//       </p>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8 }}>
//         {ALL_DAYS.map((day) => {
//           const slot = daySlots.find((s) => s.day === day);
//           const blocked = slot ? getActiveUnavailForDay(unavailRecords, day) : null;
//           return <DayRowPreview key={day} day={day} slot={slot} blocked={blocked} />;
//         })}
//       </div>

//       {/* Legend */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
//         {[[T.em, "Available"], [T.ro, "Blocked today"], [T.t3, "Rest day"]].map(([c, l]) => (
//           <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
//             <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "block" }} />
//             <span style={{ fontSize: 11, color: T.t2 }}>{l}</span>
//           </div>
//         ))}
//       </div>

//       {notes && (
//         <div style={{
//           marginTop: 16, background: T.bg0, border: `1px solid ${T.bd0}`,
//           borderRadius: 10, padding: "12px 14px",
//         }}>
//           <p style={{ fontSize: 12, color: T.t1, lineHeight: 1.7 }}>
//             <span style={{ marginRight: 6 }}>📝</span>{notes}
//           </p>
//         </div>
//       )}
//     </div>
//   </div>
// );

// /* ─── Delete Confirm Modal ───────────────────────────────────── */
// const DeleteConfirmModal = ({ record, onConfirm, onCancel, deleting }) => (
//   <div
//     onClick={(e) => e.target === e.currentTarget && onCancel()}
//     style={{
//       position: "fixed", inset: 0, zIndex: 60,
//       background: "rgba(10,14,22,.85)", backdropFilter: "blur(8px)",
//       display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
//     }}
//   >
//     <div className="ma-animate-in ma-card" style={{ width: "100%", maxWidth: 380, padding: 0 }}>
//       <div style={{ padding: "24px 24px 20px" }}>
//         <div style={{
//           width: 44, height: 44, borderRadius: 11, background: T.roSoft,
//           border: `1.5px solid ${T.roDim}`, display: "flex", alignItems: "center",
//           justifyContent: "center", marginBottom: 16,
//         }}>
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.ro} strokeWidth="1.8">
//             <polyline points="3 6 5 6 21 6" />
//             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//             <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
//           </svg>
//         </div>
//         <p style={{ fontSize: 16, fontWeight: 800, color: T.t0, marginBottom: 8 }}>Remove this block?</p>
//         <p style={{ fontSize: 13, color: T.t2, lineHeight: 1.7 }}>
//           The <strong style={{ color: T.ro }}>{record?.reason}</strong> block ({fmtDate(record?.unavailableFrom)} → {fmtDate(record?.unavailableTo)})
//           will be removed and those days will become bookable again.
//         </p>
//       </div>
//       <div style={{ display: "flex", gap: 10, padding: "0 24px 24px" }}>
//         <button onClick={onCancel} className="ma-btn-ghost" style={{ flex: 1 }}>Cancel</button>
//         <button onClick={onConfirm} disabled={deleting}
//           style={{ flex: 1, background: T.ro, color: "#fff", border: "none", borderRadius: 10, padding: "11px 0", fontWeight: 700, fontFamily: T.font, cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? .5 : 1, fontSize: 14 }}>
//           {deleting ? "Removing…" : "Delete Block"}
//         </button>
//       </div>
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════ */
// const MentorAvailability = () => {
//   injectStyles();

//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const mentorId = userData?._id;

//   const [tab, setTab] = useState("schedule");
//   const [hasSaved, setHasSaved] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const [selectedMonths, setSelectedMonths] = useState(new Set([1]));
//   const [sessionsPerWeek, setSessionsPerWeek] = useState(1);
//   const [timeZone, setTimeZone] = useState("Asia/Kolkata");
//   const [availNotes, setAvailNotes] = useState("");
//   const [snapshot, setSnapshot] = useState(null);
//   const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);
//   const [daySlots, setDaySlots] = useState(
//     ALL_DAYS.map((d) => ({ day: d, enabled: true, from: "09:00", to: "10:00" }))
//   );
//   const [unavailForm, setUnavailForm] = useState({
//     unavailableFrom: "", unavailableTo: "",
//     daysOfWeek: [], timeZone: "Asia/Kolkata",
//     reason: "", customReason: "", notes: "",
//   });

//   const availableForMonths = toApiMonths(selectedMonths);
//   const effectiveMaxMonths = selectedMonths.size === 3 ? 0 : Math.max(...selectedMonths);

//   const { data: availData, isLoading: loadingAvail } = useGetMentorAvailabilityQuery(mentorId);
//   const [upsertAvailability, { isLoading: saving }] = useUpsertMentorAvailabilityMutation();
//   const { data: unavailData, isLoading: loadingUnavail } = useGetMentorUnavailabilityQuery(mentorId);
//   const [addUnavailability, { isLoading: addingUnavail }] = useAddMentorUnavailabilityMutation();
//   const [deleteUnavailability, { isLoading: deletingUnavail }] = useDeleteMentorUnavailabilityMutation();

//   useEffect(() => {
//     if (availData?.success && availData.data) {
//       const d = availData.data;
//       const slots = ALL_DAYS.map((day) => {
//         const s = d.daySlots?.find((x) => x.day === day);
//         return s ? { day, enabled: true, from: s.from, to: s.to }
//           : { day, enabled: false, from: "09:00", to: "10:00" };
//       });
//       const spw = d.availableDaysPerWeek || 1;
//       const tz = d.timeZone || "Asia/Kolkata";
//       const nts = d.notes || "";
//       const afm = d.availableForMonths != null ? d.availableForMonths : 1;
//       const ssd = d.subscriptionStartDate || null;
//       setDaySlots(slots); setSessionsPerWeek(spw); setTimeZone(tz); setAvailNotes(nts);
//       setSelectedMonths(fromApiMonths(afm)); setSubscriptionStartDate(ssd);
//       setHasSaved(true); setIsEditMode(false);
//       setSnapshot({ daySlots: slots, sessionsPerWeek: spw, timeZone: tz, availNotes: nts, selectedMonths: fromApiMonths(afm) });
//     }
//   }, [availData]);

//   useEffect(() => { setUnavailForm((p) => ({ ...p, timeZone })); }, [timeZone]);

//   useEffect(() => {
//     const { unavailableFrom, unavailableTo } = unavailForm;
//     if (!unavailableFrom || !unavailableTo) { setUnavailForm((p) => ({ ...p, daysOfWeek: [] })); return; }
//     const mentorIdxs = daySlots.filter((s) => s.enabled).map((s) => DAY_TO_INDEX[s.day]);
//     const affected = new Set();
//     for (let d = new Date(unavailableFrom); d <= new Date(unavailableTo); d.setDate(d.getDate() + 1)) {
//       if (mentorIdxs.includes(d.getDay())) affected.add(d.getDay());
//     }
//     setUnavailForm((p) => ({ ...p, daysOfWeek: [...affected] }));
//   }, [unavailForm.unavailableFrom, unavailForm.unavailableTo, daySlots]);

//   const toggleDay = (i) => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s));
//   const updateSlot = (i, f, v) => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, [f]: v } : s));

//   const handleEdit = () => {
//     setSnapshot({ daySlots: [...daySlots], sessionsPerWeek, timeZone, availNotes, selectedMonths: new Set(selectedMonths) });
//     setIsEditMode(true);
//   };
//   const handleCancel = () => {
//     if (snapshot) {
//       setDaySlots(snapshot.daySlots); setSessionsPerWeek(snapshot.sessionsPerWeek);
//       setTimeZone(snapshot.timeZone); setAvailNotes(snapshot.availNotes);
//       setSelectedMonths(snapshot.selectedMonths);
//     }
//     setIsEditMode(false);
//   };
//   const handleSave = async () => {
//     try {
//       const enabled = daySlots.filter((s) => s.enabled).map(({ day, from, to }) => ({ day, from, to }));
//       await upsertAvailability({ mentorId, daySlots: enabled, availableDaysPerWeek: sessionsPerWeek, timeZone, notes: availNotes, availableForMonths }).unwrap();
//       setHasSaved(true); setIsEditMode(false);
//       setSnapshot({ daySlots: [...daySlots], sessionsPerWeek, timeZone, availNotes, selectedMonths: new Set(selectedMonths) });
//     } catch (err) { console.error(err); }
//   };
//   const handleSubmitUnavailability = async (e) => {
//     e.preventDefault();
//     const finalReason = unavailForm.reason === "Other" ? (unavailForm.customReason.trim() || "Other") : unavailForm.reason;
//     try {
//       await addUnavailability({ mentorId, ...unavailForm, reason: finalReason }).unwrap();
//       setShowModal(false);
//       setUnavailForm({ unavailableFrom: "", unavailableTo: "", daysOfWeek: [], timeZone, reason: "", customReason: "", notes: "" });
//     } catch (err) { console.error(err); }
//   };
//   const handleDeleteConfirm = async () => {
//     if (!deleteTarget) return;
//     try { await deleteUnavailability({ mentorId, unavailId: deleteTarget._id }).unwrap(); setDeleteTarget(null); }
//     catch (err) { console.error(err); }
//   };

//   if (loadingAvail || loadingUnavail) return <Loader />;

//   const previewSlots = daySlots.filter((s) => s.enabled).map(({ day, from, to }) => ({ day, from, to }));
//   const unavailRecords = unavailData?.data || [];
//   const showPreviewOnly = hasSaved && !isEditMode;
//   const affectedDayNames = [...(unavailForm.daysOfWeek || [])].sort((a, b) => a - b).map((i) => ALL_DAYS[i]);
//   const subEndDate = effectiveMaxMonths === 0 ? "" : calcEndDate(subscriptionStartDate, effectiveMaxMonths)?.toISOString().slice(0, 10) || "";
//   const submitDisabled = addingUnavail || !affectedDayNames.length || !unavailForm.reason ||
//     (unavailForm.reason === "Other" && !unavailForm.customReason.trim());

//   /* ── Render ─────────────────────────────────────────────────── */
//   return (
//     <div className="ma-root">

//       {/* ── Header / Nav ─────────────────────────────────────── */}
//       <div style={{
//         position: "sticky", top: 0, zIndex: 40,
//         background: T.bg0, borderBottom: `1px solid ${T.bd0}`,
//         boxShadow: "0 4px 24px rgba(0,0,0,.5)",
//       }}>
//         {/* Page title row */}
//         <div style={{
//           maxWidth: 760, margin: "0 auto", padding: "16px 24px 0",
//           display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{
//               width: 36, height: 36, borderRadius: 9, background: T.emSoft,
//               border: `1.5px solid ${T.emDim}`, display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.em} strokeWidth="2">
//                 <rect x="3" y="4" width="18" height="18" rx="2" />
//                 <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
//                 <line x1="3" y1="10" x2="21" y2="10" />
//               </svg>
//             </div>
//             <div>
//               <p style={{ fontSize: 16, fontWeight: 800, color: T.t0, fontFamily: "'DM Serif Display', serif" }}>
//                 Availability Manager
//               </p>
//               <p style={{ fontSize: 11, color: T.t2 }}>LTM · Long-Term Mentoring</p>
//             </div>
//           </div>
//           {tab === "schedule" && !showPreviewOnly && (
//             <div style={{ display: "flex", gap: 8 }}>
//               {isEditMode && (
//                 <button onClick={handleCancel} className="ma-btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>
//                   Cancel
//                 </button>
//               )}
//               <button onClick={handleSave} disabled={saving} className="ma-btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>
//                 {saving ? "Saving…" : isEditMode ? "Save Changes" : "Save Availability"}
//               </button>
//             </div>
//           )}
//           {tab === "unavailability" && (
//             <button onClick={() => setShowModal(true)} className="ma-btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 18px", fontSize: 13 }}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round">
//                 <path d="M12 5v14M5 12h14" />
//               </svg>
//               Add Block
//             </button>
//           )}
//         </div>

//         {/* Tabs */}
//         <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0, marginTop: 12 }}>
//           {[
//             { key: "schedule", label: "Schedule", icon: "📅" },
//             { key: "unavailability", label: "Blocked Dates", icon: "🚫" },
//           ].map(({ key, label, icon }) => (
//             <button key={key} onClick={() => setTab(key)} style={{
//               display: "flex", alignItems: "center", gap: 7,
//               padding: "10px 20px", background: "none", border: "none",
//               borderBottom: `2.5px solid ${tab === key ? T.em : "transparent"}`,
//               color: tab === key ? T.em : T.t2, fontWeight: tab === key ? 700 : 500,
//               fontFamily: T.font, fontSize: 13, cursor: "pointer",
//               transition: "color .15s, border-color .15s",
//             }}>
//               <span>{icon}</span>{label}
//               {tab === key && <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.em, boxShadow: `0 0 8px ${T.em}` }} />}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── SCHEDULE TAB ──────────────────────────────────────── */}
//       {tab === "schedule" && (
//         <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 24px 80px" }} className="ma-animate-up">

//           {/* Preview mode */}
//           {showPreviewOnly && (
//             <AvailabilityPreview
//               daySlots={previewSlots} sessionsPerWeek={sessionsPerWeek}
//               availableForMonths={availableForMonths} timeZone={timeZone}
//               notes={availNotes} unavailRecords={unavailRecords}
//               subscriptionStartDate={subscriptionStartDate} onEdit={handleEdit}
//             />
//           )}

//           {/* Edit / Create mode */}
//           {!showPreviewOnly && (
//             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//               {/* Edit mode banner */}
//               {isEditMode && (
//                 <div style={{
//                   display: "flex", alignItems: "center", gap: 10,
//                   background: T.amSoft, border: `1.5px solid ${T.amDim}`,
//                   borderRadius: 12, padding: "12px 16px",
//                 }}>
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.am} strokeWidth="2">
//                     <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//                   </svg>
//                   <p style={{ fontSize: 13, color: T.am, fontWeight: 600 }}>
//                     Editing mode — your changes will only apply after saving.
//                   </p>
//                 </div>
//               )}

//               {/* Card 1: Sessions per week */}
//               <div className="ma-card">
//                 <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.bd0}` }}>
//                   <SectionHead icon="🔁" title="Sessions per Week" sub="How many LTM sessions do you hold weekly?" />
//                 </div>
//                 <div style={{ padding: "20px 24px" }}>
//                   <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
//                     {[1, 2, 3, 4, 5].map((n) => {
//                       const on = sessionsPerWeek === n;
//                       return (
//                         <button key={n} type="button" onClick={() => setSessionsPerWeek(n)} style={{
//                           display: "flex", flexDirection: "column", alignItems: "center",
//                           justifyContent: "center", gap: 4, padding: "14px 0",
//                           borderRadius: 12, border: `2px solid ${on ? T.em : T.bd1}`,
//                           background: on ? T.emSoft : T.bg0,
//                           boxShadow: on ? `0 0 16px ${T.emGlow}` : "none",
//                           cursor: "pointer", transition: "all .15s",
//                         }}>
//                           <span style={{ fontSize: 22, fontWeight: 800, color: on ? T.em : T.t2, lineHeight: 1 }}>{n}</span>
//                           <span style={{ fontSize: 10, fontWeight: 600, color: on ? T.emDim : T.t3, letterSpacing: ".04em" }}>
//                             {["once", "twice", "3×", "4×", "5×"][n - 1]}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                   {/* Intensity bar */}
//                   <div style={{ marginTop: 16 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//                       <span style={{ fontSize: 11, color: T.t2 }}>Intensity</span>
//                       <span style={{ fontSize: 11, fontWeight: 700, color: T.em }}>
//                         {["Light", "Steady", "Active", "Intense", "Full"][sessionsPerWeek - 1]}
//                       </span>
//                     </div>
//                     <div style={{ height: 6, borderRadius: 99, background: T.bg3, overflow: "hidden" }}>
//                       <div style={{
//                         height: "100%", borderRadius: 99,
//                         background: `linear-gradient(90deg, ${T.emDim}, ${T.em})`,
//                         width: `${(sessionsPerWeek / 5) * 100}%`,
//                         boxShadow: `0 0 10px ${T.emGlow}`,
//                         transition: "width .4s cubic-bezier(.4,0,.2,1)",
//                       }} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Card 2: Available For */}
//               <div className="ma-card">
//                 <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.bd0}` }}>
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <SectionHead icon="📆" title="Available For" sub="Select one or more mentoring durations you accept." />
//                     <button type="button" onClick={() =>
//                       setSelectedMonths(prev => prev.size === 3 ? new Set([1]) : new Set([1, 3, 6]))
//                     } style={{
//                       fontSize: 11, fontWeight: 700, background: "none", border: "none",
//                       color: selectedMonths.size === 3 ? T.ro : T.emDim, cursor: "pointer",
//                       fontFamily: T.font, textTransform: "uppercase", letterSpacing: ".06em",
//                       padding: "4px 8px", borderRadius: 6, transition: "opacity .15s",
//                     }}>
//                       {selectedMonths.size === 3 ? "Clear all" : "Select all"}
//                     </button>
//                   </div>
//                 </div>
//                 <div style={{ padding: "20px 24px" }}>
//                   <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
//                     {MONTH_OPTIONS.map(({ value, label, sub }) => {
//                       const on = selectedMonths.has(value);
//                       return (
//                         <button key={value} type="button" onClick={() =>
//                           setSelectedMonths(prev => {
//                             const next = new Set(prev);
//                             if (next.has(value)) { if (next.size > 1) next.delete(value); }
//                             else next.add(value);
//                             return next;
//                           })
//                         } style={{
//                           position: "relative", display: "flex", flexDirection: "column",
//                           alignItems: "center", padding: "18px 12px",
//                           borderRadius: 12, border: `2px solid ${on ? T.em : T.bd1}`,
//                           background: on ? T.emSoft : T.bg0,
//                           boxShadow: on ? `0 0 16px ${T.emGlow}` : "none",
//                           cursor: "pointer", transition: "all .15s",
//                         }}>
//                           {on && (
//                             <span style={{
//                               position: "absolute", top: 8, right: 8,
//                               width: 18, height: 18, borderRadius: "50%", background: T.em,
//                               display: "flex", alignItems: "center", justifyContent: "center",
//                               fontSize: 9, fontWeight: 900, color: T.bg0,
//                             }}>✓</span>
//                           )}
//                           <span style={{ fontSize: 26, fontWeight: 800, color: on ? T.em : T.t2, lineHeight: 1 }}>{value}</span>
//                           <span style={{ fontSize: 12, fontWeight: 700, color: on ? T.em : T.t2, marginTop: 2 }}>mo</span>
//                           <span style={{ fontSize: 11, color: on ? T.emDim : T.t3, marginTop: 6 }}>{sub}</span>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Summary strip */}
//                   <div style={{
//                     marginTop: 14, display: "flex", alignItems: "center", gap: 8,
//                     background: T.bg0, border: `1px solid ${T.bd1}`,
//                     borderRadius: 10, padding: "10px 14px", flexWrap: "wrap",
//                   }}>
//                     <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.em, flexShrink: 0 }} />
//                     {selectedMonths.size === 3
//                       ? <span style={{ fontSize: 12, fontWeight: 600, color: T.em }}>All durations selected — no fixed expiry</span>
//                       : <span style={{ fontSize: 12, color: T.t2, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
//                         Open for
//                         {[...selectedMonths].sort((a, b) => a - b).map((m, i, arr) => (
//                           <React.Fragment key={m}>
//                             <strong style={{
//                               background: T.emSoft, border: `1px solid ${T.emDim}`, color: T.em,
//                               borderRadius: 6, padding: "1px 8px", fontWeight: 800,
//                             }}>{m} mo</strong>
//                             {i < arr.length - 1 && <span style={{ color: T.t3 }}>+</span>}
//                           </React.Fragment>
//                         ))}
//                       </span>
//                     }
//                   </div>

//                   {subscriptionStartDate && (
//                     <div style={{
//                       marginTop: 10, display: "flex", alignItems: "center", gap: 8,
//                       background: T.bg0, border: `1px solid ${T.bd0}`,
//                       borderRadius: 10, padding: "10px 14px", flexWrap: "wrap",
//                     }}>
//                       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.t2} strokeWidth="2">
//                         <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
//                       </svg>
//                       <span style={{ fontSize: 12, color: T.t2 }}>
//                         Since <strong style={{ color: T.t0 }}>{fmtDate(subscriptionStartDate)}</strong>
//                         {effectiveMaxMonths !== 0 && (
//                           <> · Ends <strong style={{ color: T.t0 }}>{fmtDate(calcEndDate(subscriptionStartDate, effectiveMaxMonths))}</strong></>
//                         )}
//                       </span>
//                       {effectiveMaxMonths === 0 && <Pill color={T.em} bg={T.emSoft} border={T.emDim}>No expiry</Pill>}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Card 3: Timezone */}
//               <div className="ma-card">
//                 <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.bd0}` }}>
//                   <SectionHead icon="🌐" title="Timezone" sub="All bookings will be displayed in this timezone." />
//                 </div>
//                 <div style={{ padding: "20px 24px" }}>
//                   <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                     <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="ma-input">
//                       {TIMEZONES.map((tz) => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
//                     </select>
//                     <div style={{
//                       display: "inline-flex", alignItems: "center", gap: 8,
//                       background: T.bg0, border: `1.5px solid ${T.emDim}`,
//                       borderRadius: 8, padding: "7px 12px", alignSelf: "flex-start",
//                     }}>
//                       <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.em, flexShrink: 0 }} />
//                       <span style={{ fontSize: 12, fontWeight: 600, color: T.em }}>
//                         Active: {timeZone.replace(/_/g, " ")}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Card 4: Weekly Schedule */}
//               <div className="ma-card">
//                 <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.bd0}` }}>
//                   <SectionHead icon="📋" title="Weekly Schedule" sub="Toggle days on/off and set your available time window." />
//                 </div>
//                 <div>
//                   {daySlots.map((slot, i) => (
//                     <div key={`${slot.day}-${i}`}>
//                       <div style={{
//                         display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12,
//                         padding: "14px 24px",
//                         background: slot.enabled ? T.bg1 : T.bg0,
//                         transition: "background .2s",
//                       }}>
//                         {/* Toggle + Day label */}
//                         <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
//                           <Toggle checked={slot.enabled} onChange={() => toggleDay(i)} label={slot.day} />
//                           <span style={{
//                             width: 34, fontSize: 12, fontWeight: 700,
//                             color: slot.enabled ? T.em : T.t3,
//                             textTransform: "uppercase", letterSpacing: ".08em",
//                           }}>{slot.day}</span>
//                         </div>

//                         {slot.enabled ? (
//                           <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, flex: 1 }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                               <span style={{ fontSize: 11, color: T.t2, fontWeight: 500 }}>From</span>
//                               <select value={slot.from} onChange={(e) => updateSlot(i, "from", e.target.value)}
//                                 className="ma-input" style={{ width: "auto", padding: "7px 10px", fontSize: 13, fontWeight: 700, color: T.em }}>
//                                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
//                               </select>
//                             </div>
//                             <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                               <span style={{ fontSize: 11, color: T.t2, fontWeight: 500 }}>To</span>
//                               <select value={slot.to} onChange={(e) => updateSlot(i, "to", e.target.value)}
//                                 className="ma-input" style={{ width: "auto", padding: "7px 10px", fontSize: 13, fontWeight: 700, color: T.em }}>
//                                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
//                               </select>
//                             </div>
//                             {/* Slot duration chip */}
//                             <span style={{
//                               fontSize: 11, fontWeight: 600, color: T.t2,
//                               background: T.bg3, borderRadius: 6, padding: "4px 8px",
//                             }}>
//                               {Math.max(parseInt(slot.to) - parseInt(slot.from), 0)}h
//                             </span>
//                             {/* Add / Remove buttons */}
//                             <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
//                               <button type="button" title="Add another slot" onClick={() =>
//                                 setDaySlots((p) => {
//                                   const c = [...p];
//                                   c.splice(i + 1, 0, { day: slot.day, enabled: true, from: slot.from, to: slot.to });
//                                   return c;
//                                 })
//                               } style={{
//                                 width: 30, height: 30, borderRadius: 8, border: `1px solid ${T.emDim}`,
//                                 background: T.emSoft, cursor: "pointer", display: "flex",
//                                 alignItems: "center", justifyContent: "center",
//                               }}>
//                                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//                                   <path d="M12 5v14M5 12h14" stroke={T.em} strokeWidth="2.5" strokeLinecap="round" />
//                                 </svg>
//                               </button>
//                               <button type="button" title="Remove slot" onClick={() =>
//                                 setDaySlots((p) => p.filter((_, idx) => idx !== i))
//                               } style={{
//                                 width: 30, height: 30, borderRadius: 8, border: `1px solid ${T.roDim}`,
//                                 background: T.roSoft, cursor: "pointer", display: "flex",
//                                 alignItems: "center", justifyContent: "center",
//                               }}>
//                                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//                                   <path d="M5 12h14" stroke={T.ro} strokeWidth="2.5" strokeLinecap="round" />
//                                 </svg>
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <span style={{ fontSize: 12, fontStyle: "italic", color: T.t3 }}>Not available</span>
//                         )}
//                       </div>
//                       {i < daySlots.length - 1 && <div style={{ height: 1, background: T.bd0, margin: "0 24px" }} />}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Card 5: Notes */}
//               <div className="ma-card">
//                 <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.bd0}` }}>
//                   <SectionHead icon="📝" title="Notes for Learners" sub="Optional message shown to learners when they book." />
//                 </div>
//                 <div style={{ padding: "20px 24px" }}>
//                   <textarea rows={3} value={availNotes} onChange={(e) => setAvailNotes(e.target.value)}
//                     placeholder="e.g. I prefer evening sessions. Please come prepared with your weekly goals."
//                     className="ma-input" style={{ resize: "vertical", lineHeight: 1.8 }} />
//                 </div>
//               </div>

//               {/* Action row (bottom) */}
//               <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 4 }}>
//                 {isEditMode && (
//                   <button onClick={handleCancel} className="ma-btn-ghost">Cancel</button>
//                 )}
//                 <button onClick={handleSave} disabled={saving} className="ma-btn-primary">
//                   {saving ? "Saving…" : isEditMode ? "Save Changes" : "Save Availability"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ── BLOCKED DATES TAB ──────────────────────────────────── */}
//       {tab === "unavailability" && (
//         <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 24px 80px" }} className="ma-animate-up">

//           {subscriptionStartDate && (
//             <SubscriptionBanner subscriptionStartDate={subscriptionStartDate} availableForMonths={availableForMonths} />
//           )}

//           {!unavailRecords.length ? (
//             <div className="ma-card" style={{ padding: "60px 24px", textAlign: "center" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
//               <p style={{ fontSize: 17, fontWeight: 800, color: T.t0, marginBottom: 6 }}>No blocked periods</p>
//               <p style={{ fontSize: 13, color: T.t2 }}>All your available days are open for learner bookings.</p>
//             </div>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//               {unavailRecords.map((u) => {
//                 const today = new Date(); today.setHours(0, 0, 0, 0);
//                 const from = new Date(u.unavailableFrom); from.setHours(0, 0, 0, 0);
//                 const to = new Date(u.unavailableTo); to.setHours(23, 59, 59, 999);
//                 const isActive = today >= from && today <= to;
//                 const isPast = new Date(u.unavailableTo) < new Date();
//                 const blocked = (u.daysOfWeek || [])
//                   .filter((idx) => previewSlots.some((s) => DAY_TO_INDEX[s.day] === idx))
//                   .sort((a, b) => a - b)
//                   .map((idx) => ALL_DAYS[idx]);

//                 const statusColor = isActive ? T.ro : isPast ? T.t3 : T.am;
//                 const statusLabel = isActive ? "Active Now" : isPast ? "Past" : "Upcoming";
//                 const statusBg = isActive ? T.roSoft : isPast ? T.bg0 : T.amSoft;

//                 return (
//                   <div key={u._id} className="ma-card" style={{
//                     opacity: isPast ? .6 : 1, border: `1.5px solid ${isActive ? T.roDim : T.bd0}`,
//                   }}>
//                     {/* Status bar */}
//                     <div style={{
//                       display: "flex", alignItems: "center", justifyContent: "space-between",
//                       padding: "10px 16px", background: statusBg, borderBottom: `1px solid ${T.bd0}`,
//                     }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//                         <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor }} />
//                         <span style={{ fontSize: 11, fontWeight: 700, color: statusColor, textTransform: "uppercase", letterSpacing: ".08em" }}>
//                           {statusLabel}
//                         </span>
//                       </div>
//                       <button onClick={() => setDeleteTarget(u)} style={{
//                         display: "flex", alignItems: "center", gap: 5,
//                         background: T.roSoft, border: `1px solid ${T.roDim}`,
//                         color: T.ro, borderRadius: 7, padding: "5px 10px",
//                         cursor: "pointer", fontFamily: T.font, fontWeight: 700, fontSize: 11,
//                       }}>
//                         <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <polyline points="3 6 5 6 21 6" />
//                           <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                         </svg>
//                         Delete
//                       </button>
//                     </div>

//                     <div style={{ padding: "16px 20px" }}>
//                       <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
//                         <p style={{ fontSize: 15, fontWeight: 800, color: T.t0 }}>{u.reason}</p>
//                         <div style={{
//                           display: "flex", alignItems: "center", gap: 7,
//                           background: T.bg0, border: `1px solid ${T.bd1}`,
//                           borderRadius: 8, padding: "6px 12px",
//                         }}>
//                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.t2} strokeWidth="2">
//                             <rect x="3" y="4" width="18" height="18" rx="2" />
//                             <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
//                             <line x1="3" y1="10" x2="21" y2="10" />
//                           </svg>
//                           <span style={{ fontSize: 12, fontWeight: 600, color: T.t2, fontVariantNumeric: "tabular-nums" }}>
//                             {fmtDateShort(u.unavailableFrom)} <span style={{ color: T.t3, margin: "0 4px" }}>→</span> {fmtDateShort(u.unavailableTo)}
//                           </span>
//                         </div>
//                       </div>

//                       {blocked.length > 0 && (
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
//                           {blocked.map((d) => {
//                             const sl = previewSlots.find((s) => s.day === d);
//                             return (
//                               <div key={d} style={{
//                                 display: "flex", alignItems: "center", gap: 6,
//                                 background: T.roSoft, border: `1.5px solid ${T.roDim}`,
//                                 borderRadius: 8, padding: "5px 10px",
//                               }}>
//                                 <span style={{ fontSize: 12, fontWeight: 700, color: "#fb7185" }}>{d}</span>
//                                 {sl && <span style={{ fontSize: 11, color: T.roDim }}>{sl.from}–{sl.to}</span>}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       )}

//                       {u.notes && (
//                         <p style={{ marginTop: 10, fontSize: 12, fontStyle: "italic", color: T.t2, lineHeight: 1.6 }}>
//                           {u.notes}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ── ADD BLOCK MODAL ────────────────────────────────────── */}
//       {showModal && (
//         <div
//           onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
//           style={{
//             position: "fixed", inset: 0, zIndex: 50,
//             background: "rgba(10,14,22,.88)", backdropFilter: "blur(8px)",
//             display: "flex", alignItems: "flex-end", justifyContent: "center",
//             padding: 0, overflowY: "auto",
//           }}
//         >
//           <div className="ma-animate-in ma-card" style={{ width: "100%", maxWidth: 520, borderRadius: "20px 20px 0 0" }}>
//             {/* Modal header */}
//             <div style={{ padding: "16px 24px 16px", background: T.bg2, borderBottom: `1px solid ${T.bd0}` }}>
//               {/* Drag indicator */}
//               <div style={{ width: 36, height: 4, borderRadius: 99, background: T.bd2, margin: "0 auto 16px" }} />
//               <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
//                 <div>
//                   <p style={{ fontSize: 16, fontWeight: 800, color: T.t0 }}>Block a Date Range</p>
//                   <p style={{ fontSize: 12, color: T.t2, marginTop: 3 }}>
//                     Your available days within this window will be blocked automatically.
//                   </p>
//                 </div>
//                 <button onClick={() => setShowModal(false)} style={{
//                   width: 32, height: 32, borderRadius: 8, border: "none",
//                   background: T.bg3, color: T.t1, cursor: "pointer",
//                   fontFamily: T.font, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
//                 }}>×</button>
//               </div>

//               {/* Progress steps */}
//               <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
//                 {[
//                   { done: !!(unavailForm.unavailableFrom && unavailForm.unavailableTo), label: "Dates" },
//                   { done: !!unavailForm.reason, label: "Reason" },
//                   { done: affectedDayNames.length > 0, label: "Days OK" },
//                 ].map(({ done, label }, idx, arr) => (
//                   <React.Fragment key={label}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                       <div style={{
//                         width: 22, height: 22, borderRadius: "50%", display: "flex",
//                         alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800,
//                         background: done ? T.em : T.bg3, border: `1.5px solid ${done ? T.em : T.bd2}`,
//                         color: done ? T.bg0 : T.t3,
//                         boxShadow: done ? `0 0 8px ${T.emGlow}` : "none",
//                         transition: "all .2s",
//                       }}>{done ? "✓" : idx + 1}</div>
//                       <span style={{ fontSize: 11, color: done ? T.em : T.t3, fontWeight: done ? 700 : 400 }}>{label}</span>
//                     </div>
//                     {idx < arr.length - 1 && <div style={{ flex: 1, height: 1, background: T.bd0 }} />}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={handleSubmitUnavailability}
//               className="ma-scroll"
//               style={{ display: "flex", flexDirection: "column", gap: 18, padding: "20px 24px", maxHeight: "65vh" }}
//             >
//               {/* Date range */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                 {[{ label: "From", key: "unavailableFrom" }, { label: "To", key: "unavailableTo" }].map(({ label, key }) => (
//                   <div key={key}>
//                     <FL>{label} <span style={{ color: T.ro }}>*</span></FL>
//                     <input type="date" required value={unavailForm[key]}
//                       min={new Date().toISOString().slice(0, 10)} max={subEndDate || undefined}
//                       onChange={(e) => setUnavailForm((p) => ({ ...p, [key]: e.target.value }))}
//                       className="ma-input" />
//                   </div>
//                 ))}
//               </div>

//               {/* Sub hint */}
//               {subscriptionStartDate && effectiveMaxMonths !== 0 && (
//                 <div style={{
//                   display: "flex", alignItems: "flex-start", gap: 8,
//                   background: T.inSoft, border: `1px solid ${T.in}44`,
//                   borderRadius: 10, padding: "10px 12px",
//                 }}>
//                   <svg style={{ flexShrink: 0, marginTop: 1 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.in} strokeWidth="2">
//                     <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//                   </svg>
//                   <p style={{ fontSize: 12, color: T.in, lineHeight: 1.6 }}>
//                     Your subscription runs until <strong>{fmtDate(subEndDate)}</strong>. Blocks beyond this won't apply.
//                   </p>
//                 </div>
//               )}

//               {/* Affected days preview */}
//               {unavailForm.unavailableFrom && unavailForm.unavailableTo && (
//                 <div style={{
//                   borderRadius: 10, padding: "14px",
//                   background: affectedDayNames.length ? T.roSoft : T.bg0,
//                   border: `1.5px solid ${affectedDayNames.length ? T.roDim : T.bd1}`,
//                 }}>
//                   <p style={{ fontSize: 12, fontWeight: 700, color: affectedDayNames.length ? "#fb7185" : T.t2, marginBottom: 8 }}>
//                     {affectedDayNames.length
//                       ? `${affectedDayNames.length} session day${affectedDayNames.length > 1 ? "s" : ""} will be blocked:`
//                       : "⚠️ No available days fall in this date range"}
//                   </p>
//                   {affectedDayNames.length > 0 && (
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
//                       {affectedDayNames.map((d) => {
//                         const sl = previewSlots.find((s) => s.day === d);
//                         return (
//                           <div key={d} style={{
//                             display: "flex", alignItems: "center", gap: 6,
//                             background: T.bg1, border: `1.5px solid ${T.roDim}`,
//                             borderRadius: 7, padding: "5px 10px",
//                           }}>
//                             <span style={{ fontSize: 12, fontWeight: 700, color: "#fb7185" }}>{d}</span>
//                             {sl && <span style={{ fontSize: 11, color: T.roDim }}>{sl.from}–{sl.to}</span>}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Reason */}
//               <div>
//                 <FL>Reason <span style={{ color: T.ro }}>*</span></FL>
//                 <select required value={unavailForm.reason}
//                   onChange={(e) => setUnavailForm((p) => ({ ...p, reason: e.target.value, customReason: "" }))}
//                   className="ma-input" style={{ color: !unavailForm.reason ? T.t2 : T.t0 }}>
//                   <option value="" disabled>Select a reason…</option>
//                   {UNAVAIL_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
//                 </select>
//                 {unavailForm.reason === "Other" && (
//                   <div style={{ marginTop: 10 }}>
//                     <FL>Specify <span style={{ color: T.ro }}>*</span></FL>
//                     <input type="text" required placeholder="Describe your reason…" value={unavailForm.customReason}
//                       onChange={(e) => setUnavailForm((p) => ({ ...p, customReason: e.target.value }))}
//                       className="ma-input" style={{ background: T.roSoft, borderColor: T.roDim }} />
//                   </div>
//                 )}
//               </div>

//               {/* Timezone */}
//               <div>
//                 <FL>Timezone <span style={{ color: T.ro }}>*</span></FL>
//                 <select required value={unavailForm.timeZone}
//                   onChange={(e) => setUnavailForm((p) => ({ ...p, timeZone: e.target.value }))}
//                   className="ma-input">
//                   {TIMEZONES.map((tz) => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
//                 </select>
//               </div>

//               {/* Notes */}
//               <div>
//                 <FL>Notes <span style={{ fontSize: 10, fontWeight: 400, textTransform: "none", letterSpacing: 0, color: T.t3 }}>(optional)</span></FL>
//                 <textarea rows={2} value={unavailForm.notes}
//                   onChange={(e) => setUnavailForm((p) => ({ ...p, notes: e.target.value }))}
//                   placeholder="Any additional context for your learners…"
//                   className="ma-input" style={{ resize: "vertical", lineHeight: 1.7 }} />
//               </div>

//               {/* Submit */}
//               <button type="submit" disabled={submitDisabled} className="ma-btn-primary" style={{ width: "100%", padding: "13px" }}>
//                 {addingUnavail ? "Saving…" : "Confirm Block"}
//               </button>

//               {!affectedDayNames.length && unavailForm.unavailableFrom && unavailForm.unavailableTo && (
//                 <p style={{ textAlign: "center", fontSize: 12, color: T.t2, marginTop: -10 }}>
//                   Select a date range that overlaps with at least one of your available days.
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── DELETE CONFIRM ─────────────────────────────────────── */}
//       {deleteTarget && (
//         <DeleteConfirmModal
//           record={deleteTarget} onConfirm={handleDeleteConfirm}
//           onCancel={() => setDeleteTarget(null)} deleting={deletingUnavail}
//         />
//       )}
//     </div>
//   );
// };

// export default MentorAvailability;

import React, { useEffect, useState } from "react";
import {
  useGetMentorAvailabilityQuery,
  useUpsertMentorAvailabilityMutation,
  useGetMentorUnavailabilityQuery,
  useAddMentorUnavailabilityMutation,
  useDeleteMentorUnavailabilityMutation,
} from "./mentorLtmAvialibilityapislice";
import Loader from "../../../global/Loader";

/* ─── Font Injection ──────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("ma-gf")) {
  const l = document.createElement("link");
  l.id = "ma-gf"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
  document.head.appendChild(l);
}

/* ═══════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════ */
const TIMEZONES = [
  { label: "UTC+05:30 — Asia/Kolkata (IST)", value: "Asia/Kolkata" },
  { label: "UTC+00:00 — Europe/London (GMT)", value: "Europe/London" },
  { label: "UTC+01:00 — Europe/Paris (CET)", value: "Europe/Paris" },
  { label: "UTC+02:00 — Europe/Helsinki (EET)", value: "Europe/Helsinki" },
  { label: "UTC+03:00 — Europe/Moscow (MSK)", value: "Europe/Moscow" },
  { label: "UTC+03:30 — Asia/Tehran (IRST)", value: "Asia/Tehran" },
  { label: "UTC+04:00 — Asia/Dubai (GST)", value: "Asia/Dubai" },
  { label: "UTC+04:30 — Asia/Kabul (AFT)", value: "Asia/Kabul" },
  { label: "UTC+05:00 — Asia/Karachi (PKT)", value: "Asia/Karachi" },
  { label: "UTC+05:45 — Asia/Kathmandu (NPT)", value: "Asia/Kathmandu" },
  { label: "UTC+06:00 — Asia/Dhaka (BST)", value: "Asia/Dhaka" },
  { label: "UTC+06:30 — Asia/Yangon (MMT)", value: "Asia/Yangon" },
  { label: "UTC+07:00 — Asia/Bangkok (ICT)", value: "Asia/Bangkok" },
  { label: "UTC+08:00 — Asia/Singapore (SGT)", value: "Asia/Singapore" },
  { label: "UTC+08:00 — Asia/Shanghai (CST)", value: "Asia/Shanghai" },
  { label: "UTC+09:00 — Asia/Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "UTC+09:00 — Asia/Seoul (KST)", value: "Asia/Seoul" },
  { label: "UTC+09:30 — Australia/Darwin (ACST)", value: "Australia/Darwin" },
  { label: "UTC+10:00 — Australia/Sydney (AEST)", value: "Australia/Sydney" },
  { label: "UTC+12:00 — Pacific/Auckland (NZST)", value: "Pacific/Auckland" },
  { label: "UTC-03:00 — America/Sao_Paulo (BRT)", value: "America/Sao_Paulo" },
  { label: "UTC-04:00 — America/Halifax (ADT)", value: "America/Halifax" },
  { label: "UTC-05:00 — America/New_York (EST)", value: "America/New_York" },
  { label: "UTC-06:00 — America/Chicago (CST)", value: "America/Chicago" },
  { label: "UTC-07:00 — America/Denver (MST)", value: "America/Denver" },
  { label: "UTC-08:00 — America/Los_Angeles (PST)", value: "America/Los_Angeles" },
  { label: "UTC-09:00 — America/Anchorage (AKST)", value: "America/Anchorage" },
  { label: "UTC-10:00 — Pacific/Honolulu (HST)", value: "Pacific/Honolulu" },
];

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAY_TO_INDEX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4 };
const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
const UNAVAIL_REASONS = [
  "Family Emergency", "Health Reason", "Personal Reason", "Work Reason",
  "Travel Plans", "Public Holiday", "Conference / Event", "Other",
];
const MONTH_OPTIONS = [
  { value: 1, label: "1 Month", mark: "◈" },
  { value: 3, label: "3 Months", mark: "◈◈" },
  { value: 6, label: "6 Months", mark: "◈◈◈" },
];

const toApiMonths = (set) => [...set].sort((a, b) => a - b);
const fromApiMonths = (arr) => new Set(Array.isArray(arr) ? arr.map(Number) : [Number(arr)]);

/* ═══════════════════════════════════════════════
   ORIGINAL GREEN DESIGN TOKENS
═══════════════════════════════════════════════ */
const C = {
  bg: "#030f0a",
  surface: "#071a10",
  surfaceAlt: "#0a2318",
  surfaceHigh: "#0d2d1e",
  border: "#0f4028",
  borderMid: "#1a6040",
  borderHi: "#267a52",
  accent: "#00c8a0",
  accentDim: "#007a62",
  accentGlow: "rgba(0,200,160,0.18)",
  accentSoft: "rgba(0,200,160,0.07)",
  gold: "#f0b429",
  goldDim: "#7a5c00",
  goldSoft: "rgba(240,180,41,0.10)",
  red: "#f05060",
  redDim: "#7a1d28",
  redSoft: "rgba(240,80,96,0.09)",
  text: "#e8fff8",
  textMuted: "#5a9e82",
  textDim: "#2a6648",
  mono: "'JetBrains Mono', monospace",
  sans: "'Syne', system-ui, sans-serif",
};

/* ═══════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════ */
const injectCSS = () => {
  if (typeof document === "undefined" || document.getElementById("ma-css")) return;
  const s = document.createElement("style");
  s.id = "ma-css";
  s.textContent = `
    .ma *, .ma *::before, .ma *::after { box-sizing:border-box; margin:0; padding:0; }
    .ma { font-family:${C.sans}; background:${C.bg}; color:${C.text}; min-height:100vh; }
    .ma-scroll::-webkit-scrollbar { width:3px; }
    .ma-scroll::-webkit-scrollbar-track { background:transparent; }
    .ma-scroll::-webkit-scrollbar-thumb { background:${C.border}; border-radius:99px; }
    .ma-field {
      width:100%; background:${C.bg}; border:1.5px solid ${C.border};
      color:${C.text}; border-radius:8px; padding:9px 13px;
      font-family:${C.sans}; font-size:13px; outline:none;
      transition:border-color .18s, box-shadow .18s;
      -webkit-appearance:none; appearance:none;
    }
    .ma-field:focus { border-color:${C.accentDim}; box-shadow:0 0 0 3px ${C.accentGlow}; }
    .ma-field option { background:${C.surfaceAlt}; }
    .ma-btn {
      display:inline-flex; align-items:center; justify-content:center;
      gap:7px; border:none; border-radius:8px; cursor:pointer;
      font-family:${C.sans}; font-weight:700; font-size:13px;
      padding:9px 20px; transition:all .15s; white-space:nowrap;
    }
    .ma-primary { background:${C.accent}; color:${C.bg}; box-shadow:0 2px 18px ${C.accentGlow}; }
    .ma-primary:hover:not(:disabled) { filter:brightness(1.08); transform:translateY(-1px); }
    .ma-primary:disabled { opacity:.4; cursor:not-allowed; box-shadow:none; transform:none; }
    .ma-ghost { background:${C.surfaceAlt}; color:${C.textMuted}; border:1.5px solid ${C.border}; }
    .ma-ghost:hover { border-color:${C.borderMid}; color:${C.text}; }
    .ma-danger { background:${C.redSoft}; color:${C.red}; border:1.5px solid ${C.redDim}; }
    .ma-danger:hover { background:rgba(240,80,96,0.15); }
    .ma-toggle {
      position:relative; display:inline-flex; align-items:center;
      width:40px; height:22px; border-radius:11px; border:none; cursor:pointer;
      transition:background .22s, box-shadow .22s; outline:none; flex-shrink:0;
    }
    .ma-knob {
      position:absolute; width:16px; height:16px; border-radius:50%; background:#fff;
      top:3px; transition:left .18s cubic-bezier(.4,0,.2,1);
      box-shadow:0 1px 4px rgba(0,0,0,.5);
    }
    @keyframes maUp   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
    @keyframes maIn   { from{opacity:0;transform:scale(.97)}        to{opacity:1;transform:scale(1)} }
    @keyframes maSlide{ from{opacity:0;transform:translateX(10px)}  to{opacity:1;transform:none} }
    @keyframes maPing { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(2.2);opacity:0} }
    .aUp    { animation:maUp    .3s ease both; }
    .aIn    { animation:maIn    .22s ease both; }
    .aSlide { animation:maSlide .26s ease both; }
    .aPing  { animation:maPing  2s ease-in-out infinite; }
    .ma-label {
      font-size:10px; font-weight:700; letter-spacing:.1em;
      text-transform:uppercase; color:${C.accentDim};
      display:block; margin-bottom:8px;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter:invert(.35) sepia(1) hue-rotate(100deg) saturate(3);
      cursor:pointer;
    }
  `;
  document.head.appendChild(s);
};

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
const fmtDate = (s) => s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const fmtShort = (s) => s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";
const calcEnd = (start, months) => { if (!start || !months) return null; const d = new Date(start); d.setMonth(d.getMonth() + months); return d; };
const daysLeft = (date) => { if (!date) return null; return Math.max(0, Math.ceil((new Date(date) - new Date()) / 86400000)); };
const activeBlock = (recs = [], day) => {
  const idx = DAY_TO_INDEX[day], today = new Date(); today.setHours(0, 0, 0, 0);
  return recs.find(u => {
    if (!u.daysOfWeek?.includes(idx)) return false;
    const f = new Date(u.unavailableFrom); f.setHours(0, 0, 0, 0);
    const t = new Date(u.unavailableTo); t.setHours(23, 59, 59, 999);
    return today >= f && today <= t;
  }) || null;
};

/* ═══════════════════════════════════════════════
   PRIMITIVES
═══════════════════════════════════════════════ */
const Toggle = ({ checked, onChange }) => (
  <button type="button" role="switch" aria-checked={checked}
    onClick={() => onChange(!checked)} className="ma-toggle"
    style={{ background: checked ? C.accent : C.surfaceAlt, boxShadow: checked ? `0 0 12px ${C.accentGlow}` : "none" }}>
    <span className="ma-knob" style={{ left: checked ? 21 : 3 }} />
  </button>
);

const Tag = ({ children, color = C.accent, bg = C.accentSoft, border = C.accentDim }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    background: bg, border: `1px solid ${border}`, color,
    borderRadius: 99, padding: "3px 9px",
    fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", fontFamily: C.sans,
  }}>{children}</span>
);

const Hr = ({ mx = 0 }) => <div style={{ height: 1, background: C.border, margin: `0 ${mx}px` }} />;

/* ── Week Timeline (horizontal heat-map) ─────── */
const WeekTimeline = ({ daySlots, unavailRecords = [] }) => {
  const hours = [6, 9, 12, 15, 18, 21];
  return (
    <div>
      <div style={{ display: "flex", paddingLeft: 32, marginBottom: 3 }}>
        {hours.map(h => (
          <div key={h} style={{ flex: 1, fontSize: 9, color: C.textDim, fontFamily: C.mono }}>{String(h).padStart(2, "0")}</div>
        ))}
      </div>
      {ALL_DAYS.map(day => {
        const slot = daySlots.find(s => s.day === day);
        const block = slot ? activeBlock(unavailRecords, day) : null;
        const fH = slot ? parseInt(slot.from) : 0, tH = slot ? parseInt(slot.to) : 0;
        const left = ((fH - 6) / 18) * 100, width = ((tH - fH) / 18) * 100;
        return (
          <div key={day} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{
              width: 26, fontSize: 10, fontWeight: 700, fontFamily: C.mono, textTransform: "uppercase",
              color: slot ? (block ? C.red : C.accent) : C.textDim, flexShrink: 0
            }}>{day}</span>
            <div style={{
              flex: 1, height: 16, background: C.surfaceAlt, borderRadius: 4,
              position: "relative", overflow: "hidden", border: `1px solid ${slot ? C.border : "transparent"}`
            }}>
              {slot && !block && (
                <div style={{
                  position: "absolute", height: "100%", borderRadius: 4,
                  background: `linear-gradient(90deg,${C.accentDim},${C.accent})`,
                  boxShadow: `0 0 8px ${C.accentGlow}`,
                  left: `${Math.max(0, left)}%`, width: `${Math.min(width, 100 - Math.max(0, left))}%`,
                }} />
              )}
              {slot && block && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: `repeating-linear-gradient(45deg,${C.redSoft},${C.redSoft} 4px,transparent 4px,transparent 8px)`,
                  borderLeft: `3px solid ${C.red}`,
                }} />
              )}
              <span style={{
                position: "absolute", right: 5, top: "50%", transform: "translateY(-50%)",
                fontSize: 9, fontFamily: C.mono, fontWeight: 700,
                color: !slot ? C.textDim : block ? C.red : C.accentDim,
              }}>
                {!slot ? "off" : block ? "BLOCKED" : `${slot.from}–${slot.to}`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── Sidebar ──────────────────────────────────── */
const Sidebar = ({ tab, setTab, daySlots, unavailRecords, sessionsPerWeek,
  availableForMonths, timeZone, subscriptionStartDate, unavailCount }) => {
  const monthsArr = Array.isArray(availableForMonths) ? availableForMonths : [availableForMonths];
  const isUnlim = monthsArr.length === 3;
  const maxMo = isUnlim ? 0 : Math.max(...monthsArr);
  const endDate = !isUnlim ? calcEnd(subscriptionStartDate, maxMo) : null;
  const remaining = daysLeft(endDate);
  const isWarn = !isUnlim && remaining !== null && remaining <= 14;
  const subAccent = isWarn ? C.gold : C.accent;
  const activeDays = daySlots.filter(s => s.enabled).length;

  return (
    <aside style={{
      width: 268, flexShrink: 0,
      background: C.surface, borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      position: "sticky", top: 0, height: "100vh", overflow: "hidden",
    }}>
      {/* Brand */}
      <div style={{ padding: "22px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: C.accentSoft,
            border: `1.5px solid ${C.accentDim}`, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.1 }}>Availability</p>
            <p style={{ fontSize: 10, color: C.accentDim, fontWeight: 700, letterSpacing: ".07em" }}>LTM · MENTOR PANEL</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "18px 10px 0" }}>
        {[
          {
            key: "schedule", label: "Schedule", count: null,
            icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          },
          {
            key: "unavailability", label: "Blocked Dates", count: unavailCount,
            icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
          },
        ].map(({ key, label, icon, count }) => {
          const on = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)} className="ma-btn" style={{
              width: "100%", justifyContent: "flex-start", gap: 9,
              padding: "9px 11px", borderRadius: 9, marginBottom: 3,
              background: on ? C.accentSoft : "transparent",
              color: on ? C.accent : C.textMuted,
              border: `1px solid ${on ? C.accentDim : "transparent"}`,
              fontWeight: on ? 700 : 500, fontSize: 13,
            }}>
              {icon}
              <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
              {count > 0 && (
                <span style={{
                  minWidth: 18, height: 18, borderRadius: 99, padding: "0 5px",
                  background: on ? C.accent : C.surfaceAlt, color: on ? C.bg : C.textMuted,
                  fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <Hr mx={14} />

      {/* Live timeline */}
      <div style={{ padding: "14px 14px 10px", flex: 1, overflow: "hidden" }}>
        <span className="ma-label">Week Overview</span>
        <WeekTimeline daySlots={daySlots} unavailRecords={unavailRecords} />
      </div>

      <Hr mx={14} />

    </aside>
  );
};

/* ── Card Section ────────────────────────────── */
const Section = ({ title, sub, children, right, delay = 0 }) => (
  <div className="aUp" style={{
    animationDelay: `${delay}ms`,
    background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 14,
    overflow: "hidden", marginBottom: 14,
  }}>
    <div style={{
      padding: "15px 20px", borderBottom: `1px solid ${C.border}`,
      background: `linear-gradient(90deg,${C.surfaceAlt},${C.surface})`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{title}</p>
        {sub && <p style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{sub}</p>}
      </div>
      {right}
    </div>
    {children}
  </div>
);

/* ── Delete Confirm Modal ─────────────────────── */
const DeleteModal = ({ record, onConfirm, onCancel, deleting }) => (
  <div onClick={e => e.target === e.currentTarget && onCancel()} style={{
    position: "fixed", inset: 0, zIndex: 60,
    background: "rgba(3,10,8,.92)", backdropFilter: "blur(10px)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  }}>
    <div className="aIn" style={{
      width: "100%", maxWidth: 380,
      background: C.surface, border: `1.5px solid ${C.redDim}`,
      borderRadius: 16, overflow: "hidden",
      boxShadow: `0 32px 80px rgba(0,0,0,.8)`,
    }}>
      <div style={{ padding: "24px 24px 18px" }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: C.redSoft,
          border: `1.5px solid ${C.redDim}`, display: "flex", alignItems: "center",
          justifyContent: "center", marginBottom: 14
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
          </svg>
        </div>
        <p style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 8 }}>Remove this block?</p>
        <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
          <strong style={{ color: C.red }}>{record?.reason}</strong> ({fmtDate(record?.unavailableFrom)} → {fmtDate(record?.unavailableTo)}) will be removed.
        </p>
      </div>
      <div style={{ display: "flex", gap: 10, padding: "0 24px 24px" }}>
        <button onClick={onCancel} className="ma-btn ma-ghost" style={{ flex: 1 }}>Cancel</button>
        <button onClick={onConfirm} disabled={deleting} className="ma-btn"
          style={{ flex: 1, background: C.red, color: "#fff", opacity: deleting ? .4 : 1, cursor: deleting ? "not-allowed" : "pointer" }}>
          {deleting ? "Removing…" : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function MentorAvailability() {
  injectCSS();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const mentorId = userData?._id;

  /* State */
  const [tab, setTab] = useState("schedule");
  const [hasSaved, setHasSaved] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [selectedMonths, setSelectedMonths] = useState(new Set([1]));
  const [sessionsPerWeek, setSessionsPerWeek] = useState(1);
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  const [availNotes, setAvailNotes] = useState("");
  const [snapshot, setSnapshot] = useState(null);
  const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);
  const [daySlots, setDaySlots] = useState(
    ALL_DAYS.map(d => ({ day: d, enabled: true, from: "09:00", to: "10:00" }))
  );
  const [unavailForm, setUnavailForm] = useState({
    unavailableFrom: "", unavailableTo: "", daysOfWeek: [],
    timeZone: "Asia/Kolkata", reason: "", customReason: "", notes: "",
  });

  /* Derived */
  const availableForMonths = toApiMonths(selectedMonths);
  const effectiveMax = selectedMonths.size === 3 ? 0 : Math.max(...selectedMonths);
  const previewSlots = daySlots.filter(s => s.enabled).map(({ day, from, to }) => ({ day, from, to }));

  /* API */
  const { data: availData, isLoading: loadingAvail } = useGetMentorAvailabilityQuery(mentorId);
  const [upsertAvailability, { isLoading: saving }] = useUpsertMentorAvailabilityMutation();
  const { data: unavailData, isLoading: loadingUnavail } = useGetMentorUnavailabilityQuery(mentorId);
  const [addUnavailability, { isLoading: addingUnavail }] = useAddMentorUnavailabilityMutation();
  const [deleteUnavailability, { isLoading: deletingUnavail }] = useDeleteMentorUnavailabilityMutation();

  /* Hydrate */
  useEffect(() => {
    if (!availData?.success || !availData.data) return;
    const d = availData.data;
    const slots = ALL_DAYS.map(day => {
      const s = d.daySlots?.find(x => x.day === day);
      return s ? { day, enabled: true, from: s.from, to: s.to } : { day, enabled: false, from: "09:00", to: "10:00" };
    });
    setDaySlots(slots);
    setSessionsPerWeek(d.availableDaysPerWeek || 1);
    setTimeZone(d.timeZone || "Asia/Kolkata");
    setAvailNotes(d.notes || "");
    setSelectedMonths(fromApiMonths(d.availableForMonths ?? 1));
    setSubscriptionStartDate(d.subscriptionStartDate || null);
    setHasSaved(true); setIsEditMode(false);
    setSnapshot({ slots, spw: d.availableDaysPerWeek || 1, tz: d.timeZone || "Asia/Kolkata", notes: d.notes || "", months: fromApiMonths(d.availableForMonths ?? 1) });
  }, [availData]);

  useEffect(() => { setUnavailForm(p => ({ ...p, timeZone })); }, [timeZone]);

  useEffect(() => {
    const { unavailableFrom, unavailableTo } = unavailForm;
    if (!unavailableFrom || !unavailableTo) { setUnavailForm(p => ({ ...p, daysOfWeek: [] })); return; }
    const idxs = daySlots.filter(s => s.enabled).map(s => DAY_TO_INDEX[s.day]);
    const aff = new Set();
    for (let d = new Date(unavailableFrom); d <= new Date(unavailableTo); d.setDate(d.getDate() + 1))
      if (idxs.includes(d.getDay())) aff.add(d.getDay());
    setUnavailForm(p => ({ ...p, daysOfWeek: [...aff] }));
  }, [unavailForm.unavailableFrom, unavailForm.unavailableTo, daySlots]);

  /* Handlers */
  const toggleDay = i => setDaySlots(p => p.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s));
  const updateSlot = (i, f, v) => setDaySlots(p => p.map((s, idx) => idx === i ? { ...s, [f]: v } : s));

  const handleEdit = () => {
    setSnapshot({ slots: [...daySlots], spw: sessionsPerWeek, tz: timeZone, notes: availNotes, months: new Set(selectedMonths) });
    setIsEditMode(true);
  };
  const handleCancel = () => {
    if (snapshot) {
      setDaySlots(snapshot.slots); setSessionsPerWeek(snapshot.spw);
      setTimeZone(snapshot.tz); setAvailNotes(snapshot.notes);
      setSelectedMonths(snapshot.months);
    }
    setIsEditMode(false);
  };
  const handleSave = async () => {
    try {
      await upsertAvailability({
        mentorId,
        daySlots: daySlots.filter(s => s.enabled).map(({ day, from, to }) => ({ day, from, to })),
        availableDaysPerWeek: sessionsPerWeek, timeZone, notes: availNotes, availableForMonths,
      }).unwrap();
      setHasSaved(true); setIsEditMode(false);
      setSnapshot({ slots: [...daySlots], spw: sessionsPerWeek, tz: timeZone, notes: availNotes, months: new Set(selectedMonths) });
    } catch (e) { console.error(e); }
  };
  const handleAddBlock = async (e) => {
    e.preventDefault();
    const reason = unavailForm.reason === "Other" ? (unavailForm.customReason.trim() || "Other") : unavailForm.reason;
    try {
      await addUnavailability({ mentorId, ...unavailForm, reason }).unwrap();
      setShowModal(false);
      setUnavailForm({ unavailableFrom: "", unavailableTo: "", daysOfWeek: [], timeZone, reason: "", customReason: "", notes: "" });
    } catch (e) { console.error(e); }
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { await deleteUnavailability({ mentorId, unavailId: deleteTarget._id }).unwrap(); setDeleteTarget(null); }
    catch (e) { console.error(e); }
  };

  if (loadingAvail || loadingUnavail) return <Loader />;

  const unavailRecords = unavailData?.data || [];
  const affectedDays = [...(unavailForm.daysOfWeek || [])].sort((a, b) => a - b).map(i => ALL_DAYS[i]);
  const subEndDate = effectiveMax === 0 ? "" : calcEnd(subscriptionStartDate, effectiveMax)?.toISOString().slice(0, 10) || "";
  const submitDisabled = addingUnavail || !affectedDays.length || !unavailForm.reason ||
    (unavailForm.reason === "Other" && !unavailForm.customReason.trim());
  const showPreview = hasSaved && !isEditMode;

  /* ════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════ */
  return (
    <div className="ma" style={{ display: "flex", minHeight: "100vh" }}>

      {/* ── SIDEBAR ─────────────────────────────── */}
      <Sidebar
        tab={tab} setTab={setTab}
        daySlots={daySlots} unavailRecords={unavailRecords}
        sessionsPerWeek={sessionsPerWeek}
        availableForMonths={availableForMonths}
        timeZone={timeZone}
        subscriptionStartDate={subscriptionStartDate}
        unavailCount={unavailRecords.length}
      />

      {/* ── MAIN PANEL ──────────────────────────── */}
      <main className="ma-scroll" style={{ flex: 1, overflowY: "auto", background: C.bg }}>

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 30,
          background: C.bg, borderBottom: `1px solid ${C.border}`,
          padding: "13px 26px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
        }}>
          <div>
            <h1 style={{ fontSize: 19, fontWeight: 800, color: C.text, lineHeight: 1 }}>
              {tab === "schedule" ? "Weekly Schedule" : "Blocked Dates"}
            </h1>
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>
              {tab === "schedule"
                ? "Configure when you're available for LTM sessions"
                : "Block specific date ranges from learner bookings"}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {tab === "schedule" && showPreview && (
              <button onClick={handleEdit} className="ma-btn ma-ghost">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Schedule
              </button>
            )}
            {tab === "schedule" && !showPreview && (
              <>
                {isEditMode && <button onClick={handleCancel} className="ma-btn ma-ghost">Discard</button>}
                <button onClick={handleSave} disabled={saving} className="ma-btn ma-primary">
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </>
            )}
            {tab === "unavailability" && (
              <button onClick={() => setShowModal(true)} className="ma-btn ma-primary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Block
              </button>
            )}
          </div>
        </div>

        {/* ══ SCHEDULE TAB ════════════════════════ */}
        {tab === "schedule" && (
          <div style={{ padding: "22px 26px 60px", maxWidth: 660 }}>

            {/* ── Preview ── */}
            {showPreview && (
              <div className="aUp">
                {/* Hero card with accent top bar */}
                <div style={{
                  background: C.surface, border: `1.5px solid ${C.border}`,
                  borderRadius: 16, overflow: "hidden", marginBottom: 14,
                }}>
                  <div style={{ height: 3, background: `linear-gradient(90deg,${C.accentDim},${C.accent},#00f5c8)` }} />
                  <div style={{ padding: "18px 20px" }}>
                    {/* Meta row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                      <div>
                        <p style={{ fontSize: 11, color: C.accentDim, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>
                          Active Configuration
                        </p>
                        <p style={{ fontSize: 12, color: C.textMuted }}>
                          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        <Tag>{sessionsPerWeek} session{sessionsPerWeek > 1 ? "s" : ""}/wk</Tag>
                        <Tag color={C.gold} bg={C.goldSoft} border={C.goldDim}>
                          {availableForMonths.length === 3 ? "All durations" : availableForMonths.map(m => `${m}mo`).join("+")}
                        </Tag>
                        <Tag color={C.textMuted} bg={C.surfaceAlt} border={C.border}>
                          🌐 {timeZone.split("/").pop()?.replace(/_/g, " ")}
                        </Tag>
                      </div>
                    </div>

                    {/* Timeline */}
                    <WeekTimeline daySlots={daySlots} unavailRecords={unavailRecords} />

                    {/* Day cards grid */}
                    <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 7 }}>
                      {ALL_DAYS.map(day => {
                        const slot = daySlots.find(s => s.day === day);
                        const block = slot ? activeBlock(unavailRecords, day) : null;
                        const on = slot?.enabled;
                        return (
                          <div key={day} style={{
                            display: "flex", alignItems: "center", gap: 9,
                            padding: "9px 13px", borderRadius: 9,
                            background: block ? C.redSoft : on ? C.surfaceAlt : C.bg,
                            border: `1px solid ${block ? C.redDim : on ? C.borderMid : C.border}`,
                          }}>
                            <span style={{
                              fontSize: 10, fontWeight: 800, fontFamily: C.mono, textTransform: "uppercase",
                              color: block ? C.red : on ? C.accent : C.textDim, width: 28, flexShrink: 0,
                            }}>{day}</span>
                            {on && !block && (
                              <>
                                <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 99, position: "relative", overflow: "hidden" }}>
                                  <div style={{
                                    position: "absolute", height: "100%", borderRadius: 99,
                                    background: `linear-gradient(90deg,${C.accentDim},${C.accent})`,
                                    left: `${(parseInt(slot.from) / 24) * 100}%`,
                                    width: `${((parseInt(slot.to) - parseInt(slot.from)) / 24) * 100}%`,
                                  }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, fontFamily: C.mono, flexShrink: 0 }}>
                                  {slot.from}–{slot.to}
                                </span>
                              </>
                            )}
                            {block && <span style={{ fontSize: 11, color: C.red, flex: 1 }}>Blocked · {fmtShort(block.unavailableTo)}</span>}
                            {!on && <span style={{ fontSize: 11, color: C.textDim, fontStyle: "italic" }}>Rest day</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {availNotes && (
                    <div style={{ borderTop: `1px solid ${C.border}`, padding: "11px 20px", background: C.bg }}>
                      <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
                        <span style={{ marginRight: 5 }}>📝</span>{availNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Edit / Create Mode ── */}
            {!showPreview && (
              <>
                {isEditMode && (
                  <div className="aUp" style={{
                    display: "flex", alignItems: "center", gap: 9, marginBottom: 14,
                    background: C.goldSoft, border: `1px solid ${C.goldDim}`,
                    borderRadius: 10, padding: "10px 14px",
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <p style={{ fontSize: 12, color: C.gold, fontWeight: 600 }}>
                      Editing mode — save when done to apply changes.
                    </p>
                  </div>
                )}

                {/* ─ Capacity Card ─ */}
                <Section title="Capacity" sub="Session count and commitment windows" delay={0}>
                  <div style={{ padding: "18px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>

                    {/* Sessions/wk */}
                    <div>
                      <span className="ma-label">Sessions / Week</span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 5, marginBottom: 12 }}>
                        {[1, 2, 3, 4, 5].map(n => {
                          const on = sessionsPerWeek === n;
                          return (
                            <button key={n} type="button" onClick={() => setSessionsPerWeek(n)}
                              className="ma-btn" style={{
                                flexDirection: "column", padding: "10px 0", borderRadius: 9, gap: 2,
                                background: on ? C.accentSoft : C.bg,
                                border: `1.5px solid ${on ? C.accent : C.border}`,
                                boxShadow: on ? `0 0 12px ${C.accentGlow}` : "none",
                                color: on ? C.accent : C.textMuted, fontSize: 18, fontWeight: 800,
                              }}>
                              {n}
                              <span style={{ fontSize: 9, fontWeight: 600, color: on ? C.accentDim : C.textDim }}>
                                {["1×", "2×", "3×", "4×", "5×"][n - 1]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 10, color: C.textDim }}>Intensity</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, fontFamily: C.mono }}>
                          {["Light", "Steady", "Active", "Intense", "Full"][sessionsPerWeek - 1]}
                        </span>
                      </div>
                      <div style={{ height: 4, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", borderRadius: 99,
                          background: `linear-gradient(90deg,${C.accentDim},${C.accent})`,
                          width: `${(sessionsPerWeek / 5) * 100}%`, transition: "width .4s ease",
                        }} />
                      </div>
                    </div>

                    {/* Available for */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span className="ma-label" style={{ marginBottom: 0 }}>Available For</span>
                        <button type="button" onClick={() => setSelectedMonths(p => p.size === 3 ? new Set([1]) : new Set([1, 3, 6]))}
                          style={{
                            fontSize: 10, fontWeight: 700, background: "none", border: "none",
                            color: selectedMonths.size === 3 ? C.red : C.accentDim,
                            cursor: "pointer", fontFamily: C.sans, textTransform: "uppercase", letterSpacing: ".06em"
                          }}>
                          {selectedMonths.size === 3 ? "Clear" : "All"}
                        </button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {MONTH_OPTIONS.map(({ value, label, mark }) => {
                          const on = selectedMonths.has(value);
                          return (
                            <button key={value} type="button" onClick={() => setSelectedMonths(p => {
                              const n = new Set(p);
                              if (n.has(value)) { if (n.size > 1) n.delete(value); } else n.add(value);
                              return n;
                            })} className="ma-btn" style={{
                              justifyContent: "space-between", padding: "8px 12px", borderRadius: 9,
                              background: on ? C.accentSoft : C.bg,
                              border: `1.5px solid ${on ? C.accentDim : C.border}`,
                              color: on ? C.accent : C.textMuted, fontSize: 12,
                            }}>
                              <span style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 2, color: on ? C.accentDim : C.textDim }}>{mark}</span>
                              <span>{label}</span>
                              <span style={{
                                width: 16, height: 16, borderRadius: "50%",
                                background: on ? C.accent : C.surfaceAlt, border: `1px solid ${on ? C.accent : C.border}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 9, fontWeight: 900, color: on ? C.bg : C.textDim
                              }}>
                                {on ? "✓" : ""}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Section>

                {/* ─ Timezone Card ─ */}
                <Section title="Timezone" sub="All bookings are shown in this timezone" delay={60}>
                  <div style={{ padding: "16px 20px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <select value={timeZone} onChange={e => setTimeZone(e.target.value)} className="ma-field" style={{ flex: 1 }}>
                      {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                    </select>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: C.bg, border: `1px solid ${C.accentDim}`, borderRadius: 7, padding: "6px 11px"
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.accent, fontFamily: C.mono, whiteSpace: "nowrap" }}>
                        {timeZone.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                </Section>

                {/* ─ Weekly Schedule ─ */}
                <Section title="Weekly Schedule" sub="Toggle days and set your available hours" delay={120}
                  right={<span style={{ fontSize: 11, color: C.textMuted, fontFamily: C.mono }}>
                    {daySlots.filter(s => s.enabled).length}/5 active
                  </span>}
                >
                  {/* Live timeline preview inside card */}
                  <div style={{ padding: "12px 20px 10px", borderBottom: `1px solid ${C.border}`, background: C.bg }}>
                    <WeekTimeline daySlots={daySlots} unavailRecords={unavailRecords} />
                  </div>

                  {daySlots.map((slot, i) => (
                    <div key={`${slot.day}-${i}`}>
                      <div style={{
                        display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10,
                        padding: "11px 20px", background: slot.enabled ? C.surface : C.bg, transition: "background .18s",
                      }}>
                        <Toggle checked={slot.enabled} onChange={() => toggleDay(i)} />
                        <span style={{
                          width: 28, fontSize: 11, fontWeight: 800, fontFamily: C.mono, textTransform: "uppercase",
                          color: slot.enabled ? C.accent : C.textDim
                        }}>{slot.day}</span>

                        {slot.enabled ? (
                          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, flex: 1 }}>
                            {[["from", "From"], ["to", "To"]].map(([f, lbl]) => (
                              <div key={f} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <span style={{ fontSize: 11, color: C.textDim }}>{lbl}</span>
                                <select value={slot[f]} onChange={e => updateSlot(i, f, e.target.value)}
                                  className="ma-field" style={{ width: "auto", padding: "5px 10px", fontSize: 12, fontWeight: 700, color: C.accent, fontFamily: C.mono }}>
                                  {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                              </div>
                            ))}
                            <Tag color={C.textMuted} bg={C.bg} border={C.border}>
                              {Math.max(parseInt(slot.to) - parseInt(slot.from), 0)}h
                            </Tag>
                            <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
                              <button type="button" onClick={() => setDaySlots(p => { const c = [...p]; c.splice(i + 1, 0, { day: slot.day, enabled: true, from: slot.from, to: slot.to }); return c; })}
                                className="ma-btn" style={{ width: 28, height: 28, padding: 0, borderRadius: 7, background: C.accentSoft, border: `1px solid ${C.accentDim}` }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" /></svg>
                              </button>
                              <button type="button" onClick={() => setDaySlots(p => p.filter((_, idx) => idx !== i))}
                                className="ma-btn" style={{ width: 28, height: 28, padding: 0, borderRadius: 7, background: C.redSoft, border: `1px solid ${C.redDim}` }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke={C.red} strokeWidth="2.5" strokeLinecap="round" /></svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: C.textDim, fontStyle: "italic" }}>Not available</span>
                        )}
                      </div>
                      {i < daySlots.length - 1 && <Hr mx={20} />}
                    </div>
                  ))}
                </Section>

                {/* ─ Notes ─ */}
                <Section title="Notes for Learners" sub="Optional message shown during booking" delay={180}>
                  <div style={{ padding: "16px 20px" }}>
                    <textarea rows={3} value={availNotes} onChange={e => setAvailNotes(e.target.value)}
                      placeholder="e.g. I prefer evening sessions. Come prepared with weekly goals…"
                      className="ma-field" style={{ resize: "vertical", lineHeight: 1.8 }} />
                  </div>
                </Section>

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 4 }}>
                  {isEditMode && <button onClick={handleCancel} className="ma-btn ma-ghost">Discard</button>}
                  <button onClick={handleSave} disabled={saving} className="ma-btn ma-primary" style={{ minWidth: 140 }}>
                    {saving ? "Saving…" : "Save Availability"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ══ BLOCKED DATES TAB ═══════════════════ */}
        {tab === "unavailability" && (
          <div style={{ padding: "22px 26px 60px", maxWidth: 660 }}>
            {!unavailRecords.length ? (
              <div className="aUp" style={{
                background: C.surface, border: `1.5px solid ${C.border}`,
                borderRadius: 16, padding: "52px 24px", textAlign: "center",
              }}>
                <p style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 6 }}>All clear!</p>
                <p style={{ fontSize: 13, color: C.textMuted }}>No blocked periods — all your days are open for bookings.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {unavailRecords.map((u, ui) => {
                  const today = new Date(); today.setHours(0, 0, 0, 0);
                  const from = new Date(u.unavailableFrom); from.setHours(0, 0, 0, 0);
                  const to = new Date(u.unavailableTo); to.setHours(23, 59, 59, 999);
                  const isActive = today >= from && today <= to;
                  const isPast = new Date(u.unavailableTo) < new Date();
                  const blocked = (u.daysOfWeek || [])
                    .filter(idx => previewSlots.some(s => DAY_TO_INDEX[s.day] === idx))
                    .sort((a, b) => a - b).map(idx => ALL_DAYS[idx]);
                  const accent = isActive ? C.red : isPast ? C.textDim : C.gold;
                  const status = isActive ? "Active Now" : isPast ? "Past" : "Upcoming";

                  return (
                    <div key={u._id} className={`aUp aSlide`}
                      style={{
                        animationDelay: `${ui * 35}ms`,
                        background: C.surface, border: `1.5px solid ${isActive ? C.redDim : C.border}`,
                        borderRadius: 14, overflow: "hidden", opacity: isPast ? .65 : 1,
                      }}>
                      {/* Left accent bar + content */}
                      <div style={{ display: "flex" }}>
                        <div style={{ width: 4, background: accent, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          {/* Row header */}
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "11px 16px 9px",
                            borderBottom: `1px solid ${C.border}`,
                            background: isActive ? C.redSoft : C.bg,
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent }} />
                              <span style={{ fontSize: 10, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: ".09em" }}>{status}</span>
                              <span style={{ fontSize: 10, color: C.textDim, fontFamily: C.mono }}>
                                {fmtShort(u.unavailableFrom)} → {fmtShort(u.unavailableTo)}
                              </span>
                            </div>
                            <button onClick={() => setDeleteTarget(u)} className="ma-btn ma-danger" style={{ padding: "4px 10px", fontSize: 11, gap: 5 }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              </svg>
                              Delete
                            </button>
                          </div>

                          <div style={{ padding: "13px 16px" }}>
                            <p style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 9 }}>{u.reason}</p>
                            {blocked.length > 0 && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {blocked.map(d => {
                                  const sl = previewSlots.find(s => s.day === d);
                                  return (
                                    <div key={d} style={{
                                      display: "flex", alignItems: "center", gap: 5,
                                      background: C.redSoft, border: `1px solid ${C.redDim}`,
                                      borderRadius: 7, padding: "4px 9px"
                                    }}>
                                      <span style={{ fontSize: 11, fontWeight: 800, color: C.red, fontFamily: C.mono }}>{d}</span>
                                      {sl && <span style={{ fontSize: 10, color: C.redDim, fontFamily: C.mono }}>{sl.from}–{sl.to}</span>}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {u.notes && <p style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic", marginTop: 8, lineHeight: 1.6 }}>{u.notes}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ══ ADD BLOCK MODAL ═════════════════════════ */}
      {showModal && (
        <div onClick={e => e.target === e.currentTarget && setShowModal(false)} style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(3,10,8,.92)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center", overflowY: "auto",
        }}>
          <div className="aIn" style={{
            width: "100%", maxWidth: 520,
            background: C.surface, borderRadius: "18px 18px 0 0",
            border: `1.5px solid ${C.border}`, borderBottom: "none",
            boxShadow: `0 -24px 80px rgba(0,0,0,.7)`,
          }}>
            {/* Handle */}
            <div style={{ padding: "14px 24px 0", textAlign: "center" }}>
              <div style={{ width: 36, height: 4, borderRadius: 99, background: C.border, margin: "0 auto" }} />
            </div>

            {/* Header */}
            <div style={{ padding: "14px 24px 14px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Block a Date Range</p>
                  <p style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>
                    Available days in this window are blocked automatically
                  </p>
                </div>
                <button onClick={() => setShowModal(false)} className="ma-btn ma-ghost"
                  style={{ width: 32, height: 32, padding: 0, fontSize: 18, borderRadius: 8, border: "none" }}>×</button>
              </div>

              {/* Progress steps */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
                {[
                  { done: !!(unavailForm.unavailableFrom && unavailForm.unavailableTo), label: "Dates" },
                  { done: !!unavailForm.reason, label: "Reason" },
                  { done: affectedDays.length > 0, label: "Days" },
                ].map(({ done, label }, idx, arr) => (
                  <React.Fragment key={label}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: done ? C.accent : C.surfaceAlt,
                        border: `1.5px solid ${done ? C.accent : C.border}`,
                        color: done ? C.bg : C.textDim,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, fontWeight: 900, transition: "all .2s",
                        boxShadow: done ? `0 0 10px ${C.accentGlow}` : "none",
                      }}>{done ? "✓" : idx + 1}</div>
                      <span style={{ fontSize: 10, color: done ? C.accent : C.textDim, fontWeight: done ? 700 : 400 }}>{label}</span>
                    </div>
                    {idx < arr.length - 1 && <div style={{ flex: 1, height: 1, background: C.border }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAddBlock} className="ma-scroll"
              style={{ display: "flex", flexDirection: "column", gap: 16, padding: "18px 24px 24px", maxHeight: "68vh" }}>

              {/* Dates */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["unavailableFrom", "From"], ["unavailableTo", "To"]].map(([key, lbl]) => (
                  <div key={key}>
                    <span className="ma-label">{lbl} <span style={{ color: C.red }}>*</span></span>
                    <input type="date" required value={unavailForm[key]}
                      min={new Date().toISOString().slice(0, 10)} max={subEndDate || undefined}
                      onChange={e => setUnavailForm(p => ({ ...p, [key]: e.target.value }))}
                      className="ma-field" />
                  </div>
                ))}
              </div>

              {/* Affected days preview */}
              {unavailForm.unavailableFrom && unavailForm.unavailableTo && (
                <div style={{
                  borderRadius: 10, padding: 14,
                  background: affectedDays.length ? C.redSoft : C.bg,
                  border: `1.5px solid ${affectedDays.length ? C.redDim : C.border}`,
                }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: affectedDays.length ? C.red : C.textMuted, marginBottom: affectedDays.length ? 8 : 0 }}>
                    {affectedDays.length
                      ? `${affectedDays.length} session day${affectedDays.length > 1 ? "s" : ""} will be blocked:`
                      : "⚠️ No available days fall in this range"}
                  </p>
                  {affectedDays.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {affectedDays.map(d => {
                        const sl = previewSlots.find(s => s.day === d);
                        return (
                          <div key={d} style={{
                            display: "flex", alignItems: "center", gap: 5,
                            background: C.surfaceAlt, border: `1.5px solid ${C.redDim}`, borderRadius: 7, padding: "4px 10px"
                          }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: C.red, fontFamily: C.mono }}>{d}</span>
                            {sl && <span style={{ fontSize: 10, color: C.redDim, fontFamily: C.mono }}>{sl.from}–{sl.to}</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Reason */}
              <div>
                <span className="ma-label">Reason <span style={{ color: C.red }}>*</span></span>
                <select required value={unavailForm.reason}
                  onChange={e => setUnavailForm(p => ({ ...p, reason: e.target.value, customReason: "" }))}
                  className="ma-field" style={{ color: !unavailForm.reason ? C.textMuted : C.text }}>
                  <option value="" disabled>Select a reason…</option>
                  {UNAVAIL_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {unavailForm.reason === "Other" && (
                  <input type="text" required placeholder="Describe your reason…" value={unavailForm.customReason}
                    onChange={e => setUnavailForm(p => ({ ...p, customReason: e.target.value }))}
                    className="ma-field" style={{ marginTop: 8, background: C.redSoft, borderColor: C.redDim }} />
                )}
              </div>

              {/* Timezone */}
              <div>
                <span className="ma-label">Timezone <span style={{ color: C.red }}>*</span></span>
                <select required value={unavailForm.timeZone}
                  onChange={e => setUnavailForm(p => ({ ...p, timeZone: e.target.value }))}
                  className="ma-field">
                  {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                </select>
              </div>

              {/* Notes */}
              <div>
                <span className="ma-label">Notes
                  <span style={{ fontSize: 9, textTransform: "none", letterSpacing: 0, color: C.textDim, fontWeight: 400 }}> (optional)</span>
                </span>
                <textarea rows={2} value={unavailForm.notes}
                  onChange={e => setUnavailForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Additional context for learners…"
                  className="ma-field" style={{ resize: "vertical", lineHeight: 1.8 }} />
              </div>

              <button type="submit" disabled={submitDisabled} className="ma-btn ma-primary"
                style={{ width: "100%", padding: 13, fontSize: 14 }}>
                {addingUnavail ? "Saving…" : "Confirm Block"}
              </button>

              {!affectedDays.length && unavailForm.unavailableFrom && unavailForm.unavailableTo && (
                <p style={{ textAlign: "center", fontSize: 12, color: C.textMuted, marginTop: -8 }}>
                  Pick a range overlapping at least one of your available days.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ══ DELETE CONFIRM ══════════════════════════ */}
      {deleteTarget && (
        <DeleteModal
          record={deleteTarget} onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)} deleting={deletingUnavail}
        />
      )}
    </div>
  );
}