


import { useState, useEffect, useMemo } from "react";
import {
    MapPin, X, ChevronDown, ChevronUp, CheckCircle,
    Search, Pencil, Briefcase,
    SlidersHorizontal, Star, Trophy,
    Users, BookOpen, Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import KarrivoLogo from "../../assets/KarrivoLogo.png";
import { useAdvancedFilterMentorsMutation, useSearchMentorMutation, useGetLtmAllMentorsQuery } from "../LongTermMentorship/MentorshipHome/Mentorshiphomeapislice";

const BLUE = "#0098cc";
const BLUE_LIGHT = "#f0faff";
const BLUE_BORDER = "#cce9f5";
const PRIMARY = "#1a1a2e";
const FONT = "'Cambria', 'Georgia', serif";

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
const NAV_LINKS = [
    { label: "Explore Mentors", path: "/explore-mentors" },
    // { label: "Blogs", path: "/blogs" },
    // { label: "Success Stories", path: "/success-stories" },
];

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
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
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

    const toggleSlot = (di, si) => setSelected((p) => ({ ...p, [`${di}_${si}`]: !p[`${di}_${si}`] }));
    const selectedCount = Object.values(selected).filter(Boolean).length;
    const planData = getPlanData(mentor.pricing, planKey);
    const totalSessions = planData?.totalSessions ?? 0;
    const totalPrice = planData?.totalPrice ?? 0;

    const panelStyle = isMobile
        ? { position: "fixed", bottom: 0, left: 0, right: 0, height: "85vh", background: "white", zIndex: 300, boxShadow: "0 -4px 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT, borderRadius: "20px 20px 0 0" }
        : { position: "fixed", top: 0, right: 0, bottom: 0, width: "440px", background: "white", zIndex: 300, boxShadow: "-4px 0 24px rgba(0,0,0,.10)", display: "flex", flexDirection: "column", fontFamily: FONT };

    const motionProps = isMobile
        ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
        : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

    return (
        <motion.div {...motionProps} transition={{ type: "spring", damping: 28, stiffness: 300 }} style={panelStyle}>
            {isMobile && <div style={{ width: "36px", height: "4px", background: "#e5e7eb", borderRadius: "2px", margin: "12px auto 4px", flexShrink: 0 }} />}
            <div style={{ background: "white", borderBottom: `3px solid ${BLUE}`, padding: "22px 26px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <h2 style={{ color: BLUE, fontWeight: 800, fontSize: "20px", margin: 0, fontFamily: FONT }}>Book A Free Trial</h2>
                    <button onClick={onClose} style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, color: BLUE, borderRadius: "8px", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={18} />
                    </button>
                </div>
                <p style={{ color: "#6b7280", fontSize: "15px", margin: 0, fontFamily: FONT }}>
                    {toTitleCase(mentor.fullName)} · <span style={{ color: BLUE, fontWeight: 700 }}>{fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}/session</span>
                </p>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "12px", fontFamily: FONT }}>Select Plan</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "26px" }}>
                    {PLANS.map((p) => {
                        const sel = planKey === p.key;
                        const pData = getPlanData(mentor.pricing, p.key);
                        const price = pData?.totalPrice ?? 0;
                        const sessions = mentor.pricing?.weeklySessions ?? 0;
                        const disabled = !pData;
                        return (
                            <div key={p.key} onClick={() => !disabled && setPlanKey(p.key)}
                                style={{ border: `1.5px solid ${sel ? BLUE : disabled ? "#f3f4f6" : "#e5e7eb"}`, borderRadius: "12px", padding: "16px 18px", background: disabled ? "#f9fafb" : "white", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "14px", boxShadow: sel ? `0 0 0 3px ${BLUE_LIGHT}` : "none", opacity: disabled ? 0.6 : 1 }}>
                                <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${sel ? BLUE : "#d1d5db"}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    {sel && <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: BLUE }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#111827", margin: "0 0 3px", fontFamily: FONT }}>{p.label}</p>
                                    <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0, fontFamily: FONT }}>{disabled ? "No plans available" : `${sessions} sessions/week`}</p>
                                </div>
                                <p style={{ fontWeight: 700, fontSize: "17px", color: sel ? BLUE : "#374151", margin: 0, fontFamily: FONT }}>{disabled ? "N/A" : fmtINR(price)}</p>
                            </div>
                        );
                    })}
                </div>

                <p style={{ fontSize: "13px", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "12px", fontFamily: FONT }}>Select Availability</p>
                {availability.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {DAY_ORDER.map((day, di) => {
                            const dayData = availability.find((d) => d.day === day);
                            if (!dayData) return null;
                            const slots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }];
                            const isOpen = openDay === day;
                            const selInDay = slots.filter((_, si) => selected[`${di}_${si}`]).length;
                            return (
                                <div key={day} style={{ border: `1.5px solid ${selInDay ? BLUE : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", background: "white" }}>
                                    <button onClick={() => setOpenDay(isOpen ? null : day)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer", fontFamily: FONT }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ fontWeight: 600, fontSize: "15px", color: selInDay ? BLUE : "#374151", fontFamily: FONT }}>{day}</span>
                                            {selInDay > 0 && <span style={{ background: BLUE, color: "white", borderRadius: "20px", padding: "2px 9px", fontSize: "12px", fontWeight: 700 }}>{selInDay} selected</span>}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{ fontSize: "13px", color: "#9ca3af", fontFamily: FONT }}>{slots.length} slot{slots.length !== 1 ? "s" : ""}</span>
                                            {isOpen ? <ChevronUp size={15} color="#9ca3af" /> : <ChevronDown size={15} color="#9ca3af" />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .18 }} style={{ overflow: "hidden" }}>
                                                <div style={{ padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                                    {slots.map((slot, si) => {
                                                        const k = `${di}_${si}`;
                                                        const isSel = !!selected[k];
                                                        return (
                                                            <button key={slot._id} onClick={() => toggleSlot(di, si)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "8px", border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`, background: "white", cursor: "pointer", fontFamily: FONT }}>
                                                                <span style={{ fontSize: "14px", fontWeight: 600, color: isSel ? BLUE : "#374151", fontFamily: FONT }}>{slot.startTime} – {slot.endTime}</span>
                                                                {isSel ? <CheckCircle size={17} color={BLUE} /> : <div style={{ width: "17px", height: "17px", borderRadius: "50%", border: "1.5px solid #d1d5db" }} />}
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
                    <div style={{ textAlign: "center", padding: "24px", background: "#fafafa", borderRadius: "10px", border: "1px dashed #e5e7eb" }}>
                        <p style={{ fontSize: "15px", color: "#9ca3af", margin: 0, fontFamily: FONT }}>No Availability Slots Set Yet</p>
                    </div>
                )}
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", padding: "18px 26px", background: "white", flexShrink: 0 }}>
                <div style={{ marginBottom: "14px" }}>
                    <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 3px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", fontFamily: FONT }}>Total For {PLANS.find((p) => p.key === planKey)?.label}</p>
                    <p style={{ fontSize: "30px", fontWeight: 800, color: BLUE, margin: 0, fontFamily: FONT }}>{totalPrice > 0 ? fmtINR(totalPrice) : "N/A"}</p>
                    {totalSessions > 0 && <p style={{ fontSize: "13px", color: "#9ca3af", margin: "3px 0 0", fontFamily: FONT }}>{totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week</p>}
                </div>
                <button disabled={totalPrice === 0} style={{ width: "100%", padding: "15px", background: totalPrice === 0 ? "#d1d5db" : PRIMARY, cursor: totalPrice === 0 ? "not-allowed" : "pointer", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "16px", fontFamily: FONT }}>
                    {totalPrice === 0 ? "Plan Not Available" : `Subscribe — ${fmtINR(totalPrice)}`}
                </button>
                <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "13px", marginTop: "10px", fontFamily: FONT }}>Secure Checkout · Cancel Anytime · 7-Day Refund Policy</p>
            </div>
        </motion.div>
    );
}

