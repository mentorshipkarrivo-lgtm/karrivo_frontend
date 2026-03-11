

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Clock,
//   Calendar,
//   Loader2,
//   MapPin,
//   Plus,
//   Trash2,
//   Save,
//   ChevronDown,
//   ChevronUp,
//   X,
//   Zap,
// } from "lucide-react";
// import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";
// import BookingModal from "./BookingModal";

// // ─── Constants ────────────────────────────────────────────────────────────────
// const DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const makeSlot = () => ({ startTime: "09:00", endTime: "10:00", isBooked: false });

// // ─────────────────────────────────────────────────────────────────────────────
// //  AvailabilityManager
// // ─────────────────────────────────────────────────────────────────────────────
// const AvailabilityManager = ({ initialAvailability = [], onSave, onCancel }) => {
//   const buildState = () =>
//     DAYS.reduce((acc, day) => {
//       const found = initialAvailability.find((d) => d.day === day);
//       acc[day] = {
//         selected: !!found,
//         open: !!found,
//         slots: found?.slots?.length ? found.slots.map((s) => ({ ...s })) : [makeSlot()],
//       };
//       return acc;
//     }, {});

//   const [days, setDays] = useState(buildState);
//   const [isSaving, setIsSaving] = useState(false);

//   const selectedDays = DAYS.filter((d) => days[d].selected);
//   const allSelected = selectedDays.length === DAYS.length;
//   const someSelected = selectedDays.length > 0 && !allSelected;
//   const totalSlots = selectedDays.reduce((n, d) => n + days[d].slots.length, 0);

//   const setDay = (day, patch) =>
//     setDays((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));

//   const setSlots = (day, slots) => setDay(day, { slots });

//   const handleSelectAll = (checked) => {
//     setDays((prev) =>
//       DAYS.reduce((acc, day) => {
//         acc[day] = {
//           ...prev[day],
//           selected: checked,
//           open: checked,
//           slots: prev[day].slots.length ? prev[day].slots : [makeSlot()],
//         };
//         return acc;
//       }, {})
//     );
//   };

//   const toggleDay = (day) => {
//     const next = !days[day].selected;
//     setDay(day, {
//       selected: next,
//       open: next,
//       slots: days[day].slots.length ? days[day].slots : [makeSlot()],
//     });
//   };

//   const toggleOpen = (day, e) => {
//     e.stopPropagation();
//     setDay(day, { open: !days[day].open });
//   };

//   const addSlot = (day) => setSlots(day, [...days[day].slots, makeSlot()]);
//   const removeSlot = (day, i) => setSlots(day, days[day].slots.filter((_, j) => j !== i));
//   const updateSlot = (day, i, f, v) =>
//     setSlots(day, days[day].slots.map((s, j) => (j === i ? { ...s, [f]: v } : s)));

//   const handleSave = async () => {
//     const payload = selectedDays.map((day) => ({
//       day,
//       slots: days[day].slots.filter((s) => s.startTime && s.endTime),
//     }));
//     setIsSaving(true);
//     try { await onSave?.(payload); } finally { setIsSaving(false); }
//   };

//   const s = {
//     card: (active) => ({
//       border: `1.5px solid ${active ? "#7ee0c1" : "#1f4f47"}`,
//       borderRadius: 12,
//       overflow: "hidden",
//       transition: "border-color 0.2s",
//     }),
//     header: (active) => ({
//       display: "flex",
//       alignItems: "center",
//       gap: 12,
//       padding: "11px 16px",
//       background: active ? "rgba(126,224,193,0.08)" : "#1a3d38",
//       cursor: "pointer",
//       userSelect: "none",
//     }),
//     checkbox: (checked, size = 20) => ({
//       width: size,
//       height: size,
//       borderRadius: size === 20 ? 5 : 6,
//       border: `2px solid ${checked ? "#7ee0c1" : "#4a7a72"}`,
//       background: checked ? "#7ee0c1" : "transparent",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       flexShrink: 0,
//       transition: "all 0.15s",
//       cursor: "pointer",
//     }),
//     indeterminate: {
//       width: 22, height: 22, borderRadius: 6,
//       border: "2px solid #7ee0c1",
//       background: "#3a8c7a",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       flexShrink: 0,
//     },
//     badge: {
//       background: "#7ee0c1", color: "#0f2f2a",
//       borderRadius: 20, padding: "2px 10px",
//       fontSize: 11, fontWeight: 700,
//     },
//     timeInput: {
//       background: "#0f2f2a",
//       border: "1.5px solid #2a5f56",
//       borderRadius: 6,
//       color: "#fff",
//       padding: "5px 9px",
//       fontSize: 13,
//       outline: "none",
//       width: 118,
//     },
//   };

//   const Tick = ({ size = 12, color = "#0f2f2a" }) => (
//     <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
//       <path d="M2 6.5L4.5 9L10 3" stroke={color} strokeWidth="2.2"
//         strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex", alignItems: "center", gap: 12,
//           background: allSelected ? "rgba(126,224,193,0.14)" : "rgba(31,79,71,0.55)",
//           border: `2px solid ${allSelected ? "#7ee0c1" : someSelected ? "#3a8c7a" : "#2a5f56"}`,
//           borderRadius: 12, padding: "14px 18px", marginBottom: 16,
//           cursor: "pointer", transition: "all 0.15s",
//         }}
//         onClick={() => handleSelectAll(!allSelected)}
//       >
//         {someSelected ? (
//           <div style={s.indeterminate}>
//             <span style={{ width: 10, height: 2, background: "#fff", borderRadius: 2, display: "block" }} />
//           </div>
//         ) : (
//           <div style={s.checkbox(allSelected, 22)}>
//             {allSelected && <Tick size={13} />}
//           </div>
//         )}
//         <Calendar size={17} color="#7ee0c1" />
//         <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, flex: 1 }}>Select All Days</span>
//         {allSelected && <span style={s.badge}>All 7 days ✓</span>}
//         {someSelected && <span style={s.badge}>{selectedDays.length} / 7 selected</span>}
//       </div>

