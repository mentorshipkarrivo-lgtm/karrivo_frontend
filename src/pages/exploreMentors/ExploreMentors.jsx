
// import { useState, useEffect } from "react";
// import {
//     MapPin, X, ChevronDown, ChevronUp, CheckCircle,
//     Search, Pencil, Briefcase, Target,
//     SlidersHorizontal, Star, Trophy,
//     Users, BookOpen, Video,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import KarrivoLogo from "../../assets/KarrivoLogo.png";
// import {
//     useGetLtmAllMentorsQuery,
//     useSearchMentorMutation,
//     useAdvancedFilterMentorsMutation,
// } from "./exploreMentorsapislice";

// // ── Google Font ────────────────────────────────────────────────────────────
// const _link = document.createElement("link");
// _link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
// _link.rel = "stylesheet";
// document.head.appendChild(_link);

// // ── Design tokens ──────────────────────────────────────────────────────────
// const BLUE = "#0098cc";
// const BLUE_LIGHT = "#f0faff";
// const BLUE_BORDER = "#cce9f5";
// const PRIMARY = "#1a1a2e";
// const FONT = "'DM Sans', sans-serif";

// // ── Static data ────────────────────────────────────────────────────────────
// const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// const PLANS = [
//     { key: "1Month", label: "1 Mo" },
//     { key: "3Month", label: "3 Mo" },
//     { key: "6Month", label: "6 Mo" },
// ];

// const PLAN_ALIASES = {
//     "1Month": ["1Month", "oneMonth", "1month", "one_month", "onemonth"],
//     "3Month": ["3Month", "threeMonths", "3month", "three_months", "threemonths", "3Months"],
//     "6Month": ["6Month", "sixMonths", "6month", "six_months", "sixmonths", "6Months"],
// };

// const DOMAIN_CHIPS = [
//     "Frontend", "Backend", "Fullstack",
//     "DevOps / SRE / Cloud", "QA / Automation Testing",
//     "Data Scientist / AI/ML", "Data Analyst",
// ];

// const NAV_LINKS = [{ label: "Explore Mentors", path: "/explore-mentors" }];

// // ── Helpers ────────────────────────────────────────────────────────────────
// const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

// function getPlanData(pricing, planKey) {
//     if (!pricing?.plans) return null;
//     const plans = pricing.plans;
//     const aliases = PLAN_ALIASES[planKey] || [planKey];
//     for (const alias of aliases) {
//         if (plans[alias] != null) {
//             const p = plans[alias];
//             if (p.totalPrice === 0 && p.totalSessions === 0) return null;
//             return p;
//         }
//     }
//     const norm = (s) => s.toLowerCase().replace(/[^0-9a-z]/g, "");
//     const found = Object.keys(plans).find((k) => norm(k) === norm(planKey));
//     if (found) {
//         const p = plans[found];
//         if (p.totalPrice === 0 && p.totalSessions === 0) return null;
//         return p;
//     }
//     return null;
// }

// function toTitleCase(str) {
//     if (!str) return str;
//     return str.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
// }

// function useWindowWidth() {
//     const [w, setW] = useState(
//         typeof window !== "undefined" ? window.innerWidth : 1200
//     );
//     useEffect(() => {
//         const h = () => setW(window.innerWidth);
//         window.addEventListener("resize", h);
//         return () => window.removeEventListener("resize", h);
//     }, []);
//     return w;
// }

// // ── SubscribePanel ─────────────────────────────────────────────────────────
// function SubscribePanel({ mentor, onClose }) {
//     const width = useWindowWidth();
//     const isMobile = width < 640;

//     const availability = Array.isArray(mentor.availability) ? mentor.availability : [];
//     const [selected, setSelected] = useState({});
//     const [openDay, setOpenDay] = useState(null);
//     const [planKey, setPlanKey] = useState("1Month");

//     const toggleSlot = (di, si) =>
//         setSelected((p) => ({ ...p, [`${di}_${si}`]: !p[`${di}_${si}`] }));

//     const selectedCount = Object.values(selected).filter(Boolean).length;
//     const planData = getPlanData(mentor.pricing, planKey);
//     const totalSessions = planData?.totalSessions ?? 0;
//     const totalPrice = planData?.totalPrice ?? 0;

//     const panelStyle = isMobile
//         ? {
//             position: "fixed", bottom: 0, left: 0, right: 0, height: "85vh", background: "white", zIndex: 300,
//             boxShadow: "0 -4px 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column",
//             fontFamily: FONT, borderRadius: "20px 20px 0 0"
//         }
//         : {
//             position: "fixed", top: 0, right: 0, bottom: 0, width: "420px", background: "white", zIndex: 300,
//             boxShadow: "-4px 0 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT
//         };

//     const motionProps = isMobile
//         ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
//         : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

//     return (
//         <motion.div {...motionProps}
//             transition={{ type: "spring", damping: 28, stiffness: 300 }}
//             style={panelStyle}
//         >
//             {isMobile && (
//                 <div style={{
//                     width: "36px", height: "4px", background: "#e5e7eb",
//                     borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0
//                 }} />
//             )}
//             <div style={{
//                 background: "white", borderBottom: `3px solid ${BLUE}`,
//                 padding: "20px 24px", flexShrink: 0
//             }}>
//                 <div style={{
//                     display: "flex", alignItems: "center",
//                     justifyContent: "space-between", marginBottom: "4px"
//                 }}>
//                     <h2 style={{ color: BLUE, fontWeight: 800, fontSize: "17px", margin: 0 }}>
//                         Book A Free Trial
//                     </h2>
//                     <button onClick={onClose}
//                         style={{
//                             background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, color: BLUE,
//                             borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer",
//                             display: "flex", alignItems: "center", justifyContent: "center"
//                         }}>
//                         <X size={16} />
//                     </button>
//                 </div>
//                 <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
//                     {toTitleCase(mentor.fullName)} ·{" "}
//                     <span style={{ color: BLUE, fontWeight: 700 }}>
//                         {fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session
//                     </span>
//                 </p>
//             </div>

//             <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
//                 {/* Plan selector */}
//                 <p style={{
//                     fontSize: "11px", fontWeight: 700, color: BLUE,
//                     textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px"
//                 }}>
//                     Select Plan
//                 </p>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
//                     {PLANS.map((p) => {
//                         const sel = planKey === p.key;
//                         const pData = getPlanData(mentor.pricing, p.key);
//                         const price = pData?.totalPrice ?? 0;
//                         const sessions = mentor.pricing?.weeklySessions ?? 0;
//                         const disabled = !pData;
//                         return (
//                             <div key={p.key}
//                                 onClick={() => !disabled && setPlanKey(p.key)}
//                                 style={{
//                                     border: `1.5px solid ${sel ? BLUE : disabled ? "#f3f4f6" : "#e5e7eb"}`,
//                                     borderRadius: "12px", padding: "14px 16px",
//                                     background: disabled ? "#f9fafb" : "white",
//                                     cursor: disabled ? "not-allowed" : "pointer",
//                                     display: "flex", alignItems: "center", gap: "12px",
//                                     boxShadow: sel ? `0 0 0 3px ${BLUE_LIGHT}` : "none",
//                                     opacity: disabled ? 0.6 : 1
//                                 }}>
//                                 <div style={{
//                                     width: "18px", height: "18px", borderRadius: "50%",
//                                     border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: "white",
//                                     display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
//                                 }}>
//                                     {sel && <div style={{
//                                         width: "8px", height: "8px",
//                                         borderRadius: "50%", background: BLUE
//                                     }} />}
//                                 </div>
//                                 <div style={{ flex: 1 }}>
//                                     <p style={{
//                                         fontWeight: 700, fontSize: "13px",
//                                         color: sel ? BLUE : "#111827", margin: "0 0 2px"
//                                     }}>{p.label}</p>
//                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
//                                         {disabled ? "No plans available" : `${sessions} sessions/week`}
//                                     </p>
//                                 </div>
//                                 <p style={{
//                                     fontWeight: 700, fontSize: "15px",
//                                     color: sel ? BLUE : "#374151", margin: 0
//                                 }}>
//                                     {disabled ? "N/A" : fmtINR(price)}
//                                 </p>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Availability */}
//                 <p style={{
//                     fontSize: "11px", fontWeight: 700, color: BLUE,
//                     textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px"
//                 }}>
//                     Select Availability
//                 </p>
//                 {availability.length > 0 ? (
//                     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                         {DAY_ORDER.map((day, di) => {
//                             const dayData = availability.find((d) => d.day === day);
//                             if (!dayData) return null;
//                             const slots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
//                             const isOpen = openDay === day;
//                             const selInDay = slots.filter((_, si) => selected[`${di}_${si}`]).length;
//                             return (
//                                 <div key={day}
//                                     style={{
//                                         border: `1.5px solid ${selInDay ? BLUE : "#e5e7eb"}`,
//                                         borderRadius: "12px", overflow: "hidden", background: "white"
//                                     }}>
//                                     <button
//                                         onClick={() => setOpenDay(isOpen ? null : day)}
//                                         style={{
//                                             width: "100%", display: "flex", alignItems: "center",
//                                             justifyContent: "space-between", padding: "12px 14px",
//                                             background: "transparent", border: "none", cursor: "pointer",
//                                             fontFamily: FONT
//                                         }}>
//                                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                                             <span style={{
//                                                 fontWeight: 600, fontSize: "13px",
//                                                 color: selInDay ? BLUE : "#374151"
//                                             }}>{day}</span>
//                                             {selInDay > 0 && (
//                                                 <span style={{
//                                                     background: BLUE, color: "white",
//                                                     borderRadius: "20px", padding: "1px 8px",
//                                                     fontSize: "10px", fontWeight: 700
//                                                 }}>
//                                                     {selInDay} selected
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                                             <span style={{ fontSize: "11px", color: "#9ca3af" }}>
//                                                 {slots.length} slot{slots.length !== 1 ? "s" : ""}
//                                             </span>
//                                             {isOpen
//                                                 ? <ChevronUp size={14} color="#9ca3af" />
//                                                 : <ChevronDown size={14} color="#9ca3af" />}
//                                         </div>
//                                     </button>
//                                     <AnimatePresence>
//                                         {isOpen && (
//                                             <motion.div
//                                                 initial={{ height: 0, opacity: 0 }}
//                                                 animate={{ height: "auto", opacity: 1 }}
//                                                 exit={{ height: 0, opacity: 0 }}
//                                                 transition={{ duration: .18 }}
//                                                 style={{ overflow: "hidden" }}>
//                                                 <div style={{
//                                                     padding: "0 14px 12px",
//                                                     display: "flex", flexDirection: "column", gap: "6px"
//                                                 }}>
//                                                     {slots.map((slot, si) => {
//                                                         const k = `${di}_${si}`;
//                                                         const isSel = !!selected[k];
//                                                         return (
//                                                             <button key={slot._id}
//                                                                 onClick={() => toggleSlot(di, si)}
//                                                                 style={{
//                                                                     display: "flex", alignItems: "center",
//                                                                     justifyContent: "space-between",
//                                                                     padding: "8px 12px", borderRadius: "8px",
//                                                                     border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`,
//                                                                     background: "white", cursor: "pointer",
//                                                                     fontFamily: FONT
//                                                                 }}>
//                                                                 <span style={{
//                                                                     fontSize: "12px", fontWeight: 600,
//                                                                     color: isSel ? BLUE : "#374151"
//                                                                 }}>
//                                                                     {slot.startTime} – {slot.endTime}
//                                                                 </span>
//                                                                 {isSel
//                                                                     ? <CheckCircle size={15} color={BLUE} />
//                                                                     : <div style={{
//                                                                         width: "15px", height: "15px",
//                                                                         borderRadius: "50%",
//                                                                         border: "1.5px solid #d1d5db"
//                                                                     }} />}
//                                                             </button>
//                                                         );
//                                                     })}
//                                                 </div>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <div style={{
//                         textAlign: "center", padding: "20px",
//                         background: "#fafafa", borderRadius: "10px",
//                         border: "1px dashed #e5e7eb"
//                     }}>
//                         <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
//                             No Availability Slots Set Yet
//                         </p>
//                     </div>
//                 )}
//             </div>

