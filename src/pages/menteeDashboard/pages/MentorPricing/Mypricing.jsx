
// import { useState, useEffect, useCallback } from "react";
// import {
//   useGetMyPricingQuery,
//   useSaveOrUpdatePricingMutation,
//   useGetSubscribersByMentorQuery,
//   useGetCommissionTiersQuery,
// } from "./Mentorpricingapislice";

// const PRICE_OPTIONS = [
//   2500, 5000, 7500, 10000, 12500, 15000,
//   17500, 20000, 22500, 25000, 27500, 30000,
//   32500, 35000, 37500, 40000, 42500, 45000,
//   47500, 50000,
// ];

// const TIER_LABELS = {
//   "1_to_5": "1–5 subscribers",
//   "6_to_20": "6–20 subscribers",
//   "21_plus": "21+ subscribers",
// };

// const PLANS = [
//   { key: "one_month", label: "1 Month", sublabel: "LTM Plan", months: 1 },
//   { key: "three_months", label: "3 Months", sublabel: "LTM Plan", months: 3 },
//   { key: "six_months", label: "6 Months", sublabel: "LTM Plan", months: 6 },
// ];

// const EMPTY_PLANS = {
//   one_month: { experienced: "", freshers: "" },
//   three_months: { experienced: "", freshers: "" },
//   six_months: { experienced: "", freshers: "" },
// };

// const formatINR = (val) =>
//   val != null && val !== ""
//     ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val)
//     : "—";

// const resolveTier = (subscriberCount, tiers) => {
//   if (!tiers || tiers.length === 0) return null;
//   const count = Number(subscriberCount) || 0;
//   let tierName;
//   if (count <= 5) tierName = "1_to_5";
//   else if (count <= 20) tierName = "6_to_20";
//   else tierName = "21_plus";
//   return tiers.find((t) => t.tier_name === tierName) || null;
// };

// // ── Icons ─────────────────────────────────────────────────────────────────────
// const CheckIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//   </svg>
// );
// const CloseIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );
// const EditIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.829 1.172H7v-2a4 4 0 011.172-2.828z" />
//   </svg>
// );
// const UsersIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );
// const WarnIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//   </svg>
// );
// const InfoIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
//   </svg>
// );
// const ChevronIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//   </svg>
// );

// // ── PriceField ─────────────────────────────────────────────────────────────────
// const PriceField = ({ label, value, onChange, disabled }) => {
//   const [mode, setMode] = useState("dropdown");
//   const [customVal, setCustomVal] = useState("");
//   const [error, setError] = useState("");

//   // Sync external value into local state
//   useEffect(() => {
//     const num = Number(value);
//     if (value !== "" && value != null && !PRICE_OPTIONS.includes(num)) {
//       setMode("custom");
//       setCustomVal(String(value));
//     } else if (value === "" || value == null) {
//       setMode("dropdown");
//       setCustomVal("");
//     } else {
//       // It's a valid dropdown option — stay in dropdown mode
//       setMode("dropdown");
//     }
//   }, [value]);

//   const handleDropdownChange = (e) => {
//     if (disabled) return;
//     const val = Number(e.target.value);
//     onChange(val);
//   };

//   const handleCustomChange = (e) => {
//     if (disabled) return;
//     const raw = e.target.value.replace(/[^0-9]/g, "");
//     setCustomVal(raw);
//     setError("");
//     const num = Number(raw);
//     if (raw && num < 500) setError("Minimum ₹500");
//     else if (raw && num > 200000) setError("Maximum ₹2,00,000");
//     else if (raw) onChange(num);
//   };

//   const handleCustomBlur = () => {
//     if (disabled) return;
//     if (!customVal || Number(customVal) < 500) setError("Enter valid amount (min ₹500)");
//   };

//   const switchMode = (newMode) => {
//     if (disabled) return;
//     setMode(newMode);
//     setError("");
//     if (newMode === "dropdown") {
//       setCustomVal("");
//       if (!PRICE_OPTIONS.includes(Number(value))) onChange(PRICE_OPTIONS[0]);
//     } else {
//       setCustomVal(value ? String(value) : "");
//     }
//   };

//   const displayValue = value !== "" && value != null ? Number(value) : "";

//   return (
//     <div className="flex flex-col gap-1.5 w-full">
//       {/* Label + Toggle */}
//       <div className="flex items-center justify-between">
//         <label className="text-[#8ab4a0] text-xs font-semibold tracking-wide uppercase">{label}</label>
//         <div className="flex rounded-lg overflow-hidden border border-[#1a3a28]">
//           {["dropdown", "custom"].map((m) => (
//             <button
//               key={m}
//               type="button"
//               onClick={() => switchMode(m)}
//               disabled={disabled}
//               className={`text-[10px] px-2.5 py-1 font-bold capitalize transition-all duration-150
//                 ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
//                 ${mode === m
//                   ? "bg-[#0098cc] text-white"
//                   : "bg-[#0a1f14] text-[#3a6a4a] hover:text-[#0098cc]"
//                 }`}
//             >
//               {m === "dropdown" ? "Select" : "Custom"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Input */}
//       <div
//         className={`flex items-center h-11 rounded-xl px-3.5 gap-2 border transition-all duration-150
//           ${disabled
//             ? "bg-[#040f09] border-[#0d2018] cursor-not-allowed"
//             : error
//               ? "bg-[#0a1208] border-red-500/60 ring-1 ring-red-500/20"
//               : mode === "custom"
//                 ? "bg-[#040f09] border-[#0098cc]/50 ring-1 ring-[#0098cc]/15"
//                 : "bg-[#040f09] border-[#1a3a28] hover:border-[#2a5a3a]"
//           }`}
//       >
//         <span className="text-[#0098cc] text-sm font-black shrink-0">₹</span>

