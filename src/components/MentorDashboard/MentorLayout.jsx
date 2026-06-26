

import React, { useState, useEffect, useRef } from "react";
import {
    Home, Users, Clock, Star, X, Menu,
    Headphones, ChevronRight, ChevronDown, Loader2,
    CheckCircle, Calendar, Briefcase, FileText,
    HelpCircle, User, Copy, Wallet, BookOpen,
    Wrench, Bug, Settings, UserCircle, TrendingUp,
    Target, LogOut, ArrowUpRight, Pencil, MessageSquare, Phone, MapPin
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorProfile/mentorprofileapi";
import Loader from "../../global/Loader";
import Karrivo from "../../assets/karrivoSymbol.png";
import EditMentorProfile from "./Editmentorprofile";

// ── Constants ──────────────────────────────────────────────────────────────────
const F = `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// ── Color tokens ───────────────────────────────────────────────────────────────
const T = {
    primary: "#0098cc",
    btn: "#1a1a2e",
    bg: "#ffffff",
    surface: "#f8f9fb",
    border: "#e8eaed",
    borderMed: "#d1d5db",
    textDark: "rgb(81, 87, 98)",
    textMid: "rgb(81, 87, 98)",
    textLight: "#9ca3af",
    success: "#16a34a",
    warning: "#d97706",
    error: "#dc2626",
    successBg: "#f0fdf4",
    warningBg: "#fffbeb",
    errorBg: "#fef2f2",
    primaryBg: "#e8f6fc",
    primaryBd: "#bae3f5",
    navActive: "#2563eb",
    navActiveBg: "#eff6ff",
};

// ── Navigation items ───────────────────────────────────────────────────────────
const navigationItems = [
    { id: "home", label: "Home", icon: Home, route: "/mentor/dashboard" },
    { id: "sessions", label: "Sessions", icon: BookOpen, route: "/mentor/dashboard/sessions" },
    { id: "subscriptions", label: "Subscriptions", icon: Users, route: "/mentor/dashboard/my-mentee-sessions" },
    { id: "pricing", label: "Pricing", icon: Wallet, route: "/mentor/dashboard/pricing" },
    { id: "availability", label: "Manage Availability", icon: Calendar, route: "/mentor/dashboard/Manage_Availability" },
    { id: "earnings", label: "Earnings", icon: Star, route: "/mentor/dashboard/Earnings" },
    { id: "testimonials", label: "Testimonials", icon: Star, route: "/mentor/dashboard/reviews" },
    { id: "support", label: "Help Request", icon: Headphones, route: "/mentor-dashboard/support" },
];

// ── Logout Modal ───────────────────────────────────────────────────────────────
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "0 16px" }}>
            <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, width: "100%", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
                <h2 style={{ fontFamily: F, color: T.primary, fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Confirm Logout</h2>
                <p style={{ fontFamily: F, color: T.textMid, fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
                    Are you sure you want to log out? You'll need to sign in again to access your account.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={onClose} style={{ flex: 1, padding: "10px 16px", borderRadius: 8, border: `1px solid ${T.btn}`, color: T.btn, background: "#fff", fontFamily: F, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>Cancel</button>
                    <button onClick={onConfirm} style={{ flex: 1, padding: "10px 16px", borderRadius: 8, border: "none", background: T.btn, color: "#fff", fontFamily: F, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>Log out</button>
                </div>
            </div>
        </div>
    );
};

// ── Profile Dropdown ───────────────────────────────────────────────────────────
const ProfileDropdown = ({ onLogoutClick, isOpen, onClose, onEditProfile }) => {
    const navigate = useNavigate();
    const [userinfo, setUserinfo] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const ud = localStorage.getItem("userData");
        if (ud) setUserinfo(JSON.parse(ud));
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onClose?.(); };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, onClose]);

    const handleViewProfile = () => {
        const ud = localStorage.getItem("userData");
        if (ud) {
            try {
                const parsed = JSON.parse(ud);
                const mentorId = parsed._id || parsed.id;
                if (mentorId) { navigate(`/mentor-profile/${mentorId}`, { state: { type: "mentor" } }); onClose?.(); }
            } catch { }
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={dropdownRef} style={{ position: "absolute", right: 0, top: 52, width: 240, background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, background: T.btn, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 13, flexShrink: 0, overflow: "hidden" }}>
                    {userinfo?.profilePhoto
                        ? <img src={userinfo.profilePhoto} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : userinfo?.name?.charAt(0) || "U"}
                </div>
                <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: F, color: T.primary, fontSize: 13, fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userinfo?.name || "User"}</p>
                    <p style={{ fontFamily: F, color: T.textLight, fontSize: 11, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userinfo?.email || ""}</p>
                </div>
            </div>
            <div style={{ padding: 6 }}>
                {[
                    { label: "View Profile", onClick: handleViewProfile, color: T.textDark, icon: <User size={13} color={T.primary} /> },
                    { label: "Edit Profile", onClick: () => { onEditProfile?.(); onClose?.(); }, color: T.textDark, icon: <Pencil size={13} color={T.primary} /> },
                    { label: "Log out", onClick: onLogoutClick, color: T.error, icon: <LogOut size={13} color={T.error} /> },
                ].map(({ label, onClick, color, icon }) => (
                    <button key={label} onClick={onClick} style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 7, fontFamily: F, fontSize: 13, color, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        {icon}{label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// ── Sidebar Content ────────────────────────────────────────────────────────────
const SidebarContent = ({ collapsed = false, isActiveRoute, onNavClick }) => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
            {/* Logo */}
            <div style={{ height: 56, display: "flex", alignItems: "center", borderBottom: `1px solid ${T.border}`, padding: collapsed ? "0 12px" : "0 16px", flexShrink: 0 }}>
                {collapsed ? (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <img src={Karrivo} alt="Logo" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8 }} />
                    </div>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={Karrivo} alt="Logo" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8 }} />
                        <span style={{ fontFamily: F, fontSize: "14px", fontWeight: 700, color: T.textDark }}>
                            Mentor Hub
                        </span>
                    </div>
                )}
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2, scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.route);
                    return (
                        <button
                            key={item.id}
                            onClick={() => { navigate(item.route); onNavClick?.(); }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: collapsed ? 0 : 10,
                                padding: "9px 12px",
                                borderRadius: 8,
                                border: "none",
                                background: isActive ? T.navActiveBg : "transparent",
                                color: isActive ? T.navActive : T.textMid,
                                cursor: "pointer",
                                fontFamily: F,
                                fontSize: "14px",
                                fontWeight: isActive ? 600 : 400,
                                justifyContent: collapsed ? "center" : "flex-start",
                                width: "100%",
                                transition: "all .12s ease",
                            }}
                        >
                            <Icon size={16} style={{ flexShrink: 0 }} />
                            {!collapsed && <span style={{ flex: 1, textAlign: "left", fontFamily: F, fontSize: "14px" }}>{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Support link */}
            {!collapsed && (
                <div style={{ borderTop: `1px solid ${T.border}`, padding: "12px 10px", flexShrink: 0 }}>
                    <button
                        onClick={() => navigate("/mentor-dashboard/support")}
                        style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.border}`, borderRadius: 8, background: "#fff", fontFamily: F, fontSize: "14px", color: T.textDark, cursor: "pointer", textAlign: "center", fontWeight: 400 }}
                    >
                        Support Centre
                    </button>
                </div>
            )}
        </div>
    );
};

