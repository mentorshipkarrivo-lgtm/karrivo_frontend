

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart, Calendar, MapPin, Award, GraduationCap, Globe, Star,
  MessageCircle, CheckCircle, ExternalLink, Zap, ChevronLeft,
  ChevronRight, Clock, Briefcase, FileText, BadgeCheck, Video, Users,
  Building2, School, CalendarDays, Linkedin, X, Menu, ArrowLeft, BookOpen,
  Timer, GraduationCap as GradCap, Eye, EyeOff, Pencil, Trash2, Check
} from "lucide-react";
import Cookies from "js-cookie";
import {
  useFetchMentorByIdQuery,
  useFetchMentorReviewsQuery,
  useSubmitReviewMutation,
} from "../../topMentors/Mentorsectionapislice";
import BookingModal from "./BookingModal";
import Loader from "../../../global/Loader";
import logo from "../../../assets/karrivoSymbol.png";

/* ── Design tokens ── */
const PRIMARY = "#1a1a2e";
const ACCENT = "#0098cc";
const WHITE = "#ffffff";
const BANNER_BG = "#1a1a2e";

/* ── Devicon skill map ── */
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SKILL_ICON_MAP = {
  "react": `${DI}/react/react-original.svg`, "react js": `${DI}/react/react-original.svg`,
  "react.js": `${DI}/react/react-original.svg`, "reactjs": `${DI}/react/react-original.svg`,
  "react native": `${DI}/react/react-original.svg`, "next": `${DI}/nextjs/nextjs-original.svg`,
  "next js": `${DI}/nextjs/nextjs-original.svg`, "next.js": `${DI}/nextjs/nextjs-original.svg`,
  "nextjs": `${DI}/nextjs/nextjs-original.svg`, "vue": `${DI}/vuejs/vuejs-original.svg`,
  "vue.js": `${DI}/vuejs/vuejs-original.svg`, "vuejs": `${DI}/vuejs/vuejs-original.svg`,
  "angular": `${DI}/angularjs/angularjs-original.svg`, "svelte": `${DI}/svelte/svelte-original.svg`,
  "node": `${DI}/nodejs/nodejs-original.svg`, "node.js": `${DI}/nodejs/nodejs-original.svg`,
  "nodejs": `${DI}/nodejs/nodejs-original.svg`, "express": `${DI}/express/express-original.svg`,
  "express.js": `${DI}/express/express-original.svg`,
  "javascript": `${DI}/javascript/javascript-original.svg`, "js": `${DI}/javascript/javascript-original.svg`,
  "typescript": `${DI}/typescript/typescript-original.svg`, "ts": `${DI}/typescript/typescript-original.svg`,
  "graphql": `${DI}/graphql/graphql-plain.svg`, "mongodb": `${DI}/mongodb/mongodb-original.svg`,
  "mysql": `${DI}/mysql/mysql-original.svg`, "sql": `${DI}/mysql/mysql-original.svg`,
  "postgresql": `${DI}/postgresql/postgresql-original.svg`, "postgres": `${DI}/postgresql/postgresql-original.svg`,
  "redis": `${DI}/redis/redis-original.svg`, "firebase": `${DI}/firebase/firebase-plain.svg`,
  "python": `${DI}/python/python-original.svg`, "java": `${DI}/java/java-original.svg`,
  "c++": `${DI}/cplusplus/cplusplus-original.svg`, "cpp": `${DI}/cplusplus/cplusplus-original.svg`,
  "c#": `${DI}/csharp/csharp-original.svg`, "go": `${DI}/go/go-original.svg`,
  "golang": `${DI}/go/go-original.svg`, "rust": `${DI}/rust/rust-plain.svg`,
  "php": `${DI}/php/php-original.svg`, "ruby": `${DI}/ruby/ruby-original.svg`,
  "swift": `${DI}/swift/swift-original.svg`, "kotlin": `${DI}/kotlin/kotlin-original.svg`,
  "dart": `${DI}/dart/dart-original.svg`, "django": `${DI}/django/django-plain.svg`,
  "flask": `${DI}/flask/flask-original.svg`, "spring": `${DI}/spring/spring-original.svg`,
  "spring boot": `${DI}/spring/spring-original.svg`, "flutter": `${DI}/flutter/flutter-original.svg`,
  "fastapi": `${DI}/fastapi/fastapi-original.svg`,
  "aws": `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "azure": `${DI}/azure/azure-original.svg`, "gcp": `${DI}/googlecloud/googlecloud-original.svg`,
  "google cloud": `${DI}/googlecloud/googlecloud-original.svg`,
  "docker": `${DI}/docker/docker-original.svg`, "kubernetes": `${DI}/kubernetes/kubernetes-plain.svg`,
  "linux": `${DI}/linux/linux-original.svg`, "git": `${DI}/git/git-original.svg`,
  "github": `${DI}/github/github-original.svg`, "gitlab": `${DI}/gitlab/gitlab-original.svg`,
  "html": `${DI}/html5/html5-original.svg`, "css": `${DI}/css3/css3-original.svg`,
  "sass": `${DI}/sass/sass-original.svg`, "tailwind": `${DI}/tailwindcss/tailwindcss-plain.svg`,
  "bootstrap": `${DI}/bootstrap/bootstrap-original.svg`, "figma": `${DI}/figma/figma-original.svg`,
  "tensorflow": `${DI}/tensorflow/tensorflow-original.svg`, "pytorch": `${DI}/pytorch/pytorch-original.svg`,
  "pandas": `${DI}/pandas/pandas-original.svg`, "numpy": `${DI}/numpy/numpy-original.svg`,
  "vite": `${DI}/vite/vite-original.svg`, "jest": `${DI}/jest/jest-plain.svg`,
  "postman": `${DI}/postman/postman-original.svg`,
};
const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

/* ── Helpers ── */
const toYMD = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dy}`;
};
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const isAuthError = (error) => {
  if (!error) return false;
  const data = error?.data || error;
  return data?.status_code === 400 || data?.status_code === 401 ||
    data?.message === "Auth Token is required" ||
    error?.status === 401 || error?.status === 400;
};

