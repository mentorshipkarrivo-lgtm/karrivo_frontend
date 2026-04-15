import { useState, useEffect } from "react";
import { FaBriefcase, FaClock } from "react-icons/fa";
import { MapPin, Users, X, ChevronDown, ChevronUp, CheckCircle, Search, Pencil, Briefcase, Target, Building2, SlidersHorizontal } from "lucide-react";
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

const BLUE = "#2563eb";
const BLUE_LIGHT = "#eff6ff";
const BLUE_BORDER = "#bfdbfe";
const FONT = "'Inter', sans-serif";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

const PLANS = [
    { key: "1Month", label: "1 Month" },
    { key: "3Month", label: "3 Months" },
    { key: "6Month", label: "6 Months" },
];

// Resolves plan data regardless of key casing sent by API
// Handles: 1Month, oneMonth, 1month, one_month, etc.
const PLAN_ALIASES = {
    "1Month": ["1Month", "oneMonth", "1month", "one_month", "onemonth"],
    "3Month": ["3Month", "threeMonths", "3month", "three_months", "threemonths", "3Months"],
    "6Month": ["6Month", "sixMonths", "6month", "six_months", "sixmonths", "6Months"],
};

function getPlanData(pricing, planKey) {
    if (!pricing?.plans) return { totalPrice: 0, totalSessions: 0 };
    const plans = pricing.plans;
    for (const alias of (PLAN_ALIASES[planKey] || [planKey])) {
        if (plans[alias] != null) return plans[alias];
    }
    // Case-insensitive fallback
    const norm = (s) => s.toLowerCase().replace(/[^0-9a-z]/g, "");
    const found = Object.keys(plans).find(k => norm(k) === norm(planKey));
    return found ? plans[found] : { totalPrice: 0, totalSessions: 0 };
}

const DOMAIN_CHIPS = [
    "Frontend", "Backend", "Fullstack",
    "DevOps / SRE / Cloud", "QA / Automation Testing",
    "Data Scientist / AI/ML", "Data Analyst",
];

