



// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   X, Clock, Calendar, MessageSquare, Gift, AlertCircle,
//   CheckCircle2, Loader2, Tag, ChevronRight, Sparkles,
//   ArrowLeft, Percent, BadgeCheck,
// } from "lucide-react";
// import { showToast } from "../../../utils/Toastprovider";
// import {
//   useCreateBookingMutation,
//   useCheckFreeSessionEligibilityQuery,
// } from "../../topMentors/Mentorsectionapislice";
// import { useNavigate, useSearchParams } from "react-router-dom";

// /* ─────────────────────── Success Screen ─────────────────────── */
// const BookingSuccessScreen = ({ mentor, onClose }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.96 }}
//     animate={{ opacity: 1, scale: 1 }}
//     exit={{ opacity: 0, scale: 0.96 }}
//     transition={{ duration: 0.2, ease: "easeOut" }}
//     className="flex flex-col items-center justify-center px-6 py-10 text-center bg-white"
//   >
//     <motion.div
//       initial={{ scale: 0.7, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ delay: 0.08, duration: 0.28, type: "spring", stiffness: 200 }}
//       className="w-16 h-16 rounded-full bg-[#1a1a2e] flex items-center justify-center mb-4 shadow-lg"
//     >
//       <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2} />
//     </motion.div>
//     <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
//       <h2 style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xl font-bold text-[#1a1a2e] mb-2">
//         Session Confirmed!
//       </h2>
//       <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-sm leading-6 text-gray-500 max-w-[280px] mx-auto">
//         Your session with <span className="font-semibold text-[#1a1a2e]">{mentor?.fullName}</span> has been booked.
//         Zoom details will be sent to your email once the mentor confirms.
//       </p>
//     </motion.div>
//     <motion.button
//       initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
//       onClick={onClose}
//       style={{ fontFamily: "Cambria, Georgia, serif" }}
//       className="mt-6 px-8 py-3 bg-[#1a1a2e] text-white text-sm font-semibold rounded-xl hover:bg-[#2d2d4e] transition-all active:scale-[0.98]"
//     >
//       Done
//     </motion.button>
//   </motion.div>
// );

// /* ─────────────────────── Free Session Banner ─────────────────────── */
// const FreeSessionBanner = ({ hasFreeSession, freeSessionUsed, isLoading, usedSessionDetails, freeSessionCount }) => {
//   if (isLoading) {
//     return (
//       <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-3">
//         <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 flex-shrink-0" />
//         <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xs text-gray-400">
//           Checking free session eligibility…
//         </p>
//       </div>
//     );
//   }
//   if (hasFreeSession) {
//     return (
//       <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl overflow-hidden border border-emerald-200">
//         <div className="bg-[#1a1a2e] px-3 py-2 flex items-center justify-between">
//           <div className="flex items-center gap-1.5">
//             <Sparkles className="w-3 h-3 text-emerald-300 flex-shrink-0" />
//             <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-white text-[10px] font-bold tracking-widest uppercase">
//               Free Session Available
//             </span>
//           </div>
//           <span className="bg-emerald-400 text-[#1a1a2e] text-[10px] font-extrabold px-2 py-0.5 rounded-full">{freeSessionCount} left</span>
//         </div>
//         <div className="bg-emerald-50 px-3 py-2.5">
//           <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xs font-bold text-emerald-800 mb-0.5">Your first session is FREE</p>
//           <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[11px] text-emerald-700 leading-relaxed">
//             No payment needed. Zoom link will be sent after confirmation.
//           </p>
//         </div>
//       </motion.div>
//     );
//   }
//   if (freeSessionUsed) {
//     const usedDate = usedSessionDetails?.usedAt
//       ? new Date(usedSessionDetails.usedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//       : "a previous date";
//     return (
//       <div className="rounded-xl overflow-hidden border border-amber-200">
//         <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 flex items-center gap-1.5">
//           <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0" />
//           <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">
//             Free Session Used
//           </span>
//         </div>
//         <div className="bg-amber-50/50 px-3 py-2.5">
//           <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xs font-bold text-amber-800 mb-0.5">Free session already used</p>
//           <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[11px] text-amber-700 leading-relaxed">
//             Used on <span className="font-semibold">{usedDate}</span>. Payment is required now.
//           </p>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

// /* ─────────────────────── Coupon Panel ─────────────────────── */
// const CouponPanel = ({ availableCoupons, appliedCoupon, pendingCoupon, onPendingChange, onApply, onRemove, onClose, baseAmount }) => {
//   const [manualCode, setManualCode] = useState("");
//   const [manualError, setManualError] = useState("");

//   const handleApplyManual = () => {
//     const found = availableCoupons.find(c => c.couponCode === manualCode.trim().toUpperCase() && c.isActive);
//     if (found) { onPendingChange(found); setManualCode(""); setManualError(""); }
//     else setManualError("Invalid or expired coupon code.");
//   };

//   const handleConfirm = () => {
//     if (pendingCoupon) { onApply(pendingCoupon); onClose(); }
//     else { onRemove(); onClose(); }
//   };

//   const discount = pendingCoupon ? Math.round((baseAmount * pendingCoupon.discountValue) / 100) : 0;

//   return (
//     <div className="flex flex-col h-full bg-white">

//       {/* Header */}
//       <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
//         <button
//           type="button"
//           onClick={onClose}
//           className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center cursor-pointer flex-shrink-0 active:scale-95 transition-transform"
//         >
//           <ArrowLeft size={14} color="#6b7280" />
//         </button>
//         <div>
//           <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-sm font-bold text-[#1a1a2e]">Coupons &amp; Offers</p>
//           <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-gray-400">
//             {availableCoupons.length} offer{availableCoupons.length !== 1 ? "s" : ""} available
//           </p>
//         </div>
//       </div>

//       {/* Manual input */}
//       <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={manualCode}
//             onChange={e => { setManualCode(e.target.value.toUpperCase()); setManualError(""); }}
//             onKeyDown={e => e.key === "Enter" && handleApplyManual()}
//             placeholder="Enter coupon code"
//             style={{ fontFamily: "Cambria, Georgia, serif" }}
//             className="flex-1 min-w-0 border border-gray-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#1a1a2e] bg-gray-50 text-[#1a1a2e] placeholder-gray-300"
//           />
//           <button
//             type="button"
//             onClick={handleApplyManual}
//             style={{ fontFamily: "Cambria, Georgia, serif" }}
//             className="px-4 py-2.5 bg-[#1a1a2e] text-white text-xs font-semibold rounded-xl cursor-pointer whitespace-nowrap border-none active:scale-95 transition-transform"
//           >
//             Apply
//           </button>
//         </div>
//         {manualError && (
//           <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-red-500 mt-1.5 flex items-center gap-1">
//             <AlertCircle size={10} /> {manualError}
//           </p>
//         )}
//       </div>

