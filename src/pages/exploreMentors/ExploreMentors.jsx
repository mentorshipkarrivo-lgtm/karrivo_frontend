

// import { useState, useEffect } from "react";
// import { FaBriefcase, FaClock } from "react-icons/fa";
// import { MapPin, X, ChevronDown, ChevronUp, CheckCircle, Search, Pencil, Briefcase, Target, Building2, SlidersHorizontal } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useLocation } from "react-router-dom";
// import KarrivoLogo from "../../assets/KarrivoLogo.png";
// import {
//     useGetLtmAllMentorsQuery,
//     useSearchMentorMutation,
//     useAdvancedFilterMentorsMutation,
// } from "./exploreMentorsapislice";

// const link = document.createElement("link");
// link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
// link.rel = "stylesheet";
// document.head.appendChild(link);

// const BLUE = "#0098cc";
// const BLUE_LIGHT = "#f0faff";
// const BLUE_BORDER = "#cce9f5";
// const BLUE_DARK = "#007aaa";
// const FONT = "'Inter', sans-serif";

// const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

// const PLANS = [
//     { key: "1Month", label: "1 Month" },
//     { key: "3Month", label: "3 Months" },
//     { key: "6Month", label: "6 Months" },
// ];

// const PLAN_ALIASES = {
//     "1Month": ["1Month", "oneMonth", "1month", "one_month", "onemonth"],
//     "3Month": ["3Month", "threeMonths", "3month", "three_months", "threemonths", "3Months"],
//     "6Month": ["6Month", "sixMonths", "6month", "six_months", "sixmonths", "6Months"],
// };

// // ── FIXED: Return null if plan has no pricing ──
// function getPlanData(pricing, planKey) {
//     if (!pricing?.plans) return null;
//     const plans = pricing.plans;
//     for (const alias of (PLAN_ALIASES[planKey] || [planKey])) {
//         if (plans[alias] != null) {
//             const plan = plans[alias];
//             // Return null if both totalPrice and totalSessions are 0
//             if (plan.totalPrice === 0 && plan.totalSessions === 0) {
//                 return null;
//             }
//             return plan;
//         }
//     }
//     const norm = (s) => s.toLowerCase().replace(/[^0-9a-z]/g, "");
//     const found = Object.keys(plans).find(k => norm(k) === norm(planKey));
//     if (found) {
//         const plan = plans[found];
//         // Return null if both totalPrice and totalSessions are 0
//         if (plan.totalPrice === 0 && plan.totalSessions === 0) {
//             return null;
//         }
//         return plan;
//     }
//     return null;
// }

// const DOMAIN_CHIPS = [
//     "Frontend", "Backend", "Fullstack",
//     "DevOps / SRE / Cloud", "QA / Automation Testing",
//     "Data Scientist / AI/ML", "Data Analyst",
// ];

// const NAV_LINKS = [{ label: "Explore Mentors", path: "/explore-mentors" }];

// function toTitleCase(str) {
//     if (!str) return str;
//     return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
// }

// function useWindowWidth() {
//     const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
//     useEffect(() => {
//         const handler = () => setWidth(window.innerWidth);
//         window.addEventListener("resize", handler);
//         return () => window.removeEventListener("resize", handler);
//     }, []);
//     return width;
// }

// // ── SubscribePanel ─────────────────────────────────────────────────────────
// function SubscribePanel({ mentor, onClose }) {
//     const width = useWindowWidth();
//     const isMobile = width < 640;
//     const availability = Array.isArray(mentor.availability) ? mentor.availability : [];
//     const [selected, setSelected] = useState({});
//     const [openDay, setOpenDay] = useState(null);
//     const [planKey, setPlanKey] = useState("1Month");

//     const toggleSlot = (di, si) => {
//         const k = `${di}_${si}`;
//         setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
//     };

//     const selectedCount = Object.values(selected).filter(Boolean).length;
//     const planData = getPlanData(mentor.pricing, planKey);
//     const totalSessions = planData?.totalSessions ?? 0;
//     const totalPrice = planData?.totalPrice ?? 0;

//     const panelStyle = isMobile
//         ? { position: "fixed", bottom: 0, left: 0, right: 0, height: "85vh", width: "100%", background: "white", zIndex: 300, boxShadow: "0 -4px 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT, borderRadius: "20px 20px 0 0" }
//         : { position: "fixed", top: 0, right: 0, bottom: 0, width: "420px", maxWidth: "100vw", background: "white", zIndex: 300, boxShadow: "-4px 0 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT };

//     const motionProps = isMobile
//         ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
//         : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

//     return (
//         <motion.div {...motionProps} transition={{ type: "spring", damping: 28, stiffness: 300 }} style={panelStyle}>
//             {isMobile && <div style={{ width: "36px", height: "4px", background: "#e5e7eb", borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0 }} />}

//             {/* Panel header — white with blue accent border bottom */}
//             <div style={{ background: "white", borderBottom: `3px solid ${BLUE}`, padding: "20px 24px", flexShrink: 0 }}>
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
//                     <h2 style={{ color: BLUE, fontWeight: 800, fontSize: "17px", margin: 0 }}>Book A Free Trial</h2>
//                     <button onClick={onClose} style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, color: BLUE, borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <X size={16} />
//                     </button>
//                 </div>
//                 <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
//                     {toTitleCase(mentor.fullName)} · <span style={{ color: BLUE, fontWeight: 700 }}>{fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session</span>
//                 </p>
//             </div>

//             <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
//                 <p style={{ fontSize: "11px", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px" }}>Select Plan</p>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
//                     {PLANS.map((p) => {
//                         const sel = planKey === p.key;
//                         const pData = getPlanData(mentor.pricing, p.key);
//                         const planPrice = pData?.totalPrice ?? 0;
//                         const planSessions = mentor.pricing?.weeklySessions ?? 0;
//                         const isDisabled = !pData;
//                         return (
//                             <div key={p.key} onClick={() => !isDisabled && setPlanKey(p.key)} style={{ border: `1.5px solid ${sel ? BLUE : isDisabled ? "#f3f4f6" : "#e5e7eb"}`, borderRadius: "12px", padding: "14px 16px", background: isDisabled ? "#f9fafb" : "white", cursor: isDisabled ? "not-allowed" : "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: "12px", boxShadow: sel ? `0 0 0 3px ${BLUE_LIGHT}` : "none", opacity: isDisabled ? 0.6 : 1 }}>
//                                 <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                                     {sel && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: BLUE }} />}
//                                 </div>
//                                 <div style={{ flex: 1 }}>
//                                     <p style={{ fontWeight: 700, fontSize: "13px", color: sel ? BLUE : "#111827", margin: "0 0 2px" }}>{p.label}</p>
//                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{isDisabled ? "No plans available" : `${planSessions} sessions/week`}</p>
//                                 </div>
//                                 <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#374151", margin: 0 }}>{isDisabled ? "N/A" : fmtINR(planPrice)}</p>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {availability.length > 0 ? (
//                     <>
//                         <p style={{ fontSize: "11px", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px" }}>Select Availability Slots</p>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             {DAY_ORDER.map((day, di) => {
//                                 const dayData = availability.find((d) => d.day === day);
//                                 if (!dayData) return null;
//                                 const openSlots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
//                                 const isOpen = openDay === day;
//                                 const selectedInDay = openSlots.filter((_, si) => selected[`${di}_${si}`]).length;
//                                 return (
//                                     <div key={day} style={{ border: `1.5px solid ${selectedInDay ? BLUE : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", background: "white", transition: "all .15s" }}>
//                                         <button onClick={() => setOpenDay(isOpen ? null : day)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "transparent", border: "none", cursor: "pointer", fontFamily: FONT }}>
//                                             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                                                 <span style={{ fontWeight: 600, fontSize: "13px", color: selectedInDay ? BLUE : "#374151" }}>{day}</span>
//                                                 {selectedInDay > 0 && <span style={{ background: BLUE, color: "white", borderRadius: "20px", padding: "1px 8px", fontSize: "10px", fontWeight: 700 }}>{selectedInDay} selected</span>}
//                                             </div>
//                                             <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                                                 <span style={{ fontSize: "11px", color: "#9ca3af" }}>{openSlots.length} slots</span>
//                                                 {isOpen ? <ChevronUp size={14} color="#9ca3af" /> : <ChevronDown size={14} color="#9ca3af" />}
//                                             </div>
//                                         </button>
//                                         <AnimatePresence>
//                                             {isOpen && (
//                                                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .18 }} style={{ overflow: "hidden" }}>
//                                                     <div style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
//                                                         {openSlots.map((slot, si) => {
//                                                             const k = `${di}_${si}`;
//                                                             const isSel = !!selected[k];
//                                                             return (
//                                                                 <button key={slot._id} onClick={() => toggleSlot(di, si)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`, background: "white", cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
//                                                                     <span style={{ fontSize: "12px", fontWeight: 600, color: isSel ? BLUE : "#374151" }}>{slot.startTime} – {slot.endTime}</span>
//                                                                     {isSel ? <CheckCircle size={15} color={BLUE} /> : <div style={{ width: "15px", height: "15px", borderRadius: "50%", border: "1.5px solid #d1d5db" }} />}
//                                                                 </button>
//                                                             );
//                                                         })}
//                                                     </div>
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </>
//                 ) : (
//                     <div style={{ textAlign: "center", padding: "20px", background: "#fafafa", borderRadius: "10px", border: "1px dashed #e5e7eb" }}>
//                         <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>No Availability Slots Set Yet</p>
//                     </div>
//                 )}
//             </div>

