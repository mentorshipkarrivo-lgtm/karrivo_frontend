

// import React, { useState, useMemo, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Heart, Calendar, MapPin, Award, GraduationCap, Globe, Star,
//   MessageCircle, CheckCircle, ExternalLink, Zap, ChevronLeft,
//   ChevronRight, Clock, Briefcase, FileText, BadgeCheck, Video, Users,
//   Building2, School, CalendarDays, Linkedin, X, Menu, ArrowLeft, BookOpen,
//   Timer, GraduationCap as GradCap,
// } from "lucide-react";
// import Cookies from "js-cookie";
// import {
//   useFetchMentorByIdQuery,
//   useFetchMentorReviewsQuery,
//   useSubmitReviewMutation,
// } from "../../topMentors/Mentorsectionapislice";
// import BookingModal from "./BookingModal";
// import Loader from "../../../global/Loader";
// import logo from "../../../assets/karrivoSymbol.png";

// const PRIMARY = "#1a1a2e";
// const ACCENT = "#0098cc";
// const WHITE = "#ffffff";

// const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
// const SKILL_ICON_MAP = {
//   "react": `${DI}/react/react-original.svg`, "react js": `${DI}/react/react-original.svg`,
//   "react.js": `${DI}/react/react-original.svg`, "reactjs": `${DI}/react/react-original.svg`,
//   "react native": `${DI}/react/react-original.svg`, "next": `${DI}/nextjs/nextjs-original.svg`,
//   "next js": `${DI}/nextjs/nextjs-original.svg`, "next.js": `${DI}/nextjs/nextjs-original.svg`,
//   "nextjs": `${DI}/nextjs/nextjs-original.svg`, "vue": `${DI}/vuejs/vuejs-original.svg`,
//   "vue.js": `${DI}/vuejs/vuejs-original.svg`, "vuejs": `${DI}/vuejs/vuejs-original.svg`,
//   "angular": `${DI}/angularjs/angularjs-original.svg`, "svelte": `${DI}/svelte/svelte-original.svg`,
//   "node": `${DI}/nodejs/nodejs-original.svg`, "node.js": `${DI}/nodejs/nodejs-original.svg`,
//   "nodejs": `${DI}/nodejs/nodejs-original.svg`, "express": `${DI}/express/express-original.svg`,
//   "express.js": `${DI}/express/express-original.svg`, "javascript": `${DI}/javascript/javascript-original.svg`,
//   "js": `${DI}/javascript/javascript-original.svg`, "typescript": `${DI}/typescript/typescript-original.svg`,
//   "ts": `${DI}/typescript/typescript-original.svg`, "graphql": `${DI}/graphql/graphql-plain.svg`,
//   "mongodb": `${DI}/mongodb/mongodb-original.svg`, "mysql": `${DI}/mysql/mysql-original.svg`,
//   "sql": `${DI}/mysql/mysql-original.svg`, "postgresql": `${DI}/postgresql/postgresql-original.svg`,
//   "postgres": `${DI}/postgresql/postgresql-original.svg`, "redis": `${DI}/redis/redis-original.svg`,
//   "firebase": `${DI}/firebase/firebase-plain.svg`, "python": `${DI}/python/python-original.svg`,
//   "java": `${DI}/java/java-original.svg`, "c++": `${DI}/cplusplus/cplusplus-original.svg`,
//   "cpp": `${DI}/cplusplus/cplusplus-original.svg`, "c#": `${DI}/csharp/csharp-original.svg`,
//   "go": `${DI}/go/go-original.svg`, "golang": `${DI}/go/go-original.svg`,
//   "rust": `${DI}/rust/rust-plain.svg`, "php": `${DI}/php/php-original.svg`,
//   "ruby": `${DI}/ruby/ruby-original.svg`, "swift": `${DI}/swift/swift-original.svg`,
//   "kotlin": `${DI}/kotlin/kotlin-original.svg`, "dart": `${DI}/dart/dart-original.svg`,
//   "django": `${DI}/django/django-plain.svg`, "flask": `${DI}/flask/flask-original.svg`,
//   "spring": `${DI}/spring/spring-original.svg`, "spring boot": `${DI}/spring/spring-original.svg`,
//   "flutter": `${DI}/flutter/flutter-original.svg`, "fastapi": `${DI}/fastapi/fastapi-original.svg`,
//   "aws": `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
//   "azure": `${DI}/azure/azure-original.svg`, "gcp": `${DI}/googlecloud/googlecloud-original.svg`,
//   "google cloud": `${DI}/googlecloud/googlecloud-original.svg`, "docker": `${DI}/docker/docker-original.svg`,
//   "kubernetes": `${DI}/kubernetes/kubernetes-plain.svg`, "linux": `${DI}/linux/linux-original.svg`,
//   "git": `${DI}/git/git-original.svg`, "github": `${DI}/github/github-original.svg`,
//   "gitlab": `${DI}/gitlab/gitlab-original.svg`, "html": `${DI}/html5/html5-original.svg`,
//   "css": `${DI}/css3/css3-original.svg`, "sass": `${DI}/sass/sass-original.svg`,
//   "tailwind": `${DI}/tailwindcss/tailwindcss-plain.svg`, "bootstrap": `${DI}/bootstrap/bootstrap-original.svg`,
//   "figma": `${DI}/figma/figma-original.svg`, "tensorflow": `${DI}/tensorflow/tensorflow-original.svg`,
//   "pytorch": `${DI}/pytorch/pytorch-original.svg`, "pandas": `${DI}/pandas/pandas-original.svg`,
//   "numpy": `${DI}/numpy/numpy-original.svg`, "vite": `${DI}/vite/vite-original.svg`,
//   "jest": `${DI}/jest/jest-plain.svg`, "postman": `${DI}/postman/postman-original.svg`,
// };
// const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

// const toYMD = (d) => { const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const dy = String(d.getDate()).padStart(2, "0"); return `${y}-${m}-${dy}`; };
// const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const isAuthError = (error) => {
//   if (!error) return false;
//   const data = error?.data || error;
//   return data?.status_code === 400 || data?.status_code === 401 ||
//     data?.message === "Auth Token is required" || error?.status === 401 || error?.status === 400;
// };

// /* ─── Skill Chip ── */
// const SkillChip = ({ skill }) => {
//   const icon = getSkillIcon(skill);
//   const [imgErr, setImgErr] = useState(false);
//   return (
//     <span style={{ fontFamily: "Cambria" }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-800 text-xs font-semibold">
//       <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
//         {icon && !imgErr ? (
//           <img src={icon} alt={skill} className="w-4 h-4 object-contain" onError={() => setImgErr(true)} />
//         ) : (
//           <span className="w-4 h-4 flex items-center justify-center text-white text-[7px] font-black rounded" style={{ background: PRIMARY }}>
//             {skill.slice(0, 2).toUpperCase()}
//           </span>
//         )}
//       </span>
//       <span className="whitespace-nowrap leading-none">{skill}</span>
//     </span>
//   );
// };

