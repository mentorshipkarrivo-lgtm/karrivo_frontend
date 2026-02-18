// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Star, X, Clock, Calendar, Loader2, MapPin } from "lucide-react";
// import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice"; 
// import BookingModal from "./BookingModal";

// const ProfileModal = () => {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

//   const handleClose = () => {
//     navigate('/mentors');
//   };

//   const handleBookSession = () => {
//     // Check if user is authenticated (same as MentorsSection)
//     const isLoggedIn = !!localStorage.getItem("authToken");

//     if (!isLoggedIn) {
//       // Redirect to login with mentorId (same pattern as MentorsSection)
//       navigate(`/login?mentorId=${mentorId}`);
//       return;
//     }

//     // Open booking modal if logged in
//     setIsBookingModalOpen(true);
//   };

//   const handleCloseBookingModal = () => {
//     setIsBookingModalOpen(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#7ee0c1] mx-auto mb-4" />
//           <p className="text-white">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !mentor) {
//     return (
//       <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4">Failed to load profile</p>
//           <button
//             onClick={handleClose}
//             className="bg-[#7ee0c1] text-[#0f2f2a] px-6 py-2 rounded-lg font-semibold"
//           >
//             Back to Mentors
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const skillsArray = mentor.currentSkills
//     ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
//     : [];

//   return (
//     <>
//       <div className="bg-[#0f2f2a] min-h-screen text-white">
//         {/* MAIN CONTAINER */}
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           {/* Back Button */}
//           {/* <button
//             onClick={handleClose}
//             className="mb-6 flex items-center gap-2 text-[#7ee0c1] hover:text-white transition"
//           >
//             <X className="w-5 h-5" />
//             <span>Back to Mentors</span>
//           </button> */}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//             {/* LEFT SIDE */}
//             <div className="lg:col-span-2">
//               {/* PROFILE HEADER */}
//               <div className="flex gap-6">
//                 <img
//                   src={mentor.profileImage || "https://via.placeholder.com/180"}
//                   alt={mentor.fullName}
//                   className="w-40 h-40 rounded-xl object-cover"
//                 />

//                 <div>
//                   <span className="inline-block bg-[#1f4f47] px-4 py-1 rounded-full text-sm mb-3">
//                      Top Mentor
//                   </span>

//                   <h1 className="text-4xl font-bold">{mentor.fullName}</h1>
//                   <p className="text-[#7ee0c1] mt-1">
//                     {mentor.currentRole} {mentor.companyName && `@ ${mentor.companyName}`}
//                   </p>

//                   <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
//                     <span className="flex items-center gap-1">
//                       5.0 
//                     </span>
//                     {mentor.location && (
//                       <span className="flex items-center gap-1">
//                         <MapPin size={14} /> {mentor.location}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* BIO/TAGLINE */}
//               {mentor.bio && (
//                 <p className="mt-6 text-[#7ee0c1] font-medium">
//                   {mentor.bio}
//                 </p>
//               )}

//               {/* META INFO */}
//               <div className="mt-4 space-y-2 text-gray-300 text-sm">
//                 {mentor.location && <p>{mentor.location}</p>}
//                 <p>Active recently</p>
//                 <p> Usually responds in half a day</p>
//               </div>

//               {/* EXPERIENCE */}
//               <div className="mt-10 grid grid-cols-3 gap-4">
//                 <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-[#7ee0c1]">{mentor.yearsOfExperience}+</div>
//                   <div className="text-sm text-gray-300">Years Exp</div>
//                 </div>
//                 <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                   <div className="flex items-center justify-center gap-1">
                  
//                     <span className="text-2xl font-bold text-[#7ee0c1]">5.0</span>
//                   </div>
//                   <div className="text-sm text-gray-300">Rating</div>
//                 </div>
//                 <div className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-[#7ee0c1]">₹{mentor.hourlyRate}</div>
//                   <div className="text-sm text-gray-300">Per Hour</div>
//                 </div>
//               </div>

//               {/* WEEKLY AVAILABILITY */}
//               <div className="mt-10">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//                   <Calendar className="w-6 h-6 text-[#7ee0c1]" />
//                   Weekly Availability
//                 </h2>