//       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         {DAYS.map((day) => {
//           const d = days[day];
//           const isActive = d.selected;
//           return (
//             <div key={day} style={s.card(isActive)}>
//               <div style={s.header(isActive)} onClick={() => toggleDay(day)}>
//                 <div style={s.checkbox(isActive)}>{isActive && <Tick />}</div>
//                 <span style={{ fontWeight: 600, color: "#fff", fontSize: 14, flex: 1 }}>{day}</span>
//                 {isActive && <span style={s.badge}>{d.slots.length} slot{d.slots.length !== 1 ? "s" : ""}</span>}
//                 {isActive && (
//                   <button type="button" onClick={(e) => toggleOpen(day, e)}
//                     style={{ background: "none", border: "none", color: "#7ee0c1", cursor: "pointer", display: "flex", alignItems: "center" }}>
//                     {d.open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//                   </button>
//                 )}
//               </div>
//               {isActive && d.open && (
//                 <div style={{ background: "#0f2f2a", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
//                   {d.slots.map((slot, idx) => (
//                     <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, background: "#1a3d38", borderRadius: 8, padding: "9px 12px", flexWrap: "wrap" }}>
//                       <Clock size={14} color="#7ee0c1" />
//                       <span style={{ color: "#7ee0c1", fontSize: 12, fontWeight: 700, minWidth: 22 }}>#{idx + 1}</span>
//                       <input type="time" value={slot.startTime} onChange={(e) => updateSlot(day, idx, "startTime", e.target.value)} style={s.timeInput} />
//                       <span style={{ color: "#7ee0c1", fontSize: 13 }}>→</span>
//                       <input type="time" value={slot.endTime} onChange={(e) => updateSlot(day, idx, "endTime", e.target.value)} style={s.timeInput} />
//                       {d.slots.length > 1 && (
//                         <button type="button" onClick={() => removeSlot(day, idx)}
//                           style={{ background: "transparent", border: "none", color: "#e57373", cursor: "pointer", marginLeft: "auto", padding: 4, borderRadius: 5, display: "flex", alignItems: "center" }}>
//                           <Trash2 size={15} />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                   <button type="button" onClick={() => addSlot(day)}
//                     style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "1.5px dashed #7ee0c1", color: "#7ee0c1", borderRadius: 7, padding: "7px 14px", fontSize: 13, cursor: "pointer", width: "fit-content", marginTop: 2 }}>
//                     <Plus size={14} /> Add another slot
//                   </button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {selectedDays.length > 0 && (
//         <div style={{ marginTop: 14, background: "rgba(126,224,193,0.08)", border: "1px solid #7ee0c1", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#7ee0c1", display: "flex", alignItems: "center", gap: 8 }}>
//           <Calendar size={15} />
//           <span><strong>{selectedDays.length}</strong> day{selectedDays.length > 1 ? "s" : ""} · <strong>{totalSlots}</strong> total slot{totalSlots !== 1 ? "s" : ""}</span>
//         </div>
//       )}

//       <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
//         <button type="button" onClick={onCancel}
//           style={{ flex: 1, background: "transparent", border: "1.5px solid #4a7a72", color: "#7ee0c1", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//           <X size={15} /> Cancel
//         </button>
//         <button type="button" onClick={handleSave} disabled={isSaving || selectedDays.length === 0}
//           style={{ flex: 2, background: selectedDays.length === 0 ? "#1f4f47" : "linear-gradient(135deg, #7ee0c1, #3a9e84)", border: "none", color: selectedDays.length === 0 ? "#4a7a72" : "#0f2f2a", fontWeight: 700, fontSize: 15, borderRadius: 10, padding: "12px", cursor: selectedDays.length === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.2s" }}>
//           <Save size={16} />
//           {isSaving ? "Saving..." : "Save Availability"}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  ProfileModal
// // ─────────────────────────────────────────────────────────────────────────────
// const ProfileModal = () => {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();

//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [showAvailEditor, setShowAvailEditor] = useState(false);

//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

//   const handleBookSession = () => {
//     const isLoggedIn = !!localStorage.getItem("authToken");
//     if (!isLoggedIn) { navigate(`/login?mentorId=${mentorId}`); return; }
//     setIsBookingModalOpen(true);
//   };

//   // ── Navigate to LTM Plans page ──────────────────────────────── ← NEW
//   const handleViewLTMPlans = () => {
//     navigate(`/mentor/${mentorId}/ltm-plans`);
//   };

//   const handleSaveAvailability = async (availability) => {
//     console.log("Saving:", availability);
//     setShowAvailEditor(false);
//   };

//   if (isLoading) return (
//     <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <Loader2 className="w-12 h-12 animate-spin text-[#7ee0c1] mx-auto mb-4" />
//         <p className="text-white">Loading profile...</p>
//       </div>
//     </div>
//   );

