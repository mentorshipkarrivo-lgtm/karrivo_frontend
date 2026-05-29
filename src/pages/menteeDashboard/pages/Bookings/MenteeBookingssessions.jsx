

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


