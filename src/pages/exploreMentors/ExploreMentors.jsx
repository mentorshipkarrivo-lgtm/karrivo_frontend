
// // import { useState } from "react";
// // import { FaBriefcase, FaClock } from "react-icons/fa";
// // import { MapPin, Users, X, ChevronDown, ChevronUp, CheckCircle, Search, Pencil, Briefcase, Target, Building2 } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import {
// //     useGetLtmAllMentorsQuery,
// //     useSearchMentorMutation,
// //     useAdvancedFilterMentorsMutation,
// // } from "./exploreMentorsapislice";
// // import Loader from "../../global/Loader";

// // const link = document.createElement("link");
// // link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
// // link.rel = "stylesheet";
// // document.head.appendChild(link);

// // const BLUE = "#2563eb";
// // const BLUE_LIGHT = "#eff6ff";
// // const BLUE_BORDER = "#bfdbfe";
// // const FONT = "'Inter', sans-serif";

// // const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// // const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

// // const PLANS = [
// //     { key: "sixMonths", label: "6 Months" },
// //     { key: "threeMonths", label: "3 Months" },
// //     { key: "oneMonth", label: "1 Month" },
// // ];

// // const DOMAIN_CHIPS = [
// //     "Frontend", "Backend", "Fullstack",
// //     "DevOps / SRE / Cloud", "QA / Automation Testing",
// //     "Data Scientist / AI/ML", "Data Analyst",
// // ];

// // const NAV_LINKS = [
// //     { label: "Explore Mentors", path: "/explore-mentors" },
// //     { label: "AI Mentors", path: "/ai-mentors" },
// //     { label: "Success Stories", path: "/success-stories" },
// // ];

// // // ── Subscribe Panel ──────────────────────────────────────────────────────────
// // function SubscribePanel({ mentor, onClose }) {
// //     const availability = mentor.availability ?? [];
// //     const [selected, setSelected] = useState({});
// //     const [openDay, setOpenDay] = useState(null);
// //     const [planKey, setPlanKey] = useState("oneMonth");

// //     const toggleSlot = (di, si) => {
// //         const k = `${di}_${si}`;
// //         setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
// //     };

// //     const selectedCount = Object.values(selected).filter(Boolean).length;
// //     const totalSessions = mentor.pricing?.plans?.[planKey]?.totalSessions ?? 0;
// //     const totalPrice = mentor.pricing?.plans?.[planKey]?.totalPrice ?? 0;

// //     return (
// //         <motion.div
// //             initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
// //             transition={{ type: "spring", damping: 28, stiffness: 300 }}
// //             style={{
// //                 position: "fixed", top: 0, right: 0, bottom: 0,
// //                 width: "420px", maxWidth: "100vw",
// //                 background: "white", zIndex: 300,
// //                 boxShadow: "-8px 0 40px rgba(0,0,0,.15)",
// //                 display: "flex", flexDirection: "column", fontFamily: FONT,
// //             }}
// //         >
// //             <div style={{ background: BLUE, padding: "20px 24px", flexShrink: 0 }}>
// //                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
// //                     <h2 style={{ color: "white", fontWeight: 700, fontSize: "16px", margin: 0 }}>Subscribe to Mentor</h2>
// //                     <button onClick={onClose} style={{ background: "rgba(255,255,255,.15)", border: "none", color: "white", borderRadius: "8px", width: "30px", height: "30px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                         <X size={16} />
// //                     </button>
// //                 </div>
// //                 <p style={{ color: "rgba(255,255,255,.75)", fontSize: "13px", margin: 0 }}>
// //                     {mentor.fullName} · {fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session
// //                 </p>
// //             </div>

// //             <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
// //                 <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Plan</p>
// //                 <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
// //                     {PLANS.map((p) => {
// //                         const sel = planKey === p.key;
// //                         const planPrice = mentor.pricing?.plans?.[p.key]?.totalPrice ?? 0;
// //                         const planSessions = mentor.pricing?.weeklySessions ?? 0;
// //                         return (
// //                             <div key={p.key} onClick={() => setPlanKey(p.key)} style={{ border: `2px solid ${sel ? BLUE : "#e5e7eb"}`, borderRadius: "12px", padding: "14px 16px", background: sel ? BLUE_LIGHT : "white", cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: "12px" }}>
// //                                 <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: sel ? BLUE : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// //                                     {sel && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "white" }} />}
// //                                 </div>
// //                                 <div style={{ flex: 1 }}>
// //                                     <p style={{ fontWeight: 700, fontSize: "13px", color: sel ? "#1d4ed8" : "#111827", margin: "0 0 2px" }}>{p.label}</p>
// //                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{planSessions} sessions/week</p>
// //                                 </div>
// //                                 <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#111827", margin: 0 }}>{fmtINR(planPrice)}</p>
// //                             </div>
// //                         );
// //                     })}
// //                 </div>

// //                 {availability.length > 0 ? (
// //                     <>
// //                         <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Availability Slots</p>
// //                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
// //                             {DAY_ORDER.map((day, di) => {
// //                                 const dayData = availability.find((d) => d.day === day);
// //                                 if (!dayData) return null;
// //                                 const openSlots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
// //                                 const isOpen = openDay === day;
// //                                 const selectedInDay = openSlots.filter((_, si) => selected[`${di}_${si}`]).length;
// //                                 return (
// //                                     <div key={day} style={{ border: `1.5px solid ${selectedInDay ? BLUE : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", background: selectedInDay ? BLUE_LIGHT : "white", transition: "all .15s" }}>
// //                                         <button onClick={() => setOpenDay(isOpen ? null : day)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "transparent", border: "none", cursor: "pointer", fontFamily: FONT }}>
// //                                             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //                                                 <span style={{ fontWeight: 600, fontSize: "13px", color: selectedInDay ? BLUE : "#374151" }}>{day}</span>
// //                                                 {selectedInDay > 0 && <span style={{ background: BLUE, color: "white", borderRadius: "20px", padding: "1px 8px", fontSize: "10px", fontWeight: 700 }}>{selectedInDay} selected</span>}
// //                                             </div>
// //                                             <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
// //                                                 <span style={{ fontSize: "11px", color: "#9ca3af" }}>{openSlots.length} slots</span>
// //                                                 {isOpen ? <ChevronUp size={14} color="#9ca3af" /> : <ChevronDown size={14} color="#9ca3af" />}
// //                                             </div>
// //                                         </button>
// //                                         <AnimatePresence>
// //                                             {isOpen && (
// //                                                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .18 }} style={{ overflow: "hidden" }}>
// //                                                     <div style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
// //                                                         {openSlots.map((slot, si) => {
// //                                                             const k = `${di}_${si}`;
// //                                                             const isSel = !!selected[k];
// //                                                             return (
// //                                                                 <button key={slot._id} onClick={() => toggleSlot(di, si)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`, background: isSel ? "white" : "#fafafa", cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
// //                                                                     <span style={{ fontSize: "12px", fontWeight: 600, color: isSel ? BLUE : "#374151" }}>{slot.startTime} – {slot.endTime}</span>
// //                                                                     {isSel ? <CheckCircle size={15} color={BLUE} /> : <div style={{ width: "15px", height: "15px", borderRadius: "50%", border: "1.5px solid #d1d5db" }} />}
// //                                                                 </button>
// //                                                             );
// //                                                         })}
// //                                                     </div>
// //                                                 </motion.div>
// //                                             )}
// //                                         </AnimatePresence>
// //                                     </div>
// //                                 );
// //                             })}
// //                         </div>
// //                     </>
// //                 ) : (
// //                     <div style={{ textAlign: "center", padding: "20px", background: "#f9fafb", borderRadius: "10px", border: "1px dashed #e5e7eb" }}>
// //                         <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>No availability slots set yet</p>
// //                     </div>
// //                 )}
// //             </div>

// //             <div style={{ borderTop: "1px solid #e5e7eb", padding: "16px 24px", background: "#fafafa", flexShrink: 0 }}>
// //                 <div style={{ marginBottom: "12px" }}>
// //                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em" }}>Total for {PLANS.find((p) => p.key === planKey)?.label}</p>
// //                     <p style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>{fmtINR(totalPrice)}</p>
// //                     {totalSessions > 0 && <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week</p>}
// //                 </div>
// //                 <button style={{ width: "100%", padding: "12px", background: BLUE, cursor: "pointer", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", fontFamily: FONT }}>
// //                     {`Subscribe — ${fmtINR(totalPrice)}`}
// //                 </button>
// //                 <p style={{ textAlign: "center", color: "#d1d5db", fontSize: "11px", marginTop: "8px" }}>Secure checkout · Cancel anytime · 7-day refund policy</p>
// //             </div>
// //         </motion.div>
// //     );
// // }

// // // ── Mentor Card ──────────────────────────────────────────────────────────────
// // function MentorCard({ mentor, index, onSubscribe }) {
// //     const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
// //         .split(",").map((s) => s.trim()).filter(Boolean);

// //     const [activePlan, setActivePlan] = useState("oneMonth");
// //     const [bioExpanded, setBioExpanded] = useState(false);

// //     const planPrice = mentor.pricing?.plans?.[activePlan]?.totalPrice ?? 0;
// //     const weeklySessions = mentor.pricing?.weeklySessions ?? 0;
// //     const hourlyRate = mentor.pricing?.hourlyRate ?? mentor.hourlyRate ?? 0;

// //     const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
// //     const BIO_LIMIT = 180;
// //     const shortBio = bio.length > BIO_LIMIT ? bio.slice(0, BIO_LIMIT) + "…" : bio;

// //     const hasWork = mentor.currentRole || mentor.companyName;
// //     const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Yrs` : null;

// //     const languages = Array.isArray(mentor.languages)
// //         ? mentor.languages.join(", ")
// //         : mentor.languages || "";

// //     const initials = (mentor.fullName || "M")
// //         .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

// //     const nextAvail = mentor.nextAvailable || null;
// //     const mentoringStyle = mentor.mentoringStyle || null;

// //     return (
// //         <motion.article
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.3, delay: index * 0.05 }}
// //             style={{
// //                 width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px",
// //                 background: "white", display: "flex", fontFamily: FONT,
// //                 overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)",
// //                 transition: "box-shadow .2s",
// //             }}
// //             onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)")}
// //             onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)")}
// //         >
// //             {/* LEFT */}
// //             <div style={{ flex: 1, padding: "24px 28px", borderRight: "1px solid #f0f0f0", minWidth: 0 }}>

// //                 <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
// //                     <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// //                         <span style={{ fontWeight: 700, fontSize: "16px", color: BLUE }}>{initials}</span>
// //                     </div>
// //                     <div style={{ flex: 1, minWidth: 0 }}>
// //                         <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
// //                             <h2 style={{ fontWeight: 800, fontSize: "20px", color: "#111827", margin: 0 }}>
// //                                 {mentor.fullName || "Mentor"}
// //                             </h2>
// //                             {mentoringStyle && (
// //                                 <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>
// //                                     {mentoringStyle}
// //                                 </span>
// //                             )}
// //                             {mentor.mentorCategory && (
// //                                 <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
// //                                     {mentor.mentorCategory}
// //                                 </span>
// //                             )}
// //                         </div>
// //                         {hasWork && (
// //                             <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
// //                                 {mentor.currentRole || ""}
// //                                 {mentor.currentRole && mentor.companyName && " · "}
// //                                 {mentor.companyName || ""}
// //                             </p>
// //                         )}
// //                     </div>
// //                 </div>

// //                 <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
// //                     {mentor.location && (
// //                         <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}>
// //                             <MapPin size={13} color="#9ca3af" strokeWidth={2} />
// //                             {mentor.location}
// //                         </span>
// //                     )}
// //                     <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}>
// //                         <Users size={13} color="#9ca3af" strokeWidth={2} />
// //                         {mentor.reviewCount ?? "1"}+ reviews
// //                     </span>
// //                     {languages && (
// //                         <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}>
// //                             <Pencil size={12} color="#9ca3af" strokeWidth={2} />
// //                             {languages}
// //                         </span>
// //                     )}
// //                     {yearsExp && (
// //                         <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}>
// //                             <Building2 size={13} color="#9ca3af" strokeWidth={2} />
// //                             {yearsExp} exp
// //                         </span>
// //                     )}
// //                 </div>

// //                 {hasWork && (
// //                     <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "14px", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "8px 14px" }}>
// //                         <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>
// //                             {(mentor.companyName || "?").slice(0, 2).toUpperCase()}
// //                         </div>
// //                         <div>
// //                             <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", margin: 0 }}>{mentor.currentRole || "—"}</p>
// //                             <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{mentor.companyName || "—"}</p>
// //                         </div>
// //                         {yearsExp && (
// //                             <>
// //                                 <span style={{ color: "#e5e7eb", fontSize: "18px", lineHeight: 1 }}>|</span>
// //                                 <div>
// //                                     <p style={{ fontSize: "12px", fontWeight: 700, color: "#374151", margin: 0 }}>{yearsExp}</p>
// //                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>Experience</p>
// //                                 </div>
// //                             </>
// //                         )}
// //                     </div>
// //                 )}

// //                 {bio && (
// //                     <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.7", margin: "0 0 14px" }}>
// //                         {bioExpanded ? bio : shortBio}
// //                         {bio.length > BIO_LIMIT && (
// //                             <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
// //                                 {bioExpanded ? " Show Less" : " Read More"}
// //                             </span>
// //                         )}
// //                     </p>
// //                 )}

// //                 {areas.length > 0 && (
// //                     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
// //                         {areas.slice(0, 4).map((a, i) => (
// //                             <span key={i} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>
// //                                 {a}
// //                             </span>
// //                         ))}
// //                         {areas.length > 4 && (
// //                             <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}`, cursor: "pointer" }}>
// //                                 +{areas.length - 4} More
// //                             </span>
// //                         )}
// //                     </div>
// //                 )}

// //                 <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", fontSize: "13px" }}>
// //                     {(mentor.targetAudience || mentor.forAudience) && (
// //                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
// //                             <Briefcase size={13} color="#9ca3af" strokeWidth={2} />
// //                             <span style={{ color: "#9ca3af" }}>For:</span>{" "}
// //                             <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetAudience || mentor.forAudience}</span>
// //                         </span>
// //                     )}
// //                     {mentor.targetingDomains && (
// //                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
// //                             <Target size={13} color="#9ca3af" strokeWidth={2} />
// //                             <span style={{ color: "#9ca3af" }}>Targeting Domains:</span>{" "}
// //                             <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetingDomains}</span>
// //                             {mentor.moreTargetDomains && <span style={{ color: BLUE, fontWeight: 600, cursor: "pointer" }}> | More</span>}
// //                         </span>
// //                     )}
// //                     {!mentor.targetingDomains && (mentor.fieldOfStudy || mentor.highestDegree) && (
// //                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
// //                             <Target size={13} color="#9ca3af" strokeWidth={2} />
// //                             <span style={{ color: "#9ca3af" }}>Field:</span>{" "}
// //                             <span style={{ color: "#111827", fontWeight: 600, textTransform: "capitalize" }}>
// //                                 {mentor.fieldOfStudy || ""}{mentor.fieldOfStudy && mentor.highestDegree ? " · " : ""}{mentor.highestDegree || ""}
// //                             </span>
// //                         </span>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* RIGHT */}
// //             <div style={{ width: "270px", flexShrink: 0, display: "flex", flexDirection: "column" }}>

// //                 <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
// //                     {PLANS.map((p) => {
// //                         const isActive = activePlan === p.key;
// //                         return (
// //                             <button key={p.key} onClick={() => setActivePlan(p.key)} style={{
// //                                 flex: 1, padding: "14px 6px", background: "transparent", border: "none",
// //                                 borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent",
// //                                 color: isActive ? BLUE : "#9ca3af",
// //                                 fontSize: "13px", fontWeight: isActive ? 700 : 500,
// //                                 cursor: "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px",
// //                             }}>
// //                                 {p.label}
// //                             </button>
// //                         );
// //                     })}
// //                 </div>