// ── Right Panel ────────────────────────────────────────────────────────────────
const RightPanel = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("+919699039801");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const mentorGrowth = [
        { title: "Build your personal brand", subtitle: "Create trust and visibility with your profile", icon: UserCircle },
        { title: "Increase session bookings", subtitle: "Optimize your profile to attract more mentees", icon: TrendingUp },
        { title: "Deliver better mentorship", subtitle: "Engage smarter and improve student outcomes", icon: Target },
    ];

    return (
        <div className="right-panel" style={{ width: 280, flexShrink: 0, borderLeft: `1px solid ${T.border}`, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", minHeight: 0, scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {/* Mentor Growth */}
            <div style={{ padding: "20px 18px 16px" }}>
                <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, margin: "0 0 4px" }}>Grow as a Mentor</p>
                <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "0 0 14px", lineHeight: 1.5 }}>
                    Improve your visibility, engagement, and mentorship journey.
                </p>
                {mentorGrowth.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", border: `1px solid ${T.border}`, borderRadius: 10, marginBottom: 8, cursor: "pointer", transition: "background .15s" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = T.surface}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.btn, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon size={17} color="#ffffff" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: T.textDark, margin: 0 }}>{item.title}</p>
                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>{item.subtitle}</p>
                            </div>
                            <ArrowUpRight size={13} color={T.textLight} />
                        </div>
                    );
                })}
            </div>

            <div style={{ height: 1, background: T.border }} />

            {/* Support */}
            <div style={{ padding: "18px" }}>
                <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, margin: "0 0 6px" }}>Any queries?</p>
                <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "0 0 12px", lineHeight: 1.6 }}>
                    Reach out to your support team anytime for profile help or onboarding assistance.
                </p>
                <p style={{ fontFamily: F, fontSize: 12, color: T.textDark, margin: "0 0 2px", fontWeight: 500 }}>Karrivo Support</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: 0 }}>+91 7702 193 487</p>
                    <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? T.success : T.textLight, display: "flex", alignItems: "center" }}>
                        {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
                    </button>
                </div>
            </div>
        </div>
    );
};



