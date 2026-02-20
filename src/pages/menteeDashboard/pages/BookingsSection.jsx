// import React, { useState, useEffect } from "react";
// import { Star, Calendar, X, Clock, Check, Crown, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
// import Cookies from "js-cookie";

// import {
//     useGetMentorsListMutation,
//     useGetSlotsQuery,
//     useBookFreeTrialMutation,
//     useBookPremiumTrialMutation,
// } from "./Bookingsecapislice"



// import { skipToken } from "@reduxjs/toolkit/query";
// import { useNavigate } from "react-router-dom";

// export default function BookingsSection() {
//     const navigate = useNavigate();

//     const [getMentors, { data, isLoading, isError }] = useGetMentorsListMutation();
//     console.log(data, "getmentors")

//     useEffect(() => {
//         const cookieData = Cookies.get("userData");

//         if (cookieData) {
//             const userData = JSON.parse(cookieData);

//             console.log(userData.menteeType, "userData")

//             getMentors({ menteeType: userData.menteeType });
//         }
//     }, []);
//     const mentorsList = Array.isArray(data?.mentors)
//         ? data.mentors
//         : [];

//     const [open, setOpen] = useState(false);
//     const [selectedMentor, setSelectedMentor] = useState(null);
//     const [trialType, setTrialType] = useState("FREE");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedSlot, setSelectedSlot] = useState("");

//     /* ================= SLOTS ================= */
//     const { data: slotsData, isLoading: slotsLoading } = useGetSlotsQuery(
//         selectedMentor && selectedDate
//             ? { mentorId: selectedMentor._id, date: selectedDate }
//             : skipToken
//     );

//     const availableSlots = slotsData?.slots || [];

//     /* ================= MUTATIONS ================= */
//     const [bookFreeTrial, { isLoading: bookingFree }] =
//         useBookFreeTrialMutation();
//     const [bookPremiumTrial, { isLoading: bookingPremium }] =
//         useBookPremiumTrialMutation();

//     /* ================= HELPERS ================= */
//     const generateDates = () => {
//         const dates = [];
//         for (let i = 0; i < 7; i++) {
//             const date = new Date();
//             date.setDate(date.getDate() + i);
//             dates.push({
//                 date: date.toISOString().split("T")[0],
//                 day: date
//                     .toLocaleDateString("en-US", { weekday: "short" })
//                     .toUpperCase(),
//                 displayDate: date.toLocaleDateString("en-US", {
//                     day: "numeric",
//                     month: "short",
//                 }),
//             });
//         }
//         return dates;
//     };

//     const availableDates = generateDates();

//     /* ================= ACTIONS ================= */
//     const handleBookTrial = (mentor) => {
//         setSelectedMentor(mentor);
//         setOpen(true);
//         setSelectedDate("");
//         setSelectedSlot("");
//         setTrialType("FREE");
//     };

//     const handleViewProfile = (mentor) => {
//         navigate(`/mentor-profile/${mentor._id}`);
//     };

//     const submitBooking = async () => {
//         if (!selectedDate || !selectedSlot) {
//             alert("Please select date & time");
//             return;
//         }

//         try {
//             if (trialType === "FREE") {
//                 await bookFreeTrial({
//                     mentorId: selectedMentor._id,
//                     date: selectedDate,
//                     timeSlot: selectedSlot,
//                 }).unwrap();
//                 alert("Free trial booked successfully!");
//             } else {
//                 await bookPremiumTrial({
//                     mentorId: selectedMentor._id,
//                     date: selectedDate,
//                     timeSlot: selectedSlot,
//                     paymentId: "DUMMY_PAYMENT_" + Date.now(),
//                 }).unwrap();
//                 alert("Premium trial booked successfully!");
//             }
//             setOpen(false);
//         } catch (error) {
//             alert(error?.data?.message || "Booking failed, try again");
//         }
//     };

//     /* ================= LOADING & ERROR ================= */
//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-50">
//                 <Loader2 className="w-12 h-12 animate-spin text-gray-900" />
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600">
//                 Error loading mentors
//             </div>
//         );
//     }

//     /* ================= UI ================= */
//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* HEADER */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     viewport={{ once: true }}
//                     className="mb-8"
//                 >
//                     <h1 className="text-2xl md:text-2xl font-bold text-gray-900">
//                         Recommended Mentors for you
//                     </h1>
//                     <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                         You still have free trial sessions available — Book now!
//                     </p>