// /* ─── Mini Calendar ── */
// const MiniMonthCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
//   const today = new Date();
//   const firstAvailableMonth = useMemo(() => {
//     if (availableDates.size === 0) return new Date(today.getFullYear(), today.getMonth(), 1);
//     const sorted = Array.from(availableDates).sort();
//     const first = new Date(sorted[0] + "T00:00:00");
//     return new Date(first.getFullYear(), first.getMonth(), 1);
//   }, [availableDates]);
//   const [viewMonth, setViewMonth] = useState(firstAvailableMonth);
//   const year = viewMonth.getFullYear();
//   const month = viewMonth.getMonth();
//   const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const cells = [];
//   for (let i = 0; i < startOffset; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
//   return (
//     <div className="w-full select-none" style={{ fontFamily: "Cambria" }}>
//       <div className="flex items-center justify-between mb-3">
//         <button
//           onClick={() => setViewMonth(new Date(year, month - 1, 1))}
//           className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-150"
//         >
//           <ChevronLeft size={14} className="text-gray-600" />
//         </button>
//         <span className="text-sm font-bold text-gray-900">{MONTH_NAMES[month]} {year}</span>
//         <button
//           onClick={() => setViewMonth(new Date(year, month + 1, 1))}
//           className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-150"
//         >
//           <ChevronRight size={14} className="text-gray-600" />
//         </button>
//       </div>
//       <div className="grid grid-cols-7 mb-1">
//         {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
//           <div key={i} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-y-0.5">
//         {cells.map((day, idx) => {
//           if (!day) return <div key={`e-${idx}`} />;
//           const ymd = toYMD(day);
//           const isAvail = availableDates.has(ymd);
//           const isSel = selectedDate === ymd;
//           const isToday = ymd === toYMD(today);
//           return (
//             <button
//               key={ymd}
//               disabled={!isAvail}
//               onClick={() => isAvail && onSelectDate(isSel ? null : ymd)}
//               className="relative mx-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-150"
//               style={{
//                 background: isSel ? PRIMARY : "transparent",
//                 color: isSel ? WHITE : isAvail ? ACCENT : "#d1d5db",
//                 cursor: isAvail ? "pointer" : "default",
//                 fontWeight: isAvail ? 700 : 400,
//                 outline: isToday && isAvail && !isSel ? `2px solid ${ACCENT}` : "none",
//                 fontFamily: "Cambria",
//               }}
//             >
//               {day.getDate()}
//               {isAvail && !isSel && (
//                 <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: ACCENT }} />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// /* ─── Inline Booking Section ── */
// const InlineBookingSection = ({ mentor, rawAvailability, onClose, onSlotConfirmed }) => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const grouped = useMemo(() => {
//     if (!rawAvailability?.length) return {};
//     const acc = {};
//     for (const slot of rawAvailability) {
//       const dk = slot.date.slice(0, 10);
//       if (!acc[dk]) acc[dk] = [];
//       acc[dk].push({ _id: slot._id, date: dk, startTime: slot.startTime, endTime: slot.endTime, isBooked: slot.isBooked });
//     }
//     return acc;
//   }, [rawAvailability]);
//   const availableDatesSet = useMemo(() => new Set(Object.keys(grouped)), [grouped]);
//   const slotsForSelectedDate = useMemo(() => selectedDate ? grouped[selectedDate] || [] : [], [selectedDate, grouped]);
//   useEffect(() => {
//     if (availableDatesSet.size > 0 && !selectedDate) {
//       setSelectedDate(Array.from(availableDatesSet).sort()[0]);
//     }
//   }, [availableDatesSet]);
//   const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
//   return (
//     <div className="animate-[slideInRight_0.35s_cubic-bezier(0.22,1,0.36,1)_forwards]" style={{ fontFamily: "Cambria" }}>
//       <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
//         <button
//           onClick={onClose}
//           className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-bold cursor-pointer border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap"
//           style={{ fontFamily: "Cambria" }}
//         >
//           <ArrowLeft size={13} /> Back
//         </button>
//         <h2 className="text-base sm:text-lg font-bold text-gray-900" style={{ fontFamily: "Cambria" }}>Book a Trial Session</h2>
//       </div>
//       <div className="flex flex-col lg:flex-row border border-gray-200 rounded-xl overflow-hidden">
//         <div className="lg:w-[268px] xl:w-[290px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 flex flex-col gap-4">
//           <div className="pb-4 border-b border-gray-200">
//             <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden mb-2.5">
//               {mentor.profilePhoto || mentor.profileImage ? (
//                 <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-sm font-black text-white" style={{ background: PRIMARY, fontFamily: "Cambria" }}>{initials}</div>
//               )}
//             </div>
//             <h3 className="text-sm font-bold text-gray-900 leading-tight" style={{ fontFamily: "Cambria" }}>{mentor.fullName}</h3>
//             {mentor.currentRole && (
//               <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "Cambria" }}>{mentor.currentRole}{mentor.companyName ? ` · ${mentor.companyName}` : ""}</p>
//             )}
//           </div>
//           <div className="pb-4 border-b border-gray-200">
//             <div className="flex items-center gap-2 text-xs text-gray-600" style={{ fontFamily: "Cambria" }}>
//               <Video size={12} style={{ color: ACCENT }} />
//               <span>Zoom link added after booking</span>
//             </div>
//           </div>
//           <MiniMonthCalendar availableDates={availableDatesSet} selectedDate={selectedDate}
//             onSelectDate={(dk) => { setSelectedDate(dk); setSelectedSlot(null); }} />
//         </div>
//         <div className="flex-1 bg-white flex flex-col overflow-hidden">
//           <div className="flex-1 p-4 sm:p-5">
//             <h3 className="text-sm font-bold text-gray-900 mb-4" style={{ fontFamily: "Cambria" }}>Select an appointment time</h3>
//             {!selectedDate ? (
//               <div className="flex flex-col items-center justify-center h-44 text-center">
//                 <Calendar size={32} className="text-gray-200 mb-3" />
//                 <p className="text-sm text-gray-400" style={{ fontFamily: "Cambria" }}>Select a date from the calendar</p>
//               </div>
//             ) : slotsForSelectedDate.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-44 text-center">
//                 <Clock size={32} className="text-gray-200 mb-3" />
//                 <p className="text-sm text-gray-400" style={{ fontFamily: "Cambria" }}>No slots for this date</p>
//                 <button
//                   onClick={() => setSelectedDate(null)}
//                   className="mt-3 text-xs font-bold hover:underline"
//                   style={{ color: ACCENT, fontFamily: "Cambria" }}
//                 >
//                   Choose another date
//                 </button>
//               </div>
//             ) : (
//               <div className="animate-[fadeIn_0.25s_ease_forwards]">
//                 <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4" style={{ fontFamily: "Cambria" }}>
//                   {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
//                 </p>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                   {slotsForSelectedDate.map((slot) => {
//                     const chosen = selectedSlot?._id === slot._id;
//                     return (
//                       <button
//                         key={slot._id}
//                         onClick={() => setSelectedSlot(chosen ? null : slot)}
//                         className="py-2.5 px-2 rounded-lg border text-xs font-bold transition-all duration-150 relative hover:scale-[1.03] active:scale-95"
//                         style={{
//                           background: chosen ? PRIMARY : WHITE,
//                           color: chosen ? WHITE : slot.isBooked ? "#9ca3af" : ACCENT,
//                           borderColor: chosen ? PRIMARY : slot.isBooked ? "#e5e7eb" : ACCENT,
//                           fontFamily: "Cambria",
//                         }}
//                       >
//                         {slot.startTime}
//                         {slot.isBooked && !chosen && (
//                           <span className="absolute top-0.5 right-0.5 text-[8px] font-bold px-1 rounded" style={{ border: "1px solid #e5e7eb", color: "#92400e", fontFamily: "Cambria" }}>Booked</span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 {selectedSlot && (
//                   <div className="animate-[fadeIn_0.25s_ease_forwards] mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//                     <div className="flex-1">
//                       <p className="text-xs text-gray-500" style={{ fontFamily: "Cambria" }}>
//                         Selected: <span className="font-bold" style={{ color: PRIMARY }}>{selectedSlot.startTime}</span>
//                         {selectedSlot.endTime && <span className="text-gray-400"> – {selectedSlot.endTime}</span>}
//                         {selectedSlot.isBooked && <span className="ml-2 text-amber-600 font-semibold">(Already Booked)</span>}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => onSlotConfirmed(selectedSlot)}
//                       className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95 whitespace-nowrap"
//                       style={{ fontFamily: "Cambria" }}
//                     >
//                       Confirm Booking →
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════════════════════════ */
// const ProfileModal = () => {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();

//   const [showBooking, setShowBooking] = useState(false);
//   const [showFullBio, setShowFullBio] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [bookingOpen, setBookingOpen] = useState(false);
//   const [selectedSlotForModal, setSelectedSlotForModal] = useState(null);
//   const [wishlist, setWishlist] = useState(false);

//   const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
//   const [submitReview] = useSubmitReviewMutation();
//   const reviews = reviewsData?.reviews || [];

//   const cookieData = Cookies.get("profileData");
//   const userData = cookieData ? JSON.parse(cookieData) : null;
//   const currentStatus = userData?.profile?.currentStatus;

//   const { data: apiResponse, isLoading, isError, error } = useFetchMentorByIdQuery({ mentorId, currentStatus });

//   const mentor = apiResponse?.data?.mentorDetails || apiResponse;
//   const rawAvailability = apiResponse?.data?.mentorDetails?.availability || [];
//   const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
//   const userMenteeId = userData1?._id;

//   useEffect(() => {
//     if (isError && isAuthError(error)) navigate("/login", { replace: true });
//   }, [isError, error, navigate]);

//   useEffect(() => {
//     if (showBooking) {
//       setTimeout(() => document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
//     }
//   }, [showBooking]);

//   const goToPlans = () => navigate(`/mentor/${mentorId}/ltm-plans`, {
//     state: {
//       availableCoupons: apiResponse?.data?.availableCoupons || [],
//     }
//   });

//   if (isLoading) return <div className="h-screen w-full bg-white flex items-center justify-center"><Loader /></div>;
//   if (isError && isAuthError(error)) return null;
//   if (isError || !mentor) return (
//     <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 gap-4">
//       <p className="text-red-500 text-sm text-center" style={{ fontFamily: "Cambria" }}>Failed to load profile</p>
//       <button
//         onClick={() => navigate("/mentors")}
//         className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95"
//         style={{ fontFamily: "Cambria" }}
//       >
//         ← Back to Mentors
//       </button>
//     </div>
//   );

//   const skills = mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
//   const areas = mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
//   const bioText = mentor.motivationStatement || mentor.bio || "";
//   const bioLong = bioText.length > 300;
//   const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 300) + "…";
//   const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";

//   const totalReviews = reviews.length;
//   const avgRating = totalReviews > 0
//     ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / totalReviews).toFixed(1)
//     : null;

//   const trialBenefits = [
//     { icon: <CheckCircle size={13} />, text: "Right-fit check" },
//     { icon: <CheckCircle size={13} />, text: "Action plan" },
//     { icon: <CheckCircle size={13} />, text: "Timeline clarity" },
//     { icon: <CheckCircle size={13} />, text: "Pricing alignment" },
//     { icon: <CheckCircle size={13} />, text: "Top bottlenecks" },
//     { icon: <CheckCircle size={13} />, text: "Role-focused guidance" },
//     { icon: <CheckCircle size={13} />, text: "Weekly milestones" },
//     { icon: <Clock size={13} />, text: "30–40 min session" },
//   ];

//   const affiliations = [
//     mentor.companyName && { label: mentor.companyName, icon: <Building2 size={13} style={{ color: ACCENT }} /> },
//     mentor.schoolName && { label: mentor.schoolName, icon: <GraduationCap size={13} style={{ color: ACCENT }} /> },
//   ].filter(Boolean);

//   // Reusable button class strings
//   const btnPrimary = "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95 whitespace-nowrap";
//   const btnSecondary = "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap";
//   const btnGhost = "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#0098cc] bg-white text-[#0098cc] hover:bg-[#0098cc] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap";

//   return (
//     <>
//       {/* ─── Navbar ─── */}
//       <nav className="w-full bg-white border-b border-gray-100 z-50 sticky top-0" style={{ fontFamily: "Cambria" }}>
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
//             <img src={logo} alt="Karrivo Logo" className="h-9 sm:h-10 w-auto object-contain" />
//             <h1 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: PRIMARY, fontFamily: "Cambria" }}>KARRIVO</h1>
//           </div>
//           <div className="hidden md:flex items-center gap-8">
//             <button
//               onClick={() => navigate("/explore-mentors")}
//               className="text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors duration-150"
//               style={{ fontFamily: "Cambria" }}
//             >
//               Explore Mentors
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => navigate("/login")}
//               className={`${btnSecondary} !h-[38px] !px-4 !text-xs`}
//               style={{ fontFamily: "Cambria" }}
//             >
//               Login
//             </button>
//             <button
//               className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg"
//               onClick={() => setMobileMenuOpen(v => !v)}
//             >
//               {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
//             </button>
//           </div>
//         </div>
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
//             <button
//               onClick={() => { navigate("/explore-mentors"); setMobileMenuOpen(false); }}
//               className="block w-full text-left text-sm font-semibold text-gray-700 py-2"
//               style={{ fontFamily: "Cambria" }}
//             >
//               Explore Mentors
//             </button>
//           </div>
//         )}
//       </nav>

//       {/* ─── Page ─── */}
//       <div className="w-full bg-white min-h-[calc(100vh-57px)]" style={{ fontFamily: "Cambria" }}>
//         <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">

//           {/* ══ LEFT: Main Content ══ */}
//           <div className="flex-1 min-w-0 lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

//             {/* ── Banner ── */}
//             <div className="relative">
//               <div className="w-full h-28 sm:h-44 overflow-hidden" style={{ background: "#eef2f7" }}>
//                 {mentor.bannerImage ? (
//                   <img src={mentor.bannerImage} alt="banner" className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <p className="text-xl sm:text-3xl font-bold text-gray-300 select-none tracking-tight px-6 text-center" style={{ fontFamily: "Cambria" }}>
//                       {mentor.motivationQuote || "Grow · Learn · Succeed"}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="px-4 sm:px-8 lg:px-10">
//                 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
//                   <div className="flex justify-center sm:justify-start">
//                     <div
//                       className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden flex-shrink-0"
//                       style={{ marginTop: -32 }}
//                     >
//                       {mentor.profilePhoto || mentor.profileImage ? (
//                         <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white" style={{ background: PRIMARY, fontFamily: "Cambria" }}>
//                           {initials}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-center sm:justify-end gap-2 mt-2 sm:mt-0 sm:pb-2">
//                     <button
//                       onClick={() => setWishlist(v => !v)}
//                       className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg transition-colors duration-150 hover:border-red-300"
//                       aria-label="Wishlist"
//                     >
//                       <Heart size={15} fill={wishlist ? "#ef4444" : "none"} stroke={wishlist ? "#ef4444" : "#6b7280"} />
//                     </button>
//                     <button
//                       onClick={() => setShowBooking(true)}
//                       className={`${btnSecondary} !h-9 !px-3.5 !text-xs`}
//                       style={{ fontFamily: "Cambria" }}
//                     >
//                       Ask a Question
//                     </button>
//                     <button
//                       onClick={goToPlans}
//                       className={`${btnSecondary} !h-9 !px-3.5 !text-xs`}
//                       style={{ fontFamily: "Cambria" }}
//                     >
//                       View Pricing
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ── Mentor info block ── */}
//             <div className="px-4 sm:px-8 lg:px-10 pt-4 pb-4 border-b border-gray-100">
//               <div className="flex flex-wrap items-center gap-2 mb-1">
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "Cambria" }}>{mentor.fullName}</h1>
//                 {mentor.isStar && (
//                   <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-yellow-300 text-yellow-700 text-xs font-bold" style={{ fontFamily: "Cambria" }}>
//                     <Star size={10} fill="currentColor" /> Star Mentor
//                   </span>
//                 )}
//               </div>

//               {mentor.currentRole && (
//                 <p className="text-sm text-gray-600 font-medium mb-2" style={{ fontFamily: "Cambria" }}>
//                   {mentor.currentRole}{mentor.companyName ? ` at ${mentor.companyName}` : ""}
//                 </p>
//               )}

//               {bioText && (
//                 <div className="max-w-2xl mb-3">
//                   <p className="text-sm leading-6 text-gray-600" style={{ fontFamily: "Cambria" }}>{bio}</p>
//                   {bioLong && (
//                     <button
//                       onClick={() => setShowFullBio(!showFullBio)}
//                       className="text-xs font-bold hover:underline mt-1"
//                       style={{ color: ACCENT, fontFamily: "Cambria" }}
//                     >
//                       {showFullBio ? "read less" : "read more"}
//                     </button>
//                   )}
//                 </div>
//               )}