//         {mode === "dropdown" ? (
//           <>
//             <select
//               value={displayValue}
//               onChange={handleDropdownChange}
//               disabled={disabled}
//               className={`flex-1 bg-transparent border-none outline-none text-sm font-semibold appearance-none
//                 ${disabled ? "text-white/30 cursor-not-allowed" : "text-white cursor-pointer"}`}
//             >
//               <option value="" disabled className="bg-[#030f0a] text-white/40">
//                 Choose price
//               </option>
//               {PRICE_OPTIONS.map((p) => (
//                 <option key={p} value={p} className="bg-[#030f0a] text-white">
//                   {new Intl.NumberFormat("en-IN").format(p)} / session
//                 </option>
//               ))}
//             </select>
//             <ChevronIcon className={`w-3.5 h-3.5 shrink-0 ${disabled ? "text-[#2a4a33]/40" : "text-[#3a6a4a]"}`} />
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               inputMode="numeric"
//               placeholder="Enter amount"
//               value={customVal}
//               onChange={handleCustomChange}
//               onBlur={handleCustomBlur}
//               disabled={disabled}
//               className={`flex-1 bg-transparent border-none outline-none text-sm font-semibold placeholder:text-[#2a4a33]
//                 ${disabled ? "text-white/30 cursor-not-allowed" : "text-white"}`}
//             />
//             <span className="text-[#3a6a4a] text-[10px] font-semibold shrink-0">/session</span>
//           </>
//         )}
//       </div>

//       {error && (
//         <p className="text-red-400 text-[10px] font-medium flex items-center gap-1">
//           <WarnIcon className="w-3 h-3 shrink-0" />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// // ── Plan Modal ─────────────────────────────────────────────────────────────────
// const PlanModal = ({ plan, planData, onClose, tierName, subscriberCount }) => {
//   const breakdown = planData?.breakdown;
//   const exp = breakdown?.experienced;
//   const fre = breakdown?.freshers;
//   const hasBreakdown = exp && fre && exp.totalPrice > 0;
//   const platformPct = exp?.platformPct ?? 0;
//   const mentorPct = 100 - platformPct;

//   useEffect(() => {
//     const handler = (e) => { if (e.key === "Escape") onClose(); };
//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, [onClose]);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div
//         className="w-full sm:max-w-lg bg-[#030f0a] border border-[#0e2318] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
//         style={{ maxHeight: "90vh" }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-start justify-between px-5 py-4 border-b border-[#0e2318]">
//           <div>
//             <div className="flex items-center gap-2">
//               <h2 className="text-white text-base font-bold">{plan.label}</h2>
//               <span className="text-[10px] bg-[#0098cc]/15 text-[#0098cc] font-bold px-2 py-0.5 rounded-full">
//                 {plan.sublabel}
//               </span>
//             </div>
//             {tierName && (
//               <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
//                 <span className="text-[10px] bg-[#0a1f14] text-[#3a9a5a] px-2 py-0.5 rounded-full border border-[#1a3a28]">
//                   {TIER_LABELS[tierName] || tierName}
//                 </span>
//                 <span className="text-[10px] text-[#3a6a4a]">Platform {platformPct}%</span>
//                 <span className="text-[10px] text-[#1a3a28]">·</span>
//                 <span className="text-[10px] text-[#0098cc] font-semibold">You keep ~{mentorPct}%</span>
//                 <span className="text-[10px] text-[#1a3a28]">·</span>
//                 <span className="text-[10px] text-[#3a6a4a]">{subscriberCount} subscriber{subscriberCount !== 1 ? "s" : ""}</span>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#0a1f14] hover:bg-[#122a1c] text-[#4a7a5a] hover:text-white transition-all duration-150 cursor-pointer shrink-0 ml-2"
//           >
//             <CloseIcon className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="overflow-y-auto flex-1 p-5">
//           {!hasBreakdown ? (
//             <div className="flex flex-col items-center justify-center py-12 gap-3">
//               <div className="w-12 h-12 rounded-2xl bg-[#0a1f14] border border-[#1a3a28] flex items-center justify-center">
//                 <InfoIcon className="w-6 h-6 text-[#3a6a4a]" />
//               </div>
//               <p className="text-[#4a7a5a] text-sm text-center max-w-xs">
//                 Save your pricing to generate a full earnings breakdown.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 gap-3">
//               {[{ label: "Experienced", data: exp }, { label: "Freshers", data: fre }].map(({ label, data }) => (
//                 <div key={label} className="bg-[#040f09] border border-[#0e2318] rounded-2xl overflow-hidden">
//                   <div className="px-4 py-2.5 bg-[#020c06] border-b border-[#0e2318]">
//                     <span className="text-[#0098cc] text-[9px] font-black uppercase tracking-[0.15em]">{label}</span>
//                   </div>
//                   <div className="p-4 flex flex-col gap-3">
//                     {/* Mentee Pays */}
//                     <div>
//                       <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold mb-1">Mentee Pays</p>
//                       <p className="text-white text-lg font-black leading-none">₹{formatINR(data.totalPrice)}</p>
//                       {plan.months > 1 && (
//                         <p className="text-[#3a6a4a] text-[10px] mt-0.5">
//                           ₹{formatINR(Math.round(data.totalPrice / plan.months))}/session
//                         </p>
//                       )}
//                     </div>

//                     <div className="h-px bg-[#0e2318]" />

//                     {/* Deductions */}
//                     <div className="flex flex-col gap-1.5">
//                       <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold">Deductions</p>
//                       {[
//                         { label: `Platform (${data.platformPct}%)`, val: data.platformFee },
//                         { label: "CGST (9%)", val: data.cgst },
//                         { label: "SGST (9%)", val: data.sgst },
//                       ].map(({ label: dl, val }) => (
//                         <div key={dl} className="flex justify-between items-center">
//                           <span className="text-[#4a6a5a] text-[10px]">{dl}</span>
//                           <span className="text-red-400/80 text-[10px] font-semibold">-₹{formatINR(val)}</span>
//                         </div>
//                       ))}
//                       <div className="flex justify-between items-center pt-1.5 border-t border-[#0e2318] mt-0.5">
//                         <span className="text-[#5a8a6a] text-[10px] font-bold">Total</span>
//                         <span className="text-red-400 text-[10px] font-black">-₹{formatINR(data.totalDeducted)}</span>
//                       </div>
//                     </div>

