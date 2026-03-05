

// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   X,
//   Clock,
//   Calendar,
//   MessageSquare,
//   Users,
//   Video,
//   Gift,
//   AlertCircle,
//   CheckCircle2,
//   Sparkles,
//   Loader2,
// } from "lucide-react";
// import { showToast } from "../../../utils/Toastprovider";
// import {
//   useCreateBookingMutation,
//   useCheckFreeSessionEligibilityQuery,
// } from "../../topMentors/Mentorsectionapislice";
// import { useNavigate } from "react-router-dom";
// const BookingSuccessScreen = ({ bookingDetails, mentor, onClose }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9, y: 10 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9, y: 10 }}
//       transition={{ duration: 0.25, ease: "easeOut" }}
//       className="flex flex-col items-center p-6 text-center"
//     >
//       {/* Icon */}
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 14 }}
//         className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3"
//       >
//         <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={2} />
//       </motion.div>

//       {/* Title */}
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-4"
//       >
//         <h2 className="text-base font-bold text-gray-900 mb-1">Session Confirmed! </h2>
//         <p className="text-xs text-gray-500 max-w-[220px] mx-auto leading-relaxed">
//           Your free session with{" "}
//           <span className="font-semibold text-gray-800">{mentor?.fullName}</span>{" "}
//           is booked. Check your email for details.
//         </p>
//       </motion.div>

//       {/* Mini details strip */}
//       {/* <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.28 }}
//         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 space-y-2"
//       >
//         {[
//           { label: "Date", value: bookingDetails?.date },
//           { label: "Time", value: bookingDetails?.time },
//           { label: "Duration", value: bookingDetails?.duration ? `${bookingDetails.duration} min` : null },
//           { label: "Price", value: "FREE" },
//         ].map(({ label, value }) =>
//           value ? (
//             <div key={label} className="flex justify-between items-center">
//               <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
//               <span className={`text-xs font-semibold ${label === "Price" ? "text-green-600" : "text-gray-800"}`}>
//                 {value}
//               </span>
//             </div>
//           ) : null
//         )}
//       </motion.div> */}

//       {/* CTA */}
//       <motion.button
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.35 }}
//         onClick={onClose}
//         className="p-6 py-2.5 bg-[#062117] text-white font-semibold rounded-xl hover:bg-[#0a3323] transition-colors text-sm"
//       >
//         Done
//       </motion.button>
//     </motion.div>
//   );
// };
// const FreeSessionBanner = ({ hasFreeSession, freeSessionUsed, isLoading, usedSessionDetails }) => {
//   if (isLoading) {
//     return (
//       <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
//         <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
//         <p className="text-xs text-gray-500">Checking free session eligibility...</p>
//       </div>
//     );
//   }