//   if (isError || !mentor) return (
//     <div className="bg-[#0f2f2a] min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <p className="text-red-500 mb-4">Failed to load profile</p>
//         <button onClick={() => navigate("/mentors")}
//           className="bg-[#7ee0c1] text-[#0f2f2a] px-6 py-2 rounded-lg font-semibold">
//           Back to Mentors
//         </button>
//       </div>
//     </div>
//   );

//   const skillsArray = mentor.currentSkills
//     ? mentor.currentSkills.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean)
//     : [];

//   const hasAvailability =
//     Array.isArray(mentor.availability) &&
//     mentor.availability.some((d) => d.slots?.length > 0);

//   return (
//     <>
//       <div className="bg-[#0f2f2a] min-h-screen text-white">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//             {/* ── LEFT ───────────────────────────────────────────────────── */}
//             <div className="lg:col-span-2">

//               {/* Profile Header */}
//               <div className="flex gap-6">
//                 <img
//                   src={mentor.profileImage || "https://via.placeholder.com/180"}
//                   alt={mentor.fullName}
//                   className="w-40 h-40 rounded-xl object-cover"
//                 />
//                 <div>
//                   <span className="inline-block bg-[#1f4f47] px-4 py-1 rounded-full text-sm mb-3">
//                     Top Mentor
//                   </span>
//                   <h1 className="text-4xl font-bold">{mentor.fullName}</h1>
//                   <p className="text-[#7ee0c1] mt-1">
//                     {mentor.currentRole}
//                     {mentor.companyName && ` @ ${mentor.companyName}`}
//                   </p>
//                   <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
//                     <span>5.0</span>
//                     {mentor.location && (
//                       <span className="flex items-center gap-1">
//                         <MapPin size={14} /> {mentor.location}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Bio */}
//               {mentor.bio && (
//                 <p className="mt-6 text-[#7ee0c1] font-medium">{mentor.bio}</p>
//               )}

//               {/* Meta */}
//               <div className="mt-4 space-y-2 text-gray-300 text-sm">
//                 {mentor.location && <p>{mentor.location}</p>}
//               </div>

//               {/* Stats */}
//               <div className="mt-10 grid grid-cols-3 gap-4">
//                 {[
//                   { label: "Years Exp", value: `${mentor.yearsOfExperience}+` },
//                   { label: "Rating", value: "5.0" },
//                   { label: "Per Hour", value: `₹${mentor.hourlyRate}` },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="bg-[#1f4f47] p-4 rounded-lg text-center">
//                     <div className="text-2xl font-bold text-[#7ee0c1]">{value}</div>
//                     <div className="text-sm text-gray-300">{label}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* ── Weekly Availability ───────────────────────────────────── */}
//               <div className="mt-10">
//                 <div className="flex items-center justify-between mb-5">
//                   <h2 className="text-2xl font-semibold flex items-center gap-2">
//                     <Calendar className="w-6 h-6 text-[#7ee0c1]" />
//                     Weekly Availability
//                   </h2>
//                 </div>

//                 {showAvailEditor && (
//                   <div style={{ background: "#0d2823", border: "1.5px solid #2a5f56", borderRadius: 14, padding: "20px 18px", marginBottom: 24 }}>
//                     <p style={{ color: "#7ee0c1", fontSize: 13, marginBottom: 16 }}>
//                       ✓ Tick the checkbox to select a day, then set your time slots.
//                     </p>
//                     <AvailabilityManager
//                       initialAvailability={mentor.availability || []}
//                       onSave={handleSaveAvailability}
//                       onCancel={() => setShowAvailEditor(false)}
//                     />
//                   </div>
//                 )}

//                 {hasAvailability ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {mentor.availability
//                       .filter((d) => d.slots?.length > 0)
//                       .map((dayData, i) => (
//                         <div key={i} className="bg-[#1f4f47] rounded-lg p-4">
//                           <h4 className="font-bold text-white mb-3 flex items-center gap-2">
//                             <div className="w-2 h-2 rounded-full bg-[#7ee0c1]" />
//                             {dayData.day}
//                           </h4>
//                           <div className="space-y-2">
//                             {dayData.slots.map((slot, si) => (
//                               <div key={si} className="flex items-center justify-between p-2 bg-[#0f2f2a] rounded-lg">
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
//                   !showAvailEditor && (
//                     <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-6 text-center">
//                       <Clock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
//                       <p className="text-amber-300 font-medium">Availability to be updated by mentor</p>
//                       <p className="text-amber-400 text-sm mt-1">Please check back later or contact the mentor directly</p>
//                     </div>
//                   )
//                 )}
//               </div>

//               {/* Skills */}
//               <div className="mt-10">
//                 <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
//                 <div className="flex flex-wrap gap-3">
//                   {skillsArray.slice(0, 12).map((skill, i) => (
//                     <span key={i} className="bg-[#1f4f47] px-4 py-2 rounded-full text-sm">{skill}</span>
//                   ))}
//                   {skillsArray.length > 12 && (
//                     <span className="text-[#7ee0c1] underline cursor-pointer px-4 py-2">
//                       + {skillsArray.length - 12} more
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* ── RIGHT — Pricing Card ──────────────────────────────────── */}
//             <div className="bg-[#f6ecd9] text-[#0f2f2a] rounded-2xl p-8 h-fit sticky top-10">
//               <div className="flex justify-between mb-6 border-b pb-3">
//                 <button className="font-semibold border-b-2 border-[#0f2f2a]">
//                   Mentorship plans
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
//                 <li className="flex gap-2"><Clock size={16} /> 2 calls per month (45 min / call)</li>
//                 <li>Unlimited Q&A via chat</li>
//                 <li>Expect responses within 24 hours</li>
//                 <li>Hands-on support</li>
//               </ul>

