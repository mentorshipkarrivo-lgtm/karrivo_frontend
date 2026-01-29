// // import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, X, Clock, Calendar, Loader2 } from "lucide-react";
// import { useFetchMentorByIdQuery } from "./mentorsectionapislice";

// const ProfileModal = ({ mentorId, isOpen, onClose, onBookSession }) => {
//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId, {
//     skip: !isOpen || !mentorId,
//   });

//   if (!isOpen) return null;

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
//         <div className="bg-white rounded-2xl p-8 text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#0098cc] mx-auto mb-4" />
//           <p className="text-[#062117]">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !mentor) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
//         <div className="bg-white rounded-2xl p-8 text-center">
//           <p className="text-red-500 mb-4">Failed to load profile</p>
//           <button onClick={onClose} className="bg-[#0098cc] text-white px-6 py-2 rounded-lg">
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const skillsArray = mentor.currentSkills
//     ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
//     : [];

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//         >
//           <div className="relative">
//             <div className="h-32 bg-gradient-to-r from-[#0098cc] to-[#007fa3]" />
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//             <div className="absolute bottom-0 left-8 transform translate-y-1/2">
//               <img
//                 src={mentor.profileImage || "https://via.placeholder.com/150"}
//                 alt={mentor.fullName}
//                 className="w-32 h-32 rounded-full border-4 border-white object-cover"
//               />
//             </div>
//           </div>

//           <div className="p-8 pt-20">
//             <div className="mb-6">
//               <h2 className="text-3xl font-bold text-[#062117] mb-2">{mentor.fullName}</h2>
//               <p className="text-lg text-[#0098cc] font-semibold mb-3">{mentor.currentRole}</p>
//               <p className="text-[#062117]/70">{mentor.bio || "Experienced mentor passionate about helping others grow."}</p>
//             </div>

//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <div className="text-center p-4 bg-gradient-to-br from-[#0098cc]/10 to-[#007fa3]/10 rounded-lg">
//                 <div className="text-2xl font-bold text-[#0098cc]">{mentor.yearsOfExperience}+</div>
//                 <div className="text-sm text-[#062117]/70">Years Exp</div>
//               </div>
//               <div className="text-center p-4 bg-gradient-to-br from-[#0098cc]/10 to-[#007fa3]/10 rounded-lg">
//                 <div className="flex items-center justify-center gap-1">
//                   <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                   <span className="text-2xl font-bold text-[#0098cc]">5.0</span>
//                 </div>
//                 <div className="text-sm text-[#062117]/70">Rating</div>
//               </div>
//               <div className="text-center p-4 bg-gradient-to-br from-[#0098cc]/10 to-[#007fa3]/10 rounded-lg">
//                 <div className="text-2xl font-bold text-[#0098cc]">₹{mentor.hourlyRate}</div>
//                 <div className="text-sm text-[#062117]/70">Per Hour</div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-xl font-bold text-[#062117] mb-3 flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-[#0098cc]" />
//                 Weekly Availability
//               </h3>

//               {mentor.availability && Array.isArray(mentor.availability) && mentor.availability.some(day => day.slots && day.slots.length > 0) ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {mentor.availability
//                     .filter(day => day.slots && day.slots.length > 0)
//                     .map((dayData, index) => (
//                       <div key={index} className="border border-[#0098cc]/30 rounded-lg p-3 bg-gradient-to-br from-[#0098cc]/5 to-[#007fa3]/5">
//                         <h4 className="font-bold text-[#062117] mb-2 flex items-center gap-2">
//                           <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
//                           {dayData.day}
//                         </h4>
//                         <div className="space-y-2">
//                           {dayData.slots.map((slot, slotIndex) => (
//                             <div key={slotIndex} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#0098cc]/20">
//                               <div className="flex items-center gap-2">
//                                 <Clock size={14} className="text-[#0098cc]" />
//                                 <span className="text-sm font-semibold text-[#062117]">
//                                   {slot.startTime} - {slot.endTime}
//                                 </span>
//                               </div>
//                               {slot.isBooked && (
//                                 <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
//                                   Booked
//                                 </span>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               ) : (
//                 <div className="text-center p-6 bg-amber-50 border border-amber-200 rounded-lg">
//                   <Clock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
//                   <p className="text-amber-700 font-medium">Availability to be updated by mentor</p>
//                   <p className="text-amber-600 text-sm mt-1">Please check back later or contact the mentor directly</p>
//                 </div>
//               )}
//             </div>

