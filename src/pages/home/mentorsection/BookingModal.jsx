// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   X,
//   Clock,
//   Calendar,
//   MessageSquare,
//   Users,
//   Gift,
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
// } from "lucide-react";
// import { showToast } from "../../../utils/Toastprovider";
// import {
//   useCreateBookingMutation,
//   useCheckFreeSessionEligibilityQuery,
// } from "../../topMentors/Mentorsectionapislice";
// import { useNavigate } from "react-router-dom";

// /* ───────────────────────── Success Screen ───────────────────────── */
// const BookingSuccessScreen = ({ mentor, onClose }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.92 }}
//     animate={{ opacity: 1, scale: 1 }}
//     exit={{ opacity: 0, scale: 0.92 }}
//     transition={{ duration: 0.22, ease: "easeOut" }}
//     className="flex flex-col items-center justify-center p-8 text-center h-full"
//   >
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ delay: 0.1, type: "spring", stiffness: 240, damping: 15 }}
//       className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
//     >
//       <CheckCircle2 className="w-9 h-9 text-green-600" strokeWidth={2} />
//     </motion.div>
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//       className="mb-6"
//     >
//       <h2 className="text-lg font-bold text-gray-900 mb-1">Session Confirmed!</h2>
//       <p className="text-sm text-gray-500 max-w-[240px] mx-auto leading-relaxed">
//         Your free session with{" "}
//         <span className="font-semibold text-gray-800">{mentor?.fullName}</span> is booked.
//         Check your email for details.
//       </p>
//     </motion.div>
//     <motion.button
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 0.32 }}
//       onClick={onClose}
//       className="px-8 py-2.5 bg-[#062117] text-white font-semibold rounded-xl hover:bg-[#0a3323] transition-colors text-sm"
//     >
//       Done
//     </motion.button>
//   </motion.div>
// );

// /* ─────────────────────── Free Session Banner ─────────────────────── */
// const FreeSessionBanner = ({ hasFreeSession, freeSessionUsed, isLoading, usedSessionDetails }) => {
//   if (isLoading) {
//     return (
//       <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//         <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 flex-shrink-0" />
//         <p className="text-xs text-gray-500">Checking free session eligibility…</p>
//       </div>
//     );
//   }
//   if (hasFreeSession) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -6 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg px-3 py-2.5 flex items-center gap-2.5"
//       >
//         <Gift className="w-4 h-4 text-green-600 flex-shrink-0" />
//         <div>
//           <p className="text-xs font-bold text-green-800 leading-tight">Your First Session is FREE!</p>
//           <p className="text-[11px] text-green-700 leading-tight mt-0.5">No payment required. Zoom link sent instantly.</p>
//         </div>
//       </motion.div>
//     );
//   }
//   if (freeSessionUsed) {
//     const usedDate = usedSessionDetails?.usedAt
//       ? new Date(usedSessionDetails.usedAt).toDateString()
//       : "a previous date";
//     return (
//       <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 flex items-center gap-2.5">
//         <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
//         <div>
//           <p className="text-xs font-semibold text-blue-800 leading-tight">Free Session Already Used</p>
//           <p className="text-[11px] text-blue-600 leading-tight mt-0.5">Used on {usedDate}. This booking requires payment.</p>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

// /* ─────────────────────────── Main Modal ─────────────────────────── */
// const BookingModal = ({ mentor, isOpen, onClose, selectedSlot }) => {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [confirmedBooking, setConfirmedBooking] = useState(null);
//   const [confirmedZoom, setConfirmedZoom] = useState(null);

//   const [bookingData, setBookingData] = useState({
//     date: "", time: "", topic: "", duration: "30",
//     name: "", lastName: "", email: "", phone: "",
//     guests: "1", sessionType: "One-on-One", userId: "",
//   });

//   const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

//   const {
//     data: freeSessionData,
//     isLoading: checkingFreeSession,
//     isFetching: fetchingFreeSession,
//   } = useCheckFreeSessionEligibilityQuery(
//     { userId, username, mentorUserId: mentor?.userId || null },
//     { skip: !userId, refetchOnMountOrArgChange: true }
//   );

