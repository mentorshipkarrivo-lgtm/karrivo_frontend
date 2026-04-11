import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock, Calendar, Loader2, MapPin, Zap, Star, Mail, Phone,
  Linkedin, BookOpen, Award, Briefcase, GraduationCap, Globe,
  MessageCircle, CheckCircle, Users, TrendingUp, ExternalLink,
  Shield, Heart, CalendarDays, ChevronDown, ChevronUp,
} from "lucide-react";
import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";
import BookingModal from "./BookingModal";

/* ─── tiny shared atoms ─────────────────────────────────────── */
const Tag = ({ children, yellow }) => (
  <span style={{
    background: yellow ? "rgba(251,191,36,0.05)" : "rgba(126,224,193,0.05)",
    border: `1px solid ${yellow ? "rgba(251,191,36,0.13)" : "rgba(126,224,193,0.12)"}`,
    color: yellow ? "#c9973a" : "#7ee0c1",
    padding: "4px 11px", borderRadius: 30, fontSize: 11.5, fontWeight: 500,
  }}>{children}</span>
);

const Chip = ({ icon: Icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 11px", background: "rgba(126,224,193,0.05)", border: "1px solid rgba(126,224,193,0.1)", borderRadius: 8 }}>
    <Icon size={12} color="#7ee0c1" />
    <span style={{ fontSize: 11, color: "#5a8a82", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 12, color: "#c4ddd8", fontWeight: 700 }}>{value}</span>
  </div>
);

const Card = ({ icon: Icon, title, children }) => (
  <div style={{ background: "#111f1d", border: "1px solid rgba(126,224,193,0.07)", borderRadius: 12, overflow: "hidden" }}>
    <div style={{ padding: "13px 18px", borderBottom: "1px solid rgba(126,224,193,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
      <Icon size={14} color="#7ee0c1" />
      <span style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 600, color: "#e0f0ec" }}>{title}</span>
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);

const Row = ({ icon: Icon, label, value, link }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
    <Icon size={12} color="#3a6a62" style={{ flexShrink: 0 }} />
    <span style={{ fontSize: 10.5, color: "#3a6a62", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", minWidth: 84 }}>{label}</span>
    {link
      ? <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "#7ee0c1", fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 3, marginLeft: "auto" }}>{value} <ExternalLink size={9} /></a>
      : <span style={{ color: "#b4d0cc", fontSize: 12.5, marginLeft: "auto", textAlign: "right", fontWeight: 500 }}>{value}</span>}
  </div>
);

const Feature = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
    <CheckCircle size={12} color="#2a6a5a" />
    <span style={{ color: "#3a5a52", fontSize: 12.5, lineHeight: 1.5 }}>{text}</span>
  </div>
);