//       {/* Coupon list */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
//         <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-gray-400 text-center uppercase tracking-widest mb-1">
//           — Available offers —
//         </p>

//         {availableCoupons.map(coupon => {
//           const sel = pendingCoupon?._id === coupon._id;
//           const wasApplied = appliedCoupon?._id === coupon._id;
//           const saved = Math.round((baseAmount * coupon.discountValue) / 100);

//           return (
//             <button
//               key={coupon._id}
//               type="button"
//               onClick={() => onPendingChange(sel ? null : coupon)}
//               className="w-full text-left border-none p-0 cursor-pointer rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
//               style={{
//                 boxShadow: sel
//                   ? "0 0 0 2.5px #1a1a2e, 0 4px 16px rgba(26,26,46,0.12)"
//                   : "0 1px 6px rgba(0,0,0,0.07)",
//               }}
//             >
//               <div className={`px-3 py-2.5 flex items-center justify-between ${sel ? "bg-[#1a1a2e]" : "bg-gray-50 border-b border-gray-100"}`}>
//                 <div className="flex items-center gap-2">
//                   <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${sel ? "bg-white/15" : "bg-white border border-gray-200"}`}>
//                     <Percent size={12} color={sel ? "#fff" : "#6b7280"} />
//                   </div>
//                   <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em" }} className={sel ? "text-white" : "text-[#1a1a2e]"}>
//                     {coupon.couponCode}
//                   </span>
//                   {wasApplied && !sel && (
//                     <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
//                       Applied
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <span style={{ fontFamily: "Cambria, Georgia, serif" }} className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${sel ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
//                     {coupon.discountValue}% OFF
//                   </span>
//                   {sel && <BadgeCheck size={14} color="#6ee7b7" />}
//                 </div>
//               </div>

//               <div className={`px-3 py-2 flex items-center justify-between ${sel ? "bg-[#1a1a2e]/[0.03]" : "bg-white"}`}>
//                 <div>
//                   <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-gray-400">
//                     Valid for {coupon.appliesForDuration?.join(", ")} month plans
//                     {coupon.expiryDate ? ` · Expires ${coupon.expiryDate.split("T")[0]}` : ""}
//                   </p>
//                   {baseAmount > 0 && (
//                     <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[11px] font-bold text-emerald-600 mt-0.5">
//                       Save ₹{saved.toLocaleString("en-IN")} on this session
//                     </p>
//                   )}
//                 </div>
//                 <div className="w-[18px] h-[18px] rounded-full flex-shrink-0 flex items-center justify-center ml-2"
//                   style={{ border: `2px solid ${sel ? "#1a1a2e" : "#d1d5db"}`, background: sel ? "#1a1a2e" : "#fff" }}>
//                   {sel && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
//                 </div>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Bottom CTA */}
//       <div className="px-4 py-4 border-t border-gray-100 bg-white flex-shrink-0">
//         {pendingCoupon && (
//           <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-2.5">
//             <div className="flex items-center gap-1.5">
//               <Tag size={11} color="#059669" />
//               <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[11px] font-semibold text-emerald-800">
//                 {pendingCoupon.couponCode} selected
//               </span>
//             </div>
//             <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[11px] font-bold text-emerald-600">
//               −₹{discount.toLocaleString("en-IN")}
//             </span>
//           </div>
//         )}
//         <div className="flex gap-2">
//           {pendingCoupon && (
//             <button
//               type="button"
//               onClick={() => { onPendingChange(null); onRemove(); onClose(); }}
//               style={{ fontFamily: "Cambria, Georgia, serif" }}
//               className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-500 text-xs font-semibold cursor-pointer whitespace-nowrap active:scale-95 transition-transform"
//             >
//               Clear
//             </button>
//           )}
//           <button
//             type="button"
//             onClick={handleConfirm}
//             style={{ fontFamily: "Cambria, Georgia, serif" }}
//             className="flex-1 py-3 bg-[#1a1a2e] text-white text-sm font-bold rounded-xl cursor-pointer border-none active:scale-[0.98] transition-transform"
//           >
//             {pendingCoupon ? `Apply ${pendingCoupon.couponCode}` : "Skip, no coupon"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────── Main Modal ─────────────────────── */
// const BookingModal = ({ mentor, isOpen, onClose, selectedSlot, appliedCoupon: externalCoupon, availableCoupons = [] }) => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   console.log(mentor, "1ws2d3f4g5")

//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [topic, setTopic] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(externalCoupon || null);
//   const [pendingCoupon, setPendingCoupon] = useState(null);
//   const [showCouponPanel, setShowCouponPanel] = useState(false);

//   const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

//   const {
//     data: freeSessionData,
//     isLoading: checkingFreeSession,
//     isFetching: fetchingFreeSession,
//   } = useCheckFreeSessionEligibilityQuery(
//     { userId, username, mentorUserId: mentor?.userId || null },
//     { skip: !userId, refetchOnMountOrArgChange: true }
//   );

//   const freeSessionCount = freeSessionData?.freeSessionCount;
//   const hasFreeSession = freeSessionData?.hasFreeSession === true;
//   const freeSessionUsed = freeSessionData?.freeSessionUsed === true;
//   const usedSessionDetails = freeSessionData?.usedSessionDetails || null;
//   const isCheckingSession = checkingFreeSession || fetchingFreeSession;

//   useEffect(() => {
//     if (!isOpen) {
//       // setBookingSuccess(false);
//       setTopic("");
//       setAppliedCoupon(externalCoupon || null);
//       setPendingCoupon(null);
//       setShowCouponPanel(false);
//       return;
//     }

//     console.log(mentor, "me34r5tentor")
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       // ── NEW: store pending booking intent so LoginPage can redirect back ──
//       localStorage.setItem("pendingBookingMentorId", mentor?.userId || "");
//       if (mentor?.fullName) {
//         localStorage.setItem("selectedMentorName", mentor.fullName);
//       }

//       const loginUrl = `/login?mentorId=${mentor?._id}`;
//       onClose();
//       navigate(loginUrl);
//       return;
//     }

//     // User is authenticated, load their data
//     const raw = localStorage.getItem("userData");
//     if (raw) {
//       try {
//         const user = JSON.parse(raw);
//         console.log(user, 'userw2e3r4t5')
//         setUserId(user._id || user.id || "");
//         setUsername(user.username || "");
//       } catch {
//         showToast.error("Failed to load user data. Please log in again.");
//       }
//     }

//     // Check if user is returning from login with redirect param
//     if (searchParams.get("redirect") === "booking") {
//       showToast.success("Welcome back! Continue with your booking.");
//     }
//   }, [isOpen, mentor?._id, navigate, searchParams]);

//   const calcDuration = (start, end) => {
//     if (!start || !end) return 30;
//     const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
//     return Math.max(toMin(end) - toMin(start), 0);
//   };

//   const baseAmount = hasFreeSession ? 0 : (mentor?.hourlyRate ?? 0);
//   const discountedAmount = appliedCoupon && !hasFreeSession
//     ? Math.round(baseAmount - (baseAmount * appliedCoupon.discountValue) / 100)
//     : baseAmount;
//   const savedAmount = baseAmount - discountedAmount;

//   const priceLabel = isCheckingSession
//     ? "…"
//     : hasFreeSession
//       ? "FREE"
//       : appliedCoupon
//         ? `₹${discountedAmount.toLocaleString("en-IN")}`
//         : `₹${baseAmount.toLocaleString("en-IN")}`;

//   const submitLabel = hasFreeSession
//     ? "Confirm Free Session"
//     : `Proceed to Payment — ${priceLabel}`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!topic.trim()) { alert("Please enter a topic to discuss."); return; }
//     if (!userId) { showToast.error("User session expired. Please log in again."); return; }
//     if (!mentor?._id) { showToast.error("Mentor information is missing."); return; }
//     if (!selectedSlot?.date) { showToast.error("No session slot selected."); return; }

//     try {
//       const raw = localStorage.getItem("userData");
//       const user = raw ? JSON.parse(raw) : {};

//       const payload = {
//         userId,
//         username,
//         mentorUserId: mentor?.userId,
//         mentorName: mentor.fullName,
//         mentorId: mentor._id,
//         date: selectedSlot.date?.split("T")[0],
//         time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
//         topic,
//         duration: calcDuration(selectedSlot.startTime, selectedSlot.endTime),
//         email: user.email || "",
//         menteeEmail: mentor.email,
//         name: user.name || user.firstName || "",
//         lastName: user.lastName || "",
//         phone: user.phone || "",
//         guests: "1",
//         price: priceLabel,
//         sessionType: "One-on-One",
//         createZoomMeeting: true,
//         appliedCoupon: appliedCoupon
//           ? { couponId: appliedCoupon._id, couponCode: appliedCoupon.couponCode, discountValue: appliedCoupon.discountValue }
//           : null,
//         availableCoupons: availableCoupons.map(c => ({
//           couponId: c._id, couponCode: c.couponCode, discountValue: c.discountValue, appliesForDuration: c.appliesForDuration,
//         })),
//       };


//       console.log(payload, "payload`q1w2e3r4t5")
//       const response = await createBooking(payload).unwrap();
//       console.log(response.isFreeSession, "response.isFreeSession ")

//       if (response.isFreeSession === true) {
//         showToast.success("Free session booked! Check your email for the Zoom link.");
//         handleClose();          // closes modal + resets form state instead of showing success screen
//         // setBookingSuccess(true);
//         // showToast.success("Free session booked! Check your email for the Zoom link.");
//       } else {
//         navigate("/payment", {
//           state: {
//             session_id: response.bookingId || response.data?._id,
//             subscription_id: null,
//             mentorId: mentor._id,
//             menteeId: userId,
//             mentorName: mentor.fullName,
//             menteeName: user.name || user.firstName || username || "",
//             mentorRole: mentor.currentRole || "Mentor",
//             planMonths: null,
//             totalSessions: 1,
//             basePrice: appliedCoupon ? discountedAmount : baseAmount,
//             discountedPrice: discountedAmount,
//             savedAmount,
//             appliedCoupon: appliedCoupon
//               ? { couponId: appliedCoupon._id, couponCode: appliedCoupon.couponCode, discountValue: appliedCoupon.discountValue }
//               : null,
//             availableCoupons: availableCoupons.map(c => ({
//               couponId: c._id, couponCode: c.couponCode, discountValue: c.discountValue, appliesForDuration: c.appliesForDuration,
//             })),
//             createdBy: userId,
//             paymentType: "bookingsession",
//             bookingDetails: {
//               date: selectedSlot.date?.split("T")[0],
//               time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
//               topic,
//               sessionType: "One-on-One",
//               duration: calcDuration(selectedSlot.startTime, selectedSlot.endTime),
//             },
//           },
//         });
//       }
//     } catch (error) {
//       showToast.error(error?.data?.message || error?.data?.error || error?.message || "Failed to create booking.");
//     }
//   };

//   const handleClose = () => {
//     // setBookingSuccess(false);
//     setTopic("");
//     setShowCouponPanel(false);
//     setPendingCoupon(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/20 focus:border-[#1a1a2e] bg-white placeholder-gray-300 transition-all";
//   const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5";

//   /* Coupon panel is visible and applicable */
//   const showCoupon = showCouponPanel && !hasFreeSession && availableCoupons.length > 0 && !bookingSuccess;

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
//         <motion.div
//           initial={{ opacity: 0, x: "100%" }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: "100%" }}
//           transition={{ duration: 0.28, ease: "easeOut" }}
//           className="relative bg-white shadow-2xl overflow-hidden flex
//       w-full sm:w-[420px] h-full sm:h-[100dvh] flex-shrink-0"
//         >
//           {/* ── Form panel ── */}
//           <div
//             className={`flex flex-col overflow-hidden transition-all duration-200
//               ${showCoupon ? "hidden sm:flex" : "flex w-full"}
//               sm:w-[460px] sm:flex-shrink-0`}
//             style={{ minHeight: 0, flex: "1 1 auto" }}
//           >
//             {/* Header */}
//             {/* <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
//               <div>
//                 <h2 style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-lg font-bold text-[#1a1a2e]">
//                   Book a Session
//                 </h2>
//                 <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xs text-gray-400 mt-0.5">
//                   with {mentor?.fullName}
//                 </p>
//               </div>
//               <button
//                 onClick={handleClose}
//                 className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-95"
//               >
//                 <X size={16} />
//               </button>
//             </div> */}


//             <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
//               <button
//                 onClick={handleClose}
//                 className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-95"
//               >
//                 <X size={16} />
//               </button>
//               <h2 style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-base font-bold text-[#1a1a2e]">
//                 Book a Session
//               </h2>
//             </div>

//             {/* Scrollable body */}
//             <div className="overflow-y-auto flex-1" style={{ minHeight: 0, WebkitOverflowScrolling: "touch" }}>
//               {/* <AnimatePresence mode="wait">
//                 {bookingSuccess ? (
//                   <BookingSuccessScreen key="success" mentor={mentor} onClose={handleClose} />
//                 ) : ( */}
//               <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>

//                 {/* <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}> */}
//                 <form onSubmit={handleSubmit} className="px-5 pt-4 pb-6 flex flex-col gap-3.5">

//                   {/* Free session banner */}
//                   <FreeSessionBanner
//                     hasFreeSession={hasFreeSession}
//                     freeSessionUsed={freeSessionUsed}
//                     isLoading={isCheckingSession}
//                     freeSessionCount={freeSessionCount}
//                     usedSessionDetails={usedSessionDetails}
//                   />

//                   {/* Session details card */}
//                   <div className="rounded-2xl border border-gray-100 bg-[#fafafa] overflow-hidden">
//                     <div className="grid grid-cols-2 divide-x divide-gray-100">
//                       <div className="px-4 py-3">
//                         <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Date</p>
//                         <div className="flex items-center gap-1.5">
//                           <Calendar className="w-3.5 h-3.5 text-[#1a1a2e] flex-shrink-0" />
//                           <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xs font-semibold text-gray-800 leading-tight">
//                             {selectedSlot?.date ? new Date(selectedSlot.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "—"}
//                           </span>
//                         </div>
//                         <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-gray-400 mt-0.5">
//                           {selectedSlot?.date ? new Date(selectedSlot.date).toLocaleDateString("en-IN", { weekday: "long" }) : ""}
//                         </p>
//                       </div>
//                       <div className="px-4 py-3">
//                         <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Time</p>
//                         <div className="flex items-center gap-1.5">
//                           <Clock className="w-3.5 h-3.5 text-[#1a1a2e] flex-shrink-0" />
//                           <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xs font-semibold text-gray-800">
//                             {selectedSlot?.startTime} – {selectedSlot?.endTime}
//                           </span>
//                         </div>
//                         <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[10px] text-gray-400 mt-0.5">
//                           {calcDuration(selectedSlot?.startTime, selectedSlot?.endTime)} min session
//                         </p>
//                       </div>
//                     </div>

//                     {/* Amount row */}
//                     <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between">
//                       <p style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[11px] text-gray-400 uppercase tracking-widest">Amount</p>
//                       <div className="flex items-center gap-2">
//                         {appliedCoupon && !hasFreeSession && (
//                           <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-xs text-gray-400 line-through">
//                             ₹{baseAmount.toLocaleString("en-IN")}
//                           </span>
//                         )}
//                         <span
//                           style={{ fontFamily: "Cambria, Georgia, serif" }}
//                           className={`text-sm font-bold ${hasFreeSession ? "text-emerald-600" : appliedCoupon ? "text-emerald-600" : "text-[#1a1a2e]"}`}
//                         >
//                           {isCheckingSession ? "…" : priceLabel}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Coupon applied badge */}
//                     {appliedCoupon && !hasFreeSession && (
//                       <div className="border-t border-emerald-100 bg-emerald-50 px-4 py-2 flex items-center justify-between">
//                         <div className="flex items-center gap-1.5 min-w-0">
//                           <Tag size={11} className="text-emerald-600 flex-shrink-0" />
//                           <span style={{ fontFamily: "Cambria, Georgia, serif" }} className="text-[11px] text-emerald-700 font-semibold truncate">
//                             {appliedCoupon.couponCode} — saved ₹{savedAmount.toLocaleString("en-IN")}
//                           </span>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => setAppliedCoupon(null)}
//                           style={{ fontFamily: "Cambria, Georgia, serif" }}
//                           className="text-[10px] text-red-400 hover:text-red-600 font-semibold transition-colors bg-transparent border-none cursor-pointer flex-shrink-0 ml-2"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {/* Coupon trigger */}
//                   {!hasFreeSession && availableCoupons.length > 0 && (
//                     <div className={`w-full flex items-center gap-2 px-3 py-3 rounded-xl border transition-all ${pendingCoupon && !appliedCoupon
//                       ? "border-[#1a1a2e]/30 bg-[#1a1a2e]/[0.02]"
//                       : "border-dashed border-gray-200 hover:border-[#1a1a2e]/30 hover:bg-gray-50"
//                       }`}>
//                       <button
//                         type="button"
//                         onClick={() => setShowCouponPanel(true)}
//                         style={{ fontFamily: "Cambria, Georgia, serif" }}
//                         className="flex items-center gap-2 flex-1 min-w-0 text-left group bg-transparent border-none cursor-pointer p-0"
//                       >
//                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${pendingCoupon ? "bg-[#1a1a2e]" : "bg-gray-100 group-hover:bg-[#1a1a2e]/5"
//                           }`}>
//                           <Gift size={14} className={pendingCoupon ? "text-white" : "text-[#1a1a2e]"} />
//                         </div>
//                         <div className="min-w-0">
//                           {pendingCoupon && !appliedCoupon ? (
//                             <>
//                               <p className="text-xs font-semibold text-[#1a1a2e] truncate">
//                                 {pendingCoupon.couponCode}
//                                 <span className="ml-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
//                                   {pendingCoupon.discountValue}% off
//                                 </span>
//                               </p>
//                               <p className="text-[10px] text-gray-400 mt-0.5">Selected · tap Apply to confirm</p>
//                             </>
//                           ) : appliedCoupon ? (
//                             <>
//                               <p className="text-xs font-semibold text-[#1a1a2e]">{appliedCoupon.couponCode} applied</p>
//                               <p className="text-[10px] text-gray-400 mt-0.5">{appliedCoupon.discountValue}% off · tap to change</p>
//                             </>
//                           ) : (
//                             <>
//                               <p className="text-xs font-semibold text-[#1a1a2e]">Have a coupon?</p>
//                               <p className="text-[10px] text-gray-400 mt-0.5">
//                                 {availableCoupons.length} offer{availableCoupons.length > 1 ? "s" : ""} available
//                               </p>
//                             </>
//                           )}
//                         </div>
//                       </button>

//                       {pendingCoupon && !appliedCoupon ? (
//                         <button
//                           type="button"
//                           onClick={() => { setAppliedCoupon(pendingCoupon); setPendingCoupon(null); setShowCouponPanel(false); }}
//                           style={{ fontFamily: "Cambria, Georgia, serif" }}
//                           className="flex-shrink-0 px-3 py-2 bg-[#1a1a2e] text-white text-[11px] font-bold rounded-lg hover:bg-[#2d2d4e] transition-all border-none cursor-pointer active:scale-95"
//                         >
//                           Apply
//                         </button>
//                       ) : (
//                         <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
//                       )}
//                     </div>
//                   )}

//                   {/* Topic textarea */}
//                   <div>
//                     <label style={{ fontFamily: "Cambria, Georgia, serif" }} className={labelCls}>
//                       Topic to Discuss
//                     </label>
//                     <div className="relative">
//                       <MessageSquare className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-300" />
//                       <textarea
//                         name="topic"
//                         value={topic}
//                         onChange={(e) => setTopic(e.target.value)}
//                         placeholder="What would you like to discuss in this session?"
//                         rows={3}
//                         style={{ fontFamily: "Cambria, Georgia, serif" }}
//                         className={inputCls + " pl-9 resize-none"}
//                       />
//                     </div>
//                   </div>

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     disabled={isCreatingBooking || isCheckingSession}
//                     style={{ fontFamily: "Cambria, Georgia, serif" }}
//                     className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-[#1a1a2e] hover:bg-[#2d2d4e] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border-none cursor-pointer"
//                   >
//                     {isCheckingSession ? (
//                       <><Loader2 className="w-4 h-4 animate-spin" /> Checking eligibility…</>
//                     ) : isCreatingBooking ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         {hasFreeSession ? "Confirming…" : "Creating Booking…"}
//                       </>
//                     ) : submitLabel}
//                   </button>

//                 </form>
//               </motion.div>
//               {/* )}
//               </AnimatePresence> */}
//             </div>
//           </div>

//           {/* ── Coupon Panel ── */}
//           <AnimatePresence>
//             {showCoupon && (
//               <>
//                 {/* Mobile full-screen overlay */}
//                 <motion.div
//                   key="coupon-mobile"
//                   initial={{ x: "100%" }}
//                   animate={{ x: 0 }}
//                   exit={{ x: "100%" }}
//                   transition={{ duration: 0.22, ease: "easeOut" }}
//                   className="absolute inset-0 z-10 sm:hidden bg-white flex flex-col"
//                 >
//                   <CouponPanel
//                     availableCoupons={availableCoupons}
//                     appliedCoupon={appliedCoupon}
//                     pendingCoupon={pendingCoupon}
//                     onPendingChange={setPendingCoupon}
//                     baseAmount={baseAmount}
//                     onApply={(coupon) => { setAppliedCoupon(coupon); setPendingCoupon(null); }}
//                     onRemove={() => { setAppliedCoupon(null); setPendingCoupon(null); }}
//                     onClose={() => setShowCouponPanel(false)}
//                   />
//                 </motion.div>

//                 {/* Desktop side panel */}
//                 <motion.div
//                   key="coupon-desktop"
//                   initial={{ opacity: 0, width: 0 }}
//                   animate={{ opacity: 1, width: 360 }}
//                   exit={{ opacity: 0, width: 0 }}
//                   transition={{ duration: 0.22, ease: "easeOut" }}
//                   className="hidden sm:flex flex-col overflow-hidden flex-shrink-0 border-l border-gray-100"
//                   style={{ minWidth: 0, width: 360 }}
//                 >
//                   <CouponPanel
//                     availableCoupons={availableCoupons}
//                     appliedCoupon={appliedCoupon}
//                     pendingCoupon={pendingCoupon}
//                     onPendingChange={setPendingCoupon}
//                     baseAmount={baseAmount}
//                     onApply={(coupon) => { setAppliedCoupon(coupon); setPendingCoupon(null); }}
//                     onRemove={() => { setAppliedCoupon(null); setPendingCoupon(null); }}
//                     onClose={() => setShowCouponPanel(false)}
//                   />
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>

//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default BookingModal;




import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Clock, Calendar, MessageSquare, Gift, AlertCircle,
  Loader2, Tag, ChevronRight, Percent, BadgeCheck, Sparkles,
  ArrowLeft,
} from "lucide-react";
import { showToast } from "../../../utils/Toastprovider";
import {
  useCreateBookingMutation,
  useCheckFreeSessionEligibilityQuery,
} from "../../topMentors/Mentorsectionapislice";
import { useNavigate, useSearchParams } from "react-router-dom";

