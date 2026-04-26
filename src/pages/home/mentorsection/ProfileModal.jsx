


import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock, Calendar, Loader2, MapPin, Zap, Star, Mail, Phone,
  Linkedin, BookOpen, Award, Briefcase, GraduationCap, Globe,
  MessageCircle, CheckCircle, Users, TrendingUp, ExternalLink,
  Shield, Heart, CalendarDays, ChevronLeft, ChevronRight,
} from "lucide-react";
import Cookies from "js-cookie";
import {
  useFetchMentorByIdQuery,
  useFetchMentorReviewsQuery,
  useSubmitReviewMutation,
} from "../../topMentors/Mentorsectionapislice";
import BookingModal from "./BookingModal";
import Loader from "../../../global/Loader";

/* ─── palette ───────────────────────────────────────────────── */
const C = {
  brand: "#7fa9a6",
  brandDark: "#6a9894",
  brandLight: "rgba(162,196,193,0.12)",
  brandMid: "rgba(162,196,193,0.2)",
  bg: "#F6F2ED",
  white: "#ffffff",
  border: "#e8e4e0",
  text: "#2d2d2d",
  muted: "#5a7a78",
  faint: "#7a7a7a",
  success: "#16a34a",
  warn: "#f59e0b",
  danger: "#d9534f",
};

/* ─── atoms ─────────────────────────────────────────────────── */
const SkillChip = ({ label }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "5px 13px", borderRadius: 30,
    background: "rgba(162,196,193,0.12)", border: "1px solid rgba(162,196,193,0.25)",
    color: "#5a8b88", fontSize: 12, fontWeight: 500,
    whiteSpace: "nowrap",
  }}>{label}</span>
);

const YellowChip = ({ label }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "5px 13px", borderRadius: 30,
    background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
    color: "#b45309", fontSize: 12, fontWeight: 500,
    whiteSpace: "nowrap",
  }}>{label}</span>
);