// //                 <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
// //                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //                         <FaClock size={14} color="#1d8e85" />
// //                         <span style={{ fontSize: "13px", color: "#374151" }}>
// //                             <strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong> Sessions Per Week
// //                         </span>
// //                     </div>
// //                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //                         <FaBriefcase size={14} color="#1d8e85" />
// //                         <span style={{ fontSize: "13px", color: "#374151" }}>Referrals in Top Companies</span>
// //                     </div>
// //                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //                         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //                             <span style={{ fontSize: "15px" }}>💎</span>
// //                             <span style={{ fontSize: "13px", color: "#374151" }}>Detailed Curriculum Available</span>
// //                         </div>
// //                         <span style={{ color: BLUE, fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>View ↗</span>
// //                     </div>

// //                     <div style={{ marginTop: "4px" }}>
// //                         <span style={{ fontSize: "30px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
// //                         <span style={{ fontSize: "13px", color: "#9ca3af" }}>/session</span>
// //                     </div>
// //                 </div>

// //                 <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
// //                     <button
// //                         style={{ width: "100%", padding: "11px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "all .15s" }}
// //                         onMouseEnter={(e) => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#9ca3af"; }}
// //                         onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#d1d5db"; }}
// //                     >
// //                         View Profile
// //                     </button>
// //                     <div>
// //                         <button
// //                             onClick={() => onSubscribe(mentor)}
// //                             style={{ width: "100%", padding: "12px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "background .15s" }}
// //                             onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
// //                             onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
// //                         >
// //                             Book a Free Trial
// //                         </button>
// //                         {nextAvail && (
// //                             <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", margin: "6px 0 0" }}>
// //                                 Next Available: <span style={{ color: BLUE, fontWeight: 600 }}>{nextAvail}</span>
// //                             </p>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //         </motion.article>
// //     );
// // }

// // // ── Filter Sidebar ───────────────────────────────────────────────────────────
// // function FilterSidebar({ onSearch, isSearching, onClear }) {
// //     const [selectedDomains, setSelectedDomains] = useState([]);
// //     const [offeringFor, setOfferingFor] = useState("Working Professionals");
// //     const [priceVal, setPriceVal] = useState(7000);

// //     const toggleDomain = (d) =>
// //         setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

// //     const handleClear = () => { setSelectedDomains([]); setPriceVal(7000); onClear(); };

// //     return (
// //         <div style={{ width: "300px", flexShrink: 0, background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 22px", fontFamily: FONT, alignSelf: "flex-start", position: "sticky", top: "80px" }}>

// //             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
// //                 <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", margin: 0 }}>Filter By</h3>
// //                 <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
// //                     <X size={12} /> Clear Filters
// //                 </button>
// //             </div>

// //             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Domain</p>

// //             {selectedDomains.length > 0 && (
// //                 <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px", minHeight: "42px" }}>
// //                     {selectedDomains.map((d) => (
// //                         <span key={d} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}>
// //                             {d}
// //                             <button onClick={() => toggleDomain(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}><X size={11} /></button>
// //                         </span>
// //                     ))}
// //                     <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
// //                         <button onClick={handleClear} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "0 2px" }}><X size={13} /></button>
// //                         <span style={{ color: "#e5e7eb" }}>|</span>
// //                         <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "0 2px" }}><ChevronDown size={14} /></button>
// //                     </div>
// //                 </div>
// //             )}

// //             <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
// //                 {DOMAIN_CHIPS.map((d) => {
// //                     const active = selectedDomains.includes(d);
// //                     return (
// //                         <button key={d} onClick={() => toggleDomain(d)} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151", border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
// //                             {d}
// //                         </button>
// //                     );
// //                 })}
// //             </div>

// //             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

// //             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Offering Mentorship For</p>
// //             <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 36px 10px 14px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxSizing: "border-box", marginBottom: "24px" }}>
// //                 <option>Working Professionals</option>
// //                 <option>Students</option>
// //                 <option>Freshers</option>
// //                 <option>Entrepreneurs</option>
// //             </select>

// //             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

// //             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Pricing</p>
// //             <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>
// //                 <span>₹5,000</span><span>₹10,000</span>
// //             </div>
// //             <input type="range" min={5000} max={10000} step={500} value={priceVal} onChange={(e) => setPriceVal(Number(e.target.value))} style={{ width: "100%", accentColor: BLUE, cursor: "pointer" }} />
// //             <p style={{ fontSize: "12px", color: BLUE, fontWeight: 600, margin: "6px 0 0" }}>Up to {fmtINR(priceVal)}/month</p>

// //             <button onClick={() => onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains })} disabled={isSearching} style={{ marginTop: "20px", width: "100%", padding: "11px", background: isSearching ? "#93c5fd" : BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT }}>
// //                 {isSearching ? "Applying…" : "Apply Filters"}
// //             </button>
// //         </div>
// //     );
// // }

// // // ── Root ─────────────────────────────────────────────────────────────────────
// // export default function ExploreMentors() {
// //     const navigate = useNavigate();
// //     const location = useLocation();

// //     const { data, isLoading, isError } = useGetLtmAllMentorsQuery();
// //     const [searchMentors, { isLoading: isSearching }] = useSearchMentorMutation();
// //     const [advancedFilter] = useAdvancedFilterMentorsMutation();

// //     const allMentors = data?.data ?? [];
// //     const [displayMentors, setDisplayMentors] = useState(null);
// //     const [isFiltered, setIsFiltered] = useState(false);
// //     const [searchEmpty, setSearchEmpty] = useState(false);
// //     const [activeMentor, setActiveMentor] = useState(null);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [sortBy, setSortBy] = useState("Recommended");

// //     const mentors = isFiltered ? (displayMentors || []) : allMentors;

// //     // ── helpers ──
// //     const getProfileFromCookie = () => {
// //         try {
// //             const cookies = document.cookie.split(";").reduce((acc, c) => {
// //                 const [k, v] = c.trim().split("=");
// //                 acc[k] = decodeURIComponent(v);
// //                 return acc;
// //             }, {});
// //             return cookies["profileData"] ? JSON.parse(cookies["profileData"]) : null;
// //         } catch { return null; }
// //     };

// //     const handleClear = () => {
// //         setIsFiltered(false);
// //         setDisplayMentors(null);
// //         setSearchEmpty(false);
// //     };

// //     // ── search (text query) ──
// //     const handleSearch = async (body) => {
// //         try {
// //             const response = await searchMentors(body).unwrap();
// //             const result = response?.data || [];
// //             setDisplayMentors(result);
// //             setIsFiltered(true);
// //             setSearchEmpty(result.length === 0);
// //         } catch {
// //             setDisplayMentors([]);
// //             setIsFiltered(true);
// //             setSearchEmpty(true);
// //         }
// //     };

// //     // ── sort change → advanced filter API ──
// //     const handleSortChange = async (value) => {
// //         setSortBy(value);

// //         // "Recommended" → just reset to default data, no API call
// //         if (value === "Recommended") {
// //             handleClear();
// //             return;
// //         }

// //         const sortMap = {
// //             "Price: Low to High": { sortBy: "price", order: "asc" },
// //             "Price: High to Low": { sortBy: "price", order: "desc" },
// //             "Most Experienced": { sortBy: "experience", order: "desc" },
// //         };

// //         const body = sortMap[value];
// //         if (!body) return;

// //         try {
// //             const response = await advancedFilter(body).unwrap();
// //             const result = response?.data || [];
// //             setDisplayMentors(result);
// //             setIsFiltered(true);
// //             setSearchEmpty(result.length === 0);
// //         } catch {
// //             setDisplayMentors([]);
// //             setIsFiltered(true);
// //             setSearchEmpty(true);
// //         }
// //     };

// //     return (
// //         <>
// //             {/* ── Header ── */}
// //             <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #f0f0f0", fontFamily: FONT }}>
// //                 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //                     <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
// //                         <div style={{ position: "relative", width: "22px", height: "22px", flexShrink: 0 }}>
// //                             <div style={{ position: "absolute", bottom: 0, right: 0, width: "15px", height: "15px", background: "#2563eb", borderRadius: "3px" }} />
// //                             <div style={{ position: "absolute", top: 0, left: 0, width: "15px", height: "15px", background: "#f97316", borderRadius: "3px" }} />
// //                         </div>
// //                         <span style={{ fontWeight: 700, fontSize: "18px", color: "#111827", letterSpacing: "-0.3px" }}>Karrivo</span>
// //                     </div>
// //                     <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
// //                         {NAV_LINKS.map((link) => {
// //                             const isActive = location.pathname === link.path;
// //                             return (
// //                                 <button key={link.path} onClick={() => navigate(link.path)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 500, color: isActive ? "#111827" : "#6b7280", padding: 0, transition: "color .15s" }}
// //                                     onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
// //                                     onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#111827" : "#6b7280")}
// //                                 >
// //                                     {link.label}
// //                                 </button>
// //                             );
// //                         })}
// //                     </nav>
// //                 </div>
// //             </header>

// //             {/* ── Main ── */}
// //             <main style={{ minHeight: "100vh", background: "#f9fafb", padding: "24px", fontFamily: FONT }}>
// //                 <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

// //                     {/* Search + Sort bar */}
// //                     <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px" }}>
// //                         <div style={{ flex: 1, position: "relative" }}>
// //                             <Search size={15} color="#9ca3af" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
// //                             <input
// //                                 value={searchQuery}
// //                                 onChange={(e) => setSearchQuery(e.target.value)}
// //                                 placeholder="Search for any Skill, domain or name..."
// //                                 onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
// //                                 style={{ width: "100%", padding: "13px 16px 13px 40px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
// //                                 onFocus={(e) => (e.target.style.borderColor = BLUE)}
// //                                 onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
// //                             />
// //                         </div>
// //                         <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
// //                             <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>Sort by:</span>
// //                             <select
// //                                 value={sortBy}
// //                                 onChange={(e) => handleSortChange(e.target.value)} 
// //                                 style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 36px 10px 14px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
// //                             >
// //                                 <option>Recommended</option>
// //                                 <option>Price: Low to High</option>
// //                                 <option>Price: High to Low</option>
// //                                 <option>Most Experienced</option>
// //                             </select>
// //                         </div>
// //                     </div>

// //                     {/* Mentor count */}
// //                     {!isLoading && !isError && mentors.length > 0 && (
// //                         <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px" }}>
// //                             Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
// //                         </p>
// //                     )}

// //                     {/* Cards + Sidebar */}
// //                     <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
// //                         <div style={{ flex: 1, minWidth: 0 }}>
// //                             {isLoading && (
// //                                 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
// //                                     <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `3px solid ${BLUE_BORDER}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
// //                                     <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
// //                                 </div>
// //                             )}
// //                             {isError && !isLoading && <Loader />}
// //                             {!isLoading && !isError && searchEmpty && (
// //                                 <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
// //                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</p>
// //                                     <p style={{ fontWeight: 600, color: "#374151" }}>No mentors match your filters</p>
// //                                     <p style={{ fontSize: "13px", color: "#9ca3af" }}>Try adjusting your criteria</p>
// //                                 </div>
// //                             )}
// //                             {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
// //                                 <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
// //                                     {mentors.map((mentor, index) => (
// //                                         <MentorCard key={mentor._id || index} mentor={mentor} index={index} onSubscribe={setActiveMentor} />
// //                                     ))}
// //                                 </div>
// //                             )}
// //                             {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
// //                                 <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
// //                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
// //                                     <p style={{ fontWeight: 600, color: "#374151" }}>No mentors available</p>
// //                                 </div>
// //                             )}
// //                         </div>

// //                         <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} />
// //                     </div>
// //                 </div>

// //                 <AnimatePresence>
// //                     {activeMentor && (
// //                         <>
// //                             <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMentor(null)} style={{ position: "fixed", inset: 0, zIndex: 299, background: "rgba(0,0,0,.35)", backdropFilter: "blur(3px)" }} />
// //                             <SubscribePanel key="panel" mentor={activeMentor} onClose={() => setActiveMentor(null)} />
// //                         </>
// //                     )}
// //                 </AnimatePresence>
// //             </main>
// //         </>
// //     );
// // }

//     // import { useState, useEffect } from "react";
//     // import { FaBriefcase, FaClock } from "react-icons/fa";
//     // import { MapPin, Users, X, ChevronDown, ChevronUp, CheckCircle, Search, Pencil, Briefcase, Target, Building2, SlidersHorizontal } from "lucide-react";
//     // import { motion, AnimatePresence } from "framer-motion";
//     // import { useNavigate, useLocation } from "react-router-dom";
//     // import KarrivoLogo from "../../assets/KarivoLogo.jpg";

//     // import {
//     //     useGetLtmAllMentorsQuery,
//     //     useSearchMentorMutation,
//     //     useAdvancedFilterMentorsMutation,
//     // } from "./exploreMentorsapislice";
//     // import Loader from "../../global/Loader";

//     // const link = document.createElement("link");
//     // link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
//     // link.rel = "stylesheet";
//     // document.head.appendChild(link);

//     // const BLUE = "#2563eb";
//     // const BLUE_LIGHT = "#eff6ff";
//     // const BLUE_BORDER = "#bfdbfe";
//     // const FONT = "'Inter', sans-serif";

//     // const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//     // const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

//     // const PLANS = [
//     //     { key: "sixMonths", label: "6 Mon" },
//     //     { key: "threeMonths", label: "3 Mon" },
//     //     { key: "oneMonth", label: "1 Mon" },
//     // ];

//     // const DOMAIN_CHIPS = [
//     //     "Frontend", "Backend", "Fullstack",
//     //     "DevOps / SRE / Cloud", "QA / Automation Testing",
//     //     "Data Scientist / AI/ML", "Data Analyst",
//     // ];

//     // const NAV_LINKS = [
//     //     { label: "Explore Mentors", path: "/explore-mentors" },
//     //     { label: "Top Mentors", path: "/top" },
//     //     { label: "engineering Mentors", path: "/engineering" },
//     //     { label: "AI Mentors", path: "/ai-mentors" },
//     //     { label: "Success Stories", path: "/success-stories" },
//     // ];

//     // // ── useWindowWidth hook ──────────────────────────────────────────────────────
//     // function useWindowWidth() {
//     //     const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
//     //     useEffect(() => {
//     //         const handler = () => setWidth(window.innerWidth);
//     //         window.addEventListener("resize", handler);
//     //         return () => window.removeEventListener("resize", handler);
//     //     }, []);
//     //     return width;
//     // }

//     // // ── Subscribe Panel ──────────────────────────────────────────────────────────
//     // function SubscribePanel({ mentor, onClose }) {
//     //     const width = useWindowWidth();
//     //     const isMobile = width < 640;
//     //     const availability = mentor.availability ?? [];
//     //     const [selected, setSelected] = useState({});
//     //     const [openDay, setOpenDay] = useState(null);
//     //     const [planKey, setPlanKey] = useState("oneMonth");

//     //     const toggleSlot = (di, si) => {
//     //         const k = `${di}_${si}`;
//     //         setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
//     //     };

//     //     const selectedCount = Object.values(selected).filter(Boolean).length;
//     //     const totalSessions = mentor.pricing?.plans?.[planKey]?.totalSessions ?? 0;
//     //     const totalPrice = mentor.pricing?.plans?.[planKey]?.totalPrice ?? 0;

//     //     const panelStyle = isMobile
//     //         ? {
//     //             position: "fixed", bottom: 0, left: 0, right: 0,
//     //             height: "85vh", width: "100%",
//     //             background: "white", zIndex: 300,
//     //             boxShadow: "0 -8px 40px rgba(0,0,0,.15)",
//     //             display: "flex", flexDirection: "column", fontFamily: FONT,
//     //             borderRadius: "20px 20px 0 0",
//     //         }
//     //         : {
//     //             position: "fixed", top: 0, right: 0, bottom: 0,
//     //             width: "420px", maxWidth: "100vw",
//     //             background: "white", zIndex: 300,
//     //             boxShadow: "-8px 0 40px rgba(0,0,0,.15)",
//     //             display: "flex", flexDirection: "column", fontFamily: FONT,
//     //         };

//     //     const motionProps = isMobile
//     //         ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
//     //         : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

