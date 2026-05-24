


// import React, { useState, useMemo, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Heart, Calendar, MapPin, Award, GraduationCap, Globe, Star,
//   MessageCircle, CheckCircle, ExternalLink, Zap, ChevronLeft,
//   ChevronRight, Clock, Briefcase, FileText, BadgeCheck, Video, Users,
//   Building2, School, CalendarDays, Linkedin,
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

// /* ─── Cambria-only global font injection ─────────────────────── */
// const FONT_STYLE = `
//   *, *::before, *::after {
//     font-family: Cambria, 'Times New Roman', Georgia, serif !important;
//   }
// `;

// /* ─── Skill Icon Map ───────────────────────────────────────── */
// const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
// const SKILL_ICON_MAP = {
//   "react": `${DI}/react/react-original.svg`,
//   "react js": `${DI}/react/react-original.svg`,
//   "react.js": `${DI}/react/react-original.svg`,
//   "reactjs": `${DI}/react/react-original.svg`,
//   "react native": `${DI}/react/react-original.svg`,
//   "next": `${DI}/nextjs/nextjs-original.svg`,
//   "next js": `${DI}/nextjs/nextjs-original.svg`,
//   "next.js": `${DI}/nextjs/nextjs-original.svg`,
//   "nextjs": `${DI}/nextjs/nextjs-original.svg`,
//   "vue": `${DI}/vuejs/vuejs-original.svg`,
//   "vue.js": `${DI}/vuejs/vuejs-original.svg`,
//   "vuejs": `${DI}/vuejs/vuejs-original.svg`,
//   "angular": `${DI}/angularjs/angularjs-original.svg`,
//   "svelte": `${DI}/svelte/svelte-original.svg`,
//   "node": `${DI}/nodejs/nodejs-original.svg`,
//   "node.js": `${DI}/nodejs/nodejs-original.svg`,
//   "nodejs": `${DI}/nodejs/nodejs-original.svg`,
//   "express": `${DI}/express/express-original.svg`,
//   "express.js": `${DI}/express/express-original.svg`,
//   "javascript": `${DI}/javascript/javascript-original.svg`,
//   "js": `${DI}/javascript/javascript-original.svg`,
//   "typescript": `${DI}/typescript/typescript-original.svg`,
//   "ts": `${DI}/typescript/typescript-original.svg`,
//   "graphql": `${DI}/graphql/graphql-plain.svg`,
//   "mongodb": `${DI}/mongodb/mongodb-original.svg`,
//   "mysql": `${DI}/mysql/mysql-original.svg`,
//   "sql": `${DI}/mysql/mysql-original.svg`,
//   "postgresql": `${DI}/postgresql/postgresql-original.svg`,
//   "postgres": `${DI}/postgresql/postgresql-original.svg`,
//   "redis": `${DI}/redis/redis-original.svg`,
//   "firebase": `${DI}/firebase/firebase-plain.svg`,
//   "python": `${DI}/python/python-original.svg`,
//   "java": `${DI}/java/java-original.svg`,
//   "c++": `${DI}/cplusplus/cplusplus-original.svg`,
//   "cpp": `${DI}/cplusplus/cplusplus-original.svg`,
//   "c#": `${DI}/csharp/csharp-original.svg`,
//   "go": `${DI}/go/go-original.svg`,
//   "golang": `${DI}/go/go-original.svg`,
//   "rust": `${DI}/rust/rust-plain.svg`,
//   "php": `${DI}/php/php-original.svg`,
//   "ruby": `${DI}/ruby/ruby-original.svg`,
//   "swift": `${DI}/swift/swift-original.svg`,
//   "kotlin": `${DI}/kotlin/kotlin-original.svg`,
//   "dart": `${DI}/dart/dart-original.svg`,
//   "django": `${DI}/django/django-plain.svg`,
//   "flask": `${DI}/flask/flask-original.svg`,
//   "spring": `${DI}/spring/spring-original.svg`,
//   "spring boot": `${DI}/spring/spring-original.svg`,
//   "flutter": `${DI}/flutter/flutter-original.svg`,
//   "fastapi": `${DI}/fastapi/fastapi-original.svg`,
//   "aws": `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
//   "azure": `${DI}/azure/azure-original.svg`,
//   "gcp": `${DI}/googlecloud/googlecloud-original.svg`,
//   "google cloud": `${DI}/googlecloud/googlecloud-original.svg`,
//   "docker": `${DI}/docker/docker-original.svg`,
//   "kubernetes": `${DI}/kubernetes/kubernetes-plain.svg`,
//   "linux": `${DI}/linux/linux-original.svg`,
//   "git": `${DI}/git/git-original.svg`,
//   "github": `${DI}/github/github-original.svg`,
//   "gitlab": `${DI}/gitlab/gitlab-original.svg`,
//   "html": `${DI}/html5/html5-original.svg`,
//   "css": `${DI}/css3/css3-original.svg`,
//   "sass": `${DI}/sass/sass-original.svg`,
//   "tailwind": `${DI}/tailwindcss/tailwindcss-plain.svg`,
//   "bootstrap": `${DI}/bootstrap/bootstrap-original.svg`,
//   "figma": `${DI}/figma/figma-original.svg`,
//   "tensorflow": `${DI}/tensorflow/tensorflow-original.svg`,
//   "pytorch": `${DI}/pytorch/pytorch-original.svg`,
//   "pandas": `${DI}/pandas/pandas-original.svg`,
//   "numpy": `${DI}/numpy/numpy-original.svg`,
//   "vite": `${DI}/vite/vite-original.svg`,
//   "jest": `${DI}/jest/jest-plain.svg`,
// };
// const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

// /* ─── Helpers ───────────────────────────────────────────────── */
// const now = new Date();
// const isSlotPast = (dateStr, startTime) => {
//   const [h, m] = startTime.split(":").map(Number);
//   const d = new Date(dateStr + "T00:00:00");
//   d.setHours(h, m, 0, 0);
//   return d < now;
// };
// const toYMD = (d) => d.toISOString().slice(0, 10);
// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// /* ─── Check if error is auth-related ──────────────────────── */
// const isAuthError = (error) => {
//   if (!error) return false;
//   // RTK Query wraps errors in error.data or error.status
//   const data = error?.data || error;
//   return (
//     data?.status_code === 400 ||
//     data?.status_code === 401 ||
//     data?.message === "Auth Token is required" ||
//     error?.status === 401 ||
//     error?.status === 400
//   );
// };

// /* ─── Skill Chip ────────────────────────────────────────────── */
// const SkillChip = ({ skill }) => {
//   const icon = getSkillIcon(skill);
//   const [imgErr, setImgErr] = useState(false);
//   return (
//     <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-800 text-sm font-medium shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200">
//       <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
//         {icon && !imgErr ? (
//           <img src={icon} alt={skill} className="w-5 h-5 object-contain" onError={() => setImgErr(true)} />
//         ) : (
//           <span className="w-5 h-5 flex items-center justify-center bg-gray-100 text-gray-600 text-[8px] font-bold rounded-full">
//             {skill.slice(0, 2).toUpperCase()}
//           </span>
//         )}
//       </span>
//       <span className="whitespace-nowrap leading-none">{skill}</span>
//     </span>
//   );
// };