const FONT = "Cambria, Georgia, serif";
const fStyle = { fontFamily: FONT };
const inr = (n) => `₹${(n || 0).toLocaleString("en-IN")}`;
const fmtDate = (d, opts) => (d ? new Date(d).toLocaleDateString("en-IN", opts) : "—");

const SLIDE = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100%" },
  transition: { duration: 0.28, ease: "easeOut" },
};

/* ─────────────────────── Grid Box (Date/Time/Type/Amount) ─────────────────────── */
const GridBox = ({ icon: Icon, label, value, valueClass = "text-gray-800", extra = null }) => (
  <div className="border border-gray-100 rounded-xl px-3 py-3 bg-white">
    <div className="flex items-center gap-1.5 mb-1.5">
      <Icon className="w-3.5 h-3.5 text-[#1a1a2e]" />
      <p style={fStyle} className="text-[10.5px] text-gray-400">{label}</p>
    </div>
    <p style={fStyle} className={`text-sm font-bold leading-tight ${valueClass}`}>{value}</p>
    {extra}
  </div>
);

/* ─────────────────────── Free Session Banner ─────────────────────── */
const FreeSessionBanner = ({ hasFreeSession, freeSessionUsed, isLoading, usedSessionDetails, freeSessionCount }) => {
  if (isLoading) {
    return (
      <div style={{ ...fStyle, display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderRadius: 12, background: "#f9fafb", border: "1px solid #f3f4f6", flexShrink: 0 }}>
        <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#9ca3af", flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#9ca3af" }}>Checking free session eligibility…</span>
      </div>
    );
  }

  if (hasFreeSession) {
    return (
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #a7f3d0", flexShrink: 0 }}>
        <div style={{ background: "#1a1a2e", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 36, boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles className="w-3 h-3" style={{ color: "#6ee7b7", flexShrink: 0 }} />
            <span style={{ ...fStyle, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Free Session Available
            </span>
          </div>
          <span style={{ ...fStyle, background: "#34d399", color: "#1a1a2e", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>
            {freeSessionCount ?? 1} left
          </span>
        </div>
        <div style={{ background: "#ecfdf5", padding: "12px 14px" }}>
          <p style={{ ...fStyle, fontSize: 13, fontWeight: 700, color: "#065f46", margin: "0 0 3px" }}>Your first session is FREE</p>
          <p style={{ ...fStyle, fontSize: 11.5, color: "#047857", margin: 0, lineHeight: 1.5 }}>
            No payment needed. Zoom link will be sent to your email  after confirmation.
          </p>
        </div>
      </div>
    );
  }

  if (freeSessionUsed) {
    const usedDate = usedSessionDetails?.usedAt
      ? fmtDate(usedSessionDetails.usedAt, { day: "2-digit", month: "short", year: "numeric" })
      : "a previous date";
    return (
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #fde68a", flexShrink: 0 }}>
        <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "10px 14px", display: "flex", alignItems: "center", gap: 6, minHeight: 36, boxSizing: "border-box" }}>
          <AlertCircle className="w-3 h-3" style={{ color: "#f59e0b", flexShrink: 0 }} />
          <span style={{ ...fStyle, color: "#b45309", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Free Session Used
          </span>
        </div>
        <div style={{ background: "#fffbeb", padding: "12px 14px" }}>
          <p style={{ ...fStyle, fontSize: 13, fontWeight: 700, color: "#92400e", margin: "0 0 3px" }}>Free session already used</p>
          <p style={{ ...fStyle, fontSize: 11.5, color: "#b45309", margin: 0, lineHeight: 1.5 }}>
            Used on <strong>{usedDate}</strong>. Payment is required now.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

/* ─────────────────────── Coupon Panel ─────────────────────── */
const CouponPanel = ({ availableCoupons, appliedCoupon, pendingCoupon, onPendingChange, onApply, onRemove, onClose, baseAmount }) => {
  const [manualCode, setManualCode] = useState("");
  const [manualError, setManualError] = useState("");

  const applyManual = () => {
    const found = availableCoupons.find((c) => c.couponCode === manualCode.trim().toUpperCase() && c.isActive);
    if (found) { onPendingChange(found); setManualCode(""); setManualError(""); }
    else setManualError("Invalid or expired coupon code.");
  };

  const confirm = () => {
    pendingCoupon ? onApply(pendingCoupon) : onRemove();
    onClose();
  };

  const discount = pendingCoupon ? Math.round((baseAmount * pendingCoupon.discountValue) / 100) : 0;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
        <button type="button" onClick={onClose} className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center cursor-pointer flex-shrink-0 active:scale-95 transition-transform">
          <ArrowLeft size={14} color="#6b7280" />
        </button>
        <div>
          <p style={fStyle} className="text-sm font-bold text-[#1a1a2e]">Coupons &amp; Offers</p>
          <p style={fStyle} className="text-[10px] text-gray-400">{availableCoupons.length} offer{availableCoupons.length !== 1 ? "s" : ""} available</p>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => { setManualCode(e.target.value.toUpperCase()); setManualError(""); }}
            onKeyDown={(e) => e.key === "Enter" && applyManual()}
            placeholder="Enter coupon code"
            style={fStyle}
            className="flex-1 min-w-0 border border-gray-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#1a1a2e] bg-gray-50 text-[#1a1a2e] placeholder-gray-300"
          />
          <button type="button" onClick={applyManual} style={fStyle} className="px-4 py-2.5 bg-[#1a1a2e] text-white text-xs font-semibold rounded-xl cursor-pointer whitespace-nowrap border-none active:scale-95 transition-transform">
            Apply
          </button>
        </div>
        {manualError && (
          <p style={fStyle} className="text-[10px] text-red-500 mt-1.5 flex items-center gap-1"><AlertCircle size={10} /> {manualError}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
        <p style={fStyle} className="text-[10px] text-gray-400 text-center uppercase tracking-widest mb-1">— Available offers —</p>

        {availableCoupons.map((coupon) => {
          const sel = pendingCoupon?._id === coupon._id;
          const wasApplied = appliedCoupon?._id === coupon._id;
          const saved = Math.round((baseAmount * coupon.discountValue) / 100);

          return (
            <button
              key={coupon._id}
              type="button"
              onClick={() => onPendingChange(sel ? null : coupon)}
              className="w-full text-left border-none p-0 cursor-pointer rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
              style={{ boxShadow: sel ? "0 0 0 2.5px #1a1a2e, 0 4px 16px rgba(26,26,46,0.12)" : "0 1px 6px rgba(0,0,0,0.07)" }}
            >
              <div className={`px-3 py-2.5 flex items-center justify-between ${sel ? "bg-[#1a1a2e]" : "bg-gray-50 border-b border-gray-100"}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${sel ? "bg-white/15" : "bg-white border border-gray-200"}`}>
                    <Percent size={12} color={sel ? "#fff" : "#6b7280"} />
                  </div>
                  <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em" }} className={sel ? "text-white" : "text-[#1a1a2e]"}>
                    {coupon.couponCode}
                  </span>
                  {wasApplied && !sel && (
                    <span style={fStyle} className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Applied</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={fStyle} className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${sel ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                    {coupon.discountValue}% OFF
                  </span>
                  {sel && <BadgeCheck size={14} color="#6ee7b7" />}
                </div>
              </div>

              <div className={`px-3 py-2 flex items-center justify-between ${sel ? "bg-[#1a1a2e]/[0.03]" : "bg-white"}`}>
                <div>
                  <p style={fStyle} className="text-[10px] text-gray-400">
                    Valid for {coupon.appliesForDuration?.join(", ")} month plans
                    {coupon.expiryDate ? ` · Expires ${coupon.expiryDate.split("T")[0]}` : ""}
                  </p>
                  {baseAmount > 0 && (
                    <p style={fStyle} className="text-[11px] font-bold text-emerald-600 mt-0.5">Save {inr(saved)} on this session</p>
                  )}
                </div>
                <div className="w-[18px] h-[18px] rounded-full flex-shrink-0 flex items-center justify-center ml-2"
                  style={{ border: `2px solid ${sel ? "#1a1a2e" : "#d1d5db"}`, background: sel ? "#1a1a2e" : "#fff" }}>
                  {sel && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-4 border-t border-gray-100 bg-white flex-shrink-0">
        {pendingCoupon && (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <Tag size={11} color="#059669" />
              <span style={fStyle} className="text-[11px] font-semibold text-emerald-800">{pendingCoupon.couponCode} selected</span>
            </div>
            <span style={fStyle} className="text-[11px] font-bold text-emerald-600">−{inr(discount)}</span>
          </div>
        )}
        <div className="flex gap-2">
          {pendingCoupon && (
            <button type="button" onClick={() => { onPendingChange(null); onRemove(); onClose(); }} style={fStyle}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-500 text-xs font-semibold cursor-pointer whitespace-nowrap active:scale-95 transition-transform">
              Clear
            </button>
          )}
          <button type="button" onClick={confirm} style={fStyle}
            className="flex-1 py-3 bg-[#1a1a2e] text-white text-sm font-bold rounded-xl cursor-pointer border-none active:scale-[0.98] transition-transform">
            {pendingCoupon ? `Apply ${pendingCoupon.couponCode}` : "Skip, no coupon"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────── Main Modal ─────────────────────── */
const BookingModal = ({ mentor, isOpen, onClose, selectedSlot, appliedCoupon: externalCoupon, availableCoupons = [] }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState({ id: "", username: "" });
  const [topic, setTopic] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(externalCoupon || null);
  const [pendingCoupon, setPendingCoupon] = useState(null);
  const [showCouponPanel, setShowCouponPanel] = useState(false);

  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

  const { data: freeSessionData, isLoading: checkingFreeSession, isFetching: fetchingFreeSession } =
    useCheckFreeSessionEligibilityQuery(
      { userId: user.id, username: user.username, mentorUserId: mentor?.userId || null },
      { skip: !user.id, refetchOnMountOrArgChange: true }
    );

  const hasFreeSession = freeSessionData?.hasFreeSession === true;
  const freeSessionUsed = freeSessionData?.freeSessionUsed === true;
  const isCheckingSession = checkingFreeSession || fetchingFreeSession;

  useEffect(() => {
    if (!isOpen) {
      setTopic("");
      setAppliedCoupon(externalCoupon || null);
      setPendingCoupon(null);
      setShowCouponPanel(false);
      return;
    }

    if (!localStorage.getItem("authToken")) {
      localStorage.setItem("pendingBookingMentorId", mentor?.userId || "");
      if (mentor?.fullName) localStorage.setItem("selectedMentorName", mentor.fullName);
      onClose();
      navigate(`/login?mentorId=${mentor?._id}`);
      return;
    }

    try {
      const raw = JSON.parse(localStorage.getItem("userData") || "{}");
      setUser({ id: raw._id || raw.id || "", username: raw.username || "" });
    } catch {
      showToast.error("Failed to load user data. Please log in again.");
    }

    if (searchParams.get("redirect") === "booking") showToast.success("Welcome back! Continue with your booking.");
  }, [isOpen, mentor?._id, navigate, searchParams]);

  const calcDuration = (start, end) => {
    if (!start || !end) return 30;
    const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
    return Math.max(toMin(end) - toMin(start), 0);
  };

  const baseAmount = hasFreeSession ? 0 : (mentor?.hourlyRate ?? 0);
  const discountedAmount = appliedCoupon && !hasFreeSession
    ? Math.round(baseAmount - (baseAmount * appliedCoupon.discountValue) / 100)
    : baseAmount;
  const savedAmount = baseAmount - discountedAmount;

  const priceLabel = isCheckingSession ? "…" : hasFreeSession ? "FREE" : inr(appliedCoupon ? discountedAmount : baseAmount);
  const submitLabel = hasFreeSession ? "Confirm Free Session" : `Proceed to Payment — ${priceLabel}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) { alert("Please enter a topic to discuss."); return; }
    if (!user.id) { showToast.error("User session expired. Please log in again."); return; }
    if (!mentor?._id) { showToast.error("Mentor information is missing."); return; }
    if (!selectedSlot?.date) { showToast.error("No session slot selected."); return; }

    try {
      const raw = JSON.parse(localStorage.getItem("userData") || "{}");
      const couponPayload = appliedCoupon
        ? { couponId: appliedCoupon._id, couponCode: appliedCoupon.couponCode, discountValue: appliedCoupon.discountValue }
        : null;
      const couponsPayload = availableCoupons.map((c) => ({
        couponId: c._id, couponCode: c.couponCode, discountValue: c.discountValue, appliesForDuration: c.appliesForDuration,
      }));

      const payload = {
        userId: user.id,
        username: user.username,
        mentorUserId: mentor?.userId,
        mentorName: mentor.fullName,
        mentorId: mentor._id,
        date: selectedSlot.date?.split("T")[0],
        time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
        topic,
        duration: calcDuration(selectedSlot.startTime, selectedSlot.endTime),
        email: raw.email || "",
        menteeEmail: mentor.email,
        name: raw.name || raw.firstName || "",
        lastName: raw.lastName || "",
        phone: raw.phone || "",
        guests: "1",
        price: priceLabel,
        sessionType: "One-on-One",
        createZoomMeeting: true,
        appliedCoupon: couponPayload,
        availableCoupons: couponsPayload,
      };

      const response = await createBooking(payload).unwrap();

      if (response.isFreeSession === true) {
        showToast.success("Free session booked! Check your email for the Zoom link.");
        handleClose();
        return;
      }

      navigate("/payment", {
        state: {
          session_id: response.bookingId || response.data?._id,
          subscription_id: null,
          mentorId: mentor._id,
          menteeId: user.id,
          mentorName: mentor.fullName,
          menteeName: raw.name || raw.firstName || user.username || "",
          mentorRole: mentor.currentRole || "Mentor",
          planMonths: null,
          totalSessions: 1,
          basePrice: appliedCoupon ? discountedAmount : baseAmount,
          discountedPrice: discountedAmount,
          savedAmount,
          appliedCoupon: couponPayload,
          availableCoupons: couponsPayload,
          createdBy: user.id,
          paymentType: "bookingsession",
          bookingDetails: {
            date: selectedSlot.date?.split("T")[0],
            time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
            topic,
            sessionType: "One-on-One",
            duration: calcDuration(selectedSlot.startTime, selectedSlot.endTime),
          },
        },
      });
    } catch (error) {
      showToast.error(error?.data?.message || error?.data?.error || error?.message || "Failed to create booking.");
    }
  };

  const handleClose = () => {
    setTopic("");
    setShowCouponPanel(false);
    setPendingCoupon(null);
    onClose();
  };

  if (!isOpen) return null;

  const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] focus:border-[#1a1a2e] bg-white placeholder-gray-300 transition-all";
  const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5";
  const showCoupon = showCouponPanel && !hasFreeSession && availableCoupons.length > 0;

  return (
    <AnimatePresence>
      <style>{`.no-scrollbar{scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}`}</style>

      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div {...SLIDE} className="relative bg-white shadow-2xl flex w-full sm:w-auto h-full flex-shrink-0">

          {/* Coupon panel — left of booking panel, desktop */}
          <AnimatePresence>
            {showCoupon && (
              <motion.div
                key="coupon"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 360 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="hidden sm:flex flex-col overflow-hidden flex-shrink-0 border-r border-gray-100"
                style={{ minWidth: 0, width: 360 }}
              >
                <CouponPanel
                  availableCoupons={availableCoupons}
                  appliedCoupon={appliedCoupon}
                  pendingCoupon={pendingCoupon}
                  onPendingChange={setPendingCoupon}
                  baseAmount={baseAmount}
                  onApply={(c) => { setAppliedCoupon(c); setPendingCoupon(null); }}
                  onRemove={() => { setAppliedCoupon(null); setPendingCoupon(null); }}
                  onClose={() => setShowCouponPanel(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coupon overlay — mobile full screen */}
          <AnimatePresence>
            {showCoupon && (
              <motion.div
                key="coupon-mobile"
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute inset-0 z-10 sm:hidden bg-white flex flex-col"
              >
                <CouponPanel
                  availableCoupons={availableCoupons}
                  appliedCoupon={appliedCoupon}
                  pendingCoupon={pendingCoupon}
                  onPendingChange={setPendingCoupon}
                  baseAmount={baseAmount}
                  onApply={(c) => { setAppliedCoupon(c); setPendingCoupon(null); }}
                  onRemove={() => { setAppliedCoupon(null); setPendingCoupon(null); }}
                  onClose={() => setShowCouponPanel(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Booking form panel */}
          <div className={`flex flex-col overflow-hidden w-full sm:w-[420px] flex-shrink-0 ${showCoupon ? "hidden sm:flex" : "flex"}`}>

            <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-95">
                <X size={16} />
              </button>
              <h2 style={fStyle} className="text-base font-bold text-[#1a1a2e]">Book a Session</h2>
            </div>

            <div className="overflow-y-auto flex-1 px-5 pt-3 pb-4 no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 h-full">

                <p style={fStyle} className="text-sm font-bold text-[#1a1a2e]">Mentor Name :- {mentor?.fullName}</p>

                <FreeSessionBanner
                  hasFreeSession={hasFreeSession}
                  freeSessionUsed={freeSessionUsed}
                  isLoading={isCheckingSession}
                  freeSessionCount={freeSessionData?.freeSessionCount}
                  usedSessionDetails={freeSessionData?.usedSessionDetails}
                />

                <div className="grid grid-cols-2 gap-2.5">
                  <GridBox
                    icon={Calendar}
                    label="Date"
                    value={fmtDate(selectedSlot?.date, { day: "numeric", month: "long", year: "numeric" })}
                  />
                  <GridBox
                    icon={Clock}
                    label="Time"
                    value={`${selectedSlot?.startTime} · ${calcDuration(selectedSlot?.startTime, selectedSlot?.endTime)} min`}
                  />
                  <GridBox icon={Tag} label="Session Type" value="One-on-One" />
                  <GridBox
                    icon={MessageSquare}
                    label="Amount"
                    value={priceLabel}
                    valueClass={hasFreeSession || appliedCoupon ? "text-emerald-600" : "text-[#1a1a2e]"}
                    extra={
                      appliedCoupon && !hasFreeSession ? (
                        <button type="button" onClick={() => setAppliedCoupon(null)} style={fStyle}
                          className="text-[9px] text-red-400 hover:text-red-600 font-semibold bg-transparent border-none cursor-pointer mt-1">
                          Remove
                        </button>
                      ) : null
                    }
                  />
                </div>

                {!hasFreeSession && availableCoupons.length > 0 && (
                  <div className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${pendingCoupon && !appliedCoupon ? "border-[#1a1a2e]/30 bg-[#1a1a2e]/[0.02]" : "border-dashed border-gray-200 hover:border-[#1a1a2e]/30 hover:bg-gray-50"
                    }`}>
                    <button type="button" onClick={() => setShowCouponPanel(true)} style={fStyle}
                      className="flex items-center gap-2 flex-1 min-w-0 text-left group bg-transparent border-none cursor-pointer p-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${pendingCoupon ? "bg-[#1a1a2e]" : "bg-gray-100 group-hover:bg-[#1a1a2e]/5"}`}>
                        <Gift size={14} className={pendingCoupon ? "text-white" : "text-[#1a1a2e]"} />
                      </div>
                      <div className="min-w-0">
                        {pendingCoupon && !appliedCoupon ? (
                          <>
                            <p className="text-xs font-semibold text-[#1a1a2e] truncate">
                              {pendingCoupon.couponCode}
                              <span className="ml-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{pendingCoupon.discountValue}% off</span>
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Selected · tap Apply to confirm</p>
                          </>
                        ) : appliedCoupon ? (
                          <>
                            <p className="text-xs font-semibold text-[#1a1a2e]">{appliedCoupon.couponCode} applied</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{appliedCoupon.discountValue}% off · tap to change</p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs font-semibold text-[#1a1a2e]">Have a coupon?</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{availableCoupons.length} offer{availableCoupons.length > 1 ? "s" : ""} available</p>
                          </>
                        )}
                      </div>
                    </button>

                    {pendingCoupon && !appliedCoupon ? (
                      <button type="button" onClick={() => { setAppliedCoupon(pendingCoupon); setPendingCoupon(null); setShowCouponPanel(false); }} style={fStyle}
                        className="flex-shrink-0 px-3 py-2 bg-[#1a1a2e] text-white text-[11px] font-bold rounded-lg hover:bg-[#2d2d4e] transition-all border-none cursor-pointer active:scale-95">
                        Apply
                      </button>
                    ) : (
                      <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                    )}
                  </div>
                )}

                <div>
                  <label style={fStyle} className={labelCls}>Topic to Discuss</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a2e] pointer-events-none" />

                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="What would you like to discuss in this session?"
                      rows={2}
                      className={`${inputCls} text-[#1a1a2e] h-14 pl-10 pt-[14px] resize-none`}
                      style={fStyle}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingBooking || isCheckingSession}
                  style={fStyle}
                  className="w-full mt-auto py-3.5 rounded-xl font-semibold text-sm text-white bg-[#1a1a2e]  active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border-none cursor-pointer"
                >
                  {isCheckingSession ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Checking eligibility…</>
                  ) : isCreatingBooking ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {hasFreeSession ? "Confirming…" : "Creating Booking…"}</>
                  ) : submitLabel}
                </button>

              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;