//   if (hasFreeSession) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4"
//       >
//         <div className="flex items-start gap-3">
//           <Gift className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-bold text-green-800 mb-1">
//               Your First Session is FREE!
//             </p>
//             <p className="text-xs text-green-700">
//               This is your complimentary first session. No payment required. Zoom link sent to your email instantly!
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   if (freeSessionUsed) {
//     const usedDate = usedSessionDetails?.bookedOn
//       ? new Date(usedSessionDetails.bookedOn).toDateString()
//       : "a previous date";

//     return (
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <div className="flex items-start gap-3">
//           <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-semibold text-blue-800 mb-1">
//               Free Session Already Used
//             </p>
//             <p className="text-xs text-blue-600">
//               {"You used your free session on " + usedDate + ". This booking requires payment."}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

// const BookingModal = ({ mentor, isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [confirmedBooking, setConfirmedBooking] = useState(null);
//   const [confirmedZoom, setConfirmedZoom] = useState(null);

//   const [bookingData, setBookingData] = useState({
//     date: "",
//     time: "",
//     topic: "",
//     duration: "30",
//     name: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     guests: "1",
//     sessionType: "One-on-One",
//     userId: "",
//   });

//   const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

//   const {
//     data: freeSessionData,
//     isLoading: checkingFreeSession,
//     isFetching: fetchingFreeSession,
//   } = useCheckFreeSessionEligibilityQuery(
//     { userId, username, mentorUserId: mentor?.userId || null },
//     {
//       skip: !userId,
//       refetchOnMountOrArgChange: true, // ✅ always re-check when modal opens
//     }
//   );

//   const hasFreeSession = freeSessionData?.hasFreeSession === true;
//   const freeSessionUsed = freeSessionData?.freeSessionUsed === true;
//   const usedSessionDetails = freeSessionData?.usedSessionDetails || null;
//   const isCheckingSession = checkingFreeSession || fetchingFreeSession;

//   useEffect(() => {
//     if (!isOpen) {
//       setBookingSuccess(false);
//       setConfirmedBooking(null);
//       setConfirmedZoom(null);
//       resetForm();
//       return;
//     }

//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       onClose();
//       navigate("/login?redirect=/book-session?mentorId=" + mentor._id);
//       return;
//     }

//     const userData = localStorage.getItem("userData");
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         if (user.email) {
//           setBookingData((prev) => ({
//             ...prev,
//             email: user.email,
//             name: user.name || user.firstName || "",
//             lastName: user.lastName || "",
//             phone: user.phone || "",
//             userId: user._id || user.id || "",
//           }));
//           setUserId(user._id || user.id || "");
//           setUsername(user.username || "");
//         }
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         showToast("Failed to load user data. Please log in again.", "error");
//       }
//     }
//   }, [isOpen, mentor, navigate, onClose]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData((prev) => ({ ...prev, [name]: value }));
//   };

//   const generateHourlySlots = (startTime, endTime) => {
//     const slots = [];
//     const [startHour, startMin] = startTime.split(":").map(Number);
//     const [endHour, endMin] = endTime.split(":").map(Number);
//     const startMinutes = startHour * 60 + startMin;
//     const endMinutes = endHour * 60 + endMin;

//     for (let minutes = startMinutes; minutes < endMinutes; minutes += 60) {
//       const slotEndMinutes = Math.min(minutes + 60, endMinutes);
//       const h1 = String(Math.floor(minutes / 60)).padStart(2, "0");
//       const m1 = String(minutes % 60).padStart(2, "0");
//       const h2 = String(Math.floor(slotEndMinutes / 60)).padStart(2, "0");
//       const m2 = String(slotEndMinutes % 60).padStart(2, "0");
//       const slotStart = h1 + ":" + m1;
//       const slotEnd = h2 + ":" + m2;
//       slots.push({ start: slotStart, end: slotEnd, display: slotStart + " - " + slotEnd });
//     }
//     return slots;
//   };

//   const getAvailableSlots = () => {
//     if (!bookingData.date || !mentor.availability) return [];
//     const dayName = new Date(bookingData.date).toLocaleDateString("en-US", { weekday: "long" });
//     const dayAvailability = mentor.availability.find(
//       (d) => d.day.toLowerCase() === dayName.toLowerCase()
//     );
//     if (!dayAvailability?.slots?.length) return null;

//     const allSlots = [];
//     dayAvailability.slots.forEach((slot) => {
//       if (!slot.isBooked) {
//         allSlots.push(...generateHourlySlots(slot.startTime, slot.endTime));
//       }
//     });
//     return allSlots;
//   };

//   const calculateTotalAmount = () => {
//     if (hasFreeSession) return 0;
//     if (bookingData.duration === "30") return mentor.hourlyRate / 2;
//     if (bookingData.duration === "60") return mentor.hourlyRate;
//     return mentor.hourlyRate * 1.5;
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();

//     if (!bookingData.date) { showToast("Please select a session date.", "error"); return; }
//     if (!bookingData.time) { showToast("Please select a time slot.", "error"); return; }
//     if (!bookingData.topic.trim()) { showToast("Please enter a topic to discuss.", "error"); return; }
//     if (!bookingData.sessionType) { showToast("Please select a session type.", "error"); return; }
//     if (!bookingData.userId) { showToast("User session expired. Please log in again.", "error"); return; }
//     if (!mentor?._id) { showToast("Mentor information is missing.", "error"); return; }

//     try {
//       const payload = {
//         userId: bookingData.userId,
//         username,
//         mentorUserId: mentor?.userId || null,
//         mentorId: mentor._id,
//         date: bookingData.date,
//         time: bookingData.time,
//         topic: bookingData.topic,
//         duration: Number(bookingData.duration),
//         email: bookingData.email,
//         menteeEmail: mentor.email,
//         name: bookingData.name,
//         lastName: bookingData.lastName,
//         phone: bookingData.phone,
//         guests: bookingData.guests,
//         sessionType: bookingData.sessionType,
//         createZoomMeeting: true,
//       };

//       const response = await createBooking(payload).unwrap();
//       console.log("Booking response:", response);

//       if (response.isFreeSession === true) {
//         setConfirmedBooking({ ...bookingData });
//         setConfirmedZoom(response.zoomMeeting || null);
//         setBookingSuccess(true);
//         showToast("Free session booked! Check your email for the Zoom link.", "success");
//       } else {
//         navigate("/payment", {
//           state: {
//             bookingId: response.bookingId || response.data?._id,
//             mentorId: mentor._id,
//             mentorName: mentor.fullName,
//             paymentAmount: calculateTotalAmount(),
//             bookingDetails: { ...bookingData },
//             mentorDetails: {
//               fullName: mentor.fullName,
//               email: mentor.email,
//               _id: mentor._id,
//               profileImage: mentor.profileImage,
//               currentRole: mentor.currentRole,
//             },
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Booking creation failed:", error);
//       const message =
//         error?.data?.message ||
//         error?.data?.error ||
//         error?.message ||
//         error?.error ||
//         "Failed to create booking. Please try again.";
//       showToast(message, "error");
//     }
//   };

//   const resetForm = () => {
//     setBookingData({
//       date: "",
//       time: "",
//       topic: "",
//       duration: "30",
//       name: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       guests: "1",
//       sessionType: "One-on-One",
//       userId: "",
//     });
//   };

//   const handleClose = () => {
//     setBookingSuccess(false);
//     setConfirmedBooking(null);
//     setConfirmedZoom(null);
//     resetForm();
//     onClose();
//   };

//   if (!isOpen) return null;

//   const availableSlots = getAvailableSlots();
//   const priceLabel = isCheckingSession ? "..." : hasFreeSession ? "FREE" : "Rs." + calculateTotalAmount();
//   const submitLabel = hasFreeSession ? "Confirm Free Session" : "Proceed to Payment - Rs." + calculateTotalAmount();
//   const zoomNote = hasFreeSession
//     ? "A Zoom link will be created instantly and sent to your email."
//     : "A Zoom link will be created after payment confirmation.";

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           className="bg-white rounded-lg sm:rounded-xl max-w-4xl my-4 sm:my-8 relative overflow-hidden"
//         >
//           <button
//             className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-700 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
//             onClick={handleClose}
//           >
//             <X size={20} />
//           </button>

//           <AnimatePresence mode="wait">
//             {bookingSuccess ? (
//               <BookingSuccessScreen
//                 key="success"
//                 bookingDetails={confirmedBooking}
//                 mentor={mentor}
//                 zoomMeeting={confirmedZoom}
//                 onClose={handleClose}
//               />
//             ) : (
//               <motion.div
//                 key="form"
//                 initial={{ opacity: 1 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.2 }}
//                 className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[85vh]"
//               >
//                 <form className="space-y-4 sm:space-y-6" onSubmit={handleBookingSubmit}>

//                   <FreeSessionBanner
//                     hasFreeSession={hasFreeSession}
//                     freeSessionUsed={freeSessionUsed}
//                     isLoading={isCheckingSession}
//                     usedSessionDetails={usedSessionDetails}
//                   />

//                   <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex items-start gap-3">
//                       <Video className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-sm font-semibold text-gray-800 mb-1">
//                           Virtual Meeting via Zoom
//                         </p>
//                         <p className="text-xs text-gray-600">{zoomNote}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className={
//                       "rounded-lg p-3 border flex items-center justify-between " +
//                       (hasFreeSession ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200")
//                     }
//                   >
//                     <span className="text-xs font-semibold text-gray-600">Session Price</span>
//                     <span className={"text-sm font-bold " + (hasFreeSession ? "text-green-700" : "text-gray-900")}>
//                       {priceLabel}
//                     </span>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//                       <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0098cc] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
//                         1
//                       </div>
//                       <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                         Session Details
//                       </h3>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Session Date
//                         </label>
//                         <div className="relative">
//                           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <input
//                             type="date"
//                             name="date"
//                             value={bookingData.date}
//                             onChange={(e) => {
//                               handleInputChange(e);
//                               setBookingData((prev) => ({ ...prev, time: "" }));
//                             }}
//                             min={new Date().toISOString().split("T")[0]}
//                             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Time Slot
//                         </label>
//                         {bookingData.date ? (
//                           availableSlots === null ? (
//                             <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-center text-xs text-amber-700">
//                               No slots available for this day
//                             </div>
//                           ) : (
//                             <select
//                               name="time"
//                               value={bookingData.time}
//                               onChange={handleInputChange}
//                               className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] bg-white"
//                             >
//                               <option value="">Choose time</option>
//                               {availableSlots.map((slot, idx) => (
//                                 <option key={idx} value={slot.display}>
//                                   {slot.display}
//                                 </option>
//                               ))}
//                             </select>
//                           )
//                         ) : (
//                           <div className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50 text-gray-400">
//                             Select date first
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Duration
//                         </label>
//                         <div className="relative">
//                           <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <select
//                             name="duration"
//                             value={bookingData.duration}
//                             onChange={handleInputChange}
//                             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] bg-white appearance-none"
//                           >
//                             {hasFreeSession ? (
//                               <option value="30">30 min - FREE</option>
//                             ) : (
//                               <>
//                                 <option value="30">30 minutes</option>
//                                 <option value="60">60 minutes</option>
//                                 <option value="90">90 minutes</option>
//                               </>
//                             )}
//                           </select>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Session Type
//                         </label>
//                         <div className="relative">
//                           <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <select
//                             name="sessionType"
//                             value={bookingData.sessionType}
//                             onChange={handleInputChange}
//                             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] bg-white appearance-none"
//                           >
//                             <option>One-on-One</option>
//                             <option>Group Session</option>
//                             <option>Workshop</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-3 sm:mt-4">
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                         Topic to Discuss
//                       </label>
//                       <div className="relative">
//                         <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                         <textarea
//                           name="topic"
//                           value={bookingData.topic}
//                           onChange={handleInputChange}
//                           placeholder="What would you like to discuss?"
//                           rows="3"
//                           className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] resize-none"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isCreatingBooking || isCheckingSession}
//                     className={
//                       (hasFreeSession ? "bg-green-600 hover:bg-green-700" : "bg-[#062117] hover:bg-[#062117]/90") +
//                       " text-white font-semibold py-2.5 sm:py-3 rounded-lg w-full transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     }
//                   >
//                     {isCheckingSession ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         <span>Checking eligibility...</span>
//                       </>
//                     ) : isCreatingBooking ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>{hasFreeSession ? "Confirming Free Session..." : "Creating Booking..."}</span>
//                       </>
//                     ) : hasFreeSession ? (
//                       <>
//                         <span>{submitLabel}</span>
//                       </>
//                     ) : (
//                       <span>{submitLabel}</span>
//                     )}
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



// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   X,
//   Clock,
//   Calendar,
//   MessageSquare,
//   Users,
//   Video,
//   Gift,
//   AlertCircle,
//   CheckCircle2,
//   Sparkles,
//   Loader2,
// } from "lucide-react";
// import { showToast } from "../../../utils/Toastprovider";
// import {
//   useCreateBookingMutation,
//   useCheckFreeSessionEligibilityQuery,
// } from "../../topMentors/Mentorsectionapislice";
// import { useNavigate } from "react-router-dom";

// const BookingSuccessScreen = ({ bookingDetails, mentor, onClose }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9, y: 10 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9, y: 10 }}
//       transition={{ duration: 0.25, ease: "easeOut" }}
//       className="flex flex-col items-center p-6 text-center"
//     >
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 14 }}
//         className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3"
//       >
//         <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={2} />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-4"
//       >
//         <h2 className="text-base font-bold text-gray-900 mb-1">Session Confirmed!</h2>
//         <p className="text-xs text-gray-500 max-w-[220px] mx-auto leading-relaxed">
//           Your free session with{" "}
//           <span className="font-semibold text-gray-800">{mentor?.fullName}</span>{" "}
//           is booked. Check your email for details.
//         </p>
//       </motion.div>