// /* ─── Mini Calendar ─────────────────────────────────────────── */
// const MiniCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
//   const today = new Date();
//   const [viewYear, setViewYear] = useState(today.getFullYear());
//   const [viewMonth, setViewMonth] = useState(today.getMonth());

//   const firstDay = new Date(viewYear, viewMonth, 1).getDay();
//   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

//   const prevMonth = () =>
//     viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
//   const nextMonth = () =>
//     viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1);

//   const cells = [];
//   for (let i = 0; i < firstDay; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(d);

//   return (
//     <div className="w-full select-none">
//       <div className="flex items-center justify-between mb-3">
//         <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
//           <ChevronLeft size={14} className="text-gray-500" />
//         </button>
//         <span className="text-sm font-semibold text-gray-800">
//           {MONTH_NAMES[viewMonth]} {viewYear}
//         </span>
//         <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
//           <ChevronRight size={14} className="text-gray-500" />
//         </button>
//       </div>

//       <div className="grid grid-cols-7 mb-1">
//         {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
//           <div key={d} className="text-center text-[10px] font-semibold text-gray-400 tracking-wide">{d}</div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7">
//         {cells.map((day, idx) => {
//           if (!day) return <div key={`e-${idx}`} className="h-8" />;
//           const ymd = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
//           const isAvail = availableDates.has(ymd);
//           const isSel = selectedDate === ymd;
//           const isPast = new Date(ymd) < new Date(toYMD(today));
//           const isToday = ymd === toYMD(today);
//           return (
//             <div key={ymd} className="flex justify-center items-center h-8">
//               <button
//                 disabled={!isAvail || isPast}
//                 onClick={() => isAvail && !isPast && onSelectDate(isSel ? null : ymd)}
//                 className={`relative w-7 h-7 flex items-center justify-center text-xs font-semibold transition-all rounded-full
//                   ${isSel
//                     ? "bg-gray-900 text-white"
//                     : isAvail && !isPast
//                       ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-500 hover:text-white cursor-pointer"
//                       : isToday
//                         ? "ring-1 ring-gray-400 text-gray-600"
//                         : isPast
//                           ? "text-gray-300 cursor-default"
//                           : "text-gray-400 cursor-default"}`}
//               >
//                 {day}
//                 {isAvail && !isPast && !isSel && (
//                   <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
//                 )}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════ */
// const ProfileModal = () => {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();

//   const [bookingOpen, setBookingOpen] = useState(false);
//   const [showFullBio, setShowFullBio] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [reviewText, setReviewText] = useState("");
//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewSubmitted, setReviewSubmitted] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("trial");
//   const [mobilePanel, setMobilePanel] = useState(false);
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponInput, setCouponInput] = useState("");
//   const [couponError, setCouponError] = useState("");

//   const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
//   const [submitReview, { isLoading: submittingReview }] = useSubmitReviewMutation();
//   const reviews = reviewsData?.reviews || [];

//   const cookieData = Cookies.get("profileData");
//   const userData = cookieData ? JSON.parse(cookieData) : null;
//   const currentStatus = userData?.profile?.currentStatus;

//   const { data: mentor, isLoading, isError, error } = useFetchMentorByIdQuery({ mentorId, currentStatus });
//   const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
//   const userMenteeId = userData1?._id;

//   /* ── Auth error → redirect to login ── */
//   useEffect(() => {
//     if (isError && isAuthError(error)) {
//       navigate("/login", { replace: true });
//     }
//   }, [isError, error, navigate]);

//   const handleReviewSubmit = async () => {
//     if (!reviewText.trim()) return;
//     try {
//       await submitReview({
//         mentorId, menteeId: userMenteeId, rating: reviewRating, comment: reviewText.trim(),
//       }).unwrap();
//       setReviewText(""); setReviewRating(5); setReviewSubmitted(true);
//       setTimeout(() => setReviewSubmitted(false), 3000);
//     } catch (err) {
//       // Check if review submit also triggers auth error
//       if (isAuthError(err)) navigate("/login", { replace: true });
//       console.error(err);
//     }
//   };

//   const coupons = mentor?.ResCoupons || [];
//   const trialUsed = mentor?.freeTrial?.usedCount >= mentor?.freeTrial?.totalAllowed;

//   const getDiscountedPrice = (amount) => {
//     if (!appliedCoupon) return amount;
//     return Math.round(amount - (amount * appliedCoupon.discountValue) / 100);
//   };

//   /* ── Build serializable coupon list for navigation ── */
//   const buildCouponPayload = () =>
//     coupons.map((c) => ({
//       couponId: c._id,
//       couponCode: c.couponCode,
//       discountValue: c.discountValue,
//       appliesForDuration: c.appliesForDuration,
//       expiryDate: c.expiryDate,
//       isActive: c.isActive,
//     }));

//   /* ── Navigate to LTM plans, passing all coupon data ── */
//   const goToPlans = () => {
//     navigate(`/mentor/${mentorId}/ltm-plans`, {
//       state: {
//         availableCoupons: buildCouponPayload(),
//         appliedCoupon: appliedCoupon
//           ? {
//             couponId: appliedCoupon._id,
//             couponCode: appliedCoupon.couponCode,
//             discountValue: appliedCoupon.discountValue,
//           }
//           : null,
//       },
//     });
//   };

//   const handleApplyCoupon = (code, tab) => {
//     const tabMonths = tab === "one_month" ? 1 : tab === "three_months" ? 3 : 6;
//     const found = coupons.find(
//       (c) =>
//         c.couponCode === code.trim().toUpperCase() &&
//         c.isActive &&
//         c.appliesForDuration.includes(tabMonths)
//     );
//     if (found) {
//       setAppliedCoupon(found);
//       setCouponError("");
//     } else {
//       setAppliedCoupon(null);
//       setCouponError("Invalid coupon or not applicable for this plan.");
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponInput("");
//     setCouponError("");
//   };

//   const hasSlots = Array.isArray(mentor?.weeklyAvailability) && mentor.weeklyAvailability.length > 0;
//   const grouped = useMemo(() => {
//     if (!hasSlots) return {};
//     return mentor.weeklyAvailability.reduce((acc, slot) => {
//       const dk = slot.date.slice(0, 10);
//       if (!acc[dk]) acc[dk] = [];
//       acc[dk].push({ ...slot, date: dk });
//       return acc;
//     }, {});
//   }, [mentor, hasSlots]);

//   const availableDatesSet = useMemo(() => {
//     const s = new Set();
//     Object.entries(grouped).forEach(([dk, slots]) => {
//       if (slots.some((sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime))) s.add(dk);
//     });
//     return s;
//   }, [grouped]);

//   const slotsForSelectedDate = selectedDate ? (grouped[selectedDate] || []) : [];
//   const nextAvailable = Array.from(availableDatesSet).sort()[0];
//   const nextAvailableLabel = nextAvailable
//     ? new Date(nextAvailable + "T00:00:00").toLocaleDateString("en-IN", {
//       weekday: "short", month: "short", day: "numeric", year: "numeric",
//     })
//     : null;

//   /* ── Loading / Error ── */
//   if (isLoading) return (
//     <div className="h-screen w-full bg-white flex items-center justify-center">
//       <Loader />
//     </div>
//   );

//   // If auth error, useEffect above handles redirect — show nothing while redirecting
//   if (isError && isAuthError(error)) return null;

//   if (isError || !mentor) return (
//     <div className="h-screen w-full bg-white flex items-center justify-center">
//       <div className="text-center px-4">
//         <p className="text-red-500 mb-4 text-base">Failed to load profile</p>
//         <button
//           onClick={() => navigate("/mentors")}
//           className="bg-gray-900 text-white px-6 py-3 font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           ← Back to Mentors
//         </button>
//       </div>
//     </div>
//   );

//   /* ── Derived fields ── */
//   const skills = mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
//   const areas = mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
//   const bioText = mentor.motivationStatement || mentor.bio || "";
//   const bioLong = bioText.length > 400;
//   const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 400) + "…";
//   const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
//   const joined = mentor.createdAt
//     ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
//     : null;
//   const firstName = mentor.fullName?.split(" ")[0] ?? "Mentor";

//   /* ─── Right Panel ─────────────────────────────────────────── */
//   const RightPanel = () => (
//     <div className="flex flex-col h-full bg-white">
//       {/* Toggle */}
//       <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
//         <div className="grid grid-cols-2 gap-1.5 bg-gray-100 p-1 rounded-xl">
//           {["trial", "plans"].map((opt) => (
//             <button
//               key={opt}
//               onClick={() => setSelectedOption(opt)}
//               className={`py-2 text-sm font-semibold rounded-lg transition-all ${selectedOption === opt
//                 ? "bg-white text-gray-900 shadow-sm"
//                 : "text-gray-500 hover:text-gray-700"
//                 }`}
//             >
//               {opt === "trial" ? "Book Free Trial" : "View Plans"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── TRIAL PANEL ── */}
//       {selectedOption === "trial" && (
//         <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
//           <div className="flex flex-col px-3 py-2 space-y-2 h-full">

//             {/* Calendar Card */}
//             <div className="bg-white border border-black/10 rounded-lg shadow-sm p-2">
//               <p className="text-xs font-semibold text-black mb-0.5">
//                 Select your preferred date
//               </p>
//               <p className="text-[10px] text-black/60 mb-2 leading-relaxed">
//                 Highlighted dates show mentor availability.
//               </p>
//               <MiniCalendar
//                 availableDates={availableDatesSet}
//                 selectedDate={selectedDate}
//                 onSelectDate={(dk) => { setSelectedDate(dk); setSelectedSlot(null); }}
//               />
//             </div>

//             {/* Time Slots */}
//             {selectedDate && slotsForSelectedDate.length > 0 && (
//               <div className="bg-white border border-black/10 rounded-lg p-2">
//                 <p className="text-[10px] font-semibold text-black tracking-widest mb-2 uppercase">
//                   {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
//                     weekday: "short", month: "short", day: "numeric",
//                   })}
//                 </p>
//                 <div className="flex flex-wrap gap-1">
//                   {slotsForSelectedDate.map((slot) => {
//                     const chosen = selectedSlot?._id === slot._id;
//                     const isPast = isSlotPast(slot.date, slot.startTime);
//                     const isDisabled = slot.isBooked || isPast;
//                     return (
//                       <button
//                         key={slot._id}
//                         disabled={isDisabled}
//                         onClick={() => !isDisabled && setSelectedSlot(chosen ? null : slot)}
//                         className={`flex items-center gap-1 px-2 py-1 text-[10px] font-medium border rounded-full transition-all ${isDisabled
//                           ? "opacity-40 cursor-not-allowed border-black/10 bg-black/5 text-black/40"
//                           : chosen
//                             ? "border-black bg-black text-white"
//                             : "border-black/20 bg-white text-black hover:border-black"
//                           }`}
//                       >
//                         <Clock size={10} />
//                         {slot.startTime}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* CTA Footer */}
//             <div className="mt-auto pt-2">
//               <button
//                 disabled={!selectedSlot}
//                 onClick={() => setBookingOpen(true)}
//                 className={`w-full py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${selectedSlot
//                   ? "bg-black text-white hover:bg-black/90"
//                   : "bg-black text-white opacity-40 cursor-not-allowed"
//                   }`}
//               >
//                 <Calendar size={13} />
//                 {selectedSlot ? "Book Your Trial Session" : "Select a Time Slot"}
//               </button>
//               {nextAvailableLabel && !selectedSlot && (
//                 <p className="text-center text-[10px] text-black/60 mt-1">
//                   Next available:{" "}
//                   <span className="font-semibold text-black">{nextAvailableLabel}</span>
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── PLANS PANEL ── */}
//       {selectedOption === "plans" && (
//         <div className="flex-1 overflow-y-auto px-4 py-4">
//           <div className="mb-3">
//             <h2 className="text-lg font-bold text-gray-900 leading-snug">
//               Take the next step in your career with {firstName}
//             </h2>
//           </div>
//           <div className="mb-4">
//             <p className="text-xs text-gray-500 mb-2">LTM Plan Includes</p>
//             <div className="space-y-2">
//               {[
//                 "1:1 Personalized Mentorship",
//                 "Weekly Career Guidance Sessions",
//                 "Resume + LinkedIn Profile Review",
//                 "Mock Interviews & Referral Support",
//               ].map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <CheckCircle size={14} className="text-[#1d8e85] flex-shrink-0" />
//                   <p className="text-sm text-gray-800 font-medium leading-snug">{feature}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA Card */}
//           <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
//             <button
//               onClick={goToPlans}
//               className="w-full bg-white py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
//             >
//               View All Plans
//             </button>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-2 border border-gray-200 rounded-xl overflow-hidden">
//             {[
//               { title: "Mentorship Sessions", subtitle: "Weekly 1:1 mentor guidance", icon: <Calendar size={14} /> },
//               { title: "Guaranteed Referrals", subtitle: "Community of mentors", icon: <Award size={14} /> },
//               { title: "LinkedIn & Resume", subtitle: "Get noticed by recruiters", icon: <FileText size={14} /> },
//               { title: "Completion Certificate", subtitle: "Shareable certificate", icon: <BadgeCheck size={14} /> },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className={`p-3 border-gray-200 ${index % 2 === 0 ? "border-r" : ""} ${index < 4 ? "border-b" : ""}`}
//               >
//                 <div className="flex items-start gap-2">
//                   <div className="text-gray-600 mt-0.5 flex-shrink-0">{item.icon}</div>
//                   <div>
//                     <p className="text-xs font-semibold text-gray-900 leading-snug">{item.title}</p>
//                     <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{item.subtitle}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   /* ════════════════════ RENDER ════════════════════ */
//   return (
//     <>
//       <style>{FONT_STYLE}</style>

//       {/* ─── Navbar ─────────────────────────────────────────── */}
//       <nav className="w-full bg-white border-b border-gray-100 z-50 sticky top-0">
//         <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between">
//           <div className="flex items-center gap-3 cursor-pointer">
//             <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
//             <h1 className="text-xl font-bold text-black tracking-tight">KARRIVO</h1>
//           </div>

//           <div className="hidden md:flex items-center gap-10">
//             <button
//               onClick={() => navigate("/explore-mentors")}
//               className="text-sm font-bold text-gray-700 hover:text-gray-900 transition"
//             >
//               Explore Mentors
//             </button>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/login")}
//               className="px-8 py-2 text-sm font-medium text-[#1f2937] bg-transparent border border-gray-300 rounded-md hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-all duration-300"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ─── Page wrapper ───────────────────────────────────── */}
//       <div className="w-full bg-white" style={{ minHeight: "calc(100vh - 57px)" }}>
//         <div className="max-w-[1400px] px-0 sm:px-0 lg:px-8 flex flex-col lg:flex-row lg:h-[calc(100vh-57px)]">
//           {/* ══ LEFT — scrollable ══ */}
//           <div
//             className="flex-1 min-w-0 lg:overflow-y-auto bg-white"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none", overflowY: "auto" }}
//           >
//             <style>{`div::-webkit-scrollbar { display: none; }`}</style>

//             {/* Banner */}
//             <div className="relative w-full h-[140px] sm:h-[180px] overflow-hidden" style={{ background: "#f6f2ed" }}>
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
//                 <p className="text-[#1f2937] text-[22px] sm:text-[30px] font-bold tracking-tight">
//                   Connect with Expert Mentors
//                 </p>
//                 <p className="text-[#1f2937]/60 text-sm sm:text-base mt-2 max-w-xl">
//                   Personalized guidance for your career growth, learning, and success
//                 </p>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="px-5 sm:px-8 lg:px-10 pb-8">

//               {/* ─── Profile Header ─── */}
//               <div className="relative -mt-12 sm:-mt-14">
//                 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

//                   {/* Avatar + name */}
//                   <div className="flex flex-col xs:flex-row xs:items-end gap-3">
//                     <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden shadow-md flex-shrink-0">
//                       {mentor.profilePhoto || mentor.profileImage ? (
//                         <img
//                           src={mentor.profilePhoto || mentor.profileImage}
//                           alt={mentor.fullName}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-3xl font-black text-gray-400">
//                           {initials}
//                         </div>
//                       )}
//                     </div>

//                     <div className="pb-1">
//                       <div className="flex flex-wrap items-center gap-2 mb-1">
//                         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
//                           {mentor.fullName}
//                         </h1>
//                       </div>
//                       <div className="flex flex-wrap items-center gap-3 sm:gap-4">
//                         {mentor.yearsOfExperience && (
//                           <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                             <Briefcase size={13} className="text-blue-500 flex-shrink-0" />
//                             {mentor.yearsOfExperience}+ yrs experience
//                           </div>
//                         )}
//                         {mentor.companyName && (
//                           <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                             <Building2 size={13} className="text-blue-500 flex-shrink-0" />
//                             {mentor.companyName}
//                           </div>
//                         )}
//                         {mentor.schoolName && (
//                           <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                             <GraduationCap size={13} className="text-blue-500 flex-shrink-0" />
//                             {mentor.schoolName}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right actions */}
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={goToPlans}
//                       className="h-[42px] px-5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
//                     >
//                       View Pricing
//                     </button>
//                     <button
//                       onClick={() => setMobilePanel(true)}
//                       className="lg:hidden h-[42px] px-5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition shadow-sm"
//                     >
//                       Book Trial
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* ─── About ─── */}
//               <div className="pt-5 pb-5 border-b border-gray-200">
//                 <h2 className="text-xl font-bold text-gray-900 mb-2">About</h2>
//                 <div className="max-w-3xl">
//                   <p className="text-[14px] leading-7 text-gray-600 whitespace-pre-line">{bio}</p>
//                   {bioLong && (
//                     <button
//                       onClick={() => setShowFullBio(!showFullBio)}
//                       className="mt-3 text-sm text-blue-600 hover:underline font-medium"
//                     >
//                       {showFullBio ? "read less" : "read more"}
//                     </button>
//                   )}
//                 </div>

//                 {(mentor.location || mentor.languages?.length > 0) && (
//                   <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5">
//                     {mentor.location && (
//                       <div>
//                         <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Find Me Here</p>
//                         <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
//                           <MapPin size={13} className="text-gray-500 flex-shrink-0" />
//                           <span className="text-sm text-gray-700">{mentor.location}</span>
//                         </div>
//                       </div>
//                     )}
//                     {mentor.languages?.length > 0 && (
//                       <div className="md:border-l md:border-gray-200 md:pl-5">
//                         <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Languages I Speak</p>
//                         <div className="flex flex-wrap gap-2">
//                           {mentor.languages.map((lang, i) => (
//                             <div key={i} className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-sm text-gray-700">
//                               {lang}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* ─── Education & Career ─── */}
//               <div className="py-5 border-b border-gray-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Education & Career</h3>
//                 <div className="relative flex flex-col gap-4">
//                   <div className="absolute left-[15px] top-3 bottom-3 w-[2px] bg-[#1a1a2e]" />
//                   {[
//                     mentor.currentRole && {
//                       label: "Current Role",
//                       value: `${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`,
//                       icon: <Briefcase size={15} className="text-[#1d8e85]" />,
//                     },
//                     mentor.highestDegree && {
//                       label: "Degree",
//                       value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` · ${mentor.fieldOfStudy}` : ""}`,
//                       icon: <GraduationCap size={15} className="text-[#1d8e85]" />,
//                     },
//                     mentor.schoolName && {
//                       label: "Institution",
//                       value: mentor.schoolName,
//                       icon: <School size={15} className="text-[#1d8e85]" />,
//                     },
//                     mentor.yearsOfExperience && {
//                       label: "Experience",
//                       value: `${mentor.yearsOfExperience}+ years`,
//                       icon: <BadgeCheck size={15} className="text-[#1d8e85]" />,
//                     },
//                     joined && {
//                       label: "Member Since",
//                       value: joined,
//                       icon: <CalendarDays size={15} className="text-[#1d8e85]" />,
//                     },
//                   ]
//                     .filter(Boolean)
//                     .map(({ label, value, icon }) => (
//                       <div
//                         key={label}
//                         className="relative flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-all"
//                       >
//                         <div className="relative z-10 w-8 h-8 rounded-lg bg-[#f0faf8] flex items-center justify-center flex-shrink-0">
//                           {icon}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">{label}</p>
//                           <p className="text-sm text-gray-800 font-medium leading-snug">{value}</p>
//                         </div>
//                       </div>
//                     ))}
//                 </div>

//                 {(mentor.linkedinUrl || mentor.resumeLink) && (
//                   <div className="flex flex-wrap gap-2.5 mt-4 pt-4 border-t border-gray-100">
//                     {mentor.linkedinUrl && (
//                       <a
//                         href={mentor.linkedinUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="px-3.5 py-2 border border-blue-100 rounded-lg text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
//                       >
//                         <Linkedin size={13} />
//                         View LinkedIn
//                         <ExternalLink size={11} />
//                       </a>
//                     )}
//                     {mentor.resumeLink && (
//                       <a
//                         href={mentor.resumeLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="px-3.5 py-2 border border-blue-100 rounded-lg text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
//                       >
//                         <FileText size={13} />
//                         Open Portfolio
//                         <ExternalLink size={11} />
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* ─── Technical Skills ─── */}
//               {skills.length > 0 && (
//                 <div className="py-5 border-b border-gray-200">
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">Technical Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {skills.map((skill) => <SkillChip key={skill} skill={skill} />)}
//                   </div>
//                 </div>
//               )}

//               {/* ─── Areas of Interest ─── */}
//               {areas.length > 0 && (
//                 <div className="py-5 border-b border-gray-200">
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">Areas of Interest</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {areas.map((area) => <SkillChip key={area} skill={area} />)}
//                   </div>
//                 </div>
//               )}

//               {/* ─── Reviews ─── */}
//               <div className="py-5">
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">Reviews & Comments</h3>
//                 <div className="space-y-4">
//                   {reviews?.length > 0 ? (
//                     reviews.map((review, index) => (
//                       <div key={review._id || index} className="border-b border-gray-200 pb-4">
//                         <p className="text-sm leading-7 text-gray-600 mb-3">
//                           {review.review || review.comment}
//                         </p>
//                         <div className="flex items-center justify-between gap-3 flex-wrap">
//                           <div className="flex items-center gap-2.5">
//                             {review.user?.profileImage ? (
//                               <img
//                                 src={review.user.profileImage}
//                                 alt={review.user?.name}
//                                 className="w-8 h-8 rounded-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 uppercase">
//                                 {(review.user?.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("")}
//                               </div>
//                             )}
//                             <span className="text-sm font-semibold text-gray-800">
//                               {review.user?.name || "Anonymous User"}
//                             </span>
//                           </div>
//                           <span className="text-xs text-gray-400">
//                             {review.createdAt
//                               ? new Date(review.createdAt).toLocaleDateString("en-IN", {
//                                 day: "numeric", month: "short", year: "numeric",
//                               })
//                               : "Recently"}
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-sm text-gray-500">No reviews yet. Be the first to leave one!</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ══ RIGHT — fixed sidebar (desktop only) ══ */}
//           <div className="hidden lg:flex flex-col w-[320px] xl:w-[350px] flex-shrink-0 border-l border-gray-200 overflow-hidden">
//             <RightPanel />
//           </div>
//         </div>
//       </div>

//       {/* ══ MOBILE BOTTOM SHEET ══ */}
//       {mobilePanel && (
//         <div className="fixed inset-0 z-50 flex items-end lg:hidden">
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//             onClick={() => setMobilePanel(false)}
//           />
//           <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[90vh] min-h-0 flex flex-col overflow-hidden">
//             <div className="flex-shrink-0 flex justify-center pt-3 pb-2">
//               <div className="w-10 h-1 bg-gray-300 rounded-full" />
//             </div>
//             <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
//               <RightPanel />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Booking Modal */}
//       {mentor && (
//         <BookingModal
//           mentor={mentor}
//           isOpen={bookingOpen}
//           onClose={() => setBookingOpen(false)}
//           selectedSlot={selectedSlot}
//           appliedCoupon={appliedCoupon}
//           availableCoupons={coupons}
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
  Building2, School, CalendarDays, Linkedin, X, Menu,
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

/* ─── Global Font ─────────────────────────────────────────── */
const FONT_STYLE = `
  *, *::before, *::after {
    font-family: Cambria, 'Times New Roman', Georgia, serif !important;
  }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

  /* Smooth sheet animation */
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .sheet-enter  { animation: slideUp 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .overlay-enter{ animation: fadeIn  0.25s ease forwards; }
`;

/* ─── Skill Icon Map ───────────────────────────────────────── */
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SKILL_ICON_MAP = {
  "react": `${DI}/react/react-original.svg`,
  "react js": `${DI}/react/react-original.svg`,
  "react.js": `${DI}/react/react-original.svg`,
  "reactjs": `${DI}/react/react-original.svg`,
  "react native": `${DI}/react/react-original.svg`,
  "next": `${DI}/nextjs/nextjs-original.svg`,
  "next js": `${DI}/nextjs/nextjs-original.svg`,
  "next.js": `${DI}/nextjs/nextjs-original.svg`,
  "nextjs": `${DI}/nextjs/nextjs-original.svg`,
  "vue": `${DI}/vuejs/vuejs-original.svg`,
  "vue.js": `${DI}/vuejs/vuejs-original.svg`,
  "vuejs": `${DI}/vuejs/vuejs-original.svg`,
  "angular": `${DI}/angularjs/angularjs-original.svg`,
  "svelte": `${DI}/svelte/svelte-original.svg`,
  "node": `${DI}/nodejs/nodejs-original.svg`,
  "node.js": `${DI}/nodejs/nodejs-original.svg`,
  "nodejs": `${DI}/nodejs/nodejs-original.svg`,
  "express": `${DI}/express/express-original.svg`,
  "express.js": `${DI}/express/express-original.svg`,
  "javascript": `${DI}/javascript/javascript-original.svg`,
  "js": `${DI}/javascript/javascript-original.svg`,
  "typescript": `${DI}/typescript/typescript-original.svg`,
  "ts": `${DI}/typescript/typescript-original.svg`,
  "graphql": `${DI}/graphql/graphql-plain.svg`,
  "mongodb": `${DI}/mongodb/mongodb-original.svg`,
  "mysql": `${DI}/mysql/mysql-original.svg`,
  "sql": `${DI}/mysql/mysql-original.svg`,
  "postgresql": `${DI}/postgresql/postgresql-original.svg`,
  "postgres": `${DI}/postgresql/postgresql-original.svg`,
  "redis": `${DI}/redis/redis-original.svg`,
  "firebase": `${DI}/firebase/firebase-plain.svg`,
  "python": `${DI}/python/python-original.svg`,
  "java": `${DI}/java/java-original.svg`,
  "c++": `${DI}/cplusplus/cplusplus-original.svg`,
  "cpp": `${DI}/cplusplus/cplusplus-original.svg`,
  "c#": `${DI}/csharp/csharp-original.svg`,
  "go": `${DI}/go/go-original.svg`,
  "golang": `${DI}/go/go-original.svg`,
  "rust": `${DI}/rust/rust-plain.svg`,
  "php": `${DI}/php/php-original.svg`,
  "ruby": `${DI}/ruby/ruby-original.svg`,
  "swift": `${DI}/swift/swift-original.svg`,
  "kotlin": `${DI}/kotlin/kotlin-original.svg`,
  "dart": `${DI}/dart/dart-original.svg`,
  "django": `${DI}/django/django-plain.svg`,
  "flask": `${DI}/flask/flask-original.svg`,
  "spring": `${DI}/spring/spring-original.svg`,
  "spring boot": `${DI}/spring/spring-original.svg`,
  "flutter": `${DI}/flutter/flutter-original.svg`,
  "fastapi": `${DI}/fastapi/fastapi-original.svg`,
  "aws": `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "azure": `${DI}/azure/azure-original.svg`,
  "gcp": `${DI}/googlecloud/googlecloud-original.svg`,
  "google cloud": `${DI}/googlecloud/googlecloud-original.svg`,
  "docker": `${DI}/docker/docker-original.svg`,
  "kubernetes": `${DI}/kubernetes/kubernetes-plain.svg`,
  "linux": `${DI}/linux/linux-original.svg`,
  "git": `${DI}/git/git-original.svg`,
  "github": `${DI}/github/github-original.svg`,
  "gitlab": `${DI}/gitlab/gitlab-original.svg`,
  "html": `${DI}/html5/html5-original.svg`,
  "css": `${DI}/css3/css3-original.svg`,
  "sass": `${DI}/sass/sass-original.svg`,
  "tailwind": `${DI}/tailwindcss/tailwindcss-plain.svg`,
  "bootstrap": `${DI}/bootstrap/bootstrap-original.svg`,
  "figma": `${DI}/figma/figma-original.svg`,
  "tensorflow": `${DI}/tensorflow/tensorflow-original.svg`,
  "pytorch": `${DI}/pytorch/pytorch-original.svg`,
  "pandas": `${DI}/pandas/pandas-original.svg`,
  "numpy": `${DI}/numpy/numpy-original.svg`,
  "vite": `${DI}/vite/vite-original.svg`,
  "jest": `${DI}/jest/jest-plain.svg`,
};
const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

/* ─── Helpers ───────────────────────────────────────────────── */
const now = new Date();
const isSlotPast = (dateStr, startTime) => {
  const [h, m] = startTime.split(":").map(Number);
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return d < now;
};
const toYMD = (d) => d.toISOString().slice(0, 10);
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ─── Auth error check ──────────────────────────────────────── */
const isAuthError = (error) => {
  if (!error) return false;
  const data = error?.data || error;
  return (
    data?.status_code === 400 ||
    data?.status_code === 401 ||
    data?.message === "Auth Token is required" ||
    error?.status === 401 ||
    error?.status === 400
  );
};

/* ─── Skill Chip ────────────────────────────────────────────── */
const SkillChip = ({ skill }) => {
  const icon = getSkillIcon(skill);
  const [imgErr, setImgErr] = useState(false);
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-800 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200">
      <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
        {icon && !imgErr ? (
          <img src={icon} alt={skill} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" onError={() => setImgErr(true)} />
        ) : (
          <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gray-100 text-gray-600 text-[7px] sm:text-[8px] font-bold rounded-full">
            {skill.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap leading-none">{skill}</span>
    </span>
  );
};

/* ─── Mini Calendar ─────────────────────────────────────────── */
const MiniCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () =>
    viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
  const nextMonth = () =>
    viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-full select-none">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={14} className="text-gray-500" />
        </button>
        <span className="text-sm font-semibold text-gray-800">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 tracking-wide">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} className="h-8" />;
          const ymd = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isAvail = availableDates.has(ymd);
          const isSel = selectedDate === ymd;
          const isPast = new Date(ymd) < new Date(toYMD(today));
          const isToday = ymd === toYMD(today);
          return (
            <div key={ymd} className="flex justify-center items-center h-8">
              <button
                disabled={!isAvail || isPast}
                onClick={() => isAvail && !isPast && onSelectDate(isSel ? null : ymd)}
                aria-label={`${day} ${MONTH_NAMES[viewMonth]}`}
                aria-pressed={isSel}
                className={`relative w-7 h-7 flex items-center justify-center text-xs font-semibold transition-all rounded-full
                  ${isSel
                    ? "bg-gray-900 text-white"
                    : isAvail && !isPast
                      ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-500 hover:text-white cursor-pointer"
                      : isToday
                        ? "ring-1 ring-gray-400 text-gray-600"
                        : isPast
                          ? "text-gray-300 cursor-default"
                          : "text-gray-400 cursor-default"}`}
              >
                {day}
                {isAvail && !isPast && !isSel && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("trial");
  const [mobilePanel, setMobilePanel] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
  const [submitReview, { isLoading: submittingReview }] = useSubmitReviewMutation();
  const reviews = reviewsData?.reviews || [];

  const cookieData = Cookies.get("profileData");
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const currentStatus = userData?.profile?.currentStatus;

  const { data: mentor, isLoading, isError, error } = useFetchMentorByIdQuery({ mentorId, currentStatus });
  const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
  const userMenteeId = userData1?._id;

  /* ── Lock body scroll when mobile panel is open ── */
  useEffect(() => {
    if (mobilePanel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobilePanel]);

  /* ── Auth error → redirect ── */
  useEffect(() => {
    if (isError && isAuthError(error)) {
      navigate("/login", { replace: true });
    }
  }, [isError, error, navigate]);

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) return;
    try {
      await submitReview({
        mentorId, menteeId: userMenteeId, rating: reviewRating, comment: reviewText.trim(),
      }).unwrap();
      setReviewText(""); setReviewRating(5); setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    } catch (err) {
      if (isAuthError(err)) navigate("/login", { replace: true });
      console.error(err);
    }
  };

  const coupons = mentor?.ResCoupons || [];
  const trialUsed = mentor?.freeTrial?.usedCount >= mentor?.freeTrial?.totalAllowed;

  const getDiscountedPrice = (amount) => {
    if (!appliedCoupon) return amount;
    return Math.round(amount - (amount * appliedCoupon.discountValue) / 100);
  };

  const buildCouponPayload = () =>
    coupons.map((c) => ({
      couponId: c._id,
      couponCode: c.couponCode,
      discountValue: c.discountValue,
      appliesForDuration: c.appliesForDuration,
      expiryDate: c.expiryDate,
      isActive: c.isActive,
    }));

  const goToPlans = () => {
    navigate(`/mentor/${mentorId}/ltm-plans`, {
      state: {
        availableCoupons: buildCouponPayload(),
        appliedCoupon: appliedCoupon
          ? {
            couponId: appliedCoupon._id,
            couponCode: appliedCoupon.couponCode,
            discountValue: appliedCoupon.discountValue,
          }
          : null,
      },
    });
  };

  const handleApplyCoupon = (code, tab) => {
    const tabMonths = tab === "one_month" ? 1 : tab === "three_months" ? 3 : 6;
    const found = coupons.find(
      (c) =>
        c.couponCode === code.trim().toUpperCase() &&
        c.isActive &&
        c.appliesForDuration.includes(tabMonths)
    );
    if (found) {
      setAppliedCoupon(found);
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon or not applicable for this plan.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const hasSlots = Array.isArray(mentor?.weeklyAvailability) && mentor.weeklyAvailability.length > 0;
  const grouped = useMemo(() => {
    if (!hasSlots) return {};
    return mentor.weeklyAvailability.reduce((acc, slot) => {
      const dk = slot.date.slice(0, 10);
      if (!acc[dk]) acc[dk] = [];
      acc[dk].push({ ...slot, date: dk });
      return acc;
    }, {});
  }, [mentor, hasSlots]);

  const availableDatesSet = useMemo(() => {
    const s = new Set();
    Object.entries(grouped).forEach(([dk, slots]) => {
      if (slots.some((sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime))) s.add(dk);
    });
    return s;
  }, [grouped]);

  const slotsForSelectedDate = selectedDate ? (grouped[selectedDate] || []) : [];
  const nextAvailable = Array.from(availableDatesSet).sort()[0];
  const nextAvailableLabel = nextAvailable
    ? new Date(nextAvailable + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    })
    : null;

  /* ── States ── */
  if (isLoading) return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <Loader />
    </div>
  );
  if (isError && isAuthError(error)) return null;
  if (isError || !mentor) return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4">
      <p className="text-red-500 mb-4 text-base text-center">Failed to load profile</p>
      <button
        onClick={() => navigate("/mentors")}
        className="bg-gray-900 text-white px-6 py-3 font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors"
      >
        ← Back to Mentors
      </button>
    </div>
  );

  /* ── Derived fields ── */
  const skills = mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
  const areas = mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
  const bioText = mentor.motivationStatement || mentor.bio || "";
  const bioLong = bioText.length > 400;
  const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 400) + "…";
  const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
  const joined = mentor.createdAt
    ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;
  const firstName = mentor.fullName?.split(" ")[0] ?? "Mentor";

  /* ─── Right / Booking Panel ──────────────────────────────── */
  const BookingPanel = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Toggle */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
        <div className="grid grid-cols-2 gap-1.5 bg-gray-100 p-1 rounded-xl">
          {["trial", "plans"].map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedOption(opt)}
              className={`py-2 text-sm font-semibold rounded-lg transition-all ${selectedOption === opt
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {opt === "trial" ? "Book Free Trial" : "View Plans"}
            </button>
          ))}
        </div>
      </div>

      {/* ── TRIAL PANEL ── */}
      {selectedOption === "trial" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto hide-scrollbar px-3 py-2 flex flex-col gap-2">

            {/* Calendar Card */}
            <div className="bg-white border border-black/10 rounded-lg shadow-sm p-3">
              <p className="text-xs font-semibold text-black mb-0.5">
                Select your preferred date
              </p>
              <p className="text-[10px] text-black/60 mb-2 leading-relaxed">
                Highlighted dates show mentor availability.
              </p>
              <MiniCalendar
                availableDates={availableDatesSet}
                selectedDate={selectedDate}
                onSelectDate={(dk) => { setSelectedDate(dk); setSelectedSlot(null); }}
              />
            </div>

            {/* Time Slots */}
            {selectedDate && slotsForSelectedDate.length > 0 && (
              <div className="bg-white border border-black/10 rounded-lg p-3">
                <p className="text-[10px] font-semibold text-black tracking-widest mb-2 uppercase">
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "short", month: "short", day: "numeric",
                  })}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {slotsForSelectedDate.map((slot) => {
                    const chosen = selectedSlot?._id === slot._id;
                    const isPast = isSlotPast(slot.date, slot.startTime);
                    const isDisabled = slot.isBooked || isPast;
                    return (
                      <button
                        key={slot._id}
                        disabled={isDisabled}
                        onClick={() => !isDisabled && setSelectedSlot(chosen ? null : slot)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium border rounded-full transition-all ${isDisabled
                          ? "opacity-40 cursor-not-allowed border-black/10 bg-black/5 text-black/40"
                          : chosen
                            ? "border-black bg-black text-white"
                            : "border-black/20 bg-white text-black hover:border-black"
                          }`}
                      >
                        <Clock size={10} />
                        {slot.startTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No slots message */}
            {selectedDate && slotsForSelectedDate.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">No slots available for this date.</p>
              </div>
            )}
          </div>

          {/* CTA Footer — always visible at bottom */}
          <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-gray-100 bg-white">
            <button
              disabled={!selectedSlot}
              onClick={() => setBookingOpen(true)}
              className={`w-full py-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${selectedSlot
                ? "bg-black text-white hover:bg-black/90 active:scale-[0.98]"
                : "bg-black text-white opacity-40 cursor-not-allowed"
                }`}
            >
              <Calendar size={13} />
              {selectedSlot ? "Book Your Trial Session" : "Select a Time Slot"}
            </button>
            {nextAvailableLabel && !selectedSlot && (
              <p className="text-center text-[10px] text-black/60 mt-1.5">
                Next available:{" "}
                <span className="font-semibold text-black">{nextAvailableLabel}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── PLANS PANEL ── */}
      {selectedOption === "plans" && (
        <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-4">
          <div className="mb-3">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Take the next step in your career with {firstName}
            </h2>
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">LTM Plan Includes</p>
            <div className="space-y-2">
              {[
                "1:1 Personalized Mentorship",
                "Weekly Career Guidance Sessions",
                "Resume + LinkedIn Profile Review",
                "Mock Interviews & Referral Support",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#1d8e85] flex-shrink-0" />
                  <p className="text-sm text-gray-800 font-medium leading-snug">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <button
              onClick={goToPlans}
              className="w-full bg-white py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition active:scale-[0.98]"
            >
              View All Plans
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 border border-gray-200 rounded-xl overflow-hidden">
            {[
              { title: "Mentorship Sessions", subtitle: "Weekly 1:1 mentor guidance", icon: <Calendar size={14} /> },
              { title: "Guaranteed Referrals", subtitle: "Community of mentors", icon: <Award size={14} /> },
              { title: "LinkedIn & Resume", subtitle: "Get noticed by recruiters", icon: <FileText size={14} /> },
              { title: "Completion Certificate", subtitle: "Shareable certificate", icon: <BadgeCheck size={14} /> },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-3 border-gray-200 ${index % 2 === 0 ? "border-r" : ""} ${index < 2 ? "border-b" : ""}`}
              >
                <div className="flex items-start gap-2">
                  <div className="text-gray-600 mt-0.5 flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 leading-snug">{item.title}</p>
                    <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ══════════════════ RENDER ══════════════════ */
  return (
    <>
      <style>{FONT_STYLE}</style>

      {/* ─── Navbar ─────────────────────────────────────────── */}
      <nav className="w-full bg-white border-b border-gray-100 z-50 sticky top-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Karrivo Logo" className="h-9 sm:h-11 w-auto object-contain" />
            <h1 className="text-base sm:text-xl font-bold text-black tracking-tight">KARRIVO</h1>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/explore-mentors")}
              className="text-sm font-bold text-gray-700 hover:text-gray-900 transition"
            >
              Explore Mentors
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 sm:px-8 py-2 text-xs sm:text-sm font-medium text-[#1f2937] bg-transparent border border-gray-300 rounded-md hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-all duration-300 whitespace-nowrap"
            >
              Login
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
            <button
              onClick={() => { navigate("/explore-mentors"); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm font-semibold text-gray-700 py-2 hover:text-gray-900 transition"
            >
              Explore Mentors
            </button>
          </div>
        )}
      </nav>

      {/* ─── Page wrapper ───────────────────────────────────── */}
      <div className="w-full bg-white" style={{ minHeight: "calc(100vh - 57px)" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:h-[calc(100vh-57px)]">

          {/* ══ LEFT — main content, scrollable ══ */}
          <div className="flex-1 min-w-0 lg:overflow-y-auto hide-scrollbar bg-white">

            {/* Banner */}
            <div
              className="relative w-full h-[110px] xs:h-[130px] sm:h-[160px] md:h-[180px] overflow-hidden"
              style={{ background: "#f6f2ed" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <p className="text-[#1f2937] text-lg xs:text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-tight">
                  Connect with Expert Mentors
                </p>
                <p className="text-[#1f2937]/60 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
                  Personalized guidance for your career growth, learning, and success
                </p>
              </div>
            </div>

            {/* Content area */}
            <div className="px-4 xs:px-5 sm:px-8 lg:px-10 pb-24 lg:pb-8">

              {/* ─── Profile Header ─── */}
              <div className="relative -mt-10 xs:-mt-12 sm:-mt-14">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

                  {/* Avatar + name block */}
                  <div className="flex flex-row items-end gap-3 sm:gap-4">
                    {/* Avatar */}
                    <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden shadow-md flex-shrink-0">
                      {mentor.profilePhoto || mentor.profileImage ? (
                        <img
                          src={mentor.profilePhoto || mentor.profileImage}
                          alt={mentor.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-black text-gray-400">
                          {initials}
                        </div>
                      )}
                    </div>

                    {/* Name + meta */}
                    <div className="pb-1 min-w-0">
                      <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 leading-tight truncate">
                        {mentor.fullName}
                      </h1>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        {mentor.yearsOfExperience && (
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                            <Briefcase size={11} className="text-blue-500 flex-shrink-0" />
                            <span>{mentor.yearsOfExperience}+ yrs</span>
                          </div>
                        )}
                        {mentor.companyName && (
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
                            <Building2 size={11} className="text-blue-500 flex-shrink-0" />
                            <span className="truncate max-w-[120px] sm:max-w-none">{mentor.companyName}</span>
                          </div>
                        )}
                        {mentor.schoolName && (
                          <div className="hidden sm:flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
                            <GraduationCap size={11} className="text-blue-500 flex-shrink-0" />
                            <span className="truncate max-w-[140px] sm:max-w-none">{mentor.schoolName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <button
                      onClick={goToPlans}
                      className="h-9 sm:h-[42px] px-4 sm:px-5 rounded-full border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
                    >
                      View Pricing
                    </button>
                    {/* Book Trial — visible on all screens < lg; hidden on lg+ (sidebar handles it) */}
                    <button
                      onClick={() => setMobilePanel(true)}
                      className="lg:hidden h-9 sm:h-[42px] px-4 sm:px-5 rounded-full bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition shadow-sm"
                    >
                      Book Trial
                    </button>
                  </div>
                </div>
              </div>

              {/* ─── About ─── */}
              <div className="pt-5 pb-5 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">About</h2>
                <div className="max-w-3xl">
                  <p className="text-sm leading-7 text-gray-600 whitespace-pre-line">{bio}</p>
                  {bioLong && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="mt-3 text-sm text-blue-600 hover:underline font-medium"
                    >
                      {showFullBio ? "read less" : "read more"}
                    </button>
                  )}
                </div>

                {(mentor.location || mentor.languages?.length > 0) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {mentor.location && (
                      <div>
                        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Find Me Here</p>
                        <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                          <MapPin size={13} className="text-gray-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{mentor.location}</span>
                        </div>
                      </div>
                    )}
                    {mentor.languages?.length > 0 && (
                      <div className="sm:border-l sm:border-gray-200 sm:pl-5">
                        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Languages I Speak</p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.languages.map((lang, i) => (
                            <div key={i} className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-sm text-gray-700">
                              {lang}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── Education & Career ─── */}
              <div className="py-5 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Education & Career</h3>
                <div className="relative flex flex-col gap-3">
                  {/* Timeline line — only on sm+ where items are larger */}
                  <div className="hidden sm:block absolute left-[15px] top-3 bottom-3 w-[2px] bg-[#1a1a2e]" />
                  {[
                    mentor.currentRole && {
                      label: "Current Role",
                      value: `${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`,
                      icon: <Briefcase size={14} className="text-[#1d8e85]" />,
                    },
                    mentor.highestDegree && {
                      label: "Degree",
                      value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` · ${mentor.fieldOfStudy}` : ""}`,
                      icon: <GraduationCap size={14} className="text-[#1d8e85]" />,
                    },
                    mentor.schoolName && {
                      label: "Institution",
                      value: mentor.schoolName,
                      icon: <School size={14} className="text-[#1d8e85]" />,
                    },
                    mentor.yearsOfExperience && {
                      label: "Experience",
                      value: `${mentor.yearsOfExperience}+ years`,
                      icon: <BadgeCheck size={14} className="text-[#1d8e85]" />,
                    },
                    joined && {
                      label: "Member Since",
                      value: joined,
                      icon: <CalendarDays size={14} className="text-[#1d8e85]" />,
                    },
                  ]
                    .filter(Boolean)
                    .map(({ label, value, icon }) => (
                      <div
                        key={label}
                        className="relative flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-all"
                      >
                        <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#f0faf8] flex items-center justify-center flex-shrink-0">
                          {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">{label}</p>
                          <p className="text-xs sm:text-sm text-gray-800 font-medium leading-snug break-words">{value}</p>
                        </div>
                      </div>
                    ))}
                </div>

                {(mentor.linkedinUrl || mentor.resumeLink) && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    {mentor.linkedinUrl && (
                      <a
                        href={mentor.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
                      >
                        <Linkedin size={12} />
                        View LinkedIn
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {mentor.resumeLink && (
                      <a
                        href={mentor.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
                      >
                        <FileText size={12} />
                        Open Portfolio
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* ─── Technical Skills ─── */}
              {skills.length > 0 && (
                <div className="py-5 border-b border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skills.map((skill) => <SkillChip key={skill} skill={skill} />)}
                  </div>
                </div>
              )}

              {/* ─── Areas of Interest ─── */}
              {areas.length > 0 && (
                <div className="py-5 border-b border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Areas of Interest</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {areas.map((area) => <SkillChip key={area} skill={area} />)}
                  </div>
                </div>
              )}

              {/* ─── Reviews ─── */}
              <div className="py-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Reviews & Comments</h3>
                <div className="space-y-4">
                  {reviews?.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={review._id || index} className="border-b border-gray-200 pb-4">
                        <p className="text-sm leading-7 text-gray-600 mb-3">
                          {review.review || review.comment}
                        </p>
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-2.5">
                            {review.user?.profileImage ? (
                              <img
                                src={review.user.profileImage}
                                alt={review.user?.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 uppercase">
                                {(review.user?.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("")}
                              </div>
                            )}
                            <span className="text-sm font-semibold text-gray-800">
                              {review.user?.name || "Anonymous User"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {review.createdAt
                              ? new Date(review.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric",
                              })
                              : "Recently"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No reviews yet. Be the first to leave one!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT — fixed sidebar, desktop only (lg+) ══ */}
          <div className="hidden lg:flex flex-col w-[320px] xl:w-[360px] flex-shrink-0 border-l border-gray-200 overflow-hidden">
            <BookingPanel />
          </div>
        </div>
      </div>

      {/* ══ Sticky bottom CTA bar — mobile/tablet only ══ */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shadow-lg">
        <button
          onClick={goToPlans}
          className="flex-1 h-11 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-[0.97]"
        >
          View Plans
        </button>
        <button
          onClick={() => setMobilePanel(true)}
          className="flex-1 h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition active:scale-[0.97] flex items-center justify-center gap-2"
        >
          <Calendar size={15} />
          Book Free Trial
        </button>
      </div>

      {/* ══ MOBILE / TABLET BOTTOM SHEET ══ */}
      {mobilePanel && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          {/* Backdrop */}
          <div
            className="overlay-enter absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobilePanel(false)}
          />
          {/* Sheet */}
          <div className="sheet-enter relative w-full bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "92dvh", minHeight: "60dvh" }}
          >
            {/* Drag handle + close */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto" />
              <button
                onClick={() => setMobilePanel(false)}
                className="absolute right-4 top-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X size={14} className="text-gray-600" />
              </button>
            </div>
            {/* Panel content */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              <BookingPanel />
            </div>
          </div>
        </div>
      )}

      {/* ══ Booking Modal ══ */}
      {mentor && (
        <BookingModal
          mentor={mentor}
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          selectedSlot={selectedSlot}
          appliedCoupon={appliedCoupon}
          availableCoupons={coupons}
        />
      )}
    </>
  );
};

export default ProfileModal;


