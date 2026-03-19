

// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   MapPin, Star, Share2,
// //   ChevronDown, ChevronUp, Pencil, Save, X, Plus,
// //   Trash2, Loader2, Upload, Eye, CheckCircle,
// //   Clock, Calendar, Briefcase, BookOpen, Award, FileText,
// //   TrendingUp, Users, Zap, Globe, Phone, Mail,
// // } from 'lucide-react';
// // import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// // import { showToast } from '../../../utils/Toastprovider';

// // // ─── Design tokens ────────────────────────────────────────────
// // const CYAN = '#0098cc';
// // const DARK = '#062117';
// // const FONT = `"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// // const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// // const TABS = [
// //   { id: 'Overview', icon: <Award size={14} /> },
// //   { id: 'Case Studies', icon: <FileText size={14} /> },
// //   { id: 'Mentorship Topics', icon: <Zap size={14} /> },
// //   { id: 'Experience', icon: <Briefcase size={14} /> },
// // ];

// // // ─── Helpers ──────────────────────────────────────────────────
// // const formatDate = (ds) => {
// //   if (!ds) return 'N/A';
// //   return new Date(ds).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
// // };

// // const DAY_FROM_DATE = (dateStr) => {
// //   const D = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// //   return D[new Date(dateStr).getDay()];
// // };

// // const calcEndTime = (startTime) => {
// //   const [h, m] = startTime.split(':').map(Number);
// //   const total = h * 60 + m + 30;
// //   return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
// // };

// // const getTomorrow = () => {
// //   const d = new Date(); d.setDate(d.getDate() + 1);
// //   return d.toISOString().split('T')[0];
// // };

// // // ─── Micro components ─────────────────────────────────────────
// // const Pill = ({ label }) => (
// //   <span style={{
// //     fontFamily: FONT,
// //     display: 'inline-flex', alignItems: 'center',
// //     padding: '4px 13px', borderRadius: 100,
// //     fontSize: 12, fontWeight: 500, letterSpacing: '0.1px',
// //     background: `${CYAN}10`, border: `1px solid ${CYAN}28`, color: '#006a8e',
// //   }}>{label}</span>
// // );

// // const StatCard = ({ icon, label, value, accent }) => (
// //   <div style={{
// //     background: '#f6fafb',
// //     border: '1px solid #e4ecf0',
// //     borderRadius: 10, padding: '14px 16px',
// //     display: 'flex', alignItems: 'center', gap: 12,
// //   }}>
// //     <div style={{
// //       width: 38, height: 38, borderRadius: 8, flexShrink: 0,
// //       background: accent ? `${accent}12` : `${CYAN}10`,
// //       display: 'flex', alignItems: 'center', justifyContent: 'center',
// //     }}>
// //       {React.cloneElement(icon, { size: 16, color: accent || CYAN })}
// //     </div>
// //     <div>
// //       <p style={{ fontFamily: FONT, fontSize: 10, fontWeight: 600, color: '#8fa8b4', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 2px' }}>{label}</p>
// //       <p style={{ fontFamily: FONT, fontSize: 19, fontWeight: 700, color: '#0d1f2b', margin: 0, lineHeight: 1 }}>{value}</p>
// //     </div>
// //   </div>
// // );

// // const SectionHead = ({ icon, children }) => (
// //   <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #edf2f5' }}>
// //     <div style={{ width: 28, height: 28, borderRadius: 7, background: `${CYAN}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //       {React.cloneElement(icon, { size: 14, color: CYAN })}
// //     </div>
// //     <h2 style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: '#0d1f2b', margin: 0 }}>{children}</h2>
// //   </div>
// // );

// // const EditField = ({ value, onChange, placeholder, multiline, type = 'text' }) => {
// //   const base = {
// //     fontFamily: FONT, width: '100%', padding: '9px 13px',
// //     border: '1.5px solid #dce8ed', borderRadius: 8,
// //     fontSize: 13, color: '#0d1f2b', background: '#fff',
// //     outline: 'none', boxSizing: 'border-box', lineHeight: 1.55,
// //     transition: 'border-color 0.15s',
// //   };
// //   return multiline
// //     ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ ...base, resize: 'none' }} />
// //     : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
// // };

// // const FieldLabel = ({ children }) => (
// //   <p style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: '#8fa8b4', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 5px' }}>{children}</p>
// // );

// // const ReadValue = ({ value }) => (
// //   <p style={{
// //     fontFamily: FONT, fontSize: 13, fontWeight: 500, color: '#1e3a4a',
// //     padding: '9px 13px', background: '#f6fafb',
// //     border: '1px solid #e4ecf0', borderRadius: 8,
// //     minHeight: 38, display: 'flex', alignItems: 'center', margin: 0,
// //   }}>{value || <span style={{ color: '#b8cdd6', fontStyle: 'italic' }}>—</span>}</p>
// // );

// // const InfoCard = ({ label, value, isEditing, field, formData, set, type }) => (
// //   <div>
// //     <FieldLabel>{label}</FieldLabel>
// //     {isEditing
// //       ? <EditField type={type || 'text'} value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={label} />
// //       : <ReadValue value={formData[field]} />
// //     }
// //   </div>
// // );

// // const ContactRow = ({ icon, value }) =>
// //   value ? (
// //     <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
// //       <div style={{ width: 30, height: 30, borderRadius: 7, background: '#f0f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //         {React.cloneElement(icon, { size: 13, color: '#8fa8b4' })}
// //       </div>
// //       <span style={{ fontFamily: FONT, fontSize: 12, color: '#4a6b7a', fontWeight: 500 }}>{value}</span>
// //     </div>
// //   ) : null;

// // // ─── WeeklyAvailability ───────────────────────────────────────
// // const WeeklyAvailability = ({ availability, isEditing, setFormData }) => {
// //   const [newDate, setNewDate] = useState('');
// //   const [newTime, setNewTime] = useState('09:00');
// //   const [error, setError] = useState('');

// //   const flatSlots = (availability || [])
// //     .flatMap(dayEntry =>
// //       (dayEntry.slots || []).map(slot => ({
// //         ...slot,
// //         day: dayEntry.day,
// //         dateStr: slot.date ? new Date(slot.date).toISOString().split('T')[0] : null,
// //       }))
// //     )
// //     .filter(s => s.dateStr)
// //     .sort((a, b) => new Date(a.dateStr) - new Date(b.dateStr));

// //   const addSession = () => {
// //     setError('');

// //     if (!newDate) {
// //       setError('Please select a date.');
// //       return;
// //     }

// //     const endTime = calcEndTime(newTime);
// //     const [newSH, newSM] = newTime.split(':').map(Number);
// //     const [newEH, newEM] = endTime.split(':').map(Number);
// //     const newStart = newSH * 60 + newSM;
// //     const newEnd = newEH * 60 + newEM;

// //     // Check for time overlap on the SAME date (multiple sessions allowed, same time not)
// //     const sameDaySlots = flatSlots.filter(s => s.dateStr === newDate);

// //     for (const existing of sameDaySlots) {
// //       const [exSH, exSM] = existing.startTime.split(':').map(Number);
// //       const [exEH, exEM] = existing.endTime.split(':').map(Number);
// //       const exStart = exSH * 60 + exSM;
// //       const exEnd = exEH * 60 + exEM;

// //       // Overlap check: new slot overlaps if newStart < exEnd AND newEnd > exStart
// //       if (newStart < exEnd && newEnd > exStart) {
// //         setError(
// //           `Time conflict: ${newTime}–${endTime} overlaps with existing slot ${existing.startTime}–${existing.endTime} on this date.`
// //         );
// //         return;
// //       }
// //     }

// //     const dayName = DAY_FROM_DATE(newDate);

// //     setFormData(p => {
// //       const avail = p.availability.map(d => ({ ...d, slots: [...(d.slots || [])] }));
// //       const di = avail.findIndex(d => d.day === dayName);
// //       const slot = { date: new Date(newDate), startTime: newTime, endTime, isBooked: false };
// //       if (di >= 0) avail[di] = { ...avail[di], slots: [...avail[di].slots, slot] };
// //       else avail.push({ day: dayName, slots: [slot] });
// //       return { ...p, availability: avail };
// //     });

// //     setNewDate('');
// //     setNewTime('09:00');
// //   };
// //   const removeSession = (dateStr) => {
// //     const dayName = DAY_FROM_DATE(dateStr);
// //     setFormData(p => ({
// //       ...p,
// //       availability: p.availability.map(d =>
// //         d.day !== dayName ? d : {
// //           ...d,
// //           slots: d.slots.filter(s => new Date(s.date).toISOString().split('T')[0] !== dateStr),
// //         }
// //       ),
// //     }));
// //   };

// //   return (
// //     <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

// //       {/* Add row */}
// //       {isEditing && (
// //         <div style={{
// //           background: '#f6fafb', border: `1.5px dashed ${CYAN}45`,
// //           borderRadius: 12, padding: '18px 20px',
// //         }}>
// //           <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#0d1f2b', margin: '0 0 14px' }}>Add Session</p>

// //           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
// //             <div>
// //               <FieldLabel>Date</FieldLabel>
// //               <input type="date" value={newDate} min={getTomorrow()}
// //                 onChange={e => { setNewDate(e.target.value); setError(''); }}
// //                 style={{
// //                   fontFamily: FONT, fontSize: 13, fontWeight: 500,
// //                   border: `1.5px solid ${error && !newDate ? '#f87171' : '#dce8ed'}`,
// //                   borderRadius: 8, padding: '8px 12px',
// //                   color: '#0d1f2b', background: '#fff', outline: 'none',
// //                 }}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel>Start Time</FieldLabel>
// //               <input type="time" value={newTime} min="06:00" max="23:00"
// //                 onChange={e => setNewTime(e.target.value)}
// //                 style={{
// //                   fontFamily: FONT, fontSize: 13, fontWeight: 500,
// //                   border: '1.5px solid #dce8ed', borderRadius: 8,
// //                   padding: '8px 12px', color: '#0d1f2b', background: '#fff', outline: 'none',
// //                 }}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel>End Time</FieldLabel>
// //               <div style={{
// //                 fontFamily: FONT, fontSize: 13, fontWeight: 600,
// //                 padding: '8px 14px', borderRadius: 8,
// //                 border: '1.5px solid #e4ecf0', background: '#edf2f5',
// //                 color: '#4a6b7a', minWidth: 80,
// //               }}>
// //                 {calcEndTime(newTime)}
// //               </div>
// //             </div>

// //             <button onClick={addSession} style={{
// //               fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6,
// //               padding: '9px 18px', borderRadius: 8,
// //               border: 'none', background: CYAN,
// //               color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
// //             }}>
// //               <Plus size={14} /> Add
// //             </button>
// //           </div>

// //           {error && (
// //             <div style={{
// //               marginTop: 10, display: 'flex', alignItems: 'center', gap: 6,
// //               background: '#fff5f5', border: '1px solid #fca5a5',
// //               borderRadius: 7, padding: '7px 11px',
// //               fontFamily: FONT, fontSize: 12, color: '#dc2626',
// //             }}>
// //               <X size={12} /> {error}
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Session list */}
// //       {flatSlots.length === 0 ? (
// //         <div style={{
// //           textAlign: 'center', padding: '40px 24px',
// //           background: '#f6fafb', border: '1px dashed #d1dde3', borderRadius: 12,
// //         }}>
// //           <Calendar size={26} color="#c5d5dd" style={{ margin: '0 auto 10px', display: 'block' }} />
// //           <p style={{ fontFamily: FONT, fontSize: 13, color: '#b0c4cc', margin: 0 }}>No sessions scheduled yet.</p>
// //         </div>
// //       ) : (
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
// //           <div style={{
// //             display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
// //             fontFamily: FONT, fontSize: 12, color: '#006a8e', fontWeight: 600,
// //           }}>
// //             <CheckCircle size={13} color={CYAN} />
// //             {flatSlots.length} session{flatSlots.length > 1 ? 's' : ''} scheduled
// //           </div>

// //           {flatSlots.map(slot => {
// //             const d = new Date(slot.dateStr);
// //             return (
// //               <div key={slot.dateStr} style={{
// //                 display: 'flex', alignItems: 'center', gap: 14,
// //                 padding: '11px 16px',
// //                 background: slot.isBooked ? '#fff8f2' : '#fff',
// //                 border: `1px solid ${slot.isBooked ? '#fed7aa' : '#e4ecf0'}`,
// //                 borderRadius: 10,
// //               }}>
// //                 {/* Date badge */}
// //                 <div style={{
// //                   flexShrink: 0, width: 46, textAlign: 'center',
// //                   padding: '6px 4px', borderRadius: 8,
// //                   background: slot.isBooked ? '#fed7aa' : `${CYAN}10`,
// //                   border: `1px solid ${slot.isBooked ? '#fb923c' : `${CYAN}22`}`,
// //                 }}>
// //                   <p style={{ fontFamily: FONT, fontSize: 9, fontWeight: 700, color: slot.isBooked ? '#c2410c' : CYAN, textTransform: 'uppercase', letterSpacing: '0.3px', margin: 0 }}>
// //                     {d.toLocaleDateString('en-IN', { weekday: 'short' })}
// //                   </p>
// //                   <p style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: slot.isBooked ? '#c2410c' : '#0d1f2b', lineHeight: 1.1, margin: '1px 0' }}>
// //                     {d.getDate()}
// //                   </p>
// //                   <p style={{ fontFamily: FONT, fontSize: 9, color: '#8fa8b4', margin: 0 }}>
// //                     {d.toLocaleDateString('en-IN', { month: 'short' })}
// //                   </p>
// //                 </div>