//             <div style={{ borderTop: "1px solid #f0f0f0", padding: "16px 24px", background: "white", flexShrink: 0 }}>
//                 <div style={{ marginBottom: "12px" }}>
//                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>Total For {PLANS.find((p) => p.key === planKey)?.label}</p>
//                     <p style={{ fontSize: "26px", fontWeight: 800, color: BLUE, margin: 0 }}>{totalPrice > 0 ? fmtINR(totalPrice) : "N/A"}</p>
//                     {totalSessions > 0 && <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week</p>}
//                 </div>
//                 <button disabled={totalPrice === 0} style={{ width: "100%", padding: "13px", background: totalPrice === 0 ? "#d1d5db" : BLUE, cursor: totalPrice === 0 ? "not-allowed" : "pointer", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", fontFamily: FONT }}>
//                     {totalPrice === 0 ? "Plan Not Available" : `Subscribe — ${fmtINR(totalPrice)}`}
//                 </button>
//                 <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "11px", marginTop: "8px" }}>Secure Checkout · Cancel Anytime · 7-Day Refund Policy</p>
//             </div>
//         </motion.div>
//     );
// }

// // ── MentorCard ─────────────────────────────────────────────────────────────
// function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
//     const width = useWindowWidth();
//     const isMobile = width < 640;
//     const isTablet = width >= 640 && width < 1024;

//     const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
//         .split(",").map((s) => s.trim()).filter(Boolean);

//     const [activePlan, setActivePlan] = useState("1Month");
//     const [bioExpanded, setBioExpanded] = useState(false);

//     const planData = getPlanData(mentor.pricing, activePlan);
//     const planPrice = planData?.totalPrice ?? 0;
//     const weeklySessions = mentor.pricing?.weeklySessions ?? 0;
//     const hourlyRate = mentor.pricing?.hourlyRate ?? mentor.hourlyRate ?? 0;
//     const hasValidPlan = planData !== null;

//     const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
//     const BIO_LIMIT = isMobile ? 100 : isTablet ? 130 : 160;

//     const hasWork = mentor.currentRole || mentor.companyName;
//     const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Yrs` : null;
//     const languages = Array.isArray(mentor.languages) ? mentor.languages.join(", ") : mentor.languages || "";
//     const initials = (mentor.fullName || "M").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
//     const mentoringStyle = mentor.mentoringStyle ? toTitleCase(mentor.mentoringStyle) : null;
//     const fullName = toTitleCase(mentor.fullName || "Mentor");
//     const currentRole = toTitleCase(mentor.currentRole || "");
//     const companyName = toTitleCase(mentor.companyName || "");
//     const locationText = toTitleCase(mentor.location || "");

//     // White card with subtle gray border + blue hover
//     const cardBase = {
//         width: "100%",
//         border: "1px solid #e5e7eb",
//         borderRadius: "16px",
//         background: "#ffffff",
//         fontFamily: FONT,
//         overflow: "hidden",
//         boxSizing: "border-box",
//         transition: "box-shadow .2s, border-color .2s",
//         boxShadow: "0 1px 6px rgba(0,0,0,.06)",
//     };

//     const avatarCircle = (
//         <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//             <span style={{ fontWeight: 800, fontSize: "15px", color: BLUE }}>{initials}</span>
//         </div>
//     );

//     const badgeRow = (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//             {mentoringStyle && <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
//             {mentor.mentorCategory && <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{toTitleCase(mentor.mentorCategory)}</span>}
//             {yearsExp && <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp}</span>}
//         </div>
//     );

//     const planTabs = (
//         <div style={{ display: "flex", borderTop: "1px solid #f0f0f0" }}>
//             {PLANS.map((p) => {
//                 const isActive = activePlan === p.key;
//                 const pData = getPlanData(mentor.pricing, p.key);
//                 const isDisabled = !pData;
//                 return (
//                     <button key={p.key} onClick={() => !isDisabled && setActivePlan(p.key)} style={{ flex: 1, padding: "9px 4px", background: isActive ? BLUE_LIGHT : "white", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : isDisabled ? "#d1d5db" : "#9ca3af", fontSize: "12px", fontWeight: isActive ? 700 : 500, cursor: isDisabled ? "not-allowed" : "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px", opacity: isDisabled ? 0.5 : 1 }}>
//                         {p.label}
//                     </button>
//                 );
//             })}
//         </div>
//     );