//               {/* Book Session button */}
//               <button
//                 onClick={handleBookSession}
//                 className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 active:scale-95"
//               >
//                 Book Session
//               </button>

//               {/* ── View LTM Plans button ── */}
//               <button
//                 onClick={handleViewLTMPlans}
//                 style={{
//                   marginTop: 12,
//                   width: "100%",
//                   padding: "14px",
//                   borderRadius: 50,
//                   border: "2px solid #0f2f2a",
//                   background: "transparent",
//                   color: "#0f2f2a",
//                   fontSize: 15,
//                   fontWeight: 700,
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: 8,
//                   transition: "all 0.2s",
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.background = "#0f2f2a"; e.currentTarget.style.color = "#f6ecd9"; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0f2f2a"; }}
//               >
//                 <Zap size={16} /> View LTM Plans
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>

//       {mentor && (
//         <BookingModal
//           mentor={mentor}
//           isOpen={isBookingModalOpen}
//           onClose={() => setIsBookingModalOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default ProfileModal;



import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock, Calendar, Loader2, MapPin, Plus, Trash2, Save,
  ChevronDown, ChevronUp, X, Zap, Star, Mail, Phone,
  Linkedin, BookOpen, Award, Briefcase, GraduationCap,
  Globe, MessageCircle, CheckCircle, Users, TrendingUp,
  ArrowLeft, ExternalLink, Shield, Heart,
} from "lucide-react";
import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";
import BookingModal from "./BookingModal";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const makeSlot = () => ({ startTime: "09:00", endTime: "10:00", isBooked: false });