// //                 {/* Info */}
// //                 <div style={{ flex: 1 }}>
// //                   <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#0d1f2b', margin: '0 0 2px' }}>
// //                     {slot.startTime} — {slot.endTime}
// //                   </p>
// //                   <p style={{ fontFamily: FONT, fontSize: 11, color: '#8fa8b4', margin: 0 }}>
// //                     {d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} · 30 min
// //                   </p>
// //                 </div>

// //                 {slot.isBooked && (
// //                   <span style={{
// //                     fontFamily: FONT, fontSize: 10, fontWeight: 700,
// //                     padding: '3px 9px', borderRadius: 20,
// //                     background: '#fed7aa', color: '#c2410c',
// //                     border: '1px solid #fb923c', flexShrink: 0,
// //                   }}>Booked</span>
// //                 )}

// //                 {isEditing && !slot.isBooked && (
// //                   <button onClick={() => removeSession(slot.dateStr)} style={{
// //                     background: '#fff0f0', border: '1px solid #fca5a5',
// //                     color: '#ef4444', borderRadius: 7,
// //                     padding: '6px 8px', cursor: 'pointer',
// //                     display: 'flex', alignItems: 'center', flexShrink: 0,
// //                   }}>
// //                     <Trash2 size={12} />
// //                   </button>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // ─────────────────────────────────────────────────────────────
// // //  MentorProfile — Main
// // // ─────────────────────────────────────────────────────────────
// // const MentorProfile = () => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [activeTab, setActiveTab] = useState('Overview');
// //   const [showMore, setShowMore] = useState(false);
// //   const [formData, setFormData] = useState({ availability: DAYS.map(d => ({ day: d, slots: [] })) });
// //   const [email, setEmail] = useState('');
// //   const [files, setFiles] = useState({ resume: null, portfolio: null, video: null });

// //   const resumeRef = useRef(null);
// //   const portfolioRef = useRef(null);
// //   const videoRef = useRef(null);

// //   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
// //   const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

// //   useEffect(() => {
// //     const ud = localStorage.getItem('userData');
// //     if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } }
// //   }, []);

// //   useEffect(() => { if (email) getMentorDetails(email); }, [email]);

// //   useEffect(() => {
// //     if (data?.data) {
// //       const merged = DAYS.map(d => {
// //         const ex = data.data.availability?.find(a => a.day === d);
// //         return { day: d, slots: ex?.slots || [] };
// //       });
// //       setFormData({ ...data.data, availability: merged });
// //     }
// //   }, [data]);

// //   const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

// //   const updateSlot = (di, si, f, v) => setFormData(p => ({
// //     ...p,
// //     availability: p.availability.map((day, dIdx) =>
// //       dIdx !== di ? day : {
// //         ...day,
// //         slots: day.slots.map((slot, sIdx) =>
// //           sIdx !== si ? slot : { ...slot, [f]: v }
// //         ),
// //       }
// //     ),
// //   }));

// //   const addSlot = (di) => setFormData(p => ({
// //     ...p,
// //     availability: p.availability.map((day, dIdx) =>
// //       dIdx !== di ? day : {
// //         ...day,
// //         slots: [...day.slots, { date: new Date(), startTime: '06:00', endTime: '06:30', isBooked: false }],
// //       }
// //     ),
// //   }));

// //   const removeSlot = (di, si) => setFormData(p => ({
// //     ...p,
// //     availability: p.availability.map((day, dIdx) =>
// //       dIdx !== di ? day : { ...day, slots: day.slots.filter((_, sIdx) => sIdx !== si) }
// //     ),
// //   }));

// //   const handleSave = async () => {
// //     try {
// //       // Flatten: strip day names, send only date + time per slot
// //       const flatAvailability = (formData.availability || [])
// //         .flatMap(dayEntry =>
// //           (dayEntry.slots || []).map(slot => ({
// //             date: slot.date,
// //             startTime: slot.startTime,
// //             endTime: slot.endTime,
// //             isBooked: slot.isBooked || false,
// //           }))
// //         )
// //         .filter(slot => slot.date); // drop legacy slots with no date

// //       await updateMentorDetails({
// //         email,
// //         ...formData,
// //         availability: flatAvailability,   // ← flat array, no day names
// //       }).unwrap();

// //       await getMentorDetails(email);
// //       setIsEditing(false);
// //       setFiles({ resume: null, portfolio: null, video: null });
// //       showToast('Profile updated successfully!', 'success');
// //     } catch {
// //       showToast('Failed to update profile.');
// //     }
// //   };

// //   const handleCancel = () => {
// //     if (data?.data) {
// //       const merged = DAYS.map(d => {
// //         const ex = data.data.availability?.find(a => a.day === d);
// //         return { day: d, slots: ex?.slots || [] };
// //       });
// //       setFormData({ ...data.data, availability: merged });
// //     }
// //     setFiles({ resume: null, portfolio: null, video: null });
// //     setIsEditing(false);
// //   };

// //   const skills = formData.currentSkills ? formData.currentSkills.split(',').map(s => s.trim()).filter(Boolean) : [];
// //   const areas = formData.areasOfInterest ? formData.areasOfInterest.split(',').map(s => s.trim()).filter(Boolean) : [];
// //   const bio = formData.whyMentor || '';
// //   const bioShort = bio.length > 200 ? bio.slice(0, 200) + '…' : bio;

// //   // ── Loading ──────────────────────────────────────────────
// //   if (isLoading) return (
// //     <div style={{ fontFamily: FONT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f6f8' }}>
// //       <div style={{ background: '#fff', borderRadius: 14, padding: '48px 56px', textAlign: 'center', border: '1px solid #e4ecf0' }}>
// //         <Loader2 size={32} style={{ color: CYAN, animation: 'spin 1s linear infinite', margin: '0 auto 14px', display: 'block' }} />
// //         <p style={{ fontFamily: FONT, color: '#8fa8b4', fontSize: 14, margin: 0 }}>Loading profile…</p>
// //       </div>
// //     </div>
// //   );

// //   if (error || !formData || Object.keys(formData).length < 2) return (
// //     <div style={{ fontFamily: FONT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f6f8' }}>
// //       <div style={{ background: '#fff', borderRadius: 14, padding: '48px 56px', textAlign: 'center', border: '1px solid #e4ecf0' }}>
// //         <X size={32} style={{ color: '#f87171', margin: '0 auto 14px', display: 'block' }} />
// //         <p style={{ fontFamily: FONT, color: '#8fa8b4', fontSize: 14, margin: 0 }}>Failed to load profile. Please refresh.</p>
// //       </div>
// //     </div>
// //   );

// //   const avatarLetter = formData.fullName?.charAt(0)?.toUpperCase() || '?';

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
// //         @keyframes spin   { to { transform: rotate(360deg); } }
// //         @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
// //         * { font-family:${FONT}; -webkit-font-smoothing:antialiased; box-sizing:border-box; }
// //         input[type="time"]::-webkit-calendar-picker-indicator,
// //         input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.45; cursor: pointer; }
// //         ::-webkit-scrollbar { width: 4px; height: 4px; }
// //         ::-webkit-scrollbar-track { background: transparent; }
// //         ::-webkit-scrollbar-thumb { background: #c5d5dd; border-radius: 4px; }
// //         textarea::placeholder, input::placeholder { color: #a8bec8; }
// //         .mp-tab:hover { color: #0d1f2b !important; }
// //         .mp-btn:hover { opacity: 0.88; }
// //         .mp-file-label:hover { border-color: ${CYAN} !important; background: ${CYAN}06 !important; }
// //         input:focus, textarea:focus { border-color: ${CYAN} !important; }
// //       `}</style>

// //       <div style={{ fontFamily: FONT, minHeight: '100vh', background: '#f1f6f8', display: 'flex', flexDirection: 'column' }}>

// //         {/* ══ BANNER ══════════════════════════════════════════ */}
// //         <div style={{
// //           height: 148, position: 'relative', overflow: 'hidden', flexShrink: 0,
// //           background: `linear-gradient(135deg, ${DARK} 0%, #0b3248 50%, #074060 100%)`,
// //         }}>
// //           {/* Subtle geometric lines */}
// //           {[
// //             { top: '-20px', left: '60%', w: 180, h: 180 },
// //             { top: '30px', left: '75%', w: 90, h: 90 },
// //             { top: '-40px', left: '85%', w: 140, h: 140 },
// //           ].map((s, i) => (
// //             <div key={i} style={{
// //               position: 'absolute', top: s.top, left: s.left,
// //               width: s.w, height: s.h, borderRadius: '50%',
// //               border: '1px solid rgba(0,152,204,0.12)',
// //               pointerEvents: 'none',
// //             }} />
// //           ))}

// //           {/* Edit / Save / Cancel buttons */}
// //           <div style={{ position: 'absolute', top: 18, right: 22, display: 'flex', gap: 9, zIndex: 10 }}>
// //             {!isEditing ? (
// //               <button onClick={() => setIsEditing(true)} className="mp-btn" style={{
// //                 fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
// //                 padding: '8px 18px', borderRadius: 8,
// //                 border: '1.5px solid rgba(255,255,255,0.3)',
// //                 background: 'rgba(255,255,255,0.08)',
// //                 color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
// //               }}>
// //                 <Pencil size={14} /> Edit Profile
// //               </button>
// //             ) : (
// //               <>
// //                 <button onClick={handleSave} disabled={isUpdating} className="mp-btn" style={{
// //                   fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
// //                   padding: '8px 18px', borderRadius: 8,
// //                   border: 'none', background: CYAN,
// //                   color: '#fff', fontSize: 13, fontWeight: 600,
// //                   cursor: 'pointer', opacity: isUpdating ? 0.65 : 1,
// //                 }}>
// //                   {isUpdating ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
// //                   {isUpdating ? 'Saving…' : 'Save Changes'}
// //                 </button>
// //                 <button onClick={handleCancel} disabled={isUpdating} style={{
// //                   fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
// //                   padding: '8px 16px', borderRadius: 8,
// //                   border: '1.5px solid rgba(255,255,255,0.28)',
// //                   background: 'rgba(255,255,255,0.06)',
// //                   color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
// //                 }}>
// //                   <X size={14} /> Cancel
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* ══ BODY ════════════════════════════════════════════ */}
// //         <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

// //           {/* ── SIDEBAR ───────────────────────────────────────── */}
// //           <aside style={{
// //             width: 300, flexShrink: 0,
// //             background: '#fff', borderRight: '1px solid #e4ecf0',
// //             padding: '0 20px 40px', overflowY: 'auto',
// //             display: 'flex', flexDirection: 'column', gap: 0,
// //           }}>

// //             {/* Avatar strip */}
// //             <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: -40, marginBottom: 16, position: 'relative', zIndex: 5 }}>
// //               <div style={{
// //                 width: 82, height: 82, borderRadius: 14, flexShrink: 0,
// //                 border: '3px solid #fff',
// //                 background: `linear-gradient(135deg, ${CYAN}20, ${DARK}20)`,
// //                 display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                 fontSize: 30, fontWeight: 800, color: CYAN,
// //               }}>
// //                 {avatarLetter}
// //               </div>
// //             </div>

// //             {/* Name / role */}
// //             <div style={{ marginBottom: 16 }}>
// //               {isEditing ? (
// //                 <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
// //                   <EditField value={formData.currentRole || ''} onChange={e => set('currentRole', e.target.value)} placeholder="Current Role" />
// //                   <EditField value={formData.fullName || ''} onChange={e => set('fullName', e.target.value)} placeholder="Full Name" />
// //                 </div>
// //               ) : (
// //                 <>
// //                   <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: CYAN, margin: '0 0 3px', letterSpacing: '0.3px' }}>
// //                     {formData.currentRole || 'Mentor'}
// //                   </p>
// //                   <h1 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: '#0d1f2b', lineHeight: 1.2, margin: '0 0 2px' }}>
// //                     {formData.fullName || 'Your Name'}
// //                   </h1>
// //                   {formData.companyName && (
// //                     <p style={{ fontFamily: FONT, fontSize: 12, color: '#8fa8b4', margin: 0 }}>{formData.companyName}</p>
// //                   )}
// //                 </>
// //               )}
// //               <p style={{ fontFamily: FONT, fontSize: 11, color: '#b8cdd6', margin: '6px 0 0' }}>
// //                 Member since {formatDate(formData.createdAt)}
// //               </p>
// //             </div>

// //             {/* Rating */}
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
// //               <Star size={14} fill={CYAN} style={{ color: CYAN }} />
// //               <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: '#0d1f2b' }}>
// //                 {formData.rating || '0.0'}
// //               </span>
// //               <span style={{ fontFamily: FONT, fontSize: 12, color: '#8fa8b4' }}>
// //                 ({formData.reviewCount || 0} reviews)
// //               </span>
// //             </div>

// //             <div style={{ height: 1, background: '#edf2f5', margin: '0 0 16px' }} />

// //             {/* Contact */}
// //             {!isEditing ? (
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
// //                 <ContactRow icon={<MapPin />} value={formData.location} />
// //                 <ContactRow icon={<Mail />} value={formData.email} />
// //                 <ContactRow icon={<Phone />} value={formData.phone} />
// //               </div>
// //             ) : (
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
// //                 <EditField value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="Location" />
// //                 <EditField value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="Phone number" />
// //               </div>
// //             )}

// //             <div style={{ height: 1, background: '#edf2f5', margin: '0 0 16px' }} />

// //             {/* Stats */}
// //             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
// //               <StatCard icon={<TrendingUp />} label="Sessions" value={formData.completedBookings || 0} />
// //               <StatCard icon={<Users />} label="Mentees" value={formData.totalMentees || 0} />
// //               <StatCard icon={<Clock />} label="Exp. Yrs" value={formData.yearsOfExperience || '—'} accent="#7c3aed" />
// //               <StatCard icon={<Award />} label="Rating" value={formData.rating || '—'} accent="#d97706" />
// //             </div>