//     // ── MOBILE ──────────────────────────────────────────────────────────────
//     if (isMobile) {
//         return (
//             <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} style={{ ...cardBase, display: "flex", flexDirection: "column" }}>
//                 <div style={{ padding: "14px 14px 10px" }}>
//                     <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
//                         {avatarCircle}
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                             <h2 style={{ fontWeight: 800, fontSize: "16px", color: "#0f172a", margin: "0 0 2px", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{fullName}</h2>
//                             {hasWork && <p style={{ fontSize: "11px", color: "#6b7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentRole}{currentRole && companyName ? " · " : ""}{companyName}</p>}
//                         </div>
//                         <div style={{ flexShrink: 0, textAlign: "right" }}>
//                             <span style={{ fontSize: "17px", fontWeight: 800, color: BLUE }}>{fmtINR(hourlyRate)}</span>
//                             <div style={{ fontSize: "10px", color: "#9ca3af" }}>/session</div>
//                         </div>
//                     </div>
//                     <div style={{ marginBottom: "8px" }}>{badgeRow}</div>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: bio ? "8px" : 0 }}>
//                         {locationText && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><MapPin size={10} color={BLUE} strokeWidth={2} />{locationText}</span>}
//                         {languages && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><Pencil size={10} color={BLUE} strokeWidth={2} />{languages}</span>}
//                     </div>
//                     {bio && (
//                         <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: "0 0 8px" }}>
//                             {bioExpanded ? bio : (bio.length > BIO_LIMIT ? bio.slice(0, BIO_LIMIT) + "…" : bio)}
//                             {bio.length > BIO_LIMIT && <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>{bioExpanded ? "Less" : "More"}</span>}
//                         </p>
//                     )}
//                 </div>
//                 {areas.length > 0 && (
//                     <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                         {areas.slice(0, 3).map((a, i) => <span key={i} style={{ fontSize: "10px", fontWeight: 500, padding: "3px 8px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #e5e7eb" }}>{toTitleCase(a)}</span>)}
//                         {areas.length > 3 && <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 3}</span>}
//                     </div>
//                 )}
//                 {planTabs}
//                 {hasValidPlan ? (
//                     <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafafa" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                             <FaClock size={11} color={BLUE} />
//                             <span style={{ fontSize: "12px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/wk</span>
//                         </div>
//                         <span style={{ fontSize: "15px", fontWeight: 800, color: BLUE }}>{fmtINR(planPrice)}</span>
//                     </div>
//                 ) : (
//                     <div style={{ padding: "10px 14px", textAlign: "center", background: "#fef3c7", borderTop: "1px solid #fbbf24" }}>
//                         <span style={{ fontSize: "12px", fontWeight: 600, color: "#92400e" }}>No Plans Available</span>
//                     </div>
//                 )}
//                 <div style={{ padding: "0 14px 14px" }}>
//                     <button onClick={() => onViewProfile(mentor)} style={{ width: "100%", padding: "11px", background: BLUE, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
//                         View Profile
//                     </button>
//                 </div>
//             </motion.article>
//         );
//     }

//     // ── TABLET ───────────────────────────────────────────────────────────────
//     if (isTablet) {
//         return (
//             <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} style={{ ...cardBase, display: "flex", flexDirection: "column" }}>
//                 <div style={{ padding: "18px 18px 0", display: "flex", gap: "12px" }}>
//                     {avatarCircle}
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
//                             <h2 style={{ fontWeight: 800, fontSize: "17px", color: "#0f172a", margin: 0, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fullName}</h2>
//                             <div style={{ flexShrink: 0, textAlign: "right" }}>
//                                 <span style={{ fontSize: "20px", fontWeight: 800, color: BLUE }}>{fmtINR(hourlyRate)}</span>
//                                 <span style={{ fontSize: "11px", color: "#9ca3af" }}>/session</span>
//                             </div>
//                         </div>
//                         <div style={{ marginBottom: "6px" }}>{badgeRow}</div>
//                         {hasWork && <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentRole}{currentRole && companyName ? " · " : ""}{companyName}</p>}
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//                             {locationText && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><MapPin size={11} color={BLUE} strokeWidth={2} />{locationText}</span>}
//                             {languages && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><Pencil size={11} color={BLUE} strokeWidth={2} />{languages}</span>}
//                         </div>
//                     </div>
//                 </div>
//                 {bio && (
//                     <div style={{ padding: "10px 18px 0" }}>
//                         <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.65", margin: 0, ...(bioExpanded ? {} : { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }) }}>{bio}</p>
//                         {bio.length > BIO_LIMIT && <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>{bioExpanded ? " Less" : " More"}</span>}
//                     </div>
//                 )}
//                 {areas.length > 0 && (
//                     <div style={{ padding: "10px 18px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                         {areas.slice(0, 4).map((a, i) => <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #e5e7eb" }}>{toTitleCase(a)}</span>)}
//                         {areas.length > 4 && <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 4}</span>}
//                     </div>
//                 )}
//                 <div style={{ marginTop: "auto" }}>
//                     {planTabs}
//                     {hasValidPlan ? (
//                         <div style={{ padding: "12px 18px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafafa" }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                                 <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#374151" }}>
//                                     <FaClock size={12} color={BLUE} /><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week
//                                 </span>
//                                 <span style={{ fontSize: "17px", fontWeight: 800, color: BLUE }}>{fmtINR(planPrice)} <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>total</span></span>
//                             </div>
//                             <button onClick={() => onViewProfile(mentor)} style={{ padding: "9px 18px", background: BLUE, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
//                                 View Profile
//                             </button>
//                         </div>
//                     ) : (
//                         <div style={{ padding: "12px 18px 16px", textAlign: "center", background: "#fef3c7", borderTop: "1px solid #fbbf24" }}>
//                             <span style={{ fontSize: "12px", fontWeight: 600, color: "#92400e" }}>No Plans Available</span>
//                             <button onClick={() => onViewProfile(mentor)} style={{ marginTop: "10px", width: "100%", padding: "9px 18px", background: BLUE, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
//                                 View Profile
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </motion.article>
//         );
//     }

//     // ── DESKTOP ───────────────────────────────────────────────────────────────
//     return (
//         <motion.article
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.05 }}
//             style={{ ...cardBase, display: "flex" }}
//             onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,152,204,.14)"; e.currentTarget.style.borderColor = BLUE_BORDER; }}
//             onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,.06)"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
//         >
//             {/* LEFT */}
//             <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", borderRight: "1px solid #f0f0f0" }}>
//                 <div style={{ padding: "22px 24px 16px", flex: 1 }}>
//                     <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
//                         <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                             <span style={{ fontWeight: 800, fontSize: "16px", color: BLUE }}>{initials}</span>
//                         </div>
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
//                                 <h2 style={{ fontWeight: 800, fontSize: "19px", color: "#0f172a", margin: 0 }}>{fullName}</h2>
//                                 {mentoringStyle && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
//                                 {mentor.mentorCategory && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{toTitleCase(mentor.mentorCategory)}</span>}
//                             </div>
//                             {hasWork && <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentRole}{currentRole && companyName ? " · " : ""}{companyName}</p>}
//                         </div>
//                     </div>

//                     <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
//                         {locationText && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><MapPin size={12} color={BLUE} strokeWidth={2} />{locationText}</span>}
//                         {languages && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><Pencil size={12} color={BLUE} strokeWidth={2} />{languages}</span>}
//                         {yearsExp && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><Building2 size={12} color={BLUE} strokeWidth={2} />{yearsExp} exp</span>}
//                     </div>

//                     {hasWork && (
//                         <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "12px", background: "white", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "7px 12px" }}>
//                             <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: BLUE, flexShrink: 0 }}>
//                                 {(mentor.companyName || "?").slice(0, 2).toUpperCase()}
//                             </div>
//                             <div>
//                                 <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{currentRole || "—"}</p>
//                                 <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{companyName || "—"}</p>
//                             </div>
//                             {yearsExp && (
//                                 <>
//                                     <span style={{ color: "#e5e7eb", fontSize: "18px", lineHeight: 1 }}>|</span>
//                                     <div>
//                                         <p style={{ fontSize: "12px", fontWeight: 700, color: BLUE, margin: 0 }}>{yearsExp}</p>
//                                         <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>Experience</p>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     )}

//                     {bio && (
//                         <div style={{ marginBottom: "12px" }}>
//                             <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.7", margin: 0, ...(bioExpanded ? {} : { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }) }}>{bio}</p>
//                             {bio.length > BIO_LIMIT && <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", fontSize: "12px", display: "inline-block", marginTop: "2px" }}>{bioExpanded ? "Show Less" : "Read More"}</span>}
//                         </div>
//                     )}

//                     {areas.length > 0 && (
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "12px" }}>
//                             {areas.slice(0, 4).map((a, i) => <span key={i} style={{ fontSize: "12px", fontWeight: 500, padding: "4px 12px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #e5e7eb" }}>{toTitleCase(a)}</span>)}
//                             {areas.length > 4 && <span style={{ fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}`, cursor: "pointer" }}>+{areas.length - 4} More</span>}
//                         </div>
//                     )}