//             <div className="mb-6">
//               <h3 className="text-xl font-bold text-[#062117] mb-3">Skills & Expertise</h3>
//               <div className="flex flex-wrap gap-2">
//                 {skillsArray.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="px-4 py-2 bg-[#0098cc]/20 rounded-full text-[#0098cc] font-medium"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   onClose();
//                   onBookSession();
//                 }}
//                 className="flex-1 bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 rounded-lg transition"
//               >
//                 Book Session
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default ProfileModal;
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, X, Clock, Calendar, Loader2, MapPin } from "lucide-react";
// import { useFetchMentorByIdQuery } from "./mentorsectionapislice";

// const ProfileModal = () => {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();

//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

//   const handleClose = () => {
//     navigate('/mentors');
//   };

//   const handleBookSession = () => {
//     navigate(`/mentors/${mentorId}/book`);
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#7ee0c1] mx-auto mb-4" />
//           <p className="text-white">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !mentor) {
//     return (
//       <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4">Failed to load profile</p>
//           <button 
//             onClick={handleClose} 
//             className="bg-[#7ee0c1] text-[#0f2f2a] px-6 py-2 rounded-lg font-semibold"
//           >
//             Back to Mentors
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const skillsArray = mentor.currentSkills
//     ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
//     : [];

//   return (
//     <div className="bg-[#0f2f2a] min-h-screen text-white">
//       {/* MAIN CONTAINER */}
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         {/* Back Button */}
//         <button
//           onClick={handleClose}
//           className="mb-6 flex items-center gap-2 text-[#7ee0c1] hover:text-white transition"
//         >
//           <X className="w-5 h-5" />
//           <span>Back to Mentors</span>
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2">
//             {/* PROFILE HEADER */}
//             <div className="flex gap-6">
//               <img
//                 src={mentor.profileImage || "https://via.placeholder.com/180"}
//                 alt={mentor.fullName}
//                 className="w-40 h-40 rounded-xl object-cover"
//               />

//               <div>
//                 <span className="inline-block bg-[#1f4f47] px-4 py-1 rounded-full text-sm mb-3">
//                   ⭐ Top Mentor
//                 </span>

//                 <h1 className="text-4xl font-bold">{mentor.fullName}</h1>
//                 <p className="text-[#7ee0c1] mt-1">
//                   {mentor.currentRole} {mentor.companyName && `@ ${mentor.companyName}`}
//                 </p>

//                 <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
//                   <span className="flex items-center gap-1">
//                     <Star size={14} className="text-yellow-400 fill-yellow-400" /> 5.0 (17 reviews)
//                   </span>
//                   {mentor.location && (
//                     <span className="flex items-center gap-1">
//                       <MapPin size={14} /> {mentor.location}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* BIO/TAGLINE */}
//             {mentor.bio && (
//               <p className="mt-6 text-[#7ee0c1] font-medium">
//                 {mentor.bio}
//               </p>
//             )}

//             {/* META INFO */}
//             <div className="mt-4 space-y-2 text-gray-300 text-sm">
//               {mentor.location && <p>🌍 {mentor.location}</p>}
//               <p>🕒 Active recently</p>
//               <p>⚡ Usually responds in half a day</p>
//             </div>

//             {/* EXPERIENCE */}
//             <div className="mt-10 grid grid-cols-3 gap-4">
//               <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                 <div className="text-2xl font-bold text-[#7ee0c1]">{mentor.yearsOfExperience}+</div>
//                 <div className="text-sm text-gray-300">Years Exp</div>
//               </div>
//               <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                 <div className="flex items-center justify-center gap-1">
//                   <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                   <span className="text-2xl font-bold text-[#7ee0c1]">5.0</span>
//                 </div>
//                 <div className="text-sm text-gray-300">Rating</div>
//               </div>
//               <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                 <div className="text-2xl font-bold text-[#7ee0c1]">₹{mentor.hourlyRate}</div>
//                 <div className="text-sm text-gray-300">Per Hour</div>
//               </div>
//             </div>

//             {/* WEEKLY AVAILABILITY */}
//             <div className="mt-10">
//               <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//                 <Calendar className="w-6 h-6 text-[#7ee0c1]" />
//                 Weekly Availability
//               </h2>