// //             <div style={{ height: 1, background: '#edf2f5', margin: '0 0 16px' }} />

// //             {/* Bio snippet */}
// //             <div style={{ marginBottom: 16 }}>
// //               <p style={{ fontFamily: FONT, fontSize: 12, color: '#4a6b7a', lineHeight: 1.8, margin: 0 }}>
// //                 {showMore ? bio : bioShort}
// //               </p>
// //               {bio.length > 200 && (
// //                 <button onClick={() => setShowMore(!showMore)} style={{
// //                   fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 4,
// //                   marginTop: 6, fontSize: 11, fontWeight: 600,
// //                   color: CYAN, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
// //                 }}>
// //                   {showMore ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />Show more</>}
// //                 </button>
// //               )}
// //             </div>

// //             <div style={{ height: 1, background: '#edf2f5', margin: '0 0 16px' }} />

// //             {/* Rate card */}
// //             <div style={{
// //               borderRadius: 12, padding: '16px 18px',
// //               background: DARK, color: '#fff', marginBottom: 16,
// //             }}>
// //               <p style={{ fontFamily: FONT, fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 6px' }}>
// //                 Hourly Rate
// //               </p>
// //               <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: isEditing ? 10 : 0 }}>
// //                 <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800 }}>₹{formData.hourlyRate || '0'}</span>
// //                 {isEditing ? (
// //                   <input
// //                     value={formData.sessionDuration || ''}
// //                     onChange={e => set('sessionDuration', e.target.value)}
// //                     placeholder="e.g. 45-min"
// //                     style={{
// //                       fontFamily: FONT, fontSize: 12,
// //                       background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
// //                       borderRadius: 6, padding: '5px 10px',
// //                       color: '#fff', outline: 'none', width: 90,
// //                     }}
// //                   />
// //                 ) : (
// //                   <span style={{ fontFamily: FONT, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
// //                     {formData.sessionDuration || 'per session'}
// //                   </span>
// //                 )}
// //               </div>
// //             </div>

// //             {/* LinkedIn */}
// //             <div style={{ borderTop: '1px solid #edf2f5', paddingTop: 14 }}>
// //               {isEditing ? (
// //                 <>
// //                   <FieldLabel>LinkedIn URL</FieldLabel>
// //                   <EditField value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" />
// //                 </>
// //               ) : formData.linkedinUrl ? (
// //                 <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{
// //                   fontFamily: FONT, fontSize: 12, fontWeight: 600, color: CYAN,
// //                   display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none',
// //                 }}>
// //                   <Globe size={13} /> View LinkedIn Profile
// //                 </a>
// //               ) : null}
// //             </div>
// //           </aside>

// //           {/* ── MAIN CONTENT ──────────────────────────────────── */}
// //           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', minWidth: 0 }}>

// //             {/* Tab strip */}
// //             <div style={{
// //               background: '#fff', borderBottom: '1px solid #e4ecf0',
// //               padding: '0 28px', position: 'sticky', top: 0, zIndex: 10,
// //               display: 'flex', gap: 0, overflowX: 'auto',
// //             }}>
// //               {TABS.map(tab => {
// //                 const active = activeTab === tab.id;
// //                 return (
// //                   <button key={tab.id} className="mp-tab" onClick={() => setActiveTab(tab.id)} style={{
// //                     fontFamily: FONT,
// //                     display: 'flex', alignItems: 'center', gap: 6,
// //                     padding: '14px 20px',
// //                     fontSize: 13, fontWeight: active ? 700 : 500,
// //                     color: active ? '#0d1f2b' : '#8fa8b4',
// //                     borderTop: 'none', borderLeft: 'none', borderRight: 'none',
// //                     borderBottom: `2px solid ${active ? CYAN : 'transparent'}`,
// //                     background: 'none', cursor: 'pointer',
// //                     whiteSpace: 'nowrap', transition: 'all 0.15s', marginBottom: -1,
// //                   }}>
// //                     {React.cloneElement(tab.icon, { color: active ? CYAN : '#8fa8b4' })}
// //                     {tab.id}
// //                   </button>
// //                 );
// //               })}
// //             </div>

// //             {/* Content area */}
// //             <div style={{ padding: '28px 32px 60px', animation: 'fadeUp 0.22s ease both', maxWidth: 860 }}>

// //               {/* ── OVERVIEW ──────────────────────────────────── */}
// //               {activeTab === 'Overview' && (
// //                 <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

// //                   <section>
// //                     <SectionHead icon={<Award />}>
// //                       About {formData.fullName || 'Mentor'}
// //                     </SectionHead>
// //                     {isEditing ? (
// //                       <EditField
// //                         value={formData.whyMentor || ''}
// //                         onChange={e => set('whyMentor', e.target.value)}
// //                         placeholder="Share your professional journey and mentoring goals…"
// //                         multiline
// //                       />
// //                     ) : (
// //                       <p style={{ fontFamily: FONT, fontSize: 13, color: '#4a6b7a', lineHeight: 1.9, margin: 0 }}>
// //                         {formData.whyMentor || <span style={{ fontStyle: 'italic', color: '#b8cdd6' }}>No bio provided.</span>}
// //                       </p>
// //                     )}
// //                   </section>

// //                   <section>
// //                     <SectionHead icon={<BookOpen />}>Mentorship Expertise</SectionHead>
// //                     {isEditing ? (
// //                       <EditField
// //                         value={formData.currentSkills || ''}
// //                         onChange={e => set('currentSkills', e.target.value)}
// //                         placeholder="React, Node.js, Python… (comma-separated)"
// //                         multiline
// //                       />
// //                     ) : skills.length > 0 ? (
// //                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
// //                         {skills.map((s, i) => <Pill key={i} label={s} />)}
// //                       </div>
// //                     ) : (
// //                       <p style={{ fontFamily: FONT, fontSize: 12, color: '#b8cdd6', fontStyle: 'italic', margin: 0 }}>No skills listed.</p>
// //                     )}
// //                   </section>

// //                   <section>
// //                     <SectionHead icon={<CheckCircle />}>Work History &amp; Feedback</SectionHead>
// //                     <div style={{
// //                       background: `${CYAN}06`, border: `1px solid ${CYAN}18`,
// //                       borderRadius: 10, padding: '16px 20px',
// //                       fontFamily: FONT, fontSize: 13, color: '#4a6b7a',
// //                     }}>
// //                       {formData.completedBookings > 0
// //                         ? `${formData.completedBookings} completed session${formData.completedBookings > 1 ? 's' : ''}.`
// //                         : 'Be the first to book a session with this mentor.'}
// //                     </div>
// //                   </section>
// //                 </div>
// //               )}

// //               {/* ── CASE STUDIES ──────────────────────────────── */}
// //               {activeTab === 'Case Studies' && (
// //                 <div>
// //                   <SectionHead icon={<FileText />}>Documents &amp; Media</SectionHead>
// //                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 14 }}>
// //                     {[
// //                       { label: 'Resume / CV', field: 'resumeLink', accept: '.pdf,.doc,.docx', ref: resumeRef },
// //                       { label: 'Portfolio', field: 'portfolioLink', accept: '.pdf,.ppt,.pptx', ref: portfolioRef },
// //                       { label: 'Video Intro', field: 'videoLink', accept: 'video/*', ref: videoRef },
// //                     ].map(({ label, field, accept, ref }) => (
// //                       <div key={field} style={{
// //                         border: '1px solid #e4ecf0', borderRadius: 12,
// //                         padding: '18px 18px', background: '#fff',
// //                       }}>
// //                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isEditing ? 14 : 6 }}>
// //                           <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#0d1f2b', margin: 0 }}>{label}</p>
// //                           {!isEditing && formData[field] && (
// //                             <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{
// //                               fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 5,
// //                               fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 20,
// //                               border: `1px solid ${CYAN}`, color: CYAN, textDecoration: 'none',
// //                             }}>
// //                               <Eye size={12} /> View
// //                             </a>
// //                           )}
// //                           {!isEditing && !formData[field] && (
// //                             <span style={{ fontFamily: FONT, fontSize: 11, color: '#b8cdd6', fontStyle: 'italic' }}>Not uploaded</span>
// //                           )}
// //                         </div>
// //                         {isEditing && (
// //                           <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// //                             <input ref={ref} type="file" accept={accept} style={{ display: 'none' }} id={`f-${field}`}
// //                               onChange={e => { const f = e.target.files[0]; if (f) setFiles(p => ({ ...p, [field.replace('Link', '')]: f })); }}
// //                             />
// //                             <label htmlFor={`f-${field}`} className="mp-file-label" style={{
// //                               fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
// //                               padding: '10px 13px', border: `1.5px dashed ${CYAN}35`,
// //                               borderRadius: 8, cursor: 'pointer', fontSize: 12, color: '#8fa8b4',
// //                               transition: 'all 0.15s',
// //                             }}>
// //                               <Upload size={13} color={CYAN} /> Upload file
// //                             </label>
// //                             <EditField value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder="Or paste a URL…" />
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* ── MENTORSHIP TOPICS ─────────────────────────── */}
// //               {activeTab === 'Mentorship Topics' && (
// //                 <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

// //                   <section>
// //                     <SectionHead icon={<Zap />}>Areas of Interest</SectionHead>
// //                     {isEditing ? (
// //                       <EditField
// //                         value={formData.areasOfInterest || ''}
// //                         onChange={e => set('areasOfInterest', e.target.value)}
// //                         placeholder="Web Development, Cloud, DevOps… (comma-separated)"
// //                         multiline
// //                       />
// //                     ) : areas.length > 0 ? (
// //                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
// //                         {areas.map((a, i) => <Pill key={i} label={a} />)}
// //                       </div>
// //                     ) : (
// //                       <p style={{ fontFamily: FONT, fontSize: 12, color: '#b8cdd6', fontStyle: 'italic', margin: 0 }}>No topics listed.</p>
// //                     )}
// //                   </section>

// //                   <section>
// //                     <SectionHead icon={<BookOpen />}>Mentoring Style</SectionHead>
// //                     {isEditing ? (
// //                       <EditField value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g., Collaborative, Goal-oriented, Hands-on" />
// //                     ) : (
// //                       <ReadValue value={formData.mentoringStyle} />
// //                     )}
// //                   </section>

// //                   <section>
// //                     <SectionHead icon={<Globe />}>Languages</SectionHead>
// //                     {formData.languages?.length > 0 ? (
// //                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
// //                         {formData.languages.map((l, i) => <Pill key={i} label={l} />)}
// //                       </div>
// //                     ) : (
// //                       <p style={{ fontFamily: FONT, fontSize: 12, color: '#b8cdd6', fontStyle: 'italic', margin: 0 }}>No languages added.</p>
// //                     )}
// //                   </section>
// //                 </div>
// //               )}

// //               {/* ── EXPERIENCE ────────────────────────────────── */}
// //               {activeTab === 'Experience' && (
// //                 <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

// //                   <section>
// //                     <SectionHead icon={<Briefcase />}>Professional Details</SectionHead>
// //                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
// //                       {[
// //                         { label: 'Company', field: 'companyName' },
// //                         { label: 'Years of Experience', field: 'yearsOfExperience', type: 'number' },
// //                         { label: 'Mentoring Style', field: 'mentoringStyle' },
// //                         { label: 'Hourly Rate (₹)', field: 'hourlyRate', type: 'number' },
// //                       ].map(({ label, field, type }) => (
// //                         <InfoCard key={field} label={label} field={field} type={type} formData={formData} set={set} isEditing={isEditing} />
// //                       ))}
// //                     </div>
// //                   </section>

// //                   <section>
// //                     <SectionHead icon={<Award />}>Education</SectionHead>
// //                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
// //                       {[
// //                         { label: 'Highest Degree', field: 'highestDegree' },
// //                         { label: 'Field of Study', field: 'fieldOfStudy' },
// //                         { label: 'Institution', field: 'schoolName' },
// //                       ].map(({ label, field }) => (
// //                         <InfoCard key={field} label={label} field={field} formData={formData} set={set} isEditing={isEditing} />
// //                       ))}
// //                     </div>
// //                   </section>

// //                   <section>
// //                     <SectionHead icon={<Calendar />}>Weekly Availability</SectionHead>
// //                     {isEditing && (
// //                       <div style={{
// //                         display: 'flex', alignItems: 'flex-start', gap: 8,
// //                         background: `${CYAN}07`, border: `1px solid ${CYAN}20`,
// //                         borderRadius: 8, padding: '10px 14px', marginBottom: 16,
// //                         fontFamily: FONT, fontSize: 12, color: '#006a8e', lineHeight: 1.6,
// //                       }}>
// //                         <CheckCircle size={13} color={CYAN} style={{ marginTop: 1, flexShrink: 0 }} />
// //                         <span>Pick a date and time to add a 30-min session. One session per date allowed.</span>
// //                       </div>
// //                     )}
// //                     <WeeklyAvailability
// //                       availability={formData.availability}
// //                       isEditing={isEditing}
// //                       setFormData={setFormData}
// //                     />
// //                   </section>
// //                 </div>
// //               )}

// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default MentorProfile;


// import React, { useState, useEffect } from 'react';
// import {
//   MapPin, Star, Pencil, Save, X, Plus, Trash2, Loader2,
//   Upload, Eye, CheckCircle, Clock, Calendar, Briefcase,
//   BookOpen, Award, FileText, TrendingUp, Users, Zap, Globe,
//   Phone, Mail, AlertCircle, ExternalLink, ChevronDown, ChevronUp,
// } from 'lucide-react';
// import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// import { showToast } from '../../../utils/Toastprovider';

