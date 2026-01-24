import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, MessageSquare, Mail, Phone, Users, ChevronRight, Lock, Award, MapPin, Upload, Image as ImageIcon, Video } from "lucide-react";
import {
  useCreateBookingMutation,
  useCompleteBookingMutation
} from "./mentorsectionapislice";
import { useCreateZoomMeetingMutation } from "./zoomApiSlice";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ mentor, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    topic: "",
    duration: "60",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "1",
    sessionType: "One-on-One",
    paymentMethod: "upi",
    transactionId: "",
    transactionScreenshot: null,
    bookingId: "",
    userId: "",
    zoomMeetingId: ""
  });

  // API Hooks
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();
  const [completeBooking, { isLoading: isCompletingBooking }] = useCompleteBookingMutation();
  const [createZoomMeeting, { isLoading: isCreatingZoomMeeting }] = useCreateZoomMeetingMutation();

  // Check authentication on component mount
  useEffect(() => {
    if (isOpen) {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        onClose();
        navigate(`/login?redirect=/book-session?mentorId=${mentor._id}`);
        return;
      }

      // Auto-fill email from localStorage if available
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user.email) {
            setBookingData(prev => ({
              ...prev,
              email: user.email,
              userId: user._id || user.id || ''
            }));
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, [isOpen, mentor, navigate, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, or WEBP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      setBookingData({ ...bookingData, transactionScreenshot: file });
    }
  };

  // Generate hourly slots from time ranges
  const generateHourlySlots = (startTime, endTime) => {
    const slots = [];
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    for (let minutes = startMinutes; minutes < endMinutes; minutes += 60) {
      const slotEndMinutes = Math.min(minutes + 60, endMinutes);
      const slotStartHour = Math.floor(minutes / 60);
      const slotStartMin = minutes % 60;
      const slotEndHour = Math.floor(slotEndMinutes / 60);
      const slotEndMin = slotEndMinutes % 60;

      const slotStart = `${slotStartHour.toString().padStart(2, '0')}:${slotStartMin.toString().padStart(2, '0')}`;
      const slotEnd = `${slotEndHour.toString().padStart(2, '0')}:${slotEndMin.toString().padStart(2, '0')}`;

      slots.push({
        start: slotStart,
        end: slotEnd,
        display: `${slotStart} - ${slotEnd}`
      });
    }
    return slots;
  };

  const getAvailableSlots = () => {
    if (!bookingData.date || !mentor.availability) {
      return [];
    }

    const selectedDate = new Date(bookingData.date);
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

    const dayAvailability = mentor.availability.find(
      day => day.day.toLowerCase() === dayName.toLowerCase()
    );

    if (!dayAvailability || !dayAvailability.slots || dayAvailability.slots.length === 0) {
      return null;
    }

    const allSlots = [];
    dayAvailability.slots.forEach(slot => {
      if (!slot.isBooked) {
        const hourlySlots = generateHourlySlots(slot.startTime, slot.endTime);
        allSlots.push(...hourlySlots);
      }
    });

    return allSlots;
  };

  const calculateTotalAmount = () => {
    return bookingData.duration === "30" ? mentor.hourlyRate / 2 :
      bookingData.duration === "60" ? mentor.hourlyRate :
        mentor.hourlyRate * 1.5;
  };

  // Create Zoom Meeting
  const createZoomMeetingForBooking = async (bookingDetails) => {
    try {
      const [timeStart] = bookingDetails.time.split(' - ');
      const startDateTime = new Date(`${bookingDetails.date}T${timeStart}:00`);

      const zoomMeetingData = {
        topic: `${bookingDetails.sessionType} Session: ${bookingDetails.topic}`,
        type: 2, // Scheduled meeting
        startTime: startDateTime.toISOString(),
        duration: Number(bookingDetails.duration),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        password: `meet${Math.floor(100 + Math.random() * 900)}`,
        agenda: `Session with ${mentor.fullName} - Topic: ${bookingDetails.topic}`,
        settings: {
          hostVideo: true,
          participantVideo: true,
          joinBeforeHost: false,
          muteUponEntry: true,
          waitingRoom: true,
          audio: 'both',
          autoRecording: 'none'
        }
      };

      console.log("Creating Zoom meeting with data:", zoomMeetingData);
      const zoomResponse = await createZoomMeeting(zoomMeetingData).unwrap();

      console.log("Zoom meeting created successfully:", zoomResponse);
      return zoomResponse.data;
    } catch (error) {
      console.error("Failed to create Zoom meeting:", error);
      throw new Error(error?.data?.message || "Failed to create Zoom meeting");
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!bookingData.date || !bookingData.time || !bookingData.topic ||
      !bookingData.email || !bookingData.name || !bookingData.lastName || !bookingData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Step 1: Create Zoom Meeting
      console.log("Step 1: Creating Zoom meeting...");
      const zoomMeeting = await createZoomMeetingForBooking(bookingData);

      // Step 2: Create Booking with Zoom details
      console.log("Step 2: Creating booking with Zoom meeting details...");
      const payload = {
        userId: bookingData.userId,
        mentorId: mentor._id,
        date: bookingData.date,
        time: bookingData.time,
        topic: bookingData.topic,
        duration: Number(bookingData.duration),
        email: bookingData.email,
        menteeEmail: mentor.email,
        name: bookingData.name,
        lastName: bookingData.lastName,
        phone: bookingData.phone,
        guests: bookingData.guests,
        sessionType: bookingData.sessionType,
        zoomMeeting: {
          meetingId: zoomMeeting.zoomMeetingId,
          joinUrl: zoomMeeting.joinUrl,
          startUrl: zoomMeeting.startUrl,
          password: zoomMeeting.password,
          topic: zoomMeeting.topic
        }
      };

      console.log("Create booking payload:", payload);
      const response = await createBooking(payload).unwrap();

      console.log("Booking created successfully:", response);
      setBookingData(prev => ({
        ...prev,
        bookingId: response.bookingId || response._id || response.id,
        zoomMeetingId: zoomMeeting.zoomMeetingId
      }));

      alert("Booking created successfully! Zoom meeting link will be sent to your email. Please proceed with payment.");
      setShowPaymentForm(true);
    } catch (error) {
      console.error("Booking creation failed:", error);
      alert(error?.message || error?.data?.message || "Failed to create booking. Please try again.");
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!bookingData.transactionId) {
      alert("Please enter transaction ID");
      return;
    }

    if (!bookingData.bookingId) {
      alert("Booking ID is missing. Please go back and try again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('bookingId', bookingData.bookingId);
      formData.append('paymentMethod', bookingData.paymentMethod);
      formData.append('transactionId', bookingData.transactionId);
      formData.append('phoneNumber', bookingData.phone);
      formData.append('amount', calculateTotalAmount());

      if (bookingData.transactionScreenshot) {
        formData.append('transactionScreenshot', bookingData.transactionScreenshot);
      }

      console.log("Complete booking with payment...");
      const response = await completeBooking(formData).unwrap();

      console.log("Booking completed successfully:", response);
      setShowSuccessScreen(true);
    } catch (error) {
      console.error("Payment verification failed:", error);
      alert(error?.data?.message || "Payment verification failed. Please contact support.");
    }
  };

  const handleCloseSuccess = () => {
    onClose();
    resetForm();
    navigate("/mentee/dashboard");
  };

  const resetForm = () => {
    setShowPaymentForm(false);
    setShowMoreDetails(false);
    setShowSuccessScreen(false);
    setBookingData({
      date: "",
      time: "",
      topic: "",
      duration: "60",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      guests: "1",
      sessionType: "One-on-One",
      paymentMethod: "upi",
      transactionId: "",
      transactionScreenshot: null,
      bookingId: "",
      userId: "",
      zoomMeetingId: ""
    });
  };

  if (!isOpen) return null;

  const availableSlots = getAvailableSlots();
  const isProcessing = isCreatingBooking || isCreatingZoomMeeting;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg sm:rounded-xl w-full max-w-6xl my-4 sm:my-8 relative"
        >
          {!showSuccessScreen ? (
            <>
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-700 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              <div className="flex flex-col lg:flex-row max-h-[85vh] overflow-hidden">
                {/* Left: Booking/Payment Form */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  {!showPaymentForm ? (
                    // Booking Form
                    <form className="space-y-4 sm:space-y-6" onSubmit={handleBookingSubmit}>
                      {/* Zoom Meeting Info Banner */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Video className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 mb-1">Virtual Meeting via Zoom</p>
                            <p className="text-xs text-gray-600">
                              A Zoom meeting link will be automatically created and sent to your email after booking confirmation.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 1: Session Details */}
                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0098cc] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                            1
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Session Details</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Session Start Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="date"
                                name="date"
                                value={bookingData.date}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setBookingData(prev => ({ ...prev, time: "" }));
                                }}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Select Time Slot
                            </label>
                            {bookingData.date ? (
                              availableSlots === null ? (
                                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-center text-xs">
                                  No slots available
                                </div>
                              ) : (
                                <select
                                  name="time"
                                  value={bookingData.time}
                                  onChange={handleInputChange}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white"
                                  required
                                >
                                  <option value="">Choose time</option>
                                  {availableSlots.map((slot, idx) => (
                                    <option key={idx} value={slot.display}>{slot.display}</option>
                                  ))}
                                </select>
                              )
                            ) : (
                              <div className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50 text-gray-400">
                                Select date first
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Session Duration
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <select
                                name="duration"
                                value={bookingData.duration}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white appearance-none"
                                required
                              >
                                <option value="30">30 min - ₹{mentor.hourlyRate / 2}</option>
                                <option value="60">60 min - ₹{mentor.hourlyRate}</option>
                                <option value="90">90 min - ₹{mentor.hourlyRate * 1.5}</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Session Type
                            </label>
                            <div className="relative">
                              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <select
                                name="sessionType"
                                value={bookingData.sessionType}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white appearance-none"
                                required
                              >
                                <option>One-on-One</option>
                                <option>Group Session</option>
                                <option>Workshop</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 sm:mt-4">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Topic to Discuss
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                              name="topic"
                              value={bookingData.topic}
                              onChange={handleInputChange}
                              placeholder="What would you like to discuss?"
                              rows="3"
                              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent resize-none"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Contact Details */}
                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0098cc] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                            2
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Contact Details</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={bookingData.name}
                              onChange={handleInputChange}
                              placeholder="Your first name"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={bookingData.lastName}
                              onChange={handleInputChange}
                              placeholder="Your last name"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="tel"
                                name="phone"
                                value={bookingData.phone}
                                onChange={handleInputChange}
                                placeholder="Your phone number"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Email
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={bookingData.email}
                                onChange={handleInputChange}
                                placeholder="Your email address"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="bg-[#062117] hover:bg-[#062117]/90 text-white font-semibold py-2.5 sm:py-3 rounded-lg w-full transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isCreatingZoomMeeting && (
                          <Video className="w-4 h-4 animate-pulse" />
                        )}
                        {isProcessing ? "Creating Meeting & Booking..." : "Proceed to Payment"}
                      </button>
                    </form>
                  ) : (
                    // Payment Form (existing code remains the same)
                    <form className="space-y-4 sm:space-y-6" onSubmit={handlePaymentSubmit}>
                      <div className="flex items-center gap-2 sm:gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setShowPaymentForm(false)}
                          className="text-[#0098cc] hover:text-[#007fa3] font-medium text-xs sm:text-sm flex items-center gap-1"
                        >
                          <ChevronRight className="w-4 h-4 rotate-180" />
                          Back
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                            3
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Payment Details</h3>
                        </div>

                        {/* Booking Summary */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-5 mb-6 border border-blue-100">
                          <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Booking Summary</h4>
                          <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Mentor</span>
                              <span className="font-semibold text-gray-800">{mentor.fullName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date</span>
                              <span className="font-semibold text-gray-800">{bookingData.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Time</span>
                              <span className="font-semibold text-gray-800">{bookingData.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration</span>
                              <span className="font-semibold text-gray-800">{bookingData.duration} minutes</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Session Type</span>
                              <span className="font-semibold text-gray-800">{bookingData.sessionType}</span>
                            </div>
                          </div>
                          <div className="border-t border-blue-200 pt-3 mt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-base font-bold text-gray-800">Total Amount</span>
                              <span className="text-2xl font-bold text-[#0098cc]">₹{calculateTotalAmount()}</span>
                            </div>
                          </div>
                        </div>
                        {/* Payment Info */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                              Your Name
                            </label>
                            <input
                              type="text"
                              value={`${bookingData.name} ${bookingData.lastName}`}
                              readOnly
                              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm bg-gray-50 text-gray-600"
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                              Transaction ID / UTR Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="transactionId"
                              value={bookingData.transactionId}
                              onChange={handleInputChange}
                              placeholder="Enter transaction ID"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                              Upload Payment Screenshot <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="file"
                                id="transaction-screenshot"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                              />
                              <label
                                htmlFor="transaction-screenshot"
                                className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 text-xs sm:text-sm hover:border-[#0098cc] hover:bg-[#0098cc]/5 transition cursor-pointer"
                              >
                                {bookingData.transactionScreenshot ? (
                                  <div className="text-center">
                                    <ImageIcon className="w-8 h-8 text-[#0098cc] mx-auto mb-2" />
                                    <p className="text-[#0098cc] font-semibold mb-1">
                                      {bookingData.transactionScreenshot.name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      {(bookingData.transactionScreenshot.size / 1024).toFixed(2)} KB
                                    </p>
                                    <p className="text-[#0098cc] text-xs mt-2">Click to change</p>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 font-medium mb-1">
                                      Click to upload screenshot
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      JPG, PNG or WEBP (Max 5MB)
                                    </p>
                                  </div>
                                )}
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Upload a screenshot of your payment confirmation for verification
                            </p>
                          </div>
                        </div>

                        {/* Razorpay Info */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-6">
                          <div className="flex items-start gap-3">
                            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-gray-800 mb-1">Secure Payment via Razorpay</p>
                              <p className="text-xs text-gray-600">
                                You'll be redirected to Razorpay's secure payment gateway to complete your transaction.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isCompletingBooking}
                        className="bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 sm:py-3.5 rounded-lg w-full transition text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Lock className="w-5 h-5" />
                        {isCompletingBooking ? "Processing..." : `Pay Now - ₹${calculateTotalAmount()}`}
                      </button>
                    </form>
                  )}
                </div>

                {/* Right: Mentor Preview */}
                <div className="flex-1 bg-gray-50 lg:border-l border-gray-200 overflow-y-auto">
                  <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-amber-50 to-orange-50">
                    <img
                      src={mentor.profileImage || 'https://img.freepik.com/free-photo/confident-man_1098-16175.jpg?semt=ais_hybrid&w=740&q=80'}
                      alt={mentor.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-6">
                    {!showMoreDetails ? (
                      <>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <h2 className="text-xl sm:text-2xl font-bold text-[#062117]">{mentor.fullName}</h2>
                          <div className="text-left sm:text-right">
                            <div className="text-2xl font-bold text-[#062117]">₹{mentor.hourlyRate}</div>
                            <div className="text-xs sm:text-sm text-gray-500">per hour</div>
                          </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                          <p className="text-sm sm:text-base text-gray-700 font-medium">{mentor.currentRole}</p>
                          <p className="text-sm sm:text-base text-gray-600">{mentor.companyName}</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              {mentor.yearsOfExperience} yrs experience
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                              {mentor.location}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 border border-gray-200">
                          <h3 className="font-semibold text-[#062117] mb-3 text-sm sm:text-base">Session Features</h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>Expert {mentor.mentorCategory} guidance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>{mentor.mentoringStyle} mentoring style</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>Personalized learning approach</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>Industry insights & best practices</span>
                            </li>
                          </ul>
                        </div>

                        <button
                          className="text-[#0098cc] hover:text-[#007fa3] font-medium text-xs sm:text-sm flex items-center gap-1"
                          onClick={() => setShowMoreDetails(true)}
                        >
                          View Full Profile
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="space-y-3 sm:space-y-4">
                        <button
                          className="text-[#0098cc] hover:text-[#007fa3] font-medium text-xs sm:text-sm mb-2 flex items-center gap-1"
                          onClick={() => setShowMoreDetails(false)}
                        >
                          <ChevronRight className="w-4 h-4 rotate-180" />
                          Back to Summary
                        </button>

                        <div className="space-y-3 text-xs sm:text-sm">
                          <div className="pb-3 border-b border-gray-200">
                            <p className="font-semibold text-gray-700 mb-1">Email</p>
                            <p className="text-gray-600 break-all">{mentor.email}</p>
                          </div>
                          <div className="pb-3 border-b border-gray-200">
                            <p className="font-semibold text-gray-700 mb-1">Phone</p>
                            <p className="text-gray-600">{mentor.phone}</p>
                          </div>
                          {mentor.languages && (
                            <div className="pb-3 border-b border-gray-200">
                              <p className="font-semibold text-gray-700 mb-1">Languages</p>
                              <p className="text-gray-600">{mentor.languages.join(', ')}</p>
                            </div>
                          )}
                          {mentor.areasOfInterest && (
                            <div className="pb-3 border-b border-gray-200">
                              <p className="font-semibold text-gray-700 mb-1">Areas of Interest</p>
                              <p className="text-gray-600">{mentor.areasOfInterest}</p>
                            </div>
                          )}
                          {mentor.currentSkills && (
                            <div className="pb-3 border-b border-gray-200">
                              <p className="font-semibold text-gray-700 mb-1">Current Skills</p>
                              <p className="text-gray-600">{mentor.currentSkills}</p>
                            </div>
                          )}
                          {mentor.highestDegree && (
                            <div className="pb-3 border-b border-gray-200">
                              <p className="font-semibold text-gray-700 mb-1">Education</p>
                              <p className="text-gray-600">{mentor.highestDegree} in {mentor.fieldOfStudy}</p>
                              {mentor.schoolName && (
                                <p className="text-gray-500 text-xs mt-1">{mentor.schoolName}</p>
                              )}
                            </div>
                          )}
                          {mentor.whyMentor && (
                            <div className="pb-3 border-b border-gray-200">
                              <p className="font-semibold text-gray-700 mb-1">Why I Mentor</p>
                              <p className="text-gray-600">{mentor.whyMentor}</p>
                            </div>
                          )}
                          {mentor.greatestAchievement && (
                            <div className="pb-3 border-b border-gray-200">
                              <p className="font-semibold text-gray-700 mb-1">Greatest Achievement</p>
                              <p className="text-gray-600">{mentor.greatestAchievement}</p>
                            </div>
                          )}
                          {mentor.linkedinUrl && (
                            <a
                              href={mentor.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#0098cc] hover:text-[#007fa3] font-medium"
                            >
                              View LinkedIn Profile
                              <ChevronRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Success Screen
            <div className="p-8 sm:p-12 text-center max-h-[85vh] overflow-y-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-[#062117] mb-3">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 mb-8 text-sm sm:text-base">
                  Your session has been successfully booked. Check your email for confirmation details.
                </p>
              </motion.div>

              {/* Booking Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 mb-6 border-2 border-[#0098cc]/20 max-w-2xl mx-auto text-left"
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#062117] mb-6 text-center">Session Details</h3>

                <div className="space-y-4">
                  {/* Mentor Info */}
                  <div className="flex items-center gap-4 pb-4 border-b border-blue-200">
                    <img
                      src={mentor.profileImage || 'https://img.freepik.com/free-photo/confident-man_1098-16175.jpg?semt=ais_hybrid&w=740&q=80'}
                      alt={mentor.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#0098cc]"
                    />
                    <div>
                      <p className="font-bold text-[#062117] text-lg">{mentor.fullName}</p>
                      <p className="text-sm text-gray-600">{mentor.currentRole}</p>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-[#0098cc] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="font-semibold text-[#062117]">{new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#0098cc] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        <p className="font-semibold text-[#062117]">{bookingData.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#0098cc] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                        <p className="font-semibold text-[#062117]">{bookingData.duration} minutes</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[#0098cc] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Session Type</p>
                        <p className="font-semibold text-[#062117]">{bookingData.sessionType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-blue-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-[#0098cc] mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Email</p>
                          <p className="font-semibold text-[#062117] break-all">{bookingData.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-[#0098cc] mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Phone</p>
                          <p className="font-semibold text-[#062117]">{bookingData.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Topic */}
                  <div className="pt-4 border-t border-blue-200">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-[#0098cc] mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Topic</p>
                        <p className="font-semibold text-[#062117]">{bookingData.topic}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Amount Paid</p>
                        <p className="text-2xl font-bold text-[#0098cc]">₹{calculateTotalAmount()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                        <p className="font-mono text-sm font-semibold text-[#062117]">{bookingData.transactionId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
              >
                <button
                  onClick={handleCloseSuccess}
                  className="flex-1 bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 px-6 rounded-lg transition text-sm sm:text-base"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                  className="flex-1 border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc]/10 font-bold py-3 px-6 rounded-lg transition text-sm sm:text-base"
                >
                  Close
                </button>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto"
              >
                <p className="text-sm text-amber-800">
                  <strong>What's next?</strong> You'll receive a confirmation email with meeting details and a calendar invite.
                  The mentor will reach out to you 24 hours before the session.
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;


