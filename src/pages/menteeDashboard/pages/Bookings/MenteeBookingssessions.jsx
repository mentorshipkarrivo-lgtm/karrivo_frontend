// // // // // // // // // import React, { useState } from "react";
// // // // // // // // // import { Calendar, Clock, Video, DollarSign, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, RefreshCw, X, ChevronRight, Tag, FileText, Eye } from "lucide-react";
// // // // // // // // // import { useGetMenteeBookingsQuery, useCancelBookingMutation, useRescheduleBookingMutation } from "./Bookingsecapislice"
// // // // // // // // // import Loader from "../../../../global/Loader";


// // // // // // // // // const MenteeBookingssessions = () => {
// // // // // // // // //   // Get bookings from API
// // // // // // // // //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// // // // // // // // //   const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
// // // // // // // // //   const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

// // // // // // // // //   const [selectedBooking, setSelectedBooking] = useState(null);
// // // // // // // // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // // // // // // // //   const [showCancelModal, setShowCancelModal] = useState(false);
// // // // // // // // //   const [showRescheduleModal, setShowRescheduleModal] = useState(false);
// // // // // // // // //   const [cancelReason, setCancelReason] = useState("");
// // // // // // // // //   const [rescheduleDate, setRescheduleDate] = useState("");
// // // // // // // // //   const [rescheduleTime, setRescheduleTime] = useState("");

// // // // // // // // //   // Get bookings from API response
// // // // // // // // //   const bookings = data || [];

// // // // // // // // //   const getStatusBadge = (status) => {
// // // // // // // // //     const statusConfig = {
// // // // // // // // //       confirmed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle, label: "Confirmed" },
// // // // // // // // //       pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: AlertCircle, label: "Pending" },
// // // // // // // // //       cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle, label: "Cancelled" },
// // // // // // // // //       completed: { bg: "bg-blue-100", text: "text-blue-700", icon: CheckCircle, label: "Completed" }
// // // // // // // // //     };
// // // // // // // // //     const config = statusConfig[status] || statusConfig.pending;
// // // // // // // // //     const Icon = config.icon;

// // // // // // // // //     return (
// // // // // // // // //       <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-semibold`}>
// // // // // // // // //         <Icon className="w-3 h-3" />
// // // // // // // // //         {config.label}
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   const getPaymentStatusBadge = (status) => {
// // // // // // // // //     const statusConfig = {
// // // // // // // // //       paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
// // // // // // // // //       pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
// // // // // // // // //       failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" }
// // // // // // // // //     };
// // // // // // // // //     const config = statusConfig[status] || statusConfig.pending;

// // // // // // // // //     return (
// // // // // // // // //       <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-medium`}>
// // // // // // // // //         {config.label}
// // // // // // // // //       </span>
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   const formatDate = (dateString) => {
// // // // // // // // //     const date = new Date(dateString);
// // // // // // // // //     return date.toLocaleDateString('en-US', {
// // // // // // // // //       weekday: 'long',
// // // // // // // // //       year: 'numeric',
// // // // // // // // //       month: 'long',
// // // // // // // // //       day: 'numeric'
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const formatShortDate = (dateString) => {
// // // // // // // // //     const date = new Date(dateString);
// // // // // // // // //     return date.toLocaleDateString('en-US', {
// // // // // // // // //       month: 'short',
// // // // // // // // //       day: 'numeric',
// // // // // // // // //       year: 'numeric'
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const formatDateTime = (dateString) => {
// // // // // // // // //     const date = new Date(dateString);
// // // // // // // // //     return date.toLocaleString('en-US', {
// // // // // // // // //       month: 'short',
// // // // // // // // //       day: 'numeric',
// // // // // // // // //       year: 'numeric',
// // // // // // // // //       hour: '2-digit',
// // // // // // // // //       minute: '2-digit'
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const handleCancelBooking = async () => {
// // // // // // // // //     if (!cancelReason.trim()) {
// // // // // // // // //       alert("Please provide a reason for cancellation");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     try {
// // // // // // // // //       await cancelBooking({
// // // // // // // // //         bookingId: selectedBooking._id,
// // // // // // // // //         reason: cancelReason
// // // // // // // // //       }).unwrap();

// // // // // // // // //       alert("Booking cancelled successfully!");
// // // // // // // // //       setShowCancelModal(false);
// // // // // // // // //       setShowDetailsModal(false);
// // // // // // // // //       setCancelReason("");
// // // // // // // // //       setSelectedBooking(null);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       alert("Failed to cancel booking: " + (error?.data?.message || "Please try again"));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleRescheduleBooking = async () => {
// // // // // // // // //     if (!rescheduleDate || !rescheduleTime) {
// // // // // // // // //       alert("Please select new date and time");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     try {
// // // // // // // // //       await rescheduleBooking({
// // // // // // // // //         bookingId: selectedBooking._id,
// // // // // // // // //         newDate: rescheduleDate,
// // // // // // // // //         newTime: rescheduleTime
// // // // // // // // //       }).unwrap();

// // // // // // // // //       alert("Booking rescheduled successfully!");
// // // // // // // // //       setShowRescheduleModal(false);
// // // // // // // // //       setShowDetailsModal(false);
// // // // // // // // //       setRescheduleDate("");
// // // // // // // // //       setRescheduleTime("");
// // // // // // // // //       setSelectedBooking(null);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       alert("Failed to reschedule booking: " + (error?.data?.message || "Please try again"));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const isUpcoming = (sessionDate) => {
// // // // // // // // //     return new Date(sessionDate) > new Date();
// // // // // // // // //   };

// // // // // // // // //   const handleViewDetails = (booking) => {
// // // // // // // // //     setSelectedBooking(booking);
// // // // // // // // //     setShowDetailsModal(true);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
// // // // // // // // //       <div className="max-w-7xl mx-auto">
// // // // // // // // //         {/* Header */}
// // // // // // // // //         <div className="mb-8">
// // // // // // // // //           <h1 className="text-2xl md:text-2xl font-bold text-gray-900">
// // // // // // // // //             My Bookings
// // // // // // // // //           </h1>
// // // // // // // // //           <p className="text-xs sm:text-sm text-gray-600 mt-1">
// // // // // // // // //             Manage your upcoming and past mentorship sessions
// // // // // // // // //           </p>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Loading State */}
// // // // // // // // //         {isLoading && (
// // // // // // // // //           <div className="flex items-center justify-center py-16">
// // // // // // // // //             <div className="text-center">
// // // // // // // // //               <Loader/>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {/* Error State */}
// // // // // // // // //         {isError && (
// // // // // // // // //           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// // // // // // // // //             <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// // // // // // // // //             <p className="text-red-700 font-semibold mb-2">Failed to load bookings</p>
// // // // // // // // //             <p className="text-red-600 text-sm">
// // // // // // // // //               {error?.data?.message || "Please try again later"}
// // // // // // // // //             </p>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {/* Bookings Grid - Small Cards */}
// // // // // // // // //         {!isLoading && !isError && (
// // // // // // // // //           <>
// // // // // // // // //             {bookings.length === 0 ? (
// // // // // // // // //               <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
// // // // // // // // //                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // // // // // //                   <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
// // // // // // // // //                 </div>                <p className="text-gray-500 text-lg mb-2">No bookings found</p>
// // // // // // // // //                 <p className="text-gray-400 text-sm">Book your first session to get started!</p>
// // // // // // // // //               </div>
// // // // // // // // //             ) : (
// // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // // //                 {bookings.map((booking) => (
// // // // // // // // //                   <div
// // // // // // // // //                     key={booking._id}
// // // // // // // // //                     className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
// // // // // // // // //                   >
// // // // // // // // //                     {/* Card Header with Gradient */}
// // // // // // // // //                     <div className="bg-[#f97818] p-4 text-white">
// // // // // // // // //                       <div className="flex items-start justify-between mb-3">
// // // // // // // // //                         <div className="flex items-center gap-3">
// // // // // // // // //                           <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
// // // // // // // // //                             <span className="text-lg font-bold">
// // // // // // // // //                               {booking.mentorId?.fullName?.slice(0, 2).toUpperCase() || "MN"}
// // // // // // // // //                             </span>
// // // // // // // // //                           </div>
// // // // // // // // //                           <div>
// // // // // // // // //                             <h3 className="font-bold text-base line-clamp-1">
// // // // // // // // //                               {booking.mentorId?.fullName || "Mentor"}
// // // // // // // // //                             </h3>
// // // // // // // // //                             <p className="text-orange-100 text-xs line-clamp-1">
// // // // // // // // //                               {booking.mentorId?.currentRole}
// // // // // // // // //                             </p>
// // // // // // // // //                           </div>
// // // // // // // // //                         </div>
// // // // // // // // //                       </div>
// // // // // // // // //                       <div className="flex flex-wrap gap-2">
// // // // // // // // //                         {getStatusBadge(booking.status)}
// // // // // // // // //                         {getPaymentStatusBadge(booking.paymentStatus)}
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     {/* Card Body */}
// // // // // // // // //                     <div className="p-4 space-y-3">
// // // // // // // // //                       <div className="flex items-center gap-2 text-sm">
// // // // // // // // //                         <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // // // //                         <span className="text-gray-700 font-medium">
// // // // // // // // //                           {formatShortDate(booking.sessionDate)}
// // // // // // // // //                         </span>
// // // // // // // // //                       </div>

// // // // // // // // //                       <div className="flex items-center gap-2 text-sm">
// // // // // // // // //                         <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // // // //                         <span className="text-gray-700">
// // // // // // // // //                           {booking.startTime} ({booking.durationMinutes} min)
// // // // // // // // //                         </span>
// // // // // // // // //                       </div>

// // // // // // // // //                       <div className="flex items-center gap-2 text-sm">
// // // // // // // // //                         <Tag className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // // // //                         <span className="text-gray-700 line-clamp-1">{booking.topic}</span>
// // // // // // // // //                       </div>

// // // // // // // // //                       <div className="flex items-center gap-2 text-sm">
// // // // // // // // //                         <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // // // // // // //                         <span className="text-gray-900 font-bold">
// // // // // // // // //                           ₹{booking.amountPaid || booking.price}
// // // // // // // // //                         </span>
// // // // // // // // //                       </div>

// // // // // // // // //                       {/* View Details Button */}
// // // // // // // // //                       <button
// // // // // // // // //                         onClick={() => handleViewDetails(booking)}
// // // // // // // // //                         className="w-full mt-3 flex items-center justify-center gap-2 bg-[#f97818] hover:bg-[#fba72d] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
// // // // // // // // //                       >
// // // // // // // // //                         <Eye className="w-4 h-4" />
// // // // // // // // //                         View Details
// // // // // // // // //                       </button>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 ))}
// // // // // // // // //               </div>
// // // // // // // // //             )}
// // // // // // // // //           </>
// // // // // // // // //         )}
// // // // // // // // //       </div>

// // // // // // // // //       {/* Details Modal */}
// // // // // // // // //       {showDetailsModal && selectedBooking && (
// // // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
// // // // // // // // //           <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
// // // // // // // // //             {/* Modal Header */}
// // // // // // // // //             <div className="bg-[#f97818] p-6 text-white rounded-t-2xl">
// // // // // // // // //               <div className="flex items-start justify-between">
// // // // // // // // //                 <div className="flex items-center gap-4">
// // // // // // // // //                   <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
// // // // // // // // //                     <span className="text-2xl font-bold">
// // // // // // // // //                       {selectedBooking.mentorId?.fullName?.slice(0, 2).toUpperCase() || "MN"}
// // // // // // // // //                     </span>
// // // // // // // // //                   </div>
// // // // // // // // //                   <div>
// // // // // // // // //                     <h2 className="text-2xl font-bold mb-1">
// // // // // // // // //                       {selectedBooking.mentorId?.fullName || "Mentor"}
// // // // // // // // //                     </h2>
// // // // // // // // //                     <p className="text-orange-100">
// // // // // // // // //                       {selectedBooking.mentorId?.currentRole} at {selectedBooking.mentorId?.companyName}
// // // // // // // // //                     </p>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={() => {
// // // // // // // // //                     setShowDetailsModal(false);
// // // // // // // // //                     setSelectedBooking(null);
// // // // // // // // //                   }}
// // // // // // // // //                   className="text-white/80 hover:text-white transition-colors"
// // // // // // // // //                 >
// // // // // // // // //                   <X className="w-6 h-6" />
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //               <div className="flex flex-wrap gap-2 mt-4">
// // // // // // // // //                 {getStatusBadge(selectedBooking.status)}
// // // // // // // // //                 {getPaymentStatusBadge(selectedBooking.paymentStatus)}
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Modal Body */}
// // // // // // // // //             <div className="p-6 max-h-[70vh] overflow-y-auto">
// // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // // // //                 {/* Session Details */}
// // // // // // // // //                 <div className="space-y-4">
// // // // // // // // //                   <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
// // // // // // // // //                     Session Details
// // // // // // // // //                   </h3>

// // // // // // // // //                   <div className="space-y-3">
// // // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // // //                       <Calendar className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Date</p>
// // // // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // // // //                           {formatDate(selectedBooking.sessionDate)}
// // // // // // // // //                         </p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // // //                       <Clock className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Time</p>
// // // // // // // // //                         <p className="font-semibold text-gray-900">{selectedBooking.startTime}</p>
// // // // // // // // //                         <p className="text-xs text-gray-500 mt-0.5">
// // // // // // // // //                           Duration: {selectedBooking.durationMinutes} minutes
// // // // // // // // //                         </p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // // //                       <Tag className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Session Type</p>
// // // // // // // // //                         <p className="font-semibold text-gray-900">{selectedBooking.sessionType}</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // // //                       <FileText className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Topic</p>
// // // // // // // // //                         <p className="font-semibold text-gray-900">{selectedBooking.topic}</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     {selectedBooking.description && (
// // // // // // // // //                       <div className="flex items-start gap-3">
// // // // // // // // //                         <FileText className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                         <div>
// // // // // // // // //                           <p className="text-xs text-gray-500 mb-0.5">Description</p>
// // // // // // // // //                           <p className="text-sm text-gray-700">{selectedBooking.description}</p>
// // // // // // // // //                         </div>
// // // // // // // // //                       </div>
// // // // // // // // //                     )}

// // // // // // // // //                     {selectedBooking.meetingLink && (
// // // // // // // // //                       <div className="flex items-start gap-3">
// // // // // // // // //                         <Video className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                         <div className="flex-1">
// // // // // // // // //                           <p className="text-xs text-gray-500 mb-1">Meeting Link</p>
// // // // // // // // //                           <a

// // // // // // // // //                             href={selectedBooking.meetingLink}
// // // // // // // // //                             target="_blank"
// // // // // // // // //                             rel="noopener noreferrer"
// // // // // // // // //                             className="text-sm text-[#f97818] hover:text-[#fba72d] font-medium hover:underline break-all"
// // // // // // // // //                           >
// // // // // // // // //                             Join Meeting →
// // // // // // // // //                           </a>
// // // // // // // // //                         </div>
// // // // // // // // //                       </div>
// // // // // // // // //                     )}
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* Payment & Contact Details */}
// // // // // // // // //                 <div className="space-y-4">
// // // // // // // // //                   <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
// // // // // // // // //                     Payment & Contact
// // // // // // // // //                   </h3>

// // // // // // // // //                   <div className="space-y-3">
// // // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // // //                       {/* <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" /> */}
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Amount Paid</p>
// // // // // // // // //                         <p className="font-bold text-gray-900 text-xl">
// // // // // // // // //                           ₹{selectedBooking.amountPaid || selectedBooking.price}
// // // // // // // // //                         </p>
// // // // // // // // //                         <p className="text-xs text-gray-500 mt-0.5">
// // // // // // // // //                           via {selectedBooking.paymentMethod?.toUpperCase()}
// // // // // // // // //                         </p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // // //                       <Mail className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                       <div className="flex-1">
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Email</p>
// // // // // // // // //                         <p className="text-sm text-gray-900 break-all">{selectedBooking.menteeEmail}</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // // //                       <Phone className="w-5 h-5 text-[#f97818] mt-0.5 flex-shrink-0" />
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Phone</p>
// // // // // // // // //                         <p className="text-sm text-gray-900">{selectedBooking.phoneNumber}</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     {selectedBooking.transactionId && (
// // // // // // // // //                       <div className="flex items-start gap-3">
// // // // // // // // //                         <Tag className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
// // // // // // // // //                         <div className="flex-1">
// // // // // // // // //                           <p className="text-xs text-gray-500 mb-0.5">Transaction ID</p>
// // // // // // // // //                           <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">
// // // // // // // // //                             {selectedBooking.transactionId}
// // // // // // // // //                           </p>
// // // // // // // // //                         </div>
// // // // // // // // //                       </div>
// // // // // // // // //                     )}

// // // // // // // // //                     <div className="pt-3 border-t">
// // // // // // // // //                       <p className="text-xs text-gray-500 mb-1">Booking Information</p>
// // // // // // // // //                       <div className="space-y-1 text-xs text-gray-600">
// // // // // // // // //                         <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
// // // // // // // // //                         {selectedBooking.confirmedAt && (
// // // // // // // // //                           <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>
// // // // // // // // //                         )}
// // // // // // // // //                         <p className="font-mono">ID: {selectedBooking._id}</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               {/* Action Buttons */}
// // // // // // // // //               {isUpcoming(selectedBooking.sessionDate) && selectedBooking.status === 'confirmed' && (
// // // // // // // // //                 <div className="border-t mt-6 pt-6">
// // // // // // // // //                   <div className="flex flex-wrap gap-3">
// // // // // // // // //                     {selectedBooking.meetingLink && (
// // // // // // // // //                       <a

// // // // // // // // //                         href={selectedBooking.meetingLink}
// // // // // // // // //                         target="_blank"
// // // // // // // // //                         rel="noopener noreferrer"
// // // // // // // // //                         className="flex items-center gap-2 bg-[#f97818] hover:bg-[#fba72d] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // // // //                       >
// // // // // // // // //                         <Video className="w-5 h-5" />
// // // // // // // // //                         Join Meeting
// // // // // // // // //                       </a>
// // // // // // // // //                     )}

// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               )}
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       {/* Cancel Modal */}
// // // // // // // // //       {showCancelModal && selectedBooking && (
// // // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
// // // // // // // // //           <div className="bg-white rounded-2xl max-w-md w-full p-6">
// // // // // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // // // // //               <h2 className="text-xl font-bold text-gray-900">Cancel Booking</h2>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => {
// // // // // // // // //                   setShowCancelModal(false);
// // // // // // // // //                   setCancelReason("");
// // // // // // // // //                   setShowDetailsModal(true);
// // // // // // // // //                 }}
// // // // // // // // //                 className="text-gray-400 hover:text-gray-600"
// // // // // // // // //               >
// // // // // // // // //                 <X className="w-6 h-6" />
// // // // // // // // //               </button>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="mb-6">
// // // // // // // // //               <p className="text-gray-600 mb-4">
// // // // // // // // //                 Are you sure you want to cancel your session with <strong>{selectedBooking.mentorId?.fullName}</strong> on {formatDate(selectedBooking.sessionDate)}?
// // // // // // // // //               </p>

// // // // // // // // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // // // //                 Reason for cancellation <span className="text-red-500">*</span>
// // // // // // // // //               </label>
// // // // // // // // //               <textarea
// // // // // // // // //                 value={cancelReason}
// // // // // // // // //                 onChange={(e) => setCancelReason(e.target.value)}
// // // // // // // // //                 placeholder="Please provide a reason for cancellation..."
// // // // // // // // //                 rows="4"
// // // // // // // // //                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
// // // // // // // // //               />
// // // // // // // // //             </div>

// // // // // // // // //             <div className="flex gap-3">
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => {
// // // // // // // // //                   setShowCancelModal(false);
// // // // // // // // //                   setCancelReason("");
// // // // // // // // //                   setShowDetailsModal(true);
// // // // // // // // //                 }}
// // // // // // // // //                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // // // //               >
// // // // // // // // //                 Keep Booking
// // // // // // // // //               </button>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={handleCancelBooking}
// // // // // // // // //                 disabled={isCancelling}
// // // // // // // // //                 className="flex-1 bg-[#f97818] hover:bg-[#fba72d] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // // // // //               >
// // // // // // // // //                 {isCancelling ? "Cancelling..." : "Cancel Booking"}
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       {/* Reschedule Modal */}
// // // // // // // // //       {/* {showRescheduleModal && selectedBooking && (
// // // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
// // // // // // // // //           <div className="bg-white rounded-2xl max-w-md w-full p-6">
// // // // // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // // // // //               <h2 className="text-xl font-bold text-gray-900">Reschedule Booking</h2>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => {
// // // // // // // // //                   setShowRescheduleModal(false);
// // // // // // // // //                   setRescheduleDate("");
// // // // // // // // //                   setRescheduleTime("");
// // // // // // // // //                   setShowDetailsModal(true);
// // // // // // // // //                 }}
// // // // // // // // //                 className="text-gray-400 hover:text-gray-600"
// // // // // // // // //               >
// // // // // // // // //                 <X className="w-6 h-6" />
// // // // // // // // //               </button>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="mb-6">
// // // // // // // // //               <p className="text-gray-600 mb-6">
// // // // // // // // //                 Reschedule your session with <strong>{selectedBooking.mentorId?.fullName}</strong>
// // // // // // // // //               </p>

// // // // // // // // //               <div className="space-y-4">
// // // // // // // // //                 <div>
// // // // // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // // // //                     New Date <span className="text-red-500">*</span>
// // // // // // // // //                   </label>
// // // // // // // // //                   <input
// // // // // // // // //                     type="date"
// // // // // // // // //                     value={rescheduleDate}
// // // // // // // // //                     onChange={(e) => setRescheduleDate(e.target.value)}
// // // // // // // // //                     min={new Date().toISOString().split('T')[0]}
// // // // // // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97818] focus:border-transparent"
// // // // // // // // //                   />
// // // // // // // // //                 </div>

// // // // // // // // //                 <div>
// // // // // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // // // //                     New Time <span className="text-red-500">*</span>
// // // // // // // // //                   </label>
// // // // // // // // //                   <input
// // // // // // // // //                     type="time"
// // // // // // // // //                     value={rescheduleTime}
// // // // // // // // //                     onChange={(e) => setRescheduleTime(e.target.value)}
// // // // // // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97818] focus:border-transparent"
// // // // // // // // //                   />
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="flex gap-3">
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => {
// // // // // // // // //                   setShowRescheduleModal(false);
// // // // // // // // //                   setRescheduleDate("");
// // // // // // // // //                   setRescheduleTime("");
// // // // // // // // //                   setShowDetailsModal(true);
// // // // // // // // //                 }}
// // // // // // // // //                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // // // //               >
// // // // // // // // //                 Cancel
// // // // // // // // //               </button>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={handleRescheduleBooking}
// // // // // // // // //                 disabled={isRescheduling}
// // // // // // // // //                 className="flex-1 bg-[#f97818] hover:bg-[#fba72d] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // // // // //               >
// // // // // // // // //                 {isRescheduling ? "Rescheduling..." : "Reschedule"}
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )} */}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default MenteeBookingssessions;






// // // // // // // // import React, { useState } from "react";
// // // // // // // // import {
// // // // // // // //   Calendar,
// // // // // // // //   Clock,
// // // // // // // //   Video,
// // // // // // // //   DollarSign,
// // // // // // // //   Mail,
// // // // // // // //   Phone,
// // // // // // // //   CheckCircle,
// // // // // // // //   XCircle,
// // // // // // // //   AlertCircle,
// // // // // // // //   RefreshCw,
// // // // // // // //   X,
// // // // // // // //   Tag,
// // // // // // // //   FileText,
// // // // // // // //   Eye,
// // // // // // // //   Trash2,
// // // // // // // //   AlertTriangle,
// // // // // // // // } from "lucide-react";
// // // // // // // // import {
// // // // // // // //   useGetMenteeBookingsQuery,
// // // // // // // //   useCancelBookingMutation,
// // // // // // // //   useRescheduleBookingMutation,
// // // // // // // // } from "./Bookingsecapislice";
// // // // // // // // import Loader from "../../../../global/Loader";

// // // // // // // // const MenteeBookingssessions = () => {
// // // // // // // //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// // // // // // // //   const [cancelBooking, { isLoading: isCancelling }] =
// // // // // // // //     useCancelBookingMutation();
// // // // // // // //   const [rescheduleBooking, { isLoading: isRescheduling }] =
// // // // // // // //     useRescheduleBookingMutation();

// // // // // // // //   const [selectedBooking, setSelectedBooking] = useState(null);
// // // // // // // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // // // // // // //   const [showCancelModal, setShowCancelModal] = useState(false);
// // // // // // // //   const [showRescheduleModal, setShowRescheduleModal] = useState(false);
// // // // // // // //   const [cancelReason, setCancelReason] = useState("");
// // // // // // // //   const [rescheduleDate, setRescheduleDate] = useState("");
// // // // // // // //   const [rescheduleTime, setRescheduleTime] = useState("");

// // // // // // // //   const bookings = data || [];

// // // // // // // //   const getStatusBadge = (status) => {
// // // // // // // //     const statusConfig = {
// // // // // // // //       confirmed: {
// // // // // // // //         bg: "bg-green-100",
// // // // // // // //         text: "text-green-700",
// // // // // // // //         icon: CheckCircle,
// // // // // // // //         label: "Confirmed",
// // // // // // // //       },
// // // // // // // //       pending: {
// // // // // // // //         bg: "bg-yellow-100",
// // // // // // // //         text: "text-yellow-700",
// // // // // // // //         icon: AlertCircle,
// // // // // // // //         label: "Pending",
// // // // // // // //       },
// // // // // // // //       cancelled: {
// // // // // // // //         bg: "bg-red-100",
// // // // // // // //         text: "text-red-700",
// // // // // // // //         icon: XCircle,
// // // // // // // //         label: "Cancelled",
// // // // // // // //       },
// // // // // // // //       completed: {
// // // // // // // //         bg: "bg-blue-100",
// // // // // // // //         text: "text-blue-700",
// // // // // // // //         icon: CheckCircle,
// // // // // // // //         label: "Completed",
// // // // // // // //       },
// // // // // // // //     };
// // // // // // // //     const config = statusConfig[status] || statusConfig.pending;
// // // // // // // //     const Icon = config.icon;

// // // // // // // //     return (
// // // // // // // //       <div
// // // // // // // //         className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-semibold`}
// // // // // // // //       >
// // // // // // // //         <Icon className="w-3 h-3" />
// // // // // // // //         {config.label}
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   const getPaymentStatusBadge = (status) => {
// // // // // // // //     const statusConfig = {
// // // // // // // //       paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
// // // // // // // //       pending: {
// // // // // // // //         bg: "bg-orange-100",
// // // // // // // //         text: "text-orange-700",
// // // // // // // //         label: "Pending",
// // // // // // // //       },
// // // // // // // //       failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" },
// // // // // // // //     };
// // // // // // // //     const config = statusConfig[status] || statusConfig.pending;

// // // // // // // //     return (
// // // // // // // //       <span
// // // // // // // //         className={`inline-flex items-center px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-medium`}
// // // // // // // //       >
// // // // // // // //         {config.label}
// // // // // // // //       </span>
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   const formatDate = (dateString) => {
// // // // // // // //     const date = new Date(dateString);
// // // // // // // //     return date.toLocaleDateString("en-US", {
// // // // // // // //       weekday: "long",
// // // // // // // //       year: "numeric",
// // // // // // // //       month: "long",
// // // // // // // //       day: "numeric",
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const formatShortDate = (dateString) => {
// // // // // // // //     const date = new Date(dateString);
// // // // // // // //     return date.toLocaleDateString("en-US", {
// // // // // // // //       month: "short",
// // // // // // // //       day: "numeric",
// // // // // // // //       year: "numeric",
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const formatDateTime = (dateString) => {
// // // // // // // //     const date = new Date(dateString);
// // // // // // // //     return date.toLocaleString("en-US", {
// // // // // // // //       month: "short",
// // // // // // // //       day: "numeric",
// // // // // // // //       year: "numeric",
// // // // // // // //       hour: "2-digit",
// // // // // // // //       minute: "2-digit",
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const isUpcoming = (sessionDate) => {
// // // // // // // //     return new Date(sessionDate) > new Date();
// // // // // // // //   };

// // // // // // // //   const handleViewDetails = (booking) => {
// // // // // // // //     setSelectedBooking(booking);
// // // // // // // //     setShowDetailsModal(true);
// // // // // // // //   };

// // // // // // // //   const openCancel = (booking) => {
// // // // // // // //     setSelectedBooking(booking);
// // // // // // // //     setShowDetailsModal(false);
// // // // // // // //     setShowCancelModal(true);
// // // // // // // //   };

// // // // // // // //   const openReschedule = (booking) => {
// // // // // // // //     setSelectedBooking(booking);
// // // // // // // //     setShowDetailsModal(false);
// // // // // // // //     setShowRescheduleModal(true);
// // // // // // // //   };

// // // // // // // //   const handleCancelBooking = async () => {
// // // // // // // //     if (!cancelReason.trim()) {
// // // // // // // //       alert("Please provide a reason for cancellation");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       await cancelBooking({
// // // // // // // //         bookingId: selectedBooking._id,
// // // // // // // //         reason: cancelReason,
// // // // // // // //       }).unwrap();

// // // // // // // //       alert(
// // // // // // // //         selectedBooking.isFreeSession
// // // // // // // //           ? "Booking cancelled. Your free session has been restored!"
// // // // // // // //           : "Booking cancelled successfully!"
// // // // // // // //       );
// // // // // // // //       setShowCancelModal(false);
// // // // // // // //       setShowDetailsModal(false);
// // // // // // // //       setCancelReason("");
// // // // // // // //       setSelectedBooking(null);
// // // // // // // //     } catch (error) {
// // // // // // // //       alert(
// // // // // // // //         "Failed to cancel booking: " +
// // // // // // // //         (error?.data?.message || "Please try again")
// // // // // // // //       );
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleRescheduleBooking = async () => {
// // // // // // // //     if (!rescheduleDate || !rescheduleTime) {
// // // // // // // //       alert("Please select new date and time");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       await rescheduleBooking({
// // // // // // // //         bookingId: selectedBooking._id,
// // // // // // // //         newDate: rescheduleDate,
// // // // // // // //         newTime: rescheduleTime,
// // // // // // // //       }).unwrap();

// // // // // // // //       alert("Booking rescheduled successfully!");
// // // // // // // //       setShowRescheduleModal(false);
// // // // // // // //       setShowDetailsModal(false);
// // // // // // // //       setRescheduleDate("");
// // // // // // // //       setRescheduleTime("");
// // // // // // // //       setSelectedBooking(null);
// // // // // // // //     } catch (error) {
// // // // // // // //       alert(
// // // // // // // //         "Failed to reschedule booking: " +
// // // // // // // //         (error?.data?.message || "Please try again")
// // // // // // // //       );
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const closeAll = () => {
// // // // // // // //     setShowDetailsModal(false);
// // // // // // // //     setShowCancelModal(false);
// // // // // // // //     setShowRescheduleModal(false);
// // // // // // // //     setCancelReason("");
// // // // // // // //     setRescheduleDate("");
// // // // // // // //     setRescheduleTime("");
// // // // // // // //     setSelectedBooking(null);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
// // // // // // // //       <div className="max-w-7xl mx-auto">
// // // // // // // //         {/* Header */}
// // // // // // // //         <div className="mb-8">
// // // // // // // //           <h1 className="text-2xl md:text-2xl font-bold text-gray-900">
// // // // // // // //             My Bookings
// // // // // // // //           </h1>
// // // // // // // //           <p className="text-xs sm:text-sm text-gray-600 mt-1">
// // // // // // // //             Manage your upcoming and past mentorship sessions
// // // // // // // //           </p>
// // // // // // // //         </div>

// // // // // // // //         {/* Loading State */}
// // // // // // // //         {isLoading && (
// // // // // // // //           <div className="flex items-center justify-center py-16">
// // // // // // // //             <div className="text-center">
// // // // // // // //               <Loader />
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {/* Error State */}
// // // // // // // //         {isError && (
// // // // // // // //           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// // // // // // // //             <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// // // // // // // //             <p className="text-red-700 font-semibold mb-2">
// // // // // // // //               Failed to load bookings
// // // // // // // //             </p>
// // // // // // // //             <p className="text-red-600 text-sm">
// // // // // // // //               {error?.data?.message || "Please try again later"}
// // // // // // // //             </p>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {/* Bookings Grid */}
// // // // // // // //         {!isLoading && !isError && (
// // // // // // // //           <>
// // // // // // // //             {bookings.length === 0 ? (
// // // // // // // //               <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
// // // // // // // //                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // // // // //                   <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#2563ee]" />
// // // // // // // //                 </div>
// // // // // // // //                 <p className="text-gray-500 text-lg mb-2">No bookings found</p>
// // // // // // // //                 <p className="text-gray-400 text-sm">
// // // // // // // //                   Book your first session to get started!
// // // // // // // //                 </p>
// // // // // // // //               </div>
// // // // // // // //             ) : (
// // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // //                 {bookings.map((booking) => {
// // // // // // // //                   const cancellable =
// // // // // // // //                     isUpcoming(booking.sessionDate) &&
// // // // // // // //                     (booking.status === "confirmed" ||
// // // // // // // //                       booking.status === "pending");

// // // // // // // //                   return (
// // // // // // // //                     <div
// // // // // // // //                       key={booking._id}
// // // // // // // //                       className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
// // // // // // // //                     >
// // // // // // // //                       {/* Card Header */}
// // // // // // // //                       <div className="bg-[#2563ee] p-4 text-white">
// // // // // // // //                         <div className="flex items-start justify-between mb-3">
// // // // // // // //                           <div className="flex items-center gap-3">
// // // // // // // //                             <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
// // // // // // // //                               <span className="text-lg font-bold">
// // // // // // // //                                 {booking.mentorId?.fullName
// // // // // // // //                                   ?.slice(0, 2)
// // // // // // // //                                   .toUpperCase() || "MN"}
// // // // // // // //                               </span>
// // // // // // // //                             </div>
// // // // // // // //                             <div>
// // // // // // // //                               <h3 className="font-bold text-base line-clamp-1">
// // // // // // // //                                 {booking.mentorId?.fullName || "Mentor"}
// // // // // // // //                               </h3>
// // // // // // // //                               <p className="text-blue-200 text-xs line-clamp-1">
// // // // // // // //                                 {booking.mentorId?.currentRole}
// // // // // // // //                               </p>
// // // // // // // //                             </div>
// // // // // // // //                           </div>
// // // // // // // //                         </div>
// // // // // // // //                         <div className="flex flex-wrap gap-2">
// // // // // // // //                           {getStatusBadge(booking.status)}
// // // // // // // //                           {getPaymentStatusBadge(booking.paymentStatus)}
// // // // // // // //                         </div>
// // // // // // // //                       </div>

// // // // // // // //                       {/* Card Body */}
// // // // // // // //                       <div className="p-4 space-y-3">
// // // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // // //                           <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // // //                           <span className="text-gray-700 font-medium">
// // // // // // // //                             {formatShortDate(booking.sessionDate)}
// // // // // // // //                           </span>
// // // // // // // //                         </div>

// // // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // // //                           <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // // //                           <span className="text-gray-700">
// // // // // // // //                             {booking.startTime} ({booking.durationMinutes} min)
// // // // // // // //                           </span>
// // // // // // // //                         </div>

// // // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // // //                           <Tag className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // // //                           <span className="text-gray-700 line-clamp-1">
// // // // // // // //                             {booking.topic}
// // // // // // // //                           </span>
// // // // // // // //                         </div>

// // // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // // //                           <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // // // // // //                           <span className="text-gray-900 font-bold">
// // // // // // // //                             ₹{booking.amountPaid || booking.price}
// // // // // // // //                           </span>
// // // // // // // //                         </div>

// // // // // // // //                         {/* View Details Button */}
// // // // // // // //                         <button
// // // // // // // //                           onClick={() => handleViewDetails(booking)}
// // // // // // // //                           className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 text-[#2563ee] px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors hover:bg-blue-100"
// // // // // // // //                         >
// // // // // // // //                           <Eye className="w-4 h-4" />
// // // // // // // //                           View Details
// // // // // // // //                         </button>

// // // // // // // //                         {/* Cancel + Reschedule — only for upcoming confirmed/pending */}
// // // // // // // //                         {cancellable && (
// // // // // // // //                           <div className="grid grid-cols-2 gap-2">
// // // // // // // //                             <button
// // // // // // // //                               onClick={() => openReschedule(booking)}
// // // // // // // //                               className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg font-semibold text-xs transition-colors hover:bg-gray-50"
// // // // // // // //                             >
// // // // // // // //                               <RefreshCw className="w-3.5 h-3.5" />
// // // // // // // //                               Reschedule
// // // // // // // //                             </button>
// // // // // // // //                             <button
// // // // // // // //                               onClick={() => openCancel(booking)}
// // // // // // // //                               className="flex items-center justify-center gap-1.5 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg font-semibold text-xs transition-colors hover:bg-red-100"
// // // // // // // //                             >
// // // // // // // //                               <Trash2 className="w-3.5 h-3.5" />
// // // // // // // //                               Cancel
// // // // // // // //                             </button>
// // // // // // // //                           </div>
// // // // // // // //                         )}
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   );
// // // // // // // //                 })}
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* ══ Details Modal ══ */}
// // // // // // // //       {showDetailsModal && selectedBooking && (
// // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
// // // // // // // //           <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
// // // // // // // //             {/* Modal Header */}
// // // // // // // //             <div className="bg-[#2563ee] p-6 text-white rounded-t-2xl">
// // // // // // // //               <div className="flex items-start justify-between">
// // // // // // // //                 <div className="flex items-center gap-4">
// // // // // // // //                   <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
// // // // // // // //                     <span className="text-2xl font-bold">
// // // // // // // //                       {selectedBooking.mentorId?.fullName
// // // // // // // //                         ?.slice(0, 2)
// // // // // // // //                         .toUpperCase() || "MN"}
// // // // // // // //                     </span>
// // // // // // // //                   </div>
// // // // // // // //                   <div>
// // // // // // // //                     <h2 className="text-2xl font-bold mb-1">
// // // // // // // //                       {selectedBooking.mentorId?.fullName || "Mentor"}
// // // // // // // //                     </h2>
// // // // // // // //                     <p className="text-blue-200">
// // // // // // // //                       {selectedBooking.mentorId?.currentRole}
// // // // // // // //                       {selectedBooking.mentorId?.companyName
// // // // // // // //                         ? ` at ${selectedBooking.mentorId.companyName}`
// // // // // // // //                         : ""}
// // // // // // // //                     </p>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //                 <button
// // // // // // // //                   onClick={closeAll}
// // // // // // // //                   className="text-white/80 hover:text-white transition-colors"
// // // // // // // //                 >
// // // // // // // //                   <X className="w-6 h-6" />
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //               <div className="flex flex-wrap gap-2 mt-4">
// // // // // // // //                 {getStatusBadge(selectedBooking.status)}
// // // // // // // //                 {getPaymentStatusBadge(selectedBooking.paymentStatus)}
// // // // // // // //               </div>
// // // // // // // //             </div>

// // // // // // // //             {/* Modal Body */}
// // // // // // // //             <div className="p-6 max-h-[70vh] overflow-y-auto">
// // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // // //                 {/* Session Details */}
// // // // // // // //                 <div className="space-y-4">
// // // // // // // //                   <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
// // // // // // // //                     Session Details
// // // // // // // //                   </h3>

// // // // // // // //                   <div className="space-y-3">
// // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // //                       <Calendar className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Date</p>
// // // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // // //                           {formatDate(selectedBooking.sessionDate)}
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // //                       <Clock className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Time</p>
// // // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // // //                           {selectedBooking.startTime}
// // // // // // // //                         </p>
// // // // // // // //                         <p className="text-xs text-gray-500 mt-0.5">
// // // // // // // //                           Duration: {selectedBooking.durationMinutes} minutes
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // //                       <Tag className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">
// // // // // // // //                           Session Type
// // // // // // // //                         </p>
// // // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // // //                           {selectedBooking.sessionType}
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // //                       <FileText className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Topic</p>
// // // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // // //                           {selectedBooking.topic}
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     {selectedBooking.description && (
// // // // // // // //                       <div className="flex items-start gap-3">
// // // // // // // //                         <FileText className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                         <div>
// // // // // // // //                           <p className="text-xs text-gray-500 mb-0.5">
// // // // // // // //                             Description
// // // // // // // //                           </p>
// // // // // // // //                           <p className="text-sm text-gray-700">
// // // // // // // //                             {selectedBooking.description}
// // // // // // // //                           </p>
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                     )}

// // // // // // // //                     {selectedBooking.meetingLink && (
// // // // // // // //                       <div className="flex items-start gap-3">
// // // // // // // //                         <Video className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                         <div className="flex-1">
// // // // // // // //                           <p className="text-xs text-gray-500 mb-1">
// // // // // // // //                             Meeting Link
// // // // // // // //                           </p>
// // // // // // // //                           <a
// // // // // // // //                             href={selectedBooking.meetingLink}
// // // // // // // //                             target="_blank"
// // // // // // // //                             rel="noopener noreferrer"
// // // // // // // //                             className="text-sm text-[#2563ee] hover:text-blue-700 font-medium hover:underline break-all"
// // // // // // // //                           >
// // // // // // // //                             Join Meeting →
// // // // // // // //                           </a>
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                     )}
// // // // // // // //                   </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* Payment & Contact Details */}
// // // // // // // //                 <div className="space-y-4">
// // // // // // // //                   <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
// // // // // // // //                     Payment & Contact
// // // // // // // //                   </h3>

// // // // // // // //                   <div className="space-y-3">
// // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // //                       <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">
// // // // // // // //                           Amount Paid
// // // // // // // //                         </p>
// // // // // // // //                         <p className="font-bold text-gray-900 text-xl">
// // // // // // // //                           ₹
// // // // // // // //                           {selectedBooking.amountPaid || selectedBooking.price}
// // // // // // // //                         </p>
// // // // // // // //                         <p className="text-xs text-gray-500 mt-0.5">
// // // // // // // //                           via {selectedBooking.paymentMethod?.toUpperCase()}
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // //                       <Mail className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                       <div className="flex-1">
// // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Email</p>
// // // // // // // //                         <p className="text-sm text-gray-900 break-all">
// // // // // // // //                           {selectedBooking.menteeEmail}
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex items-start gap-3">
// // // // // // // //                       <Phone className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Phone</p>
// // // // // // // //                         <p className="text-sm text-gray-900">
// // // // // // // //                           {selectedBooking.phoneNumber}
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     {selectedBooking.transactionId && (
// // // // // // // //                       <div className="flex items-start gap-3">
// // // // // // // //                         <Tag className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
// // // // // // // //                         <div className="flex-1">
// // // // // // // //                           <p className="text-xs text-gray-500 mb-0.5">
// // // // // // // //                             Transaction ID
// // // // // // // //                           </p>
// // // // // // // //                           <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">
// // // // // // // //                             {selectedBooking.transactionId}
// // // // // // // //                           </p>
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                     )}

// // // // // // // //                     <div className="pt-3 border-t">
// // // // // // // //                       <p className="text-xs text-gray-500 mb-1">
// // // // // // // //                         Booking Information
// // // // // // // //                       </p>
// // // // // // // //                       <div className="space-y-1 text-xs text-gray-600">
// // // // // // // //                         <p>
// // // // // // // //                           Booked: {formatDateTime(selectedBooking.createdAt)}
// // // // // // // //                         </p>
// // // // // // // //                         {selectedBooking.confirmedAt && (
// // // // // // // //                           <p>
// // // // // // // //                             Confirmed:{" "}
// // // // // // // //                             {formatDateTime(selectedBooking.confirmedAt)}
// // // // // // // //                           </p>
// // // // // // // //                         )}
// // // // // // // //                         <p className="font-mono">
// // // // // // // //                           ID: {selectedBooking._id}
// // // // // // // //                         </p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Action Buttons inside modal */}
// // // // // // // //               {isUpcoming(selectedBooking.sessionDate) &&
// // // // // // // //                 (selectedBooking.status === "confirmed" ||
// // // // // // // //                   selectedBooking.status === "pending") && (
// // // // // // // //                   <div className="border-t mt-6 pt-6">
// // // // // // // //                     <div className="flex flex-wrap gap-3">
// // // // // // // //                       {selectedBooking.meetingLink && (
// // // // // // // //                         <a
// // // // // // // //                           href={selectedBooking.meetingLink}
// // // // // // // //                           target="_blank"
// // // // // // // //                           rel="noopener noreferrer"
// // // // // // // //                           className="flex items-center gap-2 bg-[#2563ee] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // // //                         >
// // // // // // // //                           <Video className="w-5 h-5" />
// // // // // // // //                           Join Meeting
// // // // // // // //                         </a>
// // // // // // // //                       )}
// // // // // // // //                       <button
// // // // // // // //                         onClick={() => openReschedule(selectedBooking)}
// // // // // // // //                         className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-50"
// // // // // // // //                       >
// // // // // // // //                         <RefreshCw className="w-5 h-5" />
// // // // // // // //                         Reschedule
// // // // // // // //                       </button>
// // // // // // // //                       <button
// // // // // // // //                         onClick={() => openCancel(selectedBooking)}
// // // // // // // //                         className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-red-100"
// // // // // // // //                       >
// // // // // // // //                         <Trash2 className="w-5 h-5" />
// // // // // // // //                         Cancel Booking
// // // // // // // //                       </button>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {/* ══ Cancel Modal ══ */}
// // // // // // // //       {showCancelModal && selectedBooking && (
// // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
// // // // // // // //           <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
// // // // // // // //             {/* Header */}
// // // // // // // //             <div className="flex items-center justify-between p-5 border-b">
// // // // // // // //               <div className="flex items-center gap-3">
// // // // // // // //                 <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
// // // // // // // //                   <AlertTriangle className="w-5 h-5 text-red-600" />
// // // // // // // //                 </div>
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-900">
// // // // // // // //                   Cancel Booking
// // // // // // // //                 </h2>
// // // // // // // //               </div>
// // // // // // // //               <button
// // // // // // // //                 onClick={() => {
// // // // // // // //                   setShowCancelModal(false);
// // // // // // // //                   setCancelReason("");
// // // // // // // //                 }}
// // // // // // // //                 className="text-gray-400 hover:text-gray-600"
// // // // // // // //               >
// // // // // // // //                 <X className="w-5 h-5" />
// // // // // // // //               </button>
// // // // // // // //             </div>

// // // // // // // //             {/* Body */}
// // // // // // // //             <div className="p-5">
// // // // // // // //               {/* Summary */}
// // // // // // // //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-5">
// // // // // // // //                 <p className="text-sm font-semibold text-gray-900">
// // // // // // // //                   {selectedBooking.mentorId?.fullName}
// // // // // // // //                 </p>
// // // // // // // //                 <p className="text-xs text-gray-600 mt-1">
// // // // // // // //                   {formatShortDate(selectedBooking.sessionDate)} ·{" "}
// // // // // // // //                   {selectedBooking.startTime} · {selectedBooking.durationMinutes}{" "}
// // // // // // // //                   min
// // // // // // // //                 </p>
// // // // // // // //                 {selectedBooking.isFreeSession && (
// // // // // // // //                   <p className="mt-2 text-xs font-semibold text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
// // // // // // // //                     ✓ Your free session will be restored
// // // // // // // //                   </p>
// // // // // // // //                 )}
// // // // // // // //               </div>

// // // // // // // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // // //                 Reason for cancellation{" "}
// // // // // // // //                 <span className="text-red-500">*</span>
// // // // // // // //               </label>
// // // // // // // //               <textarea
// // // // // // // //                 value={cancelReason}
// // // // // // // //                 onChange={(e) => setCancelReason(e.target.value)}
// // // // // // // //                 placeholder="Please let us know why you're cancelling..."
// // // // // // // //                 rows="4"
// // // // // // // //                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
// // // // // // // //               />
// // // // // // // //             </div>

// // // // // // // //             {/* Footer */}
// // // // // // // //             <div className="flex gap-3 p-5 pt-0">
// // // // // // // //               <button
// // // // // // // //                 onClick={() => {
// // // // // // // //                   setShowCancelModal(false);
// // // // // // // //                   setCancelReason("");
// // // // // // // //                 }}
// // // // // // // //                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // // //               >
// // // // // // // //                 Keep Booking
// // // // // // // //               </button>
// // // // // // // //               <button
// // // // // // // //                 onClick={handleCancelBooking}
// // // // // // // //                 disabled={isCancelling}
// // // // // // // //                 className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // // // //               >
// // // // // // // //                 {isCancelling ? "Cancelling..." : "Yes, Cancel"}
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {/* ══ Reschedule Modal ══ */}
// // // // // // // //       {showRescheduleModal && selectedBooking && (
// // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
// // // // // // // //           <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
// // // // // // // //             {/* Header */}
// // // // // // // //             <div className="flex items-center justify-between p-5 border-b">
// // // // // // // //               <div className="flex items-center gap-3">
// // // // // // // //                 <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
// // // // // // // //                   <RefreshCw className="w-5 h-5 text-[#2563ee]" />
// // // // // // // //                 </div>
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-900">
// // // // // // // //                   Reschedule Booking
// // // // // // // //                 </h2>
// // // // // // // //               </div>
// // // // // // // //               <button
// // // // // // // //                 onClick={() => {
// // // // // // // //                   setShowRescheduleModal(false);
// // // // // // // //                   setRescheduleDate("");
// // // // // // // //                   setRescheduleTime("");
// // // // // // // //                 }}
// // // // // // // //                 className="text-gray-400 hover:text-gray-600"
// // // // // // // //               >
// // // // // // // //                 <X className="w-5 h-5" />
// // // // // // // //               </button>
// // // // // // // //             </div>

// // // // // // // //             {/* Body */}
// // // // // // // //             <div className="p-5">
// // // // // // // //               {/* Current booking summary */}
// // // // // // // //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-5">
// // // // // // // //                 <p className="text-xs text-gray-500">Current booking</p>
// // // // // // // //                 <p className="text-sm font-semibold text-gray-900 mt-1">
// // // // // // // //                   {selectedBooking.mentorId?.fullName}
// // // // // // // //                 </p>
// // // // // // // //                 <p className="text-xs text-gray-600 mt-0.5">
// // // // // // // //                   {formatShortDate(selectedBooking.sessionDate)} ·{" "}
// // // // // // // //                   {selectedBooking.startTime} · {selectedBooking.durationMinutes}{" "}
// // // // // // // //                   min
// // // // // // // //                 </p>
// // // // // // // //               </div>

// // // // // // // //               <div className="space-y-4">
// // // // // // // //                 <div>
// // // // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // // //                     New Date <span className="text-red-500">*</span>
// // // // // // // //                   </label>
// // // // // // // //                   <input
// // // // // // // //                     type="date"
// // // // // // // //                     value={rescheduleDate}
// // // // // // // //                     onChange={(e) => setRescheduleDate(e.target.value)}
// // // // // // // //                     min={new Date().toISOString().split("T")[0]}
// // // // // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563ee] focus:border-transparent"
// // // // // // // //                   />
// // // // // // // //                 </div>

// // // // // // // //                 <div>
// // // // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // // //                     New Time <span className="text-red-500">*</span>
// // // // // // // //                   </label>
// // // // // // // //                   <input
// // // // // // // //                     type="time"
// // // // // // // //                     value={rescheduleTime}
// // // // // // // //                     onChange={(e) => setRescheduleTime(e.target.value)}
// // // // // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563ee] focus:border-transparent"
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Info note */}
// // // // // // // //               <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start">
// // // // // // // //                 <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
// // // // // // // //                 <p className="text-xs text-amber-800 leading-relaxed">
// // // // // // // //                   Rescheduling is subject to mentor availability. You'll receive
// // // // // // // //                   a confirmation once approved.
// // // // // // // //                 </p>
// // // // // // // //               </div>
// // // // // // // //             </div>

// // // // // // // //             {/* Footer */}
// // // // // // // //             <div className="flex gap-3 p-5 pt-0">
// // // // // // // //               <button
// // // // // // // //                 onClick={() => {
// // // // // // // //                   setShowRescheduleModal(false);
// // // // // // // //                   setRescheduleDate("");
// // // // // // // //                   setRescheduleTime("");
// // // // // // // //                 }}
// // // // // // // //                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // // //               >
// // // // // // // //                 Go Back
// // // // // // // //               </button>
// // // // // // // //               <button
// // // // // // // //                 onClick={handleRescheduleBooking}
// // // // // // // //                 disabled={
// // // // // // // //                   isRescheduling || !rescheduleDate || !rescheduleTime
// // // // // // // //                 }
// // // // // // // //                 className="flex-1 bg-[#2563ee] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // // // //               >
// // // // // // // //                 {isRescheduling ? "Rescheduling..." : "Confirm Reschedule"}
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default MenteeBookingssessions;

// // // // // // // import React, { useState } from "react";
// // // // // // // import {
// // // // // // //   Calendar,
// // // // // // //   Clock,
// // // // // // //   Video,
// // // // // // //   DollarSign,
// // // // // // //   Mail,
// // // // // // //   Phone,
// // // // // // //   CheckCircle,
// // // // // // //   XCircle,
// // // // // // //   AlertCircle,
// // // // // // //   RefreshCw,
// // // // // // //   X,
// // // // // // //   Tag,
// // // // // // //   FileText,
// // // // // // //   Eye,
// // // // // // //   Trash2,
// // // // // // //   AlertTriangle,
// // // // // // // } from "lucide-react";
// // // // // // // import {
// // // // // // //   useGetMenteeBookingsQuery,
// // // // // // //   useCancelBookingMutation,
// // // // // // //   useRescheduleBookingMutation,
// // // // // // // } from "./Bookingsecapislice";
// // // // // // // import Loader from "../../../../global/Loader";

// // // // // // // const MenteeBookingssessions = () => {
// // // // // // //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// // // // // // //   const [cancelBooking, { isLoading: isCancelling }] =
// // // // // // //     useCancelBookingMutation();
// // // // // // //   const [rescheduleBooking, { isLoading: isRescheduling }] =
// // // // // // //     useRescheduleBookingMutation();

// // // // // // //   const [selectedBooking, setSelectedBooking] = useState(null);
// // // // // // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // // // // // //   const [showCancelModal, setShowCancelModal] = useState(false);
// // // // // // //   const [showRescheduleModal, setShowRescheduleModal] = useState(false);
// // // // // // //   const [cancelReason, setCancelReason] = useState("");
// // // // // // //   const [rescheduleDate, setRescheduleDate] = useState("");
// // // // // // //   const [rescheduleTime, setRescheduleTime] = useState("");

// // // // // // //   // API returns { success, count, data: [...] }
// // // // // // //   const bookings = data?.data || [];


// // // // // // //   const getStatusBadge = (status) => {
// // // // // // //     const statusConfig = {
// // // // // // //       confirmed: {
// // // // // // //         bg: "bg-green-100",
// // // // // // //         text: "text-green-700",
// // // // // // //         icon: CheckCircle,
// // // // // // //         label: "Confirmed",
// // // // // // //       },
// // // // // // //       pending: {
// // // // // // //         bg: "bg-yellow-100",
// // // // // // //         text: "text-yellow-700",
// // // // // // //         icon: AlertCircle,
// // // // // // //         label: "Pending",
// // // // // // //       },
// // // // // // //       cancelled: {
// // // // // // //         bg: "bg-red-100",
// // // // // // //         text: "text-red-700",
// // // // // // //         icon: XCircle,
// // // // // // //         label: "Cancelled",
// // // // // // //       },
// // // // // // //       completed: {
// // // // // // //         bg: "bg-blue-100",
// // // // // // //         text: "text-blue-700",
// // // // // // //         icon: CheckCircle,
// // // // // // //         label: "Completed",
// // // // // // //       },
// // // // // // //     };
// // // // // // //     const config = statusConfig[status] || statusConfig.pending;
// // // // // // //     const Icon = config.icon;

// // // // // // //     return (
// // // // // // //       <div
// // // // // // //         className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-semibold`}
// // // // // // //       >
// // // // // // //         <Icon className="w-3 h-3" />
// // // // // // //         {config.label}
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const getPaymentStatusBadge = (status) => {
// // // // // // //     const statusConfig = {
// // // // // // //       paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
// // // // // // //       pending: {
// // // // // // //         bg: "bg-orange-100",
// // // // // // //         text: "text-orange-700",
// // // // // // //         label: "Pending",
// // // // // // //       },
// // // // // // //       failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" },
// // // // // // //     };
// // // // // // //     const config = statusConfig[status] || statusConfig.pending;

// // // // // // //     return (
// // // // // // //       <span
// // // // // // //         className={`inline-flex items-center px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-medium`}
// // // // // // //       >
// // // // // // //         {config.label}
// // // // // // //       </span>
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const formatDate = (dateString) => {
// // // // // // //     const date = new Date(dateString);
// // // // // // //     return date.toLocaleDateString("en-US", {
// // // // // // //       weekday: "long",
// // // // // // //       year: "numeric",
// // // // // // //       month: "long",
// // // // // // //       day: "numeric",
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const formatShortDate = (dateString) => {
// // // // // // //     const date = new Date(dateString);
// // // // // // //     return date.toLocaleDateString("en-US", {
// // // // // // //       month: "short",
// // // // // // //       day: "numeric",
// // // // // // //       year: "numeric",
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const formatDateTime = (dateString) => {
// // // // // // //     const date = new Date(dateString);
// // // // // // //     return date.toLocaleString("en-US", {
// // // // // // //       month: "short",
// // // // // // //       day: "numeric",
// // // // // // //       year: "numeric",
// // // // // // //       hour: "2-digit",
// // // // // // //       minute: "2-digit",
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const isUpcoming = (sessionDate) => {
// // // // // // //     return new Date(sessionDate) > new Date();
// // // // // // //   };

// // // // // // //   // Helpers — mentorId may be a plain string or a populated object
// // // // // // //   const getMentorName = (booking) =>
// // // // // // //     typeof booking.mentorId === "object"
// // // // // // //       ? booking.mentorId?.fullName || booking.menteeName || "Mentor"
// // // // // // //       : booking.menteeName || "Mentor";

// // // // // // //   const getMentorInitials = (booking) => {
// // // // // // //     const name = getMentorName(booking);
// // // // // // //     return name.slice(0, 2).toUpperCase();
// // // // // // //   };

// // // // // // //   const getMentorRole = (booking) =>
// // // // // // //     typeof booking.mentorId === "object"
// // // // // // //       ? booking.mentorId?.currentRole || "—"
// // // // // // //       : "—";

// // // // // // //   const getMentorCompany = (booking) =>
// // // // // // //     typeof booking.mentorId === "object"
// // // // // // //       ? booking.mentorId?.companyName || ""
// // // // // // //       : "";

// // // // // // //   const handleViewDetails = (booking) => {
// // // // // // //     setSelectedBooking(booking);
// // // // // // //     setShowDetailsModal(true);
// // // // // // //   };

// // // // // // //   const openCancel = (booking) => {
// // // // // // //     setSelectedBooking(booking);
// // // // // // //     setShowDetailsModal(false);
// // // // // // //     setShowCancelModal(true);
// // // // // // //   };

// // // // // // //   const openReschedule = (booking) => {
// // // // // // //     setSelectedBooking(booking);
// // // // // // //     setShowDetailsModal(false);
// // // // // // //     setShowRescheduleModal(true);
// // // // // // //   };

// // // // // // //   const handleCancelBooking = async () => {
// // // // // // //     if (!cancelReason.trim()) {
// // // // // // //       alert("Please provide a reason for cancellation");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       await cancelBooking({
// // // // // // //         bookingId: selectedBooking._id,
// // // // // // //         reason: cancelReason,
// // // // // // //       }).unwrap();

// // // // // // //       alert(
// // // // // // //         selectedBooking.isFreeSession
// // // // // // //           ? "Booking cancelled. Your free session has been restored!"
// // // // // // //           : "Booking cancelled successfully!"
// // // // // // //       );
// // // // // // //       setShowCancelModal(false);
// // // // // // //       setShowDetailsModal(false);
// // // // // // //       setCancelReason("");
// // // // // // //       setSelectedBooking(null);
// // // // // // //     } catch (error) {
// // // // // // //       alert(
// // // // // // //         "Failed to cancel booking: " +
// // // // // // //         (error?.data?.message || "Please try again")
// // // // // // //       );
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleRescheduleBooking = async () => {
// // // // // // //     if (!rescheduleDate || !rescheduleTime) {
// // // // // // //       alert("Please select new date and time");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       await rescheduleBooking({
// // // // // // //         bookingId: selectedBooking._id,
// // // // // // //         newDate: rescheduleDate,
// // // // // // //         newTime: rescheduleTime,
// // // // // // //       }).unwrap();

// // // // // // //       alert("Booking rescheduled successfully!");
// // // // // // //       setShowRescheduleModal(false);
// // // // // // //       setShowDetailsModal(false);
// // // // // // //       setRescheduleDate("");
// // // // // // //       setRescheduleTime("");
// // // // // // //       setSelectedBooking(null);
// // // // // // //     } catch (error) {
// // // // // // //       alert(
// // // // // // //         "Failed to reschedule booking: " +
// // // // // // //         (error?.data?.message || "Please try again")
// // // // // // //       );
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const closeAll = () => {
// // // // // // //     setShowDetailsModal(false);
// // // // // // //     setShowCancelModal(false);
// // // // // // //     setShowRescheduleModal(false);
// // // // // // //     setCancelReason("");
// // // // // // //     setRescheduleDate("");
// // // // // // //     setRescheduleTime("");
// // // // // // //     setSelectedBooking(null);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
// // // // // // //       <div className="max-w-7xl mx-auto">
// // // // // // //         {/* Header */}
// // // // // // //         <div className="mb-8">
// // // // // // //           <h1 className="text-2xl md:text-2xl font-bold text-gray-900">
// // // // // // //             My Bookings
// // // // // // //           </h1>
// // // // // // //           <p className="text-xs sm:text-sm text-gray-600 mt-1">
// // // // // // //             Manage your upcoming and past mentorship sessions
// // // // // // //           </p>
// // // // // // //         </div>

// // // // // // //         {/* Loading State */}
// // // // // // //         {isLoading && (
// // // // // // //           <div className="flex items-center justify-center py-16">
// // // // // // //             <div className="text-center">
// // // // // // //               <Loader />
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* Error State */}
// // // // // // //         {isError && (
// // // // // // //           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// // // // // // //             <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// // // // // // //             <p className="text-red-700 font-semibold mb-2">
// // // // // // //               Failed to load bookings
// // // // // // //             </p>
// // // // // // //             <p className="text-red-600 text-sm">
// // // // // // //               {error?.data?.message || "Please try again later"}
// // // // // // //             </p>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* Bookings Grid */}
// // // // // // //         {!isLoading && !isError && (
// // // // // // //           <>
// // // // // // //             {bookings.length === 0 ? (
// // // // // // //               <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
// // // // // // //                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // // // //                   <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#2563ee]" />
// // // // // // //                 </div>
// // // // // // //                 <p className="text-gray-500 text-lg mb-2">No bookings found</p>
// // // // // // //                 <p className="text-gray-400 text-sm">
// // // // // // //                   Book your first session to get started!
// // // // // // //                 </p>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //                 {bookings.map((booking) => {
// // // // // // //                   const cancellable =
// // // // // // //                     booking.status === "confirmed" ||
// // // // // // //                     booking.status === "pending";

// // // // // // //                   return (
// // // // // // //                     <div
// // // // // // //                       key={booking._id}
// // // // // // //                       className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
// // // // // // //                     >
// // // // // // //                       {/* Card Header */}
// // // // // // //                       <div className="bg-[#2563ee] p-4 text-white">
// // // // // // //                         <div className="flex items-start justify-between mb-3">
// // // // // // //                           <div className="flex items-center gap-3">
// // // // // // //                             <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
// // // // // // //                               <span className="text-lg font-bold">
// // // // // // //                                 {getMentorInitials(booking)}
// // // // // // //                               </span>
// // // // // // //                             </div>
// // // // // // //                             <div>
// // // // // // //                               <h3 className="font-bold text-base line-clamp-1">
// // // // // // //                                 {getMentorName(booking)}
// // // // // // //                               </h3>
// // // // // // //                               <p className="text-blue-200 text-xs line-clamp-1">
// // // // // // //                                 {getMentorRole(booking)}
// // // // // // //                               </p>
// // // // // // //                             </div>
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                         <div className="flex flex-wrap gap-2">
// // // // // // //                           {getStatusBadge(booking.status)}
// // // // // // //                           {getPaymentStatusBadge(booking.paymentStatus)}
// // // // // // //                         </div>
// // // // // // //                       </div>

// // // // // // //                       {/* Card Body */}
// // // // // // //                       <div className="p-4 space-y-3">
// // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // //                           <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // //                           <span className="text-gray-700 font-medium">
// // // // // // //                             {formatShortDate(booking.sessionDate)}
// // // // // // //                           </span>
// // // // // // //                         </div>

// // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // //                           <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // //                           <span className="text-gray-700">
// // // // // // //                             {booking.startTime} ({booking.durationMinutes} min)
// // // // // // //                           </span>
// // // // // // //                         </div>

// // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // //                           <Tag className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // // //                           <span className="text-gray-700 line-clamp-1">
// // // // // // //                             {booking.topic}
// // // // // // //                           </span>
// // // // // // //                         </div>

// // // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // // //                           <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // // // // //                           <span className="text-gray-900 font-bold">
// // // // // // //                             ₹{booking.amountPaid || booking.price}
// // // // // // //                           </span>
// // // // // // //                         </div>

// // // // // // //                         {/* View Details Button */}
// // // // // // //                         <button
// // // // // // //                           onClick={() => handleViewDetails(booking)}
// // // // // // //                           className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 text-[#2563ee] px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors hover:bg-blue-100"
// // // // // // //                         >
// // // // // // //                           <Eye className="w-4 h-4" />
// // // // // // //                           View Details
// // // // // // //                         </button>

// // // // // // //                         {/* Cancel + Reschedule — only for upcoming confirmed/pending */}
// // // // // // //                         {cancellable && (
// // // // // // //                           <div className="grid grid-cols-2 gap-2">
// // // // // // //                             <button
// // // // // // //                               onClick={() => openReschedule(booking)}
// // // // // // //                               className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg font-semibold text-xs transition-colors hover:bg-gray-50"
// // // // // // //                             >
// // // // // // //                               <RefreshCw className="w-3.5 h-3.5" />
// // // // // // //                               Reschedule
// // // // // // //                             </button>
// // // // // // //                             <button
// // // // // // //                               onClick={() => openCancel(booking)}
// // // // // // //                               className="flex items-center justify-center gap-1.5 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg font-semibold text-xs transition-colors hover:bg-red-100"
// // // // // // //                             >
// // // // // // //                               <Trash2 className="w-3.5 h-3.5" />
// // // // // // //                               Cancel
// // // // // // //                             </button>
// // // // // // //                           </div>
// // // // // // //                         )}
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   );
// // // // // // //                 })}
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* ══ Details Modal ══ */}
// // // // // // //       {showDetailsModal && selectedBooking && (
// // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
// // // // // // //           <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
// // // // // // //             {/* Modal Header */}
// // // // // // //             <div className="bg-[#2563ee] p-6 text-white rounded-t-2xl">
// // // // // // //               <div className="flex items-start justify-between">
// // // // // // //                 <div className="flex items-center gap-4">
// // // // // // //                   <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
// // // // // // //                     <span className="text-2xl font-bold">
// // // // // // //                       {getMentorInitials(selectedBooking)}
// // // // // // //                     </span>
// // // // // // //                   </div>
// // // // // // //                   <div>
// // // // // // //                     <h2 className="text-2xl font-bold mb-1">
// // // // // // //                       {getMentorName(selectedBooking)}
// // // // // // //                     </h2>
// // // // // // //                     <p className="text-blue-200">
// // // // // // //                       {getMentorRole(selectedBooking)}
// // // // // // //                       {getMentorCompany(selectedBooking)
// // // // // // //                         ? ` at ${getMentorCompany(selectedBooking)}`
// // // // // // //                         : ""}
// // // // // // //                     </p>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //                 <button
// // // // // // //                   onClick={closeAll}
// // // // // // //                   className="text-white/80 hover:text-white transition-colors"
// // // // // // //                 >
// // // // // // //                   <X className="w-6 h-6" />
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //               <div className="flex flex-wrap gap-2 mt-4">
// // // // // // //                 {getStatusBadge(selectedBooking.status)}
// // // // // // //                 {getPaymentStatusBadge(selectedBooking.paymentStatus)}
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* Modal Body */}
// // // // // // //             <div className="p-6 max-h-[70vh] overflow-y-auto">
// // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // //                 {/* Session Details */}
// // // // // // //                 <div className="space-y-4">
// // // // // // //                   <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
// // // // // // //                     Session Details
// // // // // // //                   </h3>

// // // // // // //                   <div className="space-y-3">
// // // // // // //                     <div className="flex items-start gap-3">
// // // // // // //                       <Calendar className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                       <div>
// // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Date</p>
// // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // //                           {formatDate(selectedBooking.sessionDate)}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex items-start gap-3">
// // // // // // //                       <Clock className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                       <div>
// // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Time</p>
// // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // //                           {selectedBooking.startTime}
// // // // // // //                         </p>
// // // // // // //                         <p className="text-xs text-gray-500 mt-0.5">
// // // // // // //                           Duration: {selectedBooking.durationMinutes} minutes
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex items-start gap-3">
// // // // // // //                       <Tag className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                       <div>
// // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">
// // // // // // //                           Session Type
// // // // // // //                         </p>
// // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // //                           {selectedBooking.sessionType}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex items-start gap-3">
// // // // // // //                       <FileText className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                       <div>
// // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Topic</p>
// // // // // // //                         <p className="font-semibold text-gray-900">
// // // // // // //                           {selectedBooking.topic}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     {selectedBooking.description && (
// // // // // // //                       <div className="flex items-start gap-3">
// // // // // // //                         <FileText className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                         <div>
// // // // // // //                           <p className="text-xs text-gray-500 mb-0.5">
// // // // // // //                             Description
// // // // // // //                           </p>
// // // // // // //                           <p className="text-sm text-gray-700">
// // // // // // //                             {selectedBooking.description}
// // // // // // //                           </p>
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     )}

// // // // // // //                     {selectedBooking.meetingLink && (
// // // // // // //                       <div className="flex items-start gap-3">
// // // // // // //                         <Video className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                         <div className="flex-1">
// // // // // // //                           <p className="text-xs text-gray-500 mb-1">
// // // // // // //                             Meeting Link
// // // // // // //                           </p>
// // // // // // //                           <a
// // // // // // //                             href={selectedBooking.meetingLink}
// // // // // // //                             target="_blank"
// // // // // // //                             rel="noopener noreferrer"
// // // // // // //                             className="text-sm text-[#2563ee] hover:text-blue-700 font-medium hover:underline break-all"
// // // // // // //                           >
// // // // // // //                             Join Meeting →
// // // // // // //                           </a>
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     )}
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* Payment & Contact Details */}
// // // // // // //                 <div className="space-y-4">
// // // // // // //                   <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
// // // // // // //                     Payment & Contact
// // // // // // //                   </h3>

// // // // // // //                   <div className="space-y-3">
// // // // // // //                     <div className="flex items-start gap-3">
// // // // // // //                       <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
// // // // // // //                       <div>
// // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">
// // // // // // //                           Amount Paid
// // // // // // //                         </p>
// // // // // // //                         <p className="font-bold text-gray-900 text-xl">
// // // // // // //                           ₹
// // // // // // //                           {selectedBooking.amountPaid || selectedBooking.price}
// // // // // // //                         </p>
// // // // // // //                         <p className="text-xs text-gray-500 mt-0.5">
// // // // // // //                           via {selectedBooking.paymentMethod?.toUpperCase()}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex items-start gap-3">
// // // // // // //                       <Mail className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                       <div className="flex-1">
// // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Email</p>
// // // // // // //                         <p className="text-sm text-gray-900 break-all">
// // // // // // //                           {selectedBooking.menteeEmail}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex items-start gap-3">
// // // // // // //                       <Phone className="w-5 h-5 text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // // //                       <div>
// // // // // // //                         <p className="text-xs text-gray-500 mb-0.5">Phone</p>
// // // // // // //                         <p className="text-sm text-gray-900">
// // // // // // //                           {selectedBooking.phoneNumber}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     {selectedBooking.transactionId && (
// // // // // // //                       <div className="flex items-start gap-3">
// // // // // // //                         <Tag className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
// // // // // // //                         <div className="flex-1">
// // // // // // //                           <p className="text-xs text-gray-500 mb-0.5">
// // // // // // //                             Transaction ID
// // // // // // //                           </p>
// // // // // // //                           <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">
// // // // // // //                             {selectedBooking.transactionId}
// // // // // // //                           </p>
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     )}