//                     <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", fontSize: "12px" }}>
//                         {(mentor.targetAudience || mentor.forAudience) && (
//                             <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                                 <Briefcase size={12} color={BLUE} strokeWidth={2} />
//                                 <span style={{ color: "#9ca3af" }}>For:</span>{" "}
//                                 <span style={{ color: "#0f172a", fontWeight: 600 }}>{toTitleCase(mentor.targetAudience || mentor.forAudience)}</span>
//                             </span>
//                         )}
//                         {mentor.targetingDomains && (
//                             <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                                 <Target size={12} color={BLUE} strokeWidth={2} />
//                                 <span style={{ color: "#9ca3af" }}>Domains:</span>{" "}
//                                 <span style={{ color: "#0f172a", fontWeight: 600 }}>{toTitleCase(mentor.targetingDomains)}</span>
//                             </span>
//                         )}
//                         {!mentor.targetingDomains && (mentor.fieldOfStudy || mentor.highestDegree) && (
//                             <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                                 <Target size={12} color={BLUE} strokeWidth={2} />
//                                 <span style={{ color: "#9ca3af" }}>Field:</span>{" "}
//                                 <span style={{ color: "#0f172a", fontWeight: 600, textTransform: "capitalize" }}>{mentor.fieldOfStudy || ""}{mentor.fieldOfStudy && mentor.highestDegree ? " · " : ""}{mentor.highestDegree || ""}</span>
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* RIGHT — pricing panel, pure white */}
//             <div style={{ width: "260px", flexShrink: 0, display: "flex", flexDirection: "column", background: "white" }}>
//                 <div style={{ display: "flex", borderBottom: "1px solid #f0f0f0" }}>
//                     {PLANS.map((p) => {
//                         const isActive = activePlan === p.key;
//                         const pData = getPlanData(mentor.pricing, p.key);
//                         const isDisabled = !pData;
//                         return (
//                             <button key={p.key} onClick={() => !isDisabled && setActivePlan(p.key)} style={{ flex: 1, padding: "13px 4px", background: isActive ? BLUE_LIGHT : "white", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : isDisabled ? "#d1d5db" : "#9ca3af", fontSize: "12px", fontWeight: isActive ? 700 : 500, cursor: isDisabled ? "not-allowed" : "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px", opacity: isDisabled ? 0.5 : 1 }}>
//                                 {p.label}
//                             </button>
//                         );
//                     })}
//                 </div>
//                 <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                         <FaClock size={13} color={BLUE} />
//                         <span style={{ fontSize: "13px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong> Sessions/Week</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                         <FaBriefcase size={13} color={BLUE} />
//                         <span style={{ fontSize: "13px", color: "#374151" }}>Referrals In Top Companies</span>
//                     </div>
//                     <div style={{ marginTop: "4px" }}>
//                         <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "2px", fontWeight: 500 }}>Rate Per Session</div>
//                         <span style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
//                         <span style={{ fontSize: "12px", color: "#9ca3af" }}>/session</span>
//                     </div>
//                     {/* Plan total box — show only if valid plan */}
//                     {hasValidPlan ? (
//                         <div style={{ background: "white", border: `1.5px solid ${BLUE_BORDER}`, borderRadius: "10px", padding: "12px 14px" }}>
//                             <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "4px", fontWeight: 500 }}>Plan Total ({PLANS.find(p => p.key === activePlan)?.label})</div>
//                             <div style={{ fontSize: "22px", fontWeight: 800, color: BLUE }}>{fmtINR(planPrice)}</div>
//                         </div>
//                     ) : (
//                         <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: "10px", padding: "12px 14px", textAlign: "center" }}>
//                             <div style={{ fontSize: "12px", fontWeight: 600, color: "#92400e" }}>No Plans Available</div>
//                             {/* <div style={{ fontSize: "11px", color: "#b45309", marginTop: "2px" }}>Contact mentor for pricing</div> */}
//                         </div>
//                     )}
//                 </div>
//                 <div style={{ padding: "0 18px 18px" }}>
//                     <button
//                         onClick={() => onViewProfile(mentor)}
//                         style={{ width: "100%", padding: "12px", background: BLUE, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "background .15s" }}
//                         onMouseEnter={e => e.currentTarget.style.background = BLUE_DARK}
//                         onMouseLeave={e => e.currentTarget.style.background = BLUE}
//                     >
//                         View Profile
//                     </button>
//                 </div>
//             </div>
//         </motion.article>
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
//         setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

//     const handleClear = () => { setSelectedDomains([]); setPriceVal(7000); onClear(); };

//     const sidebarContent = (
//         <div style={{ width: isMobile ? "100%" : "280px", background: "white", borderRadius: isMobile ? 0 : "14px", padding: "20px", fontFamily: FONT, ...(isMobile ? {} : { border: "1px solid #e5e7eb", alignSelf: "flex-start", position: "sticky", top: "80px", flexShrink: 0, boxShadow: "0 1px 8px rgba(0,0,0,.06)" }), boxSizing: "border-box" }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
//                 <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a", margin: 0 }}>Filter By</h3>
//                 <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//                     <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
//                         <X size={12} /> Clear
//                     </button>
//                     {isMobile && <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex", alignItems: "center" }}><X size={18} /></button>}
//                 </div>
//             </div>

//             <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>Domain</p>
//             {selectedDomains.length > 0 && (
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center", border: `1px solid ${BLUE_BORDER}`, borderRadius: "8px", padding: "7px 9px", marginBottom: "10px", minHeight: "38px" }}>
//                     {selectedDomains.map((d) => (
//                         <span key={d} style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>
//                             {d}
//                             <button onClick={() => toggleDomain(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}><X size={10} /></button>
//                         </span>
//                     ))}
//                 </div>
//             )}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
//                 {DOMAIN_CHIPS.map((d) => {
//                     const active = selectedDomains.includes(d);
//                     return (
//                         <button key={d} onClick={() => toggleDomain(d)} style={{ fontSize: "11px", fontWeight: 500, padding: "5px 12px", borderRadius: "7px", background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151", border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
//                             {d}
//                         </button>
//                     );
//                 })}
//             </div>

//             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "18px" }} />
//             <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>Offering Mentorship For</p>
//             <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 32px 9px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxSizing: "border-box", marginBottom: "20px" }}>
//                 <option>Working Professionals</option>
//                 <option>Students</option>
//                 <option>Freshers</option>
//                 <option>Entrepreneurs</option>
//             </select>

//             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "18px" }} />
//             <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>Pricing</p>
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>
//                 <span>₹5,000</span><span>₹10,000</span>
//             </div>
//             <input type="range" min={5000} max={10000} step={500} value={priceVal} onChange={(e) => setPriceVal(Number(e.target.value))} style={{ width: "100%", accentColor: BLUE, cursor: "pointer", boxSizing: "border-box" }} />
//             <p style={{ fontSize: "13px", color: BLUE, fontWeight: 700, margin: "6px 0 0" }}>Up To {fmtINR(priceVal)}/Month</p>

//             <button onClick={() => { onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains }); if (isMobile) onClose(); }} disabled={isSearching} style={{ marginTop: "18px", width: "100%", padding: "12px", background: isSearching ? BLUE_BORDER : BLUE, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT, boxSizing: "border-box" }}>
//                 {isSearching ? "Applying…" : "Apply Filters"}
//             </button>
//         </div>
//     );

//     if (!isMobile) return sidebarContent;

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.3)", backdropFilter: "blur(2px)" }} />
//                     <motion.div key="drawer" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "85vh", zIndex: 201, background: "white", borderRadius: "20px 20px 0 0", overflowY: "auto" }}>
//                         <div style={{ width: "36px", height: "4px", background: "#e5e7eb", borderRadius: "2px", margin: "12px auto 0" }} />
//                         {sidebarContent}
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// }

// // ── Root ──────────────────────────────────────────────────────────────────
// export default function ExploreMentors() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const width = useWindowWidth();
//     const isMobile = width < 640;
//     const isTabletOrBelow = width < 1024;

//     const { data, isLoading, isError } = useGetLtmAllMentorsQuery();
//     const [searchMentors, { isLoading: isSearching }] = useSearchMentorMutation();
//     const [advancedFilter] = useAdvancedFilterMentorsMutation();

//     const allMentors = data?.data ?? [];
//     const [displayMentors, setDisplayMentors] = useState(null);
//     const [isFiltered, setIsFiltered] = useState(false);
//     const [searchEmpty, setSearchEmpty] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortBy, setSortBy] = useState("Recommended");
//     const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
//     const [mobileNavOpen, setMobileNavOpen] = useState(false);

//     const mentors = isFiltered ? (displayMentors || []) : allMentors;
//     const handleClear = () => { setIsFiltered(false); setDisplayMentors(null); setSearchEmpty(false); };

//     const handleSearch = async (body) => {
//         try {
//             const response = await searchMentors(body).unwrap();
//             const result = response?.data || [];
//             setDisplayMentors(result); setIsFiltered(true); setSearchEmpty(result.length === 0);
//         } catch { setDisplayMentors([]); setIsFiltered(true); setSearchEmpty(true); }
//     };

//     const handleSortChange = async (value) => {
//         setSortBy(value);
//         if (value === "Recommended") { handleClear(); return; }
//         const sortMap = { "Price: Low To High": { sortBy: "price", order: "asc" }, "Price: High To Low": { sortBy: "price", order: "desc" }, "Most Experienced": { sortBy: "experience", order: "desc" } };
//         const body = sortMap[value];
//         if (!body) return;
//         try {
//             const response = await advancedFilter(body).unwrap();
//             const result = response?.data || [];
//             setDisplayMentors(result); setIsFiltered(true); setSearchEmpty(result.length === 0);
//         } catch { setDisplayMentors([]); setIsFiltered(true); setSearchEmpty(true); }
//     };