// ── MentorCard ─────────────────────────────────────────────────────────────
function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
    const width = useWindowWidth();
    const isMobile = width < 768;
    const [bioExpanded, setBioExpanded] = useState(false);

    const fullName = toTitleCase(mentor.fullName || "Mentor");
    const currentRole = toTitleCase(mentor.currentRole || "");
    const companyName = toTitleCase(mentor.companyName || "");
    const locationText = toTitleCase(mentor.location || "");
    const languages = Array.isArray(mentor.languages) ? mentor.languages.join(", ") : mentor.languages || "";
    const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
    const areas = (mentor.areasOfInterest || mentor.currentSkills || "").split(",").map((s) => s.trim()).filter(Boolean);
    const monthlyPrice = mentor.pricing?.monthlyRate ?? mentor.hourlyRate ?? 0;
    const nextAvailable = mentor.nextAvailable ?? "";
    const placements = mentor.placements ?? 0;
    const menteeCount = mentor.menteeCount ?? 0;
    const yearsExp = mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Years of Exp.` : "0+ Years of Exp.";
    const starBadge = mentor.starMentorBadge || mentor.badge || "";
    const referralCount = mentor.referralCount ?? 0;
    const hasCurriculum = mentor.hasCurriculum ?? false;
    const weeklySessions = mentor.pricing?.weeklySessions ?? 4;
    const discount = mentor.discount ?? null;

    const BIO_LIMIT = 200;
    const bioIsTruncatable = bio.length > BIO_LIMIT;
    const displayedBio = bioIsTruncatable && !bioExpanded ? bio.slice(0, BIO_LIMIT) + "..." : bio;

    const offeringForList = Array.isArray(mentor.offeringFor)
        ? mentor.offeringFor
        : mentor.offeringFor ? String(mentor.offeringFor).split(",").map((s) => s.trim()) : [];

    const domainsList = Array.isArray(mentor.domains)
        ? mentor.domains
        : mentor.domains ? String(mentor.domains).split(",").map((s) => s.trim()) : [];

    const prevCompanies = Array.isArray(mentor.previousCompanies) ? mentor.previousCompanies : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
            style={{
                width: "100%",
                border: "1px solid #e2e8f0",
                background: "#fff",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                overflow: "hidden",
                marginBottom: "16px",
                fontFamily: FONT,
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                minHeight: isMobile ? "auto" : "340px",
            }}
        >
            {/* ── LEFT COLUMN ── */}
            <div style={{
                width: isMobile ? "100%" : "200px",
                minWidth: isMobile ? "100%" : "200px",
                display: "flex",
                flexDirection: "column",
                borderRight: isMobile ? "none" : "1px solid #e2e8f0",
                flexShrink: 0,
                background: "#fff",
            }}>
                {/* Photo */}
                <div style={{
                    position: "relative",
                    width: "100%",
                    flex: isMobile ? "none" : 1,
                    height: isMobile ? "260px" : "auto",
                    minHeight: isMobile ? "260px" : "200px",
                    background: "#f1f5f9",
                    overflow: "hidden",
                }}>
                    <span style={{ position: "absolute", top: "8px", left: "8px", fontSize: "12px", color: "#cbd5e1", userSelect: "none", zIndex: 2 }}>✦</span>
                    <span style={{ position: "absolute", top: "8px", right: "8px", fontSize: "8px", color: "#cbd5e1", userSelect: "none", zIndex: 2 }}>✦</span>
                    <span style={{ position: "absolute", bottom: "8px", left: "6px", fontSize: "7px", color: "#cbd5e1", userSelect: "none", zIndex: 2 }}>✦</span>
                    <span style={{ position: "absolute", bottom: "8px", right: "6px", fontSize: "10px", color: "#cbd5e1", userSelect: "none", zIndex: 2 }}>✦</span>
                    <img
                        src={mentor.profilePhoto}
                        alt={fullName}
                        style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                        }}
                    />
                </div>

                {/* Current Company */}
                <div style={{ borderTop: "1px solid #e2e8f0", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", background: "#fafafa", flexShrink: 0 }}>
                    <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: mentor.companyLogoColor || "#1d4ed8",
                        color: "#fff", display: "flex", alignItems: "center",
                        justifyContent: "center", fontWeight: 800, fontSize: "14px",
                        flexShrink: 0, fontFamily: FONT, overflow: "hidden",
                    }}>
                        {mentor.companyLogo
                            ? <img src={mentor.companyLogo} alt={companyName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : fullName.charAt(0)
                        }
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {currentRole}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", fontFamily: FONT, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {companyName}
                        </div>
                    </div>
                </div>

                {/* Experience */}
                <div style={{ borderTop: "1px solid #e2e8f0", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", background: "#fafafa", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        {prevCompanies.slice(0, 3).map((c, i) => (
                            <div key={i} style={{
                                width: "30px", height: "30px", borderRadius: "50%",
                                border: "2px solid white", background: "#e2e8f0", overflow: "hidden",
                                marginLeft: i > 0 ? "-8px" : "0", zIndex: 3 - i,
                                position: "relative", flexShrink: 0,
                            }}>
                                {c.logo
                                    ? <img src={c.logo} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#374151", background: ["#fef3c7", "#dbeafe", "#d1fae5"][i % 3], fontFamily: FONT }}>{c.name?.charAt(0) || "C"}</div>
                                }
                            </div>
                        ))}
                        {prevCompanies.length === 0 && (
                            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#92400e", fontFamily: FONT }}>
                                {companyName?.charAt(0) || "C"}
                            </div>
                        )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", fontFamily: FONT }}>{yearsExp}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", fontFamily: FONT, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {prevCompanies.length > 0 ? prevCompanies.map((c) => c.name).join(" | ") : companyName}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CENTRE ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: isMobile ? "none" : "1px solid #e2e8f0", minWidth: 0 }}>
                <div style={{ padding: "20px 22px 16px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>

                    {/* Name */}
                    <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, fontFamily: FONT }}>
                        {fullName}
                    </h2>

                    {/* Location + Language */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", fontSize: "15px", color: "#64748b", fontFamily: FONT }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <MapPin size={14} color="#64748b" />
                            <strong style={{ color: "#334155" }}>{locationText.split(",")[0]}</strong>
                            {locationText.includes(",") && <span>, {locationText.split(",").slice(1).join(",").trim()}</span>}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <Pencil size={13} color="#64748b" />
                            <strong style={{ color: "#334155" }}>{languages}</strong>
                        </span>
                    </div>

                    {/* Bio */}
                    <div style={{ fontSize: "15px", color: "#475569", lineHeight: "1.65", fontFamily: FONT }}>
                        {displayedBio}
                        {bioIsTruncatable && (
                            <span onClick={() => setBioExpanded(!bioExpanded)} style={{ color: "#1a1a2e", marginLeft: "5px", cursor: "pointer", fontWeight: 600 }}>
                                {bioExpanded ? "Show Less" : "Read More"}
                            </span>
                        )}
                    </div>

                    {/* Skills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                        {areas.map((skill, i) => (
                            <div key={i} style={{ border: "1px solid #d1d5db", padding: "4px 12px", fontSize: "13px", color: "#374151", background: "#fff", borderRadius: "4px", fontFamily: FONT }}>
                                {toTitleCase(skill)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom strip */}
                <div style={{ borderTop: "1px solid #f1f5f9", padding: "10px 22px", display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap", background: "#f8fafc" }}>
                    {offeringForList.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontFamily: FONT }}>
                            <Briefcase size={13} color="#64748b" />
                            <span style={{ color: "#64748b" }}>For:</span>
                            <span style={{ fontWeight: 600, color: "#0f172a" }}>{offeringForList.join(" | ")}</span>
                        </div>
                    )}
                    {domainsList.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontFamily: FONT }}>
                            <div style={{ width: "12px", height: "12px", borderRadius: "50%", border: "2px solid #64748b", flexShrink: 0 }} />
                            <span style={{ color: "#64748b" }}>Domains:</span>
                            <span style={{ fontWeight: 600, color: "#0f172a" }}>{domainsList[0]}</span>
                            {domainsList.length > 1 && (
                                <span style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>+{domainsList.length - 1} More</span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── RIGHT: Stats + CTA ── */}
            <div style={{
                width: isMobile ? "100%" : "275px",
                minWidth: isMobile ? "100%" : "275px",
                display: "flex",
                flexDirection: "column",
                background: "#ffffff",
                flexShrink: 0,
            }}>
                {/* Stats */}
                <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontFamily: FONT }}>
                        <Star size={15} color="#f59e0b" fill="#f59e0b" style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 700, color: "#0f172a" }}>Star Mentor</span>
                        {starBadge && <span style={{ fontSize: "13px", color: "#64748b" }}>- {starBadge}</span>}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#374151", fontFamily: FONT }}>
                        <Trophy size={15} color="#d97706" style={{ flexShrink: 0 }} />
                        <span>{placements} Placements</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#374151", fontFamily: FONT }}>
                        <Users size={15} color="#0ea5e9" style={{ flexShrink: 0 }} />
                        <span>5.0 ({menteeCount}+ mentees)</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#374151", fontFamily: FONT }}>
                        <Video size={15} color="#10b981" style={{ flexShrink: 0 }} />
                        <span>{weeklySessions * 4}x Sessions Per Month</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "15px", color: "#374151", fontFamily: FONT }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Briefcase size={15} color="#8b5cf6" style={{ flexShrink: 0 }} />
                            <span>Referrals in Top Companies</span>
                        </div>
                        {referralCount > 0 && (
                            <span style={{ color: "#2563eb", fontWeight: 600, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap", marginLeft: "4px" }}>
                                +{referralCount} More
                            </span>
                        )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "15px", fontFamily: FONT, color: hasCurriculum ? "#374151" : "#cbd5e1" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <BookOpen size={15} color={hasCurriculum ? "#64748b" : "#cbd5e1"} style={{ flexShrink: 0 }} />
                            <span>{hasCurriculum ? "Detailed Curriculum Available" : "No Curriculum Yet"}</span>
                        </div>
                        {hasCurriculum && (
                            <span style={{ color: "#2563eb", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>View ↗</span>
                        )}
                    </div>

                    {/* Price */}
                    <div style={{ marginTop: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px" }}>
                            <span style={{ fontSize: "13px", color: "#94a3b8", fontFamily: FONT }}>Starting from</span>
                            {discount && (
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "3px", background: "#dcfce7", color: "#16a34a", borderRadius: "20px", padding: "3px 10px", fontSize: "13px", fontWeight: 700, fontFamily: FONT }}>
                                    ✦ Extra {discount}% OFF
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
                            <span style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", lineHeight: 1, fontFamily: FONT }}>{fmtINR(monthlyPrice)}</span>
                            <span style={{ fontSize: "13px", color: "#64748b", marginBottom: "3px", fontFamily: FONT }}>/Session </span>
                        </div>
                    </div>
                </div>

                {/* CTA buttons */}
                <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                        onClick={() => onViewProfile(mentor)}
                        style={{ width: "100%", height: "44px", border: "1px solid #d1d5db", borderRadius: "8px", background: "#ffffff", color: "#0f172a", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: FONT }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
                    >
                        View Profile
                    </button>

                    {nextAvailable && (
                        <p style={{ textAlign: "center", fontSize: "13px", color: "#94a3b8", margin: 0, fontFamily: FONT }}>
                            Next Available: <span style={{ color: "#374151", fontWeight: 600 }}>{nextAvailable}</span>
                        </p>
                    )}
                </div>
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
    const [priceVal, setPriceVal] = useState(40000);

    const toggleDomain = (d) =>
        setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

    const handleClear = () => { setSelectedDomains([]); setPriceVal(40000); onClear(); };

    const sidebarContent = (
        <div style={{
            width: isMobile ? "100%" : "310px",
            background: "white",
            borderRadius: isMobile ? 0 : "8px",
            padding: "22px",
            fontFamily: FONT,
            boxSizing: "border-box",
            ...(!isMobile && {
                border: "1px solid #e2e8f0",
                alignSelf: "flex-start",
                position: "sticky",
                top: "80px",
                flexShrink: 0,
                boxShadow: "0 1px 6px rgba(0,0,0,.06)",
            }),
        }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "17px", color: "#0f172a", margin: 0, fontFamily: FONT }}>Filter By</h3>
                <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
                    ✕ Clear Filters
                </button>
            </div>

            {/* Domain */}
            <p style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a", margin: "0 0 12px", fontFamily: FONT }}>Domain</p>

            {selectedDomains.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", border: `1px solid ${BLUE_BORDER}`, borderRadius: "8px", padding: "10px 36px 10px 12px", marginBottom: "12px", position: "relative" }}>
                    {selectedDomains.map((d) => (
                        <span key={d} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}`, fontFamily: FONT }}>
                            {d}
                            <button onClick={() => toggleDomain(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, display: "flex", lineHeight: 1 }}>
                                <X size={10} />
                            </button>
                        </span>
                    ))}
                    <div style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "3px" }}>
                        <span style={{ color: "#94a3b8", fontSize: "13px" }}>|</span>
                        <ChevronDown size={13} color="#94a3b8" />
                    </div>
                </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "22px" }}>
                {DOMAIN_CHIPS.map((d) => {
                    const active = selectedDomains.includes(d);
                    return (
                        <button key={d} onClick={() => toggleDomain(d)}
                            style={{ fontSize: "13px", fontWeight: 500, padding: "6px 13px", borderRadius: "6px", background: active ? "#0f172a" : "white", color: active ? "white" : "#374151", border: `1px solid ${active ? "#0f172a" : "#e2e8f0"}`, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "5px" }}>
                            {active && <span style={{ fontSize: "11px" }}>✓</span>}
                            {d}
                        </button>
                    );
                })}
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", marginBottom: "18px" }} />

            {/* Offering For */}
            <p style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a", margin: "0 0 12px", fontFamily: FONT }}>Offering Mentorship For</p>
            <div style={{ position: "relative", marginBottom: "22px" }}>
                <select value={offeringFor} onChange={(e) => setOfferingFor(e.target.value)}
                    style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "11px 36px 11px 16px", fontSize: "15px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, boxSizing: "border-box" }}>
                    <option>Working Professionals</option>
                    <option>Students</option>
                    <option>Freshers</option>
                    <option>Entrepreneurs</option>
                </select>
                <ChevronDown size={15} color="#64748b" style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", marginBottom: "18px" }} />

            {/* Pricing */}
            <p style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a", margin: "0 0 12px", fontFamily: FONT }}>Pricing</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginBottom: "8px", fontFamily: FONT }}>
                <span>₹5,000</span>
                <span>₹40,000</span>
            </div>
            <input type="range" min={5000} max={40000} step={500} value={priceVal}
                onChange={(e) => setPriceVal(Number(e.target.value))}
                style={{ width: "100%", accentColor: BLUE, cursor: "pointer", boxSizing: "border-box" }}
            />
            <p style={{ fontSize: "15px", color: "#374151", fontWeight: 600, margin: "8px 0 0", fontFamily: FONT }}>Up To {fmtINR(priceVal)}/Month</p>

            <button
                onClick={() => { onSearch({ maxPrice: priceVal, offeringFor, domains: selectedDomains }); if (isMobile) onClose(); }}
                disabled={isSearching}
                style={{ marginTop: "18px", width: "100%", padding: "13px", background: isSearching ? BLUE_BORDER : PRIMARY, color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT, boxSizing: "border-box" }}>
                {isSearching ? "Applying…" : "Apply Filters"}
            </button>
        </div>
    );

    if (!isMobile) return sidebarContent;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                        style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.3)", backdropFilter: "blur(2px)" }} />
                    <motion.div key="drawer" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "85vh", zIndex: 201, background: "white", borderRadius: "20px 20px 0 0", overflowY: "auto" }}>
                        <div style={{ width: "36px", height: "4px", background: "#e2e8f0", borderRadius: "2px", margin: "12px auto 0" }} />
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

    const [searchParams] = useSearchParams();
    const domainFromUrl = searchParams.get("domain") ?? "";

    const apiFilters = useMemo(() => {
        const filters = {};
        if (domainFromUrl) filters.domain = domainFromUrl;
        return filters;
    }, [domainFromUrl]);

    const { data, isLoading, isError } = useGetLtmAllMentorsQuery(apiFilters);
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
    const [subscribeTarget, setSubscribeTarget] = useState(null);

    useEffect(() => {
        setIsFiltered(false);
        setDisplayMentors(null);
        setSearchEmpty(false);
        setSortBy("Recommended");
    }, [domainFromUrl]);

    const mentors = isFiltered ? (displayMentors ?? []) : allMentors;
    const handleClear = () => { setIsFiltered(false); setDisplayMentors(null); setSearchEmpty(false); navigate("/explore-mentors"); };

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
            {/* ── Header ── */}
            <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white", borderBottom: "1px solid #e2e8f0", fontFamily: FONT, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", height: "66px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div onClick={() => navigate("/")} style={{ cursor: "pointer", flexShrink: 0 }}>
                        <img src={KarrivoLogo} className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain" alt="Karrivo" />
                    </div>
                    {!isMobile && (
                        <nav style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                            {NAV_LINKS.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <button key={link.path} onClick={() => navigate(link.path)}
                                        style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "16px", fontWeight: 500, color: isActive ? "#0f172a" : "#64748b", padding: "4px 0", borderBottom: `2px solid ${isActive ? "#0f172a" : "transparent"}` }}>
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        {!isMobile && (
                            <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "16px", fontWeight: 600, color: "#0f172a", padding: "8px 18px" }}>
                                Login
                            </button>
                        )}
                        {isMobile && (
                            <button onClick={() => setMobileNavOpen(!mobileNavOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
                                {[0, 1, 2].map((i) => (
                                    <span key={i} style={{ display: "block", width: "22px", height: "2px", background: "#0f172a", borderRadius: "2px", ...(i === 0 && mobileNavOpen ? { transform: "rotate(45deg) translateY(7px)" } : i === 1 && mobileNavOpen ? { opacity: 0 } : i === 2 && mobileNavOpen ? { transform: "rotate(-45deg) translateY(-7px)" } : {}) }} />
                                ))}
                            </button>
                        )}
                    </div>
                </div>
                <AnimatePresence>
                    {isMobile && mobileNavOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderTop: "1px solid #f1f5f9", background: "white" }}>
                            {NAV_LINKS.map((link) => (
                                <button key={link.path} onClick={() => { navigate(link.path); setMobileNavOpen(false); }}
                                    style={{ display: "block", width: "100%", textAlign: "left", padding: "16px 22px", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "16px", color: "#64748b", borderBottom: "1px solid #f8fafc" }}>
                                    {link.label}
                                </button>
                            ))}
                            <button onClick={() => navigate("/login")} style={{ display: "block", width: "100%", textAlign: "left", padding: "16px 22px", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>Login</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Domain filter pill bar ── */}
            {domainFromUrl && !isFiltered && (
                <div style={{ background: BLUE_LIGHT, borderBottom: `1px solid ${BLUE_BORDER}`, padding: "10px 26px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", fontFamily: FONT }}>
                    <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Filtered by:</span>
                    {domainFromUrl.split(",").map((d) => (
                        <span key={d} style={{ background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}`, borderRadius: "20px", padding: "3px 12px", fontSize: "13px", fontWeight: 700 }}>{d.trim()}</span>
                    ))}
                    <button onClick={handleClear} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: "3px" }}>
                        <X size={11} /> Clear
                    </button>
                </div>
            )}

            {/* ── Main layout ── */}
            <main style={{ minHeight: "100vh", background: "#f6f8fa", fontFamily: FONT }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "14px" : "18px 26px", display: "flex", gap: "22px", alignItems: "flex-start", boxSizing: "border-box" }}>

                    {/* ── LEFT: Cards area ── */}
                    <div style={{ flex: 1, minWidth: 0 }}>

                        {/* Search + Sort bar */}
                        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px 18px", marginBottom: "14px", display: "flex", gap: "14px", alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
                            <div style={{ flex: 1, minWidth: isMobile ? "100%" : "auto", position: "relative" }}>
                                <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for any Skill, domain or name..."
                                    onKeyDown={(e) => { if (e.key === "Enter" && searchQuery) handleSearch({ query: searchQuery }); }}
                                    style={{ width: "100%", padding: "11px 16px 11px 40px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box" }}
                                    onFocus={(e) => (e.target.style.borderColor = BLUE)}
                                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                                />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                                <span style={{ fontSize: "15px", color: "#64748b", fontWeight: 600, whiteSpace: "nowrap", fontFamily: FONT }}>Sort by:</span>
                                <div style={{ position: "relative" }}>
                                    <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}
                                        style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "10px 34px 10px 14px", fontSize: "15px", color: "#374151", background: "white", cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT, minWidth: "175px" }}>
                                        <option>Recommended</option>
                                        <option>Price: Low To High</option>
                                        <option>Price: High To Low</option>
                                        <option>Most Experienced</option>
                                    </select>
                                    <ChevronDown size={13} color="#64748b" style={{ position: "absolute", right: "11px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                                </div>
                                {isTablet && (
                                    <button onClick={() => setFilterDrawerOpen(true)}
                                        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", border: `1.5px solid ${BLUE_BORDER}`, borderRadius: "8px", background: "white", cursor: "pointer", fontFamily: FONT, fontSize: "15px", fontWeight: 700, color: BLUE, whiteSpace: "nowrap" }}>
                                        <SlidersHorizontal size={14} color={BLUE} /> Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Result count */}
                        {!isLoading && !isError && mentors.length > 0 && (
                            <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "14px", fontWeight: 500, fontFamily: FONT }}>
                                Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
                            </p>
                        )}

                        {isLoading && (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: `3px solid ${BLUE_LIGHT}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
                                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                            </div>
                        )}

                        {isError && !isLoading && (
                            <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                                <p style={{ fontWeight: 700, fontSize: "17px", color: "#0f172a", fontFamily: FONT }}>No Mentors Available</p>
                                <p style={{ fontSize: "15px", color: "#94a3b8", marginTop: "6px", fontFamily: FONT }}>Please check back later</p>
                            </div>
                        )}

                        {!isLoading && !isError && searchEmpty && (
                            <div style={{ textAlign: "center", padding: "60px 0" }}>
                                <p style={{ fontWeight: 700, fontSize: "17px", color: "#0f172a", fontFamily: FONT }}>No mentors match your filters</p>
                                <button onClick={handleClear} style={{ marginTop: "14px", background: BLUE, color: "white", border: "none", borderRadius: "8px", padding: "12px 22px", fontWeight: 600, fontSize: "15px", cursor: "pointer", fontFamily: FONT }}>Clear Filters</button>
                            </div>
                        )}

                        {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
                            <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                {mentors.map((mentor, index) => (
                                    <MentorCard key={mentor._id || index} mentor={mentor} index={index} onSubscribe={handleBookTrial} onViewProfile={handleViewProfile} />
                                ))}
                            </div>
                        )}

                        {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
                            <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e2e8f0", borderRadius: "8px", background: "white" }}>
                                <p style={{ fontSize: "36px", marginBottom: "10px" }}>👨‍🏫</p>
                                <p style={{ fontWeight: 700, fontSize: "17px", color: "#0f172a", fontFamily: FONT }}>No Mentors Available</p>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT: Filter sidebar (desktop only) ── */}
                    {!isTablet && (
                        <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={false} onClose={() => { }} />
                    )}
                </div>
            </main>

            {/* Mobile filter drawer */}
            {isTablet && (
                <FilterSidebar onSearch={handleSearch} isSearching={isSearching} onClear={handleClear} isFiltered={isFiltered} isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} />
            )}

            {/* Subscribe panel */}
            <AnimatePresence>
                {subscribeTarget && (
                    <>
                        <motion.div key="sub-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSubscribeTarget(null)}
                            style={{ position: "fixed", inset: 0, zIndex: 299, background: "rgba(0,0,0,.35)", backdropFilter: "blur(2px)" }} />
                        <SubscribePanel key="sub-panel" mentor={subscribeTarget} onClose={() => setSubscribeTarget(null)} />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