//               {mentor.availability && Array.isArray(mentor.availability) && mentor.availability.some(day => day.slots && day.slots.length > 0) ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {mentor.availability
//                     .filter(day => day.slots && day.slots.length > 0)
//                     .map((dayData, index) => (
//                       <div key={index} className="bg-[#1f4f47] rounded-lg p-4">
//                         <h4 className="font-bold text-white mb-3 flex items-center gap-2">
//                           <div className="w-2 h-2 rounded-full bg-[#7ee0c1]"></div>
//                           {dayData.day}
//                         </h4>
//                         <div className="space-y-2">
//                           {dayData.slots.map((slot, slotIndex) => (
//                             <div key={slotIndex} className="flex items-center justify-between p-2 bg-[#0f2f2a] rounded-lg">
//                               <div className="flex items-center gap-2">
//                                 <Clock size={14} className="text-[#7ee0c1]" />
//                                 <span className="text-sm font-semibold text-white">
//                                   {slot.startTime} - {slot.endTime}
//                                 </span>
//                               </div>
//                               {slot.isBooked && (
//                                 <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-medium">
//                                   Booked
//                                 </span>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               ) : (
//                 <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-6 text-center">
//                   <Clock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
//                   <p className="text-amber-300 font-medium">Availability to be updated by mentor</p>
//                   <p className="text-amber-400 text-sm mt-1">Please check back later or contact the mentor directly</p>
//                 </div>
//               )}
//             </div>

//             {/* SKILLS */}
//             <div className="mt-10">
//               <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
//               <div className="flex flex-wrap gap-3">
//                 {skillsArray.slice(0, 12).map((skill, i) => (
//                   <span
//                     key={i}
//                     className="bg-[#1f4f47] px-4 py-2 rounded-full text-sm"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//                 {skillsArray.length > 12 && (
//                   <span className="text-[#7ee0c1] underline cursor-pointer px-4 py-2">
//                     + {skillsArray.length - 12} more
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE — PRICING CARD */}
//           <div className="bg-[#f6ecd9] text-[#0f2f2a] rounded-2xl p-8 h-fit sticky top-10">
//             <div className="flex justify-between mb-6 border-b pb-3">
//               <button className="font-semibold border-b-2 border-[#0f2f2a]">
//                 Mentorship plans
//               </button>
//               <button className="text-gray-500">Sessions</button>
//             </div>

//             <div className="flex gap-3 mb-6">
//               <button className="px-4 py-2 border rounded-full text-sm">
//                 Lite Plan
//               </button>
//               <button className="px-4 py-2 border rounded-full bg-[#0f2f2a] text-white text-sm">
//                 Standard Plan
//               </button>
//             </div>

//             <h2 className="text-5xl font-bold">
//               ₹{mentor.hourlyRate}
//               <span className="text-xl font-normal"> / month</span>
//             </h2>

//             <p className="mt-4 text-gray-700">
//               Receive tailored mentorship and assistance as we work together
//               to help you reach your career goals.
//             </p>

//             <ul className="mt-6 space-y-3 text-sm">
//               <li className="flex gap-2">
//                 <Clock size={16} /> 2 calls per month (45min/call)
//               </li>
//               <li>💬 Unlimited Q&A via chat</li>
//               <li>⏱ Expect responses within 24 hours</li>
//               <li>🛠 Hands-on support</li>
//             </ul>

//             <button 
//               onClick={handleBookSession}
//               className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition"
//             >
//               Book Session
//             </button>

//             <p className="text-xs text-center mt-4">
//               7-day free trial, cancel anytime.
//               <span className="underline ml-1 cursor-pointer">
//                 What's included?
//               </span>
//             </p>

//             <p className="text-center mt-4 text-sm">
//               🔥 Lock in this price now!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;



// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, X, Clock, Calendar, Loader2, MapPin } from "lucide-react";
// import { useFetchMentorByIdQuery } from "./mentorsectionapislice";
// import BookingModal from "./BookModal";

// const ProfileModal = () => {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

//   const handleClose = () => {
//     navigate('/mentors');
//   };

//   const handleBookSession = () => {
//     // Check if user is authenticated
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       // Redirect to login with return URL
//       navigate(`/login?redirect=/mentors/${mentorId}`);
//       return;
//     }

//     // Open booking modal
//     setIsBookingModalOpen(true);
//   };

//   const handleCloseBookingModal = () => {
//     setIsBookingModalOpen(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#7ee0c1] mx-auto mb-4" />
//           <p className="text-white">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !mentor) {
//     return (
//       <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4">Failed to load profile</p>
//           <button 
//             onClick={handleClose} 
//             className="bg-[#7ee0c1] text-[#0f2f2a] px-6 py-2 rounded-lg font-semibold"
//           >
//             Back to Mentors
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const skillsArray = mentor.currentSkills
//     ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
//     : [];

