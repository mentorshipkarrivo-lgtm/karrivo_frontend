

import React, { useState, useEffect, Fragment } from "react";
import {
  MapPin, Briefcase, Settings2, X, CheckCircle2, ArrowLeft, ArrowRight,
  Star, Calendar, Clock, Video, DollarSign, CheckCircle, XCircle,
  RefreshCw, Tag, FileText, Eye, Trash2, AlertTriangle, User, Check,
  Loader2, ExternalLink, Zap, CalendarCheck, CalendarDays, Sparkles,
  BookOpen, ChevronDown, ArrowUpRight, BadgeCheck, Phone, MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGetMentorsListMutation } from "./Bookingsecapislice";
import {
  useGetMenteeBookingsQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
  useGetRescheduleSlotsQuery,
} from "../pages/Bookings/Bookingsecapislice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../global/Loader";

/* ─── Google Font ─────────────────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("dm-sans-font")) {
  const link = Object.assign(document.createElement("link"), {
    id: "dm-sans-font",
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
  });
  document.head.appendChild(link);
}

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */
const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const parseAreas = (str = "") =>
  str.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);

const to12h = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
};

const slotDuration = (s, e) => {
  const [fh, fm] = s.split(":").map(Number);
  const [th, tm] = e.split(":").map(Number);
  return th * 60 + tm - (fh * 60 + fm);
};

const DAY_NAMES_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const formatSlotDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

const getSlotDayName = (d) => DAY_NAMES_FULL[new Date(d).getDay()];

const getSlotDateParts = (d) => {
  const dt = new Date(d);
  return {
    day: dt.getDate(),
    month: dt.toLocaleString("en-US", { month: "short" }),
    weekday: DAY_NAMES_SHORT[dt.getDay()],
  };
};

const menteeTypes = [
  "All Mentors", "Engineering Mentors", "Top Mentors", "Startup Mentors",
  "Product Mentors", "Marketing Mentors", "Leadership Mentors", "AI Mentors",
];