const formatExpDate = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parts[1] ? parseInt(parts[1], 10) : null;
  if (!month) return year;
  const abbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${abbr[month - 1]} ${year.slice(2)}`;
};

/* ── LinkedIn SVG icon ── */
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ── Company initials chip ── */
const CompanyIcon = ({ companyName }) => {
  const initials = companyName
    ? companyName.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "CO";
  const colors = ["#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0098cc"];
  const idx = companyName ? companyName.charCodeAt(0) % colors.length : 0;
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-black"
      style={{ background: colors[idx], fontFamily: "Cambria" }}
    >
      {initials}
    </div>
  );
};

/* ── Work Experience Item ── */
const ExperienceItem = ({ exp, isLast }) => {
  const [expanded, setExpanded] = useState(false);
  const DESC_LIMIT = 180;
  const desc = exp.description || "";
  const isLong = desc.length > DESC_LIMIT;
  const displayDesc = expanded || !isLong ? desc : desc.slice(0, DESC_LIMIT) + "…";
  const startLabel = formatExpDate(exp.startDate);
  const endLabel = exp.currentlyWorking ? "Present" : formatExpDate(exp.endDate);
  const dateRange = [startLabel, endLabel].filter(Boolean).join(" - ");

  return (
    <div className={`flex flex-col sm:flex-row gap-1 sm:gap-5 py-5 sm:py-6 ${!isLast ? "border-b border-gray-100" : ""}`}>
      <div className="sm:w-[130px] flex-shrink-0 pt-0.5">
        {dateRange && (
          <span className="text-xs sm:text-sm text-gray-400 font-medium leading-snug" style={{ fontFamily: "Cambria" }}>
            {dateRange}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {exp.designation && (
          <p className="text-sm sm:text-base font-bold text-gray-900 leading-snug mb-1.5" style={{ fontFamily: "Cambria" }}>
            {exp.designation}
          </p>
        )}
        {exp.companyName && (
          <div className="flex items-center gap-2.5 mb-2.5">
            <CompanyIcon companyName={exp.companyName} />
            <span className="text-sm sm:text-base font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>
              {exp.companyName}
            </span>
          </div>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-2.5">
          {exp.employmentType && (
            <span className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: "Cambria" }}>{exp.employmentType}</span>
          )}
          {exp.location && (
            <span className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: "Cambria" }}>· {exp.location}</span>
          )}
        </div>
        {desc && (
          <div>
            <p className="text-sm leading-7 text-gray-500" style={{ fontFamily: "Cambria" }}>{displayDesc}</p>
            {isLong && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-sm font-bold hover:underline mt-1.5"
                style={{ color: ACCENT, fontFamily: "Cambria" }}
              >
                {expanded ? "read less" : "read more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Skill Chip ── */
const SkillChip = ({ skill }) => {
  const icon = getSkillIcon(skill);
  const [imgErr, setImgErr] = useState(false);
  return (
    <span
      style={{ fontFamily: "Cambria" }}
      className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-gray-800 text-xs sm:text-sm font-semibold max-w-full"
    >
      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        {icon && !imgErr ? (
          <img src={icon} alt={skill} className="w-4 h-4 object-contain" onError={() => setImgErr(true)} />
        ) : (
          <span className="w-4 h-4 flex items-center justify-center text-white text-[8px] font-black rounded"
            style={{ background: PRIMARY }}>
            {skill.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap leading-none truncate">{skill}</span>
    </span>
  );
};

/* ── Mini Calendar ── */
const MiniMonthCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const firstAvailableMonth = useMemo(() => {
    if (availableDates.size === 0) return new Date(today.getFullYear(), today.getMonth(), 1);
    const todayYMD = toYMD(todayStart);
    const upcoming = Array.from(availableDates).filter((d) => d >= todayYMD).sort();
    if (upcoming.length === 0) return new Date(today.getFullYear(), today.getMonth(), 1);
    const first = new Date(upcoming[0] + "T00:00:00");
    return new Date(first.getFullYear(), first.getMonth(), 1);
  }, [availableDates]);

  const [viewMonth, setViewMonth] = useState(firstAvailableMonth);
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div className="w-full select-none" style={{ fontFamily: "Cambria" }}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewMonth(new Date(year, month - 1, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <ChevronLeft size={15} className="text-gray-600" />
        </button>
        <span className="text-sm sm:text-base font-bold text-gray-900 text-center truncate px-1">{MONTH_NAMES[month]} {year}</span>
        <button
          onClick={() => setViewMonth(new Date(year, month + 1, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <ChevronRight size={15} className="text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-center text-xs font-bold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const ymd = toYMD(day);
          const isPast = day < todayStart;
          const isAvail = availableDates.has(ymd) && !isPast;
          const isSel = selectedDate === ymd;
          const isToday = ymd === toYMD(today);
          return (
            <button
              key={ymd}
              disabled={!isAvail}
              onClick={() => isAvail && onSelectDate(isSel ? null : ymd)}
              className="relative mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-150"
              style={{
                background: isSel ? PRIMARY : "transparent",
                color: isSel ? WHITE : isAvail ? ACCENT : "#d1d5db",
                cursor: isAvail ? "pointer" : "default",
                fontWeight: isAvail ? 700 : 400,
                outline: isToday && isAvail && !isSel ? `2px solid ${ACCENT}` : "none",
                fontFamily: "Cambria",
              }}
            >
              {day.getDate()}
              {isAvail && !isSel && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: ACCENT }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ── Inline Booking Section ── */
const InlineBookingSection = ({ mentor, rawAvailability, onClose, onSlotConfirmed }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const grouped = useMemo(() => {
    if (!rawAvailability?.length) return {};
    const acc = {};
    for (const slot of rawAvailability) {
      const dk = slot.date.slice(0, 10);
      if (!acc[dk]) acc[dk] = [];
      acc[dk].push({ _id: slot._id, date: dk, startTime: slot.startTime, endTime: slot.endTime, isBooked: slot.isBooked });
    }
    return acc;
  }, [rawAvailability]);

  const availableDatesSet = useMemo(() => new Set(Object.keys(grouped)), [grouped]);
  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const slots = grouped[selectedDate] || [];
    const todayYMD = toYMD(new Date());
    if (selectedDate !== todayYMD) return slots;

    const now = new Date();
    return slots.filter(slot => {
      const [h, m] = slot.startTime.split(":").map(Number);
      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);
      return slotTime > now;
    });
  }, [selectedDate, grouped])
  useEffect(() => {
    if (availableDatesSet.size > 0 && !selectedDate)
      setSelectedDate(Array.from(availableDatesSet).sort()[0]);
  }, [availableDatesSet]);

  const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";

  return (
    <div className="animate-[slideInRight_0.35s_cubic-bezier(0.22,1,0.36,1)_forwards] w-full" style={{ fontFamily: "Cambria" }}>
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg text-sm font-bold border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap flex-shrink-0"
          style={{ fontFamily: "Cambria" }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 truncate" style={{ fontFamily: "Cambria" }}>
          Book a Trial Session
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row border border-gray-200 rounded-xl overflow-hidden w-full">
        <div className="w-full lg:w-[290px] xl:w-[310px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 sm:p-5 flex flex-col gap-4 sm:gap-5">
          <div className="pb-4 sm:pb-5 border-b border-gray-200">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-200 overflow-hidden mb-3">
              {mentor.profilePhoto || mentor.profileImage ? (
                <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-base font-black text-white"
                  style={{ background: PRIMARY, fontFamily: "Cambria" }}>{initials}</div>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate" style={{ fontFamily: "Cambria" }}>
              {mentor.fullName}
            </h3>
            {mentor.currentRole && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate" style={{ fontFamily: "Cambria" }}>
                {mentor.currentRole}{mentor.companyName ? ` · ${mentor.companyName}` : ""}
              </p>
            )}
          </div>
          <div className="pb-4 sm:pb-5 border-b border-gray-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600" style={{ fontFamily: "Cambria" }}>
              <Video size={14} style={{ color: ACCENT }} className="flex-shrink-0" />
              <span>Zoom link added after booking</span>
            </div>
          </div>
          <MiniMonthCalendar
            availableDates={availableDatesSet}
            selectedDate={selectedDate}
            onSelectDate={(dk) => { setSelectedDate(dk); setSelectedSlot(null); }}
          />
        </div>

        <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
          <div className="flex-1 p-4 sm:p-5 md:p-6 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4 sm:mb-5" style={{ fontFamily: "Cambria" }}>
              Select an appointment time
            </h3>
            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <Calendar size={36} className="text-gray-200 mb-3" />
                <p className="text-sm sm:text-base text-gray-400" style={{ fontFamily: "Cambria" }}>
                  {availableDatesSet.size === 0 ? "No details available" : "Select a date from the calendar"}
                </p>
              </div>
            ) : slotsForSelectedDate.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <Clock size={36} className="text-gray-200 mb-3" />
                <p className="text-sm sm:text-base text-gray-400" style={{ fontFamily: "Cambria" }}>No slots for this date</p>
                <button onClick={() => setSelectedDate(null)} className="mt-3 text-sm font-bold hover:underline"
                  style={{ color: ACCENT, fontFamily: "Cambria" }}>Choose another date</button>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.25s_ease_forwards]">
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-semibold mb-4" style={{ fontFamily: "Cambria" }}>
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "long", month: "long", day: "numeric", year: "numeric"
                  })}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
                  {slotsForSelectedDate.map((slot) => {
                    const chosen = selectedSlot?._id === slot._id;
                    return (
                      <button
                        key={slot._id}
                        onClick={() => !slot.isBooked && setSelectedSlot(chosen ? null : slot)}
                        disabled={slot.isBooked}
                        className="py-2.5 sm:py-3 px-2 sm:px-2.5 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-150 relative min-w-0 truncate disabled:cursor-not-allowed"
                        style={{
                          background: chosen ? PRIMARY : WHITE,
                          color: chosen ? WHITE : slot.isBooked ? "#9ca3af" : ACCENT,
                          borderColor: chosen ? PRIMARY : slot.isBooked ? "#e5e7eb" : ACCENT,
                          fontFamily: "Cambria",
                          opacity: slot.isBooked ? 0.5 : 1,
                        }}
                      >
                        {slot.startTime}
                        {slot.isBooked && !chosen && (
                          <span className="absolute top-0.5 right-0.5 text-[9px] font-bold px-1 rounded"
                            style={{ border: "1px solid #e5e7eb", color: "#92400e", fontFamily: "Cambria" }}>
                            Booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedSlot && (
                  <div className="animate-[fadeIn_0.25s_ease_forwards] mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>
                        Selected: <span className="font-bold" style={{ color: PRIMARY }}>{selectedSlot.startTime}</span>
                        {selectedSlot.endTime && <span className="text-gray-400"> – {selectedSlot.endTime}</span>}
                        {selectedSlot.isBooked && <span className="ml-2 text-amber-600 font-semibold">(Already Booked)</span>}
                      </p>
                    </div>
                    <button
                      onClick={() => onSlotConfirmed(selectedSlot)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-11 px-5 sm:px-6 rounded-lg text-sm sm:text-base font-bold border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95 whitespace-nowrap flex-shrink-0"
                      style={{ fontFamily: "Cambria" }}
                    >
                      Confirm Booking →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Star Rating Input ── */
const StarRatingInput = ({ rating, onChange }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
          className="p-0.5 transition-transform duration-100 hover:scale-110"
          aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}>
          <Star size={22}
            fill={s <= (hover || rating) ? "#f59e0b" : "none"}
            stroke={s <= (hover || rating) ? "#f59e0b" : "#d1d5db"} />
        </button>
      ))}
    </div>
  );
};

/* ── Add Review Form ── */
const AddReviewForm = ({ mentorId, menteeId, onSubmit, isLoggedIn, navigate }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    if (!comment.trim()) { setFeedback({ type: "error", message: "Please write a comment before submitting." }); return; }
    setSubmitting(true);
    setFeedback(null);
    try {
      await onSubmit({ mentorId, menteeId, rating, comment: comment.trim() }).unwrap();
      setComment(""); setRating(5);
      setFeedback({ type: "success", message: "" });
    } catch (err) {
      setFeedback({ type: "error", message: err?.data?.message || "Failed to post review. Please try again." });
    } finally { setSubmitting(false); }
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-200 w-full" style={{ fontFamily: "Cambria" }}>
      <h4 className="text-base font-bold text-gray-900 mb-3" style={{ fontFamily: "Cambria" }}>Leave a Review</h4>
      <div className="mb-3">
        <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: "Cambria" }}>Your rating</p>
        <StarRatingInput rating={rating} onChange={setRating} />
      </div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this mentor..."
        rows={3} maxLength={1000}
        className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#0098cc] transition-colors duration-150"
        style={{ fontFamily: "Cambria" }} />
      {feedback && (
        <p className={`text-sm mt-2 font-medium ${feedback.type === "success" ? "text-green-600" : "text-red-500"}`}
          style={{ fontFamily: "Cambria" }}>{feedback.message}</p>
      )}
      <button onClick={handleSubmit} disabled={submitting || !comment.trim()}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-base font-bold border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
        style={{ fontFamily: "Cambria" }}>
        {submitting ? "Posting..." : isLoggedIn ? "Post Review" : "Log in to Review"}
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  console.log(mentorId, "mentorIqdwfer")
  const [showBooking, setShowBooking] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSlotForModal, setSelectedSlotForModal] = useState(null);
  const [wishlist, setWishlist] = useState(false);

  const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
  const [submitReview] = useSubmitReviewMutation();
  const reviews = reviewsData?.reviews || [];

  const cookieData = Cookies.get("profileData");
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const currentStatus = userData?.profile?.currentStatus;

  const { data: apiResponse, isLoading, isError, error } =
    useFetchMentorByIdQuery({ mentorId, currentStatus });

  const mentor = apiResponse?.data?.mentorDetails || apiResponse;
  const rawAvailability = apiResponse?.data?.mentorDetails?.availability || [];

  let userData1 = {};
  try { userData1 = JSON.parse(localStorage.getItem("userData")) || {}; } catch { userData1 = {}; }
  const userMenteeId = userData1?._id;
  const isLoggedIn = Boolean(userMenteeId);

  useEffect(() => {
    if (isError && isAuthError(error)) navigate("/login", { replace: true });
  }, [isError, error, navigate]);

  useEffect(() => {
    if (showBooking)
      setTimeout(() => document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, [showBooking]);

  const goToPlans = () => navigate(`/mentor/${mentorId}/ltm-plans`, {
    state: { availableCoupons: apiResponse?.data?.availableCoupons || [] }
  });

  /* ── Guards ── */
  if (isLoading) return <div className="h-screen w-full bg-white flex items-center justify-center"><Loader /></div>;
  if (isError && isAuthError(error)) return null;
  if (isError || !mentor) return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 gap-4">
      <p className="text-red-500 text-base text-center" style={{ fontFamily: "Cambria" }}>Failed to load profile</p>
      <button onClick={() => navigate("/mentors")}
        className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-lg text-base font-bold border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95"
        style={{ fontFamily: "Cambria" }}>← Back to Mentors</button>
    </div>
  );

  /* ── Derived data ── */
  const skills = mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
  const areas = mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
  const bioText = mentor.motivationStatement || mentor.bio || "";
  const bioLong = bioText.length > 300;
  const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 300) + "…";
  const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / totalReviews).toFixed(1)
    : null;

  const experiences = mentor.experiences || [];

  const trialBenefits = [
    { icon: <CheckCircle size={14} />, text: "Right-fit check" },
    { icon: <CheckCircle size={14} />, text: "Action plan" },
    { icon: <CheckCircle size={14} />, text: "Timeline clarity" },
    { icon: <CheckCircle size={14} />, text: "Pricing alignment" },
    { icon: <CheckCircle size={14} />, text: "Top bottlenecks" },
    { icon: <CheckCircle size={14} />, text: "Role-focused guidance" },
    { icon: <CheckCircle size={14} />, text: "Weekly milestones" },
    { icon: <Clock size={14} />, text: "30–40 min session" },
  ];

  const affiliations = [
    mentor.companyName && { label: mentor.companyName, icon: <Building2 size={14} style={{ color: ACCENT }} /> },
    mentor.schoolName && { label: mentor.schoolName, icon: <GraduationCap size={14} style={{ color: ACCENT }} /> },
  ].filter(Boolean);

  /* ── Button classes ── */
  const btnPrimary = "inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-base font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95 whitespace-nowrap";
  const btnSecondary = "inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-base font-bold cursor-pointer border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap";
  const btnGhost = "inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-base font-bold cursor-pointer border-2 border-[#0098cc] bg-white text-[#0098cc] hover:bg-[#0098cc] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap";

  const linkedInUrl = mentor.linkedIn || mentor.linkedinUrl || null;

  return (
    <>
      {/* ─── Navbar ─── */}
      <nav className="w-full bg-white border-b border-gray-100 z-50" style={{ fontFamily: "Cambria" }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-2.5 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
            <img src={logo} alt="Karrivo Logo" className="h-8 sm:h-10 md:h-11 w-auto object-contain" />
            <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight" style={{ color: PRIMARY, fontFamily: "Cambria" }}>KARRIVO</h1>
          </div>
        </div>
      </nav>

      {/* ─── Page ───
          Desktop (lg+): locked to viewport height, NO page-level scroll.
          Mobile: behaves as a normal scrolling page (sidebar is hidden on mobile anyway). */}
      <div className="w-full bg-white lg:h-[calc(100vh-61px)] lg:overflow-hidden" style={{ fontFamily: "Cambria" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:h-full">

          {/* ══ LEFT: Main Content ══
              On desktop this is the ONLY scrollable region. */}
          <div className="flex-1 min-w-0 lg:h-full lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {/* ── MOBILE BANNER (< lg) ── */}
            <div className="lg:hidden" style={{ background: BANNER_BG }}>
              <div className="flex items-end gap-3 sm:gap-4 px-4 pt-6 pb-0">
                <div
                  className="flex-shrink-0 overflow-hidden bg-white"
                  style={{
                    width: 90,
                    height: 110,
                    borderRadius: 12,
                    border: "3px solid rgba(255,255,255,0.9)",
                    marginBottom: -28,
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  {mentor.profilePhoto || mentor.profileImage ? (
                    <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName}
                      className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #1a1a2e)`, fontFamily: "Cambria" }}>
                      {initials}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 pb-4">
                  {mentor.isStar && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full mb-2"
                      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                      <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ACCENT }}>
                        <span className="w-1.5 h-1.5 rounded-full block bg-white" />
                      </span>
                      <span className="text-[11px] font-bold text-white truncate" style={{ fontFamily: "Cambria" }}>Top Mentor</span>
                    </div>
                  )}
                  <h1 className="text-lg sm:text-xl font-bold text-white leading-snug truncate" style={{ fontFamily: "Cambria" }}>
                    {mentor.fullName}
                  </h1>
                  {(mentor.currentRole || mentor.jobTitle) && (
                    <p className="text-xs text-white/80 mt-1 " style={{ fontFamily: "Cambria" }}>
                      {mentor.currentRole || mentor.jobTitle}
                      {mentor.companyName ? ` · ${mentor.companyName}` : ""}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-white pt-9 pb-3 px-4 flex flex-wrap items-center gap-2 border-b border-gray-100">
                {linkedInUrl && (
                  <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: "#0a66c2" }}>
                    <LinkedInIcon />
                  </a>
                )}
                {mentor.resumeLink && (
                  <a href={mentor.resumeLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold flex-shrink-0"
                    style={{ borderColor: "#d1d5db", color: "#6b7280", background: "#fff", textDecoration: "none" }}>
                    <FileText size={12} /> Portfolio <ExternalLink size={10} />
                  </a>
                )}
              </div>

              {/* Mobile action buttons — own row, equal width, never overflow */}
              <div className="bg-white pb-3 px-4 flex items-stretch gap-2 border-b border-gray-100">
                <button
                  onClick={() => setShowBooking(true)}
                  className="flex-1 basis-0 min-w-0 inline-flex items-center justify-center h-9 px-2 rounded-lg text-xs font-bold border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 truncate"
                  style={{ fontFamily: "Cambria" }}
                >
                  Book Trial
                </button>
                <button
                  onClick={goToPlans}
                  className="flex-1 basis-0 min-w-0 inline-flex items-center justify-center h-9 px-2 rounded-lg text-xs font-bold border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 truncate"
                  style={{ fontFamily: "Cambria" }}
                >
                  Pricing
                </button>
              </div>
            </div>

            {/* ── DESKTOP BANNER (lg+) ── */}
            <div className="hidden lg:block relative" style={{ background: BANNER_BG, height: 270 }}>
              <div
                className="absolute overflow-hidden bg-white"
                style={{
                  left: 40,
                  top: 54,
                  width: 200,
                  height: 280,
                  borderRadius: 16,
                  border: "4px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
                  zIndex: 10,
                }}
              >
                {mentor.profilePhoto || mentor.profileImage ? (
                  <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName}
                    className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, #1a1a2e)`, fontFamily: "Cambria" }}>
                    {initials}
                  </div>
                )}
              </div>

              <div
                className="absolute bottom-0 flex flex-col justify-center gap-2"
                style={{ left: 40 + 200 + 28, right: 24, paddingTop: 8, paddingBottom: 38 }}
              >
                {mentor.isStar && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-fit"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                    <span className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                      <span className="w-1.5 h-1.5 rounded-full block bg-white" />
                    </span>
                    <span className="text-xs font-bold text-white" style={{ fontFamily: "Cambria" }}>Top Mentor</span>
                  </div>
                )}
                <h1 className="text-2xl xl:text-3xl font-bold text-white leading-snug truncate" style={{ fontFamily: "Cambria" }}>
                  {mentor.fullName}
                </h1>
                {(mentor.currentRole || mentor.jobTitle) && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit max-w-full"
                    style={{ color: "#ffffff", fontFamily: "Cambria", backdropFilter: "blur(10px)" }}>
                    <Briefcase size={14} color="#0a66c2" strokeWidth={2.2} className="flex-shrink-0" />
                    <span className="truncate">{mentor.currentRole || mentor.jobTitle}</span>
                    {mentor.companyName && (
                      <><span style={{ opacity: 0.6 }}>•</span><Building2 size={14} color="#60a5fa" strokeWidth={2.2} className="flex-shrink-0" /><span className="truncate">{mentor.companyName}</span></>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-3 mt-1">
                  {linkedInUrl && (
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: "#0a66c2" }}>
                      <LinkedInIcon />
                    </a>
                  )}
                  {mentor.resumeLink && (
                    <a href={mentor.resumeLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-150 flex-shrink-0"
                      style={{ borderColor: "#d1d5db", color: "#6b7280", fontFamily: "Cambria", background: "#fff", textDecoration: "none" }}>
                      <FileText size={14} stroke="#6b7280" /> Portfolio <ExternalLink size={12} stroke="#6b7280" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {/* ════ End Banner ════ */}

            {/* ── Desktop Action bar ── */}
            <div
              className="hidden lg:flex bg-white border-b border-gray-100 flex-wrap items-center justify-end gap-3"
              style={{ paddingLeft: 40, paddingRight: 24, paddingTop: 64 + 14, paddingBottom: 16 }}
            >
              <button onClick={() => setShowBooking(true)} className={`${btnSecondary} !h-9 !px-4 !text-sm`} style={{ fontFamily: "Cambria" }}>
                Book a Trial Session
              </button>
              <button onClick={goToPlans} className={`${btnSecondary} !h-9 !px-4 !text-sm`} style={{ fontFamily: "Cambria" }}>
                View Pricing
              </button>
            </div>

            {/* ── Content wrapper ── */}
            <div className="px-4 sm:px-6 lg:px-10 max-w-full">

              {/* ── About block ── */}
              <div className="pt-5 pb-5 border-b border-gray-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Cambria" }}>About</h3>
                {bioText && (
                  <div className="max-w-2xl mb-4">
                    <p className="text-sm sm:text-base leading-7 text-gray-600 break-words" style={{ fontFamily: "Cambria" }}>{bio}</p>
                    {bioLong && (
                      <button onClick={() => setShowFullBio(!showFullBio)}
                        className="text-sm font-bold hover:underline mt-1.5" style={{ color: ACCENT, fontFamily: "Cambria" }}>
                        {showFullBio ? "read less" : "read more"}
                      </button>
                    )}
                  </div>
                )}

                {affiliations.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-4 pt-4 border-t border-gray-100">
                    {affiliations.map(({ label, icon }) => (
                      <div key={label} className="flex items-center gap-2 min-w-0">
                        {icon}
                        <span className="text-xs sm:text-sm text-gray-600 font-medium truncate" style={{ fontFamily: "Cambria" }}>{label}</span>
                      </div>
                    ))}
                    {mentor.location && (
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin size={14} style={{ color: ACCENT }} className="flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600 font-medium truncate" style={{ fontFamily: "Cambria" }}>{mentor.location}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Content sections ── */}
              <div className="pb-28 lg:pb-10">
                {showBooking && (
                  <div id="booking-section" className="mt-5 sm:mt-6">
                    <InlineBookingSection
                      mentor={mentor}
                      rawAvailability={rawAvailability}
                      onClose={() => setShowBooking(false)}
                      onSlotConfirmed={(slot) => { setSelectedSlotForModal(slot); setBookingOpen(true); }}
                    />
                  </div>
                )}

                <div className="mt-5 sm:mt-6 space-y-0">

                  {/* Education & Career */}
                  {(mentor.currentRole || mentor.highestDegree || mentor.schoolName || mentor.yearsOfExperience) && (
                    <div className="py-5 sm:py-6 border-b border-gray-200">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-5" style={{ fontFamily: "Cambria" }}>
                        Education & Career
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        {[
                          mentor.currentRole && {
                            label: "Current Role",
                            value: `${mentor.currentRole}${mentor.companyName ? ` at ${mentor.companyName}` : ""}`,
                            icon: <Briefcase size={14} style={{ color: ACCENT }} />,
                          },
                          mentor.highestDegree && {
                            label: "Degree",
                            value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` in ${mentor.fieldOfStudy}` : ""}`,
                            icon: <GraduationCap size={14} style={{ color: ACCENT }} />,
                          },
                          mentor.schoolName && {
                            label: "Institution",
                            value: mentor.schoolName,
                            icon: <School size={14} style={{ color: ACCENT }} />,
                          },
                          mentor.yearsOfExperience && {
                            label: "Experience",
                            value: `${mentor.yearsOfExperience}+ Years`,
                            icon: <BadgeCheck size={14} style={{ color: ACCENT }} />,
                          },
                        ].filter(Boolean).map(({ label, value, icon }) => (
                          <div key={label} className="flex items-center gap-3 border border-gray-100 rounded-lg p-3 sm:p-4 min-w-0">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0">{icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-semibold mb-0.5" style={{ fontFamily: "Cambria" }}>{label}</p>
                              <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-snug break-words" style={{ fontFamily: "Cambria" }}>{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Experience */}
                  {experiences.length > 0 && (
                    <div className="py-5 sm:py-6 border-b border-gray-200">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Cambria" }}>
                        Work Experience
                      </h3>
                      {experiences.map((exp, idx) => (
                        <ExperienceItem key={exp._id || idx} exp={exp} isLast={idx === experiences.length - 1} />
                      ))}
                    </div>
                  )}

                  {/* Technical Skills */}
                  {skills.length > 0 && (
                    <div className="py-5 sm:py-6 border-b border-gray-200">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: "Cambria" }}>Technical Skills</h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                        {skills.map((skill) => <SkillChip key={skill} skill={skill} />)}
                      </div>
                    </div>
                  )}

                  {/* Areas of Interest */}
                  {areas.length > 0 && (
                    <div className="py-5 sm:py-6 border-b border-gray-200">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: "Cambria" }}>Areas of Interest</h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                        {areas.map((area) => <SkillChip key={area} skill={area} />)}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {mentor.languages?.length > 0 && (
                    <div className="py-5 sm:py-6 border-b border-gray-200">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: "Cambria" }}>Languages</h3>
                      <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {mentor.languages.map((lang, i) => (
                          <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-semibold text-gray-700"
                            style={{ fontFamily: "Cambria" }}>{lang}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reviews */}
                  <div className="py-5 sm:py-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-5" style={{ fontFamily: "Cambria" }}>Reviews & Comments</h3>
                    <AddReviewForm mentorId={mentorId} menteeId={userMenteeId}
                      onSubmit={submitReview} isLoggedIn={isLoggedIn} navigate={navigate} />
                    <div className="space-y-4 sm:space-y-5">
                      {reviews?.length > 0 ? reviews.map((review, index) => (
                        <div key={review._id || index} className="border-b border-gray-100 pb-4 sm:pb-5">
                          <div className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-2.5">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} size={12}
                                fill={s <= (review.rating || 5) ? "#f59e0b" : "none"}
                                stroke={s <= (review.rating || 5) ? "#f59e0b" : "#d1d5db"} />
                            ))}
                          </div>
                          <p className="text-sm sm:text-base leading-7 text-gray-600 mb-3 sm:mb-4 break-words" style={{ fontFamily: "Cambria" }}>
                            {review.review || review.comment}
                          </p>
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                              {review.user?.profileImage ? (
                                <img src={review.user.profileImage} alt={review.user?.name}
                                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0" />
                              ) : (
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black text-white flex-shrink-0"
                                  style={{ background: PRIMARY, fontFamily: "Cambria" }}>
                                  {(review.user?.name || "U").split(" ").map(w => w[0]).slice(0, 2).join("")}
                                </div>
                              )}
                              <span className="text-xs sm:text-base font-semibold text-gray-800 truncate" style={{ fontFamily: "Cambria" }}>
                                {review.user?.name || "Anonymous User"}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0" style={{ fontFamily: "Cambria" }}>
                              {review.createdAt
                                ? new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                                : "Recently"}
                            </span>
                          </div>
                        </div>
                      )) : (
                        <p className="text-sm sm:text-base text-gray-500" style={{ fontFamily: "Cambria" }}>
                          No reviews yet. Be the first to leave one!
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* ── end content wrapper ── */}

          </div>
          {/* ══ end LEFT ══ */}

          {/* ══ RIGHT SIDEBAR (lg+) ══
              No independent scroll — fixed in place since the page itself doesn't scroll on desktop. */}
          <div className="hidden lg:flex flex-col w-[200px] xl:w-[340px] flex-shrink-0 border-l border-gray-200 bg-white lg:h-full lg:overflow-hidden">
            <div className="flex flex-col gap-0 divide-y divide-gray-100">

              {/* Book a Trial */}
              <div className="p-5 xl:p-6">
                <h3 className="text-base xl:text-lg font-bold text-gray-900 leading-snug mb-4 xl:mb-5" style={{ fontFamily: "Cambria" }}>
                  Book a Trial Session<br />
                  <span className="text-gray-500 font-medium text-sm xl:text-base">
                    to understand how {mentor.fullName?.split(" ")[0]} can help
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 xl:gap-y-2.5 mb-4 xl:mb-5">
                  {trialBenefits.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 min-w-0">
                      <span style={{ color: ACCENT }} className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xs xl:text-sm text-gray-600 truncate" style={{ fontFamily: "Cambria" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowBooking(true)} className={`${btnPrimary} w-full !h-11 xl:!h-12 !text-sm xl:!text-base`} style={{ fontFamily: "Cambria" }}>
                  <Calendar size={16} className="flex-shrink-0" /> Book a Trial Session
                </button>
              </div>

              {/* Take the next step */}
              <div className="p-5 xl:p-6">
                <h3 className="text-base xl:text-lg font-bold text-gray-900 leading-snug mb-3 xl:mb-4" style={{ fontFamily: "Cambria" }}>
                  Take the next step in,<br />
                  <span>your career with {mentor.fullName?.split(" ")[0]} {mentor.fullName?.split(" ")[1] || ""}</span>
                </h3>
                {mentor.planPrice && (
                  <div className="mb-4 xl:mb-5">
                    <p className="text-xs xl:text-sm text-gray-400 font-medium mb-1" style={{ fontFamily: "Cambria" }}>Starts at</p>
                    <p className="text-2xl xl:text-3xl font-black text-gray-900" style={{ fontFamily: "Cambria" }}>
                      ₹{mentor.planPrice.toLocaleString("en-IN")}
                      <span className="text-sm xl:text-base font-medium text-gray-500">/Session </span>
                    </p>
                  </div>
                )}
                <button onClick={goToPlans} className={`${btnSecondary} w-full !h-11 xl:!h-12 !text-sm xl:!text-base`} style={{ fontFamily: "Cambria" }}>
                  View Plans
                </button>
                <div className="mt-4 xl:mt-5 pt-4 xl:pt-5 border-t border-gray-100 space-y-2 xl:space-y-2.5">
                  {[
                    { icon: <Calendar size={13} />, text: "1:1 Live Sessions" },
                    { icon: <FileText size={13} />, text: "Resume & Portfolio Review" },
                    // { icon: <Award size={13} />, text: "Career Guidance" },
                    // { icon: <BookOpen size={13} />, text: "Study Material" },
                    // { icon: <Briefcase size={13} />, text: "Job Support" },
                    // { icon: <BadgeCheck size={13} />, text: "Completion Certificate" },
                    // { icon: <MessageCircle size={13} />, text: "Doubt Clearing" },
                    // { icon: <Users size={13} />, text: "Community Access" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 xl:gap-2.5 min-w-0">
                      <span style={{ color: ACCENT }} className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xs xl:text-sm text-gray-600 truncate" style={{ fontFamily: "Cambria" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA — EQUAL WIDTH, fully responsive */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex w-full gap-2 sm:gap-2.5">
          <button
            onClick={goToPlans}
            className="flex-1 basis-0 min-w-0 inline-flex items-center justify-center h-11 px-2 rounded-lg text-xs sm:text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95"
            style={{ fontFamily: "Cambria" }}
          >
            <span className="truncate">View Plans</span>
          </button>
          <button
            onClick={() => setShowBooking(true)}
            className="flex-1 basis-0 min-w-0 inline-flex items-center justify-center gap-1 h-11 px-2 rounded-lg text-xs sm:text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95"
            style={{ fontFamily: "Cambria" }}
          >
            <Calendar size={15} className="flex-shrink-0" />
            <span className="truncate">Book Trial</span>
          </button>
        </div>
      </div>

      {/* Booking modal */}
      {mentor && (
        <BookingModal
          mentor={mentor}
          isOpen={bookingOpen}
          onClose={() => { setBookingOpen(false); setSelectedSlotForModal(null); }}
          selectedSlot={selectedSlotForModal}
          appliedCoupon={null}
          availableCoupons={[]}
        />
      )}
    </>
  );
};

export default ProfileModal;