// // // // // // //                     <div className="pt-3 border-t">
// // // // // // //                       <p className="text-xs text-gray-500 mb-1">
// // // // // // //                         Booking Information
// // // // // // //                       </p>
// // // // // // //                       <div className="space-y-1 text-xs text-gray-600">
// // // // // // //                         <p>
// // // // // // //                           Booked: {formatDateTime(selectedBooking.createdAt)}
// // // // // // //                         </p>
// // // // // // //                         {selectedBooking.confirmedAt && (
// // // // // // //                           <p>
// // // // // // //                             Confirmed:{" "}
// // // // // // //                             {formatDateTime(selectedBooking.confirmedAt)}
// // // // // // //                           </p>
// // // // // // //                         )}
// // // // // // //                         <p className="font-mono">
// // // // // // //                           ID: {selectedBooking._id}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Action Buttons inside modal */}
// // // // // // //               {(selectedBooking.status === "confirmed" ||
// // // // // // //                 selectedBooking.status === "pending") && (
// // // // // // //                   <div className="border-t mt-6 pt-6">
// // // // // // //                     <div className="flex flex-wrap gap-3">
// // // // // // //                       {selectedBooking.meetingLink && (
// // // // // // //                         <a
// // // // // // //                           href={selectedBooking.meetingLink}
// // // // // // //                           target="_blank"
// // // // // // //                           rel="noopener noreferrer"
// // // // // // //                           className="flex items-center gap-2 bg-[#2563ee] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // //                         >
// // // // // // //                           <Video className="w-5 h-5" />
// // // // // // //                           Join Meeting
// // // // // // //                         </a>
// // // // // // //                       )}
// // // // // // //                       <button
// // // // // // //                         onClick={() => openReschedule(selectedBooking)}
// // // // // // //                         className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-50"
// // // // // // //                       >
// // // // // // //                         <RefreshCw className="w-5 h-5" />
// // // // // // //                         Reschedule
// // // // // // //                       </button>
// // // // // // //                       <button
// // // // // // //                         onClick={() => openCancel(selectedBooking)}
// // // // // // //                         className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-red-100"
// // // // // // //                       >
// // // // // // //                         <Trash2 className="w-5 h-5" />
// // // // // // //                         Cancel Booking
// // // // // // //                       </button>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* ══ Cancel Modal ══ */}
// // // // // // //       {showCancelModal && selectedBooking && (
// // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
// // // // // // //           <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
// // // // // // //             {/* Header */}
// // // // // // //             <div className="flex items-center justify-between p-5 border-b">
// // // // // // //               <div className="flex items-center gap-3">
// // // // // // //                 <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
// // // // // // //                   <AlertTriangle className="w-5 h-5 text-red-600" />
// // // // // // //                 </div>
// // // // // // //                 <h2 className="text-lg font-bold text-gray-900">
// // // // // // //                   Cancel Booking
// // // // // // //                 </h2>
// // // // // // //               </div>
// // // // // // //               <button
// // // // // // //                 onClick={() => {
// // // // // // //                   setShowCancelModal(false);
// // // // // // //                   setCancelReason("");
// // // // // // //                 }}
// // // // // // //                 className="text-gray-400 hover:text-gray-600"
// // // // // // //               >
// // // // // // //                 <X className="w-5 h-5" />
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //             {/* Body */}
// // // // // // //             <div className="p-5">
// // // // // // //               {/* Summary */}
// // // // // // //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-5">
// // // // // // //                 <p className="text-sm font-semibold text-gray-900">
// // // // // // //                   {getMentorName(selectedBooking)}
// // // // // // //                 </p>
// // // // // // //                 <p className="text-xs text-gray-600 mt-1">
// // // // // // //                   {formatShortDate(selectedBooking.sessionDate)} ·{" "}
// // // // // // //                   {selectedBooking.startTime} · {selectedBooking.durationMinutes}{" "}
// // // // // // //                   min
// // // // // // //                 </p>
// // // // // // //                 {selectedBooking.isFreeSession && (
// // // // // // //                   <p className="mt-2 text-xs font-semibold text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
// // // // // // //                     ✓ Your free session will be restored
// // // // // // //                   </p>
// // // // // // //                 )}
// // // // // // //               </div>

// // // // // // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // //                 Reason for cancellation{" "}
// // // // // // //                 <span className="text-red-500">*</span>
// // // // // // //               </label>
// // // // // // //               <textarea
// // // // // // //                 value={cancelReason}
// // // // // // //                 onChange={(e) => setCancelReason(e.target.value)}
// // // // // // //                 placeholder="Please let us know why you're cancelling..."
// // // // // // //                 rows="4"
// // // // // // //                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
// // // // // // //               />
// // // // // // //             </div>

// // // // // // //             {/* Footer */}
// // // // // // //             <div className="flex gap-3 p-5 pt-0">
// // // // // // //               <button
// // // // // // //                 onClick={() => {
// // // // // // //                   setShowCancelModal(false);
// // // // // // //                   setCancelReason("");
// // // // // // //                 }}
// // // // // // //                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // //               >
// // // // // // //                 Keep Booking
// // // // // // //               </button>
// // // // // // //               <button
// // // // // // //                 onClick={handleCancelBooking}
// // // // // // //                 disabled={isCancelling}
// // // // // // //                 className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // // //               >
// // // // // // //                 {isCancelling ? "Cancelling..." : "Yes, Cancel"}
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* ══ Reschedule Modal ══ */}
// // // // // // //       {showRescheduleModal && selectedBooking && (
// // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
// // // // // // //           <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
// // // // // // //             {/* Header */}
// // // // // // //             <div className="flex items-center justify-between p-5 border-b">
// // // // // // //               <div className="flex items-center gap-3">
// // // // // // //                 <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
// // // // // // //                   <RefreshCw className="w-5 h-5 text-[#2563ee]" />
// // // // // // //                 </div>
// // // // // // //                 <h2 className="text-lg font-bold text-gray-900">
// // // // // // //                   Reschedule Booking
// // // // // // //                 </h2>
// // // // // // //               </div>
// // // // // // //               <button
// // // // // // //                 onClick={() => {
// // // // // // //                   setShowRescheduleModal(false);
// // // // // // //                   setRescheduleDate("");
// // // // // // //                   setRescheduleTime("");
// // // // // // //                 }}
// // // // // // //                 className="text-gray-400 hover:text-gray-600"
// // // // // // //               >
// // // // // // //                 <X className="w-5 h-5" />
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //             {/* Body */}
// // // // // // //             <div className="p-5">
// // // // // // //               {/* Current booking summary */}
// // // // // // //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-5">
// // // // // // //                 <p className="text-xs text-gray-500">Current booking</p>
// // // // // // //                 <p className="text-sm font-semibold text-gray-900 mt-1">
// // // // // // //                   {getMentorName(selectedBooking)}
// // // // // // //                 </p>
// // // // // // //                 <p className="text-xs text-gray-600 mt-0.5">
// // // // // // //                   {formatShortDate(selectedBooking.sessionDate)} ·{" "}
// // // // // // //                   {selectedBooking.startTime} · {selectedBooking.durationMinutes}{" "}
// // // // // // //                   min
// // // // // // //                 </p>
// // // // // // //               </div>

// // // // // // //               <div className="space-y-4">
// // // // // // //                 <div>
// // // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // //                     New Date <span className="text-red-500">*</span>
// // // // // // //                   </label>
// // // // // // //                   <input
// // // // // // //                     type="date"
// // // // // // //                     value={rescheduleDate}
// // // // // // //                     onChange={(e) => setRescheduleDate(e.target.value)}
// // // // // // //                     min={new Date().toISOString().split("T")[0]}
// // // // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563ee] focus:border-transparent"
// // // // // // //                   />
// // // // // // //                 </div>

// // // // // // //                 <div>
// // // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // // //                     New Time <span className="text-red-500">*</span>
// // // // // // //                   </label>
// // // // // // //                   <input
// // // // // // //                     type="time"
// // // // // // //                     value={rescheduleTime}
// // // // // // //                     onChange={(e) => setRescheduleTime(e.target.value)}
// // // // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563ee] focus:border-transparent"
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Info note */}
// // // // // // //               <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start">
// // // // // // //                 <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
// // // // // // //                 <p className="text-xs text-amber-800 leading-relaxed">
// // // // // // //                   Rescheduling is subject to mentor availability. You'll receive
// // // // // // //                   a confirmation once approved.
// // // // // // //                 </p>
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* Footer */}
// // // // // // //             <div className="flex gap-3 p-5 pt-0">
// // // // // // //               <button
// // // // // // //                 onClick={() => {
// // // // // // //                   setShowRescheduleModal(false);
// // // // // // //                   setRescheduleDate("");
// // // // // // //                   setRescheduleTime("");
// // // // // // //                 }}
// // // // // // //                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
// // // // // // //               >
// // // // // // //                 Go Back
// // // // // // //               </button>
// // // // // // //               <button
// // // // // // //                 onClick={handleRescheduleBooking}
// // // // // // //                 disabled={
// // // // // // //                   isRescheduling || !rescheduleDate || !rescheduleTime
// // // // // // //                 }
// // // // // // //                 className="flex-1 bg-[#2563ee] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // // //               >
// // // // // // //                 {isRescheduling ? "Rescheduling..." : "Confirm Reschedule"}
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default MenteeBookingssessions;

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import {
// // // // // //   Calendar,
// // // // // //   Clock,
// // // // // //   Video,
// // // // // //   DollarSign,
// // // // // //   Mail,
// // // // // //   Phone,
// // // // // //   CheckCircle,
// // // // // //   XCircle,
// // // // // //   AlertCircle,
// // // // // //   RefreshCw,
// // // // // //   X,
// // // // // //   Tag,
// // // // // //   FileText,
// // // // // //   Eye,
// // // // // //   Trash2,
// // // // // //   AlertTriangle,
// // // // // //   ArrowLeft,
// // // // // //   Hash,
// // // // // // } from "lucide-react";
// // // // // // import {
// // // // // //   useGetMenteeBookingsQuery,
// // // // // //   useCancelBookingMutation,
// // // // // //   useRescheduleBookingMutation,
// // // // // // } from "./Bookingsecapislice";
// // // // // // import Loader from "../../../../global/Loader";

// // // // // // const MenteeBookingssessions = () => {
// // // // // //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// // // // // //   const [cancelBooking, { isLoading: isCancelling }] =
// // // // // //     useCancelBookingMutation();
// // // // // //   const [rescheduleBooking, { isLoading: isRescheduling }] =
// // // // // //     useRescheduleBookingMutation();

// // // // // //   const [selectedBooking, setSelectedBooking] = useState(null);
// // // // // //   // panelView: "details" | "cancel" | "reschedule"
// // // // // //   const [panelView, setPanelView] = useState("details");
// // // // // //   const [panelOpen, setPanelOpen] = useState(false);
// // // // // //   const [cancelReason, setCancelReason] = useState("");
// // // // // //   const [rescheduleDate, setRescheduleDate] = useState("");
// // // // // //   const [rescheduleTime, setRescheduleTime] = useState("");

// // // // // //   // API returns { success, count, data: [...] }
// // // // // //   const bookings = data?.data || [];

// // // // // //   /* ── Open / Close Panel ── */
// // // // // //   const openPanel = (booking, view = "details") => {
// // // // // //     setSelectedBooking(booking);
// // // // // //     setPanelView(view);
// // // // // //     setPanelOpen(true);
// // // // // //   };

// // // // // //   const closePanel = () => {
// // // // // //     setPanelOpen(false);
// // // // // //     setTimeout(() => {
// // // // // //       setSelectedBooking(null);
// // // // // //       setPanelView("details");
// // // // // //       setCancelReason("");
// // // // // //       setRescheduleDate("");
// // // // // //       setRescheduleTime("");
// // // // // //     }, 300);
// // // // // //   };

// // // // // //   // Lock body scroll when panel is open
// // // // // //   useEffect(() => {
// // // // // //     if (panelOpen) {
// // // // // //       document.body.style.overflow = "hidden";
// // // // // //     } else {
// // // // // //       document.body.style.overflow = "";
// // // // // //     }
// // // // // //     return () => {
// // // // // //       document.body.style.overflow = "";
// // // // // //     };
// // // // // //   }, [panelOpen]);

// // // // // //   /* ── Badges ── */
// // // // // //   const getStatusBadge = (status) => {
// // // // // //     const cfg = {
// // // // // //       confirmed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle, label: "Confirmed" },
// // // // // //       pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: AlertCircle, label: "Pending" },
// // // // // //       cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle, label: "Cancelled" },
// // // // // //       completed: { bg: "bg-blue-100", text: "text-blue-700", icon: CheckCircle, label: "Completed" },
// // // // // //     };
// // // // // //     const c = cfg[status] || cfg.pending;
// // // // // //     const Icon = c.icon;
// // // // // //     return (
// // // // // //       <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${c.bg} ${c.text} text-xs font-semibold`}>
// // // // // //         <Icon className="w-3 h-3" />{c.label}
// // // // // //       </div>
// // // // // //     );
// // // // // //   };

// // // // // //   const getPaymentStatusBadge = (status) => {
// // // // // //     const cfg = {
// // // // // //       paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
// // // // // //       pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
// // // // // //       failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" },
// // // // // //     };
// // // // // //     const c = cfg[status] || cfg.pending;
// // // // // //     return (
// // // // // //       <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${c.bg} ${c.text} text-xs font-medium`}>
// // // // // //         {c.label}
// // // // // //       </span>
// // // // // //     );
// // // // // //   };

// // // // // //   /* ── Formatters ── */
// // // // // //   const formatDate = (d) =>
// // // // // //     new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
// // // // // //   const formatShortDate = (d) =>
// // // // // //     new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// // // // // //   const formatDateTime = (d) =>
// // // // // //     new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

// // // // // //   /* ── Mentor helpers (mentorId can be string or populated object) ── */
// // // // // //   const getMentorName = (b) =>
// // // // // //     typeof b.mentorId === "object" ? b.mentorId?.fullName || b.menteeName || "Mentor" : b.menteeName || "Mentor";
// // // // // //   const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
// // // // // //   const getMentorRole = (b) =>
// // // // // //     typeof b.mentorId === "object" ? b.mentorId?.currentRole || "—" : "—";
// // // // // //   const getMentorCompany = (b) =>
// // // // // //     typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";

// // // // // //   /* ── Actions ── */
// // // // // //   const handleCancelBooking = async () => {
// // // // // //     if (!cancelReason.trim()) { alert("Please provide a reason for cancellation"); return; }
// // // // // //     try {
// // // // // //       await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
// // // // // //       alert(selectedBooking.isFreeSession ? "Booking cancelled. Your free session has been restored!" : "Booking cancelled successfully!");
// // // // // //       closePanel();
// // // // // //     } catch (err) {
// // // // // //       alert("Failed to cancel: " + (err?.data?.message || "Please try again"));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleRescheduleBooking = async () => {
// // // // // //     if (!rescheduleDate || !rescheduleTime) { alert("Please select new date and time"); return; }
// // // // // //     try {
// // // // // //       await rescheduleBooking({ bookingId: selectedBooking._id, newDate: rescheduleDate, newTime: rescheduleTime }).unwrap();
// // // // // //       alert("Booking rescheduled successfully!");
// // // // // //       closePanel();
// // // // // //     } catch (err) {
// // // // // //       alert("Failed to reschedule: " + (err?.data?.message || "Please try again"));
// // // // // //     }
// // // // // //   };

// // // // // //   /* ══════════════════════════════════════════════════════════════
// // // // // //      RENDER
// // // // // //   ══════════════════════════════════════════════════════════════ */
// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
// // // // // //       <div className="max-w-7xl mx-auto">
// // // // // //         {/* Header */}
// // // // // //         <div className="mb-8">
// // // // // //           <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
// // // // // //           <p className="text-xs sm:text-sm text-gray-600 mt-1">
// // // // // //             Manage your upcoming and past mentorship sessions
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         {/* Loading */}
// // // // // //         {isLoading && (
// // // // // //           <div className="flex items-center justify-center py-16">
// // // // // //             <Loader />
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Error */}
// // // // // //         {isError && (
// // // // // //           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// // // // // //             <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// // // // // //             <p className="text-red-700 font-semibold mb-2">Failed to load bookings</p>
// // // // // //             <p className="text-red-600 text-sm">{error?.data?.message || "Please try again later"}</p>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Grid */}
// // // // // //         {!isLoading && !isError && (
// // // // // //           <>
// // // // // //             {bookings.length === 0 ? (
// // // // // //               <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
// // // // // //                 <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // // //                   <Calendar className="w-7 h-7 text-[#2563ee]" />
// // // // // //                 </div>
// // // // // //                 <p className="text-gray-500 text-lg mb-2">No bookings found</p>
// // // // // //                 <p className="text-gray-400 text-sm">Book your first session to get started!</p>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //                 {bookings.map((booking) => {
// // // // // //                   const cancellable = booking.status === "confirmed" || booking.status === "pending";

// // // // // //                   return (
// // // // // //                     <div key={booking._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
// // // // // //                       {/* Card Header */}
// // // // // //                       <div className="bg-[#2563ee] p-4 text-white">
// // // // // //                         <div className="flex items-center gap-3 mb-3">
// // // // // //                           <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
// // // // // //                             <span className="text-lg font-bold">{getMentorInitials(booking)}</span>
// // // // // //                           </div>
// // // // // //                           <div className="min-w-0">
// // // // // //                             <h3 className="font-bold text-base truncate">{getMentorName(booking)}</h3>
// // // // // //                             <p className="text-blue-200 text-xs truncate">{getMentorRole(booking)}</p>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                         <div className="flex flex-wrap gap-2">
// // // // // //                           {getStatusBadge(booking.status)}
// // // // // //                           {getPaymentStatusBadge(booking.paymentStatus)}
// // // // // //                         </div>
// // // // // //                       </div>

// // // // // //                       {/* Card Body */}
// // // // // //                       <div className="p-4 space-y-3">
// // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // //                           <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // //                           <span className="text-gray-700 font-medium">{formatShortDate(booking.sessionDate)}</span>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // //                           <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // //                           <span className="text-gray-700">{booking.startTime} ({booking.durationMinutes} min)</span>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // //                           <Tag className="w-4 h-4 text-gray-500 flex-shrink-0" />
// // // // // //                           <span className="text-gray-700 truncate">{booking.topic}</span>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-2 text-sm">
// // // // // //                           <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // // // //                           <span className="text-gray-900 font-bold">₹{booking.amountPaid || booking.price}</span>
// // // // // //                         </div>

// // // // // //                         {/* View Details */}
// // // // // //                         <button
// // // // // //                           onClick={() => openPanel(booking, "details")}
// // // // // //                           className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 text-[#2563ee] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-100 transition-colors"
// // // // // //                         >
// // // // // //                           <Eye className="w-4 h-4" /> View Details
// // // // // //                         </button>

// // // // // //                         {/* Cancel + Reschedule */}
// // // // // //                         {cancellable && (
// // // // // //                           <div className="grid grid-cols-2 gap-2">
// // // // // //                             <button
// // // // // //                               onClick={() => openPanel(booking, "reschedule")}
// // // // // //                               className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg font-semibold text-xs hover:bg-gray-50 transition-colors"
// // // // // //                             >
// // // // // //                               <RefreshCw className="w-3.5 h-3.5" /> Reschedule
// // // // // //                             </button>
// // // // // //                             <button
// // // // // //                               onClick={() => openPanel(booking, "cancel")}
// // // // // //                               className="flex items-center justify-center gap-1.5 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg font-semibold text-xs hover:bg-red-100 transition-colors"
// // // // // //                             >
// // // // // //                               <Trash2 className="w-3.5 h-3.5" /> Cancel
// // // // // //                             </button>
// // // // // //                           </div>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* ══════════════════════════════════════════════════════════
// // // // // //          RIGHT SIDE SLIDE-IN PANEL
// // // // // //       ══════════════════════════════════════════════════════════ */}

// // // // // //       {/* Backdrop */}
// // // // // //       <div
// // // // // //         onClick={closePanel}
// // // // // //         className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
// // // // // //           panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
// // // // // //         }`}
// // // // // //       />

// // // // // //       {/* Panel */}
// // // // // //       <div
// // // // // //         className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl
// // // // // //           w-full sm:w-[420px] md:w-[480px] lg:w-[520px]
// // // // // //           transform transition-transform duration-300 ease-in-out
// // // // // //           ${panelOpen ? "translate-x-0" : "translate-x-full"}
// // // // // //           flex flex-col`}
// // // // // //       >
// // // // // //         {selectedBooking && (
// // // // // //           <>
// // // // // //             {/* ── DETAILS VIEW ── */}
// // // // // //             {panelView === "details" && (
// // // // // //               <>
// // // // // //                 {/* Panel Header */}
// // // // // //                 <div className="bg-[#2563ee] p-5 sm:p-6 flex-shrink-0">
// // // // // //                   <div className="flex items-start justify-between mb-4">
// // // // // //                     <div className="flex items-center gap-3 min-w-0">
// // // // // //                       <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
// // // // // //                         <span className="text-lg sm:text-xl font-bold text-white">{getMentorInitials(selectedBooking)}</span>
// // // // // //                       </div>
// // // // // //                       <div className="min-w-0">
// // // // // //                         <h2 className="text-lg sm:text-xl font-bold text-white truncate">{getMentorName(selectedBooking)}</h2>
// // // // // //                         <p className="text-blue-200 text-xs sm:text-sm truncate">
// // // // // //                           {getMentorRole(selectedBooking)}
// // // // // //                           {getMentorCompany(selectedBooking) ? ` · ${getMentorCompany(selectedBooking)}` : ""}
// // // // // //                         </p>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                     <button onClick={closePanel} className="text-white/80 hover:text-white p-1 flex-shrink-0 ml-2">
// // // // // //                       <X className="w-5 h-5 sm:w-6 sm:h-6" />
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // //                     {getStatusBadge(selectedBooking.status)}
// // // // // //                     {getPaymentStatusBadge(selectedBooking.paymentStatus)}
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Panel Body — scrollable */}
// // // // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // // // //                   {/* Session Details */}
// // // // // //                   <div className="mb-6">
// // // // // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Session Details</p>
// // // // // //                     <div className="space-y-4">
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         <Calendar className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                         <div>
// // // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Date</p>
// // // // // //                           <p className="text-sm font-semibold text-gray-900">{formatDate(selectedBooking.sessionDate)}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         <Clock className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                         <div>
// // // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Time</p>
// // // // // //                           <p className="text-sm font-semibold text-gray-900">{selectedBooking.startTime}</p>
// // // // // //                           <p className="text-[11px] text-gray-500 mt-0.5">Duration: {selectedBooking.durationMinutes} minutes</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         <Tag className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                         <div>
// // // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Session Type</p>
// // // // // //                           <p className="text-sm font-semibold text-gray-900">{selectedBooking.sessionType}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         <FileText className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                         <div>
// // // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Topic</p>
// // // // // //                           <p className="text-sm font-semibold text-gray-900">{selectedBooking.topic}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       {selectedBooking.description && (
// // // // // //                         <div className="flex items-start gap-3">
// // // // // //                           <FileText className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                           <div>
// // // // // //                             <p className="text-[11px] text-gray-500 mb-0.5">Description</p>
// // // // // //                             <p className="text-sm text-gray-700">{selectedBooking.description}</p>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       )}
// // // // // //                       {selectedBooking.meetingLink && (
// // // // // //                         <div className="flex items-start gap-3">
// // // // // //                           <Video className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                           <div>
// // // // // //                             <p className="text-[11px] text-gray-500 mb-1">Meeting Link</p>
// // // // // //                             <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // // // // //                               className="text-sm text-[#2563ee] hover:text-blue-700 font-medium hover:underline break-all">
// // // // // //                               Join Meeting →
// // // // // //                             </a>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   {/* Payment & Contact */}
// // // // // //                   <div className="mb-6">
// // // // // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Payment & Contact</p>
// // // // // //                     <div className="space-y-4">
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         <DollarSign className="w-[18px] h-[18px] text-green-600 mt-0.5 flex-shrink-0" />
// // // // // //                         <div>
// // // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Amount Paid</p>
// // // // // //                           <p className="text-xl font-bold text-gray-900">₹{selectedBooking.amountPaid || selectedBooking.price}</p>
// // // // // //                           <p className="text-[11px] text-gray-500 mt-0.5">via {selectedBooking.paymentMethod?.toUpperCase()}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         <Mail className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                         <div className="min-w-0">
// // // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Email</p>
// // // // // //                           <p className="text-sm text-gray-900 break-all">{selectedBooking.menteeEmail}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         <Phone className="w-[18px] h-[18px] text-[#2563ee] mt-0.5 flex-shrink-0" />
// // // // // //                         <div>
// // // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Phone</p>
// // // // // //                           <p className="text-sm text-gray-900">{selectedBooking.phoneNumber}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       {selectedBooking.transactionId && (
// // // // // //                         <div className="flex items-start gap-3">
// // // // // //                           <Hash className="w-[18px] h-[18px] text-gray-500 mt-0.5 flex-shrink-0" />
// // // // // //                           <div className="min-w-0">
// // // // // //                             <p className="text-[11px] text-gray-500 mb-0.5">Transaction ID</p>
// // // // // //                             <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">{selectedBooking.transactionId}</p>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       )}
// // // // // //                       <div className="pt-3 border-t border-gray-100">
// // // // // //                         <p className="text-[11px] text-gray-500 mb-1">Booking Information</p>
// // // // // //                         <div className="space-y-1 text-xs text-gray-600">
// // // // // //                           <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
// // // // // //                           {selectedBooking.confirmedAt && <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>}
// // // // // //                           <p className="font-mono text-[11px] text-gray-400">ID: {selectedBooking._id}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Panel Footer — Action Buttons */}
// // // // // //                 {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
// // // // // //                   <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // // // //                     <div className="flex flex-col gap-2.5">
// // // // // //                       {selectedBooking.meetingLink && (
// // // // // //                         <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // // // // //                           className="flex items-center justify-center gap-2 bg-[#2563ee] hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
// // // // // //                           <Video className="w-4 h-4" /> Join Meeting
// // // // // //                         </a>
// // // // // //                       )}
// // // // // //                       <div className="grid grid-cols-2 gap-2.5">
// // // // // //                         <button
// // // // // //                           onClick={() => setPanelView("reschedule")}
// // // // // //                           className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
// // // // // //                         >
// // // // // //                           <RefreshCw className="w-4 h-4" /> Reschedule
// // // // // //                         </button>
// // // // // //                         <button
// // // // // //                           onClick={() => setPanelView("cancel")}
// // // // // //                           className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors"
// // // // // //                         >
// // // // // //                           <Trash2 className="w-4 h-4" /> Cancel
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </>
// // // // // //             )}

// // // // // //             {/* ── CANCEL VIEW ── */}
// // // // // //             {panelView === "cancel" && (
// // // // // //               <>
// // // // // //                 {/* Header */}
// // // // // //                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
// // // // // //                   <button onClick={() => setPanelView("details")} className="text-gray-500 hover:text-gray-700">
// // // // // //                     <ArrowLeft className="w-5 h-5" />
// // // // // //                   </button>
// // // // // //                   <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
// // // // // //                     <AlertTriangle className="w-5 h-5 text-red-600" />
// // // // // //                   </div>
// // // // // //                   <h2 className="text-lg font-bold text-gray-900">Cancel Booking</h2>
// // // // // //                   <button onClick={closePanel} className="ml-auto text-gray-400 hover:text-gray-600">
// // // // // //                     <X className="w-5 h-5" />
// // // // // //                   </button>
// // // // // //                 </div>

// // // // // //                 {/* Body */}
// // // // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // // // //                   {/* Summary */}
// // // // // //                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
// // // // // //                     <p className="text-sm font-semibold text-gray-900">{getMentorName(selectedBooking)}</p>
// // // // // //                     <p className="text-xs text-gray-600 mt-1">
// // // // // //                       {formatShortDate(selectedBooking.sessionDate)} · {selectedBooking.startTime} · {selectedBooking.durationMinutes} min
// // // // // //                     </p>
// // // // // //                     {selectedBooking.isFreeSession && (
// // // // // //                       <p className="mt-2 text-xs font-semibold text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
// // // // // //                         ✓ Your free session will be restored
// // // // // //                       </p>
// // // // // //                     )}
// // // // // //                   </div>

// // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // //                     Reason for cancellation <span className="text-red-500">*</span>
// // // // // //                   </label>
// // // // // //                   <textarea
// // // // // //                     value={cancelReason}
// // // // // //                     onChange={(e) => setCancelReason(e.target.value)}
// // // // // //                     placeholder="Please let us know why you're cancelling..."
// // // // // //                     rows="5"
// // // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
// // // // // //                   />
// // // // // //                 </div>

// // // // // //                 {/* Footer */}
// // // // // //                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // // // //                   <div className="flex gap-3">
// // // // // //                     <button
// // // // // //                       onClick={() => { setPanelView("details"); setCancelReason(""); }}
// // // // // //                       className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold text-sm transition-colors"
// // // // // //                     >
// // // // // //                       Keep Booking
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       onClick={handleCancelBooking}
// // // // // //                       disabled={isCancelling}
// // // // // //                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // //                     >
// // // // // //                       {isCancelling ? "Cancelling..." : "Yes, Cancel"}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             )}

// // // // // //             {/* ── RESCHEDULE VIEW ── */}
// // // // // //             {panelView === "reschedule" && (
// // // // // //               <>
// // // // // //                 {/* Header */}
// // // // // //                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
// // // // // //                   <button onClick={() => setPanelView("details")} className="text-gray-500 hover:text-gray-700">
// // // // // //                     <ArrowLeft className="w-5 h-5" />
// // // // // //                   </button>
// // // // // //                   <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
// // // // // //                     <RefreshCw className="w-5 h-5 text-[#2563ee]" />
// // // // // //                   </div>
// // // // // //                   <h2 className="text-lg font-bold text-gray-900">Reschedule</h2>
// // // // // //                   <button onClick={closePanel} className="ml-auto text-gray-400 hover:text-gray-600">
// // // // // //                     <X className="w-5 h-5" />
// // // // // //                   </button>
// // // // // //                 </div>

// // // // // //                 {/* Body */}
// // // // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // // // //                   {/* Current summary */}
// // // // // //                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
// // // // // //                     <p className="text-[11px] text-gray-500">Current booking</p>
// // // // // //                     <p className="text-sm font-semibold text-gray-900 mt-1">{getMentorName(selectedBooking)}</p>
// // // // // //                     <p className="text-xs text-gray-600 mt-0.5">
// // // // // //                       {formatShortDate(selectedBooking.sessionDate)} · {selectedBooking.startTime} · {selectedBooking.durationMinutes} min
// // // // // //                     </p>
// // // // // //                   </div>

// // // // // //                   <div className="space-y-4">
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // //                         New Date <span className="text-red-500">*</span>
// // // // // //                       </label>
// // // // // //                       <input
// // // // // //                         type="date"
// // // // // //                         value={rescheduleDate}
// // // // // //                         onChange={(e) => setRescheduleDate(e.target.value)}
// // // // // //                         min={new Date().toISOString().split("T")[0]}
// // // // // //                         className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563ee] focus:border-transparent"
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // // //                         New Time <span className="text-red-500">*</span>
// // // // // //                       </label>
// // // // // //                       <input
// // // // // //                         type="time"
// // // // // //                         value={rescheduleTime}
// // // // // //                         onChange={(e) => setRescheduleTime(e.target.value)}
// // // // // //                         className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563ee] focus:border-transparent"
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   {/* Info note */}
// // // // // //                   <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start">
// // // // // //                     <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
// // // // // //                     <p className="text-xs text-amber-800 leading-relaxed">
// // // // // //                       Rescheduling is subject to mentor availability. You'll receive a confirmation once approved.
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Footer */}
// // // // // //                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // // // //                   <div className="flex gap-3">
// // // // // //                     <button
// // // // // //                       onClick={() => { setPanelView("details"); setRescheduleDate(""); setRescheduleTime(""); }}
// // // // // //                       className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold text-sm transition-colors"
// // // // // //                     >
// // // // // //                       Go Back
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       onClick={handleRescheduleBooking}
// // // // // //                       disabled={isRescheduling || !rescheduleDate || !rescheduleTime}
// // // // // //                       className="flex-1 bg-[#2563ee] hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // //                     >
// // // // // //                       {isRescheduling ? "Rescheduling..." : "Confirm"}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             )}
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MenteeBookingssessions;



// // // // // import React, { useState, useEffect, useMemo } from "react";
// // // // // import {
// // // // //   Calendar,
// // // // //   Clock,
// // // // //   Video,
// // // // //   DollarSign,
// // // // //   Mail,
// // // // //   Phone,
// // // // //   CheckCircle,
// // // // //   XCircle,
// // // // //   AlertCircle,
// // // // //   RefreshCw,
// // // // //   X,
// // // // //   Tag,
// // // // //   FileText,
// // // // //   Eye,
// // // // //   Trash2,
// // // // //   AlertTriangle,
// // // // //   ArrowLeft,
// // // // //   Hash,
// // // // //   ChevronLeft,
// // // // //   ChevronRight,
// // // // //   Globe,
// // // // //   MessageSquare,
// // // // //   User,
// // // // // } from "lucide-react";
// // // // // import {
// // // // //   useGetMenteeBookingsQuery,
// // // // //   useCancelBookingMutation,
// // // // //   useRescheduleBookingMutation,
// // // // // } from "./Bookingsecapislice";
// // // // // import Loader from "../../../../global/Loader";

// // // // // /* ═══════════════════════════════════════════════════
// // // // //    MINI CALENDAR COMPONENT
// // // // // ═══════════════════════════════════════════════════ */
// // // // // const MiniCalendar = ({ selectedDate, onSelect, minDate }) => {
// // // // //   const today = new Date();
// // // // //   today.setHours(0, 0, 0, 0);

// // // // //   const [viewMonth, setViewMonth] = useState(today.getMonth());
// // // // //   const [viewYear, setViewYear] = useState(today.getFullYear());

// // // // //   const monthNames = [
// // // // //     "January", "February", "March", "April", "May", "June",
// // // // //     "July", "August", "September", "October", "November", "December",
// // // // //   ];
// // // // //   const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// // // // //   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
// // // // //   const firstDay = new Date(viewYear, viewMonth, 1).getDay();

// // // // //   const prevMonth = () => {
// // // // //     if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
// // // // //     else setViewMonth(viewMonth - 1);
// // // // //   };
// // // // //   const nextMonth = () => {
// // // // //     if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
// // // // //     else setViewMonth(viewMonth + 1);
// // // // //   };

// // // // //   const canGoPrev = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

// // // // //   const isDisabled = (day) => {
// // // // //     const d = new Date(viewYear, viewMonth, day);
// // // // //     d.setHours(0, 0, 0, 0);
// // // // //     const min = minDate ? new Date(minDate) : today;
// // // // //     min.setHours(0, 0, 0, 0);
// // // // //     return d < min;
// // // // //   };

// // // // //   const isSelected = (day) => {
// // // // //     if (!selectedDate) return false;
// // // // //     const d = new Date(viewYear, viewMonth, day);
// // // // //     const s = new Date(selectedDate);
// // // // //     return d.toDateString() === s.toDateString();
// // // // //   };

// // // // //   const isToday = (day) => {
// // // // //     const d = new Date(viewYear, viewMonth, day);
// // // // //     return d.toDateString() === today.toDateString();
// // // // //   };

// // // // //   const blanks = Array.from({ length: firstDay }, (_, i) => i);
// // // // //   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

// // // // //   return (
// // // // //     <div>
// // // // //       {/* Month nav */}
// // // // //       <div className="flex items-center justify-between mb-4">
// // // // //         <h3 className="text-base font-bold text-gray-900">
// // // // //           {monthNames[viewMonth]} {viewYear}
// // // // //         </h3>
// // // // //         <div className="flex items-center gap-1">
// // // // //           <button
// // // // //             onClick={prevMonth}
// // // // //             disabled={!canGoPrev}
// // // // //             className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
// // // // //           >
// // // // //             <ChevronLeft className="w-4 h-4 text-gray-600" />
// // // // //           </button>
// // // // //           <button
// // // // //             onClick={nextMonth}
// // // // //             className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
// // // // //           >
// // // // //             <ChevronRight className="w-4 h-4 text-gray-600" />
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Day headers */}
// // // // //       <div className="grid grid-cols-7 mb-2">
// // // // //         {dayNames.map((d) => (
// // // // //           <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">
// // // // //             {d}
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Day grid */}
// // // // //       <div className="grid grid-cols-7 gap-y-1">
// // // // //         {blanks.map((b) => (
// // // // //           <div key={`b-${b}`} />
// // // // //         ))}
// // // // //         {days.map((day) => {
// // // // //           const disabled = isDisabled(day);
// // // // //           const selected = isSelected(day);
// // // // //           const todayMark = isToday(day);

