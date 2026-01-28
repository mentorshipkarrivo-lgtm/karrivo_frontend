// import React, { useState } from "react";
// import { Star, Calendar, X, Clock, Check, Crown } from "lucide-react";
// import {
//     useGetMentorsQuery,
//     useGetSlotsQuery,
//     useBookFreeTrialMutation,
//     useBookPremiumTrialMutation,
// } from "../bookingsapislice"
// import { skipToken } from "@reduxjs/toolkit/query";

// // Dummy mentor data for demonstration
// const dummyMentor = {
//     _id: "dummy_001",
//     fullName: "Sarah Johnson",
//     currentRole: "Senior Product Manager",
//     companyName: "Google",
//     yearsOfExperience: "10",
//     hourlyRate: 2500,
//     areasOfInterest: "Product Management, Leadership, Career Guidance",
//     isDummy: true
// };

// export default function LTMHomeSection() {
//     const { data, isLoading, isError } = useGetMentorsQuery();

//     // Combine real mentors with dummy mentor
//     const realMentors = data?.data?.data || [];
//     const mentors = [dummyMentor, ...realMentors];

//     const [open, setOpen] = useState(false);
//     const [selectedMentor, setSelectedMentor] = useState(null);
//     const [trialType, setTrialType] = useState("FREE");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedSlot, setSelectedSlot] = useState("");

//     // For dummy mentor, generate mock slots
//     const generateDummySlots = () => {
//         return [
//             "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
//             "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
//             "06:00 PM", "06:15 PM", "06:30 PM"
//         ];
//     };

//     const { data: slotsData, isLoading: slotsLoading } = useGetSlotsQuery(
//         selectedMentor && !selectedMentor.isDummy && selectedDate
//             ? { mentorId: selectedMentor._id, date: selectedDate }
//             : skipToken
//     );

//     // Get slots based on whether it's dummy or real mentor
//     const availableSlots = selectedMentor?.isDummy
//         ? generateDummySlots()
//         : (slotsData?.slots || []);

//     const [bookFreeTrial, { isLoading: bookingFree }] = useBookFreeTrialMutation();
//     const [bookPremiumTrial, { isLoading: bookingPremium }] = useBookPremiumTrialMutation();

//     const generateDates = () => {
//         const dates = [];
//         for (let i = 0; i < 7; i++) {
//             const date = new Date();
//             date.setDate(date.getDate() + i);
//             dates.push({
//                 date: date.toISOString().split('T')[0],
//                 day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
//                 displayDate: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
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

//     const submitBooking = async () => {
//         if (!selectedSlot || !selectedDate) {
//             alert("Please select date & time");
//             return;
//         }

//         // Handle dummy mentor booking
//         if (selectedMentor.isDummy) {
//             alert(`✅ Demo Booking Successful!\n\nMentor: ${selectedMentor.fullName}\nDate: ${selectedDate}\nTime: ${selectedSlot}\nType: ${trialType}\n\nThis is a dummy booking for demonstration purposes.`);
//             setOpen(false);
//             return;
//         }

//         // Handle real mentor booking
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
//             alert("Booking failed: " + (error?.data?.message || "Please try again"));
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading mentors...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-center text-red-600">
//                     <p className="text-xl font-semibold">Error loading mentors</p>
//                     <p className="mt-2">Please try again later</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="mb-8">
//                     <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                         Recommended Mentors for you
//                     </h1>
//                     <p className="text-gray-600">
//                         You still have 9 more free trial sessions that you can avail, Book now!
//                     </p>
//                 </div>

//                 {mentors.length === 0 ? (
//                     <div className="text-center py-12">
//                         <p className="text-gray-500 text-lg">No mentors available at the moment</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {mentors.map((mentor) => (
//                             <div
//                                 key={mentor._id}
//                                 className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative"
//                             >
//                                 {mentor.isDummy && (
//                                     <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
//                                         DEMO
//                                     </div>
//                                 )}
//                                 <div className="p-5">
//                                     <div className="flex items-start justify-between mb-4">
//                                         <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center overflow-hidden">
//                                             <span className="text-white text-xl font-bold">
//                                                 {mentor.fullName?.slice(0, 2).toUpperCase()}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-1 bg-white border border-yellow-200 px-2 py-1 rounded-lg">
//                                             <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                                             <span className="font-semibold text-sm text-gray-900">5.0</span>
//                                         </div>
//                                     </div>

//                                     <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-1">
//                                         {mentor.fullName}
//                                     </h3>
//                                     <p className="text-gray-700 text-sm font-medium mb-1 line-clamp-1">
//                                         {mentor.currentRole}
//                                     </p>
//                                     <p className="text-xs text-gray-500 mb-3 line-clamp-1">
//                                         {mentor.yearsOfExperience} Years of Experience
//                                     </p>

//                                     <div className="flex items-center gap-2 mb-4">
//                                         <div className={`${mentor.isDummy ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'} px-2 py-1 rounded-md text-xs font-medium border`}>
//                                             {mentor.companyName}
//                                         </div>
//                                     </div>


//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>


//         </div>
//     );
// }