//               <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
//                 {avgRating && (
//                   <div className="flex items-center gap-1.5">
//                     <Star size={13} fill="#f59e0b" stroke="none" />
//                     <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>{avgRating}</span>
//                     <span className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>({totalReviews} {totalReviews === 1 ? "Review" : "Reviews"})</span>
//                   </div>
//                 )}
//                 {mentor.totalSessionMins && (
//                   <div className="flex items-center gap-1.5">
//                     <Timer size={13} style={{ color: "#f97316" }} />
//                     <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>{mentor.totalSessionMins}+</span>
//                     <span className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>Mins</span>
//                   </div>
//                 )}
//                 {mentor.yearsOfExperience && (
//                   <div className="flex items-center gap-1.5">
//                     <Briefcase size={13} style={{ color: ACCENT }} />
//                     <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>{mentor.yearsOfExperience}+</span>
//                     <span className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>Years of Experience</span>
//                   </div>
//                 )}
//               </div>

//               {affiliations.length > 0 && (
//                 <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-gray-100">
//                   {affiliations.map(({ label, icon }) => (
//                     <div key={label} className="flex items-center gap-1.5">
//                       {icon}
//                       <span className="text-xs text-gray-600 font-medium" style={{ fontFamily: "Cambria" }}>{label}</span>
//                     </div>
//                   ))}
//                   {mentor.location && (
//                     <div className="flex items-center gap-1.5">
//                       <MapPin size={13} style={{ color: ACCENT }} />
//                       <span className="text-xs text-gray-600 font-medium" style={{ fontFamily: "Cambria" }}>{mentor.location}</span>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* ── Content area ── */}
//             <div className="px-4 sm:px-8 lg:px-10 pb-24 lg:pb-8">

//               {showBooking && (
//                 <div id="booking-section" className="mt-5">
//                   <InlineBookingSection
//                     mentor={mentor}
//                     rawAvailability={rawAvailability}
//                     onClose={() => setShowBooking(false)}
//                     onSlotConfirmed={(slot) => { setSelectedSlotForModal(slot); setBookingOpen(true); }}
//                   />
//                 </div>
//               )}

//               <div className="mt-5 space-y-0">

//                 {/* Education & Career */}
//                 {(mentor.currentRole || mentor.highestDegree || mentor.schoolName || mentor.yearsOfExperience) && (
//                   <div className="py-5 border-b border-gray-200">
//                     <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "Cambria" }}>Education & Career</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                       {[
//                         mentor.currentRole && { label: "Current Role", value: `${mentor.currentRole}${mentor.companyName ? ` At @ ${mentor.companyName}` : ""}`, icon: <Briefcase size={13} style={{ color: ACCENT }} /> },
//                         mentor.highestDegree && {
//                           label: "Degree",
//                           value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` in ${mentor.fieldOfStudy}` : ""}`,
//                           icon: <GraduationCap size={13} style={{ color: ACCENT }} />
//                         },
//                         mentor.schoolName && { label: "Institution", value: mentor.schoolName, icon: <School size={13} style={{ color: ACCENT }} /> },
//                         mentor.yearsOfExperience && { label: "Experience", value: `${mentor.yearsOfExperience}+ Years of Experience`, icon: <BadgeCheck size={13} style={{ color: ACCENT }} /> },
//                       ].filter(Boolean).map(({ label, value, icon }) => (
//                         <div key={label} className="flex items-center gap-3 border border-gray-100 rounded-lg p-3">
//                           <div className="w-7 h-7 rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0">{icon}</div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5" style={{ fontFamily: "Cambria" }}>{label}</p>
//                             <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-snug break-words" style={{ fontFamily: "Cambria" }}>{value}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     {(mentor.linkedinUrl || mentor.resumeLink) && (
//                       <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
//                         {mentor.linkedinUrl && (
//                           <a href={mentor.linkedinUrl} target="_blank" rel="noopener noreferrer" className={`${btnGhost} !h-9 !px-3.5 !text-xs`} style={{ fontFamily: "Cambria" }}>
//                             <Linkedin size={12} /> LinkedIn <ExternalLink size={10} />
//                           </a>
//                         )}
//                         {mentor.resumeLink && (
//                           <a href={mentor.resumeLink} target="_blank" rel="noopener noreferrer" className={`${btnGhost} !h-9 !px-3.5 !text-xs`} style={{ fontFamily: "Cambria" }}>
//                             <FileText size={12} /> Portfolio <ExternalLink size={10} />
//                           </a>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Technical Skills */}
//                 {skills.length > 0 && (
//                   <div className="py-5 border-b border-gray-200">
//                     <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "Cambria" }}>Technical Skills</h3>
//                     <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                       {skills.map((skill) => <SkillChip key={skill} skill={skill} />)}
//                     </div>
//                   </div>
//                 )}

//                 {/* Areas of Interest */}
//                 {areas.length > 0 && (
//                   <div className="py-5 border-b border-gray-200">
//                     <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "Cambria" }}>Areas of Interest</h3>
//                     <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                       {areas.map((area) => <SkillChip key={area} skill={area} />)}
//                     </div>
//                   </div>
//                 )}

//                 {/* Languages */}
//                 {mentor.languages?.length > 0 && (
//                   <div className="py-5 border-b border-gray-200">
//                     <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "Cambria" }}>Languages</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {mentor.languages.map((lang, i) => (
//                         <span key={i} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700" style={{ fontFamily: "Cambria" }}>{lang}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Reviews */}
//                 <div className="py-5">
//                   <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "Cambria" }}>Reviews & Comments</h3>
//                   <div className="space-y-4">
//                     {reviews?.length > 0 ? (
//                       reviews.map((review, index) => (
//                         <div key={review._id || index} className="border-b border-gray-100 pb-4">
//                           <div className="flex items-center gap-2 mb-2">
//                             {[1, 2, 3, 4, 5].map(s => (
//                               <Star key={s} size={11} fill={s <= (review.rating || 5) ? "#f59e0b" : "none"} stroke={s <= (review.rating || 5) ? "#f59e0b" : "#d1d5db"} />
//                             ))}
//                           </div>
//                           <p className="text-sm leading-6 text-gray-600 mb-3" style={{ fontFamily: "Cambria" }}>{review.review || review.comment}</p>
//                           <div className="flex items-center justify-between gap-3 flex-wrap">
//                             <div className="flex items-center gap-2.5">
//                               {review.user?.profileImage ? (
//                                 <img src={review.user.profileImage} alt={review.user?.name} className="w-7 h-7 rounded-full object-cover" />
//                               ) : (
//                                 <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: PRIMARY, fontFamily: "Cambria" }}>
//                                   {(review.user?.name || "U").split(" ").map(w => w[0]).slice(0, 2).join("")}
//                                 </div>
//                               )}
//                               <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Cambria" }}>{review.user?.name || "Anonymous User"}</span>
//                             </div>
//                             <span className="text-xs text-gray-400" style={{ fontFamily: "Cambria" }}>
//                               {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recently"}
//                             </span>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>No reviews yet. Be the first to leave one!</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ══ RIGHT SIDEBAR ══ */}
//           <div className="hidden lg:flex flex-col w-[300px] xl:w-[320px] flex-shrink-0 border-l border-gray-200 bg-white sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//             <div className="flex flex-col gap-0 divide-y divide-gray-100">

//               {/* Card 1: Book a Trial */}
//               <div className="p-5">
//                 <h3 className="text-base font-bold text-gray-900 leading-snug mb-4" style={{ fontFamily: "Cambria" }}>
//                   Book a Trial Session<br />
//                   <span className="text-gray-500 font-medium text-sm">to understand how {mentor.fullName?.split(" ")[0]} can help</span>
//                 </h3>

