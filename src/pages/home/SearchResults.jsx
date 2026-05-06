

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Loader2, Search, Briefcase, MapPin, X,
  ChevronDown, ChevronUp, CheckCircle, Pencil,
  Building2, SlidersHorizontal, Trophy, Users, Calendar, Target
} from "lucide-react";
import { FaClock } from "react-icons/fa";
import { useLazySearchMentorsQuery } from "./MentorsecApiSlice";

// ── Google Font ─────────────────────────────────────────────────────────────
const _link = document.createElement("link");
_link.href =
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
_link.rel = "stylesheet";
document.head.appendChild(_link);

// ── Design Tokens (same as ExploreMentors) ──────────────────────────────────
const BLUE = "#0098cc";
const BLUE_LIGHT = "#f0faff";
const BLUE_BORDER = "#cce9f5";
const PRIMARY = "#1a1a2e";
const FONT = "'DM Sans', sans-serif";

const CARD_H_DESKTOP = "280px";
const PHOTO_W = "40%";
const PHOTO_H_MOBILE = "200px";

// ── Static Data ─────────────────────────────────────────────────────────────
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

// ── MentorCard (identical to ExploreMentors) ─────────────────────────────────
function MentorCard({ mentor, index, onSubscribe, onViewProfile }) {
  const width = useWindowWidth();
  const isMobile = width < 768;

  const [bioExpanded, setBioExpanded] = useState(false);

  const areas = (mentor.areasOfInterest || mentor.currentSkills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const bio =
    mentor.motivationStatement ||
    mentor.bio ||
    mentor.about ||
    "";

  const fullName = toTitleCase(mentor.fullName || "Mentor");

  const currentRole = toTitleCase(mentor.currentRole || "");
  const companyName = toTitleCase(mentor.companyName || "");
  const locationText = toTitleCase(mentor.location || "");

  const languages = Array.isArray(mentor.languages)
    ? mentor.languages.join(", ")
    : mentor.languages || "";

  const hourlyRate =
    mentor.pricing?.hourlyRate ??
    mentor.hourlyRate ??
    0;

  const planData = getPlanData(mentor, "1Month");

  const monthlyPrice =
    planData?.totalPrice ?? hourlyRate;

  const yearsExp = mentor.yearsOfExperience
    ? `${mentor.yearsOfExperience}+ Years`
    : "";

  const placements = mentor.placements ?? 0;
  const menteeCount = mentor.menteeCount ?? 0;

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
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          width: isMobile ? "100%" : "240px",
          minWidth: isMobile ? "100%" : "240px",
          height: isMobile ? "260px" : "100%",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <img
          src={mentor.profilePhoto}
          alt={fullName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",   // 🔥 CHANGE THIS
            borderRadius: "0px",  // ❌ remove rounding from image
          }}
        />
      </div>

      {/* CENTER CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderRight: isMobile ? "none" : "1px solid #e5e7eb",
        }}
      >
        {/* NAME */}
        <h2
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: 500,
            color: "#111827",
            lineHeight: 1.1,
          }}
        >
          {fullName}
        </h2>

        {/* LOCATION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            fontSize: "13px",
            color: "#4b5563",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={13} />
            {locationText}
          </span>
          <span>{languages}</span>
        </div>

        {/* BIO */}
        {/* BIO */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            padding: "14px 16px",
            borderRadius: "12px",
            fontSize: "14px",
            color: "#4b5563",
            lineHeight: "1.7",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "8px",
              letterSpacing: "0.3px",
            }}
          >
            About Mentor
          </div>

          {bioExpanded ? bio : `${bio.slice(0, 160)}...`}

          {bio.length > 160 && (
            <span
              onClick={() => setBioExpanded(!bioExpanded)}
              style={{
                color: "#2563eb",
                marginLeft: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {bioExpanded ? "Show Less" : "Read More"}
            </span>
          )}
        </div>

        {/* SKILLS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {areas.slice(0, 6).map((skill, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #d1d5db",
                padding: "6px 12px",
                fontSize: "12px",
                color: "#111827",
                background: "#fff",
              }}
            >
              {toTitleCase(skill)}
            </div>
          ))}

          {areas.length > 6 && (
            <div
              style={{
                border: "1px solid #d1d5db",
                padding: "6px 12px",
                fontSize: "12px",
                color: "#2563eb",
                background: "#fff",
              }}
            >
              +{areas.length - 6} More
            </div>
          )}
        </div>

        {/* EXPERIENCE */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {/* ROLE */}
          <div
            style={{
              minWidth: "240px",
              border: "1px solid #e5e7eb",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#1d4ed8",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              B.
            </div>

            <div>
              <div style={{ fontSize: "14px", fontWeight: 700 }}>
                {currentRole}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                {companyName}
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* LOGO / LETTER */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#10b981",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
                overflow: "hidden",
              }}
            >
              {mentor.companyLogo ? (
                <img
                  src={mentor.companyLogo}
                  alt={companyName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span>
                  {companyName ? companyName.charAt(0).toUpperCase() : "E"}
                </span>
              )}
            </div>

            {/* TEXT */}
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700 }}>
                {yearsExp || "0+ Years"}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                {companyName || "Experience"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ width: isMobile ? "100%" : "320px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px", background: "#ffffff", borderRadius: "18px", }}>  <div style={{ fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px", color: "#111827", }}  >    <Star size={18} color="#f59e0b" fill="#f59e0b" />    Star Mentor  </div>  <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "10px", color: "#374151", }}  >    <Trophy size={17} color="#d97706" />    <span>{placements} Placements</span>  </div>  <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "10px", color: "#374151", }}  >    <Users size={17} color="#0ea5e9" />    <span>5.0 ({menteeCount}+ mentees)</span>  </div>  <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "10px", color: "#374151", }}  >    <Calendar size={17} color="#10b981" />    <span>4x Sessions Per Month</span>  </div>  <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "10px", color: "#374151", }}  >    <Target size={17} color="#8b5cf6" />    <span>Referrals in Top Companies</span>  </div>  <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px", marginTop: "4px", }}  >    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px", }}    >      Starting from    </div>    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", }}    >      <span style={{ fontSize: "36px", fontWeight: 800, color: "#111827", }}      >        {fmtINR(monthlyPrice)}      </span>      <span style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px", }}      >        /Month      </span>    </div>  </div>

        <button
          onClick={() => onViewProfile(mentor)}
          style={{
            width: "100%",
            height: "50px",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            background: "#ffffff",
            color: "#111827",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "0.3s ease",
          }}
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
}

// ── SearchResults ─────────────────────────────────────────────────────────────
const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const width = useWindowWidth();
  const isMobile = width < 640;

  const [searchQuery, setSearchQuery] = useState("");

  const [triggerSearch, { data: response, isLoading, isError, error }] =
    useLazySearchMentorsQuery();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
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

  const gridCols = isMobile ? "1fr" : "repeat(2, 1fr)";

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", paddingTop: isMobile ? "64px" : "80px", fontFamily: FONT }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "12px" : "20px 24px", boxSizing: "border-box" }}>

        {/* ── Search Bar ── */}
        <form onSubmit={handleSearch} style={{ marginBottom: "14px" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <Search size={14} color={BLUE} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMobile ? "Search skills, domain…" : "Search for any skill, domain or name…"}
              style={{ width: "100%", padding: "11px 120px 11px 40px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#374151", fontFamily: FONT, outline: "none", background: "white", boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
              onFocus={(e) => (e.target.style.borderColor = BLUE)}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
            <button
              type="submit"
              style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", background: PRIMARY, color: "white", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: FONT }}
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
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `3px solid ${BLUE_LIGHT}`, borderTopColor: BLUE, animation: "spin .8s linear infinite" }} />
            <p style={{ marginTop: "12px", fontSize: "13px", color: "#9ca3af" }}>Searching for mentors…</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
            <p style={{ fontWeight: 700, color: "#0f172a" }}>Failed to load mentors</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>{error?.data?.message || "Please try again later"}</p>
            <button
              onClick={() => triggerSearch(searchQuery)}
              style={{ marginTop: "16px", padding: "10px 24px", background: PRIMARY, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: FONT }}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── No Results ── */}
        {!isLoading && !isError && mentorsList.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Search
              size={42}
              strokeWidth={2.2}
              style={{
                color: "#94a3b8",
                marginBottom: "12px",
              }}
            />

            <p
              style={{
                fontWeight: 700,
                fontSize: "16px",
                color: "#0f172a",
                marginBottom: "6px",
              }}
            >
              {searchQuery
                ? `No mentors found for "${searchQuery}"`
                : "No mentors available"}
            </p>


          </div>
        )}

        {/* ── Card Grid (same as ExploreMentors) ── */}
        {/* ── Card Section ── */}
        {!isLoading && !isError && mentorsList.length > 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              // justifyContent: "center",
            }}
          >
            <div
              style={{
                width: width >= 1024 ? "70%" : "100%", // laptop = 70%, tablet/mobile = 100%
                display: "flex",
                flexDirection: "column",
                gap: "16px",
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
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchResults;