// // // // //           return (
// // // // //             <button
// // // // //               key={day}
// // // // //               onClick={() => {
// // // // //                 if (!disabled) {
// // // // //                   const d = new Date(viewYear, viewMonth, day);
// // // // //                   onSelect(d.toISOString().split("T")[0]);
// // // // //                 }
// // // // //               }}
// // // // //               disabled={disabled}
// // // // //               className={`
// // // // //                 relative w-9 h-9 mx-auto rounded-lg text-sm font-medium transition-all
// // // // //                 ${disabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-blue-50"}
// // // // //                 ${selected ? "bg-[#eff6ff] text-white hover:bg-[#eff6ff]" : "text-gray-700"}
// // // // //                 ${todayMark && !selected ? "ring-1 ring-[#eff6ff]" : ""}
// // // // //               `}
// // // // //             >
// // // // //               {day}
// // // // //             </button>
// // // // //           );
// // // // //         })}
// // // // //       </div>

// // // // //       {/* Today label */}
// // // // //       <p className="text-[11px] text-gray-400 mt-3">
// // // // //         Today: {today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
// // // // //       </p>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // /* ═══════════════════════════════════════════════════
// // // // //    TIME SLOT PICKER
// // // // // ═══════════════════════════════════════════════════ */
// // // // // const TimeSlotPicker = ({ selectedTime, onSelect, duration }) => {
// // // // //   const slots = useMemo(() => {
// // // // //     const s = [];
// // // // //     for (let h = 8; h <= 21; h++) {
// // // // //       for (let m = 0; m < 60; m += 30) {
// // // // //         const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
// // // // //         const ampm = h >= 12 ? "PM" : "AM";
// // // // //         const label = `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
// // // // //         const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
// // // // //         s.push({ label, value });
// // // // //       }
// // // // //     }
// // // // //     return s;
// // // // //   }, []);

// // // // //   return (
// // // // //     <div>
// // // // //       <div className="flex items-center gap-2 mb-2">
// // // // //         <Clock className="w-4 h-4 text-gray-500" />
// // // // //         <span className="text-sm font-medium text-gray-700">{duration || 30} mins</span>
// // // // //       </div>
// // // // //       <div className="flex items-center gap-2 mb-4">
// // // // //         <Globe className="w-4 h-4 text-gray-500" />
// // // // //         <span className="text-xs text-gray-500">
// // // // //           {Intl.DateTimeFormat().resolvedOptions().timeZone}
// // // // //         </span>
// // // // //         <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 font-medium">
// // // // //           Local Timezone
// // // // //         </span>
// // // // //       </div>

// // // // //       <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
// // // // //         {slots.map((slot) => (
// // // // //           <button
// // // // //             key={slot.value}
// // // // //             onClick={() => onSelect(slot.value)}
// // // // //             className={`
// // // // //               w-full py-2.5 px-4 rounded-lg border text-sm font-semibold transition-all
// // // // //               ${selectedTime === slot.value
// // // // //                 ? "bg-blue-50 border-[#eff6ff] text-[#eff6ff]"
// // // // //                 : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
// // // // //               }
// // // // //             `}
// // // // //           >
// // // // //             {slot.label}
// // // // //           </button>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // /* ═══════════════════════════════════════════════════
// // // // //    MAIN COMPONENT
// // // // // ═══════════════════════════════════════════════════ */
// // // // // const MenteeBookingssessions = () => {
// // // // //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// // // // //   const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
// // // // //   const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

// // // // //   const [selectedBooking, setSelectedBooking] = useState(null);
// // // // //   const [panelView, setPanelView] = useState("details");
// // // // //   const [panelOpen, setPanelOpen] = useState(false);
// // // // //   const [cancelReason, setCancelReason] = useState("");
// // // // //   const [rescheduleDate, setRescheduleDate] = useState("");
// // // // //   const [rescheduleTime, setRescheduleTime] = useState("");

// // // // //   const bookings = data?.data || [];

// // // // //   /* ── Panel controls ── */
// // // // //   const openPanel = (booking, view = "details") => {
// // // // //     setSelectedBooking(booking);
// // // // //     setPanelView(view);
// // // // //     setPanelOpen(true);
// // // // //   };

// // // // //   const closePanel = () => {
// // // // //     setPanelOpen(false);
// // // // //     setTimeout(() => {
// // // // //       setSelectedBooking(null);
// // // // //       setPanelView("details");
// // // // //       setCancelReason("");
// // // // //       setRescheduleDate("");
// // // // //       setRescheduleTime("");
// // // // //     }, 300);
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     document.body.style.overflow = panelOpen ? "hidden" : "";
// // // // //     return () => { document.body.style.overflow = ""; };
// // // // //   }, [panelOpen]);

// // // // //   /* ── Badges ── */
// // // // //   const getStatusBadge = (status) => {
// // // // //     const cfg = {
// // // // //       confirmed: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "CONFIRMED" },
// // // // //       pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "PENDING" },
// // // // //       cancelled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "CANCELLED" },
// // // // //       completed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "COMPLETED" },
// // // // //       unattended: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", label: "UNATTENDED" },
// // // // //     };
// // // // //     const c = cfg[status] || cfg.pending;
// // // // //     return (
// // // // //       <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${c.bg} ${c.text} border ${c.border}`}>
// // // // //         {c.label}
// // // // //       </span>
// // // // //     );
// // // // //   };

// // // // //   /* ── Formatters ── */
// // // // //   const formatDate = (d) =>
// // // // //     new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
// // // // //   const formatCardDate = (d) => {
// // // // //     const date = new Date(d);
// // // // //     return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// // // // //   };
// // // // //   const formatCardTime = (timeStr) => {
// // // // //     if (!timeStr) return "";
// // // // //     // "09:00 - 09:30" → "9:00 PM" (just show the first part nicely)
// // // // //     const first = timeStr.split("-")[0].trim();
// // // // //     return first;
// // // // //   };
// // // // //   const formatDateTime = (d) =>
// // // // //     new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
// // // // //   const formatRescheduleDate = (d) => {
// // // // //     const date = new Date(d);
// // // // //     return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
// // // // //   };

// // // // //   /* ── Mentor helpers ── */
// // // // //   const getMentorName = (b) =>
// // // // //     typeof b.mentorId === "object" ? b.mentorId?.fullName || b.menteeName || "Mentor" : b.menteeName || "Mentor";
// // // // //   const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
// // // // //   const getMentorRole = (b) =>
// // // // //     typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
// // // // //   const getMentorCompany = (b) =>
// // // // //     typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
// // // // //   const getMentorSubtitle = (b) => {
// // // // //     const role = getMentorRole(b);
// // // // //     const company = getMentorCompany(b);
// // // // //     if (company && role) return `${company} | ${role}`;
// // // // //     return company || role || "";
// // // // //   };

// // // // //   /* ── Actions ── */
// // // // //   const handleCancelBooking = async () => {
// // // // //     if (!cancelReason.trim()) { alert("Please provide a reason for cancellation"); return; }
// // // // //     try {
// // // // //       await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
// // // // //       alert(selectedBooking.isFreeSession ? "Booking cancelled. Your free session has been restored!" : "Booking cancelled successfully!");
// // // // //       closePanel();
// // // // //     } catch (err) {
// // // // //       alert("Failed to cancel: " + (err?.data?.message || "Please try again"));
// // // // //     }
// // // // //   };

// // // // //   const handleRescheduleBooking = async () => {
// // // // //     if (!rescheduleDate || !rescheduleTime) { alert("Please select new date and time"); return; }
// // // // //     try {
// // // // //       await rescheduleBooking({ bookingId: selectedBooking._id, newDate: rescheduleDate, newTime: rescheduleTime }).unwrap();
// // // // //       alert("Booking rescheduled successfully!");
// // // // //       closePanel();
// // // // //     } catch (err) {
// // // // //       alert("Failed to reschedule: " + (err?.data?.message || "Please try again"));
// // // // //     }
// // // // //   };

// // // // //   /* ══════════════════════════════════════════════════════════════
// // // // //      RENDER
// // // // //   ══════════════════════════════════════════════════════════════ */
// // // // //   return (
// // // // //     <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
// // // // //       <div className="max-w-6xl mx-auto">
// // // // //         {/* Header */}
// // // // //         <div className="mb-8">
// // // // //           <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
// // // // //           <p className="text-xs sm:text-sm text-[#eff6ff]/70 mt-1">
// // // // //             Manage your upcoming and past mentorship sessions
// // // // //           </p>
// // // // //         </div>

// // // // //         {/* Loading */}
// // // // //         {isLoading && (
// // // // //           <div className="flex items-center justify-center py-16"><Loader /></div>
// // // // //         )}

// // // // //         {/* Error */}
// // // // //         {isError && (
// // // // //           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// // // // //             <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// // // // //             <p className="text-red-700 font-semibold mb-2">Failed to load bookings</p>
// // // // //             <p className="text-red-600 text-sm">{error?.data?.message || "Please try again later"}</p>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* ── BOOKING CARDS ── */}
// // // // //         {!isLoading && !isError && (
// // // // //           <>
// // // // //             {bookings.length === 0 ? (
// // // // //               <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
// // // // //                 <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // //                   <Calendar className="w-7 h-7 text-[#eff6ff]" />
// // // // //                 </div>
// // // // //                 <p className="text-gray-500 text-lg mb-2">No bookings found</p>
// // // // //                 <p className="text-gray-400 text-sm">Book your first session to get started!</p>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // // //                 {bookings.map((booking) => {
// // // // //                   const cancellable = booking.status === "confirmed" || booking.status === "pending";

// // // // //                   return (
// // // // //                     <div
// // // // //                       key={booking._id}
// // // // //                       className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
// // // // //                     >
// // // // //                       {/* Blue top accent */}
// // // // //                       <div className="h-1 bg-[#eff6ff]" />

// // // // //                       <div className="p-4 sm:p-5">
// // // // //                         {/* Mentor info row */}
// // // // //                         <div className="flex items-start gap-3 mb-4">
// // // // //                           <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
// // // // //                             <span className="text-sm font-bold text-[#eff6ff]">
// // // // //                               {getMentorInitials(booking)}
// // // // //                             </span>
// // // // //                           </div>
// // // // //                           <div className="min-w-0 flex-1">
// // // // //                             <div className="flex flex-wrap items-center gap-2">
// // // // //                               <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
// // // // //                                 {getMentorName(booking)}
// // // // //                               </h3>
// // // // //                               <button
// // // // //                                 onClick={() => openPanel(booking, "details")}
// // // // //                                 className="text-[11px] text-[#eff6ff] border border-blue-200 bg-blue-50 rounded px-1.5 py-0.5 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 flex-shrink-0"
// // // // //                               >
// // // // //                                 <Eye className="w-3 h-3" /> Details
// // // // //                               </button>
// // // // //                             </div>
// // // // //                             {getMentorSubtitle(booking) && (
// // // // //                               <p className="text-xs text-gray-500 mt-0.5 truncate">
// // // // //                                 {getMentorSubtitle(booking)}
// // // // //                               </p>
// // // // //                             )}
// // // // //                           </div>
// // // // //                         </div>

// // // // //                         {/* Divider */}
// // // // //                         <div className="border-t border-gray-100 mb-3" />

// // // // //                         {/* Session info */}
// // // // //                         <div className="flex items-center justify-between mb-3">
// // // // //                           <div>
// // // // //                             <p className="text-[11px] text-gray-500 font-medium mb-1">Session Schedule</p>
// // // // //                             {getStatusBadge(booking.status)}
// // // // //                           </div>
// // // // //                           <div className="text-right">
// // // // //                             <p className="text-sm font-bold text-gray-900">
// // // // //                               {formatCardDate(booking.sessionDate)}
// // // // //                             </p>
// // // // //                             <p className="text-xs text-[#eff6ff] font-semibold mt-0.5">
// // // // //                               {formatCardTime(booking.startTime)} · {booking.durationMinutes} min
// // // // //                             </p>
// // // // //                           </div>
// // // // //                         </div>

// // // // //                         {/* Action buttons */}
// // // // //                         {cancellable && (
// // // // //                           <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
// // // // //                             <button
// // // // //                               onClick={() => openPanel(booking, "reschedule")}
// // // // //                               className="flex-1 text-xs sm:text-sm font-semibold text-[#eff6ff] border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors text-center"
// // // // //                             >
// // // // //                               Reschedule
// // // // //                             </button>
// // // // //                             <button
// // // // //                               onClick={() => openPanel(booking, "cancel")}
// // // // //                               className="flex-1 text-xs sm:text-sm font-semibold text-red-600 border border-red-200 bg-red-50 rounded-lg px-3 py-2 hover:bg-red-100 transition-colors text-center"
// // // // //                             >
// // // // //                               Cancel
// // // // //                             </button>
// // // // //                           </div>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //               </div>
// // // // //             )}
// // // // //           </>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* ══════════════════════════════════════════════════════════
// // // // //          BACKDROP
// // // // //       ══════════════════════════════════════════════════════════ */}
// // // // //       <div
// // // // //         onClick={closePanel}
// // // // //         className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
// // // // //           }`}
// // // // //       />

// // // // //       {/* ══════════════════════════════════════════════════════════
// // // // //          SLIDE-IN PANEL
// // // // //       ══════════════════════════════════════════════════════════ */}
// // // // //       <div
// // // // //         className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl border-l border-gray-200
// // // // //           w-full sm:w-[440px] md:w-[500px] lg:w-[540px]
// // // // //           transform transition-transform duration-300 ease-in-out
// // // // //           ${panelOpen ? "translate-x-0" : "translate-x-full"}
// // // // //           flex flex-col`}
// // // // //       >
// // // // //         {selectedBooking && (
// // // // //           <>
// // // // //             {/* ────────────────────────────────────────
// // // // //                DETAILS VIEW
// // // // //             ──────────────────────────────────────── */}
// // // // //             {panelView === "details" && (
// // // // //               <>
// // // // //                 {/* Header */}
// // // // //                 <div className="bg-[#eff6ff] p-5 sm:p-6 flex-shrink-0">
// // // // //                   <div className="flex items-start justify-between mb-4">
// // // // //                     <div className="flex items-center gap-3 min-w-0">
// // // // //                       <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
// // // // //                         <span className="text-lg sm:text-xl font-bold text-white">{getMentorInitials(selectedBooking)}</span>
// // // // //                       </div>
// // // // //                       <div className="min-w-0">
// // // // //                         <h2 className="text-lg sm:text-xl font-bold text-white truncate">{getMentorName(selectedBooking)}</h2>
// // // // //                         <p className="text-blue-200 text-xs sm:text-sm truncate">{getMentorSubtitle(selectedBooking)}</p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <button onClick={closePanel} className="text-white/80 hover:text-white p-1 flex-shrink-0 ml-2">
// // // // //                       <X className="w-5 h-5 sm:w-6 sm:h-6" />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                   <div className="flex flex-wrap gap-2">
// // // // //                     {getStatusBadge(selectedBooking.status)}
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Body */}
// // // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // // //                   {/* Session */}
// // // // //                   <div className="mb-6">
// // // // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Session Details</p>
// // // // //                     <div className="space-y-4">
// // // // //                       {[
// // // // //                         { Icon: Calendar, label: "Date", value: formatDate(selectedBooking.sessionDate) },
// // // // //                         { Icon: Clock, label: "Time", value: `${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min` },
// // // // //                         { Icon: Tag, label: "Session Type", value: selectedBooking.sessionType },
// // // // //                         { Icon: FileText, label: "Topic", value: selectedBooking.topic },
// // // // //                       ].map(({ Icon, label, value }) => (
// // // // //                         <div key={label} className="flex items-start gap-3">
// // // // //                           <Icon className="w-[18px] h-[18px] text-[#eff6ff] mt-0.5 flex-shrink-0" />
// // // // //                           <div>
// // // // //                             <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
// // // // //                             <p className="text-sm font-semibold text-gray-900">{value}</p>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       ))}
// // // // //                       {selectedBooking.meetingLink && (
// // // // //                         <div className="flex items-start gap-3">
// // // // //                           <Video className="w-[18px] h-[18px] text-[#eff6ff] mt-0.5 flex-shrink-0" />
// // // // //                           <div>
// // // // //                             <p className="text-[11px] text-gray-500 mb-1">Meeting Link</p>
// // // // //                             <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // // // //                               className="text-sm text-[#eff6ff] hover:text-blue-700 font-medium hover:underline break-all">
// // // // //                               Join Meeting →
// // // // //                             </a>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Payment */}
// // // // //                   <div className="mb-6">
// // // // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Payment & Contact</p>
// // // // //                     <div className="space-y-4">
// // // // //                       <div className="flex items-start gap-3">
// // // // //                         <DollarSign className="w-[18px] h-[18px] text-green-600 mt-0.5 flex-shrink-0" />
// // // // //                         <div>
// // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Amount Paid</p>
// // // // //                           <p className="text-xl font-bold text-gray-900">₹{selectedBooking.amountPaid || selectedBooking.price}</p>
// // // // //                           <p className="text-[11px] text-gray-500 mt-0.5">via {selectedBooking.paymentMethod?.toUpperCase()}</p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="flex items-start gap-3">
// // // // //                         <Mail className="w-[18px] h-[18px] text-[#eff6ff] mt-0.5 flex-shrink-0" />
// // // // //                         <div className="min-w-0">
// // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Email</p>
// // // // //                           <p className="text-sm text-gray-900 break-all">{selectedBooking.menteeEmail}</p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="flex items-start gap-3">
// // // // //                         <Phone className="w-[18px] h-[18px] text-[#eff6ff] mt-0.5 flex-shrink-0" />
// // // // //                         <div>
// // // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Phone</p>
// // // // //                           <p className="text-sm text-gray-900">{selectedBooking.phoneNumber}</p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       {selectedBooking.transactionId && (
// // // // //                         <div className="flex items-start gap-3">
// // // // //                           <Hash className="w-[18px] h-[18px] text-gray-500 mt-0.5 flex-shrink-0" />
// // // // //                           <div className="min-w-0">
// // // // //                             <p className="text-[11px] text-gray-500 mb-0.5">Transaction ID</p>
// // // // //                             <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">{selectedBooking.transactionId}</p>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       )}
// // // // //                       <div className="pt-3 border-t border-gray-100">
// // // // //                         <p className="text-[11px] text-gray-500 mb-1">Booking Information</p>
// // // // //                         <div className="space-y-1 text-xs text-gray-600">
// // // // //                           <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
// // // // //                           {selectedBooking.confirmedAt && <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>}
// // // // //                           <p className="font-mono text-[11px] text-gray-400">ID: {selectedBooking._id}</p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Footer */}
// // // // //                 {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
// // // // //                   <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // // //                     <div className="flex flex-col gap-2.5">
// // // // //                       {selectedBooking.meetingLink && (
// // // // //                         <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // // // //                           className="flex items-center justify-center gap-2 bg-[#eff6ff] hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
// // // // //                           <Video className="w-4 h-4" /> Join Meeting
// // // // //                         </a>
// // // // //                       )}
// // // // //                       <div className="grid grid-cols-2 gap-2.5">
// // // // //                         <button onClick={() => setPanelView("reschedule")}
// // // // //                           className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
// // // // //                           <RefreshCw className="w-4 h-4" /> Reschedule
// // // // //                         </button>
// // // // //                         <button onClick={() => setPanelView("cancel")}
// // // // //                           className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors">
// // // // //                           <Trash2 className="w-4 h-4" /> Cancel
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </>
// // // // //             )}

// // // // //             {/* ────────────────────────────────────────
// // // // //                RESCHEDULE VIEW (Image 1 style)
// // // // //             ──────────────────────────────────────── */}
// // // // //             {panelView === "reschedule" && (
// // // // //               <>
// // // // //                 {/* Header */}
// // // // //                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
// // // // //                   <button onClick={() => setPanelView("details")} className="text-gray-500 hover:text-gray-700 transition-colors">
// // // // //                     <ArrowLeft className="w-5 h-5" />
// // // // //                   </button>
// // // // //                   <span className="text-sm font-semibold text-gray-900">Back</span>
// // // // //                   <button onClick={closePanel} className="ml-auto text-gray-400 hover:text-gray-600">
// // // // //                     <X className="w-5 h-5" />
// // // // //                   </button>
// // // // //                 </div>

// // // // //                 {/* Body */}
// // // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // // //                   {/* Mentor info + title */}
// // // // //                   <div className="mb-6">
// // // // //                     <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-4">
// // // // //                       <span className="text-base font-bold text-gray-600">{getMentorInitials(selectedBooking)}</span>
// // // // //                     </div>
// // // // //                     <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
// // // // //                       You are rescheduling your{" "}
// // // // //                       <span className="text-[#eff6ff]">{selectedBooking.sessionType || "1:1"} Session</span>
// // // // //                       {" "}with {getMentorName(selectedBooking)}
// // // // //                     </h2>
// // // // //                   </div>

// // // // //                   {/* Current schedule card */}
// // // // //                   <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
// // // // //                     <p className="text-sm text-gray-700">
// // // // //                       {selectedBooking.sessionType || "1:1"} Session with{" "}
// // // // //                       <span className="font-bold">{selectedBooking.menteeName || "you"}</span>
// // // // //                     </p>
// // // // //                     <div className="flex items-center gap-2 mt-2">
// // // // //                       <span className="text-xs text-gray-500">Current Schedule:</span>
// // // // //                       <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
// // // // //                         <span className="w-1.5 h-1.5 rounded-full bg-[#eff6ff]" />
// // // // //                         {formatRescheduleDate(selectedBooking.sessionDate)} at {formatCardTime(selectedBooking.startTime)}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Calendar + Time picker */}
// // // // //                   <div className="flex flex-col lg:flex-row gap-6">
// // // // //                     {/* Calendar */}
// // // // //                     <div className="flex-1">
// // // // //                       <h3 className="text-base font-bold text-gray-900 mb-1">Select a Date</h3>
// // // // //                       <div className="mt-3">
// // // // //                         <MiniCalendar
// // // // //                           selectedDate={rescheduleDate}
// // // // //                           onSelect={setRescheduleDate}
// // // // //                           minDate={new Date().toISOString().split("T")[0]}
// // // // //                         />
// // // // //                       </div>
// // // // //                     </div>

// // // // //                     {/* Time slots */}
// // // // //                     <div className="flex-1 lg:max-w-[200px]">
// // // // //                       <h3 className="text-base font-bold text-gray-900 mb-3">Session Start Time</h3>
// // // // //                       <TimeSlotPicker
// // // // //                         selectedTime={rescheduleTime}
// // // // //                         onSelect={setRescheduleTime}
// // // // //                         duration={selectedBooking.durationMinutes}
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Footer */}
// // // // //                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // // //                   <button
// // // // //                     onClick={handleRescheduleBooking}
// // // // //                     disabled={isRescheduling || !rescheduleDate || !rescheduleTime}
// // // // //                     className="w-full bg-[#eff6ff] hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
// // // // //                   >
// // // // //                     {isRescheduling ? "Rescheduling..." : "Confirm & Schedule Now"}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </>
// // // // //             )}

// // // // //             {/* ────────────────────────────────────────
// // // // //                CANCEL VIEW
// // // // //             ──────────────────────────────────────── */}
// // // // //             {panelView === "cancel" && (
// // // // //               <>
// // // // //                 {/* Header */}
// // // // //                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
// // // // //                   <button onClick={() => setPanelView("details")} className="text-gray-500 hover:text-gray-700">
// // // // //                     <ArrowLeft className="w-5 h-5" />
// // // // //                   </button>
// // // // //                   <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
// // // // //                     <AlertTriangle className="w-5 h-5 text-red-600" />
// // // // //                   </div>
// // // // //                   <h2 className="text-lg font-bold text-gray-900">Cancel Booking</h2>
// // // // //                   <button onClick={closePanel} className="ml-auto text-gray-400 hover:text-gray-600">
// // // // //                     <X className="w-5 h-5" />
// // // // //                   </button>
// // // // //                 </div>

// // // // //                 {/* Body */}
// // // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // // //                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
// // // // //                     <p className="text-sm font-semibold text-gray-900">{getMentorName(selectedBooking)}</p>
// // // // //                     <p className="text-xs text-gray-600 mt-1">
// // // // //                       {formatCardDate(selectedBooking.sessionDate)} · {formatCardTime(selectedBooking.startTime)} · {selectedBooking.durationMinutes} min
// // // // //                     </p>
// // // // //                     {selectedBooking.isFreeSession && (
// // // // //                       <p className="mt-2 text-xs font-semibold text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
// // // // //                         ✓ Your free session will be restored
// // // // //                       </p>
// // // // //                     )}
// // // // //                   </div>

// // // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // // //                     Reason for cancellation <span className="text-red-500">*</span>
// // // // //                   </label>
// // // // //                   <textarea
// // // // //                     value={cancelReason}
// // // // //                     onChange={(e) => setCancelReason(e.target.value)}
// // // // //                     placeholder="Please let us know why you're cancelling..."
// // // // //                     rows="5"
// // // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
// // // // //                   />
// // // // //                 </div>

// // // // //                 {/* Footer */}
// // // // //                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // // //                   <div className="flex gap-3">
// // // // //                     <button
// // // // //                       onClick={() => { setPanelView("details"); setCancelReason(""); }}
// // // // //                       className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold text-sm transition-colors"
// // // // //                     >
// // // // //                       Keep Booking
// // // // //                     </button>
// // // // //                     <button
// // // // //                       onClick={handleCancelBooking}
// // // // //                       disabled={isCancelling}
// // // // //                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // // //                     >
// // // // //                       {isCancelling ? "Cancelling..." : "Yes, Cancel"}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </>
// // // // //             )}
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default MenteeBookingssessions;

// // // // import React, { useState, useEffect, useMemo } from "react";
// // // // import {
// // // //   Calendar,
// // // //   Clock,
// // // //   Video,
// // // //   DollarSign,
// // // //   Mail,
// // // //   Phone,
// // // //   CheckCircle,
// // // //   XCircle,
// // // //   AlertCircle,
// // // //   RefreshCw,
// // // //   X,
// // // //   Tag,
// // // //   FileText,
// // // //   Eye,
// // // //   Trash2,
// // // //   AlertTriangle,
// // // //   ArrowLeft,
// // // //   Hash,
// // // //   ChevronLeft,
// // // //   ChevronRight,
// // // //   Globe,
// // // //   MessageSquare,
// // // //   User,
// // // // } from "lucide-react";
// // // // import {
// // // //   useGetMenteeBookingsQuery,
// // // //   useCancelBookingMutation,
// // // //   useRescheduleBookingMutation,
// // // // } from "./Bookingsecapislice";
// // // // import Loader from "../../../../global/Loader";

// // // // /* ═══════════════════════════════════════════════════
// // // //    MINI CALENDAR COMPONENT
// // // // ═══════════════════════════════════════════════════ */
// // // // const MiniCalendar = ({ selectedDate, onSelect, minDate }) => {
// // // //   const today = new Date();
// // // //   today.setHours(0, 0, 0, 0);

// // // //   const [viewMonth, setViewMonth] = useState(today.getMonth());
// // // //   const [viewYear, setViewYear] = useState(today.getFullYear());

// // // //   const monthNames = [
// // // //     "January", "February", "March", "April", "May", "June",
// // // //     "July", "August", "September", "October", "November", "December",
// // // //   ];
// // // //   const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// // // //   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
// // // //   const firstDay = new Date(viewYear, viewMonth, 1).getDay();

// // // //   const prevMonth = () => {
// // // //     if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
// // // //     else setViewMonth(viewMonth - 1);
// // // //   };
// // // //   const nextMonth = () => {
// // // //     if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
// // // //     else setViewMonth(viewMonth + 1);
// // // //   };

// // // //   const canGoPrev = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

// // // //   const isDisabled = (day) => {
// // // //     const d = new Date(viewYear, viewMonth, day);
// // // //     d.setHours(0, 0, 0, 0);
// // // //     const min = minDate ? new Date(minDate) : today;
// // // //     min.setHours(0, 0, 0, 0);
// // // //     return d < min;
// // // //   };

// // // //   const isSelected = (day) => {
// // // //     if (!selectedDate) return false;
// // // //     const d = new Date(viewYear, viewMonth, day);
// // // //     const s = new Date(selectedDate);
// // // //     return d.toDateString() === s.toDateString();
// // // //   };

// // // //   const isToday = (day) => {
// // // //     const d = new Date(viewYear, viewMonth, day);
// // // //     return d.toDateString() === today.toDateString();
// // // //   };

// // // //   const blanks = Array.from({ length: firstDay }, (_, i) => i);
// // // //   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

// // // //   return (
// // // //     <div>
// // // //       {/* Month nav */}
// // // //       <div className="flex items-center justify-between mb-4">
// // // //         <h3 className="text-base font-bold text-gray-900">
// // // //           {monthNames[viewMonth]} {viewYear}
// // // //         </h3>
// // // //         <div className="flex items-center gap-1">
// // // //           <button
// // // //             onClick={prevMonth}
// // // //             disabled={!canGoPrev}
// // // //             className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
// // // //           >
// // // //             <ChevronLeft className="w-4 h-4 text-gray-600" />
// // // //           </button>
// // // //           <button
// // // //             onClick={nextMonth}
// // // //             className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
// // // //           >
// // // //             <ChevronRight className="w-4 h-4 text-gray-600" />
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Day headers */}
// // // //       <div className="grid grid-cols-7 mb-2">
// // // //         {dayNames.map((d) => (
// // // //           <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">
// // // //             {d}
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* Day grid */}
// // // //       <div className="grid grid-cols-7 gap-y-1">
// // // //         {blanks.map((b) => (
// // // //           <div key={`b-${b}`} />
// // // //         ))}
// // // //         {days.map((day) => {
// // // //           const disabled = isDisabled(day);
// // // //           const selected = isSelected(day);
// // // //           const todayMark = isToday(day);

// // // //           return (
// // // //             <button
// // // //               key={day}
// // // //               onClick={() => {
// // // //                 if (!disabled) {
// // // //                   const d = new Date(viewYear, viewMonth, day);
// // // //                   onSelect(d.toISOString().split("T")[0]);
// // // //                 }
// // // //               }}
// // // //               disabled={disabled}
// // // //               className={`
// // // //                 relative w-9 h-9 mx-auto rounded-lg text-sm font-medium transition-all
// // // //                 ${disabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-blue-50"}
// // // //                 ${selected ? "bg-[#3883ef] text-white hover:bg-[#3883ef]" : "text-gray-700"}
// // // //                 ${todayMark && !selected ? "ring-1 ring-[#3883ef]" : ""}
// // // //               `}
// // // //             >
// // // //               {day}
// // // //             </button>
// // // //           );
// // // //         })}
// // // //       </div>

// // // //       {/* Today label */}
// // // //       <p className="text-[11px] text-gray-400 mt-3">
// // // //         Today: {today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
// // // //       </p>
// // // //     </div>
// // // //   );
// // // // };

// // // // /* ═══════════════════════════════════════════════════
// // // //    TIME SLOT PICKER
// // // // ═══════════════════════════════════════════════════ */
// // // // const TimeSlotPicker = ({ selectedTime, onSelect, duration }) => {
// // // //   const slots = useMemo(() => {
// // // //     const s = [];
// // // //     for (let h = 8; h <= 21; h++) {
// // // //       for (let m = 0; m < 60; m += 30) {
// // // //         const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
// // // //         const ampm = h >= 12 ? "PM" : "AM";
// // // //         const label = `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
// // // //         const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
// // // //         s.push({ label, value });
// // // //       }
// // // //     }
// // // //     return s;
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       <div className="flex items-center gap-2 mb-2">
// // // //         <Clock className="w-4 h-4 text-gray-500" />
// // // //         <span className="text-sm font-medium text-gray-700">{duration || 30} mins</span>
// // // //       </div>
// // // //       <div className="flex items-center gap-2 mb-4">
// // // //         <Globe className="w-4 h-4 text-gray-500" />
// // // //         <span className="text-xs text-gray-500">
// // // //           {Intl.DateTimeFormat().resolvedOptions().timeZone}
// // // //         </span>
// // // //         <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 font-medium">
// // // //           Local Timezone
// // // //         </span>
// // // //       </div>

// // // //       <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
// // // //         {slots.map((slot) => (
// // // //           <button
// // // //             key={slot.value}
// // // //             onClick={() => onSelect(slot.value)}
// // // //             className={`
// // // //               w-full py-2.5 px-4 rounded-lg border text-sm font-semibold transition-all
// // // //               ${selectedTime === slot.value
// // // //                 ? "bg-blue-50 border-[#3883ef] text-[#3883ef]"
// // // //                 : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
// // // //               }
// // // //             `}
// // // //           >
// // // //             {slot.label}
// // // //           </button>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // /* ═══════════════════════════════════════════════════
// // // //    MAIN COMPONENT
// // // // ═══════════════════════════════════════════════════ */
// // // // const MenteeBookingssessions = () => {
// // // //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// // // //   const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
// // // //   const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

// // // //   const [selectedBooking, setSelectedBooking] = useState(null);
// // // //   const [panelView, setPanelView] = useState("details");
// // // //   const [panelOpen, setPanelOpen] = useState(false);
// // // //   const [cancelReason, setCancelReason] = useState("");
// // // //   const [rescheduleDate, setRescheduleDate] = useState("");
// // // //   const [rescheduleTime, setRescheduleTime] = useState("");

// // // //   const bookings = data?.data || [];

// // // //   /* ── Panel controls ── */
// // // //   const openPanel = (booking, view = "details") => {
// // // //     setSelectedBooking(booking);
// // // //     setPanelView(view);
// // // //     setPanelOpen(true);
// // // //   };

// // // //   const closePanel = () => {
// // // //     setPanelOpen(false);
// // // //     setTimeout(() => {
// // // //       setSelectedBooking(null);
// // // //       setPanelView("details");
// // // //       setCancelReason("");
// // // //       setRescheduleDate("");
// // // //       setRescheduleTime("");
// // // //     }, 300);
// // // //   };

// // // //   useEffect(() => {
// // // //     document.body.style.overflow = panelOpen ? "hidden" : "";
// // // //     return () => { document.body.style.overflow = ""; };
// // // //   }, [panelOpen]);

// // // //   /* ── Badges ── */
// // // //   const getStatusBadge = (status) => {
// // // //     const cfg = {
// // // //       confirmed: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "CONFIRMED" },
// // // //       pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "PENDING" },
// // // //       cancelled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "CANCELLED" },
// // // //       completed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "COMPLETED" },
// // // //       unattended: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", label: "UNATTENDED" },
// // // //     };
// // // //     const c = cfg[status] || cfg.pending;
// // // //     return (
// // // //       <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${c.bg} ${c.text} border ${c.border}`}>
// // // //         {c.label}
// // // //       </span>
// // // //     );
// // // //   };

// // // //   /* ── Formatters ── */
// // // //   const formatDate = (d) =>
// // // //     new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
// // // //   const formatCardDate = (d) => {
// // // //     const date = new Date(d);
// // // //     return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// // // //   };
// // // //   const formatCardTime = (timeStr) => {
// // // //     if (!timeStr) return "";
// // // //     // "09:00 - 09:30" → "9:00 PM" (just show the first part nicely)
// // // //     const first = timeStr.split("-")[0].trim();
// // // //     return first;
// // // //   };
// // // //   const formatDateTime = (d) =>
// // // //     new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
// // // //   const formatRescheduleDate = (d) => {
// // // //     const date = new Date(d);
// // // //     return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
// // // //   };

// // // //   /* ── Mentor helpers ── */
// // // //   const getMentorName = (b) =>
// // // //     typeof b.mentorId === "object" ? b.mentorId?.fullName || b.menteeName || "Mentor" : b.menteeName || "Mentor";
// // // //   const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
// // // //   const getMentorRole = (b) =>
// // // //     typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
// // // //   const getMentorCompany = (b) =>
// // // //     typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
// // // //   const getMentorSubtitle = (b) => {
// // // //     const role = getMentorRole(b);
// // // //     const company = getMentorCompany(b);
// // // //     if (company && role) return `${company} | ${role}`;
// // // //     return company || role || "";
// // // //   };

// // // //   /* ── Actions ── */
// // // //   const handleCancelBooking = async () => {
// // // //     if (!cancelReason.trim()) { alert("Please provide a reason for cancellation"); return; }
// // // //     try {
// // // //       await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
// // // //       alert(selectedBooking.isFreeSession ? "Booking cancelled. Your free session has been restored!" : "Booking cancelled successfully!");
// // // //       closePanel();
// // // //     } catch (err) {
// // // //       alert("Failed to cancel: " + (err?.data?.message || "Please try again"));
// // // //     }
// // // //   };