//   return (
//     <>
//       <div className="bg-[#0f2f2a] min-h-screen text-white">
//         {/* MAIN CONTAINER */}
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           {/* Back Button */}
//           <button
//             onClick={handleClose}
//             className="mb-6 flex items-center gap-2 text-[#7ee0c1] hover:text-white transition"
//           >
//             <X className="w-5 h-5" />
//             <span>Back to Mentors</span>
//           </button>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//             {/* LEFT SIDE */}
//             <div className="lg:col-span-2">
//               {/* PROFILE HEADER */}
//               <div className="flex gap-6">
//                 <img
//                   src={mentor.profileImage || "https://via.placeholder.com/180"}
//                   alt={mentor.fullName}
//                   className="w-40 h-40 rounded-xl object-cover"
//                 />

//                 <div>
//                   <span className="inline-block bg-[#1f4f47] px-4 py-1 rounded-full text-sm mb-3">
//                     ⭐ Top Mentor
//                   </span>

//                   <h1 className="text-4xl font-bold">{mentor.fullName}</h1>
//                   <p className="text-[#7ee0c1] mt-1">
//                     {mentor.currentRole} {mentor.companyName && `@ ${mentor.companyName}`}
//                   </p>

//                   <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
//                     <span className="flex items-center gap-1">
//                       <Star size={14} className="text-yellow-400 fill-yellow-400" /> 5.0 (17 reviews)
//                     </span>
//                     {mentor.location && (
//                       <span className="flex items-center gap-1">
//                         <MapPin size={14} /> {mentor.location}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* BIO/TAGLINE */}
//               {mentor.bio && (
//                 <p className="mt-6 text-[#7ee0c1] font-medium">
//                   {mentor.bio}
//                 </p>
//               )}

//               {/* META INFO */}
//               <div className="mt-4 space-y-2 text-gray-300 text-sm">
//                 {mentor.location && <p>🌍 {mentor.location}</p>}
//                 <p>🕒 Active recently</p>
//                 <p>⚡ Usually responds in half a day</p>
//               </div>

//               {/* EXPERIENCE */}
//               <div className="mt-10 grid grid-cols-3 gap-4">
//                 <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-[#7ee0c1]">{mentor.yearsOfExperience}+</div>
//                   <div className="text-sm text-gray-300">Years Exp</div>
//                 </div>
//                 <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                   <div className="flex items-center justify-center gap-1">
//                     <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                     <span className="text-2xl font-bold text-[#7ee0c1]">5.0</span>
//                   </div>
//                   <div className="text-sm text-gray-300">Rating</div>
//                 </div>
//                 <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-[#7ee0c1]">₹{mentor.hourlyRate}</div>
//                   <div className="text-sm text-gray-300">Per Hour</div>
//                 </div>
//               </div>

//               {/* WEEKLY AVAILABILITY */}
//               <div className="mt-10">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//                   <Calendar className="w-6 h-6 text-[#7ee0c1]" />
//                   Weekly Availability
//                 </h2>

//                 {mentor.availability && Array.isArray(mentor.availability) && mentor.availability.some(day => day.slots && day.slots.length > 0) ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {mentor.availability
//                       .filter(day => day.slots && day.slots.length > 0)
//                       .map((dayData, index) => (
//                         <div key={index} className="bg-[#1f4f47] rounded-lg p-4">
//                           <h4 className="font-bold text-white mb-3 flex items-center gap-2">
//                             <div className="w-2 h-2 rounded-full bg-[#7ee0c1]"></div>
//                             {dayData.day}
//                           </h4>
//                           <div className="space-y-2">
//                             {dayData.slots.map((slot, slotIndex) => (
//                               <div key={slotIndex} className="flex items-center justify-between p-2 bg-[#0f2f2a] rounded-lg">
//                                 <div className="flex items-center gap-2">
//                                   <Clock size={14} className="text-[#7ee0c1]" />
//                                   <span className="text-sm font-semibold text-white">
//                                     {slot.startTime} - {slot.endTime}
//                                   </span>
//                                 </div>
//                                 {slot.isBooked && (
//                                   <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-medium">
//                                     Booked
//                                   </span>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-6 text-center">
//                     <Clock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
//                     <p className="text-amber-300 font-medium">Availability to be updated by mentor</p>
//                     <p className="text-amber-400 text-sm mt-1">Please check back later or contact the mentor directly</p>
//                   </div>
//                 )}
//               </div>