//             {/* Footer */}
//             <div style={{
//                 borderTop: "1px solid #f0f0f0", padding: "16px 24px",
//                 background: "white", flexShrink: 0
//             }}>
//                 <div style={{ marginBottom: "12px" }}>
//                     <p style={{
//                         fontSize: "11px", color: "#9ca3af", margin: "0 0 2px",
//                         fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em"
//                     }}>
//                         Total For {PLANS.find((p) => p.key === planKey)?.label}
//                     </p>
//                     <p style={{ fontSize: "26px", fontWeight: 800, color: BLUE, margin: 0 }}>
//                         {totalPrice > 0 ? fmtINR(totalPrice) : "N/A"}
//                     </p>
//                     {totalSessions > 0 && (
//                         <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
//                             {totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week
//                         </p>
//                     )}
//                 </div>
//                 <button
//                     disabled={totalPrice === 0}
//                     style={{
//                         width: "100%", padding: "13px",
//                         background: totalPrice === 0 ? "#d1d5db" : PRIMARY,
//                         cursor: totalPrice === 0 ? "not-allowed" : "pointer",
//                         color: "white", border: "none", borderRadius: "10px",
//                         fontWeight: 700, fontSize: "14px", fontFamily: FONT
//                     }}>
//                     {totalPrice === 0 ? "Plan Not Available" : `Subscribe — ${fmtINR(totalPrice)}`}
//                 </button>
//                 <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "11px", marginTop: "8px" }}>
//                     Secure Checkout · Cancel Anytime · 7-Day Refund Policy
//                 </p>
//             </div>
//         </motion.div>
//     );
// }

// // ── MentorCard ─────────────────────────────────────────────────────────────
// function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
//     const width = useWindowWidth();
//     const isMobile = width < 768;
//     const [bioExpanded, setBioExpanded] = useState(false);

//     const fullName = toTitleCase(mentor.fullName || "Mentor");
//     const currentRole = toTitleCase(mentor.currentRole || "");
//     const companyName = toTitleCase(mentor.companyName || "");
//     const locationText = toTitleCase(mentor.location || "");
//     const languages = Array.isArray(mentor.languages)
//         ? mentor.languages.join(", ")
//         : mentor.languages || "";

//     const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";

//     const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
//         .split(",").map((s) => s.trim()).filter(Boolean);

//     const monthlyPrice = mentor.hourlyRate ?? 0;
//     const nextAvailable = mentor.nextAvailable ?? "";
//     const placements = mentor.placements ?? 0;
//     const menteeCount = mentor.menteeCount ?? 0;
//     const yearsExp = mentor.yearsOfExperience
//         ? `${mentor.yearsOfExperience}+ Years of Exp.`
//         : "0+ Years of Exp.";
//     const starBadge = mentor.starMentorBadge || mentor.badge || "";
//     const referralCount = mentor.referralCount ?? 0;
//     const hasCurriculum = mentor.hasCurriculum ?? false;
//     const weeklySessions = mentor.pricing?.weeklySessions ?? 4;

//     const offeringForList = Array.isArray(mentor.offeringFor)
//         ? mentor.offeringFor
//         : mentor.offeringFor
//             ? String(mentor.offeringFor).split(",").map((s) => s.trim())
//             : [];

//     const domainsList = Array.isArray(mentor.domains)
//         ? mentor.domains
//         : mentor.domains
//             ? String(mentor.domains).split(",").map((s) => s.trim())
//             : [];

//     const prevCompanies = Array.isArray(mentor.previousCompanies)
//         ? mentor.previousCompanies
//         : [];

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.25, delay: index * 0.03 }}
//             style={{
//                 width: "100%",
//                 border: "1px solid #e5e7eb",
//                 background: "#fff",
//                 display: "flex",
//                 flexDirection: isMobile ? "column" : "row",
//                 overflow: "hidden",
//                 marginBottom: "16px",
//                 fontFamily: FONT,
//                 borderRadius: "4px",
//             }}
//         >
//             {/* LEFT: Photo */}
//             <div style={{
//                 position: "relative",
//                 width: isMobile ? "100%" : "180px",
//                 minWidth: isMobile ? "100%" : "180px",
//                 height: isMobile ? "220px" : "auto",
//                 background: "#f3f4f6",
//                 overflow: "hidden",
//                 flexShrink: 0,
//             }}>
//                 <span style={{
//                     position: "absolute", top: "8px", left: "8px",
//                     fontSize: "12px", color: "#94a3b8", userSelect: "none"
//                 }}>✦</span>
//                 <span style={{
//                     position: "absolute", top: "8px", right: "8px",
//                     fontSize: "9px", color: "#94a3b8", userSelect: "none"
//                 }}>✦</span>
//                 <span style={{
//                     position: "absolute", bottom: "52px", left: "6px",
//                     fontSize: "8px", color: "#94a3b8", userSelect: "none"
//                 }}>✦</span>
//                 <span style={{
//                     position: "absolute", bottom: "52px", right: "6px",
//                     fontSize: "10px", color: "#94a3b8", userSelect: "none"
//                 }}>✦</span>
//                 <img
//                     src={mentor.profilePhoto}
//                     alt={fullName}
//                     style={{
//                         width: "100%", height: "100%", objectFit: "cover",
//                         objectPosition: "top center", display: "block",
//                         minHeight: isMobile ? "220px" : "220px"
//                     }}
//                 />
//             </div>

//             {/* CENTRE: Info */}
//             <div style={{
//                 flex: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 borderRight: isMobile ? "none" : "1px solid #e5e7eb",
//                 minWidth: 0,
//             }}>
//                 <div style={{
//                     padding: "16px 18px", display: "flex",
//                     flexDirection: "column", gap: "10px", flex: 1
//                 }}>

//                     <h2 style={{
//                         margin: 0, fontSize: "22px", fontWeight: 700,
//                         color: "#111827", lineHeight: 1.2
//                     }}>
//                         {fullName}
//                     </h2>

//                     <div style={{
//                         display: "flex", alignItems: "center", gap: "14px",
//                         flexWrap: "wrap", fontSize: "13px", color: "#6b7280"
//                     }}>
//                         <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <MapPin size={13} color="#6b7280" />{locationText}
//                         </span>
//                         <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <Pencil size={12} color="#6b7280" />{languages}
//                         </span>
//                     </div>

//                     <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6" }}>
//                         {bioExpanded ? bio : bio.slice(0, 160) + (bio.length > 160 ? "..." : "")}
//                         {bio.length > 160 && (
//                             <span onClick={() => setBioExpanded(!bioExpanded)}
//                                 style={{
//                                     color: "#2563eb", marginLeft: "6px",
//                                     cursor: "pointer", fontWeight: 600
//                                 }}>
//                                 {bioExpanded ? "Show Less" : "Read More"}
//                             </span>
//                         )}
//                     </div>