// ─── AvailabilityManager ───────────────────────────────────────────────────
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

  const [days, setDays] = useState(buildState);
  const [isSaving, setIsSaving] = useState(false);
  const selectedDays = DAYS.filter((d) => days[d].selected);
  const allSelected = selectedDays.length === DAYS.length;
  const someSelected = selectedDays.length > 0 && !allSelected;
  const totalSlots = selectedDays.reduce((n, d) => n + days[d].slots.length, 0);

  const setDay = (day, patch) => setDays((p) => ({ ...p, [day]: { ...p[day], ...patch } }));
  const setSlots = (day, slots) => setDay(day, { slots });
  const handleSelectAll = (checked) =>
    setDays((p) => DAYS.reduce((acc, day) => {
      acc[day] = { ...p[day], selected: checked, open: checked, slots: p[day].slots.length ? p[day].slots : [makeSlot()] };
      return acc;
    }, {}));
  const toggleDay = (day) => {
    const next = !days[day].selected;
    setDay(day, { selected: next, open: next, slots: days[day].slots.length ? days[day].slots : [makeSlot()] });
  };
  const toggleOpen = (day, e) => { e.stopPropagation(); setDay(day, { open: !days[day].open }); };
  const addSlot = (day) => setSlots(day, [...days[day].slots, makeSlot()]);
  const removeSlot = (day, i) => setSlots(day, days[day].slots.filter((_, j) => j !== i));
  const updateSlot = (day, i, f, v) => setSlots(day, days[day].slots.map((s, j) => j === i ? { ...s, [f]: v } : s));
  const handleSave = async () => {
    const payload = selectedDays.map((day) => ({ day, slots: days[day].slots.filter((s) => s.startTime && s.endTime) }));
    setIsSaving(true);
    try { await onSave?.(payload); } finally { setIsSaving(false); }
  };

  const Tick = () => (
    <svg width={10} height={10} viewBox="0 0 12 12" fill="none">
      <path d="M2 6.5L4.5 9L10 3" stroke="#0f2f2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <div onClick={() => handleSelectAll(!allSelected)} style={{ display: "flex", alignItems: "center", gap: 10, background: allSelected ? "rgba(126,224,193,0.1)" : "rgba(31,79,71,0.3)", border: `1px solid ${allSelected ? "#7ee0c1" : someSelected ? "#3a8c7a" : "#2a5f56"}`, borderRadius: 8, padding: "10px 14px", marginBottom: 10, cursor: "pointer", transition: "all 0.15s" }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${(allSelected || someSelected) ? "#7ee0c1" : "#4a7a72"}`, background: allSelected ? "#7ee0c1" : someSelected ? "#3a8c7a" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
          {allSelected && <Tick />}
          {someSelected && <span style={{ width: 8, height: 2, background: "#fff", borderRadius: 2, display: "block" }} />}
        </div>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 13, flex: 1 }}>Select All Days</span>
        {(allSelected || someSelected) && <span style={{ background: "rgba(126,224,193,0.15)", color: "#7ee0c1", borderRadius: 20, padding: "2px 9px", fontSize: 10, fontWeight: 700 }}>{allSelected ? `7/7` : `${selectedDays.length}/7`}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {DAYS.map((day) => {
          const d = days[day];
          return (
            <div key={day} style={{ border: `1px solid ${d.selected ? "#7ee0c1" : "#1f4f47"}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.2s" }}>
              <div onClick={() => toggleDay(day)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: d.selected ? "rgba(126,224,193,0.06)" : "transparent", cursor: "pointer", userSelect: "none" }}>
                <div style={{ width: 17, height: 17, borderRadius: 4, border: `1.5px solid ${d.selected ? "#7ee0c1" : "#4a7a72"}`, background: d.selected ? "#7ee0c1" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                  {d.selected && <Tick />}
                </div>
                <span style={{ fontWeight: 500, color: "#d4e8e4", fontSize: 13, flex: 1 }}>{day}</span>
                {d.selected && <span style={{ color: "#7ee0c1", fontSize: 10, fontWeight: 600 }}>{d.slots.length} slot{d.slots.length !== 1 ? "s" : ""}</span>}
                {d.selected && <button type="button" onClick={(e) => toggleOpen(day, e)} style={{ background: "none", border: "none", color: "#7ee0c1", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 2px" }}>
                  {d.open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>}
              </div>
              {d.selected && d.open && (
                <div style={{ background: "#0c2520", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {d.slots.map((slot, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(126,224,193,0.04)", border: "1px solid rgba(126,224,193,0.1)", borderRadius: 6, padding: "7px 10px", flexWrap: "wrap" }}>
                      <span style={{ color: "#7ee0c1", fontSize: 10, fontWeight: 700, minWidth: 16 }}>#{idx + 1}</span>
                      <input type="time" value={slot.startTime} onChange={(e) => updateSlot(day, idx, "startTime", e.target.value)} style={{ background: "#0f2f2a", border: "1px solid #2a5f56", borderRadius: 5, color: "#fff", padding: "4px 8px", fontSize: 12, outline: "none", width: 108 }} />
                      <span style={{ color: "#4a7a72", fontSize: 11 }}>to</span>
                      <input type="time" value={slot.endTime} onChange={(e) => updateSlot(day, idx, "endTime", e.target.value)} style={{ background: "#0f2f2a", border: "1px solid #2a5f56", borderRadius: 5, color: "#fff", padding: "4px 8px", fontSize: 12, outline: "none", width: 108 }} />
                      {d.slots.length > 1 && <button type="button" onClick={() => removeSlot(day, idx)} style={{ background: "transparent", border: "none", color: "#e57373", cursor: "pointer", marginLeft: "auto", padding: 2, display: "flex", alignItems: "center" }}><Trash2 size={12} /></button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => addSlot(day)} style={{ display: "flex", alignItems: "center", gap: 5, background: "transparent", border: "1px dashed rgba(126,224,193,0.3)", color: "#7ee0c1", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", width: "fit-content" }}>
                    <Plus size={11} /> Add slot
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedDays.length > 0 && <div style={{ marginTop: 8, borderRadius: 7, padding: "7px 12px", fontSize: 11, color: "#7ee0c1", display: "flex", alignItems: "center", gap: 6, background: "rgba(126,224,193,0.06)", border: "1px solid rgba(126,224,193,0.15)" }}>
        <Calendar size={12} /><span><strong>{selectedDays.length}</strong> day{selectedDays.length > 1 ? "s" : ""} · <strong>{totalSlots}</strong> slot{totalSlots !== 1 ? "s" : ""}</span>
      </div>}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button type="button" onClick={onCancel} style={{ flex: 1, background: "transparent", border: "1px solid #2a5f56", color: "#7ee0c1", borderRadius: 7, padding: "9px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <X size={13} /> Cancel
        </button>
        <button type="button" onClick={handleSave} disabled={isSaving || selectedDays.length === 0} style={{ flex: 2, background: selectedDays.length === 0 ? "#1f4f47" : "linear-gradient(135deg,#7ee0c1,#3a9e84)", border: "none", color: selectedDays.length === 0 ? "#4a7a72" : "#0f2f2a", fontWeight: 700, fontSize: 13, borderRadius: 7, padding: "9px", cursor: selectedDays.length === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <Save size={13} />{isSaving ? "Saving…" : "Save Availability"}
        </button>
      </div>
    </div>
  );
};

// ─── Inline Stat Chip ──────────────────────────────────────────────────────
const InlineStat = ({ icon: Icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 11px", background: "rgba(126,224,193,0.05)", border: "1px solid rgba(126,224,193,0.1)", borderRadius: 8 }}>
    <Icon size={12} color="#7ee0c1" />
    <span style={{ fontSize: 11, color: "#5a8a82", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 12, color: "#c4ddd8", fontWeight: 700 }}>{value}</span>
  </div>
);

// ─── Section Card ──────────────────────────────────────────────────────────
const Section = ({ icon: Icon, title, children }) => (
  <div style={{ background: "#111f1d", border: "1px solid rgba(126,224,193,0.07)", borderRadius: 12, overflow: "hidden" }}>
    <div style={{ padding: "13px 18px", borderBottom: "1px solid rgba(126,224,193,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
      <Icon size={14} color="#7ee0c1" />
      <span style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 600, color: "#e0f0ec" }}>{title}</span>
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);

// ─── Info Row ──────────────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value, link }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
    <Icon size={12} color="#3a6a62" style={{ flexShrink: 0 }} />
    <span style={{ fontSize: 10.5, color: "#3a6a62", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", minWidth: 84 }}>{label}</span>
    {link ? (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "#7ee0c1", fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 3, marginLeft: "auto" }}>
        {value} <ExternalLink size={9} />
      </a>
    ) : (
      <span style={{ color: "#b4d0cc", fontSize: 12.5, marginLeft: "auto", textAlign: "right", fontWeight: 500 }}>{value}</span>
    )}
  </div>
);

// ─── Plan Feature ──────────────────────────────────────────────────────────
const PlanFeature = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
    <CheckCircle size={12} color="#2a6a5a" />
    <span style={{ color: "#3a5a52", fontSize: 12.5, lineHeight: 1.5 }}>{text}</span>
  </div>
);

// ─── Main ProfileModal ─────────────────────────────────────────────────────
const ProfileModal = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showAvailEditor, setShowAvailEditor] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery(mentorId);

  const handleBookSession = () => {
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (!isLoggedIn) { navigate(`/login?mentorId=${mentorId}`); return; }
    setIsBookingModalOpen(true);
  };
  const handleViewLTMPlans = () => navigate(`/mentor/${mentorId}/ltm-plans`);
  const handleSaveAvailability = async (av) => { console.log("Saving:", av); setShowAvailEditor(false); };

  if (isLoading) return (
    <div style={{ background: "#0a211e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 style={{ width: 32, height: 32, color: "#7ee0c1", animation: "spin 1s linear infinite" }} />
    </div>
  );
  if (isError || !mentor) return (
    <div style={{ background: "#0a211e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#e57373", marginBottom: 12, fontSize: 13 }}>Failed to load profile</p>
        <button onClick={() => navigate("/mentors")} style={{ background: "#7ee0c1", color: "#0a211e", padding: "8px 20px", borderRadius: 7, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
          Back to Mentors
        </button>
      </div>
    </div>
  );

  const skillsArray = mentor.currentSkills
    ? mentor.currentSkills.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean) : [];
  const areasArray = mentor.areasOfInterest
    ? mentor.areasOfInterest.split(/[,;]+/).map((s) => s.trim()).filter(Boolean) : [];
  const hasAvailability = Array.isArray(mentor.availability) && mentor.availability.some((d) => d.slots?.length > 0);
  const bioText = mentor.motivationStatement || mentor.bio || "";
  const bioLong = bioText.length > 260;
  const displayBio = showFullBio || !bioLong ? bioText : bioText.slice(0, 260) + "…";
  const initials = mentor.fullName
    ? mentor.fullName.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase() : "M";
  const joinDate = mentor.createdAt
    ? new Date(mentor.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,wght@0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .profile-grid { display:grid; grid-template-columns:1fr 330px; gap:20px; align-items:start; }
        @media(max-width:840px){ .profile-grid{ grid-template-columns:1fr !important; } .right-col{ position:static !important; top:auto !important; } }
        .back-btn:hover { background:rgba(126,224,193,0.07) !important; }
        .tag:hover { background:rgba(126,224,193,0.12) !important; border-color:rgba(126,224,193,0.3) !important; }
        .area-tag:hover { background:rgba(251,191,36,0.1) !important; border-color:rgba(251,191,36,0.3) !important; }
        .day-item:hover { border-color:rgba(126,224,193,0.25) !important; }
        .book-btn:hover { background:#68d4b0 !important; }
        .ltm-btn:hover { background:rgba(15,47,42,0.07) !important; }
        input[type="time"]::-webkit-calendar-picker-indicator { filter:invert(1) opacity(0.35); cursor:pointer; }
      `}</style>

      <div style={{ background: "#0a211e", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", color: "#fff" }}>



        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 60px", animation: "fadeUp 0.35s ease" }}>

          {/* ── Profile Header ─────────────────────────────────────────── */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              {mentor.profileImage ? (
                <img src={mentor.profileImage} alt={mentor.fullName} style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover", border: "1px solid rgba(126,224,193,0.18)" }} />
              ) : (
                <div style={{ width: 80, height: 80, borderRadius: 14, background: "linear-gradient(135deg,#1c4e46,#3a9e84)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "'Fraunces',serif", border: "1px solid rgba(126,224,193,0.18)", letterSpacing: "-0.5px" }}>
                  {initials}
                </div>
              )}
              {mentor.status === "approved" && (
                <div style={{ position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)", background: "#7ee0c1", color: "#0a211e", fontSize: 8.5, fontWeight: 800, padding: "2px 7px", borderRadius: 20, whiteSpace: "nowrap" }}>
                  ✓ VERIFIED
                </div>
              )}
            </div>

            {/* Name block */}
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7, alignItems: "center" }}>
                {mentor.mentorCategory && (
                  <span style={{ background: "rgba(126,224,193,0.07)", border: "1px solid rgba(126,224,193,0.16)", color: "#7ee0c1", padding: "2px 9px", borderRadius: 20, fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {mentor.mentorCategory}
                  </span>
                )}
                <span style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.18)", color: "#d4a847", padding: "2px 9px", borderRadius: 20, fontSize: 9.5, fontWeight: 700 }}>
                  ★ 5.0
                </span>
              </div>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 700, marginBottom: 4, letterSpacing: "-0.2px", lineHeight: 1.15, color: "#f0f8f6" }}>
                {mentor.fullName}
              </h1>
              <p style={{ color: "#7ee0c1", fontSize: 13, marginBottom: 10, fontWeight: 500 }}>
                {mentor.currentRole}
                {mentor.companyName && <span style={{ color: "#3a6a62" }}> · {mentor.companyName}</span>}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 11, color: "#4a7a72" }}>
                {mentor.location && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} color="#3a6a62" /> {mentor.location}</span>}
                {mentor.languages?.length > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Globe size={10} color="#3a6a62" /> {mentor.languages.join(", ")}</span>}
                {mentor.mentoringStyle && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={10} color="#3a6a62" /> {mentor.mentoringStyle}</span>}
                {joinDate && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Shield size={10} color="#3a6a62" /> Member since {joinDate}</span>}
              </div>
            </div>
          </div>

          {/* ── Compact Stats Row ─────────────────────────────────────────── */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
            <InlineStat icon={Award} label="Experience" value={`${mentor.yearsOfExperience}+ yrs`} />
            <InlineStat icon={Star} label="Rating" value="5.0 / 5" />
            <InlineStat icon={TrendingUp} label="Rate" value={`₹${mentor.hourlyRate?.toLocaleString()}/mo`} />
            {mentor.highestDegree && <InlineStat icon={GraduationCap} label="Degree" value={mentor.highestDegree.toUpperCase()} />}
            {mentor.email && <InlineStat icon={Mail} label="Email" value={mentor.email} />}
          </div>

          {/* ── Two Column Layout ─────────────────────────────────────────── */}
          <div className="profile-grid">

            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Bio */}
              {bioText && (
                <Section icon={Heart} title="About">
                  <p style={{ color: "#7a9e98", fontSize: 13, lineHeight: 1.8 }}>{displayBio}</p>
                  {bioLong && (
                    <button onClick={() => setShowFullBio(p => !p)} style={{ background: "none", border: "none", color: "#7ee0c1", fontSize: 11.5, fontWeight: 600, cursor: "pointer", marginTop: 8, padding: 0 }}>
                      {showFullBio ? "Show less ↑" : "Read more ↓"}
                    </button>
                  )}
                </Section>
              )}

              {/* Education & Career */}
              <Section icon={Briefcase} title="Education & Career">
                <InfoRow icon={Briefcase} label="Role" value={`${mentor.currentRole}${mentor.companyName ? ` @ ${mentor.companyName}` : ""}`} />
                {mentor.highestDegree && <InfoRow icon={GraduationCap} label="Degree" value={`${mentor.highestDegree.toUpperCase()} · ${mentor.fieldOfStudy}`} />}
                {mentor.schoolName && <InfoRow icon={BookOpen} label="Institution" value={mentor.schoolName} />}
                <InfoRow icon={Award} label="Experience" value={`${mentor.yearsOfExperience}+ years`} />
                {mentor.linkedinUrl && <InfoRow icon={Linkedin} label="LinkedIn" value="View Profile" link={mentor.linkedinUrl} />}
                {mentor.resumeLink && <InfoRow icon={ExternalLink} label="Portfolio" value="Open Link" link={mentor.resumeLink} />}
              </Section>

              {/* Contact */}
              <Section icon={MessageCircle} title="Contact">
                {mentor.email && <InfoRow icon={Mail} label="Email" value={mentor.email} />}
                {mentor.phone && <InfoRow icon={Phone} label="Phone" value={mentor.phone} />}
                {mentor.location && <InfoRow icon={MapPin} label="Location" value={mentor.location} />}
                {mentor.languages?.length > 0 && <InfoRow icon={Globe} label="Languages" value={mentor.languages.join(", ")} />}
              </Section>

              {/* Skills */}
              {skillsArray.length > 0 && (
                <Section icon={Zap} title="Skills & Expertise">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {skillsArray.map((skill, i) => (
                      <span key={i} className="tag" style={{ background: "rgba(126,224,193,0.05)", border: "1px solid rgba(126,224,193,0.12)", color: "#7ee0c1", padding: "4px 11px", borderRadius: 30, fontSize: 11.5, fontWeight: 500, cursor: "default", transition: "all 0.15s" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Areas of Interest */}
              {areasArray.length > 0 && (
                <Section icon={BookOpen} title="Areas of Interest">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {areasArray.map((area, i) => (
                      <span key={i} className="area-tag" style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.13)", color: "#c9973a", padding: "4px 11px", borderRadius: 30, fontSize: 11.5, fontWeight: 500, cursor: "default", transition: "all 0.15s" }}>
                        {area}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Free Trial */}
              {mentor.freeTrial && mentor.freeTrial.totalAllowed > mentor.freeTrial.usedCount && (
                <div style={{ background: "rgba(126,224,193,0.04)", border: "1px solid rgba(126,224,193,0.12)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <Star size={16} color="#7ee0c1" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 12.5, color: "#c4ddd8" }}>Free Trial Available</div>
                    <div style={{ fontSize: 11, color: "#4a7a72", marginTop: 2 }}>
                      {mentor.freeTrial.totalAllowed - mentor.freeTrial.usedCount} session{mentor.freeTrial.totalAllowed > 1 ? "s" : ""} remaining
                    </div>
                  </div>
                  <button onClick={handleBookSession} style={{ background: "#7ee0c1", color: "#0a211e", border: "none", padding: "6px 13px", borderRadius: 7, fontWeight: 700, fontSize: 11.5, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Claim Trial
                  </button>
                </div>
              )}

              {/* Availability */}
              <Section icon={Calendar} title="Weekly Availability">
                {showAvailEditor && (
                  <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(126,224,193,0.07)" }}>
                    <AvailabilityManager initialAvailability={mentor.availability || []} onSave={handleSaveAvailability} onCancel={() => setShowAvailEditor(false)} />
                  </div>
                )}

                {hasAvailability ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {mentor.availability.filter((d) => d.slots?.length > 0).map((dayData, i) => (
                      <div key={i} className="day-item" style={{ border: "1px solid rgba(126,224,193,0.08)", borderRadius: 9, overflow: "hidden", transition: "border-color 0.15s" }}>
                        <div style={{ padding: "9px 13px", display: "flex", alignItems: "center", gap: 8, background: "rgba(126,224,193,0.02)", borderBottom: "1px solid rgba(126,224,193,0.05)" }}>
                          <span style={{ fontWeight: 600, color: "#d4e8e4", fontSize: 12.5 }}>{dayData.day}</span>
                          <span style={{ marginLeft: "auto", fontSize: 10, color: "#3a6a62", fontWeight: 600 }}>{dayData.slots.length} slot{dayData.slots.length !== 1 ? "s" : ""}</span>
                        </div>
                        <div style={{ padding: "8px 13px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {dayData.slots.map((slot, si) => (
                            <div key={si} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(126,224,193,0.04)", border: "1px solid rgba(126,224,193,0.09)", borderRadius: 6, padding: "3px 9px" }}>
                              <Clock size={10} color="#3a6a62" />
                              <span style={{ fontSize: 11.5, color: "#a4c4be", fontWeight: 500 }}>{slot.startTime} – {slot.endTime}</span>
                              {slot.isBooked && <span style={{ fontSize: 9, background: "rgba(229,115,115,0.1)", color: "#e57373", padding: "1px 5px", borderRadius: 10, fontWeight: 700, border: "1px solid rgba(229,115,115,0.15)" }}>Booked</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !showAvailEditor && (
                    <div style={{ textAlign: "center", padding: "18px 0" }}>
                      <Clock size={24} color="#2a4a46" style={{ margin: "0 auto 8px", display: "block" }} />
                      <p style={{ color: "#3a6a62", fontWeight: 600, fontSize: 12, marginBottom: 3 }}>Availability not set</p>
                      <p style={{ color: "#2a4a46", fontSize: 11 }}>Check back soon or contact the mentor directly.</p>
                    </div>
                  )
                )}
              </Section>

            </div>

            {/* RIGHT — Pricing Card */}
            <div className="right-col" style={{ position: "sticky", top: 68 }}>

              <div style={{ background: "#f4e8d4", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(180,160,130,0.2)" }}>
                {/* Header */}
                <div style={{ background: "#0e2b27", padding: "20px 20px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 9.5, color: "#7ee0c1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px" }}>Mentorship Plan</span>
                    <span style={{ background: "rgba(126,224,193,0.1)", color: "#7ee0c1", fontSize: 9.5, padding: "2px 8px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(126,224,193,0.18)" }}>Popular</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 5 }}>
                    <span style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 700, color: "#f0f8f6", letterSpacing: "-1px", lineHeight: 1 }}>₹{mentor.hourlyRate?.toLocaleString()}</span>
                    <span style={{ color: "#7ee0c1", fontSize: 12 }}>/month</span>
                  </div>
                  <p style={{ color: "#3a6a62", fontSize: 11, lineHeight: 1.5 }}>Tailored mentorship to accelerate your career</p>
                </div>

                {/* Features */}
                <div style={{ padding: "16px 20px" }}>
                  <PlanFeature text="2 live calls per month (45 min each)" />
                  <PlanFeature text="Unlimited Q&A via chat" />
                  <PlanFeature text="Responses within 24 hours" />
                  <PlanFeature text="Hands-on project support" />
                  <PlanFeature text="Career roadmap & goal setting" />
                  <PlanFeature text="Resume & portfolio review" />

                  <div style={{ borderTop: "1px solid rgba(15,47,42,0.1)", margin: "13px 0 11px" }} />

                  {/* Mini mentor chip */}
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1c4e46,#3a9e84)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: "'Fraunces',serif", flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 11.5, color: "#1a2e2a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mentor.fullName}</div>
                      <div style={{ fontSize: 10, color: "#5a7a72" }}>{mentor.currentRole}</div>
                    </div>
                    <span style={{ fontSize: 11, color: "#1a2e2a", fontWeight: 700, flexShrink: 0 }}>★ 5.0</span>
                  </div>

                  <button onClick={handleBookSession} className="book-btn" style={{ width: "100%", background: "#7ee0c1", color: "#0a211e", border: "none", padding: "12px", borderRadius: 9, fontWeight: 700, fontSize: 13.5, cursor: "pointer", transition: "background 0.15s", marginBottom: 7, letterSpacing: "0.1px" }}>
                    Book a Session
                  </button>
                  <button onClick={handleViewLTMPlans} className="ltm-btn" style={{ width: "100%", background: "transparent", color: "#1a3d38", border: "1.5px solid rgba(15,47,42,0.25)", padding: "10px", borderRadius: 9, fontWeight: 700, fontSize: 12.5, cursor: "pointer", transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Zap size={12} /> View LTM Plans
                  </button>

                  <p style={{ textAlign: "center", fontSize: 10, color: "#8aada8", marginTop: 9 }}>🔒 Secure · Cancel anytime</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      {mentor && (
        <BookingModal mentor={mentor} isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      )}
    </>
  );
};

export default ProfileModal;