//               {/* SKILLS */}
//               <div className="mt-10">
//                 <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
//                 <div className="flex flex-wrap gap-3">
//                   {skillsArray.slice(0, 12).map((skill, i) => (
//                     <span
//                       key={i}
//                       className="bg-[#1f4f47] px-4 py-2 rounded-full text-sm"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                   {skillsArray.length > 12 && (
//                     <span className="text-[#7ee0c1] underline cursor-pointer px-4 py-2">
//                       + {skillsArray.length - 12} more
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE — PRICING CARD */}
//             <div className="bg-[#f6ecd9] text-[#0f2f2a] rounded-2xl p-8 h-fit sticky top-10">
//               <div className="flex justify-between mb-6 border-b pb-3">
//                 <button className="font-semibold border-b-2 border-[#0f2f2a]">
//                   Mentorship plans
//                 </button>
//                 <button className="text-gray-500">Sessions</button>
//               </div>

//               <div className="flex gap-3 mb-6">
//                 <button className="px-4 py-2 border rounded-full text-sm">
//                   Lite Plan
//                 </button>
//                 <button className="px-4 py-2 border rounded-full bg-[#0f2f2a] text-white text-sm">
//                   Standard Plan
//                 </button>
//               </div>

//               <h2 className="text-5xl font-bold">
//                 ₹{mentor.hourlyRate}
//                 <span className="text-xl font-normal"> / month</span>
//               </h2>

//               <p className="mt-4 text-gray-700">
//                 Receive tailored mentorship and assistance as we work together
//                 to help you reach your career goals.
//               </p>

//               <ul className="mt-6 space-y-3 text-sm">
//                 <li className="flex gap-2">
//                   <Clock size={16} /> 2 calls per month (45min/call)
//                 </li>
//                 <li>💬 Unlimited Q&A via chat</li>
//                 <li>⏱ Expect responses within 24 hours</li>
//                 <li>🛠 Hands-on support</li>
//               </ul>

//               <button 
//                 onClick={handleBookSession}
//                 className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 active:scale-95"
//               >
//                 Book Session
//               </button>

//               <p className="text-xs text-center mt-4">
//                 7-day free trial, cancel anytime.
//                 <span className="underline ml-1 cursor-pointer">
//                   What's included?
//                 </span>
//               </p>

//               <p className="text-center mt-4 text-sm">
//                 🔥 Lock in this price now!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Booking Modal */}
//       {mentor && (
//         <BookingModal
//           mentor={mentor}
//           isOpen={isBookingModalOpen}
//           onClose={handleCloseBookingModal}
//         />
//       )}
//     </>
//   );
// };

// export default ProfileModal;


import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, X, Clock, Calendar, Loader2, MapPin } from "lucide-react";
import { useFetchMentorByIdQuery } from "./mentorsectionapislice";
import BookingModal from "./BookModal";