//                 {mentor.availability && Array.isArray(mentor.availability) && mentor.availability.some(day => day.slots && day.slots.length > 0) ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {mentor.availability
//                       .filter(day => day.slots && day.slots.length > 0)
//                       .map((dayData, index) => (
//                         <div key={index} className="bg-[#1f4f47] rounded-lg p-4">
//                           <h4 className="font-bold text-white mb-3 flex items-center gap-2">
//                             <div className="w-2 h-2 rounded-full bg-[#7ee0c1]"></div>
//                             {dayData.day}
//                           </h4>
//                           <div className="space-y-2">
//                             {dayData.slots.map((slot, slotIndex) => (
//                               <div key={slotIndex} className="flex items-center justify-between p-2 bg-[#0f2f2a] rounded-lg">
//                                 <div className="flex items-center gap-2">
//                                   <Clock size={14} className="text-[#7ee0c1]" />
//                                   <span className="text-sm font-semibold text-white">
//                                     {slot.startTime} - {slot.endTime}
//                                   </span>
//                                 </div>
//                                 {slot.isBooked && (
//                                   <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-medium">
//                                     Booked
//                                   </span>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-6 text-center">
//                     <Clock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
//                     <p className="text-amber-300 font-medium">Availability to be updated by mentor</p>
//                     <p className="text-amber-400 text-sm mt-1">Please check back later or contact the mentor directly</p>
//                   </div>
//                 )}
//               </div>

//               {/* SKILLS */}
//               <div className="mt-10">
//                 <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
//                 <div className="flex flex-wrap gap-3">
//                   {skillsArray.slice(0, 12).map((skill, i) => (
//                     <span
//                       key={i}
//                       className="bg-[#1f4f47] px-4 py-2 rounded-full text-sm"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                   {skillsArray.length > 12 && (
//                     <span className="text-[#7ee0c1] underline cursor-pointer px-4 py-2">
//                       + {skillsArray.length - 12} more
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE — PRICING CARD */}
//             <div className="bg-[#f6ecd9] text-[#0f2f2a] rounded-2xl p-8 h-fit sticky top-10">
//               <div className="flex justify-between mb-6 border-b pb-3">
//                 <button className="font-semibold border-b-2 border-[#0f2f2a]">
//                   Mentorship plans
//                 </button>
//                 <button className="text-gray-500">Sessions</button>
//               </div>

//               <div className="flex gap-3 mb-6">
//                 <button className="px-4 py-2 border rounded-full text-sm">
//                   Lite Plan
//                 </button>
//                 <button className="px-4 py-2 border rounded-full bg-[#0f2f2a] text-white text-sm">
//                   Standard Plan
//                 </button>
//               </div>

//               <h2 className="text-5xl font-bold">
//                 ₹{mentor.hourlyRate}
//                 <span className="text-xl font-normal"> / month</span>
//               </h2>

//               <p className="mt-4 text-gray-700">
//                 Receive tailored mentorship and assistance as we work together
//                 to help you reach your career goals.
//               </p>

//               <ul className="mt-6 space-y-3 text-sm">
//                 <li className="flex gap-2">
//                   <Clock size={16} /> 2 calls per month (45min/call)
//                 </li>
//                 <li>Unlimited Q&A via chat</li>
//                 <li> Expect responses within 24 hours</li>
//                 <li>Hands-on support</li>
//               </ul>

//               <button
//                 onClick={handleBookSession}
//                 className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 active:scale-95"
//               >
//                 Book Session
//               </button>

//               <p className="text-xs text-center mt-4">
//                 7-day free trial, cancel anytime.
//                 <span className="underline ml-1 cursor-pointer">
//                   What's included?
//                 </span>
//               </p>

//               <p className="text-center mt-4 text-sm">
//                 Lock in this price now!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Booking Modal */}
//       {mentor && (
//         <BookingModal
//           mentor={mentor}
//           isOpen={isBookingModalOpen}
//           onClose={handleCloseBookingModal}
//         />
//       )}
//     </>
//   );
// };

// export default ProfileModal;


// src/pages/mentor/ProfileModal.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  Loader2,
  MapPin,
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";
import BookingModal from "./BookingModal";