//     //     return (
//     //         <motion.div
//     //             {...motionProps}
//     //             transition={{ type: "spring", damping: 28, stiffness: 300 }}
//     //             style={panelStyle}
//     //         >
//     //             {isMobile && (
//     //                 <div style={{ width: "36px", height: "4px", background: "#d1d5db", borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0 }} />
//     //             )}
//     //             <div style={{ background: BLUE, padding: "20px 24px", flexShrink: 0, borderRadius: isMobile ? "20px 20px 0 0" : 0 }}>
//     //                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
//     //                     <h2 style={{ color: "white", fontWeight: 700, fontSize: "16px", margin: 0 }}>Subscribe to Mentor</h2>
//     //                     <button onClick={onClose} style={{ background: "rgba(255,255,255,.15)", border: "none", color: "white", borderRadius: "8px", width: "30px", height: "30px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
//     //                         <X size={16} />
//     //                     </button>
//     //                 </div>
//     //                 <p style={{ color: "rgba(255,255,255,.75)", fontSize: "13px", margin: 0 }}>
//     //                     {mentor.fullName} · {fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session
//     //                 </p>
//     //             </div>

//     //             <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
//     //                 <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Plan</p>
//     //                 <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
//     //                     {PLANS.map((p) => {
//     //                         const sel = planKey === p.key;
//     //                         const planPrice = mentor.pricing?.plans?.[p.key]?.totalPrice ?? 0;
//     //                         const planSessions = mentor.pricing?.weeklySessions ?? 0;
//     //                         return (
//     //                             <div key={p.key} onClick={() => setPlanKey(p.key)} style={{ border: `2px solid ${sel ? BLUE : "#e5e7eb"}`, borderRadius: "12px", padding: "14px 16px", background: sel ? BLUE_LIGHT : "white", cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: "12px" }}>
//     //                                 <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: sel ? BLUE : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//     //                                     {sel && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "white" }} />}
//     //                                 </div>
//     //                                 <div style={{ flex: 1 }}>
//     //                                     <p style={{ fontWeight: 700, fontSize: "13px", color: sel ? "#1d4ed8" : "#111827", margin: "0 0 2px" }}>{p.label}</p>
//     //                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{planSessions} sessions/week</p>
//     //                                 </div>
//     //                                 <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#111827", margin: 0 }}>{fmtINR(planPrice)}</p>
//     //                             </div>
//     //                         );
//     //                     })}
//     //                 </div>

//     //                 {availability.length > 0 ? (
//     //                     <>
//     //                         <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Availability Slots</p>
//     //                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//     //                             {DAY_ORDER.map((day, di) => {
//     //                                 const dayData = availability.find((d) => d.day === day);
//     //                                 if (!dayData) return null;
//     //                                 const openSlots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
//     //                                 const isOpen = openDay === day;
//     //                                 const selectedInDay = openSlots.filter((_, si) => selected[`${di}_${si}`]).length;
//     //                                 return (
//     //                                     <div key={day} style={{ border: `1.5px solid ${selectedInDay ? BLUE : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", background: selectedInDay ? BLUE_LIGHT : "white", transition: "all .15s" }}>
//     //                                         <button onClick={() => setOpenDay(isOpen ? null : day)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "transparent", border: "none", cursor: "pointer", fontFamily: FONT }}>
//     //                                             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//     //                                                 <span style={{ fontWeight: 600, fontSize: "13px", color: selectedInDay ? BLUE : "#374151" }}>{day}</span>
//     //                                                 {selectedInDay > 0 && <span style={{ background: BLUE, color: "white", borderRadius: "20px", padding: "1px 8px", fontSize: "10px", fontWeight: 700 }}>{selectedInDay} selected</span>}
//     //                                             </div>
//     //                                             <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//     //                                                 <span style={{ fontSize: "11px", color: "#9ca3af" }}>{openSlots.length} slots</span>
//     //                                                 {isOpen ? <ChevronUp size={14} color="#9ca3af" /> : <ChevronDown size={14} color="#9ca3af" />}
//     //                                             </div>
//     //                                         </button>
//     //                                         <AnimatePresence>
//     //                                             {isOpen && (
//     //                                                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .18 }} style={{ overflow: "hidden" }}>
//     //                                                     <div style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
//     //                                                         {openSlots.map((slot, si) => {
//     //                                                             const k = `${di}_${si}`;
//     //                                                             const isSel = !!selected[k];
//     //                                                             return (
//     //                                                                 <button key={slot._id} onClick={() => toggleSlot(di, si)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`, background: isSel ? "white" : "#fafafa", cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
//     //                                                                     <span style={{ fontSize: "12px", fontWeight: 600, color: isSel ? BLUE : "#374151" }}>{slot.startTime} – {slot.endTime}</span>
//     //                                                                     {isSel ? <CheckCircle size={15} color={BLUE} /> : <div style={{ width: "15px", height: "15px", borderRadius: "50%", border: "1.5px solid #d1d5db" }} />}
//     //                                                                 </button>
//     //                                                             );
//     //                                                         })}
//     //                                                     </div>
//     //                                                 </motion.div>
//     //                                             )}
//     //                                         </AnimatePresence>
//     //                                     </div>
//     //                                 );
//     //                             })}
//     //                         </div>
//     //                     </>
//     //                 ) : (
//     //                     <div style={{ textAlign: "center", padding: "20px", background: "#f9fafb", borderRadius: "10px", border: "1px dashed #e5e7eb" }}>
//     //                         <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>No availability slots set yet</p>
//     //                     </div>
//     //                 )}
//     //             </div>

//     //             <div style={{ borderTop: "1px solid #e5e7eb", padding: "16px 24px", background: "#fafafa", flexShrink: 0 }}>
//     //                 <div style={{ marginBottom: "12px" }}>
//     //                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em" }}>Total for {PLANS.find((p) => p.key === planKey)?.label}</p>
//     //                     <p style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>{fmtINR(totalPrice)}</p>
//     //                     {totalSessions > 0 && <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week</p>}
//     //                 </div>
//     //                 <button style={{ width: "100%", padding: "12px", background: BLUE, cursor: "pointer", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", fontFamily: FONT }}>
//     //                     {`Subscribe — ${fmtINR(totalPrice)}`}
//     //                 </button>
//     //                 <p style={{ textAlign: "center", color: "#d1d5db", fontSize: "11px", marginTop: "8px" }}>Secure checkout · Cancel anytime · 7-day refund policy</p>
//     //             </div>
//     //         </motion.div>
//     //     );
//     // }

//     // // ── Mentor Card ──────────────────────────────────────────────────────────────
//     // function MentorCard({ mentor, index, onSubscribe }) {
//     //     const width = useWindowWidth();
//     //     const isMobile = width < 640;
//     //     const isTablet = width >= 640 && width < 1024;

//     //     const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
//     //         .split(",").map((s) => s.trim()).filter(Boolean);

//     //     const [activePlan, setActivePlan] = useState("oneMonth");
//     //     const [bioExpanded, setBioExpanded] = useState(false);

//     //     const planPrice = mentor.pricing?.plans?.[activePlan]?.totalPrice ?? 0;
//     //     const weeklySessions = mentor.pricing?.weeklySessions ?? 0;
//     //     const hourlyRate = mentor.pricing?.hourlyRate ?? mentor.hourlyRate ?? 0;

//     //     const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
//     //     const BIO_LIMIT = isMobile ? 120 : 180;
//     //     const shortBio = bio.length > BIO_LIMIT ? bio.slice(0, BIO_LIMIT) + "…" : bio;

//     //     const hasWork = mentor.currentRole || mentor.companyName;
//     //     const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Yrs` : null;

//     //     const languages = Array.isArray(mentor.languages)
//     //         ? mentor.languages.join(", ")
//     //         : mentor.languages || "";

//     //     const initials = (mentor.fullName || "M")
//     //         .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

//     //     const nextAvail = mentor.nextAvailable || null;
//     //     const mentoringStyle = mentor.mentoringStyle || null;

//     //     // ── MOBILE LAYOUT ──────────────────────────────────────────────────────
//     //     if (isMobile) {
//     //         return (
//     //             <motion.article
//     //                 initial={{ opacity: 0, y: 20 }}
//     //                 animate={{ opacity: 1, y: 0 }}
//     //                 transition={{ duration: 0.3, delay: index * 0.05 }}
//     //                 style={{
//     //                     width: "100%", border: "1px solid #e5e7eb", borderRadius: "14px",
//     //                     background: "white", display: "flex", flexDirection: "column",
//     //                     fontFamily: FONT, overflow: "hidden",
//     //                     boxShadow: "0 1px 4px rgba(0,0,0,.05)",
//     //                 }}
//     //             >
//     //                 {/* Top: avatar + name + tags */}
//     //                 <div style={{ padding: "16px 16px 12px" }}>
//     //                     <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
//     //                         <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//     //                             <span style={{ fontWeight: 700, fontSize: "15px", color: BLUE }}>{initials}</span>
//     //                         </div>
//     //                         <div style={{ flex: 1, minWidth: 0 }}>
//     //                             <h2 style={{ fontWeight: 800, fontSize: "17px", color: "#111827", margin: "0 0 3px", lineHeight: 1.2 }}>
//     //                                 {mentor.fullName || "Mentor"}
//     //                             </h2>
//     //                             {hasWork && (
//     //                                 <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//     //                                     {mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}
//     //                                 </p>
//     //                             )}
//     //                         </div>
//     //                         <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
//     //                             <span style={{ fontSize: "22px", fontWeight: 800, color: "#111827" }}>{fmtINR(hourlyRate)}</span>
//     //                         </div>
//     //                     </div>

//     //                     {/* Tags row */}
//     //                     <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
//     //                         {mentoringStyle && (
//     //                             <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>
//     //                         )}
//     //                         {mentor.mentorCategory && (
//     //                             <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>
//     //                         )}
//     //                         {yearsExp && (
//     //                             <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp} exp</span>
//     //                         )}
//     //                     </div>

//     //                     {/* Meta row */}
//     //                     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: bio ? "10px" : 0 }}>
//     //                         {mentor.location && (
//     //                             <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
//     //                                 <MapPin size={11} color="#9ca3af" strokeWidth={2} /> {mentor.location}
//     //                             </span>
//     //                         )}
//     //                         <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
//     //                             <Users size={11} color="#9ca3af" strokeWidth={2} /> {mentor.reviewCount ?? "1"}+ reviews
//     //                         </span>
//     //                         {languages && (
//     //                             <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
//     //                                 <Pencil size={10} color="#9ca3af" strokeWidth={2} /> {languages}
//     //                             </span>
//     //                         )}
//     //                     </div>

//     //                     {bio && (
//     //                         <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: 0 }}>
//     //                             {bioExpanded ? bio : shortBio}
//     //                             {bio.length > BIO_LIMIT && (
//     //                                 <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
//     //                                     {bioExpanded ? " Less" : " More"}
//     //                                 </span>
//     //                             )}
//     //                         </p>
//     //                     )}
//     //                 </div>

//     //                 {/* Skills chips */}
//     //                 {areas.length > 0 && (
//     //                     <div style={{ padding: "0 16px 12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
//     //                         {areas.slice(0, 3).map((a, i) => (
//     //                             <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>
//     //                         ))}
//     //                         {areas.length > 3 && (
//     //                             <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 3}</span>
//     //                         )}
//     //                     </div>
//     //                 )}

//     //                 {/* Plan tabs */}
//     //                 <div style={{ display: "flex", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
//     //                     {PLANS.map((p) => {
//     //                         const isActive = activePlan === p.key;
//     //                         return (
//     //                             <button key={p.key} onClick={() => setActivePlan(p.key)} style={{
//     //                                 flex: 1, padding: "10px 4px", background: "transparent", border: "none",
//     //                                 borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent",
//     //                                 color: isActive ? BLUE : "#9ca3af",
//     //                                 fontSize: "12px", fontWeight: isActive ? 700 : 500,
//     //                                 cursor: "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px",
//     //                             }}>
//     //                                 {p.label}
//     //                             </button>
//     //                         );
//     //                     })}
//     //                 </div>

//     //                 {/* Stats row */}
//     //                 <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
//     //                     <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//     //                         <FaClock size={12} color="#1d8e85" />
//     //                         <span style={{ fontSize: "12px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week</span>
//     //                     </div>
//     //                     <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//     //                         <span style={{ fontSize: "12px", color: "#9ca3af" }}>Plan:</span>
//     //                         <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{fmtINR(planPrice)}</span>
//     //                     </div>
//     //                 </div>

//     //                 {/* CTA buttons */}
//     //                 <div style={{ padding: "0 16px 16px", display: "flex", gap: "8px" }}>
//     //                     <button style={{ flex: 1, padding: "10px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
//     //                         View Profile
//     //                     </button>
//     //                     <button
//     //                         onClick={() => onSubscribe(mentor)}
//     //                         style={{ flex: 1, padding: "10px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}
//     //                     >
//     //                         Book Trial
//     //                     </button>
//     //                 </div>
//     //             </motion.article>
//     //         );
//     //     }

//     //     // ── TABLET LAYOUT ──────────────────────────────────────────────────────
//     //     if (isTablet) {
//     //         return (
//     //             <motion.article
//     //                 initial={{ opacity: 0, y: 20 }}
//     //                 animate={{ opacity: 1, y: 0 }}
//     //                 transition={{ duration: 0.3, delay: index * 0.05 }}
//     //                 style={{
//     //                     width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px",
//     //                     background: "white", display: "flex", flexDirection: "column",
//     //                     fontFamily: FONT, overflow: "hidden",
//     //                     boxShadow: "0 1px 4px rgba(0,0,0,.05)",
//     //                 }}
//     //             >
//     //                 {/* Top section */}
//     //                 <div style={{ padding: "20px 20px 0", display: "flex", gap: "14px" }}>
//     //                     <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//     //                         <span style={{ fontWeight: 700, fontSize: "15px", color: BLUE }}>{initials}</span>
//     //                     </div>
//     //                     <div style={{ flex: 1, minWidth: 0 }}>
//     //                         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "4px" }}>
//     //                             <h2 style={{ fontWeight: 800, fontSize: "18px", color: "#111827", margin: 0 }}>{mentor.fullName || "Mentor"}</h2>
//     //                             <div>
//     //                                 <span style={{ fontSize: "26px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
//     //                                 <span style={{ fontSize: "12px", color: "#9ca3af" }}>/session</span>
//     //                             </div>
//     //                         </div>
//     //                         <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
//     //                             {mentoringStyle && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
//     //                             {mentor.mentorCategory && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
//     //                             {yearsExp && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp} exp</span>}
//     //                         </div>
//     //                         {hasWork && <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 6px" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
//     //                         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//     //                             {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#6b7280" }}><MapPin size={12} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
//     //                             <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#6b7280" }}><Users size={12} color="#9ca3af" strokeWidth={2} />{mentor.reviewCount ?? "1"}+ reviews</span>
//     //                         </div>
//     //                     </div>
//     //                 </div>

//     //                 {/* Bio */}
//     //                 {bio && (
//     //                     <div style={{ padding: "12px 20px 0" }}>
//     //                         <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: 0 }}>
//     //                             {bioExpanded ? bio : shortBio}
//     //                             {bio.length > BIO_LIMIT && (
//     //                                 <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
//     //                                     {bioExpanded ? " Less" : " More"}
//     //                                 </span>
//     //                             )}
//     //                         </p>
//     //                     </div>
//     //                 )}

//     //                 {/* Skills */}
//     //                 {areas.length > 0 && (
//     //                     <div style={{ padding: "10px 20px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
//     //                         {areas.slice(0, 4).map((a, i) => (
//     //                             <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 12px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>
//     //                         ))}
//     //                         {areas.length > 4 && <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 4}</span>}
//     //                     </div>
//     //                 )}

//     //                 {/* Bottom: plan tabs + stats + CTA */}
//     //                 <div style={{ marginTop: "auto", borderTop: "1px solid #f0f0f0" }}>
//     //                     <div style={{ display: "flex" }}>
//     //                         {PLANS.map((p) => {
//     //                             const isActive = activePlan === p.key;
//     //                             return (
//     //                                 <button key={p.key} onClick={() => setActivePlan(p.key)} style={{ flex: 1, padding: "10px 6px", background: "transparent", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : "#9ca3af", fontSize: "12px", fontWeight: isActive ? 700 : 500, cursor: "pointer", fontFamily: FONT, marginBottom: "-1px" }}>
//     //                                     {p.label}
//     //                                 </button>
//     //                             );
//     //                         })}
//     //                     </div>
//     //                     <div style={{ padding: "12px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
//     //                         <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
//     //                             <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#374151" }}><FaClock size={12} color="#1d8e85" /><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week</span>
//     //                             <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>{fmtINR(planPrice)} <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>plan total</span></span>
//     //                         </div>
//     //                         <div style={{ display: "flex", gap: "8px" }}>
//     //                             <button style={{ padding: "9px 16px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>Profile</button>
//     //                             <button onClick={() => onSubscribe(mentor)} style={{ padding: "9px 18px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>Book Trial</button>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </motion.article>
//     //         );
//     //     }