// // ── Tokens ────────────────────────────────────────────────────────────────
// const BG = '#062117';          // page background
// const CARD = '#0a2d1e';          // card surface
// const CARD2 = '#0d3322';          // slightly lighter card
// const ACC = '#0098cc';          // cyan accent
// const ACC_D = '#007aaa';          // darker accent (hover)
// const ACC_L = 'rgba(0,152,204,0.12)';
// const ACC_M = 'rgba(0,152,204,0.22)';
// const BOR = 'rgba(0,152,204,0.14)';
// const BOR_B = 'rgba(0,152,204,0.26)';
// const TXT = '#e8f5f0';
// const TXT_M = '#8fbfb0';
// const TXT_S = '#4a8070';
// const AMB = '#e8a020';
// const AMB_L = 'rgba(232,160,32,0.12)';
// const RED = '#e05050';
// const RED_L = 'rgba(224,80,80,0.1)';
// const GRN = '#22c55e';

// const F = `"Plus Jakarta Sans", "DM Sans", -apple-system, sans-serif`;
// const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// // ── Helpers ───────────────────────────────────────────────────────────────
// const fmtDate = s => s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
// const dayFrom = s => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(s).getDay()];
// const calcEnd = t => { const [h, m] = t.split(':').map(Number), tot = h * 60 + m + 30; return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`; };
// const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };

// // ── Atoms ─────────────────────────────────────────────────────────────────
// const Tag = ({ label, col = 'cyan' }) => {
//   const m = {
//     cyan: { bg: ACC_L, bd: ACC_M, c: ACC },
//     amber: { bg: AMB_L, bd: 'rgba(232,160,32,0.25)', c: AMB },
//     teal: { bg: 'rgba(34,197,94,0.08)', bd: 'rgba(34,197,94,0.2)', c: GRN },
//   };
//   const s = m[col] || m.cyan;
//   return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: s.bg, border: `1px solid ${s.bd}`, color: s.c, whiteSpace: 'nowrap' }}>{label}</span>;
// };

// const Lbl = ({ children }) => (
//   <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 5px' }}>{children}</p>
// );

// const ReadVal = ({ value }) => (
//   <div style={{ fontFamily: F, fontSize: 13, color: value ? TXT_M : TXT_S, padding: '8px 12px', background: 'rgba(0,0,0,0.2)', border: `1px solid ${BOR}`, borderRadius: 7, minHeight: 36, display: 'flex', alignItems: 'center', fontStyle: value ? 'normal' : 'italic' }}>
//     {value || '—'}
//   </div>
// );

// const Inp = ({ value, onChange, placeholder, multiline, type = 'text', dark }) => {
//   const base = { fontFamily: F, width: '100%', padding: '8px 12px', border: `1.5px solid ${BOR_B}`, borderRadius: 7, fontSize: 13, color: TXT, background: 'rgba(0,0,0,0.25)', outline: 'none', lineHeight: 1.6, transition: 'border-color 0.15s', boxSizing: 'border-box' };
//   return multiline
//     ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ ...base, resize: 'vertical', '::placeholder': { color: TXT_S } }} />
//     : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
// };

// const Divider = () => <div style={{ height: 1, background: BOR, margin: '14px 0' }} />;

// const SectionLabel = ({ icon: Icon, children }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>
//     <div style={{ width: 26, height: 26, borderRadius: 7, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//       <Icon size={13} color={ACC} />
//     </div>
//     <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT }}>{children}</span>
//   </div>
// );

// // ── Availability ──────────────────────────────────────────────────────────
// const AvailPanel = ({ availability, isEditing, setFormData }) => {
//   const [nd, setNd] = useState('');
//   const [nt, setNt] = useState('09:00');
//   const [err, setErr] = useState('');

//   const flat = (availability || [])
//     .flatMap(de => (de.slots || []).map(s => ({ ...s, day: de.day, ds: s.date ? new Date(s.date).toISOString().split('T')[0] : null })))
//     .filter(s => s.ds).sort((a, b) => new Date(a.ds) - new Date(b.ds));

//   const add = () => {
//     setErr('');
//     if (!nd) { setErr('Select a date.'); return; }
//     const end = calcEnd(nt);
//     const [sh, sm] = nt.split(':').map(Number), [eh, em] = end.split(':').map(Number);
//     const ns = sh * 60 + sm, ne = eh * 60 + em;
//     for (const ex of flat.filter(s => s.ds === nd)) {
//       const [xh, xm] = ex.startTime.split(':').map(Number), [yh, ym] = ex.endTime.split(':').map(Number);
//       if (ns < (yh * 60 + ym) && ne > (xh * 60 + xm)) { setErr(`Conflicts with ${ex.startTime}–${ex.endTime}`); return; }
//     }
//     const day = dayFrom(nd);
//     setFormData(p => {
//       const av = p.availability.map(d => ({ ...d, slots: [...(d.slots || [])] }));
//       const di = av.findIndex(d => d.day === day);
//       const slot = { date: new Date(nd), startTime: nt, endTime: end, isBooked: false };
//       if (di >= 0) av[di] = { ...av[di], slots: [...av[di].slots, slot] };
//       else av.push({ day, slots: [slot] });
//       return { ...p, availability: av };
//     });
//     setNd(''); setNt('09:00');
//   };

//   const remove = ds => {
//     const day = dayFrom(ds);
//     setFormData(p => ({ ...p, availability: p.availability.map(d => d.day !== day ? d : { ...d, slots: d.slots.filter(s => new Date(s.date).toISOString().split('T')[0] !== ds) }) }));
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//       {isEditing && (
//         <div style={{ background: 'rgba(0,0,0,0.2)', border: `1.5px dashed ${BOR_B}`, borderRadius: 10, padding: '14px 16px' }}>
//           <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px' }}>Add New Session</p>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-end' }}>
//             <div><Lbl>Date</Lbl>
//               <input type="date" value={nd} min={tomorrow()} onChange={e => { setNd(e.target.value); setErr(''); }}
//                 style={{ fontFamily: F, fontSize: 12, border: `1.5px solid ${err && !nd ? RED : BOR_B}`, borderRadius: 7, padding: '7px 10px', color: TXT, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' }} />
//             </div>
//             <div><Lbl>Start Time</Lbl>
//               <input type="time" value={nt} min="06:00" max="23:00" onChange={e => setNt(e.target.value)}
//                 style={{ fontFamily: F, fontSize: 12, border: `1.5px solid ${BOR_B}`, borderRadius: 7, padding: '7px 10px', color: TXT, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' }} />
//             </div>
//             <div><Lbl>End Time</Lbl>
//               <div style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '7px 12px', borderRadius: 7, border: `1px solid ${BOR}`, background: 'rgba(0,0,0,0.2)', color: TXT_M, minWidth: 78 }}>{calcEnd(nt)}</div>
//             </div>
//             <button onClick={add} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 7, border: 'none', background: ACC, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
//               <Plus size={13} />Add
//             </button>
//           </div>
//           {err && <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, borderRadius: 6, padding: '6px 10px', fontFamily: F, fontSize: 11, color: RED }}><AlertCircle size={11} />{err}</div>}
//         </div>
//       )}
//       {flat.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(0,0,0,0.15)', border: `1px dashed ${BOR_B}`, borderRadius: 10 }}>
//           <Calendar size={22} color={TXT_S} style={{ margin: '0 auto 7px', display: 'block' }} />
//           <p style={{ fontFamily: F, fontSize: 12, color: TXT_S, margin: 0 }}>No sessions scheduled yet.</p>
//         </div>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//           <div style={{ fontFamily: F, fontSize: 11, color: ACC, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
//             <CheckCircle size={11} />{flat.length} session{flat.length > 1 ? 's' : ''} scheduled
//           </div>
//           {flat.map(slot => {
//             const d = new Date(slot.ds);
//             return (
//               <div key={slot.ds} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: slot.isBooked ? AMB_L : 'rgba(0,0,0,0.15)', border: `1px solid ${slot.isBooked ? 'rgba(232,160,32,0.25)' : BOR}`, borderRadius: 9 }}>
//                 <div style={{ flexShrink: 0, width: 42, textAlign: 'center', padding: '4px', borderRadius: 8, background: ACC_L, border: `1px solid ${BOR_B}` }}>
//                   <div style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: ACC, textTransform: 'uppercase' }}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
//                   <div style={{ fontFamily: F, fontSize: 19, fontWeight: 800, color: TXT, lineHeight: 1.1 }}>{d.getDate()}</div>
//                   <div style={{ fontFamily: F, fontSize: 8.5, color: TXT_S }}>{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
//                 </div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT }}>{slot.startTime} — {slot.endTime}</div>
//                   <div style={{ fontFamily: F, fontSize: 11, color: TXT_S, marginTop: 1 }}>{d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} · 30 min</div>
//                 </div>
//                 {slot.isBooked && <Tag label="Booked" col="amber" />}
//                 {isEditing && !slot.isBooked && (
//                   <button onClick={() => remove(slot.ds)} style={{ background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, color: RED, borderRadius: 6, padding: '5px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
//                     <Trash2 size={12} />
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Main ──────────────────────────────────────────────────────────────────
// const MentorProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ availability: DAYS.map(d => ({ day: d, slots: [] })) });
//   const [email, setEmail] = useState('');
//   const [bioExp, setBioExp] = useState(false);
//   const [files, setFiles] = useState({});

//   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
//   const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

//   useEffect(() => { const ud = localStorage.getItem('userData'); if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } } }, []);
//   useEffect(() => { if (email) getMentorDetails(email); }, [email]);
//   useEffect(() => {
//     if (data?.data) {
//       const merged = DAYS.map(d => { const ex = data.data.availability?.find(a => a.day === d); return { day: d, slots: ex?.slots || [] }; });
//       setFormData({ ...data.data, availability: merged });
//     }
//   }, [data]);

//   const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

//   const handleSave = async () => {
//     try {
//       const flatAv = (formData.availability || []).flatMap(de => (de.slots || []).map(s => ({ date: s.date, startTime: s.startTime, endTime: s.endTime, isBooked: s.isBooked || false }))).filter(s => s.date);
//       await updateMentorDetails({ email, ...formData, availability: flatAv }).unwrap();
//       await getMentorDetails(email);
//       setIsEditing(false); setFiles({});
//       showToast('Profile updated!', 'success');
//     } catch { showToast('Failed to update.'); }
//   };

//   const handleCancel = () => {
//     if (data?.data) { const merged = DAYS.map(d => { const ex = data.data.availability?.find(a => a.day === d); return { day: d, slots: ex?.slots || [] }; }); setFormData({ ...data.data, availability: merged }); }
//     setFiles({}); setIsEditing(false);
//   };

//   if (isLoading) return (
//     <div style={{ fontFamily: F, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG }}>
//       <div style={{ textAlign: 'center' }}>
//         <Loader2 size={28} style={{ color: ACC, animation: 'spin .9s linear infinite', display: 'block', margin: '0 auto 12px' }} />
//         <p style={{ fontFamily: F, color: TXT_S, fontSize: 13, margin: 0 }}>Loading profile…</p>
//       </div>
//     </div>
//   );

//   if (error || Object.keys(formData).length < 2) return (
//     <div style={{ fontFamily: F, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG }}>
//       <div style={{ textAlign: 'center' }}>
//         <X size={28} style={{ color: RED, display: 'block', margin: '0 auto 12px' }} />
//         <p style={{ fontFamily: F, color: TXT_S, fontSize: 13, margin: 0 }}>Failed to load. Please refresh.</p>
//       </div>
//     </div>
//   );

//   const skills = (formData.currentSkills || '').split(',').map(s => s.trim()).filter(Boolean);
//   const areas = (formData.areasOfInterest || '').split(',').map(s => s.trim()).filter(Boolean);
//   const langs = formData.languages || [];
//   const bio = formData.whyMentor || '';
//   const bioShort = bio.length > 260 ? bio.slice(0, 260) + '…' : bio;
//   const initials = formData.fullName?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
//         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
//         @keyframes spin{to{transform:rotate(360deg);}}
//         @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
//         html{font-family:${F};-webkit-font-smoothing:antialiased;}
//         input:focus,textarea:focus{border-color:${ACC}!important;outline:none;}
//         textarea{resize:vertical;}
//         input[type="time"]::-webkit-calendar-picker-indicator,
//         input[type="date"]::-webkit-calendar-picker-indicator{opacity:.4;cursor:pointer;filter:invert(1);}
//         ::-webkit-scrollbar{width:4px;}
//         ::-webkit-scrollbar-thumb{background:${BOR_B};border-radius:4px;}
//         ::-webkit-scrollbar-track{background:transparent;}
//         ::placeholder{color:${TXT_S}!important;}
//         .hov-save:hover{background:${ACC_D}!important;}
//         .hov-edit:hover{background:rgba(0,152,204,0.18)!important;}
//         .hov-cancel:hover{background:rgba(255,255,255,0.06)!important;}
//         .hov-doc:hover{background:${ACC_L}!important;border-color:${BOR_B}!important;}
//         .hov-file:hover{border-color:${ACC}!important;color:${ACC}!important;}

//         /* Responsive grid */
//         .mp-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:0;}

//         /* Hero responsive */
//         @media(max-width:720px){
//           .hero-inner{flex-direction:column!important;gap:20px!important;}
//           .hero-right{flex-direction:row!important;align-items:center!important;flex-wrap:wrap!important;gap:8px!important;}
//           .hero-stats{flex-wrap:wrap!important;}
//         }
//         /* Grid: 2 col on tablet */
//         @media(max-width:900px){
//           .col-8{grid-column:span 12!important;}
//           .col-4{grid-column:span 12!important;}
//           .col-6{grid-column:span 12!important;}
//           .col-3{grid-column:span 6!important;}
//           .col-12{grid-column:span 12!important;}
//         }
//         /* Grid: 1 col on mobile */
//         @media(max-width:560px){
//           .col-3{grid-column:span 12!important;}
//           .nav-name{display:none!important;}
//           .hero-meta{flex-direction:column!important;gap:6px!important;}
//         }
//       `}</style>

