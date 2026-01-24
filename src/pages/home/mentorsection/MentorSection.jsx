import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import { useFetchTopMentorsQuery } from "./mentorsectionapislice";
import { useNavigate } from "react-router-dom";

const MentorsSection = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchTopMentorsQuery({ limit: 4 });

  const mentors = Array.isArray(data) ? data : [];
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleBookSession = (mentor) => {
    if (!isLoggedIn) {
      navigate(`/login?mentorId=${mentor._id}`);
    } else {
      navigate(`/book-session?mentorId=${mentor._id}`);
    }
  };

  const handleViewProfile = (mentor) => {
    navigate(`/mentor-profile/${mentor._id}`);
  };

  if (isLoading) {
    return (
      <div className="bg-[#062117] py-16 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-white" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#062117] py-16 text-center text-red-500">
        Failed to load mentors
      </div>
    );
  }

  return (
    <div className="bg-[#062117] py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0098cc] to-white bg-clip-text text-transparent">
            Meet Our Top Mentors
          </h2>
          <p className="text-white/80 mt-2">
            Learn from experienced industry professionals
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => {
            const skillsArray = mentor.currentSkills
              ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
              : [];

            return (
              <motion.div
                key={mentor._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="
                  bg-white rounded-xl border border-[#0098cc]
                  shadow-lg hover:shadow-xl transition-all
                  h-[520px] flex flex-col overflow-hidden
                "
              >
                {/* IMAGE */}
                <div className="h-44 w-full shrink-0">
                  <img
                    src={mentor.profileImage || "https://via.placeholder.com/400"}
                    alt={mentor.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-[#062117] font-bold text-lg line-clamp-1">
                    {mentor.fullName || "Unknown Mentor"}
                  </h3>

                  <p className="text-[#062117]/70 text-sm mt-1 line-clamp-1">
                    {mentor.currentRole || "Role not specified"}
                  </p>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skillsArray.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-[#0098cc]/20 rounded-full text-[#0098cc] line-clamp-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* RATING */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-[#062117]">
                        5.0
                      </span>
                    </div>
                    <span className="text-sm text-[#062117]/70">
                      {mentor.yearsOfExperience || 0}+ yrs exp
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    <button
                      onClick={() => handleViewProfile(mentor)}
                      className="
                        w-full h-11
                        border-2 border-[#0098cc]
                        text-[#0098cc] font-semibold
                        rounded-lg transition-all
                        hover:bg-[#0098cc] hover:text-white
                      "
                    >
                      View Profile
                    </button>

                    <button
                      onClick={() => handleBookSession(mentor)}
                      className="
                        w-full h-12
                        bg-gradient-to-r from-[#0098cc] to-[#00c2ff]
                        text-white font-bold
                        rounded-lg
                        shadow-lg shadow-[#0098cc]/40
                        transition-all
                        hover:scale-[1.03]
                        hover:shadow-xl
                      "
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorsSection;


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Star, Loader2 } from "lucide-react";
// import { useFetchTopMentorsQuery } from "./mentorsectionapislice";
// import ProfileModal from "./profileSection";
// import BookingModal from "./BookModal";
// import { useNavigate } from "react-router-dom";

// const MentorsSection = () => {
//   const [selectedMentorId, setSelectedMentorId] = useState(null);
//   const [selectedMentor, setSelectedMentor] = useState(null);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const navigate = useNavigate();


//   const { data, isLoading, isError } = useFetchTopMentorsQuery({ limit: 4 });

//   const mentors = Array.isArray(data) ? data : [];


//   // const handleViewProfile = (mentor) => {
//   //   setSelectedMentorId(mentor._id);
//   //   setSelectedMentor(mentor);
//   //   setIsProfileModalOpen(true);
//   // };

//   if (isLoading) {
//     return (
//       <div className="bg-[#062117] py-16 flex justify-center items-center">
//         <Loader2 className="w-12 h-12 animate-spin text-white" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="bg-[#062117] py-16 text-center text-red-500">
//         Failed to load mentors. Please try again later.
//       </div>
//     );
//   }


//   const handleBookSession = (mentor) => {
//     navigate(`/book-session/${mentor._id}`);
//   };

//   const handleViewProfile = (mentor) => {
//     navigate(`/mentor-profile/${mentor._id}`);
//   };
//   if (!mentors.length) {
//     return (
//       <div className="bg-[#062117] py-16 text-center text-white">
//         No mentors available at the moment.
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-[#062117] py-12 md:py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="text-center mb-8 md:mb-12"
//             >
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0098cc] to-[#ffffff] bg-clip-text text-transparent mb-3">
//                 Meet Our Top Mentors
//               </h2>
//               <p className="text-white/80">
//                 Learn from industry experts at leading tech companies
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {mentors.map((mentor, index) => {
//                 const skillsArray = mentor.currentSkills
//                   ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
//                   : [];

//                 return (
//                   <motion.div
//                     key={mentor._id || index}
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#0098cc] hover:shadow-xl transition-all"
//                   >
//                     <div className="w-full h-44 overflow-hidden">
//                       <img
//                         src={mentor.profileImage || "https://via.placeholder.com/400"}
//                         alt={mentor.fullName}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <div className="p-4">
//                       <h3 className="text-[#062117] font-bold text-lg mb-1">
//                         {mentor.fullName || "Unknown Mentor"}
//                       </h3>
//                       <p className="text-[#062117]/70 text-sm mb-2">
//                         {mentor.currentRole || "Role not specified"}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mb-2">
//                         {skillsArray.slice(0, 3).map((skill, i) => (
//                           <span
//                             key={i}
//                             className="text-xs px-2 py-1 bg-[#0098cc]/20 rounded-full text-[#0098cc]"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                           <span className="text-sm text-[#062117] font-semibold">5.0</span>
//                         </div>
//                         <span className="text-sm text-[#062117]/70">
//                           {mentor.yearsOfExperience || 0}+ yrs exp
//                         </span>
//                       </div>

//                       <div className="flex flex-col gap-2">
//                         <button
//                           onClick={() => handleViewProfile(mentor)}
//                           className="w-full border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc] hover:text-white font-semibold py-2 rounded-lg transition-all"
//                         >
//                           View Profile
//                         </button>
//                         <button
//                           onClick={() => handleBookSession(mentor)}
//                           className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded-lg transition-all"
//                         >
//                           Book Session
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {selectedMentor && (
//         <>
//           <ProfileModal
//             mentorId={selectedMentorId}
//             isOpen={isProfileModalOpen}
//             onClose={() => setIsProfileModalOpen(false)}
//             onBookSession={() => {
//               setIsProfileModalOpen(false);
//               setIsBookingModalOpen(true);
//             }}
//           />
//           <BookingModal
//             mentor={selectedMentor}
//             isOpen={isBookingModalOpen}
//             onClose={() => setIsBookingModalOpen(false)}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default MentorsSection;




// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, X, Clock, Calendar, RefreshCw, MessageSquare, CreditCard, Upload, Loader2 } from "lucide-react";
// import {
//   useFetchTopMentorsQuery,
//   useFetchMentorByIdQuery,
//   useCreateBookingMutation,
//   useCompleteBookingMutation,
//   useApplyScholarshipMutation,
//   useGet_booksession_OtpMutation,
// } from "./mentorsectionapislice"

// // Replace your entire BookingModal component with this:



// const BookingModal = ({ mentor, isOpen, onClose }) => {
//   const [step, setStep] = useState(1);
//   const [bookingData, setBookingData] = useState({
//     date: "",
//     time: "",
//     topic: "",
//     duration: "60",
//     paymentMethod: "upi",
//     transactionId: "",
//     phoneNumber: "",
//     email: "",
//     otp: ""
//   });

//   // OTP States
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [timer, setTimer] = useState(120);
//   const [canResend, setCanResend] = useState(false);

//   // Assuming these hooks exist in your project
//   // const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();
//   // const [completeBooking, { isLoading: isCompletingBooking }] = useCompleteBookingMutation();




//   const [getBookSessionOtp, { isLoading, isSuccess, error }] = useGet_booksession_OtpMutation();
//   // Mock loading states for demonstration

//   const [isCreatingBooking, setIsCreatingBooking] = useState(false);
//   const [isCompletingBooking, setIsCompletingBooking] = useState(false);

//   // Timer for OTP resend
//   useEffect(() => {
//     let countdown;
//     if (otpSent && timer > 0 && !otpVerified) {
//       countdown = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(countdown);
//   }, [otpSent, timer, otpVerified]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData(prev => ({ ...prev, [name]: value }));
//   };

//   // Generate hourly slots from time ranges
//   const generateHourlySlots = (startTime, endTime) => {
//     const slots = [];
//     const [startHour, startMin] = startTime.split(':').map(Number);
//     const [endHour, endMin] = endTime.split(':').map(Number);
//     const startMinutes = startHour * 60 + startMin;
//     const endMinutes = endHour * 60 + endMin;

//     for (let minutes = startMinutes; minutes < endMinutes; minutes += 60) {
//       const slotEndMinutes = Math.min(minutes + 60, endMinutes);
//       const slotStartHour = Math.floor(minutes / 60);
//       const slotStartMin = minutes % 60;
//       const slotEndHour = Math.floor(slotEndMinutes / 60);
//       const slotEndMin = slotEndMinutes % 60;

//       const slotStart = `${slotStartHour.toString().padStart(2, '0')}:${slotStartMin.toString().padStart(2, '0')}`;
//       const slotEnd = `${slotEndHour.toString().padStart(2, '0')}:${slotEndMin.toString().padStart(2, '0')}`;

//       slots.push({
//         start: slotStart,
//         end: slotEnd,
//         display: `${slotStart} - ${slotEnd}`
//       });
//     }
//     return slots;
//   };

//   const getAvailableSlots = () => {
//     if (!bookingData.date || !mentor.availability) {
//       return [];
//     }

//     const selectedDate = new Date(bookingData.date);
//     const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

//     const dayAvailability = mentor.availability.find(
//       day => day.day.toLowerCase() === dayName.toLowerCase()
//     );

//     if (!dayAvailability || !dayAvailability.slots || dayAvailability.slots.length === 0) {
//       return null;
//     }

//     const allSlots = [];
//     dayAvailability.slots.forEach(slot => {
//       if (!slot.isBooked) {
//         const hourlySlots = generateHourlySlots(slot.startTime, slot.endTime);
//         allSlots.push(...hourlySlots);
//       }
//     });

//     return allSlots;
//   };

//   // Send OTP to email
//   const handleSendOTP = async () => {
//     if (!bookingData.email) {
//       alert("Please enter your email address");
//       return;
//     }



//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(bookingData.email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     setOtpLoading(true);
//     try {

//       await getBookSessionOtp({
//         email: bookingData.email,
//       });


//       setOtpSent(true);
//       setTimer(120);
//       setCanResend(false);
//       // alert("OTP sent successfully to your email!");
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert("Failed to send OTP. Please try again.");
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // Resend OTP
//   const handleResendOTP = async () => {
//     setOtpLoading(true);
//     try {

//       await getBookSessionOtp({
//         email: bookingData.email,
//       });

//       setTimer(120);
//       setCanResend(false);
//       // alert("OTP resent successfully!");
//     } catch (error) {
//       console.error('Error resending OTP:', error);
//       alert("Failed to resend OTP. Please try again.");
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // Verify OTP
//   const handleVerifyOTP = async () => {
//     if (!bookingData.otp) {
//       alert("Please enter the OTP");
//       return;
//     }

//     if (bookingData.otp.length !== 6) {
//       alert("Please enter a valid 6-digit OTP");
//       return;
//     }

//     setOtpLoading(true);
//     try {
//       // Call your backend API to verify OTP
//       // await verifyOTPAPI({ email: bookingData.email, otp: bookingData.otp });

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       setOtpVerified(true);
//       alert("Email verified successfully!");
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       alert("Invalid OTP. Please try again.");
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
//   };

//   const handleNext = async () => {
//     if (step === 1) {
//       if (!bookingData.date || !bookingData.time || !bookingData.topic || !bookingData.email) {
//         alert("Please fill in all required fields including email");
//         return;
//       }

//       if (!otpVerified) {
//         alert("Please verify your email with OTP before proceeding");
//         return;
//       }

//       setIsCreatingBooking(true);
//       try {
//         const payload = {
//           userId: mentor._id,
//           mentorId: mentor._id,
//           date: bookingData.date,
//           time: bookingData.time,
//           topic: bookingData.topic,
//           duration: Number(bookingData.duration),
//           email: bookingData.email
//         };

//         console.log("Create booking payload:", payload);
//         // const booking = await createBooking(payload).unwrap();
//         // setBookingData(prev => ({ ...prev, bookingId: booking._id }));

//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         setBookingData(prev => ({ ...prev, bookingId: 'mock-booking-id' }));

//         setStep(2);
//       } catch (error) {
//         console.error("Booking creation failed:", error);
//         alert(error.data?.message || "Failed to create booking. Please try again.");
//       } finally {
//         setIsCreatingBooking(false);
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     if (!bookingData.transactionId || !bookingData.phoneNumber) {
//       alert("Please fill all payment details");
//       return;
//     }

//     setIsCompletingBooking(true);
//     try {
//       // await completeBooking({
//       //   bookingId: bookingData.bookingId,
//       //   paymentDetails: {
//       //     paymentMethod: bookingData.paymentMethod,
//       //     transactionId: bookingData.transactionId,
//       //     phoneNumber: bookingData.phoneNumber,
//       //     email: bookingData.email,
//       //     amount: bookingData.duration === "30" ? mentor.hourlyRate / 2 :
//       //       bookingData.duration === "60" ? mentor.hourlyRate :
//       //         mentor.hourlyRate * 1.5,
//       //   }
//       // }).unwrap();

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       alert("Booking completed successfully! Check your email for confirmation.");
//       onClose();
//       resetForm();
//     } catch (error) {
//       console.error("Payment verification failed:", error);
//       alert(error.data?.message || "Payment verification failed. Please contact support.");
//     } finally {
//       setIsCompletingBooking(false);
//     }
//   };

//   const resetForm = () => {
//     setStep(1);
//     setBookingData({
//       date: "",
//       time: "",
//       topic: "",
//       duration: "60",
//       paymentMethod: "upi",
//       transactionId: "",
//       phoneNumber: "",
//       email: "",
//       otp: ""
//     });
//     setOtpSent(false);
//     setOtpVerified(false);
//     setCanResend(false);
//     setTimer(120);
//   };

//   if (!isOpen) return null;

//   const availableSlots = getAvailableSlots();

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         >
//           {/* Header */}
//           <div className="sticky top-0 bg-gradient-to-r from-[#0098cc] to-[#007fa3] text-white p-6 flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold">Book Session with {mentor.fullName}</h2>
//               <p className="text-white/80 text-sm mt-1">Step {step} of 2</p>
//             </div>
//             <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition">
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div className="px-6 pt-4">
//             <div className="flex items-center gap-2">
//               <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-[#0098cc]' : 'bg-gray-200'}`} />
//               <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-[#0098cc]' : 'bg-gray-200'}`} />
//             </div>
//           </div>

//           {/* Step 1: Booking Details */}
//           {step === 1 && (
//             <div className="p-6 space-y-6">
//               {/* Date Selection */}
//               <div>
//                 <label className="flex items-center gap-2 text-[#062117] font-semibold mb-2">
//                   <Calendar className="w-5 h-5 text-[#0098cc]" />
//                   Select Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={bookingData.date}
//                   onChange={(e) => {
//                     handleInputChange(e);
//                     setBookingData(prev => ({ ...prev, time: "" }));
//                   }}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0098cc] focus:outline-none"
//                 />
//               </div>

//               {/* Email Input Field */}
//               <div>
//                 <label className="flex items-center gap-2 text-[#062117] font-semibold mb-2">
//                   <MessageSquare className="w-5 h-5 text-[#0098cc]" />
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={bookingData.email}
//                   onChange={handleInputChange}
//                   placeholder="your.email@example.com"
//                   required
//                   disabled={otpVerified}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0098cc] focus:outline-none disabled:bg-gray-100"
//                 />
//                 <p className="text-xs text-[#062117]/60 mt-1">
//                   Booking confirmation will be sent to this email
//                 </p>
//               </div>

//               {/* OTP Verification Section */}
//               <div>
//                 <label className="flex items-center gap-2 text-[#062117] font-semibold mb-2">
//                   <MessageSquare className="w-5 h-5 text-[#0098cc]" />
//                   Email Verification <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={otpSent && canResend ? handleResendOTP : handleSendOTP}
//                     disabled={otpLoading || (otpSent && !canResend) || otpVerified}
//                     className={`px-4 py-2.5 text-sm rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[100px] ${otpVerified
//                       ? 'bg-green-500 text-white cursor-not-allowed'
//                       : otpSent && !canResend
//                         ? 'bg-[#0098cc] text-white cursor-not-allowed'
//                         : otpLoading
//                           ? 'bg-gray-400 text-white cursor-not-allowed'
//                           : 'bg-[#0098cc] text-white hover:bg-[#007fa3]'
//                       }`}
//                   >
//                     {otpLoading ? (
//                       <RefreshCw className="w-4 h-4 animate-spin" />
//                     ) : otpVerified ? (
//                       <>
//                         <CheckCircle className="w-4 h-4" />
//                         <span>Verified</span>
//                       </>
//                     ) : otpSent && !canResend ? (
//                       <>
//                         <CheckCircle className="w-4 h-4" />
//                         <span>Sent</span>
//                       </>
//                     ) : otpSent && canResend ? (
//                       'Resend'
//                     ) : (
//                       'Send OTP'
//                     )}
//                   </button>

//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       name="otp"
//                       value={bookingData.otp}
//                       onChange={handleInputChange}
//                       maxLength="6"
//                       disabled={!otpSent || otpVerified}
//                       className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:border-[#0098cc] focus:outline-none text-center tracking-widest font-mono disabled:bg-gray-100"
//                       placeholder="000000"
//                     />
//                     {otpSent && !canResend && !otpVerified && (
//                       <div className="flex items-center justify-center mt-1 text-xs text-gray-500">
//                         <Clock className="w-3 h-3 mr-1" />
//                         Resend in {formatTime(timer)}
//                       </div>
//                     )}
//                   </div>

//                   {otpSent && !otpVerified && (
//                     <button
//                       type="button"
//                       onClick={handleVerifyOTP}
//                       disabled={otpLoading || !bookingData.otp}
//                       className="px-4 py-2.5 text-sm rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
//                     >
//                       {otpLoading ? 'Verifying...' : 'Verify'}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Time Slot Selection */}
//               {bookingData.date && (
//                 <div>
//                   <label className="flex items-center gap-2 text-[#062117] font-semibold mb-2">
//                     <Clock className="w-5 h-5 text-[#0098cc]" />
//                     Select Time Slot
//                   </label>

//                   {availableSlots === null ? (
//                     <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
//                       <p className="text-amber-700 text-sm">
//                         No slots available on {new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long' })}.
//                         Please select another date.
//                       </p>
//                     </div>
//                   ) : availableSlots.length === 0 ? (
//                     <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
//                       <p className="text-amber-700 text-sm">
//                         All slots are booked for this day. Please select another date.
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border-2 border-gray-200 rounded-lg">
//                       {availableSlots.map((slot, index) => (
//                         <button
//                           key={index}
//                           type="button"
//                           onClick={() => setBookingData(prev => ({
//                             ...prev,
//                             time: slot.display
//                           }))}
//                           className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition ${bookingData.time === slot.display
//                             ? 'bg-[#0098cc] text-white border-[#0098cc]'
//                             : 'border-gray-200 text-[#062117] hover:border-[#0098cc] hover:bg-[#0098cc]/5'
//                             }`}
//                         >
//                           {slot.display}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Session Duration */}
//               <div>
//                 <label className="flex items-center gap-2 text-[#062117] font-semibold mb-2">
//                   <Clock className="w-5 h-5 text-[#0098cc]" />
//                   Session Duration
//                 </label>
//                 <select
//                   name="duration"
//                   value={bookingData.duration}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0098cc] focus:outline-none"
//                 >
//                   <option value="30">30 minutes - ₹{mentor.hourlyRate / 2}</option>
//                   <option value="60">60 minutes - ₹{mentor.hourlyRate}</option>
//                   <option value="90">90 minutes - ₹{mentor.hourlyRate * 1.5}</option>
//                 </select>
//               </div>

//               {/* Topic to Discuss */}
//               <div>
//                 <label className="flex items-center gap-2 text-[#062117] font-semibold mb-2">
//                   <MessageSquare className="w-5 h-5 text-[#0098cc]" />
//                   Topic to Discuss
//                 </label>
//                 <textarea
//                   name="topic"
//                   value={bookingData.topic}
//                   onChange={handleInputChange}
//                   placeholder="What would you like to discuss in this session?"
//                   rows="4"
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0098cc] focus:outline-none resize-none"
//                 />
//               </div>

//               <button
//                 onClick={handleNext}
//                 disabled={isCreatingBooking || !otpVerified}
//                 className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isCreatingBooking && <Loader2 className="w-5 h-5 animate-spin" />}
//                 {isCreatingBooking ? "Creating Booking..." : "Continue to Payment"}
//               </button>
//             </div>
//           )}

//           {/* Step 2: Payment */}
//           {step === 2 && (
//             <div className="p-6 space-y-6">
//               <div className="bg-gradient-to-r from-[#0098cc]/10 to-[#007fa3]/10 p-4 rounded-lg border border-[#0098cc]/30">
//                 <h3 className="font-bold text-[#062117] mb-2">Booking Summary</h3>
//                 <div className="space-y-1 text-sm text-[#062117]/70">
//                   <p>Email: {bookingData.email}</p>
//                   <p>Date: {bookingData.date}</p>
//                   <p>Time: {bookingData.time}</p>
//                   <p>Duration: {bookingData.duration} minutes</p>
//                   <p className="font-bold text-[#0098cc] text-lg mt-2">
//                     Total: ₹{bookingData.duration === "30" ? mentor.hourlyRate / 2 :
//                       bookingData.duration === "60" ? mentor.hourlyRate :
//                         mentor.hourlyRate * 1.5}
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-[#062117] font-semibold mb-3">
//                   <CreditCard className="w-5 h-5 text-[#0098cc]" />
//                   Payment Method
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: 'upi' }))}
//                     className={`py-3 px-4 rounded-lg border-2 font-medium transition ${bookingData.paymentMethod === 'upi'
//                       ? 'bg-[#0098cc] text-white border-[#0098cc]'
//                       : 'border-gray-200 text-[#062117] hover:border-[#0098cc]'
//                       }`}
//                   >
//                     UPI
//                   </button>
//                   <button
//                     onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: 'card' }))}
//                     className={`py-3 px-4 rounded-lg border-2 font-medium transition ${bookingData.paymentMethod === 'card'
//                       ? 'bg-[#0098cc] text-white border-[#0098cc]'
//                       : 'border-gray-200 text-[#062117] hover:border-[#0098cc]'
//                       }`}
//                   >
//                     Card
//                   </button>
//                 </div>
//               </div>

//               {bookingData.paymentMethod === 'upi' && (
//                 <div className="text-center">
//                   <div className="bg-white p-6 rounded-lg border-2 border-dashed border-[#0098cc] inline-block">
//                     <div className="w-48 h-48 bg-gradient-to-br from-[#0098cc]/20 to-[#007fa3]/20 rounded-lg flex items-center justify-center">
//                       <div className="text-center">
//                         <Upload className="w-12 h-12 text-[#0098cc] mx-auto mb-2" />
//                         <p className="text-sm text-[#062117]/70">UPI QR Code</p>
//                         <p className="text-xs text-[#062117]/50 mt-1">Scan & Pay</p>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-sm text-[#062117]/70 mt-3">
//                     UPI ID: <span className="font-mono font-semibold">mentor@upi</span>
//                   </p>
//                 </div>
//               )}

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-[#062117] font-semibold mb-2 block">
//                     Transaction ID / UTR Number
//                   </label>
//                   <input
//                     type="text"
//                     name="transactionId"
//                     value={bookingData.transactionId}
//                     onChange={handleInputChange}
//                     placeholder="Enter transaction ID"
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0098cc] focus:outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-[#062117] font-semibold mb-2 block">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={bookingData.phoneNumber}
//                     onChange={handleInputChange}
//                     placeholder="Enter your phone number"
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0098cc] focus:outline-none"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setStep(1)}
//                   disabled={isCompletingBooking}
//                   className="flex-1 border-2 border-[#0098cc] text-[#0098cc] font-bold py-3 rounded-lg hover:bg-[#0098cc]/10 transition disabled:opacity-50"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isCompletingBooking}
//                   className="flex-1 bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {isCompletingBooking && <Loader2 className="w-5 h-5 animate-spin" />}
//                   {isCompletingBooking ? "Processing..." : "Submit Booking"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// // Profile Modal Component
// const ProfileModal = ({ mentorId, isOpen, onClose, onBookSession }) => {
//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId, {
//     skip: !isOpen || !mentorId,
//   });




//   // ✅ ADD THIS HELPER FUNCTION
//   const getAvailabilityDisplay = (availability) => {
//     if (!availability || !Array.isArray(availability) || availability.length === 0) {
//       return { hasAvailability: false, message: "No availability set yet" };
//     }

//     // Check if any day has slots
//     const daysWithSlots = availability.filter(day => day.slots && day.slots.length > 0);

//     if (daysWithSlots.length === 0) {
//       return { hasAvailability: false, message: "Availability to be updated by mentor" };
//     }

//     // Get next available day
//     const nextAvailableDay = daysWithSlots[0];
//     const slotsCount = daysWithSlots.reduce((total, day) => total + day.slots.length, 0);

//     return {
//       hasAvailability: true,
//       nextDay: nextAvailableDay.day,
//       firstSlot: nextAvailableDay.slots[0],
//       totalSlots: slotsCount,
//       availableDays: daysWithSlots.length
//     };
//   };

//   const generateHourlySlots = (startTime, endTime) => {
//     const slots = [];
//     const start = parseInt(startTime.split(':')[0]);
//     const end = parseInt(endTime.split(':')[0]);

//     for (let hour = start; hour < end; hour++) {
//       const nextHour = hour + 1;
//       slots.push({
//         start: `${hour.toString().padStart(2, '0')}:00`,
//         end: `${nextHour.toString().padStart(2, '0')}:00`
//       });
//     }

//     return slots;
//   };
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

// // Main MentorsSection Component
// const MentorsSection = () => {
//   const [selectedMentorId, setSelectedMentorId] = useState(null);
//   const [selectedMentor, setSelectedMentor] = useState(null);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

//   const { data, isLoading, isError } = useFetchTopMentorsQuery({ limit: 4 });

//   const mentors = Array.isArray(data) ? data : [];



//   // ✅ ADD THIS HELPER TO GENERATE HOURLY SLOTS FROM TIME RANGE
//   const generateHourlySlots = (startTime, endTime) => {
//     const slots = [];
//     const start = parseInt(startTime.split(':')[0]);
//     const end = parseInt(endTime.split(':')[0]);

//     for (let hour = start; hour < end; hour++) {
//       const nextHour = hour + 1;
//       slots.push({
//         start: `${hour.toString().padStart(2, '0')}:00`,
//         end: `${nextHour.toString().padStart(2, '0')}:00`
//       });
//     }

//     return slots;
//   };

//   const handleBookSession = (mentor) => {
//     setSelectedMentor(mentor);
//     setIsBookingModalOpen(true);
//   };

//   const handleViewProfile = (mentor) => {
//     setSelectedMentorId(mentor._id);
//     setSelectedMentor(mentor);
//     setIsProfileModalOpen(true);
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-[#062117] py-16 flex justify-center items-center">
//         <Loader2 className="w-12 h-12 animate-spin text-white" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="bg-[#062117] py-16 text-center text-red-500">
//         Failed to load mentors. Please try again later.
//       </div>
//     );
//   }

//   if (!mentors.length) {
//     return (
//       <div className="bg-[#062117] py-16 text-center text-white">
//         No mentors available at the moment.
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-[#062117] py-12 md:py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="text-center mb-8 md:mb-12"
//             >
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0098cc] to-[#ffffff] bg-clip-text text-transparent mb-3">
//                 Meet Our Top Mentors
//               </h2>
//               <p className="text-white/80">
//                 Learn from industry experts at leading tech companies
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {mentors.map((mentor, index) => {
//                 const skillsArray = mentor.currentSkills
//                   ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
//                   : [];


//                 return (
//                   <motion.div
//                     key={mentor._id || index}
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#0098cc] hover:shadow-xl transition-all"
//                   >
//                     <div className="w-full h-44 overflow-hidden">
//                       <img
//                         src={mentor.profileImage || "https://via.placeholder.com/400"}
//                         alt={mentor.fullName}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <div className="p-4">
//                       <h3 className="text-[#062117] font-bold text-lg mb-1">
//                         {mentor.fullName || "Unknown Mentor"}
//                       </h3>
//                       <p className="text-[#062117]/70 text-sm mb-2">
//                         {mentor.currentRole || "Role not specified"}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mb-2">
//                         {skillsArray.slice(0, 3).map((skill, i) => (
//                           <span
//                             key={i}
//                             className="text-xs px-2 py-1 bg-[#0098cc]/20 rounded-full text-[#0098cc]"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                           <span className="text-sm text-[#062117] font-semibold">5.0</span>
//                         </div>
//                         <span className="text-sm text-[#062117]/70">
//                           {mentor.yearsOfExperience || 0}+ yrs exp
//                         </span>
//                       </div>

//                       <div className="flex flex-col gap-2">
//                         <button
//                           onClick={() => handleViewProfile(mentor)}
//                           className="w-full border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc] hover:text-white font-semibold py-2 rounded-lg transition-all"
//                         >
//                           View Profile
//                         </button>
//                         <button
//                           onClick={() => handleBookSession(mentor)}
//                           className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded-lg transition-all"
//                         >
//                           Book Session
//                         </button>

//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {selectedMentor && (
//         <>
//           <ProfileModal
//             mentorId={selectedMentorId}
//             isOpen={isProfileModalOpen}
//             onClose={() => setIsProfileModalOpen(false)}
//             onBookSession={() => {
//               setIsProfileModalOpen(false);
//               setIsBookingModalOpen(true);
//             }}
//           />
//           <BookingModal
//             mentor={selectedMentor}
//             isOpen={isBookingModalOpen}
//             onClose={() => setIsBookingModalOpen(false)}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default MentorsSection;