//                     <div className="h-px bg-[#0e2318]" />

//                     {/* You Receive */}
//                     <div className="bg-[#0098cc]/8 border border-[#0098cc]/20 rounded-xl p-3">
//                       <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold mb-1.5">You Receive</p>
//                       <p className="text-[#0098cc] text-base font-black leading-none">₹{formatINR(data.mentorReceive)}</p>
//                       {plan.months > 1 && (
//                         <p className="text-[#0098cc]/60 text-[10px] font-semibold mt-0.5">
//                           ₹{formatINR(data.perMonthReceive)}/session
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-5 py-4 border-t border-[#0e2318]">
//           <button
//             onClick={onClose}
//             className="w-full bg-[#0098cc] hover:bg-[#007aaa] active:bg-[#006699] text-white text-sm font-bold py-3 rounded-xl transition-all duration-150 cursor-pointer"
//           >
//             Got it
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Plan Card ──────────────────────────────────────────────────────────────────
// const PlanCard = ({ plan, planData, onChange, saving, isEditing, onViewDetails }) => {
//   const experienced = planData?.experienced ?? "";
//   const freshers = planData?.freshers ?? "";
//   const breakdown = planData?.breakdown;
//   const hasValues = experienced !== "" || freshers !== "";
//   const hasBreakdown = breakdown?.experienced?.mentorReceive > 0;
//   const fresherWarn = hasValues && freshers !== "" && experienced !== "" &&
//     Number(freshers) >= Number(experienced);

//   return (
//     <div className={`w-full bg-[#040f09] border rounded-2xl overflow-hidden transition-all duration-200
//       ${isEditing ? "border-[#0098cc]/30 ring-1 ring-[#0098cc]/10" : "border-[#0e2318]"}`}>

//       {/* Card Header */}
//       <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#0e2318]">
//         <div className="flex items-center gap-3">
//           <div className="flex flex-col">
//             <span className="text-white text-sm font-bold leading-tight">{plan.label}</span>
//             <span className="text-[#3a6a4a] text-[10px] font-medium">{plan.sublabel}</span>
//           </div>
//           {hasValues && (
//             <span className="flex items-center gap-1 text-[10px] text-[#3a9a5a] font-semibold bg-[#3a9a5a]/10 border border-[#3a9a5a]/20 px-2 py-0.5 rounded-full">
//               <span className="w-1.5 h-1.5 rounded-full bg-[#3a9a5a]" />
//               Active
//             </span>
//           )}
//         </div>

//         {hasBreakdown && !isEditing && (
//           <button
//             onClick={() => onViewDetails(plan)}
//             className="text-[11px] font-bold text-[#0098cc] bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer"
//           >
//             View Details →
//           </button>
//         )}
//       </div>

//       {/* Price Fields */}
//       <div className="flex flex-col sm:flex-row gap-4 p-5">
//         <div className="flex-1 min-w-0">
//           <PriceField
//             label="Experienced"
//             value={experienced}
//             onChange={(val) => onChange(plan.key, "experienced", val)}
//             disabled={!isEditing || saving}
//           />
//         </div>
//         <div className="hidden sm:flex w-px bg-[#0e2318] self-stretch mx-1" />
//         <div className="flex-1 min-w-0">
//           <PriceField
//             label="Freshers"
//             value={freshers}
//             onChange={(val) => onChange(plan.key, "freshers", val)}
//             disabled={!isEditing || saving}
//           />
//         </div>
//       </div>

//       {/* Warning */}
//       {fresherWarn && (
//         <div className="mx-5 mb-4 flex items-center gap-2 px-4 py-2.5 bg-amber-500/8 border border-amber-500/20 rounded-xl">
//           <WarnIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
//           <span className="text-amber-400 text-xs font-medium">Freshers price must be less than Experienced</span>
//         </div>
//       )}

//       {/* Earnings Strip */}
//       {hasBreakdown && (
//         <div className="flex items-center justify-between gap-3 mx-5 mb-5 px-4 py-3 bg-[#020c06] border border-[#0e2318] rounded-xl">
//           <div>
//             <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold mb-1.5">You receive / month</p>
//             <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
//               <span className="text-xs text-[#5a8a6a]">
//                 Exp:&nbsp;
//                 <strong className="text-[#0098cc] text-sm font-black">
//                   ₹{formatINR(breakdown.experienced.perMonthReceive)}
//                 </strong>
//               </span>
//               <span className="text-[#1a3a28]">|</span>
//               <span className="text-xs text-[#5a8a6a]">
//                 Fresh:&nbsp;
//                 <strong className="text-[#0098cc] text-sm font-black">
//                   ₹{formatINR(breakdown.freshers.perMonthReceive)}
//                 </strong>
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Tier Badge ─────────────────────────────────────────────────────────────────
// const TierBadge = ({ activeTier, subscriberCount, tiersLoading }) => {
//   if (tiersLoading) return (
//     <div className="flex items-center gap-2 bg-[#0a1f14] px-3 py-1.5 rounded-lg w-fit border border-[#1a3a28]">
//       <div className="w-3 h-3 border-2 border-[#1a3a28] border-t-[#0098cc] rounded-full animate-spin" />
//       <span className="text-[#4a7a5a] text-xs">Loading tier...</span>
//     </div>
//   );
//   if (!activeTier) return null;
//   return (
//     <div className="flex items-center gap-2 bg-[#0098cc]/8 border border-[#0098cc]/20 px-3 py-1.5 rounded-xl w-fit">
//       <UsersIcon className="w-3.5 h-3.5 text-[#0098cc] shrink-0" />
//       <span className="text-[#0098cc] text-[11px] font-bold">
//         {subscriberCount} subscriber{subscriberCount !== 1 ? "s" : ""}
//       </span>
//       <span className="text-[#0098cc]/40 text-[10px]">·</span>
//       <span className="text-[#0098cc]/80 text-[11px] font-medium">
//         {TIER_LABELS[activeTier.tier_name] || activeTier.tier_name}
//       </span>
//     </div>
//   );
// };

// // ── Toast ──────────────────────────────────────────────────────────────────────
// const Toast = ({ toast }) => {
//   if (!toast) return null;
//   const isSuccess = toast.type === "success";
//   return (
//     <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl z-50 whitespace-nowrap transition-all duration-300
//       ${isSuccess ? "bg-[#0098cc]" : "bg-red-600"}`}>
//       {isSuccess
//         ? <CheckIcon className="w-4 h-4 shrink-0" />
//         : <CloseIcon className="w-4 h-4 shrink-0" />
//       }
//       {toast.msg}
//     </div>
//   );
// };

// // ── Main Component ─────────────────────────────────────────────────────────────
// const MyPricing = () => {
//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const mentorId = userData?._id || null;

//   const [plans, setPlans] = useState(EMPTY_PLANS);
//   const [fullPlansData, setFullPlansData] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [modalPlan, setModalPlan] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const { data, isLoading, isError } = useGetMyPricingQuery(mentorId, { skip: !mentorId });
//   const [saveOrUpdate, { isLoading: saving }] = useSaveOrUpdatePricingMutation();
//   const { data: subscribersData } = useGetSubscribersByMentorQuery(mentorId, { skip: !mentorId });
//   const { data: tiersData, isLoading: tiersLoading } = useGetCommissionTiersQuery();

//   const subscriberCount = subscribersData?.data?.length ?? subscribersData?.count ?? 0;
//   const tiers = tiersData?.data || [];
//   const activeTier = resolveTier(subscriberCount, tiers);

//   const hasAnyPricingData = fullPlansData &&
//     PLANS.some((p) => fullPlansData[p.key]?.experienced || fullPlansData[p.key]?.freshers);

//   useEffect(() => {
//     if (data?.plans?.plans) {
//       const bp = data.plans.plans;
//       setFullPlansData(bp);
//       setPlans({
//         one_month: { experienced: bp.one_month?.experienced ?? "", freshers: bp.one_month?.freshers ?? "" },
//         three_months: { experienced: bp.three_months?.experienced ?? "", freshers: bp.three_months?.freshers ?? "" },
//         six_months: { experienced: bp.six_months?.experienced ?? "", freshers: bp.six_months?.freshers ?? "" },
//       });
//     }
//   }, [data]);

//   const handleChange = useCallback((planKey, tier, value) => {
//     setPlans((prev) => ({
//       ...prev,
//       [planKey]: { ...prev[planKey], [tier]: value },
//     }));
//   }, []);

//   const showToast = useCallback((type, msg) => {
//     setToast({ type, msg });
//     setTimeout(() => setToast(null), 3500);
//   }, []);

//   const handleSave = async () => {
//     if (!mentorId) return showToast("error", "Session expired. Please log in again.");

//     for (const plan of PLANS) {
//       const exp = Number(plans[plan.key].experienced) || 0;
//       const fres = Number(plans[plan.key].freshers) || 0;
//       if (!exp || !fres) return showToast("error", `Fill both prices for ${plan.label}`);
//       if (fres >= exp) return showToast("error", `${plan.label}: Freshers must be less than Experienced`);
//     }

//     try {
//       const sanitizedPlans = Object.fromEntries(
//         Object.entries(plans).map(([key, val]) => [
//           key,
//           { experienced: Number(val.experienced) || 0, freshers: Number(val.freshers) || 0 },
//         ])
//       );
//       const result = await saveOrUpdate({ mentorId, plans: sanitizedPlans }).unwrap();
//       if (result?.plans?.plans) setFullPlansData(result.plans.plans);
//       setIsEditing(false);
//       showToast("success", "Pricing saved successfully!");
//     } catch {
//       showToast("error", "Failed to save. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     if (data?.plans?.plans) {
//       const bp = data.plans.plans;
//       setPlans({
//         one_month: { experienced: bp.one_month?.experienced ?? "", freshers: bp.one_month?.freshers ?? "" },
//         three_months: { experienced: bp.three_months?.experienced ?? "", freshers: bp.three_months?.freshers ?? "" },
//         six_months: { experienced: bp.six_months?.experienced ?? "", freshers: bp.six_months?.freshers ?? "" },
//       });
//     } else {
//       setPlans(EMPTY_PLANS);
//     }
//     setIsEditing(false);
//   };

//   // ── States ─────────────────────────────────────────────────────────────────
//   if (!mentorId) return (
//     <div className="w-full min-h-screen bg-[#030f0a] flex items-center justify-center p-6">
//       <div className="text-center">
//         <p className="text-red-400 text-sm font-semibold">Session expired.</p>
//         <p className="text-[#4a7a5a] text-xs mt-1">Please log in again to manage pricing.</p>
//       </div>
//     </div>
//   );

//   if (isLoading) return (
//     <div className="w-full min-h-screen bg-[#030f0a] flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-9 h-9 border-[3px] border-[#0e2318] border-t-[#0098cc] rounded-full animate-spin" />
//         <p className="text-[#4a7a5a] text-xs font-medium">Loading your pricing...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#030f0a]">
//       <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">

//         {/* ── Page Header ── */}
//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">
//           <div className="flex flex-col gap-2.5">
//             <div>
//               <h1 className="text-white text-2xl font-black tracking-tight">My Pricing</h1>
//               {userData.name && (
//                 <p className="text-[#3a6a4a] text-sm mt-0.5 font-medium">{userData.name}</p>
//               )}
//             </div>
//             <TierBadge activeTier={activeTier} subscriberCount={subscriberCount} tiersLoading={tiersLoading} />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center gap-2.5 sm:pt-1">
//             {!isEditing ? (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex items-center gap-2 bg-[#0098cc] hover:bg-[#007aaa] active:bg-[#006699] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
//               >
//                 <EditIcon className="w-4 h-4" />
//                 Edit Pricing
//               </button>
//             ) : (
//               <>
//                 <button
//                   onClick={handleSave}
//                   disabled={saving}
//                   className={`flex items-center gap-2 bg-[#0098cc] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-150
//                     ${saving ? "opacity-60 cursor-not-allowed" : "hover:bg-[#007aaa] active:bg-[#006699] cursor-pointer"}`}
//                 >
//                   {saving ? (
//                     <>
//                       <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <CheckIcon className="w-4 h-4" />
//                       Save
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   disabled={saving}
//                   className="flex items-center gap-2 bg-[#0a1f14] hover:bg-[#122a1c] border border-[#1a3a28] text-[#7a9e8a] hover:text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
//                 >
//                   <CloseIcon className="w-4 h-4" />
//                   Cancel
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* ── Info / Error Banner ── */}
//         {(isError || (!hasAnyPricingData && !isEditing)) && (
//           <div className="flex items-start gap-3 bg-[#0098cc]/5 border border-[#0098cc]/15 rounded-2xl px-5 py-4 mb-6">
//             <InfoIcon className="w-4 h-4 text-[#0098cc] mt-0.5 shrink-0" />
//             <div>
//               <p className="text-[#7a9e8a] text-sm font-medium">No pricing set yet</p>
//               <p className="text-[#3a6a4a] text-xs mt-0.5">
//                 Click <strong className="text-white">Edit Pricing</strong> to set your rates and publish.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ── Plan Cards ── */}
//         <div className="flex flex-col gap-4">
//           {PLANS.map((plan) => {
//             // Determine what data to pass to card
//             const savedData = fullPlansData?.[plan.key];
//             const currentExp = plans[plan.key].experienced;
//             const currentFres = plans[plan.key].freshers;

