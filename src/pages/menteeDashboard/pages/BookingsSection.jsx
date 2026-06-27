


import React, { useState, useEffect, Fragment } from "react";
import {
  MapPin, Briefcase, X, CheckCircle2, ArrowLeft, ArrowRight,
  Star, Calendar, Clock, Video, CheckCircle, XCircle,
  Tag, FileText, Eye, AlertTriangle, User, Check,
  Loader2, ExternalLink, Zap, BadgeCheck, Phone, MessageCircle, CreditCard,Building2 
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

// GOOGLE FONT

if (typeof document !== "undefined" && !document.getElementById("dm-sans-font")) {
  const link = document.createElement("link");
  link.id = "dm-sans-font";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(link);
}

// CONSTANTS & HELPERS
const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

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

const TopicCell = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return <span className="text-gray-400">—</span>;

  const words = text.split(" ");
  const isLong = words.length > 20;
  const preview = words.slice(0, 20).join(" ");

  return (
    <div style={{ maxWidth: "200px" }}>
      {!expanded ? (
        <>
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-[#0098cc] text-xs">
            {isLong ? preview : text}
          </span>
          {isLong && (
            <button
              onClick={() => setExpanded(true)}
              className="text-[10px] text-gray-400 hover:text-[#0098cc] underline underline-offset-2 transition mt-0.5"
            >
              Read more
            </button>
          )}
        </>
      ) : (
        <>
          <span className="text-[#0098cc] text-xs leading-relaxed">{text}</span>
          <button
            onClick={() => setExpanded(false)}
            className="block text-[10px] text-gray-400 hover:text-[#0098cc] underline underline-offset-2 transition mt-0.5"
          >
            Read less
          </button>
        </>
      )}
    </div>
  );
};

const TopicPanelCell = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return <p className="text-sm font-medium text-[#0a1a22]">—</p>;

  const words = text.split(" ");
  const isLong = words.length > 60;
  const preview = words.slice(0, 60).join(" ");

  return (
    <div>
      <p className="text-sm font-medium text-[#0a1a22] leading-relaxed break-words">
        {!expanded && isLong ? preview + "…" : text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-[11px] text-gray-400 hover:text-[#0098cc] underline underline-offset-2 transition mt-1"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

const DAY_NAMES_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const formatSlotDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

const getSlotDayName = (d) => DAY_NAMES_FULL[new Date(d).getDay()];

const getSlotDateParts = (d) => {
  const dt = new Date(d);
  return { day: dt.getDate(), month: dt.toLocaleString("en-US", { month: "short" }), weekday: DAY_NAMES_SHORT[dt.getDay()] };
};

const menteeTypes = [
  "All Mentors", "Engineering Mentors", "Top Mentors", "Startup Mentors",
  "Product Mentors", "Marketing Mentors", "Leadership Mentors", "AI Mentors",
];

const STATUS_CONFIG = {
  Approved: { badge: "bg-green-50 text-green-600", label: "Confirmed", icon: CheckCircle },
  pending: { badge: "bg-amber-50 text-amber-600", label: "Pending", icon: Clock },
  cancelled: { badge: "bg-red-50 text-red-500", label: "Cancelled", icon: XCircle },
  completed: { badge: "bg-[#0098cc]/10 text-[#0098cc]", label: "Completed", icon: BadgeCheck },
  unattended: { badge: "bg-orange-50 text-orange-500", label: "Unattended", icon: AlertTriangle },
  expired: { badge: "bg-gray-100 text-gray-500", label: "Expired", icon: AlertTriangle }, // ← new

};

const getBookingStatusKey = (booking) => {
  if (booking.isExpired || booking.status === "expired") return "expired";
  if (booking.status === "cancelled") return "cancelled";
  return booking.paymentStatus || "pending";
};

const parseSessionStart = (booking) => {
  const date = new Date(booking.sessionDate);
  const time = (booking.startTime || "").toLowerCase().trim();
  let hours, minutes;
  if (time.includes("am") || time.includes("pm")) {
    const clean = time.replace(/am|pm/g, "").trim();
    [hours, minutes] = clean.split(":").map(Number);
    if (time.includes("pm") && hours !== 12) hours += 12;
    if (time.includes("am") && hours === 12) hours = 0;
  } else {
    [hours, minutes] = time.split(":").map(Number);
  }
  date.setHours(hours || 0, minutes || 0, 0, 0);
  return date;
};

// ═══════════════════════════════════════════════════════════════════════════
// MICRO COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function DetailRow({ icon: Icon, label, value, children }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <Icon className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
        {children || <p className="text-sm font-medium text-[#0a1a22] break-words">{value || "—"}</p>}
      </div>
    </div>
  );
}

// function MentorCard({ mentor, index, onViewProfile }) {
//   const initials = getInitials(mentor.fullName);
//   const hasImage = mentor.profilePhoto || mentor.profileImage;

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.05 }}
//       className="group bg-white rounded-xl border border-gray-200 overflow-hidden
//                  hover:border-[#0098cc] hover:shadow-md transition-all duration-200 font-[DM_Sans,sans-serif]
//                  flex items-stretch"
//       style={{ minHeight: '160px', maxHeight: '200px' }}
//     >
//       {/* LEFT: Image Section */}
//       <div className="relative w-[140px] sm:w-[180px] h-full bg-gray-100 flex-shrink-0 overflow-hidden">
//         {hasImage ? (
//           <>
//             <img
//               src={mentor.profilePhoto || mentor.profileImage}
//               alt={mentor.fullName}
//               className="w-full h-full object-cover object-center"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
//               }}
//             />
//             <div className="hidden w-full h-full bg-[#0098cc]/10 items-center justify-center">
//               <span className="text-3xl sm:text-4xl font-bold text-[#0098cc]">{initials}</span>
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-full bg-[#0098cc]/10 flex items-center justify-center">
//             <span className="text-3xl sm:text-4xl font-bold text-[#0098cc]">{initials}</span>
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-200" />
//       </div>

//       {/* RIGHT: Content Section */}
//       <div className="flex-1 flex flex-col justify-between p-3 sm:p-4 min-w-0">
//         <div className="mb-2">
//           <h3 className="font-semibold text-[#0a1a22] text-xs sm:text-sm leading-tight truncate">
//             {mentor.fullName || "Unknown Mentor"}
//           </h3>
//           <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 truncate">
//             {mentor.currentRole || "Mentor"}
//             {mentor.yearsOfExperience ? ` · ${mentor.yearsOfExperience}+ yrs` : ""}
//           </p>
//           {mentor.companyName && (
//             <p className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-400 mt-0.5 truncate">
//               <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
//               <span className="truncate">{mentor.companyName}</span>
//             </p>
//           )}
//         </div>
//         {mentor.guidanceAreas?.length > 0 && (
//           <div className="flex flex-wrap gap-1 mb-2">
//             {mentor.guidanceAreas.slice(0, 2).map((area, i) => (
//               <span key={i} className="inline-block text-[8px] bg-[#0098cc]/10 text-[#0098cc] px-1.5 py-0.5 rounded-sm truncate max-w-[80px]">
//                 {area}
//               </span>
//             ))}
//             {mentor.guidanceAreas.length > 2 && (
//               <span className="text-[8px] text-gray-400 px-1 py-0.5">+{mentor.guidanceAreas.length - 2}</span>
//             )}
//           </div>
//         )}
//         <button
//           onClick={() => onViewProfile(mentor)}
//           className="w-full py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs text-white bg-[#0a1a22]
//                      hover:bg-[#0098cc] transition-all duration-150 active:scale-[0.97]"
//         >
//           View Profile
//         </button>
//       </div>
//     </motion.article>
//   );
// }

// EDIT PREFERENCES MODAL


function MentorCard({ mentor, index, onViewProfile }) {
  const initials = getInitials(mentor.fullName);
  const hasImage = mentor.profilePhoto || mentor.profileImage;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden
                 hover:border-[#0098cc] hover:shadow-md transition-all duration-200 font-[DM_Sans,sans-serif]
                 flex items-stretch"
    >
      {/* LEFT: Image */}
      <div className="relative w-[120px] sm:w-[150px] flex-shrink-0 bg-gray-100 overflow-hidden">
        {hasImage ? (
          <>
            <img
              src={mentor.profilePhoto || mentor.profileImage}
              alt={mentor.fullName}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-[#0098cc]/10 items-center justify-center">
              <span className="text-3xl font-bold text-[#0098cc]">{initials}</span>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-[#0098cc]/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#0098cc]">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-200" />
      </div>

      {/* RIGHT: Content */}
      <div className="flex-1 flex flex-col justify-between p-3 sm:p-4 min-w-0">
        <div className="space-y-1.5">
          {/* Name */}
          <h3 className="font-semibold text-[#0a1a22] text-sm leading-tight">
            {mentor.fullName}
          </h3>

          {/* Role & Company */}

          {mentor.companyName && (
            <span className="flex items-center gap-1">
              <Building2 size={18} className="text-[#515762]" />
              {mentor.companyName}
            </span>
          )}

          {/* Experience & Rate */}
          <div className="flex items-center gap-2 flex-wrap">
            {mentor.yearsOfExperience && (
              <span className="text-[11px] text-[#515762]">
                {mentor.yearsOfExperience} years Experience
              </span>
            )}
            {mentor.hourlyRate && (
              <span className="text-[11px] text-[#515762] font-medium">
                ₹{mentor.hourlyRate}/Session
              </span>
            )}
          </div>

          {/* Mentoring Style */}
          {/* {mentor.mentoringStyle && (
            <span className="inline-block text-[10px] text-[#6b7280] px-2 py-0.5 border border-[#6b7280] rounded-sm  font-medium">
              {mentor.mentoringStyle}
            </span>
          )} */}


          {mentor.mentoringStyle && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-semibold text-[#515762]">
                Mentoring Style:
              </span>

              <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-[#515762] border border-[#6b7280] rounded-sm">
                {mentor.mentoringStyle}
              </span>
            </div>
          )}

          {/* Areas of Interest */}
          {mentor.areasOfInterest && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {mentor.areasOfInterest
                .split(",")
                .map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-[10px] font-medium rounded-sm
                     text-[#515762]
                     border border-[#515762]"
                  >
                    {interest.trim()}
                  </span>
                ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onViewProfile(mentor)}
          className="mt-3 w-full py-1.5 rounded-lg font-semibold text-[11px] sm:text-xs text-white bg-[#0a1a22]
                     hover:bg-[#0098cc] transition-all duration-150 active:scale-[0.97]"
        >
          View Profile
        </button>
      </div>
    </motion.article>
  );
}


function EditPreferencesModal({ isOpen, onClose, onUpdate, initialData }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", dateOfBirth: "", address: "", status: "", education: "", menteeType: ""
  });

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
    onUpdate(updated);
    onClose();
    toast.success("Preferences updated!");
  };

  const steps = [{ num: 1, label: "Personal" }, { num: 2, label: "Experience" }, { num: 3, label: "Preference" }];
  const inputBase = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0098cc]/20 focus:border-[#0098cc] transition-all placeholder:text-gray-400 font-[DM_Sans,sans-serif]";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 font-[DM_Sans,sans-serif]"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/30" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }} transition={{ duration: 0.2 }}
          className="relative z-10 w-full sm:max-w-md bg-white sm:rounded-2xl rounded-t-2xl border border-gray-200 overflow-hidden"
        >
          <div className="px-5 pt-5 pb-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-[#0a1a22] text-base">Update Preferences</h2>
                <p className="text-xs text-gray-400 mt-0.5">Refine your mentor recommendations</p>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              {steps.map((s, i) => (
                <Fragment key={s.num}>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all
                    ${step === s.num ? "bg-[#0098cc] text-white" : step > s.num ? "bg-[#0098cc]/10 text-[#0098cc]" : "bg-gray-100 text-gray-400"}`}>
                    {step > s.num ? <Check className="w-3 h-3" /> : null}
                    {s.label}
                  </div>
                  {i < steps.length - 1 && <div className={`flex-1 h-px ${step > s.num ? "bg-[#0098cc]/30" : "bg-gray-100"}`} />}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="px-5 py-5 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name *</label>
                    <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" className={inputBase} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth *</label>
                    <input type="date" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} className={inputBase} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Address *</label>
                    <textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2} placeholder="Your address" className={`${inputBase} resize-none`} />
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Current Status *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["fresher", "experienced"].map((s) => (
                        <button key={s} onClick={() => set("status", s)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all text-left flex items-center gap-2
                            ${form.status === s ? "border-[#0098cc] bg-[#0098cc]/10 text-[#0098cc]" : "border-gray-200 text-gray-600 hover:border-[#0098cc]/40"}`}>
                          {s === "fresher" ? "🎓" : "💼"}
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Highest Education *</label>
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
                  <p className="text-xs font-medium text-gray-600 mb-3">What type of mentor do you want?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {menteeTypes.map((type) => (
                      <button key={type} onClick={() => set("menteeType", type)}
                        className={`p-2.5 rounded-lg border text-left transition-all
                          ${form.menteeType === type ? "border-[#0098cc] bg-[#0098cc]/10" : "border-gray-200 hover:border-[#0098cc]/40 hover:bg-gray-50"}`}>
                        <span className={`text-xs font-medium ${form.menteeType === type ? "text-[#0098cc]" : "text-gray-600"}`}>{type}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-5 pb-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <button onClick={() => setStep((s) => s - 1)} disabled={step === 1}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < 3 ? (
              <button onClick={() => setStep((s) => s + 1)} disabled={(step === 1 && !ok1) || (step === 2 && !ok2)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#0098cc] hover:bg-[#0a1a22] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleUpdate} disabled={!ok3}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#0098cc] hover:bg-[#0a1a22] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <Check className="w-4 h-4" /> Save & Refresh
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// RESCHEDULE MODAL

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const now = new Date();
  const availableSlots = rawSlots
    .filter((s) => {
      if (s.isBooked) return false;
      const slotDate = new Date(s.date);
      slotDate.setHours(0, 0, 0, 0);
      if (slotDate > today) return true;
      if (slotDate.getTime() === today.getTime()) {
        const [h, m] = s.startTime.split(":").map(Number);
        const slotTime = new Date();
        slotTime.setHours(h, m, 0, 0);
        return slotTime > now;
      }
      return false;
    })
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
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[290] transition-all duration-300 bg-black/50 backdrop-blur-sm
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-200 pointer-events-none">
        <div className={`bg-white w-full sm:rounded-2xl rounded-t-2xl sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col
            border border-gray-200 font-[DM_Sans,sans-serif] pointer-events-auto transition-all duration-250 ease-out
            ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-gray-200 flex-shrink-0">
            <button onClick={onClose} className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-[#0a1a22] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-sm font-semibold text-[#0a1a22]">Reschedule Session</h2>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-[#0a1a22] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="mb-4 sm:mb-5 p-3 sm:p-3.5 rounded-xl bg-white border border-gray-200">
              <p className="text-xs text-gray-400 mb-1">Current Session</p>
              <p className="text-sm font-semibold text-[#0a1a22]">{getMentorName(booking)}</p>
              <p className="text-xs text-gray-500 mt-0.5">{fmtDate(booking.sessionDate)} at {formatCardTime(booking.startTime)}</p>
            </div>

            {step === "slots" && (
              <>
                <p className="text-sm font-medium text-[#0a1a22] mb-3">Choose a new slot</p>
                {slotsLoading && <div className="flex items-center justify-center py-12"><Loader2 className="w-5 h-5 animate-spin text-[#0098cc]" /></div>}
                {slotsError && <div className="text-center py-10 text-sm text-gray-400">Could not load slots.</div>}
                {!slotsLoading && !slotsError && availableSlots.length === 0 && (
                  <div className="text-center py-10 text-sm text-gray-400">No available slots right now.</div>
                )}
                {!slotsLoading && !slotsError && availableSlots.length > 0 && (
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {availableSlots.map((slot, idx) => {
                      const dp = getSlotDateParts(slot.date);
                      const mins = slotDuration(slot.startTime, slot.endTime);
                      return (
                        <button key={slot._id || idx} onClick={() => { setSelectedSlot(slot); setStep("confirm"); }}
                          className="text-left p-2.5 rounded-xl border border-gray-200 hover:border-[#0098cc] hover:bg-[#0098cc]/5 transition-all duration-150 w-full">
                          <div className="flex flex-col items-center gap-1.5 text-center">
                            <div className="w-full rounded-lg bg-[#0098cc]/10 flex flex-col items-center justify-center py-1.5">
                              <span className="text-[9px] font-bold uppercase text-[#0098cc]">{dp.month}</span>
                              <span className="text-lg font-bold text-[#0a1a22] leading-none">{dp.day}</span>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#0a1a22] text-center">{getSlotDayName(slot.date)}</p>
                              <p className="text-[10px] text-gray-500 text-center">{to12h(slot.startTime)}</p>
                              <p className="text-[10px] text-gray-500 text-center">— {to12h(slot.endTime)}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5 text-center">{mins} min</p>
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
                <p className="text-sm font-medium text-[#0a1a22] mb-4">Confirm Reschedule</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-[10px] text-gray-400 mb-1.5 uppercase font-semibold tracking-wide">Current</p>
                    <p className="text-sm font-semibold text-[#0a1a22]">{formatCardDate(booking.sessionDate)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatCardTime(booking.startTime)}</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#0098cc]/10 border border-[#0098cc]/30">
                    <p className="text-[10px] text-[#0098cc] mb-1.5 uppercase font-semibold tracking-wide">New Slot</p>
                    <p className="text-sm font-semibold text-[#0a1a22]">{formatSlotDate(selectedSlot.date)}</p>
                    <p className="text-xs text-[#0098cc] mt-0.5">{to12h(selectedSlot.startTime)} — {to12h(selectedSlot.endTime)}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  Your current slot will be released and the new one reserved. Updated calendar invites will be sent via email.
                </p>
              </div>
            )}
          </div>

          {step === "confirm" && selectedSlot && (
            <div className="border-t border-gray-200 px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between bg-white rounded-b-2xl flex-shrink-0">
              <button onClick={() => setStep("slots")} className="text-sm text-gray-400 hover:text-[#0a1a22] transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Change Slot
              </button>
              <button onClick={handleConfirm} disabled={isRescheduling}
                className="flex items-center gap-2 text-white py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg font-semibold text-sm
                  bg-[#0a1a22] hover:bg-[#0098cc] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                {isRescheduling ? <><Loader2 className="w-4 h-4 animate-spin" /> Rescheduling…</> : <><Check className="w-4 h-4" /> Confirm Reschedule</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function BookingCard({
  booking, onOpenPanel,
  getMentorName, getMentorSubtitle,
  formatCardDate, formatCardTime, index, serialNo
}) {
  const mentorName = getMentorName(booking);
  const mentorSubtitle = getMentorSubtitle(booking);
  const topic = booking.topic || booking.sessionType || "Mentorship Session";
  const statusCfg = STATUS_CONFIG[getBookingStatusKey(booking)] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;
  const TD = "px-4 py-3.5 text-xs align-middle";

  const isJoinDisabled =
    booking.status === "cancelled" ||
    booking.isExpired ||
    booking.status === "expired";

  return (
    <tr className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150 font-[DM_Sans,sans-serif]">

      {/* # */}
      <td className={`${TD} font-medium text-gray-400 text-center`} style={{ width: "40px" }}>
        {serialNo}
      </td>



      {/* Topic */}
      <td className={`${TD}`} style={{ minWidth: "110px", maxWidth: "200px", whiteSpace: "normal" }}>
        <TopicCell text={topic} />
      </td>
      {/* Date */}
      <td className={`${TD} text-gray-500`} style={{ whiteSpace: "nowrap", minWidth: "100px" }}>
        {formatCardDate(booking.sessionDate)}
      </td>

      {/* Time */}
      <td className={`${TD} font-medium text-[#0098cc]`} style={{ whiteSpace: "nowrap", minWidth: "100px" }}>
        {formatCardTime(booking.startTime) || "TBD"} · {booking.durationMinutes || 30}m
      </td>

      {/* Status */}
      <td className={`${TD}`} style={{ minWidth: "110px" }}>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap `}>
          {/* <StatusIcon className="w-2.5 h-2.5" /> */}
          {statusCfg.label}
        </span>
      </td>

      {/* Actions */}
      <td className={`${TD} text-right`} >
        <div className="inline-flex items-center gap-1.5">
          <button
            onClick={() => onOpenPanel(booking, "details")}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0a1a22] hover:bg-[#0098cc] active:scale-[0.97] transition-all whitespace-nowrap"
          >
            <Eye className="w-3 h-3" /> View
          </button>
          {/* 
          {isJoinDisabled ? (
            <span
              title={booking.status === "cancelled" ? "Session cancelled" : "Session expired"}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 border border-gray-200 cursor-not-allowed whitespace-nowrap select-none"
            >
              <Video className="w-3 h-3" /> Join
            </span>
          ) : (
            booking.meetingLink && (

              <a href={booking.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0098cc] border border-[#0098cc]/30 hover:bg-[#0098cc]/10 transition-all whitespace-nowrap"
              >
                <Video className="w-3 h-3" /> Join
              </a>
            )
          )} */}
        </div>
      </td>
    </tr >
  );
}

// SIDEBAR WIDGETS

function SidebarWidgets({ navigate }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-[#0a1a22]">Book trials</p>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          Explore from a list of 600+ mentors, book trials and find the perfect mentor for you.
        </p>
        <button
          onClick={() => navigate("/explore-mentors")}
          className="mt-3.5 w-full py-2 rounded-lg bg-[#0a1a22] text-white text-xs font-semibold hover:bg-[#0098cc] active:scale-[0.98] transition-all duration-150"
        >
          Explore All Mentors
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-[#0a1a22] leading-snug">Confused about which plan is right for you?</p>
        <p className="text-xs text-gray-400 mt-1.5">Reach out to your Relationship Manager today!</p>
        <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-gray-100">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#0a1a22]">Karrivo</p>
            <p className="text-[11px] text-gray-400">+91 123456789</p>
          </div>
          <div className="flex items-center gap-1.5">
            <a href="https://wa.me/919311484346" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#0098cc]/10 flex items-center justify-center hover:bg-[#0098cc]/20 transition-colors">
              <MessageCircle className="w-3.5 h-3.5 text-[#0098cc]" />
            </a>
            <a href="tel:+919311484346"
              className="w-7 h-7 rounded-full bg-[#0a1a22]/10 flex items-center justify-center hover:bg-[#0a1a22]/20 transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#0a1a22]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// MAIN DASHBOARD

export default function BookingsDashboard() {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [getMentors, { data: mentorsData, isLoading: mentorsLoading, isError: mentorsError }] =
    useGetMentorsListMutation();
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setEditModal] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { data: bookingsData, isLoading: bookingsLoading, isError: bookingsError } =
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
  }, [getMentors]);

  useEffect(() => {
    const anyOpen = rescheduleOpen || panelOpen || isEditModalOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panelOpen, rescheduleOpen, isEditModalOpen]);

  const mentorsList = Array.isArray(mentorsData)
    ? mentorsData
    : Array.isArray(mentorsData?.mentors)
      ? mentorsData.mentors
      : Array.isArray(mentorsData?.data) ? mentorsData.data : [];

  const filtered = mentorsList.filter((m) => {
    const q = search.toLowerCase();
    return !search || m.fullName?.toLowerCase().includes(q) || m.currentRole?.toLowerCase().includes(q);
  });

  const bookings = (bookingsData?.data || []).filter(
    b => !b.isExpired && b.status !== "expired"
  );



  const getMentorName = (b) => b?.mentorName ?? "";
  const getMentorInitials = (b) => getMentorName(b).slice(0, 2).toUpperCase();
  const getMentorRole = (b) => typeof b.mentorId === "object" ? b.mentorId?.currentRole || "" : "";
  const getMentorCompany = (b) => typeof b.mentorId === "object" ? b.mentorId?.companyName || "" : "";
  const getMentorSubtitle = (b) => { const r = getMentorRole(b), c = getMentorCompany(b); return c && r ? `${c} · ${r}` : c || r || ""; };
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const formatCardDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatCardTime = (t) => t ? t.split("-")[0].trim() : "";

  // const getPanelCanJoin = (booking) => {
  //   if (!booking) return false;
  //   const pStart = parseSessionStart(booking);
  //   const pEnd = new Date(pStart.getTime() + (booking.durationMinutes || 30) * 60000);
  //   const joinableFrom = new Date(pStart.getTime() + 10 * 60 * 1000);
  //   const now = new Date();
  //   return now >= joinableFrom && now <= pEnd;
  // };

  const getPanelCanJoin = (booking) => {
    if (!booking) return false;
    const pStart = parseSessionStart(booking);
    const pEnd = new Date(pStart.getTime() + (booking.durationMinutes || 30) * 60000);
    const joinableFrom = new Date(pStart.getTime() - 10 * 60 * 1000);
    const now = new Date();
    return now >= joinableFrom && now <= pEnd;
  };


  const openPanel = (booking, view = "details") => {
    if (view === "reschedule") {
      setPanelOpen(false);
      setTimeout(() => { setRescheduleTarget(booking); setRescheduleOpen(true); }, 250);
      return;
    }
    setSelectedBooking(booking);
    setPanelView(view);
    setPanelOpen(true);
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
    if (!cancelReason.trim()) { toast.warning("Please provide a reason."); return; }
    try {
      await cancelBooking({ bookingId: selectedBooking._id, reason: cancelReason }).unwrap();
      toast.success(selectedBooking.isFreeSession ? "Booking cancelled. Free session restored!" : "Booking cancelled.");
      closePanel();
    } catch (err) { toast.error("Failed to cancel: " + (err?.data?.message || "Please try again.")); }
  };

  const handleCompletePayment = (booking) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    navigate("/payment", {
      state: {
        bookingNumber: booking.bookingId,
        mentorId: typeof booking.mentorId === "object" ? booking.mentorId?._id : booking.mentorId,
        mentorName: getMentorName(booking),
        mentorRole: getMentorRole(booking),
        menteeId: userData._id,
        menteeName: userData.name || userData.fullName || "",
        paymentType: "bookingsession",
        bookingId: booking._id,
        basePrice: Number(String(booking.price).replace(/[^0-9.]/g, "")) || 0
      },
    });
  };

  const handleRescheduleBooking = async ({ bookingId, bookedMeetingSlot }) => {
    try {
      await rescheduleBooking({ bookingId, bookedMeetingSlot }).unwrap();
      toast.success("Booking rescheduled successfully!");
      closeReschedule();
      closePanel();
    } catch (err) { toast.error("Failed to reschedule: " + (err?.data?.message || "Please try again.")); }
  };

  const handlePreferencesUpdate = (updated) => {
    setProfileData(updated);
    localStorage.setItem("profileData", JSON.stringify(updated));
    getMentors({ menteeType: updated.menteeType });
  };

  const handleViewProfile = (mentor) => {
    navigate(`/mentor-profile/${mentor.userId}`);
  };

  const statusCounts = {
    unattended: bookings.filter(b => b.paymentStatus === "unattended").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  return (
    <main className="bg-white font-[DM_Sans,sans-serif] min-h-screen">
      <ToastContainer position="bottom-right" autoClose={3500} theme="light" />

      <div className="w-full px-3 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-[#0a1a22]">Recommended Mentors</p>
            </div>

            {mentorsLoading && <div className="py-10 flex justify-center"><Loader /></div>}
            {mentorsError && <div className="text-center py-10 text-sm text-gray-400">Failed to load mentors. Please refresh.</div>}
            {!mentorsLoading && !mentorsError && filtered.length === 0 && (
              <div className="text-center py-10 text-sm text-gray-400">No mentors found.</div>
            )}
            {!mentorsLoading && !mentorsError && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full mb-6">
                {filtered.map((mentor, i) => (
                  <MentorCard key={mentor._id || i} mentor={mentor} index={i} onViewProfile={handleViewProfile} />
                ))}
              </div>
            )}


            {!bookingsLoading && !bookingsError && bookings.length === 0 && (
              <div className="border border-gray-200 rounded-xl p-4 mb-4 sm:mb-5 bg-white mt-3 sm:mt-4">
                <p className="text-sm font-semibold text-[#0a1a22]">No Upcoming Trial Bookings</p>
                <p className="text-sm text-gray-500 mt-0.5">Book one from mentors recommended for you</p>
              </div>
            )}

            {bookingsLoading && <div className="py-16 flex justify-center"><Loader /></div>}


            {bookings.length > 0 && (
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[#0a1a22]">Session Details</p>
              </div>
            )}


            {!bookingsLoading && !bookingsError && bookings.length > 0 && (
              <div className="bg-white border border-gray-200  shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <table className="w-full" >
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wide min-w-[120px]">S No</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide min-w-[120px]">Topic</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide min-w-[100px]">Date</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide min-w-[110px]">Time</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide min-w-[110px] ">Status</th>
                        <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wide min-w-[110px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <BookingCard
                          key={booking._id}
                          booking={booking}
                          serialNo={index + 1}
                          onOpenPanel={openPanel}
                          getMentorName={getMentorName}
                          getMentorInitials={getMentorInitials}
                          getMentorSubtitle={getMentorSubtitle}
                          formatCardDate={formatCardDate}
                          formatCardTime={formatCardTime}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
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

      {/* Side Panel Backdrop */}
      <div
        onClick={closePanel}
        className={`fixed inset-0 z-[60] transition-all duration-200 bg-black/20 backdrop-blur-sm
    ${panelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Session Details Side Panel */}
      <div className={
        `fixed top-0 bottom-0 right-0 z-[70] bg-white
w-full sm:w-[380px] md:w-[400px]
transform transition-transform duration-250 ease-out
flex flex-col border-l border-gray-200 shadow-xl font-[DM_Sans,sans-serif]
${panelOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        {selectedBooking && (
          <>
            {panelView === "details" && (
              <>
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-gray-100 flex-shrink-0">
                  <button onClick={closePanel} className="text-gray-300 hover:text-[#0098cc] transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="text-sm font-semibold text-[#0a1a22]">Session Details</h2>
                </div>

                <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-gray-100 flex-shrink-0">

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0a1a22] pl-10 truncate">Mentor Name :- {getMentorName(selectedBooking)}</p>
                    <p className="text-xs text-gray-400 truncate">{getMentorSubtitle(selectedBooking)}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 h-0 min-h-0">
                  <DetailRow icon={Calendar} label="Date" value={formatDate(selectedBooking.sessionDate)} />
                  <DetailRow icon={Clock} label="Time" value={`${selectedBooking.startTime} · ${selectedBooking.durationMinutes} min`} />
                  <DetailRow icon={Tag} label="Session Type" value={selectedBooking.sessionType} />
                  <DetailRow icon={FileText} label="Topic">
                    <TopicPanelCell text={selectedBooking.topic} />
                  </DetailRow>
                </div>

                <div className="flex-shrink-0 px-4 sm:px-5 py-3.5 sm:py-4 border-t border-gray-100 space-y-2">
                  {selectedBooking.paymentStatus === "unpaid" && !selectedBooking.isExpired && selectedBooking.status !== "cancelled" && (

                    <button onClick={() => handleCompletePayment(selectedBooking)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#0a1a22] hover:bg-[#0098cc] transition-colors">
                      <CreditCard className="w-4 h-4" /> Complete Payment
                    </button>
                  )}

                  {selectedBooking.paymentStatus === "Approved" && selectedBooking.meetingLink && !selectedBooking.isExpired && selectedBooking.status !== "cancelled" && (
                    getPanelCanJoin(selectedBooking) ? (
                      <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#0a1a22] hover:bg-[#0098cc] transition-colors">
                        <Video className="w-4 h-4" /> Join Meeting
                      </a>
                    ) : (
                      <button disabled title="Join enables 10 minutes after session starts"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#0a1a22] opacity-40 cursor-not-allowed">
                        <Video className="w-4 h-4" /> Not Started Yet
                      </button>
                    )
                  )}

                  {(selectedBooking.paymentStatus === "Approved" || selectedBooking.paymentStatus === "pending") &&
                    !selectedBooking.isExpired &&
                    selectedBooking.status !== "cancelled" && (
                      <button onClick={() => openPanel(selectedBooking, "reschedule")}
                        className="w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#0a1a22] hover:bg-[#0098cc] transition-colors">
                        Reschedule
                      </button>
                    )}

                  {(selectedBooking.paymentStatus === "Approved" || selectedBooking.paymentStatus === "pending") &&
                    !selectedBooking.isExpired &&
                    selectedBooking.status !== "cancelled" &&
                    !getPanelCanJoin(selectedBooking) && (
                      <button onClick={() => setPanelView("cancel")}
                        className="w-full py-2.5 rounded-lg font-semibold text-sm text-[#0a1a22] bg-white border border-gray-200 hover:border-[#0098cc] hover:text-[#0098cc] transition-colors">
                        Cancel Booking
                      </button>
                    )}
                </div>
              </>
            )}

            {panelView === "cancel" && (
              <>
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-gray-100 flex-shrink-0">
                  <button onClick={() => setPanelView("details")} className="text-gray-400 hover:text-[#0098cc] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-sm font-semibold text-[#0a1a22]">Cancel Booking</h2>
                  <button onClick={closePanel} className="ml-auto text-gray-300 hover:text-[#0098cc] transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200 mb-4">
                    <p className="text-sm font-semibold text-[#0a1a22]">{getMentorName(selectedBooking)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatCardDate(selectedBooking.sessionDate)} · {formatCardTime(selectedBooking.startTime)} · {selectedBooking.durationMinutes} min
                    </p>
                    {selectedBooking.isFreeSession && (
                      <p className="mt-2 text-xs font-medium text-[#0098cc] flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Your free session will be restored
                      </p>
                    )}
                  </div>

                  <label className="block text-xs font-medium text-[#0a1a22] mb-2">
                    Reason for cancellation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please let us know why you're cancelling…"
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none bg-white transition-all placeholder:text-gray-400 outline-none focus:border-[#0098cc]"
                  />
                </div>

                <div className="flex-shrink-0 px-4 sm:px-5 py-3.5 sm:py-4 border-t border-gray-100 flex gap-3">
                  <button onClick={() => { setPanelView("details"); setCancelReason(""); }}
                    className="flex-1 py-2.5 rounded-lg font-medium text-sm text-[#0a1a22] bg-white border border-gray-200 hover:border-[#0098cc] hover:text-[#0098cc] transition-colors">
                    Keep Booking
                  </button>
                  <button onClick={handleCancelBooking} disabled={isCancelling}
                    className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-white bg-[#0a1a22] hover:bg-[#0098cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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

      <EditPreferencesModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModal(false)}
        onUpdate={handlePreferencesUpdate}
        initialData={profileData}
      />
      <style>{`
        * {
          scrollbar-width: none;       /* Firefox */
          -ms-overflow-style: none;    /* old Edge / IE */
        }
        *::-webkit-scrollbar {
          display: none;               /* Chrome, Safari, new Edge */
        }
      `}</style>
    </main>
  );
}