//       <div style={{ fontFamily: F, minHeight: '100vh', background: BG, color: TXT }}>

//         {/* ── Sticky Nav ─────────────────────────────────────────── */}
//         <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(6,33,23,0.96)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BOR}` }}>
//           <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
//             {/* Left */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
//               <div style={{ width: 32, height: 32, borderRadius: 8, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: ACC, flexShrink: 0 }}>
//                 {initials}
//               </div>
//               <div className="nav-name" style={{ minWidth: 0 }}>
//                 <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                   {formData.fullName || 'Your Name'}
//                 </div>
//                 <div style={{ fontFamily: F, fontSize: 10.5, color: TXT_S, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                   {formData.currentRole || 'Mentor'}{formData.companyName && ` · ${formData.companyName}`}
//                 </div>
//               </div>
//             </div>
//             {/* Right */}
//             <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
//               {!isEditing ? (
//                 <button onClick={() => setIsEditing(true)} className="hov-edit" style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, border: `1px solid ${BOR_B}`, background: ACC_L, color: ACC, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'background .15s' }}>
//                   <Pencil size={13} />Edit Profile
//                 </button>
//               ) : (
//                 <>
//                   <button onClick={handleSave} disabled={isUpdating} className="hov-save" style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, border: 'none', background: ACC, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', opacity: isUpdating ? .7 : 1, transition: 'background .15s' }}>
//                     {isUpdating ? <Loader2 size={13} style={{ animation: 'spin .9s linear infinite' }} /> : <Save size={13} />}
//                     {isUpdating ? 'Saving…' : 'Save Changes'}
//                   </button>
//                   <button onClick={handleCancel} disabled={isUpdating} className="hov-cancel" style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1px solid ${BOR_B}`, background: 'transparent', color: TXT_M, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'background .15s' }}>
//                     <X size={13} />Cancel
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>

//         {/* ── Hero ───────────────────────────────────────────────── */}
//         <div style={{ background: `linear-gradient(135deg, #071e12 0%, #0a2a18 40%, #062117 100%)`, borderBottom: `1px solid ${BOR}`, padding: '36px 24px 32px' }}>
//           <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//             <div className="hero-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>

//               {/* Identity */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
//                 <div style={{ position: 'relative', flexShrink: 0 }}>
//                   <div style={{ width: 82, height: 82, borderRadius: 16, background: ACC_L, border: `2px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: ACC, fontFamily: F, letterSpacing: '-0.5px' }}>
//                     {initials}
//                   </div>
//                   {formData.status === 'approved' && (
//                     <div style={{ position: 'absolute', bottom: -5, right: -5, width: 18, height: 18, borderRadius: '50%', background: GRN, border: `2px solid ${BG}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <CheckCircle size={10} color="#fff" />
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 7, alignItems: 'center' }}>
//                     {formData.mentorCategory && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '0.6px', background: ACC_L, border: `1px solid ${BOR_B}`, padding: '2px 9px', borderRadius: 20 }}>{formData.mentorCategory}</span>}
//                     <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: AMB, background: AMB_L, border: `1px solid rgba(232,160,32,0.25)`, padding: '2px 9px', borderRadius: 20 }}>★ {formData.rating || '5.0'}</span>
//                     {formData.status === 'approved' && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: GRN, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 9px', borderRadius: 20 }}>✓ Verified</span>}
//                   </div>

//                   {isEditing ? (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                       <input value={formData.fullName || ''} onChange={e => set('fullName', e.target.value)} placeholder="Full Name" style={{ fontFamily: F, fontSize: 20, fontWeight: 800, background: 'rgba(0,0,0,0.3)', border: `1.5px solid ${BOR_B}`, borderRadius: 8, padding: '5px 11px', color: TXT, outline: 'none', width: 260, colorScheme: 'dark' }} />
//                       <input value={formData.currentRole || ''} onChange={e => set('currentRole', e.target.value)} placeholder="Current Role" style={{ fontFamily: F, fontSize: 12, background: 'rgba(0,0,0,0.2)', border: `1px solid ${BOR}`, borderRadius: 6, padding: '4px 9px', color: TXT_M, outline: 'none', width: 260, colorScheme: 'dark' }} />
//                     </div>
//                   ) : (
//                     <>
//                       <h1 style={{ fontFamily: F, fontSize: 'clamp(18px,2.8vw,28px)', fontWeight: 800, color: TXT, lineHeight: 1.15, letterSpacing: '-0.3px', marginBottom: 3 }}>
//                         {formData.fullName || 'Your Name'}
//                       </h1>
//                       <p style={{ fontFamily: F, fontSize: 13, color: TXT_M, fontWeight: 500, marginBottom: 0 }}>
//                         {formData.currentRole || 'Mentor'}
//                         {formData.companyName && <span style={{ color: TXT_S }}> · {formData.companyName}</span>}
//                       </p>
//                     </>
//                   )}

//                   <div className="hero-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 10 }}>
//                     {formData.location && <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} color={TXT_S} />{formData.location}</span>}
//                     {langs.length > 0 && <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={11} color={TXT_S} />{langs.join(', ')}</span>}
//                     {formData.email && <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} color={TXT_S} />{formData.email}</span>}
//                     <span style={{ fontFamily: F, fontSize: 11, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} color={TXT_S} />Since {fmtDate(formData.createdAt)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="hero-right" style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
//                 <div className="hero-stats" style={{ display: 'flex', gap: 8 }}>
//                   {[
//                     { label: 'Sessions', value: formData.completedBookings || 0, icon: TrendingUp },
//                     { label: 'Mentees', value: formData.totalMentees || 0, icon: Users },
//                     { label: 'Exp.', value: `${formData.yearsOfExperience || 0}yr`, icon: Award },
//                   ].map(({ label, value, icon: Icon }) => (
//                     <div key={label} style={{ background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 10, padding: '10px 16px', textAlign: 'center', minWidth: 72 }}>
//                       <Icon size={13} color={ACC} style={{ margin: '0 auto 4px', display: 'block' }} />
//                       <div style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: TXT, lineHeight: 1 }}>{value}</div>
//                       <div style={{ fontFamily: F, fontSize: 10, color: TXT_S, marginTop: 3, fontWeight: 600 }}>{label}</div>
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 10, padding: '9px 18px', display: 'flex', alignItems: 'baseline', gap: 6 }}>
//                   <span style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: ACC, letterSpacing: '-0.5px' }}>₹{(formData.hourlyRate || 0).toLocaleString()}</span>
//                   <span style={{ fontFamily: F, fontSize: 11, color: TXT_S }}>{formData.sessionDuration || 'per session'}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Content Grid ───────────────────────────────────────── */}
//         <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px', animation: 'fadeUp .3s ease both' }}>
//           <div className="mp-grid">