//     //     // ── DESKTOP LAYOUT (original, kept intact) ─────────────────────────────
//     //     return (
//     //         <motion.article
//     //             initial={{ opacity: 0, y: 20 }}
//     //             animate={{ opacity: 1, y: 0 }}
//     //             transition={{ duration: 0.3, delay: index * 0.05 }}
//     //             style={{
//     //                 width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px",
//     //                 background: "white", display: "flex", fontFamily: FONT,
//     //                 overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)",
//     //                 transition: "box-shadow .2s",
//     //             }}
//     //             onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)")}
//     //             onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)")}
//     //         >
//     //             {/* LEFT */}
//     //             <div style={{ flex: 1, padding: "24px 28px", borderRight: "1px solid #f0f0f0", minWidth: 0 }}>
//     //                 <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
//     //                     <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//     //                         <span style={{ fontWeight: 700, fontSize: "16px", color: BLUE }}>{initials}</span>
//     //                     </div>
//     //                     <div style={{ flex: 1, minWidth: 0 }}>
//     //                         <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
//     //                             <h2 style={{ fontWeight: 800, fontSize: "20px", color: "#111827", margin: 0 }}>{mentor.fullName || "Mentor"}</h2>
//     //                             {mentoringStyle && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
//     //                             {mentor.mentorCategory && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
//     //                         </div>
//     //                         {hasWork && <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
//     //                     </div>
//     //                 </div>

//     //                 <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
//     //                     {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><MapPin size={13} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
//     //                     <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Users size={13} color="#9ca3af" strokeWidth={2} />{mentor.reviewCount ?? "1"}+ reviews</span>
//     //                     {languages && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Pencil size={12} color="#9ca3af" strokeWidth={2} />{languages}</span>}
//     //                     {yearsExp && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Building2 size={13} color="#9ca3af" strokeWidth={2} />{yearsExp} exp</span>}
//     //                 </div>

//     //                 {hasWork && (
//     //                     <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "14px", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "8px 14px" }}>
//     //                         <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>
//     //                             {(mentor.companyName || "?").slice(0, 2).toUpperCase()}
//     //                         </div>
//     //                         <div>
//     //                             <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", margin: 0 }}>{mentor.currentRole || "—"}</p>
//     //                             <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{mentor.companyName || "—"}</p>
//     //                         </div>
//     //                         {yearsExp && (
//     //                             <>
//     //                                 <span style={{ color: "#e5e7eb", fontSize: "18px", lineHeight: 1 }}>|</span>
//     //                                 <div>
//     //                                     <p style={{ fontSize: "12px", fontWeight: 700, color: "#374151", margin: 0 }}>{yearsExp}</p>
//     //                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>Experience</p>
//     //                                 </div>
//     //                             </>
//     //                         )}
//     //                     </div>
//     //                 )}

//     //                 {bio && (
//     //                     <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.7", margin: "0 0 14px" }}>
//     //                         {bioExpanded ? bio : shortBio}
//     //                         {bio.length > BIO_LIMIT && (
//     //                             <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
//     //                                 {bioExpanded ? " Show Less" : " Read More"}
//     //                             </span>
//     //                         )}
//     //                     </p>
//     //                 )}

//     //                 {areas.length > 0 && (
//     //                     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
//     //                         {areas.slice(0, 4).map((a, i) => (
//     //                             <span key={i} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>
//     //                         ))}
//     //                         {areas.length > 4 && <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}`, cursor: "pointer" }}>+{areas.length - 4} More</span>}
//     //                     </div>
//     //                 )}

//     //                 <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", fontSize: "13px" }}>
//     //                     {(mentor.targetAudience || mentor.forAudience) && (
//     //                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//     //                             <Briefcase size={13} color="#9ca3af" strokeWidth={2} />
//     //                             <span style={{ color: "#9ca3af" }}>For:</span>{" "}
//     //                             <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetAudience || mentor.forAudience}</span>
//     //                         </span>
//     //                     )}
//     //                     {mentor.targetingDomains && (
//     //                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//     //                             <Target size={13} color="#9ca3af" strokeWidth={2} />
//     //                             <span style={{ color: "#9ca3af" }}>Targeting Domains:</span>{" "}
//     //                             <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetingDomains}</span>
//     //                         </span>
//     //                     )}
//     //                     {!mentor.targetingDomains && (mentor.fieldOfStudy || mentor.highestDegree) && (
//     //                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//     //                             <Target size={13} color="#9ca3af" strokeWidth={2} />
//     //                             <span style={{ color: "#9ca3af" }}>Field:</span>{" "}
//     //                             <span style={{ color: "#111827", fontWeight: 600, textTransform: "capitalize" }}>
//     //                                 {mentor.fieldOfStudy || ""}{mentor.fieldOfStudy && mentor.highestDegree ? " · " : ""}{mentor.highestDegree || ""}
//     //                             </span>
//     //                         </span>
//     //                     )}
//     //                 </div>
//     //             </div>

//     //             {/* RIGHT */}
//     //             <div style={{ width: "270px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
//     //                 <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
//     //                     {PLANS.map((p) => {
//     //                         const isActive = activePlan === p.key;
//     //                         return (
//     //                             <button key={p.key} onClick={() => setActivePlan(p.key)} style={{ flex: 1, padding: "14px 6px", background: "transparent", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : "#9ca3af", fontSize: "13px", fontWeight: isActive ? 700 : 500, cursor: "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px" }}>
//     //                                 {p.label}
//     //                             </button>
//     //                         );
//     //                     })}
//     //                 </div>
//     //                 <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
//     //                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//     //                         <FaClock size={14} color="#1d8e85" />
//     //                         <span style={{ fontSize: "13px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong> Sessions Per Week</span>
//     //                     </div>
//     //                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//     //                         <FaBriefcase size={14} color="#1d8e85" />
//     //                         <span style={{ fontSize: "13px", color: "#374151" }}>Referrals in Top Companies</span>
//     //                     </div>
//     //                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//     //                         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//     //                             <span style={{ fontSize: "15px" }}>💎</span>
//     //                             <span style={{ fontSize: "13px", color: "#374151" }}>Detailed Curriculum Available</span>
//     //                         </div>
//     //                         <span style={{ color: BLUE, fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>View ↗</span>
//     //                     </div>
//     //                     <div style={{ marginTop: "4px" }}>
//     //                         <span style={{ fontSize: "30px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
//     //                         <span style={{ fontSize: "13px", color: "#9ca3af" }}>/session</span>
//     //                     </div>
//     //                 </div>
//     //                 <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
//     //                     <button style={{ width: "100%", padding: "11px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "all .15s" }}
//     //                         onMouseEnter={(e) => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#9ca3af"; }}
//     //                         onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#d1d5db"; }}
//     //                     >
//     //                         View Profile
//     //                     </button>
//     //                     <div>
//     //                         <button onClick={() => onSubscribe(mentor)} style={{ width: "100%", padding: "12px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "background .15s" }}
//     //                             onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
//     //                             onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
//     //                         >
//     //                             Book a Free Trial
//     //                         </button>
//     //                         {nextAvail && (
//     //                             <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", margin: "6px 0 0" }}>
//     //                                 Next Available: <span style={{ color: BLUE, fontWeight: 600 }}>{nextAvail}</span>
//     //                             </p>
//     //                         )}
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </motion.article>
//     //     );
//     // }

//     // // ── Filter Sidebar ───────────────────────────────────────────────────────────
//     // function FilterSidebar({ onSearch, isSearching, onClear, isOpen, onClose }) {
//     //     const width = useWindowWidth();
//     //     const isMobile = width < 1024;

//     //     const [selectedDomains, setSelectedDomains] = useState([]);
//     //     const [offeringFor, setOfferingFor] = useState("Working Professionals");
//     //     const [priceVal, setPriceVal] = useState(7000);

//     //     const toggleDomain = (d) =>
//     //         setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

//     //     const handleClear = () => { setSelectedDomains([]); setPriceVal(7000); onClear(); };

//     //     const sidebarContent = (
//     //         <div style={{ width: isMobile ? "100%" : "300px", background: "white", borderRadius: isMobile ? 0 : "12px", padding: "20px 22px", fontFamily: FONT, ...(isMobile ? {} : { border: "1px solid #e5e7eb", alignSelf: "flex-start", position: "sticky", top: "80px", flexShrink: 0 }) }}>
//     //             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
//     //                 <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", margin: 0 }}>Filter By</h3>
//     //                 <div style={{ display: "flex", gap: "10px" }}>
//     //                     <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
//     //                         <X size={12} /> Clear
//     //                     </button>
//     //                     {isMobile && (
//     //                         <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex", alignItems: "center" }}>
//     //                             <X size={18} />
//     //                         </button>
//     //                     )}
//     //                 </div>
//     //             </div>

//     //             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Domain</p>

//     //             {selectedDomains.length > 0 && (
//     //                 <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px", minHeight: "42px" }}>
//     //                     {selectedDomains.map((d) => (
//     //                         <span key={d} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}>
//     //                             {d}
//     //                             <button onClick={() => toggleDomain(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}><X size={11} /></button>
//     //                         </span>
//     //                     ))}
//     //                 </div>
//     //             )}

//     //             <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
//     //                 {DOMAIN_CHIPS.map((d) => {
//     //                     const active = selectedDomains.includes(d);
//     //                     return (
//     //                         <button key={d} onClick={() => toggleDomain(d)} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151", border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
//     //                             {d}
//     //                         </button>
//     //                     );
//     //                 })}
//     //             </div>

//     //             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

//     //             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Offering Mentorship For</p>
//     //             <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 36px 10px 14px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxSizing: "border-box", marginBottom: "24px" }}>
//     //                 <option>Working Professionals</option>
//     //                 <option>Students</option>
//     //                 <option>Freshers</option>
//     //                 <option>Entrepreneurs</option>
//     //             </select>

//     //             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

//     //             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Pricing</p>
//     //             <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>
//     //                 <span>₹5,000</span><span>₹10,000</span>
//     //             </div>
//     //             <input type="range" min={5000} max={10000} step={500} value={priceVal} onChange={(e) => setPriceVal(Number(e.target.value))} style={{ width: "100%", accentColor: BLUE, cursor: "pointer" }} />
//     //             <p style={{ fontSize: "12px", color: BLUE, fontWeight: 600, margin: "6px 0 0" }}>Up to {fmtINR(priceVal)}/month</p>

//     //             <button onClick={() => { onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains }); if (isMobile) onClose(); }} disabled={isSearching} style={{ marginTop: "20px", width: "100%", padding: "11px", background: isSearching ? "#93c5fd" : BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT }}>
//     //                 {isSearching ? "Applying…" : "Apply Filters"}
//     //             </button>
//     //         </div>
//     //     );

//     //     if (!isMobile) return sidebarContent;

//     //     // Mobile: slide-up drawer
//     //     return (
//     //         <AnimatePresence>
//     //             {isOpen && (
//     //                 <>
//     //                     <motion.div
//     //                         key="filter-overlay"
//     //                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//     //                         onClick={onClose}
//     //                         style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.4)", backdropFilter: "blur(2px)" }}
//     //                     />
//     //                     <motion.div
//     //                         key="filter-drawer"
//     //                         initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
//     //                         transition={{ type: "spring", damping: 28, stiffness: 300 }}
//     //                         style={{
//     //                             position: "fixed", bottom: 0, left: 0, right: 0,
//     //                             maxHeight: "85vh", zIndex: 201,
//     //                             background: "white", borderRadius: "20px 20px 0 0",
//     //                             overflowY: "auto",
//     //                         }}
//     //                     >
//     //                         <div style={{ width: "36px", height: "4px", background: "#d1d5db", borderRadius: "2px", margin: "12px auto 0" }} />
//     //                         {sidebarContent}
//     //                     </motion.div>
//     //                 </>
//     //             )}
//     //         </AnimatePresence>
//     //     );
//     // }

//     // // ── Root ─────────────────────────────────────────────────────────────────────
//     // export default function ExploreMentors() {
//     //     const navigate = useNavigate();
//     //     const location = useLocation();
//     //     const width = useWindowWidth();
//     //     const isMobile = width < 640;
//     //     const isTabletOrBelow = width < 1024;

//     //     const { data, isLoading, isError } = useGetLtmAllMentorsQuery();
//     //     const [searchMentors, { isLoading: isSearching }] = useSearchMentorMutation();
//     //     const [advancedFilter] = useAdvancedFilterMentorsMutation();

//     //     const allMentors = data?.data ?? [];
//     //     const [displayMentors, setDisplayMentors] = useState(null);
//     //     const [isFiltered, setIsFiltered] = useState(false);
//     //     const [searchEmpty, setSearchEmpty] = useState(false);
//     //     const [activeMentor, setActiveMentor] = useState(null);
//     //     const [searchQuery, setSearchQuery] = useState("");
//     //     const [sortBy, setSortBy] = useState("Recommended");
//     //     const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
//     //     const [mobileNavOpen, setMobileNavOpen] = useState(false);

//     //     const mentors = isFiltered ? (displayMentors || []) : allMentors;

//     //     const handleClear = () => {
//     //         setIsFiltered(false);
//     //         setDisplayMentors(null);
//     //         setSearchEmpty(false);
//     //     };

//     //     const handleSearch = async (body) => {
//     //         try {
//     //             const response = await searchMentors(body).unwrap();
//     //             const result = response?.data || [];
//     //             setDisplayMentors(result);
//     //             setIsFiltered(true);
//     //             setSearchEmpty(result.length === 0);
//     //         } catch {
//     //             setDisplayMentors([]);
//     //             setIsFiltered(true);
//     //             setSearchEmpty(true);
//     //         }
//     //     };

//     //     const handleSortChange = async (value) => {
//     //         setSortBy(value);
//     //         if (value === "Recommended") { handleClear(); return; }
//     //         const sortMap = {
//     //             "Price: Low to High": { sortBy: "price", order: "asc" },
//     //             "Price: High to Low": { sortBy: "price", order: "desc" },
//     //             "Most Experienced": { sortBy: "experience", order: "desc" },
//     //         };
//     //         const body = sortMap[value];
//     //         if (!body) return;
//     //         try {
//     //             const response = await advancedFilter(body).unwrap();
//     //             const result = response?.data || [];
//     //             setDisplayMentors(result);
//     //             setIsFiltered(true);
//     //             setSearchEmpty(result.length === 0);
//     //         } catch {
//     //             setDisplayMentors([]);
//     //             setIsFiltered(true);
//     //             setSearchEmpty(true);
//     //         }
//     //     };

//     //     return (
//     //         <>
//     //             {/* ── Header ── */}
//     //             <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #f0f0f0", fontFamily: FONT }}>
//     //                 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//     //                     <div
//     //                         onClick={() => navigate("/")}
//     //                         style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
//     //                     >
//     //                         <img
//     //                             src={KarrivoLogo}
//     //                             className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain"
//     //                             alt="Logo"
//     //                         />
//     //                     </div>

//     //                     {/* Desktop nav */}
//     //                     {!isMobile && (
//     //                         <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
//     //                             {NAV_LINKS.map((link) => {
//     //                                 const isActive = location.pathname === link.path;
//     //                                 return (
//     //                                     <button key={link.path} onClick={() => navigate(link.path)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 500, color: isActive ? "#111827" : "#6b7280", padding: 0 }}>
//     //                                         {link.label}
//     //                                     </button>
//     //                                 );
//     //                             })}
//     //                         </nav>
//     //                     )}

//     //                     {/* Mobile hamburger */}
//     //                     {isMobile && (
//     //                         <button onClick={() => setMobileNavOpen(!mobileNavOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#374151", display: "flex", flexDirection: "column", gap: "4px" }}>
//     //                             <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", transition: "all .2s", transform: mobileNavOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
//     //                             <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", opacity: mobileNavOpen ? 0 : 1 }} />
//     //                             <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", transition: "all .2s", transform: mobileNavOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
//     //                         </button>
//     //                     )}
//     //                 </div>