const NAV_LINKS = [
    { label: "Explore Mentors", path: "/explore-mentors" },
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
    const totalSessions = getPlanData(mentor.pricing, planKey).totalSessions ?? 0;
    const totalPrice = getPlanData(mentor.pricing, planKey).totalPrice ?? 0;

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
        <motion.div {...motionProps} transition={{ type: "spring", damping: 28, stiffness: 300 }} style={panelStyle}>
            {isMobile && (
                <div style={{ width: "36px", height: "4px", background: "#d1d5db", borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0 }} />
            )}
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
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>Select Plan</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {PLANS.map((p) => {
                        const sel = planKey === p.key;
                        const planPrice = getPlanData(mentor.pricing, p.key).totalPrice ?? 0;
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
function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
    const width = useWindowWidth();
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
        .split(",").map((s) => s.trim()).filter(Boolean);

    const [activePlan, setActivePlan] = useState("1Month");
    const [bioExpanded, setBioExpanded] = useState(false);

    const planPrice = getPlanData(mentor.pricing, activePlan).totalPrice ?? 0;
    const weeklySessions = mentor.pricing?.weeklySessions ?? 0;
    const hourlyRate = mentor.pricing?.hourlyRate ?? mentor.hourlyRate ?? 0;

    const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
    // Strict bio limit — always truncate so it never bleeds into plan area
    const BIO_LIMIT = isMobile ? 100 : isTablet ? 130 : 160;
    const shortBio = bio.length > BIO_LIMIT ? bio.slice(0, BIO_LIMIT) + "…" : bio;

    const hasWork = mentor.currentRole || mentor.companyName;
    const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Yrs` : null;
    const languages = Array.isArray(mentor.languages) ? mentor.languages.join(", ") : mentor.languages || "";
    const initials = (mentor.fullName || "M").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const mentoringStyle = mentor.mentoringStyle || null;

    // ── MOBILE ──────────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{
                    width: "100%", border: "1px solid #e5e7eb", borderRadius: "14px",
                    background: "white", display: "flex", flexDirection: "column",
                    fontFamily: FONT, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                    boxSizing: "border-box",
                }}
            >
                {/* Top info section */}
                <div style={{ padding: "14px 14px 10px" }}>
                    {/* Avatar + Name + Price row */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                        <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontWeight: 700, fontSize: "14px", color: BLUE }}>{initials}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h2 style={{ fontWeight: 800, fontSize: "16px", color: "#111827", margin: "0 0 2px", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {mentor.fullName || "Mentor"}
                            </h2>
                            {hasWork && (
                                <p style={{ fontSize: "11px", color: "#6b7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}
                                </p>
                            )}
                        </div>
                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827" }}>{fmtINR(hourlyRate)}</span>
                            <div style={{ fontSize: "10px", color: "#9ca3af" }}>/session</div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                        {mentoringStyle && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
                        {mentor.mentorCategory && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
                        {yearsExp && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp}</span>}
                    </div>

                    {/* Meta row */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: bio ? "8px" : 0 }}>
                        {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><MapPin size={10} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
                        {languages && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><Pencil size={10} color="#9ca3af" strokeWidth={2} />{languages}</span>}
                    </div>

                    {/* Bio — strictly contained */}
                    {bio && (
                        <div style={{ marginBottom: "8px" }}>
                            <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.55", margin: 0 }}>
                                {bioExpanded ? bio : shortBio}
                                {bio.length > BIO_LIMIT && (
                                    <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
                                        {bioExpanded ? " Less" : " More"}
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>

                {/* Skills chips */}
                {areas.length > 0 && (
                    <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {areas.slice(0, 3).map((a, i) => (
                            <span key={i} style={{ fontSize: "10px", fontWeight: 500, padding: "3px 8px", borderRadius: "5px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>
                        ))}
                        {areas.length > 3 && <span style={{ fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "5px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 3}</span>}
                    </div>
                )}

                {/* Plan tabs — separated clearly */}
                <div style={{ borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex" }}>
                        {PLANS.map((p) => {
                            const isActive = activePlan === p.key;
                            return (
                                <button
                                    key={p.key}
                                    onClick={() => setActivePlan(p.key)}
                                    style={{
                                        flex: 1, padding: "9px 2px", background: isActive ? BLUE_LIGHT : "transparent",
                                        border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent",
                                        color: isActive ? BLUE : "#9ca3af", fontSize: "11px",
                                        fontWeight: isActive ? 700 : 500, cursor: "pointer",
                                        fontFamily: FONT, transition: "all .15s", marginBottom: "-1px",
                                    }}
                                >
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Plan info row */}
                <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", background: "#fafafa" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <FaClock size={11} color="#1d8e85" />
                        <span style={{ fontSize: "12px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/wk</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ fontSize: "11px", color: "#9ca3af" }}>Total:</span>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{fmtINR(planPrice)}</span>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ padding: "0 14px 14px", display: "flex", gap: "8px" }}>
                    <button
                        onClick={() => onViewProfile(mentor)}
                        style={{ flex: 1, padding: "10px", background: "#2737ff", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}
                    >
                        View Profile
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
                style={{
                    width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px",
                    background: "white", display: "flex", flexDirection: "column",
                    fontFamily: FONT, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                    boxSizing: "border-box",
                }}
            >
                {/* Header block */}
                <div style={{ padding: "18px 18px 0", display: "flex", gap: "12px" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: BLUE_LIGHT, border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontWeight: 700, fontSize: "15px", color: BLUE }}>{initials}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                            <h2 style={{ fontWeight: 800, fontSize: "17px", color: "#111827", margin: 0, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {mentor.fullName || "Mentor"}
                            </h2>
                            <div style={{ flexShrink: 0, textAlign: "right" }}>
                                <span style={{ fontSize: "22px", fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
                                <span style={{ fontSize: "11px", color: "#9ca3af" }}>/session</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "6px" }}>
                            {mentoringStyle && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
                            {mentor.mentorCategory && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
                            {yearsExp && <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", background: "#fafafa", color: "#6b7280", border: "1px solid #e5e7eb" }}>{yearsExp}</span>}
                        </div>
                        {hasWork && <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><MapPin size={11} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
                            {languages && <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#6b7280" }}><Pencil size={11} color="#9ca3af" strokeWidth={2} />{languages}</span>}
                        </div>
                    </div>
                </div>

                {/* Bio — contained block with fixed max lines */}
                {bio && (
                    <div style={{ padding: "10px 18px 0" }}>
                        <p style={{
                            fontSize: "12px", color: "#4b5563", lineHeight: "1.6", margin: 0,
                            // clamp to 3 lines when not expanded
                            ...(bioExpanded ? {} : {
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }),
                        }}>
                            {bio}
                        </p>
                        {bio.length > BIO_LIMIT && (
                            <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: BLUE, fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>
                                {bioExpanded ? " Less" : " More"}
                            </span>
                        )}
                    </div>
                )}

                {/* Skill chips */}
                {areas.length > 0 && (
                    <div style={{ padding: "10px 18px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {areas.slice(0, 4).map((a, i) => <span key={i} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>)}
                        {areas.length > 4 && <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>+{areas.length - 4}</span>}
                    </div>
                )}

                {/* Divider + Plan tabs */}
                <div style={{ marginTop: "auto", borderTop: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex" }}>
                        {PLANS.map((p) => {
                            const isActive = activePlan === p.key;
                            return (
                                <button
                                    key={p.key}
                                    onClick={() => setActivePlan(p.key)}
                                    style={{
                                        flex: 1, padding: "9px 4px", background: isActive ? BLUE_LIGHT : "transparent",
                                        border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent",
                                        color: isActive ? BLUE : "#9ca3af", fontSize: "12px",
                                        fontWeight: isActive ? 700 : 500, cursor: "pointer",
                                        fontFamily: FONT, marginBottom: "-1px",
                                    }}
                                >
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Plan detail + actions */}
                    <div style={{ padding: "12px 18px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", background: "#fafafa" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#374151" }}>
                                <FaClock size={12} color="#1d8e85" />
                                <strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong>/week
                            </span>
                            <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                                {fmtINR(planPrice)}{" "}
                                <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>total</span>
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                onClick={() => onViewProfile(mentor)}
                                style={{ padding: "9px 14px", background: "#2737ff", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}
                            >
                                View Profile
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
            style={{
                width: "100%", border: "1px solid #e5e7eb", borderRadius: "12px",
                background: "white", display: "flex", fontFamily: FONT,
                overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                transition: "box-shadow .2s", boxSizing: "border-box",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)")}
        >
            {/* LEFT — main content, flex column so bio stays inside */}
            <div style={{
                flex: 1, minWidth: 0, display: "flex", flexDirection: "column",
                borderRight: "1px solid #f0f0f0",
            }}>
                {/* Top section — scrollable content area */}
                <div style={{ padding: "22px 24px 16px", flex: 1 }}>
                    {/* Name + badges */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "10px" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#fafafa", border: `2px solid ${BLUE_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontWeight: 700, fontSize: "16px", color: "#374151" }}>{initials}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                                <h2 style={{ fontWeight: 800, fontSize: "19px", color: "#374151", margin: 0 }}>{mentor.fullName || "Mentor"}</h2>
                                {mentoringStyle && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}>{mentoringStyle}</span>}
                                {mentor.mentorCategory && <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>{mentor.mentorCategory}</span>}
                            </div>
                            {hasWork && <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mentor.currentRole || ""}{mentor.currentRole && mentor.companyName ? " · " : ""}{mentor.companyName || ""}</p>}
                        </div>
                    </div>

                    {/* Meta info */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                        {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><MapPin size={12} color="#9ca3af" strokeWidth={2} />{mentor.location}</span>}
                        {languages && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><Pencil size={12} color="#9ca3af" strokeWidth={2} />{languages}</span>}
                        {yearsExp && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><Building2 size={12} color="#9ca3af" strokeWidth={2} />{yearsExp} exp</span>}
                    </div>

                    {/* Company card */}
                    {hasWork && (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "12px", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "7px 12px" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>
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

                    {/* Bio — clamped to 3 lines, contained within left panel */}
                    {bio && (
                        <div style={{ marginBottom: "12px" }}>
                            <p style={{
                                fontSize: "13px", color: "#4b5563", lineHeight: "1.65", margin: 0,
                                ...(bioExpanded ? {} : {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }),
                            }}>
                                {bio}
                            </p>
                            {bio.length > BIO_LIMIT && (
                                <span
                                    onClick={() => setBioExpanded(!bioExpanded)}
                                    style={{ color: BLUE, fontWeight: 600, cursor: "pointer", fontSize: "12px", display: "inline-block", marginTop: "2px" }}
                                >
                                    {bioExpanded ? "Show Less" : "Read More"}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Skill chips */}
                    {areas.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "12px" }}>
                            {areas.slice(0, 4).map((a, i) => <span key={i} style={{ fontSize: "12px", fontWeight: 500, padding: "4px 12px", borderRadius: "6px", background: "white", color: "#374151", border: "1px solid #d1d5db" }}>{a}</span>)}
                            {areas.length > 4 && <span style={{ fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "white", color: BLUE, border: `1px solid ${BLUE_BORDER}`, cursor: "pointer" }}>+{areas.length - 4} More</span>}
                        </div>
                    )}

                    {/* Target/Field row */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", fontSize: "12px" }}>
                        {(mentor.targetAudience || mentor.forAudience) && (
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <Briefcase size={12} color="#9ca3af" strokeWidth={2} />
                                <span style={{ color: "#9ca3af" }}>For:</span>{" "}
                                <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetAudience || mentor.forAudience}</span>
                            </span>
                        )}
                        {mentor.targetingDomains && (
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <Target size={12} color="#9ca3af" strokeWidth={2} />
                                <span style={{ color: "#9ca3af" }}>Domains:</span>{" "}
                                <span style={{ color: "#111827", fontWeight: 600 }}>{mentor.targetingDomains}</span>
                            </span>
                        )}
                        {!mentor.targetingDomains && (mentor.fieldOfStudy || mentor.highestDegree) && (
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <Target size={12} color="#9ca3af" strokeWidth={2} />
                                <span style={{ color: "#9ca3af" }}>Field:</span>{" "}
                                <span style={{ color: "#111827", fontWeight: 600, textTransform: "capitalize" }}>
                                    {mentor.fieldOfStudy || ""}{mentor.fieldOfStudy && mentor.highestDegree ? " · " : ""}{mentor.highestDegree || ""}
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT — pricing panel */}
            <div style={{ width: "260px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
                {/* Plan tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
                    {PLANS.map((p) => {
                        const isActive = activePlan === p.key;
                        return (
                            <button
                                key={p.key}
                                onClick={() => setActivePlan(p.key)}
                                style={{
                                    flex: 1, padding: "13px 4px", background: isActive ? BLUE_LIGHT : "transparent",
                                    border: "none", borderBottom: isActive ? `2.5px solid ${BLUE}` : "2.5px solid transparent",
                                    color: isActive ? BLUE : "#9ca3af", fontSize: "12px",
                                    fontWeight: isActive ? 700 : 500, cursor: "pointer",
                                    fontFamily: FONT, transition: "all .15s", marginBottom: "-1px",
                                }}
                            >
                                {p.label}
                            </button>
                        );
                    })}
                </div>

                {/* Plan content */}
                <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaClock size={13} color="#1d8e85" />
                        <span style={{ fontSize: "13px", color: "#374151" }}><strong>{weeklySessions > 0 ? weeklySessions : "—"}x</strong> sessions/week</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaBriefcase size={13} color="#1d8e85" />
                        <span style={{ fontSize: "13px", color: "#374151" }}>Referrals in Top Companies</span>
                    </div>
                    <div style={{ marginTop: "6px" }}>
                        <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "2px" }}>Rate per session</div>
                        <span style={{ fontSize: "28px", fontWeight: 800, color: "#37415c", letterSpacing: "-1px" }}>{fmtINR(hourlyRate)}</span>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>/session</span>
                    </div>
                    <div style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, borderRadius: "8px", padding: "10px 12px" }}>
                        <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>Plan total ({PLANS.find(p => p.key === activePlan)?.label})</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: BLUE }}>{fmtINR(planPrice)}</div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                        onClick={() => onViewProfile(mentor)}
                        style={{ width: "100%", padding: "11px", background: "#2737ff", color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: FONT, transition: "all .15s" }}
                    >
                        View Profile
                    </button>
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
        <div style={{
            width: isMobile ? "100%" : "280px", background: "white",
            borderRadius: isMobile ? 0 : "12px", padding: "20px", fontFamily: FONT,
            ...(isMobile ? {} : {
                border: "1px solid #e5e7eb", alignSelf: "flex-start",
                position: "sticky", top: "80px", flexShrink: 0,
            }),
            boxSizing: "border-box",
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#37415c", margin: 0 }}>Filter By</h3>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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

            <p style={{ fontWeight: 600, fontSize: "13px", color: "#37415c", margin: "0 0 8px" }}>Domain</p>
            {selectedDomains.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "7px 9px", marginBottom: "10px", minHeight: "38px" }}>
                    {selectedDomains.map((d) => (
                        <span key={d} style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", fontWeight: 500, padding: "2px 8px", borderRadius: "20px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}>
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
                        <button key={d} onClick={() => toggleDomain(d)} style={{ fontSize: "11px", fontWeight: 500, padding: "4px 12px", borderRadius: "6px", background: active ? BLUE_LIGHT : "white", color: active ? BLUE : "#374151", border: `1px solid ${active ? BLUE_BORDER : "#e5e7eb"}`, cursor: "pointer", fontFamily: FONT, transition: "all .12s" }}>
                            {d}
                        </button>
                    );
                })}
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "18px" }} />

            <p style={{ fontWeight: 600, fontSize: "13px", color: "#37415c", margin: "0 0 8px" }}>Offering Mentorship For</p>
            <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 32px 9px 12px", fontSize: "13px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", boxSizing: "border-box", marginBottom: "20px" }}>
                <option>Working Professionals</option>
                <option>Students</option>
                <option>Freshers</option>
                <option>Entrepreneurs</option>
            </select>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "18px" }} />

            <p style={{ fontWeight: 600, fontSize: "13px", color: "#37415c", margin: "0 0 8px" }}>Pricing</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>
                <span>₹5,000</span><span>₹10,000</span>
            </div>
            <input type="range" min={5000} max={10000} step={500} value={priceVal} onChange={(e) => setPriceVal(Number(e.target.value))} style={{ width: "100%", accentColor: BLUE, cursor: "pointer", boxSizing: "border-box" }} />
            <p style={{ fontSize: "12px", color: BLUE, fontWeight: 600, margin: "5px 0 0" }}>Up to {fmtINR(priceVal)}/month</p>

            <button
                onClick={() => { onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains }); if (isMobile) onClose(); }}
                disabled={isSearching}
                style={{ marginTop: "18px", width: "100%", padding: "11px", background: isSearching ? "#93c5fd" : "#2578f0", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT, boxSizing: "border-box" }}
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

    const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor.userId}`);

    const handleBookTrial = (mentor) => {
        const isLoggedIn = !!localStorage.getItem("authToken");
        if (!isLoggedIn) { navigate(`/login?mentorId=${mentor._id}`); return; }
        navigate(`/book-session?mentorId=${mentor._id}`);
    };

    return (
        <>
            {/* ── Header ── */}
            <header style={{
                position: "sticky", top: 0, zIndex: 100,
                background: "white", borderBottom: "1px solid #f0f0f0", fontFamily: FONT,
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}>
                        <img src={KarrivoLogo} className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain" alt="Karrivo" />
                    </div>

                    {!isMobile && (
                        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
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
            <main style={{ minHeight: "100vh", background: "#f9fafb", padding: isMobile ? "12px" : "20px", fontFamily: FONT, boxSizing: "border-box" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                    {/* Search + Sort bar */}
                    <div style={{
                        display: "flex", gap: "8px", alignItems: "center",
                        marginBottom: "14px",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                    }}>
                        {/* Search input */}
                        <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative", boxSizing: "border-box" }}>
                            <Search size={14} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isMobile ? "Search skills, domain..." : "Search for any skill, domain or name..."}
                                onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
                                style={{ width: "100%", padding: "11px 14px 11px 36px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
                                onFocus={(e) => (e.target.style.borderColor = BLUE)}
                                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                            />
                        </div>

                        {/* Sort + Filter row */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: isMobile ? "100%" : "auto", boxSizing: "border-box" }}>
                            {!isMobile && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500, whiteSpace: "nowrap" }}>Sort by:</span>}
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                style={{
                                    flex: isMobile ? 1 : "none", border: "1px solid #e5e7eb",
                                    borderRadius: "8px", padding: "10px 30px 10px 12px",
                                    fontSize: "13px", color: "#374151", background: "white",
                                    cursor: "pointer", outline: "none", appearance: "none",
                                    fontFamily: FONT,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
                                    boxShadow: "0 1px 3px rgba(0,0,0,.04)",
                                    minWidth: isMobile ? 0 : "170px", boxSizing: "border-box",
                                }}
                            >
                                <option>Recommended</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Most Experienced</option>
                            </select>

                            {isTabletOrBelow && (
                                <button
                                    onClick={() => setFilterDrawerOpen(true)}
                                    style={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "white", cursor: "pointer", fontFamily: FONT, fontSize: "13px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap", boxShadow: "0 1px 3px rgba(0,0,0,.04)", flexShrink: 0 }}
                                >
                                    <SlidersHorizontal size={13} /> Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Result count */}
                    {!isLoading && !isError && mentors.length > 0 && (
                        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px" }}>
                            Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
                        </p>
                    )}

                    {/* Content area */}
                    <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                        {/* Card list */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {isLoading && (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
                                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", border: `3px solid ${BLUE_BORDER}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
                                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                                </div>
                            )}

                            {isError && !isLoading && (
                                <div style={{ textAlign: "center", padding: "60px 0", borderRadius: "12px" }}>
                                    <p style={{ fontWeight: 600, color: "#374151" }}>No mentors available</p>
                                </div>
                            )}

                            {!isLoading && !isError && searchEmpty && (
                                <div style={{ textAlign: "center", padding: "60px 0" }}>
                                    <p style={{ fontWeight: 600, color: "#374151" }}>No mentors match your filters</p>
                                    <p style={{ fontSize: "13px", color: "#9ca3af" }}>Try adjusting your criteria</p>
                                </div>
                            )}

                            {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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

                        {/* Desktop filter sidebar */}
                        {!isTabletOrBelow && (
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

                {/* Mobile/Tablet filter drawer */}
                {isTabletOrBelow && (
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
        </>
    );
}