/* ─── Main ──────────────────────────────────────────────────── */
const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // "YYYY-MM-DD"
  const [selectedSlot, setSelectedSlot] = useState(null); // slot object

  const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

  if (isLoading) return (
    <div style={{ background: "#0a211e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={32} color="#7ee0c1" style={{ animation: "spin 1s linear infinite" }} />
    </div>
  );

  if (isError || !mentor) return (
    <div style={{ background: "#0a211e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#e57373", marginBottom: 12, fontSize: 13 }}>Failed to load profile</p>
        <button onClick={() => navigate("/mentors")} style={{ background: "#7ee0c1", color: "#0a211e", padding: "8px 20px", borderRadius: 7, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Back to Mentors</button>
      </div>
    </div>
  );

  /* derived */
  const skills = mentor.currentSkills?.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean) ?? [];
  const areas = mentor.areasOfInterest?.split(/[,;]+/).map(s => s.trim()).filter(Boolean) ?? [];
  const bioText = mentor.motivationStatement || mentor.bio || "";
  const bioLong = bioText.length > 260;
  const bio = showFullBio || !bioLong ? bioText : bioText.slice(0, 260) + "…";
  const initials = mentor.fullName?.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase() ?? "M";
  const joined = mentor.createdAt ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : null;

  const hasSlots =
    Array.isArray(mentor.weeklyAvailability) &&
    mentor.weeklyAvailability.some(d => d.slots?.length > 0);



  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const DAY_MAP = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };


  const grouped = hasSlots
    ? mentor.weeklyAvailability.reduce((acc, { day, slots, _id: dayId }) => {
      // Find the next occurrence of this weekday from today
      const today = new Date();
      const todayDay = today.getDay();
      const targetDay = DAY_MAP[day];
      const diff = (targetDay - todayDay + 7) % 7 || 7; // always future
      const date = new Date(today);
      date.setDate(today.getDate() + diff);
      const dk = date.toISOString().slice(0, 10);

      acc[dk] = (slots || []).map(slot => ({ ...slot, date: dk, day }));
      return acc;
    }, {})
    : {};

  const uniqueDates = Object.keys(grouped).sort();


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:wght@600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .pg{display:grid;grid-template-columns:1fr 330px;gap:20px;align-items:start}
        @media(max-width:860px){.pg{grid-template-columns:1fr!important}.rc{position:static!important}}
        .slot-btn:hover{background:rgba(126,224,193,0.08)!important}
        input[type=time]::-webkit-calendar-picker-indicator{filter:invert(1) opacity(.35);cursor:pointer}
      `}</style>

      <div style={{ background: "#0a211e", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", color: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 20px 60px", animation: "fadeUp .35s ease" }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap" }}>
            {/* avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              {mentor.profileImage
                ? <img src={mentor.profileImage} alt={mentor.fullName} style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover", border: "1px solid rgba(126,224,193,0.18)" }} />
                : <div style={{ width: 80, height: 80, borderRadius: 14, background: "linear-gradient(135deg,#1c4e46,#3a9e84)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "'Fraunces',serif", border: "1px solid rgba(126,224,193,0.18)" }}>{initials}</div>
              }
              {mentor.status === "approved" && (
                <div style={{ position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)", background: "#7ee0c1", color: "#0a211e", fontSize: 8.5, fontWeight: 800, padding: "2px 7px", borderRadius: 20, whiteSpace: "nowrap" }}>✓ VERIFIED</div>
              )}
            </div>

            {/* name */}
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7 }}>
                {mentor.mentorCategory && <Tag>{mentor.mentorCategory}</Tag>}
                <span style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.18)", color: "#d4a847", padding: "2px 9px", borderRadius: 20, fontSize: 9.5, fontWeight: 700 }}>★ 5.0</span>
              </div>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 700, marginBottom: 4, lineHeight: 1.15, color: "#f0f8f6" }}>{mentor.fullName}</h1>
              <p style={{ color: "#7ee0c1", fontSize: 13, marginBottom: 10, fontWeight: 500 }}>
                {mentor.currentRole}{mentor.companyName && <span style={{ color: "#3a6a62" }}> · {mentor.companyName}</span>}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 11, color: "#4a7a72" }}>
                {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} color="#3a6a62" />{mentor.location}</span>}
                {mentor.languages?.length > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Globe size={10} color="#3a6a62" />{mentor.languages.join(", ")}</span>}
                {mentor.mentoringStyle && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={10} color="#3a6a62" />{mentor.mentoringStyle}</span>}
                {joined && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Shield size={10} color="#3a6a62" />Member since {joined}</span>}
              </div>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
            <Chip icon={Award} label="Experience" value={`${mentor.yearsOfExperience}+ yrs`} />
            <Chip icon={Star} label="Rating" value="5.0 / 5" />
            <Chip icon={TrendingUp} label="Rate" value={`₹${mentor.hourlyRate?.toLocaleString()}/mo`} />
            {mentor.highestDegree && <Chip icon={GraduationCap} label="Degree" value={mentor.highestDegree.toUpperCase()} />}
            {mentor.email && <Chip icon={Mail} label="Email" value={mentor.email} />}
          </div>

          {/* ── Two-col grid ── */}
          <div className="pg">

            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {bioText && (
                <Card icon={Heart} title="About">
                  <p style={{ color: "#7a9e98", fontSize: 13, lineHeight: 1.8 }}>{bio}</p>
                  {bioLong && (
                    <button onClick={() => setShowFullBio(p => !p)} style={{ background: "none", border: "none", color: "#7ee0c1", fontSize: 11.5, fontWeight: 600, cursor: "pointer", marginTop: 8, padding: 0 }}>
                      {showFullBio ? "Show less ↑" : "Read more ↓"}
                    </button>
                  )}
                </Card>
              )}

              <Card icon={Briefcase} title="Education & Career">
                <Row icon={Briefcase} label="Role" value={`${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`} />
                {mentor.highestDegree && <Row icon={GraduationCap} label="Degree" value={`${mentor.highestDegree.toUpperCase()} · ${mentor.fieldOfStudy}`} />}
                {mentor.schoolName && <Row icon={BookOpen} label="Institution" value={mentor.schoolName} />}
                <Row icon={Award} label="Experience" value={`${mentor.yearsOfExperience}+ years`} />
                {mentor.linkedinUrl && <Row icon={Linkedin} label="LinkedIn" value="View Profile" link={mentor.linkedinUrl} />}
                {mentor.resumeLink && <Row icon={ExternalLink} label="Portfolio" value="Open Link" link={mentor.resumeLink} />}
              </Card>

              <Card icon={MessageCircle} title="Contact">
                {mentor.email && <Row icon={Mail} label="Email" value={mentor.email} />}
                {mentor.phone && <Row icon={Phone} label="Phone" value={mentor.phone} />}
                {mentor.location && <Row icon={MapPin} label="Location" value={mentor.location} />}
                {mentor.languages?.length > 0 && <Row icon={Globe} label="Languages" value={mentor.languages.join(", ")} />}
              </Card>

              {skills.length > 0 && (
                <Card icon={Zap} title="Skills & Expertise">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <Tag key={i}>{s}</Tag>)}</div>
                </Card>
              )}

              {areas.length > 0 && (
                <Card icon={BookOpen} title="Areas of Interest">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{areas.map((a, i) => <Tag key={i} yellow>{a}</Tag>)}</div>
                </Card>
              )}
            </div>

            {/* RIGHT */}
            <div className="rc" style={{ position: "sticky", top: 68, display: "flex", flexDirection: "column", gap: 16 }}>

              {/* ── Availability card ── */}
              <div style={{ background: "#111f1d", border: "1px solid rgba(126,224,193,0.09)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(126,224,193,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CalendarDays size={14} color="#7ee0c1" />
                    <span style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 600, color: "#e0f0ec" }}>Weekly Availability</span>
                  </div>
                  {hasSlots && (
                    <span style={{ fontSize: 10, color: "#3a6a62", fontWeight: 600, background: "rgba(126,224,193,0.05)", border: "1px solid rgba(126,224,193,0.1)", borderRadius: 20, padding: "2px 9px" }}>
                      {mentor.weeklyAvailability.filter(s => !s.isBooked).length} open
                    </span>
                  )}
                </div>

                <div style={{ padding: "16px 18px" }}>
                  {hasSlots ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                      {/* Date chips */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {uniqueDates.map((dk) => {
                          const slots = grouped[dk];
                          const allBooked = slots.every(s => s.isBooked);
                          const d = new Date(dk);
                          const isSelected = selectedDate === dk;
                          return (
                            <div key={dk}
                              onClick={() => { if (allBooked) return; if (isSelected) { setSelectedDate(null); setSelectedSlot(null); } else { setSelectedDate(dk); setSelectedSlot(null); } }}
                              style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 52, borderRadius: 10, overflow: "hidden", border: `1.5px solid ${allBooked ? "rgba(229,115,115,0.25)" : isSelected ? "#7ee0c1" : "rgba(126,224,193,0.14)"}`, cursor: allBooked ? "not-allowed" : "pointer", opacity: allBooked ? 0.4 : 1, transform: isSelected ? "scale(1.06)" : "scale(1)", boxShadow: isSelected ? "0 0 0 3px rgba(126,224,193,0.15)" : "none", transition: "all .15s", background: isSelected ? "rgba(126,224,193,0.08)" : "rgba(126,224,193,0.02)" }}>
                              <div style={{ width: "100%", textAlign: "center", padding: "4px 0", background: isSelected ? "#7ee0c1" : "rgba(126,224,193,0.07)", fontSize: 8.5, fontWeight: 800, color: isSelected ? "#0a211e" : "#3a6a62", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                {d.toLocaleDateString("en-IN", { month: "short" })}
                              </div>
                              <div style={{ fontSize: 19, fontWeight: 800, color: isSelected ? "#7ee0c1" : "#c4ddd8", lineHeight: 1, padding: "7px 0 2px", fontFamily: "'Fraunces',serif" }}>{d.getDate()}</div>
                              <div style={{ fontSize: 8.5, fontWeight: 700, color: isSelected ? "#7ee0c1" : "#3a6a62", textTransform: "uppercase", letterSpacing: "0.3px", paddingBottom: 5 }}>{DAY_NAMES[d.getDay()]}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Slot picker */}
                      {selectedDate && (() => {
                        const slots = grouped[selectedDate];
                        const d = new Date(selectedDate);
                        const dateLabel = d.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
                        return (
                          <div style={{ border: "1px solid rgba(126,224,193,0.18)", borderRadius: 12, overflow: "hidden", animation: "fadeUp .2s ease" }}>
                            <div style={{ padding: "14px 16px", background: "rgba(126,224,193,0.03)", display: "flex", flexDirection: "column", gap: 12 }}>

                              {/* date */}
                              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(126,224,193,0.08)", border: "1px solid rgba(126,224,193,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <Calendar size={13} color="#7ee0c1" />
                                </div>
                                <div>
                                  <p style={{ fontSize: 9.5, color: "#3a6a62", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>Date</p>
                                  <p style={{ fontSize: 12.5, fontWeight: 700, color: "#e0f0ec", lineHeight: 1.3 }}>{dateLabel}</p>
                                </div>
                              </div>

                              <div style={{ height: 1, background: "rgba(126,224,193,0.06)" }} />

                              {/* time chips */}
                              <div>
                                <p style={{ fontSize: 9.5, color: "#3a6a62", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 8 }}>Choose a Time</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                                  {slots.map((slot) => {
                                    const chosen = selectedSlot?._id === slot._id;
                                    return (
                                      <button key={slot._id} disabled={slot.isBooked} onClick={() => setSelectedSlot(chosen ? null : slot)}
                                        className="slot-btn"
                                        style={{ padding: "6px 13px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: slot.isBooked ? "not-allowed" : "pointer", border: `1.5px solid ${slot.isBooked ? "rgba(229,115,115,0.2)" : chosen ? "#7ee0c1" : "rgba(126,224,193,0.2)"}`, background: chosen ? "rgba(126,224,193,0.12)" : "transparent", color: slot.isBooked ? "#4a3a3a" : chosen ? "#7ee0c1" : "#a4c4be", opacity: slot.isBooked ? 0.4 : 1, transition: "all .15s" }}>
                                        {slot.startTime} – {slot.endTime}
                                        {slot.isBooked && <span style={{ fontSize: 9, marginLeft: 5, color: "#e57373" }}>Booked</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {selectedSlot && (
                                <>
                                  <div style={{ height: 1, background: "rgba(126,224,193,0.06)" }} />
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 10, color: "#3a6a62", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>Session Fee</span>
                                    <span style={{ fontSize: 16, fontWeight: 800, color: "#7ee0c1", fontFamily: "'Fraunces',serif" }}>₹{mentor.hourlyRate?.toLocaleString()}</span>
                                  </div>
                                </>
                              )}
                            </div>

                            <button disabled={!selectedSlot} onClick={() => setBookingOpen(true)}
                              style={{ width: "100%", background: selectedSlot ? "linear-gradient(135deg,#7ee0c1,#3a9e84)" : "#1f4f47", border: "none", color: selectedSlot ? "#0a211e" : "#4a7a72", fontWeight: 700, fontSize: 13.5, padding: "13px", cursor: selectedSlot ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "opacity .15s" }}>
                              <Calendar size={14} />{selectedSlot ? "Book this Session" : "Select a time above"}
                            </button>
                          </div>
                        );
                      })()}

                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(126,224,193,0.05)", border: "1px solid rgba(126,224,193,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                        <Clock size={20} color="#2a4a46" />
                      </div>
                      <p style={{ color: "#3a6a62", fontWeight: 600, fontSize: 12.5, marginBottom: 4 }}>No sessions this week</p>
                      <p style={{ color: "#2a4a46", fontSize: 11, lineHeight: 1.6 }}>Check back soon or contact the mentor directly.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Plan card ── */}
              <div style={{ background: "#f4e8d4", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(180,160,130,0.2)" }}>
                <div style={{ background: "#0e2b27", padding: "20px 20px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 9.5, color: "#7ee0c1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px" }}>Mentorship Plan</span>
                    <span style={{ background: "rgba(126,224,193,0.1)", color: "#7ee0c1", fontSize: 9.5, padding: "2px 9px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(126,224,193,0.18)" }}>Popular</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Fraunces',serif", fontSize: 34, fontWeight: 700, color: "#f0f8f6", letterSpacing: "-1px", lineHeight: 1 }}>₹{mentor.hourlyRate?.toLocaleString()}</span>
                    <span style={{ color: "#7ee0c1", fontSize: 12, fontWeight: 500 }}>/session</span>
                  </div>
                  <p style={{ color: "#4a7a72", fontSize: 11.5, lineHeight: 1.6 }}>Tailored mentorship to accelerate your career</p>
                </div>
                <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <Feature text="Responses within 24 hours" />
                    <Feature text="Hands-on project support" />
                    <Feature text="Career roadmap & goal setting" />
                    <Feature text="Resume & portfolio review" />
                  </div>
                  <div style={{ height: 1, background: "rgba(15,47,42,0.1)" }} />
                  <button onClick={() => navigate(`/mentor/${mentorId}/ltm-plans`)}
                    style={{ width: "100%", background: "transparent", color: "#1a3d38", border: "1.5px solid rgba(15,47,42,0.25)", padding: "11px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Zap size={13} /> View LTM Plans
                  </button>
                  <p style={{ textAlign: "center", fontSize: 10.5, color: "#8aada8" }}>🔒 Secure · Cancel anytime</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {mentor && (
        <BookingModal mentor={mentor} isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedSlot={selectedSlot} />
      )}
    </>
  );
};

export default ProfileModal;