//             {/* Each cell has border-right and border-bottom for seamless grid lines */}
//             {/* Row 1: About (8 cols) | Contact (4 cols) */}
//             <div className="col-8" style={{ gridColumn: 'span 8', padding: '24px', borderRight: `1px solid ${BOR}`, borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={Award}>About</SectionLabel>
//               {isEditing ? (
//                 <Inp value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey and mentoring goals…" multiline />
//               ) : (
//                 <div>
//                   <p style={{ fontFamily: F, fontSize: 13, color: TXT_M, lineHeight: 1.85, margin: 0 }}>
//                     {(bioExp ? bio : bioShort) || <span style={{ fontStyle: 'italic', color: TXT_S }}>No bio provided.</span>}
//                   </p>
//                   {bio.length > 260 && (
//                     <button onClick={() => setBioExp(p => !p)} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 11.5, fontWeight: 600, color: ACC, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
//                       {bioExp ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />Read more</>}
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="col-4" style={{ gridColumn: 'span 4', padding: '24px', borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={Mail}>Contact</SectionLabel>
//               {isEditing ? (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                   <div><Lbl>Location</Lbl><Inp value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" /></div>
//                   <div><Lbl>Phone</Lbl><Inp value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="Phone number" /></div>
//                   <div><Lbl>LinkedIn</Lbl><Inp value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
//                 </div>
//               ) : (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
//                   {[
//                     { icon: MapPin, val: formData.location, href: null },
//                     { icon: Mail, val: formData.email, href: `mailto:${formData.email}` },
//                     { icon: Phone, val: formData.phone, href: null },
//                     { icon: Globe, val: formData.linkedinUrl ? 'LinkedIn Profile' : null, href: formData.linkedinUrl },
//                   ].filter(r => r.val).map(({ icon: Icon, val, href }, i) => (
//                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                       <div style={{ width: 28, height: 28, borderRadius: 7, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                         <Icon size={12} color={ACC} />
//                       </div>
//                       {href ? (
//                         <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 12.5, color: ACC, fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
//                           {val}<ExternalLink size={10} />
//                         </a>
//                       ) : (
//                         <span style={{ fontFamily: F, fontSize: 12.5, color: TXT_M, fontWeight: 500 }}>{val}</span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Row 2: Skills (8) | Work History (4) */}
//             <div className="col-8" style={{ gridColumn: 'span 8', padding: '24px', borderRight: `1px solid ${BOR}`, borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={Zap}>Skills & Expertise</SectionLabel>
//               {isEditing ? (
//                 <Inp value={formData.currentSkills || ''} onChange={e => set('currentSkills', e.target.value)} placeholder="React, Node.js, Python… (comma-separated)" multiline />
//               ) : skills.length > 0 ? (
//                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <Tag key={i} label={s} />)}</div>
//               ) : (
//                 <p style={{ fontFamily: F, fontSize: 12, color: TXT_S, fontStyle: 'italic' }}>No skills listed.</p>
//               )}
//             </div>

//             <div className="col-4" style={{ gridColumn: 'span 4', padding: '24px', borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={CheckCircle}>Work History</SectionLabel>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                 <div style={{ background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 9, padding: '12px 14px' }}>
//                   <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: ACC, marginBottom: 2 }}>{formData.completedBookings || 0}</div>
//                   <div style={{ fontFamily: F, fontSize: 11, color: TXT_M, fontWeight: 600 }}>Completed Sessions</div>
//                 </div>
//                 {(formData.totalMentees || 0) > 0 && (
//                   <div style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 9, padding: '12px 14px' }}>
//                     <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: GRN, marginBottom: 2 }}>{formData.totalMentees}</div>
//                     <div style={{ fontFamily: F, fontSize: 11, color: TXT_M, fontWeight: 600 }}>Total Mentees</div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Row 3: Areas (4) | Professional (4) | Education (4) */}
//             <div className="col-3" style={{ gridColumn: 'span 4', padding: '24px', borderRight: `1px solid ${BOR}`, borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={BookOpen}>Areas of Interest</SectionLabel>
//               {isEditing ? (
//                 <Inp value={formData.areasOfInterest || ''} onChange={e => set('areasOfInterest', e.target.value)} placeholder="Web Dev, Cloud… (comma-separated)" multiline />
//               ) : areas.length > 0 ? (
//                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{areas.map((a, i) => <Tag key={i} label={a} col="teal" />)}</div>
//               ) : (
//                 <p style={{ fontFamily: F, fontSize: 12, color: TXT_S, fontStyle: 'italic' }}>No areas listed.</p>
//               )}
//             </div>

//             <div className="col-3" style={{ gridColumn: 'span 4', padding: '24px', borderRight: `1px solid ${BOR}`, borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={Briefcase}>Professional</SectionLabel>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                 {[
//                   { label: 'Company', field: 'companyName' },
//                   { label: 'Experience', field: 'yearsOfExperience', type: 'number' },
//                   { label: 'Rate (₹/hr)', field: 'hourlyRate', type: 'number' },
//                   { label: 'Style', field: 'mentoringStyle' },
//                 ].map(({ label, field, type }) => (
//                   <div key={field}>
//                     <Lbl>{label}</Lbl>
//                     {isEditing ? <Inp type={type || 'text'} value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={label} /> : <ReadVal value={formData[field]} />}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="col-3" style={{ gridColumn: 'span 4', padding: '24px', borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={Award}>Education</SectionLabel>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
//                 {[
//                   { label: 'Degree', field: 'highestDegree' },
//                   { label: 'Field', field: 'fieldOfStudy' },
//                   { label: 'Institution', field: 'schoolName' },
//                 ].map(({ label, field }) => (
//                   <div key={field}>
//                     <Lbl>{label}</Lbl>
//                     {isEditing ? <Inp value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={label} /> : <ReadVal value={formData[field]} />}
//                   </div>
//                 ))}
//               </div>
//               <Divider />
//               <div>
//                 <Lbl>Languages</Lbl>
//                 {langs.length > 0 ? (
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>{langs.map((l, i) => <Tag key={i} label={l} col="amber" />)}</div>
//                 ) : <p style={{ fontFamily: F, fontSize: 12, color: TXT_S, fontStyle: 'italic', marginTop: 5 }}>Not listed.</p>}
//               </div>
//             </div>

//             {/* Row 4: Documents (12) */}
//             <div className="col-12" style={{ gridColumn: 'span 12', padding: '24px', borderBottom: `1px solid ${BOR}` }}>
//               <SectionLabel icon={FileText}>Documents & Media</SectionLabel>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
//                 {[
//                   { label: 'Resume / CV', field: 'resumeLink', icon: FileText },
//                   { label: 'Portfolio', field: 'portfolioLink', icon: BookOpen },
//                   { label: 'Intro Video', field: 'videoLink', icon: Eye },
//                 ].map(({ label, field, icon: Icon }) => (
//                   <div key={field} style={{ border: `1px solid ${BOR}`, borderRadius: 10, padding: '14px', background: 'rgba(0,0,0,0.15)' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
//                       <div style={{ width: 26, height: 26, borderRadius: 7, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                         <Icon size={12} color={ACC} />
//                       </div>
//                       <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: TXT }}>{label}</span>
//                     </div>
//                     {isEditing ? (
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
//                         <input type="file" id={`f-${field}`} style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) setFiles(p => ({ ...p, [field.replace('Link', '')]: f })); }} />
//                         <label htmlFor={`f-${field}`} className="hov-file" style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 11px', border: `1.5px dashed ${BOR_B}`, borderRadius: 7, cursor: 'pointer', fontSize: 11.5, color: TXT_M, transition: 'all .15s' }}>
//                           <Upload size={12} color={TXT_S} />Upload file
//                         </label>
//                         <Inp value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder="Or paste a URL…" />
//                       </div>
//                     ) : formData[field] ? (
//                       <a href={formData[field]} target="_blank" rel="noopener noreferrer" className="hov-doc" style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, padding: '7px 11px', borderRadius: 7, border: `1px solid ${BOR}`, color: TXT_M, textDecoration: 'none', transition: 'all .15s', background: 'rgba(0,0,0,0.1)' }}>
//                         <Eye size={12} color={TXT_S} />View
//                       </a>
//                     ) : (
//                       <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, fontStyle: 'italic' }}>Not uploaded</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Row 5: Availability (12) */}
//             <div className="col-12" style={{ gridColumn: 'span 12', padding: '24px' }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                   <div style={{ width: 26, height: 26, borderRadius: 7, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                     <Calendar size={13} color={ACC} />
//                   </div>
//                   <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT }}>Scheduled Availability</span>
//                 </div>
//                 {isEditing && (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 6, padding: '4px 10px' }}>
//                     <CheckCircle size={11} color={ACC} />
//                     <span style={{ fontFamily: F, fontSize: 11, color: ACC, fontWeight: 600 }}>30-min sessions · Pick date & time</span>
//                   </div>
//                 )}
//               </div>
//               <AvailPanel availability={formData.availability} isEditing={isEditing} setFormData={setFormData} />
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MentorProfile;

import React, { useState, useEffect } from 'react';
import {
  MapPin, Star, Pencil, Save, X, Plus, Trash2, Loader2,
  Upload, Eye, CheckCircle, Clock, Calendar, Briefcase,
  BookOpen, Award, FileText, TrendingUp, Users, Zap, Globe,
  Phone, Mail, AlertCircle, ExternalLink, ChevronRight,
  Circle, AlertTriangle, Edit, UserX
} from 'lucide-react';
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
import { showToast } from '../../../utils/Toastprovider';

// ── Design Tokens ─────────────────────────────────────────────────────────
const BG = '#062117';
const CARD = '#0a2d1e';
const ACC = '#0098cc';
const ACC_D = '#007aaa';
const ACC_L = 'rgba(0,152,204,0.12)';
const ACC_M = 'rgba(0,152,204,0.22)';
const BOR = 'rgba(0,152,204,0.14)';
const BOR_B = 'rgba(0,152,204,0.26)';
const TXT = '#e8f5f0';
const TXT_M = '#8fbfb0';
const TXT_S = '#4a8070';
const AMB = '#e8a020';
const AMB_L = 'rgba(232,160,32,0.12)';
const RED = '#e05050';
const RED_L = 'rgba(224,80,80,0.1)';
const GRN = '#22c55e';
const F = `"Plus Jakarta Sans", "DM Sans", -apple-system, sans-serif`;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ── Helpers ───────────────────────────────────────────────────────────────
const fmtDate = s => s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
const dayFrom = s => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(s).getDay()];
const calcEnd = t => { const [h, m] = t.split(':').map(Number), tot = h * 60 + m + 30; return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`; };
const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };

// ── Tag Pill ──────────────────────────────────────────────────────────────
const TagPill = ({ label, onRemove, col = 'cyan' }) => {
  const m = {
    cyan: { bg: ACC_L, bd: ACC_M, c: ACC },
    amber: { bg: AMB_L, bd: 'rgba(232,160,32,0.25)', c: AMB },
    teal: { bg: 'rgba(34,197,94,0.08)', bd: 'rgba(34,197,94,0.2)', c: GRN },
    purple: { bg: 'rgba(139,92,246,0.1)', bd: 'rgba(139,92,246,0.25)', c: '#a78bfa' },
  };
  const s = m[col] || m.cyan;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px 3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: s.bg, border: `1px solid ${s.bd}`, color: s.c, whiteSpace: 'nowrap' }}>
      {label}
      {onRemove && (
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: s.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: 0.7, display: 'flex', alignItems: 'center' }}>×</button>
      )}
    </span>
  );
};

// ── Form Atoms ────────────────────────────────────────────────────────────
const Lbl = ({ children, required }) => (
  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 5px' }}>
    {children}{required && <span style={{ color: RED, marginLeft: 2 }}>*</span>}
  </p>
);

const Inp = ({ value, onChange, placeholder, multiline, type = 'text', error }) => {
  const base = {
    fontFamily: F, width: '100%', padding: '9px 12px',
    border: `1.5px solid ${error ? RED : BOR_B}`, borderRadius: 8,
    fontSize: 13, color: TXT, background: 'rgba(0,0,0,0.25)',
    outline: 'none', lineHeight: 1.6, transition: 'border-color 0.15s',
    boxSizing: 'border-box', colorScheme: 'dark',
  };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ ...base, resize: 'vertical' }} />
    : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
};

const Sel = ({ value, onChange, children, error }) => (
  <select value={value} onChange={onChange} style={{
    fontFamily: F, width: '100%', padding: '9px 12px',
    border: `1.5px solid ${error ? RED : BOR_B}`, borderRadius: 8,
    fontSize: 13, color: value ? TXT : TXT_S, background: '#0a2d1e',
    outline: 'none', lineHeight: 1.6, transition: 'border-color 0.15s',
    boxSizing: 'border-box', colorScheme: 'dark',
  }}>
    {children}
  </select>
);

const FieldErr = ({ msg }) => msg ? (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: RED }}>
    <AlertCircle size={10} />{msg}
  </div>
) : null;

// ── Tag Input Row ─────────────────────────────────────────────────────────
const TagInputRow = ({ placeholder, value, onChange, onAdd }) => (
  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
      placeholder={placeholder}
      style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: '8px 11px', border: `1.5px solid ${BOR_B}`, borderRadius: 7, color: TXT, background: 'rgba(0,0,0,0.25)', outline: 'none', colorScheme: 'dark' }}
    />
    <button type="button" onClick={onAdd} style={{ padding: '8px 14px', background: ACC, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Add</button>
  </div>
);

// ── Availability Panel ────────────────────────────────────────────────────
const AvailPanel = ({ availability, isEditing, setFormData }) => {
  const [nd, setNd] = useState('');
  const [nt, setNt] = useState('09:00');
  const [err, setErr] = useState('');

  const flat = (availability || [])
    .filter(s => s.date)
    .map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }))
    .sort((a, b) => new Date(a.ds) - new Date(b.ds));

  const add = () => {
    setErr('');
    if (!nd) { setErr('Select a date.'); return; }
    const end = calcEnd(nt);
    const [sh, sm] = nt.split(':').map(Number), [eh, em] = end.split(':').map(Number);
    const ns = sh * 60 + sm, ne = eh * 60 + em;
    for (const ex of flat.filter(s => s.ds === nd)) {
      const [xh, xm] = ex.startTime.split(':').map(Number), [yh, ym] = ex.endTime.split(':').map(Number);
      if (ns < (yh * 60 + ym) && ne > (xh * 60 + xm)) { setErr(`Conflicts with ${ex.startTime}–${ex.endTime}`); return; }
    }
    setFormData(p => ({
      ...p,
      availability: [...(p.availability || []), { date: new Date(nd), startTime: nt, endTime: end, isBooked: false }]
    }));
    setNd(''); setNt('09:00');
  };

  const remove = ds => {
    setFormData(p => ({
      ...p,
      availability: (p.availability || []).filter(s => new Date(s.date).toISOString().split('T')[0] !== ds)
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {isEditing && (
        <div style={{ background: 'rgba(0,0,0,0.2)', border: `1.5px dashed ${BOR_B}`, borderRadius: 10, padding: '14px 16px' }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px' }}>Add New Session (30 min)</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-end' }}>
            <div>
              <Lbl>Date</Lbl>
              <input type="date" value={nd} min={tomorrow()} onChange={e => { setNd(e.target.value); setErr(''); }}
                style={{ fontFamily: F, fontSize: 12, border: `1.5px solid ${err && !nd ? RED : BOR_B}`, borderRadius: 7, padding: '8px 10px', color: TXT, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' }} />
            </div>
            <div>
              <Lbl>Start Time</Lbl>
              <input type="time" value={nt} min="06:00" max="23:00" onChange={e => setNt(e.target.value)}
                style={{ fontFamily: F, fontSize: 12, border: `1.5px solid ${BOR_B}`, borderRadius: 7, padding: '8px 10px', color: TXT, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' }} />
            </div>
            <div>
              <Lbl>End Time</Lbl>
              <div style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '8px 12px', borderRadius: 7, border: `1px solid ${BOR}`, background: 'rgba(0,0,0,0.2)', color: TXT_M, minWidth: 78 }}>{calcEnd(nt)}</div>
            </div>
            <button onClick={add} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 7, border: 'none', background: ACC, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={13} />Add
            </button>
          </div>
          {err && (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, borderRadius: 6, padding: '6px 10px', fontFamily: F, fontSize: 11, color: RED }}>
              <AlertCircle size={11} />{err}
            </div>
          )}
        </div>
      )}
      {flat.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(0,0,0,0.15)', border: `1px dashed ${BOR_B}`, borderRadius: 10 }}>
          <Calendar size={22} color={TXT_S} style={{ margin: '0 auto 7px', display: 'block' }} />
          <p style={{ fontFamily: F, fontSize: 12, color: TXT_S, margin: 0 }}>No sessions scheduled yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: F, fontSize: 11, color: ACC, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <CheckCircle size={11} />{flat.length} session{flat.length > 1 ? 's' : ''} scheduled
          </div>
          {flat.map(slot => {
            const d = new Date(slot.ds);
            return (
              <div key={slot.ds} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: slot.isBooked ? AMB_L : 'rgba(0,0,0,0.15)', border: `1px solid ${slot.isBooked ? 'rgba(232,160,32,0.25)' : BOR}`, borderRadius: 9 }}>
                <div style={{ flexShrink: 0, width: 42, textAlign: 'center', padding: '4px', borderRadius: 8, background: ACC_L, border: `1px solid ${BOR_B}` }}>
                  <div style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: ACC, textTransform: 'uppercase' }}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                  <div style={{ fontFamily: F, fontSize: 19, fontWeight: 800, color: TXT, lineHeight: 1.1 }}>{d.getDate()}</div>
                  <div style={{ fontFamily: F, fontSize: 8.5, color: TXT_S }}>{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT }}>{slot.startTime} — {slot.endTime}</div>
                  <div style={{ fontFamily: F, fontSize: 11, color: TXT_S, marginTop: 1 }}>{d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} · 30 min</div>
                </div>
                {slot.isBooked && <TagPill label="Booked" col="amber" />}
                {isEditing && !slot.isBooked && (
                  <button onClick={() => remove(slot.ds)} style={{ background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, color: RED, borderRadius: 6, padding: '5px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Section Card ──────────────────────────────────────────────────────────
const SectionCard = ({ title, subtitle, icon: Icon, onEdit, editLabel = 'Edit', isSaving, children, emptyState }) => (
  <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BOR}`, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '20px 24px', borderBottom: `1px solid ${BOR}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        {Icon && (
          <div style={{ width: 32, height: 32, borderRadius: 8, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={15} color={ACC} />
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: TXT, margin: 0 }}>{title}</h2>
          {subtitle && <p style={{ fontFamily: F, fontSize: 12, color: TXT_S, margin: '2px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
        </div>
      </div>
      <button
        onClick={onEdit}
        disabled={isSaving}
        style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.12)`, color: TXT_M, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', opacity: isSaving ? 0.5 : 1, fontFamily: F, transition: 'background .15s', whiteSpace: 'nowrap' }}
      >
        {isSaving ? <Loader2 size={13} style={{ animation: 'spin .9s linear infinite' }} /> : <Edit size={13} />}
        {isSaving ? 'Saving…' : editLabel}
      </button>
    </div>
    <div style={{ padding: '20px 24px' }}>
      {children || (emptyState && (
        <div style={{ textAlign: 'center', padding: '28px 16px' }}>
          <p style={{ fontFamily: F, fontSize: 13, color: TXT_S, margin: '0 0 10px' }}>{emptyState.message}</p>
          <button onClick={onEdit} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: ACC, background: 'none', border: 'none', cursor: 'pointer' }}>{emptyState.cta}</button>
        </div>
      ))}
    </div>
  </div>
);

// ── Info Row ──────────────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, children, href }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 28, height: 28, borderRadius: 7, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={12} color={ACC} />
    </div>
    {href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 12.5, color: ACC, fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
        {children}<ExternalLink size={10} />
      </a>
    ) : (
      <span style={{ fontFamily: F, fontSize: 12.5, color: TXT_M, fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
    )}
  </div>
);