//                     {/* Skill chips */}
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                         {areas.slice(0, 7).map((skill, i) => (
//                             <div key={i} style={{
//                                 border: "1px solid #d1d5db",
//                                 padding: "4px 10px", fontSize: "12px", color: "#374151",
//                                 background: "#fff", borderRadius: "4px"
//                             }}>
//                                 {toTitleCase(skill)}
//                             </div>
//                         ))}
//                         {areas.length > 7 && (
//                             <div style={{
//                                 border: "1px solid #d1d5db",
//                                 padding: "4px 10px", fontSize: "12px", color: "#2563eb",
//                                 background: "#fff", borderRadius: "4px", fontWeight: 600
//                             }}>
//                                 +{areas.length - 7} More
//                             </div>
//                         )}
//                     </div>

//                     {/* Experience row */}
//                     <div style={{
//                         display: "flex", flexDirection: "row",
//                         gap: "10px", flexWrap: "wrap"
//                     }}>
//                         <div style={{
//                             border: "1px solid #e5e7eb", padding: "10px 14px",
//                             display: "flex", alignItems: "center", gap: "10px",
//                             borderRadius: "6px", minWidth: "200px"
//                         }}>
//                             <div style={{
//                                 width: "36px", height: "36px", borderRadius: "50%",
//                                 background: "#1d4ed8", color: "#fff", display: "flex",
//                                 alignItems: "center", justifyContent: "center",
//                                 fontWeight: 800, fontSize: "13px", flexShrink: 0
//                             }}>
//                                 {fullName.charAt(0)}.
//                             </div>
//                             <div>
//                                 <div style={{
//                                     fontSize: "13px", fontWeight: 700,
//                                     color: "#111827"
//                                 }}>{currentRole}</div>
//                                 <div style={{ fontSize: "11px", color: "#6b7280" }}>
//                                     {companyName}
//                                 </div>
//                             </div>
//                         </div>

//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                             <div style={{ display: "flex", alignItems: "center" }}>
//                                 {prevCompanies.slice(0, 3).map((c, i) => (
//                                     <div key={i} style={{
//                                         width: "28px", height: "28px",
//                                         borderRadius: "50%", border: "2px solid white",
//                                         background: "#e5e7eb", overflow: "hidden",
//                                         marginLeft: i > 0 ? "-8px" : "0",
//                                         zIndex: 3 - i, position: "relative", flexShrink: 0
//                                     }}>
//                                         {c.logo ? (
//                                             <img src={c.logo} alt={c.name}
//                                                 style={{
//                                                     width: "100%", height: "100%",
//                                                     objectFit: "cover"
//                                                 }} />
//                                         ) : (
//                                             <div style={{
//                                                 width: "100%", height: "100%",
//                                                 display: "flex", alignItems: "center",
//                                                 justifyContent: "center", fontSize: "10px",
//                                                 fontWeight: 700, color: "#374151",
//                                                 background: ["#fef3c7", "#dbeafe", "#d1fae5"][i % 3]
//                                             }}>
//                                                 {c.name?.charAt(0) || "C"}
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                                 {prevCompanies.length === 0 && mentor.companyLogo && (
//                                     <div style={{
//                                         width: "28px", height: "28px",
//                                         borderRadius: "50%", border: "2px solid white",
//                                         overflow: "hidden"
//                                     }}>
//                                         <img src={mentor.companyLogo} alt={companyName}
//                                             style={{
//                                                 width: "100%", height: "100%",
//                                                 objectFit: "cover"
//                                             }} />
//                                     </div>
//                                 )}
//                             </div>
//                             <div>
//                                 <div style={{
//                                     fontSize: "13px", fontWeight: 700,
//                                     color: "#111827"
//                                 }}>{yearsExp}</div>
//                                 <div style={{ fontSize: "11px", color: "#6b7280" }}>
//                                     {prevCompanies.length > 0
//                                         ? prevCompanies.map((c) => c.name).join(" | ")
//                                         : companyName}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom bar */}
//                 <div style={{
//                     borderTop: "1px solid #f3f4f6", padding: "10px 18px",
//                     display: "flex", alignItems: "center", gap: "20px",
//                     flexWrap: "wrap", background: "#fafafa"
//                 }}>
//                     {offeringForList.length > 0 && (
//                         <div style={{
//                             display: "flex", alignItems: "center", gap: "5px",
//                             fontSize: "12px", color: "#374151"
//                         }}>
//                             <Briefcase size={13} color="#6b7280" />
//                             <span style={{ color: "#6b7280" }}>For:</span>
//                             <span style={{ fontWeight: 600 }}>{offeringForList.join(" | ")}</span>
//                         </div>
//                     )}
//                     {domainsList.length > 0 && (
//                         <div style={{
//                             display: "flex", alignItems: "center", gap: "5px",
//                             fontSize: "12px", color: "#374151"
//                         }}>
//                             <Target size={13} color="#6b7280" />
//                             <span style={{ color: "#6b7280" }}>Domains:</span>
//                             <span style={{ fontWeight: 600 }}>{domainsList[0]}</span>
//                             {domainsList.length > 1 && (
//                                 <span style={{
//                                     color: "#2563eb", fontWeight: 600,
//                                     cursor: "pointer"
//                                 }}>| More</span>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* RIGHT: Stats + CTA */}
//             <div style={{
//                 width: isMobile ? "100%" : "270px",
//                 minWidth: isMobile ? "100%" : "270px",
//                 padding: "16px 18px",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//                 background: "#ffffff",
//                 flexShrink: 0,
//             }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
//                     <Star size={16} color="#f59e0b" fill="#f59e0b" style={{ flexShrink: 0 }} />
//                     <span style={{ fontWeight: 700, color: "#111827" }}>Star Mentor</span>
//                     {starBadge && (
//                         <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 400 }}>
//                             - {starBadge}
//                         </span>
//                     )}
//                 </div>

//                 <div style={{
//                     display: "flex", alignItems: "center", gap: "8px",
//                     fontSize: "13px", color: "#374151"
//                 }}>
//                     <Trophy size={15} color="#d97706" style={{ flexShrink: 0 }} />
//                     <span>{placements} Placements</span>
//                 </div>

//                 <div style={{
//                     display: "flex", alignItems: "center", gap: "8px",
//                     fontSize: "13px", color: "#374151"
//                 }}>
//                     <Users size={15} color="#0ea5e9" style={{ flexShrink: 0 }} />
//                     <span>5.0 ({menteeCount}+ mentees)</span>
//                 </div>

//                 <div style={{
//                     display: "flex", alignItems: "center", gap: "8px",
//                     fontSize: "13px", color: "#374151"
//                 }}>
//                     <Video size={15} color="#10b981" style={{ flexShrink: 0 }} />
//                     <span>{weeklySessions * 4}x Sessions Per Month</span>
//                 </div>

//                 <div style={{
//                     display: "flex", alignItems: "center", gap: "8px",
//                     fontSize: "13px", color: "#374151"
//                 }}>
//                     <Briefcase size={15} color="#8b5cf6" style={{ flexShrink: 0 }} />
//                     <span>Referrals in Top Companies</span>
//                     {referralCount > 0 && (
//                         <span style={{
//                             color: "#2563eb", fontWeight: 600,
//                             fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap"
//                         }}>
//                             +{referralCount} More
//                         </span>
//                     )}
//                 </div>

//                 {hasCurriculum && (
//                     <div style={{
//                         display: "flex", alignItems: "center",
//                         justifyContent: "space-between", fontSize: "13px", color: "#374151"
//                     }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                             <BookOpen size={15} color="#6b7280" style={{ flexShrink: 0 }} />
//                             <span>Detailed Curriculum Available</span>
//                         </div>
//                         <span style={{
//                             color: "#2563eb", fontWeight: 600,
//                             fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap"
//                         }}>
//                             View ↗
//                         </span>
//                     </div>
//                 )}

//                 <div style={{ borderTop: "1px solid #f3f4f6", margin: "2px 0" }} />

//                 <div>
//                     <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "2px" }}>
//                         Starting from
//                     </div>
//                     <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
//                         <span style={{
//                             fontSize: "28px", fontWeight: 800,
//                             color: "#111827", lineHeight: 1
//                         }}>
//                             {fmtINR(monthlyPrice)}
//                         </span>
//                         <span style={{ fontSize: "12px", color: "#6b7280", marginBottom: "3px" }}>
//                             /Session
//                         </span>
//                     </div>
//                 </div>

//                 <button
//                     onClick={() => onViewProfile(mentor)}
//                     style={{
//                         width: "100%", height: "42px", border: "1px solid #d1d5db",
//                         borderRadius: "8px", background: "#ffffff", color: "#111827",
//                         fontSize: "14px", fontWeight: 600, cursor: "pointer",
//                         fontFamily: FONT, transition: "background 0.2s"
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
//                     onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
//                 >
//                     View Profile
//                 </button>

//                 {nextAvailable && (
//                     <p style={{
//                         textAlign: "center", fontSize: "11px",
//                         color: "#9ca3af", margin: 0
//                     }}>
//                         Next Available:{" "}
//                         <span style={{ color: "#374151", fontWeight: 600 }}>
//                             {nextAvailable}
//                         </span>
//                     </p>
//                 )}
//             </div>
//         </motion.div>
//     );
// }

// // ── FilterSidebar ──────────────────────────────────────────────────────────
// function FilterSidebar({ onSearch, isSearching, onClear, isOpen, onClose }) {
//     const width = useWindowWidth();
//     const isMobile = width < 1024;

//     const [selectedDomains, setSelectedDomains] = useState([]);
//     const [offeringFor, setOfferingFor] = useState("Working Professionals");
//     const [priceVal, setPriceVal] = useState(7000);

//     const toggleDomain = (d) =>
//         setSelectedDomains((prev) =>
//             prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
//         );

//     const handleClear = () => { setSelectedDomains([]); setPriceVal(7000); onClear(); };

//     const sidebarContent = (
//         <div style={{
//             width: isMobile ? "100%" : "240px",
//             background: "white",
//             borderRadius: isMobile ? 0 : "14px",
//             padding: "18px",
//             fontFamily: FONT,
//             boxSizing: "border-box",
//             ...(!isMobile && {
//                 border: "1px solid #e5e7eb",
//                 alignSelf: "flex-start",
//                 position: "sticky",
//                 top: "80px",
//                 flexShrink: 0,
//                 boxShadow: "0 1px 8px rgba(0,0,0,.06)",
//             }),
//         }}>
//             <div style={{
//                 display: "flex", alignItems: "center",
//                 justifyContent: "space-between", marginBottom: "16px"
//             }}>
//                 <h3 style={{
//                     fontWeight: 700, fontSize: "14px",
//                     color: "#0f172a", margin: 0
//                 }}>Filter By</h3>
//                 <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//                     <button onClick={handleClear}
//                         style={{
//                             background: "none", border: "none", color: "#ef4444",
//                             fontSize: "12px", fontWeight: 600, cursor: "pointer",
//                             fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px"
//                         }}>
//                         <X size={11} /> Clear
//                     </button>
//                     {isMobile && (
//                         <button onClick={onClose}
//                             style={{
//                                 background: "none", border: "none",
//                                 cursor: "pointer", color: "#6b7280", display: "flex"
//                             }}>
//                             <X size={18} />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             <p style={{
//                 fontWeight: 700, fontSize: "11px", color: BLUE,
//                 textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px"
//             }}>
//                 Domain
//             </p>
//             {selectedDomains.length > 0 && (
//                 <div style={{
//                     display: "flex", flexWrap: "wrap", gap: "5px",
//                     border: `1px solid ${BLUE_BORDER}`, borderRadius: "8px",
//                     padding: "7px 9px", marginBottom: "8px"
//                 }}>
//                     {selectedDomains.map((d) => (
//                         <span key={d} style={{
//                             display: "flex", alignItems: "center", gap: "3px",
//                             fontSize: "11px", fontWeight: 600, padding: "2px 7px",
//                             borderRadius: "20px", background: BLUE_LIGHT, color: BLUE,
//                             border: `1px solid ${BLUE_BORDER}`
//                         }}>
//                             {d}
//                             <button onClick={() => toggleDomain(d)}
//                                 style={{
//                                     background: "none", border: "none", cursor: "pointer",
//                                     color: "#ef4444", padding: 0, display: "flex", lineHeight: 1
//                                 }}>
//                                 <X size={9} />
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             )}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "18px" }}>
//                 {DOMAIN_CHIPS.map((d) => {
//                     const active = selectedDomains.includes(d);
//                     return (
//                         <button key={d} onClick={() => toggleDomain(d)}
//                             style={{
//                                 fontSize: "11px", fontWeight: 500, padding: "4px 10px",
//                                 borderRadius: "7px",
//                                 background: active ? BLUE_LIGHT : "white",
//                                 color: active ? BLUE : "#374151",
//                                 border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`,
//                                 cursor: "pointer", fontFamily: FONT
//                             }}>
//                             {d}
//                         </button>
//                     );
//                 })}
//             </div>

//             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "16px" }} />

//             <p style={{
//                 fontWeight: 700, fontSize: "11px", color: BLUE,
//                 textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px"
//             }}>
//                 Offering For
//             </p>
//             <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)}
//                 style={{
//                     width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px",
//                     padding: "9px 32px 9px 12px", fontSize: "13px", color: "#374151",
//                     background: "white", cursor: "pointer", outline: "none",
//                     appearance: "none", fontFamily: FONT,
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
//                     backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
//                     boxSizing: "border-box", marginBottom: "18px"
//                 }}>
//                 <option>Working Professionals</option>
//                 <option>Students</option>
//                 <option>Freshers</option>
//                 <option>Entrepreneurs</option>
//             </select>

//             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "16px" }} />

//             <p style={{
//                 fontWeight: 700, fontSize: "11px", color: BLUE,
//                 textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px"
//             }}>
//                 Pricing
//             </p>
//             <div style={{
//                 display: "flex", justifyContent: "space-between",
//                 fontSize: "11px", color: "#6b7280", marginBottom: "6px"
//             }}>
//                 <span>₹5,000</span><span>₹10,000</span>
//             </div>
//             <input type="range" min={5000} max={10000} step={500} value={priceVal}
//                 onChange={(e) => setPriceVal(Number(e.target.value))}
//                 style={{
//                     width: "100%", accentColor: BLUE,
//                     cursor: "pointer", boxSizing: "border-box"
//                 }} />
//             <p style={{ fontSize: "13px", color: BLUE, fontWeight: 700, margin: "5px 0 0" }}>
//                 Up To {fmtINR(priceVal)}/Month
//             </p>

//             <button
//                 onClick={() => {
//                     onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains });
//                     if (isMobile) onClose();
//                 }}
//                 disabled={isSearching}
//                 style={{
//                     marginTop: "16px", width: "100%", padding: "11px",
//                     background: isSearching ? BLUE_BORDER : PRIMARY,
//                     color: "white", border: "none", borderRadius: "10px",
//                     fontWeight: 700, fontSize: "13px",
//                     cursor: isSearching ? "not-allowed" : "pointer",
//                     fontFamily: FONT, boxSizing: "border-box"
//                 }}>
//                 {isSearching ? "Applying…" : "Apply Filters"}
//             </button>
//         </div>
//     );

//     if (!isMobile) return sidebarContent;

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     <motion.div key="overlay"
//                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         style={{
//                             position: "fixed", inset: 0, zIndex: 200,
//                             background: "rgba(0,0,0,.3)", backdropFilter: "blur(2px)"
//                         }} />
//                     <motion.div key="drawer"
//                         initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
//                         transition={{ type: "spring", damping: 28, stiffness: 300 }}
//                         style={{
//                             position: "fixed", bottom: 0, left: 0, right: 0,
//                             maxHeight: "85vh", zIndex: 201, background: "white",
//                             borderRadius: "20px 20px 0 0", overflowY: "auto"
//                         }}>
//                         <div style={{
//                             width: "36px", height: "4px", background: "#e5e7eb",
//                             borderRadius: "2px", margin: "12px auto 0"
//                         }} />
//                         {sidebarContent}
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// }

// // ── Root ───────────────────────────────────────────────────────────────────
// export default function ExploreMentors() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const width = useWindowWidth();
//     const isMobile = width < 640;
//     const isTablet = width < 1024;

//     // ── Read URL params ────────────────────────────────────────────────────
//     // e.g. /explore-mentors?domain=Backend+Developer,Fullstack&userCategory=Fresher
//     const [searchParams] = useSearchParams();
//     console.log("URL search params:", searchParams.toString()); // what does this print?
//     const mentorQueryString = searchParams.toString();
//     console.log("mentorQueryString:", mentorQueryString);

//     const domainFromUrl = searchParams.get("domain") ?? "";
//     const categoryFromUrl = searchParams.get("userCategory") ?? "";


//     const { data, isLoading, isError } = useGetLtmAllMentorsQuery(
//         mentorQueryString || {} // empty object = no filters
//     ); const [searchMentors, { isLoading: isSearching }] = useSearchMentorMutation();
//     const [advancedFilter] = useAdvancedFilterMentorsMutation();

//     const allMentors = data?.data ?? [];
//     const [displayMentors, setDisplayMentors] = useState(null);
//     const [isFiltered, setIsFiltered] = useState(false);
//     const [searchEmpty, setSearchEmpty] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortBy, setSortBy] = useState("Recommended");
//     const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
//     const [mobileNavOpen, setMobileNavOpen] = useState(false);
//     const [subscribeTarget, setSubscribeTarget] = useState(null);

//     // When URL params change (user navigates from discovery page), reset manual filters
//     useEffect(() => {
//         // This effect runs when URL params change
//         setIsFiltered(false);
//         setDisplayMentors(null);
//         setSearchEmpty(false);
//         setSortBy("Recommended");

//         // The query hook below will automatically use the new params
//     }, [domainFromUrl, categoryFromUrl, mentorQueryString]);

//     const mentors = isFiltered ? (displayMentors || []) : allMentors;

//     const handleClear = () => {
//         setIsFiltered(false);
//         setDisplayMentors(null);
//         setSearchEmpty(false);
//         navigate("/explore-mentors");           // strip URL params
//     };

//     const handleSearch = async (body) => {
//         try {
//             const res = await searchMentors(body).unwrap();
//             const result = res?.data || [];
//             setDisplayMentors(result);
//             setIsFiltered(true);
//             setSearchEmpty(result.length === 0);
//         } catch {
//             setDisplayMentors([]);
//             setIsFiltered(true);
//             setSearchEmpty(true);
//         }
//     };

//     const handleSortChange = async (value) => {
//         setSortBy(value);
//         if (value === "Recommended") { handleClear(); return; }
//         const sortMap = {
//             "Price: Low To High": { sortBy: "price", order: "asc" },
//             "Price: High To Low": { sortBy: "price", order: "desc" },
//             "Most Experienced": { sortBy: "experience", order: "desc" },
//         };
//         const body = sortMap[value];
//         if (!body) return;
//         try {
//             const res = await advancedFilter(body).unwrap();
//             const result = res?.data || [];
//             setDisplayMentors(result);
//             setIsFiltered(true);
//             setSearchEmpty(result.length === 0);
//         } catch {
//             setDisplayMentors([]);
//             setIsFiltered(true);
//             setSearchEmpty(true);
//         }
//     };

//     const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor.userId}`);

//     const handleBookTrial = (mentor) => {
//         const isLoggedIn = !!localStorage.getItem("authToken");
//         if (!isLoggedIn) { navigate(`/login?mentorId=${mentor._id}`); return; }
//         setSubscribeTarget(mentor);
//     };

//     return (
//         <>
//             {/* ── Header ────────────────────────────────────────────────── */}
//             <header style={{
//                 position: "sticky", top: 0, zIndex: 100, background: "white",
//                 borderBottom: "1px solid #e5e7eb", fontFamily: FONT,
//                 boxShadow: "0 1px 4px rgba(0,0,0,.06)"
//             }}>
//                 <div style={{
//                     maxWidth: "1280px", margin: "0 auto", padding: "0 20px",
//                     height: "62px", display: "flex", alignItems: "center",
//                     justifyContent: "space-between"
//                 }}>
//                     <div onClick={() => navigate("/")} style={{ cursor: "pointer", flexShrink: 0 }}>
//                         <img src={KarrivoLogo}
//                             className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain"
//                             alt="Karrivo" />
//                     </div>
//                     {!isMobile && (
//                         <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
//                             {NAV_LINKS.map((link) => {
//                                 const isActive = location.pathname === link.path;
//                                 return (
//                                     <button key={link.path} onClick={() => navigate(link.path)}
//                                         style={{
//                                             background: "none", border: "none", cursor: "pointer",
//                                             fontFamily: FONT, fontSize: "14px", fontWeight: 600,
//                                             color: isActive ? BLUE : "#6b7280",
//                                             padding: "4px 0",
//                                             borderBottom: `2px solid ${isActive ? BLUE : "transparent"}`,
//                                             transition: "all .15s"
//                                         }}>
//                                         {link.label}
//                                     </button>
//                                 );
//                             })}
//                         </nav>
//                     )}
//                     {isMobile && (
//                         <button onClick={() => setMobileNavOpen(!mobileNavOpen)}
//                             style={{
//                                 background: "none", border: "none", cursor: "pointer",
//                                 padding: "8px", display: "flex", flexDirection: "column", gap: "5px"
//                             }}>
//                             {[0, 1, 2].map((i) => (
//                                 <span key={i} style={{
//                                     display: "block", width: "20px",
//                                     height: "2px", background: BLUE, borderRadius: "2px",
//                                     transition: "all .2s",
//                                     ...(i === 0 && mobileNavOpen ? { transform: "rotate(45deg) translateY(7px)" }
//                                         : i === 1 && mobileNavOpen ? { opacity: 0 }
//                                             : i === 2 && mobileNavOpen ? { transform: "rotate(-45deg) translateY(-7px)" }
//                                                 : {})
//                                 }} />
//                             ))}
//                         </button>
//                     )}
//                 </div>
//                 <AnimatePresence>
//                     {isMobile && mobileNavOpen && (
//                         <motion.div initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             style={{
//                                 overflow: "hidden", borderTop: "1px solid #f0f0f0",
//                                 background: "white"
//                             }}>
//                             {NAV_LINKS.map((link) => (
//                                 <button key={link.path}
//                                     onClick={() => { navigate(link.path); setMobileNavOpen(false); }}
//                                     style={{
//                                         display: "block", width: "100%", textAlign: "left",
//                                         padding: "14px 20px", background: "none", border: "none",
//                                         cursor: "pointer", fontFamily: FONT, fontSize: "14px",
//                                         fontWeight: 600,
//                                         color: location.pathname === link.path ? BLUE : "#374151",
//                                         borderBottom: "1px solid #f9fafb"
//                                     }}>
//                                     {link.label}
//                                 </button>
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </header>

//             {/* ── Active filter pills ────────────────────────────────────── */}
//             {(domainFromUrl || categoryFromUrl) && !isFiltered && (
//                 <div style={{
//                     background: "#f0faff", borderBottom: "1px solid #cce9f5",
//                     padding: "10px 24px", display: "flex", alignItems: "center",
//                     gap: "8px", flexWrap: "wrap", fontFamily: FONT
//                 }}>
//                     <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>
//                         Filtered by:
//                     </span>
//                     {domainFromUrl && domainFromUrl.split(",").map((d) => (
//                         <span key={d} style={{
//                             background: BLUE_LIGHT, color: BLUE,
//                             border: `1px solid ${BLUE_BORDER}`, borderRadius: "20px",
//                             padding: "3px 10px", fontSize: "11px", fontWeight: 700
//                         }}>
//                             {d.trim()}
//                         </span>
//                     ))}
//                     {categoryFromUrl && (
//                         <span style={{
//                             background: "#fef3c7", color: "#92400e",
//                             border: "1px solid #fde68a", borderRadius: "20px",
//                             padding: "3px 10px", fontSize: "11px", fontWeight: 700
//                         }}>
//                             {categoryFromUrl}
//                         </span>
//                     )}
//                     <button onClick={handleClear}
//                         style={{
//                             marginLeft: "4px", background: "none", border: "none",
//                             color: "#ef4444", fontSize: "11px", fontWeight: 600,
//                             cursor: "pointer", fontFamily: FONT, display: "flex",
//                             alignItems: "center", gap: "3px"
//                         }}>
//                         <X size={10} /> Clear filters
//                     </button>
//                 </div>
//             )}

//             {/* ── Main ──────────────────────────────────────────────────── */}
//             <main style={{
//                 minHeight: "100vh", background: "#f6f8fa",
//                 padding: isMobile ? "12px" : "20px 24px",
//                 fontFamily: FONT, boxSizing: "border-box"
//             }}>
//                 <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

//                     {/* Search + Sort */}
//                     <div style={{
//                         display: "flex", gap: "8px", alignItems: "center",
//                         marginBottom: "14px", flexWrap: isMobile ? "wrap" : "nowrap"
//                     }}>
//                         <div style={{
//                             flex: 1, minWidth: isMobile ? "100%" : "auto",
//                             position: "relative", boxSizing: "border-box"
//                         }}>
//                             <Search size={14} color={BLUE}
//                                 style={{
//                                     position: "absolute", left: "12px", top: "50%",
//                                     transform: "translateY(-50%)", pointerEvents: "none"
//                                 }} />
//                             <input
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 placeholder={isMobile
//                                     ? "Search skills, domain…"
//                                     : "Search for any skill, domain or name…"}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter" && searchQuery)
//                                         handleSearch({ query: searchQuery });
//                                 }}
//                                 style={{
//                                     width: "100%", padding: "10px 14px 10px 36px",
//                                     border: "1px solid #e5e7eb", borderRadius: "10px",
//                                     fontSize: "13px", color: "#374151", fontFamily: FONT,
//                                     outline: "none", background: "white", boxSizing: "border-box",
//                                     boxShadow: "0 1px 3px rgba(0,0,0,.04)"
//                                 }}
//                                 onFocus={(e) => (e.target.style.borderColor = BLUE)}
//                                 onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                             />
//                         </div>
//                         <div style={{
//                             display: "flex", alignItems: "center", gap: "8px",
//                             width: isMobile ? "100%" : "auto", boxSizing: "border-box"
//                         }}>
//                             {!isMobile && (
//                                 <span style={{
//                                     fontSize: "13px", color: "#6b7280",
//                                     fontWeight: 600, whiteSpace: "nowrap"
//                                 }}>Sort:</span>
//                             )}
//                             <select value={sortBy}
//                                 onChange={(e) => handleSortChange(e.target.value)}
//                                 style={{
//                                     flex: isMobile ? 1 : "none",
//                                     border: "1px solid #e5e7eb", borderRadius: "8px",
//                                     padding: "10px 30px 10px 12px", fontSize: "13px",
//                                     color: "#374151", background: "white", cursor: "pointer",
//                                     outline: "none", appearance: "none", fontFamily: FONT,
//                                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
//                                     backgroundRepeat: "no-repeat",
//                                     backgroundPosition: "right 10px center",
//                                     minWidth: isMobile ? 0 : "180px",
//                                     boxSizing: "border-box"
//                                 }}>
//                                 <option>Recommended</option>
//                                 <option>Price: Low To High</option>
//                                 <option>Price: High To Low</option>
//                                 <option>Most Experienced</option>
//                             </select>
//                             {isTablet && (
//                                 <button onClick={() => setFilterDrawerOpen(true)}
//                                     style={{
//                                         display: "flex", alignItems: "center", gap: "5px",
//                                         padding: "10px 14px",
//                                         border: `1.5px solid ${BLUE_BORDER}`,
//                                         borderRadius: "8px", background: "white",
//                                         cursor: "pointer", fontFamily: FONT,
//                                         fontSize: "13px", fontWeight: 700, color: BLUE,
//                                         whiteSpace: "nowrap", flexShrink: 0
//                                     }}>
//                                     <SlidersHorizontal size={13} color={BLUE} /> Filters
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Result count */}
//                     {!isLoading && !isError && mentors.length > 0 && (
//                         <p style={{
//                             fontSize: "12px", color: "#9ca3af",
//                             marginBottom: "14px", fontWeight: 500
//                         }}>
//                             Showing {mentors.length} of {allMentors.length} mentor
//                             {allMentors.length !== 1 ? "s" : ""}
//                         </p>
//                     )}

//                     {/* Layout */}
//                     <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
//                         <div style={{ flex: 1, minWidth: 0 }}>

//                             {isLoading && (
//                                 <div style={{
//                                     display: "flex", alignItems: "center",
//                                     justifyContent: "center", minHeight: "40vh"
//                                 }}>
//                                     <div style={{
//                                         width: "36px", height: "36px", borderRadius: "50%",
//                                         border: `3px solid ${BLUE_LIGHT}`, borderTopColor: BLUE,
//                                         animation: "spin .8s linear infinite"
//                                     }} />
//                                     <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//                                 </div>
//                             )}

//                             {isError && !isLoading && (
//                                 <div style={{
//                                     textAlign: "center", padding: "60px 0",
//                                     background: "white", borderRadius: "14px",
//                                     border: "1px solid #e5e7eb"
//                                 }}>
//                                     <p style={{ fontWeight: 700, color: "#0f172a" }}>
//                                         No Mentors Available
//                                     </p>
//                                     <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>
//                                         Please check back later
//                                     </p>
//                                 </div>
//                             )}

//                             {!isLoading && !isError && searchEmpty && (
//                                 <div style={{ textAlign: "center", padding: "60px 0" }}>
//                                     <p style={{ fontWeight: 700, color: "#0f172a" }}>
//                                         No mentors match your filters
//                                     </p>
//                                 </div>
//                             )}

//                             {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
//                                 <div style={{
//                                     width: "100%", display: "flex",
//                                     flexDirection: "column"
//                                 }}>
//                                     {mentors.map((mentor, index) => (
//                                         <MentorCard
//                                             key={mentor._id || index}
//                                             mentor={mentor}
//                                             index={index}
//                                             onSubscribe={handleBookTrial}
//                                             onViewProfile={handleViewProfile}
//                                         />
//                                     ))}
//                                 </div>
//                             )}

//                             {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
//                                 <div style={{
//                                     textAlign: "center", padding: "60px 0",
//                                     border: "2px dashed #e5e7eb", borderRadius: "14px",
//                                     background: "white"
//                                 }}>
//                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
//                                     <p style={{ fontWeight: 700, color: "#0f172a" }}>
//                                         No Mentors Available
//                                     </p>
//                                 </div>
//                             )}
//                         </div>

//                         {!isTablet && (
//                             <FilterSidebar
//                                 onSearch={handleSearch}
//                                 isSearching={isSearching}
//                                 onClear={handleClear}
//                                 isFiltered={isFiltered}
//                                 isOpen={false}
//                                 onClose={() => { }}
//                             />
//                         )}
//                     </div>
//                 </div>

//                 {isTablet && (
//                     <FilterSidebar
//                         onSearch={handleSearch}
//                         isSearching={isSearching}
//                         onClear={handleClear}
//                         isFiltered={isFiltered}
//                         isOpen={filterDrawerOpen}
//                         onClose={() => setFilterDrawerOpen(false)}
//                     />
//                 )}
//             </main>

//             {/* Subscribe panel overlay */}
//             <AnimatePresence>
//                 {subscribeTarget && (
//                     <>
//                         <motion.div
//                             key="sub-overlay"
//                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                             onClick={() => setSubscribeTarget(null)}
//                             style={{
//                                 position: "fixed", inset: 0, zIndex: 299,
//                                 background: "rgba(0,0,0,.35)", backdropFilter: "blur(2px)"
//                             }} />
//                         <SubscribePanel
//                             key="sub-panel"
//                             mentor={subscribeTarget}
//                             onClose={() => setSubscribeTarget(null)}
//                         />
//                     </>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// }





import { useState, useEffect, useMemo } from "react";
import {
    MapPin, X, ChevronDown, ChevronUp, CheckCircle,
    Search, Pencil, Briefcase, Target,
    SlidersHorizontal, Star, Trophy,
    Users, BookOpen, Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import KarrivoLogo from "../../assets/KarrivoLogo.png";
// import {
//     useGetLtmAllMentorsQuery,
//     useSearchMentorMutation,
//     useAdvancedFilterMentorsMutation,
// } from "./exploreMentorsapislice";

import { useAdvancedFilterMentorsMutation, useSearchMentorMutation, useGetLtmAllMentorsQuery } from "../LongTermMentorship/MentorshipHome/Mentorshiphomeapislice";
// ── Google Font ────────────────────────────────────────────────────────────
const _link = document.createElement("link");
_link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
_link.rel = "stylesheet";
document.head.appendChild(_link);

// ── Design tokens ──────────────────────────────────────────────────────────
const BLUE = "#0098cc";
const BLUE_LIGHT = "#f0faff";
const BLUE_BORDER = "#cce9f5";
const PRIMARY = "#1a1a2e";
const FONT = "'DM Sans', sans-serif";

// ── Static data ────────────────────────────────────────────────────────────
const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PLANS = [
    { key: "1Month", label: "1 Mo" },
    { key: "3Month", label: "3 Mo" },
    { key: "6Month", label: "6 Mo" },
];

const PLAN_ALIASES = {
    "1Month": ["1Month", "oneMonth", "1month", "one_month", "onemonth"],
    "3Month": ["3Month", "threeMonths", "3month", "three_months", "threemonths", "3Months"],
    "6Month": ["6Month", "sixMonths", "6month", "six_months", "sixmonths", "6Months"],
};

const DOMAIN_CHIPS = [
    "Frontend", "Backend", "Fullstack",
    "DevOps / SRE / Cloud", "QA / Automation Testing",
    "Data Scientist / AI/ML", "Data Analyst",
];

const NAV_LINKS = [{ label: "Explore Mentors", path: "/explore-mentors" }];

// ── Helpers ────────────────────────────────────────────────────────────────
const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

function getPlanData(pricing, planKey) {
    if (!pricing?.plans) return null;
    const plans = pricing.plans;
    const aliases = PLAN_ALIASES[planKey] || [planKey];
    for (const alias of aliases) {
        if (plans[alias] != null) {
            const p = plans[alias];
            if (p.totalPrice === 0 && p.totalSessions === 0) return null;
            return p;
        }
    }
    const norm = (s) => s.toLowerCase().replace(/[^0-9a-z]/g, "");
    const found = Object.keys(plans).find((k) => norm(k) === norm(planKey));
    if (found) {
        const p = plans[found];
        if (p.totalPrice === 0 && p.totalSessions === 0) return null;
        return p;
    }
    return null;
}

function toTitleCase(str) {
    if (!str) return str;
    return str.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
}

function useWindowWidth() {
    const [w, setW] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    useEffect(() => {
        const h = () => setW(window.innerWidth);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);
    return w;
}

// ── SubscribePanel ─────────────────────────────────────────────────────────
function SubscribePanel({ mentor, onClose }) {
    const width = useWindowWidth();
    const isMobile = width < 640;

    const availability = Array.isArray(mentor.availability) ? mentor.availability : [];
    const [selected, setSelected] = useState({});
    const [openDay, setOpenDay] = useState(null);
    const [planKey, setPlanKey] = useState("1Month");

    const toggleSlot = (di, si) =>
        setSelected((p) => ({ ...p, [`${di}_${si}`]: !p[`${di}_${si}`] }));

    const selectedCount = Object.values(selected).filter(Boolean).length;
    const planData = getPlanData(mentor.pricing, planKey);
    const totalSessions = planData?.totalSessions ?? 0;
    const totalPrice = planData?.totalPrice ?? 0;

    const panelStyle = isMobile
        ? {
            position: "fixed", bottom: 0, left: 0, right: 0, height: "85vh", background: "white", zIndex: 300,
            boxShadow: "0 -4px 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column",
            fontFamily: FONT, borderRadius: "20px 20px 0 0"
        }
        : {
            position: "fixed", top: 0, right: 0, bottom: 0, width: "420px", background: "white", zIndex: 300,
            boxShadow: "-4px 0 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT
        };

    const motionProps = isMobile
        ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
        : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

    return (
        <motion.div {...motionProps}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={panelStyle}
        >
            {isMobile && (
                <div style={{
                    width: "36px", height: "4px", background: "#e5e7eb",
                    borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0
                }} />
            )}
            <div style={{
                background: "white", borderBottom: `3px solid ${BLUE}`,
                padding: "20px 24px", flexShrink: 0
            }}>
                <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: "4px"
                }}>
                    <h2 style={{ color: BLUE, fontWeight: 800, fontSize: "17px", margin: 0 }}>
                        Book A Free Trial
                    </h2>
                    <button onClick={onClose}
                        style={{
                            background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, color: BLUE,
                            borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                        <X size={16} />
                    </button>
                </div>
                <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
                    {toTitleCase(mentor.fullName)} ·{" "}
                    <span style={{ color: BLUE, fontWeight: 700 }}>
                        {fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session
                    </span>
                </p>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                {/* Plan selector */}
                <p style={{
                    fontSize: "11px", fontWeight: 700, color: BLUE,
                    textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px"
                }}>
                    Select Plan
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {PLANS.map((p) => {
                        const sel = planKey === p.key;
                        const pData = getPlanData(mentor.pricing, p.key);
                        const price = pData?.totalPrice ?? 0;
                        const sessions = mentor.pricing?.weeklySessions ?? 0;
                        const disabled = !pData;
                        return (
                            <div key={p.key}
                                onClick={() => !disabled && setPlanKey(p.key)}
                                style={{
                                    border: `1.5px solid ${sel ? BLUE : disabled ? "#f3f4f6" : "#e5e7eb"}`,
                                    borderRadius: "12px", padding: "14px 16px",
                                    background: disabled ? "#f9fafb" : "white",
                                    cursor: disabled ? "not-allowed" : "pointer",
                                    display: "flex", alignItems: "center", gap: "12px",
                                    boxShadow: sel ? `0 0 0 3px ${BLUE_LIGHT}` : "none",
                                    opacity: disabled ? 0.6 : 1
                                }}>
                                <div style={{
                                    width: "18px", height: "18px", borderRadius: "50%",
                                    border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: "white",
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                                }}>
                                    {sel && <div style={{
                                        width: "8px", height: "8px",
                                        borderRadius: "50%", background: BLUE
                                    }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontWeight: 700, fontSize: "13px",
                                        color: sel ? BLUE : "#111827", margin: "0 0 2px"
                                    }}>{p.label}</p>
                                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                                        {disabled ? "No plans available" : `${sessions} sessions/week`}
                                    </p>
                                </div>
                                <p style={{
                                    fontWeight: 700, fontSize: "15px",
                                    color: sel ? BLUE : "#374151", margin: 0
                                }}>
                                    {disabled ? "N/A" : fmtINR(price)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Availability */}
                <p style={{
                    fontSize: "11px", fontWeight: 700, color: BLUE,
                    textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px"
                }}>
                    Select Availability
                </p>
                {availability.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {DAY_ORDER.map((day, di) => {
                            const dayData = availability.find((d) => d.day === day);
                            if (!dayData) return null;
                            const slots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
                            const isOpen = openDay === day;
                            const selInDay = slots.filter((_, si) => selected[`${di}_${si}`]).length;
                            return (
                                <div key={day}
                                    style={{
                                        border: `1.5px solid ${selInDay ? BLUE : "#e5e7eb"}`,
                                        borderRadius: "12px", overflow: "hidden", background: "white"
                                    }}>
                                    <button
                                        onClick={() => setOpenDay(isOpen ? null : day)}
                                        style={{
                                            width: "100%", display: "flex", alignItems: "center",
                                            justifyContent: "space-between", padding: "12px 14px",
                                            background: "transparent", border: "none", cursor: "pointer",
                                            fontFamily: FONT
                                        }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{
                                                fontWeight: 600, fontSize: "13px",
                                                color: selInDay ? BLUE : "#374151"
                                            }}>{day}</span>
                                            {selInDay > 0 && (
                                                <span style={{
                                                    background: BLUE, color: "white",
                                                    borderRadius: "20px", padding: "1px 8px",
                                                    fontSize: "10px", fontWeight: 700
                                                }}>
                                                    {selInDay} selected
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                                                {slots.length} slot{slots.length !== 1 ? "s" : ""}
                                            </span>
                                            {isOpen
                                                ? <ChevronUp size={14} color="#9ca3af" />
                                                : <ChevronDown size={14} color="#9ca3af" />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: .18 }}
                                                style={{ overflow: "hidden" }}>
                                                <div style={{
                                                    padding: "0 14px 12px",
                                                    display: "flex", flexDirection: "column", gap: "6px"
                                                }}>
                                                    {slots.map((slot, si) => {
                                                        const k = `${di}_${si}`;
                                                        const isSel = !!selected[k];
                                                        return (
                                                            <button key={slot._id}
                                                                onClick={() => toggleSlot(di, si)}
                                                                style={{
                                                                    display: "flex", alignItems: "center",
                                                                    justifyContent: "space-between",
                                                                    padding: "8px 12px", borderRadius: "8px",
                                                                    border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`,
                                                                    background: "white", cursor: "pointer",
                                                                    fontFamily: FONT
                                                                }}>
                                                                <span style={{
                                                                    fontSize: "12px", fontWeight: 600,
                                                                    color: isSel ? BLUE : "#374151"
                                                                }}>
                                                                    {slot.startTime} – {slot.endTime}
                                                                </span>
                                                                {isSel
                                                                    ? <CheckCircle size={15} color={BLUE} />
                                                                    : <div style={{
                                                                        width: "15px", height: "15px",
                                                                        borderRadius: "50%",
                                                                        border: "1.5px solid #d1d5db"
                                                                    }} />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{
                        textAlign: "center", padding: "20px",
                        background: "#fafafa", borderRadius: "10px",
                        border: "1px dashed #e5e7eb"
                    }}>
                        <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
                            No Availability Slots Set Yet
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{
                borderTop: "1px solid #f0f0f0", padding: "16px 24px",
                background: "white", flexShrink: 0
            }}>
                <div style={{ marginBottom: "12px" }}>
                    <p style={{
                        fontSize: "11px", color: "#9ca3af", margin: "0 0 2px",
                        fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em"
                    }}>
                        Total For {PLANS.find((p) => p.key === planKey)?.label}
                    </p>
                    <p style={{ fontSize: "26px", fontWeight: 800, color: BLUE, margin: 0 }}>
                        {totalPrice > 0 ? fmtINR(totalPrice) : "N/A"}
                    </p>
                    {totalSessions > 0 && (
                        <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
                            {totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week
                        </p>
                    )}
                </div>
                <button
                    disabled={totalPrice === 0}
                    style={{
                        width: "100%", padding: "13px",
                        background: totalPrice === 0 ? "#d1d5db" : PRIMARY,
                        cursor: totalPrice === 0 ? "not-allowed" : "pointer",
                        color: "white", border: "none", borderRadius: "10px",
                        fontWeight: 700, fontSize: "14px", fontFamily: FONT
                    }}>
                    {totalPrice === 0 ? "Plan Not Available" : `Subscribe — ${fmtINR(totalPrice)}`}
                </button>
                <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "11px", marginTop: "8px" }}>
                    Secure Checkout · Cancel Anytime · 7-Day Refund Policy
                </p>
            </div>
        </motion.div>
    );
}

// ── MentorCard ─────────────────────────────────────────────────────────────
function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {

    console.log(mentor, "mentor1s2d3fer")
    const width = useWindowWidth();
    const isMobile = width < 768;
    const [bioExpanded, setBioExpanded] = useState(false);

    const fullName = toTitleCase(mentor.fullName || "Mentor");
    const currentRole = toTitleCase(mentor.currentRole || "");
    const companyName = toTitleCase(mentor.companyName || "");
    const locationText = toTitleCase(mentor.location || "");
    const languages = Array.isArray(mentor.languages)
        ? mentor.languages.join(", ")
        : mentor.languages || "";

    const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";

    const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
        .split(",").map((s) => s.trim()).filter(Boolean);

    const monthlyPrice = mentor.hourlyRate ?? 0;
    const nextAvailable = mentor.nextAvailable ?? "";
    const placements = mentor.placements ?? 0;
    const menteeCount = mentor.menteeCount ?? 0;
    const yearsExp = mentor.yearsOfExperience
        ? `${mentor.yearsOfExperience}+ Years of Exp.`
        : "0+ Years of Exp.";
    const starBadge = mentor.starMentorBadge || mentor.badge || "";
    const referralCount = mentor.referralCount ?? 0;
    const hasCurriculum = mentor.hasCurriculum ?? false;
    const weeklySessions = mentor.pricing?.weeklySessions ?? 4;

    const offeringForList = Array.isArray(mentor.offeringFor)
        ? mentor.offeringFor
        : mentor.offeringFor
            ? String(mentor.offeringFor).split(",").map((s) => s.trim())
            : [];

    const domainsList = Array.isArray(mentor.domains)
        ? mentor.domains
        : mentor.domains
            ? String(mentor.domains).split(",").map((s) => s.trim())
            : [];

    const prevCompanies = Array.isArray(mentor.previousCompanies)
        ? mentor.previousCompanies
        : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            style={{
                width: "100%",
                border: "1px solid #e5e7eb",
                background: "#fff",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                overflow: "hidden",
                marginBottom: "16px",
                fontFamily: FONT,
                borderRadius: "4px",
            }}
        >
            {/* LEFT: Photo */}
            <div style={{
                position: "relative",
                width: isMobile ? "100%" : "180px",
                minWidth: isMobile ? "100%" : "180px",
                height: isMobile ? "220px" : "auto",
                background: "#f3f4f6",
                overflow: "hidden",
                flexShrink: 0,
            }}>
                <span style={{ position: "absolute", top: "8px", left: "8px", fontSize: "12px", color: "#94a3b8", userSelect: "none" }}>✦</span>
                <span style={{ position: "absolute", top: "8px", right: "8px", fontSize: "9px", color: "#94a3b8", userSelect: "none" }}>✦</span>
                <span style={{ position: "absolute", bottom: "52px", left: "6px", fontSize: "8px", color: "#94a3b8", userSelect: "none" }}>✦</span>
                <span style={{ position: "absolute", bottom: "52px", right: "6px", fontSize: "10px", color: "#94a3b8", userSelect: "none" }}>✦</span>
                <img
                    src={mentor.profilePhoto}
                    alt={fullName}
                    style={{
                        width: "100%", height: "100%", objectFit: "cover",
                        objectPosition: "top center", display: "block",
                        minHeight: isMobile ? "220px" : "220px"
                    }}
                />
            </div>

            {/* CENTRE: Info */}
            <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                borderRight: isMobile ? "none" : "1px solid #e5e7eb", minWidth: 0,
            }}>
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>
                        {fullName}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", fontSize: "13px", color: "#6b7280" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <MapPin size={13} color="#6b7280" />{locationText}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Pencil size={12} color="#6b7280" />{languages}
                        </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6" }}>
                        {bioExpanded ? bio : bio.slice(0, 160) + (bio.length > 160 ? "..." : "")}
                        {bio.length > 160 && (
                            <span onClick={() => setBioExpanded(!bioExpanded)}
                                style={{ color: "#2563eb", marginLeft: "6px", cursor: "pointer", fontWeight: 600 }}>
                                {bioExpanded ? "Show Less" : "Read More"}
                            </span>
                        )}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {areas.slice(0, 7).map((skill, i) => (
                            <div key={i} style={{
                                border: "1px solid #d1d5db", padding: "4px 10px",
                                fontSize: "12px", color: "#374151", background: "#fff", borderRadius: "4px"
                            }}>
                                {toTitleCase(skill)}
                            </div>
                        ))}
                        {areas.length > 7 && (
                            <div style={{
                                border: "1px solid #d1d5db", padding: "4px 10px",
                                fontSize: "12px", color: "#2563eb", background: "#fff", borderRadius: "4px", fontWeight: 600
                            }}>
                                +{areas.length - 7} More
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap: "wrap" }}>
                        <div style={{
                            border: "1px solid #e5e7eb", padding: "10px 14px",
                            display: "flex", alignItems: "center", gap: "10px",
                            borderRadius: "6px", minWidth: "200px"
                        }}>
                            <div style={{
                                width: "36px", height: "36px", borderRadius: "50%",
                                background: "#1d4ed8", color: "#fff", display: "flex",
                                alignItems: "center", justifyContent: "center",
                                fontWeight: 800, fontSize: "13px", flexShrink: 0
                            }}>
                                {fullName.charAt(0)}.
                            </div>
                            <div>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{currentRole}</div>
                                <div style={{ fontSize: "11px", color: "#6b7280" }}>{companyName}</div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {prevCompanies.slice(0, 3).map((c, i) => (
                                    <div key={i} style={{
                                        width: "28px", height: "28px", borderRadius: "50%",
                                        border: "2px solid white", background: "#e5e7eb", overflow: "hidden",
                                        marginLeft: i > 0 ? "-8px" : "0", zIndex: 3 - i, position: "relative", flexShrink: 0
                                    }}>
                                        {c.logo ? (
                                            <img src={c.logo} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        ) : (
                                            <div style={{
                                                width: "100%", height: "100%", display: "flex", alignItems: "center",
                                                justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#374151",
                                                background: ["#fef3c7", "#dbeafe", "#d1fae5"][i % 3]
                                            }}>
                                                {c.name?.charAt(0) || "C"}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {prevCompanies.length === 0 && mentor.companyLogo && (
                                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid white", overflow: "hidden" }}>
                                        <img src={mentor.companyLogo} alt={companyName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{yearsExp}</div>
                                <div style={{ fontSize: "11px", color: "#6b7280" }}>
                                    {prevCompanies.length > 0 ? prevCompanies.map((c) => c.name).join(" | ") : companyName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    borderTop: "1px solid #f3f4f6", padding: "10px 18px",
                    display: "flex", alignItems: "center", gap: "20px",
                    flexWrap: "wrap", background: "#fafafa"
                }}>
                    {offeringForList.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#374151" }}>
                            <Briefcase size={13} color="#6b7280" />
                            <span style={{ color: "#6b7280" }}>For:</span>
                            <span style={{ fontWeight: 600 }}>{offeringForList.join(" | ")}</span>
                        </div>
                    )}
                    {domainsList.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#374151" }}>
                            <Target size={13} color="#6b7280" />
                            <span style={{ color: "#6b7280" }}>Domains:</span>
                            <span style={{ fontWeight: 600 }}>{domainsList[0]}</span>
                            {domainsList.length > 1 && (
                                <span style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>| More</span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: Stats + CTA */}
            <div style={{
                width: isMobile ? "100%" : "270px",
                minWidth: isMobile ? "100%" : "270px",
                padding: "16px 18px", display: "flex", flexDirection: "column",
                gap: "10px", background: "#ffffff", flexShrink: 0,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                    <Star size={16} color="#f59e0b" fill="#f59e0b" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, color: "#111827" }}>Star Mentor</span>
                    {starBadge && <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 400 }}>- {starBadge}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151" }}>
                    <Trophy size={15} color="#d97706" style={{ flexShrink: 0 }} />
                    <span>{placements} Placements</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151" }}>
                    <Users size={15} color="#0ea5e9" style={{ flexShrink: 0 }} />
                    <span>5.0 ({menteeCount}+ mentees)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151" }}>
                    <Video size={15} color="#10b981" style={{ flexShrink: 0 }} />
                    <span>{weeklySessions * 4}x Sessions Per Month</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151" }}>
                    <Briefcase size={15} color="#8b5cf6" style={{ flexShrink: 0 }} />
                    <span>Referrals in Top Companies</span>
                    {referralCount > 0 && (
                        <span style={{ color: "#2563eb", fontWeight: 600, fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap" }}>
                            +{referralCount} More
                        </span>
                    )}
                </div>
                {hasCurriculum && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "#374151" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <BookOpen size={15} color="#6b7280" style={{ flexShrink: 0 }} />
                            <span>Detailed Curriculum Available</span>
                        </div>
                        <span style={{ color: "#2563eb", fontWeight: 600, fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap" }}>View ↗</span>
                    </div>
                )}
                <div style={{ borderTop: "1px solid #f3f4f6", margin: "2px 0" }} />
                <div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "2px" }}>Starting from</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
                        <span style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                            {fmtINR(monthlyPrice)}
                        </span>
                        <span style={{ fontSize: "12px", color: "#6b7280", marginBottom: "3px" }}>/Session</span>
                    </div>
                </div>
                <button
                    onClick={() => onViewProfile(mentor)}
                    style={{
                        width: "100%", height: "42px", border: "1px solid #d1d5db",
                        borderRadius: "8px", background: "#ffffff", color: "#111827",
                        fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
                >
                    View Profile
                </button>
                {nextAvailable && (
                    <p style={{ textAlign: "center", fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                        Next Available: <span style={{ color: "#374151", fontWeight: 600 }}>{nextAvailable}</span>
                    </p>
                )}
            </div>
        </motion.div>
    );
}

// ── FilterSidebar ──────────────────────────────────────────────────────────
function FilterSidebar({ onSearch, isSearching, onClear, isOpen, onClose }) {
    const width = useWindowWidth();
    const isMobile = width < 1024;

    const [selectedDomains, setSelectedDomains] = useState([]);
    const [offeringFor, setOfferingFor] = useState("Working Professionals");
    const [priceVal, setPriceVal] = useState(7000);

    const toggleDomain = (d) =>
        setSelectedDomains((prev) =>
            prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
        );

    const handleClear = () => { setSelectedDomains([]); setPriceVal(7000); onClear(); };

    const sidebarContent = (
        <div style={{
            width: isMobile ? "100%" : "240px", background: "white",
            borderRadius: isMobile ? 0 : "14px", padding: "18px",
            fontFamily: FONT, boxSizing: "border-box",
            ...(!isMobile && {
                border: "1px solid #e5e7eb", alignSelf: "flex-start",
                position: "sticky", top: "80px", flexShrink: 0,
                boxShadow: "0 1px 8px rgba(0,0,0,.06)",
            }),
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a", margin: 0 }}>Filter By</h3>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button onClick={handleClear}
                        style={{
                            background: "none", border: "none", color: "#ef4444",
                            fontSize: "12px", fontWeight: 600, cursor: "pointer",
                            fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px"
                        }}>
                        <X size={11} /> Clear
                    </button>
                    {isMobile && (
                        <button onClick={onClose}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex" }}>
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>
                Domain
            </p>
            {selectedDomains.length > 0 && (
                <div style={{
                    display: "flex", flexWrap: "wrap", gap: "5px",
                    border: `1px solid ${BLUE_BORDER}`, borderRadius: "8px",
                    padding: "7px 9px", marginBottom: "8px"
                }}>
                    {selectedDomains.map((d) => (
                        <span key={d} style={{
                            display: "flex", alignItems: "center", gap: "3px",
                            fontSize: "11px", fontWeight: 600, padding: "2px 7px",
                            borderRadius: "20px", background: BLUE_LIGHT, color: BLUE,
                            border: `1px solid ${BLUE_BORDER}`
                        }}>
                            {d}
                            <button onClick={() => toggleDomain(d)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}>
                                <X size={9} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "18px" }}>
                {DOMAIN_CHIPS.map((d) => {
                    const active = selectedDomains.includes(d);
                    return (
                        <button key={d} onClick={() => toggleDomain(d)}
                            style={{
                                fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "7px",
                                background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151",
                                border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT
                            }}>
                            {d}
                        </button>
                    );
                })}
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "16px" }} />

            <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>
                Offering For
            </p>
            <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)}
                style={{
                    width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px",
                    padding: "9px 32px 9px 12px", fontSize: "13px", color: "#374151",
                    background: "white", cursor: "pointer", outline: "none",
                    appearance: "none", fontFamily: FONT,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
                    boxSizing: "border-box", marginBottom: "18px"
                }}>
                <option>Working Professionals</option>
                <option>Students</option>
                <option>Freshers</option>
                <option>Entrepreneurs</option>
            </select>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "16px" }} />

            <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>
                Pricing
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7280", marginBottom: "6px" }}>
                <span>₹5,000</span><span>₹10,000</span>
            </div>
            <input type="range" min={5000} max={10000} step={500} value={priceVal}
                onChange={(e) => setPriceVal(Number(e.target.value))}
                style={{ width: "100%", accentColor: BLUE, cursor: "pointer", boxSizing: "border-box" }} />
            <p style={{ fontSize: "13px", color: BLUE, fontWeight: 700, margin: "5px 0 0" }}>
                Up To {fmtINR(priceVal)}/Month
            </p>

            <button
                onClick={() => {
                    onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains });
                    if (isMobile) onClose();
                }}
                disabled={isSearching}
                style={{
                    marginTop: "16px", width: "100%", padding: "11px",
                    background: isSearching ? BLUE_BORDER : PRIMARY,
                    color: "white", border: "none", borderRadius: "10px",
                    fontWeight: 700, fontSize: "13px",
                    cursor: isSearching ? "not-allowed" : "pointer",
                    fontFamily: FONT, boxSizing: "border-box"
                }}>
                {isSearching ? "Applying…" : "Apply Filters"}
            </button>
        </div>
    );

    if (!isMobile) return sidebarContent;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div key="overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: "fixed", inset: 0, zIndex: 200,
                            background: "rgba(0,0,0,.3)", backdropFilter: "blur(2px)"
                        }} />
                    <motion.div key="drawer"
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        style={{
                            position: "fixed", bottom: 0, left: 0, right: 0,
                            maxHeight: "85vh", zIndex: 201, background: "white",
                            borderRadius: "20px 20px 0 0", overflowY: "auto"
                        }}>
                        <div style={{ width: "36px", height: "4px", background: "#e5e7eb", borderRadius: "2px", margin: "12px auto 0" }} />
                        {sidebarContent}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function ExploreMentors() {
    const navigate = useNavigate();
    const location = useLocation();
    const width = useWindowWidth();
    const isMobile = width < 640;
    const isTablet = width < 1024;

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1 — Read URL query params set by MentorDiscoveryUI
    //   e.g. /explore-mentors?domain=Frontend+Developer,Backend+Developer
    // ─────────────────────────────────────────────────────────────────────────
    const [searchParams] = useSearchParams();

    const domainFromUrl = searchParams.get("domain") ?? "";       // "Frontend Developer,Backend Developer"

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 2 — Build the POST body that the backend expects.
    //   useMemo so it only re-computes when the URL params actually change.
    //   This object is passed directly to useGetLtmAllMentorsQuery as the
    //   `filters` argument, which the API slice sends as the POST body.
    // ─────────────────────────────────────────────────────────────────────────
    const apiFilters = useMemo(() => {
        const filters = {};
        if (domainFromUrl) filters.domain = domainFromUrl;       // "Frontend Developer,Backend Developer"
        console.log("📤 Sending POST body to backend:", filters);
        return filters;
    }, [domainFromUrl]);

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 3 — Call the API with the filters.
    //   When URL params are absent, apiFilters = {} → backend returns all mentors.
    //   When params are present, apiFilters = { domain } → filtered.
    //   RTK Query automatically re-fetches when apiFilters reference changes.
    // ─────────────────────────────────────────────────────────────────────────
    const { data, isLoading, isError } = useGetLtmAllMentorsQuery(apiFilters);

    const [searchMentors, { isLoading: isSearching }] = useSearchMentorMutation();
    const [advancedFilter] = useAdvancedFilterMentorsMutation();

    const allMentors = data?.data ?? [];

    // Manual filter/search state (sidebar & sort — overrides URL-based results)
    const [displayMentors, setDisplayMentors] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [searchEmpty, setSearchEmpty] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Recommended");
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [subscribeTarget, setSubscribeTarget] = useState(null);

    // Reset manual filters whenever the URL params change
    useEffect(() => {
        setIsFiltered(false);
        setDisplayMentors(null);
        setSearchEmpty(false);
        setSortBy("Recommended");
    }, [domainFromUrl]);

    // What to show: manual filter result takes precedence over URL-filtered API result
    const mentors = isFiltered ? (displayMentors ?? []) : allMentors;

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleClear = () => {
        setIsFiltered(false);
        setDisplayMentors(null);
        setSearchEmpty(false);
        navigate("/explore-mentors"); // strips URL params → re-fetches all mentors
    };

    const handleSearch = async (body) => {
        try {
            const res = await searchMentors(body).unwrap();
            const result = res?.data ?? [];
            setDisplayMentors(result);
            setIsFiltered(true);
            setSearchEmpty(result.length === 0);
        } catch {
            setDisplayMentors([]);
            setIsFiltered(true);
            setSearchEmpty(true);
        }
    };

    const handleSortChange = async (value) => {
        setSortBy(value);
        if (value === "Recommended") { handleClear(); return; }
        const sortMap = {
            "Price: Low To High": { sortBy: "price", order: "asc" },
            "Price: High To Low": { sortBy: "price", order: "desc" },
            "Most Experienced": { sortBy: "experience", order: "desc" },
        };
        const body = sortMap[value];
        if (!body) return;
        try {
            const res = await advancedFilter(body).unwrap();
            const result = res?.data ?? [];
            setDisplayMentors(result);
            setIsFiltered(true);
            setSearchEmpty(result.length === 0);
        } catch {
            setDisplayMentors([]);
            setIsFiltered(true);
            setSearchEmpty(true);
        }
    };

    const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor.userId}`);

    const handleBookTrial = (mentor) => {
        const isLoggedIn = !!localStorage.getItem("authToken");
        if (!isLoggedIn) { navigate(`/login?mentorId=${mentor._id}`); return; }
        setSubscribeTarget(mentor);
    };

    return (
        <>
            {/* ── Header ─────────────────────────────────────────────── */}
            <header style={{
                position: "sticky", top: 0, zIndex: 100, background: "white",
                borderBottom: "1px solid #e5e7eb", fontFamily: FONT,
                boxShadow: "0 1px 4px rgba(0,0,0,.06)"
            }}>
                <div style={{
                    maxWidth: "1280px", margin: "0 auto", padding: "0 20px",
                    height: "62px", display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                    <div onClick={() => navigate("/")} style={{ cursor: "pointer", flexShrink: 0 }}>
                        <img src={KarrivoLogo} className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain" alt="Karrivo" />
                    </div>
                    {!isMobile && (
                        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                            {NAV_LINKS.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <button key={link.path} onClick={() => navigate(link.path)}
                                        style={{
                                            background: "none", border: "none", cursor: "pointer",
                                            fontFamily: FONT, fontSize: "14px", fontWeight: 600,
                                            color: isActive ? BLUE : "#6b7280", padding: "4px 0",
                                            borderBottom: `2px solid ${isActive ? BLUE : "transparent"}`,
                                        }}>
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    )}
                    {isMobile && (
                        <button onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
                            {[0, 1, 2].map((i) => (
                                <span key={i} style={{
                                    display: "block", width: "20px", height: "2px", background: BLUE, borderRadius: "2px",
                                    ...(i === 0 && mobileNavOpen ? { transform: "rotate(45deg) translateY(7px)" }
                                        : i === 1 && mobileNavOpen ? { opacity: 0 }
                                            : i === 2 && mobileNavOpen ? { transform: "rotate(-45deg) translateY(-7px)" }
                                                : {})
                                }} />
                            ))}
                        </button>
                    )}
                </div>
                <AnimatePresence>
                    {isMobile && mobileNavOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: "hidden", borderTop: "1px solid #f0f0f0", background: "white" }}>
                            {NAV_LINKS.map((link) => (
                                <button key={link.path} onClick={() => { navigate(link.path); setMobileNavOpen(false); }}
                                    style={{
                                        display: "block", width: "100%", textAlign: "left", padding: "14px 20px",
                                        background: "none", border: "none", cursor: "pointer", fontFamily: FONT,
                                        fontSize: "14px", fontWeight: 600,
                                        color: location.pathname === link.path ? BLUE : "#374151",
                                        borderBottom: "1px solid #f9fafb"
                                    }}>
                                    {link.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Active filter pills ─────────────────────────────────── */}
            {domainFromUrl && !isFiltered && (
                <div style={{
                    background: "#f0faff", borderBottom: "1px solid #cce9f5",
                    padding: "10px 24px", display: "flex", alignItems: "center",
                    gap: "8px", flexWrap: "wrap", fontFamily: FONT
                }}>
                    <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Filtered by:</span>
                    {domainFromUrl && domainFromUrl.split(",").map((d) => (
                        <span key={d} style={{
                            background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}`,
                            borderRadius: "20px", padding: "3px 10px", fontSize: "11px", fontWeight: 700
                        }}>
                            {d.trim()}
                        </span>
                    ))}
                    <button onClick={handleClear}
                        style={{
                            marginLeft: "4px", background: "none", border: "none", color: "#ef4444",
                            fontSize: "11px", fontWeight: 600, cursor: "pointer",
                            fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px"
                        }}>
                        <X size={10} /> Clear filters
                    </button>
                </div>
            )}

            {/* ── Main ───────────────────────────────────────────────── */}
            <main style={{
                minHeight: "100vh", background: "#f6f8fa",
                padding: isMobile ? "12px" : "20px 24px",
                fontFamily: FONT, boxSizing: "border-box"
            }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

                    {/* Search + Sort row */}
                    <div style={{
                        display: "flex", gap: "8px", alignItems: "center",
                        marginBottom: "14px", flexWrap: isMobile ? "wrap" : "nowrap"
                    }}>
                        <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative", boxSizing: "border-box" }}>
                            <Search size={14} color={BLUE}
                                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isMobile ? "Search skills, domain…" : "Search for any skill, domain or name…"}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && searchQuery)
                                        handleSearch({ query: searchQuery });
                                }}
                                style={{
                                    width: "100%", padding: "10px 14px 10px 36px",
                                    border: "1px solid #e5e7eb", borderRadius: "10px",
                                    fontSize: "13px", color: "#374151", fontFamily: FONT,
                                    outline: "none", background: "white", boxSizing: "border-box",
                                    boxShadow: "0 1px 3px rgba(0,0,0,.04)"
                                }}
                                onFocus={(e) => (e.target.style.borderColor = BLUE)}
                                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto", boxSizing: "border-box" }}>
                            {!isMobile && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, whiteSpace: "nowrap" }}>Sort:</span>}
                            <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}
                                style={{
                                    flex: isMobile ? 1 : "none", border: "1px solid #e5e7eb",
                                    borderRadius: "8px", padding: "10px 30px 10px 12px",
                                    fontSize: "13px", color: "#374151", background: "white",
                                    cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
                                    minWidth: isMobile ? 0 : "180px", boxSizing: "border-box"
                                }}>
                                <option>Recommended</option>
                                <option>Price: Low To High</option>
                                <option>Price: High To Low</option>
                                <option>Most Experienced</option>
                            </select>
                            {isTablet && (
                                <button onClick={() => setFilterDrawerOpen(true)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "5px",
                                        padding: "10px 14px", border: `1.5px solid ${BLUE_BORDER}`,
                                        borderRadius: "8px", background: "white", cursor: "pointer",
                                        fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: BLUE,
                                        whiteSpace: "nowrap", flexShrink: 0
                                    }}>
                                    <SlidersHorizontal size={13} color={BLUE} /> Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Result count */}
                    {!isLoading && !isError && mentors.length > 0 && (
                        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px", fontWeight: 500 }}>
                            Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
                        </p>
                    )}

                    {/* Layout */}
                    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>

                            {isLoading && (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "50%",
                                        border: `3px solid ${BLUE_LIGHT}`, borderTopColor: BLUE,
                                        animation: "spin .8s linear infinite"
                                    }} />
                                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                                </div>
                            )}

                            {isError && !isLoading && (
                                <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
                                    <p style={{ fontWeight: 700, color: "#0f172a" }}>No Mentors Available</p>
                                    <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Please check back later</p>
                                </div>
                            )}

                            {!isLoading && !isError && searchEmpty && (
                                <div style={{ textAlign: "center", padding: "60px 0" }}>
                                    <p style={{ fontWeight: 700, color: "#0f172a" }}>No mentors match your filters</p>
                                </div>
                            )}

                            {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
                                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                    {mentors.map((mentor, index) => (
                                        <MentorCard
                                            key={mentor._id || index}
                                            mentor={mentor}
                                            index={index}
                                            onSubscribe={handleBookTrial}
                                            onViewProfile={handleViewProfile}
                                        />
                                    ))}
                                </div>
                            )}

                            {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
                                <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "14px", background: "white" }}>
                                    <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
                                    <p style={{ fontWeight: 700, color: "#0f172a" }}>No Mentors Available</p>
                                </div>
                            )}
                        </div>

                        {!isTablet && (
                            <FilterSidebar
                                onSearch={handleSearch}
                                isSearching={isSearching}
                                onClear={handleClear}
                                isFiltered={isFiltered}
                                isOpen={false}
                                onClose={() => { }}
                            />
                        )}
                    </div>
                </div>

                {isTablet && (
                    <FilterSidebar
                        onSearch={handleSearch}
                        isSearching={isSearching}
                        onClear={handleClear}
                        isFiltered={isFiltered}
                        isOpen={filterDrawerOpen}
                        onClose={() => setFilterDrawerOpen(false)}
                    />
                )}
            </main>

            {/* Subscribe panel overlay */}
            <AnimatePresence>
                {subscribeTarget && (
                    <>
                        <motion.div key="sub-overlay"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSubscribeTarget(null)}
                            style={{ position: "fixed", inset: 0, zIndex: 299, background: "rgba(0,0,0,.35)", backdropFilter: "blur(2px)" }} />
                        <SubscribePanel key="sub-panel" mentor={subscribeTarget} onClose={() => setSubscribeTarget(null)} />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}










