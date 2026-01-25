import React, { useState } from "react";
import { Calendar, Clock, Video, DollarSign, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, RefreshCw, X, ChevronRight, Tag, FileText, Eye } from "lucide-react";
import { useGetMenteeBookingsQuery, useCancelBookingMutation, useRescheduleBookingMutation } from "./bookingsessionapislice"

const MenteeBookingssessions = () => {
  // Get bookings from API
  const { data, isLoading, isError, error } = useGetMenteeBookingsQuery();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  // Get bookings from API response
  const bookings = data || [];

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle, label: "Confirmed" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: AlertCircle, label: "Pending" },
      cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle, label: "Cancelled" },
      completed: { bg: "bg-blue-100", text: "text-blue-700", icon: CheckCircle, label: "Completed" }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-semibold`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </div>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
      pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
      failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" }
    };
    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${config.bg} ${config.text} text-xs font-medium`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    try {
      await cancelBooking({
        bookingId: selectedBooking._id,
        reason: cancelReason
      }).unwrap();

      alert("Booking cancelled successfully!");
      setShowCancelModal(false);
      setShowDetailsModal(false);
      setCancelReason("");
      setSelectedBooking(null);
    } catch (error) {
      alert("Failed to cancel booking: " + (error?.data?.message || "Please try again"));
    }
  };

  const handleRescheduleBooking = async () => {
    if (!rescheduleDate || !rescheduleTime) {
      alert("Please select new date and time");
      return;
    }

    try {
      await rescheduleBooking({
        bookingId: selectedBooking._id,
        newDate: rescheduleDate,
        newTime: rescheduleTime
      }).unwrap();

      alert("Booking rescheduled successfully!");
      setShowRescheduleModal(false);
      setShowDetailsModal(false);
      setRescheduleDate("");
      setRescheduleTime("");
      setSelectedBooking(null);
    } catch (error) {
      alert("Failed to reschedule booking: " + (error?.data?.message || "Please try again"));
    }
  };

  const isUpcoming = (sessionDate) => {
    return new Date(sessionDate) > new Date();
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Manage your upcoming and past mentorship sessions
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your bookings...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-semibold mb-2">Failed to load bookings</p>
            <p className="text-red-600 text-sm">
              {error?.data?.message || "Please try again later"}
            </p>
          </div>
        )}

        {/* Bookings Grid - Small Cards */}
        {!isLoading && !isError && (
          <>
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No bookings found</p>
                <p className="text-gray-400 text-sm">Book your first session to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    {/* Card Header with Gradient */}
                    <div className="bg-[#ea580c] p-4 text-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold">
                              {booking.mentorId?.fullName?.slice(0, 2).toUpperCase() || "MN"}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-base line-clamp-1">
                              {booking.mentorId?.fullName || "Mentor"}
                            </h3>
                            <p className="text-orange-100 text-xs line-clamp-1">
                              {booking.mentorId?.currentRole}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(booking.status)}
                        {getPaymentStatusBadge(booking.paymentStatus)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">
                          {formatShortDate(booking.sessionDate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700">
                          {booking.startTime} ({booking.durationMinutes} min)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700 line-clamp-1">{booking.topic}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-900 font-bold">
                          ₹{booking.amountPaid || booking.price}
                        </span>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="w-full mt-3 flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            {/* Modal Header */}
            <div className="bg-[#ea580c] p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {selectedBooking.mentorId?.fullName?.slice(0, 2).toUpperCase() || "MN"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {selectedBooking.mentorId?.fullName || "Mentor"}
                    </h2>
                    <p className="text-orange-100">
                      {selectedBooking.mentorId?.currentRole} at {selectedBooking.mentorId?.companyName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedBooking(null);
                  }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {getStatusBadge(selectedBooking.status)}
                {getPaymentStatusBadge(selectedBooking.paymentStatus)}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Session Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
                    Session Details
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Date</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(selectedBooking.sessionDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Time</p>
                        <p className="font-semibold text-gray-900">{selectedBooking.startTime}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Duration: {selectedBooking.durationMinutes} minutes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Tag className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Session Type</p>
                        <p className="font-semibold text-gray-900">{selectedBooking.sessionType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Topic</p>
                        <p className="font-semibold text-gray-900">{selectedBooking.topic}</p>
                      </div>
                    </div>

                    {selectedBooking.description && (
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Description</p>
                          <p className="text-sm text-gray-700">{selectedBooking.description}</p>
                        </div>
                      </div>
                    )}

                    {selectedBooking.meetingLink && (
                      <div className="flex items-start gap-3">
                        <Video className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Meeting Link</p>
                          <a
                            href={selectedBooking.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#ea580c] hover:text-[#c2410c] font-medium hover:underline break-all"
                          >
                            Join Meeting →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment & Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
                    Payment & Contact
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Amount Paid</p>
                        <p className="font-bold text-gray-900 text-xl">
                          ₹{selectedBooking.amountPaid || selectedBooking.price}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          via {selectedBooking.paymentMethod?.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Email</p>
                        <p className="text-sm text-gray-900 break-all">{selectedBooking.menteeEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                        <p className="text-sm text-gray-900">{selectedBooking.phoneNumber}</p>
                      </div>
                    </div>

                    {selectedBooking.transactionId && (
                      <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-0.5">Transaction ID</p>
                          <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-2 rounded">
                            {selectedBooking.transactionId}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t">
                      <p className="text-xs text-gray-500 mb-1">Booking Information</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>Booked: {formatDateTime(selectedBooking.createdAt)}</p>
                        {selectedBooking.confirmedAt && (
                          <p>Confirmed: {formatDateTime(selectedBooking.confirmedAt)}</p>
                        )}
                        <p className="font-mono">ID: {selectedBooking._id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isUpcoming(selectedBooking.sessionDate) && selectedBooking.status === 'confirmed' && (
                <div className="border-t mt-6 pt-6">
                  <div className="flex flex-wrap gap-3">
                    {selectedBooking.meetingLink && (
                      <a
                        href={selectedBooking.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        <Video className="w-5 h-5" />
                        Join Meeting
                      </a>
                    )}

                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowRescheduleModal(true);
                      }}
                      className="flex items-center gap-2 bg-white border-2 border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Reschedule
                    </button>

                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowCancelModal(true);
                      }}
                      className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Cancel Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Cancel Booking</h2>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
                  setShowDetailsModal(true);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your session with <strong>{selectedBooking.mentorId?.fullName}</strong> on {formatDate(selectedBooking.sessionDate)}?
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for cancellation <span className="text-red-500">*</span>
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
                  setShowDetailsModal(true);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={isCancelling}
                className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCancelling ? "Cancelling..." : "Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Reschedule Booking</h2>
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                  setRescheduleDate("");
                  setRescheduleTime("");
                  setShowDetailsModal(true);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-6">
                Reschedule your session with <strong>{selectedBooking.mentorId?.fullName}</strong>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                  setRescheduleDate("");
                  setRescheduleTime("");
                  setShowDetailsModal(true);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleBooking}
                disabled={isRescheduling}
                className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRescheduling ? "Rescheduling..." : "Reschedule"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenteeBookingssessions;