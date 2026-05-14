  




import React, { useState } from "react";
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

/* ─── Plain Section Block (no card) ────────────────────────── */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: 32, borderBottom: `1px solid ${C.border}`, paddingBottom: 28 }}>
    <p style={{
      fontSize: 10.5, fontWeight: 800, color: C.faint,
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12,
    }}>{title}</p>
    {children}
  </div>
);

/* ─── Plain label/value row ─────────────────────────────────── */
const InfoLine = ({ label, value, link }) => (
  <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
    <span style={{ fontSize: 12, fontWeight: 700, color: C.faint, minWidth: 110, textTransform: "uppercase", letterSpacing: "0.4px" }}>{label}</span>
    {link
      ? <a href={link} target="_blank" rel="noopener noreferrer"
        style={{ fontSize: 13.5, color: C.brand, fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3 }}>
        {value} <ExternalLink size={10} />
      </a>
      : <span style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>{value}</span>
    }
  </div>
);

const now = new Date();
const isSlotPast = (dateStr, startTime) => {
  const [h, m] = startTime.split(":").map(Number);
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return d < now;
};

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

  const grouped = hasSlots
    ? mentor.weeklyAvailability.reduce((acc, slot) => {
      const dk = slot.date.slice(0, 10);
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
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        html{scroll-behavior:smooth}
        .profile-layout{display:grid;grid-template-columns:1fr 320px;gap:40px;align-items:start;max-width:1200px;margin:0 auto;padding:36px 24px 80px}
        .profile-left{min-width:0}
        .profile-right{position:sticky;top:72px;display:flex;flex-direction:column;gap:20px}
        @media(max-width:900px){
          .profile-layout{grid-template-columns:1fr!important;gap:0!important;padding:20px 16px 60px!important}
          .profile-right{position:static!important}
        }
        .slot-time-btn:hover{background:rgba(162,196,193,0.1)!important;border-color:#7fa9a6!important;color:#5a8b88!important}
        .date-chip:hover{border-color:#7fa9a6!important;background:rgba(162,196,193,0.08)!important}
        .nav-link:hover{background:rgba(162,196,193,0.08)!important}
      `}</style>

      <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans',sans-serif", color: C.text }}>

        {/* ── top nav bar ── */}
        <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", height: 56 }}>
            {/* <button onClick={() => navigate("/mentors")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: "none", background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer" }} className="nav-link">
              <ChevronLeft size={16} /> All Mentors
            </button> */}
            <div style={{ width: 40, minHeight: 30, flexShrink: 0, borderRadius: 6, overflow: "hidden", background: "linear-gradient(135deg,#7fa9a6,#a2c4c1)" }}>
              {mentor.profilePhoto || mentor.profileImage
                ? <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Fraunces',serif" }}>{initials}</div>}
            </div>
            <div style={{ width: 1, height: 20, background: C.border, margin: "0 8px" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{mentor.fullName}</span>
          </div>
        </div>

        <div className="profile-layout">

          {/* ══════════ LEFT ══════════ */}
          <div className="profile-left" style={{ animation: "fadeUp .3s ease" }}>

            {/* ── Hero: avatar + name ── */}
            <div style={{ display: "flex", alignItems: "stretch", gap: 20, marginBottom: 32, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
              {/* avatar */}
              <div style={{ width: 110, minHeight: 130, flexShrink: 0, borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg,#7fa9a6,#a2c4c1)" }}>
                {mentor.profilePhoto || mentor.profileImage
                  ? <img src={mentor.profilePhoto || mentor.profileImage} alt={mentor.fullName} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Fraunces',serif" }}>{initials}</div>}
              </div>

              {/* name + meta */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: C.text, lineHeight: 1.2, marginBottom: 4 }}>{mentor.fullName}</h1>
                <p style={{ fontSize: 13.5, color: C.muted, fontWeight: 500, marginBottom: 8 }}>
                  {mentor.currentRole}
                  {mentor.companyName && <span style={{ color: C.brand, fontWeight: 600 }}> · {mentor.companyName}</span>}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", fontSize: 12.5, color: C.faint }}>
                  {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={11} color="#b8b8b8" />{mentor.location}</span>}
                  {mentor.yearsOfExperience && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Award size={11} color="#b8b8b8" />{mentor.yearsOfExperience}+ years exp.</span>}
                  {mentor.highestDegree && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><GraduationCap size={11} color="#b8b8b8" />{mentor.highestDegree.toUpperCase()}</span>}
                  {mentor.languages?.length > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Globe size={11} color="#b8b8b8" />{mentor.languages.join(", ")}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 10 }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={13} fill="#f59e0b" color="#f59e0b" />)}
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginLeft: 4 }}>5.0</span>
                  <span style={{ fontSize: 12, color: C.faint, marginLeft: 4 }}>· ₹{mentor.hourlyRate?.toLocaleString()}/session</span>
                </div>
              </div>
            </div>

            {/* ── About ── */}
            {bioText && (
              <Section title="About">
                <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.9 }}>{bio}</p>
                {bioLong && (
                  <button onClick={() => setShowFullBio(p => !p)} style={{ background: "none", border: "none", color: C.brand, fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 8, padding: 0 }}>
                    {showFullBio ? "Show less ↑" : "Read more ↓"}
                  </button>
                )}
              </Section>
            )}

            {/* ── Education & Career ── */}
            <Section title="Education & Career">
              <InfoLine label="Current Role" value={`${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`} />
              {mentor.highestDegree && <InfoLine label="Degree" value={`${mentor.highestDegree.toUpperCase()}${mentor.fieldOfStudy ? ` · ${mentor.fieldOfStudy}` : ""}`} />}
              {mentor.schoolName && <InfoLine label="Institution" value={mentor.schoolName} />}
              <InfoLine label="Experience" value={`${mentor.yearsOfExperience}+ years`} />
              {joined && <InfoLine label="Member Since" value={joined} />}
              {mentor.linkedinUrl && <InfoLine label="LinkedIn" value="View Profile" link={mentor.linkedinUrl} />}
              {mentor.resumeLink && <InfoLine label="Portfolio" value="Open Link" link={mentor.resumeLink} />}
            </Section>

            {/* ── Find Me / Languages ── */}
            <Section title="Contact & Languages">
              {mentor.location && <InfoLine label="Location" value={mentor.location} />}
              {mentor.mentoringStyle && <InfoLine label="Style" value={mentor.mentoringStyle} />}
              {mentor.languages?.length > 0 && <InfoLine label="Languages" value={mentor.languages.join(", ")} />}
              {mentor.linkedinUrl && <InfoLine label="LinkedIn" value="View Profile" link={mentor.linkedinUrl} />}
            </Section>

            {/* ── Technical Skills (plain text) ── */}
            {skills.length > 0 && (
              <Section title="Technical Skills">
                <p style={{ fontSize: 13.5, color: C.text, lineHeight: 2 }}>
                  {skills.join("  ·  ")}
                </p>
              </Section>
            )}

            {/* ── Areas of Interest (plain text) ── */}
            {areas.length > 0 && (
              <Section title="Areas of Interest">
                <p style={{ fontSize: 13.5, color: C.text, lineHeight: 2 }}>
                  {areas.join("  ·  ")}
                </p>
              </Section>
            )}

            {/* ── Reviews ── */}
            <Section title="Reviews & Comments">
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {reviews.length > 0 ? reviews.map((r, i) => (
                  <div key={r._id || i} style={{ paddingBottom: 20, borderBottom: i < reviews.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.menteeName || "Anonymous"}</span>
                        {r.createdAt && <span style={{ fontSize: 11, color: C.faint, marginLeft: 8 }}>{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>}
                      </div>
                      <div style={{ display: "flex", gap: 2 }}>
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} color={s <= r.rating ? "#f59e0b" : "#d1d5db"} fill={s <= r.rating ? "#f59e0b" : "none"} />)}
                      </div>
                    </div>
                    <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.8 }}>{r.comment}</p>
                  </div>
                )) : (
                  <p style={{ fontSize: 13, color: C.faint }}>No reviews yet. Be the first!</p>
                )}

                {/* Leave a review */}
                <div style={{ paddingTop: 8 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 800, color: C.faint, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Leave a Comment</p>
                  {userData ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                        style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 13px", color: C.text, fontSize: 13, lineHeight: 1.7, resize: "vertical", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", width: "100%", transition: "border-color .15s" }}
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
                    <p style={{ fontSize: 12.5, color: C.muted }}>Please log in to leave a review.</p>
                  )}
                </div>
              </div>
            </Section>
          </div>

          {/* ══════════ RIGHT STICKY ══════════ */}
          <div className="profile-right">

            {/* ── Booking card ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "16px 18px", borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.4 }}>
                  Book a <span style={{ color: C.brand }}>FREE Trial</span>{" "}
                  to plan your mentorship with {mentor.fullName?.split(" ")[0]}
                </p>
              </div>

              <div style={{ padding: "16px 18px" }}>
                {hasSlots && (
                  <p style={{ fontSize: 10.5, fontWeight: 800, color: C.faint, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Available Dates</p>
                )}
                {hasSlots ? (
                  <>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                      {uniqueDates.map((dk) => {
                        const slots = grouped[dk];
                        const available = slots.filter(s => !s.isBooked && !isSlotPast(s.date, s.startTime)).length;
                        const allBooked = available === 0;
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

                    {selectedDate && (() => {
                      const slots = grouped[selectedDate];
                      return (
                        <div style={{ animation: "fadeUp .2s ease" }}>
                          <p style={{ fontSize: 10.5, fontWeight: 800, color: C.faint, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Available Slots</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                            {slots.map(slot => {
                              const chosen = selectedSlot?._id === slot._id;
                              const isPast = isSlotPast(slot.date, slot.startTime);
                              const isDisabled = slot.isBooked || isPast;
                              return (
                                <button key={slot._id} disabled={isDisabled} onClick={() => !isDisabled && setSelectedSlot(chosen ? null : slot)}
                                  className="slot-time-btn"
                                  style={{
                                    padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 700,
                                    cursor: isDisabled ? "not-allowed" : "pointer",
                                    border: `1.5px solid ${isDisabled ? C.border : chosen ? C.brand : C.border}`,
                                    background: chosen ? C.brandLight : C.white,
                                    color: isDisabled ? C.faint : chosen ? C.brand : C.text,
                                    opacity: isDisabled ? 0.4 : 1,
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
                        width: "100%", background: "#0d1f2d",
                        border: "none", color: "#fff",
                        fontWeight: 700, fontSize: 13.5, padding: "13px", borderRadius: 10,
                        cursor: selectedSlot ? "pointer" : "not-allowed",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                        transition: "background .15s", opacity: selectedSlot ? 1 : 0.7,
                      }}
                      onMouseEnter={e => { if (selectedSlot) e.currentTarget.style.background = C.brandDark; }}
                      onMouseLeave={e => { if (selectedSlot) e.currentTarget.style.background = "#0d1f2d"; }}
                    >
                      <Calendar size={15} />
                      {selectedSlot
                        ? `Book for ${new Date(selectedSlot.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short", day: "numeric" })}, ${selectedSlot.startTime}`
                        : "Select a date & time above"}
                    </button>
                  </>
                ) : (
                  <div style={{ padding: "16px 0" }}>
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
                <p style={{ textAlign: "center", fontSize: 10.5, color: C.faint }}>Secure · Cancel anytime</p>
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