// ─── Constants ────────────────────────────────────────────────────────────────
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const makeSlot = () => ({ startTime: "09:00", endTime: "10:00", isBooked: false });

// ─────────────────────────────────────────────────────────────────────────────
//  AvailabilityManager
// ─────────────────────────────────────────────────────────────────────────────
const AvailabilityManager = ({ initialAvailability = [], onSave, onCancel }) => {
  const buildState = () =>
    DAYS.reduce((acc, day) => {
      const found = initialAvailability.find((d) => d.day === day);
      acc[day] = {
        selected: !!found,
        open: !!found,
        slots: found?.slots?.length ? found.slots.map((s) => ({ ...s })) : [makeSlot()],
      };
      return acc;
    }, {});

  const [days, setDays]         = useState(buildState);
  const [isSaving, setIsSaving] = useState(false);

  // ── derived ──────────────────────────────────────────────────────────────
  const selectedDays  = DAYS.filter((d) => days[d].selected);
  const allSelected   = selectedDays.length === DAYS.length;
  const someSelected  = selectedDays.length > 0 && !allSelected;
  const totalSlots    = selectedDays.reduce((n, d) => n + days[d].slots.length, 0);

  // ── helpers ──────────────────────────────────────────────────────────────
  const setDay = (day, patch) =>
    setDays((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));

  const setSlots = (day, slots) => setDay(day, { slots });

  // ── SELECT ALL ────────────────────────────────────────────────────────────
  const handleSelectAll = (checked) => {
    setDays((prev) =>
      DAYS.reduce((acc, day) => {
        acc[day] = {
          ...prev[day],
          selected: checked,
          open: checked,
          slots: prev[day].slots.length ? prev[day].slots : [makeSlot()],
        };
        return acc;
      }, {})
    );
  };

  // ── individual day ────────────────────────────────────────────────────────
  const toggleDay = (day) => {
    const next = !days[day].selected;
    setDay(day, {
      selected: next,
      open: next,
      slots: days[day].slots.length ? days[day].slots : [makeSlot()],
    });
  };

  const toggleOpen = (day, e) => {
    e.stopPropagation();
    setDay(day, { open: !days[day].open });
  };

  // ── slot CRUD ─────────────────────────────────────────────────────────────
  const addSlot    = (day)           => setSlots(day, [...days[day].slots, makeSlot()]);
  const removeSlot = (day, i)        => setSlots(day, days[day].slots.filter((_, j) => j !== i));
  const updateSlot = (day, i, f, v)  =>
    setSlots(day, days[day].slots.map((s, j) => (j === i ? { ...s, [f]: v } : s)));

  // ── save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    const payload = selectedDays.map((day) => ({
      day,
      slots: days[day].slots.filter((s) => s.startTime && s.endTime),
    }));
    setIsSaving(true);
    try { await onSave?.(payload); } finally { setIsSaving(false); }
  };

  // ── styles (inline so no extra CSS file needed) ───────────────────────────
  const s = {
    card: (active) => ({
      border: `1.5px solid ${active ? "#7ee0c1" : "#1f4f47"}`,
      borderRadius: 12,
      overflow: "hidden",
      transition: "border-color 0.2s",
    }),
    header: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 16px",
      background: active ? "rgba(126,224,193,0.08)" : "#1a3d38",
      cursor: "pointer",
      userSelect: "none",
    }),
    checkbox: (checked, size = 20) => ({
      width: size,
      height: size,
      borderRadius: size === 20 ? 5 : 6,
      border: `2px solid ${checked ? "#7ee0c1" : "#4a7a72"}`,
      background: checked ? "#7ee0c1" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "all 0.15s",
      cursor: "pointer",
    }),
    indeterminate: {
      width: 22, height: 22, borderRadius: 6,
      border: "2px solid #7ee0c1",
      background: "#3a8c7a",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    },
    badge: {
      background: "#7ee0c1", color: "#0f2f2a",
      borderRadius: 20, padding: "2px 10px",
      fontSize: 11, fontWeight: 700,
    },
    timeInput: {
      background: "#0f2f2a",
      border: "1.5px solid #2a5f56",
      borderRadius: 6,
      color: "#fff",
      padding: "5px 9px",
      fontSize: 13,
      outline: "none",
      width: 118,
    },
  };

  const Tick = ({ size = 12, color = "#0f2f2a" }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2 6.5L4.5 9L10 3" stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════════════════
          SELECT ALL DAYS  ← the main checkbox the user asked for
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: allSelected
            ? "rgba(126,224,193,0.14)"
            : "rgba(31,79,71,0.55)",
          border: `2px solid ${allSelected ? "#7ee0c1" : someSelected ? "#3a8c7a" : "#2a5f56"}`,
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 16,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        onClick={() => handleSelectAll(!allSelected)}
      >
        {/* Checkbox square */}
        {someSelected ? (
          <div style={s.indeterminate}>
            <span style={{ width: 10, height: 2, background: "#fff", borderRadius: 2, display: "block" }} />
          </div>
        ) : (
          <div style={s.checkbox(allSelected, 22)}>
            {allSelected && <Tick size={13} />}
          </div>
        )}

        <Calendar size={17} color="#7ee0c1" />

        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, flex: 1 }}>
          Select All Days
        </span>

        {allSelected && <span style={s.badge}>All 7 days ✓</span>}
        {someSelected && (
          <span style={s.badge}>{selectedDays.length} / 7 selected</span>
        )}
      </div>

      {/* ── Individual day cards ──────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DAYS.map((day) => {
          const d        = days[day];
          const isActive = d.selected;

          return (
            <div key={day} style={s.card(isActive)}>

              {/* Day header */}
              <div style={s.header(isActive)} onClick={() => toggleDay(day)}>
                <div style={s.checkbox(isActive)}>
                  {isActive && <Tick />}
                </div>

                <span style={{ fontWeight: 600, color: "#fff", fontSize: 14, flex: 1 }}>
                  {day}
                </span>

                {isActive && (
                  <span style={s.badge}>
                    {d.slots.length} slot{d.slots.length !== 1 ? "s" : ""}
                  </span>
                )}

                {isActive && (
                  <button
                    type="button"
                    onClick={(e) => toggleOpen(day, e)}
                    style={{ background: "none", border: "none", color: "#7ee0c1", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    {d.open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                )}
              </div>

              {/* Slots panel */}
              {isActive && d.open && (
                <div style={{ background: "#0f2f2a", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {d.slots.map((slot, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: "#1a3d38", borderRadius: 8,
                        padding: "9px 12px", flexWrap: "wrap",
                      }}
                    >
                      <Clock size={14} color="#7ee0c1" />
                      <span style={{ color: "#7ee0c1", fontSize: 12, fontWeight: 700, minWidth: 22 }}>
                        #{idx + 1}
                      </span>

                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateSlot(day, idx, "startTime", e.target.value)}
                        style={s.timeInput}
                      />
                      <span style={{ color: "#7ee0c1", fontSize: 13 }}>→</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateSlot(day, idx, "endTime", e.target.value)}
                        style={s.timeInput}
                      />

                      {d.slots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSlot(day, idx)}
                          style={{
                            background: "transparent", border: "none", color: "#e57373",
                            cursor: "pointer", marginLeft: "auto", padding: 4, borderRadius: 5,
                            display: "flex", alignItems: "center",
                          }}
                          title="Remove slot"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addSlot(day)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "transparent",
                      border: "1.5px dashed #7ee0c1",
                      color: "#7ee0c1", borderRadius: 7,
                      padding: "7px 14px", fontSize: 13,
                      cursor: "pointer", width: "fit-content", marginTop: 2,
                    }}
                  >
                    <Plus size={14} /> Add another slot
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Summary ───────────────────────────────────────────────────────── */}
      {selectedDays.length > 0 && (
        <div style={{
          marginTop: 14, background: "rgba(126,224,193,0.08)",
          border: "1px solid #7ee0c1", borderRadius: 10,
          padding: "10px 16px", fontSize: 13, color: "#7ee0c1",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Calendar size={15} />
          <span>
            <strong>{selectedDays.length}</strong> day{selectedDays.length > 1 ? "s" : ""} ·{" "}
            <strong>{totalSlots}</strong> total slot{totalSlots !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* ── Action buttons ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1, background: "transparent",
            border: "1.5px solid #4a7a72", color: "#7ee0c1",
            borderRadius: 10, padding: "12px", fontSize: 14,
            fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <X size={15} /> Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || selectedDays.length === 0}
          style={{
            flex: 2,
            background: selectedDays.length === 0
              ? "#1f4f47"
              : "linear-gradient(135deg, #7ee0c1, #3a9e84)",
            border: "none",
            color: selectedDays.length === 0 ? "#4a7a72" : "#0f2f2a",
            fontWeight: 700, fontSize: 15, borderRadius: 10,
            padding: "12px", cursor: selectedDays.length === 0 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "opacity 0.2s",
          }}
        >
          <Save size={16} />
          {isSaving ? "Saving..." : "Save Availability"}
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  ProfileModal
// ─────────────────────────────────────────────────────────────────────────────
const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate     = useNavigate();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showAvailEditor,    setShowAvailEditor]     = useState(false);

  const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

  const handleBookSession = () => {
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (!isLoggedIn) { navigate(`/login?mentorId=${mentorId}`); return; }
    setIsBookingModalOpen(true);
  };

  const handleSaveAvailability = async (availability) => {
    // 🔌 Plug your API call here:
    // await updateMentorAvailability({ id: mentorId, availability }).unwrap();
    // toast.success("Availability saved!");
    console.log("Saving:", availability);
    setShowAvailEditor(false);
  };

  // ── Loading / Error ──────────────────────────────────────────────────────
  if (isLoading) return (
    <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#7ee0c1] mx-auto mb-4" />
        <p className="text-white">Loading profile...</p>
      </div>
    </div>
  );

  if (isError || !mentor) return (
    <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">Failed to load profile</p>
        <button onClick={() => navigate("/mentors")}
          className="bg-[#7ee0c1] text-[#0f2f2a] px-6 py-2 rounded-lg font-semibold">
          Back to Mentors
        </button>
      </div>
    </div>
  );

  const skillsArray = mentor.currentSkills
    ? mentor.currentSkills.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean)
    : [];

  const hasAvailability =
    Array.isArray(mentor.availability) &&
    mentor.availability.some((d) => d.slots?.length > 0);

  return (
    <>
      <div className="bg-[#0f2f2a] min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── LEFT ───────────────────────────────────────────────────── */}
            <div className="lg:col-span-2">

              {/* Profile Header */}
              <div className="flex gap-6">
                <img
                  src={mentor.profileImage || "https://via.placeholder.com/180"}
                  alt={mentor.fullName}
                  className="w-40 h-40 rounded-xl object-cover"
                />
                <div>
                  <span className="inline-block bg-[#1f4f47] px-4 py-1 rounded-full text-sm mb-3">
                    Top Mentor
                  </span>
                  <h1 className="text-4xl font-bold">{mentor.fullName}</h1>
                  <p className="text-[#7ee0c1] mt-1">
                    {mentor.currentRole}
                    {mentor.companyName && ` @ ${mentor.companyName}`}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
                    <span>5.0</span>
                    {mentor.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {mentor.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {mentor.bio && (
                <p className="mt-6 text-[#7ee0c1] font-medium">{mentor.bio}</p>
              )}

              {/* Meta */}
              <div className="mt-4 space-y-2 text-gray-300 text-sm">
                {mentor.location && <p>{mentor.location}</p>}
                <p>Active recently</p>
                <p>Usually responds in half a day</p>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: "Years Exp",  value: `${mentor.yearsOfExperience}+` },
                  { label: "Rating",     value: "5.0" },
                  { label: "Per Hour",   value: `₹${mentor.hourlyRate}` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#1f4f47] p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#7ee0c1]">{value}</div>
                    <div className="text-sm text-gray-300">{label}</div>
                  </div>
                ))}
              </div>

              {/* ── Weekly Availability ───────────────────────────────────── */}
              <div className="mt-10">

                {/* Section heading + Manage button */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#7ee0c1]" />
                    Weekly Availability
                  </h2>
                  {/* <button
                    type="button"
                    onClick={() => setShowAvailEditor((v) => !v)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: showAvailEditor ? "#7ee0c1" : "rgba(126,224,193,0.12)",
                      border: "1.5px solid #7ee0c1",
                      color: showAvailEditor ? "#0f2f2a" : "#7ee0c1",
                      borderRadius: 8, padding: "7px 16px",
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <Plus size={15} />
                    {showAvailEditor ? "Cancel Edit" : "Manage Slots"}
                  </button> */}
                </div>

                {/* ── Slot Editor ─────────────────────────────────────────── */}
                {showAvailEditor && (
                  <div style={{
                    background: "#0d2823",
                    border: "1.5px solid #2a5f56",
                    borderRadius: 14,
                    padding: "20px 18px",
                    marginBottom: 24,
                  }}>
                    <p style={{ color: "#7ee0c1", fontSize: 13, marginBottom: 16 }}>
                      ✓ Tick the checkbox to select a day, then set your time slots.
                    </p>
                    <AvailabilityManager
                      initialAvailability={mentor.availability || []}
                      onSave={handleSaveAvailability}
                      onCancel={() => setShowAvailEditor(false)}
                    />
                  </div>
                )}

                {/* ── Read-only view ───────────────────────────────────────── */}
                {hasAvailability ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mentor.availability
                      .filter((d) => d.slots?.length > 0)
                      .map((dayData, i) => (
                        <div key={i} className="bg-[#1f4f47] rounded-lg p-4">
                          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#7ee0c1]" />
                            {dayData.day}
                          </h4>
                          <div className="space-y-2">
                            {dayData.slots.map((slot, si) => (
                              <div key={si}
                                className="flex items-center justify-between p-2 bg-[#0f2f2a] rounded-lg">
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-[#7ee0c1]" />
                                  <span className="text-sm font-semibold text-white">
                                    {slot.startTime} - {slot.endTime}
                                  </span>
                                </div>
                                {slot.isBooked && (
                                  <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-medium">
                                    Booked
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  !showAvailEditor && (
                    <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-6 text-center">
                      <Clock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                      <p className="text-amber-300 font-medium">
                        Availability to be updated by mentor
                      </p>
                      <p className="text-amber-400 text-sm mt-1">
                        Please check back later or contact the mentor directly
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Skills */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {skillsArray.slice(0, 12).map((skill, i) => (
                    <span key={i} className="bg-[#1f4f47] px-4 py-2 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  {skillsArray.length > 12 && (
                    <span className="text-[#7ee0c1] underline cursor-pointer px-4 py-2">
                      + {skillsArray.length - 12} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT — Pricing Card ──────────────────────────────────── */}
            <div className="bg-[#f6ecd9] text-[#0f2f2a] rounded-2xl p-8 h-fit sticky top-10">
              <div className="flex justify-between mb-6 border-b pb-3">
                <button className="font-semibold border-b-2 border-[#0f2f2a]">
                  Mentorship plans
                </button>
                <button className="text-gray-500">Sessions</button>
              </div>

              <div className="flex gap-3 mb-6">
                <button className="px-4 py-2 border rounded-full text-sm">Lite Plan</button>
                <button className="px-4 py-2 border rounded-full bg-[#0f2f2a] text-white text-sm">
                  Standard Plan
                </button>
              </div>

              <h2 className="text-5xl font-bold">
                ₹{mentor.hourlyRate}
                <span className="text-xl font-normal"> / month</span>
              </h2>

              <p className="mt-4 text-gray-700">
                Receive tailored mentorship and assistance as we work together
                to help you reach your career goals.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex gap-2"><Clock size={16} /> 2 calls per month (45 min / call)</li>
                <li>Unlimited Q&A via chat</li>
                <li>Expect responses within 24 hours</li>
                <li>Hands-on support</li>
              </ul>

              <button
                onClick={handleBookSession}
                className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 active:scale-95"
              >
                Book Session
              </button>

              <p className="text-xs text-center mt-4">
                7-day free trial, cancel anytime.
                <span className="underline ml-1 cursor-pointer">What's included?</span>
              </p>
              <p className="text-center mt-4 text-sm">Lock in this price now!</p>
            </div>
          </div>
        </div>
      </div>

      {mentor && (
        <BookingModal
          mentor={mentor}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProfileModal;