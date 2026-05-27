

// //   // import React, { useState, useMemo, useEffect } from "react";
// //   // import { useParams, useNavigate } from "react-router-dom";
// //   // import {
// //   //   Heart, Calendar, MapPin, Award, GraduationCap, Globe, Star,
// //   //   MessageCircle, CheckCircle, ExternalLink, Zap, ChevronLeft,
// //   //   ChevronRight, Clock, Briefcase, FileText, BadgeCheck, Video, Users,
// //   //   Building2, School, CalendarDays, Linkedin, X, Menu,
// //   // } from "lucide-react";
// //   // import Cookies from "js-cookie";
// //   // import {
// //   //   useFetchMentorByIdQuery,
// //   //   useFetchMentorReviewsQuery,
// //   //   useSubmitReviewMutation,
// //   // } from "../../topMentors/Mentorsectionapislice";
// //   // import BookingModal from "./BookingModal";
// //   // import Loader from "../../../global/Loader";
// //   // import logo from "../../../assets/karrivoSymbol.png";

// //   // /* ─── Global Font ─────────────────────────────────────────── */
// //   // const FONT_STYLE = `
// //   //   *, *::before, *::after {
// //   //     font-family: Cambria, 'Times New Roman', Georgia, serif !important;
// //   //   }
// //   //   .hide-scrollbar::-webkit-scrollbar { display: none; }
// //   //   .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

// //   //   @keyframes slideUp {
// //   //     from { transform: translateY(100%); opacity: 0; }
// //   //     to   { transform: translateY(0);    opacity: 1; }
// //   //   }
// //   //   @keyframes fadeIn {
// //   //     from { opacity: 0; }
// //   //     to   { opacity: 1; }
// //   //   }
// //   //   .sheet-enter  { animation: slideUp 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
// //   //   .overlay-enter{ animation: fadeIn  0.25s ease forwards; }
// //   // `;

// //   // /* ─── Skill Icon Map ───────────────────────────────────────── */
// //   // const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
// //   // const SKILL_ICON_MAP = {
// //   //   "react": `${DI}/react/react-original.svg`,
// //   //   "react js": `${DI}/react/react-original.svg`,
// //   //   "react.js": `${DI}/react/react-original.svg`,
// //   //   "reactjs": `${DI}/react/react-original.svg`,
// //   //   "react native": `${DI}/react/react-original.svg`,
// //   //   "next": `${DI}/nextjs/nextjs-original.svg`,
// //   //   "next js": `${DI}/nextjs/nextjs-original.svg`,
// //   //   "next.js": `${DI}/nextjs/nextjs-original.svg`,
// //   //   "nextjs": `${DI}/nextjs/nextjs-original.svg`,
// //   //   "vue": `${DI}/vuejs/vuejs-original.svg`,
// //   //   "vue.js": `${DI}/vuejs/vuejs-original.svg`,
// //   //   "vuejs": `${DI}/vuejs/vuejs-original.svg`,
// //   //   "angular": `${DI}/angularjs/angularjs-original.svg`,
// //   //   "svelte": `${DI}/svelte/svelte-original.svg`,
// //   //   "node": `${DI}/nodejs/nodejs-original.svg`,
// //   //   "node.js": `${DI}/nodejs/nodejs-original.svg`,
// //   //   "nodejs": `${DI}/nodejs/nodejs-original.svg`,
// //   //   "express": `${DI}/express/express-original.svg`,
// //   //   "express.js": `${DI}/express/express-original.svg`,
// //   //   "javascript": `${DI}/javascript/javascript-original.svg`,
// //   //   "js": `${DI}/javascript/javascript-original.svg`,
// //   //   "typescript": `${DI}/typescript/typescript-original.svg`,
// //   //   "ts": `${DI}/typescript/typescript-original.svg`,
// //   //   "graphql": `${DI}/graphql/graphql-plain.svg`,
// //   //   "mongodb": `${DI}/mongodb/mongodb-original.svg`,
// //   //   "mongo db": `${DI}/mongodb/mongodb-original.svg`,
// //   //   "mysql": `${DI}/mysql/mysql-original.svg`,
// //   //   "sql": `${DI}/mysql/mysql-original.svg`,
// //   //   "postgresql": `${DI}/postgresql/postgresql-original.svg`,
// //   //   "postgres": `${DI}/postgresql/postgresql-original.svg`,
// //   //   "redis": `${DI}/redis/redis-original.svg`,
// //   //   "firebase": `${DI}/firebase/firebase-plain.svg`,
// //   //   "python": `${DI}/python/python-original.svg`,
// //   //   "java": `${DI}/java/java-original.svg`,
// //   //   "c++": `${DI}/cplusplus/cplusplus-original.svg`,
// //   //   "cpp": `${DI}/cplusplus/cplusplus-original.svg`,
// //   //   "c#": `${DI}/csharp/csharp-original.svg`,
// //   //   "go": `${DI}/go/go-original.svg`,
// //   //   "golang": `${DI}/go/go-original.svg`,
// //   //   "rust": `${DI}/rust/rust-plain.svg`,
// //   //   "php": `${DI}/php/php-original.svg`,
// //   //   "ruby": `${DI}/ruby/ruby-original.svg`,
// //   //   "swift": `${DI}/swift/swift-original.svg`,
// //   //   "kotlin": `${DI}/kotlin/kotlin-original.svg`,
// //   //   "dart": `${DI}/dart/dart-original.svg`,
// //   //   "django": `${DI}/django/django-plain.svg`,
// //   //   "flask": `${DI}/flask/flask-original.svg`,
// //   //   "spring": `${DI}/spring/spring-original.svg`,
// //   //   "spring boot": `${DI}/spring/spring-original.svg`,
// //   //   "flutter": `${DI}/flutter/flutter-original.svg`,
// //   //   "fastapi": `${DI}/fastapi/fastapi-original.svg`,
// //   //   "aws": `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
// //   //   "azure": `${DI}/azure/azure-original.svg`,
// //   //   "gcp": `${DI}/googlecloud/googlecloud-original.svg`,
// //   //   "google cloud": `${DI}/googlecloud/googlecloud-original.svg`,
// //   //   "docker": `${DI}/docker/docker-original.svg`,
// //   //   "kubernetes": `${DI}/kubernetes/kubernetes-plain.svg`,
// //   //   "linux": `${DI}/linux/linux-original.svg`,
// //   //   "git": `${DI}/git/git-original.svg`,
// //   //   "github": `${DI}/github/github-original.svg`,
// //   //   "gitlab": `${DI}/gitlab/gitlab-original.svg`,
// //   //   "html": `${DI}/html5/html5-original.svg`,
// //   //   "css": `${DI}/css3/css3-original.svg`,
// //   //   "sass": `${DI}/sass/sass-original.svg`,
// //   //   "tailwind": `${DI}/tailwindcss/tailwindcss-plain.svg`,
// //   //   "bootstrap": `${DI}/bootstrap/bootstrap-original.svg`,
// //   //   "figma": `${DI}/figma/figma-original.svg`,
// //   //   "tensorflow": `${DI}/tensorflow/tensorflow-original.svg`,
// //   //   "pytorch": `${DI}/pytorch/pytorch-original.svg`,
// //   //   "pandas": `${DI}/pandas/pandas-original.svg`,
// //   //   "numpy": `${DI}/numpy/numpy-original.svg`,
// //   //   "vite": `${DI}/vite/vite-original.svg`,
// //   //   "jest": `${DI}/jest/jest-plain.svg`,
// //   //   "sockets": `${DI}/socketio/socketio-original.svg`,
// //   // };
// //   // const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

// //   // /* ─── Helpers ───────────────────────────────────────────────── */
// //   // const now = new Date();

// //   // const isSlotPast = (dateStr, startTime) => {
// //   //   const [h, m] = startTime.split(":").map(Number);
// //   //   // dateStr from API is like "2026-05-26T00:00:00.000Z" — extract just YYYY-MM-DD
// //   //   const ymd = dateStr.slice(0, 10);
// //   //   const d = new Date(`${ymd}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
// //   //   return d < now;
// //   // };

// //   // const toYMD = (d) => d.toISOString().slice(0, 10);

// //   // const MONTH_NAMES = [
// //   //   "January", "February", "March", "April", "May", "June",
// //   //   "July", "August", "September", "October", "November", "December",
// //   // ];

// //   // /* ─── Auth error check ──────────────────────────────────────── */
// //   // const isAuthError = (error) => {
// //   //   if (!error) return false;
// //   //   const data = error?.data || error;
// //   //   return (
// //   //     data?.status_code === 400 ||
// //   //     data?.status_code === 401 ||
// //   //     data?.message === "Auth Token is required" ||
// //   //     error?.status === 401 ||
// //   //     error?.status === 400
// //   //   );
// //   // };

// //   // /* ─── Skill Chip ────────────────────────────────────────────── */
// //   // const SkillChip = ({ skill }) => {
// //   //   const icon = getSkillIcon(skill);
// //   //   const [imgErr, setImgErr] = useState(false);
// //   //   return (
// //   //     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-800 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200">
// //   //       <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
// //   //         {icon && !imgErr ? (
// //   //           <img src={icon} alt={skill} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" onError={() => setImgErr(true)} />
// //   //         ) : (
// //   //           <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gray-100 text-gray-600 text-[7px] sm:text-[8px] font-bold rounded-full">
// //   //             {skill.slice(0, 2).toUpperCase()}
// //   //           </span>
// //   //         )}
// //   //       </span>
// //   //       <span className="whitespace-nowrap leading-none">{skill}</span>
// //   //     </span>
// //   //   );
// //   // };

// //   // /* ─── Mini Calendar ─────────────────────────────────────────── */
// //   // const MiniCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
// //   //   const today = new Date();
// //   //   const [viewYear, setViewYear] = useState(today.getFullYear());
// //   //   const [viewMonth, setViewMonth] = useState(today.getMonth());

// //   //   const firstDay = new Date(viewYear, viewMonth, 1).getDay();
// //   //   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

// //   //   const prevMonth = () =>
// //   //     viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
// //   //   const nextMonth = () =>
// //   //     viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1);

// //   //   const cells = [];
// //   //   for (let i = 0; i < firstDay; i++) cells.push(null);
// //   //   for (let d = 1; d <= daysInMonth; d++) cells.push(d);

// //   //   return (
// //   //     <div className="w-full select-none">
// //   //       <div className="flex items-center justify-between mb-3">
// //   //         <button
// //   //           onClick={prevMonth}
// //   //           className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
// //   //           aria-label="Previous month"
// //   //         >
// //   //           <ChevronLeft size={14} className="text-gray-500" />
// //   //         </button>
// //   //         <span className="text-sm font-semibold text-gray-800">
// //   //           {MONTH_NAMES[viewMonth]} {viewYear}
// //   //         </span>
// //   //         <button
// //   //           onClick={nextMonth}
// //   //           className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
// //   //           aria-label="Next month"
// //   //         >
// //   //           <ChevronRight size={14} className="text-gray-500" />
// //   //         </button>
// //   //       </div>

// //   //       <div className="grid grid-cols-7 mb-1">
// //   //         {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
// //   //           <div key={d} className="text-center text-[10px] font-semibold text-gray-400 tracking-wide">{d}</div>
// //   //         ))}
// //   //       </div>

// //   //       <div className="grid grid-cols-7">
// //   //         {cells.map((day, idx) => {
// //   //           if (!day) return <div key={`e-${idx}`} className="h-8" />;
// //   //           const ymd = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
// //   //           const isAvail = availableDates.has(ymd);
// //   //           const isSel = selectedDate === ymd;
// //   //           const isPast = new Date(ymd) < new Date(toYMD(today));
// //   //           const isToday = ymd === toYMD(today);
// //   //           return (
// //   //             <div key={ymd} className="flex justify-center items-center h-8">
// //   //               <button
// //   //                 disabled={!isAvail || isPast}
// //   //                 onClick={() => isAvail && !isPast && onSelectDate(isSel ? null : ymd)}
// //   //                 aria-label={`${day} ${MONTH_NAMES[viewMonth]}`}
// //   //                 aria-pressed={isSel}
// //   //                 className={`relative w-7 h-7 flex items-center justify-center text-xs font-semibold transition-all rounded-full
// //   //                   ${isSel
// //   //                     ? "bg-gray-900 text-white"
// //   //                     : isAvail && !isPast
// //   //                       ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-500 hover:text-white cursor-pointer"
// //   //                       : isToday
// //   //                         ? "ring-1 ring-gray-400 text-gray-600"
// //   //                         : isPast
// //   //                           ? "text-gray-300 cursor-default"
// //   //                           : "text-gray-400 cursor-default"}`}
// //   //               >
// //   //                 {day}
// //   //                 {isAvail && !isPast && !isSel && (
// //   //                   <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
// //   //                 )}
// //   //               </button>
// //   //             </div>
// //   //           );
// //   //         })}
// //   //       </div>
// //   //     </div>
// //   //   );
// //   // };

// //   // /* ═══════════════════════════════════════════════════════════════
// //   //   MAIN COMPONENT
// //   // ═══════════════════════════════════════════════════════════════ */
// //   // const ProfileModal = () => {
// //   //   const { mentorId } = useParams();
// //   //   const navigate = useNavigate();

// //   //   const [bookingOpen, setBookingOpen] = useState(false);
// //   //   const [showFullBio, setShowFullBio] = useState(false);
// //   //   const [selectedDate, setSelectedDate] = useState(null);
// //   //   const [selectedSlot, setSelectedSlot] = useState(null);
// //   //   const [reviewText, setReviewText] = useState("");
// //   //   const [reviewRating, setReviewRating] = useState(5);
// //   //   const [reviewSubmitted, setReviewSubmitted] = useState(false);
// //   //   const [liked, setLiked] = useState(false);
// //   //   const [selectedOption, setSelectedOption] = useState("trial");
// //   //   const [mobilePanel, setMobilePanel] = useState(false);
// //   //   const [appliedCoupon, setAppliedCoupon] = useState(null);
// //   //   const [couponInput, setCouponInput] = useState("");
// //   //   const [couponError, setCouponError] = useState("");
// //   //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   //   const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
// //   //   const [submitReview, { isLoading: submittingReview }] = useSubmitReviewMutation();
// //   //   const reviews = reviewsData?.reviews || [];

// //   //   const cookieData = Cookies.get("profileData");
// //   //   const userData = cookieData ? JSON.parse(cookieData) : null;
// //   //   const currentStatus = userData?.profile?.currentStatus;

// //   //   const { data: apiResponse, isLoading, isError, error } = useFetchMentorByIdQuery({ mentorId, currentStatus });

// //   //   // ── Extract mentor data from API response ──
// //   //   // API returns: { success: true, data: { ...userFields, mentorDetails: { ...mentorFields, availability: [...] } } }
// //   //   const mentor = apiResponse?.data?.mentorDetails || apiResponse?.data || apiResponse;

// //   //   // ── Availability: directly from mentorDetails.availability array ──
// //   //   // Each item: { date: "2026-05-26T00:00:00.000Z", startTime: "09:00", endTime: "09:30", isBooked: bool, _id: string }
// //   //   const rawAvailability = mentor?.availability || [];

// //   //   const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
// //   //   const userMenteeId = userData1?._id;

// //   //   /* ── Lock body scroll when mobile panel is open ── */
// //   //   useEffect(() => {
// //   //     if (mobilePanel) {
// //   //       document.body.style.overflow = "hidden";
// //   //     } else {
// //   //       document.body.style.overflow = "";
// //   //     }
// //   //     return () => { document.body.style.overflow = ""; };
// //   //   }, [mobilePanel]);

// //   //   /* ── Auth error → redirect ── */
// //   //   useEffect(() => {
// //   //     if (isError && isAuthError(error)) {
// //   //       navigate("/login", { replace: true });
// //   //     }
// //   //   }, [isError, error, navigate]);

// //   //   const handleReviewSubmit = async () => {
// //   //     if (!reviewText.trim()) return;
// //   //     try {
// //   //       await submitReview({
// //   //         mentorId, menteeId: userMenteeId, rating: reviewRating, comment: reviewText.trim(),
// //   //       }).unwrap();
// //   //       setReviewText(""); setReviewRating(5); setReviewSubmitted(true);
// //   //       setTimeout(() => setReviewSubmitted(false), 3000);
// //   //     } catch (err) {
// //   //       if (isAuthError(err)) navigate("/login", { replace: true });
// //   //       console.error(err);
// //   //     }
// //   //   };

// //   //   const coupons = mentor?.ResCoupons || [];
// //   //   const trialUsed = mentor?.freeTrial?.usedCount >= mentor?.freeTrial?.totalAllowed;

// //   //   const getDiscountedPrice = (amount) => {
// //   //     if (!appliedCoupon) return amount;
// //   //     return Math.round(amount - (amount * appliedCoupon.discountValue) / 100);
// //   //   };

// //   //   const buildCouponPayload = () =>
// //   //     coupons.map((c) => ({
// //   //       couponId: c._id,
// //   //       couponCode: c.couponCode,
// //   //       discountValue: c.discountValue,
// //   //       appliesForDuration: c.appliesForDuration,
// //   //       expiryDate: c.expiryDate,
// //   //       isActive: c.isActive,
// //   //     }));

// //   //   const goToPlans = () => {
// //   //     navigate(`/mentor/${mentorId}/ltm-plans`, {
// //   //       state: {
// //   //         availableCoupons: buildCouponPayload(),
// //   //         appliedCoupon: appliedCoupon
// //   //           ? {
// //   //             couponId: appliedCoupon._id,
// //   //             couponCode: appliedCoupon.couponCode,
// //   //             discountValue: appliedCoupon.discountValue,
// //   //           }
// //   //           : null,
// //   //       },
// //   //     });
// //   //   };

// //   //   const handleApplyCoupon = (code, tab) => {
// //   //     const tabMonths = tab === "one_month" ? 1 : tab === "three_months" ? 3 : 6;
// //   //     const found = coupons.find(
// //   //       (c) =>
// //   //         c.couponCode === code.trim().toUpperCase() &&
// //   //         c.isActive &&
// //   //         c.appliesForDuration.includes(tabMonths)
// //   //     );
// //   //     if (found) {
// //   //       setAppliedCoupon(found);
// //   //       setCouponError("");
// //   //     } else {
// //   //       setAppliedCoupon(null);
// //   //       setCouponError("Invalid coupon or not applicable for this plan.");
// //   //     }
// //   //   };

// //   //   const handleRemoveCoupon = () => {
// //   //     setAppliedCoupon(null);
// //   //     setCouponInput("");
// //   //     setCouponError("");
// //   //   };

// //   //   // ── Group availability slots by date (YYYY-MM-DD) ──
// //   //   // Iterate directly over rawAvailability array from API response
// //   //   const grouped = useMemo(() => {
// //   //     if (!rawAvailability || rawAvailability.length === 0) return {};
// //   //     const acc = {};
// //   //     for (const slot of rawAvailability) {
// //   //       // slot.date is "2026-05-26T00:00:00.000Z" — extract YYYY-MM-DD
// //   //       const dk = slot.date.slice(0, 10);
// //   //       if (!acc[dk]) acc[dk] = [];
// //   //       acc[dk].push({
// //   //         _id: slot._id,
// //   //         date: dk,
// //   //         startTime: slot.startTime,
// //   //         endTime: slot.endTime,
// //   //         isBooked: slot.isBooked,
// //   //       });
// //   //     }
// //   //     return acc;
// //   //   }, [rawAvailability]);

// //   //   // ── Build set of dates that have at least one available (not booked, not past) slot ──
// //   //   const availableDatesSet = useMemo(() => {
// //   //     const s = new Set();
// //   //     for (const [dk, slots] of Object.entries(grouped)) {
// //   //       if (slots.some((sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime))) {
// //   //         s.add(dk);
// //   //       }
// //   //     }
// //   //     return s;
// //   //   }, [grouped]);

// //   //   const slotsForSelectedDate = selectedDate ? (grouped[selectedDate] || []) : [];

// //   //   const nextAvailable = Array.from(availableDatesSet).sort()[0];
// //   //   const nextAvailableLabel = nextAvailable
// //   //     ? new Date(nextAvailable + "T00:00:00").toLocaleDateString("en-IN", {
// //   //       weekday: "short", month: "short", day: "numeric", year: "numeric",
// //   //     })
// //   //     : null;

// //   //   /* ── Loading / Error states ── */
// //   //   if (isLoading) return (
// //   //     <div className="h-screen w-full bg-white flex items-center justify-center">
// //   //       <Loader />
// //   //     </div>
// //   //   );
// //   //   if (isError && isAuthError(error)) return null;
// //   //   if (isError || !mentor) return (
// //   //     <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4">
// //   //       <p className="text-red-500 mb-4 text-base text-center">Failed to load profile</p>
// //   //       <button
// //   //         onClick={() => navigate("/mentors")}
// //   //         className="bg-gray-900 text-white px-6 py-3 font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors"
// //   //       >
// //   //         ← Back to Mentors
// //   //       </button>
// //   //     </div>
// //   //   );

// //   //   /* ── Derived fields ── */
// //   //   const skills = mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
// //   //   const areas = mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
// //   //   const bioText = mentor.motivationStatement || mentor.bio || "";
// //   //   const bioLong = bioText.length > 400;
// //   //   const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 400) + "…";
// //   //   const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
// //   //   const joined = mentor.createdAt
// //   //     ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
// //   //     : null;
// //   //   const firstName = mentor.fullName?.split(" ")[0] ?? "Mentor";

// //   //   /* ─── Right / Booking Panel ──────────────────────────────── */
// //   //   const BookingPanel = () => (
// //   //     <div className="flex flex-col h-full bg-white">
// //   //       {/* Toggle */}
// //   //       <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
// //   //         <div className="grid grid-cols-2 gap-1.5 bg-gray-100 p-1 rounded-xl">
// //   //           {["trial", "plans"].map((opt) => (
// //   //             <button
// //   //               key={opt}
// //   //               onClick={() => setSelectedOption(opt)}
// //   //               className={`py-2 text-sm font-semibold rounded-lg transition-all ${selectedOption === opt
// //   //                 ? "bg-white text-gray-900 shadow-sm"
// //   //                 : "text-gray-500 hover:text-gray-700"
// //   //                 }`}
// //   //             >
// //   //               {opt === "trial" ? "Book Free Trial" : "View Plans"}
// //   //             </button>
// //   //           ))}
// //   //         </div>
// //   //       </div>

// //   //       {/* ── TRIAL PANEL ── */}
// //   //       {selectedOption === "trial" && (
// //   //         <div className="flex-1 flex flex-col overflow-hidden">
// //   //           <div className="flex-1 overflow-y-auto hide-scrollbar px-3 py-2 flex flex-col gap-2">

// //   //             {/* Calendar Card */}
// //   //             <div className="bg-white border border-black/10 rounded-lg shadow-sm p-3">
// //   //               <p className="text-xs font-semibold text-black mb-0.5">
// //   //                 Select your preferred date
// //   //               </p>
// //   //               <p className="text-[10px] text-black/60 mb-2 leading-relaxed">
// //   //                 Highlighted dates show mentor availability.
// //   //               </p>
// //   //               <MiniCalendar
// //   //                 availableDates={availableDatesSet}
// //   //                 selectedDate={selectedDate}
// //   //                 onSelectDate={(dk) => { setSelectedDate(dk); setSelectedSlot(null); }}
// //   //               />
// //   //             </div>

// //   //             {/* Time Slots */}
// //   //             {selectedDate && slotsForSelectedDate.length > 0 && (
// //   //               <div className="bg-white border border-black/10 rounded-lg p-3">
// //   //                 <p className="text-[10px] font-semibold text-black tracking-widest mb-2 uppercase">
// //   //                   {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
// //   //                     weekday: "short", month: "short", day: "numeric",
// //   //                   })}
// //   //                 </p>
// //   //                 <div className="flex flex-wrap gap-1.5">
// //   //                   {slotsForSelectedDate.map((slot) => {
// //   //                     const chosen = selectedSlot?._id === slot._id;
// //   //                     const isPast = isSlotPast(slot.date, slot.startTime);
// //   //                     const isDisabled = slot.isBooked || isPast;
// //   //                     return (
// //   //                       <button
// //   //                         key={slot._id}
// //   //                         disabled={isDisabled}
// //   //                         onClick={() => !isDisabled && setSelectedSlot(chosen ? null : slot)}
// //   //                         className={`flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium border rounded-full transition-all ${isDisabled
// //   //                           ? "opacity-40 cursor-not-allowed border-black/10 bg-black/5 text-black/40"
// //   //                           : chosen
// //   //                             ? "border-black bg-black text-white"
// //   //                             : "border-black/20 bg-white text-black hover:border-black"
// //   //                           }`}
// //   //                       >
// //   //                         <Clock size={10} />
// //   //                         {slot.startTime}
// //   //                       </button>
// //   //                     );
// //   //                   })}
// //   //                 </div>
// //   //               </div>
// //   //             )}

// //   //             {/* No slots message */}
// //   //             {selectedDate && slotsForSelectedDate.length === 0 && (
// //   //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
// //   //                 <p className="text-xs text-gray-500">No slots available for this date.</p>
// //   //               </div>
// //   //             )}

// //   //             {/* No availability at all */}
// //   //             {rawAvailability.length === 0 && (
// //   //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
// //   //                 <Calendar size={20} className="text-gray-400 mx-auto mb-2" />
// //   //                 <p className="text-xs text-gray-500 font-medium">No availability set yet</p>
// //   //                 <p className="text-[10px] text-gray-400 mt-1">Check back soon or view plans to get started</p>
// //   //               </div>
// //   //             )}
// //   //           </div>

// //   //           {/* CTA Footer */}
// //   //           <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-gray-100 bg-white">
// //   //             <button
// //   //               disabled={!selectedSlot}
// //   //               onClick={() => setBookingOpen(true)}
// //   //               className={`w-full py-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${selectedSlot
// //   //                 ? "bg-black text-white hover:bg-black/90 active:scale-[0.98]"
// //   //                 : "bg-black text-white opacity-40 cursor-not-allowed"
// //   //                 }`}
// //   //             >
// //   //               <Calendar size={13} />
// //   //               {selectedSlot ? "Book Your Trial Session" : "Select a Time Slot"}
// //   //             </button>
// //   //             {nextAvailableLabel && !selectedSlot && (
// //   //               <p className="text-center text-[10px] text-black/60 mt-1.5">
// //   //                 Next available:{" "}
// //   //                 <span className="font-semibold text-black">{nextAvailableLabel}</span>
// //   //               </p>
// //   //             )}
// //   //           </div>
// //   //         </div>
// //   //       )}

// //   //       {/* ── PLANS PANEL ── */}
// //   //       {selectedOption === "plans" && (
// //   //         <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-4">
// //   //           <div className="mb-3">
// //   //             <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
// //   //               Take the next step in your career with {firstName}
// //   //             </h2>
// //   //           </div>
// //   //           <div className="mb-4">
// //   //             <p className="text-xs text-gray-500 mb-2">LTM Plan Includes</p>
// //   //             <div className="space-y-2">
// //   //               {[
// //   //                 "1:1 Personalized Mentorship",
// //   //                 "Weekly Career Guidance Sessions",
// //   //                 "Resume + LinkedIn Profile Review",
// //   //                 "Mock Interviews & Referral Support",
// //   //               ].map((feature, index) => (
// //   //                 <div key={index} className="flex items-center gap-2">
// //   //                   <CheckCircle size={14} className="text-[#1d8e85] flex-shrink-0" />
// //   //                   <p className="text-sm text-gray-800 font-medium leading-snug">{feature}</p>
// //   //                 </div>
// //   //               ))}
// //   //             </div>
// //   //           </div>

// //   //           <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
// //   //             <button
// //   //               onClick={goToPlans}
// //   //               className="w-full bg-white py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition active:scale-[0.98]"
// //   //             >
// //   //               View All Plans
// //   //             </button>
// //   //           </div>

// //   //           <div className="grid grid-cols-2 border border-gray-200 rounded-xl overflow-hidden">
// //   //             {[
// //   //               { title: "Mentorship Sessions", subtitle: "Weekly 1:1 mentor guidance", icon: <Calendar size={14} /> },
// //   //               { title: "Guaranteed Referrals", subtitle: "Community of mentors", icon: <Award size={14} /> },
// //   //               { title: "LinkedIn & Resume", subtitle: "Get noticed by recruiters", icon: <FileText size={14} /> },
// //   //               { title: "Completion Certificate", subtitle: "Shareable certificate", icon: <BadgeCheck size={14} /> },
// //   //             ].map((item, index) => (
// //   //               <div
// //   //                 key={index}
// //   //                 className={`p-3 border-gray-200 ${index % 2 === 0 ? "border-r" : ""} ${index < 2 ? "border-b" : ""}`}
// //   //               >
// //   //                 <div className="flex items-start gap-2">
// //   //                   <div className="text-gray-600 mt-0.5 flex-shrink-0">{item.icon}</div>
// //   //                   <div>
// //   //                     <p className="text-xs font-semibold text-gray-900 leading-snug">{item.title}</p>
// //   //                     <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{item.subtitle}</p>
// //   //                   </div>
// //   //                 </div>
// //   //               </div>
// //   //             ))}
// //   //           </div>
// //   //         </div>
// //   //       )}
// //   //     </div>
// //   //   );

// //   //   /* ══════════════════ RENDER ══════════════════ */
// //   //   return (
// //   //     <>
// //   //       <style>{FONT_STYLE}</style>

// //   //       {/* ─── Navbar ─────────────────────────────────────────── */}
// //   //       <nav className="w-full bg-white border-b border-gray-100 z-50 sticky top-0">
// //   //         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3">
// //   //           <div
// //   //             className="flex items-center gap-2 cursor-pointer flex-shrink-0"
// //   //             onClick={() => navigate("/")}
// //   //           >
// //   //             <img src={logo} alt="Karrivo Logo" className="h-9 sm:h-11 w-auto object-contain" />
// //   //             <h1 className="text-base sm:text-xl font-bold text-black tracking-tight">KARRIVO</h1>
// //   //           </div>

// //   //           <div className="hidden md:flex items-center gap-8">
// //   //             <button
// //   //               onClick={() => navigate("/explore-mentors")}
// //   //               className="text-sm font-bold text-gray-700 hover:text-gray-900 transition"
// //   //             >
// //   //               Explore Mentors
// //   //             </button>
// //   //           </div>

// //   //           <div className="flex items-center gap-2 sm:gap-3">
// //   //             <button
// //   //               onClick={() => navigate("/login")}
// //   //               className="px-4 sm:px-8 py-2 text-xs sm:text-sm font-medium text-[#1f2937] bg-transparent border border-gray-300 rounded-md hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-all duration-300 whitespace-nowrap"
// //   //             >
// //   //               Login
// //   //             </button>
// //   //             <button
// //   //               className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition"
// //   //               onClick={() => setMobileMenuOpen(v => !v)}
// //   //               aria-label="Toggle menu"
// //   //             >
// //   //               {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
// //   //             </button>
// //   //           </div>
// //   //         </div>

// //   //         {mobileMenuOpen && (
// //   //           <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
// //   //             <button
// //   //               onClick={() => { navigate("/explore-mentors"); setMobileMenuOpen(false); }}
// //   //               className="block w-full text-left text-sm font-semibold text-gray-700 py-2 hover:text-gray-900 transition"
// //   //             >
// //   //               Explore Mentors
// //   //             </button>
// //   //           </div>
// //   //         )}
// //   //       </nav>

// //   //       {/* ─── Page wrapper ───────────────────────────────────── */}
// //   //       <div className="w-full bg-white" style={{ minHeight: "calc(100vh - 57px)" }}>
// //   //         <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:h-[calc(100vh-57px)]">

// //   //           {/* ══ LEFT — main content, scrollable ══ */}
// //   //           <div className="flex-1 min-w-0 lg:overflow-y-auto hide-scrollbar bg-white">

// //   //             {/* Banner */}
// //   //             <div
// //   //               className="relative w-full h-[110px] xs:h-[130px] sm:h-[160px] md:h-[180px] overflow-hidden"
// //   //               style={{ background: "#f6f2ed" }}
// //   //             >
// //   //               <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
// //   //                 <p className="text-[#1f2937] text-lg xs:text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-tight">
// //   //                   Connect with Expert Mentors
// //   //                 </p>
// //   //                 <p className="text-[#1f2937]/60 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
// //   //                   Personalized guidance for your career growth, learning, and success
// //   //                 </p>
// //   //               </div>
// //   //             </div>

// //   //             {/* Content area */}
// //   //             <div className="px-4 xs:px-5 sm:px-8 lg:px-10 pb-24 lg:pb-8">

// //   //               {/* ─── Profile Header ─── */}
// //   //               <div className="relative -mt-10 xs:-mt-12 sm:-mt-14">
// //   //                 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

// //   //                   <div className="flex flex-row items-end gap-3 sm:gap-4">
// //   //                     {/* Avatar */}
// //   //                     <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden shadow-md flex-shrink-0">
// //   //                       {mentor.profilePhoto || mentor.profileImage ? (
// //   //                         <img
// //   //                           src={mentor.profilePhoto || mentor.profileImage}
// //   //                           alt={mentor.fullName}
// //   //                           className="w-full h-full object-cover"
// //   //                         />
// //   //                       ) : (
// //   //                         <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-black text-gray-400">
// //   //                           {initials}
// //   //                         </div>
// //   //                       )}
// //   //                     </div>

// //   //                     {/* Name + meta */}
// //   //                     <div className="pb-1 min-w-0">
// //   //                       <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 leading-tight truncate">
// //   //                         {mentor.fullName}
// //   //                       </h1>
// //   //                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
// //   //                         {mentor.yearsOfExperience && (
// //   //                           <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
// //   //                             <Briefcase size={11} className="text-blue-500 flex-shrink-0" />
// //   //                             <span>{mentor.yearsOfExperience}+ yrs</span>
// //   //                           </div>
// //   //                         )}
// //   //                         {mentor.companyName && (
// //   //                           <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
// //   //                             <Building2 size={11} className="text-blue-500 flex-shrink-0" />
// //   //                             <span className="truncate max-w-[120px] sm:max-w-none">{mentor.companyName}</span>
// //   //                           </div>
// //   //                         )}
// //   //                         {mentor.schoolName && (
// //   //                           <div className="hidden sm:flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
// //   //                             <GraduationCap size={11} className="text-blue-500 flex-shrink-0" />
// //   //                             <span className="truncate max-w-[140px] sm:max-w-none">{mentor.schoolName}</span>
// //   //                           </div>
// //   //                         )}
// //   //                       </div>
// //   //                     </div>
// //   //                   </div>

// //   //                   {/* Action buttons */}
// //   //                   <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
// //   //                     <button
// //   //                       onClick={goToPlans}
// //   //                       className="h-9 sm:h-[42px] px-4 sm:px-5 rounded-full border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
// //   //                     >
// //   //                       View Pricing
// //   //                     </button>
// //   //                     <button
// //   //                       onClick={() => setMobilePanel(true)}
// //   //                       className="lg:hidden h-9 sm:h-[42px] px-4 sm:px-5 rounded-full bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition shadow-sm"
// //   //                     >
// //   //                       Book Trial
// //   //                     </button>
// //   //                   </div>
// //   //                 </div>
// //   //               </div>

// //   //               {/* ─── About ─── */}
// //   //               <div className="pt-5 pb-5 border-b border-gray-200">
// //   //                 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">About</h2>
// //   //                 <div className="max-w-3xl">
// //   //                   <p className="text-sm leading-7 text-gray-600 whitespace-pre-line">{bio}</p>
// //   //                   {bioLong && (
// //   //                     <button
// //   //                       onClick={() => setShowFullBio(!showFullBio)}
// //   //                       className="mt-3 text-sm text-blue-600 hover:underline font-medium"
// //   //                     >
// //   //                       {showFullBio ? "read less" : "read more"}
// //   //                     </button>
// //   //                   )}
// //   //                 </div>

// //   //                 {(mentor.location || mentor.languages?.length > 0) && (
// //   //                   <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-5">
// //   //                     {mentor.location && (
// //   //                       <div>
// //   //                         <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Find Me Here</p>
// //   //                         <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
// //   //                           <MapPin size={13} className="text-gray-500 flex-shrink-0" />
// //   //                           <span className="text-sm text-gray-700">{mentor.location}</span>
// //   //                         </div>
// //   //                       </div>
// //   //                     )}
// //   //                     {mentor.languages?.length > 0 && (
// //   //                       <div className="sm:border-l sm:border-gray-200 sm:pl-5">
// //   //                         <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Languages I Speak</p>
// //   //                         <div className="flex flex-wrap gap-2">
// //   //                           {mentor.languages.map((lang, i) => (
// //   //                             <div key={i} className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-sm text-gray-700">
// //   //                               {lang}
// //   //                             </div>
// //   //                           ))}
// //   //                         </div>
// //   //                       </div>
// //   //                     )}
// //   //                   </div>
// //   //                 )}
// //   //               </div>

// //   //               {/* ─── Education & Career ─── */}
// //   //               <div className="py-5 border-b border-gray-200">
// //   //                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Education & Career</h3>
// //   //                 <div className="relative flex flex-col gap-3">
// //   //                   <div className="hidden sm:block absolute left-[15px] top-3 bottom-3 w-[2px] bg-[#1a1a2e]" />
// //   //                   {[
// //   //                     mentor.currentRole && {
// //   //                       label: "Current Role",
// //   //                       value: `${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`,
// //   //                       icon: <Briefcase size={14} className="text-[#1d8e85]" />,
// //   //                     },
// //   //                     mentor.highestDegree && {
// //   //                       label: "Degree",
// //   //                       value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` · ${mentor.fieldOfStudy}` : ""}`,
// //   //                       icon: <GraduationCap size={14} className="text-[#1d8e85]" />,
// //   //                     },
// //   //                     mentor.schoolName && {
// //   //                       label: "Institution",
// //   //                       value: mentor.schoolName,
// //   //                       icon: <School size={14} className="text-[#1d8e85]" />,
// //   //                     },
// //   //                     mentor.yearsOfExperience && {
// //   //                       label: "Experience",
// //   //                       value: `${mentor.yearsOfExperience}+ years`,
// //   //                       icon: <BadgeCheck size={14} className="text-[#1d8e85]" />,
// //   //                     },
// //   //                     joined && {
// //   //                       label: "Member Since",
// //   //                       value: joined,
// //   //                       icon: <CalendarDays size={14} className="text-[#1d8e85]" />,
// //   //                     },
// //   //                   ]
// //   //                     .filter(Boolean)
// //   //                     .map(({ label, value, icon }) => (
// //   //                       <div
// //   //                         key={label}
// //   //                         className="relative flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-all"
// //   //                       >
// //   //                         <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#f0faf8] flex items-center justify-center flex-shrink-0">
// //   //                           {icon}
// //   //                         </div>
// //   //                         <div className="flex-1 min-w-0">
// //   //                           <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">{label}</p>
// //   //                           <p className="text-xs sm:text-sm text-gray-800 font-medium leading-snug break-words">{value}</p>
// //   //                         </div>
// //   //                       </div>
// //   //                     ))}
// //   //                 </div>

// //   //                 {(mentor.linkedinUrl || mentor.resumeLink) && (
// //   //                   <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
// //   //                     {mentor.linkedinUrl && (
// //   //                       <a
// //   //                         href={mentor.linkedinUrl}
// //   //                         target="_blank"
// //   //                         rel="noopener noreferrer"
// //   //                         className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
// //   //                       >
// //   //                         <Linkedin size={12} />
// //   //                         View LinkedIn
// //   //                         <ExternalLink size={10} />
// //   //                       </a>
// //   //                     )}
// //   //                     {mentor.resumeLink && (
// //   //                       <a
// //   //                         href={mentor.resumeLink}
// //   //                         target="_blank"
// //   //                         rel="noopener noreferrer"
// //   //                         className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
// //   //                       >
// //   //                         <FileText size={12} />
// //   //                         Open Portfolio
// //   //                         <ExternalLink size={10} />
// //   //                       </a>
// //   //                     )}
// //   //                   </div>
// //   //                 )}
// //   //               </div>

// //   //               {/* ─── Technical Skills ─── */}
// //   //               {skills.length > 0 && (
// //   //                 <div className="py-5 border-b border-gray-200">
// //   //                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Technical Skills</h3>
// //   //                   <div className="flex flex-wrap gap-1.5 sm:gap-2">
// //   //                     {skills.map((skill) => <SkillChip key={skill} skill={skill} />)}
// //   //                   </div>
// //   //                 </div>
// //   //               )}

// //   //               {/* ─── Areas of Interest ─── */}
// //   //               {areas.length > 0 && (
// //   //                 <div className="py-5 border-b border-gray-200">
// //   //                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Areas of Interest</h3>
// //   //                   <div className="flex flex-wrap gap-1.5 sm:gap-2">
// //   //                     {areas.map((area) => <SkillChip key={area} skill={area} />)}
// //   //                   </div>
// //   //                 </div>
// //   //               )}

// //   //               {/* ─── Reviews ─── */}
// //   //               <div className="py-5">
// //   //                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Reviews & Comments</h3>
// //   //                 <div className="space-y-4">
// //   //                   {reviews?.length > 0 ? (
// //   //                     reviews.map((review, index) => (
// //   //                       <div key={review._id || index} className="border-b border-gray-200 pb-4">
// //   //                         <p className="text-sm leading-7 text-gray-600 mb-3">
// //   //                           {review.review || review.comment}
// //   //                         </p>
// //   //                         <div className="flex items-center justify-between gap-3 flex-wrap">
// //   //                           <div className="flex items-center gap-2.5">
// //   //                             {review.user?.profileImage ? (
// //   //                               <img
// //   //                                 src={review.user.profileImage}
// //   //                                 alt={review.user?.name}
// //   //                                 className="w-8 h-8 rounded-full object-cover"
// //   //                               />
// //   //                             ) : (
// //   //                               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 uppercase">
// //   //                                 {(review.user?.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("")}
// //   //                               </div>
// //   //                             )}
// //   //                             <span className="text-sm font-semibold text-gray-800">
// //   //                               {review.user?.name || "Anonymous User"}
// //   //                             </span>
// //   //                           </div>
// //   //                           <span className="text-xs text-gray-400">
// //   //                             {review.createdAt
// //   //                               ? new Date(review.createdAt).toLocaleDateString("en-IN", {
// //   //                                 day: "numeric", month: "short", year: "numeric",
// //   //                               })
// //   //                               : "Recently"}
// //   //                           </span>
// //   //                         </div>
// //   //                       </div>
// //   //                     ))
// //   //                   ) : (
// //   //                     <p className="text-sm text-gray-500">No reviews yet. Be the first to leave one!</p>
// //   //                   )}
// //   //                 </div>
// //   //               </div>
// //   //             </div>
// //   //           </div>

// //   //           {/* ══ RIGHT — fixed sidebar, desktop only (lg+) ══ */}
// //   //           <div className="hidden lg:flex flex-col w-[320px] xl:w-[360px] flex-shrink-0 border-l border-gray-200 overflow-hidden">
// //   //             <BookingPanel />
// //   //           </div>
// //   //         </div>
// //   //       </div>

// //   //       {/* ══ Sticky bottom CTA bar — mobile/tablet only ══ */}
// //   //       <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shadow-lg">
// //   //         <button
// //   //           onClick={goToPlans}
// //   //           className="flex-1 h-11 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-[0.97]"
// //   //         >
// //   //           View Plans
// //   //         </button>
// //   //         <button
// //   //           onClick={() => setMobilePanel(true)}
// //   //           className="flex-1 h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition active:scale-[0.97] flex items-center justify-center gap-2"
// //   //         >
// //   //           <Calendar size={15} />
// //   //           Book Free Trial
// //   //         </button>
// //   //       </div>

// //   //       {/* ══ MOBILE / TABLET BOTTOM SHEET ══ */}
// //   //       {mobilePanel && (
// //   //         <div className="fixed inset-0 z-50 flex items-end lg:hidden">
// //   //           <div
// //   //             className="overlay-enter absolute inset-0 bg-black/50 backdrop-blur-sm"
// //   //             onClick={() => setMobilePanel(false)}
// //   //           />
// //   //           <div
// //   //             className="sheet-enter relative w-full bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
// //   //             style={{ maxHeight: "92dvh", minHeight: "60dvh" }}
// //   //           >
// //   //             <div className="flex-shrink-0 flex items-center justify-between px-4 pt-3 pb-2">
// //   //               <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto" />
// //   //               <button
// //   //                 onClick={() => setMobilePanel(false)}
// //   //                 className="absolute right-4 top-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
// //   //                 aria-label="Close"
// //   //               >
// //   //                 <X size={14} className="text-gray-600" />
// //   //               </button>
// //   //             </div>
// //   //             <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
// //   //               <BookingPanel />
// //   //             </div>
// //   //           </div>
// //   //         </div>
// //   //       )}

// //   //       {/* ══ Booking Modal ══ */}
// //   //       {mentor && (
// //   //         <BookingModal
// //   //           mentor={mentor}
// //   //           isOpen={bookingOpen}
// //   //           onClose={() => setBookingOpen(false)}
// //   //           selectedSlot={selectedSlot}
// //   //           appliedCoupon={appliedCoupon}
// //   //           availableCoupons={coupons}
// //   //         />
// //   //       )}
// //   //     </>
// //   //   );
// //   // };

// //   // export default ProfileModal;


// //   import React, { useState, useMemo, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   Heart, Calendar, MapPin, Award, GraduationCap, Globe, Star,
// //   MessageCircle, CheckCircle, ExternalLink, Zap, ChevronLeft,
// //   ChevronRight, Clock, Briefcase, FileText, BadgeCheck, Video, Users,
// //   Building2, School, CalendarDays, Linkedin, X, Menu, ArrowLeft,
// // } from "lucide-react";
// // import Cookies from "js-cookie";
// // import {
// //   useFetchMentorByIdQuery,
// //   useFetchMentorReviewsQuery,
// //   useSubmitReviewMutation,
// // } from "../../topMentors/Mentorsectionapislice";
// // import BookingModal from "./BookingModal";
// // import Loader from "../../../global/Loader";
// // import logo from "../../../assets/karrivoSymbol.png";

// // /* ─── Global Font ─────────────────────────────────────────── */
// // const FONT_STYLE = `
// //   *, *::before, *::after {
// //     font-family: Cambria, 'Times New Roman', Georgia, serif !important;
// //   }
// //   .hide-scrollbar::-webkit-scrollbar { display: none; }
// //   .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

// //   @keyframes slideUp {
// //     from { transform: translateY(100%); opacity: 0; }
// //     to   { transform: translateY(0);    opacity: 1; }
// //   }
// //   @keyframes fadeIn {
// //     from { opacity: 0; }
// //     to   { opacity: 1; }
// //   }
// //   @keyframes slideInDown {
// //     from { transform: translateY(-20px); opacity: 0; }
// //     to   { transform: translateY(0); opacity: 1; }
// //   }
// //   @keyframes slideInRight {
// //     from { transform: translateX(24px); opacity: 0; }
// //     to   { transform: translateX(0); opacity: 1; }
// //   }
// //   .sheet-enter  { animation: slideUp 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
// //   .overlay-enter{ animation: fadeIn  0.25s ease forwards; }
// //   .modal-enter  { animation: slideInDown 0.3s ease forwards; }
// //   .booking-enter { animation: slideInRight 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
// //   .fade-enter { animation: fadeIn 0.25s ease forwards; }

// //   .slot-btn:hover { transform: scale(1.02); }
// //   .slot-btn { transition: all 0.15s ease; }
// // `;

// // /* ─── Skill Icon Map ───────────────────────────────────────── */
// // const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
// // const SKILL_ICON_MAP = {
// //   "react": `${DI}/react/react-original.svg`,
// //   "react js": `${DI}/react/react-original.svg`,
// //   "react.js": `${DI}/react/react-original.svg`,
// //   "reactjs": `${DI}/react/react-original.svg`,
// //   "react native": `${DI}/react/react-original.svg`,
// //   "next": `${DI}/nextjs/nextjs-original.svg`,
// //   "next js": `${DI}/nextjs/nextjs-original.svg`,
// //   "next.js": `${DI}/nextjs/nextjs-original.svg`,
// //   "nextjs": `${DI}/nextjs/nextjs-original.svg`,
// //   "vue": `${DI}/vuejs/vuejs-original.svg`,
// //   "vue.js": `${DI}/vuejs/vuejs-original.svg`,
// //   "vuejs": `${DI}/vuejs/vuejs-original.svg`,
// //   "angular": `${DI}/angularjs/angularjs-original.svg`,
// //   "svelte": `${DI}/svelte/svelte-original.svg`,
// //   "node": `${DI}/nodejs/nodejs-original.svg`,
// //   "node.js": `${DI}/nodejs/nodejs-original.svg`,
// //   "nodejs": `${DI}/nodejs/nodejs-original.svg`,
// //   "express": `${DI}/express/express-original.svg`,
// //   "express.js": `${DI}/express/express-original.svg`,
// //   "javascript": `${DI}/javascript/javascript-original.svg`,
// //   "js": `${DI}/javascript/javascript-original.svg`,
// //   "typescript": `${DI}/typescript/typescript-original.svg`,
// //   "ts": `${DI}/typescript/typescript-original.svg`,
// //   "graphql": `${DI}/graphql/graphql-plain.svg`,
// //   "mongodb": `${DI}/mongodb/mongodb-original.svg`,
// //   "mongo db": `${DI}/mongodb/mongodb-original.svg`,
// //   "mysql": `${DI}/mysql/mysql-original.svg`,
// //   "sql": `${DI}/mysql/mysql-original.svg`,
// //   "postgresql": `${DI}/postgresql/postgresql-original.svg`,
// //   "postgres": `${DI}/postgresql/postgresql-original.svg`,
// //   "redis": `${DI}/redis/redis-original.svg`,
// //   "firebase": `${DI}/firebase/firebase-plain.svg`,
// //   "python": `${DI}/python/python-original.svg`,
// //   "java": `${DI}/java/java-original.svg`,
// //   "c++": `${DI}/cplusplus/cplusplus-original.svg`,
// //   "cpp": `${DI}/cplusplus/cplusplus-original.svg`,
// //   "c#": `${DI}/csharp/csharp-original.svg`,
// //   "go": `${DI}/go/go-original.svg`,
// //   "golang": `${DI}/go/go-original.svg`,
// //   "rust": `${DI}/rust/rust-plain.svg`,
// //   "php": `${DI}/php/php-original.svg`,
// //   "ruby": `${DI}/ruby/ruby-original.svg`,
// //   "swift": `${DI}/swift/swift-original.svg`,
// //   "kotlin": `${DI}/kotlin/kotlin-original.svg`,
// //   "dart": `${DI}/dart/dart-original.svg`,
// //   "django": `${DI}/django/django-plain.svg`,
// //   "flask": `${DI}/flask/flask-original.svg`,
// //   "spring": `${DI}/spring/spring-original.svg`,
// //   "spring boot": `${DI}/spring/spring-original.svg`,
// //   "flutter": `${DI}/flutter/flutter-original.svg`,
// //   "fastapi": `${DI}/fastapi/fastapi-original.svg`,
// //   "aws": `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
// //   "azure": `${DI}/azure/azure-original.svg`,
// //   "gcp": `${DI}/googlecloud/googlecloud-original.svg`,
// //   "google cloud": `${DI}/googlecloud/googlecloud-original.svg`,
// //   "docker": `${DI}/docker/docker-original.svg`,
// //   "kubernetes": `${DI}/kubernetes/kubernetes-plain.svg`,
// //   "linux": `${DI}/linux/linux-original.svg`,
// //   "git": `${DI}/git/git-original.svg`,
// //   "github": `${DI}/github/github-original.svg`,
// //   "gitlab": `${DI}/gitlab/gitlab-original.svg`,
// //   "html": `${DI}/html5/html5-original.svg`,
// //   "css": `${DI}/css3/css3-original.svg`,
// //   "sass": `${DI}/sass/sass-original.svg`,
// //   "tailwind": `${DI}/tailwindcss/tailwindcss-plain.svg`,
// //   "bootstrap": `${DI}/bootstrap/bootstrap-original.svg`,
// //   "figma": `${DI}/figma/figma-original.svg`,
// //   "tensorflow": `${DI}/tensorflow/tensorflow-original.svg`,
// //   "pytorch": `${DI}/pytorch/pytorch-original.svg`,
// //   "pandas": `${DI}/pandas/pandas-original.svg`,
// //   "numpy": `${DI}/numpy/numpy-original.svg`,
// //   "vite": `${DI}/vite/vite-original.svg`,
// //   "jest": `${DI}/jest/jest-plain.svg`,
// //   "sockets": `${DI}/socketio/socketio-original.svg`,
// // };
// // const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

// // /* ─── Helpers ───────────────────────────────────────────────── */
// // const now = new Date();

// // const isSlotPast = (dateStr, startTime) => {
// //   const [h, m] = startTime.split(":").map(Number);
// //   const ymd = dateStr.slice(0, 10);
// //   const d = new Date(`${ymd}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
// //   return d < now;
// // };

// // const toYMD = (d) => d.toISOString().slice(0, 10);

// // const MONTH_NAMES = [
// //   "January", "February", "March", "April", "May", "June",
// //   "July", "August", "September", "October", "November", "December",
// // ];

// // const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// // const DAY_NAMES_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// // const DAY_NAMES_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// // /* ─── Auth error check ──────────────────────────────────────── */
// // const isAuthError = (error) => {
// //   if (!error) return false;
// //   const data = error?.data || error;
// //   return (
// //     data?.status_code === 400 ||
// //     data?.status_code === 401 ||
// //     data?.message === "Auth Token is required" ||
// //     error?.status === 401 ||
// //     error?.status === 400
// //   );
// // };

// // /* ─── Skill Chip ────────────────────────────────────────────── */
// // const SkillChip = ({ skill }) => {
// //   const icon = getSkillIcon(skill);
// //   const [imgErr, setImgErr] = useState(false);
// //   return (
// //     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-800 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200">
// //       <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
// //         {icon && !imgErr ? (
// //           <img src={icon} alt={skill} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" onError={() => setImgErr(true)} />
// //         ) : (
// //           <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gray-100 text-gray-600 text-[7px] sm:text-[8px] font-bold rounded-full">
// //             {skill.slice(0, 2).toUpperCase()}
// //           </span>
// //         )}
// //       </span>
// //       <span className="whitespace-nowrap leading-none">{skill}</span>
// //     </span>
// //   );
// // };

// // /* ═══════════════════════════════════════════════════════════════
// //    MINI MONTH CALENDAR (left side of booking panel)
// // ═══════════════════════════════════════════════════════════════ */
// // const MiniMonthCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
// //   const today = new Date();
// //   const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

// //   const year = viewMonth.getFullYear();
// //   const month = viewMonth.getMonth();

// //   const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun
// //   // Monday-first offset
// //   const startOffset = (firstDayOfMonth + 6) % 7;
// //   const daysInMonth = new Date(year, month + 1, 0).getDate();

// //   const cells = [];
// //   for (let i = 0; i < startOffset; i++) cells.push(null);
// //   for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

// //   const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
// //   const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));
// //   const canGoPrev = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1);

// //   return (
// //     <div className="w-full select-none">
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-3">
// //         <button
// //           onClick={prevMonth}
// //           disabled={!canGoPrev}
// //           className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
// //         >
// //           <ChevronLeft size={15} className="text-gray-600" />
// //         </button>
// //         <span className="text-sm font-bold text-gray-900">
// //           {MONTH_NAMES[month]} {year}
// //         </span>
// //         <button
// //           onClick={nextMonth}
// //           className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
// //         >
// //           <ChevronRight size={15} className="text-gray-600" />
// //         </button>
// //       </div>

// //       {/* Day headers - Mon first */}
// //       <div className="grid grid-cols-7 mb-1">
// //         {["M","T","W","T","F","S","S"].map((d, i) => (
// //           <div key={i} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
// //         ))}
// //       </div>

// //       {/* Cells */}
// //       <div className="grid grid-cols-7 gap-y-0.5">
// //         {cells.map((day, idx) => {
// //           if (!day) return <div key={`e-${idx}`} />;
// //           const ymd = toYMD(day);
// //           const isAvail = availableDates.has(ymd);
// //           const isSel = selectedDate === ymd;
// //           const isPast = day < new Date(toYMD(today));
// //           const isToday = ymd === toYMD(today);

// //           return (
// //             <button
// //               key={ymd}
// //               disabled={!isAvail || isPast}
// //               onClick={() => isAvail && !isPast && onSelectDate(isSel ? null : ymd)}
// //               className={`
// //                 relative mx-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all
// //                 ${isSel ? "bg-blue-600 text-white font-bold" :
// //                   isToday && isAvail && !isPast ? "ring-2 ring-blue-400 text-blue-600 hover:bg-blue-50" :
// //                   isAvail && !isPast ? "text-blue-600 hover:bg-blue-50 cursor-pointer font-semibold" :
// //                   "text-gray-300 cursor-default"}
// //               `}
// //             >
// //               {day.getDate()}
// //               {isAvail && !isPast && !isSel && (
// //                 <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
// //               )}
// //             </button>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // /* ═══════════════════════════════════════════════════════════════
// //    BOOKING SECTION (Inline — replaces profile content area)
// // ═══════════════════════════════════════════════════════════════ */
// // const InlineBookingSection = ({ mentor, rawAvailability, onClose, onConfirmed }) => {
// //   const [selectedDate, setSelectedDate] = useState(null);
// //   const [selectedSlot, setSelectedSlot] = useState(null);
// //   const [bookingConfirmed, setBookingConfirmed] = useState(false);

// //   // Group availability slots by date
// //   const grouped = useMemo(() => {
// //     if (!rawAvailability || rawAvailability.length === 0) return {};
// //     const acc = {};
// //     for (const slot of rawAvailability) {
// //       const dk = slot.date.slice(0, 10);
// //       if (!acc[dk]) acc[dk] = [];
// //       acc[dk].push({
// //         _id: slot._id,
// //         date: dk,
// //         startTime: slot.startTime,
// //         endTime: slot.endTime,
// //         isBooked: slot.isBooked,
// //       });
// //     }
// //     return acc;
// //   }, [rawAvailability]);

// //   const availableDatesSet = useMemo(() => {
// //     const s = new Set();
// //     for (const [dk, slots] of Object.entries(grouped)) {
// //       if (slots.some((sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime))) {
// //         s.add(dk);
// //       }
// //     }
// //     return s;
// //   }, [grouped]);

// //   const slotsForSelectedDate = useMemo(() => {
// //     if (!selectedDate) return [];
// //     return (grouped[selectedDate] || []).filter(
// //       (sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime)
// //     );
// //   }, [selectedDate, grouped]);

// //   const handleConfirmBooking = () => {
// //     if (!selectedSlot) return;
// //     setBookingConfirmed(true);
// //   };

// //   const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";

// //   // Timezone label
// //   const tzOffset = -(new Date().getTimezoneOffset());
// //   const tzSign = tzOffset >= 0 ? "+" : "-";
// //   const tzHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, "0");
// //   const tzMins = String(Math.abs(tzOffset) % 60).padStart(2, "0");
// //   const tzLabel = `(GMT${tzSign}${tzHours}:${tzMins}) India Standard Time - Kolkata`;

// //   return (
// //     <div className="booking-enter">
// //       {/* ── Section header with back button ── */}
// //       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
// //         <button
// //           onClick={onClose}
// //           className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition flex-shrink-0"
// //           aria-label="Back to profile"
// //         >
// //           <ArrowLeft size={15} className="text-gray-600" />
// //         </button>
// //         <h2 className="text-lg sm:text-xl font-bold text-gray-900">Book a Trial Session</h2>
// //       </div>

// //       {bookingConfirmed ? (
// //         /* ── Confirmed state ── */
// //         <div className="fade-enter flex flex-col items-center justify-center py-16 text-center">
// //           <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
// //             <CheckCircle size={40} className="text-green-500" />
// //           </div>
// //           <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
// //           <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
// //             Your 15-min trial session with{" "}
// //             <span className="font-semibold text-gray-700">{mentor.fullName}</span> is scheduled for{" "}
// //             <span className="font-semibold text-gray-700">
// //               {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
// //                 weekday: "long", month: "long", day: "numeric",
// //               })}
// //             </span>{" "}
// //             at <span className="font-semibold text-gray-700">{selectedSlot?.startTime}</span>.
// //           </p>
// //           <p className="text-gray-400 text-xs mt-3">Check your email for conference details.</p>
// //           <button
// //             onClick={onClose}
// //             className="mt-8 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
// //           >
// //             Back to Profile
// //           </button>
// //         </div>
// //       ) : (
// //         /* ── Main booking layout ── */
// //         <div className="flex flex-col lg:flex-row gap-0 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

// //           {/* ── LEFT PANEL: Mentor info + Calendar ── */}
// //           <div className="lg:w-[280px] xl:w-[300px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 p-5 flex flex-col gap-5">

// //             {/* Mentor card */}
// //             <div className="pb-4 border-b border-gray-200">
// //               <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden mb-3">
// //                 {mentor.profilePhoto || mentor.profileImage ? (
// //                   <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} className="w-full h-full object-cover" />
// //                 ) : (
// //                   <div className="w-full h-full flex items-center justify-center text-lg font-black text-gray-400">{initials}</div>
// //                 )}
// //               </div>
// //               <h3 className="text-base font-bold text-gray-900">{mentor.fullName}</h3>
// //               {mentor.currentRole && (
// //                 <p className="text-xs text-gray-500 mt-0.5">{mentor.currentRole}{mentor.companyName ? ` · ${mentor.companyName}` : ""}</p>
// //               )}
// //             </div>

// //             {/* Session details */}
// //             <div className="flex flex-col gap-2.5 pb-4 border-b border-gray-200">
// //               <div className="flex items-center gap-2 text-xs text-gray-600">
// //                 <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
// //                   <Clock size={11} className="text-gray-500" />
// //                 </div>
// //                 <span>15 min appointments</span>
// //               </div>
// //               <div className="flex items-center gap-2 text-xs text-gray-600">
// //                 <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
// //                   <Video size={11} className="text-yellow-600" />
// //                 </div>
// //                 <span>Google Meet video conference info added after booking</span>
// //               </div>
// //             </div>

// //             {/* Mini calendar */}
// //             <div>
// //               <MiniMonthCalendar
// //                 availableDates={availableDatesSet}
// //                 selectedDate={selectedDate}
// //                 onSelectDate={(dk) => { setSelectedDate(dk); setSelectedSlot(null); }}
// //               />
// //             </div>
// //           </div>

// //           {/* ── RIGHT PANEL: Time slot columns ── */}
// //           <div className="flex-1 bg-white flex flex-col overflow-hidden">

// //             {/* Timezone bar */}
// //             <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-end">
// //               <span className="text-[11px] text-gray-400 flex items-center gap-1">
// //                 <Globe size={11} />
// //                 {tzLabel}
// //               </span>
// //             </div>

// //             <div className="flex-1 p-4 sm:p-5">
// //               <h3 className="text-sm font-bold text-gray-900 mb-4">Select an appointment time</h3>

// //               {!selectedDate ? (
// //                 /* No date selected yet */
// //                 <div className="flex flex-col items-center justify-center h-48 text-center">
// //                   <Calendar size={36} className="text-gray-200 mb-3" />
// //                   <p className="text-sm text-gray-400">Select a date from the calendar to see available times</p>
// //                 </div>
// //               ) : slotsForSelectedDate.length === 0 ? (
// //                 /* No slots on selected date */
// //                 <div className="flex flex-col items-center justify-center h-48 text-center">
// //                   <Clock size={36} className="text-gray-200 mb-3" />
// //                   <p className="text-sm text-gray-400">No available slots for this date</p>
// //                   <button onClick={() => setSelectedDate(null)} className="mt-3 text-xs text-blue-500 hover:underline">
// //                     Choose another date
// //                   </button>
// //                 </div>
// //               ) : (
// //                 /* Time slot columns like Calendly */
// //                 <div className="fade-enter">
// //                   {/* Selected date heading */}
// //                   <div className="mb-4">
// //                     <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
// //                       {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
// //                         weekday: "long", month: "long", day: "numeric", year: "numeric",
// //                       })}
// //                     </p>
// //                   </div>

// //                   {/* Multi-column slot grid */}
// //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
// //                     {slotsForSelectedDate.map((slot) => {
// //                       const chosen = selectedSlot?._id === slot._id;
// //                       return (
// //                         <button
// //                           key={slot._id}
// //                           onClick={() => setSelectedSlot(chosen ? null : slot)}
// //                           className={`slot-btn py-2.5 px-2 rounded-full border text-xs sm:text-sm font-semibold transition-all ${
// //                             chosen
// //                               ? "border-blue-600 bg-blue-600 text-white shadow-md"
// //                               : "border-blue-200 bg-white text-blue-600 hover:border-blue-400 hover:bg-blue-50"
// //                           }`}
// //                         >
// //                           {slot.startTime}
// //                         </button>
// //                       );
// //                     })}
// //                   </div>

// //                   {/* Confirm button */}
// //                   {selectedSlot && (
// //                     <div className="fade-enter mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
// //                       <div className="flex-1">
// //                         <p className="text-xs text-gray-500">
// //                           Selected: <span className="font-bold text-gray-800">{selectedSlot.startTime}</span>
// //                           {selectedSlot.endTime && <span className="text-gray-400"> – {selectedSlot.endTime}</span>}
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={handleConfirmBooking}
// //                         className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition shadow-md hover:shadow-lg active:scale-95"
// //                       >
// //                         Confirm Booking →
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // /* ═══════════════════════════════════════════════════════════════
// //    MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════ */
// // const ProfileModal = () => {
// //   const { mentorId } = useParams();
// //   const navigate = useNavigate();

// //   // "booking" view state — controls inline section visibility
// //   const [showBooking, setShowBooking] = useState(false);
// //   const [bookingOpen, setBookingOpen] = useState(false);
// //   const [showFullBio, setShowFullBio] = useState(false);
// //   const [reviewText, setReviewText] = useState("");
// //   const [reviewRating, setReviewRating] = useState(5);
// //   const [reviewSubmitted, setReviewSubmitted] = useState(false);
// //   const [liked, setLiked] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
// //   const [submitReview, { isLoading: submittingReview }] = useSubmitReviewMutation();
// //   const reviews = reviewsData?.reviews || [];

// //   const cookieData = Cookies.get("profileData");
// //   const userData = cookieData ? JSON.parse(cookieData) : null;
// //   const currentStatus = userData?.profile?.currentStatus;

// //   const { data: apiResponse, isLoading, isError, error } = useFetchMentorByIdQuery({ mentorId, currentStatus });

// //   const mentor = apiResponse?.data?.mentorDetails || apiResponse?.data || apiResponse;
// //   const rawAvailability = mentor?.availability || [];

// //   const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
// //   const userMenteeId = userData1?._id;

// //   /* ── Auth error → redirect ── */
// //   useEffect(() => {
// //     if (isError && isAuthError(error)) {
// //       navigate("/login", { replace: true });
// //     }
// //   }, [isError, error, navigate]);

// //   // Scroll to booking section on mobile when opened
// //   useEffect(() => {
// //     if (showBooking) {
// //       setTimeout(() => {
// //         document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
// //       }, 100);
// //     }
// //   }, [showBooking]);

// //   const handleReviewSubmit = async () => {
// //     if (!reviewText.trim()) return;
// //     try {
// //       await submitReview({
// //         mentorId, menteeId: userMenteeId, rating: reviewRating, comment: reviewText.trim(),
// //       }).unwrap();
// //       setReviewText(""); setReviewRating(5); setReviewSubmitted(true);
// //       setTimeout(() => setReviewSubmitted(false), 3000);
// //     } catch (err) {
// //       if (isAuthError(err)) navigate("/login", { replace: true });
// //       console.error(err);
// //     }
// //   };

// //   const goToPlans = () => {
// //     navigate(`/mentor/${mentorId}/ltm-plans`);
// //   };

// //   /* ── Loading / Error states ── */
// //   if (isLoading) return (
// //     <div className="h-screen w-full bg-white flex items-center justify-center">
// //       <Loader />
// //     </div>
// //   );
// //   if (isError && isAuthError(error)) return null;
// //   if (isError || !mentor) return (
// //     <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4">
// //       <p className="text-red-500 mb-4 text-base text-center">Failed to load profile</p>
// //       <button
// //         onClick={() => navigate("/mentors")}
// //         className="bg-gray-900 text-white px-6 py-3 font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors"
// //       >
// //         ← Back to Mentors
// //       </button>
// //     </div>
// //   );

// //   /* ── Derived fields ── */
// //   const skills = mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
// //   const areas = mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
// //   const bioText = mentor.motivationStatement || mentor.bio || "";
// //   const bioLong = bioText.length > 400;
// //   const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 400) + "…";
// //   const initials = mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
// //   const joined = mentor.createdAt
// //     ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
// //     : null;
// //   const firstName = mentor.fullName?.split(" ")[0] ?? "Mentor";

// //   /* ══════════════════ RENDER ══════════════════ */
// //   return (
// //     <>
// //       <style>{FONT_STYLE}</style>

// //       {/* ─── Navbar ─────────────────────────────────────────── */}
// //       <nav className="w-full bg-white border-b border-gray-100 z-50 sticky top-0">
// //         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3">
// //           <div
// //             className="flex items-center gap-2 cursor-pointer flex-shrink-0"
// //             onClick={() => navigate("/")}
// //           >
// //             <img src={logo} alt="Karrivo Logo" className="h-9 sm:h-11 w-auto object-contain" />
// //             <h1 className="text-base sm:text-xl font-bold text-black tracking-tight">KARRIVO</h1>
// //           </div>

// //           <div className="hidden md:flex items-center gap-8">
// //             <button
// //               onClick={() => navigate("/explore-mentors")}
// //               className="text-sm font-bold text-gray-700 hover:text-gray-900 transition"
// //             >
// //               Explore Mentors
// //             </button>
// //           </div>

// //           <div className="flex items-center gap-2 sm:gap-3">
// //             <button
// //               onClick={() => navigate("/login")}
// //               className="px-4 sm:px-8 py-2 text-xs sm:text-sm font-medium text-[#1f2937] bg-transparent border border-gray-300 rounded-md hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-all duration-300 whitespace-nowrap"
// //             >
// //               Login
// //             </button>
// //             <button
// //               className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition"
// //               onClick={() => setMobileMenuOpen(v => !v)}
// //               aria-label="Toggle menu"
// //             >
// //               {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
// //             </button>
// //           </div>
// //         </div>

// //         {mobileMenuOpen && (
// //           <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
// //             <button
// //               onClick={() => { navigate("/explore-mentors"); setMobileMenuOpen(false); }}
// //               className="block w-full text-left text-sm font-semibold text-gray-700 py-2 hover:text-gray-900 transition"
// //             >
// //               Explore Mentors
// //             </button>
// //           </div>
// //         )}
// //       </nav>

// //       {/* ─── Page wrapper ───────────────────────────────────── */}
// //       <div className="w-full bg-white min-h-[calc(100vh-57px)]">
// //         <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">

// //           {/* ══ MAIN CONTENT ══ */}
// //           <div className="flex-1 min-w-0 lg:overflow-y-auto hide-scrollbar bg-white">

// //             {/* Banner */}
// //             <div
// //               className="relative w-full h-auto py-8 xs:py-10 sm:py-12 md:py-16 overflow-hidden"
// //               style={{ background: "#f6f2ed" }}
// //             >
// //               <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
// //                 <p className="text-[#1f2937] text-lg xs:text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-tight">
// //                   Connect with Expert Mentors
// //                 </p>
// //                 <p className="text-[#1f2937]/60 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
// //                   Personalized guidance for your career growth, learning, and success
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Content area */}
// //             <div className="px-4 xs:px-5 sm:px-8 lg:px-10 pb-24 lg:pb-8">

// //               {/* ─── Profile Header ─── */}
// //               <div className="relative -mt-10 xs:-mt-12 sm:-mt-14 md:-mt-16">
// //                 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">

// //                   <div className="flex flex-row items-end gap-3 sm:gap-4">
// //                     {/* Avatar */}
// //                     <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden shadow-md flex-shrink-0">
// //                       {mentor.profilePhoto || mentor.profileImage ? (
// //                         <img
// //                           src={mentor.profilePhoto || mentor.profileImage}
// //                           alt={mentor.fullName}
// //                           className="w-full h-full object-cover"
// //                         />
// //                       ) : (
// //                         <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-black text-gray-400">
// //                           {initials}
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Name + meta */}
// //                     <div className="pb-1 min-w-0 flex-1">
// //                       <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 leading-tight truncate">
// //                         {mentor.fullName}
// //                       </h1>
// //                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
// //                         {mentor.yearsOfExperience && (
// //                           <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
// //                             <Briefcase size={11} className="text-blue-500 flex-shrink-0" />
// //                             <span>{mentor.yearsOfExperience}+ yrs</span>
// //                           </div>
// //                         )}
// //                         {mentor.companyName && (
// //                           <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
// //                             <Building2 size={11} className="text-blue-500 flex-shrink-0" />
// //                             <span className="truncate">{mentor.companyName}</span>
// //                           </div>
// //                         )}
// //                         {mentor.schoolName && (
// //                           <div className="hidden sm:flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
// //                             <GraduationCap size={11} className="text-blue-500 flex-shrink-0" />
// //                             <span className="truncate">{mentor.schoolName}</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* ── Action buttons: View Pricing + Book Trial ── */}
// //                   <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
// //                     <button
// //                       onClick={goToPlans}
// //                       className="h-9 sm:h-[42px] px-4 sm:px-6 rounded-full border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm whitespace-nowrap"
// //                     >
// //                       View Pricing
// //                     </button>
// //                     <button
// //                       onClick={() => {
// //                         setShowBooking(true);
// //                       }}
// //                       className={`h-9 sm:h-[42px] px-4 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition shadow-sm whitespace-nowrap flex items-center gap-1.5 ${
// //                         showBooking
// //                           ? "bg-blue-600 text-white hover:bg-blue-700"
// //                           : "bg-gray-900 text-white hover:bg-gray-800"
// //                       }`}
// //                     >
// //                       <Calendar size={13} />
// //                       Book Trial
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* ═══ INLINE BOOKING SECTION ═══ */}
// //               {showBooking && (
// //                 <div id="booking-section" className="mt-6 sm:mt-8">
// //                   <InlineBookingSection
// //                     mentor={mentor}
// //                     rawAvailability={rawAvailability}
// //                     onClose={() => setShowBooking(false)}
// //                     onConfirmed={() => {}}
// //                   />
// //                 </div>
// //               )}

// //               {/* ═══ PROFILE DETAILS (always visible below booking) ═══ */}
// //               <div className={showBooking ? "mt-8" : ""}>

// //                 {/* ─── About ─── */}
// //                 <div className="pt-5 sm:pt-6 pb-5 sm:pb-6 border-b border-gray-200 mt-4 sm:mt-6">
// //                   <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">About</h2>
// //                   <div className="max-w-3xl">
// //                     <p className="text-sm leading-7 text-gray-600 whitespace-pre-line">{bio}</p>
// //                     {bioLong && (
// //                       <button
// //                         onClick={() => setShowFullBio(!showFullBio)}
// //                         className="mt-3 text-sm text-blue-600 hover:underline font-medium"
// //                       >
// //                         {showFullBio ? "read less" : "read more"}
// //                       </button>
// //                     )}
// //                   </div>

// //                   {(mentor.location || mentor.languages?.length > 0) && (
// //                     <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-5">
// //                       {mentor.location && (
// //                         <div>
// //                           <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Find Me Here</p>
// //                           <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
// //                             <MapPin size={13} className="text-gray-500 flex-shrink-0" />
// //                             <span className="text-sm text-gray-700">{mentor.location}</span>
// //                           </div>
// //                         </div>
// //                       )}
// //                       {mentor.languages?.length > 0 && (
// //                         <div className="sm:border-l sm:border-gray-200 sm:pl-5">
// //                           <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Languages I Speak</p>
// //                           <div className="flex flex-wrap gap-2">
// //                             {mentor.languages.map((lang, i) => (
// //                               <div key={i} className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-sm text-gray-700">
// //                                 {lang}
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* ─── Education & Career ─── */}
// //                 <div className="py-5 sm:py-6 border-b border-gray-200">
// //                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Education & Career</h3>
// //                   <div className="relative flex flex-col gap-3">
// //                     <div className="hidden sm:block absolute left-[15px] top-3 bottom-3 w-[2px] bg-[#1a1a2e]" />
// //                     {[
// //                       mentor.currentRole && {
// //                         label: "Current Role",
// //                         value: `${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`,
// //                         icon: <Briefcase size={14} className="text-[#1d8e85]" />,
// //                       },
// //                       mentor.highestDegree && {
// //                         label: "Degree",
// //                         value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` · ${mentor.fieldOfStudy}` : ""}`,
// //                         icon: <GraduationCap size={14} className="text-[#1d8e85]" />,
// //                       },
// //                       mentor.schoolName && {
// //                         label: "Institution",
// //                         value: mentor.schoolName,
// //                         icon: <School size={14} className="text-[#1d8e85]" />,
// //                       },
// //                       mentor.yearsOfExperience && {
// //                         label: "Experience",
// //                         value: `${mentor.yearsOfExperience}+ years`,
// //                         icon: <BadgeCheck size={14} className="text-[#1d8e85]" />,
// //                       },
// //                       joined && {
// //                         label: "Member Since",
// //                         value: joined,
// //                         icon: <CalendarDays size={14} className="text-[#1d8e85]" />,
// //                       },
// //                     ]
// //                       .filter(Boolean)
// //                       .map(({ label, value, icon }) => (
// //                         <div
// //                           key={label}
// //                           className="relative flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-all"
// //                         >
// //                           <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#f0faf8] flex items-center justify-center flex-shrink-0">
// //                             {icon}
// //                           </div>
// //                           <div className="flex-1 min-w-0">
// //                             <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">{label}</p>
// //                             <p className="text-xs sm:text-sm text-gray-800 font-medium leading-snug break-words">{value}</p>
// //                           </div>
// //                         </div>
// //                       ))}
// //                   </div>

// //                   {(mentor.linkedinUrl || mentor.resumeLink) && (
// //                     <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
// //                       {mentor.linkedinUrl && (
// //                         <a
// //                           href={mentor.linkedinUrl}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
// //                         >
// //                           <Linkedin size={12} />
// //                           View LinkedIn
// //                           <ExternalLink size={10} />
// //                         </a>
// //                       )}
// //                       {mentor.resumeLink && (
// //                         <a
// //                           href={mentor.resumeLink}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
// //                         >
// //                           <FileText size={12} />
// //                           Open Portfolio
// //                           <ExternalLink size={10} />
// //                         </a>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* ─── Technical Skills ─── */}
// //                 {skills.length > 0 && (
// //                   <div className="py-5 sm:py-6 border-b border-gray-200">
// //                     <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Technical Skills</h3>
// //                     <div className="flex flex-wrap gap-1.5 sm:gap-2">
// //                       {skills.map((skill) => <SkillChip key={skill} skill={skill} />)}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* ─── Areas of Interest ─── */}
// //                 {areas.length > 0 && (
// //                   <div className="py-5 sm:py-6 border-b border-gray-200">
// //                     <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Areas of Interest</h3>
// //                     <div className="flex flex-wrap gap-1.5 sm:gap-2">
// //                       {areas.map((area) => <SkillChip key={area} skill={area} />)}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* ─── Reviews ─── */}
// //                 <div className="py-5 sm:py-6">
// //                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Reviews & Comments</h3>
// //                   <div className="space-y-4">
// //                     {reviews?.length > 0 ? (
// //                       reviews.map((review, index) => (
// //                         <div key={review._id || index} className="border-b border-gray-200 pb-4">
// //                           <p className="text-sm leading-7 text-gray-600 mb-3">
// //                             {review.review || review.comment}
// //                           </p>
// //                           <div className="flex items-center justify-between gap-3 flex-wrap">
// //                             <div className="flex items-center gap-2.5">
// //                               {review.user?.profileImage ? (
// //                                 <img
// //                                   src={review.user.profileImage}
// //                                   alt={review.user?.name}
// //                                   className="w-8 h-8 rounded-full object-cover"
// //                                 />
// //                               ) : (
// //                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 uppercase">
// //                                   {(review.user?.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("")}
// //                                 </div>
// //                               )}
// //                               <span className="text-sm font-semibold text-gray-800">
// //                                 {review.user?.name || "Anonymous User"}
// //                               </span>
// //                             </div>
// //                             <span className="text-xs text-gray-400">
// //                               {review.createdAt
// //                                 ? new Date(review.createdAt).toLocaleDateString("en-IN", {
// //                                   day: "numeric", month: "short", year: "numeric",
// //                                 })
// //                                 : "Recently"}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <p className="text-sm text-gray-500">No reviews yet. Be the first to leave one!</p>
// //                     )}
// //                   </div>
// //                 </div>

// //               </div>{/* end profile details */}
// //             </div>
// //           </div>

// //           {/* ══ RIGHT SIDEBAR — desktop only, simplified (no booking card) ══ */}
// //           <div className="hidden lg:flex flex-col w-[280px] xl:w-[320px] flex-shrink-0 border-l border-gray-200 overflow-hidden bg-white sticky top-[57px] h-[calc(100vh-57px)]">
// //             <div className="flex-1 flex flex-col p-4 sm:p-6 gap-6">
// //               {/* Plans Card */}
// //               <div>
// //                 <h3 className="text-base font-bold text-gray-900 mb-3">Ready to get started?</h3>
// //                 <button
// //                   onClick={goToPlans}
// //                   className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
// //                 >
// //                   View Plans
// //                 </button>
// //               </div>

// //               {/* Divider */}
// //               <div className="h-px bg-gray-200" />

// //               {/* Features */}
//               // <div>
//               //   <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Mentorship Benefits</p>
//               //   <div className="space-y-2.5">
//               //     {[
//               //       { icon: <Calendar size={14} />, text: "1:1 Sessions" },
//               //       { icon: <Award size={14} />, text: "Career Guidance" },
//               //       { icon: <FileText size={14} />, text: "Resume Review" },
//               //       { icon: <BadgeCheck size={14} />, text: "Certificate" },
//               //     ].map((item, idx) => (
//               //       <div key={idx} className="flex items-center gap-2.5">
//               //         <span className="text-gray-400 flex-shrink-0">{item.icon}</span>
//               //         <span className="text-sm text-gray-700">{item.text}</span>
//               //       </div>
//               //     ))}
//               //   </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ══ Sticky bottom CTA bar — mobile/tablet only ══ */}
// //       <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shadow-lg">
// //         <button
// //           onClick={goToPlans}
// //           className="flex-1 h-11 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-[0.97]"
// //         >
// //           View Plans
// //         </button>
// //         <button
// //           onClick={() => setShowBooking(true)}
// //           className="flex-1 h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition active:scale-[0.97] flex items-center justify-center gap-2"
// //         >
// //           <Calendar size={15} />
// //           Book Trial
// //         </button>
// //       </div>

// //       {/* ══ Booking Modal (if needed after confirmation) ══ */}
// //       {mentor && (
// //         <BookingModal
// //           mentor={mentor}
// //           isOpen={bookingOpen}
// //           onClose={() => setBookingOpen(false)}
// //           selectedSlot={null}
// //           appliedCoupon={null}
// //           availableCoupons={[]}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default ProfileModal;


// import React, { useState, useMemo, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Heart, Calendar, MapPin, Award, GraduationCap, Globe, Star,
//   MessageCircle, CheckCircle, ExternalLink, Zap, ChevronLeft,
//   ChevronRight, Clock, Briefcase, FileText, BadgeCheck, Video, Users,
//   Building2, School, CalendarDays, Linkedin, X, Menu, ArrowLeft,
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

// /* ─── Global Font ─────────────────────────────────────────── */
// const FONT_STYLE = `
//   *, *::before, *::after {
//     font-family: Cambria, 'Times New Roman', Georgia, serif !important;
//   }
//   .hide-scrollbar::-webkit-scrollbar { display: none; }
//   .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

//   @keyframes slideUp {
//     from { transform: translateY(100%); opacity: 0; }
//     to   { transform: translateY(0);    opacity: 1; }
//   }
//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to   { opacity: 1; }
//   }
//   @keyframes slideInDown {
//     from { transform: translateY(-20px); opacity: 0; }
//     to   { transform: translateY(0); opacity: 1; }
//   }
//   @keyframes slideInRight {
//     from { transform: translateX(24px); opacity: 0; }
//     to   { transform: translateX(0); opacity: 1; }
//   }
//   .sheet-enter  { animation: slideUp 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
//   .overlay-enter{ animation: fadeIn  0.25s ease forwards; }
//   .modal-enter  { animation: slideInDown 0.3s ease forwards; }
//   .booking-enter { animation: slideInRight 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
//   .fade-enter { animation: fadeIn 0.25s ease forwards; }

//   .slot-btn:hover { transform: scale(1.02); }
//   .slot-btn { transition: all 0.15s ease; }
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
//   "mongo db": `${DI}/mongodb/mongodb-original.svg`,
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
//   "sockets": `${DI}/socketio/socketio-original.svg`,
// };
// const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

// /* ─── Helpers ───────────────────────────────────────────────── */
// const now = new Date();

// const isSlotPast = (dateStr, startTime) => {
//   const [h, m] = startTime.split(":").map(Number);
//   const ymd = dateStr.slice(0, 10);
//   const d = new Date(`${ymd}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
//   return d < now;
// };

// const toYMD = (d) => d.toISOString().slice(0, 10);

// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// const DAY_NAMES_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// /* ─── Auth error check ──────────────────────────────────────── */
// const isAuthError = (error) => {
//   if (!error) return false;
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
//     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-800 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200">
//       <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
//         {icon && !imgErr ? (
//           <img src={icon} alt={skill} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" onError={() => setImgErr(true)} />
//         ) : (
//           <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gray-100 text-gray-600 text-[7px] sm:text-[8px] font-bold rounded-full">
//             {skill.slice(0, 2).toUpperCase()}
//           </span>
//         )}
//       </span>
//       <span className="whitespace-nowrap leading-none">{skill}</span>
//     </span>
//   );
// };

// /* ═══════════════════════════════════════════════════════════════
//    MINI MONTH CALENDAR
// ═══════════════════════════════════════════════════════════════ */
// const MiniMonthCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
//   const today = new Date();
//   const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

//   const year = viewMonth.getFullYear();
//   const month = viewMonth.getMonth();

//   const firstDayOfMonth = new Date(year, month, 1).getDay();
//   const startOffset = (firstDayOfMonth + 6) % 7; // Monday-first
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const cells = [];
//   for (let i = 0; i < startOffset; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

//   const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
//   const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));
//   const canGoPrev = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1);

//   return (
//     <div className="w-full select-none">
//       <div className="flex items-center justify-between mb-3">
//         <button
//           onClick={prevMonth}
//           disabled={!canGoPrev}
//           className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
//         >
//           <ChevronLeft size={15} className="text-gray-600" />
//         </button>
//         <span className="text-sm font-bold text-gray-900">
//           {MONTH_NAMES[month]} {year}
//         </span>
//         <button
//           onClick={nextMonth}
//           className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
//         >
//           <ChevronRight size={15} className="text-gray-600" />
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
//           const isPast = day < new Date(toYMD(today));
//           const isToday = ymd === toYMD(today);

//           return (
//             <button
//               key={ymd}
//               disabled={!isAvail || isPast}
//               onClick={() => isAvail && !isPast && onSelectDate(isSel ? null : ymd)}
//               className={`
//                 relative mx-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all
//                 ${isSel
//                   ? "bg-blue-600 text-white font-bold"
//                   : isToday && isAvail && !isPast
//                     ? "ring-2 ring-blue-400 text-blue-600 hover:bg-blue-50"
//                     : isAvail && !isPast
//                       ? "text-blue-600 hover:bg-blue-50 cursor-pointer font-semibold"
//                       : "text-gray-300 cursor-default"}
//               `}
//             >
//               {day.getDate()}
//               {isAvail && !isPast && !isSel && (
//                 <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════════
//    INLINE BOOKING SECTION
//    Props:
//      mentor           – mentor object
//      rawAvailability  – raw slots array
//      onClose          – called when user clicks back arrow
//      onSlotConfirmed  – called with the chosen slot object
//                         → parent lifts it up & opens BookingModal
// ═══════════════════════════════════════════════════════════════ */
// const InlineBookingSection = ({ mentor, rawAvailability, onClose, onSlotConfirmed }) => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   /* Group by date */
//   const grouped = useMemo(() => {
//     if (!rawAvailability || rawAvailability.length === 0) return {};
//     const acc = {};
//     for (const slot of rawAvailability) {
//       const dk = slot.date.slice(0, 10);
//       if (!acc[dk]) acc[dk] = [];
//       acc[dk].push({
//         _id: slot._id,
//         date: dk,
//         startTime: slot.startTime,
//         endTime: slot.endTime,
//         isBooked: slot.isBooked,
//       });
//     }
//     return acc;
//   }, [rawAvailability]);

//   /* Set of dates that have at least one bookable slot */
//   const availableDatesSet = useMemo(() => {
//     const s = new Set();
//     for (const [dk, slots] of Object.entries(grouped)) {
//       if (slots.some((sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime))) {
//         s.add(dk);
//       }
//     }
//     return s;
//   }, [grouped]);

//   /* Slots for currently selected date (only future, unbooked) */
//   const slotsForSelectedDate = useMemo(() => {
//     if (!selectedDate) return [];
//     return (grouped[selectedDate] || []).filter(
//       (sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime)
//     );
//   }, [selectedDate, grouped]);

//   /* When user clicks "Confirm Booking →" hand the slot up to parent */
//   const handleConfirmBooking = () => {
//     if (!selectedSlot) return;
//     onSlotConfirmed(selectedSlot); // ← parent opens BookingModal with this slot
//   };

//   const initials =
//     mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";

//   /* Timezone label */
//   const tzOffset = -(new Date().getTimezoneOffset());
//   const tzSign = tzOffset >= 0 ? "+" : "-";
//   const tzHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, "0");
//   const tzMins = String(Math.abs(tzOffset) % 60).padStart(2, "0");
//   const tzLabel = `(GMT${tzSign}${tzHours}:${tzMins}) India Standard Time - Kolkata`;

//   return (
//     <div className="booking-enter">
//       {/* Back header */}
//       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
//         <button
//           onClick={onClose}
//           className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition flex-shrink-0"
//           aria-label="Back to profile"
//         >
//           <ArrowLeft size={15} className="text-gray-600" />
//         </button>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-900">Book a Trial Session</h2>
//       </div>

//       {/* Two-panel layout */}
//       <div className="flex flex-col lg:flex-row gap-0 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

//         {/* ── LEFT: mentor card + mini calendar ── */}
//         <div className="lg:w-[280px] xl:w-[300px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 p-5 flex flex-col gap-5">

//           {/* Mentor info */}
//           <div className="pb-4 border-b border-gray-200">
//             <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden mb-3">
//               {mentor.profilePhoto || mentor.profileImage ? (
//                 <img
//                   src={mentor.profilePhoto || mentor.profileImage}
//                   alt={mentor.fullName}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-lg font-black text-gray-400">
//                   {initials}
//                 </div>
//               )}
//             </div>
//             <h3 className="text-base font-bold text-gray-900">{mentor.fullName}</h3>
//             {mentor.currentRole && (
//               <p className="text-xs text-gray-500 mt-0.5">
//                 {mentor.currentRole}
//                 {mentor.companyName ? ` · ${mentor.companyName}` : ""}
//               </p>
//             )}
//           </div>

//           {/* Session meta */}
//           <div className="flex flex-col gap-2.5 pb-4 border-b border-gray-200">
//             {/* <div className="flex items-center gap-2 text-xs text-gray-600">
//               <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//                 <Clock size={11} className="text-gray-500" />
//               </div>
//               <span>15 min appointments</span>
//             </div> */}
//             <div className="flex items-center gap-2 text-xs text-gray-600">
//               <div className="w-5 h-5 rounded-full  flex items-center justify-center flex-shrink-0">
//                 <Video size={11} className="text-[#1f2937]" />

//               </div>
//               <span>Zoom Meet video conference info added after booking</span>
//             </div>
//           </div>

//           {/* Mini calendar */}
//           <MiniMonthCalendar
//             availableDates={availableDatesSet}
//             selectedDate={selectedDate}
//             onSelectDate={(dk) => {
//               setSelectedDate(dk);
//               setSelectedSlot(null);
//             }}
//           />
//         </div>

//   {/* ── RIGHT: time slots ── */}
// <div className="flex-1 bg-white flex flex-col overflow-hidden">

//   <div className="flex-1 p-4 sm:p-5">
//     <h3 className="text-sm font-bold text-gray-900 mb-4">
//       Select an appointment time
//     </h3>

//     {!selectedDate ? (
//       <div className="flex flex-col items-center justify-center h-48 text-center">
//         <Calendar size={36} className="text-gray-200 mb-3" />
//         <p className="text-sm text-gray-400">
//           Select a date from the calendar to see available times
//         </p>
//       </div>
//     ) : slotsForSelectedDate.length === 0 ? (
//       <div className="flex flex-col items-center justify-center h-48 text-center">
//         <Clock size={36} className="text-gray-200 mb-3" />
//         <p className="text-sm text-gray-400">
//           No available slots for this date
//         </p>

//         <button
//           onClick={() => setSelectedDate(null)}
//           className="mt-3 text-xs font-semibold text-[#0098cc] hover:underline"
//         >
//           Choose another date
//         </button>
//       </div>
//     ) : (
//       <div className="fade-enter">

//         {/* Selected date heading */}
//         <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">
//           {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
//             weekday: "long",
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </p>

//         {/* Slot pills */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//           {slotsForSelectedDate.map((slot) => {
//             const chosen = selectedSlot?._id === slot._id;

//             return (
//               <button
//                 key={slot._id}
//                 onClick={() => setSelectedSlot(chosen ? null : slot)}
//                 className={`slot-btn py-2.5 px-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 ${
//                   chosen
//                     ? "border-[#1a1a2e] bg-[#1a1a2e] text-white shadow-md"
//                     : "border-[#0098cc] bg-white text-[#0098cc] hover:bg-[#0098cc] hover:text-white hover:border-[#0098cc]"
//                 }`}
//               >
//                 {slot.startTime}
//               </button>
//             );
//           })}
//         </div>

//         {/* Confirm row */}
//         {selectedSlot && (
//           <div className="fade-enter mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//             <div className="flex-1">
//               <p className="text-xs text-gray-500">
//                 Selected:{" "}
//                 <span className="font-bold text-[#1a1a2e]">
//                   {selectedSlot.startTime}
//                 </span>

//                 {selectedSlot.endTime && (
//                   <span className="text-gray-400">
//                     {" "}– {selectedSlot.endTime}
//                   </span>
//                 )}
//               </p>
//             </div>

//             <button
//               onClick={handleConfirmBooking}
//               className="px-6 py-2.5 bg-[#1a1a2e] text-white text-sm font-bold rounded-full hover:bg-[#0098cc] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
//             >
//               Confirm Booking →
//             </button>
//           </div>
//         )}
//       </div>
//     )}
//   </div>
// </div>
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

//   /* ── UI state ── */
//   const [showBooking, setShowBooking] = useState(false);
//   const [showFullBio, setShowFullBio] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [reviewText, setReviewText] = useState("");
//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewSubmitted, setReviewSubmitted] = useState(false);

//   /*
//    * bookingOpen  – whether the BookingModal (payment/confirmation modal) is open
//    * selectedSlotForModal – the slot object passed into BookingModal
//    *
//    * Flow:
//    *   User clicks "Book Trial"
//    *   → showBooking = true  (inline calendar section appears)
//    *   User picks date + time + clicks "Confirm Booking →"
//    *   → InlineBookingSection calls onSlotConfirmed(slot)
//    *   → ProfileModal receives slot, stores in selectedSlotForModal,
//    *     sets bookingOpen = true  (BookingModal pops up with the slot)
//    *   User completes / cancels BookingModal
//    *   → bookingOpen = false, selectedSlotForModal = null
//    */
//   const [bookingOpen, setBookingOpen] = useState(false);
//   const [selectedSlotForModal, setSelectedSlotForModal] = useState(null);

//   /* ── Data fetching ── */
//   const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
//   const [submitReview, { isLoading: submittingReview }] = useSubmitReviewMutation();
//   const reviews = reviewsData?.reviews || [];

//   const cookieData = Cookies.get("profileData");
//   const userData = cookieData ? JSON.parse(cookieData) : null;
//   const currentStatus = userData?.profile?.currentStatus;

//   const { data: apiResponse, isLoading, isError, error } =
//     useFetchMentorByIdQuery({ mentorId, currentStatus });

//   const mentor = apiResponse?.data?.mentorDetails || apiResponse?.data || apiResponse;
//   const rawAvailability = mentor?.availability || [];

//   const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
//   const userMenteeId = userData1?._id;

//   /* ── Auth redirect ── */
//   useEffect(() => {
//     if (isError && isAuthError(error)) {
//       navigate("/login", { replace: true });
//     }
//   }, [isError, error, navigate]);

//   /* ── Scroll to booking section on mobile ── */
//   useEffect(() => {
//     if (showBooking) {
//       setTimeout(() => {
//         document.getElementById("booking-section")?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 100);
//     }
//   }, [showBooking]);

//   /* ── Called when user confirms slot in the inline calendar ── */
//   const handleSlotConfirmed = (slot) => {
//     setSelectedSlotForModal(slot); // store the chosen slot
//     setBookingOpen(true);          // open BookingModal (API call happens inside BookingModal)
//   };

//   /* ── Called when BookingModal closes (success or cancel) ── */
//   const handleBookingModalClose = () => {
//     setBookingOpen(false);
//     setSelectedSlotForModal(null);
//     // Optionally close the inline section too after a successful booking
//     // setShowBooking(false);
//   };

//   const handleReviewSubmit = async () => {
//     if (!reviewText.trim()) return;
//     try {
//       await submitReview({
//         mentorId,
//         menteeId: userMenteeId,
//         rating: reviewRating,
//         comment: reviewText.trim(),
//       }).unwrap();
//       setReviewText("");
//       setReviewRating(5);
//       setReviewSubmitted(true);
//       setTimeout(() => setReviewSubmitted(false), 3000);
//     } catch (err) {
//       if (isAuthError(err)) navigate("/login", { replace: true });
//       console.error(err);
//     }
//   };

//   const goToPlans = () => navigate(`/mentor/${mentorId}/ltm-plans`);

//   /* ── Loading / error guards ── */
//   if (isLoading)
//     return (
//       <div className="h-screen w-full bg-white flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   if (isError && isAuthError(error)) return null;
//   if (isError || !mentor)
//     return (
//       <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4">
//         <p className="text-red-500 mb-4 text-base text-center">Failed to load profile</p>
//         <button
//           onClick={() => navigate("/mentors")}
//           className="bg-gray-900 text-white px-6 py-3 font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           ← Back to Mentors
//         </button>
//       </div>
//     );

//   /* ── Derived fields ── */
//   const skills =
//     mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
//   const areas =
//     mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
//   const bioText = mentor.motivationStatement || mentor.bio || "";
//   const bioLong = bioText.length > 400;
//   const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 400) + "…";
//   const initials =
//     mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
//   const joined = mentor.createdAt
//     ? new Date(mentor.createdAt).toLocaleDateString("en-IN", {
//       month: "short",
//       year: "numeric",
//     })
//     : null;

//   /* ══════════════════════════════════════════════════════════════
//      RENDER
//   ══════════════════════════════════════════════════════════════ */
//   return (
//     <>
//       <style>{FONT_STYLE}</style>

//       {/* ─── Navbar ─────────────────────────────────────────── */}
//       <nav className="w-full bg-white border-b border-gray-100 z-50 sticky top-0">
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3">
//           <div
//             className="flex items-center gap-2 cursor-pointer flex-shrink-0"
//             onClick={() => navigate("/")}
//           >
//             <img src={logo} alt="Karrivo Logo" className="h-9 sm:h-11 w-auto object-contain" />
//             <h1 className="text-base sm:text-xl font-bold text-black tracking-tight">KARRIVO</h1>
//           </div>

//           <div className="hidden md:flex items-center gap-8">
//             <button
//               onClick={() => navigate("/explore-mentors")}
//               className="text-sm font-bold text-gray-700 hover:text-gray-900 transition"
//             >
//               Explore Mentors
//             </button>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 sm:px-8 py-2 text-xs sm:text-sm font-medium text-[#1f2937] bg-transparent border border-gray-300 rounded-md hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-all duration-300 whitespace-nowrap"
//             >
//               Login
//             </button>
//             <button
//               className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition"
//               onClick={() => setMobileMenuOpen((v) => !v)}
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
//             <button
//               onClick={() => {
//                 navigate("/explore-mentors");
//                 setMobileMenuOpen(false);
//               }}
//               className="block w-full text-left text-sm font-semibold text-gray-700 py-2 hover:text-gray-900 transition"
//             >
//               Explore Mentors
//             </button>
//           </div>
//         )}
//       </nav>

//       {/* ─── Page wrapper ───────────────────────────────────── */}
//       <div className="w-full bg-white min-h-[calc(100vh-57px)]">
//         <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">

//           {/* ══ MAIN CONTENT ══ */}
//           <div className="flex-1 min-w-0 lg:overflow-y-auto hide-scrollbar bg-white">

//             {/* Banner */}
//             <div
//               className="relative w-full h-auto py-8 xs:py-10 sm:py-12 md:py-16 overflow-hidden"
//               style={{ background: "#f6f2ed" }}
//             >
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
//                 <p className="text-[#1f2937] text-lg xs:text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-tight">
//                   Connect with Expert Mentors
//                 </p>
//                 <p className="text-[#1f2937]/60 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
//                   Personalized guidance for your career growth, learning, and success
//                 </p>
//               </div>
//             </div>

//             {/* Content area */}
//             <div className="px-4 xs:px-5 sm:px-8 lg:px-10 pb-24 lg:pb-8">

//               {/* ─── Profile Header ─── */}
//               <div className="relative -mt-10 xs:-mt-12 sm:-mt-14 md:-mt-16">
//                 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">

//                   <div className="flex flex-row items-end gap-3 sm:gap-4">
//                     {/* Avatar */}
//                     <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden shadow-md flex-shrink-0">
//                       {mentor.profilePhoto || mentor.profileImage ? (
//                         <img
//                           src={mentor.profilePhoto || mentor.profileImage}
//                           alt={mentor.fullName}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-black text-gray-400">
//                           {initials}
//                         </div>
//                       )}
//                     </div>

//                     {/* Name + meta */}
//                     <div className="pb-1 min-w-0 flex-1">
//                       <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 leading-tight truncate">
//                         {mentor.fullName}
//                       </h1>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
//                         {mentor.yearsOfExperience && (
//                           <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
//                             <Briefcase size={11} className="text-blue-500 flex-shrink-0" />
//                             <span>{mentor.yearsOfExperience}+ yrs</span>
//                           </div>
//                         )}
//                         {mentor.companyName && (
//                           <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
//                             <Building2 size={11} className="text-blue-500 flex-shrink-0" />
//                             <span className="truncate">{mentor.companyName}</span>
//                           </div>
//                         )}
//                         {mentor.schoolName && (
//                           <div className="hidden sm:flex items-center gap-1 text-xs sm:text-sm text-gray-600 min-w-0">
//                             <GraduationCap size={11} className="text-blue-500 flex-shrink-0" />
//                             <span className="truncate">{mentor.schoolName}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* ── Action buttons ── */}
//                   <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
//                     <button
//                       onClick={goToPlans}
//                       className="h-9 sm:h-[42px] px-4 sm:px-6 rounded-full border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm whitespace-nowrap"
//                     >
//                       View Pricing
//                     </button>
//                     <button
//                       onClick={() => setShowBooking(true)}
//                       className={`h-9 sm:h-[42px] px-4 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition shadow-sm whitespace-nowrap flex items-center gap-1.5 ${showBooking
//                         ? "bg-[#0092c4] text-white hover:bg-blue-700"
//                         : "text-[#1a1a2e] border  border-gray-200  hover:bg-gray-800"}`}
//                     >
//                       <Calendar size={13} />
//                       Book Trial
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* ═══ INLINE BOOKING SECTION ═══
//                   Shown when showBooking = true.
//                   When user confirms a slot → handleSlotConfirmed(slot) → opens BookingModal.
//               */}
//               {showBooking && (
//                 <div id="booking-section" className="mt-6 sm:mt-8">
//                   <InlineBookingSection
//                     mentor={mentor}
//                     rawAvailability={rawAvailability}
//                     onClose={() => setShowBooking(false)}
//                     onSlotConfirmed={handleSlotConfirmed}
//                   />
//                 </div>
//               )}

//               {/* ═══ PROFILE DETAILS (always visible) ═══ */}
//               <div className={showBooking ? "mt-8" : ""}>

//                 {/* ─── About ─── */}
//                 <div className="pt-5 sm:pt-6 pb-5 sm:pb-6 border-b border-gray-200 mt-4 sm:mt-6">
//                   <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">About</h2>
//                   <div className="max-w-3xl">
//                     <p className="text-sm leading-7 text-gray-600 whitespace-pre-line">{bio}</p>
//                     {bioLong && (
//                       <button
//                         onClick={() => setShowFullBio(!showFullBio)}
//                         className="mt-3 text-sm text-blue-600 hover:underline font-medium"
//                       >
//                         {showFullBio ? "read less" : "read more"}
//                       </button>
//                     )}
//                   </div>

//                   {(mentor.location || mentor.languages?.length > 0) && (
//                     <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-5">
//                       {mentor.location && (
//                         <div>
//                           <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
//                             Find Me Here
//                           </p>
//                           <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
//                             <MapPin size={13} className="text-gray-500 flex-shrink-0" />
//                             <span className="text-sm text-gray-700">{mentor.location}</span>
//                           </div>
//                         </div>
//                       )}
//                       {mentor.languages?.length > 0 && (
//                         <div className="sm:border-l sm:border-gray-200 sm:pl-5">
//                           <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
//                             Languages I Speak
//                           </p>
//                           <div className="flex flex-wrap gap-2">
//                             {mentor.languages.map((lang, i) => (
//                               <div
//                                 key={i}
//                                 className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-sm text-gray-700"
//                               >
//                                 {lang}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* ─── Education & Career ─── */}
//                 <div className="py-5 sm:py-6 border-b border-gray-200">
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
//                     Education & Career
//                   </h3>
//                   <div className="relative flex flex-col gap-3">
//                     <div className="hidden sm:block absolute left-[15px] top-3 bottom-3 w-[2px] bg-[#1a1a2e]" />
//                     {[
//                       mentor.currentRole && {
//                         label: "Current Role",
//                         value: `${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`,
//                         icon: <Briefcase size={14} className="text-[#1d8e85]" />,
//                       },
//                       mentor.highestDegree && {
//                         label: "Degree",
//                         value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` · ${mentor.fieldOfStudy}` : ""}`,
//                         icon: <GraduationCap size={14} className="text-[#1d8e85]" />,
//                       },
//                       mentor.schoolName && {
//                         label: "Institution",
//                         value: mentor.schoolName,
//                         icon: <School size={14} className="text-[#1d8e85]" />,
//                       },
//                       mentor.yearsOfExperience && {
//                         label: "Experience",
//                         value: `${mentor.yearsOfExperience}+ years`,
//                         icon: <BadgeCheck size={14} className="text-[#1d8e85]" />,
//                       },
//                       joined && {
//                         label: "Member Since",
//                         value: joined,
//                         icon: <CalendarDays size={14} className="text-[#1d8e85]" />,
//                       },
//                     ]
//                       .filter(Boolean)
//                       .map(({ label, value, icon }) => (
//                         <div
//                           key={label}
//                           className="relative flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-all"
//                         >
//                           <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#f0faf8] flex items-center justify-center flex-shrink-0">
//                             {icon}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">
//                               {label}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-800 font-medium leading-snug break-words">
//                               {value}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>

//                   {(mentor.linkedinUrl || mentor.resumeLink) && (
//                     <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
//                       {mentor.linkedinUrl && (
//                         <a
//                           href={mentor.linkedinUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
//                         >
//                           <Linkedin size={12} />
//                           View LinkedIn
//                           <ExternalLink size={10} />
//                         </a>
//                       )}
//                       {mentor.resumeLink && (
//                         <a
//                           href={mentor.resumeLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="px-3 py-2 border border-blue-100 rounded-lg text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1.5 hover:bg-blue-50 transition"
//                         >
//                           <FileText size={12} />
//                           Open Portfolio
//                           <ExternalLink size={10} />
//                         </a>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* ─── Technical Skills ─── */}
//                 {skills.length > 0 && (
//                   <div className="py-5 sm:py-6 border-b border-gray-200">
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
//                       Technical Skills
//                     </h3>
//                     <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                       {skills.map((skill) => (
//                         <SkillChip key={skill} skill={skill} />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* ─── Areas of Interest ─── */}
//                 {areas.length > 0 && (
//                   <div className="py-5 sm:py-6 border-b border-gray-200">
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
//                       Areas of Interest
//                     </h3>
//                     <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                       {areas.map((area) => (
//                         <SkillChip key={area} skill={area} />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* ─── Reviews ─── */}
//                 <div className="py-5 sm:py-6">
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
//                     Reviews & Comments
//                   </h3>
//                   <div className="space-y-4">
//                     {reviews?.length > 0 ? (
//                       reviews.map((review, index) => (
//                         <div key={review._id || index} className="border-b border-gray-200 pb-4">
//                           <p className="text-sm leading-7 text-gray-600 mb-3">
//                             {review.review || review.comment}
//                           </p>
//                           <div className="flex items-center justify-between gap-3 flex-wrap">
//                             <div className="flex items-center gap-2.5">
//                               {review.user?.profileImage ? (
//                                 <img
//                                   src={review.user.profileImage}
//                                   alt={review.user?.name}
//                                   className="w-8 h-8 rounded-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 uppercase">
//                                   {(review.user?.name || "U")
//                                     .split(" ")
//                                     .map((w) => w[0])
//                                     .slice(0, 2)
//                                     .join("")}
//                                 </div>
//                               )}
//                               <span className="text-sm font-semibold text-gray-800">
//                                 {review.user?.name || "Anonymous User"}
//                               </span>
//                             </div>
//                             <span className="text-xs text-gray-400">
//                               {review.createdAt
//                                 ? new Date(review.createdAt).toLocaleDateString("en-IN", {
//                                   day: "numeric",
//                                   month: "short",
//                                   year: "numeric",
//                                 })
//                                 : "Recently"}
//                             </span>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500">
//                         No reviews yet. Be the first to leave one!
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ══ RIGHT SIDEBAR — desktop only ══ */}
//           <div className="hidden lg:flex flex-col w-[280px] xl:w-[320px] flex-shrink-0 border-l border-gray-200 overflow-hidden bg-white sticky top-[57px] h-[calc(100vh-57px)]">
//             <div className="flex-1 flex flex-col p-4 sm:p-6 gap-6">
//               <div>
//                 <h3 className="text-base font-bold text-gray-900 mb-3">Ready to get started?</h3>
//                 <button
//                   onClick={goToPlans}
//                   className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
//                 >
//                   View Plans
//                 </button>
//               </div>

//               <div className="h-px bg-gray-200" />

//               <div>
//                 <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
//                   Mentorship Benefits
//                 </p>
//                 <div className="space-y-2.5">
//                   {[
//                     { icon: <Calendar size={14} />, text: "1:1 Sessions" },
//                     { icon: <Award size={14} />, text: "Career Guidance" },
//                     { icon: <FileText size={14} />, text: "Resume Review" },
//                     { icon: <BadgeCheck size={14} />, text: "Certificate" },
//                   ].map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-2.5">
//                       <span className="text-gray-400 flex-shrink-0">{item.icon}</span>
//                       <span className="text-sm text-gray-700">{item.text}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ Sticky bottom CTA — mobile/tablet only ══ */}
//       <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shadow-lg">
//         <button
//           onClick={goToPlans}
//           className="flex-1 h-11 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-[0.97]"
//         >
//           View Plans
//         </button>
//         <button
//           onClick={() => setShowBooking(true)}
//           className="flex-1 h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition active:scale-[0.97] flex items-center justify-center gap-2"
//         >
//           <Calendar size={15} />
//           Book Trial
//         </button>
//       </div>

//       {/* ══ BOOKING MODAL
//             Opened after user confirms a slot in the inline calendar.
//             selectedSlotForModal is passed in so BookingModal can call the
//             booking API with the correct slot _id / details.
//       ══ */}
//       {mentor && (
//         <BookingModal
//           mentor={mentor}
//           isOpen={bookingOpen}
//           onClose={handleBookingModalClose}
//           selectedSlot={selectedSlotForModal}   // ← the chosen slot, was null before
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

/* ─── Design Tokens ──────────────────────────────────────────── */
const PRIMARY = "#1a1a2e";
const ACCENT = "#0098cc";
const WHITE = "#ffffff";

/* ─── Global Styles ─────────────────────────────────────────── */
const FONT_STYLE = `
  *, *::before, *::after {
    font-family: Cambria, 'Times New Roman', Georgia, serif !important;
  }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideInDown {
    from { transform: translateY(-20px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideInRight {
    from { transform: translateX(24px); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  .sheet-enter   { animation: slideUp       0.32s cubic-bezier(0.22,1,0.36,1) forwards; }
  .overlay-enter { animation: fadeIn         0.25s ease forwards; }
  .modal-enter   { animation: slideInDown    0.3s  ease forwards; }
  .booking-enter { animation: slideInRight   0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
  .fade-enter    { animation: fadeIn         0.25s ease forwards; }

  /* Unified button base */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 40px;
    padding: 0 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
    white-space: nowrap;
    border: 2px solid transparent;
    line-height: 1;
  }
  .btn:active { transform: scale(0.96); }

  /* Primary: solid #1a1a2e */
  .btn-primary {
    background: #1a1a2e;
    color: #ffffff;
    border-color: #1a1a2e;
  }
  .btn-primary:hover {
    background: #0098cc;
    border-color: #0098cc;
  }

  /* Secondary: outlined #1a1a2e */
  .btn-secondary {
    background: #ffffff;
    color: #1a1a2e;
    border-color: #1a1a2e;
  }
  .btn-secondary:hover {
    background: #1a1a2e;
    color: #ffffff;
  }

  /* Ghost: outlined accent */
  .btn-ghost {
    background: #ffffff;
    color: #0098cc;
    border-color: #0098cc;
  }
  .btn-ghost:hover {
    background: #0098cc;
    color: #ffffff;
  }

  /* Full-width utility */
  .btn-full { width: 100%; }

  .slot-btn { transition: all 0.15s ease; }
  .slot-btn:hover { transform: scale(1.03); }
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
  "mongo db": `${DI}/mongodb/mongodb-original.svg`,
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
  "sockets": `${DI}/socketio/socketio-original.svg`,
};
const getSkillIcon = (skill) => SKILL_ICON_MAP[skill.toLowerCase().trim()] || null;

/* ─── Helpers ───────────────────────────────────────────────── */
const now = new Date();

const isSlotPast = (dateStr, startTime) => {
  const [h, m] = startTime.split(":").map(Number);
  const ymd = dateStr.slice(0, 10);
  const d = new Date(`${ymd}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
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
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-800 text-xs font-semibold transition-all duration-200"
      style={{ borderColor: "#e5e7eb" }}
    >
      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        {icon && !imgErr ? (
          <img
            src={icon}
            alt={skill}
            className="w-4 h-4 object-contain"
            onError={() => setImgErr(true)}
          />
        ) : (
          <span
            className="w-4 h-4 flex items-center justify-center text-white text-[7px] font-black rounded"
            style={{ background: PRIMARY }}
          >
            {skill.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap leading-none">{skill}</span>
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MINI MONTH CALENDAR
═══════════════════════════════════════════════════════════════ */
const MiniMonthCalendar = ({ availableDates, selectedDate, onSelectDate }) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));
  const canGoPrev = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={14} className="text-gray-600" />
        </button>
        <span className="text-sm font-bold text-gray-900">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
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
          const isPast = day < new Date(toYMD(today));
          const isToday = ymd === toYMD(today);

          return (
            <button
              key={ymd}
              disabled={!isAvail || isPast}
              onClick={() => isAvail && !isPast && onSelectDate(isSel ? null : ymd)}
              className="relative mx-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all"
              style={{
                background: isSel ? PRIMARY : "transparent",
                color: isSel
                  ? WHITE
                  : isAvail && !isPast
                    ? ACCENT
                    : "#d1d5db",
                cursor: isAvail && !isPast ? "pointer" : "default",
                fontWeight: isAvail && !isPast ? 700 : 400,
                outline: isToday && isAvail && !isPast && !isSel ? `2px solid ${ACCENT}` : "none",
              }}
            >
              {day.getDate()}
              {isAvail && !isPast && !isSel && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: ACCENT }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   INLINE BOOKING SECTION
═══════════════════════════════════════════════════════════════ */
const InlineBookingSection = ({ mentor, rawAvailability, onClose, onSlotConfirmed }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const grouped = useMemo(() => {
    if (!rawAvailability || rawAvailability.length === 0) return {};
    const acc = {};
    for (const slot of rawAvailability) {
      const dk = slot.date.slice(0, 10);
      if (!acc[dk]) acc[dk] = [];
      acc[dk].push({
        _id: slot._id,
        date: dk,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
      });
    }
    return acc;
  }, [rawAvailability]);

  const availableDatesSet = useMemo(() => {
    const s = new Set();
    for (const [dk, slots] of Object.entries(grouped)) {
      if (slots.some((sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime))) {
        s.add(dk);
      }
    }
    return s;
  }, [grouped]);

  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return (grouped[selectedDate] || []).filter(
      (sl) => !sl.isBooked && !isSlotPast(sl.date, sl.startTime)
    );
  }, [selectedDate, grouped]);

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    onSlotConfirmed(selectedSlot);
  };

  const initials =
    mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";

  return (
    <div className="booking-enter">
      {/* Back header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{ height: 36, padding: "0 14px", fontSize: 12 }}
          aria-label="Back to profile"
        >
          <ArrowLeft size={13} />
          Back
        </button>
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Book a Trial Session</h2>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-col lg:flex-row border border-gray-200 rounded-xl overflow-hidden">

        {/* ── LEFT: mentor card + mini calendar ── */}
        <div
          className="lg:w-[268px] xl:w-[290px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 flex flex-col gap-4"
          style={{ background: "#f9fafb" }}
        >
          {/* Mentor info */}
          <div className="pb-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden mb-2.5">
              {mentor.profilePhoto || mentor.profileImage ? (
                <img
                  src={mentor.profilePhoto || mentor.profileImage}
                  alt={mentor.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-sm font-black text-white"
                  style={{ background: PRIMARY }}
                >
                  {initials}
                </div>
              )}
            </div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">{mentor.fullName}</h3>
            {mentor.currentRole && (
              <p className="text-xs text-gray-500 mt-0.5">
                {mentor.currentRole}
                {mentor.companyName ? ` · ${mentor.companyName}` : ""}
              </p>
            )}
          </div>

          {/* Session meta */}
          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Video size={12} style={{ color: ACCENT }} />
              <span>Zoom link added after booking</span>
            </div>
          </div>

          {/* Mini calendar */}
          <MiniMonthCalendar
            availableDates={availableDatesSet}
            selectedDate={selectedDate}
            onSelectDate={(dk) => {
              setSelectedDate(dk);
              setSelectedSlot(null);
            }}
          />
        </div>

        {/* ── RIGHT: time slots ── */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          <div className="flex-1 p-4 sm:p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Select an appointment time</h3>

            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <Calendar size={32} className="text-gray-200 mb-3" />
                <p className="text-sm text-gray-400">
                  Select a date from the calendar to see available times
                </p>
              </div>
            ) : slotsForSelectedDate.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <Clock size={32} className="text-gray-200 mb-3" />
                <p className="text-sm text-gray-400">No available slots for this date</p>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-3 text-xs font-bold hover:underline"
                  style={{ color: ACCENT }}
                >
                  Choose another date
                </button>
              </div>
            ) : (
              <div className="fade-enter">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {slotsForSelectedDate.map((slot) => {
                    const chosen = selectedSlot?._id === slot._id;
                    return (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(chosen ? null : slot)}
                        className="slot-btn py-2.5 px-2 rounded-lg border text-xs font-bold transition-all duration-200"
                        style={{
                          background: chosen ? PRIMARY : WHITE,
                          color: chosen ? WHITE : ACCENT,
                          borderColor: chosen ? PRIMARY : ACCENT,
                        }}
                      >
                        {slot.startTime}
                      </button>
                    );
                  })}
                </div>

                {selectedSlot && (
                  <div className="fade-enter mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">
                        Selected:{" "}
                        <span className="font-bold" style={{ color: PRIMARY }}>
                          {selectedSlot.startTime}
                        </span>
                        {selectedSlot.endTime && (
                          <span className="text-gray-400"> – {selectedSlot.endTime}</span>
                        )}
                      </p>
                    </div>
                    <button onClick={handleConfirmBooking} className="btn btn-primary">
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

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [showBooking, setShowBooking] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSlotForModal, setSelectedSlotForModal] = useState(null);

  const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
  const [submitReview, { isLoading: submittingReview }] = useSubmitReviewMutation();
  const reviews = reviewsData?.reviews || [];

  const cookieData = Cookies.get("profileData");
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const currentStatus = userData?.profile?.currentStatus;

  const { data: apiResponse, isLoading, isError, error } =
    useFetchMentorByIdQuery({ mentorId, currentStatus });

  const mentor = apiResponse?.data?.mentorDetails || apiResponse?.data || apiResponse;
  const rawAvailability = mentor?.availability || [];

  const userData1 = JSON.parse(localStorage.getItem("userData")) || {};
  const userMenteeId = userData1?._id;

  useEffect(() => {
    if (isError && isAuthError(error)) navigate("/login", { replace: true });
  }, [isError, error, navigate]);

  useEffect(() => {
    if (showBooking) {
      setTimeout(() => {
        document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showBooking]);

  const handleSlotConfirmed = (slot) => {
    setSelectedSlotForModal(slot);
    setBookingOpen(true);
  };

  const handleBookingModalClose = () => {
    setBookingOpen(false);
    setSelectedSlotForModal(null);
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) return;
    try {
      await submitReview({
        mentorId,
        menteeId: userMenteeId,
        rating: reviewRating,
        comment: reviewText.trim(),
      }).unwrap();
      setReviewText("");
      setReviewRating(5);
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    } catch (err) {
      if (isAuthError(err)) navigate("/login", { replace: true });
      console.error(err);
    }
  };

  const goToPlans = () => navigate(`/mentor/${mentorId}/ltm-plans`);

  /* ── Loading / error guards ── */
  if (isLoading)
    return (
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  if (isError && isAuthError(error)) return null;
  if (isError || !mentor)
    return (
      <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 gap-4">
        <p className="text-red-500 text-sm text-center">Failed to load profile</p>
        <button onClick={() => navigate("/mentors")} className="btn btn-primary">
          ← Back to Mentors
        </button>
      </div>
    );

  /* ── Derived fields ── */
  const skills =
    mentor.currentSkills?.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
  const areas =
    mentor.areasOfInterest?.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) ?? [];
  const bioText = mentor.motivationStatement || mentor.bio || "";
  const bioLong = bioText.length > 400;
  const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 400) + "…";
  const initials =
    mentor.fullName?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "M";
  const joined = mentor.createdAt
    ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;

  const eduCareerItems = [
    mentor.currentRole && {
      label: "Current Role",
      value: `${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`,
      icon: <Briefcase size={13} style={{ color: ACCENT }} />,
    },
    mentor.highestDegree && {
      label: "Degree",
      value: `${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` · ${mentor.fieldOfStudy}` : ""}`,
      icon: <GraduationCap size={13} style={{ color: ACCENT }} />,
    },
    mentor.schoolName && {
      label: "Institution",
      value: mentor.schoolName,
      icon: <School size={13} style={{ color: ACCENT }} />,
    },
    mentor.yearsOfExperience && {
      label: "Experience",
      value: `${mentor.yearsOfExperience}+ years`,
      icon: <BadgeCheck size={13} style={{ color: ACCENT }} />,
    },
    joined && {
      label: "Member Since",
      value: joined,
      icon: <CalendarDays size={13} style={{ color: ACCENT }} />,
    },
  ].filter(Boolean);

  /* ══════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════ */
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
            <img src={logo} alt="Karrivo Logo" className="h-9 sm:h-10 w-auto object-contain" />
            <h1 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: PRIMARY }}>
              KARRIVO
            </h1>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/explore-mentors")}
              className="text-sm font-bold text-gray-700 hover:text-gray-900 transition"
            >
              Explore Mentors
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/login")} className="btn btn-secondary" style={{ height: 38, padding: "0 16px", fontSize: 12 }}>
              Login
            </button>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

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
      <div className="w-full bg-white min-h-[calc(100vh-57px)]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">

          {/* ══ MAIN CONTENT ══ */}
          <div className="flex-1 min-w-0 lg:overflow-y-auto hide-scrollbar bg-white">

            {/* Banner */}
            <div
              className="relative w-full py-8 sm:py-12 overflow-hidden"
              style={{ background: "#f0f4f8" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <p className="text-lg sm:text-2xl font-bold tracking-tight leading-tight" style={{ color: PRIMARY }}>
                  Connect with Expert Mentors
                </p>
                <p className="text-xs sm:text-sm mt-1.5 max-w-xl text-gray-500">
                  Personalized guidance for your career growth, learning, and success
                </p>
              </div>
            </div>

            {/* Content area */}
            <div className="px-4 sm:px-8 lg:px-10 pb-24 lg:pb-8">

              {/* ─── Profile Header ─── */}
              <div className="relative -mt-10 sm:mt-0 pt-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div className="flex flex-row items-center gap-3 sm:gap-4">
                    {/* Avatar */}
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white bg-gray-100 overflow-hidden flex-shrink-0"
                      style={{ borderColor: WHITE }}
                    >
                      {mentor.profilePhoto || mentor.profileImage ? (
                        <img
                          src={mentor.profilePhoto || mentor.profileImage}
                          alt={mentor.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-2xl font-black text-white"
                          style={{ background: PRIMARY }}
                        >
                          {initials}
                        </div>
                      )}
                    </div>

                    {/* Name + meta */}
                    <div className="min-w-0 flex-1">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight truncate">
                        {mentor.fullName}
                      </h1>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        {mentor.yearsOfExperience && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Briefcase size={11} style={{ color: ACCENT }} />
                            <span>{mentor.yearsOfExperience}+ yrs</span>
                          </div>
                        )}
                        {mentor.companyName && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 min-w-0">
                            <Building2 size={11} style={{ color: ACCENT }} />
                            <span className="truncate">{mentor.companyName}</span>
                          </div>
                        )}
                        {mentor.schoolName && (
                          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-600 min-w-0">
                            <GraduationCap size={11} style={{ color: ACCENT }} />
                            <span className="truncate">{mentor.schoolName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Action buttons ── */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={goToPlans} className="btn btn-secondary">
                      View Pricing
                    </button>
                    <button
                      onClick={() => setShowBooking(true)}
                      className="btn btn-primary"
                    >
                      <Calendar size={13} />
                      Book Trial
                    </button>
                  </div>
                </div>
              </div>

              {/* ═══ INLINE BOOKING SECTION ═══ */}
              {showBooking && (
                <div id="booking-section" className="mt-6">
                  <InlineBookingSection
                    mentor={mentor}
                    rawAvailability={rawAvailability}
                    onClose={() => setShowBooking(false)}
                    onSlotConfirmed={handleSlotConfirmed}
                  />
                </div>
              )}

              {/* ═══ PROFILE DETAILS ═══ */}
              <div className="mt-6">

                {/* ─── About ─── */}
                <div className="py-5 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">About</h2>
                  <div className="max-w-3xl">
                    <p className="text-sm leading-7 text-gray-600 whitespace-pre-line">{bio}</p>
                    {bioLong && (
                      <button
                        onClick={() => setShowFullBio(!showFullBio)}
                        className="mt-2 text-xs font-bold hover:underline"
                        style={{ color: ACCENT }}
                      >
                        {showFullBio ? "read less" : "read more"}
                      </button>
                    )}
                  </div>

                  {(mentor.location || mentor.languages?.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mentor.location && (
                        <div>
                          <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                            Location
                          </p>
                          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{mentor.location}</span>
                          </div>
                        </div>
                      )}
                      {mentor.languages?.length > 0 && (
                        <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                          <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                            Languages
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {mentor.languages.map((lang, i) => (
                              <div
                                key={i}
                                className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-xs text-gray-700 font-medium"
                              >
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
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                    Education & Career
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {eduCareerItems.map(({ label, value, icon }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "#eff9fd" }}
                        >
                          {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">
                            {label}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-snug break-words">
                            {value}
                          </p>
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
                          className="btn btn-ghost"
                          style={{ height: 36, padding: "0 14px", fontSize: 12 }}
                        >
                          <Linkedin size={12} />
                          LinkedIn
                          <ExternalLink size={10} />
                        </a>
                      )}
                      {mentor.resumeLink && (
                        <a
                          href={mentor.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost"
                          style={{ height: 36, padding: "0 14px", fontSize: 12 }}
                        >
                          <FileText size={12} />
                          Portfolio
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* ─── Technical Skills ─── */}
                {skills.length > 0 && (
                  <div className="py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {skills.map((skill) => (
                        <SkillChip key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── Areas of Interest ─── */}
                {areas.length > 0 && (
                  <div className="py-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                      Areas of Interest
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {areas.map((area) => (
                        <SkillChip key={area} skill={area} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── Reviews ─── */}
                <div className="py-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                    Reviews & Comments
                  </h3>
                  <div className="space-y-4">
                    {reviews?.length > 0 ? (
                      reviews.map((review, index) => (
                        <div key={review._id || index} className="border-b border-gray-100 pb-4">
                          <p className="text-sm leading-7 text-gray-600 mb-3">
                            {review.review || review.comment}
                          </p>
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2.5">
                              {review.user?.profileImage ? (
                                <img
                                  src={review.user.profileImage}
                                  alt={review.user?.name}
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                              ) : (
                                <div
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                                  style={{ background: PRIMARY }}
                                >
                                  {(review.user?.name || "U")
                                    .split(" ").map((w) => w[0]).slice(0, 2).join("")}
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
                      <p className="text-sm text-gray-500">
                        No reviews yet. Be the first to leave one!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT SIDEBAR — desktop only ══ */}


          <div
            className="hidden lg:flex flex-col w-[260px] xl:w-[300px] flex-shrink-0 border-l border-gray-200 bg-white sticky top-[57px] h-[calc(100vh-57px)]"
            style={{ fontFamily: "Cambria, serif" }}
          >
            <div className="flex flex-col p-5 gap-2 h-full">

              {/* Top CTA */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Ready to get started?
                </h3>

                <button
                  onClick={goToPlans}
                  className="btn btn-primary btn-full"
                >
                  View Plans
                </button>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Benefits */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Mentorship Benefits
                </p>

                {/* Two options per row */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Calendar size={13} />, text: "1:1 Sessions" },
                    { icon: <Award size={13} />, text: "Career Guidance" },
                    { icon: <FileText size={13} />, text: "Resume Review" },
                    { icon: <BadgeCheck size={13} />, text: "Certificate" },
                    { icon: <Users size={13} />, text: "Community Access" },
                    { icon: <BookOpen size={13} />, text: "Study Material" },
                    { icon: <Briefcase size={13} />, text: "Job Support" },
                    { icon: <MessageCircle size={13} />, text: "Doubt Clearing" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-lg p-2 bg-[#0098cc]/10 border border-[#0098cc]/20"
                    >
                      <span
                        style={{ color: "#0098cc" }}
                        className="flex-shrink-0"
                      >
                        {item.icon}
                      </span>

                      <span className="text-xs font-medium text-gray-700 leading-tight">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-auto">
                <div
                  className="rounded-xl p-4 text-white"
                  style={{
                    background: PRIMARY,
                    fontFamily: "Cambria, serif",
                  }}
                >
                  <p className="text-xs font-bold mb-1 opacity-80">
                    Free Trial Available
                  </p>

                  <p className="text-sm font-bold leading-snug mb-3">
                    Book a session and start your journey today
                  </p>

                  <button
                    onClick={() => setShowBooking(true)}
                    className="btn btn-full"
                    style={{
                      background: "#0098cc",
                      color: WHITE,
                      borderColor: "#0098cc",
                      height: 38,
                      fontSize: 12,
                      fontFamily: "Cambria, serif",
                    }}
                  >
                    <Calendar size={12} />
                    Book Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Sticky bottom CTA — mobile/tablet only ══ */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
        <button onClick={goToPlans} className="btn btn-secondary flex-1" style={{ height: 44 }}>
          View Plans
        </button>
        <button
          onClick={() => setShowBooking(true)}
          className="btn btn-primary flex-1"
          style={{ height: 44 }}
        >
          <Calendar size={14} />
          Book Trial
        </button>
      </div>

      {/* ══ BOOKING MODAL ══ */}
      {mentor && (
        <BookingModal
          mentor={mentor}
          isOpen={bookingOpen}
          onClose={handleBookingModalClose}
          selectedSlot={selectedSlotForModal}
          appliedCoupon={null}
          availableCoupons={[]}
        />
      )}
    </>
  );
};

export default ProfileModal;