// // // //   const handleRescheduleBooking = async () => {
// // // //     if (!rescheduleDate || !rescheduleTime) { alert("Please select new date and time"); return; }
// // // //     try {
// // // //       await rescheduleBooking({ bookingId: selectedBooking._id, newDate: rescheduleDate, newTime: rescheduleTime }).unwrap();
// // // //       alert("Booking rescheduled successfully!");
// // // //       closePanel();
// // // //     } catch (err) {
// // // //       alert("Failed to reschedule: " + (err?.data?.message || "Please try again"));
// // // //     }
// // // //   };

// // // //   /* ══════════════════════════════════════════════════════════════
// // // //      RENDER
// // // //   ══════════════════════════════════════════════════════════════ */
// // // //   return (
// // // //     <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
// // // //       <div className="max-w-6xl mx-auto">
// // // //         {/* Header */}
// // // //         <div className="mb-8">
// // // //           <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
// // // //           <p className="text-xs sm:text-sm text-[#3883ef]/70 mt-1">
// // // //             Manage your upcoming and past mentorship sessions
// // // //           </p>
// // // //         </div>

// // // //         {/* Loading */}
// // // //         {isLoading && (
// // // //           <div className="flex items-center justify-center py-16"><Loader /></div>
// // // //         )}

// // // //         {/* Error */}
// // // //         {isError && (
// // // //           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// // // //             <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// // // //             <p className="text-red-700 font-semibold mb-2">Failed to load bookings</p>
// // // //             <p className="text-red-600 text-sm">{error?.data?.message || "Please try again later"}</p>
// // // //           </div>
// // // //         )}

// // // //         {/* ── BOOKING CARDS ── */}
// // // //         {!isLoading && !isError && (
// // // //           <>
// // // //             {bookings.length === 0 ? (
// // // //               <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
// // // //                 <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //                   <Calendar className="w-7 h-7 text-[#3883ef]" />
// // // //                 </div>
// // // //                 <p className="text-gray-500 text-lg mb-2">No bookings found</p>
// // // //                 <p className="text-gray-400 text-sm">Book your first session to get started!</p>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // //                 {bookings.map((booking) => {
// // // //                   const cancellable = booking.status === "confirmed" || booking.status === "pending";

// // // //                   return (
// // // //                     <div
// // // //                       key={booking._id}
// // // //                       className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
// // // //                     >
// // // //                       {/* Blue top accent */}
// // // //                       {/* <div className="h-1 bg-[#3883ef]" /> */}

// // // //                       <div className="p-4 sm:p-5">
// // // //                         {/* Mentor info row */}
// // // //                         <div className="flex items-start gap-3 mb-4">
// // // //                           <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
// // // //                             <span className="text-sm font-bold text-[#3883ef]">
// // // //                               {getMentorInitials(booking)}
// // // //                             </span>
// // // //                           </div>
// // // //                           <div className="min-w-0 flex-1">
// // // //                             <div className="flex flex-wrap items-center gap-2">
// // // //                               <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
// // // //                                 {getMentorName(booking)}
// // // //                               </h3>
// // // //                               <button
// // // //                                 onClick={() => openPanel(booking, "details")}
// // // //                                 className="text-[11px] text-[#3883ef] border border-blue-200 bg-blue-50 rounded px-1.5 py-0.5 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 flex-shrink-0"
// // // //                               >
// // // //                                 <Eye className="w-3 h-3" /> Details
// // // //                               </button>
// // // //                             </div>
// // // //                             {getMentorSubtitle(booking) && (
// // // //                               <p className="text-xs text-gray-500 mt-0.5 truncate">
// // // //                                 {getMentorSubtitle(booking)}
// // // //                               </p>
// // // //                             )}
// // // //                           </div>
// // // //                         </div>

// // // //                         {/* Divider */}
// // // //                         <div className="border-t border-gray-100 mb-3" />

// // // //                         {/* Session info */}
// // // //                         <div className="flex items-center justify-between mb-3">
// // // //                           <div>
// // // //                             <p className="text-[11px] text-gray-500 font-medium mb-1">Session Schedule</p>
// // // //                             {getStatusBadge(booking.status)}
// // // //                           </div>
// // // //                           <div className="text-right">
// // // //                             <p className="text-sm font-bold text-gray-900">
// // // //                               {formatCardDate(booking.sessionDate)}
// // // //                             </p>
// // // //                             <p className="text-xs text-[#3883ef] font-semibold mt-0.5">
// // // //                               {formatCardTime(booking.startTime)} · {booking.durationMinutes} min
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>

// // // //                         {/* Action buttons */}
// // // //                         {cancellable && (
// // // //                           <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
// // // //                             <button
// // // //                               onClick={() => openPanel(booking, "reschedule")}
// // // //                               className="flex-1 text-xs sm:text-sm font-semibold text-[#3883ef] border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors text-center"
// // // //                             >
// // // //                               Reschedule
// // // //                             </button>
// // // //                             <button
// // // //                               onClick={() => openPanel(booking, "cancel")}
// // // //                               className="flex-1 text-xs sm:text-sm font-semibold text-red-600 border border-red-200 bg-red-50 rounded-lg px-3 py-2 hover:bg-red-100 transition-colors text-center"
// // // //                             >
// // // //                               Cancel
// // // //                             </button>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>

// // // //       {/* ══════════════════════════════════════════════════════════
// // // //          BACKDROP
// // // //       ══════════════════════════════════════════════════════════ */}
// // // //       <div
// // // //         onClick={closePanel}
// // // //         className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
// // // //           }`}
// // // //       />

// // // //       {/* ══════════════════════════════════════════════════════════
// // // //          SLIDE-IN PANEL
// // // //       ══════════════════════════════════════════════════════════ */}
// // // //       <div
// // // //         className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl border-l border-gray-200
// // // //           w-full sm:w-[440px] md:w-[500px] lg:w-[540px]
// // // //           transform transition-transform duration-300 ease-in-out
// // // //           ${panelOpen ? "translate-x-0" : "translate-x-full"}
// // // //           flex flex-col`}
// // // //       >
// // // //         {selectedBooking && (
// // // //           <>
// // // //             {/* ────────────────────────────────────────
// // // //                DETAILS VIEW
// // // //             ──────────────────────────────────────── */}
// // // //             {panelView === "details" && (
// // // //               <>
// // // //                 {/* Header */}
// // // //                 <div className="bg-[#eff6ff] p-5 sm:p-6 flex-shrink-0 border-b border-blue-100">
// // // //                   <div className="flex items-start justify-between mb-4">
// // // //                     <div className="flex items-center gap-3 min-w-0">
// // // //                       <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-200">
// // // //                         <span className="text-lg sm:text-xl font-bold text-[#3883ef]">{getMentorInitials(selectedBooking)}</span>
// // // //                       </div>
// // // //                       <div className="min-w-0">
// // // //                         <h2 className="text-lg sm:text-xl font-bold text-[#3883ef] truncate">{getMentorName(selectedBooking)}</h2>
// // // //                         <p className="text-gray-500 text-xs sm:text-sm truncate">{getMentorSubtitle(selectedBooking)}</p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <button onClick={closePanel} className="text-[#3883ef]/60 hover:text-[#3883ef] p-1 flex-shrink-0 ml-2">
// // // //                       <X className="w-5 h-5 sm:w-6 sm:h-6" />
// // // //                     </button>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {getStatusBadge(selectedBooking.status)}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Body */}
// // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // //                   {/* Session */}
// // // //                   <div className="mb-6">
// // // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Session Details</p>
// // // //                     <div className="space-y-4">
// // // //                       {[
// // // //                         { Icon: Calendar, label: "Date", value: formatDate(selectedBooking.sessionDate) },
// // // //                         { Icon: Clock, label: "Time", value: `${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min` },
// // // //                         { Icon: Tag, label: "Session Type", value: selectedBooking.sessionType },
// // // //                         { Icon: FileText, label: "Topic", value: selectedBooking.topic },
// // // //                       ].map(({ Icon, label, value }) => (
// // // //                         <div key={label} className="flex items-start gap-3">
// // // //                           <Icon className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // // //                           <div>
// // // //                             <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
// // // //                             <p className="text-sm font-semibold text-gray-900">{value}</p>
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}
// // // //                       {selectedBooking.meetingLink && (
// // // //                         <div className="flex items-start gap-3">
// // // //                           <Video className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // // //                           <div>
// // // //                             <p className="text-[11px] text-gray-500 mb-1">Meeting Link</p>
// // // //                             <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // // //                               className="text-sm text-[#3883ef] hover:text-blue-700 font-medium hover:underline break-all">
// // // //                               Join Meeting →
// // // //                             </a>
// // // //                           </div>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Payment */}
// // // //                   <div className="mb-6">
// // // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Payment & Contact</p>
// // // //                     <div className="space-y-4">
// // // //                       <div className="flex items-start gap-3">
// // // //                         <DollarSign className="w-[18px] h-[18px] text-green-600 mt-0.5 flex-shrink-0" />
// // // //                         <div>
// // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Amount Paid</p>
// // // //                           <p className="text-xl font-bold text-gray-900">₹{selectedBooking.amountPaid || selectedBooking.price}</p>
// // // //                           <p className="text-[11px] text-gray-500 mt-0.5">via {selectedBooking.paymentMethod?.toUpperCase()}</p>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="flex items-start gap-3">
// // // //                         <Mail className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // // //                         <div className="min-w-0">
// // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Email</p>
// // // //                           <p className="text-sm text-gray-900 break-all">{selectedBooking.menteeEmail}</p>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="flex items-start gap-3">
// // // //                         <Phone className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // // //                         <div>
// // // //                           <p className="text-[11px] text-gray-500 mb-0.5">Phone</p>
// // // //                           <p className="text-sm text-gray-900">{selectedBooking.phoneNumber}</p>
// // // //                         </div>
// // // //                       </div>
// // // //                       {selectedBooking.transactionId && (
// // // //                         <div className="flex items-start gap-3">
// // // //                           <Hash className="w-[18px] h-[18px] text-gray-500 mt-0.5 flex-shrink-0" />
// // // //                           <div className="min-w-0">
// // // //                             <p className="text-[11px] text-gray-500 mb-0.5">Transaction ID</p>
// // // //                             <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">{selectedBooking.transactionId}</p>
// // // //                           </div>
// // // //                         </div>
// // // //                       )}
// // // //                       <div className="pt-3 border-t border-gray-100">
// // // //                         <p className="text-[11px] text-gray-500 mb-1">Booking Information</p>
// // // //                         <div className="space-y-1 text-xs text-gray-600">
// // // //                           <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
// // // //                           {selectedBooking.confirmedAt && <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>}
// // // //                           <p className="font-mono text-[11px] text-gray-400">ID: {selectedBooking._id}</p>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Footer */}
// // // //                 {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
// // // //                   <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // //                     <div className="flex flex-col gap-2.5">
// // // //                       {selectedBooking.meetingLink && (
// // // //                         <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // // //                           className="flex items-center justify-center gap-2 bg-[#3883ef] hover:bg-[#2b6fd4] text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
// // // //                           <Video className="w-4 h-4" /> Join Meeting
// // // //                         </a>
// // // //                       )}
// // // //                       <div className="grid grid-cols-2 gap-2.5">
// // // //                         <button onClick={() => setPanelView("reschedule")}
// // // //                           className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
// // // //                           <RefreshCw className="w-4 h-4" /> Reschedule
// // // //                         </button>
// // // //                         <button onClick={() => setPanelView("cancel")}
// // // //                           className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors">
// // // //                           <Trash2 className="w-4 h-4" /> Cancel
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </>
// // // //             )}

// // // //             {/* ────────────────────────────────────────
// // // //                RESCHEDULE VIEW (Image 1 style)
// // // //             ──────────────────────────────────────── */}
// // // //             {panelView === "reschedule" && (
// // // //               <>
// // // //                 {/* Header */}
// // // //                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
// // // //                   <button onClick={() => setPanelView("details")} className="text-gray-500 hover:text-gray-700 transition-colors">
// // // //                     <ArrowLeft className="w-5 h-5" />
// // // //                   </button>
// // // //                   <span className="text-sm font-semibold text-gray-900">Back</span>
// // // //                   <button onClick={closePanel} className="ml-auto text-gray-400 hover:text-gray-600">
// // // //                     <X className="w-5 h-5" />
// // // //                   </button>
// // // //                 </div>

// // // //                 {/* Body */}
// // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // //                   {/* Mentor info + title */}
// // // //                   <div className="mb-6">
// // // //                     <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-4">
// // // //                       <span className="text-base font-bold text-gray-600">{getMentorInitials(selectedBooking)}</span>
// // // //                     </div>
// // // //                     <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
// // // //                       You are rescheduling your{" "}
// // // //                       <span className="text-[#3883ef]">{selectedBooking.sessionType || "1:1"} Session</span>
// // // //                       {" "}with {getMentorName(selectedBooking)}
// // // //                     </h2>
// // // //                   </div>

// // // //                   {/* Current schedule card */}
// // // //                   <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
// // // //                     <p className="text-sm text-gray-700">
// // // //                       {selectedBooking.sessionType || "1:1"} Session with{" "}
// // // //                       <span className="font-bold">{selectedBooking.menteeName || "you"}</span>
// // // //                     </p>
// // // //                     <div className="flex items-center gap-2 mt-2">
// // // //                       <span className="text-xs text-gray-500">Current Schedule:</span>
// // // //                       <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
// // // //                         <span className="w-1.5 h-1.5 rounded-full bg-[#3883ef]" />
// // // //                         {formatRescheduleDate(selectedBooking.sessionDate)} at {formatCardTime(selectedBooking.startTime)}
// // // //                       </span>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Calendar + Time picker */}
// // // //                   <div className="flex flex-col lg:flex-row gap-6">
// // // //                     {/* Calendar */}
// // // //                     <div className="flex-1">
// // // //                       <h3 className="text-base font-bold text-gray-900 mb-1">Select a Date</h3>
// // // //                       <div className="mt-3">
// // // //                         <MiniCalendar
// // // //                           selectedDate={rescheduleDate}
// // // //                           onSelect={setRescheduleDate}
// // // //                           minDate={new Date().toISOString().split("T")[0]}
// // // //                         />
// // // //                       </div>
// // // //                     </div>

// // // //                     {/* Time slots */}
// // // //                     <div className="flex-1 lg:max-w-[200px]">
// // // //                       <h3 className="text-base font-bold text-gray-900 mb-3">Session Start Time</h3>
// // // //                       <TimeSlotPicker
// // // //                         selectedTime={rescheduleTime}
// // // //                         onSelect={setRescheduleTime}
// // // //                         duration={selectedBooking.durationMinutes}
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Footer */}
// // // //                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // //                   <button
// // // //                     onClick={handleRescheduleBooking}
// // // //                     disabled={isRescheduling || !rescheduleDate || !rescheduleTime}
// // // //                     className="w-full bg-[#3883ef] hover:bg-[#2b6fd4] text-white py-3.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
// // // //                   >
// // // //                     {isRescheduling ? "Rescheduling..." : "Confirm & Schedule Now"}
// // // //                   </button>
// // // //                 </div>
// // // //               </>
// // // //             )}

// // // //             {/* ────────────────────────────────────────
// // // //                CANCEL VIEW
// // // //             ──────────────────────────────────────── */}
// // // //             {panelView === "cancel" && (
// // // //               <>
// // // //                 {/* Header */}
// // // //                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
// // // //                   <button onClick={() => setPanelView("details")} className="text-gray-500 hover:text-gray-700">
// // // //                     <ArrowLeft className="w-5 h-5" />
// // // //                   </button>
// // // //                   <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
// // // //                     <AlertTriangle className="w-5 h-5 text-red-600" />
// // // //                   </div>
// // // //                   <h2 className="text-lg font-bold text-gray-900">Cancel Booking</h2>
// // // //                   <button onClick={closePanel} className="ml-auto text-gray-400 hover:text-gray-600">
// // // //                     <X className="w-5 h-5" />
// // // //                   </button>
// // // //                 </div>

// // // //                 {/* Body */}
// // // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // // //                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
// // // //                     <p className="text-sm font-semibold text-gray-900">{getMentorName(selectedBooking)}</p>
// // // //                     <p className="text-xs text-gray-600 mt-1">
// // // //                       {formatCardDate(selectedBooking.sessionDate)} · {formatCardTime(selectedBooking.startTime)} · {selectedBooking.durationMinutes} min
// // // //                     </p>
// // // //                     {selectedBooking.isFreeSession && (
// // // //                       <p className="mt-2 text-xs font-semibold text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
// // // //                         ✓ Your free session will be restored
// // // //                       </p>
// // // //                     )}
// // // //                   </div>

// // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                     Reason for cancellation <span className="text-red-500">*</span>
// // // //                   </label>
// // // //                   <textarea
// // // //                     value={cancelReason}
// // // //                     onChange={(e) => setCancelReason(e.target.value)}
// // // //                     placeholder="Please let us know why you're cancelling..."
// // // //                     rows="5"
// // // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
// // // //                   />
// // // //                 </div>

// // // //                 {/* Footer */}
// // // //                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // // //                   <div className="flex gap-3">
// // // //                     <button
// // // //                       onClick={() => { setPanelView("details"); setCancelReason(""); }}
// // // //                       className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold text-sm transition-colors"
// // // //                     >
// // // //                       Keep Booking
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={handleCancelBooking}
// // // //                       disabled={isCancelling}
// // // //                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // // //                     >
// // // //                       {isCancelling ? "Cancelling..." : "Yes, Cancel"}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MenteeBookingssessions;



// // // import React, { useState, useEffect, useMemo } from "react";
// // // import {
// // //   Calendar,
// // //   Clock,
// // //   Video,
// // //   DollarSign,
// // //   Mail,
// // //   Phone,
// // //   CheckCircle,
// // //   XCircle,
// // //   AlertCircle,
// // //   RefreshCw,
// // //   X,
// // //   Tag,
// // //   FileText,
// // //   Eye,
// // //   Trash2,
// // //   AlertTriangle,
// // //   ArrowLeft,
// // //   Hash,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Globe,
// // //   MessageSquare,
// // //   User,
// // // } from "lucide-react";
// // // import {
// // //   useGetMenteeBookingsQuery,
// // //   useCancelBookingMutation,
// // //   useRescheduleBookingMutation,
// // // } from "./Bookingsecapislice";
// // // import Loader from "../../../../global/Loader";

// // // /* ═══════════════════════════════════════════════════
// // //    MINI CALENDAR COMPONENT
// // // ═══════════════════════════════════════════════════ */
// // // const MiniCalendar = ({ selectedDate, onSelect, minDate }) => {
// // //   const today = new Date();
// // //   today.setHours(0, 0, 0, 0);

// // //   const [viewMonth, setViewMonth] = useState(today.getMonth());
// // //   const [viewYear, setViewYear] = useState(today.getFullYear());

// // //   const monthNames = [
// // //     "January", "February", "March", "April", "May", "June",
// // //     "July", "August", "September", "October", "November", "December",
// // //   ];
// // //   const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// // //   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
// // //   const firstDay = new Date(viewYear, viewMonth, 1).getDay();

// // //   const prevMonth = () => {
// // //     if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
// // //     else setViewMonth(viewMonth - 1);
// // //   };
// // //   const nextMonth = () => {
// // //     if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
// // //     else setViewMonth(viewMonth + 1);
// // //   };

// // //   const canGoPrev = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

// // //   const isDisabled = (day) => {
// // //     const d = new Date(viewYear, viewMonth, day);
// // //     d.setHours(0, 0, 0, 0);
// // //     const min = minDate ? new Date(minDate) : today;
// // //     min.setHours(0, 0, 0, 0);
// // //     return d < min;
// // //   };

// // //   const isSelected = (day) => {
// // //     if (!selectedDate) return false;
// // //     const d = new Date(viewYear, viewMonth, day);
// // //     const s = new Date(selectedDate);
// // //     return d.toDateString() === s.toDateString();
// // //   };

// // //   const isToday = (day) => {
// // //     const d = new Date(viewYear, viewMonth, day);
// // //     return d.toDateString() === today.toDateString();
// // //   };

// // //   const blanks = Array.from({ length: firstDay }, (_, i) => i);
// // //   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

// // //   return (
// // //     <div>
// // //       {/* Month nav */}
// // //       <div className="flex items-center justify-between mb-4">
// // //         <h3 className="text-base font-bold text-gray-900">
// // //           {monthNames[viewMonth]} {viewYear}
// // //         </h3>
// // //         <div className="flex items-center gap-1">
// // //           <button
// // //             onClick={prevMonth}
// // //             disabled={!canGoPrev}
// // //             className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
// // //           >
// // //             <ChevronLeft className="w-4 h-4 text-gray-600" />
// // //           </button>
// // //           <button
// // //             onClick={nextMonth}
// // //             className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
// // //           >
// // //             <ChevronRight className="w-4 h-4 text-gray-600" />
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Day headers */}
// // //       <div className="grid grid-cols-7 mb-2">
// // //         {dayNames.map((d) => (
// // //           <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">
// // //             {d}
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Day grid */}
// // //       <div className="grid grid-cols-7 gap-y-1">
// // //         {blanks.map((b) => (
// // //           <div key={`b-${b}`} />
// // //         ))}
// // //         {days.map((day) => {
// // //           const disabled = isDisabled(day);
// // //           const selected = isSelected(day);
// // //           const todayMark = isToday(day);

// // //           return (
// // //             <button
// // //               key={day}
// // //               onClick={() => {
// // //                 if (!disabled) {
// // //                   const d = new Date(viewYear, viewMonth, day);
// // //                   onSelect(d.toISOString().split("T")[0]);
// // //                 }
// // //               }}
// // //               disabled={disabled}
// // //               className={`
// // //                 relative w-9 h-9 mx-auto rounded-lg text-sm font-medium transition-all
// // //                 ${disabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-blue-50"}
// // //                 ${selected ? "bg-[#3883ef] text-white hover:bg-[#3883ef]" : "text-gray-700"}
// // //                 ${todayMark && !selected ? "ring-1 ring-[#3883ef]" : ""}
// // //               `}
// // //             >
// // //               {day}
// // //             </button>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* Today label */}
// // //       <p className="text-[11px] text-gray-400 mt-3">
// // //         Today: {today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // /* ═══════════════════════════════════════════════════
// // //    TIME SLOT PICKER
// // // ═══════════════════════════════════════════════════ */
// // // const TimeSlotPicker = ({ selectedTime, onSelect, duration }) => {
// // //   const slots = useMemo(() => {
// // //     const s = [];
// // //     for (let h = 8; h <= 21; h++) {
// // //       for (let m = 0; m < 60; m += 30) {
// // //         const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
// // //         const ampm = h >= 12 ? "PM" : "AM";
// // //         const label = `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
// // //         const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
// // //         s.push({ label, value });
// // //       }
// // //     }
// // //     return s;
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <div className="flex items-center gap-2 mb-2">
// // //         <Clock className="w-4 h-4 text-gray-500" />
// // //         <span className="text-sm font-medium text-gray-700">{duration || 30} mins</span>
// // //       </div>
// // //       <div className="flex items-center gap-2 mb-4">
// // //         <Globe className="w-4 h-4 text-gray-500" />
// // //         <span className="text-xs text-gray-500">
// // //           {Intl.DateTimeFormat().resolvedOptions().timeZone}
// // //         </span>
// // //         <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 font-medium">
// // //           Local Timezone
// // //         </span>
// // //       </div>

// // //       <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
// // //         {slots.map((slot) => (
// // //           <button
// // //             key={slot.value}
// // //             onClick={() => onSelect(slot.value)}
// // //             className={`
// // //               w-full py-2.5 px-4 rounded-lg border text-sm font-semibold transition-all
// // //               ${selectedTime === slot.value
// // //                 ? "bg-blue-50 border-[#3883ef] text-[#3883ef]"
// // //                 : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
// // //               }
// // //             `}
// // //           >
// // //             {slot.label}
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* ═══════════════════════════════════════════════════
// // //    RESCHEDULE MODAL COMPONENT
// // // ═══════════════════════════════════════════════════ */
// // // const RescheduleModal = ({
// // //   booking,
// // //   isOpen,
// // //   onClose,
// // //   onConfirm,
// // //   isRescheduling,
// // //   rescheduleDate,
// // //   setRescheduleDate,
// // //   rescheduleTime,
// // //   setRescheduleTime,
// // //   formatRescheduleDate,
// // //   formatCardTime,
// // //   getMentorName,
// // //   getMentorInitials,
// // // }) => {
// // //   useEffect(() => {
// // //     document.body.style.overflow = isOpen ? "hidden" : "";
// // //     return () => { document.body.style.overflow = ""; };
// // //   }, [isOpen]);

// // //   if (!booking) return null;

// // //   return (
// // //     <>
// // //       {/* Backdrop */}
// // //       <div
// // //         onClick={onClose}
// // //         className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
// // //           }`}
// // //       />

// // //       {/* Modal */}
// // //       <div
// // //         className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}
// // //       >
// // //         <div
// // //           className={`
// // //             bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col
// // //             pointer-events-auto transition-all duration-300
// // //             ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
// // //           `}
// // //         >
// // //           {/* Modal Header */}
// // //           <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 flex-shrink-0">
// // //             <button
// // //               onClick={onClose}
// // //               className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
// // //             >
// // //               <ArrowLeft className="w-4 h-4" />
// // //               Back
// // //             </button>
// // //             <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600 p-1">
// // //               <X className="w-5 h-5" />
// // //             </button>
// // //           </div>

// // //           {/* Modal Body */}
// // //           <div className="flex-1 overflow-y-auto">
// // //             <div className="p-6">
// // //               {/* Left section: Mentor info + current schedule */}
// // //               <div className="flex flex-col lg:flex-row gap-8">
// // //                 {/* Left column */}
// // //                 <div className="lg:w-64 flex-shrink-0">
// // //                   <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-4">
// // //                     <span className="text-base font-bold text-gray-600">{getMentorInitials(booking)}</span>
// // //                   </div>
// // //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-5">
// // //                     You are rescheduling your{" "}
// // //                     <span className="text-[#3883ef]">{booking.sessionType || "1:1"} Session</span>
// // //                     {" "}with {getMentorName(booking)}
// // //                   </h2>

// // //                   {/* Current schedule card */}
// // //                   <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
// // //                     <p className="text-sm text-gray-700">
// // //                       {booking.sessionType || "1:1"} Session with{" "}
// // //                       <span className="font-bold">{booking.menteeName || "you"}</span>
// // //                     </p>
// // //                     <div className="mt-2">
// // //                       <span className="text-xs text-gray-500 block mb-1.5">Current Schedule:</span>
// // //                       <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-full px-2.5 py-1">
// // //                         <span className="w-1.5 h-1.5 rounded-full bg-[#3883ef] flex-shrink-0" />
// // //                         {formatRescheduleDate(booking.sessionDate)} at {formatCardTime(booking.startTime)}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Divider */}
// // //                 <div className="hidden lg:block w-px bg-gray-100 self-stretch" />

// // //                 {/* Right column: Calendar + Time */}
// // //                 <div className="flex-1 flex flex-col sm:flex-row gap-6">
// // //                   {/* Calendar */}
// // //                   <div className="flex-1">
// // //                     <h3 className="text-base font-bold text-gray-900 mb-3">Select a Date</h3>
// // //                     <MiniCalendar
// // //                       selectedDate={rescheduleDate}
// // //                       onSelect={setRescheduleDate}
// // //                       minDate={new Date().toISOString().split("T")[0]}
// // //                     />
// // //                   </div>

// // //                   {/* Divider */}
// // //                   <div className="hidden sm:block w-px bg-gray-100 self-stretch" />

// // //                   {/* Time slots */}
// // //                   <div className="sm:w-48">
// // //                     <h3 className="text-base font-bold text-gray-900 mb-3">Session Start Time</h3>
// // //                     <TimeSlotPicker
// // //                       selectedTime={rescheduleTime}
// // //                       onSelect={setRescheduleTime}
// // //                       duration={booking.durationMinutes}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Modal Footer */}
// // //           <div className="flex-shrink-0 border-t border-gray-100 px-6 py-4 bg-gray-50/80 rounded-b-2xl flex justify-end">
// // //             <button
// // //               onClick={onConfirm}
// // //               disabled={isRescheduling || !rescheduleDate || !rescheduleTime}
// // //               className="bg-[#3883ef] hover:bg-[#2b6fd4] text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
// // //             >
// // //               {isRescheduling ? "Rescheduling..." : "Confirm & Schedule Now"}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // /* ═══════════════════════════════════════════════════
// // //    MAIN COMPONENT
// // // ═══════════════════════════════════════════════════ */
// // // const MenteeBookingssessions = () => {
// // //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// // //   const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
// // //   const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

// // //   const [selectedBooking, setSelectedBooking] = useState(null);
// // //   const [panelView, setPanelView] = useState("details");
// // //   const [panelOpen, setPanelOpen] = useState(false);
// // //   const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
// // //   const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
// // //   const [cancelReason, setCancelReason] = useState("");
// // //   const [rescheduleDate, setRescheduleDate] = useState("");
// // //   const [rescheduleTime, setRescheduleTime] = useState("");

// // //   const bookings = data?.data || [];

// // //   /* ── Panel controls ── */
// // //   const openPanel = (booking, view = "details") => {
// // //     if (view === "reschedule") {
// // //       // Open reschedule as modal instead
// // //       setRescheduleBookingTarget(booking);
// // //       setRescheduleDate("");
// // //       setRescheduleTime("");
// // //       setRescheduleModalOpen(true);
// // //       return;
// // //     }
// // //     setSelectedBooking(booking);
// // //     setPanelView(view);
// // //     setPanelOpen(true);
// // //   };

// // //   const closePanel = () => {
// // //     setPanelOpen(false);
// // //     setTimeout(() => {
// // //       setSelectedBooking(null);
// // //       setPanelView("details");
// // //       setCancelReason("");
// // //       setRescheduleDate("");
// // //       setRescheduleTime("");
// // //     }, 300);
// // //   };

// // //   const closeRescheduleModal = () => {
// // //     setRescheduleModalOpen(false);
// // //     setTimeout(() => {
// // //       setRescheduleBookingTarget(null);
// // //       setRescheduleDate("");
// // //       setRescheduleTime("");
// // //     }, 300);
// // //   };

// // //   useEffect(() => {
// // //     if (!rescheduleModalOpen) {
// // //       document.body.style.overflow = panelOpen ? "hidden" : "";
// // //     } else {
// // //       document.body.style.overflow = "hidden";
// // //     }
// // //     return () => { document.body.style.overflow = ""; };
// // //   }, [panelOpen, rescheduleModalOpen]);

// // //   /* ── Badges ── */
// // //   const getStatusBadge = (status) => {
// // //     const cfg = {
// // //       confirmed: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "CONFIRMED" },
// // //       pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "PENDING" },
// // //       cancelled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "CANCELLED" },
// // //       completed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "COMPLETED" },
// // //       unattended: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", label: "UNATTENDED" },
// // //     };
// // //     const c = cfg[status] || cfg.pending;
// // //     return (
// // //       <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${c.bg} ${c.text} border ${c.border}`}>
// // //         {c.label}
// // //       </span>
// // //     );
// // //   };

// // //   /* ── Formatters ── */
// // //   const formatDate = (d) =>
// // //     new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
// // //   const formatCardDate = (d) => {
// // //     const date = new Date(d);
// // //     return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// // //   };
// // //   const formatCardTime = (timeStr) => {
// // //     if (!timeStr) return "";
// // //     const first = timeStr.split("-")[0].trim();
// // //     return first;
// // //   };
// // //   const formatDateTime = (d) =>
// // //     new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
// // //   const formatRescheduleDate = (d) => {
// // //     const date = new Date(d);
// // //     return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
// // //   };

// // //   /* ── Mentor helpers ── */
// // //   const getMentorName = (b) =>
// // //     typeof b.mentorId === "object" ? b.mentorId?.fullName || b.menteeName || "Mentor" : b.menteeName || "Mentor";
// // //   const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
// // //   const getMentorRole = (b) =>
// // //     typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
// // //   const getMentorCompany = (b) =>
// // //     typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
// // //   const getMentorSubtitle = (b) => {
// // //     const role = getMentorRole(b);
// // //     const company = getMentorCompany(b);
// // //     if (company && role) return `${company} | ${role}`;
// // //     return company || role || "";
// // //   };

// // //   /* ── Actions ── */
// // //   const handleCancelBooking = async () => {
// // //     if (!cancelReason.trim()) { alert("Please provide a reason for cancellation"); return; }
// // //     try {
// // //       await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
// // //       alert(selectedBooking.isFreeSession ? "Booking cancelled. Your free session has been restored!" : "Booking cancelled successfully!");
// // //       closePanel();
// // //     } catch (err) {
// // //       alert("Failed to cancel: " + (err?.data?.message || "Please try again"));
// // //     }
// // //   };

// // //   const handleRescheduleBooking = async () => {
// // //     if (!rescheduleDate || !rescheduleTime) { alert("Please select new date and time"); return; }
// // //     try {
// // //       const target = rescheduleBookingTarget || selectedBooking;
// // //       await rescheduleBooking({ bookingId: target._id, newDate: rescheduleDate, newTime: rescheduleTime }).unwrap();
// // //       alert("Booking rescheduled successfully!");
// // //       closeRescheduleModal();
// // //       closePanel();
// // //     } catch (err) {
// // //       alert("Failed to reschedule: " + (err?.data?.message || "Please try again"));
// // //     }
// // //   };

// // //   /* ══════════════════════════════════════════════════════════════
// // //      RENDER
// // //   ══════════════════════════════════════════════════════════════ */
// // //   return (
// // //     <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
// // //       <div className="max-w-6xl mx-auto">
// // //         {/* Header */}
// // //         <div className="mb-8">
// // //           <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
// // //           <p className="text-xs sm:text-sm text-[#3883ef]/70 mt-1">
// // //             Manage your upcoming and past mentorship sessions
// // //           </p>
// // //         </div>

// // //         {/* Loading */}
// // //         {isLoading && (
// // //           <div className="flex items-center justify-center py-16"><Loader /></div>
// // //         )}

// // //         {/* Error */}
// // //         {isError && (
// // //           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
// // //             <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// // //             <p className="text-red-700 font-semibold mb-2">Failed to load bookings</p>
// // //             <p className="text-red-600 text-sm">{error?.data?.message || "Please try again later"}</p>
// // //           </div>
// // //         )}

// // //         {/* ── BOOKING CARDS ── */}
// // //         {!isLoading && !isError && (
// // //           <>
// // //             {bookings.length === 0 ? (
// // //               <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
// // //                 <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                   <Calendar className="w-7 h-7 text-[#3883ef]" />
// // //                 </div>
// // //                 <p className="text-gray-500 text-lg mb-2">No bookings found</p>
// // //                 <p className="text-gray-400 text-sm">Book your first session to get started!</p>
// // //               </div>
// // //             ) : (
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // //                 {bookings.map((booking) => {
// // //                   const cancellable = booking.status === "confirmed" || booking.status === "pending";

// // //                   return (
// // //                     <div
// // //                       key={booking._id}
// // //                       className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
// // //                     >


// // //                       <div className="p-4 sm:p-5">
// // //                         {/* Mentor info row */}
// // //                         <div className="flex items-start gap-3 mb-4">
// // //                           <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
// // //                             <span className="text-sm font-bold text-[#3883ef]">
// // //                               {getMentorInitials(booking)}
// // //                             </span>
// // //                           </div>
// // //                           <div className="min-w-0 flex-1">
// // //                             <div className="flex flex-wrap items-center gap-2">
// // //                               <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
// // //                                 {getMentorName(booking)}
// // //                               </h3>
// // //                               <button
// // //                                 onClick={() => openPanel(booking, "details")}
// // //                                 className="text-[11px] text-[#3883ef] border border-blue-200 bg-blue-50 rounded px-1.5 py-0.5 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 flex-shrink-0"
// // //                               >
// // //                                 <Eye className="w-3 h-3" /> Details
// // //                               </button>
// // //                             </div>
// // //                             {getMentorSubtitle(booking) && (
// // //                               <p className="text-xs text-gray-500 mt-0.5 truncate">
// // //                                 {getMentorSubtitle(booking)}
// // //                               </p>
// // //                             )}
// // //                           </div>
// // //                         </div>

// // //                         {/* Divider */}
// // //                         <div className="border-t border-gray-100 mb-3" />