//                 <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-5">
//                   {trialBenefits.map((item, i) => (
//                     <div key={i} className="flex items-center gap-1.5">
//                       <span style={{ color: ACCENT }} className="flex-shrink-0">{item.icon}</span>
//                       <span className="text-xs text-gray-600" style={{ fontFamily: "Cambria" }}>{item.text}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setShowBooking(true)}
//                   className={`${btnPrimary} w-full !h-[46px] !text-sm`}
//                   style={{ fontFamily: "Cambria" }}
//                 >
//                   <Calendar size={14} />
//                   Book a Trial Session
//                 </button>
//               </div>

//               {/* Card 2: Take the next step */}
//               <div className="p-5">
//                 <h3 className="text-base font-bold text-gray-900 leading-snug mb-3" style={{ fontFamily: "Cambria" }}>
//                   Take the next step in,<br />
//                   <span>your career with {mentor.fullName?.split(" ")[0]} {mentor.fullName?.split(" ")[1] || ""}</span>
//                 </h3>

//                 {mentor.planPrice && (
//                   <div className="mb-4">
//                     <p className="text-xs text-gray-400 font-medium mb-0.5" style={{ fontFamily: "Cambria" }}>Starts at</p>
//                     <p className="text-2xl font-black text-gray-900" style={{ fontFamily: "Cambria" }}>
//                       ₹{mentor.planPrice.toLocaleString("en-IN")}
//                       <span className="text-sm font-medium text-gray-500">/month + taxes</span>
//                     </p>
//                   </div>
//                 )}

//                 <button
//                   onClick={goToPlans}
//                   className={`${btnSecondary} w-full !h-11 !text-sm`}
//                   style={{ fontFamily: "Cambria" }}
//                 >
//                   View Plans
//                 </button>

//                 <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
//                   {[
//                     { icon: <Calendar size={12} />, text: "1:1 Live Sessions" },
//                     { icon: <FileText size={12} />, text: "Resume & Portfolio Review" },
//                     { icon: <Award size={12} />, text: "Career Guidance" },
//                     { icon: <BookOpen size={12} />, text: "Study Material" },
//                     { icon: <Briefcase size={12} />, text: "Job Support" },
//                     { icon: <BadgeCheck size={12} />, text: "Completion Certificate" },
//                     { icon: <MessageCircle size={12} />, text: "Doubt Clearing" },
//                     { icon: <Users size={12} />, text: "Community Access" },
//                   ].map((item, i) => (
//                     <div key={i} className="flex items-center gap-2">
//                       <span style={{ color: ACCENT }} className="flex-shrink-0">{item.icon}</span>
//                       <span className="text-xs text-gray-600" style={{ fontFamily: "Cambria" }}>{item.text}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile sticky bottom CTA */}
//       <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
//         <button
//           onClick={goToPlans}
//           className={`${btnSecondary} flex-1 !h-11`}
//           style={{ fontFamily: "Cambria" }}
//         >
//           View Plans
//         </button>
//         <button
//           onClick={() => setShowBooking(true)}
//           className={`${btnPrimary} flex-1 !h-11`}
//           style={{ fontFamily: "Cambria" }}
//         >
//           <Calendar size={14} /> Book Trial
//         </button>
//       </div>

//       {/* Booking modal */}
//       {mentor && (
//         <BookingModal
//           mentor={mentor}
//           isOpen={bookingOpen}
//           onClose={() => { setBookingOpen(false); setSelectedSlotForModal(null); }}
//           selectedSlot={selectedSlotForModal}
//           appliedCoupon={null}
//           availableCoupons={[]}
//         />
//       )}
//     </>
//   );
// };

// export default ProfileModal;



import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart, Calendar, MapPin, Award, GraduationCap, Globe, Star,
  MessageCircle, CheckCircle, ExternalLink, Zap, ChevronLeft,
  ChevronRight, Clock, Briefcase, FileText, BadgeCheck, Video, Users,
  Building2, School, CalendarDays, Linkedin, X, Menu, ArrowLeft, BookOpen,
  Timer, GraduationCap as GradCap, Eye, EyeOff, Pencil, Trash2,
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

const PRIMARY = "#1a1a2e";
const ACCENT = "#0098cc";
const WHITE = "#ffffff";

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
  "express.js": `${DI}/express/express-original.svg`, "javascript": `${DI}/javascript/javascript-original.svg`,
  "js": `${DI}/javascript/javascript-original.svg`, "typescript": `${DI}/typescript/typescript-original.svg`,
  "ts": `${DI}/typescript/typescript-original.svg`, "graphql": `${DI}/graphql/graphql-plain.svg`,
  "mongodb": `${DI}/mongodb/mongodb-original.svg`, "mysql": `${DI}/mysql/mysql-original.svg`,
  "sql": `${DI}/mysql/mysql-original.svg`, "postgresql": `${DI}/postgresql/postgresql-original.svg`,
  "postgres": `${DI}/postgresql/postgresql-original.svg`, "redis": `${DI}/redis/redis-original.svg`,
  "firebase": `${DI}/firebase/firebase-plain.svg`, "python": `${DI}/python/python-original.svg`,
  "java": `${DI}/java/java-original.svg`, "c++": `${DI}/cplusplus/cplusplus-original.svg`,
  "cpp": `${DI}/cplusplus/cplusplus-original.svg`, "c#": `${DI}/csharp/csharp-original.svg`,
  "go": `${DI}/go/go-original.svg`, "golang": `${DI}/go/go-original.svg`,
  "rust": `${DI}/rust/rust-plain.svg`, "php": `${DI}/php/php-original.svg`,
  "ruby": `${DI}/ruby/ruby-original.svg`, "swift": `${DI}/swift/swift-original.svg`,
  "kotlin": `${DI}/kotlin/kotlin-original.svg`, "dart": `${DI}/dart/dart-original.svg`,
  "django": `${DI}/django/django-plain.svg`, "flask": `${DI}/flask/flask-original.svg`,
  "spring": `${DI}/spring/spring-original.svg`, "spring boot": `${DI}/spring/spring-original.svg`,
  "flutter": `${DI}/flutter/flutter-original.svg`, "fastapi": `${DI}/fastapi/fastapi-original.svg`,
  "aws": `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "azure": `${DI}/azure/azure-original.svg`, "gcp": `${DI}/googlecloud/googlecloud-original.svg`,
  "google cloud": `${DI}/googlecloud/googlecloud-original.svg`, "docker": `${DI}/docker/docker-original.svg`,
  "kubernetes": `${DI}/kubernetes/kubernetes-plain.svg`, "linux": `${DI}/linux/linux-original.svg`,
  "git": `${DI}/git/git-original.svg`, "github": `${DI}/github/github-original.svg`,
  "gitlab": `${DI}/gitlab/gitlab-original.svg`, "html": `${DI}/html5/html5-original.svg`,
  "css": `${DI}/css3/css3-original.svg`, "sass": `${DI}/sass/sass-original.svg`,
  "tailwind": `${DI}/tailwindcss/tailwindcss-plain.svg`, "bootstrap": `${DI}/bootstrap/bootstrap-original.svg`,
  "figma": `${DI}/figma/figma-original.svg`, "tensorflow": `${DI}/tensorflow/tensorflow-original.svg`,
  "pytorch": `${DI}/pytorch/pytorch-original.svg`, "pandas": `${DI}/pandas/pandas-original.svg`,
  "numpy": `${DI}/numpy/numpy-original.svg`, "vite": `${DI}/vite/vite-original.svg`,
  "jest": `${DI}/jest/jest-plain.svg`, "postman": `${DI}/postman/postman-original.svg`,
};
const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

const toYMD = (d) => { const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const dy = String(d.getDate()).padStart(2, "0"); return `${y}-${m}-${dy}`; };
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const isAuthError = (error) => {
  if (!error) return false;
  const data = error?.data || error;
  return data?.status_code === 400 || data?.status_code === 401 ||
    data?.message === "Auth Token is required" || error?.status === 401 || error?.status === 400;
};

/* ─── Format experience date ── */
const formatExpDate = (dateStr) => {
  if (!dateStr) return "";
  // dateStr like "2026-06" or "2026-06-15"
  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parts[1] ? parseInt(parts[1], 10) : null;
  if (!month) return year;
  const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthAbbr[month - 1]} ${year.slice(2)}`;
};

/* ─── Company Logo/Icon placeholder ── */
const CompanyIcon = ({ companyName }) => {
  const initials = companyName
    ? companyName.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "CO";
  // Generate a consistent soft color from company name
  const colors = ["#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0098cc"];
  const idx = companyName ? companyName.charCodeAt(0) % colors.length : 0;
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
      style={{ background: colors[idx], fontFamily: "Cambria" }}
    >
      {initials}
    </div>
  );
};

/* ─── Work Experience Item ── */
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
    <div className={`flex gap-4 py-5 ${!isLast ? "border-b border-gray-100" : ""}`}>
      {/* Date column */}
      <div className="w-[90px] sm:w-[110px] flex-shrink-0 pt-0.5">
        {dateRange && (
          <span className="text-xs text-gray-400 font-medium leading-snug" style={{ fontFamily: "Cambria" }}>
            {dateRange}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Role */}
        {exp.designation && (
          <p className="text-sm font-bold text-gray-900 leading-snug mb-1" style={{ fontFamily: "Cambria" }}>
            {exp.designation}
          </p>
        )}

        {/* Company with icon */}
        {exp.companyName && (
          <div className="flex items-center gap-2 mb-2">
            <CompanyIcon companyName={exp.companyName} />
            <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>
              {exp.companyName}
            </span>
          </div>
        )}

        {/* Meta: employment type, location */}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-2">
          {exp.employmentType && (
            <span className="text-xs text-gray-400" style={{ fontFamily: "Cambria" }}>{exp.employmentType}</span>
          )}
          {exp.location && (
            <span className="text-xs text-gray-400" style={{ fontFamily: "Cambria" }}>· {exp.location}</span>
          )}
        </div>

        {/* Description */}
        {desc && (
          <div>
            <p className="text-sm leading-6 text-gray-500" style={{ fontFamily: "Cambria" }}>
              {displayDesc}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-xs font-bold hover:underline mt-1"
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

/* ─── Skill Chip ── */
const SkillChip = ({ skill }) => {
  const icon = getSkillIcon(skill);
  const [imgErr, setImgErr] = useState(false);
  return (
    <span style={{ fontFamily: "Cambria" }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-800 text-xs font-semibold">
      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        {icon && !imgErr ? (
          <img src={icon} alt={skill} className="w-4 h-4 object-contain" onError={() => setImgErr(true)} />
        ) : (
          <span className="w-4 h-4 flex items-center justify-center text-white text-[7px] font-black rounded" style={{ background: PRIMARY }}>
            {skill.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap leading-none">{skill}</span>
    </span>
  );
};

/* ─── Mini Calendar ── */
const MiniMonthCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
  const today = new Date();
  const firstAvailableMonth = useMemo(() => {
    if (availableDates.size === 0) return new Date(today.getFullYear(), today.getMonth(), 1);
    const sorted = Array.from(availableDates).sort();
    const first = new Date(sorted[0] + "T00:00:00");
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
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setViewMonth(new Date(year, month - 1, 1))} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-150">
          <ChevronLeft size={14} className="text-gray-600" />
        </button>
        <span className="text-sm font-bold text-gray-900">{MONTH_NAMES[month]} {year}</span>
        <button onClick={() => setViewMonth(new Date(year, month + 1, 1))} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-150">
          <ChevronRight size={14} className="text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const ymd = toYMD(day);
          const isAvail = availableDates.has(ymd);
          const isSel = selectedDate === ymd;
          const isToday = ymd === toYMD(today);
          return (
            <button
              key={ymd}
              disabled={!isAvail}
              onClick={() => isAvail && onSelectDate(isSel ? null : ymd)}
              className="relative mx-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-150"
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
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: ACCENT }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Inline Booking Section ── */
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
  const slotsForSelectedDate = useMemo(() => selectedDate ? grouped[selectedDate] || [] : [], [selectedDate, grouped]);
  useEffect(() => {
    if (availableDatesSet.size > 0 && !selectedDate) {
      setSelectedDate(Array.from(availableDatesSet).sort()[0]);
    }
  }, [availableDatesSet]);
  const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
  return (
    <div className="animate-[slideInRight_0.35s_cubic-bezier(0.22,1,0.36,1)_forwards]" style={{ fontFamily: "Cambria" }}>
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
        <button onClick={onClose} className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-bold cursor-pointer border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap" style={{ fontFamily: "Cambria" }}>
          <ArrowLeft size={13} /> Back
        </button>
        <h2 className="text-base sm:text-lg font-bold text-gray-900" style={{ fontFamily: "Cambria" }}>Book a Trial Session</h2>
      </div>
      <div className="flex flex-col lg:flex-row border border-gray-200 rounded-xl overflow-hidden">
        <div className="lg:w-[268px] xl:w-[290px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 flex flex-col gap-4">
          <div className="pb-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden mb-2.5">
              {mentor.profilePhoto || mentor.profileImage ? (
                <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-black text-white" style={{ background: PRIMARY, fontFamily: "Cambria" }}>{initials}</div>
              )}
            </div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight" style={{ fontFamily: "Cambria" }}>{mentor.fullName}</h3>
            {mentor.currentRole && (
              <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "Cambria" }}>{mentor.currentRole}{mentor.companyName ? ` · ${mentor.companyName}` : ""}</p>
            )}
          </div>
          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-600" style={{ fontFamily: "Cambria" }}>
              <Video size={12} style={{ color: ACCENT }} />
              <span>Zoom link added after booking</span>
            </div>
          </div>
          <MiniMonthCalendar availableDates={availableDatesSet} selectedDate={selectedDate}
            onSelectDate={(dk) => { setSelectedDate(dk); setSelectedSlot(null); }} />
        </div>
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          <div className="flex-1 p-4 sm:p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4" style={{ fontFamily: "Cambria" }}>Select an appointment time</h3>
            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <Calendar size={32} className="text-gray-200 mb-3" />
                <p className="text-sm text-gray-400" style={{ fontFamily: "Cambria" }}>Select a date from the calendar</p>
              </div>
            ) : slotsForSelectedDate.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <Clock size={32} className="text-gray-200 mb-3" />
                <p className="text-sm text-gray-400" style={{ fontFamily: "Cambria" }}>No slots for this date</p>
                <button onClick={() => setSelectedDate(null)} className="mt-3 text-xs font-bold hover:underline" style={{ color: ACCENT, fontFamily: "Cambria" }}>
                  Choose another date
                </button>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.25s_ease_forwards]">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4" style={{ fontFamily: "Cambria" }}>
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {slotsForSelectedDate.map((slot) => {
                    const chosen = selectedSlot?._id === slot._id;
                    return (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(chosen ? null : slot)}
                        className="py-2.5 px-2 rounded-lg border text-xs font-bold transition-all duration-150 relative hover:scale-[1.03] active:scale-95"
                        style={{
                          background: chosen ? PRIMARY : WHITE,
                          color: chosen ? WHITE : slot.isBooked ? "#9ca3af" : ACCENT,
                          borderColor: chosen ? PRIMARY : slot.isBooked ? "#e5e7eb" : ACCENT,
                          fontFamily: "Cambria",
                        }}
                      >
                        {slot.startTime}
                        {slot.isBooked && !chosen && (
                          <span className="absolute top-0.5 right-0.5 text-[8px] font-bold px-1 rounded" style={{ border: "1px solid #e5e7eb", color: "#92400e", fontFamily: "Cambria" }}>Booked</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedSlot && (
                  <div className="animate-[fadeIn_0.25s_ease_forwards] mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500" style={{ fontFamily: "Cambria" }}>
                        Selected: <span className="font-bold" style={{ color: PRIMARY }}>{selectedSlot.startTime}</span>
                        {selectedSlot.endTime && <span className="text-gray-400"> – {selectedSlot.endTime}</span>}
                        {selectedSlot.isBooked && <span className="ml-2 text-amber-600 font-semibold">(Already Booked)</span>}
                      </p>
                    </div>
                    <button
                      onClick={() => onSlotConfirmed(selectedSlot)}
                      className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95 whitespace-nowrap"
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

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

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

  const { data: apiResponse, isLoading, isError, error } = useFetchMentorByIdQuery({ mentorId, currentStatus });

  const mentor = apiResponse?.data?.mentorDetails || apiResponse;
  const rawAvailability = apiResponse?.data?.mentorDetails?.availability || [];
  const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
  const userMenteeId = userData1?._id;

  useEffect(() => {
    if (isError && isAuthError(error)) navigate("/login", { replace: true });
  }, [isError, error, navigate]);

  useEffect(() => {
    if (showBooking) {
      setTimeout(() => document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [showBooking]);

  const goToPlans = () => navigate(`/mentor/${mentorId}/ltm-plans`, {
    state: { availableCoupons: apiResponse?.data?.availableCoupons || [] }
  });

  if (isLoading) return <div className="h-screen w-full bg-white flex items-center justify-center"><Loader /></div>;
  if (isError && isAuthError(error)) return null;
  if (isError || !mentor) return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 gap-4">
      <p className="text-red-500 text-sm text-center" style={{ fontFamily: "Cambria" }}>Failed to load profile</p>
      <button onClick={() => navigate("/mentors")} className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95" style={{ fontFamily: "Cambria" }}>
        ← Back to Mentors
      </button>
    </div>
  );

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

  // Experiences from mentor data
  const experiences = mentor.experiences || [];

  const trialBenefits = [
    { icon: <CheckCircle size={13} />, text: "Right-fit check" },
    { icon: <CheckCircle size={13} />, text: "Action plan" },
    { icon: <CheckCircle size={13} />, text: "Timeline clarity" },
    { icon: <CheckCircle size={13} />, text: "Pricing alignment" },
    { icon: <CheckCircle size={13} />, text: "Top bottlenecks" },
    { icon: <CheckCircle size={13} />, text: "Role-focused guidance" },
    { icon: <CheckCircle size={13} />, text: "Weekly milestones" },
    { icon: <Clock size={13} />, text: "30–40 min session" },
  ];

  const affiliations = [
    mentor.companyName && { label: mentor.companyName, icon: <Building2 size={13} style={{ color: ACCENT }} /> },
    mentor.schoolName && { label: mentor.schoolName, icon: <GraduationCap size={13} style={{ color: ACCENT }} /> },
  ].filter(Boolean);

  const btnPrimary = "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-[#1a1a2e] text-white hover:bg-[#0098cc] hover:border-[#0098cc] transition-colors duration-150 active:scale-95 whitespace-nowrap";
  const btnSecondary = "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap";
  const btnGhost = "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg text-sm font-bold cursor-pointer border-2 border-[#0098cc] bg-white text-[#0098cc] hover:bg-[#0098cc] hover:text-white transition-colors duration-150 active:scale-95 whitespace-nowrap";

  return (
    <>
      {/* ─── Navbar ─── */}
      <nav className="w-full bg-white border-b border-gray-100 z-50 sticky top-0" style={{ fontFamily: "Cambria" }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
            <img src={logo} alt="Karrivo Logo" className="h-9 sm:h-10 w-auto object-contain" />
            <h1 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: PRIMARY, fontFamily: "Cambria" }}>KARRIVO</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/explore-mentors")} className="text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors duration-150" style={{ fontFamily: "Cambria" }}>
              Explore Mentors
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/login")} className={`${btnSecondary} !h-[38px] !px-4 !text-xs`} style={{ fontFamily: "Cambria" }}>
              Login
            </button>
            <button className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg" onClick={() => setMobileMenuOpen(v => !v)}>
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
            <button onClick={() => { navigate("/explore-mentors"); setMobileMenuOpen(false); }} className="block w-full text-left text-sm font-semibold text-gray-700 py-2" style={{ fontFamily: "Cambria" }}>
              Explore Mentors
            </button>
          </div>
        )}
      </nav>

      {/* ─── Page ─── */}
      <div className="w-full bg-white min-h-[calc(100vh-57px)]" style={{ fontFamily: "Cambria" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">

          {/* ══ LEFT: Main Content ══ */}
          <div className="flex-1 min-w-0 lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {/* ── Banner ── */}
            <div className="relative">
              <div className="w-full h-28 sm:h-44 overflow-hidden" style={{ background: "#eef2f7" }}>
                {mentor.bannerImage ? (
                  <img src={mentor.bannerImage} alt="banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-xl sm:text-3xl font-bold text-gray-300 select-none tracking-tight px-6 text-center" style={{ fontFamily: "Cambria" }}>
                      {mentor.motivationQuote || "Grow · Learn · Succeed"}
                    </p>
                  </div>
                )}
              </div>

              <div className="px-4 sm:px-8 lg:px-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex justify-center sm:justify-start">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden flex-shrink-0" style={{ marginTop: -32 }}>
                      {mentor.profilePhoto || mentor.profileImage ? (
                        <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white" style={{ background: PRIMARY, fontFamily: "Cambria" }}>
                          {initials}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end gap-2 mt-2 sm:mt-0 sm:pb-2">
                    <button onClick={() => setWishlist(v => !v)} className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg transition-colors duration-150 hover:border-red-300" aria-label="Wishlist">
                      <Heart size={15} fill={wishlist ? "#ef4444" : "none"} stroke={wishlist ? "#ef4444" : "#6b7280"} />
                    </button>
                    <button onClick={() => setShowBooking(true)} className={`${btnSecondary} !h-9 !px-3.5 !text-xs`} style={{ fontFamily: "Cambria" }}>
                      Book a Trail Session
                    </button>
                    <button onClick={goToPlans} className={`${btnSecondary} !h-9 !px-3.5 !text-xs`} style={{ fontFamily: "Cambria" }}>
                      View Pricing
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Mentor info block ── */}
            <div className="px-4 sm:px-8 lg:px-10 pt-4 pb-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "Cambria" }}>{mentor.fullName}</h1>
                {mentor.isStar && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-yellow-300 text-yellow-700 text-xs font-bold" style={{ fontFamily: "Cambria" }}>
                    <Star size={10} fill="currentColor" /> Star Mentor
                  </span>
                )}
              </div>

              {mentor.currentRole && (
                <p className="text-sm text-gray-600 font-medium mb-2" style={{ fontFamily: "Cambria" }}>
                  {mentor.currentRole}{mentor.companyName ? ` at ${mentor.companyName}` : ""}
                </p>
              )}

              {bioText && (
                <div className="max-w-2xl mb-3">
                  <p className="text-sm leading-6 text-gray-600" style={{ fontFamily: "Cambria" }}>{bio}</p>
                  {bioLong && (
                    <button onClick={() => setShowFullBio(!showFullBio)} className="text-xs font-bold hover:underline mt-1" style={{ color: ACCENT, fontFamily: "Cambria" }}>
                      {showFullBio ? "read less" : "read more"}
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
                {avgRating && (
                  <div className="flex items-center gap-1.5">
                    <Star size={13} fill="#f59e0b" stroke="none" />
                    <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>{avgRating}</span>
                    <span className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>({totalReviews} {totalReviews === 1 ? "Review" : "Reviews"})</span>
                  </div>
                )}
                {mentor.totalSessionMins && (
                  <div className="flex items-center gap-1.5">
                    <Timer size={13} style={{ color: "#f97316" }} />
                    <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>{mentor.totalSessionMins}+</span>
                    <span className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>Mins</span>
                  </div>
                )}
                {mentor.yearsOfExperience && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={13} style={{ color: ACCENT }} />
                    <span className="text-sm font-bold text-gray-800" style={{ fontFamily: "Cambria" }}>{mentor.yearsOfExperience}+</span>
                    <span className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>Years of Experience</span>
                  </div>
                )}
              </div>

              {affiliations.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                  {affiliations.map(({ label, icon }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      {icon}
                      <span className="text-xs text-gray-600 font-medium" style={{ fontFamily: "Cambria" }}>{label}</span>
                    </div>
                  ))}
                  {mentor.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} style={{ color: ACCENT }} />
                      <span className="text-xs text-gray-600 font-medium" style={{ fontFamily: "Cambria" }}>{mentor.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Content area ── */}
            <div className="px-4 sm:px-8 lg:px-10 pb-24 lg:pb-8">

              {showBooking && (
                <div id="booking-section" className="mt-5">
                  <InlineBookingSection
                    mentor={mentor}
                    rawAvailability={rawAvailability}
                    onClose={() => setShowBooking(false)}
                    onSlotConfirmed={(slot) => { setSelectedSlotForModal(slot); setBookingOpen(true); }}
                  />
                </div>
              )}

              <div className="mt-5 space-y-0">

                {/* Education & Career */}
                {(mentor.currentRole || mentor.highestDegree || mentor.schoolName || mentor.yearsOfExperience) && (
                  <div className="py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "Cambria" }}>Education & Career</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        mentor.currentRole && { label: "Current Role", value: `${mentor.currentRole}${mentor.companyName ? ` At @ ${mentor.companyName}` : ""}`, icon: <Briefcase size={13} style={{ color: ACCENT }} /> },
                        mentor.highestDegree && {
                          label: "Degree",
                          value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` in ${mentor.fieldOfStudy}` : ""}`,
                          icon: <GraduationCap size={13} style={{ color: ACCENT }} />
                        },
                        mentor.schoolName && { label: "Institution", value: mentor.schoolName, icon: <School size={13} style={{ color: ACCENT }} /> },
                        mentor.yearsOfExperience && { label: "Experience", value: `${mentor.yearsOfExperience}+ Years of Experience`, icon: <BadgeCheck size={13} style={{ color: ACCENT }} /> },
                      ].filter(Boolean).map(({ label, value, icon }) => (
                        <div key={label} className="flex items-center gap-3 border border-gray-100 rounded-lg p-3">
                          <div className="w-7 h-7 rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0">{icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5" style={{ fontFamily: "Cambria" }}>{label}</p>
                            <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-snug break-words" style={{ fontFamily: "Cambria" }}>{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(mentor.linkedinUrl || mentor.resumeLink) && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                        {mentor.linkedinUrl && (
                          <a href={mentor.linkedinUrl} target="_blank" rel="noopener noreferrer" className={`${btnGhost} !h-9 !px-3.5 !text-xs`} style={{ fontFamily: "Cambria" }}>
                            <Linkedin size={12} /> LinkedIn <ExternalLink size={10} />
                          </a>
                        )}
                        {mentor.resumeLink && (
                          <a href={mentor.resumeLink} target="_blank" rel="noopener noreferrer" className={`${btnGhost} !h-9 !px-3.5 !text-xs`} style={{ fontFamily: "Cambria" }}>
                            <FileText size={12} /> Portfolio <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Work Experience ── */}
                {experiences.length > 0 && (
                  <div className="py-5 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900" style={{ fontFamily: "Cambria" }}>
                        Work Experience
                      </h3>
                     
                    </div>
                    <div>
                      {experiences.map((exp, idx) => (
                        <ExperienceItem
                          key={exp._id || idx}
                          exp={exp}
                          isLast={idx === experiences.length - 1}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Skills */}
                {skills.length > 0 && (
                  <div className="py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "Cambria" }}>Technical Skills</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {skills.map((skill) => <SkillChip key={skill} skill={skill} />)}
                    </div>
                  </div>
                )}

                {/* Areas of Interest */}
                {areas.length > 0 && (
                  <div className="py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "Cambria" }}>Areas of Interest</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {areas.map((area) => <SkillChip key={area} skill={area} />)}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {mentor.languages?.length > 0 && (
                  <div className="py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "Cambria" }}>Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.languages.map((lang, i) => (
                        <span key={i} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700" style={{ fontFamily: "Cambria" }}>{lang}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                <div className="py-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "Cambria" }}>Reviews & Comments</h3>
                  <div className="space-y-4">
                    {reviews?.length > 0 ? (
                      reviews.map((review, index) => (
                        <div key={review._id || index} className="border-b border-gray-100 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} size={11} fill={s <= (review.rating || 5) ? "#f59e0b" : "none"} stroke={s <= (review.rating || 5) ? "#f59e0b" : "#d1d5db"} />
                            ))}
                          </div>
                          <p className="text-sm leading-6 text-gray-600 mb-3" style={{ fontFamily: "Cambria" }}>{review.review || review.comment}</p>
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2.5">
                              {review.user?.profileImage ? (
                                <img src={review.user.profileImage} alt={review.user?.name} className="w-7 h-7 rounded-full object-cover" />
                              ) : (
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: PRIMARY, fontFamily: "Cambria" }}>
                                  {(review.user?.name || "U").split(" ").map(w => w[0]).slice(0, 2).join("")}
                                </div>
                              )}
                              <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Cambria" }}>{review.user?.name || "Anonymous User"}</span>
                            </div>
                            <span className="text-xs text-gray-400" style={{ fontFamily: "Cambria" }}>
                              {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recently"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500" style={{ fontFamily: "Cambria" }}>No reviews yet. Be the first to leave one!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <div className="hidden lg:flex flex-col w-[300px] xl:w-[320px] flex-shrink-0 border-l border-gray-200 bg-white sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-0 divide-y divide-gray-100">

              {/* Card 1: Book a Trial */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-4" style={{ fontFamily: "Cambria" }}>
                  Book a Trial Session<br />
                  <span className="text-gray-500 font-medium text-sm">to understand how {mentor.fullName?.split(" ")[0]} can help</span>
                </h3>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-5">
                  {trialBenefits.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span style={{ color: ACCENT }} className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xs text-gray-600" style={{ fontFamily: "Cambria" }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setShowBooking(true)} className={`${btnPrimary} w-full !h-[46px] !text-sm`} style={{ fontFamily: "Cambria" }}>
                  <Calendar size={14} />
                  Book a Trial Session
                </button>
              </div>

              {/* Card 2: Take the next step */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-3" style={{ fontFamily: "Cambria" }}>
                  Take the next step in,<br />
                  <span>your career with {mentor.fullName?.split(" ")[0]} {mentor.fullName?.split(" ")[1] || ""}</span>
                </h3>

                {mentor.planPrice && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 font-medium mb-0.5" style={{ fontFamily: "Cambria" }}>Starts at</p>
                    <p className="text-2xl font-black text-gray-900" style={{ fontFamily: "Cambria" }}>
                      ₹{mentor.planPrice.toLocaleString("en-IN")}
                      <span className="text-sm font-medium text-gray-500">/month + taxes</span>
                    </p>
                  </div>
                )}

                <button onClick={goToPlans} className={`${btnSecondary} w-full !h-11 !text-sm`} style={{ fontFamily: "Cambria" }}>
                  View Plans
                </button>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  {[
                    { icon: <Calendar size={12} />, text: "1:1 Live Sessions" },
                    { icon: <FileText size={12} />, text: "Resume & Portfolio Review" },
                    { icon: <Award size={12} />, text: "Career Guidance" },
                    { icon: <BookOpen size={12} />, text: "Study Material" },
                    { icon: <Briefcase size={12} />, text: "Job Support" },
                    { icon: <BadgeCheck size={12} />, text: "Completion Certificate" },
                    { icon: <MessageCircle size={12} />, text: "Doubt Clearing" },
                    { icon: <Users size={12} />, text: "Community Access" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span style={{ color: ACCENT }} className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xs text-gray-600" style={{ fontFamily: "Cambria" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
        <button onClick={goToPlans} className={`${btnSecondary} flex-1 !h-11`} style={{ fontFamily: "Cambria" }}>
          View Plans
        </button>
        <button onClick={() => setShowBooking(true)} className={`${btnPrimary} flex-1 !h-11`} style={{ fontFamily: "Cambria" }}>
          <Calendar size={14} /> Book Trial
        </button>
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