//     //                 {/* Mobile nav dropdown */}
//     //                 <AnimatePresence>
//     //                     {isMobile && mobileNavOpen && (
//     //                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderTop: "1px solid #f0f0f0", background: "white" }}>
//     //                             {NAV_LINKS.map((link) => (
//     //                                 <button key={link.path} onClick={() => { navigate(link.path); setMobileNavOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 500, color: location.pathname === link.path ? BLUE : "#374151", borderBottom: "1px solid #f9fafb" }}>
//     //                                     {link.label}
//     //                                 </button>
//     //                             ))}
//     //                         </motion.div>
//     //                     )}
//     //                 </AnimatePresence>
//     //             </header>

//     //             {/* ── Main ── */}
//     //             <main style={{ minHeight: "100vh", background: "#f9fafb", padding: isMobile ? "16px" : "24px", fontFamily: FONT }}>
//     //                 <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

//     //                     {/* Search + Sort + Filter bar */}
//     //                     <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
//     //                         {/* Search */}
//     //                         <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative" }}>
//     //                             <Search size={15} color="#9ca3af" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
//     //                             <input
//     //                                 value={searchQuery}
//     //                                 onChange={(e) => setSearchQuery(e.target.value)}
//     //                                 placeholder={isMobile ? "Search skills, domain..." : "Search for any Skill, domain or name..."}
//     //                                 onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
//     //                                 style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
//     //                                 onFocus={(e) => (e.target.style.borderColor = BLUE)}
//     //                                 onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//     //                             />
//     //                         </div>

//     //                         <div style={{ display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto" }}>
//     //                             {/* Sort */}
//     //                             <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: isMobile ? 1 : "none" }}>
//     //                                 {!isMobile && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500, whiteSpace: "nowrap" }}>Sort by:</span>}
//     //                                 <select
//     //                                     value={sortBy}
//     //                                     onChange={(e) => handleSortChange(e.target.value)}
//     //                                     style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 32px 10px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", boxShadow: "0 1px 3px rgba(0,0,0,.04)", minWidth: isMobile ? 0 : "180px" }}
//     //                                 >
//     //                                     <option>Recommended</option>
//     //                                     <option>Price: Low to High</option>
//     //                                     <option>Price: High to Low</option>
//     //                                     <option>Most Experienced</option>
//     //                                 </select>
//     //                             </div>

//     //                             {/* Filter button (tablet/mobile) */}
//     //                             {isTabletOrBelow && (
//     //                                 <button
//     //                                     onClick={() => setFilterDrawerOpen(true)}
//     //                                     style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white", cursor: "pointer", fontFamily: FONT, fontSize: "13px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
//     //                                 >
//     //                                     <SlidersHorizontal size={14} />
//     //                                     Filters
//     //                                 </button>
//     //                             )}
//     //                         </div>
//     //                     </div>

//     //                     {/* Mentor count */}
//     //                     {!isLoading && !isError && mentors.length > 0 && (
//     //                         <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px" }}>
//     //                             Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
//     //                         </p>
//     //                     )}

//     //                     {/* Cards + Sidebar */}
//     //                     <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
//     //                         <div style={{ flex: 1, minWidth: 0 }}>
//     //                             {isLoading && (
//     //                                 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
//     //                                     <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `3px solid ${BLUE_BORDER}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
//     //                                     <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     //                                 </div>
//     //                             )}
//     //                             {isError && !isLoading && <Loader />}
//     //                             {!isLoading && !isError && searchEmpty && (
//     //                                 <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
//     //                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</p>
//     //                                     <p style={{ fontWeight: 600, color: "#374151" }}>No mentors match your filters</p>
//     //                                     <p style={{ fontSize: "13px", color: "#9ca3af" }}>Try adjusting your criteria</p>
//     //                                 </div>
//     //                             )}
//     //                             {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
//     //                                 <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//     //                                     {mentors.map((mentor, index) => (
//     //                                         <MentorCard key={mentor._id || index} mentor={mentor} index={index} onSubscribe={setActiveMentor} />
//     //                                     ))}
//     //                                 </div>
//     //                             )}
//     //                             {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
//     //                                 <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
//     //                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
//     //                                     <p style={{ fontWeight: 600, color: "#374151" }}>No mentors available</p>
//     //                                 </div>
//     //                             )}
//     //                         </div>

//     //                         {/* Desktop sidebar */}
//     //                         {!isTabletOrBelow && (
//     //                             <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={false} onClose={() => { }} />
//     //                         )}
//     //                     </div>
//     //                 </div>

//     //                 {/* Mobile/Tablet filter drawer */}
//     //                 {isTabletOrBelow && (
//     //                     <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} />
//     //                 )}

//     //                 <AnimatePresence>
//     //                     {activeMentor && (
//     //                         <>
//     //                             <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMentor(null)} style={{ position: "fixed", inset: 0, zIndex: 299, background: "rgba(0,0,0,.35)", backdropFilter: "blur(3px)" }} />
//     //                             <SubscribePanel key="panel" mentor={activeMentor} onClose={() => setActiveMentor(null)} />
//     //                         </>
//     //                     )}
//     //                 </AnimatePresence>
//     //             </main>
//     //         </>
//     //     );
//     // }




//     import { useState, useEffect } from "react";
// import { FaBriefcase, FaClock } from "react-icons/fa";
// import { MapPin, Users, X, ChevronDown, ChevronUp, CheckCircle, Search, Pencil, Briefcase, Target, Building2, SlidersHorizontal } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//     useGetLtmAllMentorsQuery,
//     useSearchMentorMutation,
//     useAdvancedFilterMentorsMutation,
// } from "./exploreMentorsapislice";
// import Loader from "../../global/Loader";

// const link = document.createElement("link");
// link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
// link.rel = "stylesheet";
// document.head.appendChild(link);

// const BLUE = "#2563eb";
// const BLUE_LIGHT = "#eff6ff";
// const BLUE_BORDER = "#bfdbfe";
// const FONT = "'Inter', sans-serif";

// const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

// const PLANS = [
//     { key: "sixMonths", label: "6 Mon" },
//     { key: "threeMonths", label: "3 Mon" },
//     { key: "oneMonth", label: "1 Mon" },
// ];

// const DOMAIN_CHIPS = [
//     "Frontend", "Backend", "Fullstack",
//     "DevOps / SRE / Cloud", "QA / Automation Testing",
//     "Data Scientist / AI/ML", "Data Analyst",
// ];

// const NAV_LINKS = [
//     { label: "Explore Mentors", path: "/explore-mentors" },
//     { label: "AI Mentors", path: "/ai-mentors" },
//     { label: "Success Stories", path: "/success-stories" },
// ];

// // ── useWindowWidth hook ──────────────────────────────────────────────────────
// function useWindowWidth() {
//     const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
//     useEffect(() => {
//         const handler = () => setWidth(window.innerWidth);
//         window.addEventListener("resize", handler);
//         return () => window.removeEventListener("resize", handler);
//     }, []);
//     return width;
// }

// // ── Subscribe Panel ──────────────────────────────────────────────────────────
// function SubscribePanel({ mentor, onClose }) {
//     const width = useWindowWidth();
//     const isMobile = width < 640;
//     const availability = mentor.availability ?? [];
//     const [selected, setSelected] = useState({});
//     const [openDay, setOpenDay] = useState(null);
//     const [planKey, setPlanKey] = useState("oneMonth");

//     const toggleSlot = (di, si) => {
//         const k = `${di}_${si}`;
//         setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
//     };

//     const selectedCount = Object.values(selected).filter(Boolean).length;
//     const totalSessions = mentor.pricing?.plans?.[planKey]?.totalSessions ?? 0;
//     const totalPrice = mentor.pricing?.plans?.[planKey]?.totalPrice ?? 0;

//     const panelStyle = isMobile
//         ? {
//             position: "fixed", bottom: 0, left: 0, right: 0,
//             height: "85vh", width: "100%",
//             background: "white", zIndex: 300,
//             boxShadow: "0 -8px 40px rgba(0,0,0,.15)",
//             display: "flex", flexDirection: "column", fontFamily: FONT,
//             borderRadius: "20px 20px 0 0",
//         }
//         : {
//             position: "fixed", top: 0, right: 0, bottom: 0,
//             width: "420px", maxWidth: "100vw",
//             background: "white", zIndex: 300,
//             boxShadow: "-8px 0 40px rgba(0,0,0,.15)",
//             display: "flex", flexDirection: "column", fontFamily: FONT,
//         };

//     const motionProps = isMobile
//         ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
//         : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

//     return (
//         <motion.div
//             {...motionProps}
//             transition={{ type: "spring", damping: 28, stiffness: 300 }}
//             style={panelStyle}
//         >
//             {isMobile && (
//                 <div style={{ width: "36px", height: "4px", background: "#d1d5db", borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0 }} />
//             )}
//             <div style={{ background: BLUE, padding: "20px 24px", flexShrink: 0, borderRadius: isMobile ? "20px 20px 0 0" : 0 }}>
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
//                     <h2 style={{ color: "white", fontWeight: 700, fontSize: "16px", margin: 0 }}>Subscribe to Mentor</h2>
//                     <button onClick={onClose} style={{ background: "rgba(255,255,255,.15)", border: "none", color: "white", borderRadius: "8px", width: "30px", height: "30px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <X size={16} />
//                     </button>
//                 </div>
//                 <p style={{ color: "rgba(255,255,255,.75)", fontSize: "13px", margin: 0 }}>
//                     {mentor.fullName} · {fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session
//                 </p>
//             </div>

//             <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
//                 <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Plan</p>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
//                     {PLANS.map((p) => {
//                         const sel = planKey === p.key;
//                         const planPrice = mentor.pricing?.plans?.[p.key]?.totalPrice ?? 0;
//                         const planSessions = mentor.pricing?.weeklySessions ?? 0;
//                         return (
//                             <div key={p.key} onClick={() => setPlanKey(p.key)} style={{ border: `2px solid ${sel ? BLUE : "#e5e7eb"}`, borderRadius: "12px", padding: "14px 16px", background: sel ? BLUE_LIGHT : "white", cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: "12px" }}>
//                                 <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: sel ? BLUE : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                                     {sel && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "white" }} />}
//                                 </div>
//                                 <div style={{ flex: 1 }}>
//                                     <p style={{ fontWeight: 700, fontSize: "13px", color: sel ? "#1d4ed8" : "#111827", margin: "0 0 2px" }}>{p.label}</p>
//                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{planSessions} sessions/week</p>
//                                 </div>
//                                 <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#111827", margin: 0 }}>{fmtINR(planPrice)}</p>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {availability.length > 0 ? (
//                     <>
//                         <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Availability Slots</p>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             {DAY_ORDER.map((day, di) => {
//                                 const dayData = availability.find((d) => d.day === day);
//                                 if (!dayData) return null;
//                                 const openSlots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
//                                 const isOpen = openDay === day;
//                                 const selectedInDay = openSlots.filter((_, si) => selected[`${di}_${si}`]).length;
//                                 return (
//                                     <div key={day} style={{ border: `1.5px solid ${selectedInDay ? BLUE : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", background: selectedInDay ? BLUE_LIGHT : "white", transition: "all .15s" }}>
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
//                                                                 <button key={slot._id} onClick={() => toggleSlot(di, si)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`, background: isSel ? "white" : "#fafafa", cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
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
//                     <div style={{ textAlign: "center", padding: "20px", background: "#f9fafb", borderRadius: "10px", border: "1px dashed #e5e7eb" }}>
//                         <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>No availability slots set yet</p>
//                     </div>
//                 )}
//             </div>

//             <div style={{ borderTop: "1px solid #e5e7eb", padding: "16px 24px", background: "#fafafa", flexShrink: 0 }}>
//                 <div style={{ marginBottom: "12px" }}>
//                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em" }}>Total for {PLANS.find((p) => p.key === planKey)?.label}</p>
//                     <p style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>{fmtINR(totalPrice)}</p>
//                     {totalSessions > 0 && <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week</p>}
//                 </div>
//                 <button style={{ width: "100%", padding: "12px", background: BLUE, cursor: "pointer", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", fontFamily: FONT }}>
//                     {`Subscribe — ${fmtINR(totalPrice)}`}
//                 </button>
//                 <p style={{ textAlign: "center", color: "#d1d5db", fontSize: "11px", marginTop: "8px" }}>Secure checkout · Cancel anytime · 7-day refund policy</p>
//             </div>
//         </motion.div>
//     );
// }

// // ── Mentor Card ──────────────────────────────────────────────────────────────
// function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
//     const width = useWindowWidth();
//     const isMobile = width < 640;
//     const isTablet = width >= 640 && width < 1024;

//     const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
//         .split(",").map((s) => s.trim()).filter(Boolean);

//     const [activePlan, setActivePlan] = useState("oneMonth");
//     const [bioExpanded, setBioExpanded] = useState(false);

//     const planPrice = mentor.pricing?.plans?.[activePlan]?.totalPrice ?? 0;
//     const weeklySessions = mentor.pricing?.weeklySessions ?? 0;
//     const hourlyRate = mentor.pricing?.hourlyRate ?? mentor.hourlyRate ?? 0;

//     const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
//     const BIO_LIMIT = isMobile ? 120 : 180;
//     const shortBio = bio.length > BIO_LIMIT ? bio.slice(0, BIO_LIMIT) + "…" : bio;

//     const hasWork = mentor.currentRole || mentor.companyName;
//     const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Yrs` : null;

//     const languages = Array.isArray(mentor.languages)
//         ? mentor.languages.join(", ")
//         : mentor.languages || "";

//     const initials = (mentor.fullName || "M")
//         .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

//     const nextAvail = mentor.nextAvailable || null;
//     const mentoringStyle = mentor.mentoringStyle || null;

//     // ── MOBILE LAYOUT ──────────────────────────────────────────────────────
//     if (isMobile) {
//         return (
//             <motion.article
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 style={{
//                     width: "100%", border: "1px solid #e5e7eb", borderRadius: "14px",
//                     background: "white", display: "flex", flexDirection: "column",
//                     fontFamily: FONT, overflow: "hidden",
//                     boxShadow: "0 1px 4px rgba(0,0,0,.05)",
//                 }}
//             >
//                 {/* Top: avatar + name + tags */}
//                 <div style={{ padding: "16px 16px 12px" }}>
//                     <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
//                         <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                             <span style={{ fontWeight: 700, fontSize: "15px", color: BLUE }}>{initials}</span>
//                         </div>
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                             <h2 style={{ fontWeight: 800, fontSize: "17px", color: "#111827", margin: "0 0 3px", lineHeight: 1.2 }}>
//                                 {mentor.fullName || "Mentor"}
//                             </h2>
//                             {hasWork && (
//                                 <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                     {mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}
//                                 </p>
//                             )}
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
//                             <span style={{ fontSize: "22px", fontWeight: 800, color: "#111827" }}>{fmtINR(hourlyRate)}</span>
//                         </div>
//                     </div>

//                     {/* Tags row */}
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
//                         {mentoringStyle && (
//                             <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>
//                         )}
//                         {mentor.mentorCategory && (
//                             <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>
//                         )}
//                         {yearsExp && (
//                             <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp} exp</span>
//                         )}
//                     </div>

//                     {/* Meta row */}
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: bio ? "10px" : 0 }}>
//                         {mentor.location && (
//                             <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
//                                 <MapPin size={11} color="#9ca3af" strokeWidth={2} /> {mentor.location}
//                             </span>
//                         )}
//                         <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
//                             <Users size={11} color="#9ca3af" strokeWidth={2} /> {mentor.reviewCount ?? "1"}+ reviews
//                         </span>
//                         {languages && (
//                             <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}>
//                                 <Pencil size={10} color="#9ca3af" strokeWidth={2} /> {languages}
//                             </span>
//                         )}
//                     </div>

//                     {bio && (
//                         <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: 0 }}>
//                             {bioExpanded ? bio : shortBio}
//                             {bio.length > BIO_LIMIT && (
//                                 <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
//                                     {bioExpanded ? " Less" : " More"}
//                                 </span>
//                             )}
//                         </p>
//                     )}
//                 </div>