const StatPill = ({ icon: Icon, label, value }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 7,
    padding: "7px 14px", borderRadius: 9,
    background: C.white, border: `1px solid ${C.border}`,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(162,196,193,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={13} color={C.brand} />
    </div>
    <div>
      <div style={{ fontSize: 9.5, color: C.faint, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{value}</div>
    </div>
  </div>
);

const SectionCard = ({ title, icon: Icon, children, noPad }) => (
  <div style={{
    background: C.white, border: `1px solid ${C.border}`,
    borderRadius: 14, overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    marginBottom: 16,
  }}>
    <div style={{
      padding: "13px 20px", borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", gap: 9,
      background: "rgba(162,196,193,0.06)",
    }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(162,196,193,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={14} color={C.brand} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: "'Fraunces',serif" }}>{title}</span>
    </div>
    <div style={{ padding: noPad ? 0 : "16px 20px" }}>{children}</div>
  </div>
);

/* info table row */
const InfoRow = ({ label, value, link, last }) => (
  <tr style={{ borderBottom: last ? "none" : `1px solid ${C.border}` }}>
    <td style={{ padding: "10px 0", width: 130, verticalAlign: "middle" }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase", letterSpacing: "0.45px" }}>{label}</span>
    </td>
    <td style={{ padding: "10px 0", verticalAlign: "middle" }}>
      {link
        ? <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: C.brand, fontSize: 13, fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>{value} <ExternalLink size={10} /></a>
        : <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{value}</span>}
    </td>
  </tr>
);

/* ─── Main ──────────────────────────────────────────────────── */
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

  const { data: reviewsData } = useFetchMentorReviewsQuery({ mentorId, page: 1, limit: 10 });
  const [submitReview, { isLoading: submittingReview }] = useSubmitReviewMutation();
  const reviews = reviewsData?.reviews || [];

  const cookieData = Cookies.get("profileData");
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const currentStatus = userData?.profile?.currentStatus;

  const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery({ mentorId, currentStatus });
  const userData1 = JSON.parse(localStorage.getItem("userData"));
  const userMenteeId = userData1?._id;

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) return;
    try {
      await submitReview({ mentorId, menteeId: userMenteeId, rating: reviewRating, comment: reviewText.trim() }).unwrap();
      setReviewText(""); setReviewRating(5); setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    } catch (err) { console.error(err); }
  };

  if (isLoading) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>

      <Loader />
    </div>
  );

  if (isError || !mentor) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: C.danger, marginBottom: 12, fontSize: 13 }}>Failed to load profile</p>
        <button onClick={() => navigate("/mentors")} style={{ background: C.brand, color: "#fff", padding: "9px 22px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>← Back to Mentors</button>
      </div>
    </div>
  );

  /* derived */
  const skills = mentor.currentSkills?.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean) ?? [];
  const areas = mentor.areasOfInterest?.split(/[,;]+/).map(s => s.trim()).filter(Boolean) ?? [];
  const bioText = mentor.motivationStatement || mentor.bio || "";
  const bioLong = bioText.length > 280;
  const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 280) + "…";
  const initials = mentor.fullName?.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase() ?? "M";
  const joined = mentor.createdAt ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : null;
  const hasSlots = Array.isArray(mentor.weeklyAvailability) && mentor.weeklyAvailability.length > 0;

  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ✅ FIX: Extract date string directly from the ISO string (first 10 chars)
  // e.g. "2026-04-26T18:30:00.000Z" → "2026-04-26"
  // This avoids any timezone conversion that was shifting dates by +1
  const grouped = hasSlots
    ? mentor.weeklyAvailability.reduce((acc, slot) => {
      const dk = slot.date.slice(0, 10); // direct string slice, no Date parsing
      if (!acc[dk]) acc[dk] = [];
      acc[dk].push({ ...slot, date: dk });
      return acc;
    }, {})
    : {};

  const uniqueDates = Object.keys(grouped).sort();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        html{scroll-behavior:smooth}
        .profile-layout{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start;max-width:1200px;margin:0 auto;padding:28px 20px 60px}
        .profile-left{min-width:0;overflow-y:auto}
        .profile-right{position:sticky;top:72px;display:flex;flex-direction:column;gap:16px}
        @media(max-width:900px){.profile-layout{grid-template-columns:1fr!important}.profile-right{position:static!important}}
        .slot-time-btn:hover{background:rgba(162,196,193,0.1)!important;border-color:#7fa9a6!important;color:#5a8b88!important}
        .date-chip:hover{border-color:#7fa9a6!important;background:rgba(162,196,193,0.08)!important}
        .nav-link:hover{background:rgba(162,196,193,0.1)!important}
        .info-table{width:100%;border-collapse:collapse}
        .info-table td{vertical-align:middle}
      `}</style>

      <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans',sans-serif", color: C.text }}>

        {/* ── top nav bar ── */}
        <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 0, height: 56 }}>
            <button onClick={() => navigate("/mentors")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: "none", background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer" }} className="nav-link">
              <ChevronLeft size={16} /> All Mentors
            </button>
            <div style={{ width: 1, height: 20, background: C.border, margin: "0 8px" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{mentor.fullName}</span>
          </div>
        </div>

        <div className="profile-layout">

          {/* ══════════ LEFT SCROLLABLE ══════════ */}
          <div className="profile-left" style={{ animation: "fadeUp .3s ease" }}>

            {/* ── Banner + avatar + name ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>

              {/* banner */}
              <div style={{ height: 160, background: `linear-gradient(135deg, #7fa9a6 0%, #4a7a76 100%)`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "radial-gradient(circle at 20% 50%, #fff 0%, transparent 60%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 16, right: 20, display: "flex", gap: 8 }}>
                </div>
              </div>

              {/* profile strip */}
              <div style={{ padding: "0 24px 20px", position: "relative" }}>
                {/* avatar */}
                <div style={{ position: "absolute", top: -44, left: 24, width: 88, height: 88, borderRadius: 16, border: `3px solid ${C.white}`, boxShadow: "0 4px 16px rgba(0,0,0,0.14)", overflow: "hidden", background: "linear-gradient(135deg,#7fa9a6,#a2c4c1)" }}>
                  {mentor.profilePhoto || mentor.profileImage
                    ? <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} style={{ width: "100%", height: "100%", borderRadius: 16, objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff", fontFamily: "'Fraunces',serif" }}>{initials}</div>}
                </div>

                {/* name block */}
                <div style={{ paddingTop: 52 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: C.text, lineHeight: 1.2, marginBottom: 4 }}>{mentor.fullName}</h1>
                      <p style={{ fontSize: 13.5, color: C.muted, fontWeight: 500, marginBottom: 10 }}>
                        {mentor.currentRole}
                        {mentor.companyName && <span style={{ color: "#7fa9a6", fontWeight: 600 }}> · {mentor.companyName}</span>}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 12, color: C.faint }}>
                        {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={11} color="#b8b8b8" />{mentor.location}</span>}
                        {mentor.languages?.length > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Globe size={11} color="#b8b8b8" />{mentor.languages.join(", ")}</span>}
                        {mentor.mentoringStyle && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={11} color="#b8b8b8" />{mentor.mentoringStyle}</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginLeft: 4 }}>5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* stats row */}
              <div style={{ borderTop: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", flexWrap: "wrap", gap: 10 }}>
                <StatPill icon={Award} label="Experience" value={`${mentor.yearsOfExperience}+ years`} />
                <StatPill icon={TrendingUp} label="Session Rate" value={`₹${mentor.hourlyRate?.toLocaleString()}/month`} />
                {mentor.highestDegree && <StatPill icon={GraduationCap} label="Degree" value={mentor.highestDegree.toUpperCase()} />}
              </div>
            </div>

            {/* ── About ── */}
            {bioText && (
              <SectionCard title="About" icon={Heart}>
                <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.85 }}>{bio}</p>
                {bioLong && (
                  <button onClick={() => setShowFullBio(p => !p)} style={{ background: "none", border: "none", color: C.brand, fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 10, padding: 0 }}>
                    {showFullBio ? "Show less ↑" : "read more ↓"}
                  </button>
                )}
                {/* Find Me Here + Languages */}
                <div style={{ marginTop: 18, borderTop: `1px solid ${C.border}`, paddingTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Find Me Here</p>
                    {mentor.location && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 13px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12.5, color: C.text }}>
                        <MapPin size={12} color={C.brand} />{mentor.location}
                      </span>
                    )}
                    {mentor.linkedinUrl && (
                      <a href={mentor.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 13px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12.5, color: C.text, textDecoration: "none", marginLeft: 6 }}>
                        <Linkedin size={12} color="#0a66c2" /> LinkedIn
                      </a>
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Languages That I Speak</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(mentor.languages || []).map((l, i) => (
                        <span key={i} style={{ padding: "5px 13px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12.5, color: C.text }}>{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* ── Education & Career (table) ── */}
            <SectionCard title="Education & Career" icon={Briefcase}>
              <table className="info-table">
                <tbody>
                  <InfoRow label="Current Role" value={`${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`} />
                  {mentor.highestDegree && <InfoRow label="Degree" value={`${mentor.highestDegree.toUpperCase()} · ${mentor.fieldOfStudy || ""}`} />}
                  {mentor.schoolName && <InfoRow label="Institution" value={mentor.schoolName} />}
                  <InfoRow label="Experience" value={`${mentor.yearsOfExperience}+ years`} />
                  {mentor.linkedinUrl && <InfoRow label="LinkedIn" value="View Profile" link={mentor.linkedinUrl} />}
                  {mentor.resumeLink && <InfoRow label="Portfolio" value="Open Link" link={mentor.resumeLink} last />}
                  {!mentor.resumeLink && <InfoRow label="Member Since" value={joined} last />}
                </tbody>
              </table>
            </SectionCard>

            {/* ── Technical Skills ── */}
            {skills.length > 0 && (
              <SectionCard title="Technical Skills" icon={Zap}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {skills.map((s, i) => <SkillChip key={i} label={s} />)}
                </div>
              </SectionCard>
            )}

            {/* ── Areas of Interest ── */}
            {areas.length > 0 && (
              <SectionCard title="Areas of Interest" icon={BookOpen}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {areas.map((a, i) => <YellowChip key={i} label={a} />)}
                </div>
              </SectionCard>
            )}

            {/* ── Reviews ── */}
            <SectionCard title="Reviews & Comments" icon={Star}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {reviews.length > 0 ? reviews.map((r, i) => (
                  <div key={r._id || i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6a9894,#7fa9a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>
                          {r.menteeName?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.menteeName || "Anonymous"}</p>
                          {r.createdAt && <p style={{ fontSize: 10.5, color: C.faint }}>{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 2 }}>
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} color={s <= r.rating ? "#f59e0b" : "#d1d5db"} fill={s <= r.rating ? "#f59e0b" : "none"} />)}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{r.comment}</p>
                  </div>
                )) : (
                  <p style={{ fontSize: 13, color: C.faint, textAlign: "center", padding: "16px 0" }}>No reviews yet. Be the first!</p>
                )}

                <div style={{ height: 1, background: C.border, margin: "4px 0" }} />

                {userData ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 11.5, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: "0.4px" }}>Leave a Comment</p>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={20} style={{ cursor: "pointer" }}
                          color={s <= reviewRating ? "#f59e0b" : "#d1d5db"}
                          fill={s <= reviewRating ? "#f59e0b" : "none"}
                          onClick={() => setReviewRating(s)} />
                      ))}
                    </div>
                    <textarea rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)}
                      placeholder="Share your experience with this mentor..."
                      style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 13px", color: C.text, fontSize: 13, lineHeight: 1.7, resize: "vertical", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", width: "100%", transition: "border-color .15s" }}
                      onFocus={e => e.target.style.borderColor = C.brand}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                    <button onClick={handleReviewSubmit} disabled={submittingReview || !reviewText.trim()}
                      style={{ background: reviewText.trim() ? C.brand : "#e5e7eb", border: "none", borderRadius: 9, color: reviewText.trim() ? "#fff" : C.faint, fontWeight: 700, fontSize: 13, padding: "11px", cursor: reviewText.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <MessageCircle size={14} />{submittingReview ? "Submitting…" : "Submit Review"}
                    </button>
                    {reviewSubmitted && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.success, fontSize: 12.5, fontWeight: 600 }}>
                        <CheckCircle size={14} /> Review submitted!
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ fontSize: 12.5, color: C.muted, textAlign: "center" }}>Please log in to leave a review.</p>
                )}
              </div>
            </SectionCard>
          </div>

          {/* ══════════ RIGHT STICKY ══════════ */}
          <div className="profile-right">

            {/* ── Book a Free Trial header ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "16px 18px", borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.4 }}>
                  Book a{" "}
                  <span style={{ color: C.brand }}>FREE Trial</span>
                  {": "}To Plan Your Mentorship with {mentor.fullName?.split(" ")[0]}
                </p>
              </div>

              <div style={{ padding: "16px 18px" }}>

                {/* Available Dates */}
                {hasSlots && <p style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Available Dates</p>}
                {hasSlots ? (
                  <>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                      {uniqueDates.map((dk) => {
                        const slots = grouped[dk];
                        const available = slots.filter(s => !s.isBooked).length;
                        const allBooked = available === 0;

                        // ✅ FIX: Append T00:00:00 so JS parses as LOCAL time, not UTC
                        // Without this, "2026-04-26" gets parsed as UTC midnight
                        // which converts to Apr 25 in IST (UTC+5:30) — off by 1 day
                        const d = new Date(dk + "T00:00:00");
                        const isSelected = selectedDate === dk;

                        return (
                          <div key={dk} className="date-chip"
                            onClick={() => {
                              if (allBooked) return;
                              if (isSelected) { setSelectedDate(null); setSelectedSlot(null); }
                              else { setSelectedDate(dk); setSelectedSlot(null); }
                            }}
                            style={{
                              display: "flex", flexDirection: "column", alignItems: "center",
                              width: 60, borderRadius: 10, overflow: "hidden",
                              border: `1.5px solid ${isSelected ? C.brand : C.border}`,
                              cursor: allBooked ? "not-allowed" : "pointer",
                              opacity: allBooked ? 0.45 : 1,
                              background: isSelected ? C.brandLight : C.white,
                              transition: "all .15s",
                              boxShadow: isSelected ? `0 0 0 3px rgba(162,196,193,0.2)` : "none",
                            }}>
                            <div style={{ width: "100%", textAlign: "center", padding: "4px 0", background: isSelected ? C.brand : C.bg, fontSize: 9, fontWeight: 800, color: isSelected ? "#fff" : C.faint, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              {d.toLocaleDateString("en-IN", { month: "short" })}
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: isSelected ? C.brand : C.text, lineHeight: 1, padding: "7px 0 2px", fontFamily: "'Fraunces',serif" }}>{d.getDate()}</div>
                            <div style={{ fontSize: 8.5, fontWeight: 700, color: isSelected ? C.brand : C.faint, textTransform: "uppercase", letterSpacing: "0.3px", paddingBottom: 2 }}>{DAY_NAMES[d.getDay()]}</div>
                            <div style={{ fontSize: 8.5, fontWeight: 600, color: isSelected ? C.brand : C.success, paddingBottom: 5 }}>{allBooked ? "Full" : `${available} Slots`}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Time slots */}
                    {selectedDate && (() => {
                      const slots = grouped[selectedDate];
                      return (
                        <div style={{ animation: "fadeUp .2s ease" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase", letterSpacing: "0.5px" }}>Available Slots</p>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                            {slots.map(slot => {
                              const chosen = selectedSlot?._id === slot._id;
                              return (
                                <button key={slot._id} disabled={slot.isBooked} onClick={() => setSelectedSlot(chosen ? null : slot)}
                                  className="slot-time-btn"
                                  style={{
                                    padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 700,
                                    cursor: slot.isBooked ? "not-allowed" : "pointer",
                                    border: `1.5px solid ${slot.isBooked ? C.border : chosen ? C.brand : C.border}`,
                                    background: chosen ? C.brandLight : C.white,
                                    color: slot.isBooked ? C.faint : chosen ? C.brand : C.text,
                                    opacity: slot.isBooked ? 0.4 : 1,
                                    transition: "all .15s",
                                  }}>
                                  {slot.startTime}
                                </button>
                              );
                            })}
                          </div>

                          {selectedSlot && (
                            <div style={{ background: "rgba(162,196,193,0.1)", border: `1px solid rgba(162,196,193,0.25)`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: 11.5, fontWeight: 600, color: C.muted }}>Session Fee</span>
                              <span style={{ fontSize: 17, fontWeight: 800, color: C.brand, fontFamily: "'Fraunces',serif" }}>₹{mentor.hourlyRate?.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    <button disabled={!selectedSlot} onClick={() => setBookingOpen(true)}
                      style={{
                        width: "100%", background: selectedSlot ? "#0d1f2d" : "#0d1f2d",
                        border: "none", color: selectedSlot ? "#fff" : "#fff",
                        fontWeight: 700, fontSize: 13.5, padding: "13px", borderRadius: 10,
                        cursor: selectedSlot ? "pointer" : "not-allowed",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                        transition: "background .15s",
                      }}
                      onMouseEnter={e => { if (selectedSlot) e.currentTarget.style.background = C.brandDark; }}
                      onMouseLeave={e => { if (selectedSlot) e.currentTarget.style.background = C.brand; }}
                    >
                      <Calendar size={15} />
                      {selectedSlot
                        ? `Book for ${new Date(selectedSlot.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short", day: "numeric" })}, ${selectedSlot.startTime}`
                        : "Select a date & time above"}
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <p style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>No sessions available</p>
                    <p style={{ fontSize: 11.5, color: C.faint, marginTop: 4 }}>Check back soon or contact directly.</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Plan card ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#0d1f2d", padding: "20px 20px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 9.5, color: C.brand, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.7px" }}>Mentorship Plan</span>
                  <span style={{ background: "rgba(162,196,193,0.12)", color: "#7fa9a6", fontSize: 9.5, padding: "2px 10px", borderRadius: 20, fontWeight: 800, border: `1px solid rgba(162,196,193,0.3)` }}>Popular</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Fraunces',serif", fontSize: 34, fontWeight: 700, color: "#f8fafc", letterSpacing: "-1px", lineHeight: 1 }}>₹{mentor.hourlyRate?.toLocaleString()}</span>
                  <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 500 }}>/session</span>
                </div>
                <p style={{ color: "#64748b", fontSize: 11.5, lineHeight: 1.6 }}>Tailored mentorship to accelerate your career</p>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {["Responses within 24 hours", "Hands-on project support", "Career roadmap & goal setting", "Resume & portfolio review"].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle size={13} color={C.brand} />
                      <span style={{ fontSize: 12.5, color: C.muted }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ height: 1, background: C.border }} />
                <button onClick={() => navigate(`/mentor/${mentorId}/ltm-plans`)}
                  style={{ width: "100%", background: "transparent", color: C.text, border: `1.5px solid ${C.border}`, padding: "10px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "border-color .15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.brand}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >
                  <Zap size={13} color={C.brand} /> View LTM Plans
                </button>
                <p style={{ textAlign: "center", fontSize: 10.5, color: C.faint }}> Secure · Cancel anytime</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {mentor && (
        <BookingModal mentor={mentor} isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedSlot={selectedSlot} />
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
};

export default ProfileModal;