const STATUS_CONFIG = {
  Approved: { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", label: "Confirmed", icon: CheckCircle },
  pending: { badge: "bg-amber-50 text-amber-700 border border-amber-200", label: "Pending", icon: Clock },
  cancelled: { badge: "bg-red-50 text-red-600 border border-red-200", label: "Cancelled", icon: XCircle },
  completed: { badge: "bg-sky-50 text-sky-700 border border-sky-200", label: "Completed", icon: BadgeCheck },
  unattended: { badge: "bg-orange-50 text-orange-600 border border-orange-200", label: "Unattended", icon: AlertTriangle },
};

/* ═══════════════════════════════════════════════════════════════════════════
   MICRO-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${c.badge}`}>
      <Icon className="w-2.5 h-2.5" />{c.label}
    </span>
  );
}

function Tag2({ children }) {
  return (
    <span className="inline-block text-[11px] font-medium text-slate-500 bg-slate-100 rounded px-2 py-0.5">
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDIT PREFERENCES MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
function EditPreferencesModal({ isOpen, onClose, onUpdate, initialData }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", dateOfBirth: "", address: "", status: "", education: "", menteeType: "" });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        name: initialData.name || "",
        dateOfBirth: initialData.dateOfBirth || "",
        address: initialData.address || "",
        status: initialData.status || "",
        education: initialData.education || "",
        menteeType: initialData.menteeType || "",
      });
      setStep(1);
    }
  }, [isOpen, initialData]);

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const ok1 = form.name && form.dateOfBirth && form.address;
  const ok2 = form.status && form.education;
  const ok3 = form.menteeType;

  const handleUpdate = () => {
    const updated = { ...form, profileCompleted: true };
    localStorage.setItem("profileData", JSON.stringify(updated));
    document.cookie = `profileData=${encodeURIComponent(JSON.stringify(updated))}; path=/; max-age=31536000`;
    const uc = Cookies.get("userData");
    if (uc) {
      try {
        const merged = { ...JSON.parse(uc), ...updated };
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(merged))}; path=/; max-age=86400`;
      } catch { }
    }
    onUpdate(updated);
    onClose();
    toast.success("Preferences updated!");
  };

  const steps = [
    { num: 1, label: "Personal", icon: User },
    { num: 2, label: "Experience", icon: Briefcase },
    { num: 3, label: "Preference", icon: Sparkles },
  ];

  const inputBase =
    "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 " +
    "transition-all placeholder:text-slate-400 font-[DM Sans,sans-serif]";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-[DM Sans,sans-serif]"
      >
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/30"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-5 border-b border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-slate-900 text-base">Update Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">Refine your mentor recommendations</p>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            {/* Step indicator */}
            <div className="flex items-center gap-1">
              {steps.map((s, i) => (
                <Fragment key={s.num}>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${step === s.num ? "bg-blue-600 text-white" : step > s.num ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                    }`}>
                    {step > s.num ? <Check className="w-3 h-3" /> : null}
                    {s.label}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-px ${step > s.num ? "bg-blue-200" : "bg-slate-100"}`} />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="px-5 py-5">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Full Name *</label>
                    <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" className={inputBase} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Date of Birth *</label>
                    <input type="date" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} className={inputBase} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Address *</label>
                    <textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2} placeholder="Your address" className={`${inputBase} resize-none`} />
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-2">Current Status *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["fresher", "experienced"].map((s) => (
                        <button key={s} onClick={() => set("status", s)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all text-left flex items-center gap-2
                            ${form.status === s ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/40"}`}>
                          {s === "fresher" ? <BookOpen className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Highest Education *</label>
                    <select value={form.education} onChange={(e) => set("education", e.target.value)} className={`${inputBase} cursor-pointer`}>
                      <option value="">Select education level</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelors Degree</option>
                      <option value="masters">Masters Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
                  <p className="text-xs font-medium text-slate-600 mb-3">What type of mentor do you want?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {menteeTypes.map((type) => (
                      <button key={type} onClick={() => set("menteeType", type)}
                        className={`p-2.5 rounded-lg border text-left transition-all
                          ${form.menteeType === type ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"}`}>
                        <span className={`text-xs font-medium ${form.menteeType === type ? "text-blue-700" : "text-slate-600"}`}>{type}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-5 pb-5 flex items-center justify-between">
            <button onClick={() => setStep((s) => s - 1)} disabled={step === 1}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < 3 ? (
              <button onClick={() => setStep((s) => s + 1)} disabled={(step === 1 && !ok1) || (step === 2 && !ok2)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleUpdate} disabled={!ok3}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                <Check className="w-4 h-4" /> Save & Refresh
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MENTOR CARD  — plain, image on left, matches screenshot layout
   ═══════════════════════════════════════════════════════════════════════════ */
function MentorCard({ mentor, index, onViewProfile, onBookSession }) {
  const areas = parseAreas(mentor.areasOfInterest || mentor.currentSkills || "");
  const initials = getInitials(mentor.fullName);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden w-[280px] max-w-full
                 hover:border-blue-300 transition-all duration-200 font-[DM Sans,sans-serif]"
    >
      {/* Image */}
      <div className="relative w-full h-[160px] bg-slate-100 overflow-hidden">
        {mentor.profileImage ? (
          <img src={mentor.profileImage} alt={mentor.fullName} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50">
            <span className="text-4xl font-bold text-blue-400">{initials}</span>
          </div>
        )}
        {/* Rating badge top-right */}
        <div className="absolute top-2 right-2 bg-white border border-slate-200 rounded-full px-2 py-0.5 flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-slate-700">{mentor.rating ? Number(mentor.rating).toFixed(1) : "5.0"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-[14px] leading-tight">{mentor.fullName || "Unknown Mentor"}</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {mentor.currentRole || "Mentor"}{mentor.yearsOfExperience ? ` · ${mentor.yearsOfExperience}+ Years of Experience.` : ""}
        </p>
        {mentor.companyName && (
          <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
            <Briefcase className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{mentor.companyName}</span>
          </p>
        )}

        <button
          onClick={() => onViewProfile(mentor)}
          className="mt-4 w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold
                     hover:bg-blue-700 active:scale-[0.98] transition-all duration-150"
        >
          View Profile
        </button>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESCHEDULE MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
function RescheduleModal({
  booking, isOpen, onClose, onConfirm, isRescheduling,
  getMentorName, getMentorInitials, formatCardDate, formatCardTime,
}) {
  const mentorId = typeof booking?.mentorId === "object"
    ? booking?.mentorId?._id || booking?.mentorId?.id
    : booking?.mentorId;

  const { data: slotsData, isLoading: slotsLoading, isError: slotsError } =
    useGetRescheduleSlotsQuery({ mentorId }, { skip: !isOpen || !mentorId });

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState("slots");

  const rawSlots = slotsData?.data?.[0]?.dayslots || [];
  const availableSlots = rawSlots
    .filter((s) => !s.isBooked)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    if (isOpen && booking) { setSelectedSlot(null); setStep("slots"); }
  }, [isOpen, booking]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!booking) return null;

  const handleConfirm = () => {
    if (!selectedSlot) return;
    onConfirm({ bookingId: booking._id, bookedMeetingSlot: selectedSlot });
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "long" });

  return (
    <>
      <div onClick={onClose}
        className={`fixed inset-0 z-50 transition-opacity duration-200 bg-black/30
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className={`bg-white rounded-2xl w-full max-w-2xl max-h-[88vh] flex flex-col pointer-events-auto
                        border border-slate-200 font-[DM Sans,sans-serif]
                        transition-all duration-200
                        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <button onClick={onClose} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-sm font-semibold text-slate-900">Reschedule Session</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {/* Current session info */}
            <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-400 mb-1">Current Session</p>
              <p className="text-sm font-semibold text-slate-800">{getMentorName(booking)}</p>
              <p className="text-xs text-slate-500 mt-0.5">{fmtDate(booking.sessionDate)} at {formatCardTime(booking.startTime)}</p>
            </div>

            {step === "slots" && (
              <>
                <p className="text-sm font-medium text-slate-700 mb-3">Choose a new slot</p>
                {slotsLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  </div>
                )}
                {slotsError && (
                  <div className="text-center py-10 text-sm text-slate-400">Could not load slots. Try again later.</div>
                )}
                {!slotsLoading && !slotsError && availableSlots.length === 0 && (
                  <div className="text-center py-10 text-sm text-slate-400">No available slots right now.</div>
                )}
                {!slotsLoading && !slotsError && availableSlots.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availableSlots.map((slot, idx) => {
                      const dp = getSlotDateParts(slot.date);
                      const mins = slotDuration(slot.startTime, slot.endTime);
                      return (
                        <button key={slot._id || idx}
                          onClick={() => { setSelectedSlot(slot); setStep("confirm"); }}
                          className="text-left p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-150 group">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex flex-col items-center justify-center flex-shrink-0">
                              <span className="text-[9px] font-bold uppercase text-blue-400">{dp.month}</span>
                              <span className="text-lg font-bold text-blue-600 leading-none">{dp.day}</span>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-700">{getSlotDayName(slot.date)}</p>
                              <p className="text-xs text-slate-500">{to12h(slot.startTime)} — {to12h(slot.endTime)}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">{mins} min</p>
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
                <p className="text-sm font-medium text-slate-700 mb-4">Confirm Reschedule</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-400 mb-1.5 uppercase font-semibold tracking-wide">Current</p>
                    <p className="text-sm font-semibold text-slate-700">{formatCardDate(booking.sessionDate)}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatCardTime(booking.startTime)}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                    <p className="text-[10px] text-blue-500 mb-1.5 uppercase font-semibold tracking-wide">New Slot</p>
                    <p className="text-sm font-semibold text-blue-800">{formatSlotDate(selectedSlot.date)}</p>
                    <p className="text-xs text-blue-500 mt-0.5">{to12h(selectedSlot.startTime)} — {to12h(selectedSlot.endTime)}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg p-3">
                  Your current slot will be released and the new one reserved. Updated calendar invites will be sent via email.
                </p>
              </div>
            )}
          </div>

          {step === "confirm" && selectedSlot && (
            <div className="border-t border-slate-100 px-5 py-4 flex items-center justify-between bg-slate-50/60 rounded-b-2xl">
              <button onClick={() => setStep("slots")} className="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Change Slot
              </button>
              <button onClick={handleConfirm} disabled={isRescheduling}
                className="flex items-center gap-2 text-white py-2.5 px-5 rounded-lg font-semibold text-sm transition-all bg-blue-600 hover:bg-blue-700 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed">
                {isRescheduling
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Rescheduling…</>
                  : <><Check className="w-4 h-4" /> Confirm Reschedule</>
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOOKING CARD — plain event-list style matching screenshot
   ═══════════════════════════════════════════════════════════════════════════ */
function BookingCard({
  booking, onOpenPanel,
  getMentorName, getMentorInitials, getMentorSubtitle,
  formatCardDate, formatCardTime, formatShortDate,
}) {
  const dateObj = formatShortDate(booking.sessionDate);
  const mentorName = getMentorName(booking);
  const mentorSubtitle = getMentorSubtitle(booking);
  const mentorImage = typeof booking.mentorId === "object" ? booking.mentorId?.profileImage : null;


  console.log(booking, "booking123")
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative flex items-stretch border-b border-slate-100 last:border-b-0
                 hover:bg-slate-50/50 transition-colors duration-150 font-[DM Sans,sans-serif] overflow-hidden"
    >
      {/* Date column */}
      <div className="flex-shrink-0 w-16 flex flex-col items-center justify-center py-4 border-r border-slate-100 bg-white">
        <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500">
          {MONTH_SHORT[new Date(booking.sessionDate).getMonth()]}
        </span>
        <span className="text-2xl font-bold text-slate-900 leading-tight">
          {dateObj.day}
        </span>
        <span className="text-[9px] font-medium text-slate-400">
          {new Date(booking.sessionDate).getFullYear()}
        </span>
      </div>

      {/* Middle content */}
      <div className="flex-1 min-w-0 px-4 py-3.5">
        <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wide mb-0.5">
          {booking.sessionType || "1:1 Session"}
        </p>
        <h3 className="text-sm font-semibold text-slate-900 truncate">{booking.mentorName}</h3>
        <p className="text-xs text-slate-400 mt-0.5 truncate">{booking.topic || mentorSubtitle || "Mentorship Session"}</p>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
            <Clock className="w-2.5 h-2.5" />
            {formatCardTime(booking.startTime) || "TBD"} · {booking.durationMinutes || 30} min
          </span>
          <StatusBadge status={booking.paymentStatus} />
          {booking.isFreeSession && (
            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full px-2 py-0.5">
              <Zap className="w-2.5 h-2.5" /> FREE
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2.5">
          <button
            onClick={() => onOpenPanel(booking, "details")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] font-semibold
                       text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.97] transition-all"
          >
            <Eye className="w-3 h-3" /> View Details
          </button>
          {booking.paymentStatus === "Approved" && booking.meetingLink && (
            <a
              href={booking.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] font-semibold
                         text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all"
            >
              <Video className="w-3 h-3" /> Join
            </a>
          )}
        </div>
      </div>

      {/* RIGHT: Mentor image panel */}
      <div className="flex-shrink-0 w-[110px] self-stretch relative overflow-hidden">
        {mentorImage ? (
          <img
            src={mentorImage}
            alt={mentorName}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-blue-900 flex items-center justify-center">
            <span className="text-2xl font-bold text-white/80 select-none">
              {getMentorInitials(booking)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

function DetailRow({ icon: Icon, label, value, children }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-slate-400 mb-0.5">{label}</p>
        {children || <p className="text-sm font-medium text-slate-700">{value || "—"}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function BookingsDashboard() {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [getMentors, { data: mentorsData, isLoading: mentorsLoading, isError: mentorsError }] =
    useGetMentorsListMutation();
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setEditModal] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { data: bookingsData, isLoading: bookingsLoading, isError: bookingsError, error: bookingsErr } =
    useGetMenteeBookingsQuery();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [panelView, setPanelView] = useState("details");
  const [panelOpen, setPanelOpen] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const pc = Cookies.get("profileData");
    let menteeType = "All Mentors";
    if (pc) {
      try {
        const parsed = JSON.parse(decodeURIComponent(pc));
        setProfileData(parsed);
        menteeType = parsed?.menteeType || parsed?.profile?.menteeType || "All Mentors";
      } catch { }
    }
    getMentors({ menteeType });
  }, []);

  useEffect(() => {
    document.body.style.overflow = rescheduleOpen || panelOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panelOpen, rescheduleOpen]);

  const mentorsList = Array.isArray(mentorsData)
    ? mentorsData
    : Array.isArray(mentorsData?.mentors)
      ? mentorsData.mentors
      : Array.isArray(mentorsData?.data) ? mentorsData.data : [];

  const filtered = mentorsList.filter((m) => {
    const q = search.toLowerCase();
    return !search || m.fullName?.toLowerCase().includes(q) || m.currentRole?.toLowerCase().includes(q);
  });

  const handlePreferencesUpdate = (updated) => {
    setProfileData(updated);
    localStorage.setItem("profileData", JSON.stringify(updated));
    getMentors({ menteeType: updated.menteeType });
  };

  const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor._id}`);
  const handleBookSession = (mentor) => {
    const l = !!localStorage.getItem("authToken");
    if (!l) navigate(`/login?mentorId=${mentor._id}`);
    else navigate(`/book-session?mentorId=${mentor._id}`);
  };

  const bookings = bookingsData?.data || [];

  const getMentorName = (b) => typeof b.mentorId === "object" ? b.mentorId?.fullName || b.menteeName || "Mentor" : b.menteeName || "Mentor";
  const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
  const getMentorRole = (b) => typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
  const getMentorCompany = (b) => typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
  const getMentorSubtitle = (b) => { const r = getMentorRole(b), c = getMentorCompany(b); return c && r ? `${c} · ${r}` : c || r || ""; };
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const formatCardDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatCardTime = (t) => (t ? t.split("-")[0].trim() : "");
  const formatShortDate = (d) => { const dt = new Date(d); return { day: dt.getDate(), month: dt.toLocaleString("en-US", { month: "short" }) }; };

  const openPanel = (booking, view = "details") => {
    if (view === "reschedule") { setRescheduleTarget(booking); setRescheduleOpen(true); return; }
    setSelectedBooking(booking); setPanelView(view); setPanelOpen(true);
  };
  const closePanel = () => {
    setPanelOpen(false);
    setTimeout(() => { setSelectedBooking(null); setPanelView("details"); setCancelReason(""); }, 300);
  };
  const closeReschedule = () => {
    setRescheduleOpen(false);
    setTimeout(() => setRescheduleTarget(null), 300);
  };

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) { toast.warning("Please provide a reason for cancellation."); return; }
    try {
      await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
      toast.success(selectedBooking.isFreeSession ? "Booking cancelled. Free session restored!" : "Booking cancelled.");
      closePanel();
    } catch (err) {
      toast.error("Failed to cancel: " + (err?.data?.message || "Please try again."));
    }
  };

  const handleRescheduleBooking = async ({ bookingId, bookedMeetingSlot }) => {
    try {
      await rescheduleBooking({ bookingId, bookedMeetingSlot }).unwrap();
      toast.success("Booking rescheduled successfully!");
      closeReschedule(); closePanel();
    } catch (err) {
      toast.error("Failed to reschedule: " + (err?.data?.message || "Please try again."));
    }
  };

  /* ─── Status filter tabs (matching screenshot: Unattended, Cancelled) ─── */
  const statusCounts = {
    unattended: bookings.filter(b => b.paymentStatus === "unattended").length,
    cancelled: bookings.filter(b => b.paymentStatus === "cancelled").length,
  };

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════════════════════ */
  return (
    <main className="h-[85vh] overflow-hidden bg-white font-[DM Sans,sans-serif]">
      <ToastContainer position="bottom-right" autoClose={3500} theme="light" />

      {/* ══ TWO-COLUMN LAYOUT ═══════════════════════════════════════════════ */}
      <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">

        {/* ── LEFT COLUMN — scrollable ────────────────────────────────────── */}
        <div className="flex-1 min-w-0 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}>

          {/* ── TRIAL BOOKINGS HEADER ── */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-slate-900">
              Trial <span className="text-[#4ca2f5] bg-blue-50 px-2 py-0.5 rounded-md">Bookings</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">Free 1:1 sessions for you to find the perfect mentor</p>
          </div>


          {/* ── MENTOR CARDS ── */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-700">Recommended Mentors</p>
            {/* <button onClick={() => setEditModal(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">
              <Settings2 className="w-3.5 h-3.5" /> Edit Preferences
            </button> */}
          </div>

          {mentorsLoading && <div className="py-12 flex justify-center"><Loader /></div>}
          {mentorsError && (
            <div className="text-center py-10 text-sm text-slate-400">Failed to load mentors. Please refresh.</div>
          )}
          {!mentorsLoading && !mentorsError && filtered.length === 0 && (
            <div className="text-center py-10 text-sm text-slate-400">
              No mentors found.{" "}
              {/* <button onClick={() => setEditModal(true)} className="text-blue-500 underline">Update preferences</button> */}
            </div>
          )}
          {!mentorsLoading && !mentorsError && filtered.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {filtered.map((mentor, i) => (
                <MentorCard key={mentor._id || i} mentor={mentor} index={i} onViewProfile={handleViewProfile} onBookSession={handleBookSession} />
              ))}
            </div>
          )}
          {/* ── Status filter pills ── */}
          {bookings.length > 0 && (
            <div className="flex items-center gap-2 mb-5">
              {statusCounts.unattended > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200">
                  Unattended <span className="bg-orange-200 text-orange-700 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">{statusCounts.unattended}</span>
                </span>
              )}
              {statusCounts.cancelled > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-200">
                  Cancelled <span className="bg-red-200 text-red-700 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">{statusCounts.cancelled}</span>
                </span>
              )}
            </div>
          )}

          {/* ── No upcoming bookings notice ── */}
          {!bookingsLoading &&
            !bookingsError &&
            bookings.filter(
              b => b.paymentStatus === "Approved" || b.paymentStatus === "pending"
            ).length === 0 && (
              <div className="border border-slate-200 rounded-xl p-4 mb-5 bg-white">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    No Upcoming Trial Bookings
                  </p>
                  <p className="text-sm text-slate-500">
                    Book one from mentors recommended for you
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Trials are 100% free and a great opportunity to finalise the mentor who's meant for you.
                  </p>
                </div>
              </div>
            )}

          {/* ── BOOKINGS LIST ── */}
          {bookingsLoading && <div className="py-16 flex justify-center"><Loader /></div>}

          {!bookingsLoading && !bookingsError && bookings.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onOpenPanel={openPanel}
                  getMentorName={getMentorName}
                  getMentorInitials={getMentorInitials}
                  getMentorSubtitle={getMentorSubtitle}
                  formatCardDate={formatCardDate}
                  formatCardTime={formatCardTime}
                  formatShortDate={formatShortDate}
                />
              ))}
            </div>
          )}


        </div>

        {/* ── RIGHT SIDEBAR — fixed height, no scroll ──────────────────────── */}
        <div className="lg:w-[280px] flex-shrink-0 flex flex-col gap-4 h-fit lg:sticky lg:top-0">

          {/* Remaining trials */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-900">Book trials</p>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Explore from a list of 600+ mentors, book trials and try to find the perfect mentor for you.
            </p>
            <button
              onClick={() => navigate("/explore-mentors")}
              className="mt-3.5 w-full py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700
                         hover:border-blue-300 hover:text-blue-600 active:scale-[0.98] transition-all duration-150"
            >
              Explore All Mentors
            </button>
          </div>

          {/* Relationship Manager */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-900 leading-snug">
              Planning to purchase and confused about which plan is right for you?
            </p>
            <p className="text-xs text-slate-400 mt-1.5">Reach out to your Relationship Manager today!</p>
            <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-slate-100">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800">Karrivo</p>
                <p className="text-[11px] text-slate-400">+91 123456789</p>
              </div>
              <div className="flex items-center gap-1.5">
                <a href="https://wa.me/919311484346" target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                </a>
                <a href="tel:+919311484346"
                  className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ RESCHEDULE MODAL ════════════════════════════════════════════════ */}
      <RescheduleModal
        booking={rescheduleTarget}
        isOpen={rescheduleOpen}
        onClose={closeReschedule}
        onConfirm={handleRescheduleBooking}
        isRescheduling={isRescheduling}
        getMentorName={getMentorName}
        getMentorInitials={getMentorInitials}
        formatCardDate={formatCardDate}
        formatCardTime={formatCardTime}
      />

      {/* ══ PANEL BACKDROP ══════════════════════════════════════════════════ */}
      <div
        onClick={closePanel}
        className={`fixed inset-0 z-40 transition-all duration-200 bg-black/20
          ${panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ══ SLIDE PANEL ═════════════════════════════════════════════════════ */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-white w-full sm:w-[400px]
                    transform transition-transform duration-250 ease-out flex flex-col border-l border-slate-200
                    font-[DM Sans,sans-serif]
                    ${panelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedBooking && (
          <>
            {panelView === "details" && (
              <>
                {/* Panel header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <button onClick={closePanel} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="text-sm font-semibold text-slate-900">Session Details</h2>
                </div>

                {/* Mentor info bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">{getMentorInitials(selectedBooking)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 truncate">{getMentorName(selectedBooking)}</p>
                    <p className="text-xs text-slate-400 truncate">{getMentorSubtitle(selectedBooking)}</p>
                  </div>
                  <StatusBadge status={selectedBooking.paymentStatus} />
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <DetailRow icon={Calendar} label="Date" value={formatDate(selectedBooking.sessionDate)} />
                  <DetailRow icon={Clock} label="Time" value={`${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min`} />
                  <DetailRow icon={Tag} label="Session Type" value={selectedBooking.sessionType} />
                  <DetailRow icon={FileText} label="Topic" value={selectedBooking.topic} />
                  {selectedBooking.paymentStatus === "Approved" && selectedBooking.meetingLink && (
                    <DetailRow icon={Video} label="Meeting Link">
                      <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                        Join Meeting <ExternalLink className="w-3 h-3" />
                      </a>
                    </DetailRow>
                  )}
                </div>

                <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 space-y-2">
                  {selectedBooking.paymentStatus === "Approved" && selectedBooking.meetingLink && (
                    <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
                      <Video className="w-4 h-4" /> Join Meeting
                    </a>
                  )}
                  {/* {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
                    <div className="flex gap-2">
                      <button onClick={() => openPanel(selectedBooking, "reschedule")}
                        className="flex-1 py-2.5 rounded-lg font-medium text-sm text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
                        Reschedule
                      </button>
                      <button onClick={() => setPanelView("cancel")}
                        className="flex-1 py-2.5 rounded-lg font-medium text-sm text-red-500 border border-red-200 hover:bg-red-50 transition-all">
                        Cancel
                      </button>
                    </div>
                  )} */}
                </div>
              </>
            )}

            {panelView === "cancel" && (
              <>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <button onClick={() => setPanelView("details")} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-sm font-semibold text-slate-900">Cancel Booking</h2>
                  <button onClick={closePanel} className="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                    <p className="text-sm font-semibold text-slate-800">{getMentorName(selectedBooking)}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatCardDate(selectedBooking.sessionDate)} · {formatCardTime(selectedBooking.startTime)} · {selectedBooking.durationMinutes} min
                    </p>
                    {selectedBooking.isFreeSession && (
                      <p className="mt-2 text-xs font-medium text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Your free session will be restored
                      </p>
                    )}
                  </div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">
                    Reason for cancellation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please let us know why you're cancelling…"
                    rows={5}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-[DM Sans,sans-serif]
                               focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400
                               resize-none bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 flex gap-3">
                  <button onClick={() => { setPanelView("details"); setCancelReason(""); }}
                    className="flex-1 border border-slate-200 py-2.5 rounded-lg font-medium text-sm text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.97]">
                    Keep Booking
                  </button>
                  <button onClick={handleCancelBooking} disabled={isCancelling}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]">
                    {isCancelling
                      ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Cancelling…</span>
                      : "Yes, Cancel"
                    }
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ══ EDIT PREFERENCES MODAL ════════════════════════════════════════ */}
      <EditPreferencesModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModal(false)}
        onUpdate={handlePreferencesUpdate}
        initialData={profileData}
      />
    </main>
  );
}
