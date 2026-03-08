// MentorshipHome.jsx
import { useState, useEffect } from "react";
import { MapPin, Star, Users, Award, TrendingUp, X, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetLtmAllMentorsQuery,
  useSearchMentorMutation,
} from "./Mentorshiphomeapislice";
import Loader from "../../../global/Loader";

// ── Inject Poppins ──────────────────────────────────────────────────────────
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const BLUE = "#3b82f6";
const BLUE_LIGHT = "#eff6ff";
const BLUE_BORDER = "#bfdbfe";
const FONT = "'Poppins', sans-serif";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const parseAreas = (str = "") =>
  str.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);

const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

const MENTOR_CATEGORIES = [
  "All Categories", "Startup Mentors", "Tech Mentors", "Career Mentors",
  "Product Mentors", "Marketing Mentors", "Finance Mentors", "Design Mentors", "Leadership Mentors",
];
const EXPERIENCE_OPTIONS = [
  { label: "Any Experience", value: "" },
  { label: "1+ Years", value: "1" },
  { label: "3+ Years", value: "3" },
  { label: "5+ Years", value: "5" },
  { label: "8+ Years", value: "8" },
  { label: "10+ Years", value: "10" },
];
const PLANS = [
  { key: "1", label: "1 Month LTM", months: "oneMonth" },
  { key: "3", label: "3 Months LTM", months: "threeMonths" },
  { key: "6", label: "6 Months LTM", months: 'sixMonths' },
];