//                 </motion.div>

//                 {/* EMPTY STATE */}
//                 {mentorsList.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                         No mentors available at the moment
//                     </div>
//                 ) : (
//                     /* TABLE-LIKE CARDS */
//                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead className="bg-gray-50 border-b border-gray-200">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Mentor
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Role & Experience
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Skills & Interests
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Rating
//                                         </th>
//                                         <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Actions
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {mentorsList.map((mentor, index) => {
//                                         const areasArray = mentor.areasOfInterest
//                                             ? mentor.areasOfInterest
//                                                 .split(/[,;]+/)
//                                                 .map((s) => s.trim())
//                                                 .filter(Boolean)
//                                             : [];

//                                         return (
//                                             <motion.tr
//                                                 key={mentor._id}
//                                                 initial={{ opacity: 0, y: 20 }}
//                                                 whileInView={{ opacity: 1, y: 0 }}
//                                                 transition={{ duration: 0.5, delay: index * 0.05 }}
//                                                 viewport={{ once: true }}
//                                                 className="hover:bg-gray-50 transition-colors"
//                                             >
//                                                 {/* MENTOR INFO */}
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="w-12 h-12 bg-[#eff6ff] rounded-lg flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
//                                                             {mentor.fullName?.slice(0, 2).toUpperCase()}
//                                                         </div>

//                                                         <div className="min-w-0">
//                                                             <div className="font-semibold text-gray-900 truncate">
//                                                                 {mentor.fullName}
//                                                             </div>
//                                                             {mentor.companyName && (
//                                                                 <div className="text-xs text-gray-500 truncate">
//                                                                     {mentor.companyName}
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </td>

//                                                 {/* ROLE & EXPERIENCE */}
//                                                 <td className="px-6 py-4">
//                                                     <div className="text-sm text-gray-900 font-medium">
//                                                         {mentor.currentRole}
//                                                     </div>
//                                                     <div className="text-xs text-gray-500 mt-1">
//                                                         {mentor.yearsOfExperience} Years Experience
//                                                     </div>
//                                                 </td>

//                                                 {/* SKILLS & INTERESTS */}
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex flex-wrap gap-1">
//                                                         {areasArray.slice(0, 3).map((area, i) => (
//                                                             <span
//                                                                 key={i}
//                                                                 className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100"
//                                                             >
//                                                                 {area}
//                                                             </span>
//                                                         ))}
//                                                         {areasArray.length > 3 && (
//                                                             <span className="text-xs text-gray-500">
//                                                                 +{areasArray.length - 3} more
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </td>

//                                                 {/* RATING */}
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="flex items-center gap-1">
//                                                         <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                                                         <span className="text-sm font-semibold text-gray-900">
//                                                             5.0
//                                                         </span>
//                                                     </div>
//                                                 </td>

//                                                 {/* ACTIONS */}
//                                                 <td className="px-6 py-4 whitespace-nowrap text-center">
//                                                     <div className="flex items-center justify-center gap-2">
//                                                         <button
//                                                             onClick={() => handleViewProfile(mentor)}
//                                                             className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                                                         >
//                                                             View Profile
//                                                         </button>

//                                                     </div>
//                                                 </td>
//                                             </motion.tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* MODAL - UNCHANGED */}
//             {open && selectedMentor && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
//                         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-900">Select Date and Time</h2>
//                                 <div className="flex items-center gap-2 mt-1">
//                                     <span className="text-sm text-gray-600">Book a trial session with</span>
//                                     <div className="flex items-center gap-2">
//                                         <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                                             {selectedMentor.fullName?.slice(0, 2).toUpperCase()}
//                                         </div>
//                                         <span className="font-semibold text-sm">{selectedMentor.fullName}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={() => setOpen(false)}
//                                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             <div>
//                                 <h3 className="font-bold text-lg mb-3">Choose Your Trial Type</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <button
//                                         onClick={() => setTrialType("FREE")}
//                                         className={`p-4 rounded-xl border-2 transition-all text-left ${trialType === "FREE"
//                                             ? "border-blue-500 bg-blue-50"
//                                             : "border-gray-200 hover:border-gray-300"
//                                             }`}
//                                     >
//                                         <div className="flex items-center justify-between mb-2">
//                                             <div className="flex items-center gap-2">
//                                                 <Clock className="w-5 h-5 text-blue-600" />
//                                                 <span className="font-bold">Free Trial</span>
//                                             </div>
//                                             <span className="text-green-600 font-bold">Free</span>
//                                         </div>
//                                         <div className="space-y-1 text-sm text-gray-600">
//                                             <div className="flex items-center gap-2">
//                                                 <Check className="w-4 h-4 text-green-500" />
//                                                 <span>Basic mentorship session</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <Check className="w-4 h-4 text-green-500" />
//                                                 <span>30 minutes session duration</span>
//                                             </div>
//                                         </div>
//                                     </button>

//                                     <button
//                                         onClick={() => setTrialType("PREMIUM")}
//                                         className={`p-4 rounded-xl border-2 transition-all text-left ${trialType === "PREMIUM"
//                                             ? "border-yellow-500 bg-yellow-50"
//                                             : "border-gray-200 hover:border-gray-300"
//                                             }`}
//                                     >
//                                         <div className="flex items-center justify-between mb-2">
//                                             <div className="flex items-center gap-2">
//                                                 <Crown className="w-5 h-5 text-yellow-600" />
//                                                 <span className="font-bold">Golden Trial</span>
//                                             </div>
//                                             <span className="text-orange-600 font-bold">₹199</span>
//                                         </div>
//                                         <div className="space-y-1 text-sm text-gray-600">
//                                             <div className="flex items-center gap-2">
//                                                 <Check className="w-4 h-4 text-green-500" />
//                                                 <span>100% show up by mentor</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <Check className="w-4 h-4 text-green-500" />
//                                                 <span>Priority Slot within 24hrs</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <Check className="w-4 h-4 text-green-500" />
//                                                 <span>Personalised mentorship plan</span>
//                                             </div>
//                                         </div>
//                                     </button>
//                                 </div>
//                             </div>

//                             <div>
//                                 <h3 className="font-bold text-lg mb-3">Select Date</h3>
//                                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                                     {availableDates.map((dateObj) => (
//                                         <button
//                                             key={dateObj.date}
//                                             onClick={() => {
//                                                 setSelectedDate(dateObj.date);
//                                                 setSelectedSlot("");
//                                             }}
//                                             className={`p-4 rounded-xl border-2 transition-all ${selectedDate === dateObj.date
//                                                 ? "border-blue-500 bg-blue-50"
//                                                 : "border-gray-200 hover:border-gray-300"
//                                                 }`}
//                                         >
//                                             <div className="text-sm text-gray-500 mb-1">{dateObj.day}</div>
//                                             <div className="font-bold text-lg">{dateObj.displayDate}</div>
//                                             <div className={`text-xs mt-1 ${selectedDate === dateObj.date ? "text-green-600" : "text-gray-500"
//                                                 }`}>
//                                                 Available
//                                             </div>
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {selectedDate && (
//                                 <div>
//                                     <h3 className="font-bold text-lg mb-3">Select Time</h3>
//                                     {slotsLoading ? (
//                                         <div className="text-center py-8">
//                                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//                                             <p className="mt-2 text-sm text-gray-600">Loading slots...</p>
//                                         </div>
//                                     ) : availableSlots && availableSlots.length > 0 ? (
//                                         <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
//                                             {availableSlots.map((slot) => (
//                                                 <button
//                                                     key={slot}
//                                                     onClick={() => setSelectedSlot(slot)}
//                                                     className={`py-3 px-2 rounded-lg border-2 transition-all font-medium text-sm ${selectedSlot === slot
//                                                         ? "border-blue-500 bg-blue-500 text-white"
//                                                         : "border-gray-200 hover:border-gray-300"
//                                                         }`}
//                                                 >
//                                                     {slot}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <div className="text-center py-8 text-gray-500">
//                                             No slots available for this date
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {selectedDate && selectedSlot && (
//                                 <div className="bg-gray-50 rounded-xl p-4">
//                                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
//                                         <div className="flex items-center gap-2">
//                                             <Calendar className="w-4 h-4 text-gray-600" />
//                                             <span className="font-medium">
//                                                 {availableDates.find(d => d.date === selectedDate)?.displayDate} 2026
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Clock className="w-4 h-4 text-gray-600" />
//                                             <span className="font-medium">
//                                                 {selectedSlot} to {(() => {
//                                                     const [time, period] = selectedSlot.split(' ');
//                                                     const [hours, minutes] = time.split(':');
//                                                     const endMinutes = parseInt(minutes) + 30;
//                                                     const endHours = endMinutes >= 60 ? parseInt(hours) + 1 : parseInt(hours);
//                                                     const finalMinutes = endMinutes >= 60 ? endMinutes - 60 : endMinutes;
//                                                     return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')} ${period}`;
//                                                 })()}
//                                             </span>
//                                         </div>
//                                         <span className="text-gray-500 text-xs">30min Session</span>
//                                     </div>
//                                 </div>
//                             )}

//                             <button
//                                 onClick={submitBooking}
//                                 disabled={!selectedDate || !selectedSlot || (bookingFree || bookingPremium)}
//                                 className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                             >
//                                 {bookingFree || bookingPremium ? (
//                                     <span className="flex items-center justify-center gap-2">
//                                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                                         Processing...
//                                     </span>
//                                 ) : (
//                                     "Continue →"
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



// import React, { useState, useEffect } from "react";
// import { Star, Calendar, X, Clock, Check, Crown, Loader2, MapPin, Briefcase, Globe } from "lucide-react";
// import { motion } from "framer-motion";
// import Cookies from "js-cookie";
// import {
//     useGetMentorsListMutation,
//     useGetSlotsQuery,
//     useBookFreeTrialMutation,
//     useBookPremiumTrialMutation,
// } from "./Bookingsecapislice";
// import { skipToken } from "@reduxjs/toolkit/query";
// import { useNavigate, useParams } from "react-router-dom";
// import { useFetchMentorByIdQuery } from "../../home/mentorsection/Mentorapislice";


// export default function BookingsSection() {
//     const { mentorId } = useParams();

//     const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

//     const navigate = useNavigate();

//     const [getMentors, { data, isLoading, isError }] = useGetMentorsListMutation();

//     const { data: mentor } = useFetchMentorByIdQuery(mentorId);

//     useEffect(() => {
//         const cookieData = Cookies.get("userData");
//         if (cookieData) {
//             const userData = JSON.parse(cookieData);
//             getMentors({ menteeType: userData.menteeType });
//         }
//     }, []);



//     const handleBookSession = () => {
//         // Check if user is authenticated (same as MentorsSection)
//         const isLoggedIn = !!localStorage.getItem("authToken");

//         if (!isLoggedIn) {
//             // Redirect to login with mentorId (same pattern as MentorsSection)
//             navigate(`/login?mentorId=${mentorId}`);
//             return;
//         }

//         // Open booking modal if logged in
//         setIsBookingModalOpen(true);
//     };


//     /**
//      * API returns: { success: true, data: [...mentors] }
//      * transformResponse returns: response.data  (the array itself)
//      *
//      * We handle all possible shapes defensively:
//      *   data = [...]            → use directly
//      *   data = { mentors: [] } → use data.mentors
//      *   data = { data: [] }    → use data.data
//      */
//     const mentorsList = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.mentors)
//             ? data.mentors
//             : Array.isArray(data?.data)
//                 ? data.data
//                 : [];

//     const [open, setOpen] = useState(false);
//     const [selectedMentor, setSelectedMentor] = useState(null);
//     const [trialType, setTrialType] = useState("FREE");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedSlot, setSelectedSlot] = useState("");

//     const { data: slotsData, isLoading: slotsLoading } = useGetSlotsQuery(
//         selectedMentor && selectedDate
//             ? { mentorId: selectedMentor._id, date: selectedDate }
//             : skipToken
//     );

//     const availableSlots = slotsData?.slots || [];

//     const [bookFreeTrial, { isLoading: bookingFree }] = useBookFreeTrialMutation();
//     const [bookPremiumTrial, { isLoading: bookingPremium }] = useBookPremiumTrialMutation();

//     const generateDates = () => {
//         const dates = [];
//         for (let i = 0; i < 7; i++) {
//             const date = new Date();
//             date.setDate(date.getDate() + i);
//             dates.push({
//                 date: date.toISOString().split("T")[0],
//                 day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
//                 displayDate: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
//             });
//         }
//         return dates;
//     };
//     const availableDates = generateDates();

//     const handleBookTrial = (mentor) => {
//         setSelectedMentor(mentor);
//         setOpen(true);
//         setSelectedDate("");
//         setSelectedSlot("");
//         setTrialType("FREE");
//     };

//     const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor._id}`);

//     const submitBooking = async () => {
//         if (!selectedDate || !selectedSlot) { alert("Please select date & time"); return; }
//         try {
//             if (trialType === "FREE") {
//                 await bookFreeTrial({ mentorId: selectedMentor._id, date: selectedDate, timeSlot: selectedSlot }).unwrap();
//                 alert("Free trial booked successfully!");
//             } else {
//                 await bookPremiumTrial({ mentorId: selectedMentor._id, date: selectedDate, timeSlot: selectedSlot, paymentId: "DUMMY_PAYMENT_" + Date.now() }).unwrap();
//                 alert("Premium trial booked successfully!");
//             }
//             setOpen(false);
//         } catch (error) {
//             alert(error?.data?.message || "Booking failed, try again");
//         }
//     };

//     const getInitials = (name = "") =>
//         name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

//     const parseAreas = (str = "") =>
//         str.split(/[,;]+/).map((s) => s.trim()).filter(Boolean);

//     const statusStyle = (status) =>
//         status === "approved" ? "bg-green-100 text-green-700"
//             : status === "pending" ? "bg-yellow-100 text-yellow-700"
//                 : "bg-gray-100 text-gray-500";

//     const avatarColors = [
//         "bg-indigo-100 text-indigo-700",
//         "bg-purple-100 text-purple-700",
//         "bg-pink-100 text-pink-700",
//         "bg-blue-100 text-blue-700",
//         "bg-teal-100 text-teal-700",
//     ];

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-50">
//                 <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600 font-medium">
//                 Error loading mentors. Please try again.
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">

//                 {/* HEADER */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="mb-8"
//                 >
//                     <h1 className="text-2xl font-bold text-gray-900">Recommended Mentors for you</h1>
//                     <p className="text-sm text-gray-500 mt-1">
//                         You still have free trial sessions available — Book now!
//                     </p>
//                 </motion.div>

//                 {mentorsList.length === 0 ? (
//                     <div className="text-center py-20 text-gray-400">
//                         <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-40" />
//                         <p className="text-lg font-medium">No mentors available at the moment</p>
//                     </div>
//                 ) : (
//                     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead className="bg-gray-50 border-b border-gray-200">
//                                     <tr>
//                                         {["Mentor", "Role & Company", "Experience", "Areas of Interest", "Style", "Rate", "Status", "Actions"].map((h) => (
//                                             <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                                                 {h}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-100">
//                                     {mentorsList.map((mentor, index) => {
//                                         const areas = parseAreas(mentor.areasOfInterest);
//                                         const initials = getInitials(mentor.fullName);
//                                         const avatarClass = avatarColors[index % avatarColors.length];

//                                         return (
//                                             <motion.tr
//                                                 key={mentor._id}
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 transition={{ duration: 0.3, delay: index * 0.06 }}
//                                                 className="hover:bg-indigo-50/30 transition-colors"
//                                             >
//                                                 {/* MENTOR */}
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex items-center gap-3">
//                                                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${avatarClass}`}>
//                                                             {initials}
//                                                         </div>
//                                                         <div className="min-w-0">
//                                                             <p className="font-semibold text-gray-900 text-sm truncate">{mentor.fullName}</p>
//                                                             {mentor.location && (
//                                                                 <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
//                                                                     <MapPin className="w-3 h-3 flex-shrink-0" />
//                                                                     {mentor.location}
//                                                                 </p>
//                                                             )}
//                                                             {mentor.languages?.length > 0 && (
//                                                                 <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
//                                                                     <Globe className="w-3 h-3 flex-shrink-0" />
//                                                                     {mentor.languages.join(", ")}
//                                                                 </p>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </td>

//                                                 {/* ROLE & COMPANY */}
//                                                 <td className="px-6 py-4">
//                                                     <p className="text-sm font-medium text-gray-900">{mentor.currentRole || "—"}</p>
//                                                     {mentor.companyName && (
//                                                         <p className="text-xs text-gray-500 mt-0.5">{mentor.companyName}</p>
//                                                     )}
//                                                 </td>

//                                                 {/* EXPERIENCE */}
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="flex items-center gap-1.5">
//                                                         <Briefcase className="w-4 h-4 text-gray-400" />
//                                                         <span className="text-sm text-gray-700">
//                                                             {mentor.yearsOfExperience != null ? `${mentor.yearsOfExperience} yr${mentor.yearsOfExperience !== 1 ? "s" : ""}` : "—"}
//                                                         </span>
//                                                     </div>
//                                                     {mentor.mentorCategory && (
//                                                         <p className="text-xs text-gray-400 mt-0.5">{mentor.mentorCategory}</p>
//                                                     )}
//                                                 </td>

//                                                 {/* AREAS OF INTEREST */}
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex flex-wrap gap-1">
//                                                         {areas.length > 0 ? (
//                                                             <>
//                                                                 {areas.slice(0, 3).map((area, i) => (
//                                                                     <span key={i} className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
//                                                                         {area}
//                                                                     </span>
//                                                                 ))}
//                                                                 {areas.length > 3 && (
//                                                                     <span className="text-xs text-gray-400">+{areas.length - 3} more</span>
//                                                                 )}
//                                                             </>
//                                                         ) : <span className="text-xs text-gray-400">—</span>}
//                                                     </div>
//                                                 </td>

//                                                 {/* MENTORING STYLE */}
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span className="text-sm text-gray-700">{mentor.mentoringStyle || "—"}</span>
//                                                 </td>

//                                                 {/* HOURLY RATE */}
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span className="text-sm font-semibold text-gray-800">
//                                                         {mentor.hourlyRate != null ? `₹${mentor.hourlyRate}/hr` : "—"}
//                                                     </span>
//                                                 </td>

//                                                 {/* STATUS */}
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyle(mentor.status)}`}>
//                                                         {mentor.status || "—"}
//                                                     </span>
//                                                 </td>

//                                                 {/* ACTIONS */}
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="flex items-center justify-center gap-2">
//                                                         <button
//                                                             onClick={() => handleViewProfile(mentor)}
//                                                             className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                                                         >
//                                                             Profile
//                                                         </button>
//                                                         {mentor.status === "approved" && mentor.isActive && (
//                                                             <button
//                                                                 onClick={() => handleBookSession(mentor)}
//                                                                 className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
//                                                             >
//                                                                 Book Trial
//                                                             </button>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                             </motion.tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>

//                         <div className="px-6 py-3 bg-gray-50 border-t text-xs text-gray-400">
//                             Showing {mentorsList.length} mentor{mentorsList.length !== 1 ? "s" : ""}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {mentor && (
//                 <BookingModal
//                     mentor={mentor}
//                     isOpen={isBookingModalOpen}
//                     onClose={handleCloseBookingModal}
//                 />
//             )}

//         </div>


//     );
// }


import React, { useState, useEffect } from "react";
import { Loader2, MapPin, Briefcase, Globe, Search, ChevronRight, Users, TrendingUp, Award, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useGetMentorsListMutation } from "./Bookingsecapislice";
import { useNavigate, useParams } from "react-router-dom";

// ─── helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const parseAreas = (str = "") =>
  str.split(/[,;]+/).map((s) => s.trim()).filter(Boolean);

// original avatar colors from the code
const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100   text-pink-700",
  "bg-blue-100   text-blue-700",
  "bg-teal-100   text-teal-700",
];

// original status styles from the code
const statusStyle = (status) =>
  status === "approved"
    ? "bg-green-100 text-green-700"
    : status === "pending"
    ? "bg-yellow-100 text-yellow-700"
    : "bg-gray-100 text-gray-500";

const statusDot = (status) =>
  status === "approved"
    ? "bg-green-500"
    : status === "pending"
    ? "bg-yellow-500"
    : "bg-gray-400";

// ─── MentorCard  (mobile / tablet) ───────────────────────────────────────────
function MentorCard({ mentor, index, onViewProfile, onBookSession }) {
  const areas     = parseAreas(mentor.areasOfInterest);
  const initials  = getInitials(mentor.fullName);
  const avatarCls = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const canBook   = mentor.status === "approved" && mentor.isActive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
    >
      {/* top row */}
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${avatarCls}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{mentor.fullName}</p>
          <p className="text-xs text-indigo-600 font-medium truncate mt-0.5">{mentor.currentRole || "—"}</p>
          {mentor.companyName && (
            <p className="text-xs text-gray-400 truncate">{mentor.companyName}</p>
          )}
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusStyle(mentor.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(mentor.status)}`} />
          {mentor.status || "—"}
        </span>
      </div>

      {/* meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400">
        {mentor.location && (
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{mentor.location}</span>
        )}
        {mentor.yearsOfExperience != null && (
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{mentor.yearsOfExperience} yrs exp</span>
        )}
        {mentor.languages?.length > 0 && (
          <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{mentor.languages.join(", ")}</span>
        )}
        {mentor.hourlyRate != null && (
          <span className="ml-auto text-sm font-bold text-gray-800">₹{mentor.hourlyRate}/hr</span>
        )}
      </div>

      {/* areas */}
      {areas.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {areas.slice(0, 4).map((a, i) => (
            <span key={i} className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              {a}
            </span>
          ))}
          {areas.length > 4 && (
            <span className="text-xs text-gray-400 self-center">+{areas.length - 4} more</span>
          )}
        </div>
      )}

      {/* style */}
      {mentor.mentoringStyle && (
        <p className="text-xs text-gray-400">
          Style: <span className="text-gray-600 font-medium">{mentor.mentoringStyle}</span>
        </p>
      )}

      {/* actions */}
      <div className="flex gap-2 pt-1 border-t border-gray-100">
        <button
          onClick={() => onViewProfile(mentor)}
          className="flex-1 py-2 text-xs font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          View Profile
        </button>
        {canBook ? (
          <button
            onClick={() => onBookSession(mentor)}
            className="flex-1 py-2 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
          >
            Book Trial <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex-1 py-2 text-xs font-medium rounded-md bg-gray-100 text-gray-400 text-center cursor-not-allowed">
            Unavailable
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function BookingsSection() {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [getMentors, { data, isLoading, isError }] = useGetMentorsListMutation();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const cookieData = Cookies.get("userData");
    if (cookieData) {
      const userData = JSON.parse(cookieData);
      getMentors({ menteeType: userData.menteeType });
    }
  }, []);

  const mentorsList = Array.isArray(data)
    ? data
    : Array.isArray(data?.mentors)
    ? data.mentors
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const filtered = mentorsList.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      m.fullName?.toLowerCase().includes(q) ||
      m.currentRole?.toLowerCase().includes(q) ||
      m.companyName?.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const approvedCount = mentorsList.filter((m) => m.status === "approved").length;
  const activeCount   = mentorsList.filter((m) => m.isActive).length;

  const handleBookSession = (mentor) => {
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate(`/login?mentorId=${mentor._id}`);
    } else {
      navigate(`/book-session?mentorId=${mentor._id}`);
    }
  };

  const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor._id}`);

  // ── loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          <p className="text-sm text-gray-400 animate-pulse">Loading mentors…</p>
        </div>
      </div>
    );
  }

  // ── error ─────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-2 p-8">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto">
            <TrendingUp className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-gray-800 font-semibold">Failed to load mentors</p>
          <p className="text-gray-400 text-sm">Please refresh and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1 h-5 rounded-full bg-indigo-600" />
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Mentor Discovery</p>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Recommended Mentors for You</h1>
          <p className="text-sm text-gray-500 mt-1">
            You still have free trial sessions available — Book now!
          </p>
        </motion.div>

        {/* ── STAT CARDS ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { icon: Users,      label: "Total Mentors",    value: mentorsList.length, bg: "bg-indigo-50",  icon_color: "text-indigo-600"  },
            { icon: Award,      label: "Approved",         value: approvedCount,      bg: "bg-green-50",   icon_color: "text-green-600"   },
            { icon: TrendingUp, label: "Currently Active", value: activeCount,        bg: "bg-blue-50",    icon_color: "text-blue-600"    },
            { icon: Star,       label: "Filtered Results", value: filtered.length,    bg: "bg-purple-50",  icon_color: "text-purple-600"  },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07 }}
              className="bg-white border border-gray-200 rounded-xl p-4 lg:p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.icon_color}`} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider leading-none">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 leading-none">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── SEARCH + FILTERS ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role or company…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          <div className="flex gap-2">
            {["all", "approved", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold capitalize transition-all border whitespace-nowrap ${
                  filterStatus === f
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {f === "all" ? "All Mentors" : f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── EMPTY STATE ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {filtered.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-indigo-300" />
              </div>
              <div className="text-center">
                <p className="text-gray-700 font-semibold">No mentors found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
              <button
                onClick={() => { setSearch(""); setFilterStatus("all"); }}
                className="text-xs text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length > 0 && (
          <>
            {/* ── MOBILE / TABLET: CARDS (< lg) ─────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
              {filtered.map((mentor, index) => (
                <MentorCard
                  key={mentor._id}
                  mentor={mentor}
                  index={index}
                  onViewProfile={handleViewProfile}
                  onBookSession={handleBookSession}
                />
              ))}
            </div>

            {/* ── DESKTOP: TABLE (≥ lg) ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["Mentor", "Role & Company", "Experience", "Areas of Interest", "Style", "Rate", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((mentor, index) => {
                      const areas     = parseAreas(mentor.areasOfInterest);
                      const initials  = getInitials(mentor.fullName);
                      const avatarCls = AVATAR_COLORS[index % AVATAR_COLORS.length];
                      const canBook   = mentor.status === "approved" && mentor.isActive;

                      return (
                        <motion.tr
                          key={mentor._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-indigo-50/30 transition-colors group"
                        >
                          {/* MENTOR */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${avatarCls}`}>
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate max-w-[140px] group-hover:text-indigo-700 transition-colors">
                                  {mentor.fullName}
                                </p>
                                {mentor.location && (
                                  <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                    <MapPin className="w-3 h-3 shrink-0" />{mentor.location}
                                  </p>
                                )}
                                {mentor.languages?.length > 0 && (
                                  <p className="flex items-center gap-1 text-xs text-gray-400">
                                    <Globe className="w-3 h-3 shrink-0" />{mentor.languages.join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* ROLE */}
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">{mentor.currentRole || "—"}</p>
                            {mentor.companyName && (
                              <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[160px]">{mentor.companyName}</p>
                            )}
                          </td>

                          {/* EXPERIENCE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">
                                {mentor.yearsOfExperience != null
                                  ? `${mentor.yearsOfExperience} yr${mentor.yearsOfExperience !== 1 ? "s" : ""}`
                                  : "—"}
                              </span>
                            </div>
                            {mentor.mentorCategory && (
                              <p className="text-xs text-gray-400 mt-0.5">{mentor.mentorCategory}</p>
                            )}
                          </td>

                          {/* AREAS */}
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {areas.length > 0 ? (
                                <>
                                  {areas.slice(0, 3).map((a, i) => (
                                    <span key={i} className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                      {a}
                                    </span>
                                  ))}
                                  {areas.length > 3 && (
                                    <span className="text-xs text-gray-400 self-center">+{areas.length - 3} more</span>
                                  )}
                                </>
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </div>
                          </td>

                          {/* STYLE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{mentor.mentoringStyle || "—"}</span>
                          </td>

                          {/* RATE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {mentor.hourlyRate != null ? (
                              <span className="text-sm font-semibold text-gray-800">
                                ₹{mentor.hourlyRate}
                                <span className="text-gray-400 font-normal text-xs">/hr</span>
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>

                          {/* STATUS */}
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle(mentor.status)}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusDot(mentor.status)} ${mentor.status === "approved" ? "animate-pulse" : ""}`} />
                              {mentor.status || "—"}
                            </span>
                          </td> */}

                          {/* ACTIONS */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewProfile(mentor)}
                                className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors"
                              >
                                Profile
                              </button>
                              {canBook ? (
                                <button
                                  onClick={() => handleBookSession(mentor)}
                                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1"
                                >
                                  Book Trial
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              ) : (
                                <span className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">
                                  Unavailable
                                </span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* table footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Showing{" "}
                  <span className="text-gray-700 font-semibold">{filtered.length}</span>
                  {" "}of{" "}
                  <span className="text-gray-700 font-semibold">{mentorsList.length}</span>
                  {" "}mentor{mentorsList.length !== 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-400">Live data</span>
                </div>
              </div>
            </motion.div>

            {/* mobile footer */}
            <p className="lg:hidden text-xs text-gray-400 text-center">
              Showing {filtered.length} of {mentorsList.length} mentor{mentorsList.length !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
}