const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

  const handleClose = () => {
    navigate('/mentors');
  };

  const handleBookSession = () => {
    // Check if user is authenticated (same as MentorsSection)
    const isLoggedIn = !!localStorage.getItem("authToken");

    if (!isLoggedIn) {
      // Redirect to login with mentorId (same pattern as MentorsSection)
      navigate(`/login?mentorId=${mentorId}`);
      return;
    }

    // Open booking modal if logged in
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#7ee0c1] mx-auto mb-4" />
          <p className="text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (isError || !mentor) {
    return (
      <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load profile</p>
          <button
            onClick={handleClose}
            className="bg-[#7ee0c1] text-[#0f2f2a] px-6 py-2 rounded-lg font-semibold"
          >
            Back to Mentors
          </button>
        </div>
      </div>
    );
  }

  const skillsArray = mentor.currentSkills
    ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <>
      <div className="bg-[#0f2f2a] min-h-screen text-white">
        {/* MAIN CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Back Button */}
          <button
            onClick={handleClose}
            className="mb-6 flex items-center gap-2 text-[#7ee0c1] hover:text-white transition"
          >
            <X className="w-5 h-5" />
            <span>Back to Mentors</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2">
              {/* PROFILE HEADER */}
              <div className="flex gap-6">
                <img
                  src={mentor.profileImage || "https://via.placeholder.com/180"}
                  alt={mentor.fullName}
                  className="w-40 h-40 rounded-xl object-cover"
                />

                <div>
                  <span className="inline-block bg-[#1f4f47] px-4 py-1 rounded-full text-sm mb-3">
                    ⭐ Top Mentor
                  </span>

                  <h1 className="text-4xl font-bold">{mentor.fullName}</h1>
                  <p className="text-[#7ee0c1] mt-1">
                    {mentor.currentRole} {mentor.companyName && `@ ${mentor.companyName}`}
                  </p>

                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" /> 5.0 (17 reviews)
                    </span>
                    {mentor.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {mentor.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* BIO/TAGLINE */}
              {mentor.bio && (
                <p className="mt-6 text-[#7ee0c1] font-medium">
                  {mentor.bio}
                </p>
              )}

              {/* META INFO */}
              <div className="mt-4 space-y-2 text-gray-300 text-sm">
                {mentor.location && <p>🌍 {mentor.location}</p>}
                <p>🕒 Active recently</p>
                <p>⚡ Usually responds in half a day</p>
              </div>

              {/* EXPERIENCE */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#7ee0c1]">{mentor.yearsOfExperience}+</div>
                  <div className="text-sm text-gray-300">Years Exp</div>
                </div>
                <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold text-[#7ee0c1]">5.0</span>
                  </div>
                  <div className="text-sm text-gray-300">Rating</div>
                </div>
                <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#7ee0c1]">₹{mentor.hourlyRate}</div>
                  <div className="text-sm text-gray-300">Per Hour</div>
                </div>
              </div>

              {/* WEEKLY AVAILABILITY */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#7ee0c1]" />
                  Weekly Availability
                </h2>

                {mentor.availability && Array.isArray(mentor.availability) && mentor.availability.some(day => day.slots && day.slots.length > 0) ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mentor.availability
                      .filter(day => day.slots && day.slots.length > 0)
                      .map((dayData, index) => (
                        <div key={index} className="bg-[#1f4f47] rounded-lg p-4">
                          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#7ee0c1]"></div>
                            {dayData.day}
                          </h4>
                          <div className="space-y-2">
                            {dayData.slots.map((slot, slotIndex) => (
                              <div key={slotIndex} className="flex items-center justify-between p-2 bg-[#0f2f2a] rounded-lg">
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-[#7ee0c1]" />
                                  <span className="text-sm font-semibold text-white">
                                    {slot.startTime} - {slot.endTime}
                                  </span>
                                </div>
                                {slot.isBooked && (
                                  <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-medium">
                                    Booked
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-6 text-center">
                    <Clock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                    <p className="text-amber-300 font-medium">Availability to be updated by mentor</p>
                    <p className="text-amber-400 text-sm mt-1">Please check back later or contact the mentor directly</p>
                  </div>
                )}
              </div>

              {/* SKILLS */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {skillsArray.slice(0, 12).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#1f4f47] px-4 py-2 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {skillsArray.length > 12 && (
                    <span className="text-[#7ee0c1] underline cursor-pointer px-4 py-2">
                      + {skillsArray.length - 12} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — PRICING CARD */}
            <div className="bg-[#f6ecd9] text-[#0f2f2a] rounded-2xl p-8 h-fit sticky top-10">
              <div className="flex justify-between mb-6 border-b pb-3">
                <button className="font-semibold border-b-2 border-[#0f2f2a]">
                  Mentorship plans
                </button>
                <button className="text-gray-500">Sessions</button>
              </div>

              <div className="flex gap-3 mb-6">
                <button className="px-4 py-2 border rounded-full text-sm">
                  Lite Plan
                </button>
                <button className="px-4 py-2 border rounded-full bg-[#0f2f2a] text-white text-sm">
                  Standard Plan
                </button>
              </div>

              <h2 className="text-5xl font-bold">
                ₹{mentor.hourlyRate}
                <span className="text-xl font-normal"> / month</span>
              </h2>

              <p className="mt-4 text-gray-700">
                Receive tailored mentorship and assistance as we work together
                to help you reach your career goals.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex gap-2">
                  <Clock size={16} /> 2 calls per month (45min/call)
                </li>
                <li>💬 Unlimited Q&A via chat</li>
                <li>⏱ Expect responses within 24 hours</li>
                <li>🛠 Hands-on support</li>
              </ul>

              <button
                onClick={handleBookSession}
                className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 active:scale-95"
              >
                Book Session
              </button>

              <p className="text-xs text-center mt-4">
                7-day free trial, cancel anytime.
                <span className="underline ml-1 cursor-pointer">
                  What's included?
                </span>
              </p>

              <p className="text-center mt-4 text-sm">
                Lock in this price now!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {mentor && (
        <BookingModal
          mentor={mentor}
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
        />
      )}
    </>
  );
};

export default ProfileModal;