//             // Only show cards that have data OR are in editing mode
//             const hasData = savedData?.experienced || savedData?.freshers || currentExp || currentFres;
//             if (!hasData && !isEditing) return null;

//             return (
//               <PlanCard
//                 key={plan.key}
//                 plan={plan}
//                 planData={
//                   savedData
//                     ? { ...savedData, experienced: currentExp, freshers: currentFres }
//                     : { experienced: currentExp, freshers: currentFres }
//                 }
//                 onChange={handleChange}
//                 isEditing={isEditing}
//                 saving={saving}
//                 onViewDetails={(p) => setModalPlan({ plan: p })}
//               />
//             );
//           })}
//         </div>

//         {/* ── Footer note ── */}
//         {activeTier && (
//           <p className="mt-6 text-center text-[10px] text-[#1e3a28] font-medium">
//             Commission tier: {TIER_LABELS[activeTier.tier_name] || activeTier.tier_name} · Breakdown calculated on save
//           </p>
//         )}
//       </div>

//       {/* ── Modal ── */}
//       {modalPlan && (
//         <PlanModal
//           plan={modalPlan.plan}
//           planData={fullPlansData?.[modalPlan.plan.key]}
//           onClose={() => setModalPlan(null)}
//           tierName={data?.plans?.commissionTierName || activeTier?.tier_name}
//           subscriberCount={data?.plans?.subscriberCountAtSave ?? subscriberCount}
//         />
//       )}