//       <motion.button
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.35 }}
//         onClick={onClose}
//         className="p-6 py-2.5 bg-[#062117] text-white font-semibold rounded-xl hover:bg-[#0a3323] transition-colors text-sm"
//       >
//         Done
//       </motion.button>
//     </motion.div>
//   );
// };

// const FreeSessionBanner = ({ hasFreeSession, freeSessionUsed, isLoading, usedSessionDetails }) => {
//   if (isLoading) {
//     return (
//       <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
//         <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
//         <p className="text-xs text-gray-500">Checking free session eligibility...</p>
//       </div>
//     );
//   }

//   if (hasFreeSession) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4"
//       >
//         <div className="flex items-start gap-3">
//           <Gift className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-bold text-green-800 mb-1">
//               Your First Session is FREE!
//             </p>
//             <p className="text-xs text-green-700">
//               This is your complimentary first session. No payment required. Zoom link sent to your email instantly!
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   if (freeSessionUsed) {
//     const usedDate = usedSessionDetails?.usedAt
//       ? new Date(usedSessionDetails.usedAt).toDateString()
//       : "a previous date";

//     return (
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <div className="flex items-start gap-3">
//           <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-semibold text-blue-800 mb-1">
//               Free Session Already Used
//             </p>
//             <p className="text-xs text-blue-600">
//               {"You used your free session on " + usedDate + ". This booking requires payment."}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

// const BookingModal = ({ mentor, isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [confirmedBooking, setConfirmedBooking] = useState(null);
//   const [confirmedZoom, setConfirmedZoom] = useState(null);

//   const [bookingData, setBookingData] = useState({
//     date: "",
//     time: "",
//     topic: "",
//     duration: "30",
//     name: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     guests: "1",
//     sessionType: "One-on-One",
//     userId: "",
//   });

//   const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

//   const {
//     data: freeSessionData,
//     isLoading: checkingFreeSession,
//     isFetching: fetchingFreeSession,
//   } = useCheckFreeSessionEligibilityQuery(
//     { userId, username, mentorUserId: mentor?.userId || null },
//     {
//       skip: !userId,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   const hasFreeSession = freeSessionData?.hasFreeSession === true;
//   const freeSessionUsed = freeSessionData?.freeSessionUsed === true;
//   const usedSessionDetails = freeSessionData?.usedSessionDetails || null;
//   const isCheckingSession = checkingFreeSession || fetchingFreeSession;

//   useEffect(() => {
//     if (!isOpen) {
//       setBookingSuccess(false);
//       setConfirmedBooking(null);
//       setConfirmedZoom(null);
//       resetForm();
//       return;
//     }

//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       onClose();
//       navigate("/login?redirect=/book-session?mentorId=" + mentor._id);
//       return;
//     }

//     const userData = localStorage.getItem("userData");
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         if (user.email) {
//           setBookingData((prev) => ({
//             ...prev,
//             email: user.email,
//             name: user.name || user.firstName || "",
//             lastName: user.lastName || "",
//             phone: user.phone || "",
//             userId: user._id || user.id || "",
//           }));
//           setUserId(user._id || user.id || "");
//           setUsername(user.username || "");
//         }
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         showToast.error("Failed to load user data. Please log in again.");
//       }
//     }
//   }, [isOpen, mentor, navigate, onClose]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData((prev) => ({ ...prev, [name]: value }));
//   };

//   const generateHourlySlots = (startTime, endTime) => {
//     const slots = [];
//     const [startHour, startMin] = startTime.split(":").map(Number);
//     const [endHour, endMin] = endTime.split(":").map(Number);
//     const startMinutes = startHour * 60 + startMin;
//     const endMinutes = endHour * 60 + endMin;

//     for (let minutes = startMinutes; minutes < endMinutes; minutes += 60) {
//       const slotEndMinutes = Math.min(minutes + 60, endMinutes);
//       const h1 = String(Math.floor(minutes / 60)).padStart(2, "0");
//       const m1 = String(minutes % 60).padStart(2, "0");
//       const h2 = String(Math.floor(slotEndMinutes / 60)).padStart(2, "0");
//       const m2 = String(slotEndMinutes % 60).padStart(2, "0");
//       const slotStart = h1 + ":" + m1;
//       const slotEnd = h2 + ":" + m2;
//       slots.push({ start: slotStart, end: slotEnd, display: slotStart + " - " + slotEnd });
//     }
//     return slots;
//   };

//   const getAvailableSlots = () => {
//     if (!bookingData.date || !mentor.availability) return [];
//     const dayName = new Date(bookingData.date).toLocaleDateString("en-US", { weekday: "long" });
//     const dayAvailability = mentor.availability.find(
//       (d) => d.day.toLowerCase() === dayName.toLowerCase()
//     );
//     if (!dayAvailability?.slots?.length) return null;

//     const allSlots = [];
//     dayAvailability.slots.forEach((slot) => {
//       if (!slot.isBooked) {
//         allSlots.push(...generateHourlySlots(slot.startTime, slot.endTime));
//       }
//     });
//     return allSlots;
//   };

//   const calculateTotalAmount = () => {
//     if (hasFreeSession) return 0;
//     if (bookingData.duration === "30") return mentor.hourlyRate / 2;
//     if (bookingData.duration === "60") return mentor.hourlyRate;
//     return mentor.hourlyRate * 1.5;
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();

//     if (!bookingData.date)          { showToast.error("Please select a session date.");                    return; }
//     if (!bookingData.time)          { showToast.error("Please select a time slot.");                       return; }
//     if (!bookingData.topic.trim())  { showToast.error("Please enter a topic to discuss.");                 return; }
//     if (!bookingData.sessionType)   { showToast.error("Please select a session type.");                    return; }
//     if (!bookingData.userId)        { showToast.error("User session expired. Please log in again.");       return; }
//     if (!mentor?._id)               { showToast.error("Mentor information is missing.");                   return; }

//     try {
//       const payload = {
//         userId: bookingData.userId,
//         username,
//         mentorUserId: mentor?.userId || null,
//         mentorId: mentor._id,
//         date: bookingData.date,
//         time: bookingData.time,
//         topic: bookingData.topic,
//         duration: Number(bookingData.duration),
//         email: bookingData.email,
//         menteeEmail: mentor.email,
//         name: bookingData.name,
//         lastName: bookingData.lastName,
//         phone: bookingData.phone,
//         guests: bookingData.guests,
//         sessionType: bookingData.sessionType,
//         createZoomMeeting: true,
//       };

//       const response = await createBooking(payload).unwrap();
//       console.log("Booking response:", response);

//       if (response.isFreeSession === true) {
//         setConfirmedBooking({ ...bookingData });
//         setConfirmedZoom(response.zoomMeeting || null);
//         setBookingSuccess(true);
//         showToast.success("Free session booked! Check your email for the Zoom link.");
//       } else {
//         navigate("/payment", {
//           state: {
//             bookingId: response.bookingId || response.data?._id,
//             mentorId: mentor._id,
//             mentorName: mentor.fullName,
//             paymentAmount: calculateTotalAmount(),
//             bookingDetails: { ...bookingData },
//             mentorDetails: {
//               fullName: mentor.fullName,
//               email: mentor.email,
//               _id: mentor._id,
//               profileImage: mentor.profileImage,
//               currentRole: mentor.currentRole,
//             },
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Booking creation failed:", error);
//       const message =
//         error?.data?.message ||
//         error?.data?.error ||
//         error?.message ||
//         error?.error ||
//         "Failed to create booking. Please try again.";
//       showToast.error(message);
//     }
//   };

//   const resetForm = () => {
//     setBookingData({
//       date: "",
//       time: "",
//       topic: "",
//       duration: "30",
//       name: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       guests: "1",
//       sessionType: "One-on-One",
//       userId: "",
//     });
//   };

//   const handleClose = () => {
//     setBookingSuccess(false);
//     setConfirmedBooking(null);
//     setConfirmedZoom(null);
//     resetForm();
//     onClose();
//   };

//   if (!isOpen) return null;

//   const availableSlots = getAvailableSlots();
//   const priceLabel = isCheckingSession ? "..." : hasFreeSession ? "FREE" : "Rs." + calculateTotalAmount();
//   const submitLabel = hasFreeSession ? "Confirm Free Session" : "Proceed to Payment - Rs." + calculateTotalAmount();
//   const zoomNote = hasFreeSession
//     ? "A Zoom link will be created instantly and sent to your email."
//     : "A Zoom link will be created after payment confirmation.";

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           className="bg-white rounded-lg sm:rounded-xl max-w-4xl my-4 sm:my-8 relative overflow-hidden"
//         >
//           <button
//             className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-700 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
//             onClick={handleClose}
//           >
//             <X size={20} />
//           </button>

//           <AnimatePresence mode="wait">
//             {bookingSuccess ? (
//               <BookingSuccessScreen
//                 key="success"
//                 bookingDetails={confirmedBooking}
//                 mentor={mentor}
//                 zoomMeeting={confirmedZoom}
//                 onClose={handleClose}
//               />
//             ) : (
//               <motion.div
//                 key="form"
//                 initial={{ opacity: 1 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.2 }}
//                 className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[85vh]"
//               >
//                 <form className="space-y-4 sm:space-y-6" onSubmit={handleBookingSubmit}>

//                   <FreeSessionBanner
//                     hasFreeSession={hasFreeSession}
//                     freeSessionUsed={freeSessionUsed}
//                     isLoading={isCheckingSession}
//                     usedSessionDetails={usedSessionDetails}
//                   />

//                   {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex items-start gap-3">
//                       <Video className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-sm font-semibold text-gray-800 mb-1">
//                           Virtual Meeting via Zoom
//                         </p>
//                         <p className="text-xs text-gray-600">{zoomNote}</p>
//                       </div>
//                     </div>
//                   </div> */}

//                   <div
//                     className={
//                       "rounded-lg p-3 border flex items-center justify-between " +
//                       (hasFreeSession ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200")
//                     }
//                   >
//                     <span className="text-xs font-semibold text-gray-600">Session Price</span>
//                     <span className={"text-sm font-bold " + (hasFreeSession ? "text-green-700" : "text-gray-900")}>
//                       {priceLabel}
//                     </span>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//                       <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0098cc] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
//                         1
//                       </div>
//                       <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                         Session Details
//                       </h3>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Session Date
//                         </label>
//                         <div className="relative">
//                           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <input
//                             type="date"
//                             name="date"
//                             value={bookingData.date}
//                             onChange={(e) => {
//                               handleInputChange(e);
//                               setBookingData((prev) => ({ ...prev, time: "" }));
//                             }}
//                             min={new Date().toISOString().split("T")[0]}
//                             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Time Slot
//                         </label>
//                         {bookingData.date ? (
//                           availableSlots === null ? (
//                             <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-center text-xs text-amber-700">
//                               No slots available for this day
//                             </div>
//                           ) : (
//                             <select
//                               name="time"
//                               value={bookingData.time}
//                               onChange={handleInputChange}
//                               className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] bg-white"
//                             >
//                               <option value="">Choose time</option>
//                               {availableSlots.map((slot, idx) => (
//                                 <option key={idx} value={slot.display}>
//                                   {slot.display}
//                                 </option>
//                               ))}
//                             </select>
//                           )
//                         ) : (
//                           <div className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50 text-gray-400">
//                             Select date first
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Duration
//                         </label>
//                         <div className="relative">
//                           <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <select
//                             name="duration"
//                             value={bookingData.duration}
//                             onChange={handleInputChange}
//                             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] bg-white appearance-none"
//                           >
//                             {hasFreeSession ? (
//                               <option value="30">30 min - FREE</option>
//                             ) : (
//                               <>
//                                 <option value="30">30 minutes</option>
//                                 <option value="60">60 minutes</option>
//                                 <option value="90">90 minutes</option>
//                               </>
//                             )}
//                           </select>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                           Session Type
//                         </label>
//                         <div className="relative">
//                           <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <select
//                             name="sessionType"
//                             value={bookingData.sessionType}
//                             onChange={handleInputChange}
//                             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] bg-white appearance-none"
//                           >
//                             <option>One-on-One</option>
//                             <option>Group Session</option>
//                             <option>Workshop</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-3 sm:mt-4">
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                         Topic to Discuss
//                       </label>
//                       <div className="relative">
//                         <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                         <textarea
//                           name="topic"
//                           value={bookingData.topic}
//                           onChange={handleInputChange}
//                           placeholder="What would you like to discuss?"
//                           rows="3"
//                           className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] resize-none"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isCreatingBooking || isCheckingSession}
//                     className={
//                       (hasFreeSession ? "bg-green-600 hover:bg-green-700" : "bg-[#062117] hover:bg-[#062117]/90") +
//                       " text-white font-semibold py-2.5 sm:py-3 rounded-lg w-full transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     }
//                   >
//                     {isCheckingSession ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         <span>Checking eligibility...</span>
//                       </>
//                     ) : isCreatingBooking ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>{hasFreeSession ? "Confirming Free Session..." : "Creating Booking..."}</span>
//                       </>
//                     ) : (
//                       <span>{submitLabel}</span>
//                     )}
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
  Users,
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
    className="flex flex-col items-center justify-center p-8 text-center h-full"
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
        Your free session with{" "}
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
const FreeSessionBanner = ({ hasFreeSession, freeSessionUsed, isLoading, usedSessionDetails }) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 flex-shrink-0" />
        <p className="text-xs text-gray-500">Checking free session eligibility…</p>
      </div>
    );
  }
  if (hasFreeSession) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg px-3 py-2.5 flex items-center gap-2.5"
      >
        <Gift className="w-4 h-4 text-green-600 flex-shrink-0" />
        <div>
          <p className="text-xs font-bold text-green-800 leading-tight">Your First Session is FREE!</p>
          <p className="text-[11px] text-green-700 leading-tight mt-0.5">No payment required. Zoom link sent instantly.</p>
        </div>
      </motion.div>
    );
  }
  if (freeSessionUsed) {
    const usedDate = usedSessionDetails?.usedAt
      ? new Date(usedSessionDetails.usedAt).toDateString()
      : "a previous date";
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-blue-800 leading-tight">Free Session Already Used</p>
          <p className="text-[11px] text-blue-600 leading-tight mt-0.5">Used on {usedDate}. This booking requires payment.</p>
        </div>
      </div>
    );
  }
  return null;
};