//                 {/* Skills chips */}
//                 {areas.length > 0 && (
//                     <div style={{ padding: "0 16px 12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                         {areas.slice(0, 3).map((a, i) => (
//                             <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>
//                         ))}
//                         {areas.length > 3 && (
//                             <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 3}</span>
//                         )}
//                     </div>
//                 )}

//                 {/* Plan tabs */}
//                 <div style={{ display: "flex", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
//                     {PLANS.map((p) => {
//                         const isActive = activePlan === p.key;
//                         return (
//                             <button key={p.key} onClick={() => setActivePlan(p.key)} style={{
//                                 flex: 1, padding: "10px 4px", background: "transparent", border: "none",
//                                 borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent",
//                                 color: isActive ? BLUE : "#9ca3af",
//                                 fontSize: "12px", fontWeight: isActive ? 700 : 500,
//                                 cursor: "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px",
//                             }}>
//                                 {p.label}
//                             </button>
//                         );
//                     })}
//                 </div>

//                 {/* Stats row */}
//                 <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                         <FaClock size={12} color="#1d8e85" />
//                         <span style={{ fontSize: "12px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                         <span style={{ fontSize: "12px", color: "#9ca3af" }}>Plan:</span>
//                         <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{fmtINR(planPrice)}</span>
//                     </div>
//                 </div>

//                 {/* CTA buttons */}
//                 <div style={{ padding: "0 16px 16px", display: "flex", gap: "8px" }}>
//                     <button onClick={() => onViewProfile(mentor)} style={{ flex: 1, padding: "10px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
//                         View Profile
//                     </button>
//                     <button onClick={() => onSubscribe(mentor)} style={{ flex: 1, padding: "10px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
//                         Book Trial
//                     </button>
//                 </div>
//             </motion.article>
//         );
//     }

//     // ── TABLET LAYOUT ──────────────────────────────────────────────────────
//     if (isTablet) {
//         return (
//             <motion.article
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 style={{
//                     width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px",
//                     background: "white", display: "flex", flexDirection: "column",
//                     fontFamily: FONT, overflow: "hidden",
//                     boxShadow: "0 1px 4px rgba(0,0,0,.05)",
//                 }}
//             >
//                 {/* Top section */}
//                 <div style={{ padding: "20px 20px 0", display: "flex", gap: "14px" }}>
//                     <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                         <span style={{ fontWeight: 700, fontSize: "15px", color: BLUE }}>{initials}</span>
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "4px" }}>
//                             <h2 style={{ fontWeight: 800, fontSize: "18px", color: "#111827", margin: 0 }}>{mentor.fullName || "Mentor"}</h2>
//                             <div>
//                                 <span style={{ fontSize: "26px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
//                                 <span style={{ fontSize: "12px", color: "#9ca3af" }}>/session</span>
//                             </div>
//                         </div>
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
//                             {mentoringStyle && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
//                             {mentor.mentorCategory && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
//                             {yearsExp && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp} exp</span>}
//                         </div>
//                         {hasWork && <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 6px" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//                             {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#6b7280" }}><MapPin size={12} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
//                             <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#6b7280" }}><Users size={12} color="#9ca3af" strokeWidth={2} />{mentor.reviewCount ?? "1"}+ reviews</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bio */}
//                 {bio && (
//                     <div style={{ padding: "12px 20px 0" }}>
//                         <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: 0 }}>
//                             {bioExpanded ? bio : shortBio}
//                             {bio.length > BIO_LIMIT && (
//                                 <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
//                                     {bioExpanded ? " Less" : " More"}
//                                 </span>
//                             )}
//                         </p>
//                     </div>
//                 )}

//                 {/* Skills */}
//                 {areas.length > 0 && (
//                     <div style={{ padding: "10px 20px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                         {areas.slice(0, 4).map((a, i) => (
//                             <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 12px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>
//                         ))}
//                         {areas.length > 4 && <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 4}</span>}
//                     </div>
//                 )}

//                 {/* Bottom: plan tabs + stats + CTA */}
//                 <div style={{ marginTop: "auto", borderTop: "1px solid #f0f0f0" }}>
//                     <div style={{ display: "flex" }}>
//                         {PLANS.map((p) => {
//                             const isActive = activePlan === p.key;
//                             return (
//                                 <button key={p.key} onClick={() => setActivePlan(p.key)} style={{ flex: 1, padding: "10px 6px", background: "transparent", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : "#9ca3af", fontSize: "12px", fontWeight: isActive ? 700 : 500, cursor: "pointer", fontFamily: FONT, marginBottom: "-1px" }}>
//                                     {p.label}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                     <div style={{ padding: "12px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
//                             <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#374151" }}><FaClock size={12} color="#1d8e85" /><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week</span>
//                             <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>{fmtINR(planPrice)} <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>plan total</span></span>
//                         </div>
//                         <div style={{ display: "flex", gap: "8px" }}>
//                             <button onClick={() => onViewProfile(mentor)} style={{ padding: "9px 16px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>Profile</button>
//                             <button onClick={() => onSubscribe(mentor)} style={{ padding: "9px 18px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>Book Trial</button>
//                         </div>
//                     </div>
//                 </div>
//             </motion.article>
//         );
//     }

//     // ── DESKTOP LAYOUT (original, kept intact) ─────────────────────────────
//     return (
//         <motion.article
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.05 }}
//             style={{
//                 width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px",
//                 background: "white", display: "flex", fontFamily: FONT,
//                 overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)",
//                 transition: "box-shadow .2s",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)")}
//             onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)")}
//         >
//             {/* LEFT */}
//             <div style={{ flex: 1, padding: "24px 28px", borderRight: "1px solid #f0f0f0", minWidth: 0 }}>
//                 <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
//                     <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                         <span style={{ fontWeight: 700, fontSize: "16px", color: BLUE }}>{initials}</span>
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
//                             <h2 style={{ fontWeight: 800, fontSize: "20px", color: "#111827", margin: 0 }}>{mentor.fullName || "Mentor"}</h2>
//                             {mentoringStyle && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
//                             {mentor.mentorCategory && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
//                         </div>
//                         {hasWork && <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
//                     </div>
//                 </div>

//                 <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
//                     {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><MapPin size={13} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
//                     <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Users size={13} color="#9ca3af" strokeWidth={2} />{mentor.reviewCount ?? "1"}+ reviews</span>
//                     {languages && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Pencil size={12} color="#9ca3af" strokeWidth={2} />{languages}</span>}
//                     {yearsExp && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Building2 size={13} color="#9ca3af" strokeWidth={2} />{yearsExp} exp</span>}
//                 </div>

//                 {hasWork && (
//                     <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "14px", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "8px 14px" }}>
//                         <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>
//                             {(mentor.companyName || "?").slice(0, 2).toUpperCase()}
//                         </div>
//                         <div>
//                             <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", margin: 0 }}>{mentor.currentRole || "—"}</p>
//                             <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{mentor.companyName || "—"}</p>
//                         </div>
//                         {yearsExp && (
//                             <>
//                                 <span style={{ color: "#e5e7eb", fontSize: "18px", lineHeight: 1 }}>|</span>
//                                 <div>
//                                     <p style={{ fontSize: "12px", fontWeight: 700, color: "#374151", margin: 0 }}>{yearsExp}</p>
//                                     <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>Experience</p>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 )}

//                 {bio && (
//                     <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.7", margin: "0 0 14px" }}>
//                         {bioExpanded ? bio : shortBio}
//                         {bio.length > BIO_LIMIT && (
//                             <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
//                                 {bioExpanded ? " Show Less" : " Read More"}
//                             </span>
//                         )}
//                     </p>
//                 )}

//                 {areas.length > 0 && (
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
//                         {areas.slice(0, 4).map((a, i) => (
//                             <span key={i} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>
//                         ))}
//                         {areas.length > 4 && <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}`, cursor: "pointer" }}>+{areas.length - 4} More</span>}
//                     </div>
//                 )}

//                 <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", fontSize: "13px" }}>
//                     {(mentor.targetAudience || mentor.forAudience) && (
//                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                             <Briefcase size={13} color="#9ca3af" strokeWidth={2} />
//                             <span style={{ color: "#9ca3af" }}>For:</span>{" "}
//                             <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetAudience || mentor.forAudience}</span>
//                         </span>
//                     )}
//                     {mentor.targetingDomains && (
//                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                             <Target size={13} color="#9ca3af" strokeWidth={2} />
//                             <span style={{ color: "#9ca3af" }}>Targeting Domains:</span>{" "}
//                             <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetingDomains}</span>
//                         </span>
//                     )}
//                     {!mentor.targetingDomains && (mentor.fieldOfStudy || mentor.highestDegree) && (
//                         <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                             <Target size={13} color="#9ca3af" strokeWidth={2} />
//                             <span style={{ color: "#9ca3af" }}>Field:</span>{" "}
//                             <span style={{ color: "#111827", fontWeight: 600, textTransform: "capitalize" }}>
//                                 {mentor.fieldOfStudy || ""}{mentor.fieldOfStudy && mentor.highestDegree ? " · " : ""}{mentor.highestDegree || ""}
//                             </span>
//                         </span>
//                     )}
//                 </div>
//             </div>

//             {/* RIGHT */}
//             <div style={{ width: "270px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
//                 <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
//                     {PLANS.map((p) => {
//                         const isActive = activePlan === p.key;
//                         return (
//                             <button key={p.key} onClick={() => setActivePlan(p.key)} style={{ flex: 1, padding: "14px 6px", background: "transparent", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : "#9ca3af", fontSize: "13px", fontWeight: isActive ? 700 : 500, cursor: "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px" }}>
//                                 {p.label}
//                             </button>
//                         );
//                     })}
//                 </div>
//                 <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                         <FaClock size={14} color="#1d8e85" />
//                         <span style={{ fontSize: "13px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong> Sessions Per Week</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                         <FaBriefcase size={14} color="#1d8e85" />
//                         <span style={{ fontSize: "13px", color: "#374151" }}>Referrals in Top Companies</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                             <span style={{ fontSize: "15px" }}>💎</span>
//                             <span style={{ fontSize: "13px", color: "#374151" }}>Detailed Curriculum Available</span>
//                         </div>
//                         <span style={{ color: BLUE, fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>View ↗</span>
//                     </div>
//                     <div style={{ marginTop: "4px" }}>
//                         <span style={{ fontSize: "30px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
//                         <span style={{ fontSize: "13px", color: "#9ca3af" }}>/session</span>
//                     </div>
//                 </div>
//                 <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
//                     <button
//                         onClick={() => onViewProfile(mentor)}
//                         style={{ width: "100%", padding: "11px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "all .15s" }}
//                         onMouseEnter={(e) => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#9ca3af"; }}
//                         onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#d1d5db"; }}
//                     >
//                         View Profile
//                     </button>
//                     <div>
//                         <button onClick={() => onSubscribe(mentor)} style={{ width: "100%", padding: "12px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "background .15s" }}
//                             onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
//                             onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
//                         >
//                             Book a Free Trial
//                         </button>
//                         {nextAvail && (
//                             <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", margin: "6px 0 0" }}>
//                                 Next Available: <span style={{ color: BLUE, fontWeight: 600 }}>{nextAvail}</span>
//                             </p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </motion.article>
//     );
// }

// // ── Filter Sidebar ───────────────────────────────────────────────────────────
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
//         <div style={{ width: isMobile ? "100%" : "300px", background: "white", borderRadius: isMobile ? 0 : "12px", padding: "20px 22px", fontFamily: FONT, ...(isMobile ? {} : { border: "1px solid #e5e7eb", alignSelf: "flex-start", position: "sticky", top: "80px", flexShrink: 0 }) }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
//                 <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", margin: 0 }}>Filter By</h3>
//                 <div style={{ display: "flex", gap: "10px" }}>
//                     <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
//                         <X size={12} /> Clear
//                     </button>
//                     {isMobile && (
//                         <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex", alignItems: "center" }}>
//                             <X size={18} />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Domain</p>

//             {selectedDomains.length > 0 && (
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px", minHeight: "42px" }}>
//                     {selectedDomains.map((d) => (
//                         <span key={d} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}>
//                             {d}
//                             <button onClick={() => toggleDomain(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}><X size={11} /></button>
//                         </span>
//                     ))}
//                 </div>
//             )}

//             <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
//                 {DOMAIN_CHIPS.map((d) => {
//                     const active = selectedDomains.includes(d);
//                     return (
//                         <button key={d} onClick={() => toggleDomain(d)} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151", border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
//                             {d}
//                         </button>
//                     );
//                 })}
//             </div>

//             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

//             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Offering Mentorship For</p>
//             <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 36px 10px 14px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxSizing: "border-box", marginBottom: "24px" }}>
//                 <option>Working Professionals</option>
//                 <option>Students</option>
//                 <option>Freshers</option>
//                 <option>Entrepreneurs</option>
//             </select>

//             <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

//             <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Pricing</p>
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>
//                 <span>₹5,000</span><span>₹10,000</span>
//             </div>
//             <input type="range" min={5000} max={10000} step={500} value={priceVal} onChange={(e) => setPriceVal(Number(e.target.value))} style={{ width: "100%", accentColor: BLUE, cursor: "pointer" }} />
//             <p style={{ fontSize: "12px", color: BLUE, fontWeight: 600, margin: "6px 0 0" }}>Up to {fmtINR(priceVal)}/month</p>

//             <button onClick={() => { onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains }); if (isMobile) onClose(); }} disabled={isSearching} style={{ marginTop: "20px", width: "100%", padding: "11px", background: isSearching ? "#93c5fd" : BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT }}>
//                 {isSearching ? "Applying…" : "Apply Filters"}
//             </button>
//         </div>
//     );

//     if (!isMobile) return sidebarContent;

//     // Mobile: slide-up drawer
//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     <motion.div
//                         key="filter-overlay"
//                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.4)", backdropFilter: "blur(2px)" }}
//                     />
//                     <motion.div
//                         key="filter-drawer"
//                         initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
//                         transition={{ type: "spring", damping: 28, stiffness: 300 }}
//                         style={{
//                             position: "fixed", bottom: 0, left: 0, right: 0,
//                             maxHeight: "85vh", zIndex: 201,
//                             background: "white", borderRadius: "20px 20px 0 0",
//                             overflowY: "auto",
//                         }}
//                     >
//                         <div style={{ width: "36px", height: "4px", background: "#d1d5db", borderRadius: "2px", margin: "12px auto 0" }} />
//                         {sidebarContent}
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// }

// // ── Root ─────────────────────────────────────────────────────────────────────
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
//     const [activeMentor, setActiveMentor] = useState(null);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortBy, setSortBy] = useState("Recommended");
//     const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
//     const [mobileNavOpen, setMobileNavOpen] = useState(false);

//     const mentors = isFiltered ? (displayMentors || []) : allMentors;

//     const handleClear = () => {
//         setIsFiltered(false);
//         setDisplayMentors(null);
//         setSearchEmpty(false);
//     };

//     const handleSearch = async (body) => {
//         try {
//             const response = await searchMentors(body).unwrap();
//             const result = response?.data || [];
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
//             "Price: Low to High": { sortBy: "price", order: "asc" },
//             "Price: High to Low": { sortBy: "price", order: "desc" },
//             "Most Experienced": { sortBy: "experience", order: "desc" },
//         };
//         const body = sortMap[value];
//         if (!body) return;
//         try {
//             const response = await advancedFilter(body).unwrap();
//             const result = response?.data || [];
//             setDisplayMentors(result);
//             setIsFiltered(true);
//             setSearchEmpty(result.length === 0);
//         } catch {
//             setDisplayMentors([]);
//             setIsFiltered(true);
//             setSearchEmpty(true);
//         }
//     };

//     // ── View Profile → /mentor-profile/:id (same as BookingsSection) ──
//     const handleViewProfile = (mentor) => {
//         navigate(`/mentor-profile/${mentor._id}`);
//     };

//     // ── Book Trial → auth check → SubscribePanel (same as BookingsSection) ──
//     const handleBookTrial = (mentor) => {
//         const isLoggedIn = !!localStorage.getItem("authToken");
//         if (!isLoggedIn) {
//             navigate(`/login?mentorId=${mentor._id}`);
//             return;
//         }
//         setActiveMentor(mentor);
//     };