// // //                         {/* Session info */}
// // //                         <div className="flex items-center justify-between mb-3">
// // //                           <div>
// // //                             <p className="text-[11px] text-gray-500 font-medium mb-1">Session Schedule</p>
// // //                             {getStatusBadge(booking.status)}
// // //                           </div>
// // //                           <div className="text-right">
// // //                             <p className="text-sm font-bold text-gray-900">
// // //                               {formatCardDate(booking.sessionDate)}
// // //                             </p>
// // //                             <p className="text-xs text-[#3883ef] font-semibold mt-0.5">
// // //                               {formatCardTime(booking.startTime)} · {booking.durationMinutes} min
// // //                             </p>
// // //                           </div>
// // //                         </div>

// // //                         {/* Action buttons */}
// // //                         {cancellable && (
// // //                           <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
// // //                             <button
// // //                               onClick={() => openPanel(booking, "reschedule")}
// // //                               className="flex-1 text-xs sm:text-sm font-semibold text-[#3883ef] border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors text-center"
// // //                             >
// // //                               Reschedule
// // //                             </button>
// // //                             <button
// // //                               onClick={() => openPanel(booking, "cancel")}
// // //                               className="flex-1 text-xs sm:text-sm font-semibold text-red-600 border border-red-200 bg-red-50 rounded-lg px-3 py-2 hover:bg-red-100 transition-colors text-center"
// // //                             >
// // //                               Cancel
// // //                             </button>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* ══════════════════════════════════════════════════════════
// // //          RESCHEDULE MODAL (centered, not side panel)
// // //       ══════════════════════════════════════════════════════════ */}
// // //       <RescheduleModal
// // //         booking={rescheduleBookingTarget}
// // //         isOpen={rescheduleModalOpen}
// // //         onClose={closeRescheduleModal}
// // //         onConfirm={handleRescheduleBooking}
// // //         isRescheduling={isRescheduling}
// // //         rescheduleDate={rescheduleDate}
// // //         setRescheduleDate={setRescheduleDate}
// // //         rescheduleTime={rescheduleTime}
// // //         setRescheduleTime={setRescheduleTime}
// // //         formatRescheduleDate={formatRescheduleDate}
// // //         formatCardTime={formatCardTime}
// // //         getMentorName={getMentorName}
// // //         getMentorInitials={getMentorInitials}
// // //       />

// // //       {/* ══════════════════════════════════════════════════════════
// // //          BACKDROP (for side panel only)
// // //       ══════════════════════════════════════════════════════════ */}
// // //       <div
// // //         onClick={closePanel}
// // //         className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
// // //           }`}
// // //       />

// // //       {/* ══════════════════════════════════════════════════════════
// // //          SLIDE-IN PANEL (details & cancel only — NO reschedule)
// // //       ══════════════════════════════════════════════════════════ */}
// // //       <div
// // //         className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl border-l border-gray-200
// // //           w-full sm:w-[440px] md:w-[500px] lg:w-[540px]
// // //           transform transition-transform duration-300 ease-in-out
// // //           ${panelOpen ? "translate-x-0" : "translate-x-full"}
// // //           flex flex-col`}
// // //       >
// // //         {selectedBooking && (
// // //           <>
// // //             {/* ────────────────────────────────────────
// // //                DETAILS VIEW
// // //             ──────────────────────────────────────── */}
// // //             {panelView === "details" && (
// // //               <>
// // //                 {/* Header */}
// // //                 <div className="bg-[#eff6ff] p-5 sm:p-6 flex-shrink-0 border-b border-blue-100">
// // //                   <div className="flex items-start justify-between mb-4">
// // //                     <div className="flex items-center gap-3 min-w-0">
// // //                       <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-200">
// // //                         <span className="text-lg sm:text-xl font-bold text-[#3883ef]">{getMentorInitials(selectedBooking)}</span>
// // //                       </div>
// // //                       <div className="min-w-0">
// // //                         <h2 className="text-lg sm:text-xl font-bold text-[#3883ef] truncate">{getMentorName(selectedBooking)}</h2>
// // //                         <p className="text-gray-500 text-xs sm:text-sm truncate">{getMentorSubtitle(selectedBooking)}</p>
// // //                       </div>
// // //                     </div>
// // //                     <button onClick={closePanel} className="text-[#3883ef]/60 hover:text-[#3883ef] p-1 flex-shrink-0 ml-2">
// // //                       <X className="w-5 h-5 sm:w-6 sm:h-6" />
// // //                     </button>
// // //                   </div>
// // //                   <div className="flex flex-wrap gap-2">
// // //                     {getStatusBadge(selectedBooking.status)}
// // //                   </div>
// // //                 </div>