function SubscribePanel({ mentor, onClose }) {
  const availability = mentor.availability ?? [];

  console.log(mentor, "mentor data");

  // Which slots are selected: { dayIndex_slotIndex: true }
  const [selected, setSelected] = useState({});
  const [openDay, setOpenDay] = useState(null);
  const [planKey, setPlanKey] = useState(1);

  const toggleSlot = (di, si) => {
    const k = `${di}_${si}`;
    setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  console.log(planKey, "p.months === planKey")


  const selectedCount = Object.values(selected).filter(Boolean).length;

  // Use backend-provided sessions & price
  const totalSessions = mentor.pricing.plans?.[planKey]?.totalSessions ?? 0;
  const totalPrice = mentor.pricing.plans?.[planKey]?.totalPrice ?? 0;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "420px", maxWidth: "100vw",
        background: "white", zIndex: 300,
        boxShadow: "-8px 0 40px rgba(0,0,0,.15)",
        display: "flex", flexDirection: "column",
        fontFamily: FONT,
      }}
    >
      {/* Header */}
      <div style={{ background: BLUE, padding: "20px 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
          <h2 style={{ color: "white", fontWeight: 700, fontSize: "16px", margin: 0 }}>Subscribe to Mentor</h2>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,.15)", border: "none", color: "white",
            borderRadius: "8px", width: "30px", height: "30px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={16} />
          </button>
        </div>
        <p style={{ color: "rgba(255,255,255,.75)", fontSize: "13px", margin: 0 }}>
          {mentor.fullName} · {fmtINR(mentor.hourlyRate)}/session
        </p>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        {/* Plan selector */}
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>
          Select Plan
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          {PLANS.map((p) => {
            const sel = planKey === p.months;
            const planSessions = mentor.pricing.weeklySessions ?? 0;
            const planPrice = mentor.pricing.plans?.[p.months]?.totalPrice ?? 0;

            console.log(p.key, 'planPrice')
            return (
              <div
                key={p.months}
                onClick={() => setPlanKey(p.months)}
                style={{
                  border: `2px solid ${sel ? BLUE : "#e5e7eb"}`,
                  borderRadius: "12px",
                  padding: "14px 16px",
                  background: sel ? BLUE_LIGHT : "white",
                  cursor: "pointer",
                  transition: "all .15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* Radio */}
                <div style={{
                  width: "18px", height: "18px", borderRadius: "50%",
                  border: `2px solid ${sel ? BLUE : "#d1d5db"}`,
                  background: sel ? BLUE : "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {sel && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "white" }} />}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "13px", color: sel ? "#1d4ed8" : "#111827", margin: "0 0 2px" }}>
                    {p.label}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                    {planSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: 700, fontSize: "15px", color: sel ? BLUE : "#111827", margin: 0 }}>
                    {fmtINR(planPrice)}
                  </p>
                  {/* {planSessions > 0 && (
                    <p style={{ fontSize: "10px", color: "#9ca3af", margin: "1px 0 0" }}>
                      {fmtINR(planPrice / planSessions)}/session
                    </p>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Availability slot selector */}
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "10px" }}>
          Select Availability Slots
        </p>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px" }}>
          Choose the weekly slots you want sessions on. Price updates automatically.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {DAY_ORDER.map((day, di) => {
            const dayData = availability.find((d) => d.day === day);
            if (!dayData) return null;

            const openSlots = [{ startTime: dayData.from, endTime: dayData.to, _id: `${day}_0` }]; // backend has simple slots
            const isOpen = openDay === day;
            const selectedInDay = openSlots.filter((_, si) => selected[`${di}_${si}`]).length;

            return (
              <div key={day} style={{
                border: `1.5px solid ${selectedInDay ? BLUE : "#e5e7eb"}`,
                borderRadius: "12px", overflow: "hidden",
                background: selectedInDay ? BLUE_LIGHT : "white",
                transition: "all .15s",
              }}>
                {/* Day row */}
                <button
                  onClick={() => setOpenDay(isOpen ? null : day)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 14px", background: "transparent", border: "none",
                    cursor: "pointer", fontFamily: FONT,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600, fontSize: "13px", color: selectedInDay ? BLUE : "#374151" }}>
                      {day}
                    </span>
                    {selectedInDay > 0 && (
                      <span style={{
                        background: BLUE, color: "white",
                        borderRadius: "20px", padding: "1px 8px",
                        fontSize: "10px", fontWeight: 700,
                      }}>
                        {selectedInDay} selected
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#9ca3af" }}>{openSlots.length} slots</span>
                    {isOpen ? <ChevronUp size={14} color="#9ca3af" /> : <ChevronDown size={14} color="#9ca3af" />}
                  </div>
                </button>

                {/* Slot list */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .18 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {openSlots.map((slot, si) => {
                          const k = `${di}_${si}`;
                          const isSel = !!selected[k];
                          return (
                            <button
                              key={slot._id}
                              onClick={() => toggleSlot(di, si)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                border: `1.5px solid ${isSel ? BLUE : "#e5e7eb"}`,
                                background: isSel ? "white" : "#fafafa",
                                cursor: "pointer",
                                fontFamily: FONT,
                                transition: "all .12s",
                              }}
                            >
                              <span style={{ fontSize: "12px", fontWeight: 600, color: isSel ? BLUE : "#374151" }}>
                                {slot.startTime} – {slot.endTime}
                              </span>
                              {isSel
                                ? <CheckCircle size={15} color={BLUE} />
                                : <div style={{ width: "15px", height: "15px", borderRadius: "50%", border: "1.5px solid #d1d5db" }} />
                              }
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
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #e5e7eb", padding: "16px 24px",
        background: "#fafafa", flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em" }}>
              Total for {PLANS.find((p) => p.months === planKey)?.label}
            </p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>
              {fmtINR(totalPrice)}
            </p>
            {totalSessions > 0 && (
              <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
                {totalSessions} sessions · {selectedCount} slot{selectedCount !== 1 ? "s" : ""}/week
              </p>
            )}
          </div>
          {/* {selectedCount === 0 && (
            <p style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 600, maxWidth: "120px", textAlign: "right" }}>
              Select at least 1 slot to continue
            </p>
          )} */}
        </div>

        <button
          disabled={false}
          style={{
            width: "100%", padding: "12px",
            background: BLUE,
            cursor: "pointer",
            boxShadow: `0 4px 16px ${BLUE}44`,
            color: "white", border: "none", borderRadius: "10px",
            fontWeight: 700, fontSize: "14px", fontFamily: FONT,

            transition: "background .15s",
          }}
          onMouseEnter={(e) => { if (selectedCount > 0) e.currentTarget.style.background = "#2563eb"; }}
          onMouseLeave={(e) => { if (selectedCount > 0) e.currentTarget.style.background = BLUE; }}
        >
          {`Subscribe — ${fmtINR(totalPrice)}`}
        </button>

        <p style={{ textAlign: "center", color: "#d1d5db", fontSize: "11px", marginTop: "8px" }}>
          Secure checkout · Cancel anytime · 7-day refund policy
        </p>
      </div>
    </motion.div>
  );
}

// ── Mentor Card ──────────────────────────────────────────────────────────────
// function MentorCard({ mentor, index, onSubscribe }) {
//   const rawAreas = mentor.areasOfInterest || mentor.currentSkills || "";
//   const areas = rawAreas.split(",").map((s) => s.trim()).filter(Boolean);
//   const inits = (mentor.fullName || "")
//     .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
//   const openSlots = (mentor.availability || []).reduce(
//     (sum, d) => sum + (d.slots || []).filter((s) => !s.isBooked).length, 0
//   );
//   const daysPerWeek = (mentor.availability || []).length;
//   console.log(mentor, "mentor.availability ")
//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35, delay: index * 0.05 }}
//       style={{
//         width: "380px", maxWidth: "100%",
//         border: "1px solid #e5e7eb", borderRadius: "16px",
//         background: "white", display: "flex", overflow: "hidden",
//         fontFamily: FONT,
//         boxShadow: "0 1px 4px rgba(59,130,246,.06)",
//         transition: "box-shadow .2s, border-color .2s",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.borderColor = BLUE;
//         e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,.15)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.borderColor = "#e5e7eb";
//         e.currentTarget.style.boxShadow = "0 1px 4px rgba(59,130,246,.06)";
//       }}
//     >
//       {/* Left info */}
//       <div style={{ flex: 1, padding: "16px", minWidth: 0 }}>

//         {/* ⭐ Rating */}
//         <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
//           <Star size={13} fill="#f59e0b" color="#f59e0b" />
//           <span style={{ fontSize: "12px", fontWeight: 600, color: "#1f2937" }}>5.00</span>
//         </div>

//         {/* Name */}
//         <p style={{
//           fontWeight: 700, fontSize: "16px", color: "#111827",
//           margin: "0 0 3px", whiteSpace: "nowrap",
//           overflow: "hidden", textOverflow: "ellipsis",
//         }}>
//           {mentor.fullName}
//         </p>

//         {/* Role · exp */}
//         <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 10px" }}>
//           {mentor.currentRole || "Mentor"}
//           {mentor.yearsOfExperience ? ` · ${mentor.yearsOfExperience} yrs` : ""}
//         </p>

//         {/* Skill pills */}
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
//           {areas.slice(0, 3).map((a, i) => (
//             <span key={i} style={{
//               fontSize: "11px", fontWeight: 500,
//               padding: "3px 10px", borderRadius: "20px",
//               background: BLUE_LIGHT, color: BLUE,
//               border: `1px solid ${BLUE_BORDER}`,
//             }}>
//               {a}
//             </span>
//           ))}
//           {areas.length > 3 && (
//             <span style={{
//               fontSize: "11px", fontWeight: 500,
//               padding: "3px 8px", borderRadius: "20px",
//               background: "#f3f4f6", color: "#6b7280",
//               border: "1px solid #e5e7eb",
//             }}>
//               +{areas.length - 3}
//             </span>
//           )}
//         </div>

//         {/* Location */}
//         <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
//           <MapPin size={12} color="#9ca3af" strokeWidth={1.8} />
//           <span style={{ fontSize: "12px", color: "#9ca3af" }}>
//             {mentor.location || "—"}
//           </span>
//         </div>

//         {/* Slots */}
//         <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 14px" }}>
//           🕐 {openSlots} open slot{openSlots !== 1 ? "s" : ""} · {daysPerWeek} days/week
//         </p>

//         {/* Price + buttons */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
//           <div>
//             <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>
//               ₹{(mentor.hourlyRate || 0).toLocaleString("en-IN")}
//             </span>
//             <span style={{ fontSize: "11px", color: "#9ca3af" }}> / session</span>
//           </div>

//           <div style={{ display: "flex", gap: "6px" }}>
//             <button style={{
//               padding: "7px 14px", borderRadius: "8px",
//               background: BLUE, color: "white", border: "none",
//               fontSize: "12px", fontWeight: 600, cursor: "pointer",
//               fontFamily: FONT, whiteSpace: "nowrap",
//             }}
//               onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
//               onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
//             >
//               View Profile
//             </button>
//             <button
//               onClick={() => onSubscribe(mentor)}
//               style={{
//                 padding: "7px 14px", borderRadius: "8px",
//                 background: "white", color: BLUE,
//                 border: `1.5px solid ${BLUE_BORDER}`,
//                 fontSize: "12px", fontWeight: 600, cursor: "pointer",
//                 fontFamily: FONT, whiteSpace: "nowrap",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.background = BLUE_LIGHT)}
//               onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//             >
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right — avatar panel */}
//       <div style={{
//         width: "130px", flexShrink: 0,
//         background: BLUE_LIGHT,
//         display: "flex", flexDirection: "column",
//         alignItems: "center", justifyContent: "center",
//         gap: "8px", padding: "16px 8px",
//         position: "relative",
//       }}>
//         <span style={{ fontSize: "36px", fontWeight: 700, color: BLUE, fontFamily: FONT }}>
//           {inits}
//         </span>
//         {mentor.mentorCategory && (
//           <span style={{
//             fontSize: "9px", fontWeight: 700, color: BLUE,
//             background: "white", border: `1px solid ${BLUE_BORDER}`,
//             borderRadius: "20px", padding: "2px 8px",
//             maxWidth: "110px", overflow: "hidden",
//             textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center",
//           }}>
//             {mentor.mentorCategory}
//           </span>
//         )}
//         {mentor.mentoringStyle && (
//           <span style={{
//             position: "absolute", bottom: "12px",
//             fontSize: "10px", fontWeight: 600, color: BLUE,
//             background: "white", border: `1px solid ${BLUE_BORDER}`,
//             borderRadius: "20px", padding: "3px 10px", whiteSpace: "nowrap",
//           }}>
//             {mentor.mentoringStyle}
//           </span>
//         )}
//       </div>
//     </motion.article>
//   );
// }



function MentorCard({ mentor, index, onSubscribe }) {
  const rawAreas = mentor.areasOfInterest || mentor.currentSkills || "";
  const areas = rawAreas.split(",").map((s) => s.trim()).filter(Boolean);
  const inits = (mentor.fullName || "")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const openSlots = (mentor.availability || []).reduce(
    (sum, d) => sum + (d.slots || []).filter((s) => !s.isBooked).length, 0
  );
  const daysPerWeek = (mentor.availability || []).length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      style={{
        width: "460px", maxWidth: "100%",
        border: "1px solid #e5e7eb", borderRadius: "16px",
        background: "white", display: "flex", overflow: "hidden",
        fontFamily: FONT,
        boxShadow: "0 1px 4px rgba(59,130,246,.06)",
        transition: "box-shadow .2s, border-color .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = BLUE;
        // e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(59,130,246,.06)";
      }}
    >
      <div style={{ flex: 1, padding: "16px", minWidth: 0, display: "flex", flexDirection: "column", gap: "8px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Star size={13} fill="#f59e0b" color="#f59e0b" />
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#1f2937" }}>5.00</span>
        </div>

        <p style={{
          fontWeight: 700, fontSize: "16px", color: "#111827",
          margin: 0, whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {mentor.fullName}
        </p>

        <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
          {mentor.currentRole || "Mentor"}
          {mentor.yearsOfExperience ? ` · ${mentor.yearsOfExperience} yrs` : ""}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {areas.slice(0, 3).map((a, i) => (
            <span key={i} style={{
              fontSize: "11px", fontWeight: 500,
              padding: "3px 10px", borderRadius: "20px",
              background: BLUE_LIGHT, color: BLUE,
              border: `1px solid ${BLUE_BORDER}`,
            }}>
              {a}
            </span>
          ))}
          {areas.length > 3 && (
            <span style={{
              fontSize: "11px", fontWeight: 500,
              padding: "3px 8px", borderRadius: "20px",
              background: "#f3f4f6", color: "#6b7280",
              border: "1px solid #e5e7eb",
            }}>
              +{areas.length - 3}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <MapPin size={12} color="#9ca3af" strokeWidth={1.8} />
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>
            {mentor.location || "—"}
          </span>
        </div>

        <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
          🕐 {openSlots} open slot{openSlots !== 1 ? "s" : ""} · {daysPerWeek} days/week
        </p>

        <div>
          <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>
            ₹{(mentor.hourlyRate || 0).toLocaleString("en-IN")}
          </span>
          <span style={{ fontSize: "11px", color: "#9ca3af" }}> / session</span>
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          <button
            style={{
              padding: "7px 14px", borderRadius: "8px",
              background: BLUE, color: "white", border: "none",
              fontSize: "12px", fontWeight: 600, cursor: "pointer",
              fontFamily: FONT, whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
          >
            View Profile
          </button>
          <button
            onClick={() => onSubscribe(mentor)}
            style={{
              padding: "7px 14px", borderRadius: "8px",
              background: "white", color: BLUE,
              border: `1.5px solid ${BLUE_BORDER}`,
              fontSize: "12px", fontWeight: 600, cursor: "pointer",
              fontFamily: FONT, whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = BLUE_LIGHT)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            Subscribe
          </button>
        </div>

      </div>

      <div style={{
        width: "155px", flexShrink: 0,
        background: BLUE_LIGHT,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "8px", padding: "16px 8px",
        position: "relative",
      }}>
        <span style={{ fontSize: "36px", fontWeight: 700, color: BLUE, fontFamily: FONT }}>
          {inits}
        </span>
        {mentor.mentorCategory && (
          <span style={{
            fontSize: "9px", fontWeight: 700, color: BLUE,
            background: "white", border: `1px solid ${BLUE_BORDER}`,
            borderRadius: "20px", padding: "2px 8px",
            maxWidth: "130px", overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center",
          }}>
            {mentor.mentorCategory}
          </span>
        )}
        {mentor.mentoringStyle && (
          <span style={{
            position: "absolute", bottom: "12px",
            fontSize: "10px", fontWeight: 600, color: BLUE,
            background: "white", border: `1px solid ${BLUE_BORDER}`,
            borderRadius: "20px", padding: "3px 10px", whiteSpace: "nowrap",
          }}>
            {mentor.mentoringStyle}
          </span>
        )}
      </div>
    </motion.article>
  );
}

// ── Filter Bar ───────────────────────────────────────────────────────────────
function FilterBar({ onSearch, isSearching, onClear, isFiltered }) {
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");

  const handleSearch = () => {
    const hasCategory = category && category !== "All Categories";
    const hasExperience = experience !== "";
    if (!hasCategory && !hasExperience) return;
    const body = {};
    if (hasCategory) body.mentorCategory = category;
    if (hasExperience) body.yearsOfExperience = Number(experience);
    onSearch(body);
  };

  const handleClear = () => { setCategory(""); setExperience(""); onClear(); };

  const sel = {
    width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px",
    padding: "9px 32px 9px 12px", fontSize: "13px", fontWeight: 500,
    color: "#374151", background: "white", cursor: "pointer",
    outline: "none", appearance: "none", WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%239ca3af' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
    transition: "border-color .15s", fontFamily: FONT,
  };

  return (
    <div style={{
      background: "white", border: "1px solid #e5e7eb", borderRadius: "12px",
      padding: "14px 18px", display: "flex", flexWrap: "wrap", gap: "10px",
      alignItems: "flex-end", boxShadow: "0 1px 6px rgba(0,0,0,.04)",
      marginBottom: "20px", fontFamily: FONT,
    }}>
      <div style={{ flex: "1 1 170px" }}>
        <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "5px" }}>
          Category
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={sel}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}>
          {MENTOR_CATEGORIES.map((c) => (
            <option key={c} value={c === "All Categories" ? "" : c}>{c}</option>
          ))}
        </select>
      </div>
      <div style={{ flex: "1 1 150px" }}>
        <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "5px" }}>
          Experience
        </label>
        <select value={experience} onChange={(e) => setExperience(e.target.value)} style={sel}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}>
          {EXPERIENCE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleSearch} disabled={isSearching}
          style={{
            background: isSearching ? "#93c5fd" : BLUE, color: "white", border: "none",
            borderRadius: "8px", padding: "10px 22px", fontWeight: 600, fontSize: "13px",
            cursor: isSearching ? "not-allowed" : "pointer", fontFamily: FONT,
            boxShadow: `0 4px 12px ${BLUE}33`, transition: "background .15s",
          }}
          onMouseEnter={(e) => { if (!isSearching) e.currentTarget.style.background = "#2563eb"; }}
          onMouseLeave={(e) => { if (!isSearching) e.currentTarget.style.background = BLUE; }}
        >
          {isSearching ? "Searching…" : "Search"}
        </button>
        {isFiltered && (
          <button onClick={handleClear} style={{
            background: "white", color: "#6b7280", border: "1px solid #e5e7eb",
            borderRadius: "8px", padding: "10px 16px", fontWeight: 600,
            fontSize: "13px", cursor: "pointer", fontFamily: FONT,
          }}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function MentorshipHome() {
  const { data, isLoading, isError, refetch } = useGetLtmAllMentorsQuery();
  const [searchMentors, { isLoading: isSearching }] = useSearchMentorMutation();

  const allMentors = data?.data ?? [];
  console.log(allMentors, "allMentors")
  const [displayMentors, setDisplayMentors] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [activeMentor, setActiveMentor] = useState(null); // panel open for this mentor


  const mentors = isFiltered
    ? (displayMentors || [])
    : allMentors;

  console.log(mentors, "mentors");
  const handleSearch = async (body) => {
    try {
      const response = await searchMentors(body).unwrap();
      const result = response?.data || [];
      console.log(result, "result")
      setDisplayMentors(result);
      setIsFiltered(true);
      setSearchEmpty(result.length === 0);
    } catch {
      setDisplayMentors([]);
      setIsFiltered(true);
      setSearchEmpty(true);
    }
  };

  const handleClear = () => { setIsFiltered(false); setDisplayMentors(null); setSearchEmpty(false); };

  return (
    <main className="min-h-screen bg-white p-4 md:p-6 lg:p-8" style={{ fontFamily: FONT }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ width: "3px", height: "20px", borderRadius: "4px", background: BLUE, display: "inline-block" }} />
            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: BLUE, margin: 0 }}>
              Mentor Discovery
            </p>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
            Find your Mentor
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
            Long-term mentorship plans tailored to your goals
          </p>
        </motion.div>



        {/* Filter */}
        {/* <FilterBar
          onSearch={handleSearch} isSearching={isSearching}
          onClear={handleClear} isFiltered={isFiltered}
        /> */}

        {/* Count */}
        {!isLoading && !isError && (
          <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px", fontFamily: FONT }}>
            Showing {mentors.length} of {allMentors.length} mentor{allMentors.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: `3px solid ${BLUE_BORDER}`, borderTopColor: BLUE,
              animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <Loader />
        )}

        {/* Search empty */}
        {!isLoading && !isError && searchEmpty && (
          <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "16px" }}>
            <p style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</p>
            <p style={{ fontWeight: 600, color: "#374151" }}>No mentors match your search</p>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>Try a different category or experience level</p>
          </div>
        )}

        {/* Cards */}
        {!isLoading && !isError && !searchEmpty && mentors.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {mentors.map((mentor, index) => (
              <MentorCard
                key={mentor._id || index}
                mentor={mentor}
                index={index}
                onSubscribe={setActiveMentor}
              />
            ))}
          </div>
        )}

        {/* No mentors at all */}
        {!isLoading && !isError && !isFiltered && allMentors.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", border: "2px dashed #e5e7eb", borderRadius: "16px" }}>
            <p style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🏫</p>
            <p style={{ fontWeight: 600, color: "#374151" }}>No mentors available</p>
          </div>
        )}

      </div>

      {/* Overlay + side panel */}
      <AnimatePresence>
        {activeMentor && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveMentor(null)}
              style={{
                position: "fixed", inset: 0, zIndex: 299,
                background: "rgba(0,0,0,.35)", backdropFilter: "blur(3px)",
              }}
            />
            <SubscribePanel
              key="panel"
              mentor={activeMentor}
              onClose={() => setActiveMentor(null)}
            />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}