//     return (
//         <>
//             {/* ── Header ── */}
//             <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #f0f0f0", fontFamily: FONT }}>
//                 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
//                         <div style={{ position: "relative", width: "22px", height: "22px", flexShrink: 0 }}>
//                             <div style={{ position: "absolute", bottom: 0, right: 0, width: "15px", height: "15px", background: "#2563eb", borderRadius: "3px" }} />
//                             <div style={{ position: "absolute", top: 0, left: 0, width: "15px", height: "15px", background: "#f97316", borderRadius: "3px" }} />
//                         </div>
//                         <span style={{ fontWeight: 700, fontSize: "18px", color: "#111827", letterSpacing: "-0.3px" }}>Karrivo</span>
//                     </div>

//                     {/* Desktop nav */}
//                     {!isMobile && (
//                         <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
//                             {NAV_LINKS.map((link) => {
//                                 const isActive = location.pathname === link.path;
//                                 return (
//                                     <button key={link.path} onClick={() => navigate(link.path)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 500, color: isActive ? "#111827" : "#6b7280", padding: 0 }}>
//                                         {link.label}
//                                     </button>
//                                 );
//                             })}
//                         </nav>
//                     )}

//                     {/* Mobile hamburger */}
//                     {isMobile && (
//                         <button onClick={() => setMobileNavOpen(!mobileNavOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#374151", display: "flex", flexDirection: "column", gap: "4px" }}>
//                             <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", transition: "all .2s", transform: mobileNavOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
//                             <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", opacity: mobileNavOpen ? 0 : 1 }} />
//                             <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", transition: "all .2s", transform: mobileNavOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
//                         </button>
//                     )}
//                 </div>

//                 {/* Mobile nav dropdown */}
//                 <AnimatePresence>
//                     {isMobile && mobileNavOpen && (
//                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderTop: "1px solid #f0f0f0", background: "white" }}>
//                             {NAV_LINKS.map((link) => (
//                                 <button key={link.path} onClick={() => { navigate(link.path); setMobileNavOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 500, color: location.pathname === link.path ? BLUE : "#374151", borderBottom: "1px solid #f9fafb" }}>
//                                     {link.label}
//                                 </button>
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </header>

//             {/* ── Main ── */}
//             <main style={{ minHeight: "100vh", background: "#f9fafb", padding: isMobile ? "16px" : "24px", fontFamily: FONT }}>
//                 <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

//                     {/* Search + Sort + Filter bar */}
//                     <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
//                         {/* Search */}
//                         <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative" }}>
//                             <Search size={15} color="#9ca3af" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
//                             <input
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 placeholder={isMobile ? "Search skills, domain..." : "Search for any Skill, domain or name..."}
//                                 onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
//                                 style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
//                                 onFocus={(e) => (e.target.style.borderColor = BLUE)}
//                                 onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                             />
//                         </div>

//                         <div style={{ display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto" }}>
//                             {/* Sort */}
//                             <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: isMobile ? 1 : "none" }}>
//                                 {!isMobile && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500, whiteSpace: "nowrap" }}>Sort by:</span>}
//                                 <select
//                                     value={sortBy}
//                                     onChange={(e) => handleSortChange(e.target.value)}
//                                     style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 32px 10px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", boxShadow: "0 1px 3px rgba(0,0,0,.04)", minWidth: isMobile ? 0 : "180px" }}
//                                 >
//                                     <option>Recommended</option>
//                                     <option>Price: Low to High</option>
//                                     <option>Price: High to Low</option>
//                                     <option>Most Experienced</option>
//                                 </select>
//                             </div>

//                             {/* Filter button (tablet/mobile) */}
//                             {isTabletOrBelow && (
//                                 <button
//                                     onClick={() => setFilterDrawerOpen(true)}
//                                     style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white", cursor: "pointer", fontFamily: FONT, fontSize: "13px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
//                                 >
//                                     <SlidersHorizontal size={14} />
//                                     Filters
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Mentor count */}
//                     {!isLoading && !isError && mentors.length > 0 && (
//                         <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px" }}>
//                             Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
//                         </p>
//                     )}

//                     {/* Cards + Sidebar */}
//                     <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                             {isLoading && (
//                                 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
//                                     <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `3px solid ${BLUE_BORDER}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
//                                     <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//                                 </div>
//                             )}
//                             {isError && !isLoading && <Loader />}
//                             {!isLoading && !isError && searchEmpty && (
//                                 <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
//                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</p>
//                                     <p style={{ fontWeight: 600, color: "#374151" }}>No mentors match your filters</p>
//                                     <p style={{ fontSize: "13px", color: "#9ca3af" }}>Try adjusting your criteria</p>
//                                 </div>
//                             )}
//                             {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
//                                 <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//                                     {mentors.map((mentor, index) => (
//                                         <MentorCard key={mentor._id || index} mentor={mentor} index={index} onSubscribe={handleBookTrial} onViewProfile={handleViewProfile} />
//                                     ))}
//                                 </div>
//                             )}
//                             {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
//                                 <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
//                                     <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
//                                     <p style={{ fontWeight: 600, color: "#374151" }}>No mentors available</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Desktop sidebar */}
//                         {!isTabletOrBelow && (
//                             <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={false} onClose={() => {}} />
//                         )}
//                     </div>
//                 </div>

//                 {/* Mobile/Tablet filter drawer */}
//                 {isTabletOrBelow && (
//                     <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} />
//                 )}

//                 <AnimatePresence>
//                     {activeMentor && (
//                         <>
//                             <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMentor(null)} style={{ position: "fixed", inset: 0, zIndex: 299, background: "rgba(0,0,0,.35)", backdropFilter: "blur(3px)" }} />
//                             <SubscribePanel key="panel" mentor={activeMentor} onClose={() => setActiveMentor(null)} />
//                         </>
//                     )}
//                 </AnimatePresence>
//             </main>
//         </>
//     );
// }


import { useState, useEffect } from "react";
import { FaBriefcase, FaClock } from "react-icons/fa";
import { MapPin, Users, X, ChevronDown, ChevronUp, CheckCircle, Search, Pencil, Briefcase, Target, Building2, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import KarrivoLogo from "../../assets/KarivoLogo.jpg";
import {
    useGetLtmAllMentorsQuery,
    useSearchMentorMutation,
    useAdvancedFilterMentorsMutation,
} from "./exploreMentorsapislice";
import Loader from "../../global/Loader";

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const BLUE = "#2563eb";
const BLUE_LIGHT = "#eff6ff";
const BLUE_BORDER = "#bfdbfe";
const FONT = "'Inter', sans-serif";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

const PLANS = [
  
    { key: "oneMonth", label: "1 Month plan" },
        { key: "threeMonths", label: "3 Month plan " },

      { key: "sixMonths", label: "6 Month plan " },
];

const DOMAIN_CHIPS = [
    "Frontend", "Backend", "Fullstack",
    "DevOps / SRE / Cloud", "QA / Automation Testing",
    "Data Scientist / AI/ML", "Data Analyst",
];

const NAV_LINKS = [
    { label: "Explore Mentors", path: "/explore-mentors" },
    // { label: "Top Mentors", path: "/top" },
    { label: "Engineering Mentors", path: "/engineering" },
    { label: "AI Mentors", path: "/ai-mentors" },
    { label: "Success Stories", path: "/success-stories" },
];

// ── useWindowWidth ────────────────────────────────────────────────────────────
function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return width;
}