// // //                 {/* Body */}
// // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // //                   {/* Session */}
// // //                   <div className="mb-6">
// // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Session Details</p>
// // //                     <div className="space-y-4">
// // //                       {[
// // //                         { Icon: Calendar, label: "Date", value: formatDate(selectedBooking.sessionDate) },
// // //                         { Icon: Clock, label: "Time", value: `${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min` },
// // //                         { Icon: Tag, label: "Session Type", value: selectedBooking.sessionType },
// // //                         { Icon: FileText, label: "Topic", value: selectedBooking.topic },
// // //                       ].map(({ Icon, label, value }) => (
// // //                         <div key={label} className="flex items-start gap-3">
// // //                           <Icon className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // //                           <div>
// // //                             <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
// // //                             <p className="text-sm font-semibold text-gray-900">{value}</p>
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                       {selectedBooking.meetingLink && (
// // //                         <div className="flex items-start gap-3">
// // //                           <Video className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // //                           <div>
// // //                             <p className="text-[11px] text-gray-500 mb-1">Meeting Link</p>
// // //                             <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // //                               className="text-sm text-[#3883ef] hover:text-blue-700 font-medium hover:underline break-all">
// // //                               Join Meeting →
// // //                             </a>
// // //                           </div>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>

// // //                   {/* Payment */}
// // //                   <div className="mb-6">
// // //                     <p className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-4">Payment & Contact</p>
// // //                     <div className="space-y-4">
// // //                       <div className="flex items-start gap-3">
// // //                         <DollarSign className="w-[18px] h-[18px] text-green-600 mt-0.5 flex-shrink-0" />
// // //                         <div>
// // //                           <p className="text-[11px] text-gray-500 mb-0.5">Amount Paid</p>
// // //                           <p className="text-xl font-bold text-gray-900">₹{selectedBooking.amountPaid || selectedBooking.price}</p>
// // //                           <p className="text-[11px] text-gray-500 mt-0.5">via {selectedBooking.paymentMethod?.toUpperCase()}</p>
// // //                         </div>
// // //                       </div>
// // //                       <div className="flex items-start gap-3">
// // //                         <Mail className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // //                         <div className="min-w-0">
// // //                           <p className="text-[11px] text-gray-500 mb-0.5">Email</p>
// // //                           <p className="text-sm text-gray-900 break-all">{selectedBooking.menteeEmail}</p>
// // //                         </div>
// // //                       </div>
// // //                       <div className="flex items-start gap-3">
// // //                         <Phone className="w-[18px] h-[18px] text-[#3883ef] mt-0.5 flex-shrink-0" />
// // //                         <div>
// // //                           <p className="text-[11px] text-gray-500 mb-0.5">Phone</p>
// // //                           <p className="text-sm text-gray-900">{selectedBooking.phoneNumber}</p>
// // //                         </div>
// // //                       </div>
// // //                       {selectedBooking.transactionId && (
// // //                         <div className="flex items-start gap-3">
// // //                           <Hash className="w-[18px] h-[18px] text-gray-500 mt-0.5 flex-shrink-0" />
// // //                           <div className="min-w-0">
// // //                             <p className="text-[11px] text-gray-500 mb-0.5">Transaction ID</p>
// // //                             <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">{selectedBooking.transactionId}</p>
// // //                           </div>
// // //                         </div>
// // //                       )}
// // //                       <div className="pt-3 border-t border-gray-100">
// // //                         <p className="text-[11px] text-gray-500 mb-1">Booking Information</p>
// // //                         <div className="space-y-1 text-xs text-gray-600">
// // //                           <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
// // //                           {selectedBooking.confirmedAt && <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>}
// // //                           <p className="font-mono text-[11px] text-gray-400">ID: {selectedBooking._id}</p>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Footer */}
// // //                 {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
// // //                   <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // //                     <div className="flex flex-col gap-2.5">
// // //                       {selectedBooking.meetingLink && (
// // //                         <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
// // //                           className="flex items-center justify-center gap-2 bg-[#3883ef] hover:bg-[#2b6fd4] text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
// // //                           <Video className="w-4 h-4" /> Join Meeting
// // //                         </a>
// // //                       )}
// // //                       <div className="grid grid-cols-2 gap-2.5">
// // //                         <button
// // //                           onClick={() => {
// // //                             closePanel();
// // //                             // open reschedule modal after panel closes
// // //                             setTimeout(() => openPanel(selectedBooking, "reschedule"), 310);
// // //                           }}
// // //                           className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
// // //                           <RefreshCw className="w-4 h-4" /> Reschedule
// // //                         </button>
// // //                         <button onClick={() => setPanelView("cancel")}
// // //                           className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors">
// // //                           <Trash2 className="w-4 h-4" /> Cancel
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </>
// // //             )}

// // //             {/* ────────────────────────────────────────
// // //                CANCEL VIEW
// // //             ──────────────────────────────────────── */}
// // //             {panelView === "cancel" && (
// // //               <>
// // //                 {/* Header */}
// // //                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
// // //                   <button onClick={() => setPanelView("details")} className="text-gray-500 hover:text-gray-700">
// // //                     <ArrowLeft className="w-5 h-5" />
// // //                   </button>
// // //                   <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
// // //                     <AlertTriangle className="w-5 h-5 text-red-600" />
// // //                   </div>
// // //                   <h2 className="text-lg font-bold text-gray-900">Cancel Booking</h2>
// // //                   <button onClick={closePanel} className="ml-auto text-gray-400 hover:text-gray-600">
// // //                     <X className="w-5 h-5" />
// // //                   </button>
// // //                 </div>

// // //                 {/* Body */}
// // //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// // //                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
// // //                     <p className="text-sm font-semibold text-gray-900">{getMentorName(selectedBooking)}</p>
// // //                     <p className="text-xs text-gray-600 mt-1">
// // //                       {formatCardDate(selectedBooking.sessionDate)} · {formatCardTime(selectedBooking.startTime)} · {selectedBooking.durationMinutes} min
// // //                     </p>
// // //                     {selectedBooking.isFreeSession && (
// // //                       <p className="mt-2 text-xs font-semibold text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
// // //                         ✓ Your free session will be restored
// // //                       </p>
// // //                     )}
// // //                   </div>

// // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                     Reason for cancellation <span className="text-red-500">*</span>
// // //                   </label>
// // //                   <textarea
// // //                     value={cancelReason}
// // //                     onChange={(e) => setCancelReason(e.target.value)}
// // //                     placeholder="Please let us know why you're cancelling..."
// // //                     rows="5"
// // //                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
// // //                   />
// // //                 </div>

// // //                 {/* Footer */}
// // //                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 bg-gray-50/80">
// // //                   <div className="flex gap-3">
// // //                     <button
// // //                       onClick={() => { setPanelView("details"); setCancelReason(""); }}
// // //                       className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold text-sm transition-colors"
// // //                     >
// // //                       Keep Booking
// // //                     </button>
// // //                     <button
// // //                       onClick={handleCancelBooking}
// // //                       disabled={isCancelling}
// // //                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // //                     >
// // //                       {isCancelling ? "Cancelling..." : "Yes, Cancel"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MenteeBookingssessions;



// // import React, { useState, useEffect, useMemo, Fragment } from "react";
// // import {
// //   Calendar,
// //   Clock,
// //   Video,
// //   DollarSign,
// //   Mail,
// //   Phone,
// //   CheckCircle,
// //   XCircle,
// //   AlertCircle,
// //   RefreshCw,
// //   X,
// //   Tag,
// //   FileText,
// //   Eye,
// //   Trash2,
// //   AlertTriangle,
// //   ArrowLeft,
// //   Hash,
// //   ChevronLeft,
// //   ChevronRight,
// //   Globe,
// //   MessageSquare,
// //   User,
// //   Sparkles,
// //   ArrowRight,
// //   Check,
// //   Loader2,
// //   CalendarCheck,
// //   ClockIcon,
// // } from "lucide-react";
// // import {
// //   useGetMenteeBookingsQuery,
// //   useCancelBookingMutation,
// //   useRescheduleBookingMutation,
// //   useGetRescheduleSlotsQuery,
// // } from "./Bookingsecapislice";
// // import Loader from "../../../../global/Loader";

// // /* ═══════════════════════════════════════════════════
// //    DAY MAPPING HELPERS
// // ═══════════════════════════════════════════════════ */
// // const DAY_FULL_NAMES = {
// //   Mon: "Monday",
// //   Tue: "Tuesday",
// //   Wed: "Wednesday",
// //   Thu: "Thursday",
// //   Fri: "Friday",
// //   Sat: "Saturday",
// //   Sun: "Sunday",
// // };

// // const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // const formatSlotTime = (time24) => {
// //   if (!time24) return "";
// //   const [h, m] = time24.split(":").map(Number);
// //   const ampm = h >= 12 ? "PM" : "AM";
// //   const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
// //   return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
// // };

// // const getSlotDuration = (from, to) => {
// //   const [fh, fm] = from.split(":").map(Number);
// //   const [th, tm] = to.split(":").map(Number);
// //   return (th * 60 + tm) - (fh * 60 + fm);
// // };

// // /* ═══════════════════════════════════════════════════
// //    RESCHEDULE MODAL
// // ═══════════════════════════════════════════════════ */
// // const RescheduleModal = ({
// //   booking,
// //   isOpen,
// //   onClose,
// //   onConfirm,
// //   isRescheduling,
// //   getMentorName,
// //   getMentorInitials,
// //   formatCardDate,
// //   formatCardTime,
// // }) => {
// //   const [fetchSlots, { data: slotsData, isLoading: slotsLoading, isError: slotsError }] =
// //     useGetRescheduleSlotsQuery();

// //   const [selectedSlot, setSelectedSlot] = useState(null);
// //   const [step, setStep] = useState("pick"); // "pick" | "confirm"

// //   const availableSlots = slotsData?.data?.[0]?.dayslots || slotsData?.data || [];

// //   useEffect(() => {
// //     if (isOpen && booking) {
// //       fetchSlots();
// //       setSelectedSlot(null);
// //       setStep("pick");
// //     }
// //   }, [isOpen, booking, fetchSlots]);

// //   useEffect(() => {
// //     document.body.style.overflow = isOpen ? "hidden" : "";
// //     return () => {
// //       document.body.style.overflow = "";
// //     };
// //   }, [isOpen]);

// //   if (!booking) return null;

// //   const handleConfirm = () => {
// //     if (!selectedSlot) return;
// //     onConfirm({
// //       bookingId: booking._id,
// //       bookedMeetingSlot: selectedSlot,
// //     });
// //   };

// //   const sortedSlots = [...availableSlots].sort(
// //     (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
// //   );

// //   return (
// //     <>
// //       {/* Backdrop */}
// //       <div
// //         onClick={onClose}
// //         className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen
// //             ? "opacity-100 pointer-events-auto"
// //             : "opacity-0 pointer-events-none"
// //           }`}
// //         style={{
// //           background: "linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,58,138,0.4) 100%)",
// //           backdropFilter: "blur(4px)",
// //         }}
// //       />

// //       {/* Modal */}
// //       <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
// //         <div
// //           className={`
// //             bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col
// //             pointer-events-auto transition-all duration-400 ease-out overflow-hidden
// //             ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"}
// //           `}
// //           style={{
// //             boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
// //           }}
// //         >
// //           {/* Header */}
// //           <div
// //             className="relative px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 flex-shrink-0"
// //             style={{
// //               background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)",
// //             }}
// //           >
// //             <button
// //               onClick={onClose}
// //               className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
// //             >
// //               <X className="w-4 h-4 text-white/80" />
// //             </button>

// //             <div className="flex items-center gap-3 sm:gap-4 mb-4">
// //               <div
// //                 className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
// //                 style={{
// //                   background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
// //                   border: "1px solid rgba(255,255,255,0.15)",
// //                 }}
// //               >
// //                 <span className="text-sm sm:text-lg font-bold text-white">
// //                   {getMentorInitials(booking)}
// //                 </span>
// //               </div>
// //               <div className="min-w-0">
// //                 <p className="text-white/50 text-[11px] sm:text-xs font-medium tracking-wide uppercase mb-0.5">
// //                   Reschedule Session
// //                 </p>
// //                 <h2 className="text-base sm:text-xl font-bold text-white truncate">
// //                   {getMentorName(booking)}
// //                 </h2>
// //               </div>
// //             </div>

// //             {/* Current schedule pill */}
// //             <div
// //               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm"
// //               style={{
// //                 background: "rgba(255,255,255,0.1)",
// //                 border: "1px solid rgba(255,255,255,0.12)",
// //               }}
// //             >
// //               <Calendar className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
// //               <span className="text-white/70 font-medium">Current:</span>
// //               <span className="text-white font-semibold">
// //                 {formatCardDate(booking.sessionDate)} · {formatCardTime(booking.startTime)}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Body */}
// //           <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6">
// //             {slotsLoading && (
// //               <div className="flex flex-col items-center justify-center py-12 sm:py-16">
// //                 <div className="w-10 h-10 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
// //                 <p className="text-sm text-slate-500 font-medium">
// //                   Loading available slots...
// //                 </p>
// //               </div>
// //             )}

// //             {slotsError && (
// //               <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-center">
// //                 <XCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
// //                 <p className="text-red-700 font-semibold text-sm mb-1">
// //                   Could not load available slots
// //                 </p>
// //                 <p className="text-red-500 text-xs">Please try again later</p>
// //               </div>
// //             )}

// //             {!slotsLoading && !slotsError && sortedSlots.length === 0 && (
// //               <div className="text-center py-12 sm:py-16">
// //                 <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
// //                 <p className="text-slate-500 font-semibold mb-1">No slots available</p>
// //                 <p className="text-slate-400 text-sm">
// //                   The mentor has no open slots right now.
// //                 </p>
// //               </div>
// //             )}

// //             {!slotsLoading && !slotsError && sortedSlots.length > 0 && (
// //               <>
// //                 {step === "pick" && (
// //                   <>
// //                     <div className="mb-5">
// //                       <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
// //                         Choose a new time slot
// //                       </h3>
// //                       <p className="text-xs sm:text-sm text-slate-500">
// //                         Select from the mentor's available windows below
// //                       </p>
// //                     </div>

// //                     <div className="grid gap-3">
// //                       {sortedSlots.map((slot, idx) => {
// //                         const isSelected =
// //                           selectedSlot?.day === slot.day &&
// //                           selectedSlot?.from === slot.from &&
// //                           selectedSlot?.to === slot.to;
// //                         const duration = getSlotDuration(slot.from, slot.to);

// //                         return (
// //                           <button
// //                             key={`${slot.day}-${idx}`}
// //                             onClick={() => setSelectedSlot(slot)}
// //                             className={`
// //                               group relative w-full text-left rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-200
// //                               ${isSelected
// //                                 ? "ring-2 ring-blue-500 bg-blue-50/50"
// //                                 : "hover:bg-slate-50 border border-slate-150"
// //                               }
// //                             `}
// //                             style={{
// //                               border: isSelected
// //                                 ? "1px solid transparent"
// //                                 : "1px solid #e8ecf1",
// //                             }}
// //                           >
// //                             {/* Selection indicator */}
// //                             <div
// //                               className={`
// //                                 absolute top-4 right-4 sm:top-5 sm:right-5 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all
// //                                 ${isSelected
// //                                   ? "bg-blue-600 scale-100"
// //                                   : "border-2 border-slate-300 group-hover:border-slate-400 scale-100"
// //                                 }
// //                               `}
// //                             >
// //                               {isSelected && (
// //                                 <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
// //                               )}
// //                             </div>

// //                             <div className="flex items-center gap-3 sm:gap-4 pr-8">
// //                               {/* Day badge */}
// //                               <div
// //                                 className={`
// //                                   w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center flex-shrink-0
// //                                   ${isSelected
// //                                     ? "bg-blue-600 text-white"
// //                                     : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/70"
// //                                   }
// //                                   transition-colors
// //                                 `}
// //                               >
// //                                 <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-70">
// //                                   {slot.day}
// //                                 </span>
// //                                 <span className="text-lg sm:text-xl font-extrabold leading-none -mt-0.5">
// //                                   {DAY_FULL_NAMES[slot.day]?.slice(0, 2) || slot.day}
// //                                 </span>
// //                               </div>

// //                               <div className="min-w-0 flex-1">
// //                                 <p
// //                                   className={`text-sm sm:text-base font-bold mb-1 ${isSelected ? "text-blue-900" : "text-slate-800"
// //                                     }`}
// //                                 >
// //                                   {DAY_FULL_NAMES[slot.day] || slot.day}
// //                                 </p>
// //                                 <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
// //                                   <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
// //                                     <Clock
// //                                       className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "text-blue-500" : "text-slate-400"
// //                                         }`}
// //                                     />
// //                                     {formatSlotTime(slot.from)} – {formatSlotTime(slot.to)}
// //                                   </span>
// //                                   <span
// //                                     className={`
// //                                       text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full
// //                                       ${isSelected
// //                                         ? "bg-blue-100 text-blue-700"
// //                                         : "bg-slate-100 text-slate-500"
// //                                       }
// //                                     `}
// //                                   >
// //                                     {Math.floor(duration / 60)}h {duration % 60 > 0 ? `${duration % 60}m` : ""} window
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
// //                   </>
// //                 )}

// //                 {step === "confirm" && selectedSlot && (
// //                   <div className="py-2">
// //                     <div className="flex flex-col items-center text-center mb-6">
// //                       <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
// //                         <CalendarCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
// //                       </div>
// //                       <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
// //                         Confirm Reschedule
// //                       </h3>
// //                       <p className="text-sm text-slate-500">
// //                         Your session will be moved to the following slot
// //                       </p>
// //                     </div>

// //                     {/* Old vs New comparison */}
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
// //                       {/* Old */}
// //                       <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
// //                         <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-3">
// //                           Current Session
// //                         </p>
// //                         <p className="text-sm font-bold text-slate-700 mb-1">
// //                           {formatCardDate(booking.sessionDate)}
// //                         </p>
// //                         <p className="text-xs text-slate-500">
// //                           {formatCardTime(booking.startTime)} · {booking.durationMinutes} min
// //                         </p>
// //                       </div>

// //                       {/* New */}
// //                       <div
// //                         className="rounded-xl p-4"
// //                         style={{
// //                           background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
// //                           border: "1px solid #bfdbfe",
// //                         }}
// //                       >
// //                         <p className="text-[10px] font-bold tracking-wider uppercase text-blue-500 mb-3">
// //                           New Slot
// //                         </p>
// //                         <p className="text-sm font-bold text-blue-900 mb-1">
// //                           {DAY_FULL_NAMES[selectedSlot.day] || selectedSlot.day}
// //                         </p>
// //                         <p className="text-xs text-blue-600">
// //                           {formatSlotTime(selectedSlot.from)} – {formatSlotTime(selectedSlot.to)}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
// //                       <div className="flex gap-2.5">
// //                         <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
// //                         <div>
// //                           <p className="text-xs font-semibold text-amber-800 mb-0.5">
// //                             Please note
// //                           </p>
// //                           <p className="text-[11px] sm:text-xs text-amber-700 leading-relaxed">
// //                             Once confirmed, your current session time will be released and the new
// //                             slot will be reserved. You'll receive updated calendar invites.
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>

// //           {/* Footer */}
// //           {!slotsLoading && !slotsError && sortedSlots.length > 0 && (
// //             <div
// //               className="flex-shrink-0 px-5 sm:px-8 py-4 sm:py-5 flex items-center gap-3"
// //               style={{
// //                 borderTop: "1px solid #f1f5f9",
// //                 background: "linear-gradient(to top, #f8fafc, white)",
// //               }}
// //             >
// //               {step === "confirm" && (
// //                 <button
// //                   onClick={() => setStep("pick")}
// //                   className="px-4 py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
// //                 >
// //                   ← Back
// //                 </button>
// //               )}
// //               <div className="flex-1" />
// //               {step === "pick" && (
// //                 <button
// //                   onClick={() => setStep("confirm")}
// //                   disabled={!selectedSlot}
// //                   className={`
// //                     flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all
// //                     ${selectedSlot
// //                       ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20"
// //                       : "bg-slate-200 text-slate-400 cursor-not-allowed"
// //                     }
// //                   `}
// //                 >
// //                   Continue
// //                   <ArrowRight className="w-4 h-4" />
// //                 </button>
// //               )}
// //               {step === "confirm" && (
// //                 <button
// //                   onClick={handleConfirm}
// //                   disabled={isRescheduling}
// //                   className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {isRescheduling ? (
// //                     <>
// //                       <Loader2 className="w-4 h-4 animate-spin" />
// //                       Rescheduling...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Check className="w-4 h-4" />
// //                       Confirm Reschedule
// //                     </>
// //                   )}
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // /* ═══════════════════════════════════════════════════
// //    MAIN COMPONENT
// // ═══════════════════════════════════════════════════ */
// // const MenteeBookingssessions = () => {
// //   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
// //   const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
// //   const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [panelView, setPanelView] = useState("details");
// //   const [panelOpen, setPanelOpen] = useState(false);
// //   const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
// //   const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
// //   const [cancelReason, setCancelReason] = useState("");

// //   const bookings = data?.data || [];

// //   /* ── Panel controls ── */
// //   const openPanel = (booking, view = "details") => {
// //     if (view === "reschedule") {
// //       setRescheduleBookingTarget(booking);
// //       setRescheduleModalOpen(true);
// //       return;
// //     }
// //     setSelectedBooking(booking);
// //     setPanelView(view);
// //     setPanelOpen(true);
// //   };

// //   const closePanel = () => {
// //     setPanelOpen(false);
// //     setTimeout(() => {
// //       setSelectedBooking(null);
// //       setPanelView("details");
// //       setCancelReason("");
// //     }, 300);
// //   };

// //   const closeRescheduleModal = () => {
// //     setRescheduleModalOpen(false);
// //     setTimeout(() => {
// //       setRescheduleBookingTarget(null);
// //     }, 300);
// //   };

// //   useEffect(() => {
// //     document.body.style.overflow =
// //       rescheduleModalOpen || panelOpen ? "hidden" : "";
// //     return () => {
// //       document.body.style.overflow = "";
// //     };
// //   }, [panelOpen, rescheduleModalOpen]);

// //   /* ── Badges ── */
// //   const statusConfig = {
// //     confirmed: {
// //       bg: "bg-emerald-50",
// //       text: "text-emerald-700",
// //       border: "border-emerald-200",
// //       dot: "bg-emerald-500",
// //       label: "Confirmed",
// //     },
// //     pending: {
// //       bg: "bg-amber-50",
// //       text: "text-amber-700",
// //       border: "border-amber-200",
// //       dot: "bg-amber-500",
// //       label: "Pending",
// //     },
// //     cancelled: {
// //       bg: "bg-red-50",
// //       text: "text-red-600",
// //       border: "border-red-200",
// //       dot: "bg-red-500",
// //       label: "Cancelled",
// //     },
// //     completed: {
// //       bg: "bg-sky-50",
// //       text: "text-sky-700",
// //       border: "border-sky-200",
// //       dot: "bg-sky-500",
// //       label: "Completed",
// //     },
// //     unattended: {
// //       bg: "bg-orange-50",
// //       text: "text-orange-600",
// //       border: "border-orange-200",
// //       dot: "bg-orange-500",
// //       label: "Unattended",
// //     },
// //   };

// //   const getStatusBadge = (status) => {
// //     const c = statusConfig[status] || statusConfig.pending;
// //     return (
// //       <span
// //         className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.bg} ${c.text} border ${c.border}`}
// //       >
// //         <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
// //         {c.label}
// //       </span>
// //     );
// //   };

// //   /* ── Formatters ── */
// //   const formatDate = (d) =>
// //     new Date(d).toLocaleDateString("en-US", {
// //       weekday: "long",
// //       year: "numeric",
// //       month: "long",
// //       day: "numeric",
// //     });
// //   const formatCardDate = (d) => {
// //     const date = new Date(d);
// //     return date.toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });
// //   };
// //   const formatCardTime = (timeStr) => {
// //     if (!timeStr) return "";
// //     return timeStr.split("-")[0].trim();
// //   };
// //   const formatDateTime = (d) =>
// //     new Date(d).toLocaleString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });

// //   /* ── Mentor helpers ── */
// //   const getMentorName = (b) =>
// //     typeof b.mentorId === "object"
// //       ? b.mentorId?.fullName || b.menteeName || "Mentor"
// //       : b.menteeName || "Mentor";
// //   const getMentorInitials = (b) =>
// //     getMentorName(b).slice(0, 2).toUpperCase();
// //   const getMentorRole = (b) =>
// //     typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
// //   const getMentorCompany = (b) =>
// //     typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
// //   const getMentorSubtitle = (b) => {
// //     const role = getMentorRole(b);
// //     const company = getMentorCompany(b);
// //     if (company && role) return `${company} · ${role}`;
// //     return company || role || "";
// //   };

// //   /* ── Actions ── */
// //   const handleCancelBooking = async () => {
// //     if (!cancelReason.trim()) {
// //       alert("Please provide a reason for cancellation");
// //       return;
// //     }
// //     try {
// //       await cancelBooking({
// //         bookingId: selectedBooking._id,
// //         reason: cancelReason,
// //       }).unwrap();
// //       alert(
// //         selectedBooking.isFreeSession
// //           ? "Booking cancelled. Your free session has been restored!"
// //           : "Booking cancelled successfully!"
// //       );
// //       closePanel();
// //     } catch (err) {
// //       alert(
// //         "Failed to cancel: " + (err?.data?.message || "Please try again")
// //       );
// //     }
// //   };

// //   const handleRescheduleBooking = async ({ bookingId, bookedMeetingSlot }) => {
// //     try {
// //       await rescheduleBooking({ bookingId, bookedMeetingSlot }).unwrap();
// //       alert("Booking rescheduled successfully!");
// //       closeRescheduleModal();
// //       closePanel();
// //     } catch (err) {
// //       alert(
// //         "Failed to reschedule: " + (err?.data?.message || "Please try again")
// //       );
// //     }
// //   };

// //   /* ══════════════════════════════════════════════════════════════
// //      RENDER
// //   ══════════════════════════════════════════════════════════════ */
// //   return (
// //     <div className="min-h-screen bg-[#fafbfc]">
// //       {/* Top accent bar */}
// //       <div
// //         className="h-1"
// //         style={{
// //           background: "linear-gradient(90deg, #1e40af, #3b82f6, #60a5fa, #3b82f6, #1e40af)",
// //         }}
// //       />

// //       <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-6xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8 sm:mb-10">
// //           <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
// //             <div>
// //               <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
// //                 My Bookings
// //               </h1>
// //               <p className="text-sm sm:text-base text-slate-500 mt-1 font-medium">
// //                 Manage your upcoming and past mentorship sessions
// //               </p>
// //             </div>
// //             {bookings.length > 0 && (
// //               <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full self-start sm:self-auto">
// //                 <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
// //                 <span className="text-xs font-semibold text-slate-600">
// //                   {bookings.length} session{bookings.length !== 1 ? "s" : ""}
// //                 </span>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Loading */}
// //         {isLoading && (
// //           <div className="flex items-center justify-center py-20">
// //             <Loader />
// //           </div>
// //         )}

// //         {/* Error */}
// //         {isError && (
// //           <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
// //             <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
// //               <XCircle className="w-7 h-7 text-red-500" />
// //             </div>
// //             <p className="text-red-800 font-bold text-lg mb-2">
// //               Failed to load bookings
// //             </p>
// //             <p className="text-red-500 text-sm">
// //               {error?.data?.message || "Please try again later"}
// //             </p>
// //           </div>
// //         )}

// //         {/* ── BOOKING CARDS ── */}
// //         {!isLoading && !isError && (
// //           <>
// //             {bookings.length === 0 ? (
// //               <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
// //                 <div
// //                   className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
// //                   style={{
// //                     background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
// //                   }}
// //                 >
// //                   <Calendar className="w-8 h-8 text-blue-600" />
// //                 </div>
// //                 <p className="text-slate-800 text-xl font-bold mb-2">
// //                   No bookings yet
// //                 </p>
// //                 <p className="text-slate-400 text-sm max-w-sm mx-auto">
// //                   Book your first mentorship session to get started on your
// //                   learning journey.
// //                 </p>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
// //                 {bookings.map((booking) => {
// //                   const cancellable =
// //                     booking.status === "confirmed" ||
// //                     booking.status === "pending";
// //                   const sc = statusConfig[booking.status] || statusConfig.pending;

// //                   return (
// //                     <div
// //                       key={booking._id}
// //                       className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:border-slate-300/80"
// //                     >
// //                       {/* Status bar top */}
// //                       <div
// //                         className={`h-[3px] ${sc.dot.replace("bg-", "bg-")}`}
// //                         style={{
// //                           opacity: 0.6,
// //                           background:
// //                             booking.status === "confirmed"
// //                               ? "linear-gradient(90deg, #10b981, #34d399)"
// //                               : booking.status === "pending"
// //                                 ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
// //                                 : booking.status === "cancelled"
// //                                   ? "linear-gradient(90deg, #ef4444, #f87171)"
// //                                   : booking.status === "completed"
// //                                     ? "linear-gradient(90deg, #0ea5e9, #38bdf8)"
// //                                     : "linear-gradient(90deg, #f97316, #fb923c)",
// //                         }}
// //                       />

// //                       <div className="p-4 sm:p-5">
// //                         {/* Mentor info row */}
// //                         <div className="flex items-start gap-3 sm:gap-4 mb-4">
// //                           <div
// //                             className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
// //                             style={{
// //                               background: "linear-gradient(135deg, #1e40af, #3b82f6)",
// //                             }}
// //                           >
// //                             <span className="text-xs sm:text-sm font-bold text-white">
// //                               {getMentorInitials(booking)}
// //                             </span>
// //                           </div>
// //                           <div className="min-w-0 flex-1">
// //                             <div className="flex flex-wrap items-center gap-2 mb-0.5">
// //                               <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
// //                                 {getMentorName(booking)}
// //                               </h3>
// //                             </div>
// //                             {getMentorSubtitle(booking) && (
// //                               <p className="text-[11px] sm:text-xs text-slate-500 truncate">
// //                                 {getMentorSubtitle(booking)}
// //                               </p>
// //                             )}
// //                           </div>
// //                           <button
// //                             onClick={() => openPanel(booking, "details")}
// //                             className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-2 py-1 transition-colors flex-shrink-0"
// //                           >
// //                             <Eye className="w-3 h-3" />
// //                             <span className="hidden sm:inline">View</span>
// //                           </button>
// //                         </div>

// //                         {/* Session info card */}
// //                         <div className="bg-slate-50/80 rounded-xl p-3 sm:p-4 mb-3 border border-slate-100">
// //                           <div className="flex items-center justify-between gap-3">
// //                             <div className="min-w-0">
// //                               {getStatusBadge(booking.status)}
// //                               <div className="flex items-center gap-1.5 mt-2.5">
// //                                 <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
// //                                 <span className="text-sm font-bold text-slate-800">
// //                                   {formatCardDate(booking.sessionDate)}
// //                                 </span>
// //                               </div>
// //                             </div>
// //                             <div className="text-right flex-shrink-0">
// //                               <div className="flex items-center gap-1.5 justify-end">
// //                                 <Clock className="w-3.5 h-3.5 text-blue-500" />
// //                                 <span className="text-sm font-bold text-blue-600">
// //                                   {formatCardTime(booking.startTime)}
// //                                 </span>
// //                               </div>
// //                               <span className="text-[11px] text-slate-500 mt-1 block">
// //                                 {booking.durationMinutes} min session
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>

// //                         {/* Action buttons */}
// //                         {cancellable && (
// //                           <div className="flex items-center gap-2 pt-1">
// //                             <button
// //                               onClick={() => openPanel(booking, "reschedule")}
// //                               className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2.5 hover:bg-slate-50 hover:border-slate-300 transition-all"
// //                             >
// //                               <RefreshCw className="w-3.5 h-3.5" />
// //                               Reschedule
// //                             </button>
// //                             <button
// //                               onClick={() => openPanel(booking, "cancel")}
// //                               className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 hover:bg-red-100 hover:border-red-300 transition-all"
// //                             >
// //                               <X className="w-3.5 h-3.5" />
// //                               Cancel
// //                             </button>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>

// //       {/* ══════════════════════════════════════════════════════════
// //          RESCHEDULE MODAL
// //       ══════════════════════════════════════════════════════════ */}
// //       <RescheduleModal
// //         booking={rescheduleBookingTarget}
// //         isOpen={rescheduleModalOpen}
// //         onClose={closeRescheduleModal}
// //         onConfirm={handleRescheduleBooking}
// //         isRescheduling={isRescheduling}
// //         getMentorName={getMentorName}
// //         getMentorInitials={getMentorInitials}
// //         formatCardDate={formatCardDate}
// //         formatCardTime={formatCardTime}
// //       />

// //       {/* ══════════════════════════════════════════════════════════
// //          BACKDROP (for side panel)
// //       ══════════════════════════════════════════════════════════ */}
// //       <div
// //         onClick={closePanel}
// //         className={`fixed inset-0 z-40 transition-all duration-300 ${panelOpen
// //             ? "opacity-100 pointer-events-auto"
// //             : "opacity-0 pointer-events-none"
// //           }`}
// //         style={{
// //           background: "linear-gradient(135deg, rgba(15,23,42,0.5), rgba(30,58,138,0.3))",
// //           backdropFilter: "blur(3px)",
// //         }}
// //       />

// //       {/* ══════════════════════════════════════════════════════════
// //          SLIDE-IN PANEL (details & cancel)
// //       ══════════════════════════════════════════════════════════ */}
// //       <div
// //         className={`fixed top-0 right-0 h-full z-50 bg-white
// //           w-full sm:w-[440px] md:w-[500px] lg:w-[540px]
// //           transform transition-transform duration-300 ease-in-out
// //           ${panelOpen ? "translate-x-0" : "translate-x-full"}
// //           flex flex-col`}
// //         style={{
// //           boxShadow: panelOpen
// //             ? "-20px 0 60px -12px rgba(0,0,0,0.15)"
// //             : "none",
// //         }}
// //       >
// //         {selectedBooking && (
// //           <>
// //             {/* ────────────────────────────────────────
// //                DETAILS VIEW
// //             ──────────────────────────────────────── */}
// //             {panelView === "details" && (
// //               <>
// //                 {/* Header */}
// //                 <div
// //                   className="relative p-5 sm:p-6 flex-shrink-0"
// //                   style={{
// //                     background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)",
// //                   }}
// //                 >
// //                   <button
// //                     onClick={closePanel}
// //                     className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
// //                   >
// //                     <X className="w-4 h-4 text-white/80" />
// //                   </button>

// //                   <div className="flex items-center gap-3 sm:gap-4 mb-4">
// //                     <div
// //                       className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
// //                       style={{
// //                         background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
// //                         border: "1px solid rgba(255,255,255,0.15)",
// //                       }}
// //                     >
// //                       <span className="text-base sm:text-lg font-bold text-white">
// //                         {getMentorInitials(selectedBooking)}
// //                       </span>
// //                     </div>
// //                     <div className="min-w-0">
// //                       <h2 className="text-lg sm:text-xl font-bold text-white truncate">
// //                         {getMentorName(selectedBooking)}
// //                       </h2>
// //                       <p className="text-white/50 text-xs sm:text-sm truncate">
// //                         {getMentorSubtitle(selectedBooking)}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex flex-wrap gap-2">
// //                     {getStatusBadge(selectedBooking.status)}
// //                   </div>
// //                 </div>

// //                 {/* Body */}
// //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// //                   {/* Session Details */}
// //                   <div className="mb-6">
// //                     <p className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
// //                       Session Details
// //                     </p>
// //                     <div className="space-y-4">
// //                       {[
// //                         {
// //                           Icon: Calendar,
// //                           label: "Date",
// //                           value: formatDate(selectedBooking.sessionDate),
// //                           color: "text-blue-600",
// //                           bg: "bg-blue-50",
// //                         },
// //                         {
// //                           Icon: Clock,
// //                           label: "Time",
// //                           value: `${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min`,
// //                           color: "text-violet-600",
// //                           bg: "bg-violet-50",
// //                         },
// //                         {
// //                           Icon: Tag,
// //                           label: "Session Type",
// //                           value: selectedBooking.sessionType,
// //                           color: "text-emerald-600",
// //                           bg: "bg-emerald-50",
// //                         },
// //                         {
// //                           Icon: FileText,
// //                           label: "Topic",
// //                           value: selectedBooking.topic,
// //                           color: "text-amber-600",
// //                           bg: "bg-amber-50",
// //                         },
// //                       ].map(({ Icon, label, value, color, bg }) => (
// //                         <div key={label} className="flex items-start gap-3">
// //                           <div
// //                             className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
// //                           >
// //                             <Icon className={`w-4 h-4 ${color}`} />
// //                           </div>
// //                           <div>
// //                             <p className="text-[11px] text-slate-400 font-medium mb-0.5">
// //                               {label}
// //                             </p>
// //                             <p className="text-sm font-semibold text-slate-800">
// //                               {value || "—"}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       ))}
// //                       {selectedBooking.meetingLink && (
// //                         <div className="flex items-start gap-3">
// //                           <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
// //                             <Video className="w-4 h-4 text-sky-600" />
// //                           </div>
// //                           <div>
// //                             <p className="text-[11px] text-slate-400 font-medium mb-1">
// //                               Meeting Link
// //                             </p>
// //                             <a
// //                               href={selectedBooking.meetingLink}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                               className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline break-all"
// //                             >
// //                               Join Meeting →
// //                             </a>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Payment & Contact */}
// //                   <div className="mb-6">
// //                     <p className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
// //                       Payment & Contact
// //                     </p>
// //                     <div className="space-y-4">
// //                       <div className="flex items-start gap-3">
// //                         <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
// //                           <DollarSign className="w-4 h-4 text-emerald-600" />
// //                         </div>
// //                         <div>
// //                           <p className="text-[11px] text-slate-400 font-medium mb-0.5">
// //                             Amount Paid
// //                           </p>
// //                           <p className="text-xl font-extrabold text-slate-900">
// //                             ₹{selectedBooking.amountPaid || selectedBooking.price}
// //                           </p>
// //                           <p className="text-[11px] text-slate-400 mt-0.5">
// //                             via{" "}
// //                             {selectedBooking.paymentMethod?.toUpperCase() ||
// //                               "N/A"}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-start gap-3">
// //                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
// //                           <Mail className="w-4 h-4 text-blue-600" />
// //                         </div>
// //                         <div className="min-w-0">
// //                           <p className="text-[11px] text-slate-400 font-medium mb-0.5">
// //                             Email
// //                           </p>
// //                           <p className="text-sm text-slate-800 break-all">
// //                             {selectedBooking.menteeEmail || "—"}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-start gap-3">
// //                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
// //                           <Phone className="w-4 h-4 text-blue-600" />
// //                         </div>
// //                         <div>
// //                           <p className="text-[11px] text-slate-400 font-medium mb-0.5">
// //                             Phone
// //                           </p>
// //                           <p className="text-sm text-slate-800">
// //                             {selectedBooking.phoneNumber || "—"}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       {selectedBooking.transactionId && (
// //                         <div className="flex items-start gap-3">
// //                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
// //                             <Hash className="w-4 h-4 text-slate-500" />
// //                           </div>
// //                           <div className="min-w-0">
// //                             <p className="text-[11px] text-slate-400 font-medium mb-1">
// //                               Transaction ID
// //                             </p>
// //                             <p className="text-xs font-mono text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg break-all border border-slate-100">
// //                               {selectedBooking.transactionId}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       )}

// //                       <div className="pt-3 border-t border-slate-100">
// //                         <p className="text-[11px] text-slate-400 font-medium mb-2">
// //                           Booking Information
// //                         </p>
// //                         <div className="space-y-1 text-xs text-slate-500">
// //                           <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
// //                           {selectedBooking.confirmedAt && (
// //                             <p>
// //                               Confirmed:{" "}
// //                               {formatDateTime(selectedBooking.confirmedAt)}
// //                             </p>
// //                           )}
// //                           <p className="font-mono text-[11px] text-slate-400">
// //                             ID: {selectedBooking._id}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Footer */}
// //                 {(selectedBooking.status === "confirmed" ||
// //                   selectedBooking.status === "pending") && (
// //                     <div
// //                       className="flex-shrink-0 p-4 sm:p-5"
// //                       style={{
// //                         borderTop: "1px solid #f1f5f9",
// //                         background: "linear-gradient(to top, #f8fafc, white)",
// //                       }}
// //                     >
// //                       <div className="flex flex-col gap-2.5">
// //                         {selectedBooking.meetingLink && (
// //                           <a
// //                             href={selectedBooking.meetingLink}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-blue-600/20"
// //                             style={{
// //                               background: "linear-gradient(135deg, #1e40af, #3b82f6)",
// //                             }}
// //                           >
// //                             <Video className="w-4 h-4" /> Join Meeting
// //                           </a>
// //                         )}
// //                         <div className="grid grid-cols-2 gap-2.5">
// //                           <button
// //                             onClick={() => {
// //                               closePanel();
// //                               setTimeout(
// //                                 () => openPanel(selectedBooking, "reschedule"),
// //                                 310
// //                               );
// //                             }}
// //                             className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
// //                           >
// //                             <RefreshCw className="w-4 h-4" /> Reschedule
// //                           </button>
// //                           <button
// //                             onClick={() => setPanelView("cancel")}
// //                             className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-100 hover:border-red-300 transition-all"
// //                           >
// //                             <Trash2 className="w-4 h-4" /> Cancel
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}
// //               </>
// //             )}

// //             {/* ────────────────────────────────────────
// //                CANCEL VIEW
// //             ──────────────────────────────────────── */}
// //             {panelView === "cancel" && (
// //               <>
// //                 {/* Header */}
// //                 <div className="flex items-center gap-3 p-5 border-b border-slate-100 flex-shrink-0">
// //                   <button
// //                     onClick={() => setPanelView("details")}
// //                     className="text-slate-400 hover:text-slate-600 transition-colors"
// //                   >
// //                     <ArrowLeft className="w-5 h-5" />
// //                   </button>
// //                   <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
// //                     <AlertTriangle className="w-5 h-5 text-red-500" />
// //                   </div>
// //                   <h2 className="text-lg font-bold text-slate-900">
// //                     Cancel Booking
// //                   </h2>
// //                   <button
// //                     onClick={closePanel}
// //                     className="ml-auto text-slate-400 hover:text-slate-600"
// //                   >
// //                     <X className="w-5 h-5" />
// //                   </button>
// //                 </div>

// //                 {/* Body */}
// //                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
// //                   <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
// //                     <p className="text-sm font-bold text-slate-800">
// //                       {getMentorName(selectedBooking)}
// //                     </p>
// //                     <p className="text-xs text-slate-500 mt-1.5">
// //                       {formatCardDate(selectedBooking.sessionDate)} ·{" "}
// //                       {formatCardTime(selectedBooking.startTime)} ·{" "}
// //                       {selectedBooking.durationMinutes} min
// //                     </p>
// //                     {selectedBooking.isFreeSession && (
// //                       <p className="mt-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg px-2.5 py-1.5 inline-block border border-emerald-200">
// //                         ✓ Your free session will be restored
// //                       </p>
// //                     )}
// //                   </div>

// //                   <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                     Reason for cancellation{" "}
// //                     <span className="text-red-500">*</span>
// //                   </label>
// //                   <textarea
// //                     value={cancelReason}
// //                     onChange={(e) => setCancelReason(e.target.value)}
// //                     placeholder="Please let us know why you're cancelling..."
// //                     rows="5"
// //                     className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 resize-none bg-white transition-all"
// //                   />
// //                 </div>

// //                 {/* Footer */}
// //                 <div
// //                   className="flex-shrink-0 p-4 sm:p-5"
// //                   style={{
// //                     borderTop: "1px solid #f1f5f9",
// //                     background: "linear-gradient(to top, #f8fafc, white)",
// //                   }}
// //                 >
// //                   <div className="flex gap-3">
// //                     <button
// //                       onClick={() => {
// //                         setPanelView("details");
// //                         setCancelReason("");
// //                       }}
// //                       className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-all"
// //                     >
// //                       Keep Booking
// //                     </button>
// //                     <button
// //                       onClick={handleCancelBooking}
// //                       disabled={isCancelling}
// //                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/20"
// //                     >
// //                       {isCancelling ? "Cancelling..." : "Yes, Cancel"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MenteeBookingssessions;

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Calendar,
//   Clock,
//   Video,
//   DollarSign,
//   Mail,
//   Phone,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   X,
//   Tag,
//   FileText,
//   Eye,
//   Trash2,
//   AlertTriangle,
//   ArrowLeft,
//   Hash,
//   ChevronLeft,
//   ChevronRight,
//   Globe,
//   User,
//   Check,
//   Loader2,
//   ExternalLink,
//   Zap,
//   ArrowRight,
//   MessageCircle,
//   CreditCard,
//   CalendarCheck,
//   CalendarDays,
// } from "lucide-react";
// import {
//   useGetMenteeBookingsQuery,
//   useCancelBookingMutation,
//   useRescheduleBookingMutation,
//   useGetRescheduleSlotsQuery,
// } from "./Bookingsecapislice";
// import Loader from "../../../../global/Loader";

// /* ═══════════════════════════════════════════════════
//    CONSTANTS & HELPERS
// ═══════════════════════════════════════════════════ */
// const DAY_FULL = {
//   Mon: "Monday",
//   Tue: "Tuesday",
//   Wed: "Wednesday",
//   Thu: "Thursday",
//   Fri: "Friday",
//   Sat: "Saturday",
//   Sun: "Sunday",
// };
// const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const to12h = (t) => {
//   if (!t) return "";
//   const [h, m] = t.split(":").map(Number);
//   const ampm = h >= 12 ? "PM" : "AM";
//   const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
//   return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
// };

// const slotHours = (from, to) => {
//   const [fh, fm] = from.split(":").map(Number);
//   const [th, tm] = to.split(":").map(Number);
//   const mins = th * 60 + tm - (fh * 60 + fm);
//   const h = Math.floor(mins / 60);
//   const r = mins % 60;
//   return h > 0 ? `${h}h${r > 0 ? ` ${r}m` : ""}` : `${r}m`;
// };

// const DAY_COLORS = {
//   Mon: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", accent: "#3b82f6" },
//   Tue: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", accent: "#8b5cf6" },
//   Wed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", accent: "#10b981" },
//   Thu: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", accent: "#f59e0b" },
//   Fri: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", accent: "#f43f5e" },
//   Sat: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", accent: "#06b6d4" },
//   Sun: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", accent: "#f97316" },
// };

// /* ═══════════════════════════════════════════════════
//    MINI CALENDAR (from original)
// ═══════════════════════════════════════════════════ */
// const MiniCalendar = ({ selectedDate, onSelect, minDate }) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const [viewMonth, setViewMonth] = useState(today.getMonth());
//   const [viewYear, setViewYear] = useState(today.getFullYear());

//   const monthNames = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December",
//   ];
//   const dayNames = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

//   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
//   const firstDay = new Date(viewYear, viewMonth, 1).getDay();

//   const prevMonth = () => {
//     if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
//     else setViewMonth(viewMonth - 1);
//   };
//   const nextMonth = () => {
//     if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
//     else setViewMonth(viewMonth + 1);
//   };

//   const canGoPrev = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

//   const isDisabled = (day) => {
//     const d = new Date(viewYear, viewMonth, day);
//     d.setHours(0, 0, 0, 0);
//     const min = minDate ? new Date(minDate) : today;
//     min.setHours(0, 0, 0, 0);
//     return d < min;
//   };

//   const isSelected = (day) => {
//     if (!selectedDate) return false;
//     const d = new Date(viewYear, viewMonth, day);
//     const s = new Date(selectedDate);
//     return d.toDateString() === s.toDateString();
//   };

//   const isToday = (day) => {
//     const d = new Date(viewYear, viewMonth, day);
//     return d.toDateString() === today.toDateString();
//   };

//   const blanks = Array.from({ length: firstDay }, (_, i) => i);
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm font-bold text-slate-800">
//           {monthNames[viewMonth]} {viewYear}
//         </h3>
//         <div className="flex items-center gap-0.5">
//           <button onClick={prevMonth} disabled={!canGoPrev}
//             className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
//             <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
//           </button>
//           <button onClick={nextMonth}
//             className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
//             <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-7 mb-1.5">
//         {dayNames.map((d) => (
//           <div key={d} className="text-center text-[9px] font-bold text-slate-400 py-1 tracking-wider">
//             {d}
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-y-0.5">
//         {blanks.map((b) => <div key={`b-${b}`} />)}
//         {days.map((day) => {
//           const disabled = isDisabled(day);
//           const selected = isSelected(day);
//           const todayMark = isToday(day);
//           return (
//             <button key={day}
//               onClick={() => {
//                 if (!disabled) {
//                   const d = new Date(viewYear, viewMonth, day);
//                   onSelect(d.toISOString().split("T")[0]);
//                 }
//               }}
//               disabled={disabled}
//               className={`
//                 relative w-8 h-8 mx-auto rounded-lg text-xs font-semibold transition-all
//                 ${disabled ? "text-slate-300 cursor-not-allowed" : "cursor-pointer hover:bg-blue-50"}
//                 ${selected ? "bg-[#1e40af] text-white hover:bg-[#1e40af] shadow-md shadow-blue-600/25" : "text-slate-600"}
//                 ${todayMark && !selected ? "ring-1.5 ring-blue-400 text-blue-600 font-bold" : ""}
//               `}
//             >
//               {day}
//             </button>
//           );
//         })}
//       </div>

//       <p className="text-[10px] text-slate-400 mt-3 font-medium">
//         Today: {today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
//       </p>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════
//    TIME SLOT PICKER (from original)
// ═══════════════════════════════════════════════════ */
// const TimeSlotPicker = ({ selectedTime, onSelect, duration }) => {
//   const slots = useMemo(() => {
//     const s = [];
//     for (let h = 8; h <= 21; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
//         const ampm = h >= 12 ? "PM" : "AM";
//         const label = `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
//         const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
//         s.push({ label, value });
//       }
//     }
//     return s;
//   }, []);

//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-2">
//         <Clock className="w-3.5 h-3.5 text-slate-400" />
//         <span className="text-xs font-semibold text-slate-600">{duration || 30} mins</span>
//       </div>
//       <div className="flex items-center gap-2 mb-3">
//         <Globe className="w-3.5 h-3.5 text-slate-400" />
//         <span className="text-[10px] text-slate-500 font-medium">
//           {Intl.DateTimeFormat().resolvedOptions().timeZone}
//         </span>
//       </div>

//       <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1"
//         style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
//         {slots.map((slot) => (
//           <button key={slot.value} onClick={() => onSelect(slot.value)}
//             className={`
//               w-full py-2 px-3 rounded-lg border text-xs font-semibold transition-all
//               ${selectedTime === slot.value
//                 ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
//                 : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"
//               }
//             `}
//           >
//             {slot.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════
//    RESCHEDULE MODAL — Original layout style
//    + Available slots from API shown as cards
// ═══════════════════════════════════════════════════ */
// const RescheduleModal = ({
//   booking,
//   isOpen,
//   onClose,
//   onConfirm,
//   isRescheduling,
//   getMentorName,
//   getMentorInitials,
//   formatCardDate,
//   formatCardTime,
// }) => {
//   // Extract mentorId — could be an object or a string
//   const mentorId =
//     typeof booking?.mentorId === "object"
//       ? booking?.mentorId?._id || booking?.mentorId?.id
//       : booking?.mentorId;

//   const { data: slotsData, isLoading: slotsLoading, isError: slotsError } =
//     useGetRescheduleSlotsQuery(
//       { mentorId },
//       { skip: !isOpen || !mentorId }
//     );

//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [rescheduleDate, setRescheduleDate] = useState("");
//   const [rescheduleTime, setRescheduleTime] = useState("");
//   const [step, setStep] = useState("slots"); // "slots" | "confirm"

//   const availableSlots = slotsData?.data?.[0]?.dayslots || slotsData?.data || [];
//   const sortedSlots = [...availableSlots].sort(
//     (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
//   );

//   useEffect(() => {
//     if (isOpen && booking) {
//       setSelectedSlot(null);
//       setRescheduleDate("");
//       setRescheduleTime("");
//       setStep("slots");
//     }
//   }, [isOpen, booking]);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   if (!booking) return null;

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     setStep("confirm");
//   };

//   const handleConfirm = () => {
//     if (!selectedSlot) return;
//     onConfirm({
//       bookingId: booking._id,
//       bookedMeetingSlot: selectedSlot,
//     });
//   };

//   const formatRescheduleDate = (d) => {
//     const date = new Date(d);
//     return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div onClick={onClose}
//         className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
//           ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
//         style={{ backdropFilter: "blur(6px)" }}
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
//         <div className={`
//           bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col
//           pointer-events-auto transition-all duration-300
//           ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
//         `}>
//           {/* Modal Header */}
//           <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-slate-100 flex-shrink-0">
//             {step === "confirm" ? (
//               <button onClick={() => setStep("slots")}
//                 className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium">
//                 <ArrowLeft className="w-4 h-4" />Back to Slots
//               </button>
//             ) : (
//               <button onClick={onClose}
//                 className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium">
//                 <ArrowLeft className="w-4 h-4" />Back
//               </button>
//             )}
//             <div className="flex-1" />
//             <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div className="flex-1 overflow-y-auto">
//             <div className="p-5 sm:p-6">
//               <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//                 {/* ── Left Column: Mentor info + current schedule ── */}
//                 <div className="lg:w-60 flex-shrink-0">
//                   <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
//                     style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}>
//                     <span className="text-sm font-bold text-white">{getMentorInitials(booking)}</span>
//                   </div>
//                   <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight mb-4">
//                     Reschedule your{" "}
//                     <span className="text-blue-600">{booking.sessionType || "1:1"} Session</span>
//                     {" "}with {getMentorName(booking)}
//                   </h2>

//                   {/* Current schedule card */}
//                   <div className="rounded-xl p-4"
//                     style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", border: "1px solid #e2e8f0" }}>
//                     <div className="flex items-center gap-2 mb-2">
//                       <Calendar className="w-3.5 h-3.5 text-slate-400" />
//                       <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                         Current Schedule
//                       </span>
//                     </div>
//                     <p className="text-sm font-bold text-slate-800 mb-1">
//                       {booking.sessionType || "1:1"} Session
//                     </p>
//                     <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-full px-2.5 py-1">
//                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
//                       {formatRescheduleDate(booking.sessionDate)} at {formatCardTime(booking.startTime)}
//                     </span>
//                     {booking.durationMinutes && (
//                       <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> {booking.durationMinutes} minutes
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="hidden lg:block w-px bg-slate-100 self-stretch" />

//                 {/* ── Right Column: Available Slots OR Confirm ── */}
//                 <div className="flex-1 min-w-0">
//                   {step === "slots" && (
//                     <>
//                       <div className="mb-5">
//                         <h3 className="text-base font-bold text-slate-900 mb-1">
//                           Available Time Slots
//                         </h3>
//                         <p className="text-xs text-slate-500">
//                           Pick a slot that works for you — these are the mentor's open windows
//                         </p>
//                       </div>

//                       {slotsLoading && (
//                         <div className="flex flex-col items-center justify-center py-12">
//                           <div className="w-9 h-9 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin mb-3" />
//                           <p className="text-sm text-slate-500 font-medium">Fetching available slots...</p>
//                         </div>
//                       )}

//                       {slotsError && (
//                         <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-center">
//                           <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
//                           <p className="text-red-700 font-semibold text-sm">Could not load slots</p>
//                           <p className="text-red-500 text-xs mt-1">Please try again later</p>
//                         </div>
//                       )}

//                       {!slotsLoading && !slotsError && sortedSlots.length === 0 && (
//                         <div className="text-center py-12">
//                           <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-3" />
//                           <p className="text-slate-500 font-semibold text-sm">No slots available</p>
//                           <p className="text-slate-400 text-xs mt-1">The mentor has no open slots right now</p>
//                         </div>
//                       )}

//                       {!slotsLoading && !slotsError && sortedSlots.length > 0 && (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                           {sortedSlots.map((slot, idx) => {
//                             const dc = DAY_COLORS[slot.day] || DAY_COLORS.Mon;
//                             return (
//                               <button key={`${slot.day}-${idx}`}
//                                 onClick={() => handleSlotSelect(slot)}
//                                 className={`group relative text-left rounded-xl border-2 p-4 transition-all duration-200
//                                   hover:shadow-lg hover:-translate-y-0.5
//                                   ${dc.border} hover:border-blue-400 bg-white`}
//                               >
//                                 {/* Day badge */}
//                                 <div className="flex items-center justify-between mb-3">
//                                   <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg ${dc.bg}`}>
//                                     <div className="w-2 h-2 rounded-full" style={{ background: dc.accent }} />
//                                     <span className={`text-xs font-bold ${dc.text}`}>
//                                       {DAY_FULL[slot.day] || slot.day}
//                                     </span>
//                                   </div>
//                                   <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
//                                 </div>

//                                 {/* Time range */}
//                                 <div className="flex items-center gap-2 mb-2">
//                                   <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
//                                   <span className="text-sm font-bold text-slate-800">
//                                     {to12h(slot.from)} — {to12h(slot.to)}
//                                   </span>
//                                 </div>

//                                 {/* Duration */}
//                                 <div className="flex items-center gap-2">
//                                   <Zap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
//                                   <span className="text-[11px] text-slate-500 font-medium">
//                                     {slotHours(slot.from, slot.to)} availability window
//                                   </span>
//                                 </div>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {step === "confirm" && selectedSlot && (
//                     <div>
//                       <div className="flex flex-col items-center text-center mb-6">
//                         <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3 border border-emerald-200">
//                           <CalendarCheck className="w-7 h-7 text-emerald-600" />
//                         </div>
//                         <h3 className="text-lg font-bold text-slate-900 mb-1">Confirm Your Reschedule</h3>
//                         <p className="text-sm text-slate-500">Review the changes below before confirming</p>
//                       </div>

//                       {/* Old → New comparison */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
//                         <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
//                           <div className="flex items-center gap-2 mb-3">
//                             <X className="w-3.5 h-3.5 text-red-400" />
//                             <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
//                               Current Session
//                             </p>
//                           </div>
//                           <p className="text-sm font-bold text-slate-700 mb-1">
//                             {formatCardDate(booking.sessionDate)}
//                           </p>
//                           <p className="text-xs text-slate-500">
//                             {formatCardTime(booking.startTime)} · {booking.durationMinutes} min
//                           </p>
//                         </div>

//                         <div className="rounded-xl p-4 border-2 border-emerald-200"
//                           style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)" }}>
//                           <div className="flex items-center gap-2 mb-3">
//                             <Check className="w-3.5 h-3.5 text-emerald-600" />
//                             <p className="text-[10px] font-bold tracking-wider uppercase text-emerald-600">
//                               New Slot
//                             </p>
//                           </div>
//                           <p className="text-sm font-bold text-emerald-900 mb-1">
//                             {DAY_FULL[selectedSlot.day] || selectedSlot.day}
//                           </p>
//                           <p className="text-xs text-emerald-700">
//                             {to12h(selectedSlot.from)} — {to12h(selectedSlot.to)}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
//                         <div className="flex gap-2.5">
//                           <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
//                           <div>
//                             <p className="text-xs font-semibold text-amber-800 mb-0.5">Please note</p>
//                             <p className="text-[11px] text-amber-700 leading-relaxed">
//                               Your current session slot will be released and the new day slot will be reserved. You'll receive updated calendar invites via email.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           {step === "confirm" && selectedSlot && (
//             <div className="flex-shrink-0 border-t border-slate-100 px-5 sm:px-6 py-4 bg-slate-50/80 rounded-b-2xl flex items-center justify-between">
//               <button onClick={() => setStep("slots")}
//                 className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
//                 ← Choose Different Slot
//               </button>
//               <button onClick={handleConfirm}
//                 disabled={isRescheduling}
//                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-bold text-sm transition-all
//                   disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20">
//                 {isRescheduling ? (
//                   <><Loader2 className="w-4 h-4 animate-spin" />Rescheduling...</>
//                 ) : (
//                   <><Check className="w-4 h-4" />Confirm & Reschedule</>
//                 )}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// /* ═══════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════ */
// const MenteeBookingssessions = () => {
//   const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
//   const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
//   const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [panelView, setPanelView] = useState("details");
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
//   const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
//   const [cancelReason, setCancelReason] = useState("");

//   const bookings = data?.data || [];

//   /* ── Panel controls ── */
//   const openPanel = (booking, view = "details") => {
//     if (view === "reschedule") {
//       setRescheduleBookingTarget(booking);
//       setRescheduleModalOpen(true);
//       return;
//     }
//     setSelectedBooking(booking);
//     setPanelView(view);
//     setPanelOpen(true);
//   };

//   const closePanel = () => {
//     setPanelOpen(false);
//     setTimeout(() => {
//       setSelectedBooking(null);
//       setPanelView("details");
//       setCancelReason("");
//     }, 300);
//   };

//   const closeRescheduleModal = () => {
//     setRescheduleModalOpen(false);
//     setTimeout(() => { setRescheduleBookingTarget(null); }, 300);
//   };

//   useEffect(() => {
//     document.body.style.overflow = rescheduleModalOpen || panelOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [panelOpen, rescheduleModalOpen]);

//   /* ── Status config ── */
//   const STATUS = {
//     confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", label: "Confirmed", gradient: "linear-gradient(90deg, #10b981, #34d399)" },
//     pending:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-500",   label: "Pending",   gradient: "linear-gradient(90deg, #f59e0b, #fbbf24)" },
//     cancelled: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",     dot: "bg-red-500",     label: "Cancelled", gradient: "linear-gradient(90deg, #ef4444, #f87171)" },
//     completed: { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200",     dot: "bg-sky-500",     label: "Completed", gradient: "linear-gradient(90deg, #0ea5e9, #38bdf8)" },
//     unattended:{ bg: "bg-orange-50",  text: "text-orange-600",  border: "border-orange-200",  dot: "bg-orange-500",  label: "Unattended",gradient: "linear-gradient(90deg, #f97316, #fb923c)" },
//   };

//   const getStatusBadge = (status) => {
//     const c = STATUS[status] || STATUS.pending;
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${c.bg} ${c.text} border ${c.border}`}>
//         <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
//         {c.label}
//       </span>
//     );
//   };

//   /* ── Formatters ── */
//   const formatDate = (d) =>
//     new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
//   const formatCardDate = (d) =>
//     new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
//   const formatCardTime = (timeStr) => {
//     if (!timeStr) return "";
//     return timeStr.split("-")[0].trim();
//   };
//   const formatDateTime = (d) =>
//     new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
//   const formatShortDate = (d) => {
//     const date = new Date(d);
//     const day = date.getDate();
//     const month = date.toLocaleString("en-US", { month: "short" });
//     return { day, month };
//   };

//   /* ── Mentor helpers ── */
//   const getMentorName = (b) =>
//     typeof b.mentorId === "object" ? b.mentorId?.fullName || b.menteeName || "Mentor" : b.menteeName || "Mentor";
//   const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
//   const getMentorRole = (b) =>
//     typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
//   const getMentorCompany = (b) =>
//     typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
//   const getMentorSubtitle = (b) => {
//     const role = getMentorRole(b);
//     const company = getMentorCompany(b);
//     if (company && role) return `${company} · ${role}`;
//     return company || role || "";
//   };

//   /* ── Actions ── */
//   const handleCancelBooking = async () => {
//     if (!cancelReason.trim()) { alert("Please provide a reason for cancellation"); return; }
//     try {
//       await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
//       alert(selectedBooking.isFreeSession ? "Booking cancelled. Your free session has been restored!" : "Booking cancelled successfully!");
//       closePanel();
//     } catch (err) {
//       alert("Failed to cancel: " + (err?.data?.message || "Please try again"));
//     }
//   };

//   const handleRescheduleBooking = async ({ bookingId, bookedMeetingSlot }) => {
//     try {
//       await rescheduleBooking({ bookingId, bookedMeetingSlot }).unwrap();
//       alert("Booking rescheduled successfully!");
//       closeRescheduleModal();
//       closePanel();
//     } catch (err) {
//       alert("Failed to reschedule: " + (err?.data?.message || "Please try again"));
//     }
//   };

//   /* ══════════════════════════════════════════════════════════════
//      RENDER
//   ══════════════════════════════════════════════════════════════ */
//   return (
//     <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
//       {/* Accent strip */}
//       <div className="h-1" style={{ background: "linear-gradient(90deg, #1e3a5f, #1e40af, #3b82f6, #1e40af, #1e3a5f)" }} />

//       <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl mx-auto">
//         {/* ── Header ── */}
//         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <div className="w-9 h-9 rounded-xl flex items-center justify-center"
//                 style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}>
//                 <CalendarDays className="w-5 h-5 text-white" />
//               </div>
//               <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
//                 My Bookings
//               </h1>
//             </div>
//             <p className="text-sm text-slate-500 mt-1 ml-12">
//               Manage your upcoming and past mentorship sessions
//             </p>
//           </div>
//           {bookings.length > 0 && (
//             <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm self-start sm:self-auto">
//               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
//               <span className="text-xs font-bold text-slate-600">
//                 {bookings.length} Session{bookings.length !== 1 ? "s" : ""} Total
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Loading */}
//         {isLoading && (
//           <div className="flex items-center justify-center py-20"><Loader /></div>
//         )}

//         {/* Error */}
//         {isError && (
//           <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
//             <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4 border border-red-100">
//               <XCircle className="w-7 h-7 text-red-500" />
//             </div>
//             <p className="text-red-800 font-bold text-lg mb-1">Failed to load bookings</p>
//             <p className="text-red-500 text-sm">{error?.data?.message || "Please try again later"}</p>
//           </div>
//         )}

//         {/* ══ BOOKING CARDS — 3 per row ══ */}
//         {!isLoading && !isError && (
//           <>
//             {bookings.length === 0 ? (
//               <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
//                 <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
//                   style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
//                   <Calendar className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <p className="text-slate-800 text-xl font-bold mb-2">No bookings yet</p>
//                 <p className="text-slate-400 text-sm max-w-sm mx-auto">
//                   Book your first mentorship session to get started on your learning journey.
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
//                 {bookings.map((booking) => {
//                   const cancellable = booking.status === "confirmed" || booking.status === "pending";
//                   const sc = STATUS[booking.status] || STATUS.pending;
//                   const dateObj = formatShortDate(booking.sessionDate);

//                   return (
//                     <div key={booking._id}
//                       className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden
//                         hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:border-slate-300 hover:-translate-y-0.5
//                         flex flex-col">

//                       {/* Status bar */}
//                       <div className="h-[3px]" style={{ background: sc.gradient, opacity: 0.7 }} />

//                       <div className="p-4 sm:p-5 flex flex-col flex-1">
//                         {/* ── Top: Mentor + Status ── */}
//                         <div className="flex items-start gap-3 mb-3">
//                           <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
//                             style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)" }}>
//                             <span className="text-xs font-bold text-white">{getMentorInitials(booking)}</span>
//                           </div>
//                           <div className="min-w-0 flex-1">
//                             <h3 className="text-sm font-bold text-slate-900 truncate leading-tight">
//                               {getMentorName(booking)}
//                             </h3>
//                             {getMentorSubtitle(booking) ? (
//                               <p className="text-[11px] text-slate-500 truncate mt-0.5">
//                                 {getMentorSubtitle(booking)}
//                               </p>
//                             ) : (
//                               <p className="text-[11px] text-slate-400 mt-0.5">Mentor</p>
//                             )}
//                           </div>
//                           {getStatusBadge(booking.status)}
//                         </div>

//                         {/* ── Session info block ── */}
//                         <div className="bg-slate-50/80 rounded-xl p-3.5 mb-3 border border-slate-100 flex-1">
//                           <div className="flex gap-3">
//                             {/* Date box */}
//                             <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
//                               <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 leading-none">
//                                 {dateObj.month}
//                               </span>
//                               <span className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">
//                                 {dateObj.day}
//                               </span>
//                             </div>

//                             <div className="min-w-0 flex-1">
//                               {/* Time */}
//                               <div className="flex items-center gap-1.5 mb-1.5">
//                                 <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
//                                 <span className="text-sm font-bold text-slate-800">
//                                   {formatCardTime(booking.startTime)}
//                                 </span>
//                                 <span className="text-[11px] text-slate-400 font-medium">
//                                   · {booking.durationMinutes} min
//                                 </span>
//                               </div>

//                               {/* Session type */}
//                               {booking.sessionType && (
//                                 <div className="flex items-center gap-1.5 mb-1">
//                                   <Tag className="w-3 h-3 text-violet-400 flex-shrink-0" />
//                                   <span className="text-[11px] font-semibold text-slate-600 truncate">
//                                     {booking.sessionType}
//                                   </span>
//                                 </div>
//                               )}

//                               {/* Topic */}
//                               {booking.topic && (
//                                 <div className="flex items-center gap-1.5">
//                                   <FileText className="w-3 h-3 text-amber-400 flex-shrink-0" />
//                                   <span className="text-[11px] text-slate-500 truncate">
//                                     {booking.topic}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         {/* ── Bottom: Price + Actions ── */}
//                         <div className="flex items-center gap-2 mb-3">
//                           {/* Price */}
//                           {(booking.amountPaid || booking.price) && (
//                             <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1">
//                               <DollarSign className="w-3 h-3" />
//                               ₹{booking.amountPaid || booking.price}
//                             </span>
//                           )}

//                           {/* Free badge */}
//                           {booking.isFreeSession && (
//                             <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1">
//                               <Zap className="w-3 h-3" /> FREE
//                             </span>
//                           )}

//                           <div className="flex-1" />

//                           {/* Meeting link */}
//                           {booking.meetingLink && (
//                             <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer"
//                               className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-200 rounded-lg px-2 py-1 hover:bg-sky-100 transition-colors">
//                               <Video className="w-3 h-3" /> Join
//                             </a>
//                           )}

//                           {/* View details */}
//                           <button onClick={() => openPanel(booking, "details")}
//                             className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 rounded-lg px-2 py-1 hover:bg-slate-50 hover:border-slate-300 transition-colors">
//                             <Eye className="w-3 h-3" /> Details
//                           </button>
//                         </div>

//                         {/* ── Action buttons ── */}
//                         {cancellable && (
//                           <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
//                             <button onClick={() => openPanel(booking, "reschedule")}
//                               className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2.5 hover:bg-slate-50 hover:border-slate-300 transition-all">
//                               <RefreshCw className="w-3.5 h-3.5" /> Reschedule
//                             </button>
//                             <button onClick={() => openPanel(booking, "cancel")}
//                               className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 hover:bg-red-100 hover:border-red-300 transition-all">
//                               <X className="w-3.5 h-3.5" /> Cancel
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* ══ RESCHEDULE MODAL ══ */}
//       <RescheduleModal
//         booking={rescheduleBookingTarget}
//         isOpen={rescheduleModalOpen}
//         onClose={closeRescheduleModal}
//         onConfirm={handleRescheduleBooking}
//         isRescheduling={isRescheduling}
//         getMentorName={getMentorName}
//         getMentorInitials={getMentorInitials}
//         formatCardDate={formatCardDate}
//         formatCardTime={formatCardTime}
//       />

//       {/* ══ BACKDROP for slide panel ══ */}
//       <div onClick={closePanel}
//         className={`fixed inset-0 z-40 transition-all duration-300
//           ${panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
//         style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
//       />

//       {/* ══ SLIDE-IN PANEL (details & cancel) ══ */}
//       <div
//         className={`fixed top-0 right-0 h-full z-50 bg-white
//           w-full sm:w-[440px] md:w-[500px] lg:w-[540px]
//           transform transition-transform duration-300 ease-in-out
//           ${panelOpen ? "translate-x-0" : "translate-x-full"}
//           flex flex-col`}
//         style={{ boxShadow: panelOpen ? "-20px 0 60px -12px rgba(0,0,0,0.15)" : "none" }}
//       >
//         {selectedBooking && (
//           <>
//             {/* ──── DETAILS VIEW ──── */}
//             {panelView === "details" && (
//               <>
//                 {/* Header */}
//                 <div className="relative p-5 sm:p-6 flex-shrink-0"
//                   style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)" }}>
//                   <button onClick={closePanel}
//                     className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
//                     <X className="w-4 h-4 text-white/80" />
//                   </button>

//                   <div className="flex items-center gap-3 sm:gap-4 mb-4">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
//                       style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))", border: "1px solid rgba(255,255,255,0.15)" }}>
//                       <span className="text-base sm:text-lg font-bold text-white">{getMentorInitials(selectedBooking)}</span>
//                     </div>
//                     <div className="min-w-0">
//                       <h2 className="text-lg sm:text-xl font-bold text-white truncate">{getMentorName(selectedBooking)}</h2>
//                       <p className="text-white/50 text-xs sm:text-sm truncate">{getMentorSubtitle(selectedBooking)}</p>
//                     </div>
//                   </div>
//                   {getStatusBadge(selectedBooking.status)}
//                 </div>

//                 {/* Body */}
//                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
//                   {/* Session Details */}
//                   <div className="mb-6">
//                     <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">Session Details</p>
//                     <div className="space-y-4">
//                       {[
//                         { Icon: Calendar, label: "Date", value: formatDate(selectedBooking.sessionDate), color: "text-blue-600", bg: "bg-blue-50" },
//                         { Icon: Clock, label: "Time", value: `${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min`, color: "text-violet-600", bg: "bg-violet-50" },
//                         { Icon: Tag, label: "Session Type", value: selectedBooking.sessionType, color: "text-emerald-600", bg: "bg-emerald-50" },
//                         { Icon: FileText, label: "Topic", value: selectedBooking.topic, color: "text-amber-600", bg: "bg-amber-50" },
//                       ].map(({ Icon, label, value, color, bg }) => (
//                         <div key={label} className="flex items-start gap-3">
//                           <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
//                             <Icon className={`w-4 h-4 ${color}`} />
//                           </div>
//                           <div>
//                             <p className="text-[11px] text-slate-400 font-medium mb-0.5">{label}</p>
//                             <p className="text-sm font-semibold text-slate-800">{value || "—"}</p>
//                           </div>
//                         </div>
//                       ))}
//                       {selectedBooking.meetingLink && (
//                         <div className="flex items-start gap-3">
//                           <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
//                             <Video className="w-4 h-4 text-sky-600" />
//                           </div>
//                           <div>
//                             <p className="text-[11px] text-slate-400 font-medium mb-1">Meeting Link</p>
//                             <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
//                               className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline break-all">
//                               Join Meeting →
//                             </a>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Payment & Contact */}
//                   <div className="mb-6">
//                     <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">Payment & Contact</p>
//                     <div className="space-y-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <DollarSign className="w-4 h-4 text-emerald-600" />
//                         </div>
//                         <div>
//                           <p className="text-[11px] text-slate-400 font-medium mb-0.5">Amount Paid</p>
//                           <p className="text-xl font-extrabold text-slate-900">₹{selectedBooking.amountPaid || selectedBooking.price}</p>
//                           <p className="text-[11px] text-slate-400 mt-0.5">via {selectedBooking.paymentMethod?.toUpperCase() || "N/A"}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <Mail className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div className="min-w-0">
//                           <p className="text-[11px] text-slate-400 font-medium mb-0.5">Email</p>
//                           <p className="text-sm text-slate-800 break-all">{selectedBooking.menteeEmail || "—"}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <Phone className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-[11px] text-slate-400 font-medium mb-0.5">Phone</p>
//                           <p className="text-sm text-slate-800">{selectedBooking.phoneNumber || "—"}</p>
//                         </div>
//                       </div>
//                       {selectedBooking.transactionId && (
//                         <div className="flex items-start gap-3">
//                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//                             <Hash className="w-4 h-4 text-slate-500" />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-[11px] text-slate-400 font-medium mb-1">Transaction ID</p>
//                             <p className="text-xs font-mono text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg break-all border border-slate-100">
//                               {selectedBooking.transactionId}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                       <div className="pt-3 border-t border-slate-100">
//                         <p className="text-[11px] text-slate-400 font-medium mb-2">Booking Information</p>
//                         <div className="space-y-1 text-xs text-slate-500">
//                           <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
//                           {selectedBooking.confirmedAt && <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>}
//                           <p className="font-mono text-[11px] text-slate-400">ID: {selectedBooking._id}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
//                   <div className="flex-shrink-0 p-4 sm:p-5"
//                     style={{ borderTop: "1px solid #f1f5f9", background: "linear-gradient(to top, #f8fafc, white)" }}>
//                     <div className="flex flex-col gap-2.5">
//                       {selectedBooking.meetingLink && (
//                         <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
//                           className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-blue-600/20"
//                           style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}>
//                           <Video className="w-4 h-4" /> Join Meeting
//                         </a>
//                       )}
//                       <div className="grid grid-cols-2 gap-2.5">
//                         <button
//                           onClick={() => {
//                             closePanel();
//                             setTimeout(() => openPanel(selectedBooking, "reschedule"), 310);
//                           }}
//                           className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
//                           <RefreshCw className="w-4 h-4" /> Reschedule
//                         </button>
//                         <button onClick={() => setPanelView("cancel")}
//                           className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-100 hover:border-red-300 transition-all">
//                           <Trash2 className="w-4 h-4" /> Cancel
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* ──── CANCEL VIEW ──── */}
//             {panelView === "cancel" && (
//               <>
//                 <div className="flex items-center gap-3 p-5 border-b border-slate-100 flex-shrink-0">
//                   <button onClick={() => setPanelView("details")} className="text-slate-400 hover:text-slate-600 transition-colors">
//                     <ArrowLeft className="w-5 h-5" />
//                   </button>
//                   <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
//                     <AlertTriangle className="w-5 h-5 text-red-500" />
//                   </div>
//                   <h2 className="text-lg font-bold text-slate-900">Cancel Booking</h2>
//                   <button onClick={closePanel} className="ml-auto text-slate-400 hover:text-slate-600">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-5 sm:p-6">
//                   <div className="rounded-xl p-4 mb-5" style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", border: "1px solid #e2e8f0" }}>
//                     <p className="text-sm font-bold text-slate-800">{getMentorName(selectedBooking)}</p>
//                     <p className="text-xs text-slate-500 mt-1.5">
//                       {formatCardDate(selectedBooking.sessionDate)} · {formatCardTime(selectedBooking.startTime)} · {selectedBooking.durationMinutes} min
//                     </p>
//                     {selectedBooking.isFreeSession && (
//                       <p className="mt-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg px-2.5 py-1.5 inline-block border border-emerald-200">
//                         ✓ Your free session will be restored
//                       </p>
//                     )}
//                   </div>