const CenterContent = ({ children, isHome, onEditProfileOpen, onSetEditTab, mentorData }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("userData") || localStorage.getItem("user");
            if (stored) setUserData(JSON.parse(stored));
        } catch (e) {
            console.error("Failed to parse userData from localStorage", e);
        }
    }, []);

    if (!isHome) return (
        <div style={{ flex: 1, padding: "12px", overflowY: "auto", background: "#fff", minHeight: 0, scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {children}
        </div>
    );

    const mentorName = userData?.name || "Mentor";
    const totalMentees = mentorData?.data?.totalMentees ?? userData?.totalMentees ?? 0;

    const iconBox = (bg) => ({
        width: 38, height: 38, borderRadius: "50%",
        background: bg, border: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    });

    const cardStyle = {
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        padding: "18px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minWidth: 0,
        transition: "border-color .15s ease, box-shadow .15s ease",
    };

    const cardTitleRow = { display: "flex", alignItems: "center", gap: 12 };

    const primaryBtn = {
        width: "100%",
        background: T.btn,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "9px 0",
        fontFamily: F,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        marginTop: "auto",
        transition: "opacity .15s ease, transform .1s ease",
    };

    const statRow = (icon, label, value) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.btn, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {icon}
            </div>
            <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.04em", color: T.textLight, fontWeight: 600, fontFamily: F, textTransform: "uppercase" }}>{label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 13.5, color: T.textDark, fontWeight: 700, fontFamily: F, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</p>
            </div>
        </div>
    );

    return (
        <div className="mhub-main" style={{ flex: 1, padding: "24px", overflowY: "auto", background: "#fff", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style>{`
                .mhub-grid{display:grid;grid-template-columns:minmax(0,260px) minmax(0,1fr);gap:16px;align-items:start}
                .mhub-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;min-width:0}
                .mhub-card{will-change:transform}
                .mhub-card:hover{border-color:${T.borderMed};box-shadow:0 2px 10px rgba(15,15,16,0.06)}
                .mhub-btn:hover{opacity:0.88}
                .mhub-btn:active{transform:scale(0.98)}
                .mhub-btn:focus-visible{outline:2px solid ${T.primary};outline-offset:2px}
                @media (max-width:900px){
                    .mhub-grid{grid-template-columns:1fr}
                    .mhub-profile{max-width:380px;margin:0 auto}
                }
                @media (max-width:600px){
                    .mhub-main{padding:16px !important}
                    .mhub-hero{padding:18px !important}
                    .mhub-hero h1{font-size:18px !important}
                    .mhub-cards{grid-template-columns:1fr}
                }
            `}</style>

            {/* Hero banner */}
            <div className="mhub-hero" style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 16, padding: "22px 26px", marginBottom: 20 }}>
                <h1 style={{ fontFamily: F, fontSize: 21, fontWeight: 700, color: T.textDark, margin: "0 0 6px", lineHeight: 1.35 }}>
                    Hello {mentorName} <span style={{ display: "inline-block" }}>👋</span>, welcome to your{" "}
                    <span style={{ color: T.primary }}>Mentor Dashboard</span>.
                </h1>
                <p style={{ fontFamily: F, fontSize: 13.5, color: T.textLight, margin: 0 }}>
                    Let's refine your mentorship experience.
                </p>
            </div>

            {/* Profile + action cards */}
            <div className="mhub-grid">

                {/* Profile card */}
                <div className="mhub-profile" style={{ ...cardStyle, padding: 18 }}>
                    <div style={{
                        width: "100%", aspectRatio: "1 / 1", borderRadius: 12,
                        background: userData?.profilePhoto ? `url(${userData.profilePhoto}) center/cover no-repeat` : T.surface,
                        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                    }}>
                        {!userData?.profilePhoto && <User size={42} color={T.textLight} />}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <p style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: T.textDark, margin: 0, textTransform: "capitalize", lineHeight: 1.3 }}>
                            {userData?.name || "-"}
                        </p>
                        <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: 0, wordBreak: "break-word", lineHeight: 1.4 }}>
                            {userData?.email || "-"}
                        </p>
                    </div>

                    <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
                        {statRow(<Phone size={14} color="#fff" />, "Phone", userData?.phone || "-")}
                        {statRow(<Users size={14} color="#fff" />, "Total mentees", totalMentees)}
                    </div>
                </div>

                {/* Action cards */}
                <div className="mhub-cards">

                    <div className="mhub-card" style={cardStyle}>
                        <div style={cardTitleRow}>
                            <div style={iconBox(T.surface)}><User size={18} color={T.textDark} /></div>
                            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0 }}>Profile setup</p>
                        </div>
                        <p style={{ fontFamily: F, fontSize: 12.5, color: T.textLight, margin: 0, lineHeight: 1.5 }}>Keep your bio and details up to date.</p>
                        <button className="mhub-btn" onClick={() => { onSetEditTab?.("overview"); onEditProfileOpen?.(); }} style={primaryBtn}>
                            Edit profile
                        </button>
                    </div>

                    <div className="mhub-card" style={cardStyle}>
                        <div style={cardTitleRow}>
                            <div style={iconBox(T.surface)}><span style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: T.textDark }}>$</span></div>
                            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0 }}>Pricing setup</p>
                        </div>
                        <p style={{ fontFamily: F, fontSize: 12.5, color: T.textLight, margin: 0, lineHeight: 1.5 }}>Set your session rates for mentees.</p>
                        <button className="mhub-btn" onClick={() => navigate("/mentor/dashboard/pricing")} style={primaryBtn}>
                            Set pricing
                        </button>
                    </div>

                    <div className="mhub-card" style={cardStyle}>
                        <div style={cardTitleRow}>
                            <div style={iconBox(T.surface)}><Calendar size={18} color={T.textDark} /></div>
                            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0 }}>Availability</p>
                        </div>
                        <p style={{ fontFamily: F, fontSize: 12.5, color: T.textLight, margin: 0, lineHeight: 1.5 }}>Open up slots mentees can book.</p>
                        <button className="mhub-btn" onClick={() => navigate("/mentor/dashboard/Manage_Availability")} style={primaryBtn}>
                            Manage slots
                        </button>
                    </div>

                    <div className="mhub-card" style={cardStyle}>
                        <div style={cardTitleRow}>
                            <div style={iconBox(T.surface)}><BookOpen size={18} color={T.textDark} /></div>
                            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0 }}>Curriculum</p>
                        </div>
                        <p style={{ fontFamily: F, fontSize: 12.5, color: T.textLight, margin: 0, lineHeight: 1.5 }}>Share the material you'll mentor with.</p>
                        <button className="mhub-btn" onClick={() => { onSetEditTab?.("achievements"); onEditProfileOpen?.(); }} style={{ ...primaryBtn, position: "relative" }}>
                            Add curriculum
                            {userData?.curriculumNotifications > 0 && (
                                <span style={{
                                    position: "absolute", top: -6, right: -6,
                                    background: T.error, color: "#fff",
                                    borderRadius: "50%", width: 18, height: 18,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 10, fontWeight: 700,
                                }}>
                                    {userData.curriculumNotifications}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* <div className="mhub-card" style={cardStyle}>
                        <div style={cardTitleRow}>
                            <div style={iconBox(T.surface)}><MessageSquare size={17} color={T.textDark} /></div>
                            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0 }}>Mentorship tips</p>
                        </div>
                        <p style={{ fontFamily: F, fontSize: 12.5, color: T.textLight, margin: 0, lineHeight: 1.6 }}>
                            {userData?.mentorshipTip || "Set clear goals with your mentees for better progress."}
                        </p>
                    </div> */}

                    {/* <div className="mhub-card" style={cardStyle}>
                        <div style={cardTitleRow}>
                            <div style={iconBox(T.surface)}><Star size={17} color={T.textDark} /></div>
                            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0 }}>Your badges</p>
                        </div>
                        {(userData?.badges || []).length > 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {userData.badges.map((badge, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: i > 0 ? 10 : 0, borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}>
                                        <CheckCircle size={17} color={badge.color || T.success} />
                                        <p style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, color: badge.color || T.success, margin: 0 }}>
                                            {badge.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: "10px 4px 2px" }}>
                                <p style={{ fontFamily: F, fontSize: 12.5, color: T.textLight, margin: 0, lineHeight: 1.5 }}>
                                    No badges yet — complete mentor milestones to start earning them.
                                </p>
                            </div>
                        )}
                    </div> */}

                </div>
            </div>
        </div>
    );
};
// ═══════════════════════════════════════════════════════════════════════════════
// MentorLayout — main export
// ═══════════════════════════════════════════════════════════════════════════════
const MentorLayout = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState("");
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [editProfileTab, setEditProfileTab] = useState("overview");

    const navigate = useNavigate();
    const location = useLocation();

    const SIDEBAR_W = isMobile ? 0 : sidebarCollapsed ? 56 : 220;

    const [getMentorDetails, { data, isLoading }] = useGetMentorDetailsMutation();
    const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

    useEffect(() => {
        const s = localStorage.getItem("userData");
        if (s) {
            const parsed = JSON.parse(s);
            setUserData(parsed);
            setEmail(parsed.email || "");
        }
    }, []);

    useEffect(() => {
        if (email) getMentorDetails(email);
    }, [email]);

    const handleEditProfileClose = () => {
        setIsEditProfileOpen(false);
        const stored = localStorage.getItem("userData");
        if (stored) setUserData(JSON.parse(stored));
        if (email) getMentorDetails(email);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        window.location.href = "/";
    };

    const isActiveRoute = (route) => {
        if (route === "/mentor/dashboard") return location.pathname === "/mentor/dashboard" || location.pathname === "/mentor/dashboard/";
        return location.pathname.startsWith(route);
    };

    const isHome = isActiveRoute("/mentor/dashboard");

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) setSidebarCollapsed(true);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <style>{`
                *,*::before,*::after{box-sizing:border-box}
                body{margin:0;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
                button{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
                ::-webkit-scrollbar{width:4px;height:4px}
                ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
                nav button:hover{background:${T.surface}!important}
                @media(max-width:1024px){.right-panel{display:none!important}}
                @media(max-width:600px){
                    .cc-stat-strip{grid-template-columns:1fr 1fr!important}
                    .cc-welcome-name{font-size:20px!important}
                    .cc-main-pad{padding:18px 16px!important}
                }
            `}</style>

            <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#fff" }}>

                {/* Top Banner */}
                {/* <div style={{ background: "#1a1a2e", color: "#e5e7eb", fontSize: 13, textAlign: "center", padding: "8px 16px", flexShrink: 0, fontFamily: F }}>
                    Your trials are switched off&nbsp;
                    <button
                        onClick={() => { setEditProfileTab("engagement"); setIsEditProfileOpen(true); }}
                        style={{ color: "#ffffff", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 13, padding: 0 }}
                    >
                        Go to trial settings
                    </button>
                </div> */}

                <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

                    {/* Mobile overlay */}
                    {isMobile && !sidebarCollapsed && (
                        <div onClick={() => setSidebarCollapsed(true)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 99 }} />
                    )}

                    {/* Left Sidebar */}
                    <aside style={{
                        width: isMobile ? 220 : SIDEBAR_W,
                        flexShrink: 0,
                        borderRight: `1px solid ${T.border}`,
                        background: "#fff",
                        height: "100vh",
                        position: isMobile ? "fixed" : "sticky",
                        top: 0, left: 0,
                        zIndex: isMobile ? 100 : "auto",
                        display: "flex", flexDirection: "column",
                        transition: "transform .25s ease, width .2s ease",
                        overflow: "hidden",
                        transform: isMobile ? (sidebarCollapsed ? "translateX(-100%)" : "translateX(0)") : "none",
                    }}>
                        <SidebarContent
                            collapsed={sidebarCollapsed && !isMobile}
                            isActiveRoute={isActiveRoute}
                            onNavClick={() => { if (isMobile) setSidebarCollapsed(true); }}
                        />
                    </aside>

                    {/* Main area */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

                        {/* Header */}
                        <header style={{ height: 56, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: "#fff", flexShrink: 0, position: "sticky", top: 0, zIndex: 40 }}>
                            <button onClick={() => setSidebarCollapsed((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textDark, display: "flex", alignItems: "center" }}>
                                <Menu size={20} />
                            </button>

                            <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                                <button onClick={() => navigate("/mentor-dashboard/support")} style={{ background: "none", border: "none", cursor: "pointer", color: T.textLight, display: "flex" }}>
                                    <HelpCircle size={20} />
                                </button>
                                <button onClick={() => setIsProfileDropdownOpen((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.btn, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600, overflow: "hidden" }}>
                                        {userData?.profilePhoto
                                            ? <img src={userData.profilePhoto} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                                            : userData?.name?.charAt(0) || "M"}
                                    </div>
                                    <ChevronDown size={14} color={T.textLight} />
                                </button>
                                <ProfileDropdown
                                    isOpen={isProfileDropdownOpen}
                                    onClose={() => setIsProfileDropdownOpen(false)}
                                    onLogoutClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }}
                                    onEditProfile={() => { setEditProfileTab("overview"); setIsEditProfileOpen(true); }}
                                />
                            </div>
                        </header>

                        {/* Body */}
                        <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
                            <CenterContent
                                isHome={isHome}
                                onEditProfileOpen={() => setIsEditProfileOpen(true)}
                                onSetEditTab={(tab) => setEditProfileTab(tab)}
                                userData={userData}
                                mentorData={data}
                            >
                                {children}
                            </CenterContent>
                            <RightPanel />
                        </div>

                        {/* Footer */}
                        <footer style={{ borderTop: `1px solid ${T.border}`, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#fff", flexWrap: "wrap", gap: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <span style={{ fontFamily: F, fontSize: 12, color: T.textMid }}>• Mentorship Policies</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                                {[
                                    { icon: <Star size={13} />, label: "Feature Request" },
                                    { icon: <Wrench size={13} />, label: "Support Request" },
                                    { icon: <Bug size={13} />, label: "Report a Bug" },
                                ].map(({ icon, label }) => (
                                    <button key={label} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", fontFamily: F, fontSize: 12, color: T.textMid, cursor: "pointer", padding: 0 }}>
                                        {icon}{label}
                                    </button>
                                ))}
                                <span style={{ fontFamily: F, fontSize: 12, color: T.textMid }}>mentor-support@karrivo.in</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />

            {isEditProfileOpen && !isLoading && (
                <EditMentorProfile
                    onClose={handleEditProfileClose}
                    initialTab={editProfileTab}
                    getMentorDetails={getMentorDetails}
                    updateMentorDetails={updateMentorDetails}
                    data={data}
                    isLoading={isLoading}
                    isSaving={isSaving}
                    email={email}
                />
            )}

            {isLoading && isEditProfileOpen && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default MentorLayout;