// ── Pending Details Card ──────────────────────────────────────────────────
const PendingDetailsCard = ({ mentorData, onEdit }) => {
  const pending = [];
  if (!mentorData.location) pending.push('Location');
  if (!mentorData.phone) pending.push('Phone number');
  if (!mentorData.linkedinUrl) pending.push('LinkedIn URL');
  if (!mentorData.whyMentor) pending.push('Bio / About');
  if (!mentorData.currentSkills) pending.push('Skills');
  if (!mentorData.areasOfInterest) pending.push('Areas of interest');
  if (!mentorData.hourlyRate) pending.push('Hourly rate');
  if (!mentorData.yearsOfExperience) pending.push('Years of experience');
  if (!mentorData.highestDegree) pending.push('Education');
  if (!mentorData.resumeLink) pending.push('Resume / CV');

  if (pending.length === 0) return null;

  return (
    <div style={{ background: CARD, borderRadius: 16, border: `1px solid rgba(232,160,32,0.22)`, overflow: 'hidden' }}>
      <div style={{ background: AMB_L, padding: '14px 20px', borderBottom: `1px solid rgba(232,160,32,0.18)`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <AlertTriangle size={15} color={AMB} />
        <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: TXT, margin: 0, flex: 1 }}>Pending Details</h3>
        <span style={{ background: AMB, color: '#fff', fontFamily: F, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>{pending.length}</span>
      </div>
      <div style={{ padding: '12px 20px' }}>
        <p style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, margin: '0 0 10px' }}>Complete these to improve your visibility.</p>
        {pending.map((item, i) => (
          <button key={i} onClick={onEdit} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < pending.length - 1 ? `1px solid ${BOR}` : 'none' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: AMB, flexShrink: 0 }} />
            <span style={{ fontFamily: F, fontSize: 12.5, color: TXT_M, flex: 1, textAlign: 'left' }}>{item}</span>
            <ChevronRight size={13} color={TXT_S} />
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Edit Modal ────────────────────────────────────────────────────────────
const EditModal = ({ isOpen, onClose, section, formData, setFormData, onSave, isSaving }) => {
  const [currentSection, setCurrentSection] = useState(section);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [langInput, setLangInput] = useState('');

  useEffect(() => { setCurrentSection(section); setErrors({}); }, [section, isOpen]);

  if (!isOpen) return null;

  const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

  const addTag = (field, input, setInput) => {
    const v = input.trim();
    if (!v) return;
    const current = (formData[field] || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!current.includes(v)) set(field, [...current, v].join(', '));
    setInput('');
  };

  const removeTag = (field, val) => {
    const current = (formData[field] || '').split(',').map(s => s.trim()).filter(Boolean);
    set(field, current.filter(s => s !== val).join(', '));
  };

  const validate = () => {
    const errs = {};
    if (currentSection === 'overview') {
      if (!formData.fullName?.trim()) errs.fullName = 'Full name is required.';
      if (!formData.currentRole?.trim()) errs.currentRole = 'Current role is required.';
    }
    if (currentSection === 'experience') {
      if (!formData.yearsOfExperience && formData.yearsOfExperience !== 0) errs.yearsOfExperience = 'Required.';
      if (!formData.hourlyRate) errs.hourlyRate = 'Required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (shouldClose = true) => {
    if (!validate()) return;
    await onSave(shouldClose);
  };

  const handleSaveAndContinue = async () => {
    if (!validate()) return;
    const order = ['overview', 'experience', 'documents', 'availability'];
    const idx = order.indexOf(currentSection);
    await onSave(false);
    if (idx < order.length - 1) { setCurrentSection(order[idx + 1]); setErrors({}); }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'availability', label: 'Availability', icon: Calendar },
  ];

  const skills = (formData.currentSkills || '').split(',').map(s => s.trim()).filter(Boolean);
  const areas = (formData.areasOfInterest || '').split(',').map(s => s.trim()).filter(Boolean);
  const langs = Array.isArray(formData.languages) ? formData.languages : [];

  const renderOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Basic Information</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        <div>
          <Lbl required>Full Name</Lbl>
          <Inp value={formData.fullName || ''} onChange={e => { set('fullName', e.target.value); if (errors.fullName) setErrors(p => ({ ...p, fullName: '' })); }} placeholder="Your full name" error={errors.fullName} />
          <FieldErr msg={errors.fullName} />
        </div>
        <div>
          <Lbl required>Current Role</Lbl>
          <Inp value={formData.currentRole || ''} onChange={e => { set('currentRole', e.target.value); if (errors.currentRole) setErrors(p => ({ ...p, currentRole: '' })); }} placeholder="e.g. Senior Engineer" error={errors.currentRole} />
          <FieldErr msg={errors.currentRole} />
        </div>
        <div>
          <Lbl>Company</Lbl>
          <Inp value={formData.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="Current employer" />
        </div>
        <div>
          <Lbl>Location</Lbl>
          <Inp value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" />
        </div>
        <div>
          <Lbl>Phone</Lbl>
          <Inp value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+91 1234567890" />
        </div>
        <div>
          <Lbl>LinkedIn</Lbl>
          <Inp value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" />
        </div>
      </div>
      <div>
        <Lbl>Bio / About</Lbl>
        <Inp value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey and mentoring goals…" multiline />
      </div>
      <div>
        <Lbl>Mentoring Style</Lbl>
        <Inp value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g. Collaborative, Goal-oriented" />
      </div>
      <div>
        <Lbl>Skills & Expertise (comma-separated)</Lbl>
        <TagInputRow placeholder="e.g. React, Node.js, Python" value={skillInput} onChange={setSkillInput} onAdd={() => addTag('currentSkills', skillInput, setSkillInput)} />
        {skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {skills.map((s, i) => <TagPill key={i} label={s} onRemove={() => removeTag('currentSkills', s)} />)}
          </div>
        )}
      </div>
      <div>
        <Lbl>Areas of Interest</Lbl>
        <TagInputRow placeholder="e.g. Web Development, Cloud" value={areaInput} onChange={setAreaInput} onAdd={() => addTag('areasOfInterest', areaInput, setAreaInput)} />
        {areas.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {areas.map((a, i) => <TagPill key={i} label={a} col="teal" onRemove={() => removeTag('areasOfInterest', a)} />)}
          </div>
        )}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Professional Details</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
        <div>
          <Lbl required>Years of Experience</Lbl>
          <Inp type="number" value={formData.yearsOfExperience || ''} onChange={e => { set('yearsOfExperience', e.target.value); if (errors.yearsOfExperience) setErrors(p => ({ ...p, yearsOfExperience: '' })); }} placeholder="e.g. 5" error={errors.yearsOfExperience} />
          <FieldErr msg={errors.yearsOfExperience} />
        </div>
        <div>
          <Lbl required>Hourly Rate (₹)</Lbl>
          <Inp type="number" value={formData.hourlyRate || ''} onChange={e => { set('hourlyRate', e.target.value); if (errors.hourlyRate) setErrors(p => ({ ...p, hourlyRate: '' })); }} placeholder="e.g. 1500" error={errors.hourlyRate} />
          <FieldErr msg={errors.hourlyRate} />
        </div>
        <div>
          <Lbl>Session Duration</Lbl>
          <Inp value={formData.sessionDuration || ''} onChange={e => set('sessionDuration', e.target.value)} placeholder="e.g. 45 min" />
        </div>
        <div>
          <Lbl>Highest Degree</Lbl>
          <Sel value={formData.highestDegree || ''} onChange={e => set('highestDegree', e.target.value)}>
            <option value="">Select degree</option>
            {["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other"].map(o => <option key={o} value={o}>{o}</option>)}
          </Sel>
        </div>
        <div>
          <Lbl>Field of Study</Lbl>
          <Inp value={formData.fieldOfStudy || ''} onChange={e => set('fieldOfStudy', e.target.value)} placeholder="e.g. Computer Science" />
        </div>
        <div>
          <Lbl>Institution</Lbl>
          <Inp value={formData.schoolName || ''} onChange={e => set('schoolName', e.target.value)} placeholder="e.g. IIT Bombay" />
        </div>
      </div>
      <div>
        <Lbl>Languages</Lbl>
        <TagInputRow
          placeholder="e.g. English, Hindi"
          value={langInput}
          onChange={setLangInput}
          onAdd={() => {
            const v = langInput.trim();
            if (v && !langs.includes(v)) { set('languages', [...langs, v]); setLangInput(''); }
          }}
        />
        {langs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {langs.map((l, i) => (
              <TagPill key={i} label={l} col="amber" onRemove={() => set('languages', langs.filter(x => x !== l))} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Documents & Media</h3>
      <div style={{ background: AMB_L, border: `1px solid rgba(232,160,32,0.22)`, borderRadius: 10, padding: '14px 16px', fontFamily: F, fontSize: 12.5, color: AMB, lineHeight: 1.7 }}>
        <p style={{ fontWeight: 700, margin: '0 0 6px' }}>How to share documents:</p>
        <p style={{ margin: 0, color: TXT_M }}>Upload to Google Drive → Right-click → "Get link" → Set to "Anyone with the link" → Paste below.</p>
      </div>
      {[
        { label: 'Resume / CV', field: 'resumeLink', placeholder: 'https://drive.google.com/…' },
        { label: 'Portfolio', field: 'portfolioLink', placeholder: 'https://drive.google.com/… or portfolio URL' },
        { label: 'Intro Video', field: 'videoLink', placeholder: 'https://drive.google.com/… or YouTube link' },
      ].map(({ label, field, placeholder }) => (
        <div key={field}>
          <Lbl>{label}</Lbl>
          <Inp value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={placeholder} />
          {formData[field] && (
            <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: ACC, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, textDecoration: 'none' }}>
              <Eye size={12} />Preview →
            </a>
          )}
        </div>
      ))}
    </div>
  );

  const renderAvailability = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Schedule Availability</h3>
      <AvailPanel availability={formData.availability} isEditing={true} setFormData={setFormData} />
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'overview': return renderOverview();
      case 'experience': return renderExperience();
      case 'documents': return renderDocuments();
      case 'availability': return renderAvailability();
      default: return renderOverview();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0', overflowY: 'auto' }}
      className="mp-modal-overlay">
      <div style={{ background: '#0a2d1e', width: '100%', maxWidth: 760, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', border: `1px solid ${BOR_B}` }}
        className="mp-modal">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${BOR}`, flexShrink: 0 }}>
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: TXT, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Pencil size={16} color={ACC} />Edit Profile
          </h2>
          <button onClick={onClose} disabled={isSaving} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${BOR}`, color: TXT_M, borderRadius: 7, padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flex: 1, minHeight: 0, flexDirection: 'column' }} className="mp-modal-body">
          {/* Sidebar nav */}
          <div style={{ background: 'rgba(0,0,0,0.2)', borderBottom: `1px solid ${BOR}`, flexShrink: 0 }} className="mp-nav">
            <nav style={{ display: 'flex', gap: 4, padding: '10px 14px', overflowX: 'auto' }}>
              {navItems.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button"
                  onClick={() => { setCurrentSection(id); setErrors({}); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                    padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                    fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s',
                    background: currentSection === id ? ACC : 'transparent',
                    color: currentSection === id ? '#fff' : TXT_S,
                    border: `1px solid ${currentSection === id ? ACC : BOR}`,
                  }}>
                  <Icon size={13} />
                  <span className="mp-nav-label">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {renderContent()}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 20px', borderTop: `1px solid ${BOR}`, background: 'rgba(0,0,0,0.2)', flexShrink: 0 }} className="mp-footer">
          <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={onClose} disabled={isSaving} style={{ fontFamily: F, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${BOR_B}`, borderRadius: 8, color: TXT_M, background: 'transparent', cursor: 'pointer' }}>
              Cancel
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => handleSave(true)} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${ACC}`, borderRadius: 8, color: ACC, background: 'transparent', cursor: 'pointer', opacity: isSaving ? 0.6 : 1 }}>
                {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : 'Save'}
              </button>
              {currentSection !== 'availability' && (
                <button type="button" onClick={handleSaveAndContinue} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, color: '#fff', background: ACC, cursor: 'pointer', opacity: isSaving ? 0.6 : 1 }}>
                  {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────
const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState('overview');
  const [formData, setFormData] = useState({ availability: DAYS.map(d => ({ day: d, slots: [] })) });
  const [email, setEmail] = useState('');

  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

  useEffect(() => { const ud = localStorage.getItem('userData'); if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } } }, []);
  useEffect(() => { if (email) getMentorDetails(email); }, [email]);
  useEffect(() => {
    if (data?.data) {
      setFormData({ ...data.data });
    }
  }, [data]);

  const handleEdit = (section = 'overview') => { setEditSection(section); setIsEditing(true); };
  const handleClose = () => setIsEditing(false);

  const handleSave = async (shouldClose = true) => {
    try {
      await updateMentorDetails({ email, ...formData }).unwrap();
      await getMentorDetails(email);
      if (shouldClose) setTimeout(handleClose, 200);
      showToast('Profile updated!', 'success');
    } catch { showToast('Failed to update.'); }
  };
  if (isLoading) return (
    <div style={{ fontFamily: F, minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Loader2 size={28} style={{ color: ACC, animation: 'spin .9s linear infinite', display: 'block', margin: '0 auto 12px' }} />
        <p style={{ fontFamily: F, color: TXT_S, fontSize: 13, margin: 0 }}>Loading profile…</p>
      </div>
    </div>
  );

  if (error || Object.keys(formData).length < 2)
    return (
      <div
        style={{
          fontFamily: F,
          minHeight: "100vh",
          background: BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            background: CARD,
            borderRadius: 16,
            border: `1px solid ${BOR}`,
            padding: "36px 40px",
            maxWidth: 340,
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Lucide Not Found Icon */}
          <UserX
            size={32}
            style={{
              color: TXT_M,
              display: "block",
              margin: "0 auto 12px",
            }}
          />

          <p
            style={{
              fontFamily: F,
              color: TXT_M,
              fontSize: 14,
              fontWeight: 700,
              margin: "0 0 6px",
            }}
          >
            No Profile Found
          </p>
        </div>
      </div>
    );

  const skills = (formData.currentSkills || '').split(',').map(s => s.trim()).filter(Boolean);
  const areas = (formData.areasOfInterest || '').split(',').map(s => s.trim()).filter(Boolean);
  const langs = Array.isArray(formData.languages) ? formData.languages : [];
  const bio = formData.whyMentor || '';
  const initials = formData.fullName?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

  // Completion calc
  const completionFields = [
    formData.fullName, formData.currentRole, formData.phone, formData.location,
    formData.linkedinUrl, formData.whyMentor, formData.currentSkills,
    formData.yearsOfExperience, formData.highestDegree, formData.resumeLink,
  ];
  const completionPct = Math.round(completionFields.filter(Boolean).length / completionFields.length * 100);

  const completionSteps = [
    { label: 'Basic Info & Bio', completed: !!(formData.fullName && formData.currentRole && formData.phone) },
    { label: 'Skills & Expertise', completed: !!(formData.currentSkills && formData.areasOfInterest) },
    { label: 'Documents & Rate', completed: !!(formData.resumeLink && formData.hourlyRate) },
    { label: 'Availability', completed: !!((formData.availability || []).some(d => d.slots?.length > 0)) },
  ];

  const flat = (formData.availability || []).flatMap(de => (de.slots || []).map(s => ({ ...s, ds: s.date ? new Date(s.date).toISOString().split('T')[0] : null }))).filter(s => s.ds);

  const detailItems = [
    formData.location && { label: 'Location', value: formData.location, icon: MapPin },
    formData.yearsOfExperience && { label: 'Experience', value: `${formData.yearsOfExperience} years`, icon: Briefcase },
    formData.companyName && { label: 'Company', value: formData.companyName, icon: Briefcase },
    formData.highestDegree && { label: 'Education', value: formData.highestDegree, icon: Award },
    formData.schoolName && { label: 'Institution', value: formData.schoolName, icon: Award },
    formData.mentoringStyle && { label: 'Mentoring Style', value: formData.mentoringStyle, icon: Star },
  ].filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        html,body{font-family:${F};-webkit-font-smoothing:antialiased;}
        input:focus,textarea:focus,select:focus{border-color:${ACC}!important;outline:none;}
        textarea{resize:vertical;}
        input[type="time"]::-webkit-calendar-picker-indicator,
        input[type="date"]::-webkit-calendar-picker-indicator{opacity:.4;cursor:pointer;filter:invert(1);}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:${BOR_B};border-radius:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::placeholder{color:${TXT_S}!important;}
        .mp-main-grid{display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start;}
        .mp-modal{border-radius:16px 16px 0 0;}
        @media(min-width:640px){
          .mp-modal{border-radius:16px;margin:auto;}
          .mp-modal-overlay{align-items:center;padding:20px;}
          .mp-nav nav{flex-direction:column;padding:12px;}
          .mp-modal-body{flex-direction:row!important;}
          .mp-nav{border-bottom:none!important;border-right:1px solid ${BOR};width:180px;flex-shrink:0;}
          .mp-nav nav{gap:4px;}
        }
        @media(max-width:900px){
          .mp-main-grid{grid-template-columns:1fr!important;}
          .mp-sidebar{order:-1;}
          .mp-sidebar-inner{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        }
        @media(max-width:560px){
          .mp-sidebar-inner{grid-template-columns:1fr!important;}
          .mp-nav-label{display:inline!important;}
          .mp-hero-meta{flex-direction:column!important;gap:6px!important;}
        }
        .section-card-btn:hover{background:rgba(255,255,255,0.1)!important;}
        .edit-modal-nav-btn:hover{background:${ACC_L}!important;}
      `}</style>

      <div style={{ fontFamily: F, minHeight: '100vh', background: BG, color: TXT }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 60px' }}>

          {/* ── Hero / Banner ─────────────────────────────────── */}
          <div style={{ background: `linear-gradient(135deg, #071e12 0%, #0a2a18 50%, #062117 100%)`, border: `1px solid ${BOR}`, borderRadius: 16, padding: '28px 28px 24px', marginBottom: 20, animation: 'fadeUp .3s ease both' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 14, background: ACC_L, border: `2px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: ACC, fontFamily: F }}>
                    {initials}
                  </div>
                  {formData.status === 'approved' && (
                    <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: GRN, border: `2px solid ${BG}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={10} color="#fff" />
                    </div>
                  )}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 6, alignItems: 'center' }}>
                    {formData.mentorCategory && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '0.5px', background: ACC_L, border: `1px solid ${BOR_B}`, padding: '2px 9px', borderRadius: 20 }}>{formData.mentorCategory}</span>}
                    <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: AMB, background: AMB_L, border: `1px solid rgba(232,160,32,0.25)`, padding: '2px 9px', borderRadius: 20 }}>★ {formData.rating || '5.0'}</span>
                    {formData.status === 'approved' && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: GRN, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 9px', borderRadius: 20 }}>✓ Verified</span>}
                  </div>
                  <h1 style={{ fontFamily: F, fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 800, color: TXT, margin: '0 0 3px', lineHeight: 1.2 }}>
                    {formData.fullName || <span style={{ color: TXT_S, fontStyle: 'italic', fontWeight: 500 }}>No name added</span>}
                  </h1>
                  <p style={{ fontFamily: F, fontSize: 13, color: TXT_M, margin: '0 0 8px', fontWeight: 500 }}>
                    {formData.currentRole || 'Mentor'}
                    {formData.companyName && <span style={{ color: TXT_S }}> · {formData.companyName}</span>}
                  </p>
                  <div className="mp-hero-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                    {formData.location && <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{formData.location}</span>}
                    {formData.email && <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} />{formData.email}</span>}
                    {formData.createdAt && <span style={{ fontFamily: F, fontSize: 11, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />Since {fmtDate(formData.createdAt)}</span>}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: 'Sessions', value: formData.completedBookings || 0, icon: TrendingUp },
                  { label: 'Mentees', value: formData.totalMentees || 0, icon: Users },
                  { label: 'Exp.', value: `${formData.yearsOfExperience || 0}yr`, icon: Award },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} style={{ background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 10, padding: '10px 14px', textAlign: 'center', minWidth: 70 }}>
                    <Icon size={12} color={ACC} style={{ margin: '0 auto 4px', display: 'block' }} />
                    <div style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: TXT, lineHeight: 1 }}>{value}</div>
                    <div style={{ fontFamily: F, fontSize: 10, color: TXT_S, marginTop: 3, fontWeight: 600 }}>{label}</div>
                  </div>
                ))}
                <div style={{ background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: ACC }}>₹{(formData.hourlyRate || 0).toLocaleString()}</span>
                  <span style={{ fontFamily: F, fontSize: 11, color: TXT_S }}>{formData.sessionDuration || '/hr'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Two Column Grid ───────────────────────────────── */}
          <div className="mp-main-grid" style={{ animation: 'fadeUp .4s ease .08s both' }}>

            {/* LEFT — Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Profile Overview Card */}
              <SectionCard
                title="Profile Overview"
                subtitle="Your profile is visible to potential mentees."
                icon={Award}
                onEdit={() => handleEdit('overview')}
                editLabel="Edit Profile"
                isSaving={isSaving}
              >
                {bio && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 8px' }}>About</p>
                    <p style={{ fontFamily: F, fontSize: 13, color: TXT_M, lineHeight: 1.8, margin: 0 }}>{bio}</p>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: skills.length || areas.length ? 18 : 0 }}>
                  {formData.email && <InfoRow icon={Mail}>{formData.email}</InfoRow>}
                  {formData.phone && <InfoRow icon={Phone}>{formData.phone}</InfoRow>}
                  {formData.location && <InfoRow icon={MapPin}>{formData.location}</InfoRow>}
                  {formData.linkedinUrl && <InfoRow icon={Globe} href={formData.linkedinUrl}>LinkedIn Profile</InfoRow>}
                </div>
                {skills.length > 0 && (
                  <div style={{ marginBottom: areas.length ? 14 : 0 }}>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 8px' }}>Skills & Expertise</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {skills.map((s, i) => <TagPill key={i} label={s} />)}
                    </div>
                  </div>
                )}
                {areas.length > 0 && (
                  <div>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 8px' }}>Areas of Interest</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {areas.map((a, i) => <TagPill key={i} label={a} col="teal" />)}
                    </div>
                  </div>
                )}
                {!bio && !skills.length && !areas.length && !formData.email && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <p style={{ fontFamily: F, fontSize: 13, color: TXT_S, margin: '0 0 10px' }}>No profile info added yet.</p>
                    <button onClick={() => handleEdit('overview')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: ACC, background: 'none', border: 'none', cursor: 'pointer' }}>Complete Your Profile →</button>
                  </div>
                )}
              </SectionCard>

              {/* Experience & Education Card */}
              <SectionCard
                title="Experience & Education"
                icon={Briefcase}
                onEdit={() => handleEdit('experience')}
                editLabel="Edit"
                isSaving={isSaving}
                emptyState={detailItems.length === 0 ? { message: 'No experience or education added.', cta: 'Add Details →' } : null}
              >
                {detailItems.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: langs.length ? 18 : 0 }}>
                    {detailItems.map((item, i) => (
                      <div key={i}>
                        <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 4px' }}>{item.label}</p>
                        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT, margin: 0 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                {langs.length > 0 && (
                  <div>
                    <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 8px' }}>Languages</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {langs.map((l, i) => <TagPill key={i} label={l} col="amber" />)}
                    </div>
                  </div>
                )}
              </SectionCard>

              {/* Documents Card */}
              <SectionCard
                title="Documents & Media"
                icon={FileText}
                onEdit={() => handleEdit('documents')}
                editLabel="Edit"
                isSaving={isSaving}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                  {[
                    { label: 'Resume / CV', field: 'resumeLink', icon: FileText },
                    { label: 'Portfolio', field: 'portfolioLink', icon: BookOpen },
                    { label: 'Intro Video', field: 'videoLink', icon: Eye },
                  ].map(({ label, field, icon: Icon }) => (
                    <div key={field} style={{ border: `1px solid ${BOR}`, borderRadius: 10, padding: '14px', background: 'rgba(0,0,0,0.15)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={12} color={ACC} />
                        </div>
                        <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: TXT }}>{label}</span>
                      </div>
                      {formData[field] ? (
                        <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, padding: '7px 11px', borderRadius: 7, border: `1px solid ${BOR}`, color: TXT_M, textDecoration: 'none', background: 'rgba(0,0,0,0.1)', transition: 'all .15s' }}>
                          <Eye size={12} color={TXT_S} />View
                        </a>
                      ) : (
                        <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, fontStyle: 'italic' }}>Not uploaded</span>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Availability Card */}
              <SectionCard
                title="Scheduled Availability"
                icon={Calendar}
                onEdit={() => handleEdit('availability')}
                editLabel="Manage"
                isSaving={isSaving}
              >
                <AvailPanel availability={formData.availability} isEditing={false} setFormData={setFormData} />
              </SectionCard>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="mp-sidebar">
              <div className="mp-sidebar-inner" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Profile Completion */}
                <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BOR}`, padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: TXT, margin: 0 }}>Profile Completion</h3>
                    <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: completionPct === 100 ? GRN : ACC }}>{completionPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'rgba(0,0,0,0.3)', borderRadius: 100, marginBottom: 16, overflow: 'hidden' }}>
                    <div style={{ height: 6, borderRadius: 100, width: `${completionPct}%`, background: completionPct === 100 ? GRN : `linear-gradient(90deg, ${ACC}, #22d3ee)`, transition: 'width .7s ease' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {completionSteps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {step.completed
                          ? <CheckCircle size={16} color={GRN} style={{ flexShrink: 0 }} />
                          : <Circle size={16} color={BOR_B} style={{ flexShrink: 0 }} />}
                        <span style={{ fontFamily: F, fontSize: 12.5, color: step.completed ? TXT_M : TXT_S, fontWeight: step.completed ? 600 : 500 }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                  {completionPct < 100 ? (
                    <button onClick={() => handleEdit('overview')} style={{ width: '100%', marginTop: 16, fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff', background: ACC, border: 'none', borderRadius: 9, padding: '10px', cursor: 'pointer' }}>
                      Complete Your Profile
                    </button>
                  ) : (
                    <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <CheckCircle size={16} color={GRN} />
                      <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: GRN }}>Profile Complete!</span>
                    </div>
                  )}
                </div>

                {/* Pending Details */}
                {completionPct < 100 && (
                  <PendingDetailsCard mentorData={formData} onEdit={() => handleEdit('overview')} />
                )}

                {/* Quick Stats */}
                <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BOR}`, padding: 20 }}>
                  <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: TXT, margin: '0 0 14px' }}>Quick Stats</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { label: 'Completed Sessions', value: formData.completedBookings || 0, icon: TrendingUp, col: ACC },
                      { label: 'Total Mentees', value: formData.totalMentees || 0, icon: Users, col: GRN },
                      { label: 'Rating', value: `${formData.rating || '5.0'} ★`, icon: Star, col: AMB },
                      { label: 'Upcoming Sessions', value: flat.filter(s => !s.isBooked).length, icon: Calendar, col: ACC },
                    ].map(({ label, value, icon: Icon, col }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 9, border: `1px solid ${BOR}` }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${col}14`, border: `1px solid ${col}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={14} color={col} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: F, fontSize: 10, color: TXT_S, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
                          <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: TXT, lineHeight: 1.2 }}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isEditing}
        onClose={handleClose}
        section={editSection}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </>
  );
};

export default MentorProfile;