//     const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor.userId}`);
//     const handleBookTrial = (mentor) => {
//         const isLoggedIn = !!localStorage.getItem("authToken");
//         if (!isLoggedIn) { navigate(`/login?mentorId=${mentor._id}`); return; }
//         navigate(`/book-session?mentorId=${mentor._id}`);
//     };

//     return (
//         <>
//             {/* Header — white */}
//             <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #e5e7eb", fontFamily: FONT, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
//                 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", height: "62px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}>
//                         <img src={KarrivoLogo} className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain" alt="Karrivo" />
//                     </div>
//                     {!isMobile && (
//                         <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
//                             {NAV_LINKS.map((link) => {
//                                 const isActive = location.pathname === link.path;
//                                 return (
//                                     <button key={link.path} onClick={() => navigate(link.path)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 600, color: isActive ? BLUE : "#6b7280", padding: "4px 0", borderBottom: isActive ? `2px solid ${BLUE}` : "2px solid transparent", transition: "all .15s" }}>
//                                         {link.label}
//                                     </button>
//                                 );
//                             })}
//                         </nav>
//                     )}
//                     {isMobile && (
//                         <button onClick={() => setMobileNavOpen(!mobileNavOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
//                             {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: "20px", height: "2px", background: BLUE, borderRadius: "2px", transition: "all .2s", ...(i === 0 && mobileNavOpen ? { transform: "rotate(45deg) translateY(7px)" } : i === 1 && mobileNavOpen ? { opacity: 0 } : i === 2 && mobileNavOpen ? { transform: "rotate(-45deg) translateY(-7px)" } : {}) }} />)}
//                         </button>
//                     )}
//                 </div>
//                 <AnimatePresence>
//                     {isMobile && mobileNavOpen && (
//                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderTop: "1px solid #f0f0f0", background: "white" }}>
//                             {NAV_LINKS.map((link) => (
//                                 <button key={link.path} onClick={() => { navigate(link.path); setMobileNavOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 600, color: location.pathname === link.path ? BLUE : "#374151", borderBottom: "1px solid #f9fafb" }}>
//                                     {link.label}
//                                 </button>
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </header>

