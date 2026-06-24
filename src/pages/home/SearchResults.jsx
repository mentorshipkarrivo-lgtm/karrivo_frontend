import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Loader2, Search, Briefcase, MapPin, X,
  ChevronDown, ChevronUp, CheckCircle, Pencil,
  Building2, SlidersHorizontal, Trophy, Users, Calendar, Target,
  GraduationCap, Languages, BookOpen
} from "lucide-react";
import { FaClock } from "react-icons/fa";
import { useLazySearchMentorsQuery } from "./MentorsecApiSlice";
import Loader from "../../global/Loader";

// ── Google Font ─────────────────────────────────────────────────────────────
const _link = document.createElement("link");
_link.href =
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
_link.rel = "stylesheet";
document.head.appendChild(_link);

// ── Design Tokens ────────────────────────────────────────────────────────────
const BLUE = "#0098cc";
const BLUE_LIGHT = "#f0faff";
const BLUE_BORDER = "#cce9f5";
const PRIMARY = "#1a1a2e";
const FONT = "'DM Sans', sans-serif";

// ── Static Data ──────────────────────────────────────────────────────────────
const DAY_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const PLANS = [
  { key: "1Month", label: "1 Mo" },
  { key: "3Month", label: "3 Mo" },
  { key: "6Month", label: "6 Mo" },
];
const PLAN_ALIASES = {
  "1Month": ["1Month","oneMonth","1month","one_month","onemonth"],
  "3Month": ["3Month","threeMonths","3month","three_months","threemonths","3Months"],
  "6Month": ["6Month","sixMonths","6month","six_months","sixmonths","6Months"],
};

// ── Helpers ──────────────────────────────────────────────────────────────────
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

