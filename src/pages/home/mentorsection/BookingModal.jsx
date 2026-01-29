import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, Calendar, MessageSquare, Users, ChevronRight, Award, MapPin, Video, Gift, AlertCircle, Mail, Phone } from "lucide-react";
import {
  useCreateBookingMutation,
  useCheckFreeSessionEligibilityQuery
} from "./Mentorsectionapislice";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ mentor, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [userId, setUserId] = useState("");

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
    bookingId: "",
    userId: "",
    zoomMeetingId: ""
  });

  // API Hooks
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

  // Check free session eligibility
  const { data: freeSessionData, isLoading: checkingFreeSession } = useCheckFreeSessionEligibilityQuery(
    userId,
    { skip: !userId }
  );

  const hasFreeSession = freeSessionData?.hasFreeSession || false;
  const isFreeSession = hasFreeSession && !freeSessionData?.freeSessionUsed;

  // Check authentication on component mount
  useEffect(() => {
    if (isOpen) {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        onClose();
        navigate(`/login?redirect=/book-session?mentorId=${mentor._id}`);
        return;
      }

      // Auto-fill data from localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user.email) {
            setBookingData(prev => ({
              ...prev,
              email: user.email,
              name: user.firstName || user.name || '',
              lastName: user.lastName || '',
              phone: user.phone || '',
              userId: user._id || user.id || ''
            }));
            setUserId(user._id || user.id || '');
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
    if (isFreeSession) return 0;

    return bookingData.duration === "30" ? mentor.hourlyRate / 2 :
      bookingData.duration === "60" ? mentor.hourlyRate :
        mentor.hourlyRate * 1.5;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
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
        isFreeSession: isFreeSession, // ✅ ADD THIS
        createZoomMeeting: isFreeSession, // ✅ ADD THIS - only create for free sessions
      };

      console.log("Create booking payload:", payload);
      const response = await createBooking(payload).unwrap();

      console.log("Booking response:", response);

      // Check if this is a free session that was auto-confirmed
      if (response.data.isFreeSession) {
        // Free session - Zoom created, show success
        setBookingData(prev => ({
          ...prev,
          bookingId: response.bookingId,
          zoomMeetingId: response.zoomMeeting?.meetingId || '',
          transactionId: response.data?.transactionId || 'FREE_SESSION'
        }));
        setShowSuccessScreen(true);
      } else {
        // Paid session - NO Zoom yet, navigate to payment
        navigate('/payment', {
          state: {
            bookingId: response.bookingId || response.data?._id,
            mentorId: mentor._id,
            mentorName: mentor.fullName,
            paymentAmount: calculateTotalAmount(),
            bookingDetails: {
              date: bookingData.date,
              time: bookingData.time,
              topic: bookingData.topic,
              duration: bookingData.duration,
              email: bookingData.email,
              name: bookingData.name,
              lastName: bookingData.lastName,
              phone: bookingData.phone,
              guests: bookingData.guests,
              sessionType: bookingData.sessionType,
            },
            mentorDetails: {
              fullName: mentor.fullName,
              email: mentor.email,
              _id: mentor._id,
              profileImage: mentor.profileImage,
              currentRole: mentor.currentRole
            },
            // ❌ NO zoomMeeting here - will be created after payment
          }
        });
      }
    } catch (error) {
      console.error("Booking creation failed:", error);
      alert(error?.message || error?.data?.message || "Failed to create booking. Please try again.");
    }
  };
  const handleCloseSuccess = () => {
    onClose();
    resetForm();
    navigate("/mentee/dashboard");
  };

  const resetForm = () => {
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
      bookingId: "",
      userId: "",
      zoomMeetingId: ""
    });
  };

  if (!isOpen) return null;

  const availableSlots = getAvailableSlots();
  const isProcessing = isCreatingBooking || checkingFreeSession;

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
                {/* Left: Booking Form */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <form className="space-y-4 sm:space-y-6" onSubmit={handleBookingSubmit}>
                    {/* Free Session Banner */}
                    {isFreeSession && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4 mb-4"
                      >
                        <div className="flex items-start gap-3">
                          <Gift className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-green-800 mb-1">
                              🎉 Your First Session is FREE!
                            </p>
                            <p className="text-xs text-green-700">
                              This is your complimentary first session. No payment required!
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Already Used Free Session Info */}
                    {!isFreeSession && freeSessionData?.freeSessionUsed && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-blue-800 mb-1">
                              Free Session Already Used
                            </p>
                            <p className="text-xs text-blue-600">
                              You've used your free session. This booking requires payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Zoom Meeting Info Banner */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Video className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 mb-1">Virtual Meeting via Zoom</p>
                          <p className="text-xs text-gray-600">
                            A Zoom meeting link will be automatically created and sent to your email.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Session Details */}
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
                              <option value="30">30 min - {isFreeSession ? 'FREE' : `₹${mentor.hourlyRate / 2}`}</option>
                              <option value="60">60 min - {isFreeSession ? 'FREE' : `₹${mentor.hourlyRate}`}</option>
                              <option value="90">90 min - {isFreeSession ? 'FREE' : `₹${mentor.hourlyRate * 1.5}`}</option>
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

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`${isFreeSession
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-[#062117] hover:bg-[#062117]/90'
                        } text-white font-semibold py-2.5 sm:py-3 rounded-lg w-full transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                      {isProcessing ? "Creating Booking..." : (
                        isFreeSession ? "Confirm Free Session" : "Proceed to Payment"
                      )}
                    </button>
                  </form>
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
                            {isFreeSession ? (
                              <div>
                                <div className="text-2xl font-bold text-green-600">FREE</div>
                                <div className="text-xs text-gray-500 line-through">₹{mentor.hourlyRate}/hr</div>
                              </div>
                            ) : (
                              <div>
                                <div className="text-2xl font-bold text-[#062117]">₹{mentor.hourlyRate}</div>
                                <div className="text-xs sm:text-sm text-gray-500">per hour</div>
                              </div>
                            )}
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
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success Screen for Free Session */
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
                  🎉 Free Session Confirmed!
                </h2>
                <p className="text-gray-600 mb-8 text-sm sm:text-base">
                  Your complimentary first session has been confirmed! Check your email for Zoom meeting details.
                </p>
              </motion.div>

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
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;












