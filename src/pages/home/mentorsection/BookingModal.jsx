

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
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.18, ease: "easeOut" }}
    className="flex flex-col items-center justify-center px-6 py-5 text-center  bg-[#021f1a]"
    style={{ minHeight: 240 }}
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.08, duration: 0.22 }}
      className="w-12 h-12 rounded-full bg-[#123f38] border border-[#2f8f81]/40 flex items-center justify-center mb-3"
    >
      <CheckCircle2
        className="w-7 h-7 text-[#73f5c8]"
        strokeWidth={2.2}
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="mb-5"
    >
      <h2 className="text-[18px] font-semibold text-[#f4f7f6] tracking-[-0.02em] mb-1">
        Session Confirmed
      </h2>

      <p className="text-[13px] leading-5 text-[#7fb3a8] max-w-[230px] mx-auto">
        Your session with{" "}
        <span className="font-semibold text-[#d8fff4]">
          {mentor?.fullName}
        </span>{" "}
        has been booked. Check your inbox for the details.
      </p>
    </motion.div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.22 }}
      onClick={onClose}
      className="w-full max-w-[185px] h-10 rounded-full bg-[#1d8e85] text-white text-[13px] font-semibold hover:bg-[#27a398] active:scale-[0.98] transition-all duration-200"
    >
      View Your Sessions →
    </motion.button>
  </motion.div>
);


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
            <Gift className="w-3.5 h-3.5 text-[#1d3331] flex-shrink-0" />
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
        <div className="bg-[#79dbbc] px-4 py-2 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#0a211e] flex-shrink-0" />
          <span className="text-[#0a211e] text-xs font-bold tracking-wide uppercase">
            Free Session Used
          </span>
        </div>

        {/* Body */}
        <div className="bg-blue-50 px-4 py-3 flex flex-col gap-1">
          <p className="text-sm font-bold text-[#0a211e]">
            You've already used your free session
          </p>
          <p className="text-xs text-[#0a211e] leading-relaxed">
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

  console.log(mentor, "mentorqwe")

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
        mentorUserId: mentor?.userId,
        mentorName: mentor.fullName,
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
        price: priceLabel,
        sessionType: "One-on-One",
        createZoomMeeting: true,
      };

      const response = await createBooking(payload).unwrap();

      if (response.isFreeSession === true) {
        setBookingSuccess(true);
        showToast.success("Free session booked! Check your email for the Zoom link.");
      } else {
        // navigate("/payment", {
        //   state: {
        //     bookingId: response.bookingId || response.data?._id,
        //     mentorId: mentor._id,
        //     mentorName: mentor.fullName,
        //     paymentAmount: calculateAmount(),
        //     bookingDetails: {
        //       date: selectedSlot.date?.split("T")[0],
        //       time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
        //       topic,
        //       sessionType: "One-on-One",
        //       duration: 60,
        //     },
        //     mentorDetails: {
        //       fullName: mentor.fullName,
        //       email: mentor.email,
        //       _id: mentor._id,
        //       profileImage: mentor.profileImage,
        //       currentRole: mentor.currentRole,
        //     },
        //   },
        // });

        navigate("/payment", {
          state: {
            session_id: response.bookingId || response.data?._id,
            subscription_id: null,
            mentorId: mentor._id,
            menteeId: userId,
            mentorName: mentor.fullName,
            menteeName: user.name || user.firstName || username || "",
            mentorRole: mentor.currentRole || "Mentor",
            planMonths: null,
            totalSessions: 1,
            basePrice: calculateAmount(),
            createdBy: userId,
            paymentType: "bookingsession",
            bookingDetails: {
              date: selectedSlot.date?.split("T")[0],
              time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
              topic,
              sessionType: "One-on-One",
              duration: calcDuration(selectedSlot.startTime, selectedSlot.endTime),
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

  const labelCls = "block text-[11px] font-semibold text-[#0a211e] uppercase tracking-wide mb-1";
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white placeholder-gray-400 ransition";

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
              className="text-[#79dbbc] hover:text-gray-700 transition p-1 rounded-lg hover:bg-gray-100"
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
                    <p className="text-[11px] font-semibold text-[#text-[#0a211e]] uppercase tracking-wide">
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
                      <span className="text-[11px] text-[#0a211e] font-semibold uppercase tracking-wide">
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