// ── Stat Item ─────────────────────────────────────────────────────────────────
function StatItem({ icon, label, value }) {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "10px 12px",
        background: "#f8fafc",
        borderRadius: "8px",
        border: "1px solid #f1f5f9",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {icon}
        <span style={{ fontSize: "11px", color: "#94a3b8", fontFamily: FONT, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.4px" }}>
          {label}
        </span>
      </div>
      <span
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#0f172a",
          fontFamily: FONT,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── MentorCard ───────────────────────────────────────────────────────────────
function MentorCard({ mentor, index, onViewProfile }) {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  // On tablet two cards sit in a row so we stack internally
  const stackLayout = isMobile || isTablet;

  const [bioExpanded, setBioExpanded] = useState(false);

  const fullName    = toTitleCase(mentor.fullName || "Mentor");
  const currentRole = toTitleCase(mentor.currentRole || "");
  const companyName = toTitleCase(mentor.companyName || "");
  const locationText = toTitleCase(mentor.location || "");
  const languages   = Array.isArray(mentor.languages)
    ? mentor.languages.join(", ")
    : mentor.languages || "";
  const bio = mentor.motivationStatement || mentor.bio || mentor.about || "";
  const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
    .split(",").map((s) => s.trim()).filter(Boolean);

  const mentoringStyle    = mentor.mentoringStyle || "";
  const highestDegree     = mentor.highestDegree || "";
  const fieldOfStudy      = mentor.fieldOfStudy || "";
  const guidanceAreasList = Array.isArray(mentor.guidanceAreas) ? mentor.guidanceAreas : [];
  const prevCompanies     = Array.isArray(mentor.previousCompanies) ? mentor.previousCompanies : [];
  const offeringForList   = Array.isArray(mentor.offeringFor)
    ? mentor.offeringFor
    : mentor.offeringFor ? String(mentor.offeringFor).split(",").map((s) => s.trim()) : [];
  const domainsList = Array.isArray(mentor.domains)
    ? mentor.domains
    : mentor.domains ? String(mentor.domains).split(",").map((s) => s.trim()) : [];

  const yearsExp = mentor.yearsOfExperience
    ? `${mentor.yearsOfExperience}+ Years`
    : "0+ Years";

  const BIO_LIMIT = 180;
  const bioIsTruncatable = bio.length > BIO_LIMIT;
  const displayedBio = bioIsTruncatable && !bioExpanded ? bio.slice(0, BIO_LIMIT) + "…" : bio;

  const educationLabel = [highestDegree, fieldOfStudy].filter(Boolean).join(" in ") || "";

  const statItems = [
    mentoringStyle && { icon: <Users size={13} color="#0ea5e9" />, label: "Style", value: toTitleCase(mentoringStyle) },
    educationLabel  && { icon: <GraduationCap size={13} color="#8b5cf6" />, label: "Education", value: toTitleCase(educationLabel) },
    languages       && { icon: <Languages size={13} color="#f59e0b" />, label: "Speaks", value: languages },
    guidanceAreasList.length > 0 && { icon: <BookOpen size={13} color="#64748b" />, label: "Guidance", value: guidanceAreasList.slice(0, 2).join(", ") },
  ].filter(Boolean);

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
        flexDirection: stackLayout ? "column" : "row",
        overflow: "hidden",
        fontFamily: FONT,
        borderRadius: "10px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        height: "100%",
      }}
    >
      {/* ── LEFT: Photo + Company ── */}
      <div
        style={{
          width: stackLayout ? "100%" : "180px",
          minWidth: stackLayout ? "100%" : "180px",
          flexShrink: 0,
          display: "flex",
          flexDirection: stackLayout ? "row" : "column",
          borderRight: stackLayout ? "none" : "1px solid #e2e8f0",
          borderBottom: stackLayout ? "1px solid #e2e8f0" : "none",
          background: "#fff",
        }}
      >
        {/* Photo */}
        <div
          style={{
            position: "relative",
            width: stackLayout ? (isMobile ? "110px" : "140px") : "100%",
            minWidth: stackLayout ? (isMobile ? "110px" : "140px") : "100%",
            height: stackLayout ? (isMobile ? "110px" : "140px") : "200px",
            background: "#f1f5f9",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {["top-left","top-right","bottom-left","bottom-right"].map((pos, i) => {
            const [v, h] = pos.split("-");
            return (
              <span key={pos} style={{
                position: "absolute", [v]: "8px", [h]: "8px",
                fontSize: ["12px","8px","7px","10px"][i],
                color: "#cbd5e1", userSelect: "none", zIndex: 2,
              }}>✦</span>
            );
          })}
          <img
            src={mentor.profilePhoto}
            alt={fullName}
            style={{
              display: "block", width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top center",
              position: "absolute", inset: 0,
            }}
          />
        </div>

        {/* Company info — beside photo on mobile/tablet, below photo on desktop */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: stackLayout ? "10px 14px" : "12px 14px",
            gap: "10px",
            minWidth: 0,
          }}
        >
          {/* Current role */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: mentor.companyLogoColor || "#1d4ed8",
                color: "#fff", display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 800, fontSize: "13px",
                flexShrink: 0, fontFamily: FONT, overflow: "hidden",
              }}
            >
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

          {/* Experience / prev companies */}
          {!stackLayout && (
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {prevCompanies.slice(0, 3).map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      border: "2px solid white", background: "#e2e8f0", overflow: "hidden",
                      marginLeft: i > 0 ? "-8px" : "0", zIndex: 3 - i,
                      position: "relative", flexShrink: 0,
                    }}
                  >
                    {c.logo
                      ? <img src={c.logo} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#374151", background: ["#fef3c7","#dbeafe","#d1fae5"][i%3], fontFamily: FONT }}>{c.name?.charAt(0) || "C"}</div>
                    }
                  </div>
                ))}
                {prevCompanies.length === 0 && (
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#92400e", fontFamily: FONT }}>
                    {companyName?.charAt(0) || "C"}
                  </div>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", fontFamily: FONT }}>{yearsExp}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontFamily: FONT, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {prevCompanies.length > 0 ? prevCompanies.map((c) => c.name).join(" · ") : companyName}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CENTRE: Bio + Skills + CTA ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: stackLayout ? "none" : "1px solid #e2e8f0",
          minWidth: 0,
        }}
      >
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          {/* Name */}
          <h2 style={{ margin: 0, fontSize: isMobile ? "17px" : "20px", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, fontFamily: FONT }}>
            {fullName}
          </h2>

          {/* Location + Language */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", fontSize: "13px", color: "#64748b", fontFamily: FONT }}>
            {locationText && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={13} color="#94a3b8" />
                <span style={{ color: "#334155", fontWeight: 600 }}>{locationText.split(",")[0]}</span>
                {locationText.includes(",") && (
                  <span style={{ color: "#64748b" }}>, {locationText.split(",").slice(1).join(",").trim()}</span>
                )}
              </span>
            )}
            {languages && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Languages size={13} color="#94a3b8" />
                <span style={{ color: "#334155", fontWeight: 600 }}>{languages}</span>
              </span>
            )}
          </div>

          {/* Bio */}
          {bio && (
            <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.65", fontFamily: FONT }}>
              {displayedBio}
              {bioIsTruncatable && (
                <span
                  onClick={() => setBioExpanded(!bioExpanded)}
                  style={{ color: BLUE, marginLeft: "4px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}
                >
                  {bioExpanded ? "Show Less" : "Read More"}
                </span>
              )}
            </div>
          )}

          {/* Skills */}
          {areas.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {areas.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #e2e8f0",
                    padding: "3px 10px",
                    fontSize: "12px",
                    color: "#374151",
                    background: "#f8fafc",
                    borderRadius: "4px",
                    fontFamily: FONT,
                    fontWeight: 500,
                  }}
                >
                  {toTitleCase(skill)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom strip */}
        {(offeringForList.length > 0 || domainsList.length > 0) && (
          <div
            style={{
              borderTop: "1px solid #f1f5f9",
              padding: "8px 18px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              background: "#f8fafc",
            }}
          >
            {offeringForList.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontFamily: FONT }}>
                <Briefcase size={12} color="#94a3b8" />
                <span style={{ color: "#64748b" }}>For:</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{offeringForList.join(" · ")}</span>
              </div>
            )}
            {domainsList.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontFamily: FONT }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #94a3b8", flexShrink: 0 }} />
                <span style={{ color: "#64748b" }}>Domain:</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{domainsList[0]}</span>
                {domainsList.length > 1 && (
                  <span style={{ color: BLUE, fontWeight: 600, cursor: "pointer" }}>+{domainsList.length - 1}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div style={{ padding: "12px 18px 14px" }}>
          <button
            onClick={() => onViewProfile(mentor)}
            style={{
              width: "100%",
              height: "40px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#0f172a",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: FONT,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            View Profile
          </button>
        </div>
      </div>

    </motion.div>
  );
}

// ── SearchResults ─────────────────────────────────────────────────────────────
const SearchResults = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const width     = useWindowWidth();
  const isMobile  = width < 640;

  const [searchQuery, setSearchQuery] = useState("");

  const [triggerSearch, { data: response, isLoading, isError, error }] =
    useLazySearchMentorsQuery();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query  = params.get("q");
    setSearchQuery(query || "");
    triggerSearch(query || "");
  }, [location.search, triggerSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const handleViewProfile = (mentor) => {
    navigate(`/mentor-profile/${mentor.userId}`);
  };

  const mentorsList =
    response?.data && Array.isArray(response.data) ? response.data : [];

  // Two columns at ≥ 1280 px, one column below
  const twoCol = width >= 1280;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f8fa",
        paddingTop: isMobile ? "64px" : "80px",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "12px" : "20px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* ── Search Bar ── */}
        <form onSubmit={handleSearch} style={{ marginBottom: "14px" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <Search
              size={14}
              color={BLUE}
              style={{
                position: "absolute", left: "14px", top: "50%",
                transform: "translateY(-50%)", pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMobile ? "Search skills, domain…" : "Search for any skill, domain or name…"}
              style={{
                width: "100%",
                padding: "11px 120px 11px 40px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "13px",
                color: "#374151",
                fontFamily: FONT,
                outline: "none",
                background: "white",
                boxSizing: "border-box",
                boxShadow: "0 1px 3px rgba(0,0,0,.04)",
              }}
              onFocus={(e) => (e.target.style.borderColor = BLUE)}
              onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
            />
            <button
              type="submit"
              style={{
                position: "absolute", right: "6px", top: "50%",
                transform: "translateY(-50%)",
                background: PRIMARY, color: "white",
                border: "none", borderRadius: "8px",
                padding: "7px 16px", fontSize: "13px", fontWeight: 700,
                cursor: "pointer", fontFamily: FONT,
              }}
            >
              Search
            </button>
          </div>
        </form>

        {/* ── Result count ── */}
        {searchQuery && !isLoading && mentorsList.length > 0 && (
          <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px", fontWeight: 500 }}>
            {mentorsList.length} mentor{mentorsList.length !== 1 ? "s" : ""} found for{" "}
            <span style={{ color: BLUE, fontWeight: 700 }}>"{searchQuery}"</span>
          </p>
        )}

        {/* ── Loading ── */}
        {isLoading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
            <Loader />
          </div>
        )}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div
            style={{
              textAlign: "center", padding: "60px 0",
              background: "white", borderRadius: "14px",
              border: "1px solid #e5e7eb",
            }}
          >
            <p style={{ fontWeight: 700, color: "#0f172a" }}>Failed to load mentors</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>
              {error?.data?.message || "Please try again later"}
            </p>
            <button
              onClick={() => triggerSearch(searchQuery)}
              style={{
                marginTop: "16px", padding: "10px 24px",
                background: PRIMARY, color: "white",
                border: "none", borderRadius: "10px",
                fontWeight: 700, fontSize: "13px",
                cursor: "pointer", fontFamily: FONT,
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── No Results ── */}
        {!isLoading && !isError && mentorsList.length === 0 && (
          <div
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              minHeight: "300px", width: "100%", textAlign: "center",
            }}
          >
            <Search size={42} strokeWidth={2.2} style={{ color: "#94a3b8", marginBottom: "12px" }} />
            <p style={{ fontWeight: 700, fontSize: "16px", color: "#0f172a", marginBottom: "6px" }}>
              {searchQuery ? `No mentors found for "${searchQuery}"` : "No mentors available"}
            </p>
          </div>
        )}

        {/* ── Cards Grid ── */}
        {!isLoading && !isError && mentorsList.length > 0 && (
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: twoCol ? "repeat(2, 1fr)" : "1fr",
              gap: "16px",
              alignItems: "stretch",
            }}
          >
            {mentorsList.map((mentor, index) => (
              <MentorCard
                key={mentor._id || index}
                mentor={mentor}
                index={index}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;