//   const hasFreeSession = freeSessionData?.hasFreeSession === true;
//   const freeSessionUsed = freeSessionData?.freeSessionUsed === true;
//   const usedSessionDetails = freeSessionData?.usedSessionDetails || null;
//   const isCheckingSession = checkingFreeSession || fetchingFreeSession;

//   /* ── Initialise on open ── */
//   useEffect(() => {
//     if (!isOpen) { setBookingSuccess(false); setConfirmedBooking(null); setConfirmedZoom(null); resetForm(); return; }
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) { onClose(); navigate("/login?redirect=/book-session?mentorId=" + mentor._id); return; }
//     const userData = localStorage.getItem("userData");
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         if (user.email) {
//           setBookingData(prev => ({ ...prev, email: user.email, name: user.name || user.firstName || "", lastName: user.lastName || "", phone: user.phone || "", userId: user._id || user.id || "" }));
//           setUserId(user._id || user.id || "");
//           setUsername(user.username || "");
//         }
//       } catch { showToast.error("Failed to load user data. Please log in again."); }
//     }
//   }, [isOpen]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData(prev => ({ ...prev, [name]: value }));
//   };

//   /* ── Slot helpers ── */
//   const generateHourlySlots = (startTime, endTime) => {
//     const slots = [];
//     const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
//     const toStr = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
//     let cur = toMin(startTime);
//     const end = toMin(endTime);
//     while (cur < end) {
//       const next = Math.min(cur + 60, end);
//       slots.push({ start: toStr(cur), end: toStr(next), display: toStr(cur) + " - " + toStr(next) });
//       cur = next;
//     }
//     return slots;
//   };

//   const getAvailableSlots = () => {
//     if (!bookingData.date || !mentor.availability) return [];
//     const dayName = new Date(bookingData.date).toLocaleDateString("en-US", { weekday: "long" });
//     const dayAvail = mentor.availability.find(d => d.day.toLowerCase() === dayName.toLowerCase());
//     if (!dayAvail?.slots?.length) return null;
//     const all = [];
//     dayAvail.slots.forEach(slot => { if (!slot.isBooked) all.push(...generateHourlySlots(slot.startTime, slot.endTime)); });
//     return all;
//   };

//   const calculateTotalAmount = () => {
//     if (hasFreeSession) return 0;
//     if (bookingData.duration === "30") return mentor.hourlyRate / 2;
//     if (bookingData.duration === "60") return mentor.hourlyRate;
//     return mentor.hourlyRate * 1.5;
//   };

//   /* ── Submit ── */
//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     if (!bookingData.date) { showToast.error("Please select a session date."); return; }
//     if (!bookingData.time) { showToast.error("Please select a time slot."); return; }
//     if (!bookingData.topic.trim()) { showToast.error("Please enter a topic to discuss."); return; }
//     if (!bookingData.sessionType) { showToast.error("Please select a session type."); return; }
//     if (!bookingData.userId) { showToast.error("User session expired. Please log in again."); return; }
//     if (!mentor?._id) { showToast.error("Mentor information is missing."); return; }

//     try {
//       const payload = {
//         userId: bookingData.userId, username, mentorUserId: mentor?.userId || null,
//         mentorId: mentor._id, date: bookingData.date, time: bookingData.time,
//         topic: bookingData.topic, duration: Number(bookingData.duration),
//         email: bookingData.email, menteeEmail: mentor.email,
//         name: bookingData.name, lastName: bookingData.lastName,
//         phone: bookingData.phone, guests: bookingData.guests,
//         sessionType: bookingData.sessionType, createZoomMeeting: true,
//       };
//       const response = await createBooking(payload).unwrap();

//       if (response.isFreeSession === true) {
//         setConfirmedBooking({ ...bookingData });
//         setConfirmedZoom(response.zoomMeeting || null);
//         setBookingSuccess(true);
//         showToast.success("Free session booked! Check your email for the Zoom link.");
//       } else {
//         navigate("/payment", {
//           state: {
//             bookingId: response.bookingId || response.data?._id,
//             mentorId: mentor._id, mentorName: mentor.fullName,
//             paymentAmount: calculateTotalAmount(),
//             bookingDetails: { ...bookingData },
//             mentorDetails: { fullName: mentor.fullName, email: mentor.email, _id: mentor._id, profileImage: mentor.profileImage, currentRole: mentor.currentRole },
//           },
//         });
//       }
//     } catch (error) {
//       const message = error?.data?.message || error?.data?.error || error?.message || "Failed to create booking. Please try again.";
//       showToast.error(message);
//     }
//   };

//   const resetForm = () => setBookingData({ date: "", time: "", topic: "", duration: "30", name: "", lastName: "", email: "", phone: "", guests: "1", sessionType: "One-on-One", userId: "" });

//   const handleClose = () => { setBookingSuccess(false); setConfirmedBooking(null); setConfirmedZoom(null); resetForm(); onClose(); };

//   if (!isOpen) return null;

//   const availableSlots = getAvailableSlots();
//   const amount = calculateTotalAmount();
//   const priceLabel = isCheckingSession ? "…" : hasFreeSession ? "FREE" : `Rs. ${amount}`;
//   const submitLabel = hasFreeSession ? "Confirm Free Session" : `Proceed to Payment — Rs. ${amount}`;

//   /* ─── shared input classes ─── */
//   const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white placeholder-gray-400 transition";
//   const iconInputCls = inputCls + " pl-8";
//   const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1";

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 8 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.96, y: 8 }}
//           transition={{ duration: 0.2, ease: "easeOut" }}
//           className="bg-white rounded-2xl w-full max-w-lg relative overflow-hidden"
//           style={{ maxHeight: "80vh" }}
//         >
//           {/* ── Header ── */}
//           <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
//             <div className="flex items-center gap-2.5">
//               {mentor?.profileImage && (
//                 <img src={mentor.profileImage} alt={mentor.fullName} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
//               )}
//               <div>
//                 <p className="text-xs font-bold text-gray-900 leading-tight">{mentor?.fullName}</p>
//                 <p className="text-[11px] text-gray-400 leading-tight">{mentor?.currentRole || "Mentor"}</p>
//               </div>
//             </div>
//             <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 transition p-1 rounded-lg hover:bg-gray-100">
//               <X size={18} />
//             </button>
//           </div>