/* ─────────────────────────── Main Modal ─────────────────────────── */
const BookingModal = ({ mentor, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [confirmedZoom, setConfirmedZoom] = useState(null);

  const [bookingData, setBookingData] = useState({
    date: "", time: "", topic: "", duration: "30",
    name: "", lastName: "", email: "", phone: "",
    guests: "1", sessionType: "One-on-One", userId: "",
  });

  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

  const {
    data: freeSessionData,
    isLoading: checkingFreeSession,
    isFetching: fetchingFreeSession,
  } = useCheckFreeSessionEligibilityQuery(
    { userId, username, mentorUserId: mentor?.userId || null },
    { skip: !userId, refetchOnMountOrArgChange: true }
  );

  const hasFreeSession    = freeSessionData?.hasFreeSession === true;
  const freeSessionUsed   = freeSessionData?.freeSessionUsed === true;
  const usedSessionDetails = freeSessionData?.usedSessionDetails || null;
  const isCheckingSession = checkingFreeSession || fetchingFreeSession;

  /* ── Initialise on open ── */
  useEffect(() => {
    if (!isOpen) { setBookingSuccess(false); setConfirmedBooking(null); setConfirmedZoom(null); resetForm(); return; }
    const authToken = localStorage.getItem("authToken");
    if (!authToken) { onClose(); navigate("/login?redirect=/book-session?mentorId=" + mentor._id); return; }
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.email) {
          setBookingData(prev => ({ ...prev, email: user.email, name: user.name || user.firstName || "", lastName: user.lastName || "", phone: user.phone || "", userId: user._id || user.id || "" }));
          setUserId(user._id || user.id || "");
          setUsername(user.username || "");
        }
      } catch { showToast.error("Failed to load user data. Please log in again."); }
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  /* ── Slot helpers ── */
  const generateHourlySlots = (startTime, endTime) => {
    const slots = [];
    const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
    const toStr = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
    let cur = toMin(startTime);
    const end = toMin(endTime);
    while (cur < end) {
      const next = Math.min(cur + 60, end);
      slots.push({ start: toStr(cur), end: toStr(next), display: toStr(cur) + " - " + toStr(next) });
      cur = next;
    }
    return slots;
  };

  const getAvailableSlots = () => {
    if (!bookingData.date || !mentor.availability) return [];
    const dayName = new Date(bookingData.date).toLocaleDateString("en-US", { weekday: "long" });
    const dayAvail = mentor.availability.find(d => d.day.toLowerCase() === dayName.toLowerCase());
    if (!dayAvail?.slots?.length) return null;
    const all = [];
    dayAvail.slots.forEach(slot => { if (!slot.isBooked) all.push(...generateHourlySlots(slot.startTime, slot.endTime)); });
    return all;
  };

  const calculateTotalAmount = () => {
    if (hasFreeSession) return 0;
    if (bookingData.duration === "30") return mentor.hourlyRate / 2;
    if (bookingData.duration === "60") return mentor.hourlyRate;
    return mentor.hourlyRate * 1.5;
  };

  /* ── Submit ── */
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.date)         { showToast.error("Please select a session date.");              return; }
    if (!bookingData.time)         { showToast.error("Please select a time slot.");                 return; }
    if (!bookingData.topic.trim()) { showToast.error("Please enter a topic to discuss.");           return; }
    if (!bookingData.sessionType)  { showToast.error("Please select a session type.");              return; }
    if (!bookingData.userId)       { showToast.error("User session expired. Please log in again."); return; }
    if (!mentor?._id)              { showToast.error("Mentor information is missing.");             return; }

    try {
      const payload = {
        userId: bookingData.userId, username, mentorUserId: mentor?.userId || null,
        mentorId: mentor._id, date: bookingData.date, time: bookingData.time,
        topic: bookingData.topic, duration: Number(bookingData.duration),
        email: bookingData.email, menteeEmail: mentor.email,
        name: bookingData.name, lastName: bookingData.lastName,
        phone: bookingData.phone, guests: bookingData.guests,
        sessionType: bookingData.sessionType, createZoomMeeting: true,
      };
      const response = await createBooking(payload).unwrap();

      if (response.isFreeSession === true) {
        setConfirmedBooking({ ...bookingData });
        setConfirmedZoom(response.zoomMeeting || null);
        setBookingSuccess(true);
        showToast.success("Free session booked! Check your email for the Zoom link.");
      } else {
        navigate("/payment", {
          state: {
            bookingId: response.bookingId || response.data?._id,
            mentorId: mentor._id, mentorName: mentor.fullName,
            paymentAmount: calculateTotalAmount(),
            bookingDetails: { ...bookingData },
            mentorDetails: { fullName: mentor.fullName, email: mentor.email, _id: mentor._id, profileImage: mentor.profileImage, currentRole: mentor.currentRole },
          },
        });
      }
    } catch (error) {
      const message = error?.data?.message || error?.data?.error || error?.message || "Failed to create booking. Please try again.";
      showToast.error(message);
    }
  };

  const resetForm = () => setBookingData({ date: "", time: "", topic: "", duration: "30", name: "", lastName: "", email: "", phone: "", guests: "1", sessionType: "One-on-One", userId: "" });

  const handleClose = () => { setBookingSuccess(false); setConfirmedBooking(null); setConfirmedZoom(null); resetForm(); onClose(); };

  if (!isOpen) return null;

  const availableSlots  = getAvailableSlots();
  const amount          = calculateTotalAmount();
  const priceLabel      = isCheckingSession ? "…" : hasFreeSession ? "FREE" : `Rs. ${amount}`;
  const submitLabel     = hasFreeSession ? "Confirm Free Session" : `Proceed to Payment — Rs. ${amount}`;

  /* ─── shared input classes ─── */
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white placeholder-gray-400 transition";
  const iconInputCls = inputCls + " pl-8";
  const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl w-full max-w-lg relative overflow-hidden"
          style={{ maxHeight: "80vh" }}
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              {mentor?.profileImage && (
                <img src={mentor.profileImage} alt={mentor.fullName} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
              )}
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">{mentor?.fullName}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{mentor?.currentRole || "Mentor"}</p>
              </div>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 transition p-1 rounded-lg hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {bookingSuccess ? (
              <BookingSuccessScreen key="success" mentor={mentor} zoomMeeting={confirmedZoom} onClose={handleClose} />
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
                <form onSubmit={handleBookingSubmit} className="px-5 pt-3 pb-4 flex flex-col gap-3">

                  {/* Free session banner */}
                  <FreeSessionBanner
                    hasFreeSession={hasFreeSession}
                    freeSessionUsed={freeSessionUsed}
                    isLoading={isCheckingSession}
                    usedSessionDetails={usedSessionDetails}
                  />

                  {/* Price pill */}
                  <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${hasFreeSession ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"}`}>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Session Price</span>
                    <span className={`text-sm font-bold ${hasFreeSession ? "text-green-700" : "text-gray-900"}`}>{priceLabel}</span>
                  </div>

                  {/* Row 1 — Date + Time */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                          type="date" name="date" value={bookingData.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => { handleInputChange(e); setBookingData(prev => ({ ...prev, time: "" })); }}
                          className={iconInputCls}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Time Slot</label>
                      {!bookingData.date ? (
                        <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-gray-50 text-gray-400">Select date first</div>
                      ) : availableSlots === null ? (
                        <div className="w-full border border-amber-200 rounded-lg px-3 py-2 text-xs bg-amber-50 text-amber-700 text-center">No slots available</div>
                      ) : (
                        <select name="time" value={bookingData.time} onChange={handleInputChange} className={inputCls}>
                          <option value="">Choose time</option>
                          {availableSlots.map((slot, i) => <option key={i} value={slot.display}>{slot.display}</option>)}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Row 2 — Duration + Session Type */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Duration</label>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <select name="duration" value={bookingData.duration} onChange={handleInputChange} className={iconInputCls + " appearance-none"}>
                          {hasFreeSession ? (
                            <option value="30">30 min — FREE</option>
                          ) : (
                            <>
                              <option value="30">30 minutes</option>
                              <option value="60">60 minutes</option>
                              <option value="90">90 minutes</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Session Type</label>
                      <div className="relative">
                        <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <select name="sessionType" value={bookingData.sessionType} onChange={handleInputChange} className={iconInputCls + " appearance-none"}>
                          <option>One-on-One</option>
                          <option>Group Session</option>
                          <option>Workshop</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Topic */}
                  <div>
                    <label className={labelCls}>Topic to Discuss</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                      <textarea
                        name="topic" value={bookingData.topic} onChange={handleInputChange}
                        placeholder="What would you like to discuss?"
                        rows={2}
                        className={iconInputCls + " resize-none"}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isCreatingBooking || isCheckingSession}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm text-white transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${hasFreeSession ? "bg-green-600 hover:bg-green-700" : "bg-[#062117] hover:bg-[#0a3323]"}`}
                  >
                    {isCheckingSession ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Checking eligibility…</>
                    ) : isCreatingBooking ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {hasFreeSession ? "Confirming…" : "Creating Booking…"}</>
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