//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Reason for cancellation <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={cancelReason}
//                     onChange={(e) => setCancelReason(e.target.value)}
//                     placeholder="Please let us know why you're cancelling..."
//                     rows="5"
//                     className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 resize-none bg-white transition-all placeholder:text-slate-400"
//                   />
//                 </div>

//                 <div className="flex-shrink-0 p-4 sm:p-5"
//                   style={{ borderTop: "1px solid #f1f5f9", background: "linear-gradient(to top, #f8fafc, white)" }}>
//                   <div className="flex gap-3">
//                     <button onClick={() => { setPanelView("details"); setCancelReason(""); }}
//                       className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-all">
//                       Keep Booking
//                     </button>
//                     <button onClick={handleCancelBooking} disabled={isCancelling}
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/20">
//                       {isCancelling ? "Cancelling..." : "Yes, Cancel"}
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenteeBookingssessions;


import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  Video,
  DollarSign,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  RefreshCw,
  X,
  Tag,
  FileText,
  Eye,
  Trash2,
  AlertTriangle,
  ArrowLeft,
  Hash,
  ChevronLeft,
  ChevronRight,
  Globe,
  User,
  Check,
  Loader2,
  ExternalLink,
  Zap,
  ArrowRight,
  MessageCircle,
  CreditCard,
  CalendarCheck,
  CalendarDays,
} from "lucide-react";
import {
  useGetMenteeBookingsQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
  useGetRescheduleSlotsQuery,
} from "./Bookingsecapislice";
import Loader from "../../../../global/Loader";

/* ═══════════════════════════════════════════════════
   CONSTANTS & HELPERS
═══════════════════════════════════════════════════ */
const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const to12h = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
};

const slotDuration = (startTime, endTime) => {
  const [fh, fm] = startTime.split(":").map(Number);
  const [th, tm] = endTime.split(":").map(Number);
  return (th * 60 + tm) - (fh * 60 + fm);
};

const formatSlotDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
};

const getSlotDayName = (dateStr) => {
  const d = new Date(dateStr);
  return DAY_NAMES_FULL[d.getDay()];
};

const getSlotDayShort = (dateStr) => {
  const d = new Date(dateStr);
  return DAY_NAMES_SHORT[d.getDay()];
};

const getSlotDateParts = (dateStr) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-US", { month: "short" }),
    weekday: DAY_NAMES_SHORT[d.getDay()],
  };
};

const DAY_COLORS = {
  Sun: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", accent: "#f97316" },
  Mon: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", accent: "#3b82f6" },
  Tue: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", accent: "#8b5cf6" },
  Wed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", accent: "#10b981" },
  Thu: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", accent: "#f59e0b" },
  Fri: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", accent: "#f43f5e" },
  Sat: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", accent: "#06b6d4" },
};

/* ═══════════════════════════════════════════════════
   MINI CALENDAR (from original)
═══════════════════════════════════════════════════ */
const MiniCalendar = ({ selectedDate, onSelect, minDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const canGoPrev = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  const isDisabled = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const min = minDate ? new Date(minDate) : today;
    min.setHours(0, 0, 0, 0);
    return d < min;
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    const s = new Date(selectedDate);
    return d.toDateString() === s.toDateString();
  };

  const isToday = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    return d.toDateString() === today.toDateString();
  };

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">
          {monthNames[viewMonth]} {viewYear}
        </h3>
        <div className="flex items-center gap-0.5">
          <button onClick={prevMonth} disabled={!canGoPrev}
            className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
          </button>
          <button onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-1.5">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[9px] font-bold text-slate-400 py-1 tracking-wider">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {blanks.map((b) => <div key={`b-${b}`} />)}
        {days.map((day) => {
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const todayMark = isToday(day);
          return (
            <button key={day}
              onClick={() => {
                if (!disabled) {
                  const d = new Date(viewYear, viewMonth, day);
                  onSelect(d.toISOString().split("T")[0]);
                }
              }}
              disabled={disabled}
              className={`
                relative w-8 h-8 mx-auto rounded-lg text-xs font-semibold transition-all
                ${disabled ? "text-slate-300 cursor-not-allowed" : "cursor-pointer hover:bg-blue-50"}
                ${selected ? "bg-[#1e40af] text-white hover:bg-[#1e40af] shadow-md shadow-blue-600/25" : "text-slate-600"}
                ${todayMark && !selected ? "ring-1.5 ring-blue-400 text-blue-600 font-bold" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-400 mt-3 font-medium">
        Today: {today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   TIME SLOT PICKER (from original)
═══════════════════════════════════════════════════ */
const TimeSlotPicker = ({ selectedTime, onSelect, duration }) => {
  const slots = useMemo(() => {
    const s = [];
    for (let h = 8; h <= 21; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const ampm = h >= 12 ? "PM" : "AM";
        const label = `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
        const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        s.push({ label, value });
      }
    }
    return s;
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-600">{duration || 30} mins</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[10px] text-slate-500 font-medium">
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
        {slots.map((slot) => (
          <button key={slot.value} onClick={() => onSelect(slot.value)}
            className={`
              w-full py-2 px-3 rounded-lg border text-xs font-semibold transition-all
              ${selectedTime === slot.value
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"
              }
            `}
          >
            {slot.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   RESCHEDULE MODAL — Original layout style
   + Available slots from API shown as cards
═══════════════════════════════════════════════════ */
const RescheduleModal = ({
  booking,
  isOpen,
  onClose,
  onConfirm,
  isRescheduling,
  getMentorName,
  getMentorInitials,
  formatCardDate,
  formatCardTime,
}) => {
  // Extract mentorId — could be an object or a string
  const mentorId =
    typeof booking?.mentorId === "object"
      ? booking?.mentorId?._id || booking?.mentorId?.id
      : booking?.mentorId;

  const { data: slotsData, isLoading: slotsLoading, isError: slotsError } =
    useGetRescheduleSlotsQuery(
      { mentorId },
      { skip: !isOpen || !mentorId }
    );

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState("slots"); // "slots" | "confirm"

  // Extract slots: data[0].dayslots array — filter out booked ones, sort by date
  const rawSlots = slotsData?.data?.[0]?.dayslots || [];
  const availableSlots = rawSlots
    .filter((slot) => !slot.isBooked)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    if (isOpen && booking) {
      setSelectedSlot(null);
      setStep("slots");
    }
  }, [isOpen, booking]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!booking) return null;

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep("confirm");
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    // Send the slot payload directly as it comes from the API
    onConfirm({
      bookingId: booking._id,
      bookedMeetingSlot: selectedSlot,
    });
  };

  const formatRescheduleDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ backdropFilter: "blur(6px)" }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        <div className={`
          bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col
          pointer-events-auto transition-all duration-300
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
        `}>
          {/* Modal Header */}
          <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-slate-100 flex-shrink-0">
            {step === "confirm" ? (
              <button onClick={() => setStep("slots")}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />Back to Slots
              </button>
            ) : (
              <button onClick={onClose}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />Back
              </button>
            )}
            <div className="flex-1" />
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* ── Left Column: Mentor info + current schedule ── */}
                <div className="lg:w-60 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}>
                    <span className="text-sm font-bold text-white">{getMentorInitials(booking)}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight mb-4">
                    Reschedule your{" "}
                    <span className="text-blue-600">{booking.sessionType || "1:1"} Session</span>
                    {" "}with {getMentorName(booking)}
                  </h2>

                  {/* Current schedule card */}
                  <div className="rounded-xl p-4"
                    style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", border: "1px solid #e2e8f0" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Current Schedule
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-1">
                      {booking.sessionType || "1:1"} Session
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {formatRescheduleDate(booking.sessionDate)} at {formatCardTime(booking.startTime)}
                    </span>
                    {booking.durationMinutes && (
                      <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {booking.durationMinutes} minutes
                      </p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-slate-100 self-stretch" />

                {/* ── Right Column: Available Slots OR Confirm ── */}
                <div className="flex-1 min-w-0">
                  {step === "slots" && (
                    <>
                      <div className="mb-5">
                        <h3 className="text-base font-bold text-slate-900 mb-1">
                          Available Time Slots
                        </h3>
                        <p className="text-xs text-slate-500">
                          Pick a slot that works for you — these are the mentor's open windows
                        </p>
                      </div>

                      {slotsLoading && (
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="w-9 h-9 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin mb-3" />
                          <p className="text-sm text-slate-500 font-medium">Fetching available slots...</p>
                        </div>
                      )}

                      {slotsError && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-center">
                          <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                          <p className="text-red-700 font-semibold text-sm">Could not load slots</p>
                          <p className="text-red-500 text-xs mt-1">Please try again later</p>
                        </div>
                      )}

                      {!slotsLoading && !slotsError && availableSlots.length === 0 && (
                        <div className="text-center py-12">
                          <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 font-semibold text-sm">No slots available</p>
                          <p className="text-slate-400 text-xs mt-1">The mentor has no open slots right now</p>
                        </div>
                      )}

                      {!slotsLoading && !slotsError && availableSlots.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {availableSlots.map((slot, idx) => {
                            const dateParts = getSlotDateParts(slot.date);
                            const dc = DAY_COLORS[dateParts.weekday] || DAY_COLORS.Mon;
                            const mins = slotDuration(slot.startTime, slot.endTime);
                            return (
                              <button key={slot._id || `${slot.date}-${idx}`}
                                onClick={() => handleSlotSelect(slot)}
                                className={`group relative text-left rounded-xl border-2 p-4 transition-all duration-200
                                  hover:shadow-lg hover:-translate-y-0.5
                                  ${dc.border} hover:border-blue-400 bg-white`}
                              >
                                <div className="flex items-start gap-3">
                                  {/* Date box */}
                                  <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${dc.bg}`}>
                                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-70" style={{ color: dc.accent }}>
                                      {dateParts.month}
                                    </span>
                                    <span className="text-xl font-extrabold leading-none -mt-0.5" style={{ color: dc.accent }}>
                                      {dateParts.day}
                                    </span>
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    {/* Day name + arrow */}
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className={`text-sm font-bold ${dc.text}`}>
                                        {getSlotDayName(slot.date)}
                                      </span>
                                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                                    </div>

                                    {/* Time range */}
                                    <div className="flex items-center gap-2 mb-1">
                                      <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                      <span className="text-sm font-bold text-slate-800">
                                        {to12h(slot.startTime)} — {to12h(slot.endTime)}
                                      </span>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center gap-2">
                                      <Zap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                      <span className="text-[11px] text-slate-500 font-medium">
                                        {mins} min session
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}

                  {step === "confirm" && selectedSlot && (
                    <div>
                      <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3 border border-emerald-200">
                          <CalendarCheck className="w-7 h-7 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Confirm Your Reschedule</h3>
                        <p className="text-sm text-slate-500">Review the changes below before confirming</p>
                      </div>

                      {/* Old → New comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <X className="w-3.5 h-3.5 text-red-400" />
                            <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                              Current Session
                            </p>
                          </div>
                          <p className="text-sm font-bold text-slate-700 mb-1">
                            {formatCardDate(booking.sessionDate)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatCardTime(booking.startTime)} · {booking.durationMinutes} min
                          </p>
                        </div>

                        <div className="rounded-xl p-4 border-2 border-emerald-200"
                          style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)" }}>
                          <div className="flex items-center gap-2 mb-3">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <p className="text-[10px] font-bold tracking-wider uppercase text-emerald-600">
                              New Slot
                            </p>
                          </div>
                          <p className="text-sm font-bold text-emerald-900 mb-1">
                            {formatSlotDate(selectedSlot.date)}
                          </p>
                          <p className="text-xs text-emerald-700">
                            {to12h(selectedSlot.startTime)} — {to12h(selectedSlot.endTime)} · {slotDuration(selectedSlot.startTime, selectedSlot.endTime)} min
                          </p>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                        <div className="flex gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-amber-800 mb-0.5">Please note</p>
                            <p className="text-[11px] text-amber-700 leading-relaxed">
                              Your current session slot will be released and the new day slot will be reserved. You'll receive updated calendar invites via email.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          {step === "confirm" && selectedSlot && (
            <div className="flex-shrink-0 border-t border-slate-100 px-5 sm:px-6 py-4 bg-slate-50/80 rounded-b-2xl flex items-center justify-between">
              <button onClick={() => setStep("slots")}
                className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                ← Choose Different Slot
              </button>
              <button onClick={handleConfirm}
                disabled={isRescheduling}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-bold text-sm transition-all
                  disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20">
                {isRescheduling ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Rescheduling...</>
                ) : (
                  <><Check className="w-4 h-4" />Confirm & Reschedule</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
const MenteeBookingssessions = () => {
  const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [panelView, setPanelView] = useState("details");
  const [panelOpen, setPanelOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const bookings = data?.data || [];

  /* ── Panel controls ── */
  const openPanel = (booking, view = "details") => {
    if (view === "reschedule") {
      setRescheduleBookingTarget(booking);
      setRescheduleModalOpen(true);
      return;
    }
    setSelectedBooking(booking);
    setPanelView(view);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setTimeout(() => {
      setSelectedBooking(null);
      setPanelView("details");
      setCancelReason("");
    }, 300);
  };

  const closeRescheduleModal = () => {
    setRescheduleModalOpen(false);
    setTimeout(() => { setRescheduleBookingTarget(null); }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = rescheduleModalOpen || panelOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panelOpen, rescheduleModalOpen]);

  /* ── Status config ── */
  const STATUS = {
    confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", label: "Confirmed", gradient: "linear-gradient(90deg, #10b981, #34d399)" },
    pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500", label: "Pending", gradient: "linear-gradient(90deg, #f59e0b, #fbbf24)" },
    cancelled: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500", label: "Cancelled", gradient: "linear-gradient(90deg, #ef4444, #f87171)" },
    completed: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200", dot: "bg-sky-500", label: "Completed", gradient: "linear-gradient(90deg, #0ea5e9, #38bdf8)" },
    unattended: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", dot: "bg-orange-500", label: "Unattended", gradient: "linear-gradient(90deg, #f97316, #fb923c)" },
  };

  const getStatusBadge = (status) => {
    const c = STATUS[status] || STATUS.pending;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${c.bg} ${c.text} border ${c.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {c.label}
      </span>
    );
  };

  /* ── Formatters ── */
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const formatCardDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatCardTime = (timeStr) => {
    if (!timeStr) return "";
    return timeStr.split("-")[0].trim();
  };
  const formatDateTime = (d) =>
    new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const formatShortDate = (d) => {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return { day, month };
  };

  /* ── Mentor helpers ── */
  const getMentorName = (b) =>
    typeof b.mentorId === "object" ? b.mentorId?.fullName || b.menteeName || "Mentor" : b.menteeName || "Mentor";
  const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
  const getMentorRole = (b) =>
    typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
  const getMentorCompany = (b) =>
    typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
  const getMentorSubtitle = (b) => {
    const role = getMentorRole(b);
    const company = getMentorCompany(b);
    if (company && role) return `${company} · ${role}`;
    return company || role || "";
  };

  /* ── Actions ── */
  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) { alert("Please provide a reason for cancellation"); return; }
    try {
      await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
      alert(selectedBooking.isFreeSession ? "Booking cancelled. Your free session has been restored!" : "Booking cancelled successfully!");
      closePanel();
    } catch (err) {
      alert("Failed to cancel: " + (err?.data?.message || "Please try again"));
    }
  };

  const handleRescheduleBooking = async ({ bookingId, bookedMeetingSlot }) => {
    try {
      await rescheduleBooking({ bookingId, bookedMeetingSlot }).unwrap();
      alert("Booking rescheduled successfully!");
      closeRescheduleModal();
      closePanel();
    } catch (err) {
      alert("Failed to reschedule: " + (err?.data?.message || "Please try again"));
    }
  };

  /* ══════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      {/* Accent strip */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, #1e3a5f, #1e40af, #3b82f6, #1e40af, #1e3a5f)" }} />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}>
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Bookings
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1 ml-12">
              Manage your upcoming and past mentorship sessions
            </p>
          </div>
          {bookings.length > 0 && (
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm self-start sm:self-auto">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-600">
                {bookings.length} Session{bookings.length !== 1 ? "s" : ""} Total
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20"><Loader /></div>
        )}

        {/* Error */}
        {isError && (
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4 border border-red-100">
              <XCircle className="w-7 h-7 text-red-500" />
            </div>
            <p className="text-red-800 font-bold text-lg mb-1">Failed to load bookings</p>
            <p className="text-red-500 text-sm">{error?.data?.message || "Please try again later"}</p>
          </div>
        )}

        {/* ══ BOOKING CARDS — 3 per row ══ */}
        {!isLoading && !isError && (
          <>
            {bookings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-slate-800 text-xl font-bold mb-2">No bookings yet</p>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                  Book your first mentorship session to get started on your learning journey.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
                {bookings.map((booking) => {
                  const cancellable = booking.status === "confirmed" || booking.status === "pending";
                  const sc = STATUS[booking.status] || STATUS.pending;
                  const dateObj = formatShortDate(booking.sessionDate);

                  return (
                    <div key={booking._id}
                      className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden
                        hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:border-slate-300 hover:-translate-y-0.5
                        flex flex-col">

                      {/* Status bar */}
                      <div className="h-[3px]" style={{ background: sc.gradient, opacity: 0.7 }} />

                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        {/* ── Top: Mentor + Status ── */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)" }}>
                            <span className="text-xs font-bold text-white">{getMentorInitials(booking)}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-slate-900 truncate leading-tight">
                              {getMentorName(booking)}
                            </h3>
                            {getMentorSubtitle(booking) ? (
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                {getMentorSubtitle(booking)}
                              </p>
                            ) : (
                              <p className="text-[11px] text-slate-400 mt-0.5">Mentor</p>
                            )}
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        {/* ── Session info block ── */}
                        <div className="bg-slate-50/80 rounded-xl p-3.5 mb-3 border border-slate-100 flex-1">
                          <div className="flex gap-3">
                            {/* Date box */}
                            <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 leading-none">
                                {dateObj.month}
                              </span>
                              <span className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">
                                {dateObj.day}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1">
                              {/* Time */}
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                <span className="text-sm font-bold text-slate-800">
                                  {formatCardTime(booking.startTime)}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  · {booking.durationMinutes} min
                                </span>
                              </div>

                              {/* Session type */}
                              {booking.sessionType && (
                                <div className="flex items-center gap-1.5 mb-1">
                                  <Tag className="w-3 h-3 text-violet-400 flex-shrink-0" />
                                  <span className="text-[11px] font-semibold text-slate-600 truncate">
                                    {booking.sessionType}
                                  </span>
                                </div>
                              )}

                              {/* Topic */}
                              {booking.topic && (
                                <div className="flex items-center gap-1.5">
                                  <FileText className="w-3 h-3 text-amber-400 flex-shrink-0" />
                                  <span className="text-[11px] text-slate-500 truncate">
                                    {booking.topic}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ── Bottom: Price + Actions ── */}
                        <div className="flex items-center gap-2 mb-3">
                          {/* Price */}
                          {(booking.amountPaid || booking.price) && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1">
                              <DollarSign className="w-3 h-3" />
                              ₹{booking.amountPaid || booking.price}
                            </span>
                          )}

                          {/* Free badge */}
                          {booking.isFreeSession && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1">
                              <Zap className="w-3 h-3" /> FREE
                            </span>
                          )}

                          <div className="flex-1" />

                          {/* Meeting link */}
                          {booking.meetingLink && (
                            <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-200 rounded-lg px-2 py-1 hover:bg-sky-100 transition-colors">
                              <Video className="w-3 h-3" /> Join
                            </a>
                          )}

                          {/* View details */}
                          <button onClick={() => openPanel(booking, "details")}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 rounded-lg px-2 py-1 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                            <Eye className="w-3 h-3" /> Details
                          </button>
                        </div>

                        {/* ── Action buttons ── */}
                        {cancellable && (
                          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                            <button onClick={() => openPanel(booking, "reschedule")}
                              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2.5 hover:bg-slate-50 hover:border-slate-300 transition-all">
                              <RefreshCw className="w-3.5 h-3.5" /> Reschedule
                            </button>
                            <button onClick={() => openPanel(booking, "cancel")}
                              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 hover:bg-red-100 hover:border-red-300 transition-all">
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* ══ RESCHEDULE MODAL ══ */}
      <RescheduleModal
        booking={rescheduleBookingTarget}
        isOpen={rescheduleModalOpen}
        onClose={closeRescheduleModal}
        onConfirm={handleRescheduleBooking}
        isRescheduling={isRescheduling}
        getMentorName={getMentorName}
        getMentorInitials={getMentorInitials}
        formatCardDate={formatCardDate}
        formatCardTime={formatCardTime}
      />

      {/* ══ BACKDROP for slide panel ══ */}
      <div onClick={closePanel}
        className={`fixed inset-0 z-40 transition-all duration-300
          ${panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
      />

      {/* ══ SLIDE-IN PANEL (details & cancel) ══ */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-white
          w-full sm:w-[440px] md:w-[500px] lg:w-[540px]
          transform transition-transform duration-300 ease-in-out
          ${panelOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col`}
        style={{ boxShadow: panelOpen ? "-20px 0 60px -12px rgba(0,0,0,0.15)" : "none" }}
      >
        {selectedBooking && (
          <>
            {/* ──── DETAILS VIEW ──── */}
            {panelView === "details" && (
              <>
                {/* Header */}
                <div className="relative p-5 sm:p-6 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)" }}>
                  <button onClick={closePanel}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white/80" />
                  </button>

                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))", border: "1px solid rgba(255,255,255,0.15)" }}>
                      <span className="text-base sm:text-lg font-bold text-white">{getMentorInitials(selectedBooking)}</span>
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-white truncate">{getMentorName(selectedBooking)}</h2>
                      <p className="text-white/50 text-xs sm:text-sm truncate">{getMentorSubtitle(selectedBooking)}</p>
                    </div>
                  </div>
                  {getStatusBadge(selectedBooking.status)}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                  {/* Session Details */}
                  <div className="mb-6">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">Session Details</p>
                    <div className="space-y-4">
                      {[
                        { Icon: Calendar, label: "Date", value: formatDate(selectedBooking.sessionDate), color: "text-blue-600", bg: "bg-blue-50" },
                        { Icon: Clock, label: "Time", value: `${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min`, color: "text-violet-600", bg: "bg-violet-50" },
                        { Icon: Tag, label: "Session Type", value: selectedBooking.sessionType, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { Icon: FileText, label: "Topic", value: selectedBooking.topic, color: "text-amber-600", bg: "bg-amber-50" },
                      ].map(({ Icon, label, value, color, bg }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className={`w-4 h-4 ${color}`} />
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-400 font-medium mb-0.5">{label}</p>
                            <p className="text-sm font-semibold text-slate-800">{value || "—"}</p>
                          </div>
                        </div>
                      ))}
                      {selectedBooking.meetingLink && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Video className="w-4 h-4 text-sky-600" />
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-400 font-medium mb-1">Meeting Link</p>
                            <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline break-all">
                              Join Meeting →
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment & Contact */}
                  <div className="mb-6">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">Payment & Contact</p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 font-medium mb-0.5">Amount Paid</p>
                          <p className="text-xl font-extrabold text-slate-900">₹{selectedBooking.amountPaid || selectedBooking.price}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">via {selectedBooking.paymentMethod?.toUpperCase() || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] text-slate-400 font-medium mb-0.5">Email</p>
                          <p className="text-sm text-slate-800 break-all">{selectedBooking.menteeEmail || "—"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Phone className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 font-medium mb-0.5">Phone</p>
                          <p className="text-sm text-slate-800">{selectedBooking.phoneNumber || "—"}</p>
                        </div>
                      </div>
                      {selectedBooking.transactionId && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Hash className="w-4 h-4 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] text-slate-400 font-medium mb-1">Transaction ID</p>
                            <p className="text-xs font-mono text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg break-all border border-slate-100">
                              {selectedBooking.transactionId}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="pt-3 border-t border-slate-100">
                        <p className="text-[11px] text-slate-400 font-medium mb-2">Booking Information</p>
                        <div className="space-y-1 text-xs text-slate-500">
                          <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
                          {selectedBooking.confirmedAt && <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>}
                          <p className="font-mono text-[11px] text-slate-400">ID: {selectedBooking._id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
                  <div className="flex-shrink-0 p-4 sm:p-5"
                    style={{ borderTop: "1px solid #f1f5f9", background: "linear-gradient(to top, #f8fafc, white)" }}>
                    <div className="flex flex-col gap-2.5">
                      {selectedBooking.meetingLink && (
                        <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-blue-600/20"
                          style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}>
                          <Video className="w-4 h-4" /> Join Meeting
                        </a>
                      )}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => {
                            closePanel();
                            setTimeout(() => openPanel(selectedBooking, "reschedule"), 310);
                          }}
                          className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                          <RefreshCw className="w-4 h-4" /> Reschedule
                        </button>
                        <button onClick={() => setPanelView("cancel")}
                          className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-100 hover:border-red-300 transition-all">
                          <Trash2 className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ──── CANCEL VIEW ──── */}
            {panelView === "cancel" && (
              <>
                <div className="flex items-center gap-3 p-5 border-b border-slate-100 flex-shrink-0">
                  <button onClick={() => setPanelView("details")} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Cancel Booking</h2>
                  <button onClick={closePanel} className="ml-auto text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                  <div className="rounded-xl p-4 mb-5" style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", border: "1px solid #e2e8f0" }}>
                    <p className="text-sm font-bold text-slate-800">{getMentorName(selectedBooking)}</p>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {formatCardDate(selectedBooking.sessionDate)} · {formatCardTime(selectedBooking.startTime)} · {selectedBooking.durationMinutes} min
                    </p>
                    {selectedBooking.isFreeSession && (
                      <p className="mt-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg px-2.5 py-1.5 inline-block border border-emerald-200">
                        ✓ Your free session will be restored
                      </p>
                    )}
                  </div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Reason for cancellation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please let us know why you're cancelling..."
                    rows="5"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 resize-none bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="flex-shrink-0 p-4 sm:p-5"
                  style={{ borderTop: "1px solid #f1f5f9", background: "linear-gradient(to top, #f8fafc, white)" }}>
                  <div className="flex gap-3">
                    <button onClick={() => { setPanelView("details"); setCancelReason(""); }}
                      className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-all">
                      Keep Booking
                    </button>
                    <button onClick={handleCancelBooking} disabled={isCancelling}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/20">
                      {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MenteeBookingssessions;