// ── SubscribePanel ────────────────────────────────────────────────────────────
// Opened by handleBookTrial after auth check — same pattern as BookingsSection
function SubscribePanel({ mentor, onClose }) {
    const width = useWindowWidth();
    const isMobile = width < 640;
    const availability = Array.isArray(mentor.availability) ? mentor.availability : [];
    const [selected, setSelected] = useState({});
    const [openDay, setOpenDay] = useState(null);
    const [planKey, setPlanKey] = useState("oneMonth");

    const toggleSlot = (di, si) => {
        const k = `${di}_${si}`;
        setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
    };

    const selectedCount = Object.values(selected).filter(Boolean).length;
    const totalSessions = mentor.pricing?.plans?.[planKey]?.totalSessions ?? 0;
    const totalPrice = mentor.pricing?.plans?.[planKey]?.totalPrice ?? 0;

    const panelStyle = isMobile
        ? {
            position: "fixed", bottom: 0, left: 0, right: 0,
            height: "85vh", width: "100%",
            background: "white", zIndex: 300,
            boxShadow: "0 -8px 40px rgba(0,0,0,.15)",
            display: "flex", flexDirection: "column", fontFamily: FONT,
            borderRadius: "20px 20px 0 0",
        }
        : {
            position: "fixed", top: 0, right: 0, bottom: 0,
            width: "420px", maxWidth: "100vw",
            background: "white", zIndex: 300,
            boxShadow: "-8px 0 40px rgba(0,0,0,.15)",
            display: "flex", flexDirection: "column", fontFamily: FONT,
        };

    const motionProps = isMobile
        ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
        : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

    return (
        <motion.div
            {...motionProps}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={panelStyle}
        >
            {isMobile && (
                <div style={{ width: "36px", height: "4px", background: "#d1d5db", borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0 }} />
            )}

            {/* Header */}
            <div style={{ background: BLUE, padding: "20px 24px", flexShrink: 0, borderRadius: isMobile ? "20px 20px 0 0" : 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <h2 style={{ color: "white", fontWeight: 700, fontSize: "16px", margin: 0 }}>Book a Free Trial</h2>
                    <button onClick={onClose} style={{ background: "rgba(255,255,255,.15)", border: "none", color: "white", borderRadius: "8px", width: "30px", height: "30px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={16} />
                    </button>
                </div>
                <p style={{ color: "rgba(255,255,255,.75)", fontSize: "13px", margin: 0 }}>
                    {mentor.fullName} · {fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session
                </p>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Plan</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {PLANS.map((p) => {
                        const sel = planKey === p.key;
                        const planPrice = mentor.pricing?.plans?.[p.key]?.totalPrice ?? 0;
                        const planSessions = mentor.pricing?.weeklySessions ?? 0;
                        return (
                            <div key={p.key} onClick={() => setPlanKey(p.key)} style={{ border: `2px solid ${sel ? BLUE : "#e5e7eb"}`, borderRadius: "12px", padding: "14px 16px", background: sel ? BLUE_LIGHT : "white", cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: sel ? BLUE : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    {sel && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "white" }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, fontSize: "13px", color: sel ? "#1d4ed8" : "#111827", margin: "0 0 2px" }}>{p.label}</p>
                                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{planSessions} sessions/week</p>
                                </div>
                                <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#111827", margin: 0 }}>{fmtINR(planPrice)}</p>
                            </div>
                        );
                    })}
                </div>

                {availability.length > 0 ? (
                    <>
                        <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Availability Slots</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {DAY_ORDER.map((day, di) => {
                                const dayData = availability.find((d) => d.day === day);
                                if (!dayData) return null;
                                const openSlots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
                                const isOpen = openDay === day;
                                const selectedInDay = openSlots.filter((_, si) => selected[`${di}_${si}`]).length;
                                return (
                                    <div key={day} style={{ border: `1.5px solid ${selectedInDay ? BLUE : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", background: selectedInDay ? BLUE_LIGHT : "white", transition: "all .15s" }}>
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
                                                                <button key={slot._id} onClick={() => toggleSlot(di, si)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`, background: isSel ? "white" : "#fafafa", cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
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
                    <div style={{ textAlign: "center", padding: "20px", background: "#f9fafb", borderRadius: "10px", border: "1px dashed #e5e7eb" }}>
                        <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>No availability slots set yet</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid #e5e7eb", padding: "16px 24px", background: "#fafafa", flexShrink: 0 }}>
                <div style={{ marginBottom: "12px" }}>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em" }}>Total for {PLANS.find((p) => p.key === planKey)?.label}</p>
                    <p style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>{fmtINR(totalPrice)}</p>
                    {totalSessions > 0 && <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week</p>}
                </div>
                <button style={{ width: "100%", padding: "12px", background: BLUE, cursor: "pointer", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", fontFamily: FONT }}>
                    {`Subscribe — ${fmtINR(totalPrice)}`}
                </button>
                <p style={{ textAlign: "center", color: "#d1d5db", fontSize: "11px", marginTop: "8px" }}>Secure checkout · Cancel anytime · 7-day refund policy</p>
            </div>
        </motion.div>
    );
}

// ── MentorCard ────────────────────────────────────────────────────────────────
// onViewProfile  → navigate to /mentor-profile/:id  (same as BookingsSection)
// onSubscribe    → handleBookTrial in root (auth check → setActiveMentor)
function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
    const width = useWindowWidth();
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
        .split(",").map((s) => s.trim()).filter(Boolean);

    const [activePlan, setActivePlan] = useState("oneMonth");
    const [bioExpanded, setBioExpanded] = useState(false);

    const planPrice = mentor.pricing?.plans?.[activePlan]?.totalPrice ?? 0;
    const weeklySessions = mentor.pricing?.weeklySessions ?? 0;
    const hourlyRate = mentor.pricing?.hourlyRate ?? mentor.hourlyRate ?? 0;

    const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
    const BIO_LIMIT = isMobile ? 120 : 180;
    const shortBio = bio.length > BIO_LIMIT ? bio.slice(0, BIO_LIMIT) + "…" : bio;

    const hasWork = mentor.currentRole || mentor.companyName;
    const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Yrs` : null;
    const languages = Array.isArray(mentor.languages) ? mentor.languages.join(", ") : mentor.languages || "";
    const initials = (mentor.fullName || "M").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const nextAvail = mentor.nextAvailable || null;
    const mentoringStyle = mentor.mentoringStyle || null;

    // ── MOBILE ──────────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "14px", background: "white", display: "flex", flexDirection: "column", fontFamily: FONT, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}
            >
                <div style={{ padding: "16px 16px 12px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontWeight: 700, fontSize: "15px", color: BLUE }}>{initials}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h2 style={{ fontWeight: 800, fontSize: "17px", color: "#111827", margin: "0 0 3px", lineHeight: 1.2 }}>{mentor.fullName || "Mentor"}</h2>
                            {hasWork && (
                                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}
                                </p>
                            )}
                        </div>
                        <span style={{ fontSize: "22px", fontWeight: 800, color: "#111827", flexShrink: 0 }}>{fmtINR(hourlyRate)}</span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
                        {mentoringStyle && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
                        {mentor.mentorCategory && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
                        {yearsExp && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp} exp</span>}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: bio ? "10px" : 0 }}>
                        {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><MapPin size={11} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><Users size={11} color="#9ca3af" strokeWidth={2} />{mentor.reviewCount ?? "1"}+ reviews</span>
                        {languages && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><Pencil size={10} color="#9ca3af" strokeWidth={2} />{languages}</span>}
                    </div>

                    {bio && (
                        <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: 0 }}>
                            {bioExpanded ? bio : shortBio}
                            {bio.length > BIO_LIMIT && (
                                <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
                                    {bioExpanded ? " Less" : " More"}
                                </span>
                            )}
                        </p>
                    )}
                </div>

                {areas.length > 0 && (
                    <div style={{ padding: "0 16px 12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {areas.slice(0, 3).map((a, i) => <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>)}
                        {areas.length > 3 && <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 3}</span>}
                    </div>
                )}

                <div style={{ display: "flex", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
                    {PLANS.map((p) => {
                        const isActive = activePlan === p.key;
                        return <button key={p.key} onClick={() => setActivePlan(p.key)} style={{ flex: 1, padding: "10px 4px", background: "transparent", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : "#9ca3af", fontSize: "12px", fontWeight: isActive ? 700 : 500, cursor: "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px" }}>{p.label}</button>;
                    })}
                </div>

                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <FaClock size={12} color="#1d8e85" />
                        <span style={{ fontSize: "12px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>Plan:</span>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{fmtINR(planPrice)}</span>
                    </div>
                </div>

                <div style={{ padding: "0 16px 16px", display: "flex", gap: "8px" }}>
                    <button onClick={() => onViewProfile(mentor)} style={{ flex: 1, padding: "10px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
                        View Profile
                    </button>
                    <button onClick={() => onSubscribe(mentor)} style={{ flex: 1, padding: "10px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
                        Book Trial
                    </button>
                </div>
            </motion.article>
        );
    }

    // ── TABLET ───────────────────────────────────────────────────────────────
    if (isTablet) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px", background: "white", display: "flex", flexDirection: "column", fontFamily: FONT, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}
            >
                <div style={{ padding: "20px 20px 0", display: "flex", gap: "14px" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontWeight: 700, fontSize: "15px", color: BLUE }}>{initials}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "4px" }}>
                            <h2 style={{ fontWeight: 800, fontSize: "18px", color: "#111827", margin: 0 }}>{mentor.fullName || "Mentor"}</h2>
                            <div>
                                <span style={{ fontSize: "26px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
                                <span style={{ fontSize: "12px", color: "#9ca3af" }}>/session</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
                            {mentoringStyle && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
                            {mentor.mentorCategory && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
                            {yearsExp && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp} exp</span>}
                        </div>
                        {hasWork && <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 6px" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#6b7280" }}><MapPin size={12} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
                            <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#6b7280" }}><Users size={12} color="#9ca3af" strokeWidth={2} />{mentor.reviewCount ?? "1"}+ reviews</span>
                        </div>
                    </div>
                </div>

                {bio && (
                    <div style={{ padding: "12px 20px 0" }}>
                        <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: 0 }}>
                            {bioExpanded ? bio : shortBio}
                            {bio.length > BIO_LIMIT && (
                                <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
                                    {bioExpanded ? " Less" : " More"}
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {areas.length > 0 && (
                    <div style={{ padding: "10px 20px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {areas.slice(0, 4).map((a, i) => <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 12px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>)}
                        {areas.length > 4 && <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 4}</span>}
                    </div>
                )}

                <div style={{ marginTop: "auto", borderTop: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex" }}>
                        {PLANS.map((p) => {
                            const isActive = activePlan === p.key;
                            return <button key={p.key} onClick={() => setActivePlan(p.key)} style={{ flex: 1, padding: "10px 6px", background: "transparent", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : "#9ca3af", fontSize: "12px", fontWeight: isActive ? 700 : 500, cursor: "pointer", fontFamily: FONT, marginBottom: "-1px" }}>{p.label}</button>;
                        })}
                    </div>
                    <div style={{ padding: "12px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#374151" }}><FaClock size={12} color="#1d8e85" /><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week</span>
                            <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>{fmtINR(planPrice)} <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>plan total</span></span>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => onViewProfile(mentor)} style={{ padding: "9px 16px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
                                Profile
                            </button>
                            <button onClick={() => onSubscribe(mentor)} style={{ padding: "9px 18px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}>
                                Book Trial
                            </button>
                        </div>
                    </div>
                </div>
            </motion.article>
        );
    }

    // ── DESKTOP ───────────────────────────────────────────────────────────────
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px", background: "white", display: "flex", fontFamily: FONT, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)", transition: "box-shadow .2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)")}
        >
            {/* LEFT */}
            <div style={{ flex: 1, padding: "24px 28px", borderRight: "1px solid #f0f0f0", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontWeight: 700, fontSize: "16px", color: BLUE }}>{initials}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            <h2 style={{ fontWeight: 800, fontSize: "20px", color: "#111827", margin: 0 }}>{mentor.fullName || "Mentor"}</h2>
                            {mentoringStyle && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
                            {mentor.mentorCategory && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
                        </div>
                        {hasWork && <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                    {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><MapPin size={13} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Users size={13} color="#9ca3af" strokeWidth={2} />{mentor.reviewCount ?? "1"}+ reviews</span>
                    {languages && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Pencil size={12} color="#9ca3af" strokeWidth={2} />{languages}</span>}
                    {yearsExp && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280" }}><Building2 size={13} color="#9ca3af" strokeWidth={2} />{yearsExp} exp</span>}
                </div>

                {hasWork && (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "14px", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "8px 14px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>
                            {(mentor.companyName || "?").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", margin: 0 }}>{mentor.currentRole || "—"}</p>
                            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{mentor.companyName || "—"}</p>
                        </div>
                        {yearsExp && (
                            <>
                                <span style={{ color: "#e5e7eb", fontSize: "18px", lineHeight: 1 }}>|</span>
                                <div>
                                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#374151", margin: 0 }}>{yearsExp}</p>
                                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>Experience</p>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {bio && (
                    <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.7", margin: "0 0 14px" }}>
                        {bioExpanded ? bio : shortBio}
                        {bio.length > BIO_LIMIT && (
                            <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
                                {bioExpanded ? " Show Less" : " Read More"}
                            </span>
                        )}
                    </p>
                )}

                {areas.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                        {areas.slice(0, 4).map((a, i) => <span key={i} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>)}
                        {areas.length > 4 && <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}`, cursor: "pointer" }}>+{areas.length - 4} More</span>}
                    </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", fontSize: "13px" }}>
                    {(mentor.targetAudience || mentor.forAudience) && (
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <Briefcase size={13} color="#9ca3af" strokeWidth={2} />
                            <span style={{ color: "#9ca3af" }}>For:</span>{" "}
                            <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetAudience || mentor.forAudience}</span>
                        </span>
                    )}
                    {mentor.targetingDomains && (
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <Target size={13} color="#9ca3af" strokeWidth={2} />
                            <span style={{ color: "#9ca3af" }}>Targeting Domains:</span>{" "}
                            <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetingDomains}</span>
                        </span>
                    )}
                    {!mentor.targetingDomains && (mentor.fieldOfStudy || mentor.highestDegree) && (
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <Target size={13} color="#9ca3af" strokeWidth={2} />
                            <span style={{ color: "#9ca3af" }}>Field:</span>{" "}
                            <span style={{ color: "#111827", fontWeight: 600, textTransform: "capitalize" }}>
                                {mentor.fieldOfStudy || ""}{mentor.fieldOfStudy && mentor.highestDegree ? " · " : ""}{mentor.highestDegree || ""}
                            </span>
                        </span>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div style={{ width: "270px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
                    {PLANS.map((p) => {
                        const isActive = activePlan === p.key;
                        return <button key={p.key} onClick={() => setActivePlan(p.key)} style={{ flex: 1, padding: "14px 6px", background: "transparent", border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent", color: isActive ? BLUE : "#9ca3af", fontSize: "13px", fontWeight: isActive ? 700 : 500, cursor: "pointer", fontFamily: FONT, transition: "all .15s", marginBottom: "-1px" }}>{p.label}</button>;
                    })}
                </div>
                <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FaClock size={14} color="#1d8e85" />
                        <span style={{ fontSize: "13px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong> Sessions Per Week</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FaBriefcase size={14} color="#1d8e85" />
                        <span style={{ fontSize: "13px", color: "#374151" }}>Referrals in Top Companies</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontSize: "15px" }}>💎</span>
                            <span style={{ fontSize: "13px", color: "#374151" }}>Detailed Curriculum Available</span>
                        </div>
                        <span style={{ color: BLUE, fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>View ↗</span>
                    </div>
                    <div style={{ marginTop: "4px" }}>
                        <span style={{ fontSize: "30px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
                        <span style={{ fontSize: "13px", color: "#9ca3af" }}>/session</span>
                    </div>
                </div>

                <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {/* View Profile → navigates to /mentor-profile/:id */}
                    <button
                        onClick={() => onViewProfile(mentor)}
                        style={{ width: "100%", padding: "11px", background: "white", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "all .15s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#9ca3af"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#d1d5db"; }}
                    >
                        View Profile
                    </button>
                    <div>
                        {/* Book a Free Trial → auth check → opens SubscribePanel */}
                        <button
                            onClick={() => onSubscribe(mentor)}
                            style={{ width: "100%", padding: "12px", background: BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "background .15s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
                        >
                            Book a Free Trial
                        </button>
                        {nextAvail && (
                            <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", margin: "6px 0 0" }}>
                                Next Available: <span style={{ color: BLUE, fontWeight: 600 }}>{nextAvail}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

// ── FilterSidebar ─────────────────────────────────────────────────────────────
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
        <div style={{ width: isMobile ? "100%" : "300px", background: "white", borderRadius: isMobile ? 0 : "12px", padding: "20px 22px", fontFamily: FONT, ...(isMobile ? {} : { border: "1px solid #e5e7eb", alignSelf: "flex-start", position: "sticky", top: "80px", flexShrink: 0 }) }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", margin: 0 }}>Filter By</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
                        <X size={12} /> Clear
                    </button>
                    {isMobile && (
                        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex", alignItems: "center" }}>
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Domain</p>
            {selectedDomains.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px", minHeight: "42px" }}>
                    {selectedDomains.map((d) => (
                        <span key={d} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}>
                            {d}
                            <button onClick={() => toggleDomain(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}><X size={11} /></button>
                        </span>
                    ))}
                </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                {DOMAIN_CHIPS.map((d) => {
                    const active = selectedDomains.includes(d);
                    return (
                        <button key={d} onClick={() => toggleDomain(d)} style={{ fontSize: "12px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151", border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
                            {d}
                        </button>
                    );
                })}
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

            <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Offering Mentorship For</p>
            <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 36px 10px 14px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxSizing: "border-box", marginBottom: "24px" }}>
                <option>Working Professionals</option>
                <option>Students</option>
                <option>Freshers</option>
                <option>Entrepreneurs</option>
            </select>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

            <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", margin: "0 0 10px" }}>Pricing</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>
                <span>₹5,000</span><span>₹10,000</span>
            </div>
            <input type="range" min={5000} max={10000} step={500} value={priceVal} onChange={(e) => setPriceVal(Number(e.target.value))} style={{ width: "100%", accentColor: BLUE, cursor: "pointer" }} />
            <p style={{ fontSize: "12px", color: BLUE, fontWeight: 600, margin: "6px 0 0" }}>Up to {fmtINR(priceVal)}/month</p>

            <button
                onClick={() => { onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains }); if (isMobile) onClose(); }}
                disabled={isSearching}
                style={{ marginTop: "20px", width: "100%", padding: "11px", background: isSearching ? "#93c5fd" : BLUE, color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT }}
            >
                {isSearching ? "Applying…" : "Apply Filters"}
            </button>
        </div>
    );

    if (!isMobile) return sidebarContent;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div key="filter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.4)", backdropFilter: "blur(2px)" }} />
                    <motion.div key="filter-drawer" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "85vh", zIndex: 201, background: "white", borderRadius: "20px 20px 0 0", overflowY: "auto" }}>
                        <div style={{ width: "36px", height: "4px", background: "#d1d5db", borderRadius: "2px", margin: "12px auto 0" }} />
                        {sidebarContent}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ── Root ──────────────────────────────────────────────────────────────────────
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
    const [activeMentor, setActiveMentor] = useState(null);   // drives SubscribePanel
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Recommended");
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const mentors = isFiltered ? (displayMentors || []) : allMentors;

    const handleClear = () => {
        setIsFiltered(false);
        setDisplayMentors(null);
        setSearchEmpty(false);
    };

    const handleSearch = async (body) => {
        try {
            const response = await searchMentors(body).unwrap();
            const result = response?.data || [];
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
            "Price: Low to High": { sortBy: "price", order: "asc" },
            "Price: High to Low": { sortBy: "price", order: "desc" },
            "Most Experienced": { sortBy: "experience", order: "desc" },
        };
        const body = sortMap[value];
        if (!body) return;
        try {
            const response = await advancedFilter(body).unwrap();
            const result = response?.data || [];
            setDisplayMentors(result);
            setIsFiltered(true);
            setSearchEmpty(result.length === 0);
        } catch {
            setDisplayMentors([]);
            setIsFiltered(true);
            setSearchEmpty(true);
        }
    };

    // ── View Profile: navigate to mentor profile page ─────────────────────────
    // Same as BookingsSection: navigate(`/mentor-profile/${mentor._id}`)
    const handleViewProfile = (mentor) => {
        navigate(`/mentor-profile/${mentor._id}`);
    };

    // ── Book Trial: check auth → open SubscribePanel modal ───────────────────
    // Same as BookingsSection: auth check → setActiveMentor(mentor)
    // activeMentor drives AnimatePresence at bottom of JSX
    const handleBookTrial = (mentor) => {
        const isLoggedIn = !!localStorage.getItem("authToken");
        if (!isLoggedIn) {
            navigate(`/login?mentorId=${mentor._id}`);
            return;
        }
        navigate(`/book-session?mentorId=${mentor._id}`);
    };
    return (
        <>
            {/* ── Header ── */}
            <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #f0f0f0", fontFamily: FONT }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <img src={KarrivoLogo} className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain" alt="Karrivo" />
                    </div>

                    {!isMobile && (
                        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                            {NAV_LINKS.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <button key={link.path} onClick={() => navigate(link.path)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 500, color: isActive ? "#111827" : "#6b7280", padding: 0 }}>
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    )}

                    {isMobile && (
                        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", transition: "all .2s", transform: mobileNavOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
                            <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", opacity: mobileNavOpen ? 0 : 1 }} />
                            <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px", transition: "all .2s", transform: mobileNavOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {isMobile && mobileNavOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderTop: "1px solid #f0f0f0", background: "white" }}>
                            {NAV_LINKS.map((link) => (
                                <button key={link.path} onClick={() => { navigate(link.path); setMobileNavOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "14px", fontWeight: 500, color: location.pathname === link.path ? BLUE : "#374151", borderBottom: "1px solid #f9fafb" }}>
                                    {link.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Main ── */}
            <main style={{ minHeight: "100vh", background: "#f9fafb", padding: isMobile ? "16px" : "24px", fontFamily: FONT }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                    {/* Search + Sort + Filters */}
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                        <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative" }}>
                            <Search size={15} color="#9ca3af" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isMobile ? "Search skills, domain..." : "Search for any Skill, domain or name..."}
                                onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
                                style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
                                onFocus={(e) => (e.target.style.borderColor = BLUE)}
                                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: isMobile ? 1 : "none" }}>
                                {!isMobile && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500, whiteSpace: "nowrap" }}>Sort by:</span>}
                                <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 32px 10px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", boxShadow: "0 1px 3px rgba(0,0,0,.04)", minWidth: isMobile ? 0 : "180px" }}>
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Most Experienced</option>
                                </select>
                            </div>
                            {isTabletOrBelow && (
                                <button onClick={() => setFilterDrawerOpen(true)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white", cursor: "pointer", fontFamily: FONT, fontSize: "13px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
                                    <SlidersHorizontal size={14} /> Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {!isLoading && !isError && mentors.length > 0 && (
                        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px" }}>
                            Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
                        </p>
                    )}

                    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {isLoading && (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `3px solid ${BLUE_BORDER}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
                                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                                </div>
                            )}
                            {isError && !isLoading && <Loader />}
                            {!isLoading && !isError && searchEmpty && (
                                <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
                                    <p style={{ fontWeight: 600, color: "#374151" }}>No mentors match your filters</p>
                                    <p style={{ fontSize: "13px", color: "#9ca3af" }}>Try adjusting your criteria</p>
                                </div>
                            )}
                            {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                                <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "12px", background: "white" }}>
                                    <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
                                    <p style={{ fontWeight: 600, color: "#374151" }}>No mentors available</p>
                                </div>
                            )}
                        </div>

                        {/* Desktop sidebar */}
                        {!isTabletOrBelow && (
                            <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={false} onClose={() => { }} />
                        )}
                    </div>
                </div>

                {/* Mobile/Tablet filter drawer */}
                {isTabletOrBelow && (
                    <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} />
                )}

                {/*
                  ── SubscribePanel overlay ──────────────────────────────────────
                  Exactly the same pattern as BookingsSection:
                    1. handleBookTrial checks localStorage("authToken")
                    2. If logged in → setActiveMentor(mentor)
                    3. AnimatePresence renders dark backdrop + SubscribePanel
                    4. clicking backdrop OR the X button → setActiveMentor(null)
                    5. Panel slides in from right (desktop) or up from bottom (mobile)
                */}
                {/* <AnimatePresence>
                    {activeMentor && (
                        <>
                            <motion.div
                                key="overlay"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setActiveMentor(null)}
                                style={{ position: "fixed", inset: 0, zIndex: 299, background: "rgba(0,0,0,.35)", backdropFilter: "blur(3px)" }}
                            />
                            <SubscribePanel
                                key="panel"
                                mentor={activeMentor}
                                onClose={() => setActiveMentor(null)}
                            />
                        </>
                    )}
                </AnimatePresence> */}
            </main>
        </>
    );
}