//       {/* ── Toast ── */}
//       <Toast toast={toast} />
//     </div>
//   );
// };

// export default MyPricing;





import { useState, useEffect, useCallback } from "react";
import {
  useGetMyPricingQuery,
  useSaveOrUpdatePricingMutation,
  useGetSubscribersByMentorQuery,
  useGetCommissionTiersQuery,
} from "./Mentorpricingapislice";

const PRICE_OPTIONS = [
  2500, 5000, 7500, 10000, 12500, 15000,
  17500, 20000, 22500, 25000, 27500, 30000,
  32500, 35000, 37500, 40000, 42500, 45000,
  47500, 50000,
];

const TIER_LABELS = {
  "1_to_5": "1–5 subscribers",
  "6_to_20": "6–20 subscribers",
  "21_plus": "21+ subscribers",
};

const PLANS = [
  { key: "one_month", label: "1 Month", sublabel: "LTM Plan", months: 1 },
  { key: "three_months", label: "3 Months", sublabel: "LTM Plan", months: 3 },
  { key: "six_months", label: "6 Months", sublabel: "LTM Plan", months: 6 },
];

const EMPTY_PLANS = {
  one_month: { experienced: "", freshers: "" },
  three_months: { experienced: "", freshers: "" },
  six_months: { experienced: "", freshers: "" },
};

const formatINR = (val) =>
  val != null && val !== ""
    ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val)
    : "—";

const resolveTier = (subscriberCount, tiers) => {
  if (!tiers || tiers.length === 0) return null;
  const count = Number(subscriberCount) || 0;
  let tierName;
  if (count <= 5) tierName = "1_to_5";
  else if (count <= 20) tierName = "6_to_20";
  else tierName = "21_plus";
  return tiers.find((t) => t.tier_name === tierName) || null;
};

// ── Icons ──────────────────────────────────────────────────────────────────────
const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const CloseIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const WarnIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  </svg>
);
const InfoIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
  </svg>
);
const ChevronIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
);