//             {/* Main — very light gray page bg so white cards pop */}
//             <main style={{ minHeight: "100vh", background: "#f6f8fa", padding: isMobile ? "12px" : "20px", fontFamily: FONT, boxSizing: "border-box" }}>
//                 <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                     {/* Search + Sort */}
//                     <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "14px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
//                         <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative", boxSizing: "border-box" }}>
//                             <Search size={14} color={BLUE} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
//                             <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={isMobile ? "Search Skills, Domain..." : "Search For Any Skill, Domain Or Name..."}
//                                 onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
//                                 style={{ width: "100%", padding: "11px 14px 11px 36px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
//                                 onFocus={(e) => (e.target.style.borderColor = BLUE)}
//                                 onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                             />
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto", boxSizing: "border-box" }}>
//                             {!isMobile && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, whiteSpace: "nowrap" }}>Sort By:</span>}
//                             <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} style={{ flex: isMobile ? 1 : "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 30px 10px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", minWidth: isMobile ? 0 : "170px", boxSizing: "border-box" }}>
//                                 <option>Recommended</option>
//                                 <option>Price: Low To High</option>
//                                 <option>Price: High To Low</option>
//                                 <option>Most Experienced</option>
//                             </select>
//                             {isTabletOrBelow && (
//                                 <button onClick={() => setFilterDrawerOpen(true)} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px 14px", border: `1.5px solid ${BLUE_BORDER}`, borderRadius: "8px", background: "white", cursor: "pointer", fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: BLUE, whiteSpace: "nowrap", flexShrink: 0 }}>
//                                     <SlidersHorizontal size={13} color={BLUE} /> Filters
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {!isLoading && !isError && mentors.length > 0 && (
//                         <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px", fontWeight: 500 }}>
//                             Showing {mentors.length} Of {allMentors.length} Mentor{allMentors.length !== 1 ? "s" : ""}
//                         </p>
//                     )}

//                     <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                             {isLoading && (
//                                 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
//                                     <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `3px solid ${BLUE_LIGHT}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
//                                     <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//                                 </div>
//                             )}
//                             {isError && !isLoading && (
//                                 <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
//                                     <p style={{ fontWeight: 700, color: "#0f172a" }}>No Mentors Available</p>
//                                     <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Please Check Back Later</p>
//                                 </div>
//                             )}
//                             {!isLoading && !isError && searchEmpty && (
//                                 <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
//                                     <p style={{ fontWeight: 700, color: "#0f172a" }}>No Mentors Match Your Filters</p>
//                                     <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Try Adjusting Your Criteria</p>
//                                 </div>
//                             )}
//                             {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
//                                 <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
//                                     {mentors.map((mentor, index) => (
//                                         <MentorCard key={mentor._id || index} mentor={mentor} index={index} onSubscribe={handleBookTrial} onViewProfile={handleViewProfile} />
//                                     ))}
//                                 </div>
//                             )}
//                             {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
//                                 <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "14px", background: "white" }}>
//                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
//                                     <p style={{ fontWeight: 700, color: "#0f172a" }}>No Mentors Available</p>
//                                 </div>
//                             )}
//                         </div>
//                         {!isTabletOrBelow && (
//                             <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={false} onClose={() => { }} />
//                         )}
//                     </div>
//                 </div>
//                 {isTabletOrBelow && (
//                     <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} />
//                 )}
//             </main>
//         </>
//     );
// }
import { useState, useEffect } from "react";
import { FaBriefcase, FaClock } from "react-icons/fa";
import { MapPin, X, ChevronDown, ChevronUp, CheckCircle, Search, Pencil, Briefcase, Target, Building2, SlidersHorizontal, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import KarrivoLogo from "../../assets/KarrivoLogo.png";
import {
    useGetLtmAllMentorsQuery,
    useSearchMentorMutation,
    useAdvancedFilterMentorsMutation,
} from "./exploreMentorsapislice";

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const BLUE = "#0098cc";
const BLUE_LIGHT = "#f0faff";
const BLUE_BORDER = "#cce9f5";
const BLUE_DARK = "#007aaa";
const PRIMARY = "#1a1a2e";
const FONT = "'Inter', sans-serif";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

const PLANS = [
    { key: "1Month", label: "1 Month" },
    { key: "3Month", label: "3 Months" },
    { key: "6Month", label: "6 Months" },
];

const PLAN_ALIASES = {
    "1Month": ["1Month", "oneMonth", "1month", "one_month", "onemonth"],
    "3Month": ["3Month", "threeMonths", "3month", "three_months", "threemonths", "3Months"],
    "6Month": ["6Month", "sixMonths", "6month", "six_months", "sixmonths", "6Months"],
};

function getPlanData(pricing, planKey) {
    if (!pricing?.plans) return null;
    const plans = pricing.plans;
    for (const alias of (PLAN_ALIASES[planKey] || [planKey])) {
        if (plans[alias] != null) {
            const plan = plans[alias];
            if (plan.totalPrice === 0 && plan.totalSessions === 0) return null;
            return plan;
        }
    }
    const norm = (s) => s.toLowerCase().replace(/[^0-9a-z]/g, "");
    const found = Object.keys(plans).find(k => norm(k) === norm(planKey));
    if (found) {
        const plan = plans[found];
        if (plan.totalPrice === 0 && plan.totalSessions === 0) return null;
        return plan;
    }
    return null;
}

const DOMAIN_CHIPS = [
    "Frontend", "Backend", "Fullstack",
    "DevOps / SRE / Cloud", "QA / Automation Testing",
    "Data Scientist / AI/ML", "Data Analyst",
];

const NAV_LINKS = [{ label: "Explore Mentors", path: "/explore-mentors" }];

function toTitleCase(str) {
    if (!str) return str;
    return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return width;
}

// ── SubscribePanel ─────────────────────────────────────────────────────────
function SubscribePanel({ mentor, onClose }) {
    const width = useWindowWidth();
    const isMobile = width < 640;
    const availability = Array.isArray(mentor.availability) ? mentor.availability : [];
    const [selected, setSelected] = useState({});
    const [openDay, setOpenDay] = useState(null);
    const [planKey, setPlanKey] = useState("1Month");

    const toggleSlot = (di, si) => {
        const k = `${di}_${si}`;
        setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
    };

    const selectedCount = Object.values(selected).filter(Boolean).length;
    const planData = getPlanData(mentor.pricing, planKey);
    const totalSessions = planData?.totalSessions ?? 0;
    const totalPrice = planData?.totalPrice ?? 0;

    const panelStyle = isMobile
        ? { position: "fixed", bottom: 0, left: 0, right: 0, height: "85vh", width: "100%", background: "white", zIndex: 300, boxShadow: "0 -4px 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT, borderRadius: "20px 20px 0 0" }
        : { position: "fixed", top: 0, right: 0, bottom: 0, width: "420px", maxWidth: "100vw", background: "white", zIndex: 300, boxShadow: "-4px 0 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT };

    const motionProps = isMobile
        ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
        : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

    return (
        <motion.div {...motionProps} transition={{ type: "spring", damping: 28, stiffness: 300 }} style={panelStyle}>
            {isMobile && <div style={{ width: "36px", height: "4px", background: "#e5e7eb", borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0 }} />}

            <div style={{ background: "white", borderBottom: `3px solid ${BLUE}`, padding: "20px 24px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <h2 style={{ color: BLUE, fontWeight: 800, fontSize: "17px", margin: 0 }}>Book A Free Trial</h2>
                    <button onClick={onClose} style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, color: BLUE, borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={16} />
                    </button>
                </div>
                <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
                    {toTitleCase(mentor.fullName)} · <span style={{ color: BLUE, fontWeight: 700 }}>{fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session</span>
                </p>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px" }}>Select Plan</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {PLANS.map((p) => {
                        const sel = planKey === p.key;
                        const pData = getPlanData(mentor.pricing, p.key);
                        const planPrice = pData?.totalPrice ?? 0;
                        const planSessions = mentor.pricing?.weeklySessions ?? 0;
                        const isDisabled = !pData;
                        return (
                            <div key={p.key} onClick={() => !isDisabled && setPlanKey(p.key)} style={{ border: `1.5px solid ${sel ? BLUE : isDisabled ? "#f3f4f6" : "#e5e7eb"}`, borderRadius: "12px", padding: "14px 16px", background: isDisabled ? "#f9fafb" : "white", cursor: isDisabled ? "not-allowed" : "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: "12px", boxShadow: sel ? `0 0 0 3px ${BLUE_LIGHT}` : "none", opacity: isDisabled ? 0.6 : 1 }}>
                                <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    {sel && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: BLUE }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, fontSize: "13px", color: sel ? BLUE : "#111827", margin: "0 0 2px" }}>{p.label}</p>
                                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{isDisabled ? "No plans available" : `${planSessions} sessions/week`}</p>
                                </div>
                                <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#374151", margin: 0 }}>{isDisabled ? "N/A" : fmtINR(planPrice)}</p>
                            </div>
                        );
                    })}
                </div>

                {availability.length > 0 ? (
                    <>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "10px" }}>Select Availability Slots</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {DAY_ORDER.map((day, di) => {
                                const dayData = availability.find((d) => d.day === day);
                                if (!dayData) return null;
                                const openSlots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
                                const isOpen = openDay === day;
                                const selectedInDay = openSlots.filter((_, si) => selected[`${di}_${si}`]).length;
                                return (
                                    <div key={day} style={{ border: `1.5px solid ${selectedInDay ? BLUE : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", background: "white", transition: "all .15s" }}>
                                        <button onClick={() => setOpenDay(isOpen ? null : day)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "transparent", border: "none", cursor: "pointer", fontFamily: FONT }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={{ fontWeight: 600, fontSize: "13px", color: selectedInDay ? BLUE : "#374151" }}>{day}</span>
                                                {selectedInDay > 0 && <span style={{ background: BLUE, color: "white", borderRadius: "20px", padding: "1px 8px", fontSize: "10px", fontWeight: 700 }}>{selectedInDay} selected</span>}
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                <span style={{ fontSize: "11px", color: "#9ca3af" }}>{openSlots.length} slots</span>
                                                {isOpen ? <ChevronUp size={14} color="#9ca3af" /> : <ChevronDown size={14} color="#9ca3af" />}
                                            </div>
                                        </button>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .18 }} style={{ overflow: "hidden" }}>
                                                    <div style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                                        {openSlots.map((slot, si) => {
                                                            const k = `${di}_${si}`;
                                                            const isSel = !!selected[k];
                                                            return (
                                                                <button key={slot._id} onClick={() => toggleSlot(di, si)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`, background: "white", cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
                                                                    <span style={{ fontSize: "12px", fontWeight: 600, color: isSel ? BLUE : "#374151" }}>{slot.startTime} – {slot.endTime}</span>
                                                                    {isSel ? <CheckCircle size={15} color={BLUE} /> : <div style={{ width: "15px", height: "15px", borderRadius: "50%", border: "1.5px solid #d1d5db" }} />}
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
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px", background: "#fafafa", borderRadius: "10px", border: "1px dashed #e5e7eb" }}>
                        <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>No Availability Slots Set Yet</p>
                    </div>
                )}
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", padding: "16px 24px", background: "white", flexShrink: 0 }}>
                <div style={{ marginBottom: "12px" }}>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>Total For {PLANS.find((p) => p.key === planKey)?.label}</p>
                    <p style={{ fontSize: "26px", fontWeight: 800, color: BLUE, margin: 0 }}>{totalPrice > 0 ? fmtINR(totalPrice) : "N/A"}</p>
                    {totalSessions > 0 && <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week</p>}
                </div>
                <button disabled={totalPrice === 0} style={{ width: "100%", padding: "13px", background: totalPrice === 0 ? "#d1d5db" : PRIMARY, cursor: totalPrice === 0 ? "not-allowed" : "pointer", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", fontFamily: FONT }}>
                    {totalPrice === 0 ? "Plan Not Available" : `Subscribe — ${fmtINR(totalPrice)}`}
                </button>
                <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "11px", marginTop: "8px" }}>Secure Checkout · Cancel Anytime · 7-Day Refund Policy</p>
            </div>
        </motion.div>
    );
}

// ── MentorCard ─────────────────────────────────────────────────────────────
function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
    const width = useWindowWidth();
    const isMobile = width < 640;

    const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
        .split(",").map((s) => s.trim()).filter(Boolean);

    const [activePlan, setActivePlan] = useState("1Month");
    const [bioExpanded, setBioExpanded] = useState(false);

    const planData = getPlanData(mentor.pricing, activePlan);
    const planPrice = planData?.totalPrice ?? 0;
    const weeklySessions = mentor.pricing?.weeklySessions ?? 0;
    const hourlyRate = mentor.pricing?.hourlyRate ?? mentor.hourlyRate ?? 0;
    const hasValidPlan = planData !== null;

    const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
    const BIO_LIMIT = isMobile ? 90 : 140;

    const hasWork = mentor.currentRole || mentor.companyName;
    const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Years` : null;
    const languages = Array.isArray(mentor.languages) ? mentor.languages.join(", ") : mentor.languages || "";
    const initials = (mentor.fullName || "M").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const mentoringStyle = mentor.mentoringStyle ? toTitleCase(mentor.mentoringStyle) : null;
    const fullName = toTitleCase(mentor.fullName || "Mentor");
    const currentRole = toTitleCase(mentor.currentRole || "");
    const companyName = toTitleCase(mentor.companyName || "");
    const locationText = toTitleCase(mentor.location || "");
    const hasPhoto = !!mentor.profilePhoto;
    const rating = mentor.rating ?? 5;

    const cardBase = {
        width: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        background: "#ffffff",
        fontFamily: FONT,
        overflow: "hidden",
        boxSizing: "border-box",
        transition: "box-shadow .2s, border-color .2s",
        boxShadow: "0 1px 6px rgba(0,0,0,.06)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: isMobile ? "auto" : "240px",
    };

    // ── PHOTO PANEL (left half) ──────────────────────────────────────────
    const photoPanel = (
        <div style={{
            width: isMobile ? "100%" : "42%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            minHeight: isMobile ? "200px" : "auto",
            background: hasPhoto ? "#0f172a" : `linear-gradient(145deg, ${PRIMARY} 0%, #16213e 60%, #0098cc22 100%)`,
            borderRadius: isMobile ? "16px 16px 0 0" : "16px 0 0 16px",
        }}>
            {/* Photo or initials */}
            {hasPhoto ? (
                <img
                    src={mentor.profilePhoto}
                    alt={fullName}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.92 }}
                />
            ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: isMobile ? "200px" : "240px" }}>
                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontWeight: 800, fontSize: "26px", color: "#fff" }}>{initials}</span>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.75)", textAlign: "center", padding: "0 12px" }}>{fullName}</span>
                </div>
            )}

            {/* Dark gradient overlay at bottom for text legibility */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%)", pointerEvents: "none" }} />

            {/* Rating pill — top left */}
            <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(255,255,255,0.92)", borderRadius: "20px", padding: "3px 10px", display: "flex", alignItems: "center", gap: "4px" }}>
                <Star size={11} style={{ fill: "#f59e0b", color: "#f59e0b" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#111827" }}>{rating.toFixed(1)}</span>
            </div>

            {/* Mentoring style pill — top right */}
            {mentoringStyle && (
                <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,152,204,0.88)", borderRadius: "20px", padding: "3px 10px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#fff" }}>{mentoringStyle}</span>
                </div>
            )}

            {/* Bottom strip — name + role */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 14px" }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: "#fff", margin: "0 0 2px", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{fullName}</p>
                {hasWork && (
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {currentRole}{currentRole && companyName ? " · " : ""}{companyName}
                    </p>
                )}
            </div>
        </div>
    );

    // ── RIGHT INFO PANEL ─────────────────────────────────────────────────
    const infoPanel = (
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            {/* Top info area */}
            <div style={{ padding: "14px 16px 10px", flex: 1 }}>
                {/* Rate + badges row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {mentor.mentorCategory && (
                            <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                                {toTitleCase(mentor.mentorCategory)}
                            </span>
                        )}
                        {/* {yearsExp && (
                            <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>
                                {yearsExp}
                            </span>
                        )} */}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: "8px" }}>
                        <span style={{ fontSize: "18px", fontWeight: 800, color: PRIMARY }}>{fmtINR(hourlyRate)}</span>
                        <span style={{ fontSize: "10px", color: "#9ca3af", marginLeft: "2px" }}>/session</span>
                    </div>
                </div>

                {/* Meta row — location, languages */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
                    {locationText && (
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
                            <MapPin size={10} color={BLUE} strokeWidth={2} />{locationText}
                        </span>
                    )}
                    {languages && (
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
                            <Pencil size={10} color={BLUE} strokeWidth={2} />{languages}
                        </span>
                    )}
                    {yearsExp && (
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
                            <Building2 size={10} color={BLUE} strokeWidth={2} />{yearsExp} experience 
                        </span>
                    )}
                </div>

                {/* Bio */}
                {bio && (
                    <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: "0 0 8px" }}>
                        {bioExpanded ? bio : (bio.length > BIO_LIMIT ? bio.slice(0, BIO_LIMIT) + "…" : bio)}
                        {bio.length > BIO_LIMIT && (
                            <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
                                {bioExpanded ? "Less" : "More"}
                            </span>
                        )}
                    </p>
                )}

                {/* Skill tags */}
                {areas.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
                        {areas.slice(0, 3).map((a, i) => (
                            <span key={i} style={{ fontSize: "10px", fontWeight: 500, padding: "3px 8px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #e5e7eb" }}>
                                {toTitleCase(a)}
                            </span>
                        ))}
                        {areas.length > 3 && (
                            <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>
                                +{areas.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Audience / domain info */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "11px" }}>
                    {(mentor.targetAudience || mentor.forAudience) && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Briefcase size={10} color={BLUE} strokeWidth={2} />
                            <span style={{ color: "#9ca3af" }}>For:</span>{" "}
                            <span style={{ color: "#0f172a", fontWeight: 600 }}>{toTitleCase(mentor.targetAudience || mentor.forAudience)}</span>
                        </span>
                    )}
                    {mentor.targetingDomains && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Target size={10} color={BLUE} strokeWidth={2} />
                            <span style={{ color: "#9ca3af" }}>Domain:</span>{" "}
                            <span style={{ color: "#0f172a", fontWeight: 600 }}>{toTitleCase(mentor.targetingDomains)}</span>
                        </span>
                    )}
                    {!mentor.targetingDomains && (mentor.fieldOfStudy || mentor.highestDegree) && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Target size={10} color={BLUE} strokeWidth={2} />
                            <span style={{ color: "#9ca3af" }}>Field:</span>{" "}
                            <span style={{ color: "#0f172a", fontWeight: 600, textTransform: "capitalize" }}>
                                {mentor.fieldOfStudy || ""}{mentor.fieldOfStudy && mentor.highestDegree ? " · " : ""}{mentor.highestDegree || ""}
                            </span>
                        </span>
                    )}
                </div>
            </div>

            {/* Plan tabs */}
            <div style={{ display: "flex", borderTop: "1px solid #f0f0f0" }}>
                {PLANS.map((p) => {
                    const isActive = activePlan === p.key;
                    const pData = getPlanData(mentor.pricing, p.key);
                    const isDisabled = !pData;
                    return (
                        <button
                            key={p.key}
                            onClick={() => !isDisabled && setActivePlan(p.key)}
                            style={{ flex: 1, padding: "8px 4px", background: isActive ? BLUE_LIGHT : "white", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : isDisabled ? "#d1d5db" : "#9ca3af", fontSize: "11px", fontWeight: isActive ? 700 : 500, cursor: isDisabled ? "not-allowed" : "pointer", fontFamily: FONT, transition: "all .15s", opacity: isDisabled ? 0.5 : 1 }}
                        >
                            {p.label}
                        </button>
                    );
                })}
            </div>

            {/* Plan price row */}
            {hasValidPlan ? (
                <div style={{ padding: "9px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <FaClock size={11} color={BLUE} />
                        <span style={{ fontSize: "12px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/wk</span>
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: 800, color: BLUE }}>{fmtINR(planPrice)}</span>
                </div>
            ) : (
                <div style={{ padding: "9px 16px", textAlign: "center", background: "#fef3c7", borderTop: "1px solid #fbbf24" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#92400e" }}>No Plans Available</span>
                </div>
            )}

            {/* View Profile button */}
            <div style={{ padding: "10px 16px 14px" }}>
                <button
                    onClick={() => onViewProfile(mentor)}
                    style={{ width: "100%", padding: "10px", background: PRIMARY, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT, transition: "background .15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#2d2d4e"}
                    onMouseLeave={e => e.currentTarget.style.background = PRIMARY}
                >
                    View Profile
                </button>
            </div>
        </div>
    );

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={cardBase}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,152,204,.13)"; e.currentTarget.style.borderColor = BLUE_BORDER; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,.06)"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
        >
            {photoPanel}
            {infoPanel}
        </motion.article>
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
        setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

    const handleClear = () => { setSelectedDomains([]); setPriceVal(7000); onClear(); };

    const sidebarContent = (
        <div style={{ width: isMobile ? "100%" : "260px", background: "white", borderRadius: isMobile ? 0 : "14px", padding: "20px", fontFamily: FONT, ...(isMobile ? {} : { border: "1px solid #e5e7eb", alignSelf: "flex-start", position: "sticky", top: "80px", flexShrink: 0, boxShadow: "0 1px 8px rgba(0,0,0,.06)" }), boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a", margin: 0 }}>Filter By</h3>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
                        <X size={12} /> Clear
                    </button>
                    {isMobile && <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex", alignItems: "center" }}><X size={18} /></button>}
                </div>
            </div>

            <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>Domain</p>
            {selectedDomains.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center", border: `1px solid ${BLUE_BORDER}`, borderRadius: "8px", padding: "7px 9px", marginBottom: "10px", minHeight: "38px" }}>
                    {selectedDomains.map((d) => (
                        <span key={d} style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>
                            {d}
                            <button onClick={() => toggleDomain(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}><X size={10} /></button>
                        </span>
                    ))}
                </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {DOMAIN_CHIPS.map((d) => {
                    const active = selectedDomains.includes(d);
                    return (
                        <button key={d} onClick={() => toggleDomain(d)} style={{ fontSize: "11px", fontWeight: 500, padding: "5px 12px", borderRadius: "7px", background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151", border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
                            {d}
                        </button>
                    );
                })}
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "18px" }} />
            <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>Offering Mentorship For</p>
            <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 32px 9px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxSizing: "border-box", marginBottom: "20px" }}>
                <option>Working Professionals</option>
                <option>Students</option>
                <option>Freshers</option>
                <option>Entrepreneurs</option>
            </select>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "18px" }} />
            <p style={{ fontWeight: 700, fontSize: "11px", color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>Pricing</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>
                <span>₹5,000</span><span>₹10,000</span>
            </div>
            <input type="range" min={5000} max={10000} step={500} value={priceVal} onChange={(e) => setPriceVal(Number(e.target.value))} style={{ width: "100%", accentColor: BLUE, cursor: "pointer", boxSizing: "border-box" }} />
            <p style={{ fontSize: "13px", color: BLUE, fontWeight: 700, margin: "6px 0 0" }}>Up To {fmtINR(priceVal)}/Month</p>

            <button onClick={() => { onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains }); if (isMobile) onClose(); }} disabled={isSearching} style={{ marginTop: "18px", width: "100%", padding: "12px", background: isSearching ? BLUE_BORDER : PRIMARY, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT, boxSizing: "border-box" }}>
                {isSearching ? "Applying…" : "Apply Filters"}
            </button>
        </div>
    );

    if (!isMobile) return sidebarContent;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.3)", backdropFilter: "blur(2px)" }} />
                    <motion.div key="drawer" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "85vh", zIndex: 201, background: "white", borderRadius: "20px 20px 0 0", overflowY: "auto" }}>
                        <div style={{ width: "36px", height: "4px", background: "#e5e7eb", borderRadius: "2px", margin: "12px auto 0" }} />
                        {sidebarContent}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ── Root ──────────────────────────────────────────────────────────────────
export default function ExploreMentors() {
    const navigate = useNavigate();
    const location = useLocation();
    const width = useWindowWidth();
    const isMobile = width < 640;
    const isTabletOrBelow = width < 1024;

    const { data, isLoading, isError } = useGetLtmAllMentorsQuery();
    const [searchMentors, { isLoading: isSearching }] = useSearchMentorMutation();
    const [advancedFilter] = useAdvancedFilterMentorsMutation();

    const allMentors = data?.data ?? [];
    const [displayMentors, setDisplayMentors] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [searchEmpty, setSearchEmpty] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Recommended");
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const mentors = isFiltered ? (displayMentors || []) : allMentors;
    const handleClear = () => { setIsFiltered(false); setDisplayMentors(null); setSearchEmpty(false); };

    const handleSearch = async (body) => {
        try {
            const response = await searchMentors(body).unwrap();
            const result = response?.data || [];
            setDisplayMentors(result); setIsFiltered(true); setSearchEmpty(result.length === 0);
        } catch { setDisplayMentors([]); setIsFiltered(true); setSearchEmpty(true); }
    };

    const handleSortChange = async (value) => {
        setSortBy(value);
        if (value === "Recommended") { handleClear(); return; }
        const sortMap = { "Price: Low To High": { sortBy: "price", order: "asc" }, "Price: High To Low": { sortBy: "price", order: "desc" }, "Most Experienced": { sortBy: "experience", order: "desc" } };
        const body = sortMap[value];
        if (!body) return;
        try {
            const response = await advancedFilter(body).unwrap();
            const result = response?.data || [];
            setDisplayMentors(result); setIsFiltered(true); setSearchEmpty(result.length === 0);
        } catch { setDisplayMentors([]); setIsFiltered(true); setSearchEmpty(true); }
    };

    const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor.userId}`);
    const handleBookTrial = (mentor) => {
        const isLoggedIn = !!localStorage.getItem("authToken");
        if (!isLoggedIn) { navigate(`/login?mentorId=${mentor._id}`); return; }
        navigate(`/book-session?mentorId=${mentor._id}`);
    };

    return (
        <>
            {/* Header */}
            <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #e5e7eb", fontFamily: FONT, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", height: "62px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}>
                        <img src={KarrivoLogo} className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain" alt="Karrivo" />
                    </div>
                    {!isMobile && (
                        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                            {NAV_LINKS.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <button key={link.path} onClick={() => navigate(link.path)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 600, color: isActive ? BLUE : "#6b7280", padding: "4px 0", borderBottom: isActive ? `2px solid ${BLUE}` : "2px solid transparent", transition: "all .15s" }}>
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    )}
                    {isMobile && (
                        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
                            {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: "20px", height: "2px", background: BLUE, borderRadius: "2px", transition: "all .2s", ...(i === 0 && mobileNavOpen ? { transform: "rotate(45deg) translateY(7px)" } : i === 1 && mobileNavOpen ? { opacity: 0 } : i === 2 && mobileNavOpen ? { transform: "rotate(-45deg) translateY(-7px)" } : {}) }} />)}
                        </button>
                    )}
                </div>
                <AnimatePresence>
                    {isMobile && mobileNavOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderTop: "1px solid #f0f0f0", background: "white" }}>
                            {NAV_LINKS.map((link) => (
                                <button key={link.path} onClick={() => { navigate(link.path); setMobileNavOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 600, color: location.pathname === link.path ? BLUE : "#374151", borderBottom: "1px solid #f9fafb" }}>
                                    {link.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Main */}
            <main style={{ minHeight: "100vh", background: "#f6f8fa", padding: isMobile ? "12px" : "20px", fontFamily: FONT, boxSizing: "border-box" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    {/* Search + Sort bar */}
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "14px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                        <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative", boxSizing: "border-box" }}>
                            <Search size={14} color={BLUE} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isMobile ? "Search Skills, Domain..." : "Search For Any Skill, Domain Or Name..."}
                                onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
                                style={{ width: "100%", padding: "11px 14px 11px 36px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
                                onFocus={(e) => (e.target.style.borderColor = BLUE)}
                                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto", boxSizing: "border-box" }}>
                            {!isMobile && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, whiteSpace: "nowrap" }}>Sort By:</span>}
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                style={{ flex: isMobile ? 1 : "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 30px 10px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%230098cc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", minWidth: isMobile ? 0 : "170px", boxSizing: "border-box" }}
                            >
                                <option>Recommended</option>
                                <option>Price: Low To High</option>
                                <option>Price: High To Low</option>
                                <option>Most Experienced</option>
                            </select>
                            {isTabletOrBelow && (
                                <button onClick={() => setFilterDrawerOpen(true)} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px 14px", border: `1.5px solid ${BLUE_BORDER}`, borderRadius: "8px", background: "white", cursor: "pointer", fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: BLUE, whiteSpace: "nowrap", flexShrink: 0 }}>
                                    <SlidersHorizontal size={13} color={BLUE} /> Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {!isLoading && !isError && mentors.length > 0 && (
                        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px", fontWeight: 500 }}>
                            Showing {mentors.length} Of {allMentors.length} Mentor{allMentors.length !== 1 ? "s" : ""}
                        </p>
                    )}

                    <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {isLoading && (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `3px solid ${BLUE_LIGHT}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
                                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                                </div>
                            )}
                            {isError && !isLoading && (
                                <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
                                    <p style={{ fontWeight: 700, color: "#0f172a" }}>No Mentors Available</p>
                                    <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Please Check Back Later</p>
                                </div>
                            )}
                            {!isLoading && !isError && searchEmpty && (
                                <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
                                    <p style={{ fontWeight: 700, color: "#0f172a" }}>No Mentors Match Your Filters</p>
                                    <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Try Adjusting Your Criteria</p>
                                </div>
                            )}
                            {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
                                <div style={{ display: "grid", gridTemplateColumns: isTabletOrBelow ? "1fr" : "repeat(1, 1fr)", gap: "16px" }}>
                                    {mentors.map((mentor, index) => (
                                        <MentorCard key={mentor._id || index} mentor={mentor} index={index} onSubscribe={handleBookTrial} onViewProfile={handleViewProfile} />
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
                        {!isTabletOrBelow && (
                            <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={false} onClose={() => { }} />
                        )}
                    </div>
                </div>
                {isTabletOrBelow && (
                    <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} />
                )}
            </main>
        </>
    );
}