//           <AnimatePresence mode="wait">
//             {bookingSuccess ? (
//               <BookingSuccessScreen key="success" mentor={mentor} zoomMeeting={confirmedZoom} onClose={handleClose} />
//             ) : (
//               <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
//                 <form onSubmit={handleBookingSubmit} className="px-5 pt-3 pb-4 flex flex-col gap-3">

//                   {/* Free session banner */}
//                   <FreeSessionBanner
//                     hasFreeSession={hasFreeSession}
//                     freeSessionUsed={freeSessionUsed}
//                     isLoading={isCheckingSession}
//                     usedSessionDetails={usedSessionDetails}
//                   />

//                   {/* Selected slot info (read-only) */}
//                   {selectedSlot && (
//                     <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//                       <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                       <span className="text-xs text-gray-600 font-medium">
//                         {new Date(selectedSlot.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                         {" · "}{selectedSlot.startTime} – {selectedSlot.endTime}
//                       </span>
//                     </div>
//                   )}

//                   {/* Topic */}
//                   <div>
//                     <label className={labelCls}>Topic to Discuss</label>
//                     <div className="relative">
//                       <MessageSquare className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
//                       <textarea
//                         name="topic" value={bookingData.topic} onChange={handleInputChange}
//                         placeholder="What would you like to discuss?"
//                         rows={3}
//                         className={iconInputCls + " resize-none"}
//                       />
//                     </div>
//                   </div>

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     disabled={isCreatingBooking || isCheckingSession}
//                     className={`w-full py-2.5 rounded-xl font-semibold text-sm text-white transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${hasFreeSession ? "bg-green-600 hover:bg-green-700" : "bg-[#062117] hover:bg-[#0a3323]"}`}
//                   >
//                     {isCheckingSession ? (
//                       <><Loader2 className="w-4 h-4 animate-spin" /> Checking eligibility…</>
//                     ) : isCreatingBooking ? (
//                       <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Confirming…</>
//                     ) : hasFreeSession ? "Confirm Free Session" : "Confirm Session"}
//                   </button>

//                 </form>
//               </motion.div>
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
  X,
  Clock,
  Calendar,
  MessageSquare,
  Gift,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { showToast } from "../../../utils/Toastprovider";
import {
  useCreateBookingMutation,
  useCheckFreeSessionEligibilityQuery,
} from "../../topMentors/Mentorsectionapislice";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── Success Screen ───────────────────────── */
const BookingSuccessScreen = ({ mentor, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.92 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    className="flex flex-col items-center justify-center p-8 text-center"
    style={{ minHeight: 320 }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 240, damping: 15 }}
      className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
    >
      <CheckCircle2 className="w-9 h-9 text-green-600" strokeWidth={2} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-1">Session Confirmed!</h2>
      <p className="text-sm text-gray-500 max-w-[240px] mx-auto leading-relaxed">
        Your session with{" "}
        <span className="font-semibold text-gray-800">{mentor?.fullName}</span> is booked.
        Check your email for details.
      </p>
    </motion.div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.32 }}
      onClick={onClose}
      className="px-8 py-2.5 bg-[#062117] text-white font-semibold rounded-xl hover:bg-[#0a3323] transition-colors text-sm"
    >
      Done
    </motion.button>
  </motion.div>
);

/* ─────────────────────── Free Session Banner ─────────────────────── */
// const FreeSessionBanner = ({ hasFreeSession, freeSessionCount, freeSessionUsed, isLoading, usedSessionDetails }) => {
//   if (isLoading) {
//     return (
//       <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
//         <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 flex-shrink-0" />
//         <p className="text-xs text-gray-500">Checking free session eligibility…</p>
//       </div>
//     );
//   }
//   if (hasFreeSession) {
//     return (
//       <>
//         <motion.div
//           initial={{ opacity: 0, y: -6 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg px-3 py-2.5 flex items-center gap-2.5"
//         >
//           <Gift className="w-4 h-4 text-green-600 flex-shrink-0" />
//           <div>


//             <p className="text-xs font-bold text-green-800 leading-tight">Your First Session is FREE!</p>

//             <p className="text-[11px] text-green-700 leading-tight mt-0.5">
//               No payment required. Zoom link sent instantly.
//             </p>
//           </div>


//         </motion.div>

//         <div className="flex items-center justify-between gap-3">
//           <p className="text-xs font-bold text-green-800 leading-tight">Your First Session is FREE!</p>
//           <span className="flex-shrink-0 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
//             {freeSessionCount} left
//           </span>
//         </div>
//       </>
//     );
//   }
//   if (freeSessionUsed) {
//     const usedDate = usedSessionDetails?.usedAt
//       ? new Date(usedSessionDetails.usedAt).toDateString()
//       : "a previous date";
//     return (
//       <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 flex items-center gap-2.5">
//         <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
//         <div>
//           <p className="text-xs font-semibold text-blue-800 leading-tight">Free Session Already Used</p>
//           <p className="text-[11px] text-blue-600 leading-tight mt-0.5">
//             Used on {usedDate}. This booking requires payment.
//           </p>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };


const FreeSessionBanner = ({ hasFreeSession, freeSessionUsed, isLoading, usedSessionDetails, freeSessionCount }) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400 flex-shrink-0" />
        <p className="text-xs text-gray-500 font-medium">Checking free session eligibility…</p>
      </div>
    );
  }

  if (hasFreeSession) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl overflow-hidden border border-green-200"
      >
        {/* Top bar */}
        <div className="bg-green-600 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <span className="text-white text-xs font-bold tracking-wide uppercase">
              Free Session Available
            </span>
          </div>
          <span className="bg-white text-green-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
            {freeSessionCount} remaining
          </span>
        </div>

        {/* Body */}
        <div className="bg-green-50 px-4 py-3 flex flex-col gap-1">
          <p className="text-sm font-bold text-green-900">
            Your first session is completely FREE
          </p>
          <p className="text-xs text-green-700 leading-relaxed">
            No payment needed. A Zoom link will be sent to your email right after confirming.
          </p>
        </div>
      </motion.div>
    );
  }

  if (freeSessionUsed) {
    const usedDate = usedSessionDetails?.usedAt
      ? new Date(usedSessionDetails.usedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "a previous date";
    return (
      <div className="rounded-xl overflow-hidden border border-blue-200">
        {/* Top bar */}
        <div className="bg-blue-600 px-4 py-2 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-white flex-shrink-0" />
          <span className="text-white text-xs font-bold tracking-wide uppercase">
            Free Session Used
          </span>
        </div>

        {/* Body */}
        <div className="bg-blue-50 px-4 py-3 flex flex-col gap-1">
          <p className="text-sm font-bold text-blue-900">
            You've already used your free session
          </p>
          <p className="text-xs text-blue-700 leading-relaxed">
            Used on <span className="font-semibold">{usedDate}</span>. This session will require payment to confirm.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

/* ─────────────────────────── Main Modal ─────────────────────────── */
const BookingModal = ({ mentor, isOpen, onClose, selectedSlot }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [topic, setTopic] = useState("");

  /* ── RTK mutations / queries ── */
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

  const {
    data: freeSessionData,
    isLoading: checkingFreeSession,
    isFetching: fetchingFreeSession,
  } = useCheckFreeSessionEligibilityQuery(
    { userId, username, mentorUserId: mentor?.userId || null },
    { skip: !userId, refetchOnMountOrArgChange: true }
  );

  console.log(freeSessionData, 'freeSessionData')
  const freeSessionCount = freeSessionData?.freeSessionCount
  const hasFreeSession = freeSessionData?.hasFreeSession === true;
  const freeSessionUsed = freeSessionData?.freeSessionUsed === true;
  const usedSessionDetails = freeSessionData?.usedSessionDetails || null;
  // console.log(usedSessionDetails,"usedSessionDetails")
  const isCheckingSession = checkingFreeSession || fetchingFreeSession;

  /* ── Load user from localStorage when modal opens ── */
  useEffect(() => {
    if (!isOpen) {
      // reset on close
      setBookingSuccess(false);
      setTopic("");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      onClose();
      navigate("/login?redirect=/book-session?mentorId=" + mentor?._id);
      return;
    }

    const raw = localStorage.getItem("userData");
    if (raw) {
      try {
        const user = JSON.parse(raw);
        setUserId(user._id || user.id || "");
        setUsername(user.username || "");
      } catch {
        showToast.error("Failed to load user data. Please log in again.");
      }
    }
  }, [isOpen]);

  /* ── Helpers ── */
  const formatSlotDate = (isoDate) => {
    if (!isoDate) return "—";
    return new Date(isoDate).toLocaleDateString("en-IN", {
      weekday: "short", day: "2-digit", month: "short", year: "numeric",
    });
  };

  const calcDuration = (start, end) => {
    if (!start || !end) return 30;
    const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
    return Math.max(toMin(end) - toMin(start), 0);
  };

  const calculateAmount = () => {
    if (hasFreeSession) return 0;
    return mentor?.hourlyRate ?? 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      showToast.error("Please enter a topic to discuss.");
      return;
    }
    if (!userId) {
      showToast.error("User session expired. Please log in again.");
      return;
    }
    if (!mentor?._id) {
      showToast.error("Mentor information is missing.");
      return;
    }
    if (!selectedSlot?.date) {
      showToast.error("No session slot selected. Please go back and select a slot.");
      return;
    }

    try {
      const raw = localStorage.getItem("userData");
      const user = raw ? JSON.parse(raw) : {};

      const payload = {
        userId,
        username,
        mentorUserId: mentor?.userId || null,
        mentorId: mentor._id,
        date: selectedSlot.date?.split("T")[0],
        time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
        topic,
        duration: calcDuration(selectedSlot.startTime, selectedSlot.endTime),
        email: user.email || "",
        menteeEmail: mentor.email,
        name: user.name || user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        guests: "1",
        sessionType: "One-on-One",
        createZoomMeeting: true,
      };

      const response = await createBooking(payload).unwrap();

      if (response.isFreeSession === true) {
        setBookingSuccess(true);
        showToast.success("Free session booked! Check your email for the Zoom link.");
      } else {
        navigate("/payment", {
          state: {
            bookingId: response.bookingId || response.data?._id,
            mentorId: mentor._id,
            mentorName: mentor.fullName,
            paymentAmount: calculateAmount(),
            bookingDetails: {
              date: selectedSlot.date?.split("T")[0],
              time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
              topic,
              sessionType: "One-on-One",
              duration: 60,
            },
            mentorDetails: {
              fullName: mentor.fullName,
              email: mentor.email,
              _id: mentor._id,
              profileImage: mentor.profileImage,
              currentRole: mentor.currentRole,
            },
          },
        });
      }
    } catch (error) {
      const message =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Failed to create booking. Please try again.";
      showToast.error(message);
    }
  };

  const handleClose = () => {
    setBookingSuccess(false);
    setTopic("");
    onClose();
  };

  if (!isOpen) return null;

  const amount = calculateAmount();
  const priceLabel = isCheckingSession ? "…" : hasFreeSession ? "FREE" : `₹${amount.toLocaleString()}`;
  const submitLabel = hasFreeSession
    ? "Confirm Free Session"
    : `Proceed to Payment — ₹${amount.toLocaleString()}`;

  const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1";
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white placeholder-gray-400 transition";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl w-full max-w-md relative shadow-2xl overflow-hidden"        >

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2.5">
              {mentor?.profileImage ? (
                <img
                  src={mentor.profileImage}
                  alt={mentor.fullName}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
                  {mentor?.fullName?.charAt(0) || "M"}
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">{mentor?.fullName}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{mentor?.currentRole || "Mentor"}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-700 transition p-1 rounded-lg hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Body ── */}
          <AnimatePresence mode="wait">

            {/* ── Success ── */}
            {bookingSuccess ? (
              <BookingSuccessScreen key="success" mentor={mentor} onClose={handleClose} />
            ) : (

              /* ── Form ── */
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.18 }}
              >
                <form onSubmit={handleSubmit} className="px-5 pt-4 pb-5 flex flex-col gap-3">

                  {/* 1. Free session banner */}
                  <FreeSessionBanner
                    hasFreeSession={hasFreeSession}
                    freeSessionUsed={freeSessionUsed}
                    isLoading={isCheckingSession}
                    freeSessionCount={freeSessionCount}
                    usedSessionDetails={usedSessionDetails}
                  />

                  {/* 2. Booked slot — read-only info card */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex flex-col gap-2">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                      Session Details
                    </p>
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700 font-medium">
                        {formatSlotDate(selectedSlot?.date)}
                      </span>
                    </div>
                    {/* Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700 font-medium">
                        {selectedSlot?.startTime} – {selectedSlot?.endTime}
                      </span>
                    </div>
                    {/* Price */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-200 mt-1">
                      <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                        Amount
                      </span>
                      <span className={`text-sm font-bold ${hasFreeSession ? "text-green-600" : "text-gray-900"}`}>
                        {priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* 3. Topic */}
                  <div>
                    <label className={labelCls}>Topic to Discuss</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                      <textarea
                        name="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="What would you like to discuss in this session?"
                        rows={3}
                        className={inputCls + " pl-8 resize-none"}
                      />
                    </div>
                  </div>

                  {/* 4. Submit */}
                  <button
                    type="submit"
                    disabled={isCreatingBooking || isCheckingSession}
                    className={`
                      w-full py-3 rounded-xl font-semibold text-sm text-white transition
                      flex items-center justify-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${hasFreeSession
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-[#062117] hover:bg-[#0a3323]"}
                    `}
                  >
                    {isCheckingSession ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Checking eligibility…</>
                    ) : isCreatingBooking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {hasFreeSession ? "Confirming…" : "Creating Booking…"}
                      </>
                    ) : (
                      submitLabel
                    )}
                  </button>

                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;