// ── PriceField ─────────────────────────────────────────────────────────────────
const PriceField = ({ label, value, onChange, disabled }) => {
  const [mode, setMode] = useState("dropdown");
  const [customVal, setCustomVal] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const num = Number(value);
    if (value !== "" && value != null && !PRICE_OPTIONS.includes(num)) {
      setMode("custom");
      setCustomVal(String(value));
    } else if (value === "" || value == null) {
      setMode("dropdown");
      setCustomVal("");
    } else {
      setMode("dropdown");
    }
  }, [value]);

  const handleDropdownChange = (e) => {
    if (disabled) return;
    onChange(Number(e.target.value));
  };

  const handleCustomChange = (e) => {
    if (disabled) return;
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setCustomVal(raw);
    setError("");
    const num = Number(raw);
    if (raw && num < 500) setError("Minimum ₹500");
    else if (raw && num > 200000) setError("Maximum ₹2,00,000");
    else if (raw) onChange(num);
  };

  const handleCustomBlur = () => {
    if (disabled) return;
    if (!customVal || Number(customVal) < 500) setError("Enter valid amount (min ₹500)");
  };

  const switchMode = (newMode) => {
    if (disabled) return;
    setMode(newMode);
    setError("");
    if (newMode === "dropdown") {
      setCustomVal("");
      if (!PRICE_OPTIONS.includes(Number(value))) onChange(PRICE_OPTIONS[0]);
    } else {
      setCustomVal(value ? String(value) : "");
    }
  };

  const displayValue = value !== "" && value != null ? Number(value) : "";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[#8ab4a0] text-xs font-semibold tracking-wide uppercase">{label}</label>
        <div className="flex rounded-lg overflow-hidden border border-[#1a3a28]">
          {["dropdown", "custom"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              disabled={disabled}
              className={`text-[10px] px-2.5 py-1 font-bold capitalize transition-all duration-150
                ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                ${mode === m ? "bg-[#0098cc] text-white" : "bg-[#0a1f14] text-[#3a6a4a] hover:text-[#0098cc]"}`}
            >
              {m === "dropdown" ? "Select" : "Custom"}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex items-center h-11 rounded-xl px-3.5 gap-2 border transition-all duration-150
        ${disabled
          ? "bg-[#040f09] border-[#0d2018] cursor-not-allowed"
          : error
            ? "bg-[#0a1208] border-red-500/60 ring-1 ring-red-500/20"
            : mode === "custom"
              ? "bg-[#040f09] border-[#0098cc]/50 ring-1 ring-[#0098cc]/15"
              : "bg-[#040f09] border-[#1a3a28] hover:border-[#2a5a3a]"
        }`}>
        <span className="text-[#0098cc] text-sm font-black shrink-0">₹</span>

        {mode === "dropdown" ? (
          <>
            <select
              value={displayValue}
              onChange={handleDropdownChange}
              disabled={disabled}
              className={`flex-1 bg-transparent border-none outline-none text-sm font-semibold appearance-none
                ${disabled ? "text-white/30 cursor-not-allowed" : "text-white cursor-pointer"}`}
            >
              <option value="" disabled className="bg-[#030f0a] text-white/40">Choose price</option>
              {PRICE_OPTIONS.map((p) => (
                <option key={p} value={p} className="bg-[#030f0a] text-white">
                  {new Intl.NumberFormat("en-IN").format(p)} / session
                </option>
              ))}
            </select>
            <ChevronIcon className={`w-3.5 h-3.5 shrink-0 ${disabled ? "text-[#2a4a33]/40" : "text-[#3a6a4a]"}`} />
          </>
        ) : (
          <>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter amount"
              value={customVal}
              onChange={handleCustomChange}
              onBlur={handleCustomBlur}
              disabled={disabled}
              className={`flex-1 bg-transparent border-none outline-none text-sm font-semibold placeholder:text-[#2a4a33]
                ${disabled ? "text-white/30 cursor-not-allowed" : "text-white"}`}
            />
            <span className="text-[#3a6a4a] text-[10px] font-semibold shrink-0">/session</span>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-[10px] font-medium flex items-center gap-1">
          <WarnIcon className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

// ── Plan Modal ─────────────────────────────────────────────────────────────────
const PlanModal = ({ plan, planData, onClose, tierName, subscriberCount }) => {
  const breakdown = planData?.breakdown;
  const exp = breakdown?.experienced;
  const fre = breakdown?.freshers;
  const hasBreakdown = exp && fre && exp.totalPrice > 0;
  const platformPct = exp?.platformPct ?? 0;
  const mentorPct = 100 - platformPct;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#030f0a] border border-[#0e2318] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-5 py-4 border-b border-[#0e2318]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white text-base font-bold">{plan.label}</h2>
              <span className="text-[10px] bg-[#0098cc]/15 text-[#0098cc] font-bold px-2 py-0.5 rounded-full">
                {plan.sublabel}
              </span>
            </div>
            {tierName && (
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="text-[10px] bg-[#0a1f14] text-[#3a9a5a] px-2 py-0.5 rounded-full border border-[#1a3a28]">
                  {TIER_LABELS[tierName] || tierName}
                </span>
                <span className="text-[10px] text-[#3a6a4a]">Platform {platformPct}%</span>
                <span className="text-[10px] text-[#1a3a28]">·</span>
                <span className="text-[10px] text-[#0098cc] font-semibold">You keep ~{mentorPct}%</span>
                <span className="text-[10px] text-[#1a3a28]">·</span>
                <span className="text-[10px] text-[#3a6a4a]">{subscriberCount} subscriber{subscriberCount !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#0a1f14] hover:bg-[#122a1c] text-[#4a7a5a] hover:text-white transition-all duration-150 cursor-pointer shrink-0 ml-2"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5">
          {!hasBreakdown ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0a1f14] border border-[#1a3a28] flex items-center justify-center">
                <InfoIcon className="w-6 h-6 text-[#3a6a4a]" />
              </div>
              <p className="text-[#4a7a5a] text-sm text-center max-w-xs">
                Save your pricing to generate a full earnings breakdown.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Experienced", data: exp }, { label: "Freshers", data: fre }].map(({ label, data }) => (
                <div key={label} className="bg-[#040f09] border border-[#0e2318] rounded-2xl overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#020c06] border-b border-[#0e2318]">
                    <span className="text-[#0098cc] text-[9px] font-black uppercase tracking-[0.15em]">{label}</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold mb-1">Mentee Pays</p>
                      <p className="text-white text-lg font-black leading-none">₹{formatINR(data.totalPrice)}</p>
                      {plan.months > 1 && (
                        <p className="text-[#3a6a4a] text-[10px] mt-0.5">
                          ₹{formatINR(Math.round(data.totalPrice / plan.months))}/session
                        </p>
                      )}
                    </div>
                    <div className="h-px bg-[#0e2318]" />
                    <div className="flex flex-col gap-1.5">
                      <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold">Deductions</p>
                      {[
                        { label: `Platform (${data.platformPct}%)`, val: data.platformFee },
                        { label: "CGST (9%)", val: data.cgst },
                        { label: "SGST (9%)", val: data.sgst },
                      ].map(({ label: dl, val }) => (
                        <div key={dl} className="flex justify-between items-center">
                          <span className="text-[#4a6a5a] text-[10px]">{dl}</span>
                          <span className="text-red-400/80 text-[10px] font-semibold">-₹{formatINR(val)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-1.5 border-t border-[#0e2318] mt-0.5">
                        <span className="text-[#5a8a6a] text-[10px] font-bold">Total</span>
                        <span className="text-red-400 text-[10px] font-black">-₹{formatINR(data.totalDeducted)}</span>
                      </div>
                    </div>
                    <div className="h-px bg-[#0e2318]" />
                    <div className="bg-[#0098cc]/8 border border-[#0098cc]/20 rounded-xl p-3">
                      <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold mb-1.5">You Receive</p>
                      <p className="text-[#0098cc] text-base font-black leading-none">₹{formatINR(data.mentorReceive)}</p>
                      {plan.months > 1 && (
                        <p className="text-[#0098cc]/60 text-[10px] font-semibold mt-0.5">
                          ₹{formatINR(data.perMonthReceive)}/session
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-[#0e2318]">
          <button
            onClick={onClose}
            className="w-full bg-[#0098cc] hover:bg-[#007aaa] active:bg-[#006699] text-white text-sm font-bold py-3 rounded-xl transition-all duration-150 cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Plan Card ──────────────────────────────────────────────────────────────────
const PlanCard = ({ plan, planData, onChange, saving, onViewDetails }) => {
  const experienced = planData?.experienced ?? "";
  const freshers = planData?.freshers ?? "";
  const breakdown = planData?.breakdown;
  const hasValues = experienced !== "" || freshers !== "";
  const hasBreakdown = breakdown?.experienced?.mentorReceive > 0;
  const fresherWarn = hasValues && freshers !== "" && experienced !== "" &&
    Number(freshers) >= Number(experienced);

  return (
    <div className="w-full bg-[#040f09] border border-[#0098cc]/30 ring-1 ring-[#0098cc]/10 rounded-2xl overflow-hidden transition-all duration-200">

      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#0e2318]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-white text-sm font-bold leading-tight">{plan.label}</span>
            <span className="text-[#3a6a4a] text-[10px] font-medium">{plan.sublabel}</span>
          </div>
          {hasValues && (
            <span className="flex items-center gap-1 text-[10px] text-[#3a9a5a] font-semibold bg-[#3a9a5a]/10 border border-[#3a9a5a]/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3a9a5a]" />
              Active
            </span>
          )}
        </div>

        {hasBreakdown && (
          <button
            onClick={() => onViewDetails(plan)}
            className="text-[11px] font-bold text-[#0098cc] bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer"
          >
            View Details →
          </button>
        )}
      </div>

      {/* Price Fields */}
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <div className="flex-1 min-w-0">
          <PriceField
            label="Experienced"
            value={experienced}
            onChange={(val) => onChange(plan.key, "experienced", val)}
            disabled={saving}
          />
        </div>
        <div className="hidden sm:flex w-px bg-[#0e2318] self-stretch mx-1" />
        <div className="flex-1 min-w-0">
          <PriceField
            label="Freshers"
            value={freshers}
            onChange={(val) => onChange(plan.key, "freshers", val)}
            disabled={saving}
          />
        </div>
      </div>

      {fresherWarn && (
        <div className="mx-5 mb-4 flex items-center gap-2 px-4 py-2.5 bg-amber-500/8 border border-amber-500/20 rounded-xl">
          <WarnIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-amber-400 text-xs font-medium">Freshers price must be less than Experienced</span>
        </div>
      )}

      {hasBreakdown && (
        <div className="flex items-center justify-between gap-3 mx-5 mb-5 px-4 py-3 bg-[#020c06] border border-[#0e2318] rounded-xl">
          <div>
            <p className="text-[#3a6a4a] text-[9px] uppercase tracking-widest font-bold mb-1.5">You receive / month</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-xs text-[#5a8a6a]">
                Exp:&nbsp;
                <strong className="text-[#0098cc] text-sm font-black">₹{formatINR(breakdown.experienced.perMonthReceive)}</strong>
              </span>
              <span className="text-[#1a3a28]">|</span>
              <span className="text-xs text-[#5a8a6a]">
                Fresh:&nbsp;
                <strong className="text-[#0098cc] text-sm font-black">₹{formatINR(breakdown.freshers.perMonthReceive)}</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const MyPricing = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const mentorId = userData?._id || null;
  const [saved, setSaved] = useState(false);

  const [plans, setPlans] = useState(EMPTY_PLANS);
  const [fullPlansData, setFullPlansData] = useState(null);
  const [toast, setToast] = useState(null);
  const [modalPlan, setModalPlan] = useState(null);

  const { data, isLoading, isError } = useGetMyPricingQuery(mentorId, { skip: !mentorId });
  const [saveOrUpdate, { isLoading: saving }] = useSaveOrUpdatePricingMutation();
  const { data: subscribersData } = useGetSubscribersByMentorQuery(mentorId, { skip: !mentorId });
  const { data: tiersData, isLoading: tiersLoading } = useGetCommissionTiersQuery();

  const subscriberCount = subscribersData?.data?.length ?? subscribersData?.count ?? 0;
  const tiers = tiersData?.data || [];
  const activeTier = resolveTier(subscriberCount, tiers);

  useEffect(() => {
    if (data?.plans?.plans) {
      const bp = data.plans.plans;
      setFullPlansData(bp);
      setPlans({
        one_month: { experienced: bp.one_month?.experienced ?? "", freshers: bp.one_month?.freshers ?? "" },
        three_months: { experienced: bp.three_months?.experienced ?? "", freshers: bp.three_months?.freshers ?? "" },
        six_months: { experienced: bp.six_months?.experienced ?? "", freshers: bp.six_months?.freshers ?? "" },
      });
      setSaved(true); // ← already has pricing, lock it

    }
  }, [data]);

  const handleChange = useCallback((planKey, tier, value) => {
    setPlans((prev) => ({ ...prev, [planKey]: { ...prev[planKey], [tier]: value } }));
  }, []);

  const showToast = useCallback((type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleSave = async () => {
    if (!mentorId) return showToast("error", "Session expired. Please log in again.");

    for (const plan of PLANS) {
      const exp = Number(plans[plan.key].experienced) || 0;
      const fres = Number(plans[plan.key].freshers) || 0;
      if (!exp || !fres) return showToast("error", `Fill both prices for ${plan.label}`);
      if (fres >= exp) return showToast("error", `${plan.label}: Freshers must be less than Experienced`);
    }

    try {
      const sanitizedPlans = Object.fromEntries(
        Object.entries(plans).map(([key, val]) => [
          key,
          { experienced: Number(val.experienced) || 0, freshers: Number(val.freshers) || 0 },
        ])
      );
      const result = await saveOrUpdate({ mentorId, plans: sanitizedPlans }).unwrap();
      if (result?.plans?.plans) setFullPlansData(result.plans.plans);
      setSaved(true); // ← lock after save

      showToast("success", "Pricing saved successfully!");
    } catch {
      showToast("error", "Failed to save. Please try again.");
    }
  };

  // ── Guard states ───────────────────────────────────────────────────────────
  if (!mentorId) return (
    <div className="w-full min-h-screen bg-[#030f0a] flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-red-400 text-sm font-semibold">Session expired.</p>
        <p className="text-[#4a7a5a] text-xs mt-1">Please log in again to manage pricing.</p>
      </div>
    </div>
  );

  if (isLoading) return (
    <div className="w-full min-h-screen bg-[#030f0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-9 h-9 border-[3px] border-[#0e2318] border-t-[#0098cc] rounded-full animate-spin" />
        <p className="text-[#4a7a5a] text-xs font-medium">Loading your pricing...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#030f0a]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">
          <div className="flex flex-col gap-2.5">
            <div>
              <h1 className="text-white text-2xl font-black tracking-tight">My Pricing</h1>
              {userData.name && (
                <p className="text-[#3a6a4a] text-sm mt-0.5 font-medium">{userData.name}</p>
              )}
            </div>

            {/* Tier Badge */}
            {tiersLoading ? (
              <div className="flex items-center gap-2 bg-[#0a1f14] px-3 py-1.5 rounded-lg w-fit border border-[#1a3a28]">
                <div className="w-3 h-3 border-2 border-[#1a3a28] border-t-[#0098cc] rounded-full animate-spin" />
                <span className="text-[#4a7a5a] text-xs">Loading tier...</span>
              </div>
            ) : activeTier ? (
              <div className="flex items-center gap-2 bg-[#0098cc]/8 border border-[#0098cc]/20 px-3 py-1.5 rounded-xl w-fit">
                <UsersIcon className="w-3.5 h-3.5 text-[#0098cc] shrink-0" />
                <span className="text-[#0098cc] text-[11px] font-bold">
                  {subscriberCount} subscriber{subscriberCount !== 1 ? "s" : ""}
                </span>
                <span className="text-[#0098cc]/40 text-[10px]">·</span>
                <span className="text-[#0098cc]/80 text-[11px] font-medium">
                  {TIER_LABELS[activeTier.tier_name] || activeTier.tier_name}
                </span>
              </div>
            ) : null}
          </div>

          {/* Save Button */}
          <div className="sm:pt-1">
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`flex items-center gap-2 bg-[#0098cc] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-150
    ${saving || saved ? "opacity-40 cursor-not-allowed" : "hover:bg-[#007aaa] active:bg-[#006699] cursor-pointer"}`}
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Save Pricing
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Info Banner (no pricing set yet) ── */}
        {(isError || !fullPlansData) && (
          <div className="flex items-start gap-3 bg-[#0098cc]/5 border border-[#0098cc]/15 rounded-2xl px-5 py-4 mb-6">
            <InfoIcon className="w-4 h-4 text-[#0098cc] mt-0.5 shrink-0" />
            <div>
              <p className="text-[#7a9e8a] text-sm font-medium">No pricing set yet</p>
              <p className="text-[#3a6a4a] text-xs mt-0.5">
                Fill in your prices below and click <strong className="text-white">Save Pricing</strong> to publish.
              </p>
            </div>
          </div>
        )}

        {/* ── Plan Cards ── */}
        <div className="flex flex-col gap-4">
          {PLANS.map((plan) => {
            const savedData = fullPlansData?.[plan.key];
            const currentExp = plans[plan.key].experienced;
            const currentFres = plans[plan.key].freshers;

            return (
              <PlanCard
                key={plan.key}
                plan={plan}
                planData={
                  savedData
                    ? { ...savedData, experienced: currentExp, freshers: currentFres }
                    : { experienced: currentExp, freshers: currentFres }
                }
                onChange={handleChange}
                saving={saving || saved}  // ← this disables all PriceFields too
                onViewDetails={(p) => setModalPlan({ plan: p })}
              />
            );
          })}
        </div>

        {/* ── Footer note ── */}
        {activeTier && (
          <p className="mt-6 text-center text-[10px] text-[#1e3a28] font-medium">
            Commission tier: {TIER_LABELS[activeTier.tier_name] || activeTier.tier_name} · Breakdown calculated on save
          </p>
        )}
      </div>

      {/* ── Modal ── */}
      {modalPlan && (
        <PlanModal
          plan={modalPlan.plan}
          planData={fullPlansData?.[modalPlan.plan.key]}
          onClose={() => setModalPlan(null)}
          tierName={data?.plans?.commissionTierName || activeTier?.tier_name}
          subscriberCount={data?.plans?.subscriberCountAtSave ?? subscriberCount}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl z-50 whitespace-nowrap transition-all duration-300
          ${toast.type === "success" ? "bg-[#0098cc]" : "bg-red-600"}`}>
          {toast.type === "success"
            ? <CheckIcon className="w-4 h-4 shrink-0" />
            : <CloseIcon className="w-4 h-4 shrink-0" />
          }
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default MyPricing;














